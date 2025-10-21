import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, Min } from 'class-validator';

export enum PixKeyType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
  EMAIL = 'email',
  PHONE = 'phone',
  RANDOM = 'random'
}

export class CreateWithdrawalDto {
  @ApiProperty({ description: 'Valor do saque', example: 50.00 })
  @IsNumber()
  @Min(1)
  valor: number;

  @ApiProperty({ description: 'Tipo da chave PIX', enum: PixKeyType })
  @IsEnum(PixKeyType)
  tipoChave: PixKeyType;

  @ApiProperty({ description: 'Chave PIX', example: '12345678901' })
  @IsString()
  chave: string;
}