# Tenant authorization boundary

These helpers define the authorization contract but **do not authenticate HTTP requests**.
All tenant-management controllers MUST remain disabled until they are protected by a configured OIDC JWT verifier that checks:
- JWT signature via a trusted JWKS and allowed signing algorithms
- Exact issuer and audience
- Expiration and not-before
- Tenant/property membership from a trusted authorization datastore, not arbitrary client-supplied claims
- Role + property authorization for every operation

Treat `toVerifiedIdentity` as a claim-shape validator only. Never pass an unverified JWT payload into it and never treat its output alone as proof of valid authentication.

Security is deny-by-default. Do not use `x-tenant-id`, `x-user-id`, query strings or body fields as identity.
