import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class CartItem {
  @Field(() => String, { description: 'Item id.' })
  id: MongooseSchema.Types.ObjectId;

  @Field(() => Int, { description: 'Item price.' })
  price: number;

  @Field(() => String, {
    description: 'Product preview image url.',
  })
  imagePath: string;

  @Field(() => Int, {
    description: 'Number of items in cart',
  })
  quantity: number;
}

@ObjectType()
export class TotalCost {
  @Field(() => Int, { description: 'Total cost of products in the cart.' })
  total: number;

  @Field(() => Int, { description: 'Shipping cost.' })
  shipping: number;

  @Field(() => Int, {
    description:
      'VAT is calculated as 20% of the product total, excluding shipping.',
  })
  VAT: number;

  @Field(() => Int, { description: 'Total cost. (total + shipping + VAT)' })
  grandTotal: number;
}

@ObjectType()
export class Order {
  @Field(() => [CartItem], {
    description: 'Details of items in cart.',
  })
  cartItems: CartItem[];

  @Field(() => TotalCost, { description: 'Cart cost details.' })
  totalCost: TotalCost;
}
