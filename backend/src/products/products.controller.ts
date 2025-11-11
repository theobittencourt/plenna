import { Controller, Get, Post, Put, Body, UseGuards, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PartnersService } from './partners.service';
import { AffiliatesService } from './affiliates.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly partnersService: PartnersService,
    private readonly affiliatesService: AffiliatesService
  ) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.productsService.findAll(user.userId);
  }

  @Post()
  create(@Body() createProductDto: any, @CurrentUser() user: any) {
    return this.productsService.create(createProductDto, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('public/:userId/:productId')
  findPublicProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.productsService.findPublicProduct(userId, +productId);
  }

  @Get(':id/partners')
  getPartners(@Param('id') id: string) {
    return this.partnersService.getPartners(+id);
  }

  @Post(':id/partners/invite')
  invitePartner(@Param('id') id: string, @Body() data: any) {
    return this.partnersService.invitePartner(+id, data);
  }

  @Get(':id/affiliates')
  getAffiliates(@Param('id') id: string) {
    return this.affiliatesService.getAffiliates(+id);
  }

  @Put(':id/affiliate-settings')
  updateAffiliateSettings(@Param('id') id: string, @Body() settings: any) {
    return this.affiliatesService.updateSettings(+id, settings);
  }


}