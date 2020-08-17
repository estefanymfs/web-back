import { Controller, Post, Get, Put, Delete, Res, HttpStatus ,Body, Param, NotFoundException, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import {create} from 'domain';
import { CreateProductDTO } from '../dto/product.dto';
import { asap, async } from 'rxjs';
import { PagoDTO } from '../dto/pago.dto';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){

    }

    @Post('/create')
    async createPost(@Res()res, @Body() createProductDTO: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'product created',
            product
        });
    }

    @Get ('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products
        });
    }

    @Get('/productID')
    async getProduct(@Res() res, @Param('productID')productID){
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException ('Product Does not exits');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
        const productDelete = await this.productService.deleteProduct(productID);
        if(!productID) throw new NotFoundException('Product Does not exits');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Succesfully',
            productDelete
        });
    }
    
    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID)
    {
        const updateProduct = await this.productService.updateProduct(productID, createProductDTO);
        if(!updateProduct) throw new NotFoundException ('User Does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product Update Succesfully',
            updateProduct
        });
    }

    @Post('/payment')
    async createPayment(@Res()res, @Body() createProductDTO: any){
        const payment = await this.productService.createPayment(createProductDTO);
        
        return res.status(HttpStatus.OK).json({
            message: 'comprado',
            payment
        });
    }
}
