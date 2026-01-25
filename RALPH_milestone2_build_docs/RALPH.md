# 📋 backend-tasks.md - RALPH Execution Controller

**Version:** 1.0  
**Project:** TyneBase Backend (Milestone 2)  
**Mode:** Autonomous AI-to-AI Execution

---

## 🤖 Instructions for AI Agent (CRITICAL - READ FIRST)

### RALPH Protocol v2.0 - Autonomous Execution Mode

You are an autonomous backend implementation agent. A human supervisor oversees but does not micromanage. Follow this protocol exactly:

### 1. **Task Execution Loop**
```
FOR each unchecked task:
  1. Read task description
  2. Consult PRD.md for context and requirements
  3. Create execution_summary_task[N].md with your implementation plan
  4. Implement the feature following security & coding best practices
  5. Run validation steps
  6. If PASS:
     - Mark task as [x]
     - Update execution_summary with results
     - Commit code: "feat(task-[N]): [description]"
     - STOP and report to supervisor
  7. If FAIL:
     - Document failure in execution_summary
     - Attempt fix (max 2 retries)
     - If still failing, mark [!] and STOP for supervisor review
```

### 2. **File Structure You Must Maintain**
```
/backend
├── PRD.md (reference only, never modify)
├── backend-tasks.md (this file - update checkboxes only)
├── tasklist.md (YOU create this - your personal scratch pad)
├── execution_summary_task1.md (create per task)
├── execution_summary_task2.md
└── ... (one summary per task)
```

### 3. **Security & Coding Best Practices (NON-NEGOTIABLE)**

#### Security Rules:
- ✅ **NEVER** commit secrets, API keys, or credentials to code
- ✅ **ALWAYS** use environment variables for sensitive data
- ✅ **ALWAYS** use parameterized queries (never string concatenation for SQL)
- ✅ **ALWAYS** validate and sanitize user input
- ✅ **ALWAYS** enforce RLS policies on database tables
- ✅ **ALWAYS** verify JWT tokens before processing requests
- ✅ **ALWAYS** use HTTPS/TLS for external API calls
- ✅ **ALWAYS** implement rate limiting on public endpoints
- ✅ **ALWAYS** hash passwords with bcrypt (min 12 rounds)
- ✅ **NEVER** expose internal error details to clients (log internally, return generic messages)

#### Code Quality Rules:
- ✅ **ALWAYS** write TypeScript with strict mode enabled
- ✅ **ALWAYS** handle errors with try-catch and proper logging
- ✅ **ALWAYS** use async/await (avoid callback hell)
- ✅ **ALWAYS** add input validation with Zod or Joi schemas
- ✅ **ALWAYS** write meaningful variable names (no single letters except loop indices)
- ✅ **ALWAYS** add JSDoc comments for functions
- ✅ **ALWAYS** use const by default, let when needed, never var
- ✅ **ALWAYS** clean up resources (close connections, clear intervals)
- ✅ **ALWAYS** log important operations (with context: user_id, tenant_id)

#### Database Rules:
- ✅ **ALWAYS** use transactions for multi-step operations
- ✅ **ALWAYS** add indexes on foreign keys and frequently queried columns
- ✅ **ALWAYS** use UUIDs for primary keys (gen_random_uuid())
- ✅ **ALWAYS** add ON DELETE CASCADE where appropriate
- ✅ **ALWAYS** include created_at, updated_at timestamps
- ✅ **NEVER** use SELECT * in production queries (specify columns)

#### API Design Rules:
- ✅ **ALWAYS** return proper HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- ✅ **ALWAYS** use consistent error response format: `{error: {code, message, details}}`
- ✅ **ALWAYS** validate request body with schemas before processing
- ✅ **ALWAYS** implement CORS properly (no wildcard * in production)
- ✅ **ALWAYS** add request/response logging middleware
- ✅ **ALWAYS** implement idempotency for critical operations

### 4. **Your Personal `tasklist.md` Format**

Create this file on your first task. Use it as your scratchpad:

```markdown
# AI Agent Task List (Personal Notes)

## Current Task: [N] - [Name]
**Status:** In Progress / Blocked / Complete
**Started:** [timestamp]

### Implementation Notes:
- [Your thoughts, decisions, trade-offs]

### Blockers:
- [Any issues encountered]

### Next Steps:
- [What you plan to do next]

---

## Completed Tasks Summary:
- [x] Task 1: Brief note
- [x] Task 2: Brief note
```

### 5. **`execution_summary_task[N].md` Format**

Create one file per task with this structure:

```markdown
# Execution Summary - Task [N]: [Task Name]

**Status:** ✅ PASS / ❌ FAIL  
**Completed:** [timestamp]  
**Validation:** [PASS/FAIL]

## What Was Implemented
[Brief description of what you built]

## Files Created/Modified
- `path/to/file.ts` - [what changed]
- `path/to/migration.sql` - [what changed]

## Validation Results
```
[paste command output or test results]
```

## Security Considerations
- [List any security measures applied]

## Notes for Supervisor
[Anything important the human should know]

## Blockers/Issues
[Only if task failed - explain why]
```

