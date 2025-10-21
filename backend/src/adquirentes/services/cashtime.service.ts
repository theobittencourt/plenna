import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CashtimeService {
  constructor(
    private http: HttpService,
    private prisma: PrismaService,
  ) {}

  async createDeposit(data: any) {
    const config = await this.getConfig();
    
    const response = await firstValueFrom(
      this.http.post<any>(`${config.apiUrl}/pix/charge`, {
        value: data.amount,
        customer: {
          name: data.debtor_name,
          document: data.debtor_document_number,
        },
      }, {
        headers: { 'x-api-key': config.apiKey },
      }),
    );

    return {
      idTransaction: response.data.txid,
      paymentCode: response.data.pixCopiaECola,
      qrCode: response.data.pixCopiaECola,
      qrCodeImage: response.data.qrCodeBase64,
    };
  }

  async createWithdrawal(data: any) {
    const config = await this.getConfig();
    
    const response = await firstValueFrom(
      this.http.post<any>(`${config.apiUrl}/pix/transfer`, {
        value: data.valorLiquido,
        pixKey: data.chave,
      }, {
        headers: { 'x-api-key': config.apiKey },
      }),
    );

    return { idTransaction: response.data.txid };
  }

  private async getConfig() {
    const adquirente = await this.prisma.adquirente.findUnique({
      where: { referencia: 'cashtime' },
    });
    return adquirente.config as any;
  }
}
