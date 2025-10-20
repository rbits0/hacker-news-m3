import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AlgoliaItem from '../AlgoliaItem';


export const algoliaApi = createApi({
  reducerPath: 'algoliaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hn.algolia.com/api/v1/',
  }),
  
  endpoints: (builder) => ({

    getAlgoliaItemById: builder.query<AlgoliaItem, number>({
      query: (id) => `items/${id}`,
    }),

  }),
});


export const { useGetAlgoliaItemByIdQuery } = algoliaApi;