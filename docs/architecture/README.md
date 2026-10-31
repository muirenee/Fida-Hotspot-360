# Hybrid architecture — Fida Hotspot 360

## Control plane (cloud)
NestJS API, Next.js management web, PostgreSQL and Redis. Owns tenants, properties, gateway inventory, plans, vouchers, audit, configuration versions and licensing.

## Data plane (hotel)
Local FreeRADIUS, local policy store, gateway/controller and edge agent. Guest internet traffic must stay at the hotel. Cloud outages must not automatically grant unknown guests access.

## Security invariants
- Tenant identifiers are derived from verified identity, never untrusted request inputs.
- All property-owned resources have scoped foreign keys and server-side permission checks.
- Cloud-to-edge provisioning uses per-device credentials and authenticated encrypted transport.
- Offline config changes use monotonically increasing revisions; accounting events use idempotency keys.
- Existing sessions continue under cached authorization; no global fail-open.
- Secrets are never stored in the Git repository.

## Integration milestones
1. OPNsense captive portal authorization and accounting contract tests against the supported firmware.
2. FreeRADIUS SQL configuration and locally cached guest authorization.
3. Edge-to-cloud secure enrollment and durable synchronization.
4. Ruckus SmartZone vendor adapter, separately validated.

The API starter intentionally contains no unprotected tenant-management routes.
