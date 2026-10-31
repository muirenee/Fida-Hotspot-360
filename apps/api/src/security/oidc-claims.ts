/** Mapping layer for claims AFTER issuer/audience/signature/expiration have been verified. */
import { UnauthorizedException } from '@nestjs/common';
import type { VerifiedIdentity, HotelRole } from './tenant-context';

export type OidcClaims = {
  sub?: unknown;
  tenant_id?: unknown;
  property_ids?: unknown;
  hotel_role?: unknown;
};

const roles: readonly string[] = ['platform_admin', 'hotel_admin', 'reception', 'viewer'];

export function toVerifiedIdentity(claims: OidcClaims): VerifiedIdentity {
  if (typeof claims.sub !== 'string' || !claims.sub.trim() ||
      typeof claims.tenant_id !== 'string' || !claims.tenant_id.trim() ||
      !Array.isArray(claims.property_ids) ||
      !claims.property_ids.every(id => typeof id === 'string') ||
      !roles.includes(String(claims.hotel_role))) {
    throw new UnauthorizedException('Invalid authorization claims');
  }
  return {
    subject: claims.sub,
    tenantId: claims.tenant_id,
    propertyIds: claims.property_ids,
    role: claims.hotel_role as HotelRole,
  };
}
