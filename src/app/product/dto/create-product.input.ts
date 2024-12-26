import { InputType, Int, Field } from '@nestjs/graphql';
import { Category } from '../entities/product.entity';

@InputType()
export class BoxContentItemInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class ImagePathsInput {
  @Field(() => String)
  small: string;

  @Field(() => String)
  medium: string;

  @Field(() => String)
  large: string;
}

@InputType()
export class PreviewImageInput {
  @Field(() => String, { nullable: true })
  alt?: string;

  @Field(() => ImagePathsInput)
  paths: ImagePathsInput;
}

@InputType()
export class GalleryImageInput {
  @Field(() => String, { nullable: true })
  alt?: string;

  @Field(() => ImagePathsInput)
  paths: ImagePathsInput;
}

@InputType()
export class GalleryImagesInput {
  @Field(() => GalleryImageInput, { description: 'First gallery image.' })
  imageOne: GalleryImageInput;

  @Field(() => GalleryImageInput, { description: 'Second gallery image.' })
  imageTwo: GalleryImageInput;

  @Field(() => GalleryImageInput, { description: 'Third gallery image.' })
  imageThree: GalleryImageInput;
}

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Product slug.' })
  slug: string;

  @Field(() => String, { description: 'Product name.' })
  name: string;

  @Field(() => Category, { description: 'Product category.' })
  category: Category;

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

  @Field(() => PreviewImageInput, { description: 'Product preview image.' })
  previewImage: PreviewImageInput;

  @Field(() => GalleryImagesInput, { description: 'Product gallery images.' })
  galleryImages: GalleryImagesInput;

  @Field(() => Date, {
    description: 'Product release date.',
    nullable: true,
  })
  releaseDate?: Date;
}
