import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class AddItemToCartInput {
  @Field(() => String, { nullable: false, description: 'Item id.' })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Number, {
    description: 'Quantity of item to be added.',
  })
  quantity: number;
}
