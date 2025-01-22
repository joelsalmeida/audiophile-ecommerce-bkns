import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { ProductModule } from '../product/product.module';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [ProductModule],
})
export class OrderModule {}
