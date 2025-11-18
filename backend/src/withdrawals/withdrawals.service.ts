import { Injectable, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../common/prisma/prisma.service';
import { AdquirentesService } from '../adquirentes/adquirentes.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class WithdrawalsService {
  constructor(
    private prisma: PrismaService,
    private adquirentesService: AdquirentesService,
  ) {}

  async createWithdrawal(userId: string, dto: any) {
    const user = await this.prisma.user.findUnique({ where: { userId } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    const app = await this.prisma.app.findFirst();
    if (app.saqueMinimo && dto.valor < app.saqueMinimo) {
      throw new BadRequestException(`Valor mínimo: R$ ${app.saqueMinimo}`);
    }

    if (user.saldo < dto.valor) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const taxaCashOut = Number(user.taxaCashOut || app.taxaCashOutPadrao);
    const valorLiquido = dto.valor - (dto.valor * taxaCashOut) / 100;

    const withdrawal = await this.prisma.solicitacaoCashOut.create({
      data: {
        userId,
        referencia: uuid(),
        valor: dto.valor,
        valorLiquido,
        tipoChave: dto.tipoChave,
        chave: dto.chave,
        status: app.saquesAutomaticos ? 'processing' : 'pending',
        taxaCashOut,
      },
    });

    await this.prisma.user.update({
      where: { userId },
      data: {
        saldo: { decrement: dto.valor },
        valorSaquePendente: { increment: dto.valor },
      },
    });

    if (app.saquesAutomaticos) {
      await this.processWithdrawal(withdrawal.id);
    }

    return withdrawal;
  }

  async processWithdrawal(id: number) {
    const withdrawal = await this.prisma.solicitacaoCashOut.findUnique({
      where: { id },
    });

    if (!withdrawal || withdrawal.status !== 'processing') return;

    const adquirente = await this.prisma.adquirente.findFirst({
      where: { status: true },
    });

    try {
      const response = await this.adquirentesService.processWithdrawal(
        adquirente.referencia,
        withdrawal,
      );

      await this.prisma.solicitacaoCashOut.update({
        where: { id },
        data: {
          status: 'approved',
          idTransaction: response.transferId || response.idTransaction,
          dataPagamento: new Date(),
        },
      });

      await this.prisma.user.update({
        where: { userId: withdrawal.userId },
        data: {
          valorSaquePendente: { decrement: withdrawal.valor },
          valorSacado: { increment: withdrawal.valorLiquido },
        },
      });
    } catch (error) {
      await this.prisma.solicitacaoCashOut.update({
        where: { id },
        data: { status: 'failed' },
      });
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async processAutomaticWithdrawals() {
    const app = await this.prisma.app.findFirst();
    if (!app?.saquesAutomaticos) return;

    const pending = await this.prisma.solicitacaoCashOut.findMany({
      where: { status: 'processing' },
      take: 10,
    });

    for (const withdrawal of pending) {
      await this.processWithdrawal(withdrawal.id);
    }
  }

  async listWithdrawals(userId: string) {
    return this.prisma.solicitacaoCashOut.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
