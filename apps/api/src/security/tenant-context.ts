import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

export const HOTEL_ROLES = ['platform_admin', 'hotel_admin', 'reception', 'viewer'] as const;
export type HotelRole = typeof HOTEL_ROLES[number];
export type VerifiedIdentity = {
  subject: string;
  tenantId: string;
  propertyIds: readonly string[];
  role: HotelRole;
};

/** Accepts claims ONLY from a verified OIDC JWT validation layer. Never parse request headers here. */
export function requireProperty(identity: VerifiedIdentity | undefined, tenantId: string, propertyId: string): VerifiedIdentity {
  if (!identity?.subject) throw new UnauthorizedException('Authentication required');
  if (identity.tenantId !== tenantId) throw new ForbiddenException('Tenant mismatch');
  if (!identity.propertyIds.includes(propertyId)) throw new ForbiddenException('Property not permitted');
  return identity;
}

export function canManageHotel(identity: VerifiedIdentity): boolean {
  return identity.role === 'platform_admin' || identity.role === 'hotel_admin';
}
