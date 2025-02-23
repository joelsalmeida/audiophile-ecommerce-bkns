import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { AddItemToCartInput } from './dto/add-item-to-cart-input';
import { RemoveItemFromCartInput } from './dto/remove-item-from-cart.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async addToCart(@Args('addToCartInput') addToCartInput: AddItemToCartInput) {
    const order = await this.orderService.addToCart(addToCartInput);

    return { cartItems: order.cartItems, totalCost: order.totalCost };
  }

  @Mutation(() => Order)
  async removeItemFromCart(
    @Args('removeItemFromCartInput')
    removeItemFromCartInput: RemoveItemFromCartInput,
  ) {
    const order = await this.orderService.removeItemFromCart(
      removeItemFromCartInput,
    );

    return { cartItems: order.cartItems, totalCost: order.totalCost };
  }

  @Mutation(() => Order)
  async clearCart() {
    const order = this.orderService.clearCart();
    return { cartItems: order.cartItems, totalCost: order.totalCost };
  }

  @Query(() => Order)
  getCart() {
    const order = this.orderService.getCart();
    return { cartItems: order.cartItems, totalCost: order.totalCost };
  }

  @Mutation(() => Order)
  async placeOrder() {
    const order = this.orderService.placeOrder();

    return { cartItems: order.cartItems, totalCost: order.totalCost };
  }
}
