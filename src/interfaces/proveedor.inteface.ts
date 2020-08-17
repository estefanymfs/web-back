import { Document } from 'mongoose';

export interface Proveedor extends Document {

    nombre: string;
    diretion: string;
    phone: number;

}
