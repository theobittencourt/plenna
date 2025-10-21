import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async listTransactions(userId: string, filters?: any) {
    const limit = filters?.limit ? parseInt(filters.limit) : undefined;
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getStats(userId: string) {
    const deposits = await this.prisma.solicitacao.aggregate({
      where: { userId, status: 'approved' },
      _sum: { valorLiquido: true },
      _count: true,
    });

    const withdrawals = await this.prisma.solicitacaoCashOut.aggregate({
      where: { userId, status: 'approved' },
      _sum: { valorLiquido: true },
      _count: true,
    });

    return {
      totalDeposits: deposits._sum.valorLiquido || 0,
      countDeposits: deposits._count,
      totalWithdrawals: withdrawals._sum.valorLiquido || 0,
      countWithdrawals: withdrawals._count,
    };
  }
}
