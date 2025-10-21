import { Module } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { AdquirentesModule } from '../adquirentes/adquirentes.module';

@Module({
  imports: [AdquirentesModule],
  providers: [DepositsService],
  controllers: [DepositsController],
})
export class DepositsModule {}
