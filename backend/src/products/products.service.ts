import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: any, userId: string) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        userId,
        price: parseFloat(createProductDto.price),
        affiliateCommission: parseFloat(createProductDto.affiliateCommission || 0),
        affiliateRecurringCommission: parseFloat(createProductDto.affiliateRecurringCommission || 0)
      }
    });
  }

  async findAll(userId: string) {
    return this.prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        partners: true,
        affiliates: { include: { user: { select: { name: true, email: true } } } }
      }
    });
  }

  async findPublicProduct(userId: string, productId: number) {
    const product = await this.prisma.product.findFirst({
      where: { 
        id: productId,
        userId,
        status: 'active'
      }
    });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const seller = await this.prisma.user.findUnique({
      where: { userId },
      select: { name: true, email: true }
    });

    return { product, seller };
  }
}