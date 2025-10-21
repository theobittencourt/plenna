import { Controller, Post, Get, Body, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('deposits')
@Controller('wallet')
export class DepositsController {
  constructor(private depositsService: DepositsService) {}

  @Public()
  @Post('deposit/payment')
  @ApiOperation({ summary: 'Criar depósito PIX' })
  @ApiResponse({ status: 201, description: 'Depósito criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  createDeposit(@Body(ValidationPipe) dto: CreateDepositDto) {
    return this.depositsService.createDeposit(dto);
  }

  @Public()
  @Post('status')
  @ApiOperation({ summary: 'Consultar status do depósito' })
  getStatus(@Body('idTransaction') idTransaction: string) {
    return this.depositsService.getDepositStatus(idTransaction);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('deposits')
  @ApiOperation({ summary: 'Listar depósitos' })
  listDeposits(@CurrentUser() user: any) {
    return this.depositsService.listDeposits(user.userId);
  }
}
