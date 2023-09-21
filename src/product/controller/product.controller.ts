import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductDTO } from '../dto/product.dto';
import { Product } from '../entities/product.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('product')
@Controller('product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post('/create')
  createProduct(@Body() createProductDTO: ProductDTO): Promise<Product> {
    return this.productService.createProduct(createProductDTO);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Product> {
    return this.productService.getById(id);
  }
}
