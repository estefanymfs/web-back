import { Document } from 'mongoose';

export interface Product extends Document {
    nombre: string;
    marca: string;
    description: string;
    imageURL: string;
    precio: number;
}
