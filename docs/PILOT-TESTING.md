# Pilot verification procedure

## Prerequisites
- Isolated hotel guest VLAN and test OPNsense gateway; no production guests.
- FreeRADIUS on local edge with a unique NAS shared secret and local PostgreSQL.
- Authorized OIDC test tenant membership records and test users.
- Lab DNS and internet for the captive portal.

## Essential tests (all must pass)
1. Create hotel from a verified hotel_admin JWT; reject reception role.
2. Verify cross-tenant identity and cross-property access returns 403.
3. Confirm access fails closed when JWT expired, audience incorrect, or JWKS unavailable.
4. Validate RADIUS Access-Request accept/reject and accounting start/interim/stop.
5. Verify guest internet works through OPNsense and quota/speed policies are enforced on hardware.
6. Disconnect guest on expiration and test gateway reboot behavior.
7. Disconnect cloud management for 60 minutes; check new and existing authorized sessions and local accounting.
8. Reconnect; reconcile sessions without double counting.
9. Restore edge data from a backup and rotate the NAS secret.
10. Run full security scan and document results before pilot signoff.

Current version lacks working voucher provisioning and RADIUS integration. Tests 4–10 are NOT yet automated or passed.
