# Supabase Setup for TyneBase

This directory contains the Supabase configuration and database migrations for TyneBase.

## Quick Start

### For Production Deployment

1. **Create a Supabase project** at [https://app.supabase.com](https://app.supabase.com)

2. **Run migrations** in the Supabase SQL Editor:
   - Copy contents of `migrations/20240101000000_initial_schema.sql` and run it
   - Copy contents of `migrations/20240101000001_storage_buckets.sql` and run it

3. **Get your credentials** from Project Settings → API:
   - Project URL
   - Anon/public key
   - Service role key (keep secret!)

4. **Add to your `.env.local`**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

5. **Configure email settings** in Authentication → Email Templates

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment instructions.

## Database Schema

### Tables

- **tenants**: Organization/company information
- **users**: User profiles (extends auth.users)
- **spaces**: Workspaces within a tenant
- **documents**: All documents/pages
- **invitations**: Pending team invitations

### Storage Buckets

- **avatars**: User profile pictures (public)
- **documents**: Document attachments (private)
- **logos**: Company logos (public)

## Row Level Security (RLS)

All tables have RLS enabled with policies that:
- Users can only access data in their tenant
- Admins/owners have additional permissions
- Individual users can manage their own data

## Triggers

- **Auto-create user profile** on signup
- **Auto-create tenant** for company accounts
- **Auto-update timestamps** on record changes

## Local Development (Optional)

To run Supabase locally:

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Apply migrations
supabase db reset

# Stop local Supabase
supabase stop
```

Local Supabase runs on:
- API: http://localhost:54321
- Studio: http://localhost:54323
- Inbucket (emails): http://localhost:54324

## Migration Files

- `20240101000000_initial_schema.sql`: Core database schema
- `20240101000001_storage_buckets.sql`: Storage buckets and policies

## Configuration

- `config.toml`: Supabase CLI configuration
- `seed.sql`: Optional seed data for development

## Support

For issues or questions:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
