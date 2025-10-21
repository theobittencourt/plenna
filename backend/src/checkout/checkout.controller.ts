import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Criar checkout' })
  @ApiBearerAuth()
  create(@CurrentUser() user: any, @Body() dto: any) {
    return this.checkoutService.createCheckout(user.userId, dto);
  }

  @Get('public/:id')
  @ApiOperation({ summary: 'Obter checkout público' })
  async getPublic(@Param('id') id: string) {
    return this.checkoutService.getCheckout(id);
  }

  @Get('test')
  @ApiOperation({ summary: 'Teste de conexão' })
  test() {
    return { message: 'Checkout module working', timestamp: new Date().toISOString() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter checkout' })
  get(@Param('id') id: string) {
    return this.checkoutService.getCheckout(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar checkouts' })
  @ApiBearerAuth()
  list(@CurrentUser() user: any) {
    return this.checkoutService.listCheckouts(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar checkout' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: any) {
    return this.checkoutService.updateCheckout(parseInt(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar checkout' })
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.checkoutService.deleteCheckout(parseInt(id));
  }

  @Post(':id/order')
  @ApiOperation({ summary: 'Criar pedido' })
  createOrder(@Param('id') id: string, @Body() dto: any) {
    return this.checkoutService.createOrder(parseInt(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/depoimento')
  @ApiOperation({ summary: 'Adicionar depoimento' })
  @ApiBearerAuth()
  addDepoimento(@Param('id') id: string, @Body() dto: any) {
    return this.checkoutService.addDepoimento(parseInt(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/bump')
  @ApiOperation({ summary: 'Adicionar order bump' })
  @ApiBearerAuth()
  addBump(@Param('id') id: string, @Body() dto: any) {
    return this.checkoutService.addOrderBump(parseInt(id), dto);
  }
}