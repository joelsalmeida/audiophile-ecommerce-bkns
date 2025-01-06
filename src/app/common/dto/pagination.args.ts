import { Field, ArgsType, Int, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 10, nullable: false })
  limit: number;

  @Field(() => Int, { defaultValue: 0, nullable: false })
  skip: number;
}
