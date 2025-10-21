import { Controller, Post, Get, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('withdrawals')
@Controller()
export class WithdrawalsController {
  constructor(private withdrawalsService: WithdrawalsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('pixout')
  @ApiOperation({ summary: 'Criar saque PIX' })
  @ApiResponse({ status: 201, description: 'Saque criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Saldo insuficiente ou dados inválidos' })
  createWithdrawal(@CurrentUser() user: any, @Body(ValidationPipe) dto: CreateWithdrawalDto) {
    return this.withdrawalsService.createWithdrawal(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('withdrawals')
  @ApiOperation({ summary: 'Listar saques' })
  listWithdrawals(@CurrentUser() user: any) {
    return this.withdrawalsService.listWithdrawals(user.userId);
  }
}
