// cart.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CartService } from '../service/cart.service';
import { CartItemDTO } from '../dto/cartItem.dto';

@ApiTags('cart')
@Controller('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/create')
  async createCart() {
    return this.cartService.createCart();
  }

  @Post(':cartId/add')
  async addToCart(
    @Param('cartId') cartId: number,
    @Body() cartItemDTO: CartItemDTO,
  ) {
    return this.cartService.addToCart(
      cartId,
      cartItemDTO.productId,
      cartItemDTO.quantity,
    );
  }

  @Delete(':cartId/remove/:productId')
  async removeFromCart(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeFromCart(cartId, productId);
  }

  @Get(':cartId')
  async getCart(@Param('cartId') cartId: number) {
    return this.cartService.getCart(cartId);
  }

  @Patch(':cartId/increase/:productId')
  async increaseQuantity(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.increaseQuantity(cartId, productId);
  }

  @Patch(':cartId/decrease/:productId')
  async decreaseQuantity(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.decreaseQuantity(cartId, productId);
  }
}
