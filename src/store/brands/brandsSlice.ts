import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brands } from 'Models/Brands';
import { InitialStateBrands } from './brandsTypes';
import { fetchBrands } from './brandsAsyncActions';

const initialState: InitialStateBrands = {
  data: [],
  isLoading: false,
  error: null,
};

export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBrands.fulfilled.type]: (state, { payload }: PayloadAction<Brands[]>) => {
      state.data = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchBrands.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchBrands.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = payload;
    },
  },
});

export default brandsSlice.reducer;
