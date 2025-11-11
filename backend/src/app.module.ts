import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CheckoutModule } from './checkout/checkout.module';
import { DepositsModule } from './deposits/deposits.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AdquirentesModule } from './adquirentes/adquirentes.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env'
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    CheckoutModule,
    DepositsModule,
    WithdrawalsModule,
    TransactionsModule,
    AdquirentesModule,
    ProductsModule,
  ],
})
export class AppModule {}
