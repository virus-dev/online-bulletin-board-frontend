/* eslint import/prefer-default-export: ["off"] */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Advertisements } from 'Models/Advertisements';
import { AdsAreOver, IsAdsAreOver } from './advertisementsTypes';

interface Params {
  limit: number,
  page: number,
  title?: string,
  sort?: string,
  categoryId?: number,
  brandId?: number,
  currentAdvertisements?: string,
  myAdvertisements?: boolean,
  moderation?: boolean,
}

interface Arg {
  params: Params,
  prevAdvertisements: Advertisements[],
}

interface AdvertisementImages {
  imageUrl: string,
}

interface AdvertisementsResponse extends Omit<Advertisements, 'advertisementImages'> {
  advertisementImages: AdvertisementImages[];
}

type FetchAllAdvertisementsResponse = AdvertisementsResponse[] | AdsAreOver;

export const fetchAllAdvertisements = createAsyncThunk(
  'advertisement/fetchAllAdvertisements',
  async (
    { params, prevAdvertisements }: Arg,
    thunkAPI,
  ) => {
    try {
      const { data } = await axios.get<FetchAllAdvertisementsResponse>(`${process.env.REACT_APP_API_URL}advertisement/getAll`, {
        params,
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      });

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
