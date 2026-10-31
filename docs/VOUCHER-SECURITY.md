# Voucher lifecycle (development)

Issue: hotel administrator or reception, scoped by authenticated tenant/property membership. Maximum 100 codes per call. A cryptographically random 128-bit voucher is returned once, with keyed SHA-256 hash persisted in PostgreSQL.

Redeem: atomic conditional update, denies duplicate redemption, expiration and cross-property use. The redemption method is **not exposed to HTTP**. A future edge-only authenticated API will invoke it, and must include replay protection and local/cloud reconciliation.

Security requirements:
- Set VOUCHER_PEPPER to a long unique secret managed outside Git; losing it renders existing voucher hashes unmatchable.
- Use HTTPS, avoid logging voucher plaintext and disable response caching.
- Add permission audit records and strict per-user issuance rate limits before production.
- Add encrypted/hardened printable voucher export with one-time retrieval.
- Add offline voucher allocation protocol and conflict handling.
- Run real PostgreSQL concurrency tests and edge policy integration tests before declaring production ready.