### 6. **Commit Message Format**
```
feat(task-[N]): [clear description under 50 chars]

- [bullet point of what changed]
- [security measures applied]
- [validation results]

Refs: #task-[N]
```

### 7. **When to STOP and Ask Supervisor**
- ❌ Validation fails after 2 retry attempts
- ❌ Ambiguity in PRD requirements (mark task with [?])
- ❌ Missing external dependencies (API keys, credentials)
- ❌ Security concern you're unsure about
- ❌ Architectural decision needed (not specified in PRD)

### 8. **Validation Philosophy**
- **Validation is NOT optional** - if a task says "Validation: X", you MUST do X
- **Automated > Manual** - prefer scripts/SQL queries over manual checks
- **Document everything** - paste actual output, not "it worked"
- **Be paranoid** - test edge cases, try to break your code

---

## 📊 Progress Tracker

**Total Tasks:** 150  
**Completed:** 0  
**In Progress:** 0  
**Blocked:** 0

---

## Phase 1: Foundation (Database & Auth)

### Database Schema

- [ ] **1.1** [DB] Initialize Supabase Project
  - **Action:** Create Supabase project in `eu-west-2` region
  - **Validation:** Dashboard accessible, run `SELECT version()` via SQL editor, confirm PostgreSQL version >= 15
  - **Security:** Note connection string, never commit it

- [ ] **1.2** [DB] Create Core Identity Tables
  - **Action:** Create migration `001_identity.sql` with tenants & users tables per PRD schema
  - **Validation:** Run migration, execute: `INSERT INTO tenants (subdomain, name, tier) VALUES ('test', 'Test Corp', 'free') RETURNING *;` then `INSERT INTO users (id, tenant_id, email, role) VALUES (gen_random_uuid(), [tenant_id], 'test@test.com', 'admin') RETURNING *;`
  - **Security:** Ensure passwords never stored in users table (auth.users handles this)

- [ ] **1.3** [DB] Enable Row Level Security on Identity Tables
  - **Action:** Add RLS policies for tenants and users tables
  - **Validation:** Execute `SET app.current_tenant_id = '[wrong-uuid]'; SELECT * FROM tenants;` - should return 0 rows. Then set correct tenant_id, should return 1 row
  - **Security:** Verify policies cannot be bypassed

- [ ] **1.4** [DB] Create Knowledge Base Tables
  - **Action:** Create migration `002_documents.sql` with documents & templates tables
  - **Validation:** Insert test document with parent_id, verify foreign key constraint works
  - **Security:** Add RLS policies immediately

- [ ] **1.5** [DB] Enable pgvector Extension
  - **Action:** Execute `CREATE EXTENSION IF NOT EXISTS vector;`
  - **Validation:** Run `SELECT * FROM pg_extension WHERE extname = 'vector';` - should return 1 row
  - **Security:** N/A

- [ ] **1.6** [DB] Create Embeddings Table with Indexes
  - **Action:** Create migration `003_embeddings.sql` with document_embeddings table
  - **Validation:** Create HNSW index, verify with `\d document_embeddings` shows index. Insert test embedding: `INSERT INTO document_embeddings (document_id, tenant_id, chunk_content, embedding) VALUES ([doc_id], [tenant_id], 'test', array_fill(0, ARRAY[3072])::vector);`
  - **Security:** Add RLS policies, add index on tenant_id

- [ ] **1.7** [DB] Create Job Queue Infrastructure
  - **Action:** Create migration `004_jobs.sql` with job_queue table and status enum
  - **Validation:** Insert job, run claim query: `UPDATE job_queue SET status='processing', worker_id='test' WHERE id = (SELECT id FROM job_queue WHERE status='pending' ORDER BY created_at LIMIT 1 FOR UPDATE SKIP LOCKED) RETURNING *;` - Run twice in parallel sessions, verify only 1 session gets the job
  - **Security:** Add index on status + created_at for performance

- [ ] **1.8** [DB] Create Document Lineage Table
  - **Action:** Create migration `005_lineage.sql` with immutable audit trail
  - **Validation:** Insert test events, attempt UPDATE - should fail if trigger prevents updates
  - **Security:** Add trigger to prevent UPDATE/DELETE on lineage records

- [ ] **1.9** [DB] Create User Consents Table
  - **Action:** Create migration `006_consents.sql`
  - **Validation:** Insert test consent, verify defaults applied
  - **Security:** Add RLS policy, user can only update their own consents

- [ ] **1.10** [DB] Create Credit Tracking Tables
  - **Action:** Create migration `007_credits.sql` with credit_pools and query_usage
  - **Validation:** Insert credit pool, run atomic decrement: `UPDATE credit_pools SET used_credits = used_credits + 5 WHERE tenant_id = $1 AND (total_credits - used_credits) >= 5 RETURNING *;` - verify fails if insufficient credits
  - **Security:** Use row-level locks to prevent race conditions

