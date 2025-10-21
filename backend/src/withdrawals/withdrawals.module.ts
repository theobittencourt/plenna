import { Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { AdquirentesModule } from '../adquirentes/adquirentes.module';

@Module({
  imports: [AdquirentesModule],
  providers: [WithdrawalsService],
  controllers: [WithdrawalsController],
  exports: [WithdrawalsService],
})
export class WithdrawalsModule {}
