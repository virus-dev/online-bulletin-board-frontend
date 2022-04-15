import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Brands } from '../models/Brands';

const BrandsApi = createApi({
  reducerPath: 'BrandsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}brands/` }),
  tagTypes: ['Brands'],
  endpoints: (build) => ({
    getBrands: build.query<Brands[], void>({
      query: () => ({
        url: '/getBrands',
      }),
      providesTags: () => ['Brands'],
    }),
  }),
});

export default BrandsApi;