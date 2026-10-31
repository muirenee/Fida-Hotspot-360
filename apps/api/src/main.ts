import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';
import { HotelsModule } from './hotels/hotels.module';
import { VoucherModule } from './vouchers/voucher.module';

@Controller()
class HealthController {
  @Get('health')
  health() {
    return { status: 'ok', service: 'fida-cloud-api', version: '0.2.0' };
  }
}

@Module({ imports: [HotelsModule, VoucherModule], controllers: [HealthController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(Number(process.env.API_PORT ?? 3001), '127.0.0.1');
}
bootstrap().catch((error) => { console.error(error); process.exit(1); });
