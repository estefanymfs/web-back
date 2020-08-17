import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ProveedorModule } from './proveedor/proveedor.module';

@Module({
  imports: [
    UserModule, 
    ProductModule, 
    ProveedorModule,
    MongooseModule.forRoot('mongodb://localhost/techventa',{ useNewUrlParser:true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
