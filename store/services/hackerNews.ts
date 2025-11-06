import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Item from '@/store/Item';

export enum StoriesType {
  New,
  Top,
  Best,
}

export const hackerNewsApi = createApi({
  reducerPath: 'hackerNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hacker-news.firebaseio.com/v0/',
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getItemById: builder.query<Item, number>({
      query: (id) => `item/${id}.json`,
    }),

    getFrontPageIdsByStoriesType: builder.query<[number], StoriesType>({
      query: (storiesType) => {
        switch (storiesType) {
          case StoriesType.New:
            return 'newstories.json';
          case StoriesType.Top:
            return 'topstories.json';
          case StoriesType.Best:
            return 'beststories.json';
        }
      },
    }),
  }),
});

export const { useGetItemByIdQuery, useGetFrontPageIdsByStoriesTypeQuery } =
  hackerNewsApi;
