import express from 'express';
import Category from '../models/Category';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import Deal from '../models/Deal';
import auth from '../middleware/auth';

const CategoriesRouter = express.Router();

CategoriesRouter.get('/', async (req, res, next) => {
  try {
    const CategoryResponse = await Category.find();
    return res.send(CategoryResponse);
  } catch (e) {
    return next(e);
  }
});

CategoriesRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    await Category.create({
      name: req.body.name,
    });
    return res.send({ message: 'Категория ' + req.body.name + ' успешно создана' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

CategoriesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const deals = await Deal.find({ category: req.params.id });
    if (deals) {
      res.status(400).send({ message: 'в Категории есть Сделки' });
    } else {
      await Category.deleteOne({ _id: req.params.id });
      res.send({ message: 'успешно удалено' });
    }
  } catch (e) {
    return next(e);
  }
});

export default CategoriesRouter;
