import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Item from '@/store/Item';


export const hackerNewsApi = createApi({
  reducerPath: 'hackerNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/'}),
  endpoints: (builder) => ({
    getItemById: builder.query<Item, number>({
      query: (id) => `item/${id}`,
    })
  }),
});


export const { useGetItemByIdQuery } = hackerNewsApi;