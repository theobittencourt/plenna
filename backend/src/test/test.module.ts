import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { AdquirentesModule } from '../adquirentes/adquirentes.module';

@Module({
  imports: [AdquirentesModule],
  controllers: [TestController],
})
export class TestModule {}