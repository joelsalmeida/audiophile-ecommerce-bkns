import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductModule {}
