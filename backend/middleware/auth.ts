import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const token = await req.get('Authorization');
  if (!token) {
    return res.status(401).send({ error: 'Токена нет' });
  }
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send({ error: 'нет такого пользователя!' });
  }
  req.user = user;
  next();
};

export default auth;
