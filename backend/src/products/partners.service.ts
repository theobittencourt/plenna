import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  async getPartners(productId: number) {
    return this.prisma.productPartner.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async invitePartner(productId: number, data: any) {
    return this.prisma.productPartner.create({
      data: {
        productId,
        partnerEmail: data.email,
        commission: parseFloat(data.commission),
        status: 'pending'
      }
    });
  }
}