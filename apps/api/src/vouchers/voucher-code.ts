import { createHmac, randomBytes } from 'node:crypto';

export function generateVoucherCode(): string {
  return randomBytes(16).toString('base64url');
}
export function hashVoucherCode(code: string, pepper: string): string {
  if (pepper.length < 32) throw new Error('VOUCHER_PEPPER must contain at least 32 characters');
  return createHmac('sha256', pepper).update(code, 'utf8').digest('hex');
}
