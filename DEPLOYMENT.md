# Deployment Checklist for Lawyer Billing SaaS

## Pre-Deployment Setup

### 1. Supabase Setup
- [ ] Create Supabase project
- [ ] Run the migration SQL from `supabase/migrations/20241101000000_lawyer_billing_schema.sql`
- [ ] Create storage bucket named `documents` for PDF invoices
- [ ] Configure authentication providers (GitHub, Google, etc.)
- [ ] Set up proper CORS and URL configuration

### 2. Stripe Setup
- [ ] Create Stripe account
- [ ] Set up products and pricing:
  - [ ] Solo Plan: $39/month (1 seat)
  - [ ] Small Firm: $79/month (5 seats)
  - [ ] Growth: $149/month (15 seats)
- [ ] Configure webhook endpoint: `https://your-domain.com/api/webhooks`
- [ ] Test webhook with Stripe CLI
- [ ] Configure customer portal settings

### 3. Environment Variables
Set up these environment variables in Vercel:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (Resend)
RESEND_API_KEY=

# App
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deployment Steps

### 1. Code Deployment
- [ ] Push code to GitHub repository
- [ ] Connect repository to Vercel
- [ ] Configure build settings (should auto-detect Next.js)
- [ ] Add environment variables in Vercel dashboard

### 2. Database Migration
- [ ] Run the lawyer billing schema migration in Supabase SQL editor
- [ ] Verify all tables are created with proper RLS policies
- [ ] Test database connections

### 3. Stripe Configuration
- [ ] Update webhook URL to production domain
- [ ] Test webhook delivery
- [ ] Verify subscription products are active
- [ ] Test checkout flow

### 4. Post-Deployment Testing
- [ ] Test user registration and authentication
- [ ] Verify timer functionality works
- [ ] Test matter creation and management
- [ ] Test time entry creation
- [ ] Verify invoice generation (when implemented)
- [ ] Test subscription flows
- [ ] Check PDF generation and storage

## Production Configuration

### Security Checklist
- [ ] Enable RLS policies on all tables
- [ ] Verify user isolation (users can only see their firm's data)
- [ ] Test authentication flows
- [ ] Ensure API endpoints require authentication
- [ ] Verify file upload security (Supabase Storage)

### Performance Optimization
- [ ] Enable Vercel Edge Functions for faster response times
- [ ] Configure proper caching headers
- [ ] Optimize images and assets
- [ ] Test performance with tools like Lighthouse

### Monitoring Setup
- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry optional)
- [ ] Set up uptime monitoring
- [ ] Configure Stripe webhook monitoring

## Launch Preparation

### Legal & Compliance
- [ ] Add Terms of Service
- [ ] Add Privacy Policy
- [ ] Ensure GDPR compliance if serving EU customers
- [ ] Set up proper billing address collection for tax compliance

### Marketing Setup
- [ ] Configure domain (e.g., lexbill.com)
- [ ] Set up SSL certificate (handled by Vercel)
- [ ] Create landing page content
- [ ] Set up customer support email
- [ ] Prepare launch announcement

### Customer Onboarding
- [ ] Create onboarding flow for new firms
- [ ] Set up email templates for welcome, billing, etc.
- [ ] Create help documentation
- [ ] Test the complete user journey

## Estimated Budget

- **Domain**: $10-15/year
- **Vercel Pro**: $20/month (for production features)
- **Supabase Pro**: $25/month (for production database)
- **Stripe Processing**: 2.9% + 30¢ per transaction
- **Resend Email**: $20/month for 100k emails
- **Total Monthly**: ~$65 + transaction fees

## Go-Live Timeline

1. **Week 1**: Complete development and testing
2. **Week 2**: Deploy to staging, run full tests
3. **Week 3**: Deploy to production, soft launch
4. **Week 4**: Marketing launch and customer acquisition

## Support & Maintenance

- Monitor application performance daily
- Review Stripe dashboard for payment issues
- Check Supabase logs for database errors
- Update dependencies monthly
- Back up database weekly (Supabase handles this)
- Review and respond to customer feedback

---

## Emergency Contacts & Resources

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Stripe Support**: [stripe.com/support](https://stripe.com/support)

## Rollback Plan

If issues arise:
1. Revert to previous Vercel deployment
2. Check Supabase logs for database issues
3. Verify Stripe webhook status
4. Communicate with affected customers

This checklist ensures a smooth deployment and launch of the Lawyer Billing SaaS application. 