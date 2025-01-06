import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '../../common/dto/pagination.args';
import { Category } from '../entities/product.entity';

@ArgsType()
export class FindByCategoryArgs {
  @Field(() => Category)
  category: Category;

  @Field(() => PaginationArgs)
  paginationArgs: PaginationArgs;
}
