import { DealTypeProps, GlobalSuccess, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createDeal,
  editDeal,
  getDeals,
  getDealsByCategory,
  getDealsByOwner,
  getOneDeal,
  getUnpublishedDeals,
  publishDeal,
} from './DealsThunks';

interface DealsState {
  deals: DealTypeProps[] | null;
  loading: boolean;
  deal: DealTypeProps | null;
  createError: ValidationError | null;
  success: GlobalSuccess | null;
}

const initialState: DealsState = {
  deals: null,
  loading: false,
  deal: null,
  createError: null,
  success: null,
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
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDeal.fulfilled, (state, { payload: success }) => {
      state.loading = false;
      state.success = success;
    });
    builder.addCase(createDeal.rejected, (state, { payload: error }) => {
      state.loading = false;
      state.createError = error || null;
    });
    builder.addCase(getDealsByOwner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDealsByOwner.fulfilled, (state, { payload: deals }) => {
      state.loading = false;
      state.deals = deals;
    });
    builder.addCase(getDealsByOwner.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getUnpublishedDeals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUnpublishedDeals.fulfilled, (state, { payload: deals }) => {
      state.loading = false;
      state.deals = deals;
    });
    builder.addCase(getUnpublishedDeals.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(editDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editDeal.fulfilled, (state, { payload: success }) => {
      state.loading = false;
      state.success = success;
    });
    builder.addCase(editDeal.rejected, (state) => {
      state.loading = false;
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
    builder.addCase(publishDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(publishDeal.fulfilled, (state, { payload: success }) => {
      state.loading = false;
      state.success = success;
    });
    builder.addCase(publishDeal.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const dealsReducer = DealsSlice.reducer;
export const selectDeals = (state: RootState) => state.deals.deals;
export const selectDeal = (state: RootState) => state.deals.deal;
export const selectDealsLoading = (state: RootState) => state.deals.loading;
export const selectDealCreatingError = (state: RootState) => state.deals.createError;
export const selectDealSuccess = (state: RootState) => state.deals.success;