- [ ] **1.11** [DB] Create Storage Buckets with RLS
  - **Action:** Create buckets in Supabase: `tenant-uploads`, `tenant-documents`
  - **Validation:** Upload test file to bucket, verify RLS by trying to access with wrong tenant context
  - **Security:** Ensure bucket policies check tenant_id from file path (e.g., `tenant-{id}/file.pdf`)

- [ ] **1.12** [DB] Create Hybrid Search RPC Function
  - **Action:** Create SQL function `hybrid_search` combining vector + full-text search
  - **Validation:** Call function with dummy 3072-dimension vector and text query, verify returns ranked results with combined scores
  - **Security:** Ensure function respects RLS, add tenant_id filter

---

## Phase 2: API Foundation (Fastify)

### Project Setup

- [ ] **2.1** [API] Initialize Fastify Project
  - **Action:** Create `backend/` folder, `npm init`, install: fastify @fastify/cors @supabase/supabase-js dotenv zod pino
  - **Validation:** Create `server.ts` with `/health` endpoint, run `npm run dev`, curl returns 200
  - **Security:** Enable helmet plugin, configure CORS (no wildcard), add pino logger

- [ ] **2.2** [API] Setup Environment Configuration
  - **Action:** Create `.env.example` with all required vars, add `.env` to `.gitignore`
  - **Validation:** App fails to start if required env vars missing
  - **Security:** Never commit `.env`, document all vars in README

- [ ] **2.3** [API] Create Subdomain Resolution Middleware
  - **Action:** Create `middleware/tenantContext.ts` to extract `x-tenant-subdomain` header and resolve tenant_id
  - **Validation:** Send request with header, verify `request.tenant` populated, try invalid subdomain - returns 404
  - **Security:** Cache tenant lookups in memory (LRU, 5min TTL), sanitize subdomain input

- [ ] **2.4** [API] Create JWT Authentication Middleware
  - **Action:** Create `middleware/auth.ts` to verify Supabase JWT
  - **Validation:** Send request without token - 401, with invalid token - 401, with valid token - proceeds
  - **Security:** Verify signature, check expiry, validate issuer

- [ ] **2.5** [API] Create Tenant Membership Guard
  - **Action:** Create `middleware/membershipGuard.ts` to verify user belongs to tenant
  - **Validation:** Valid JWT + wrong subdomain = 403, valid JWT + correct subdomain = proceeds, super_admin bypasses check
  - **Security:** Query DB, don't trust client claims

- [ ] **2.6** [API] Implement In-Memory Rate Limiting
  - **Action:** Create `middleware/rateLimit.ts` using Map with sliding window
  - **Validation:** Spam endpoint 101 times in 10min, verify 429 on 101st request
  - **Security:** Implement by user_id + IP, add cleanup interval to prevent memory leak

- [ ] **2.7** [API] Create Credit Guard Middleware
  - **Action:** Create `middleware/creditGuard.ts` for AI endpoints
  - **Validation:** Set tenant credits to 0, call AI endpoint, verify blocked with clear error message
  - **Security:** Use atomic query, handle race conditions

### Authentication & Tenants

- [ ] **2.8** [API] Implement Signup Endpoint
  - **Action:** POST /api/auth/signup with transaction (create tenant, bucket, admin user)
  - **Validation:** Call endpoint, verify 3 DB inserts + 1 bucket created
  - **Security:** Validate email format, check subdomain uniqueness, hash password (done by Supabase Auth)

- [ ] **2.9** [API] Implement Login Endpoint
  - **Action:** POST /api/auth/login returning JWT
  - **Validation:** Login with valid creds returns token, invalid creds returns 401
  - **Security:** Rate limit to 5 attempts per 15min per IP

- [ ] **2.10** [API] Implement Session Info Endpoint
  - **Action:** GET /api/auth/me returning user + tenant
  - **Validation:** Returns correct user profile and tenant settings
  - **Security:** Requires valid JWT

- [ ] **2.11** [API] Implement Tenant Settings Update Endpoint
  - **Action:** PATCH /api/tenants/:id for updating settings (branding, preferences)
  - **Validation:** Non-admin cannot update, admin can update, settings persist
  - **Security:** Validate JSONB structure, prevent injection

### Document Management

- [ ] **2.12** [API] Implement Document List Endpoint
  - **Action:** GET /api/documents with filtering (parent_id, status)
  - **Validation:** Returns only tenant's documents, respects RLS
  - **Security:** Prevent SQL injection in filters, limit page size

- [ ] **2.13** [API] Implement Document Get Endpoint
  - **Action:** GET /api/documents/:id
  - **Validation:** Returns document if user has access, 404 if not found, 403 if wrong tenant
  - **Security:** Verify document belongs to user's tenant

- [ ] **2.14** [API] Implement Document Create Endpoint
  - **Action:** POST /api/documents creating draft
  - **Validation:** Document created with status='draft', lineage event created
  - **Security:** Validate input, set author_id from JWT

- [ ] **2.15** [API] Implement Document Update Endpoint
  - **Action:** PATCH /api/documents/:id for content and yjs_state
  - **Validation:** Content updates, updated_at changes, lineage event created
  - **Security:** Verify ownership, validate content size

