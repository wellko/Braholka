import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryType, CategoryTypeProps, ValidationError } from '../../types';
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

export const createCategory = createAsyncThunk<void, CategoryType, { rejectValue: ValidationError }>(
  'categories/createCategory',
  async (CategoryData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(CategoryData) as (keyof CategoryType)[];
      keys.forEach((key) => {
        const value = CategoryData[key];
        if (value !== null) {
          formData.append(key, value as string | Blob);
        }
      });
      await axiosApi.post('/categories', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
