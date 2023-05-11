import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';
import { randomUUID } from 'crypto';
import config from '../config';
import { OAuth2Client } from 'google-auth-library';

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber,
    });
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send({ error: 'Пользователь не найдет' });
  }
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) {
    return res.status(400).send({ error: 'Пароль не верный' });
  }
  user.generateToken();
  await user.save();
  return res.send({ message: 'Пользователь и пароль верны', user });
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'Успешно' };
    if (!token) return res.send(success);
    const user = await User.findOne({ token });
    if (!user) return res.send(success);
    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }
    const email = payload['email'];
    const googleId = payload['sub'];
    const displayName = payload['name'];
    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }
    let user = await User.findOne({ googleID: googleId });
    if (!user) {
      user = new User({
        username: email,
        password: randomUUID(),
        googleID: googleId,
        phoneNumber: email,
        displayName,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Google successful!', user });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
