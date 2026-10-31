import { BadRequestException, ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { generateVoucherCode, hashVoucherCode } from './voucher-code';

@Injectable()
export class VoucherService {
 private readonly db = new PrismaClient();

 async issue(tenantId:string, propertyId:string, planId:string, count:number) {
  if (!Number.isSafeInteger(count) || count < 1 || count > 100) throw new BadRequestException('Count must be between 1 and 100');
  const pepper=process.env.VOUCHER_PEPPER;
  if (!pepper || pepper.length < 32) throw new ServiceUnavailableException('Voucher signing key not configured');
  return this.db.$transaction(async tx=>{
   const plan=await tx.accessPlan.findFirst({where:{id:planId,tenantId,propertyId}});
   if (!plan) throw new BadRequestException('Access plan not found');
   const codes=Array.from({length:count},generateVoucherCode);
   await tx.voucher.createMany({data:codes.map(code=>({tenantId,propertyId,accessPlanId:plan.id,codeHash:hashVoucherCode(code,pepper),status:'unused'}))});
   // Plaintext codes exist only in this response; client must securely print or distribute them.
   return {codes,planId};
  });
 }

 /** Edge-only operation. Call from a future authenticated edge transport, NOT public guest API. */
 async redeemForEdge(tenantId:string,propertyId:string,code:string) {
  const pepper=process.env.VOUCHER_PEPPER;
  if (!pepper || pepper.length < 32) throw new ServiceUnavailableException('Voucher signing key not configured');
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(code)) throw new BadRequestException('Invalid voucher');
  const hash=hashVoucherCode(code,pepper);
  const result=await this.db.voucher.updateMany({
   where:{tenantId,propertyId,codeHash:hash,status:'unused',OR:[{expiresAt:null},{expiresAt:{gt:new Date()}}]},
   data:{status:'redeemed',redeemedAt:new Date()}
  });
  if(result.count!==1) throw new ConflictException('Voucher invalid, expired or already used');
  const voucher=await this.db.voucher.findFirstOrThrow({where:{tenantId,propertyId,codeHash:hash},select:{id:true,accessPlanId:true,redeemedAt:true}});
  return voucher;
 }
}
