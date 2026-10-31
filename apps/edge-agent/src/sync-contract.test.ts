import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { acceptRevision } from './sync-contract';
test('reject stale configuration revision', () => {
  assert.equal(acceptRevision(5, { revision: 5, checksum: 'a', validUntil: '', payload: {} }), false);
});
test('accept next configuration revision', () => {
  assert.equal(acceptRevision(5, { revision: 6, checksum: 'b', validUntil: '', payload: {} }), true);
});
