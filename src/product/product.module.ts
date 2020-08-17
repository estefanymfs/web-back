import { Module, HttpModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../schemas/product.schema';
import { StripeService } from './stripe.services';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Product', schema: ProductSchema}
    ]),
    HttpModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    StripeService,
  ]
})
export class ProductModule {}
