import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdquirentesService } from './adquirentes.service';
import { PixupService } from './services/pixup.service';
import { CashtimeService } from './services/cashtime.service';
import { MercadopagoService } from './services/mercadopago.service';
import { AsaasService } from './services/asaas.service';
import { PagarmeService } from './services/pagarme.service';
import { AsaasWebhookController } from './asaas-webhook.controller';
import { PagarmeWebhookController } from './pagarme-webhook.controller';

@Module({
  imports: [HttpModule],
  controllers: [AsaasWebhookController, PagarmeWebhookController],
  providers: [
    AdquirentesService,
    PixupService,
    CashtimeService,
    MercadopagoService,
    AsaasService,
    PagarmeService,
  ],
  exports: [AdquirentesService],
})
export class AdquirentesModule {}
