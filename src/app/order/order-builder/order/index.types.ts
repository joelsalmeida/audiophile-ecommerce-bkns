import { Schema as MongooseSchema } from 'mongoose';

interface CartItemInterface {
  id: MongooseSchema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

interface TotalCostInterface {
  total: number;
  shipping: number;
  VAT: number;
  grandTotal: number;
}

interface OrderInterface {
  cartItems: CartItemInterface[];
  totalCost: TotalCostInterface;

  addItemToCart(item: CartItemInterface): OrderInterface;
  removeItemFromCart(id: MongooseSchema.Types.ObjectId): OrderInterface;
  clearCart(): OrderInterface;
}

interface OrderDataInterface {
  cartItems: CartItemInterface[];
  totalCost: TotalCostInterface;
}

export {
  CartItemInterface,
  TotalCostInterface,
  OrderInterface,
  OrderDataInterface,
};
