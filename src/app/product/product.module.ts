import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { RelatedProductsPrioritySwitch } from './utilities';

@Module({
  providers: [ProductResolver, ProductService, RelatedProductsPrioritySwitch],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  exports: [ProductService],
})
export class ProductModule {}
