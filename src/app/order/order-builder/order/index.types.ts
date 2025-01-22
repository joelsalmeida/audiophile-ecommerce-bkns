import { Schema as MongooseSchema } from 'mongoose';

interface CartItemInterface {
  id: MongooseSchema.Types.ObjectId;
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
  clearCart(): void;
}

export { CartItemInterface, TotalCostInterface, OrderInterface };
