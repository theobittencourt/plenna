import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PartnersService } from './partners.service';
import { AffiliatesService } from './affiliates.service';
import { ReferralsService } from './referrals.service';
import { AffiliateMarketController } from './affiliate-market.controller';
import { ReferralsController } from './referrals.controller';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController, AffiliateMarketController, ReferralsController],
  providers: [ProductsService, PartnersService, AffiliatesService, ReferralsService],
})
export class ProductsModule {}