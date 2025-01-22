import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class RemoveItemFromCartInput {
  @Field(() => String, { nullable: false, description: 'Item id.' })
  _id: MongooseSchema.Types.ObjectId;
}
