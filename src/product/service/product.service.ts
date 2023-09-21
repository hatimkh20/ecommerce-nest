import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from '../dto/product.dto';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/productImage.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(productDto: ProductDTO): Promise<Product> {
    const productEntity = new Product();
    Object.assign(productEntity, productDto);

    productEntity.images = productDto.images.map((imageDto) => {
      const imageEntity = new ProductImage();
      Object.assign(imageEntity, imageDto);
      return imageEntity;
    });

    return this.productRepository.save(productEntity);
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['images'] });
  }

  getById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }
}
