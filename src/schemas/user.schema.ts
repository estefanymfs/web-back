import {Schema} from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    lastName: String,
    dni: Number,
    date: Date,
    phone: Number,
    diretion: String,
    user: String,
    password: String,
});

