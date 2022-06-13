import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Advertisements } from 'Models/Advertisements';
import { fetchAllAdvertisements } from './advertisementsAsyncActions';
import { InitialStateAdvertisements, AdsAreOver, IsAdsAreOver } from './advertisementsTypes';

const initialState: InitialStateAdvertisements = {
  data: [],
  isLoading: false,
  error: null,
  adsAreOver: false,
};

export const advertisementsSlice = createSlice({
  name: 'advertisements',
  initialState,
  reducers: {
    advertisementsLoading: (state) => {
      state.isLoading = true;
    },
    advertisementsClear: (state) => {
      state.data = [];
      state.error = null;
      state.isLoading = false;
      state.adsAreOver = false;
    },
  },
  extraReducers: {
    [fetchAllAdvertisements.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Advertisements[] | AdsAreOver>,
    ) => {
      if (IsAdsAreOver(payload)) {
        state.adsAreOver = true;
      } else {
        state.data = payload;
      }
      state.isLoading = false;
      state.error = null;
    },
    [fetchAllAdvertisements.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchAllAdvertisements.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default advertisementsSlice.reducer;
