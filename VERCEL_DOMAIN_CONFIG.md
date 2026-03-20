# Vercel Domain Configuration Guide

## Custom Domain Setup for www.dipriva.com

This guide provides the DNS records needed to point your domain from Squarespace to Vercel.

### Step 1: Add Domain to Vercel

1. Log in to your Vercel dashboard
2. Navigate to your project: **dipriva-landing**
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `www.dipriva.com`
6. Click **Add**

### Step 2: DNS Configuration

Vercel will provide you with DNS records. You need to update these records in your Squarespace domain settings.

#### Option A: CNAME Record (Recommended for www subdomain)

**In Vercel Dashboard:**
- You'll see a CNAME record pointing to Vercel's infrastructure
- Typical format: `cname.vercel-dns.com` or similar

**In Squarespace DNS Settings:**
1. Log in to your Squarespace account
2. Go to **Settings** → **Domains** → **DNS**
3. Find the DNS record for `www.dipriva.com`
4. Update the CNAME record:
   - **Host/Name:** `www`
   - **Type:** CNAME
   - **Value:** `cname.vercel-dns.com` (use the exact value from Vercel)
5. Save changes

#### Option B: A Record (For root domain dipriva.com)

If you want to point the root domain (`dipriva.com` without `www`), use:

**In Vercel Dashboard:**
- Vercel provides A record IP addresses (typically 76.76.19.0 or similar)

**In Squarespace DNS Settings:**
1. Find the DNS record for `dipriva.com` (root)
2. Update the A record:
   - **Host/Name:** `@` or leave blank (represents root)
   - **Type:** A
   - **Value:** `76.76.19.0` (use the exact IP from Vercel)
3. Save changes

### Step 3: Verify Domain Configuration

1. Return to Vercel dashboard
2. The domain status should show **Valid Configuration** within 5-10 minutes
3. Once verified, your site will be accessible at `https://www.dipriva.com`

### Step 4: SSL/HTTPS

Vercel automatically provisions an SSL certificate for your domain. This happens automatically once the domain is verified.

### Troubleshooting

**Domain not resolving after 30 minutes:**
- Verify the DNS records are correctly entered in Squarespace
- Check that the CNAME/A record values exactly match what Vercel provided
- DNS propagation can take up to 48 hours globally, though usually faster

**SSL certificate not provisioning:**
- Ensure the domain is fully verified in Vercel first
- Wait 5-10 minutes after verification for certificate provisioning
- Check the Vercel dashboard for any error messages

**Mixed content warnings:**
- Ensure all resources (images, fonts, APIs) use HTTPS URLs
- The site is already configured to use HTTPS URLs for all CDN assets

### Important Notes

- **Do NOT delete the old Squarespace DNS records** until you've verified the Vercel setup is working
- Keep the Squarespace hosting active during the transition for continuity
- Once everything is working on Vercel, you can deactivate Squarespace hosting
- The deployment on Vercel is automatic—any changes pushed to your repository will deploy automatically

### Support

For additional help:
- Vercel Documentation: https://vercel.com/docs/concepts/projects/domains
- Squarespace DNS Help: https://support.squarespace.com/hc/en-us/articles/206541517-Connecting-a-domain-registered-elsewhere-to-Squarespace
