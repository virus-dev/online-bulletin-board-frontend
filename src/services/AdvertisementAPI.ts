import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Advertisement } from 'Models/Advertisement';

interface GetAll {
  limit: number,
  page: number,
  title: string,
  sort: string,
  categoryId: number,
  brandId: number,
}

// TODO: Найти некостыльное решение
let prevProvidesTags: Advertisement[] = [];
let prevPage = 0;
let prevTitle = '';
let prevCategoryId = 0;
let prevBrandId = 0;
let prevSort = '';

const AdvertisementAPI = createApi({
  reducerPath: 'advertisementAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}advertisement/` }),
  tagTypes: ['Advertisement'],
  endpoints: (build) => ({
    getAll: build.query<Advertisement[], GetAll>({
      query: ({
        limit, page, title, sort, categoryId, brandId,
      }) => ({
        url: '/getAll',
        method: 'POST',
        params: {
          limit,
          page,
          sort,
          categoryId,
          brandId,
        },
        body: {
          title,
        },
      }),
      providesTags: ['Advertisement'],
      transformResponse: (
        res,
        _,
        {
          title,
          brandId,
          categoryId,
          page,
          sort,
        },
      ) => {
        if (title !== prevTitle) {
          prevTitle = title;
          prevProvidesTags = [];
        }

        if (brandId !== prevBrandId) {
          prevBrandId = brandId;
          prevProvidesTags = [];
        }

        if (categoryId !== prevCategoryId) {
          prevCategoryId = categoryId;
          prevProvidesTags = [];
        }

        if (page <= prevPage) {
          prevPage = page;
          prevProvidesTags = [];
        }

        if (sort !== prevSort) {
          prevSort = sort;
          prevProvidesTags = [];
        }

        if (Array.isArray(res) && res.length) {
          const transformRes = [...prevProvidesTags, ...res];
          prevProvidesTags = transformRes;
          return transformRes;
        }

        return prevProvidesTags;
      },
    }),
    getAllMyAdvertisement: build.query<Advertisement[], void>({
      query: () => ({
        url: '/getAllMyAdvertisement',
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      providesTags: ['Advertisement'],
    }),
    getAllOnModeration: build.query<Advertisement[], GetAll>({
      query: ({ limit, page }) => ({
        url: '/getAllOnModeration',
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
        params: {
          limit,
          page,
        },
      }),
      providesTags: ['Advertisement'],
    }),
    getOne: build.query<Advertisement, number>({
      query: (id) => ({
        url: '/getOne',
        params: {
          id,
        },
      }),
    }),
    getOneMaybeNotPublic: build.query<Advertisement, number>({
      query: (id) => ({
        url: '/getOneMaybeNotPublic',
        params: {
          id,
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
    }),
    getImages: build.query<string[], number>({
      query: (advertisementId) => ({
        url: '/getImages',
        params: {
          advertisementId,
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
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
    confirmModeration: build.mutation({
      query: (advertisementId: number | undefined) => ({
        url: 'confirmModeration',
        method: 'PUT',
        body: { advertisementId },
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      invalidatesTags: ['Advertisement'],
    }),
    disconfirmModeration: build.mutation({
      query: (advertisementId: number | undefined) => ({
        url: 'disconfirmModeration',
        method: 'PUT',
        body: { advertisementId },
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      invalidatesTags: ['Advertisement'],
    }),
  }),
});

export default AdvertisementAPI;
