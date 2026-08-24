# Discord Badge Bot

A full-stack Discord badge encyclopedia and bot. Users can browse every Discord badge, read minimal-effort unlock guides, and grab browser console commands — both on the web dashboard and directly inside Discord via slash commands.

## Run & Operate

- `pnpm --filter @workspace/badge-bot run dev` — run the web dashboard (port from $PORT)
- `pnpm --filter @workspace/api-server run dev` — run the API server + Discord bot (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (not used — badge data is static)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Discord: discord.js v14
- Frontend: React + Vite + Tailwind CSS + TanStack Query

## Where things live

- `artifacts/api-server/src/data/badges.ts` — all badge data (source of truth)
- `artifacts/api-server/src/routes/badges.ts` — badge API routes
- `artifacts/api-server/src/bot/index.ts` — Discord bot startup + slash command handler
- `artifacts/api-server/src/bot/commands.ts` — embed builders + slash command definitions
- `artifacts/badge-bot/src/` — React web dashboard
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)

## Architecture decisions

- Badge data is static (defined in TypeScript) — no database needed for badge info
- Discord slash commands are registered as global commands on startup
- Console commands are sent as ephemeral messages to avoid public exposure of token-extracting snippets
- Badge ID uses kebab-case slugs matching the data file (e.g. `hypesquad-bravery`)

## Product

- **Web dashboard** (`/`): searchable/filterable badge grid with rarity indicators, difficulty chips, obtainable status
- **Badge detail** (`/badge/:id`): full unlock guide, console command code block with copy button, tips
- **Stats** (`/stats`): charts and counts by category and difficulty
- **Personal collection** (`/collection`): browser-local badge checklist with progress across currently obtainable badges
- **Discord bot**: `/badge search`, `/badge info`, `/badge guide`, `/badge console`, `/badge list`, `/badge stats`, `/badge obtainable`, `/badge quickwins`, `/badge rarest`, `/badge legacy`, `/badge random`, `/badge hunt`, `/badge checklist`, `/badge own`, `/badge unown`, `/badge reset`

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- OpenAPI spec: do NOT use `type: integer` — Orval generates `zod.int()` which doesn't exist in Zod v3. Use `type: number` instead.
- Discord bot registers global slash commands on every startup (safe — it's idempotent, but takes ~1hr to propagate for new registrations)
- Console commands are intentionally sent as ephemeral (only visible to the requesting user) for safety
- Browser checklist state is stored in the current browser's localStorage. Bot checklist state is private to the Discord user but resets if the bot process restarts.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