- [ ] **2.16** [API] Implement Document Delete Endpoint
  - **Action:** DELETE /api/documents/:id (soft delete or hard delete based on requirements)
  - **Validation:** Document removed, cascade deletes embeddings
  - **Security:** Only author or admin can delete

- [ ] **2.17** [API] Implement Document Publish Endpoint
  - **Action:** POST /api/documents/:id/publish
  - **Validation:** Status changes to published, published_at set, lineage event created
  - **Security:** Check user role has publish permission

### Templates

- [ ] **2.18** [API] Implement Template List Endpoint
  - **Action:** GET /api/templates (global + tenant templates)
  - **Validation:** Returns approved global templates + tenant's own templates
  - **Security:** Filter by tenant_id OR tenant_id IS NULL

- [ ] **2.19** [API] Implement Template Create Endpoint
  - **Action:** POST /api/templates (admin only)
  - **Validation:** Template created with visibility setting
  - **Security:** Verify admin role, validate content

- [ ] **2.20** [API] Implement Template Use Endpoint
  - **Action:** POST /api/templates/:id/use to duplicate as new document
  - **Validation:** New document created as draft with copied content
  - **Security:** Verify template access, set new author_id

---

## Phase 3: Job Queue & Worker Infrastructure

### Worker Foundation

- [ ] **3.1** [Worker] Create Worker Entry Point
  - **Action:** Create `backend/worker.ts` with job polling loop
  - **Validation:** Worker starts, logs "Polling for jobs...", gracefully handles SIGTERM
  - **Security:** Validate job payload before processing

- [ ] **3.2** [Worker] Implement Job Claim Function
  - **Action:** Create `utils/claimJob.ts` with SKIP LOCKED logic
  - **Validation:** Start 2 workers, insert 1 job, verify only 1 worker claims it
  - **Security:** Use transactions, set worker_id

- [ ] **3.3** [Worker] Implement Job Dispatcher
  - **Action:** Create `utils/dispatchJob.ts` helper
  - **Validation:** Dispatch job from API, verify appears in queue with status='pending'
  - **Security:** Validate job type, sanitize payload

- [ ] **3.4** [Worker] Implement Job Completion Handlers
  - **Action:** Create `utils/completeJob.ts` and `utils/failJob.ts`
  - **Validation:** Worker completes job, status updates, result saved OR worker fails job, attempts incremented
  - **Security:** Store error details safely, don't expose sensitive data

- [ ] **3.5** [Infra] Create Fly.io Configuration
  - **Action:** Create `fly.toml` with processes: api (8080) and worker (no port)
  - **Validation:** `fly deploy` succeeds, both processes running in dashboard
  - **Security:** Set secrets via `fly secrets set`, never in fly.toml

- [ ] **3.6** [Infra] Create Multi-Stage Dockerfile
  - **Action:** Create Dockerfile with build and runtime stages
  - **Validation:** Docker build succeeds, image size < 500MB
  - **Security:** Use non-root user, copy only necessary files

---

## Phase 4: AI Provider Integration

### Provider Setup

- [ ] **4.1** [AI] Create AI Provider Router
  - **Action:** Create `services/ai/router.ts` routing based on tenant settings
  - **Validation:** Mock tenant with different ai_provider settings, verify correct provider selected
  - **Security:** Validate provider name, handle unknown providers

- [ ] **4.2** [AI] Install Token Counter
  - **Action:** Install tiktoken, create `utils/tokenCounter.ts`
  - **Validation:** Count tokens in sample text, verify matches OpenAI's calculator
  - **Security:** N/A

- [ ] **4.3** [AI] Implement Credit Calculator
  - **Action:** Create `utils/creditCalculator.ts` with pricing logic from PRD
  - **Validation:** Test scenarios: 50k tokens (1 credit), 250k tokens (2 credits), video 15min (3 credits), verify model multipliers
  - **Security:** Round up, never undercharge

- [ ] **4.4** [AI] Implement OpenAI Integration
  - **Action:** Create `services/ai/openai.ts` using api.eu.openai.com
  - **Validation:** Generate text with gpt-5.2, verify streaming works, confirm EU endpoint used
  - **Security:** Set timeout (30s), handle rate limits, retry on 429

- [ ] **4.5** [AI] Implement Anthropic Bedrock Integration
  - **Action:** Create `services/ai/anthropic.ts` via AWS Bedrock (eu-west-2)
  - **Validation:** Generate text with claude-sonnet-4.5, verify UK region used
  - **Security:** Use IAM roles, not access keys

- [ ] **4.6** [AI] Implement Vertex AI Integration
  - **Action:** Create `services/ai/vertex.ts` for gemini-3-flash (europe-west2)
  - **Validation:** Send test video URL, verify transcript returned
  - **Security:** Use service account, not API keys

---

## Phase 5: AI Features - Generation & Enhancement

### Document Generation

- [ ] **5.1** [API] Implement AI Generate Endpoint
  - **Action:** POST /api/ai/generate with credit check + job dispatch
  - **Validation:** Call endpoint, verify credits deducted, job queued, job_id returned
  - **Security:** Validate prompt length, check consent, rate limit

