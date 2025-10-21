import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { AdquirentesService } from '../adquirentes/adquirentes.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DepositsService {
  constructor(
    private prisma: PrismaService,
    private adquirentesService: AdquirentesService,
  ) {}

  async createDeposit(dto: any) {
    const app = await this.prisma.app.findFirst();
    if (!app) throw new BadRequestException('Configurações não encontradas');

    if (app.depositoMinimo && dto.amount < app.depositoMinimo) {
      throw new BadRequestException(`Valor mínimo: R$ ${app.depositoMinimo}`);
    }

    const adquirente = await this.prisma.adquirente.findFirst({
      where: { status: true },
    });

    if (!adquirente) throw new BadRequestException('Nenhum adquirente ativo');

    const externalReference = uuid();
    const taxaCashIn = dto.taxaCashIn || app.taxaCashInPadrao;
    const valorLiquido = dto.amount - (dto.amount * taxaCashIn) / 100;

    const deposit = await this.prisma.solicitacao.create({
      data: {
        userId: dto.userId,
        valor: dto.amount,
        valorLiquido,
        taxaCashIn,
        status: 'pending',
        externalreference: externalReference,
        methodPay: dto.method_pay,
        debtorName: dto.debtor_name,
        debtorDocument: dto.debtor_document_number,
        debtorEmail: dto.email,
        debtorPhone: dto.phone,
        postback: dto.postback,
        adquirente: adquirente.referencia,
      },
    });

    const response = await this.adquirentesService.processDeposit(
      adquirente.referencia,
      { ...dto, externalReference },
    );

    await this.prisma.solicitacao.update({
      where: { id: deposit.id },
      data: {
        idTransaction: response.idTransaction,
        paymentCode: response.paymentCode,
        qrCode: response.qrCode,
        qrCodeImage: response.qrCodeImage,
      },
    });

    return response;
  }

  async getDepositStatus(idTransaction: string) {
    const deposit = await this.prisma.solicitacao.findFirst({
      where: {
        OR: [{ idTransaction }, { externalreference: idTransaction }],
      },
    });

    return { status: deposit?.status || 'NOT_FOUND' };
  }

  async listDeposits(userId: string) {
    return this.prisma.solicitacao.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
