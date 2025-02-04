import { ProductCategoryOrder } from '../index.types';
import { Category } from 'src/app/product/entities/product.entity';

/**
 * Defines the order of product categories for switch prioritization.
 */
export const CATEGORY_SWITCHES: ProductCategoryOrder = {
  [Category.HEADPHONES]: [
    Category.HEADPHONES,
    Category.EARPHONES,
    Category.SPEAKERS,
  ],
  [Category.EARPHONES]: [
    Category.EARPHONES,
    Category.HEADPHONES,
    Category.SPEAKERS,
  ],
  [Category.SPEAKERS]: [
    Category.SPEAKERS,
    Category.HEADPHONES,
    Category.EARPHONES,
  ],
};
