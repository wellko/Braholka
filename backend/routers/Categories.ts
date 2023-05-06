import express from 'express';
import Category from '../models/Category';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import { CategoryImagesUpload } from '../multer';
import Deal from '../models/Deal';

const CategoriesRouter = express.Router();

CategoriesRouter.get('/', async (req, res, next) => {
  try {
    const CategoryResponse = await Category.find();
    return res.send(CategoryResponse);
  } catch (e) {
    return next(e);
  }
});

CategoriesRouter.post('/', permit('admin'), CategoryImagesUpload.single('image'), async (req, res, next) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
      image: req.file && req.file.filename,
    });
    return res.send(newCategory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

CategoriesRouter.delete('/:id', permit('admin'), async (req, res, next) => {
  try {
    const deals = await Deal.find({ category: req.params.id });
    if (deals) {
      res.send({ message: 'в Категории есть Сделки' });
    } else {
      await Category.deleteOne({ _id: req.params.id });
      res.send({ message: 'успешно удалено' });
    }
  } catch (e) {
    return next(e);
  }
});

export default CategoriesRouter;
