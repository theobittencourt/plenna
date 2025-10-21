import { Controller, Get, Param } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Get('test')
  test() {
    return { message: 'Working', timestamp: new Date().toISOString() };
  }

  @Get('public/:id')
  async getPublic(@Param('id') id: string) {
    return this.checkoutService.getCheckout(id);
  }
}