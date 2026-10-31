import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { requireProperty, canManageHotel, type VerifiedIdentity } from './tenant-context';

const user: VerifiedIdentity = { subject: 'user-1', tenantId: 'tenant-a', propertyIds: ['property-a'], role: 'reception' };
test('same-tenant permitted property is allowed', () => {
  assert.equal(requireProperty(user, 'tenant-a', 'property-a').subject, 'user-1');
});
test('cross-tenant access is denied', () => {
  assert.throws(() => requireProperty(user, 'tenant-b', 'property-a'));
});
test('cross-property access is denied', () => {
  assert.throws(() => requireProperty(user, 'tenant-a', 'property-b'));
});
test('anonymous access is denied', () => {
  assert.throws(() => requireProperty(undefined, 'tenant-a', 'property-a'));
});
test('reception may not manage hotel settings', () => {
  assert.equal(canManageHotel(user), false);
});
