# Mama Africa AI

Centralised AI backend for the Mama Africa website, plus a React admin console.

The AI is **not** embedded in the website. The website is a client that calls one endpoint —
`POST /api/chat`. Language detection, knowledge retrieval, prompt construction, model calls and
conversation storage all happen server-side. The website never talks to Ollama or RunPod.

```
Mama Africa Website ──► Spring Boot REST API ──► AI Service ──┬── Ollama / Gemma 3 1B   (development)
                                                              └── RunPod / Gemma 3 12B  (production)
```

## Layout

| Path            | What it is                                             |
|-----------------|--------------------------------------------------------|
| `backend/`      | Java 21 · Spring Boot 3 · PostgreSQL · LangChain4j      |
| `docker-compose.yml` | PostgreSQL, Qdrant and the backend                |
| `admin-console/`| React 19 · TypeScript · Tailwind v4 · React Query       |

## Modules

Signing in to the console lands on a launcher with one card per module rather than a single
sidebar mixing three unrelated jobs.

| Module | Prefix     | What it owns                                                  |
|--------|------------|---------------------------------------------------------------|
| Mama Africa AI      | `/ai`      | Knowledge base, conversations, analytics, model settings |
| Mama Africa Market  | `/market`  | Products, bundles, promotions — the website's shop       |
| Mama Africa Culture | `/culture` | Stories, proverbs, visitor submissions, subscribers      |

## Phases

| Phase | Scope                                             | Status |
|-------|---------------------------------------------------|--------|
| 1     | Project setup, authentication, chat API, Ollama   | ✅ done |
| 2     | Knowledge base, Qdrant, RAG                       | ✅ done |
| 3     | React admin console                               | ✅ done |
| 4     | Analytics, AI settings, production configuration  | ✅ done |

## Running locally

**1. Ollama** (on the host, not in Docker)

```bash
ollama pull gemma3:1b
ollama serve            # http://localhost:11434
```

**2. PostgreSQL**

```bash
cd mama-africa-ai
cp .env.example .env
docker compose up -d postgres qdrant
```

Your `.env` uses `DB_PORT=5435` because 5432–5434 are already taken by other containers on this
machine. Change it to 5432 anywhere that port is free.

**3. Backend**

```bash
cd backend
DB_PORT=5435 mvn spring-boot:run     # mvn does not read .env, so pass non-default ports through
```

- API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- Health: http://localhost:8080/actuator/health

Everything in Docker instead: `docker compose up --build`.

## Admin console

```bash
cd admin-console
npm install
npm run dev            # http://localhost:3000
```

Vite proxies `/api` to `http://localhost:8080`, so there is no CORS setup in development. Sign in with
`ADMIN_EMAIL` / `ADMIN_PASSWORD`.

| Page           | What it does                                                                     |
|----------------|-----------------------------------------------------------------------------------|
| Dashboard      | totals, live model-reachability probe, current model/provider, recent conversations |
| Knowledge Base | upload, view extracted text, rename/re-categorise, re-index, delete, semantic search |
| Conversations  | search, filter by language, read full transcripts, delete                          |
| Analytics      | daily activity, language mix, response-time percentiles, knowledge breakdowns      |
| AI Settings    | edit the model, prompt and retrieval settings live; category CRUD                  |
| Users          | admin account CRUD — super admins only                                             |
| Profile        | your details and password change                                                   |

Dark and light themes, keyboard-dismissable modals, and a mobile nav below `md`. The document list
polls while anything is indexing and stops once everything settles.

For production: `npm run build` emits a static bundle to `dist/`. Set `VITE_API_BASE_URL` to the
backend origin (the dev proxy does not exist in a built bundle) and add that origin to
`CORS_ALLOWED_ORIGINS` on the backend. There is also an nginx image:

```bash
VITE_API_BASE_URL=https://ai.example.com docker compose --profile console up --build
```

`VITE_API_BASE_URL` is inlined at build time, so it is a build argument rather than a runtime
variable — rebuild the image to point it somewhere else.

## Changing the AI without a restart

`AI Settings` writes to the database, and the chat pipeline reads from it on the next request —
the model client is rebuilt automatically when the provider, URL, model, temperature or token
limit changes. Editable there: provider, provider URL, model, temperature, max tokens, system
prompt, RAG on/off, chunk size and overlap, max results and minimum score. Only a **super admin**
may save; ordinary admins see the values read-only.

Two things stay in the environment on purpose:

- **API keys and the request timeout** — secrets do not belong in a settings table.
- **The embedding provider and Qdrant collection** — a collection's vector size is fixed when it
  is created, so changing the embedding model needs a re-index against a new collection.

On first start the row is seeded from the `AI_*` and `RAG_*` variables, so a fresh deployment
behaves exactly as configured. From then on the database wins. **Reset to environment** discards
every change and restores those variables.

After changing chunk size or overlap, run `POST /api/knowledge/reindex` — existing chunks were
split with the old settings.

## Analytics

`GET /api/analytics?days=30` (1–365) returns totals, a per-day activity series with no gaps,
response-time percentiles, and breakdowns by language, document status, category and model.
Percentiles are nearest-rank over every answer in the window.

