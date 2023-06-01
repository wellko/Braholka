import express from 'express';
import Deal from '../models/Deal';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import permit from '../middleware/permit';
import * as fs from 'fs';
import config from '../config';
import Message from '../models/Message';

const DealsRouter = express.Router();

DealsRouter.get('/', async (req, res, next) => {
  try {
    const ownerQuery = req.query.owner as string;
    const categoryQuery = req.query.category as string;
    const unPublished = req.query.published as string;
    if (unPublished) {
      const dealResponse = await Deal.find({
        isPublished: false,
      }).populate({ path: 'category' });
      res.send(dealResponse);
    }
    if (categoryQuery) {
      const dealResponse = await Deal.find({
        category: categoryQuery,
        isPublished: true,
      }).populate({ path: 'category' });
      res.send(dealResponse);
    } else if (ownerQuery) {
      const dealResponse = await Deal.find({ owner: ownerQuery }).populate({ path: 'category' });
      res.send(dealResponse);
    } else {
      const dealResponse = await Deal.find({ isPublished: true }).populate({ path: 'category' });
      res.send(dealResponse);
    }
  } catch (e) {
    return next(e);
  }
});

DealsRouter.get('/:id', async (req, res, next) => {
  try {
    const response = await Deal.findById(req.params.id).populate([{ path: 'category' }, { path: 'owner' }]);
    res.send(response);
  } catch (e) {
    return next(e);
  }
});

DealsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    await Deal.create({
      tradeOn: parseInt(req.body.purchasePrice) > 0 ? '' : req.body.tradeOn,
      title: req.body.title,
      description: req.body.description,
      purchasePrice: req.body.tradeOn ? 0 : parseInt(req.body.purchasePrice),
      image: req.file && req.file.filename,
      condition: req.body.condition,
      category: req.body.category,
      owner: user._id,
    });
    return res.send({ message: 'Сделка ' + req.body.title + ' успешно создана' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

DealsRouter.patch('/:id', auth, imagesUpload.single('image'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;
    const findDeal = await Deal.findById(req.params.id);
    if (!findDeal) {
      return res.status(404).send({ message: 'Объявление не найдено' });
    }
    if (JSON.stringify(findDeal.owner) !== JSON.stringify(user._id)) {
      return res.status(400).send({ message: 'недостаточно прав' });
    }
    if (req.file) {
      fs.unlink(config.publicPath + '/' + findDeal.image, (err) => {
        if (err) {
          console.error('Ошибка при удалении предыдущего файла изображения:', err);
        }
      });
    }
    const deal = await Deal.updateOne(
      { _id: req.params.id, owner: user._id },
      {
        $set: {
          tradeOn: parseInt(req.body.purchasePrice) > 0 ? '' : req.body.tradeOn,
          title: req.body.title,
          description: req.body.description,
          purchasePrice: req.body.tradeOn.length ? 0 : parseInt(req.body.purchasePrice),
          image: req.file && req.file.filename,
          condition: req.body.condition,
          category: req.body.category,
        },
      },
    );
    if (deal.modifiedCount < 1) {
      res.status(404).send({ message: 'Объявление не найдено' });
    } else {
      res.send({ message: 'Успешно изменино' });
    }
  } catch {
    return res.sendStatus(500);
  }
});

DealsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const deal = await Deal.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isPublished: true,
        },
      },
    );
    if (deal.modifiedCount < 1) {
      res.status(404).send({ message: 'Объявление не найдено' });
    } else {
      res.send({ message: 'успешно опубликованно' });
    }
  } catch {
    return res.sendStatus(500);
  }
});

DealsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const deal = await Deal.findById(req.params.id);
    if (deal) {
      if (user && user.role === 'admin') {
        fs.unlink(config.publicPath + '/' + deal.image, (err) => {
          if (err) {
            console.error('Ошибка при удалении предыдущего файла изображения:', err);
          }
        });
        await Message.deleteMany({ room: req.params._id });
        await Deal.deleteOne({ _id: req.params.id });
        return res.send({ message: 'Успешно удалено' });
      }
      if (user && user.role === 'user') {
        const dealDeleted = await Deal.deleteOne({ _id: req.params.id, owner: user._id });
        if (dealDeleted.deletedCount > 0) {
          await Message.deleteMany({ room: req.params._id });
          fs.unlink(config.publicPath + '/' + deal.image, (err) => {
            if (err) {
              console.error('Ошибка при удалении предыдущего файла изображения:', err);
            }
          });
          return res.send({ message: 'Успешно удалено' });
        } else {
          res.status(400).send({ message: 'Не достаточно прав' });
        }
      }
    } else {
      res.status(404).send({ message: 'Объявление не найдено' });
    }
  } catch (e) {
    return next(e);
  }
});

export default DealsRouter;
