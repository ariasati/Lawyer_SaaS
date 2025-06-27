/**
 * LAWYER BILLING SYSTEM EXTENSION
 * Migration to add lawyer-specific tables to the existing subscription system
 */

/**
 * FIRMS
 * Law firms that use the billing system
 */
CREATE TABLE IF NOT EXISTS firms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  address text,
  phone text,
  email text,
  website text,
  stripe_customer_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE firms ENABLE ROW LEVEL SECURITY;

/**
 * Add firm relationship to existing users table
 */
ALTER TABLE users ADD COLUMN IF NOT EXISTS firm_id uuid REFERENCES firms(id);
ALTER TABLE users ADD COLUMN IF NOT EXISTS role text DEFAULT 'attorney';
ALTER TABLE users ADD COLUMN IF NOT EXISTS hourly_rate decimal(10,2) DEFAULT 350.00;

/**
 * MATTERS
 * Legal matters/cases that time is tracked against
 */
CREATE TABLE IF NOT EXISTS matters (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_id uuid REFERENCES firms(id) NOT NULL,
  client_name text NOT NULL,
  matter_description text NOT NULL,
  matter_number text,
  default_rate decimal(10,2) DEFAULT 350.00,
  status text DEFAULT 'active' CHECK (status IN ('active', 'closed', 'on_hold')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE matters ENABLE ROW LEVEL SECURITY;

/**
 * TIME_ENTRIES
 * Individual time entries for billable work
 */
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  matter_id uuid REFERENCES matters(id) NOT NULL,
  description text NOT NULL,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  billable_seconds integer NOT NULL DEFAULT 0,
  hourly_rate decimal(10,2) NOT NULL,
  is_billable boolean DEFAULT true,
  is_billed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

/**
 * INVOICE STATUS ENUM
 */
DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

/**
 * INVOICES
 * Generated invoices for billing periods
 */
CREATE TABLE IF NOT EXISTS invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_id uuid REFERENCES firms(id) NOT NULL,
  invoice_number text NOT NULL,
  period_start timestamp with time zone NOT NULL,
  period_end timestamp with time zone NOT NULL,
  subtotal decimal(12,2) NOT NULL DEFAULT 0.00,
  tax_amount decimal(12,2) NOT NULL DEFAULT 0.00,
  total_amount decimal(12,2) NOT NULL DEFAULT 0.00,
  pdf_url text,
  stripe_invoice_id text,
  status invoice_status DEFAULT 'draft',
  sent_at timestamp with time zone,
  due_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

/**
 * INVOICE_LINE_ITEMS
 * Individual line items on invoices
 */
CREATE TABLE IF NOT EXISTS invoice_line_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id uuid REFERENCES invoices(id) NOT NULL,
  time_entry_id uuid REFERENCES time_entries(id),
  description text NOT NULL,
  hours decimal(6,2) NOT NULL,
  rate decimal(10,2) NOT NULL,
  amount decimal(12,2) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE invoice_line_items ENABLE ROW LEVEL SECURITY;

/**
 * ROW LEVEL SECURITY POLICIES
 */

-- Firms: Users can only access their own firm
CREATE POLICY "Users can view own firm data" ON firms 
  FOR SELECT USING (id IN (SELECT firm_id FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can update own firm data" ON firms 
  FOR UPDATE USING (id IN (SELECT firm_id FROM users WHERE id = auth.uid()));

-- Matters: Users can only access matters from their firm
CREATE POLICY "Users can view own firm matters" ON matters 
  FOR SELECT USING (firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can insert matters for own firm" ON matters 
  FOR INSERT WITH CHECK (firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can update own firm matters" ON matters 
  FOR UPDATE USING (firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid()));

-- Time Entries: Users can only access their own time entries or entries from their firm
CREATE POLICY "Users can view own time entries" ON time_entries 
  FOR SELECT USING (
    user_id = auth.uid() OR 
    matter_id IN (SELECT id FROM matters WHERE firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid()))
  );
CREATE POLICY "Users can insert own time entries" ON time_entries 
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own time entries" ON time_entries 
  FOR UPDATE USING (user_id = auth.uid());

-- Invoices: Users can only access invoices from their firm
CREATE POLICY "Users can view own firm invoices" ON invoices 
  FOR SELECT USING (firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can insert invoices for own firm" ON invoices 
  FOR INSERT WITH CHECK (firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can update own firm invoices" ON invoices 
  FOR UPDATE USING (firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid()));

-- Invoice Line Items: Users can only access line items from their firm's invoices
CREATE POLICY "Users can view own firm invoice line items" ON invoice_line_items 
  FOR SELECT USING (
    invoice_id IN (
      SELECT id FROM invoices WHERE firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid())
    )
  );
CREATE POLICY "Users can insert line items for own firm invoices" ON invoice_line_items 
  FOR INSERT WITH CHECK (
    invoice_id IN (
      SELECT id FROM invoices WHERE firm_id IN (SELECT firm_id FROM users WHERE id = auth.uid())
    )
  );

/**
 * TRIGGERS FOR UPDATED_AT
 */
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_firms 
  BEFORE UPDATE ON firms 
  FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_matters 
  BEFORE UPDATE ON matters 
  FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_time_entries 
  BEFORE UPDATE ON time_entries 
  FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_invoices 
  BEFORE UPDATE ON invoices 
 