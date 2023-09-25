import { ApiProperty } from '@nestjs/swagger';

export class CartItemDTO {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;
}
