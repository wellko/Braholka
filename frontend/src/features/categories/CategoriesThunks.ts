import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryMutation, CategoryTypeProps, ValidationError } from '../../types';
import axiosApi from '../../axios-api';
import { isAxiosError } from 'axios';

export const getCategories = createAsyncThunk<CategoryTypeProps[]>('categories/getAll', async () => {
  try {
    const response = await axiosApi.get<CategoryTypeProps[]>('/categories');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const createCategory = createAsyncThunk<void, CategoryMutation, { rejectValue: ValidationError }>(
  'categories/createCategory',
  async (CategoryData, { rejectWithValue }) => {
    try {
      await axiosApi.post('/categories', CategoryData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
