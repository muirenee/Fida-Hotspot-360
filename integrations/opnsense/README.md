# OPNsense Phase 1 integration contract

Target: gateway portal manages redirection and network enforcement; hotel-local FreeRADIUS validates guest credentials and receives accounting.

## Provisioning
- Place AP guest SSID in a dedicated guest VLAN.
- Deny access from guest VLAN to administration LAN, edge database, and cloud control interfaces.
- Permit DNS/DHCP/captive portal discovery only as required.
- Configure RADIUS auth/accounting endpoints to HOTEL LOCAL edge.
- Configure captive portal zone and verify authentication policy fields per exact OPNsense release.
- Set accounting interim updates and validate sequence/accuracy of usage counters.
- Explicitly test guest logoff, expiry and gateway reboots.

## Adapter planned methods
authorizeGuest, disconnectSession, listSessions, applyPlan, healthCheck.

No unverified private OPNsense API endpoint has been assumed. Adapter execution must be tested against a lab gateway and versioned fixtures.
