import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Advertisement } from 'Models/Advertisement';

interface GetAll {
  limit: number,
  page: number,
  title: string,
}

// TODO: Найти некостыльное решение
let prevProvidesTags: Advertisement[] = [];
let prevTitle = '';

const AdvertisementApi = createApi({
  reducerPath: 'advertisementAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}advertisement/` }),
  tagTypes: ['Advertisement'],
  endpoints: (build) => ({
    getAll: build.query<Advertisement[], GetAll>({
      query: ({ limit, page, title }) => ({
        url: '/getAll',
        method: 'POST',
        params: {
          limit,
          page,
        },
        body: {
          title,
        },
      }),
      providesTags: ['Advertisement'],
      transformResponse: (res, _, { title }) => {
        if (title !== prevTitle) {
          prevTitle = title;
          prevProvidesTags = [];
        }

        if (Array.isArray(res)) {
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

export default AdvertisementApi;
