# Lawyer Time-Tracking & Automated Billing SaaS

A production-ready SaaS application for small law firms to track billable hours and automate invoice generation.

## Features

- ⏱️ **One-Click Time Tracking**: Start/stop timers with detailed descriptions
- 📄 **Automated PDF Invoicing**: Generate professional invoices from time entries
- 📊 **Matter Organization**: Organize time by client matters with custom rates
- 💳 **Stripe Integration**: Subscription billing and payment processing
- 🔐 **Secure Multi-Tenant**: Row-level security with Supabase
- 📱 **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe Subscriptions
- **PDF Generation**: PDFKit
- **Email**: Resend
- **Deployment**: Vercel

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lawyer-time-tracking-saas.git
cd lawyer-time-tracking-saas
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL from `schema.sql` in your Supabase SQL editor
3. Create a storage bucket named `documents` for PDF invoices

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create products for your subscription plans:
   - Solo Plan: $39/month (1 seat)
   - Small Firm: $79/month (5 seats) 
   - Growth: $149/month (15 seats)
3. Set up webhook endpoint: `your-domain.com/api/webhooks`

### 4. Environment Variables

Create a `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Resend (Email)
RESEND_API_KEY=re_your_resend_key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Database Schema

The application uses the following main tables:

- `firms` - Law firm information
- `users` - User accounts linked to firms
- `matters` - Legal matters/cases
- `time_entries` - Billable time entries
- `invoices` - Generated invoices
- `invoice_line_items` - Invoice line items

## API Routes

- `GET/POST /api/time` - Time entry management
- `GET/POST /api/matters` - Matter management
- `GET/POST /api/invoices` - Invoice generation
- `POST /api/webhooks` - Stripe webhooks

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Vercel Environment Variables

Add these in your Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
NEXT_PUBLIC_SITE_URL
```

## Usage

### Time Tracking

1. Log in to your account
2. Navigate to Dashboard
3. Use the timer widget to track time
4. Add matter descriptions and select clients
5. Save time entries

### Invoice Generation

1. Go to Invoices section
2. Select billing period
3. System automatically generates PDF invoices
4. Invoices are sent via email to clients

### Matter Management

1. Create new matters for each client case
2. Set custom hourly rates per matter
3. Organize time entries by matter

## Subscription Plans

- **Solo**: $39/month - 1 user, unlimited time tracking
- **Small Firm**: $79/month - 5 users, advanced reporting
- **Growth**: $149/month - 15 users, API access

## Support

For support, please contact [your-email@domain.com](mailto:your-email@domain.com)

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ for legal professionals.