- [ ] **5.2** [Worker] Implement AI Generation Job Handler
  - **Action:** Create `workers/aiGeneration.ts`
  - **Validation:** Process job, verify document created as draft, lineage event created, query_usage logged
  - **Security:** Sanitize AI output before storing, handle timeouts

- [ ] **5.3** [API] Implement Job Status Polling Endpoint
  - **Action:** GET /api/jobs/:id
  - **Validation:** Poll job, verify status updates from pending→processing→completed
  - **Security:** Verify job belongs to user's tenant

### Enhancement

- [ ] **5.4** [API] Implement Document Enhance Endpoint
  - **Action:** POST /api/ai/enhance with <10s timeout
  - **Validation:** Returns completion score + suggestions in <10s, credits deducted
  - **Security:** Validate document ownership, handle AI errors gracefully

- [ ] **5.5** [API] Implement Apply Suggestion Endpoint
  - **Action:** POST /api/ai/enhance/:suggestionId/apply
  - **Validation:** Returns generated content for insertion
  - **Security:** Validate suggestion belongs to user's session

---

## Phase 6: Video & Document Ingestion

### Video Processing

- [ ] **6.1** [API] Implement Video Upload Endpoint
  - **Action:** POST /api/ai/video/upload with multipart form
  - **Validation:** File uploaded to Supabase Storage, job queued
  - **Security:** Validate file type (mp4, mov, avi), limit size (500MB), check mimetype

- [ ] **6.2** [Worker] Implement Gemini Video Ingestion Handler
  - **Action:** Create `workers/videoIngest.ts` with Gemini API integration
  - **Validation:** Process test video, verify transcript created, credits calculated correctly
  - **Security:** Delete video from storage after processing (configurable), handle API errors

- [ ] **6.3** [Worker] Implement Fallback yt-dlp + Whisper Handler
  - **Action:** Add fallback logic to `workers/videoIngest.ts`
  - **Validation:** Simulate Gemini failure, verify fallback executes, transcript still generated
  - **Security:** Validate video URL, prevent SSRF attacks

- [ ] **6.4** [API] Implement YouTube URL Endpoint
  - **Action:** POST /api/ai/video/youtube
  - **Validation:** Submit YouTube URL, job queued, verify URL validation
  - **Security:** Validate YouTube URL format, prevent injection

- [ ] **6.5** [Worker] Handle YouTube URLs in Video Ingest
  - **Action:** Update `workers/videoIngest.ts` to handle YouTube URLs
  - **Validation:** Process YouTube video, verify transcript generated
  - **Security:** Use Gemini native YouTube support, validate duration before processing

### Document Conversion

- [ ] **6.6** [API] Implement Document Import Endpoint
  - **Action:** POST /api/documents/import for PDF/DOCX/MD
  - **Validation:** Upload file, job queued, verify file stored
  - **Security:** Validate file type, scan for malware (if possible), limit size

- [ ] **6.7** [Worker] Implement PDF Conversion Handler
  - **Action:** Create `workers/documentConvert.ts` with pdf-parse
  - **Validation:** Convert test PDF, verify markdown output preserves structure
  - **Security:** Timeout after 60s, handle corrupted PDFs gracefully

- [ ] **6.8** [Worker] Implement DOCX Conversion Handler
  - **Action:** Add mammoth to `workers/documentConvert.ts`
  - **Validation:** Convert test DOCX, verify markdown preserves tables/headers
  - **Security:** Same as PDF

- [ ] **6.9** [API] Implement URL Scraping Endpoint
  - **Action:** POST /api/ai/scrape using Tavily API
  - **Validation:** Scrape test URL, verify markdown returned (not saved)
  - **Security:** Validate URL format, prevent SSRF, timeout after 10s

### Integration Placeholders

- [ ] **6.10** [API] Create Integration Import Stubs
  - **Action:** Create POST /api/integrations/{notion,confluence,gdocs}/import endpoints returning 501
  - **Validation:** Call endpoints, verify 501 Not Implemented returned
  - **Security:** Add authentication checks (deferred to Milestone 3)

---

## Phase 7: RAG Pipeline

### Chunking & Embedding

- [ ] **7.1** [Worker] Implement 4-Pass Chunking Algorithm
  - **Action:** Create `services/chunking/fourPass.ts` with structure→semantic→merge→prefix logic
  - **Validation:** Unit test with complex markdown (multiple H1/H2/H3, tables), verify chunks have hierarchical prefixes, no chunk > 1000 words
  - **Security:** N/A

- [ ] **7.2** [Worker] Implement RAG Index Job Handler
  - **Action:** Create `workers/ragIndex.ts` calling chunking + OpenAI embeddings
  - **Validation:** Index test document, verify document_embeddings populated, last_indexed_at updated
  - **Security:** Batch API calls (max 100 chunks), handle rate limits

- [ ] **7.3** [API] Auto-Index on Document Save
  - **Action:** Update PATCH /api/documents/:id to dispatch rag_index job
  - **Validation:** Edit document, verify job queued, embeddings regenerated
  - **Security:** Prevent duplicate jobs (check if job already pending)

