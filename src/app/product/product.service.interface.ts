import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PaginationArgs } from '../common/dto/pagination.args';
import { Product } from './entities/product.entity';
import { Schema as MongooseSchema } from 'mongoose';

export interface ProductServiceInterface {
  create(createProductInput: CreateProductInput): Promise<Product>;

  findAll(
    limit: number,
    skip: number,
  ): Promise<{ products: Product[]; totalCount: number }>;

  findByCategory(
    category: string,
    paginationArgs: PaginationArgs,
  ): Promise<{ products: Product[]; totalCount: number }>;

  getRelatedProducts(
    id: MongooseSchema.Types.ObjectId,
  ): Promise<{ products: Product[]; totalCount: number }>;

  findOne(id: MongooseSchema.Types.ObjectId): Promise<Product | null>;

  findOneBySlug(slug: string): Promise<Product | null>;

  update(
    id: MongooseSchema.Types.ObjectId,
    updateProductInput: UpdateProductInput,
  ): Promise<Product | null>;

  remove(id: MongooseSchema.Types.ObjectId): Promise<{ deletedCount?: number }>;
}
