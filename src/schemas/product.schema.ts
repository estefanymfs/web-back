import { Schema } from 'mongoose';

export const ProductSchema = new Schema ({

    nombre: String,
    marca: String,
    description: String,
    imageURL: String,
    precio:Number,

})