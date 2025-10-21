import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  async createCheckout(userId: string, dto: any) {
    return this.prisma.checkoutBuild.create({
      data: {
        idUnico: uuid(),
        userId,
        produtoName: dto.produtoName,
        produtoDescricao: dto.produtoDescricao,
        produtoValor: dto.produtoValor,
        ...dto,
      },
    });
  }

  async getCheckout(id: string) {
    try {
      const checkout = await this.prisma.checkoutBuild.findFirst({
        where: { 
          OR: [
            { id: isNaN(parseInt(id)) ? 0 : parseInt(id) }, 
            { idUnico: id }
          ] 
        },
        include: { 
          bumps: { where: { ativo: true } }, 
          depoimentos: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        },
      });
      
      if (!checkout) {
        throw new Error('Checkout não encontrado');
      }
      
      return checkout;
    } catch (error) {
      console.error('Error fetching checkout:', error);
      throw error;
    }
  }

  async updateCheckout(id: number, dto: any) {
    return this.prisma.checkoutBuild.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCheckout(id: number) {
    return this.prisma.checkoutBuild.delete({ where: { id } });
  }

  async listCheckouts(userId: string) {
    return this.prisma.checkoutBuild.findMany({
      where: { userId },
      include: { orders: { take: 5, orderBy: { createdAt: 'desc' } } },
    });
  }

  async createOrder(checkoutId: number, dto: any) {
    return this.prisma.checkoutOrder.create({
      data: {
        checkoutId,
        clienteNome: dto.clienteNome,
        clienteEmail: dto.clienteEmail,
        clienteCpf: dto.clienteCpf,
        clienteTelefone: dto.clienteTelefone,
        valor: dto.valor,
      },
    });
  }

  async addDepoimento(checkoutId: number, dto: any) {
    return this.prisma.checkoutDepoimento.create({
      data: { checkoutId, ...dto },
    });
  }

  async removeDepoimento(id: number) {
    return this.prisma.checkoutDepoimento.delete({ where: { id } });
  }

  async addOrderBump(checkoutId: number, dto: any) {
    return this.prisma.checkoutOrderBump.create({
      data: { checkoutId, ...dto },
    });
  }

  async updateOrderBump(id: number, dto: any) {
    return this.prisma.checkoutOrderBump.update({
      where: { id },
      data: dto,
    });
  }

  async removeOrderBump(id: number) {
    return this.prisma.checkoutOrderBump.delete({ where: { id } });
  }
}
