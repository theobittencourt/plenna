import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ReferralsService {
  constructor(private prisma: PrismaService) {}

  async getReferrals(userId: string) {
    const referral = await this.prisma.referral.findUnique({
      where: { userId },
      include: { referralSales: true }
    });

    return {
      referrals: referral?.referralSales || [],
      referralLink: referral?.referralLink || '',
      stats: {
        totalReferrals: referral?.totalReferrals || 0,
        totalEarnings: referral?.totalEarnings || 0,
        activeReferrals: referral?.referralSales?.length || 0
      }
    };
  }

  async generateReferralLink(userId: string) {
    const link = `https://plenna.com/ref/${userId}`;
    
    const referral = await this.prisma.referral.upsert({
      where: { userId },
      update: { referralLink: link },
      create: {
        userId,
        referralLink: link
      }
    });

    return { link: referral.referralLink };
  }
}