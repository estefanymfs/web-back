import {Document} from 'mongoose'

export interface User extends Document{
    name: string;
    lastName: string;
    dni: number;
    date: Date;
    phone: number;
    diretion: string;
    user: string;
    password: string;
}