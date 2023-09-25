import { ApiProperty } from '@nestjs/swagger';
import { CartItemDTO } from './cartItem.dto';

export class CartDTO {
  @ApiProperty({ type: [CartItemDTO] })
  items: CartItemDTO[];
}
