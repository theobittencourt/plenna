import { Controller, Post, Body, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Controller('webhook/pagarme')
export class PagarmeWebhookController {
  private readonly logger = new Logger(PagarmeWebhookController.name);

  constructor(private prisma: PrismaService) {}

  @Post()
  async handleWebhook(@Body() body: any) {
    this.logger.log('Webhook Pagar.me recebido:', JSON.stringify(body));

    try {
      const { type, data } = body;

      if (type === 'order.paid' && data?.metadata?.external_reference) {
        await this.prisma.solicitacao.updateMany({
          where: { 
            externalreference: data.metadata.external_reference,
            status: 'pending'
          },
          data: { 
            status: 'approved',
            updatedAt: new Date()
          }
        });

        this.logger.log(`Pagamento aprovado: ${data.metadata.external_reference}`);
      }

      return { success: true };
    } catch (error) {
      this.logger.error('Erro ao processar webhook Pagar.me:', error);
      return { success: false };
    }
  }
}