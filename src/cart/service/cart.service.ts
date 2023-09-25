// cart.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/product/repository/product.repository';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cartItem.entity';
import { CartRepository } from '../repository/cart.repository';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository)
    private cartRepository: CartRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createCart(): Promise<Cart> {
    const cart = new Cart();
    cart.items = [];
    return this.cartRepository.save(cart);
  }

  async addToCart(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    });

    if (!cart) throw new NotFoundException('Cart not found');

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    let cartItem = cart.items.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = quantity;
      cart.items.push(cartItem);
    }
    return this.cartRepository.save(cart);
  }

  async removeFromCart(cartId: number, productId: number): Promise<Cart> {
    console.log(
      `Attempting to remove product ${productId} from cart ${cartId}`,
    );

    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    });

    if (!cart) throw new NotFoundException('Cart not found');

    console.log('Cart Found:', cart);
    console.log(
      'Cart Items:',
      cart.items.map((item) => item.product.id),
    );

    const itemToRemove = cart.items.find(
      (item) => item.product.id == productId,
    );

    if (!itemToRemove) {
      console.error(`Product ${productId} not found in cart ${cartId}`);
      throw new NotFoundException('Product not found in cart');
    }

    console.log('Item to Remove Found:', itemToRemove);

    cart.items = cart.items.filter((item) => item.product.id != productId);

    try {
      await this.cartRepository.removeItem(itemToRemove);
      console.log('Item Removed Successfully');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw new InternalServerErrorException('Error removing item from cart');
    }

    try {
      const updatedCart = await this.cartRepository.save(cart);
      console.log('Cart Saved Successfully:', updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error saving cart:', error);
      throw new InternalServerErrorException('Error saving cart');
    }
  }

  async getCart(cartId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async changeQuantity(
    cartId: number,
    productId: number,
    change: number,
  ): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    });

    if (!cart) throw new NotFoundException('Cart not found');

    console.log(
      'Cart Items:',
      cart.items.map((item) => ({
        itemId: item.id,
        productId: item.product.id,
      })),
    );

    const itemToChange = cart.items.find(
      (item) => item.product.id == productId,
    );

    if (!itemToChange) throw new NotFoundException('Product not found in cart');

    itemToChange.quantity += change;

    if (itemToChange.quantity <= 0) {
      cart.items = cart.items.filter((item) => item.product.id != productId);
      await this.cartRepository.removeItem(itemToChange);
    } else {
      await this.cartRepository.changeQuantity(itemToChange);
    }

    return this.cartRepository.save(cart);
  }

  async increaseQuantity(cartId: number, productId: number): Promise<Cart> {
    return this.changeQuantity(cartId, productId, 1);
  }

  async decreaseQuantity(cartId: number, productId: number): Promise<Cart> {
    return this.changeQuantity(cartId, productId, -1);
  }
}
