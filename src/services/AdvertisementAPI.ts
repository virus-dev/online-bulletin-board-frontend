import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const AdvertisementApi = createApi({
  reducerPath: 'advertisementAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}advertisement/` }),
  tagTypes: ['Advertisement'],
  endpoints: (build) => ({
    create: build.mutation({
      query: (formData) => ({
        url: 'create',
        method: 'POST',
        body: formData,
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
    }),
  }),
});

export default AdvertisementApi;
