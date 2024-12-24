import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class BoxContentItemInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Product name.' })
  name: string;

  @Field(() => [String], { description: 'Product description.' })
  description: string[];

  @Field(() => [String], { description: 'Product features.' })
  features: string[];

  @Field(() => [BoxContentItemInput], {
    description: 'List of items that come in the product box.',
  })
  boxContent: BoxContentItemInput[];

  @Field(() => Int, { description: 'Product price in cents.' })
  price: number;

  @Field(() => Date, {
    description: 'Product release date.',
    nullable: true,
  })
  releaseDate?: Date;
}
