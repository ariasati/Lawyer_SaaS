/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  -- The customer's billing address, stored in JSON format.
  billing_address jsonb,
  -- Stores your customer's payment instruments.
  payment_method jsonb,
  -- The firm ID that the user belongs to
  firm_id uuid,
  -- The role of the user in the firm
  role text default 'attorney',
  -- The hourly rate for the user
  hourly_rate decimal(10,2) default 350.00
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
* CUSTOMERS
* Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.
*/
create table customers (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  -- The user's customer ID in Stripe. User must not be able to update this.
  stripe_customer_id text
);
alter table customers enable row level security;
-- No policies as this is a private table that the user must not have access to.

/** 
* PRODUCTS
* Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
*/
create table products (
  -- Product ID from Stripe, e.g. prod_1234.
  id text primary key,
  -- Whether the product is currently available for purchase.
  active boolean,
  -- The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
  name text,
  -- The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
  description text,
  -- A URL of the product image in Stripe, meant to be displayable to the customer.
  image text,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata jsonb
);
alter table products enable row level security;
create policy "Allow public read-only access." on products for select using (true);

/**
* PRICES
* Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
*/
create type pricing_type as enum ('one_time', 'recurring');
create type pricing_plan_interval as enum ('day', 'week', 'month', 'year');
create table prices (
  -- Price ID from Stripe, e.g. price_1234.
  id text primary key,
  -- The ID of the prduct that this price belongs to.
  product_id text references products, 
  -- Whether the price can be used for new purchases.
  active boolean,
  -- A brief description of the price.
  description text,
  -- The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).
  unit_amount bigint,
  -- Three-letter ISO currency code, in lowercase.
  currency text check (char_length(currency) = 3),
  -- One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
  type pricing_type,
  -- The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
  interval pricing_plan_interval,
  -- The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
  interval_count integer,
  -- Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
  trial_period_days integer,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata jsonb
);
alter table prices enable row level security;
create policy "Allow public read-only access." on prices for select using (true);

/**
* SUBSCRIPTIONS
* Note: subscriptions are created and managed in Stripe and synced to our DB via Stripe webhooks.
*/
create type subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused');
create table subscriptions (
  -- Subscription ID from Stripe, e.g. sub_1234.
  id text primary key,
  user_id uuid references auth.users not null,
  -- The status of the subscription object, one of subscription_status type above.
  status subscription_status,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata jsonb,
  -- ID of the price that created this subscription.
  price_id text references prices,
  -- Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats.
  quantity integer,
  -- If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancel_at_period_end boolean,
  -- Time at which the subscription was created.
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Start of the current period that the subscription has been invoiced for.
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  -- End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  -- If the subscription has ended, the timestamp of the date the subscription ended.
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  -- A date in the future at which the subscription will automatically get canceled.
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  -- If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  -- If the subscription has a trial, the beginning of that trial.
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  -- If the subscription has a trial, the end of that trial.
  trial_end timestamp with time zone default timezone('utc'::text, now())
);
alter table subscriptions enable row level security;
create policy "Can only view own subs data." on subscriptions for select using (auth.uid() = user_id);

/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
drop publication if exists supabase_realtime;
create publication supabase_realtime for table products, prices, firms, matters, time_entries, invoices;

/**
 * LAWYER BILLING SYSTEM EXTENSION
 * Tables for law firm time tracking and billing functionality
 */

/**
 * FIRMS
 * Law firms that use the billing system
 */
