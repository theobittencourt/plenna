import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ReferralsService } from './referrals.service';

@Controller('referrals')
@UseGuards(JwtAuthGuard)
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get()
  getReferrals(@CurrentUser() user: any) {
    return this.referralsService.getReferrals(user.userId);
  }

  @Post('generate')
  generateReferralLink(@CurrentUser() user: any) {
    return this.referralsService.generateReferralLink(user.userId);
  }
}