import { configureStore } from '@reduxjs/toolkit';
import { hackerNewsApi } from './services/hackerNews';
import settingsReducer from './slices/settings';
import { algoliaApi } from './services/algolia';


const store = configureStore({
  reducer: {
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
    [algoliaApi.reducerPath]: algoliaApi.reducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(hackerNewsApi.middleware)
      .concat(algoliaApi.middleware)
  ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;