### Retrieval & Chat

- [ ] **7.4** [API] Implement RAG Chat Endpoint
  - **Action:** POST /api/ai/chat with full RAG pipeline
  - **Validation:** Ask question, verify: query embedded, hybrid_search called, reranking called, response streamed with citations
  - **Security:** Check knowledge_indexing consent, rate limit (10 req/min)

- [ ] **7.5** [API] Implement Reranking with Fallback
  - **Action:** Add AWS Bedrock Cohere Rerank with fallback to vector-only
  - **Validation:** Simulate Bedrock failure, verify fallback to top 10 from vector search, response still generated
  - **Security:** Timeout reranking after 2s

- [ ] **7.6** [API] Implement Query Workspace Endpoint
  - **Action:** GET /api/documents/:id/normalized
  - **Validation:** Fetch normalized markdown, verify matches documents.content
  - **Security:** Verify document ownership

### Index Health

- [ ] **7.7** [API] Implement Index Health Endpoint
  - **Action:** GET /api/sources/health
  - **Validation:** Returns stats: total docs, indexed, outdated, failed, with list of docs needing re-index
  - **Security:** Tenant-scoped query

- [ ] **7.8** [API] Implement Manual Re-Index Endpoint
  - **Action:** POST /api/sources/:id/reindex
  - **Validation:** Dispatch job, verify job queued
  - **Security:** Admin only, prevent spam re-indexing

---

## Phase 8: Real-Time Collaboration (Hocuspocus)

### Hocuspocus Setup

- [ ] **8.1** [Collab] Create Separate Fly.io App
  - **Action:** Create new Fly.io app `tynebase-collab` in lhr region
  - **Validation:** App created, deployed, accessible on port 8081
  - **Security:** Separate app isolates WebSocket traffic

- [ ] **8.2** [Collab] Initialize Hocuspocus Server
  - **Action:** Create `collab-server.ts` with @hocuspocus/server
  - **Validation:** Connect via WebSocket client, verify connection accepted
  - **Security:** Require authentication (next task)

- [ ] **8.3** [Collab] Implement Authentication Hook
  - **Action:** Add onAuthenticate hook verifying JWT + document access
  - **Validation:** Connect with invalid token - rejected, valid token + wrong document - rejected, valid token + correct document - accepted
  - **Security:** Query DB for document ownership, don't trust client

- [ ] **8.4** [Collab] Implement Load Document Hook
  - **Action:** Add onLoadDocument hook fetching yjs_state from DB
  - **Validation:** Connect to existing document, verify content loaded
  - **Security:** Verify tenant isolation

- [ ] **8.5** [Collab] Implement Store Document Hook
  - **Action:** Add onStoreDocument with 2s debounce, Y.js→Markdown conversion
  - **Validation:** Edit document via WebSocket, wait 2s, verify: yjs_state saved, content updated, updated_at changed
  - **Security:** Prevent race conditions with locking

- [ ] **8.6** [Collab] Trigger Re-Index on Significant Changes
  - **Action:** Add logic to dispatch rag_index job if content length changed >10%
  - **Validation:** Make large edit, verify re-index job queued
  - **Security:** Prevent index spam on every keystroke

---

## Phase 9: Super Admin Dashboard

### Admin Endpoints

- [ ] **9.1** [API] Create Super Admin Guard Middleware
  - **Action:** Create `middleware/superAdminGuard.ts`
  - **Validation:** Non-super-admin gets 403, super-admin proceeds
  - **Security:** Check is_super_admin flag, log all super admin actions

- [ ] **9.2** [API] Implement Platform Overview Endpoint
  - **Action:** GET /api/superadmin/overview with aggregate stats
  - **Validation:** Returns counts matching DB queries
  - **Security:** Super admin only

- [ ] **9.3** [API] Implement Tenant List Endpoint
  - **Action:** GET /api/superadmin/tenants with pagination
  - **Validation:** Returns all tenants with stats (users, docs, credits)
  - **Security:** Super admin only, add pagination (100 per page)

- [ ] **9.4** [API] Implement Impersonation Endpoint
  - **Action:** POST /api/superadmin/impersonate/:tenantId
  - **Validation:** Returns short-lived JWT (1hr), use JWT to access tenant data successfully
  - **Security:** Log impersonation events, add expiry claim to JWT

- [ ] **9.5** [API] Implement Tenant Suspend Endpoint
  - **Action:** POST /api/superadmin/tenants/:id/suspend
  - **Validation:** Tenant status updated, subsequent API calls blocked
  - **Security:** Add unsuspend endpoint, log suspension events

  - [ ] **9.6** [API] Implement Change Tier Endpoint
  - **Action:** PATCH /api/superadmin/tenants/:id/tier
  - **Validation:** Tier updated, credit_pools.total_credits recalculated
  - **Security:** Validate tier value, prevent downgrade if overdrawn

---

## Phase 10: GDPR & Compliance

### User Rights

