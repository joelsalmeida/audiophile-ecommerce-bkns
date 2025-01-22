import { CartItemInterface, OrderInterface } from './order/index.types';

export interface OrderBuilderInterface {
  reset(): this;
  setCartItems(cartItems: CartItemInterface[]): this;
  build(): OrderInterface;
}
