import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar transações' })
  list(@CurrentUser() user: any, @Query() filters: any) {
    return this.transactionsService.listTransactions(user.userId, filters);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas' })
  stats(@CurrentUser() user: any) {
    return this.transactionsService.getStats(user.userId);
  }
}
