import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Brands } from 'Models/Brands';

const BrandsAPI = createApi({
  reducerPath: 'BrandsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}brands/` }),
  tagTypes: ['Brands'],
  endpoints: (build) => ({
    getBrands: build.query<Brands[], number>({
      query: (categoryId) => ({
        url: '/getBrands',
        params: {
          categoryId,
        },
      }),
      providesTags: () => ['Brands'],
    }),
  }),
});

export default BrandsAPI;
