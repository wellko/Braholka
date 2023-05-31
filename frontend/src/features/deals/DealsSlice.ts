import { DealTypeProps, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createDeal,
  getDeals,
  getDealsByCategory,
  getDealsByOwner,
  getOneDeal,
  getUnpublishedDeals,
} from './DealsThunks';

interface DealsState {
  deals: DealTypeProps[] | null;
  loading: boolean;
  deal: DealTypeProps | null;
  createError: ValidationError | null;
}

const initialState: DealsState = {
  deals: null,
  loading: false,
  deal: null,
  createError: null,
};

export const DealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDeals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDeals.fulfilled, (state, { payload: deals }) => {
      state.loading = false;
      state.deals = deals;
    });
    builder.addCase(getDeals.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getDealsByCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDealsByCategory.fulfilled, (state, { payload: deals }) => {
      state.loading = false;
      state.deals = deals;
    });
    builder.addCase(getDealsByCategory.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getDealsByOwner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDealsByOwner.fulfilled, (state, { payload: deals }) => {
      state.loading = false;
      state.deals = deals;
    });
    builder.addCase(getUnpublishedDeals.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getUnpublishedDeals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUnpublishedDeals.fulfilled, (state, { payload: deals }) => {
      state.loading = false;
      state.deals = deals;
    });
    builder.addCase(getDealsByOwner.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createDeal.rejected, (state, { payload: error }) => {
      state.loading = false;
      state.createError = error || null;
    });
    builder.addCase(getOneDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneDeal.fulfilled, (state, { payload: deal }) => {
      state.loading = false;
      state.deal = deal;
    });
    builder.addCase(getOneDeal.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const dealsReducer = DealsSlice.reducer;
export const selectDeals = (state: RootState) => state.deals.deals;
export const selectDeal = (state: RootState) => state.deals.deal;
export const selectDealsLoading = (state: RootState) => state.deals.loading;