create table firms (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  address text,
  phone text,
  email text,
  website text,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table firms enable row level security;

-- Now add the foreign key constraint to users table
alter table users add constraint users_firm_id_fkey foreign key (firm_id) references firms(id);

/**
 * MATTERS
 * Legal matters/cases that time is tracked against
 */
create table matters (
  id uuid default gen_random_uuid() primary key,
  firm_id uuid references firms(id) not null,
  client_name text not null,
  matter_description text not null,
  matter_number text,
  default_rate decimal(10,2) default 350.00,
  status text default 'active' check (status in ('active', 'closed', 'on_hold')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table matters enable row level security;

/**
 * TIME_ENTRIES
 * Individual time entries for billable work
 */
create table time_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  matter_id uuid references matters(id) not null,
  description text not null,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  billable_seconds integer not null default 0,
  hourly_rate decimal(10,2) not null,
  is_billable boolean default true,
  is_billed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table time_entries enable row level security;

/**
 * INVOICES
 * Generated invoices for billing periods
 */
create type invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'cancelled');
create table invoices (
  id uuid default gen_random_uuid() primary key,
  firm_id uuid references firms(id) not null,
  invoice_number text not null,
  period_start timestamp with time zone not null,
  period_end timestamp with time zone not null,
  subtotal decimal(12,2) not null default 0.00,
  tax_amount decimal(12,2) not null default 0.00,
  total_amount decimal(12,2) not null default 0.00,
  pdf_url text,
  stripe_invoice_id text,
  status invoice_status default 'draft',
  sent_at timestamp with time zone,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table invoices enable row level security;

/**
 * INVOICE_LINE_ITEMS
 * Individual line items on invoices
 */
create table invoice_line_items (
  id uuid default gen_random_uuid() primary key,
  invoice_id uuid references invoices(id) not null,
  time_entry_id uuid references time_entries(id),
  description text not null,
  hours decimal(6,2) not null,
  rate decimal(10,2) not null,
  amount decimal(12,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table invoice_line_items enable row level security;

/**
 * ROW LEVEL SECURITY POLICIES
 */

-- Firms: Users can only access their own firm
create policy "Users can view own firm data" on firms 
  for select using (id in (select firm_id from users where id = auth.uid()));
create policy "Users can update own firm data" on firms 
  for update using (id in (select firm_id from users where id = auth.uid()));

-- Matters: Users can only access matters from their firm
create policy "Users can view own firm matters" on matters 
  for select using (firm_id in (select firm_id from users where id = auth.uid()));
create policy "Users can insert matters for own firm" on matters 
  for insert with check (firm_id in (select firm_id from users where id = auth.uid()));
create policy "Users can update own firm matters" on matters 
  for update using (firm_id in (select firm_id from users where id = auth.uid()));

-- Time Entries: Users can only access their own time entries or entries from their firm
create policy "Users can view own time entries" on time_entries 
  for select using (
    user_id = auth.uid() or 
    matter_id in (select id from matters where firm_id in (select firm_id from users where id = auth.uid()))
  );
create policy "Users can insert own time entries" on time_entries 
  for insert with check (user_id = auth.uid());
create policy "Users can update own time entries" on time_entries 
  for update using (user_id = auth.uid());

-- Invoices: Users can only access invoices from their firm
create policy "Users can view own firm invoices" on invoices 
  for select using (firm_id in (select firm_id from users where id = auth.uid()));
create policy "Users can insert invoices for own firm" on invoices 
  for insert with check (firm_id in (select firm_id from users where id = auth.uid()));
create policy "Users can update own firm invoices" on invoices 
  for update using (firm_id in (select firm_id from users where id = auth.uid()));

-- Invoice Line Items: Users can only access line items from their firm's invoices
create policy "Users can view own firm invoice line items" on invoice_line_items 
  for select using (
    invoice_id in (
      select id from invoices where firm_id in (select firm_id from users where id = auth.uid())
    )
  );
create policy "Users can insert line items for own firm invoices" on invoice_line_items 
  for insert with check (
    invoice_id in (
      select id from invoices where firm_id in (select firm_id from users where id = auth.uid())
    )
  );

/**
 * TRIGGERS FOR UPDATED_AT
 */
create or replace function trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger set_timestamp_firms before update on firms for each row execute function trigger_set_timestamp();
create trigger set_timestamp_matters before update on matters for each row execute function trigger_set_timestamp();
create trigger set_timestamp_time_entries before update on time_entries for each row execute function trigger_set_timestamp();
create trigger set_timestamp_invoices before update on invoices for each row execute function trigger_set_timestamp();