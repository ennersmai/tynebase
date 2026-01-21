# TyneBase Pricing & Credit System - Functional Requirements Document (FRD)

**Version:** 1.0  
**Date:** January 15, 2026  
**Author:** Claude & Mai  
**Status:** Ready for Implementation

---

## 1. EXECUTIVE SUMMARY

TyneBase implements a tiered subscription model with AI query-based billing. The system provides transparent usage tracking, automatic monthly resets, and optional top-up purchases for overflow usage.

**Key Principles:**
- Simple query-based pricing (not token-based)
- Transparent usage visibility
- Healthy profit margins (63-75%)
- Competitive market positioning
- Legal/Enterprise friendly (predictable costs)

---

## 2. PRICING TIERS

### 2.1 Tier Definitions

```
FREE TIER
Price: €0/month
Users: 1 (solo account)
Documents: 100 max
AI Queries: 10/month (renewable)
Features:
  - Document ingestion (all formats)
  - Basic keyword search
  - Limited AI queries (summarize, ask, chat)
  - Community support
Restrictions:
  - No version control
  - No analytics
  - No white-label
  - No team collaboration
  - No custom domain

BASE TIER
Price: €29/month
Users: 10 (small team)
Documents: Unlimited
Storage: 1GB KB limit
AI Queries: 100/month (shared pool)
Features:
  - All Free features
  - Full AI capabilities
  - Version control
  - Priority support
  - Team collaboration (10 users max)
Restrictions:
  - No white-label
  - No analytics dashboard
  - No custom domain

PRO TIER
Price: €99/month
Users: 50 (company)
Documents: Unlimited
Storage: 10GB KB limit
AI Queries: 500/month (shared pool)
Features:
  - All Base features
  - White-label branding
  - Advanced analytics
  - Custom domain
  - Admin controls
  - Audit logs
Restrictions:
  - Support: Priority (not dedicated)

ENTERPRISE TIER
Price: Custom (contact sales)
Users: Unlimited
Documents: Unlimited
Storage: Custom limit
AI Queries: Custom pool
Features:
  - All Pro features
  - Dedicated support
  - Custom integrations
  - SLA guarantees
  - On-premise option
  - Dedicated document manager
  - Priority onboarding
  - Volume discounts
  - Rollover credits (negotiable)
```

### 2.2 Top-Up Pricing

```
QUERY TOP-UPS (Add-ons for all paid tiers)
- 100 queries: €9.99
- 500 queries: €39.99 (Enterprise only)

Notes:
- Top-ups are one-time purchases
- Applied immediately
- Do NOT roll over to next month
- Can purchase multiple times per month
- Available when plan queries exhausted OR proactively
```

---

## 3. AI QUERY COSTING

### 3.1 Cost Model

**AI Provider Costs (estimated average per query):**
- Input tokens (avg 6k): €0.018
- Output tokens (avg 4k): €0.060
- **Total per query: €0.078**

**Pricing per query (user-facing):**
- Free: N/A (limited 10/month)
- Base: €0.29 per query (€29 / 100)
- Pro: €0.198 per query (€99 / 500)
- Top-up: €0.0999 per query (€9.99 / 100)

**Profit Margins:**
- Base: 75% (€21.70 profit on €29)
- Pro: 63% (€62.50 profit on €99)
- Top-up: 27% (€2.69 profit on €9.99)

### 3.2 What Counts as a Query

**1 AI Query = 1 of the following:**
- Knowledge base search with AI-generated answer
- Document summarization request
- Chat message to AI assistant
- Question answered via RAG pipeline

**Does NOT count as query:**
- Keyword search (no AI)
- Document upload/ingestion
- Viewing stored documents
- Navigating UI
- User management actions

---

## 4. DATABASE SCHEMA

### 4.1 New Tables

