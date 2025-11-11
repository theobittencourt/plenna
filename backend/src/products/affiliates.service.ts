import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AffiliatesService {
  constructor(private prisma: PrismaService) {}

  async getAffiliates(productId: number) {
    return this.prisma.productAffiliate.findMany({
      where: { productId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateSettings(productId: number, settings: any) {
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        affiliateEnabled: settings.enabled,
        affiliateType: settings.type,
        affiliateCommission: parseFloat(settings.singleCommission || 0),
        affiliateRecurringCommission: parseFloat(settings.recurringCommission || 0)
      }
    });
  }
}