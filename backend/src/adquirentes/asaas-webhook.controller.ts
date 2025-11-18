import { Controller, Post, Body, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Controller('webhook/asaas')
export class AsaasWebhookController {
  private readonly logger = new Logger(AsaasWebhookController.name);

  constructor(private prisma: PrismaService) {}

  @Post()
  async handleWebhook(@Body() body: any) {
    this.logger.log('Webhook Asaas recebido:', JSON.stringify(body));

    try {
      const { event, payment } = body;

      if (event === 'PAYMENT_RECEIVED' && payment?.externalReference) {
        await this.prisma.solicitacao.updateMany({
          where: { 
            externalreference: payment.externalReference,
            status: 'pending'
          },
          data: { 
            status: 'approved',
            updatedAt: new Date()
          }
        });

        this.logger.log(`Pagamento aprovado: ${payment.externalReference}`);
      }

      return { success: true };
    } catch (error) {
      this.logger.error('Erro ao processar webhook Asaas:', error);
      return { success: false };
    }
  }
}