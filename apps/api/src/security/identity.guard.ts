import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Request } from 'express';
import { verifyBearer } from './jwt-verifier';

export type ScopedRequest = Request & { identity?: { sub: string; tenantId: string; role: string; propertyIds: string[] } };

@Injectable()
export class IdentityGuard implements CanActivate {
  private readonly prisma = new PrismaClient();
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ScopedRequest>();
    const sub = await verifyBearer(request.headers.authorization);
    const tenantId = request.params.tenantId;
    if (!tenantId || typeof tenantId !== 'string') throw new UnauthorizedException('Tenant scope required');
    const user = await this.prisma.user.findUnique({ where: { subject: sub }, include: { memberships: true } });
    const membership = user?.memberships.find(m => m.tenantId === tenantId && m.active);
    if (!membership) throw new ForbiddenException('Not a tenant member');
    request.identity = { sub, tenantId, role: membership.role, propertyIds: membership.propertyIds };
    return true;
  }
}
