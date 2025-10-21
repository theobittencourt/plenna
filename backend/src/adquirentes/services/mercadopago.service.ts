import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class MercadopagoService {
  constructor(
    private http: HttpService,
    private prisma: PrismaService,
  ) {}

  async createDeposit(data: any) {
    const config = await this.getConfig();
    
    const response = await firstValueFrom(
      this.http.post<any>('https://api.mercadopago.com/v1/payments', {
        transaction_amount: data.amount,
        description: 'Depósito PIX',
        payment_method_id: 'pix',
        payer: {
          email: data.email,
          first_name: data.debtor_name,
          identification: {
            type: 'CPF',
            number: data.debtor_document_number,
          },
        },
      }, {
        headers: { Authorization: `Bearer ${config.accessToken}` },
      }),
    );

    return {
      idTransaction: response.data.id,
      paymentCode: response.data.point_of_interaction.transaction_data.qr_code,
      qrCode: response.data.point_of_interaction.transaction_data.qr_code,
      qrCodeImage: response.data.point_of_interaction.transaction_data.qr_code_base64,
    };
  }

  private async getConfig() {
    const adquirente = await this.prisma.adquirente.findUnique({
      where: { referencia: 'mercadopago' },
    });
    return adquirente.config as any;
  }
}
