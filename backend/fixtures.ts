import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Deal from './models/Deal';
import Category from './models/Category';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('deals');
    await db.dropCollection('messages');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }
  const [admin, user, user2] = await User.create(
    {
      username: 'admin',
      displayName: 'Админ Петрович',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555 777777',
    },
    {
      username: 'user',
      displayName: 'Юзер Иванович',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 777777',
    },
    {
      username: 'user2',
      displayName: 'Юзер Степаныч',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555 777777',
    },
  );

  const [food, car, pet] = await Category.create(
    {
      name: 'Еда',
    },
    {
      name: 'Машины',
    },
    {
      name: 'Питомцы',
    },
  );

  await Deal.create(
    {
      title: 'Продам Собаку',
      description: 'Очень послушный и хороший пёс',
      purchasePrice: 2000,
      image: 'images/dog.jpg',
      condition: 'Новое',
      category: pet._id,
      owner: admin._id,
      isPublished: true,
    },
    {
      title: 'Продам Субару',
      description: 'Очень быстрая машина на механики',
      purchasePrice: 200000,
      image: 'images/subaru.jpg',
      condition: 'Идеальное',
      category: car._id,
      owner: admin._id,
      isPublished: true,
    },
    {
      title: 'Продам Колу',
      description: 'Очень вкусная кола ящиками',
      purchasePrice: 1200,
      image: 'images/cola.jpg',
      condition: 'Новое',
      category: food._id,
      owner: user._id,
      isPublished: true,
    },
    {
      title: 'Продам Фанту',
      description: 'Очень не вкусная фанта ящиками',
      purchasePrice: 2000,
      image: 'images/fanta.jpg',
      condition: 'Новое',
      category: food._id,
      owner: user._id,
      isPublished: true,
    },
    {
      title: 'Обменяю попугая',
      description: 'Надоел попугай все документы имеются',
      tradeOn: 'на что угодно',
      image: 'images/parrot.jpg',
      condition: 'Новое',
      category: pet._id,
      owner: user2._id,
      isPublished: true,
    },
    {
      title: 'Обменяю BMW',
      description: '2011г. все расходники поменял в идеальном состоянии',
      tradeOn: 'авто или недвижимость',
      image: 'images/bmw.jpg',
      condition: 'Идеальное',
      category: car._id,
      owner: user2._id,
      isPublished: true,
    },
  );

  await db.close();
};
run().catch(console.error);
