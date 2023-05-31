import { createAsyncThunk } from '@reduxjs/toolkit';
import { DealType, DealTypeProps, DealTypeWithId, GlobalSuccess, ValidationError } from '../../types';
import axiosApi from '../../axios-api';
import { isAxiosError } from 'axios';

export const getDeals = createAsyncThunk<DealTypeProps[]>('deals/getAll', async () => {
  try {
    const response = await axiosApi.get<DealTypeProps[]>('deals');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const getDealsByCategory = createAsyncThunk<DealTypeProps[], string>(
  'deals/getByCategory',
  async (category_id) => {
    try {
      const response = await axiosApi.get<DealTypeProps[]>('deals?category=' + category_id);
      return response.data;
    } catch {
      throw new Error();
    }
  },
);

export const getDealsByOwner = createAsyncThunk<DealTypeProps[], string>('deals/getByOwner', async (owner) => {
  try {
    const response = await axiosApi.get<DealTypeProps[]>('deals?owner=' + owner);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const getUnpublishedDeals = createAsyncThunk<DealTypeProps[]>('deals/getUnpublished', async () => {
  try {
    const response = await axiosApi.get<DealTypeProps[]>('deals?published=false');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const publishDeal = createAsyncThunk<void, string>('deals/publish', async (id) => {
  try {
    const response = await axiosApi.patch('deals/' + id + '/togglePublished');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const deleteDeal = createAsyncThunk<GlobalSuccess, string>('deals/delete', async (id) => {
  try {
    const response = await axiosApi.delete('deals/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const editDeal = createAsyncThunk<GlobalSuccess, DealTypeWithId>('deals/edit', async (dealData) => {
  const formData = new FormData();
  const keys = Object.keys(dealData) as (keyof DealType)[];
  keys.forEach((key) => {
    const value = dealData[key];
    if (value !== null) {
      formData.append(key, value as string | Blob);
    }
  });
  const response = await axiosApi.patch('/deals/' + dealData._id, formData);
  return response.data;
});
export const getOneDeal = createAsyncThunk<DealTypeProps, string>('deals/getOne', async (id) => {
  try {
    const response = await axiosApi.get<DealTypeProps>('deals/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const createDeal = createAsyncThunk<void, DealType, { rejectValue: ValidationError }>(
  'deals/createDeal',
  async (dealData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(dealData) as (keyof DealType)[];
      keys.forEach((key) => {
        const value = dealData[key];
        if (value !== null) {
          formData.append(key, value as string | Blob);
        }
      });
      await axiosApi.post('/deals', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
