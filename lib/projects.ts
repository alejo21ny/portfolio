import type { Project } from "./types";

// Source of truth for every claim below is that project's own repository —
// README, docs/, ADRs, schema and PR descriptions. Numbers are quoted only
// where the repo itself states them. Client work is described without the
// client's brand until they approve being named publicly.
export const PROJECTS: Project[] = [
  {
    slug: "hospitality-platform",
    name: "Hospitality Booking Platform",
    label: "Direct-booking operating platform · client work",
    category: "Platform",
    status: "Staging",
    year: "2026",
    featured: true,
    privateRepo: true,
    summary:
      "A full operating platform for a vacation-rental business: bilingual booking site, double-booking-proof reservation engine, guest portal with online check-in and e-signature, payments, channel sync, loyalty and an MFA-protected back office.",
    problem:
      "The business ran on a template-only WordPress site with no working reservations. Every booking, payment, guest registration and agreement was handled by hand, across channels that could double-book the same unit.",
    solution:
      "One system for the whole stay. A Postgres-enforced booking engine, a webhook-only payment confirmation path, a guest portal with OTP sign-in, document upload and signed PDF agreements, channel reconciliation with a conflict queue, and an admin back office with five RBAC roles. Every external dependency sits behind a swappable adapter, and the app refuses to boot in an unsafe production configuration.",
    tags: ["Next.js 16", "PostgreSQL", "Drizzle", "Cloudflare Workers", "PayU", "R2", "Playwright", "21 ADRs"],
    stack: [
      { group: "Frontend", items: ["Next.js 16 (App Router, Server Actions)", "React 19", "Tailwind CSS 4", "ES/EN i18n"] },
      { group: "Backend", items: ["Service + domain layers", "pdf-lib signed artifacts", "TOTP MFA", "Postgres rate limiter"] },
      { group: "Data", items: ["PostgreSQL", "Drizzle ORM", "btree_gist EXCLUDE constraints", "Advisory locks"] },
      { group: "Infra", items: ["Cloudflare Workers (OpenNext)", "Private R2 buckets", "Neon", "Resend"] },
      { group: "Quality", items: ["Vitest on real Postgres", "Playwright + axe", "GitHub Actions", "CI secret scan"] },
    ],
    metrics: [
      { value: "723", label: "DB / integration tests passing" },
      { value: "165", label: "end-to-end tests passing" },
      { value: "57", label: "tables, 23 migrations" },
      { value: "21", label: "architecture decision records" },
    ],
    architecture: {
      lanes: [
        { name: "Clients", nodes: [{ label: "Guest site", detail: "search · checkout" }, { label: "Guest portal", detail: "my stays · check-in" }, { label: "Admin back office", detail: "OTP + TOTP MFA" }] },
        { name: "Edge", nodes: [{ label: "proxy.ts", detail: "locale + per-request CSP nonce" }, { label: "Production guard", detail: "refuses unsafe config at boot" }] },
        { name: "Application", nodes: [{ label: "Server Actions" }, { label: "Services" }, { label: "Domain layer", detail: "holds · payments · channels · loyalty" }] },
        { name: "Data", nodes: [{ label: "PostgreSQL", detail: "EXCLUDE constraints" }, { label: "R2 (private)", detail: "documents · signed PDFs" }, { label: "Audit log" }] },
        { name: "Providers", nodes: [{ label: "Payment adapters", detail: "PayU · sandbox" }, { label: "Channel adapters", detail: "direct · iCal · sandbox" }, { label: "Email (Resend)" }] },
      ],
      flows: [
        "Checkout → hosted payment page → signed webhook is the only path that confirms a reservation",
        "Channel webhook / poll → reconcile → stays or a conflict queue for admins",
        "Every mutation → audit_events with a correlation id",
        "iCal fetches pass an SSRF guard (private IPs blocked, 10s timeout, 2MB cap)",
      ],
    },
    workflows: [
      {
        title: "Search → hold → reservation → payment confirmation",
        summary: "A unit can never be sold twice — enforced by the database, not by application logic alone.",
        steps: [
          { label: "Guest picks dates", detail: "server-side quote from rate rules + promotions", kind: "user" },
          { label: "Create hold", detail: "advisory lock per unit, 10-min TTL, idempotency key", kind: "guard" },
          { label: "EXCLUDE constraint", detail: "overlapping holds/stays rejected by Postgres", kind: "data" },
          { label: "Reservation pending", detail: "non-guessable confirmation code", kind: "auto" },
          { label: "Hosted checkout", detail: "no card data touches the platform", kind: "external" },
          { label: "Verified webhook", detail: "signature, dedupe, amount + currency cross-check", kind: "guard" },
          { label: "Confirmed", detail: "mismatches open a reconciliation issue instead", kind: "auto" },
        ],
      },
      {
        title: "Guest portal → online check-in → e-signature",
        steps: [
          { label: "Email OTP", detail: "scrypt-hashed code, 5 attempts, rate-limited", kind: "guard" },
          { label: "My stays", detail: "ownership checks (IDOR-tested)", kind: "user" },
          { label: "Guest roster", detail: "capacity enforced server-side", kind: "auto" },
          { label: "Document upload", detail: "opaque keys in private R2", kind: "data" },
          { label: "Signing OTP + signature", detail: "pinned to an immutable agreement version", kind: "guard" },
          { label: "Signed PDF + evidence", detail: "SHA-256 of source and final document", kind: "auto" },
        ],
      },
      {
        title: "Channel sync → reconciliation → conflicts",
        steps: [
          { label: "Poll or webhook", detail: "256KB cap, adapter verifies signature", kind: "external" },
          { label: "Dedupe event", detail: "(channel, dedupe key)", kind: "guard" },
          { label: "Sync run + cursor", detail: "refuses a second concurrent run", kind: "auto" },
          { label: "Reconcile each record", detail: "per-record errors → partial, not aborted", kind: "auto" },
          { label: "Conflict queue", detail: "admins review — nothing is force-deleted", kind: "user" },
        ],
      },
    ],
    dataModel: {
      entities: [
        { name: "units", fields: ["id", "property_id", "max_guests", "bedrooms"] },
        { name: "inventory_holds", fields: ["id", "unit_id", "check_in / check_out", "status", "idempotency_key", "expires_at"] },
        { name: "stays", fields: ["id", "unit_id", "check_in / check_out", "released_at"] },
        { name: "reservations", fields: ["id", "stay_id", "guest_profile_id", "channel_id", "status", "confirmation_code"] },
        { name: "payments", fields: ["id", "reservation_id", "provider", "status", "amount_cents"] },
        { name: "payment_attempts", fields: ["id", "payment_id", "provider_ref", "status", "failure_category"] },
        { name: "check_ins", fields: ["id", "reservation_id", "status", "ready_at"] },
        { name: "signing_requests", fields: ["id", "reservation_id", "agreement_version_id", "status"] },
        { name: "loyalty_ledger_entries", fields: ["id", "account_id", "entry_type", "points_delta"] },
      ],
      relations: [
        { from: "units", to: "inventory_holds", cardinality: "1–N" },
        { from: "units", to: "stays", cardinality: "1–N", label: "no overlap (EXCLUDE)" },
        { from: "stays", to: "reservations", cardinality: "1–1" },
        { from: "reservations", to: "payments", cardinality: "1–N" },
        { from: "payments", to: "payment_attempts", cardinality: "1–N", label: "a decline never frees the unit" },
        { from: "reservations", to: "check_ins", cardinality: "1–1" },
        { from: "check_ins", to: "signing_requests", cardinality: "1–N" },
      ],
      note: "Ledgers over mutable balances: loyalty is append-only, refund status is derived, promotion redemptions keep immutable snapshots.",
    },
    sections: [
      {
        title: "Security, fail-closed",
        bullets: [
          "Per-request CSP nonce, HSTS, frame-ancestors; OTPs compared with scrypt + timingSafeEqual; session tokens stored only as SHA-256 hashes.",
          "MFA secrets encrypted with AES-256-GCM; TOTP verified against the RFC 6238 test vectors.",
          "The app refuses to boot in production with a dev OTP harness, QA fixtures, the sandbox payment provider, local storage, or a database URL without sslmode=verify-full.",
        ],
      },
      {
        title: "Honest status",
        body: "Deployed to a staging Worker; production is intentionally gated until a live payment path, real channel integration and final legal documents are proven. Concurrency was tested at 2-way and 10-way with exactly one winner every time.",
      },
    ],
  },
  {
    slug: "cancha",
    name: "Cancha",
    label: "Real-time sports marketplace · mobile",
    category: "Product",
    status: "Staging",
    year: "2026",
    featured: true,
    privateRepo: true,
    summary:
      "A mobile marketplace for amateur football: find and fill pickup matches, hire a goalkeeper, split the pitch cost, and build a reliability score from real attendance. Medellín first — markets and sports are data, not code.",
    problem:
      "Pickup matches live in WhatsApp groups. Organisers struggle to fill spots — especially goalkeeper — to collect each player's share of the venue, and to know who will actually show up.",
    solution:
      "An Expo Android app on a Cloudflare Workers + Hono API over Postgres/PostGIS. Players publish availability and discover nearby matches on a map; spots are confirmed under a Postgres advisory lock so capacity can't be oversold; attendance feeds a weighted reliability score; payments are split obligations settled through a hosted checkout with a checksum-verified webhook.",
    tags: ["Expo / React Native", "Cloudflare Workers", "Hono", "PostGIS", "Drizzle", "Wompi", "Push"],
    stack: [
      { group: "Mobile", items: ["Expo SDK 52", "React Native 0.76", "Expo Router", "TanStack Query", "MapLibre", "Google Sign-In"] },
      { group: "API", items: ["Cloudflare Workers", "Hono", "Zod", "jose (JWT)", "Cron triggers"] },
      { group: "Data", items: ["Neon Postgres + PostGIS", "Drizzle ORM", "38 migrations"] },
      { group: "Integrations", items: ["Wompi (sandbox)", "Expo Push / FCM v1", "OpenStreetMap venue import"] },
      { group: "Quality", items: ["Vitest unit + DB integration", "PostGIS + Neon wsproxy in CI", "Staging acceptance script"] },
    ],
    metrics: [
      { value: "164", label: "API integration tests green" },
      { value: "230", label: "shared + API unit tests" },
      { value: "62/62", label: "staging QA scenarios passing" },
      { value: "54", label: "tables in the domain schema" },
    ],
    architecture: {
      lanes: [
        { name: "Clients", nodes: [{ label: "Android app", detail: "Expo · MapLibre" }, { label: "Admin SPA", detail: "Vite + React" }] },
        { name: "Edge API", nodes: [{ label: "Hono on Workers", detail: "~29 route modules" }, { label: "Cron · every 15 min", detail: "match reminders" }] },
        { name: "Domain", nodes: [{ label: "Participation", detail: "advisory-lock capacity" }, { label: "Payments & commerce", detail: "obligations · ledger" }, { label: "Reliability", detail: "pure, shared logic" }] },
        { name: "Data", nodes: [{ label: "Postgres + PostGIS", detail: "geography, snapped reads" }, { label: "notification_events", detail: "idempotent outbox" }] },
        { name: "External", nodes: [{ label: "Google OAuth" }, { label: "Wompi checkout" }, { label: "Expo Push / FCM" }] },
      ],
      flows: [
        "App → Google ID token → API issues first-party JWT + rotating refresh token",
        "Wompi → checksum-verified webhook → intents, obligations, append-only ledger",
        "Domain commit → notification_events → push flushed after commit (SKIP LOCKED)",
        "Other players' locations snapped server-side to a ~1 km grid before they leave the API",
      ],
    },
    workflows: [
      {
        title: "Join → confirm → attend → reliability",
        steps: [
          { label: "Sign in + profile", detail: "positions, level, availability windows", kind: "user" },
          { label: "Discover nearby", detail: "PostGIS filter, started matches excluded", kind: "data" },
          { label: "Request a spot", detail: "schedule-conflict + account-status checks", kind: "guard" },
          { label: "Organiser approves", detail: "pg_advisory_xact_lock per match — never oversold", kind: "guard" },
          { label: "Pay-to-confirm hold", detail: "30-minute hold, released lazily", kind: "auto" },
          { label: "Attendance marked", detail: "state-guarded so it can't fire twice", kind: "user" },
          { label: "Reliability recomputed", detail: "weighted events, min. sample 3", kind: "auto" },
        ],
      },
      {
        title: "Split payments: obligation → quote → intent → webhook → ledger",
        steps: [
          { label: "Obligation per player", detail: "integer cents, currency snapshot", kind: "auto" },
          { label: "Immutable quote", detail: "fee rules are data, never hard-coded", kind: "data" },
          { label: "Signed checkout URL", detail: "hosted page, no card data in the app", kind: "external" },
          { label: "Checksum-verified webhook", detail: "raw event stored, idempotent per intent", kind: "guard" },
          { label: "Ledger entry", detail: "append-only; obligation → paid", kind: "data" },
        ],
      },
      {
        title: "Notifications: event-driven + scheduled",
        steps: [
          { label: "Domain action commits", kind: "auto" },
          { label: "Outbox row", detail: "unique idempotency key", kind: "data" },
          { label: "Cron reminders", detail: "*/15 * * * *", kind: "auto" },
          { label: "Flush after commit", detail: "FOR UPDATE SKIP LOCKED, user mutes respected", kind: "auto" },
          { label: "Expo / FCM delivery", detail: "dead tokens deactivated; never rolls back the action", kind: "external" },
        ],
      },
    ],
    dataModel: {
      entities: [
        { name: "users", fields: ["id", "display_name", "status", "role"] },
        { name: "player_profiles", fields: ["id", "user_id", "level", "approx_area (geography)"] },
        { name: "matches", fields: ["id", "organizer_user_id", "venue_id", "starts_at", "capacity", "status"] },
        { name: "match_participants", fields: ["id", "match_id", "player_profile_id", "status", "joined_via"] },
        { name: "venues", fields: ["id", "name", "location (geography)", "surface", "is_verified"] },
        { name: "payment_obligations", fields: ["id", "match_participant_id", "payer_user_id", "amount_cents", "status"] },
        { name: "payment_intents", fields: ["id", "provider", "provider_ref", "status", "expires_at"] },
        { name: "ledger_entries", fields: ["id", "obligation_id", "intent_id", "type", "amount_cents"] },
        { name: "reliability_events", fields: ["id", "subject_id", "match_participant_id", "event_type"] },
      ],
      relations: [
        { from: "users", to: "player_profiles", cardinality: "1–1" },
        { from: "venues", to: "matches", cardinality: "1–N" },
        { from: "matches", to: "match_participants", cardinality: "1–N" },
        { from: "match_participants", to: "payment_obligations", cardinality: "1–N" },
        { from: "payment_intents", to: "payment_obligations", cardinality: "N–N" },
        { from: "payment_obligations", to: "ledger_entries", cardinality: "1–N" },
        { from: "match_participants", to: "reliability_events", cardinality: "1–N" },
      ],
    },
    sections: [
      {
        title: "Engineering highlights",
        bullets: [
          "Capacity is protected by a per-match advisory lock and one shared definition of which participant states occupy a spot.",
          "CI runs the integration suite against real PostGIS plus Neon's WebSocket proxy, so the serverless driver is tested without a cloud account.",
          "The test suite refuses any database without an explicit disposable marker — a guard added after a real incident, not in theory.",
          "Wrangler has no default deploy target: a bare deploy refuses to run.",
        ],
      },
    ],
  },
  {
    slug: "lead-engine",
    name: "Lead Engine",
    label: "B2B lead intelligence & CRM · automation",
    category: "Automation",
    status: "Built & tested",
    year: "2026",
    featured: true,
    privateRepo: true,
    summary:
      "Automated lead generation for a tourism company: licensed public data sources are swept nightly into one deduplicated table, a headless browser enriches each business with phone, WhatsApp, email and socials, and every lead is scored A+ to D and worked through an enforced CRM pipeline.",
    problem:
      "Selling to hotels, hostels, agencies and tour operators across Medellín and Antioquia meant working from incomplete, duplicated, uncontactable lists built by hand.",
    solution:
      "Pluggable connectors pull OpenStreetMap and Colombia's official tourism registry on a daily schedule, upserting idempotently on (source, external id). A separate enrichment engine discovers each business's website, extracts contact channels with Playwright, and fills only empty fields. Leads are scored on demand, segmented, exported to Excel, and moved through an 8-state CRM that the server enforces.",
    tags: ["Python 3.13", "FastAPI", "PostgreSQL", "Playwright", "APScheduler", "Next.js 15", "shadcn/ui"],
    stack: [
      { group: "Backend", items: ["FastAPI", "Pydantic v2", "SQLAlchemy 2", "Alembic", "structlog"] },
      { group: "Automation", items: ["APScheduler (daily 03:00)", "Playwright / Chromium", "BeautifulSoup", "Background jobs with pause/resume"] },
      { group: "Frontend", items: ["Next.js 15", "React 19", "Tailwind v4", "shadcn/ui", "TanStack Query"] },
      { group: "Data", items: ["PostgreSQL 16", "pandas / openpyxl exports"] },
      { group: "Quality", items: ["pytest against real Postgres", "respx HTTP mocking", "ruff", "mypy"] },
    ],
    metrics: [
      { value: "9", label: "cities configured in Antioquia" },
      { value: "2 + 2", label: "data connectors + website-discovery providers" },
      { value: "8", label: "enforced CRM states" },
      { value: "A+→D", label: "rules-based lead grading" },
    ],
    architecture: {
      lanes: [
        { name: "Dashboard", nodes: [{ label: "Next.js 15", detail: "runs · leads · pipeline" }] },
        { name: "API", nodes: [{ label: "FastAPI routers", detail: "businesses · scrapers · enrichment · leads · exports" }, { label: "APScheduler", detail: "daily sweep" }] },
        { name: "Engines", nodes: [{ label: "Connector registry", detail: "OSM Overpass · RNT" }, { label: "Enrichment", detail: "providers + Playwright extractor" }, { label: "Scoring · CRM · Exports", detail: "pure, framework-free" }] },
        { name: "Data", nodes: [{ label: "PostgreSQL", detail: "businesses + run logs" }] },
        { name: "Sources", nodes: [{ label: "OpenStreetMap", detail: "ODbL" }, { label: "datos.gov.co", detail: "CC-BY-SA" }, { label: "Business websites" }] },
      ],
      flows: [
        "Scheduler / API → connector.fetch → idempotent upsert on (source, external_id)",
        "Enrichment → Nominatim, then domain guessing → headless contact extraction",
        "Domain packages never import FastAPI; only backend/ composes them",
        "Licensed sources only — Google Maps deliberately avoided",
      ],
    },
    workflows: [
      {
        title: "Discovery sweep (manual or nightly)",
        steps: [
          { label: "Trigger", detail: "API call or cron at 03:00, every connector × city", kind: "auto" },
          { label: "Run row created", detail: "run id returned synchronously", kind: "data" },
          { label: "Connector.fetch", detail: "normalise tags to a closed category enum", kind: "external" },
          { label: "Idempotent upsert", detail: "never touches CRM-owned fields", kind: "guard" },
          { label: "Checkpoint every 50", detail: "cursor + log line committed", kind: "auto" },
          { label: "Resume on failure", detail: "from the stored cursor; other cities keep going", kind: "auto" },
        ],
      },
      {
        title: "Contact enrichment",
        steps: [
          { label: "Batch selected", detail: "stable order makes the cursor safe", kind: "data" },
          { label: "Find website", detail: "existing → Nominatim → domain guess", kind: "external" },
          { label: "Headless extraction", detail: "tel:, wa.me, mailto:, socials + /contacto", kind: "auto" },
          { label: "Fill empty fields only", detail: "provenance recorded", kind: "guard" },
          { label: "Pause / retry", detail: "2 attempts per item, cooperative pause", kind: "auto" },
        ],
      },
      {
        title: "Score → export → CRM",
        steps: [
          { label: "Score on demand", detail: "never stored, so never stale", kind: "auto" },
          { label: "Grade + segment", detail: "A+ ≥ 90 … D; luxury, boutique, airport…", kind: "auto" },
          { label: "Export xlsx / csv", detail: "16 fixed columns, logged", kind: "data" },
          { label: "Pipeline move", detail: "invalid transitions rejected with 409", kind: "guard" },
          { label: "Sales follow-up", kind: "user" },
        ],
      },
    ],
    dataModel: {
      entities: [
        { name: "businesses", fields: ["id (uuid)", "name", "category", "city", "phone / whatsapp / email", "website", "source + external_id", "status"] },
        { name: "scraper_runs", fields: ["id", "connector", "city", "status", "records_seen", "cursor"] },
        { name: "scraper_run_logs", fields: ["id", "run_id", "level", "message"] },
        { name: "enrichment_runs", fields: ["id", "status", "records_enriched", "phones_found", "cursor"] },
        { name: "enrichment_run_logs", fields: ["id", "run_id", "level", "message"] },
        { name: "export_logs", fields: ["id", "format", "row_count", "created_at"] },
      ],
      relations: [
        { from: "scraper_runs", to: "scraper_run_logs", cardinality: "1–N" },
        { from: "enrichment_runs", to: "enrichment_run_logs", cardinality: "1–N" },
      ],
      note: "businesses is unique on (source, external_id) — re-running any sweep updates instead of duplicating.",
    },
  },
  {
    slug: "accommodation-marketplace",
    name: "Accommodation Marketplace 2.0",
    label: "Marketplace rebuild · web + PWA",
    category: "Platform",
    status: "Staging",
    year: "2026",
    privateRepo: true,
    summary:
      "A Colombian accommodation marketplace rebuilt from a no-code app into a typed monorepo: multi-tenant hosts, a concurrency-safe booking engine, configurable commissions frozen at booking time, webhook-confirmed payments and an append-only ledger.",
    problem:
      "The legacy marketplace ran on a no-code tool with data locked in CSV exports, no real booking engine, no payments and no multi-user host model.",
    solution:
      "A pnpm monorepo with a normalised Postgres schema, two-axis RBAC, a hold → checkout → webhook flow protected by an EXCLUDE constraint, commission rules resolved by priority and frozen on each booking, and a re-runnable importer that migrated the legacy data without guessing.",
    tags: ["Next.js 15", "PostgreSQL", "Drizzle", "Wompi", "Cloudflare Workers", "Hyperdrive", "PWA"],
    stack: [
      { group: "Frontend", items: ["Next.js 15", "React 19", "Tailwind", "Custom design system", "PWA + offline page"] },
      { group: "Backend", items: ["Server Actions", "Zod", "scrypt sessions", "Google OAuth", "State machine"] },
      { group: "Data", items: ["PostgreSQL 16", "Drizzle ORM", "EXCLUDE constraints", "Append-only ledger"] },
      { group: "Infra", items: ["Cloudflare Workers (OpenNext)", "Hyperdrive", "Neon", "GitHub Actions deploy + seed"] },
    ],
    metrics: [
      { value: "47", label: "routes in the production build" },
      { value: "30", label: "tables, 6 migrations" },
      { value: "3-way", label: "concurrency test: exactly one winner" },
      { value: "0", label: "duplicates on importer re-run" },
    ],
    architecture: {
      lanes: [
        { name: "Clients", nodes: [{ label: "Guests", detail: "search · book" }, { label: "Hosts", detail: "calendar · earnings" }, { label: "Admins", detail: "approvals · finance" }] },
        { name: "App", nodes: [{ label: "Next.js routes", detail: "marketplace · host · admin" }, { label: "Domain layer", detail: "booking engine · pricing · commission" }] },
        { name: "Data", nodes: [{ label: "Hyperdrive → Postgres" }, { label: "Ledger + audit logs" }] },
        { name: "External", nodes: [{ label: "Wompi checkout" }, { label: "Google OAuth" }, { label: "Legacy CSV import" }] },
      ],
      flows: [
        "Booking source decided server-side from an httpOnly cookie — query strings are never trusted",
        "Wompi webhook → verified checksum → payment → booking → ledger rows, in one transaction",
        "Confirmation page only reads the database; landing on it never counts as success",
      ],
    },
    workflows: [
      {
        title: "Hold → checkout → webhook → ledger",
        steps: [
          { label: "Resolve source", detail: "marketplace vs host-direct link", kind: "guard" },
          { label: "Create hold", detail: "commission rule resolved, money frozen, 10-min TTL", kind: "auto" },
          { label: "EXCLUDE constraint", detail: "overlapping active stays rejected", kind: "data" },
          { label: "Checkout", detail: "guarded UPDATE … WHERE status = from", kind: "external" },
          { label: "Webhook", detail: "checksum verified, deduped per event", kind: "guard" },
          { label: "Ledger", detail: "gross, commission, service fee, payable", kind: "data" },
        ],
      },
      {
        title: "Legacy import, safe to re-run",
        steps: [
          { label: "Read CSV exports", detail: "skip UI-state and junk files", kind: "data" },
          { label: "Lookup mapping", detail: "existing legacy rows skipped", kind: "guard" },
          { label: "Disambiguate dates", detail: "M/D vs D/M checked against total nights", kind: "auto" },
          { label: "Unresolvable rows skipped", detail: "never guessed", kind: "guard" },
          { label: "Needs verification", detail: "an admin approves every imported listing", kind: "user" },
        ],
      },
    ],
    dataModel: {
      entities: [
        { name: "organizations", fields: ["id", "name", "slug", "status"] },
        { name: "properties", fields: ["id", "organization_id", "property_type", "status", "city"] },
        { name: "units", fields: ["id", "property_id", "max_capacity"] },
        { name: "bookings", fields: ["id", "unit_id", "source", "status", "check_in / check_out", "frozen money fields"] },
        { name: "payments", fields: ["id", "booking_id", "provider", "idempotency_key", "status"] },
        { name: "ledger_entries", fields: ["id", "type", "booking_id", "payment_id", "amount_cents"] },
      ],
      relations: [
        { from: "organizations", to: "properties", cardinality: "1–N" },
        { from: "properties", to: "units", cardinality: "1–N" },
        { from: "units", to: "bookings", cardinality: "1–N", label: "no overlap (EXCLUDE)" },
        { from: "bookings", to: "payments", cardinality: "1–N" },
        { from: "bookings", to: "ledger_entries", cardinality: "1–N" },
      ],
    },
    sections: [
      {
        title: "Debugging on the edge",
        body: "Four staging failures on Cloudflare Workers were root-caused and documented — a build-time database dependency, raw TCP from a Worker (solved with Hyperdrive), a hidden deploy requirement in the adapter, and a 'connection closed' bug from a client cached across requests.",
      },
    ],
  },
  {
    slug: "digital-concierge",
    name: "Digital Concierge",
    label: "Services marketplace · brand & experience",
    category: "Product",
    status: "Built & tested",
    year: "2026",
    privateRepo: true,
    summary:
      "A bilingual concierge for cross-border paperwork between Colombia and the USA: describe what you need, get the best match with a transparent price breakdown, and choose to do it yourself, with help, or fully managed.",
    problem:
      "People handling apostilles, civil registry and consular paperwork across two countries face unclear processes and opaque pricing.",
    solution:
      "A fast, accessible, SEO-first front end on a typed catalogue, with a no-JavaScript search, three service experiences per item, and a release gate that blocks production while any price is unverified. The data model already carries a fulfilment mode so services can move from manual to automated.",
    tags: ["Next.js 16", "TypeScript", "Tailwind v4", "Cloudflare Workers", "Playwright", "axe-core"],
    stack: [
      { group: "Frontend", items: ["Next.js 16", "React 19", "Tailwind v4", "Self-hosted variable fonts"] },
      { group: "Infra", items: ["Cloudflare Workers (OpenNext)", "Staging auto-deploy", "SHA-gated production"] },
      { group: "Quality", items: ["Vitest", "Playwright 390 / 1280 px", "axe-core", "Edge smoke tests"] },
    ],
    metrics: [
      { value: "87", label: "unit tests" },
      { value: "0", label: "axe violations at 390 & 1280 px" },
      { value: "2", label: "client components on the whole site" },
      { value: "≥4.5:1", label: "contrast, enforced by tests" },
    ],
    workflows: [
      {
        title: "Release pipeline: push → staging → gated production",
        steps: [
          { label: "Push", detail: "lint, typecheck, format, unit, build", kind: "auto" },
          { label: "Playwright", detail: "mobile 390 + desktop 1280", kind: "guard" },
          { label: "Deploy staging", detail: "Cloudflare Worker", kind: "auto" },
          { label: "Edge smoke", detail: "headers, robots, sitemap, 404, OG", kind: "guard" },
          { label: "Manual dispatch", detail: "same SHA must be green on staging", kind: "user" },
          { label: "Release gate", detail: "fails on unverified prices or missing contact", kind: "guard" },
        ],
      },
    ],
    screenshots: [
      { src: "/screens/concierge-home.jpg", alt: "Concierge home: natural-language search and a price breakdown card", device: "desktop" },
      { src: "/screens/concierge-search.jpg", alt: "Search results with best match and related services", device: "desktop" },
      { src: "/screens/concierge-mobile.jpg", alt: "Concierge home on a phone", device: "mobile" },
    ],
  },
  {
    slug: "gwork-systems",
    name: "GWork Systems",
    label: "Company website · lead capture & privacy",
    category: "Web",
    status: "Live",
    year: "2026",
    privateRepo: true,
    live: "https://gworksystems.com",
    summary:
      "The bilingual site for my software, automation and security practice — a static Next.js export on Cloudflare Pages with a hardened serverless lead pipeline and analytics that load only after consent.",
    problem:
      "A services company needs credible positioning, reliable lead capture instead of mailto links, and analytics that respect privacy by default.",
    solution:
      "A fully static EN/ES site with strict security headers, a Cloudflare Pages Function that validates, rate-limits, stores and routes every lead, and a first-party consent system where no Google request happens before the visitor agrees.",
    tags: ["Next.js 16", "Cloudflare Pages", "Pages Functions", "KV", "Resend", "GTM Consent Mode", "Playwright"],
    stack: [
      { group: "Frontend", items: ["Next.js 16 static export", "React 19", "Tailwind v4", "EN / ES"] },
      { group: "Serverless", items: ["Pages Functions", "Cloudflare KV", "Resend", "Email Routing"] },
      { group: "Quality", items: ["Playwright + axe", "CSP regression tests", "Consent network tests", "Vitest"] },
    ],
    metrics: [
      { value: "0", label: "Google requests before consent (network-tested)" },
      { value: "5/h", label: "per-IP lead rate limit" },
      { value: "360–1920", label: "px responsive range verified" },
      { value: "EN · ES", label: "every page, 404 and legal page" },
    ],
    architecture: {
      lanes: [
        { name: "Browser", nodes: [{ label: "Static pages", detail: "EN / ES" }, { label: "Lead forms" }, { label: "Consent banner" }] },
        { name: "Edge", nodes: [{ label: "POST /api/leads", detail: "Pages Function" }, { label: "_headers", detail: "CSP · HSTS · COOP" }] },
        { name: "Storage", nodes: [{ label: "Cloudflare KV", detail: "leads + rate-limit buckets" }] },
        { name: "Delivery", nodes: [{ label: "Resend", detail: "categorised notification" }, { label: "GTM → GA4", detail: "only after consent" }] },
      ],
      flows: [
        "Lead is written to KV before any email is attempted — email failure never loses a lead",
        "Analytics events are a closed TypeScript union, so PII can't be sent by mistake",
      ],
    },
    workflows: [
      {
        title: "Lead capture",
        steps: [
          { label: "Form submit", kind: "user" },
          { label: "Origin check", detail: "foreign origins → 403", kind: "guard" },
          { label: "Rate limit", detail: "5 per hour per IP (KV)", kind: "guard" },
          { label: "Validate", detail: "honeypot, min fill time, length limits", kind: "guard" },
          { label: "Store in KV", detail: "durable before notification", kind: "data" },
          { label: "Route + notify", detail: "category → alias via Resend", kind: "external" },
          { label: "Success event", detail: "fired only after the server says ok", kind: "auto" },
        ],
      },
    ],
    screenshots: [
      { src: "/screens/website-home.jpg", alt: "GWork Systems home page in dark mode", device: "desktop" },
      { src: "/screens/website-automate.jpg", alt: "Automate service page", device: "desktop" },
      { src: "/screens/website-mobile.jpg", alt: "GWork Systems on a phone", device: "mobile" },
    ],
  },
  {
    slug: "smart-library",
    name: "Smart Library",
    label: "Production full-stack app · grounded assistant",
    category: "Product",
    status: "Live",
    year: "2026",
    github: "https://github.com/alejo21ny/smart-library-challenge",
    live: "https://smart-library-zsh8.onrender.com",
    summary:
      "A real library management system — catalog, borrow/return, role-based access, an event-driven audit trail, and a grounded natural-language assistant that never invents a book.",
    problem:
      "Build a library system that goes beyond CRUD — showing judgment on concurrency, security and where an AI boundary actually earns its keep — and take it all the way to a running deployment.",
    solution:
      "Laravel 12 + Inertia/React on PostgreSQL with trigram fuzzy search. A book can never be double-borrowed (partial unique index + locked transaction), roles are enforced server-side, and the assistant runs read-only queries against real tables behind a swappable AI provider interface.",
    tags: ["Laravel 12", "React", "TypeScript", "PostgreSQL", "Docker", "Google SSO", "RBAC", "CI/CD"],
    stack: [
      { group: "Backend", items: ["Laravel 12", "Policies · Form Requests · Actions · Events", "AiProviderInterface"] },
      { group: "Frontend", items: ["Inertia.js", "React", "TypeScript"] },
      { group: "Data", items: ["PostgreSQL 18", "pg_trgm fuzzy search"] },
      { group: "Delivery", items: ["Docker", "Render", "3 GitHub Actions jobs"] },
    ],
    metrics: [
      { value: "93", label: "Pest backend tests" },
      { value: "13", label: "Playwright E2E tests" },
      { value: "L5", label: "Larastan static analysis" },
      { value: "Live", label: "running on Render" },
    ],
    ai: [
      "A deterministic action router classifies the question, then runs a real read-only query — every answer is a genuine row.",
      "Trigram fallback adds typo tolerance when the strict search is empty.",
      "The tool surface is read-only by construction and rate-limited separately.",
      "An OpenAI-compatible provider can be plugged in behind AiProviderInterface; the live deployment runs on the deterministic fallback.",
    ],
    workflows: [
      {
        title: "Grounded assistant",
        steps: [
          { label: "Member asks a question", kind: "user" },
          { label: "Action router", detail: "deterministic intent classification", kind: "ai" },
          { label: "Read-only query", detail: "catalog + loans tables", kind: "data" },
          { label: "Trigram fallback", detail: "typo tolerance", kind: "auto" },
          { label: "Answer from real rows", detail: "never invented", kind: "guard" },
        ],
      },
      {
        title: "Borrow a book",
        steps: [
          { label: "Borrow request", kind: "user" },
          { label: "Policy check", detail: "role enforced server-side", kind: "guard" },
          { label: "Locked transaction", kind: "data" },
          { label: "Partial unique index", detail: "double-borrow impossible", kind: "guard" },
          { label: "Audit event", kind: "auto" },
        ],
      },
    ],
  },
  {
    slug: "hubspot-portal-sync",
    name: "HubSpot Portal Sync",
    label: "API & integration engineering",
    category: "Integration",
    status: "Built & tested",
    year: "2026",
    github: "https://github.com/alejo21ny/hubspot-portal-sync-assessment",
    summary:
      "Idempotent sync of a custom HubSpot object between two portals, keyed by an external identifier so re-running it never creates duplicates.",
    problem:
      "Two portals each hold a copy of a custom ticket object. Keeping them in sync without duplicates — and without silently losing a failed attempt — is easy to get wrong once retries, rate limits and re-triggered automations appear.",
    solution:
      "One orchestrator behind two thin entry points (serverless function and workflow custom code). An external identifier keys every sync; exactly one of create, update, archive or no-op happens, and the outcome is written back to the source record.",
    tags: ["Node.js", "HubSpot API", "Idempotency", "Retry/Backoff", "42 tests", "GitHub Actions"],
    stack: [
      { group: "Runtime", items: ["Node.js", "HubSpot Serverless Functions", "Workflow Custom Code"] },
      { group: "Quality", items: ["node:test", "Mocks & fakes only", "GitHub Actions"] },
    ],
    metrics: [
      { value: "42", label: "tests, no live API calls" },
      { value: "1", label: "real dependency" },
      { value: "4", label: "possible outcomes per sync" },
      { value: "0", label: "tokens in logs (tested)" },
    ],
    workflows: [
      {
        title: "Portal-to-portal sync",
        steps: [
          { label: "Trigger", detail: "serverless function or workflow action", kind: "external" },
          { label: "Read + map source", kind: "auto" },
          { label: "Search target by external id", detail: ">1 match fails loudly", kind: "guard" },
          { label: "Create / update / archive / no-op", kind: "auto" },
          { label: "Retry 429 / 5xx only", detail: "4xx fails immediately", kind: "guard" },
          { label: "Write status back", detail: "best-effort, never masks the real error", kind: "data" },
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
