import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 10, nullable: true })
  limit?: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip?: number;
}
