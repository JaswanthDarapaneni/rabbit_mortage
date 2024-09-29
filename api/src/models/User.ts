// src/models/User.ts
import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
    @prop({ required: true })
    name!: string;

    @prop({ required: true, unique: true })
    email!: string;
}

export const UserModel = getModelForClass(User);