```sql
-- Subscription management
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'base', 'pro', 'enterprise')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'paused')),
  billing_cycle_start TIMESTAMPTZ NOT NULL,
  billing_cycle_end TIMESTAMPTZ NOT NULL,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Query usage tracking
CREATE TABLE query_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  query_type TEXT NOT NULL CHECK (query_type IN ('search', 'summarize', 'chat', 'rag')),
  tokens_used INTEGER NOT NULL,
  cost_eur DECIMAL(10, 4) NOT NULL,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  query_text TEXT,
  response_preview TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credit pools (monthly allocation + top-ups)
CREATE TABLE credit_pools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL, -- format: 'YYYY-MM'
  queries_included INTEGER NOT NULL, -- from subscription tier
  queries_purchased INTEGER DEFAULT 0, -- from top-ups
  queries_used INTEGER DEFAULT 0,
  queries_remaining INTEGER GENERATED ALWAYS AS (queries_included + queries_purchased - queries_used) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, month_year)
);

-- Top-up purchases
CREATE TABLE query_topups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  credit_pool_id UUID REFERENCES credit_pools(id) ON DELETE CASCADE,
  amount_eur DECIMAL(10, 2) NOT NULL,
  queries_purchased INTEGER NOT NULL,
  payment_intent_id TEXT, -- Stripe payment ID
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storage tracking
CREATE TABLE storage_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL,
  bytes_used BIGINT DEFAULT 0,
  document_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, month_year)
);
```

### 4.2 Modified Tables

```sql
-- Add tier limits to organizations
ALTER TABLE organizations ADD COLUMN tier TEXT DEFAULT 'free';
ALTER TABLE organizations ADD COLUMN storage_limit_gb INTEGER DEFAULT 0;
ALTER TABLE organizations ADD COLUMN user_limit INTEGER DEFAULT 1;
ALTER TABLE organizations ADD COLUMN custom_domain TEXT;
ALTER TABLE organizations ADD COLUMN white_label_enabled BOOLEAN DEFAULT false;
```

### 4.3 Indexes

```sql
CREATE INDEX idx_query_usage_org_created ON query_usage(organization_id, created_at DESC);
CREATE INDEX idx_credit_pools_org_month ON credit_pools(organization_id, month_year);
CREATE INDEX idx_subscriptions_org_status ON subscriptions(organization_id, status);
CREATE INDEX idx_topups_org_created ON query_topups(organization_id, created_at DESC);
```

---

## 5. API ENDPOINTS

### 5.1 Subscription Management

```typescript
// Get current subscription
GET /api/subscriptions/current
Response: {
  tier: 'base' | 'pro' | 'enterprise' | 'free',
  status: 'active' | 'cancelled' | 'past_due',
  billing_cycle_start: string,
  billing_cycle_end: string,
  auto_renew: boolean,
  features: {
    users: number,
    storage_gb: number,
    queries_per_month: number,
    white_label: boolean,
    analytics: boolean,
    custom_domain: boolean
  }
}

// Upgrade/downgrade subscription
POST /api/subscriptions/change-tier
Body: {
  new_tier: 'base' | 'pro' | 'enterprise',
  billing_period: 'monthly' | 'annual'
}

// Cancel subscription
POST /api/subscriptions/cancel
Body: {
  cancel_at_period_end: boolean,
  reason?: string
}
```

### 5.2 Credit/Query Management

```typescript
// Get current month's credit usage
GET /api/credits/current
Response: {
  month_year: '2026-01',
  queries_included: 100,
  queries_purchased: 50,
  queries_used: 87,
  queries_remaining: 63,
  percentage_used: 58,
  days_until_reset: 16
}

// Get usage history
GET /api/credits/history?months=3
Response: {
  history: [
    {
      month_year: '2026-01',
      queries_used: 87,
      queries_included: 100,
      queries_purchased: 50,
      cost_incurred_eur: 6.79
    }
  ]
}

// Get detailed query logs (admin only)
GET /api/credits/query-logs?page=1&limit=50
Response: {
  logs: [
    {
      id: 'uuid',
      user_email: 'user@example.com',
      query_type: 'search',
      tokens_used: 10234,
      cost_eur: 0.078,
      created_at: '2026-01-15T14:30:00Z',
      query_preview: 'What are the key terms in contract X?'
    }
  ],
  pagination: {
    total: 487,
    page: 1,
    limit: 50
  }
}
```

### 5.3 Top-Up Purchase

```typescript
// Initiate top-up purchase
POST /api/credits/purchase-topup
Body: {
  query_count: 100 | 500,
  payment_method_id?: string // Stripe payment method
}
Response: {
  client_secret: string, // Stripe payment intent
  amount_eur: 9.99,
  queries_to_add: 100
}

// Confirm top-up (webhook from Stripe)
POST /api/webhooks/stripe/topup-completed
Body: { /* Stripe webhook payload */ }
```

### 5.4 Usage Tracking (Internal)

