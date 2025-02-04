import { Category } from 'src/app/product/entities/product.entity';

/**
 * Represents the mapping of product categories to their priority order.
 */
type ProductCategoryOrder = Record<Category, Category[]>;

/**
 * Type representing a MongoDB `$switch` aggregation structure.
 */
type MongoSwitchAggregation = {
  $switch: {
    branches: { case: { $eq: [string, Category] }; then: number }[];
    default: number;
  };
};

export { ProductCategoryOrder, MongoSwitchAggregation };