## Switching to production

Only environment variables change — no Java code, no rebuild of the application logic.

| Variable       | Development             | Production                     |
|----------------|-------------------------|--------------------------------|
| `AI_PROVIDER`  | `OLLAMA`                | `OPENAI`                       |
| `AI_BASE_URL`  | `http://localhost:11434`| `https://<runpod-endpoint>/v1` |
| `AI_MODEL`     | `gemma3:1b`             | `google/gemma-3-12b-it`        |
| `AI_API_KEY`   | *(blank)*               | your RunPod key                |

`OPENAI` means "any OpenAI-compatible server" — which is what vLLM and TGI expose on RunPod.

## API

### `POST /api/chat` — the only endpoint the website calls

```json
{ "message": "Tell me about Ghana", "language": "English", "conversationId": null }
```

```json
{
  "response": "Ghana is a West African country …",
  "conversationId": "8f14e45f-ceea-467a-9c9e-1a2b3c4d5e6f",
  "language": "ENGLISH",
  "model": "gemma3:1b",
  "latencyMs": 1840,
  "timestamp": "2026-08-03T10:15:30Z"
}
```

`language` is optional — English, French, Spanish and Twi are detected automatically. Pass
`conversationId` from a previous response to continue a conversation.

### `POST /api/chat/stream`

Same request body, server-sent events out: `token` events carry text chunks, a final `done`
event carries the full response object.

### Admin endpoints (JWT required)

| Endpoint                          | Purpose                                    |
|-----------------------------------|--------------------------------------------|
| `POST /api/auth/login`            | email + password → JWT                     |
| `GET  /api/auth/me`               | current admin profile                      |
| `GET  /api/conversations`         | list / search (paged)                      |
| `GET  /api/conversations/{id}`    | full transcript                            |
| `DELETE /api/conversations/{id}`  | delete                                     |
| `POST /api/knowledge`             | upload PDF / DOCX / TXT / Markdown         |
| `GET  /api/knowledge`             | list, filter by title and category         |
| `GET  /api/knowledge/search`      | semantic search over indexed chunks        |
| `GET  /api/knowledge/{id}`        | metadata + extracted text                  |
| `PUT  /api/knowledge/{id}`        | rename / re-categorise (re-indexes)        |
| `POST /api/knowledge/{id}/reindex`| re-chunk and re-embed one document         |
| `POST /api/knowledge/reindex`     | re-index everything                        |
| `DELETE /api/knowledge/{id}`      | delete document and its vectors            |
| `GET/POST/PUT/DELETE /api/categories` | category CRUD                          |
| `GET  /api/dashboard`             | totals, model status, recent activity      |
| `GET  /api/analytics?days=30`     | usage, latency and knowledge breakdowns    |
| `GET  /api/settings`              | effective AI configuration                 |
| `PUT  /api/settings`              | change it live — super admin only          |
| `POST /api/settings/reset`        | restore the environment values             |
| `GET/POST/PUT/DELETE /api/users`  | admin accounts — super admin only          |
| `PUT  /api/auth/password`         | change your own password                   |

## Mama Africa Market

The shop used to live in the website's source as a hand-maintained `src/data/products.js`.
It is now in PostgreSQL, and the console owns it. Migration `V5__market_seed.sql` carries the
90 products, 1 bundle and the announcement strip across exactly as they were.

Product images are **web paths**, not blobs. The files stay in the website's `public/images`
and keep being served as static assets; the database stores `/images/…` strings. Point
`MARKET_IMAGE_ROOT` at that folder and the product editor offers a picker over it — read-only,
and the only thing that variable is used for. Leave it blank and you type paths by hand.

`legacy_id` keeps the numeric ids the website used, so existing `/product/:id` links resolve.
New code should prefer the slug.

### Storefront API — public, read-only

| Endpoint                                | Purpose                                    |
|-----------------------------------------|--------------------------------------------|
| `GET /api/storefront/catalog`           | active products, bundles and live promotions in one payload |
| `GET /api/storefront/products`          | active products only                       |
| `GET /api/storefront/products/{slugOrId}` | one product, by slug or legacy numeric id |
| `GET /api/storefront/bundles`           | active bundles                             |
| `GET /api/storefront/promotions`        | promotions live right now                  |

Open, because it renders the shop to anonymous visitors. Inactive products are invisible here —
a draft cannot be reached by guessing its URL. Writes live under `/api/market/**` and need a JWT.

A promotion shows on the website only when it is active **and** the clock falls inside
`[starts_at, ends_at]`; either bound may be null for open-ended. The console's Overview warns
when every promotion has fallen out of its window, which otherwise fails silently.

The catalogue is sent with `Cache-Control: no-cache` plus an ETag, not a max-age. An admin's
edit has to be visible on the next page load — that is the entire point of moving the shop into
the console — and the ETag makes the resulting revalidation a 304 with no body whenever nothing
has changed.

### The website side

`src/contexts/CatalogContext.js` fetches `/api/storefront/catalog` once and serves every store
screen from it; `src/data/products.js` is gone. `StorefrontProduct` mirrors the shape that file
used to export, so the store components did not have to be rewritten.

