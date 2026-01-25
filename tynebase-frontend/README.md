# TyneBase Frontend

Multi-tenant knowledge management platform with AI-assisted document generation, community discussions, and white-label branding.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: React Query (TanStack Query)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BASE_DOMAIN=tynebase.com
```

### Installation

Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
tynebase-frontend/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication pages
│   ├── dashboard/           # Protected dashboard pages
│   ├── page.tsx             # Marketing landing page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # UI components (Button, Input, etc.)
│   ├── layout/              # Layout components (Sidebar, Header)
│   └── providers/           # Context providers
├── contexts/                # React contexts (Auth, Tenant)
├── lib/                     # Utility functions
│   ├── supabase/           # Supabase client configuration
│   └── utils.ts            # Helper functions
├── types/                   # TypeScript type definitions
└── middleware.ts           # Next.js middleware (tenant routing, auth)
```

## Features

### Milestone 1 (Current)
- ✅ Marketing landing page
- ✅ Authentication (email/password, Google OAuth, magic link)
- ✅ Subdomain-based tenant routing
- ✅ Protected dashboard routes
- ✅ Role-based access control (UI-level)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ White-label branding settings
- ✅ Complete UI component library

### Milestone 2 (Coming Soon)
- AI-powered document generation
- Community discussions
- Template library
- Content audit dashboard
- Advanced analytics

## Multi-Tenancy

TyneBase uses subdomain-based multi-tenancy:
- `acme.tynebase.com` → Acme Corp's workspace
- `globex.tynebase.com` → Globex Inc's workspace
- `tynebase.com` → Marketing site

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The app will automatically deploy on push to main branch.

### Environment Variables for Production

Set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_BASE_DOMAIN`

## Design System

TyneBase uses a custom "Industrial" design system:
- **Primary Color**: #E85002 (Brand Orange)
- **Typography**: Helvetica Neue, Arial
- **Gradient**: Coal → Heat → Molten → Cooling
- **Spacing**: Consistent 8px grid
- **Radius**: Sharp corners (2px-8px)

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved
