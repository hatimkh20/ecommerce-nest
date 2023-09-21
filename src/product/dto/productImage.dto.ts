import { ApiProperty } from '@nestjs/swagger';

export class ProductImageDTO {
  @ApiProperty()
  url: string;
}
