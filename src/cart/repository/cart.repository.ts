import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cartItem.entity';

@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private itemRepo: Repository<CartItem>,
  ) {
    super(cartRepo.target, cartRepo.manager, cartRepo.queryRunner);
  }

  async removeItem(item: CartItem): Promise<void> {
    await this.itemRepo.delete(item.id);
  }

  async changeQuantity(itemToChange: CartItem): Promise<void> {
    await this.itemRepo.save(itemToChange);
  }
}
