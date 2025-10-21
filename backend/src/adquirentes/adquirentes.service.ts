import { Injectable } from '@nestjs/common';
import { PixupService } from './services/pixup.service';
import { CashtimeService } from './services/cashtime.service';
import { MercadopagoService } from './services/mercadopago.service';

@Injectable()
export class AdquirentesService {
  constructor(
    private pixupService: PixupService,
    private cashtimeService: CashtimeService,
    private mercadopagoService: MercadopagoService,
  ) {}

  async processDeposit(adquirente: string, data: any) {
    switch (adquirente) {
      case 'pixup':
        return this.pixupService.createDeposit(data);
      case 'cashtime':
        return this.cashtimeService.createDeposit(data);
      case 'mercadopago':
        return this.mercadopagoService.createDeposit(data);
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
      default:
        throw new Error('Adquirente não suporta saques');
    }
  }
}
