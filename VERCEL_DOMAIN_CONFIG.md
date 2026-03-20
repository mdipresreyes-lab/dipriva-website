# Vercel Domain Configuration Guide

## Custom Domain Setup: Redirecting www.dipriva.com from GoHighLevel to Vercel

This guide provides the exact DNS records needed to redirect your domain from its current GoHighLevel configuration to Vercel.

### Current Setup
- **Domain:** www.dipriva.com (registered at Squarespace)
- **Current DNS Target:** GoHighLevel
- **New DNS Target:** Vercel

---

## Step 1: Add Domain to Vercel

1. Log in to your Vercel dashboard
2. Navigate to your project: **dipriva-landing**
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `www.dipriva.com`
6. Click **Add**

Vercel will display the DNS configuration needed. See Step 2 below for the exact records.

---

## Step 2: DNS Records to Update in Squarespace

You have two options for configuring DNS. **Option A (CNAME)** is recommended for the `www` subdomain.

### Option A: CNAME Record (Recommended for www subdomain)

This is the simplest approach for pointing `www.dipriva.com` to Vercel.

**In Squarespace DNS Settings:**

1. Log in to your Squarespace account
2. Go to **Settings** → **Domains** → **DNS**
3. Locate the existing DNS record for `www.dipriva.com` (currently pointing to GHL)
4. **Replace** the existing CNAME record with:
   - **Host/Name:** `www`
   - **Type:** `CNAME`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** 3600 (or default)

5. **Save/Update** the record

**Example of what you're replacing:**
- Old: `www` → CNAME → `ghl.example.com` (or similar GHL domain)
- New: `www` → CNAME → `cname.vercel-dns.com`

---

### Option B: A Record (If Vercel provides IP addresses)

If you prefer to use A records or Vercel provides specific IP addresses:

**In Squarespace DNS Settings:**

1. Locate the DNS record for `www.dipriva.com`
2. **Replace** the existing record with:
   - **Host/Name:** `www`
   - **Type:** `A`
   - **Value:** `76.76.19.0` (or the specific IP provided by Vercel)
   - **TTL:** 3600 (or default)

3. **Save/Update** the record

---

## Step 3: Verify Configuration in Vercel

1. Return to your Vercel dashboard
2. Go to **Settings** → **Domains**
3. Check the status of `www.dipriva.com`
4. The status should change from **Pending** to **Valid Configuration** within 5-10 minutes
5. Once verified, your site will be accessible at `https://www.dipriva.com`

---

## Step 4: SSL/HTTPS Certificate

Vercel automatically provisions an SSL certificate for your domain once it's verified. This happens automatically—no manual action required.

---

## Timeline & Propagation

- **DNS Update:** Takes effect immediately in Squarespace
- **Vercel Verification:** 5-10 minutes
- **Global DNS Propagation:** Can take up to 48 hours, but usually faster (1-4 hours)
- **SSL Certificate:** Provisions within 5-10 minutes after verification

---

## Troubleshooting

### Domain not resolving after 30 minutes
- **Verify DNS records** are correctly entered in Squarespace DNS settings
- **Check exact values** match what Vercel provided (copy-paste to avoid typos)
- **Clear browser cache** or test in incognito mode
- **Wait longer** for DNS propagation (can take up to 48 hours globally)

### SSL certificate not provisioning
- Ensure the domain is fully verified in Vercel first
- Wait 5-10 minutes after verification for certificate provisioning
- Check the Vercel dashboard for any error messages
- If issues persist, contact Vercel support

### Mixed content warnings
- All resources (images, fonts, APIs) are already configured to use HTTPS URLs
- No additional action needed

### Domain shows "Invalid Configuration" in Vercel
- Double-check the CNAME/A record value in Squarespace
- Ensure there are no trailing spaces or typos
- Wait 10-15 minutes and refresh the Vercel dashboard
- Try clearing Squarespace DNS cache (if available in their settings)

---

## Important Notes

✅ **Keep GoHighLevel DNS active** during testing—don't delete old records until Vercel is fully working

✅ **Test the Vercel site first** at the temporary Vercel URL before updating DNS

✅ **Once DNS is updated**, traffic will automatically route to Vercel

✅ **Deployment is automatic**—any code changes pushed to your repository will deploy to Vercel automatically

✅ **After successful migration**, you can deactivate GoHighLevel hosting (but keep domain registered at Squarespace)

---

## Quick Reference: DNS Records to Update

| Field | Current Value (GHL) | New Value (Vercel) |
|-------|---------------------|-------------------|
| **Host** | www | www |
| **Type** | CNAME | CNAME |
| **Value** | ghl.example.com | cname.vercel-dns.com |
| **TTL** | 3600 | 3600 |

---

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs/concepts/projects/domains
- **Squarespace DNS Help:** https://support.squarespace.com/hc/en-us/articles/206541517-Connecting-a-domain-registered-elsewhere-to-Squarespace
- **Vercel Support:** https://vercel.com/support

---

## Next Steps After DNS Update

1. **Verify domain works** at `https://www.dipriva.com`
2. **Check SSL certificate** is active (green lock in browser)
3. **Test all pages:** Home, Services, About, Contact, Privacy, 404
4. **Test form submission** to ensure GHL/Supabase integration works
5. **Test analytics** (GA4 and Clarity consent banner)
6. **Monitor Vercel dashboard** for any deployment errors
