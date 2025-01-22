import { OrderBuilderInterface } from './index.types';
import { Order } from './order';
import { CartItemInterface, OrderInterface } from './order/index.types';

export class OrderBuilder implements OrderBuilderInterface {
  private _order: OrderInterface;

  constructor() {
    this._order = new Order([]);
  }

  reset() {
    this._order = new Order([]);
    return this;
  }

  setCartItems(cartItems: CartItemInterface[]) {
    this._order.cartItems = cartItems;
    return this;
  }

  build(): OrderInterface {
    this.reset();
    return this._order;
  }
}
