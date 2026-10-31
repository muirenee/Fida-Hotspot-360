# Hotel-local FreeRADIUS

This directory holds operator-reviewed configuration templates for the hotel edge.
The container is intentionally not exposed or started automatically in the cloud Compose stack.

## Setup
1. Install FreeRADIUS 3.x, PostgreSQL module and a local PostgreSQL instance on the hotel edge.
2. Initialize the FreeRADIUS packaged PostgreSQL schema, then configure rlm_sql with a local least-privilege user.
3. Restrict UDP 1812/1813 to explicitly approved NAS gateway IPs using firewall ACLs.
4. Configure a **unique** long random RADIUS shared secret for each NAS. Do not copy development secrets into production.
5. Configure authenticated RADIUS accounting with PostgreSQL, interim updates, and resilient local disk queues.
6. Configure the gateway to authenticate against the edge IP, not the public cloud.
7. Validate Access-Request, Access-Accept/Reject, Accounting-Start/Interim/Stop with radclient/radtest and an actual gateway.

See clients.conf.example for a commented template. Real users and policies are not yet provisioned by the app.
