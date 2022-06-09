import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Advertisement } from 'Models/Advertisement';
import { fetchAdvertisement } from './advertisementAsyncActions';
import { InitialStateAdvertisement } from './advertisementTypes';

const initialState: InitialStateAdvertisement = {
  advertisementImages: [],
  id: null,
  userId: null,
  title: null,
  price: null,
  categoryId: null,
  brandId: null,
  status: null,
  description: null,
  createdAt: null,
  updatedAt: null,
  isLoading: false,
};

const emptyTheState = (state: InitialStateAdvertisement) => {
  state.brandId = null;
  state.categoryId = null;
  state.createdAt = null;
  state.description = null;
  state.id = null;
  state.price = null;
  state.status = null;
  state.title = null;
  state.updatedAt = null;
  state.userId = null;
  state.advertisementImages = [];
};

export const advertisementSlice = createSlice({
  name: 'advertisement',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAdvertisement.fulfilled.type]: (state, { payload }: PayloadAction<Advertisement>) => {
      state.brandId = payload.brandId;
      state.categoryId = payload.categoryId;
      state.createdAt = payload.createdAt;
      state.description = payload.description;
      state.id = payload.id;
      state.price = payload.price;
      state.status = payload.status;
      state.title = payload.title;
      state.updatedAt = payload.updatedAt;
      state.userId = payload.userId;
      state.advertisementImages = payload.advertisementImages;
      state.isLoading = false;
    },
    [fetchAdvertisement.pending.type]: (state) => {
      emptyTheState(state);
      state.isLoading = true;
    },
    [fetchAdvertisement.rejected.type]: (state) => {
      emptyTheState(state);
      state.isLoading = false;
    },
  },
});

export default advertisementSlice.reducer;
