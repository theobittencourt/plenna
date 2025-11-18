// import { Controller, Post, Body } from '@nestjs/common';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { PagarmeService } from '../adquirentes/services/pagarme.service';
// import { AsaasService } from '../adquirentes/services/asaas.service';
// import { Public } from '../common/decorators/public.decorator';

// @ApiTags('test')
// @Controller('test')
// export class TestController {
//   constructor(
//     private pagarmeService: PagarmeService,
//     private asaasService: AsaasService,
//   ) {}

//   @Public()
//   @Post('pagarme/pix')
//   @ApiOperation({ summary: 'Testar PIX Pagar.me' })
//   async testPagarmePix(@Body() data: {
//     value: number;
//     customerName: string;
//     customerEmail: string;
//     customerDocument: string;
//   }) {
//     return this.pagarmeService.createPixPayment({
//       value: data.value,
//       description: 'Teste PIX Plenna',
//       externalReference: 'teste-' + Date.now(),
//       apiKey: process.env.PAGARME_API_KEY_PROD,
//       customerName: data.customerName,
//       customerDocument: data.customerDocument,
//       customerEmail: data.customerEmail,
//     });
//   }

//   @Public()
//   @Post('asaas/payment')
//   @ApiOperation({ summary: 'Testar pagamento Asaas' })
//   async testAsaasPayment(@Body() data: {
//     value: number;
//     description: string;
//   }) {
//     return this.asaasService.createPixPayment({
//       value: data.value,
//       description: data.description,
//       externalReference: 'teste-' + Date.now(),
//       apiKey: process.env.ASAAS_API_KEY,
//     });
//   }
// }