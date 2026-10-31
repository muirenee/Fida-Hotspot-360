import { Body, Controller, ForbiddenException, Get, Param, Post, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { ScopedRequest } from '../security/identity.guard';
import { IdentityGuard } from '../security/identity.guard';

@Controller('v1/tenants/:tenantId/properties')
@UseGuards(IdentityGuard)
export class HotelsController {
  private readonly prisma = new PrismaClient();
  @Get()
  list(@Param('tenantId') tenantId: string, @Req() req: ScopedRequest) {
    const ids = req.identity?.propertyIds ?? [];
    return this.prisma.property.findMany({
      where: { tenantId, ...(req.identity?.role === 'hotel_admin' ? {} : { id: { in: ids } }) },
      select: { id: true, name: true, timezone: true, createdAt: true },
    });
  }

  @Post()
  async create(@Param('tenantId') tenantId: string, @Req() req: ScopedRequest, @Body() body: unknown) {
    if (req.identity?.role !== 'hotel_admin') throw new ForbiddenException('Hotel administrator required');
    if (!body || typeof body !== 'object') throw new BadRequestException('Invalid body');
    const input = body as Record<string, unknown>;
    if (typeof input.name !== 'string' || input.name.trim().length < 2 || input.name.length > 120)
      throw new BadRequestException('Invalid property name');
    const timezone = typeof input.timezone === 'string' ? input.timezone : 'Africa/Kigali';
    try { new Intl.DateTimeFormat('en', { timeZone: timezone }); } catch { throw new BadRequestException('Invalid timezone'); }
    return this.prisma.property.create({ data: { tenantId, name: input.name.trim(), timezone }, select: { id: true, name: true, timezone: true } });
  }
}
