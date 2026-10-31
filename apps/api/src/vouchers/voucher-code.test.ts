import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { generateVoucherCode, hashVoucherCode } from './voucher-code';

const pepper = 'test-only-key-longer-than-thirty-two-characters';
test('voucher values are randomized and URL-safe', () => {
 const a = generateVoucherCode(), b = generateVoucherCode();
 assert.notEqual(a,b);
 assert.match(a,/^[A-Za-z0-9_-]+$/);
 assert.ok(a.length >= 20);
});
test('hash is deterministic and keyed', () => {
 const a = hashVoucherCode('voucher',pepper);
 assert.equal(a,hashVoucherCode('voucher',pepper));
 assert.notEqual(a,hashVoucherCode('voucher',pepper+'different'));
});
test('short pepper is denied',()=>assert.throws(()=>hashVoucherCode('x','weak')));
