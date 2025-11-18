import { Injectable } from '@nestjs/common';
import { PixupService } from './services/pixup.service';
import { CashtimeService } from './services/cashtime.service';
import { MercadopagoService } from './services/mercadopago.service';
import { AsaasService } from './services/asaas.service';
import { PagarmeService } from './services/pagarme.service';

@Injectable()
export class AdquirentesService {
  constructor(
    private pixupService: PixupService,
    private cashtimeService: CashtimeService,
    private mercadopagoService: MercadopagoService,
    private asaasService: AsaasService,
    private pagarmeService: PagarmeService,
  ) {}

  async processDeposit(adquirente: string, data: any) {
    switch (adquirente) {
      case 'pixup':
        return this.pixupService.createDeposit(data);
      case 'cashtime':
        return this.cashtimeService.createDeposit(data);
      case 'mercadopago':
        return this.mercadopagoService.createDeposit(data);
      case 'asaas':
        return this.asaasService.createPixPayment(data);
      case 'pagarme':
        return this.pagarmeService.createPixPayment(data);
      default:
        throw new Error('Adquirente não suportado');
    }
  }

  async processWithdrawal(adquirente: string, data: any) {
    switch (adquirente) {
      case 'pixup':
        return this.pixupService.createWithdrawal(data);
      case 'cashtime':
        return this.cashtimeService.createWithdrawal(data);
      case 'asaas':
        return this.asaasService.createPixTransfer(data);
      case 'pagarme':
        return this.pagarmeService.createPixTransfer(data);
      default:
        throw new Error('Adquirente não suporta saques');
    }
  }
}
