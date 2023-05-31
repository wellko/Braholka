import mongoose, { Types } from 'mongoose';
import { dealType } from '../types';
import User from './User';
import Category from './Category';

const Schema = mongoose.Schema;
const DealSchema = new Schema<dealType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
  purchasePrice: {
    type: Number,
    validate: {
      validator: (value: number) => value >= 0,
      message: 'Цена должна быть положительным числом',
    },
  },
  tradeOn: {
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  condition: {
    type: String,
    required: true,
    enum: ['Новое', 'Идеальное', 'Очень хорошее ', 'Удовлетворительное'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: 'Категория не найдена!',
    },
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'Пользователь не найден!',
    },
  },
});

const Deal = mongoose.model('Deal', DealSchema);

export default Deal;
