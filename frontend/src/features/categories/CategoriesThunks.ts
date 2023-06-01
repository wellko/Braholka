import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryMutation, CategoryTypeProps, GlobalSuccess, ValidationError } from '../../types';
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

export const createCategory = createAsyncThunk<GlobalSuccess, CategoryMutation, { rejectValue: ValidationError }>(
  'categories/createCategory',
  async (CategoryData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/categories', CategoryData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