- [ ] **10.1** [API] Implement Data Export Endpoint
  - **Action:** GET /api/gdpr/export generating JSON export
  - **Validation:** Returns complete user data (profile, documents, usage), download succeeds
  - **Security:** Verify user identity, include audit trail in export

- [ ] **10.2** [API] Implement Account Deletion Endpoint
  - **Action:** DELETE /api/gdpr/delete-account dispatching deletion job
  - **Validation:** User marked deleted, job queued, after job: data anonymized/removed
  - **Security:** Irreversible operation, require confirmation token

- [ ] **10.3** [Worker] Implement GDPR Deletion Job Handler
  - **Action:** Create `workers/gdprDelete.ts` anonymizing user data
  - **Validation:** Process deletion job, verify user data removed but documents preserved (anonymized)
  - **Security:** Log deletion permanently, comply with retention policies

- [ ] **10.4** [API] Implement Consent Update Endpoint
  - **Action:** PATCH /api/user/consents
  - **Validation:** Consent updated, AI features blocked if ai_processing=false
  - **Security:** Validate consent types, audit consent changes

---

## Phase 11: Image/Video Embeds in Documents

### Asset Management

- [ ] **11.1** [API] Implement Asset Upload Endpoint
  - **Action:** POST /api/documents/:id/upload for images/videos
  - **Validation:** Upload image, verify stored in tenant-documents bucket, signed URL returned
  - **Security:** Validate file type, scan for malware, limit size (10MB images, 50MB videos)

- [ ] **11.2** [API] Implement Asset List Endpoint
  - **Action:** GET /api/documents/:id/assets
  - **Validation:** Lists all assets for document
  - **Security:** Verify document ownership

- [ ] **11.3** [API] Implement Asset Delete Endpoint
  - **Action:** DELETE /api/documents/:id/assets/:assetId
  - **Validation:** Asset removed from storage
  - **Security:** Verify document ownership, prevent orphaned assets

---

## Phase 12: Logging & Monitoring

### Observability

- [ ] **12.1** [Infra] Setup Axiom Integration
  - **Action:** Install axiom transport, configure pino to send logs
  - **Validation:** Trigger API calls, verify logs appear in Axiom dashboard within 10s
  - **Security:** Redact sensitive fields (passwords, tokens) from logs

- [ ] **12.2** [API] Add Request Logging Middleware
  - **Action:** Log all requests with: method, path, user_id, tenant_id, duration, status
  - **Validation:** Make API calls, verify logs include all fields
  - **Security:** Exclude /health from logs, redact Authorization header

- [ ] **12.3** [Worker] Add Job Performance Logging
  - **Action:** Log job start, completion, duration, result size
  - **Validation:** Process jobs, verify logs include metrics
  - **Security:** Log failures with error details (sanitized)

- [ ] **12.4** [API] Add Error Logging with Context
  - **Action:** Create error handler logging stack traces + context
  - **Validation:** Trigger error, verify log includes user context, not exposed to client
  - **Security:** Never expose internal errors to clients, return generic 500 message

---

## Phase 13: Final Integration & Testing

### End-to-End Validation

- [ ] **13.1** [E2E] Test Complete Signup → Generation Flow
  - **Action:** Script: signup → login → create document → AI generate → verify document created
  - **Validation:** Full flow succeeds, all lineage events recorded
  - **Security:** Verify RLS enforced at each step

- [ ] **13.2** [E2E] Test Video Ingestion Flow
  - **Action:** Upload video → verify transcript → check credits deducted
  - **Validation:** Full flow succeeds, document created with transcript
  - **Security:** Verify file cleanup, no orphaned data

- [ ] **13.3** [E2E] Test RAG Chat Flow
  - **Action:** Index documents → ask questions → verify answers use correct context
  - **Validation:** Responses cite correct sources, reranking improves results
  - **Security:** Verify tenant isolation (no cross-tenant data leakage)

- [ ] **13.4** [E2E] Test Real-Time Collaboration
  - **Action:** Connect 2 clients to same document, type simultaneously
  - **Validation:** Both see each other's changes, no conflicts, persists after disconnect
  - **Security:** Verify authentication on connect

- [ ] **13.5** [E2E] Test Super Admin Functions
  - **Action:** Impersonate tenant → suspend tenant → verify blocked
  - **Validation:** All admin functions work, audit trail recorded
  - **Security:** Verify non-admin cannot access admin endpoints

### Performance & Security Audit

- [ ] **13.6** [Audit] Performance Baseline
  - **Action:** Benchmark key endpoints (document CRUD, RAG query, AI generation)
  - **Validation:** P95 latency < 500ms for CRUD, < 5s for RAG, document results
  - **Security:** N/A

- [ ] **13.7** [Audit] Security Review
  - **Action:** Review all endpoints for: SQL injection, XSS, CSRF, auth bypass, RLS gaps
  - **Validation:** No vulnerabilities found, document findings
  - **Security:** Run automated scanner (npm audit, Snyk)

- [ ] **13.8** [Audit] Database Performance Review
  - **Action:** Check slow queries, missing indexes, large tables
  - **Validation:** All queries < 100ms, indexes exist on foreign keys
  - **Security:** N/A

