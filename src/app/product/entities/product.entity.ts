import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class BoxContentItem {
  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => Int)
  @Prop({ required: true })
  quantity: number;
}

@ObjectType()
@Schema()
export class Product {
  @Field(() => String, { description: 'Unique product identifier.' })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'Product name.' })
  @Prop({ required: true })
  name: string;

  @Field(() => [String], { description: 'Product description.' })
  @Prop({ type: [String], required: true })
  description: string[];

  @Field(() => [String], { description: 'Product features.' })
  @Prop({ type: [String], required: true })
  features: string[];

  @Field(() => [BoxContentItem], {
    description: 'List of items that come in the product box.',
  })
  @Prop({
    type: [SchemaFactory.createForClass(BoxContentItem)],
    required: true,
  })
  boxContent: BoxContentItem[];

  @Field(() => Int, { description: 'Product price in cents.' })
  @Prop({ required: true })
  price: number;

  @Field(() => Date, {
    description: 'Product release date.',
    nullable: true,
  })
  @Prop({ type: Date, required: false, default: Date.now })
  releaseDate?: Date;
}

@ObjectType()
export class ProductsPaginatedResponse {
  @Field(() => [Product], { nullable: false, defaultValue: [] })
  products: Product[];

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  totalCount: number;
}

@ObjectType()
export class RemoveProductResponse {
  @Field(() => Boolean, {
    description: 'Indicates if the product was successfully removed.',
  })
  success: boolean;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
