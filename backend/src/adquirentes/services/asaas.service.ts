import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class AsaasService {
  private readonly logger = new Logger(AsaasService.name);
  private readonly baseUrl = 'https://www.asaas.com/api/v3';

  constructor(private prisma: PrismaService) {}

  async createPixPayment(data: {
    value: number;
    description: string;
    externalReference: string;
    apiKey: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/payments`,
        {
          billingType: 'PIX',
          value: data.value,
          description: data.description,
          externalReference: data.externalReference,
        },
        {
          headers: {
            'access_token': data.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        paymentId: response.data.id,
        pixCode: response.data.pixTransaction?.qrCode?.payload,
        qrCodeImage: response.data.pixTransaction?.qrCode?.encodedImage,
        expiresAt: response.data.dueDate,
      };
    } catch (error) {
      this.logger.error('Erro ao criar pagamento PIX no Asaas:', error.response?.data);
      return { success: false, error: error.response?.data?.errors?.[0]?.description || 'Erro interno' };
    }
  }

  async checkPaymentStatus(paymentId: string, apiKey: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/payments/${paymentId}`, {
        headers: { 'access_token': apiKey },
      });

      return {
        success: true,
        status: response.data.status,
        paid: response.data.status === 'RECEIVED',
      };
    } catch (error) {
      this.logger.error('Erro ao consultar status no Asaas:', error.response?.data);
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
        `${this.baseUrl}/transfers`,
        {
          value: data.value,
          pixAddressKey: data.pixKey,
          description: data.description,
        },
        {
          headers: {
            'access_token': data.apiKey,
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
      this.logger.error('Erro ao criar transferência PIX no Asaas:', error.response?.data);
      return { success: false, error: error.response?.data?.errors?.[0]?.description || 'Erro interno' };
    }
  }
}