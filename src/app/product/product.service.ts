import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { PaginationArgs } from '../common/dto/pagination.args';
import { RelatedProductsPrioritySwitch } from './utilities';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private relatedProductsPrioritySwitch: RelatedProductsPrioritySwitch,
  ) {}

  create(createProductInput: CreateProductInput) {
    const createdProduct = new this.productModel(createProductInput);
    return createdProduct.save();
  }

  async findAll(limit: number, skip: number) {
    const result = await this.productModel.aggregate([
      {
        $facet: {
          products: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: 'total' }],
        },
      },
    ]);

    const products = result[0]?.products || [];
    const totalCount = result[0]?.totalCount?.[0]?.total || 0;

    return {
      products,
      totalCount,
    };
  }

  async findByCategory(category: string, { limit, skip }: PaginationArgs) {
    const result = await this.productModel.aggregate([
      { $match: { category } },
      {
        $facet: {
          products: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: 'total' }],
        },
      },
    ]);

    const products = result[0]?.products || [];
    const totalCount = result[0]?.totalCount?.[0]?.total || 0;

    return {
      products,
      totalCount,
    };
  }

  async getRelatedProducts(id: MongooseSchema.Types.ObjectId) {
    const productFound = await this.productModel.findById(id, 'category');

    const result = await this.productModel.aggregate([
      { $match: { _id: { $ne: productFound._id } } },
      {
        $addFields: {
          categoryPriority:
            this.relatedProductsPrioritySwitch.getSwitchByCategory(
              productFound?.category,
            ),
        },
      },
      { $sort: { categoryPriority: 1 } },
      { $limit: 3 },
      { $project: { categoryPriority: 0 } },
      {
        $facet: {
          products: [],
          totalCount: [{ $count: 'total' }],
        },
      },
    ]);

    const products = result[0]?.products || [];
    const totalCount = result[0]?.totalCount?.[0]?.total || 0;

    return {
      products,
      totalCount,
    };
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    return this.productModel.findById(id);
  }

  findOneBySlug(slug: string) {
    return this.productModel.findOne({ slug });
  }

  update(
    id: MongooseSchema.Types.ObjectId,
    updateProductInput: UpdateProductInput,
  ) {
    return this.productModel.findByIdAndUpdate(id, updateProductInput, {
      new: true,
    });
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.productModel.deleteOne({ _id: id });
  }
}
