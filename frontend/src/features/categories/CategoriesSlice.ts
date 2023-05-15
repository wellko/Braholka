import { CategoryTypeProps, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createCategory, getCategories } from './CategoriesThunks';

interface CategoriesState {
  categories: CategoryTypeProps[];
  loading: boolean;
  createError: ValidationError | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  createError: null,
};

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload: categories }) => {
      state.loading = false;
      state.categories = categories;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createCategory.rejected, (state, { payload: error }) => {
      state.loading = false;
      state.createError = error || null;
    });
  },
});

export const categoryReducer = CategoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesError = (state: RootState) => state.categories.createError;
