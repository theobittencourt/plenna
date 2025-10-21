import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByUserId(userId: string) {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { userId },
      data,
    });
  }

  async getBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      select: { saldo: true },
    });
    return { balance: Number(user?.saldo || 0) };
  }

  async updateBalance(userId: string, amount: number) {
    return this.prisma.user.update({
      where: { userId },
      data: { saldo: { increment: amount } },
    });
  }
}