### Documentation

- [ ] **13.9** [Docs] Create API Documentation
  - **Action:** Generate OpenAPI spec, document all endpoints
  - **Validation:** Spec is valid, examples work
  - **Security:** Mark which endpoints require auth/admin

- [ ] **13.10** [Docs] Create Deployment Guide
  - **Action:** Document Fly.io deployment steps, env vars, secrets
  - **Validation:** Fresh deploy following guide succeeds
  - **Security:** Document secret rotation process

- [ ] **13.11** [Docs] Create Runbook
  - **Action:** Document common issues, debugging steps, rollback procedure
  - **Validation:** Runbook is complete and clear
  - **Security:** Include incident response procedures

---

## ✅ Milestone 2 Acceptance Criteria

Verify ALL of these before marking Milestone 2 complete:

- [ ] Fly.io API server responding at api.tynebase.com with SSL
- [ ] Users can signup, login, create tenants
- [ ] Documents CRUD functional with RLS enforced
- [ ] TipTap real-time collaboration works (Hocuspocus)
- [ ] AI generation from prompts creates documents (async)
- [ ] Video ingestion (YouTube + upload) produces transcripts
- [ ] PDF/DOCX uploads convert to markdown
- [ ] URL scraping returns markdown
- [ ] RAG chat retrieves relevant context with reranking
- [ ] Enhance provides completion scores + suggestions
- [ ] Templates can be created, used, edited before saving
- [ ] Credits deduct per action, overdraft blocked
- [ ] Document lineage tracks all events
- [ ] Super admin dashboard functional (stats, impersonate, suspend)
- [ ] GDPR export and deletion work
- [ ] All logs streaming to Axiom
- [ ] Job queue processing all task types
- [ ] No security vulnerabilities (audit passed)
- [ ] Performance benchmarks met
- [ ] Documentation complete
---  
## Phase 14: Deferred Product-Surface Features (Post–Milestone 2)

> These features are **explicitly NOT part of Milestone 2**.  
> They MUST NOT be partially implemented.  
> They exist here to preserve architectural intent and prevent future rewrites.

### Collaboration & Communication

- [ ] **14.1** [API] Implement Commenting & Discussion Threads  
  - **Action:** Create thread + message models linked to documents and/or blocks  
  - **Validation:** Threads attach correctly, messages ordered, permissions enforced  
  - **Security:** Enforce document RLS, prevent cross-tenant mentions

- [ ] **14.2** [System] Emit Mention Events  
  - **Action:** Emit events for @mentions in documents/comments  
  - **Validation:** Events recorded in event_log with actor + target  
  - **Security:** No notification delivery in this phase

---

### Notifications & Delivery

- [ ] **14.3** [Worker] Implement Notification Delivery System  
  - **Action:** Deliver notifications via in-app and email channels  
  - **Validation:** Notifications delivered respecting user preferences  
  - **Security:** Rate-limit delivery, prevent data leakage across tenants

---

### Search & Discovery

- [ ] **14.4** [API] Implement Global / Cross-Entity Search  
  - **Action:** Unified search across documents, templates, users, discussions  
  - **Validation:** Results filtered by tenant, role, and object visibility  
  - **Security:** Enforce object-level permissions on all results

---

### User & Org Lifecycle

- [ ] **14.5** [API] Implement User Invitations & Onboarding  
  - **Action:** Invite users via tokenized email links with role assignment  
  - **Validation:** User joins tenant with correct role after acceptance  
  - **Security:** Expiring tokens, audit all invites and accepts

---

### Editorial Control

- [ ] **14.6** [Workflow] Implement Approval & Publishing States  
  - **Action:** Draft → Review → Approved → Published state machine  
  - **Validation:** Only authorized roles can transition states  
  - **Security:** Immutable audit trail for all transitions

---

### Analytics & Insights

- [ ] **14.7** [Analytics] Implement Content Usage & Health Metrics  
  - **Action:** Aggregate query hits, freshness, and coverage gaps  
  - **Validation:** Metrics computed correctly per tenant  
  - **Security:** Tenant-isolated analytics only

---

### Version Intelligence

- [ ] **14.8** [API/UX] Implement Document Diffing & Restore  
  - **Action:** Visual diff between versions + restore endpoint  
  - **Validation:** Restored version matches historical snapshot  
  - **Security:** Preserve lineage, prevent destructive overwrites

---

## Promotion Rule

- Phase 14 items may only be promoted when a new milestone is declared
- No Phase 14 schema, API, or worker may be implemented implicitly
- Any early dependency must be explicitly justified in a PRD


---

## 🚨 Emergency Contacts

If you encounter a blocker that cannot be resolved:
1. Mark task with [!] flag
2. Create detailed blocker report in execution_summary
3. STOP and notify supervisor
4. DO NOT proceed to next task

---

**Last Updated:** [AI will update this timestamp]  
**Current Task:** None (awaiting start command)

---

**Remember:** You are building a production system handling sensitive data. Security and data integrity are non-negotiable. When in doubt, stop and ask.