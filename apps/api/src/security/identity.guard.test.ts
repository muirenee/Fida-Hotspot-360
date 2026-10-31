import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { toVerifiedIdentity } from './oidc-claims';

test('malformed claims are denied', () => {
  assert.throws(() => toVerifiedIdentity({ sub: 'a', tenant_id: 'b', hotel_role: 'viewer', property_ids: 'wrong' }));
});
test('valid claims can be normalized only after signature verification', () => {
  const identity = toVerifiedIdentity({ sub: 'a', tenant_id: 'b', property_ids: ['c'], hotel_role: 'viewer' });
  assert.equal(identity.tenantId, 'b');
});
