import { CartItemInterface, OrderInterface } from './index.types';
import { Schema as MongooseSchema } from 'mongoose';

export class Order implements OrderInterface {
  private _cartItems: CartItemInterface[];

  constructor(cartItems: CartItemInterface[]) {
    this._cartItems = cartItems;
  }

  private getItemById(id: MongooseSchema.Types.ObjectId) {
    return this._cartItems.find((item) => String(item.id) === String(id));
  }

  addItemToCart(item: CartItemInterface): OrderInterface {
    const itemFound = this.getItemById(item.id);

    if (itemFound) {
      const currentItemQuantityOnCart = itemFound.quantity;
      const quantityToAdd = item.quantity;

      itemFound.quantity = currentItemQuantityOnCart + quantityToAdd;
      return this;
    }

    this._cartItems.push(item);
    return this;
  }

  removeItemFromCart(id: MongooseSchema.Types.ObjectId): OrderInterface {
    const itemFound = this.getItemById(id);
    const atLastTwoItems = itemFound?.quantity > 1;
    const justOneItem = itemFound?.quantity == 1;

    if (itemFound && atLastTwoItems) {
      const currentItemQuantity = itemFound.quantity;
      itemFound.quantity = currentItemQuantity - 1;
      return this;
    }

    if (itemFound && justOneItem) {
      const filteredCart = this.cartItems.filter(
        (item) => String(item.id) !== String(id),
      );

      this._cartItems = filteredCart;
    }

    return this;
  }

  clearCart(): void {
    this._cartItems = [];
  }

  get cartItems(): CartItemInterface[] {
    return this._cartItems;
  }

  get totalCost() {
    const total = this.cartItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    const shipping = 5000;
    const VAT = total * 0.2;
    const grandTotal = total + shipping + VAT;

    return {
      total,
      shipping,
      VAT,
      grandTotal,
    };
  }
}
