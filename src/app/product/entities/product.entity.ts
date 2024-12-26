import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
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
export class ImagePaths {
  @Field(() => String)
  @Prop({ required: true })
  small: string;

  @Field(() => String)
  @Prop({ required: true })
  medium: string;

  @Field(() => String)
  @Prop({ required: true })
  large: string;
}

@ObjectType()
@Schema()
export class PreviewImage {
  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  alt?: string;

  @Field(() => ImagePaths)
  @Prop({ required: true })
  paths: ImagePaths;
}

@ObjectType()
@Schema()
export class GalleryImage {
  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  alt?: string;

  @Field(() => ImagePaths)
  @Prop({ required: true })
  paths: ImagePaths;
}

@ObjectType()
@Schema()
export class GalleryImages {
  @Field(() => GalleryImage, { description: 'First gallery image.' })
  @Prop({ required: true })
  imageOne: GalleryImage;

  @Field(() => GalleryImage, { description: 'Second gallery image.' })
  @Prop({ required: true })
  imageTwo: GalleryImage;

  @Field(() => GalleryImage, { description: 'Third gallery image.' })
  @Prop({ required: true })
  imageThree: GalleryImage;
}

export enum Category {
  HEADPHONES = 'headphones',
  SPEAKERS = 'speakers',
  EARPHONES = 'earphones',
}

registerEnumType(Category, {
  name: 'Category',
  description: 'Available product categories.',
});

@ObjectType()
@Schema()
export class Product {
  @Field(() => String, { description: 'Unique product identifier.' })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'Product slug.' })
  @Prop({ required: true, index: true, unique: true })
  slug: string;

  @Field(() => String, { description: 'Product name.' })
  @Prop({ required: true })
  name: string;

  @Field(() => Category, { description: 'Product category.' })
  @Prop({ required: true, enum: Category })
  category: Category;

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

  @Field(() => PreviewImage, { description: 'Product preview image.' })
  @Prop({ required: true })
  previewImage: PreviewImage;

  @Field(() => GalleryImages, { description: 'Product gallery images.' })
  @Prop({ required: true })
  galleryImages: GalleryImages;

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
