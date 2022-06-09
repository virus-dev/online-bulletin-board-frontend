import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react';
import { Advertisement } from 'Models/Advertisement';

interface GetAll {
  limit: number,
  page: number,
  title?: string,
  sort?: string,
  categoryId: number,
  brandId: number,
}

interface GetCurrentAdvertisement extends GetAll {
  advertisementsViewed: string,
}

// TODO: Найти некостыльное решение
let prevProvidesTags: Advertisement[] = [];
let prevPage = 0;
let prevTitle: string | undefined;
let prevCategoryId = 0;
let prevBrandId = 0;
let prevSort: string | undefined;

const transformResponseRibbon = (
  res: unknown,
  _: FetchBaseQueryMeta | undefined,
  {
    title,
    brandId,
    categoryId,
    page,
    sort,
  }: GetAll,
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
};

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
        params: {
          limit,
          page,
          sort,
          categoryId,
          brandId,
          title,
        },
      }),
      providesTags: ['Advertisement'],
      transformResponse: transformResponseRibbon,
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
    getCurrentAdvertisement: build.query<Advertisement[], GetCurrentAdvertisement>({
      query: ({
        brandId, categoryId, limit, page, sort, advertisementsViewed,
      }) => ({
        url: '/getCurrentAdvertisement',
        method: 'GET',
        params: {
          brandId,
          categoryId,
          limit,
          page,
          sort,
          advertisementsViewed,
        },
      }),
      providesTags: () => ['Advertisement'],
      transformResponse: transformResponseRibbon,
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
