import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Categories } from '../models/Categories';

const CategoriesApi = createApi({
  reducerPath: 'CategoriesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}categories/` }),
  tagTypes: ['Categories'],
  endpoints: (build) => ({
    getCategories: build.query<Categories[], void>({
      query: () => ({
        url: '/getCategories',
      }),
      providesTags: () => ['Categories'],
    }),
  }),
});

export default CategoriesApi;
