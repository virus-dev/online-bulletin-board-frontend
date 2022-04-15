import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Advertisement } from '../models/Advertisement';

interface GetAll {
  limit: number,
  page: number,
}

const AdvertisementApi = createApi({
  reducerPath: 'advertisementAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}advertisement/` }),
  tagTypes: ['Advertisement'],
  endpoints: (build) => ({
    getAll: build.query<Advertisement[], GetAll>({
      query: ({ limit, page }) => ({
        url: '/getAll',
        params: {
          limit,
          page,
        },
      }),
    }),
    getOne: build.query<Advertisement, number>({
      query: (id) => ({
        url: '/getOne',
        params: {
          id,
        },
      }),
    }),
    getImages: build.query<string[], number>({
      query: (advertisementId) => ({
        url: '/getImages',
        params: {
          advertisementId,
        },
      }),
    }),
    create: build.mutation({
      query: (formData) => ({
        url: 'create',
        method: 'POST',
        body: formData,
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      invalidatesTags: ['Advertisement'],
    }),
  }),
});

export default AdvertisementApi;