Store screens show a loading state and, if the API is unreachable, an explicit "shop is not
available" message with a retry — never an empty grid, which reads as "sold out of everything".

## The site guide

`backend/src/main/resources/knowledge/site-guide.md` is the assistant's reference for questions
about the website itself — delivery times, certificates, accounts, sizes, the culture pages.
`SiteGuideSeeder` loads it into the knowledge base on first start and indexes it, so a fresh
deployment answers site questions without anyone remembering to upload anything.

It is matched by file name and never overwritten, so edits made in the console survive
restarts. Delete it in the console and restart to restore the shipped version.

This is what makes the support modal's **Ask Afia** tab useful: most people opening support have
a question the site already answers.

## Knowledge base and RAG

Upload → extract text → chunk → embed → store in Qdrant. Extracted text is kept in PostgreSQL so
documents can be re-indexed without re-uploading the file.

Indexing runs on a background thread, triggered *after* the upload transaction commits. Progress
shows as `PENDING → INDEXING → INDEXED` (or `FAILED` with a message) on the document.

Ten categories are seeded by migration: History, Culture, Kingdoms, Tourism, Languages, Museums,
Music, Store Products, FAQs, Blog. Add your own through `/api/categories`.

At chat time the pipeline runs a similarity search and injects the best chunks into the system
prompt. Retrieval never breaks a conversation: if Qdrant is unreachable or nothing scores above
`RAG_MIN_SCORE`, the chat proceeds on the model's general knowledge, exactly as the system prompt
instructs.

### Embeddings

| Variable             | Default      | Notes                                                       |
|----------------------|--------------|-------------------------------------------------------------|
| `EMBEDDING_PROVIDER` | `IN_PROCESS` | all-MiniLM-L6-v2 as ONNX inside the JVM, 384 dims, offline  |
| `EMBEDDING_BASE_URL` | Ollama URL   | used by `OLLAMA` / `OPENAI`                                 |
| `EMBEDDING_MODEL`    | `nomic-embed-text` | used by `OLLAMA` / `OPENAI`                           |

`IN_PROCESS` needs no extra service and behaves identically in development and production. If you
switch providers, **re-index everything** — a Qdrant collection's vector size is fixed at creation,
and the backend refuses to start on a dimension mismatch rather than corrupting search silently.

### Tuning

`RAG_ENABLED`, `RAG_CHUNK_SIZE` (900), `RAG_CHUNK_OVERLAP` (150), `RAG_MAX_RESULTS` (5),
`RAG_MIN_SCORE` (0.6). After changing chunk settings, call `POST /api/knowledge/reindex`.

Roles: `ADMIN`, `SUPER_ADMIN`. A super admin is created on first start from `ADMIN_EMAIL` /
`ADMIN_PASSWORD` — change the password immediately outside development.

### Protecting the public endpoint

`/api/chat` is open while `PUBLIC_API_KEY` is blank, which keeps local development simple. Set it
in production and have the website send the value as an `X-Api-Key` header.

## Calling it from the website

```js
const res = await fetch(`${API_URL}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message, conversationId }),
});
const { response, conversationId: id } = await res.json();
```

## Tests

```bash
cd backend && mvn test
```

Tests run against in-memory H2 with the chat model and Qdrant mocked, so no database, Ollama or
network is needed. The embedding model is the real in-process one, so chunking and embedding are
genuinely exercised.

One caveat: H2 does not catch every PostgreSQL difference. A null-string parameter inside
`LOWER(?)` passes on H2 and fails on PostgreSQL, so run the app against the real database before
shipping repository changes. Adding Testcontainers would close this gap if the tests ever earn it.

## Deploying

Run with `SPRING_PROFILES_ACTIVE=prod`. That profile turns off Swagger and the api-docs endpoint,
trims actuator to `health`, stops logging prompts and completions, and honours forwarded headers
from a TLS-terminating proxy.

`ProductionSafetyCheck` then refuses to start if any development placeholder is still in place:

| Refuses to start when | Set instead |
|-----------------------|-------------|
| `JWT_SECRET` is the default, or under 32 characters | a random 32+ character secret |
| `ADMIN_PASSWORD` is still `ChangeMe123!` | a real password |
| `PUBLIC_API_KEY` is blank | a key the website sends as `X-Api-Key` |
| `CORS_ALLOWED_ORIGINS` still contains `localhost` | your real site origins |

This is deliberately loud: each of those works silently in development and quietly compromises a
live deployment.

### Deployment checklist

1. Point `AI_PROVIDER`, `AI_BASE_URL`, `AI_MODEL` and `AI_API_KEY` at RunPod.
2. Set `JWT_SECRET`, `ADMIN_PASSWORD`, `PUBLIC_API_KEY` and `CORS_ALLOWED_ORIGINS`.
3. `SPRING_PROFILES_ACTIVE=prod docker compose up -d --build`.
4. Sign in, change the bootstrap admin password, and delete any unused account.
5. Upload the knowledge base and confirm `Analytics` starts recording traffic.
