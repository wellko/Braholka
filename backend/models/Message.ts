import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  room: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User not found!',
    },
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User not found!',
    },
  },
  whisper: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
