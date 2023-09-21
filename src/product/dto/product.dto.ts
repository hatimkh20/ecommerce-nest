import { ApiProperty } from '@nestjs/swagger';
import { ProductImageDTO } from './productImage.dto';

export class ProductDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: [ProductImageDTO] })
  images: ProductImageDTO[];
}
