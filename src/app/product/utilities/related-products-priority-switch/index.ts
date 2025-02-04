import { Injectable } from '@nestjs/common';
import { MongoSwitchAggregation, ProductCategoryOrder } from './index.types';
import { CATEGORY_SWITCHES } from './switches';
import { Category } from 'src/app/product/entities/product.entity';

@Injectable()
/**
 * Responsible for determining the priority order of related products
 * based on their category using MongoDB's `$switch` aggregation operator.
 */
export class RelatedProductsPrioritySwitch {
  /**
   * Stores the category switch mappings.
   * @private
   */
  private _CATEGORY_SWITCHES: ProductCategoryOrder = CATEGORY_SWITCHES;

  /**
   * Creates a MongoDB `$switch` aggregation structure based on category order.
   * @private
   * @param {Category[]} categoryOrder - The ordered list of categories.
   * @returns {MongoSwitchAggregation} The `$switch` aggregation object.
   */
  private createCategorySwitch(
    categoryOrder: Category[],
  ): MongoSwitchAggregation {
    return {
      $switch: {
        branches: categoryOrder.map((category, index) => ({
          case: { $eq: ['$category', category] },
          then: index + 1,
        })),
        default: categoryOrder.length + 1,
      },
    };
  }

  /**
   * Retrieves the `$switch` aggregation structure for a given category.
   * @param {Category} category - The category to retrieve the switch for.
   * @returns {MongoSwitchAggregation} The `$switch` aggregation object for the specified category.
   */
  getSwitchByCategory(category: Category): MongoSwitchAggregation {
    return this.createCategorySwitch(this._CATEGORY_SWITCHES[category]);
  }
}
