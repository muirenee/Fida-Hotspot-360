# Phase 1 delivery plan

- [x] Repository foundation and monorepo configuration
- [x] Basic cloud API health endpoint, web shell and edge health endpoint
- [x] Initial tenant/property/gateway/access-plan Prisma models
- [ ] Enforce OIDC, RBAC and tenant database isolation before business APIs
- [ ] Add Prisma migrations, tenant context tests and seeded local demo fixtures
- [ ] Add edge enrollment, device certificate rotation and secure configuration sync
- [ ] Implement FreeRADIUS SQL policies, local cache and accounting ingestion
- [ ] Implement OPNsense captive portal adapter and real-device contract tests
- [ ] Implement voucher issuance, transactional redemption and guest UI
- [ ] Implement sessions, quota accounting, revocation and bandwidth enforcement
- [ ] Run cloud outage, backup/restore, security and pilot tests

## Pilot definition of done
A hotel operator issues a voucher, a Wi-Fi client authenticates on the locally served portal, the OPNsense gateway grants limited internet access, RADIUS accounting records session events, the dashboard displays session status, and cloud disconnection does not interrupt locally authorized access.
