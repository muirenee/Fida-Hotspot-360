# Fida Hotspot 360

Fidalix-owned hybrid cloud/on-premises hospitality internet management platform.

## Status
Version 0.1.0 foundation. **Not production-ready**. The repository currently provides a cloud API starter, tenant-aware PostgreSQL schema, basic hotel admin UI, edge health service, containerized development database, and CI checks. Real RADIUS authentication, OPNsense adapters, guest captive portal, enrollment, and offline synchronization are subsequent Phase 1 deliverables.

## Prerequisites
Node.js 22+, pnpm 10+, Docker with Compose.

## Local quickstart
```bash
cp .env.example .env
docker compose up -d postgres redis
corepack enable
pnpm install
pnpm db:generate
pnpm db:push
pnpm dev
```

API: http://localhost:3001/health
Web: http://localhost:3000
Edge: http://localhost:3002/health

## Security
Do not expose this prototype to the public internet or put real guest data into it. Tenant endpoints are deliberately not exposed until OIDC authorization and tenant isolation tests are implemented. Never commit .env or credentials.

See [Architecture](docs/architecture/README.md) and [Phase 1 roadmap](docs/PHASE1.md).
