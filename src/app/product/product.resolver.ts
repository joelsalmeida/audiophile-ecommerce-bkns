import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import {
  Product,
  ProductsPaginatedResponse,
  RemoveProductResponse,
} from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Schema as MongooseSchema } from 'mongoose';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FindByCategoryArgs } from './dto/find-by-category.args';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => ProductsPaginatedResponse, { name: 'products' })
  findAll(@Args() args: PaginationArgs) {
    const { limit, skip } = args;
    return this.productService.findAll(limit, skip);
  }

  @Query(() => ProductsPaginatedResponse, { name: 'productsByCategory' })
  findByCategory(@Args() args: FindByCategoryArgs) {
    const { category, paginationArgs } = args;
    return this.productService.findByCategory(category, paginationArgs);
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.productService.findOne(id);
  }

  @Query(() => Product, { name: 'productBySlug' })
  findOneBySlug(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Product> {
    return this.productService.findOneBySlug(slug);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput._id,
      updateProductInput,
    );
  }

  @Mutation(() => RemoveProductResponse)
  async removeProduct(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    const { deletedCount } = await this.productService.remove(id);

    const DELETED_COUNT_IS_ONE = deletedCount === 1;

    return { success: DELETED_COUNT_IS_ONE };
  }
}
