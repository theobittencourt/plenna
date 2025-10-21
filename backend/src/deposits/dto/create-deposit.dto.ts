import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsOptional, Min } from 'class-validator';

export class CreateDepositDto {
  @ApiProperty({ description: 'Valor do depósito', example: 100.00 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ description: 'Nome do pagador', example: 'João Silva' })
  @IsString()
  debtor_name: string;

  @ApiProperty({ description: 'CPF do pagador', example: '12345678901' })
  @IsString()
  debtor_document_number: string;

  @ApiProperty({ description: 'Email do pagador', example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Telefone do pagador', example: '11999999999' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Método de pagamento', example: 'pix' })
  @IsString()
  @IsOptional()
  method_pay?: string = 'pix';

  @ApiProperty({ description: 'URL de postback', required: false })
  @IsString()
  @IsOptional()
  postback?: string;

  @ApiProperty({ description: 'ID do usuário' })
  @IsString()
  userId: string;
}