import { BadRequestException, Body, Controller, ForbiddenException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { IdentityGuard, type ScopedRequest } from '../security/identity.guard';
import { VoucherService } from './voucher.service';

@Controller('v1/tenants/:tenantId/properties/:propertyId/vouchers')
@UseGuards(IdentityGuard)
export class VoucherController {
 constructor(private readonly vouchers:VoucherService){}
 @Post('issue')
 issue(@Param('tenantId') tenantId:string,@Param('propertyId') propertyId:string,@Req() req:ScopedRequest,@Body() body:unknown) {
  const identity=req.identity;
  if(!identity || identity.tenantId!==tenantId || !identity.propertyIds.includes(propertyId) ||
     !['hotel_admin','reception'].includes(identity.role)) throw new ForbiddenException();
  if(!body || typeof body!=='object') throw new BadRequestException();
  const {planId,count} = body as Record<string,unknown>;
  if(typeof planId!=='string' || typeof count!=='number') throw new BadRequestException();
  return this.vouchers.issue(tenantId,propertyId,planId,count);
 }
}
