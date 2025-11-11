import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('affiliate-market')
@UseGuards(JwtAuthGuard)
export class AffiliateMarketController {
  @Get()
  getAffiliateMarket() {
    return [];
  }
}