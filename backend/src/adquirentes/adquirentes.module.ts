import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdquirentesService } from './adquirentes.service';
import { PixupService } from './services/pixup.service';
import { CashtimeService } from './services/cashtime.service';
import { MercadopagoService } from './services/mercadopago.service';

@Module({
  imports: [HttpModule],
  providers: [
    AdquirentesService,
    PixupService,
    CashtimeService,
    MercadopagoService,
  ],
  exports: [AdquirentesService],
})
export class AdquirentesModule {}
