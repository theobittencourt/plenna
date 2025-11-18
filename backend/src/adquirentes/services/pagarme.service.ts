import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class PagarmeService {
  private readonly logger = new Logger(PagarmeService.name);
  private readonly baseUrl = 'https://api.pagar.me/core/v5';

  constructor(private prisma: PrismaService) {}

  async createPixPayment(data: {
    value: number;
    description: string;
    externalReference: string;
    apiKey: string;
    customerName: string;
    customerDocument: string;
    customerEmail: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/orders`,
        {
          amount: Math.round(data.value * 100),
          currency: 'BRL',
          items: [{
            amount: Math.round(data.value * 100),
            description: data.description || 'Depósito PIX',
            quantity: 1,
          }],
          customer: {
            name: data.customerName,
            document: data.customerDocument,
            email: data.customerEmail,
            type: 'individual',
            phones: {
              mobile_phone: {
                country_code: '55',
                area_code: '11',
                number: '999999999'
              }
            }
          },
          payments: [{
            payment_method: 'pix',
            pix: {
              expires_in: 3600,
            },
          }],
          metadata: {
            external_reference: data.externalReference,
          },
        },
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${data.apiKey}:`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const payment = response.data.charges[0].last_transaction;
      
      return {
        success: true,
        paymentId: response.data.id,
        pixCode: payment.qr_code,
        qrCodeImage: payment.qr_code_url,
        expiresAt: payment.expires_at,
      };
    } catch (error) {
      this.logger.error('Erro ao criar pagamento PIX no Pagar.me:', error.response?.data);
      return { success: false, error: error.response?.data?.message || 'Erro interno' };
    }
  }

  async checkPaymentStatus(paymentId: string, apiKey: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/orders/${paymentId}`, {
        headers: { 'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}` },
      });

      return {
        success: true,
        status: response.data.status,
        paid: response.data.status === 'paid',
      };
    } catch (error) {
      this.logger.error('Erro ao consultar status no Pagar.me:', error.response?.data);
      return { success: false };
    }
  }

  async createPixTransfer(data: {
    value: number;
    pixKey: string;
    description: string;
    apiKey: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/recipients/self/transfers`,
        {
          amount: Math.round(data.value * 100),
          target_type: 'pix',
          target_id: data.pixKey,
          metadata: {
            description: data.description,
          },
        },
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${data.apiKey}:`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        transferId: response.data.id,
        status: response.data.status,
      };
    } catch (error) {
      this.logger.error('Erro ao criar transferência PIX no Pagar.me:', error.response?.data);
      return { success: false, error: error.response?.data?.message || 'Erro interno' };
    }
  }
}