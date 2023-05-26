import { Schema } from 'mongoose';
import WebSocket from 'ws';

export interface CategoryType {
  name: string;
  image: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  displayName: string;
  phoneNumber: string;
  googleID?: string;
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

export interface ActiveConnections {
  [room: string]: {
    [id: string]: WebSocket;
  };
}

export interface MessageType {
  date: Date;
  type: string;
  text: string;
  author: string;
  room: string;
}

export interface WhisperType {
  text: string;
  to: string;
  date: Date;
  author: string;
}

export interface IncomingMessage {
  type: string;
  payload: string | IUserMutation | MessageType;
}

export type IUserMutation = Omit<IUser, 'token' | 'role'>;
