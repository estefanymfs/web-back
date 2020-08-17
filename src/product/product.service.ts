import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from '../../dist/interfaces/product.interface';
import { CreateProductDTO } from '../dto/product.dto';
import { create } from 'domain';
import { PagoDTO } from '../dto/pago.dto';
import { StripeService } from './stripe.services';


@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        private stripeService: StripeService
    ){}

    async getProducts(): Promise<Product[]>{
        const product = await this.productModel.find();
        return product;
    }
    async getProduct(productID: string): Promise<Product>{
        const product = this.productModel.findById(productID);
        return product;
    }
    async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
        const product = new this.productModel(createProductDTO);
        return await product.save();
    }
    async deleteProduct(productID?: string) :Promise<Product>{
        const deleteProduct = await this.productModel.findByIdAndDelete(productID);
        return deleteProduct;
    }
    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product>{
        const updateProduct = await this.productModel.findByIdAndUpdate(productID,
            createProductDTO, {new: true});
            return updateProduct;
    }
    async createPayment(request: PagoDTO): Promise<any>{
        console.log('request', request);
        const token = await this.stripeService.createToken(
            request.cardNumber,
            request.cvv,
            request.expMonth,
            request.expYear,
            request.email
        );
        const payment = await this.stripeService.createCharge(
            request.amount,
            request.email,
            token.id
        );
        return payment;
    }
}
