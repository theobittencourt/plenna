import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Obter perfil do usuário' })
  getProfile(@CurrentUser() user: any) {
    return this.usersService.findByUserId(user.userId);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Obter saldo' })
  getBalance(@CurrentUser() user: any) {
    return this.usersService.getBalance(user.userId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Atualizar perfil' })
  updateProfile(@CurrentUser() user: any, @Body() data: any) {
    return this.usersService.updateProfile(user.userId, data);
  }
}
