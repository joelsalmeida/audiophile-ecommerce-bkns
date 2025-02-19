import { Injectable } from '@nestjs/common';
import { RemoveItemFromCartInput } from './dto/remove-item-from-cart.input';
import { ProductService } from '../product/product.service';
import { AddItemToCartInput } from './dto/add-item-to-cart-input';
import {
  CartItemInterface,
  OrderInterface,
  OrderDataInterface,
} from './order-builder/order/index.types';
import { OrderBuilderInterface } from './order-builder/index.types';
import { OrderBuilder } from './order-builder';
import { OrderServiceInterface } from './order.service.interface';

@Injectable()
export class OrderService implements OrderServiceInterface {
  private _order: OrderInterface;
  private _orderBuilder: OrderBuilderInterface;

  constructor(private productService: ProductService) {
    this._orderBuilder = new OrderBuilder();
    this._order = this._orderBuilder.build();
  }

  async addToCart(
    addToCartInput: AddItemToCartInput,
  ): Promise<OrderDataInterface> {
    const itemId = addToCartInput._id;
    const productFound = await this.productService.findOne(itemId);

    if (productFound) {
      const newProduct: CartItemInterface = {
        id: productFound._id,
        name: productFound.name,
        price: productFound.price,
        imagePath: productFound.previewImage.paths.small,
        quantity: addToCartInput.quantity,
      };

      return this._order.addItemToCart(newProduct);
    }
  }

  async removeItemFromCart(
    removeItemFromCartInput: RemoveItemFromCartInput,
  ): Promise<OrderDataInterface> {
    const itemId = removeItemFromCartInput._id;
    const productFound = await this.productService.findOne(itemId);

    if (productFound) {
      return this._order.removeItemFromCart(itemId);
    }
  }

  clearCart(): OrderDataInterface {
    return this._order.clearCart();
  }

  getCart(): OrderDataInterface {
    return this._order;
  }

  placeOrder(): OrderDataInterface {
    const placedOrder = {
      cartItems: this._order.cartItems,
      totalCost: this._order.totalCost,
    };

    this._order = this._orderBuilder.reset().build();

    return placedOrder;
  }
}
