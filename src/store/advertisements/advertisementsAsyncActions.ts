/* eslint import/prefer-default-export: ["off"] */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Advertisements } from 'Models/Advertisements';
import requestGetAllAdvertisements, { AdvertisementsGetAllReqParams } from 'Packages/api/rest/advertisements/requestGetAllAdvertisements';
import { IsAdsAreOver } from './advertisementsTypes';

interface Arg {
  params: AdvertisementsGetAllReqParams,
  prevAdvertisements: Advertisements[],
}

interface AdvertisementImages {
  imageUrl: string,
}

export interface AdvertisementsResponse extends Omit<Advertisements, 'advertisementImages'> {
  advertisementImages: AdvertisementImages[];
}

export const fetchAllAdvertisements = createAsyncThunk(
  'advertisement/fetchAllAdvertisements',
  async (
    { params, prevAdvertisements }: Arg,
    thunkAPI,
  ) => {
    try {
      const { data } = await requestGetAllAdvertisements(params);

      if (IsAdsAreOver(data)) {
        return data;
      }

      // TODO: Найти как с сервера присылать сразу массив
      const result: Advertisements[] = [
        ...prevAdvertisements,
        ...data.map((advertisement) => ({
          ...advertisement,
          advertisementImages: advertisement.advertisementImages.map(({ imageUrl }) => imageUrl),
        })),
      ];

      return result;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка');
    }
  },
);
