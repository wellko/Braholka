import { Schema } from 'mongoose';

export interface CategoryType {
  name: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  displayName: string;
  phoneNumber: string;
  role: string;
}

export interface dealType {
  title: string;
  description: string;
  purchasePrice: number;
  image: string;
  condition: string;
  category: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
}
