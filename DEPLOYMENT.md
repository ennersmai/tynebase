# TyneBase Deployment Guide

Complete guide for deploying TyneBase to Vercel with Supabase backend.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ A [Supabase](https://supabase.com) account
- ✅ A [Vercel](https://vercel.com) account
- ✅ Git repository with your TyneBase code
- ✅ Node.js 18+ installed locally (for testing)

---

## Supabase Setup

### 1. Create a New Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `tynebase-production` (or your preferred name)
   - **Database Password**: Generate a strong password and save it securely
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Start with Free tier, upgrade as needed
4. Click **"Create new project"** and wait for provisioning (~2 minutes)

### 2. Run Database Migrations

Once your project is ready:

1. Go to **SQL Editor** in the Supabase dashboard
2. Click **"New Query"**
3. Copy the contents of `supabase/migrations/20240101000000_initial_schema.sql`
4. Paste into the SQL editor and click **"Run"**
5. Repeat for `supabase/migrations/20240101000001_storage_buckets.sql`
6. **IMPORTANT**: Run `supabase/migrations/20240102000000_prd_complete_schema.sql` (PRD-aligned schema)

**Verify migrations:**
- Go to **Table Editor** - you should see: `tenants`, `users`, `documents`, `categories`, `document_versions`, `document_embeddings`, `templates`, `discussions`, `discussion_replies`, `notifications`, `audit_logs`, `ai_generation_jobs`, `content_audit_reports`, `user_consents`
- Go to **Storage** - you should see buckets: `avatars`, `documents`, `logos`
- Verify pgvector extension is enabled (check Extensions section)

**Note**: The third migration (`20240102000000_prd_complete_schema.sql`) updates the schema to match the PRD exactly and enables all dashboard features. See `SCHEMA_MIGRATION_GUIDE.md` for details.

### 3. Configure Email Templates (Important for Signup!)

1. Go to **Authentication** → **Email Templates**
2. Configure the **Confirm signup** template:

```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your account:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
```

3. Configure **Site URL** and **Redirect URLs**:
   - Go to **Authentication** → **URL Configuration**
   - **Site URL**: `https://your-domain.vercel.app` (update after deployment)
   - **Redirect URLs**: Add:
     - `http://localhost:3000/**` (for local development)
     - `https://your-domain.vercel.app/**` (for production)

### 4. Get Your Supabase Credentials

1. Go to **Project Settings** → **API**
2. Copy these values (you'll need them for Vercel):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (starts with eyJ)
   - **service_role key**: `eyJhbGc...` (keep this secret!)

### 5. Configure OAuth Providers (Optional)

**For Google OAuth:**

1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Add your Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
4. Set authorized redirect URIs:
   - `https://xxxxx.supabase.co/auth/v1/callback`

**For GitHub OAuth:**

1. Go to **Authentication** → **Providers** → **GitHub**
2. Enable GitHub provider
3. Add your GitHub OAuth credentials from [GitHub Developer Settings](https://github.com/settings/developers)
4. Set authorization callback URL:
   - `https://xxxxx.supabase.co/auth/v1/callback`

---

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your TyneBase repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `tynebase-frontend` (if in monorepo) or `./` (if standalone)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Click **"Deploy"** (it will fail initially - this is expected)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to your project
cd tynebase-frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## Environment Variables

### 1. Add Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Add the following variables for **Production**, **Preview**, and **Development**:

#### Required Variables

| Variable | Value | Example |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_APP_URL` | Your production domain | `https://tynebase.vercel.app` |

#### Optional Variables (if using OAuth)

| Variable | Value |
|----------|-------|
| `GOOGLE_CLIENT_ID` | Your Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret |
| `GITHUB_CLIENT_ID` | Your GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth client secret |

#### Service Role Key (Server-side only)

| Variable | Value | Note |
|----------|-------|------|
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | ⚠️ Keep secret! Never expose to client |

### 2. Redeploy After Adding Variables

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **three dots** (•••) on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** (optional)
5. Click **"Redeploy"**

---

## Post-Deployment Configuration

### 1. Update Supabase Redirect URLs

1. Go to your Supabase project → **Authentication** → **URL Configuration**
2. Update **Site URL** to your Vercel domain: `https://your-domain.vercel.app`
3. Add to **Redirect URLs**:
   - `https://your-domain.vercel.app/**`
   - `https://your-domain.vercel.app/auth/callback`

### 2. Configure Custom Domain (Optional)

1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `tynebase.com`)
3. Follow Vercel's DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable to your custom domain
5. Update Supabase redirect URLs to include your custom domain

### 3. Test Your Deployment

1. **Visit your site**: `https://your-domain.vercel.app`
2. **Test signup flow**:
   - Go to `/signup`
   - Create a test account (use a real email)
   - Check your email for confirmation link
   - Click confirmation link
   - Login at `/login`
3. **Test OAuth** (if configured):
   - Try "Continue with Google" or "Continue with GitHub"
   - Verify successful authentication

### 4. Monitor Your Application

**Vercel Analytics:**
- Go to **Analytics** tab to see traffic and performance metrics

**Supabase Logs:**
- Go to **Logs** → **Auth Logs** to see authentication events
- Go to **Logs** → **API Logs** to see database queries

**Error Tracking:**
- Check Vercel **Functions** tab for runtime errors
- Check Supabase **Logs** for database errors

---

## Troubleshooting

### Email Confirmation Not Sending

**Problem**: Users don't receive confirmation emails after signup

**Solutions**:
1. Check Supabase **Authentication** → **Email Templates** are configured
2. Verify **Site URL** is set correctly in Supabase
3. Check spam folder
4. For production, configure custom SMTP in Supabase **Project Settings** → **Auth** → **SMTP Settings**

### OAuth Redirect Errors

**Problem**: "Invalid redirect URL" or "Redirect URL mismatch"

**Solutions**:
1. Verify OAuth redirect URLs in Supabase match your domain exactly
2. Check OAuth provider settings (Google/GitHub) have correct callback URLs
3. Ensure `NEXT_PUBLIC_APP_URL` matches your actual domain
4. Clear browser cache and cookies

### Database Connection Errors

**Problem**: "Failed to connect to database" or RLS policy errors

**Solutions**:
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
2. Check Supabase project is not paused (free tier pauses after inactivity)
3. Verify migrations ran successfully in SQL Editor
4. Check RLS policies are enabled on tables

### Build Failures

**Problem**: Vercel deployment fails during build

**Solutions**:
1. Check build logs in Vercel deployment details
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check for TypeScript errors: `npm run type-check`
5. Ensure environment variables are set in Vercel

### 404 Errors on Routes

**Problem**: Direct navigation to routes returns 404

**Solutions**:
1. Verify `next.config.mjs` is properly configured
2. Check Vercel is detecting Next.js framework correctly
3. Ensure all pages are in `app/` directory (App Router)
4. Redeploy with clean build cache

### Performance Issues

**Problem**: Slow page loads or API responses

**Solutions**:
1. Enable Vercel Edge Functions for faster response times
2. Optimize images using Next.js Image component
3. Check Supabase query performance in Logs
4. Consider upgrading Supabase plan for better performance
5. Enable Vercel Analytics to identify bottlenecks

---

## Production Checklist

Before going live, ensure:

- [ ] All environment variables are set in Vercel
- [ ] Supabase migrations have been run successfully
- [ ] Email confirmation is working
- [ ] OAuth providers are configured (if using)
- [ ] Custom domain is configured (if using)
- [ ] Site URL and redirect URLs are updated in Supabase
- [ ] Test signup, login, and logout flows
- [ ] Test password reset flow
- [ ] Verify RLS policies are working correctly
- [ ] Check error tracking and monitoring is set up
- [ ] Review and update privacy policy and terms of service
- [ ] Set up custom SMTP for production emails (recommended)
- [ ] Configure backup strategy for Supabase database

---

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server locally
npm run start

# Type checking
npm run type-check

# Linting
npm run lint

# Deploy to Vercel
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls
```

---

## Support Resources

- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **Supabase Documentation**: [https://supabase.com/docs](https://supabase.com/docs)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support**: [https://vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [https://supabase.com/support](https://supabase.com/support)

---

## Next Steps

After successful deployment:

1. **Set up monitoring**: Configure error tracking (Sentry, LogRocket, etc.)
2. **Enable analytics**: Set up Vercel Analytics or Google Analytics
3. **Configure backups**: Set up automated database backups in Supabase
4. **Security review**: Audit RLS policies and API endpoints
5. **Performance optimization**: Review Core Web Vitals in Vercel Analytics
6. **Documentation**: Update README with production URLs and setup instructions

---

**Congratulations! Your TyneBase application is now live! 🎉**
