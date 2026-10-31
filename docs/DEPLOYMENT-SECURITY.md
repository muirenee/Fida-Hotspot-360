# Secure v0.2 development deployment

Do not expose the cloud API to the public Internet without TLS termination, firewall rules, rate limiting, observability, and confirmed OIDC configuration.

1. Register a confidential/API resource with a trusted OpenID provider. Configure OIDC_ISSUER and OIDC_AUDIENCE.
2. Apply Prisma schema migrations in a non-production database. Do not use `prisma db push` on production databases.
3. Provision User and Membership rows through a trusted internal administrative process; never let callers specify their own role/tenant in a signup request.
4. Protect the cloud API behind HTTPS reverse proxy. Add network restrictions for administration APIs and database.
5. Verify tenant-crossing integration tests in a deployed database.
6. Create property through POST /v1/tenants/{tenantId}/properties, with a verified Bearer JWT.

**Security limitations:** No RLS migrations, IdP discovery, session rate limiting, edge certificate enrollment, or production audit trail yet. These are hard deployment blockers, not optional enhancements.