```typescript
// Record a query (called by AI backend)
POST /api/internal/record-query
Headers: { Authorization: 'Bearer INTERNAL_API_KEY' }
Body: {
  organization_id: string,
  user_id: string,
  query_type: 'search' | 'summarize' | 'chat' | 'rag',
  tokens_used: number,
  cost_eur: number,
  document_id?: string,
  query_text?: string,
  response_preview?: string
}
Response: {
  success: boolean,
  queries_remaining: number,
  should_show_warning: boolean // if <20% remaining
}

// Check if organization has queries remaining (before processing)
GET /api/internal/check-quota?org_id=uuid
Response: {
  has_quota: boolean,
  queries_remaining: number,
  tier: string
}
```

---

## 6. BUSINESS LOGIC

### 6.1 Monthly Reset Logic

**Trigger:** Automated cron job runs daily at 00:00 UTC

**Process:**
1. Check all `credit_pools` where `month_year` < current month
2. For each organization with active subscription:
   - Create new `credit_pool` record for current month
   - Set `queries_included` based on current tier
   - Set `queries_purchased` = 0
   - Set `queries_used` = 0
3. Archive old `credit_pools` (don't delete, keep for history)
4. Send email notification to org admins: "Your AI query credits have been reset!"

**Edge Cases:**
- If subscription cancelled: Create pool with 0 queries_included
- If subscription upgraded mid-month: Immediately create new pool with new tier limits
- Top-ups do NOT carry over (clearly communicated at purchase)

### 6.2 Query Validation Flow

**Before processing any AI query:**

```typescript
async function validateQueryQuota(orgId: string): Promise<ValidationResult> {
  // 1. Get current credit pool
  const pool = await getCreditPool(orgId, getCurrentMonthYear());
  
  // 2. Check if queries remaining
  if (pool.queries_remaining <= 0) {
    return {
      allowed: false,
      reason: 'quota_exceeded',
      message: 'You have used all your AI queries this month. Purchase more or upgrade your plan.',
      queries_remaining: 0
    };
  }
  
  // 3. Check storage limits (separate check)
  const storageUsage = await getStorageUsage(orgId);
  const org = await getOrganization(orgId);
  if (storageUsage.bytes_used > org.storage_limit_gb * 1e9) {
    return {
      allowed: false,
      reason: 'storage_exceeded',
      message: 'Storage limit exceeded. Please delete documents or upgrade your plan.'
    };
  }
  
  // 4. Check subscription status
  const subscription = await getSubscription(orgId);
  if (subscription.status !== 'active') {
    return {
      allowed: false,
      reason: 'subscription_inactive',
      message: 'Your subscription is not active. Please update your payment method.'
    };
  }
  
  return {
    allowed: true,
    queries_remaining: pool.queries_remaining,
    should_warn: pool.queries_remaining < 20 // warn at <20%
  };
}
```

**After processing AI query:**

```typescript
async function recordQueryUsage(data: QueryUsageData): Promise<void> {
  // 1. Insert into query_usage table (audit trail)
  await db.insert('query_usage', {
    organization_id: data.orgId,
    user_id: data.userId,
    query_type: data.type,
    tokens_used: data.tokensUsed,
    cost_eur: calculateCost(data.tokensUsed),
    document_id: data.documentId,
    query_text: data.queryText?.substring(0, 500), // truncate for storage
    response_preview: data.responsePreview?.substring(0, 500)
  });
  
  // 2. Increment queries_used in credit_pool
  await db.increment('credit_pools', {
    where: {
      organization_id: data.orgId,
      month_year: getCurrentMonthYear()
    },
    field: 'queries_used',
    amount: 1
  });
  
  // 3. Check if threshold crossed (for notifications)
  const pool = await getCreditPool(data.orgId, getCurrentMonthYear());
  const percentageUsed = (pool.queries_used / (pool.queries_included + pool.queries_purchased)) * 100;
  
  if (percentageUsed >= 80 && !pool.notified_80) {
    await sendLowCreditEmail(data.orgId, '80%');
    await markNotified(pool.id, '80');
  }
  
  if (percentageUsed >= 95 && !pool.notified_95) {
    await sendLowCreditEmail(data.orgId, '95%');
    await markNotified(pool.id, '95');
  }
  
  if (percentageUsed >= 100) {
    await sendOutOfCreditsEmail(data.orgId);
  }
}
```

### 6.3 Tier Upgrade/Downgrade Logic

**Immediate Upgrade (Base → Pro):**
1. Update `subscriptions.tier`
2. Create new `credit_pool` for current month with Pro limits
3. Transfer remaining queries from old pool: `queries_remaining_old` added to new pool
4. Charge prorated amount: `(€99 - €29) * (days_remaining / days_in_month)`
5. Send confirmation email

**Downgrade (Pro → Base):**
1. Schedule downgrade for end of current billing cycle
2. Set `subscriptions.pending_tier_change = 'base'`
3. At billing cycle end:
   - Update tier
   - Create new pool with Base limits (100 queries)
   - If queries_used > 100 in previous month, show warning
4. Send confirmation email

**Cancellation:**
1. Set `subscriptions.auto_renew = false`
2. At billing cycle end:
   - Set `status = 'cancelled'`
   - Create pool with 0 queries for next month
   - Retain read-only access to documents (30-day grace period)
3. After grace period: Archive org data

---

## 7. UI COMPONENTS

### 7.1 Credit Usage Dashboard Widget

**Location:** Main dashboard (top-right or sidebar)

**Design:**
```
┌─────────────────────────────────────┐
│ 🔋 AI Queries                       │
│                                     │
│ 347 / 500 remaining                 │
│ [████████████████░░░░] 69%         │
│                                     │
│ Resets in 12 days                   │
│                                     │
│ [View Details] [Buy More Credits]   │
└─────────────────────────────────────┘
```

**States:**
- **Normal (>20% remaining):** Green progress bar
- **Low (5-20% remaining):** Yellow progress bar + warning icon
- **Critical (<5% remaining):** Orange progress bar + urgent warning
- **Exhausted (0 remaining):** Red bar + "Top up now" CTA

### 7.2 Credit Usage Details Page

**Route:** `/dashboard/credits`

**Sections:**

**A. Current Month Overview**
```
January 2026 Usage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Included:   100 queries  (from Base plan)
Purchased:  +50 queries  (top-up on Jan 10)
Used:       87 queries
Remaining:  63 queries

[████████████░░░] 58% used

Resets: February 1, 2026
```

**B. Usage Chart**
```
Line chart showing daily query usage over current month
X-axis: Days of month
Y-axis: Queries used
Includes: Projected usage line (dotted)
```

**C. Query Log Table** (Admin only)
```
Date/Time | User | Type | Tokens | Cost | Preview
----------|------|------|--------|------|--------
Jan 15 14:30 | mai@... | Search | 10.2k | €0.078 | "What are the key..."
Jan 15 14:25 | dan@... | Summarize | 8.5k | €0.065 | "Summarize contract..."
...
[Load More] [Export CSV]
```

**D. Historical Usage**
```
Month | Included | Purchased | Used | Cost
------|----------|-----------|------|------
Jan 2026 | 100 | 50 | 87 | €6.79
Dec 2025 | 100 | 0 | 94 | €7.34
Nov 2025 | 100 | 100 | 178 | €13.88
```

### 7.3 Top-Up Purchase Modal

**Trigger:** Click "Buy More Credits" button

**Design:**
```
┌─────────────────────────────────────────┐
│  Purchase Additional Queries            │
│                                         │
│  Your current balance: 12 queries       │
│  Resets in: 16 days                     │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ○ 100 queries - €9.99             │ │
│  │   (€0.0999 per query)             │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ○ 500 queries - €39.99            │ │
│  │   (€0.0799 per query) BEST VALUE  │ │
│  │   Enterprise only                  │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ⚠️ Top-ups expire at month end        │
│  (unused queries do not roll over)     │
│                                         │
│  Payment Method: •••• 4242             │
│  [Change]                              │
│                                         │
│  [Cancel]            [Purchase Now →]  │
└─────────────────────────────────────────┘
```

**Flow:**
1. User selects quantity
2. Confirms payment method (Stripe)
3. Processes payment
4. Success: "✓ 100 queries added! New balance: 112"
5. Dashboard updates immediately

### 7.4 Low Credit Warning Banners

**80% Used (Yellow):**
```
⚠️ You've used 80% of your AI queries this month (400/500).
Consider purchasing more credits or upgrading your plan.
[Buy More] [Upgrade Plan] [Dismiss]
```

**95% Used (Orange):**
```
⚠️ Running low! Only 25 queries remaining (95% used).
Top up now to avoid interruptions.
[Buy More Credits] [View Usage]
```

**100% Used (Red, blocking):**
```
🚫 You've used all your AI queries for this month.
Your account is limited until February 1 or until you purchase more credits.

[Purchase 100 Queries - €9.99] [Upgrade to Pro - €99/month]
```

### 7.5 Pricing Page Updates

**Location:** `/pricing`

**Updated Tier Cards:**

```
┌─────────────────────────────┐
│ BASE                         │
│ €29/month                    │
│                             │
│ ✓ 10 users                    │
│ ✓ Unlimited documents        │
│ ✓ 1GB storage                │
│ ✓ 100 AI queries/month       │
│   (~3 per day)               │
│ ✓ Version control            │
│ ✓ Priority support           │
│                             │
│ [Start Free Trial]           │
└─────────────────────────────┘

┌─────────────────────────────┐
│ PRO                  Popular │
│ €99/month                    │
│ ✓ All base features          │
│ ✓ 50 users                   │
│ ✓ Unlimited documents        │
│ ✓ 10GB storage               │
│ ✓ 500 AI queries/month       │
│   (~16 per day)              │
│ ✓ White-label                │
│ ✓ Analytics                  │
│ ✓ Custom domain              │
│                             │
│ [Start Free Trial]           │
└─────────────────────────────┘
```

**Add-Ons Section:**
```
Need more queries?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
100 queries: €9.99 (available for all paid plans)
500 queries: €39.99 (Enterprise only)

Top-ups are one-time purchases and expire at month end.
```

---

## 8. NOTIFICATIONS & EMAILS

### 8.1 Email Templates

**1. Monthly Reset Notification**
```
Subject: Your TyneBase AI queries have been reset 🔄

Hi [Name],

Good news! Your monthly AI query allocation has been reset.

New Balance: [100/500] queries
Valid until: [Feb 1, 2026]

Last month you used [94] queries. Need more this month?
[Purchase Additional Queries] [Upgrade Your Plan]

Happy querying!
- TyneBase Team
```

**2. 80% Usage Warning**
```
Subject: You've used 80% of your AI queries ⚠️

Hi [Name],

You've used 400 out of 500 AI queries this month (80%).
Resets in: 12 days

To avoid interruptions:
• Purchase 100 more queries: €9.99
• Upgrade to Enterprise for custom limits

[View Usage Details] [Buy More Credits]

- TyneBase Team
```

**3. Out of Credits**
```
Subject: You're out of AI queries for this month 🚫

Hi [Name],

You've used all 500 AI queries included in your Pro plan.

Your options:
1. Wait until Feb 1 when credits reset
2. Purchase 100 queries for €9.99
3. Upgrade to Enterprise for higher limits

[Purchase Credits Now] [View Pricing]

Questions? Reply to this email.

- TyneBase Team
```

**4. Top-Up Purchase Confirmation**
```
Subject: Payment confirmed - 100 queries added ✓

Hi [Name],

Your payment of €9.99 has been processed.

New Balance: 112 queries
Receipt: [View Receipt]

Need more? You can purchase additional queries anytime.

- TyneBase Team
```

### 8.2 In-App Notifications

**Toast Notifications:**
- On query success: Silent (no toast, just update counter)
- On 80% threshold: Yellow toast "80% of queries used this month"
- On 95% threshold: Orange toast "Running low on AI queries!"
- On quota exceeded: Red toast (blocking) "Out of AI queries. Top up or wait until reset."

**Dashboard Notifications Panel:**
```
Notifications
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔋 You've used 95% of your AI queries (2 hours ago)
   [Buy More Credits]

💳 Payment method expiring soon (yesterday)
   [Update Payment Method]

✓ Your plan renewed successfully (3 days ago)
```

---

## 9. ADMIN CONTROLS

### 9.1 Admin Dashboard Features

**Organization Overview:**
```
Organizations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Org Name | Tier | Queries Used | Storage | Status
---------|------|--------------|---------|--------
Acme Law | Pro | 487/500 | 8.2GB | Active
Smith Co | Base | 94/100 | 0.8GB | Active
...

[Export CSV] [Filter by Tier]
```

**Usage Analytics:**
```
System-Wide Metrics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total queries this month: 47,234
Average cost per query: €0.074
Total AI cost: €3,495
Total revenue: €12,450
Net margin: €8,955 (72%)

[View Detailed Report]
```

**Manual Adjustments** (Super Admin only):
```
Manual Credit Adjustment
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Organization: [Select]
Action:
  ○ Add queries
  ○ Remove queries
  ○ Reset to tier default

Amount: [___]
Reason: [Customer service adjustment]

[Apply]
```

---

## 10. STRIPE INTEGRATION

### 10.1 Subscription Flow

**Product Setup in Stripe:**
```
Product: TyneBase Base Plan
Price: €29/month (recurring)
Metadata: { tier: 'base', queries: 100 }

Product: TyneBase Pro Plan
Price: €99/month (recurring)
Metadata: { tier: 'pro', queries: 500 }

Product: TyneBase Enterprise
Price: Custom (contact sales)
```

**Subscription Creation:**
```typescript
// When user upgrades to Base
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: 'price_base_monthly' }],
  metadata: {
    organization_id: orgId,
    tier: 'base'
  }
});

// Store subscription_id in database
await db.update('subscriptions', {
  stripe_subscription_id: subscription.id,
  status: 'active',
  billing_cycle_start: subscription.current_period_start,
  billing_cycle_end: subscription.current_period_end
});
```

### 10.2 Top-Up Flow

**Product Setup:**
```
Product: TyneBase Query Top-Up (100)
Price: €9.99 (one-time)
Metadata: { type: 'topup', queries: 100 }

Product: TyneBase Query Top-Up (500)
Price: €39.99 (one-time)
Metadata: { type: 'topup', queries: 500 }
```

**Payment Intent:**
```typescript
// When user initiates top-up
const paymentIntent = await stripe.paymentIntents.create({
  amount: 999, // €9.99
  currency: 'eur',
  customer: customerId,
  metadata: {
    organization_id: orgId,
    type: 'query_topup',
    queries: 100
  }
});

// Return client_secret to frontend for Stripe.js
return { client_secret: paymentIntent.client_secret };
```

### 10.3 Webhooks

**Events to handle:**
```typescript
// subscription.created
// subscription.updated
// subscription.deleted
// invoice.payment_succeeded
// invoice.payment_failed
// payment_intent.succeeded (for top-ups)
// customer.subscription.trial_will_end
```

**Webhook Handler Example:**
```typescript
app.post('/api/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      if (event.data.object.metadata.type === 'query_topup') {
        await handleTopUpSuccess(event.data.object);
      }
      break;
      
    case 'invoice.payment_succeeded':
      await handleSubscriptionRenewal(event.data.object);
      break;
      
    case 'customer.subscription.deleted':
      await handleSubscriptionCancellation(event.data.object);
      break;
  }
  
  res.json({ received: true });
});
```

---

## 11. SECURITY & COMPLIANCE

### 11.1 Row Level Security (RLS) Policies

```sql
-- Only org members can view their credit pool
CREATE POLICY "Users can view own org credit pool"
ON credit_pools FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  )
);

-- Only admins can view query logs
CREATE POLICY "Admins can view query logs"
ON query_usage FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
  )
);

-- Only system can insert query usage
CREATE POLICY "System can insert usage"
ON query_usage FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');
```

### 11.2 Rate Limiting

**API Rate Limits:**
```
Free tier: 2 requests/minute
Base tier: 10 requests/minute
Pro tier: 30 requests/minute
Enterprise: Custom
```

**Implementation:**
```typescript
// Middleware
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: (req) => {
    const tier = req.user.organization.tier;
    const limits = {
      free: 2,
      base: 10,
      pro: 30,
      enterprise: 100
    };
    return limits[tier] || 2;
  },
  message: 'Too many requests, please try again later.'
});
```

### 11.3 Data Privacy

**Query Log Retention:**
- Store query_text and response_preview for 90 days
- After 90 days: Anonymize (keep metadata, remove content)
- GDPR compliance: Allow users to request deletion

**Cost Data:**
- Aggregate cost_eur by month for billing
- Keep detailed records for 7 years (tax compliance)

---

## 12. TESTING REQUIREMENTS

### 12.1 Unit Tests

```typescript
// Test credit pool creation
describe('Credit Pool', () => {
  it('should create pool with correct tier limits', async () => {
    const pool = await createCreditPool(orgId, 'base', '2026-01');
    expect(pool.queries_included).toBe(100);
    expect(pool.queries_purchased).toBe(0);
    expect(pool.queries_used).toBe(0);
  });
  
  it('should increment usage correctly', async () => {
    await recordQuery(orgId, userId, 'search');
    const pool = await getCreditPool(orgId, '2026-01');
    expect(pool.queries_used).toBe(1);
    expect(pool.queries_remaining).toBe(99);
  });
  
  it('should block query when quota exceeded', async () => {
    // Use up all queries
    for (let i = 0; i < 100; i++) {
      await recordQuery(orgId, userId, 'search');
    }
    
    // Next query should fail
    const result = await validateQueryQuota(orgId);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('quota_exceeded');
  });
});

// Test top-up purchase
describe('Top-Up Purchase', () => {
  it('should add queries to pool on successful payment', async () => {
    await handleTopUpSuccess({
      metadata: { organization_id: orgId, queries: 100 }
    });
    
    const pool = await getCreditPool(orgId, '2026-01');
    expect(pool.queries_purchased).toBe(100);
    expect(pool.queries_remaining).toBe(200); // 100 included + 100 purchased
  });
});

// Test monthly reset
describe('Monthly Reset', () => {
  it('should create new pool on month change', async () => {
    await performMonthlyReset();
    const pool = await getCreditPool(orgId, '2026-02');
    expect(pool.queries_included).toBe(100);
    expect(pool.queries_purchased).toBe(0);
    expect(pool.queries_used).toBe(0);
  });
  
  it('should not carry over top-ups', async () => {
    // Purchase top-up in Jan
    await addTopUp(orgId, '2026-01', 100);
    
    // Reset to Feb
    await performMonthlyReset();
    
    // Check Feb pool
    const pool = await getCreditPool(orgId, '2026-02');
    expect(pool.queries_purchased).toBe(0); // Not carried over
  });
});
```

### 12.2 Integration Tests

```typescript
// Test complete query flow
describe('Query Flow Integration', () => {
  it('should process query and update all records', async () => {
    const result = await processAIQuery({
      orgId,
      userId,
      query: 'Test query',
      type: 'search'
    });
    
    // Check query_usage table
    const usage = await getLatestUsage(orgId);
    expect(usage.query_text).toBe('Test query');
    expect(usage.cost_eur).toBeGreaterThan(0);
    
    // Check credit_pool updated
    const pool = await getCreditPool(orgId, getCurrentMonth());
    expect(pool.queries_used).toBe(1);
    
    // Check response includes remaining count
    expect(result.queries_remaining).toBe(99);
  });
});

// Test Stripe webhook flow
describe('Stripe Webhooks', () => {
  it('should handle subscription creation', async () => {
    await handleStripeWebhook({
      type: 'customer.subscription.created',
      data: {
        object: {
          id: 'sub_123',
          metadata: { organization_id: orgId, tier: 'pro' }
        }
      }
    });
    
    const subscription = await getSubscription(orgId);
    expect(subscription.tier).toBe('pro');
    expect(subscription.stripe_subscription_id).toBe('sub_123');
  });
});
```

### 12.3 Load Tests

```typescript
// Simulate concurrent queries
describe('Load Testing', () => {
  it('should handle 100 concurrent queries', async () => {
    const promises = Array(100).fill(null).map(() => 
      processAIQuery({ orgId, userId, query: 'Test', type: 'search' })
    );
    
    const results = await Promise.all(promises);
    
    // All should succeed
    expect(results.every(r => r.success)).toBe(true);
    
    // Pool should reflect correct count
    const pool = await getCreditPool(orgId, getCurrentMonth());
    expect(pool.queries_used).toBe(100);
  });
});
```

---

## 13. DEPLOYMENT CHECKLIST

### 13.1 Database Migration

```bash
# Run migrations in order:
1. Create new tables (subscriptions, credit_pools, query_usage, topups, storage_usage)
2. Add columns to organizations table
3. Create indexes
4. Apply RLS policies
5. Seed initial data (create credit_pools for existing orgs)
```

### 13.2 Environment Variables

```env
# Stripe
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Pricing
BASE_TIER_QUERIES=100
PRO_TIER_QUERIES=500
TOPUP_100_PRICE_EUR=9.99
TOPUP_500_PRICE_EUR=39.99

# AI Costs (for margin calculation)
AVG_QUERY_COST_EUR=0.078

# Feature Flags
ENABLE_TOP_UPS=true
ENABLE_ANALYTICS=true
```

### 13.3 Monitoring

**Alerts to set up:**
- Credit pool queries_remaining < 10% (per org)
- System-wide AI cost > €500/day
- Failed Stripe webhooks
- Query processing latency > 5s
- Storage usage > 90% of tier limit

**Metrics to track:**
- Queries processed per minute
- Average query cost
- Top-up conversion rate
- Tier upgrade rate
- Monthly recurring revenue (MRR)
- Churn rate

---

## 14. EDGE CASES & TROUBLESHOOTING

### 14.1 Edge Cases

**Scenario 1: User upgrades mid-month**
- Solution: Prorate charges, create new credit pool, transfer remaining queries

**Scenario 2: Payment fails on subscription renewal**
- Solution: 7-day grace period, send 3 reminder emails, then downgrade to free tier

**Scenario 3: User purchases top-up but doesn't use it before month end**
- Solution: Money is lost (clearly communicated), queries expire

**Scenario 4: Organization hits storage limit mid-upload**
- Solution: Upload fails gracefully with clear error, suggest deleting old docs or upgrading

**Scenario 5: User deletes documents but storage doesn't decrease**
- Solution: Run daily cleanup job to recalculate storage_usage

**Scenario 6: Stripe webhook fails/is missed**
- Solution: Implement retry logic + manual reconciliation job every 24h

### 14.2 Manual Interventions

**Refund top-up purchase:**
```sql
-- 1. Refund in Stripe dashboard
-- 2. Reverse credit addition
UPDATE credit_pools
SET queries_purchased = queries_purchased - 100
WHERE organization_id = 'org_id' AND month_year = '2026-01';

-- 3. Log manual adjustment
INSERT INTO manual_adjustments (org_id, reason, amount, admin_user)
VALUES ('org_id', 'Refunded top-up purchase', -100, 'admin@tynebase.com');
```

**Grant emergency credits:**
```sql
-- For customer service scenarios
UPDATE credit_pools
SET queries_purchased = queries_purchased + 50
WHERE organization_id = 'org_id' AND month_year = '2026-01';

-- Log reason
INSERT INTO manual_adjustments (org_id, reason, amount, admin_user)
VALUES ('org_id', 'Customer service goodwill gesture', 50, 'admin@tynebase.com');
```

---

## 15. SUCCESS METRICS

### 15.1 KPIs to Track

**Revenue Metrics:**
- MRR (Monthly Recurring Revenue)
- ARPU (Average Revenue Per User)
- Top-up attach rate (% of users buying top-ups)
- Upgrade rate (Free → Base → Pro)

**Usage Metrics:**
- Queries per user per month (by tier)
- Top-up purchase frequency
- % of users exceeding included queries
- Average queries remaining at month end

**Health Metrics:**
- Churn rate
- Payment failure rate
- Customer support tickets re: billing
- Query processing success rate

### 15.2 Success Criteria (3 months post-launch)

✅ **30% of Base users purchase at least one top-up**
✅ **15% of Base users upgrade to Pro within 3 months**
✅ **<5% churn rate**
✅ **>60% net margin on AI costs**
✅ **<1% query processing failures**

---

## 16. FUTURE ENHANCEMENTS

**Phase 2 Features (not in MVP):**
- Annual billing (discount vs monthly)
- Usage forecasting ("At this rate, you'll run out in 8 days")
- Smart alerts ("You use more queries on Mondays, consider upgrading")
- Team member usage breakdown
- Query categorization (by document, by user, by time)
- API access (with separate rate limits)
- Rollover credits (Enterprise only, negotiated)
- Volume discounts for Enterprise

---

## APPENDIX: QUICK REFERENCE

### Tier Limits Summary

| Feature | Free | Base | Pro | Enterprise |
|---------|------|------|-----|------------|
| **Price** | €0 | €29/mo | €99/mo | Custom |
| **Users** | 1 | 3 | 10 | Unlimited |
| **Storage** | 100MB | 1GB | 10GB | Custom |
| **AI Queries** | 10/mo | 100/mo | 500/mo | Custom |
| **Documents** | 100 | Unlimited | Unlimited | Unlimited |
| **Version Control** | ❌ | ✅ | ✅ | ✅ |
| **Analytics** | ❌ | ❌ | ✅ | ✅ |
| **White-label** | ❌ | ❌ | ✅ | ✅ |
| **Custom Domain** | ❌ | ❌ | ✅ | ✅ |
| **Support** | Community | Priority | Priority | Dedicated |
| **Top-ups Available** | ❌ | ✅ | ✅ | ✅ |

### Cost Per Query

| Tier | Price | Queries | Cost/Query | Margin |
|------|-------|---------|------------|--------|
| Base | €29 | 100 | €0.29 | 75% |
| Pro | €99 | 500 | €0.198 | 63% |
| Top-up | €9.99 | 100 | €0.0999 | 27% |

### Key API Endpoints

```
GET    /api/subscriptions/current
POST   /api/subscriptions/change-tier
GET    /api/credits/current
GET    /api/credits/history
POST   /api/credits/purchase-topup
POST   /api/internal/record-query
GET    /api/internal/check-quota
```

---

**END OF FRD**

**Document Status:** ✅ Ready for Implementation  
**Next Steps:** Begin database schema creation → API endpoint development → UI component building  