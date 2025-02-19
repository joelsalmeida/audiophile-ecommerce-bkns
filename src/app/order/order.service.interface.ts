import { AddItemToCartInput } from './dto/add-item-to-cart-input';
import { RemoveItemFromCartInput } from './dto/remove-item-from-cart.input';
import { OrderDataInterface } from './order-builder/order/index.types';

export interface OrderServiceInterface {
  addToCart(addToCartInput: AddItemToCartInput): Promise<OrderDataInterface>;

  removeItemFromCart(
    removeItemFromCartInput: RemoveItemFromCartInput,
  ): Promise<OrderDataInterface>;

  clearCart(): OrderDataInterface;

  getCart(): OrderDataInterface;

  placeOrder(): OrderDataInterface;
}
