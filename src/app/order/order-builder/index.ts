import { OrderBuilderInterface } from './index.types';
import { Order } from './order';
import { CartItemInterface, OrderInterface } from './order/index.types';

export class OrderBuilder implements OrderBuilderInterface {
  private cartItems: CartItemInterface[] = [];

  reset() {
    this.cartItems = [];
    return this;
  }

  setCartItems(cartItems: CartItemInterface[]) {
    this.cartItems = cartItems;
    return this;
  }

  build(): OrderInterface {
    return new Order(this.cartItems);
  }
}
