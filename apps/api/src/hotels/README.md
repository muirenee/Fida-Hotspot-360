# Hotel API: current capabilities

Protected by OIDC JWT signature, issuer, audience, expiry, and database membership validation.
GET and POST /v1/tenants/:tenantId/properties.
A tenant must already exist and a user record/membership must be provisioned by a trusted administrator (do not expose membership self-registration).
The user role hotel_admin creates property records; reception/viewer can list only explicitly assigned property IDs.

Configuration: OIDC_ISSUER, OIDC_AUDIENCE, DATABASE_URL.
JWT signing algorithm: RS256. JWKS path uses OIDC_ISSUER + '/.well-known/jwks.json'; check IdP publishes keys there. Production should use issuer's OIDC discovery jwks_uri (follow-up).

No tenant creation or membership assignment through public API.
