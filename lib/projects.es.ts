import type { Project } from "./types";

// Copia en español de projects.ts: mismo orden, slugs y estructura (índice i
// en cada arreglo anidado = índice i en inglés). Números y diagramas idénticos.
export const PROJECTS_ES: Project[] = [
  {
    slug: "sedona-scapes",
    name: "Sedona Scapes Platform",
    label: "Plataforma hotelera de reservas directas",
    category: "Platform",
    status: "Staging",
    year: "2026",
    featured: true,
    privateRepo: true,
    summary:
      "Una plataforma operativa completa para un negocio de alquiler vacacional: sitio de reservas bilingüe, motor de reservas a prueba de sobreventa, portal de huéspedes con check-in en línea y firma electrónica, pagos, sincronización de canales, fidelización y un back office protegido con MFA.",
    problem:
      "El negocio funcionaba con un sitio de WordPress de plantilla sin reservas reales. Cada reserva, pago, registro de huéspedes y contrato se gestionaba a mano, en canales que podían vender dos veces la misma unidad.",
    solution:
      "Un solo sistema para toda la estadía. Un motor de reservas garantizado por Postgres, una confirmación de pago que solo ocurre por webhook, un portal de huéspedes con acceso por OTP, carga de documentos y contratos firmados en PDF, conciliación de canales con cola de conflictos y un back office con cinco roles RBAC. Cada dependencia externa está detrás de un adaptador intercambiable, y la app se niega a arrancar con una configuración de producción insegura.",
    tags: ["Next.js 16", "PostgreSQL", "Drizzle", "Cloudflare Workers", "PayU", "R2", "Playwright", "21 ADRs"],
    stack: [
      { group: "Frontend", items: ["Next.js 16 (App Router, Server Actions)", "React 19", "Tailwind CSS 4", "ES/EN i18n"] },
      { group: "Backend", items: ["Service + domain layers", "pdf-lib signed artifacts", "TOTP MFA", "Postgres rate limiter"] },
      { group: "Datos", items: ["PostgreSQL", "Drizzle ORM", "btree_gist EXCLUDE constraints", "Advisory locks"] },
      { group: "Infraestructura", items: ["Cloudflare Workers (OpenNext)", "Private R2 buckets", "Neon", "Resend"] },
      { group: "Calidad", items: ["Vitest on real Postgres", "Playwright + axe", "GitHub Actions", "CI secret scan"] },
    ],
    metrics: [
      { value: "723", label: "pruebas de BD / integración aprobadas" },
      { value: "165", label: "pruebas end-to-end aprobadas" },
      { value: "57", label: "tablas, 23 migraciones" },
      { value: "21", label: "registros de decisiones de arquitectura" },
    ],
    architecture: {
      lanes: [
        { name: "Clientes", nodes: [{ label: "Sitio público", detail: "búsqueda · checkout" }, { label: "Portal de huéspedes", detail: "mis estadías · check-in" }, { label: "Back office", detail: "OTP + TOTP MFA" }] },
        { name: "Edge", nodes: [{ label: "proxy.ts", detail: "idioma + nonce CSP por solicitud" }, { label: "Guardia de producción", detail: "rechaza config insegura al arrancar" }] },
        { name: "Aplicación", nodes: [{ label: "Server Actions" }, { label: "Servicios" }, { label: "Capa de dominio", detail: "retenciones · pagos · canales · fidelización" }] },
        { name: "Datos", nodes: [{ label: "PostgreSQL", detail: "restricciones EXCLUDE" }, { label: "R2 (privado)", detail: "documentos · PDFs firmados" }, { label: "Registro de auditoría" }] },
        { name: "Proveedores", nodes: [{ label: "Adaptadores de pago", detail: "PayU · sandbox" }, { label: "Adaptadores de canal", detail: "directo · iCal · sandbox" }, { label: "Email (Resend)" }] },
      ],
      flows: [
        "Checkout → página de pago alojada → el webhook firmado es la única vía que confirma una reserva",
        "Webhook / consulta del canal → conciliación → estadías o cola de conflictos para admins",
        "Cada mutación → audit_events con un id de correlación",
        "Las consultas iCal pasan una guardia SSRF (IPs privadas bloqueadas, timeout de 10s, límite de 2MB)",
      ],
    },
    workflows: [
      {
        title: "Búsqueda → retención → reserva → confirmación de pago",
        summary: "Una unidad nunca se vende dos veces: lo garantiza la base de datos, no solo la lógica de la aplicación.",
        steps: [
          { label: "El huésped elige fechas", detail: "cotización en servidor con tarifas + promociones", kind: "user" },
          { label: "Crear retención", detail: "advisory lock por unidad, TTL de 10 min, idempotency key", kind: "guard" },
          { label: "Restricción EXCLUDE", detail: "Postgres rechaza retenciones/estadías solapadas", kind: "data" },
          { label: "Reserva pendiente", detail: "código de confirmación no adivinable", kind: "auto" },
          { label: "Checkout alojado", detail: "ningún dato de tarjeta toca la plataforma", kind: "external" },
          { label: "Webhook verificado", detail: "firma, deduplicación, monto + moneda cotejados", kind: "guard" },
          { label: "Confirmada", detail: "las diferencias abren un caso de conciliación", kind: "auto" },
        ],
      },
      {
        title: "Portal de huéspedes → check-in en línea → firma electrónica",
        steps: [
          { label: "OTP por email", detail: "código con hash scrypt, 5 intentos, rate limit", kind: "guard" },
          { label: "Mis estadías", detail: "verificación de propiedad (probado contra IDOR)", kind: "user" },
          { label: "Lista de huéspedes", detail: "capacidad validada en servidor", kind: "auto" },
          { label: "Carga de documentos", detail: "claves opacas en R2 privado", kind: "data" },
          { label: "OTP de firma + firma", detail: "atada a una versión inmutable del contrato", kind: "guard" },
          { label: "PDF firmado + evidencia", detail: "SHA-256 del documento original y final", kind: "auto" },
        ],
      },
      {
        title: "Sincronización de canales → conciliación → conflictos",
        steps: [
          { label: "Consulta o webhook", detail: "límite de 256KB, el adaptador verifica la firma", kind: "external" },
          { label: "Deduplicar evento", detail: "(canal, clave de deduplicación)", kind: "guard" },
          { label: "Ejecución + cursor", detail: "rechaza una segunda ejecución concurrente", kind: "auto" },
          { label: "Conciliar cada registro", detail: "errores por registro → parcial, no abortada", kind: "auto" },
          { label: "Cola de conflictos", detail: "los admins revisan: nada se borra a la fuerza", kind: "user" },
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
        { from: "units", to: "stays", cardinality: "1–N", label: "sin solapamiento (EXCLUDE)" },
        { from: "stays", to: "reservations", cardinality: "1–1" },
        { from: "reservations", to: "payments", cardinality: "1–N" },
        { from: "payments", to: "payment_attempts", cardinality: "1–N", label: "un rechazo nunca libera la unidad" },
        { from: "reservations", to: "check_ins", cardinality: "1–1" },
        { from: "check_ins", to: "signing_requests", cardinality: "1–N" },
      ],
      note: "Libros contables en lugar de saldos mutables: la fidelización es solo de inserción, el estado de reembolso se deriva y las redenciones de promociones guardan snapshots inmutables.",
    },
    sections: [
      {
        title: "Seguridad con fallo cerrado",
        bullets: [
          "Nonce CSP por solicitud, HSTS, frame-ancestors; OTPs comparados con scrypt + timingSafeEqual; tokens de sesión guardados solo como hashes SHA-256.",
          "Secretos MFA cifrados con AES-256-GCM; TOTP verificado contra los vectores de prueba del RFC 6238.",
          "La app se niega a arrancar en producción con el arnés OTP de desarrollo, fixtures de QA, el proveedor de pago sandbox, almacenamiento local o una URL de base de datos sin sslmode=verify-full.",
        ],
      },
      {
        title: "Ingeniería de releases",
        body: "Corre en Cloudflare Workers con Neon Postgres y almacenamiento R2 privado, desplegado mediante un workflow manual de GitHub Actions fijado a un ref. Producción está protegida por verificaciones de lanzamiento explícitas, y la concurrencia se probó con 2 y 10 solicitudes simultáneas, con exactamente un ganador cada vez.",
      },
    ],
  },
  {
    slug: "cancha",
    name: "Cancha",
    label: "Marketplace deportivo en tiempo real · móvil",
    category: "Product",
    status: "Staging",
    year: "2026",
    featured: true,
    privateRepo: true,
    summary:
      "Un marketplace móvil para fútbol aficionado: encuentra y completa partidos, contrata un arquero, divide el costo de la cancha y construye un puntaje de confiabilidad a partir de la asistencia real. Primero Medellín: mercados y deportes son datos, no código.",
    problem:
      "Los partidos viven en grupos de WhatsApp. A los organizadores les cuesta llenar cupos, sobre todo de arquero, cobrar a cada jugador su parte de la cancha y saber quién va a llegar de verdad.",
    solution:
      "Una app Android en Expo sobre una API en Cloudflare Workers + Hono con Postgres/PostGIS. Los jugadores publican su disponibilidad y descubren partidos cercanos en un mapa; los cupos se confirman bajo un advisory lock de Postgres para que la capacidad nunca se sobrevenda; la asistencia alimenta un puntaje de confiabilidad ponderado; los pagos son obligaciones divididas que se liquidan en un checkout alojado con un webhook verificado por checksum.",
    tags: ["Expo / React Native", "Cloudflare Workers", "Hono", "PostGIS", "Drizzle", "Wompi", "Push"],
    stack: [
      { group: "Móvil", items: ["Expo SDK 52", "React Native 0.76", "Expo Router", "TanStack Query", "MapLibre", "Google Sign-In"] },
      { group: "API", items: ["Cloudflare Workers", "Hono", "Zod", "jose (JWT)", "Cron triggers"] },
      { group: "Datos", items: ["Neon Postgres + PostGIS", "Drizzle ORM", "38 migrations"] },
      { group: "Integraciones", items: ["Wompi (sandbox)", "Expo Push / FCM v1", "OpenStreetMap venue import"] },
      { group: "Calidad", items: ["Vitest unit + DB integration", "PostGIS + Neon wsproxy in CI", "Staging acceptance script"] },
    ],
    metrics: [
      { value: "164", label: "pruebas de integración de la API en verde" },
      { value: "230", label: "pruebas unitarias compartidas + API" },
      { value: "62/62", label: "escenarios de QA en staging aprobados" },
      { value: "54", label: "tablas en el esquema de dominio" },
    ],
    architecture: {
      lanes: [
        { name: "Clientes", nodes: [{ label: "App Android", detail: "Expo · MapLibre" }, { label: "SPA de admin", detail: "Vite + React" }] },
        { name: "API en el edge", nodes: [{ label: "Hono en Workers", detail: "~29 módulos de rutas" }, { label: "Cron · cada 15 min", detail: "recordatorios de partidos" }] },
        { name: "Dominio", nodes: [{ label: "Participación", detail: "capacidad con advisory lock" }, { label: "Pagos y comercio", detail: "obligaciones · libro contable" }, { label: "Confiabilidad", detail: "lógica pura y compartida" }] },
        { name: "Datos", nodes: [{ label: "Postgres + PostGIS", detail: "geografía, lecturas aproximadas" }, { label: "notification_events", detail: "outbox idempotente" }] },
        { name: "Externos", nodes: [{ label: "Google OAuth" }, { label: "Checkout de Wompi" }, { label: "Expo Push / FCM" }] },
      ],
      flows: [
        "App → token de Google → la API emite un JWT propio + refresh token rotativo",
        "Wompi → webhook verificado por checksum → intents, obligaciones, libro contable solo de inserción",
        "Commit de dominio → notification_events → push enviado tras el commit (SKIP LOCKED)",
        "La ubicación de otros jugadores se ajusta en servidor a una cuadrícula de ~1 km antes de salir de la API",
      ],
    },
    workflows: [
      {
        title: "Unirse → confirmar → asistir → confiabilidad",
        steps: [
          { label: "Ingreso + perfil", detail: "posiciones, nivel, franjas de disponibilidad", kind: "user" },
          { label: "Descubrir cercanos", detail: "filtro PostGIS, excluye partidos iniciados", kind: "data" },
          { label: "Pedir un cupo", detail: "validación de choques de horario + estado de cuenta", kind: "guard" },
          { label: "El organizador aprueba", detail: "pg_advisory_xact_lock por partido: nunca se sobrevende", kind: "guard" },
          { label: "Retención pago-para-confirmar", detail: "retención de 30 min, liberada en diferido", kind: "auto" },
          { label: "Asistencia marcada", detail: "protegida por estado para no dispararse dos veces", kind: "user" },
          { label: "Confiabilidad recalculada", detail: "eventos ponderados, muestra mín. de 3", kind: "auto" },
        ],
      },
      {
        title: "Pagos divididos: obligación → cotización → intent → webhook → libro",
        steps: [
          { label: "Obligación por jugador", detail: "centavos enteros, snapshot de moneda", kind: "auto" },
          { label: "Cotización inmutable", detail: "las reglas de tarifas son datos, nunca código fijo", kind: "data" },
          { label: "URL de checkout firmada", detail: "página alojada, sin datos de tarjeta en la app", kind: "external" },
          { label: "Webhook verificado por checksum", detail: "evento crudo guardado, idempotente por intent", kind: "guard" },
          { label: "Asiento contable", detail: "solo de inserción; obligación → pagada", kind: "data" },
        ],
      },
      {
        title: "Notificaciones: por eventos + programadas",
        steps: [
          { label: "Commit de la acción de dominio", kind: "auto" },
          { label: "Fila en el outbox", detail: "idempotency key única", kind: "data" },
          { label: "Recordatorios por cron", detail: "*/15 * * * *", kind: "auto" },
          { label: "Envío tras el commit", detail: "FOR UPDATE SKIP LOCKED, respeta silencios del usuario", kind: "auto" },
          { label: "Entrega Expo / FCM", detail: "tokens muertos desactivados; nunca revierte la acción", kind: "external" },
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
        title: "Aspectos de ingeniería destacados",
        bullets: [
          "La capacidad se protege con un advisory lock por partido y una única definición compartida de qué estados de participante ocupan un cupo.",
          "CI ejecuta la suite de integración contra PostGIS real más el proxy WebSocket de Neon, así el driver serverless se prueba sin cuenta en la nube.",
          "La suite de pruebas rechaza cualquier base de datos sin un marcador explícito de desechable: una guardia añadida tras un incidente real, no en teoría.",
          "Wrangler no tiene destino de despliegue por defecto: un deploy sin destino se niega a ejecutarse.",
        ],
      },
    ],
  },
  {
    slug: "lead-engine",
    name: "Lead Engine",
    label: "Inteligencia de leads B2B y CRM · automatización",
    category: "Automation",
    status: "Built & tested",
    year: "2026",
    featured: true,
    privateRepo: true,
    summary:
      "Generación automatizada de leads para una empresa de turismo: fuentes públicas con licencia se recorren cada noche hacia una tabla deduplicada, un navegador headless enriquece cada negocio con teléfono, WhatsApp, email y redes, y cada lead se califica de A+ a D y se trabaja en un pipeline de CRM controlado.",
    problem:
      "Vender a hoteles, hostales, agencias y operadores turísticos de Medellín y Antioquia implicaba trabajar con listas hechas a mano, incompletas, duplicadas y sin datos de contacto.",
    solution:
      "Conectores enchufables extraen OpenStreetMap y el registro oficial de turismo de Colombia a diario, con upsert idempotente sobre (fuente, id externo). Un motor de enriquecimiento separado descubre el sitio web de cada negocio, extrae canales de contacto con Playwright y solo llena campos vacíos. Los leads se califican bajo demanda, se segmentan, se exportan a Excel y avanzan por un CRM de 8 estados que el servidor hace cumplir.",
    tags: ["Python 3.13", "FastAPI", "PostgreSQL", "Playwright", "APScheduler", "Next.js 15", "shadcn/ui"],
    stack: [
      { group: "Backend", items: ["FastAPI", "Pydantic v2", "SQLAlchemy 2", "Alembic", "structlog"] },
      { group: "Automatización", items: ["APScheduler (daily 03:00)", "Playwright / Chromium", "BeautifulSoup", "Background jobs with pause/resume"] },
      { group: "Frontend", items: ["Next.js 15", "React 19", "Tailwind v4", "shadcn/ui", "TanStack Query"] },
      { group: "Datos", items: ["PostgreSQL 16", "pandas / openpyxl exports"] },
      { group: "Calidad", items: ["pytest against real Postgres", "respx HTTP mocking", "ruff", "mypy"] },
    ],
    metrics: [
      { value: "9", label: "ciudades configuradas en Antioquia" },
      { value: "2 + 2", label: "conectores de datos + proveedores de búsqueda de sitios" },
      { value: "8", label: "estados de CRM controlados" },
      { value: "A+→D", label: "calificación de leads por reglas" },
    ],
    architecture: {
      lanes: [
        { name: "Dashboard", nodes: [{ label: "Next.js 15", detail: "ejecuciones · leads · pipeline" }] },
        { name: "API", nodes: [{ label: "Routers FastAPI", detail: "negocios · scrapers · enriquecimiento · leads · exportaciones" }, { label: "APScheduler", detail: "barrido diario" }] },
        { name: "Motores", nodes: [{ label: "Registro de conectores", detail: "OSM Overpass · RNT" }, { label: "Enriquecimiento", detail: "proveedores + extractor Playwright" }, { label: "Scoring · CRM · Exportaciones", detail: "puro, sin framework" }] },
        { name: "Datos", nodes: [{ label: "PostgreSQL", detail: "negocios + logs de ejecución" }] },
        { name: "Fuentes", nodes: [{ label: "OpenStreetMap", detail: "ODbL" }, { label: "datos.gov.co", detail: "CC-BY-SA" }, { label: "Sitios web de negocios" }] },
      ],
      flows: [
        "Scheduler / API → connector.fetch → upsert idempotente sobre (source, external_id)",
        "Enriquecimiento → Nominatim, luego adivinar dominio → extracción headless de contactos",
        "Los paquetes de dominio nunca importan FastAPI; solo backend/ los compone",
        "Solo fuentes con licencia: Google Maps se evita deliberadamente",
      ],
    },
    workflows: [
      {
        title: "Barrido de descubrimiento (manual o nocturno)",
        steps: [
          { label: "Disparador", detail: "llamada a la API o cron a las 03:00, cada conector × ciudad", kind: "auto" },
          { label: "Fila de ejecución creada", detail: "id de ejecución devuelto de forma síncrona", kind: "data" },
          { label: "Connector.fetch", detail: "normaliza etiquetas a un enum cerrado de categorías", kind: "external" },
          { label: "Upsert idempotente", detail: "nunca toca campos propios del CRM", kind: "guard" },
          { label: "Checkpoint cada 50", detail: "cursor + línea de log confirmados", kind: "auto" },
          { label: "Reanudar ante fallas", detail: "desde el cursor guardado; las otras ciudades siguen", kind: "auto" },
        ],
      },
      {
        title: "Enriquecimiento de contactos",
        steps: [
          { label: "Lote seleccionado", detail: "un orden estable hace seguro el cursor", kind: "data" },
          { label: "Encontrar sitio web", detail: "existente → Nominatim → adivinar dominio", kind: "external" },
          { label: "Extracción headless", detail: "tel:, wa.me, mailto:, redes + /contacto", kind: "auto" },
          { label: "Solo campos vacíos", detail: "procedencia registrada", kind: "guard" },
          { label: "Pausa / reintento", detail: "2 intentos por ítem, pausa cooperativa", kind: "auto" },
        ],
      },
      {
        title: "Calificar → exportar → CRM",
        steps: [
          { label: "Score bajo demanda", detail: "nunca se guarda, así nunca queda desactualizado", kind: "auto" },
          { label: "Nota + segmento", detail: "A+ ≥ 90 … D; lujo, boutique, aeropuerto…", kind: "auto" },
          { label: "Exportar xlsx / csv", detail: "16 columnas fijas, registrado", kind: "data" },
          { label: "Mover en el pipeline", detail: "transiciones inválidas rechazadas con 409", kind: "guard" },
          { label: "Seguimiento comercial", kind: "user" },
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
      note: "businesses es único sobre (source, external_id): volver a ejecutar cualquier barrido actualiza en lugar de duplicar.",
    },
  },
  {
    slug: "all-bookings",
    name: "All Bookings 2.0",
    label: "Reconstrucción de marketplace · web + PWA",
    category: "Platform",
    status: "Staging",
    year: "2026",
    privateRepo: true,
    summary:
      "Un marketplace colombiano de alojamiento reconstruido de una app no-code a un monorepo tipado: anfitriones multi-tenant, un motor de reservas seguro ante concurrencia, comisiones configurables congeladas al reservar, pagos confirmados por webhook y un libro contable solo de inserción.",
    problem:
      "El marketplace anterior corría en una herramienta no-code con los datos atrapados en exportaciones CSV, sin motor de reservas real, sin pagos y sin modelo de anfitriones con varios usuarios.",
    solution:
      "Un monorepo pnpm con un esquema Postgres normalizado, RBAC en dos ejes, un flujo retención → checkout → webhook protegido por una restricción EXCLUDE, reglas de comisión resueltas por prioridad y congeladas en cada reserva, y un importador re-ejecutable que migró los datos heredados sin adivinar.",
    tags: ["Next.js 15", "PostgreSQL", "Drizzle", "Wompi", "Cloudflare Workers", "Hyperdrive", "PWA"],
    stack: [
      { group: "Frontend", items: ["Next.js 15", "React 19", "Tailwind", "Custom design system", "PWA + offline page"] },
      { group: "Backend", items: ["Server Actions", "Zod", "scrypt sessions", "Google OAuth", "State machine"] },
      { group: "Datos", items: ["PostgreSQL 16", "Drizzle ORM", "EXCLUDE constraints", "Append-only ledger"] },
      { group: "Infraestructura", items: ["Cloudflare Workers (OpenNext)", "Hyperdrive", "Neon", "GitHub Actions deploy + seed"] },
    ],
    metrics: [
      { value: "47", label: "rutas en el build de producción" },
      { value: "30", label: "tablas, 6 migraciones" },
      { value: "3-way", label: "prueba de concurrencia: exactamente un ganador" },
      { value: "0", label: "duplicados al re-ejecutar el importador" },
    ],
    architecture: {
      lanes: [
        { name: "Clientes", nodes: [{ label: "Huéspedes", detail: "buscar · reservar" }, { label: "Anfitriones", detail: "calendario · ingresos" }, { label: "Admins", detail: "aprobaciones · finanzas" }] },
        { name: "App", nodes: [{ label: "Rutas Next.js", detail: "marketplace · anfitrión · admin" }, { label: "Capa de dominio", detail: "motor de reservas · precios · comisión" }] },
        { name: "Datos", nodes: [{ label: "Hyperdrive → Postgres" }, { label: "Libro contable + auditoría" }] },
        { name: "Externos", nodes: [{ label: "Checkout de Wompi" }, { label: "Google OAuth" }, { label: "Importación CSV heredada" }] },
      ],
      flows: [
        "El origen de la reserva se decide en servidor con una cookie httpOnly: nunca se confía en query strings",
        "Webhook de Wompi → checksum verificado → pago → reserva → asientos contables, en una sola transacción",
        "La página de confirmación solo lee la base de datos; llegar a ella nunca cuenta como éxito",
      ],
    },
    workflows: [
      {
        title: "Retención → checkout → webhook → libro contable",
        steps: [
          { label: "Resolver origen", detail: "marketplace vs enlace directo del anfitrión", kind: "guard" },
          { label: "Crear retención", detail: "regla de comisión resuelta, montos congelados, TTL de 10 min", kind: "auto" },
          { label: "Restricción EXCLUDE", detail: "estadías activas solapadas rechazadas", kind: "data" },
          { label: "Checkout", detail: "UPDATE protegido … WHERE status = from", kind: "external" },
          { label: "Webhook", detail: "checksum verificado, deduplicado por evento", kind: "guard" },
          { label: "Libro contable", detail: "bruto, comisión, tarifa de servicio, por pagar", kind: "data" },
        ],
      },
      {
        title: "Importación heredada, segura de re-ejecutar",
        steps: [
          { label: "Leer exportaciones CSV", detail: "omite archivos de estado de UI y basura", kind: "data" },
          { label: "Tabla de mapeo", detail: "filas heredadas existentes omitidas", kind: "guard" },
          { label: "Desambiguar fechas", detail: "M/D vs D/M cotejado con el total de noches", kind: "auto" },
          { label: "Filas irresolubles omitidas", detail: "nunca se adivinan", kind: "guard" },
          { label: "Requiere verificación", detail: "un admin aprueba cada anuncio importado", kind: "user" },
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
        { from: "units", to: "bookings", cardinality: "1–N", label: "sin solapamiento (EXCLUDE)" },
        { from: "bookings", to: "payments", cardinality: "1–N" },
        { from: "bookings", to: "ledger_entries", cardinality: "1–N" },
      ],
    },
    sections: [
      {
        title: "Depuración en el edge",
        body: "Se encontró la causa raíz y se documentaron cuatro fallas de staging en Cloudflare Workers: una dependencia de base de datos en tiempo de build, TCP crudo desde un Worker (resuelto con Hyperdrive), un requisito de despliegue oculto en el adaptador y un error de 'connection closed' por un cliente cacheado entre solicitudes.",
      },
    ],
  },
  {
    slug: "digital-concierge",
    name: "Digital Concierge",
    label: "Marketplace de servicios · marca y experiencia",
    category: "Product",
    status: "Built & tested",
    year: "2026",
    privateRepo: true,
    summary:
      "Un concierge bilingüe para trámites entre Colombia y EE. UU.: describe lo que necesitas, obtén la mejor opción con un desglose de precio transparente y elige hacerlo tú mismo, con ayuda o totalmente gestionado.",
    problem:
      "Quienes gestionan apostillas, registro civil y trámites consulares entre dos países enfrentan procesos poco claros y precios opacos.",
    solution:
      "Un front end rápido, accesible y pensado para SEO sobre un catálogo tipado, con búsqueda sin JavaScript, tres modalidades de servicio por ítem y un control de release que bloquea producción mientras haya un precio sin verificar. El modelo de datos ya incluye un modo de cumplimiento para que los servicios pasen de manuales a automatizados.",
    tags: ["Next.js 16", "TypeScript", "Tailwind v4", "Cloudflare Workers", "Playwright", "axe-core"],
    stack: [
      { group: "Frontend", items: ["Next.js 16", "React 19", "Tailwind v4", "Self-hosted variable fonts"] },
      { group: "Infraestructura", items: ["Cloudflare Workers (OpenNext)", "Staging auto-deploy", "SHA-gated production"] },
      { group: "Calidad", items: ["Vitest", "Playwright 390 / 1280 px", "axe-core", "Edge smoke tests"] },
    ],
    metrics: [
      { value: "87", label: "pruebas unitarias" },
      { value: "0", label: "violaciones de axe a 390 y 1280 px" },
      { value: "2", label: "componentes de cliente en todo el sitio" },
      { value: "≥4.5:1", label: "contraste, garantizado por pruebas" },
    ],
    workflows: [
      {
        title: "Pipeline de release: push → staging → producción controlada",
        steps: [
          { label: "Push", detail: "lint, typecheck, formato, unitarias, build", kind: "auto" },
          { label: "Playwright", detail: "móvil 390 + escritorio 1280", kind: "guard" },
          { label: "Desplegar staging", detail: "Cloudflare Worker", kind: "auto" },
          { label: "Smoke en el edge", detail: "headers, robots, sitemap, 404, OG", kind: "guard" },
          { label: "Disparo manual", detail: "el mismo SHA debe estar en verde en staging", kind: "user" },
          { label: "Control de release", detail: "falla con precios sin verificar o sin contacto", kind: "guard" },
        ],
      },
    ],
  },
  {
    slug: "gwork-systems",
    name: "GWork Systems",
    label: "Sitio corporativo · captación de leads y privacidad",
    category: "Web",
    status: "Live",
    year: "2026",
    privateRepo: true,
    live: "https://gworksystems.com",
    summary:
      "El sitio bilingüe de mi práctica de software, automatización y seguridad: un export estático de Next.js en Cloudflare Pages con un pipeline serverless de leads endurecido y analítica que solo carga tras el consentimiento.",
    problem:
      "Una empresa de servicios necesita un posicionamiento creíble, captación confiable de leads en lugar de enlaces mailto y analítica que respete la privacidad por defecto.",
    solution:
      "Un sitio EN/ES totalmente estático con headers de seguridad estrictos, una Pages Function de Cloudflare que valida, limita, guarda y enruta cada lead, y un sistema de consentimiento propio donde ninguna solicitud a Google ocurre antes de que el visitante acepte.",
    tags: ["Next.js 16", "Cloudflare Pages", "Pages Functions", "KV", "Resend", "GTM Consent Mode", "Playwright"],
    stack: [
      { group: "Frontend", items: ["Next.js 16 static export", "React 19", "Tailwind v4", "EN / ES"] },
      { group: "Serverless", items: ["Pages Functions", "Cloudflare KV", "Resend", "Email Routing"] },
      { group: "Calidad", items: ["Playwright + axe", "CSP regression tests", "Consent network tests", "Vitest"] },
    ],
    metrics: [
      { value: "0", label: "solicitudes a Google antes del consentimiento (probado en red)" },
      { value: "5/h", label: "límite de leads por IP" },
      { value: "360–1920", label: "px de rango responsive verificado" },
      { value: "EN · ES", label: "cada página, 404 y página legal" },
    ],
    architecture: {
      lanes: [
        { name: "Navegador", nodes: [{ label: "Páginas estáticas", detail: "EN / ES" }, { label: "Formularios de leads" }, { label: "Banner de consentimiento" }] },
        { name: "Edge", nodes: [{ label: "POST /api/leads", detail: "Pages Function" }, { label: "_headers", detail: "CSP · HSTS · COOP" }] },
        { name: "Almacenamiento", nodes: [{ label: "Cloudflare KV", detail: "leads + buckets de rate limit" }] },
        { name: "Entrega", nodes: [{ label: "Resend", detail: "notificación categorizada" }, { label: "GTM → GA4", detail: "solo tras el consentimiento" }] },
      ],
      flows: [
        "El lead se escribe en KV antes de intentar cualquier email: una falla de email nunca pierde un lead",
        "Los eventos de analítica son una unión cerrada de TypeScript, así no se puede enviar PII por error",
      ],
    },
    workflows: [
      {
        title: "Captación de leads",
        steps: [
          { label: "Envío del formulario", kind: "user" },
          { label: "Verificación de origen", detail: "orígenes ajenos → 403", kind: "guard" },
          { label: "Rate limit", detail: "5 por hora por IP (KV)", kind: "guard" },
          { label: "Validar", detail: "honeypot, tiempo mínimo de llenado, límites de longitud", kind: "guard" },
          { label: "Guardar en KV", detail: "persistido antes de notificar", kind: "data" },
          { label: "Enrutar + notificar", detail: "categoría → alias vía Resend", kind: "external" },
          { label: "Evento de éxito", detail: "solo se dispara cuando el servidor responde ok", kind: "auto" },
        ],
      },
    ],
  },
  {
    slug: "smart-library",
    name: "Smart Library",
    label: "App full-stack en producción · asistente fundamentado",
    category: "Product",
    status: "Live",
    year: "2026",
    github: "https://github.com/alejo21ny/smart-library-challenge",
    live: "https://smart-library-zsh8.onrender.com",
    summary:
      "Un sistema real de gestión de bibliotecas: catálogo, préstamo/devolución, acceso por roles, un rastro de auditoría basado en eventos y un asistente en lenguaje natural fundamentado que nunca inventa un libro.",
    problem:
      "Construir un sistema de biblioteca que vaya más allá del CRUD, mostrando criterio en concurrencia, seguridad y dónde una frontera de IA realmente aporta valor, y llevarlo hasta un despliegue en funcionamiento.",
    solution:
      "Laravel 12 + Inertia/React sobre PostgreSQL con búsqueda difusa por trigramas. Un libro nunca puede prestarse dos veces (índice único parcial + transacción con bloqueo), los roles se validan en servidor y el asistente ejecuta consultas de solo lectura sobre tablas reales detrás de una interfaz de proveedor de IA intercambiable.",
    tags: ["Laravel 12", "React", "TypeScript", "PostgreSQL", "Docker", "Google SSO", "RBAC", "CI/CD"],
    stack: [
      { group: "Backend", items: ["Laravel 12", "Policies · Form Requests · Actions · Events", "AiProviderInterface"] },
      { group: "Frontend", items: ["Inertia.js", "React", "TypeScript"] },
      { group: "Datos", items: ["PostgreSQL 18", "pg_trgm fuzzy search"] },
      { group: "Entrega", items: ["Docker", "Render", "3 GitHub Actions jobs"] },
    ],
    metrics: [
      { value: "93", label: "pruebas de backend con Pest" },
      { value: "13", label: "pruebas E2E con Playwright" },
      { value: "L5", label: "análisis estático con Larastan" },
      { value: "Live", label: "en producción en Render" },
    ],
    ai: [
      "Un enrutador de acciones determinista clasifica la pregunta y luego ejecuta una consulta real de solo lectura: cada respuesta es una fila genuina.",
      "El respaldo por trigramas tolera errores de tipeo cuando la búsqueda estricta no devuelve nada.",
      "La superficie de herramientas es de solo lectura por diseño y tiene su propio rate limit.",
      "Se puede conectar un proveedor compatible con OpenAI detrás de AiProviderInterface; el despliegue en vivo usa el respaldo determinista.",
    ],
    workflows: [
      {
        title: "Asistente fundamentado",
        steps: [
          { label: "El socio hace una pregunta", kind: "user" },
          { label: "Enrutador de acciones", detail: "clasificación de intención determinista", kind: "ai" },
          { label: "Consulta de solo lectura", detail: "tablas de catálogo + préstamos", kind: "data" },
          { label: "Respaldo por trigramas", detail: "tolerancia a errores de tipeo", kind: "auto" },
          { label: "Respuesta con filas reales", detail: "nunca inventada", kind: "guard" },
        ],
      },
      {
        title: "Prestar un libro",
        steps: [
          { label: "Solicitud de préstamo", kind: "user" },
          { label: "Verificación de política", detail: "rol validado en servidor", kind: "guard" },
          { label: "Transacción con bloqueo", kind: "data" },
          { label: "Índice único parcial", detail: "préstamo doble imposible", kind: "guard" },
          { label: "Evento de auditoría", kind: "auto" },
        ],
      },
    ],
  },
  {
    slug: "hubspot-portal-sync",
    name: "HubSpot Portal Sync",
    label: "Ingeniería de APIs e integraciones",
    category: "Integration",
    status: "Built & tested",
    year: "2026",
    github: "https://github.com/alejo21ny/hubspot-portal-sync-assessment",
    summary:
      "Sincronización idempotente de un objeto personalizado de HubSpot entre dos portales, con un identificador externo como clave para que volver a ejecutarla nunca cree duplicados.",
    problem:
      "Dos portales guardan cada uno una copia de un objeto de ticket personalizado. Mantenerlos sincronizados sin duplicados, y sin perder en silencio un intento fallido, es fácil de hacer mal cuando aparecen reintentos, rate limits y automatizaciones re-disparadas.",
    solution:
      "Un orquestador detrás de dos puntos de entrada delgados (función serverless y código personalizado de workflow). Un identificador externo es la clave de cada sincronización; ocurre exactamente una de crear, actualizar, archivar o no-op, y el resultado se escribe de vuelta en el registro de origen.",
    tags: ["Node.js", "HubSpot API", "Idempotency", "Retry/Backoff", "42 tests", "GitHub Actions"],
    stack: [
      { group: "Runtime", items: ["Node.js", "HubSpot Serverless Functions", "Workflow Custom Code"] },
      { group: "Calidad", items: ["node:test", "Mocks & fakes only", "GitHub Actions"] },
    ],
    metrics: [
      { value: "42", label: "pruebas, sin llamadas a la API real" },
      { value: "1", label: "dependencia real" },
      { value: "4", label: "resultados posibles por sincronización" },
      { value: "0", label: "tokens en logs (probado)" },
    ],
    workflows: [
      {
        title: "Sincronización entre portales",
        steps: [
          { label: "Disparador", detail: "función serverless o acción de workflow", kind: "external" },
          { label: "Leer + mapear origen", kind: "auto" },
          { label: "Buscar destino por id externo", detail: ">1 coincidencia falla de forma explícita", kind: "guard" },
          { label: "Crear / actualizar / archivar / no-op", kind: "auto" },
          { label: "Reintentar solo 429 / 5xx", detail: "4xx falla de inmediato", kind: "guard" },
          { label: "Escribir el estado de vuelta", detail: "best-effort, nunca oculta el error real", kind: "data" },
        ],
      },
    ],
  },
];
