import { SetStateAction } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { User } from '../models/User';

interface GetDataById {
  id: number,
}

const UserApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}user/` }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getData: build.query<User, void>({
      query: () => ({
        url: '/getData',
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      providesTags: () => ['User'],
    }),
    getDataById: build.query<User, number | SetStateAction<number | null>>({
      query: (id) => ({
        url: '/getDataById',
        params: {
          id,
        },
      }),
      providesTags: () => ['User'],
    }),
    update: build.mutation({
      query: (formData) => ({
        url: '/update',
        method: 'POST',
        body: formData,
        headers: {
          authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export default UserApi;
