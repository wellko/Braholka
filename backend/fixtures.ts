import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('deals');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }
  await User.create(
    {
      username: 'admin',
      displayName: 'Admin Adminich',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
    },
    {
      username: 'user',
      displayName: 'User Useridze',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 777777',
    },
  );

  await db.close();
};

run().catch(console.error);
