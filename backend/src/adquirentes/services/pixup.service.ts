import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PixupService {
  constructor(
    private http: HttpService,
    private prisma: PrismaService,
  ) {}

  async createDeposit(data: any) {
    const config = await this.getConfig();
    
    const response = await firstValueFrom(
      this.http.post<any>(`${config.apiUrl}/deposit`, {
        amount: data.amount,
        customer: {
          name: data.debtor_name,
          document: data.debtor_document_number,
          email: data.email,
          phone: data.phone,
        },
        externalReference: data.externalReference,
      }, {
        headers: { Authorization: `Bearer ${config.apiKey}` },
      }),
    );

    return {
      idTransaction: response.data.id,
      paymentCode: response.data.paymentCode,
      qrCode: response.data.qrCode,
      qrCodeImage: response.data.qrCodeImage,
    };
  }

  async createWithdrawal(data: any) {
    const config = await this.getConfig();
    
    const response = await firstValueFrom(
      this.http.post<any>(`${config.apiUrl}/withdraw`, {
        amount: data.valorLiquido,
        pixKey: data.chave,
        pixKeyType: data.tipoChave,
      }, {
        headers: { Authorization: `Bearer ${config.apiKey}` },
      }),
    );

    return { idTransaction: response.data.id };
  }

  private async getConfig() {
    const adquirente = await this.prisma.adquirente.findUnique({
      where: { referencia: 'pixup' },
    });
    return adquirente.config as any;
  }
}
