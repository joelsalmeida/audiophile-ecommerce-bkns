import { Injectable } from '@nestjs/common';
import { RemoveItemFromCartInput } from './dto/remove-item-from-cart.input';
import { ProductService } from '../product/product.service';
import { AddItemToCartInput } from './dto/add-item-to-cart-input';
import {
  CartItemInterface,
  OrderInterface,
} from './order-builder/order/index.types';
import { OrderBuilderInterface } from './order-builder/index.types';
import { OrderBuilder } from './order-builder';

@Injectable()
export class OrderService {
  private _order: OrderInterface;
  private _orderBuilder: OrderBuilderInterface;

  constructor(private productService: ProductService) {
    this._orderBuilder = new OrderBuilder();
    this._order = this._orderBuilder.build();
  }

  async addToCart(addToCartInput: AddItemToCartInput): Promise<OrderInterface> {
    const itemId = addToCartInput._id;
    const productFound = await this.productService.findOne(itemId);

    if (productFound) {
      const newProduct: CartItemInterface = {
        id: productFound._id,
        price: productFound.price,
        imagePath: productFound.previewImage.paths.small,
        quantity: addToCartInput.quantity,
      };

      this._order.addItemToCart(newProduct);

      return this._order;
    }
  }

  async removeItemFromCart(
    removeItemFromCartInput: RemoveItemFromCartInput,
  ): Promise<OrderInterface> {
    const itemId = removeItemFromCartInput._id;
    const productFound = await this.productService.findOne(itemId);

    if (productFound) {
      this._order.removeItemFromCart(itemId);

      return this._order;
    }
  }

  getCart(): OrderInterface {
    return this._order;
  }
}
