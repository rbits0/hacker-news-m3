import { configureStore } from '@reduxjs/toolkit';
import { hackerNewsApi } from './services/hackerNews';


const store = configureStore({
  reducer: {
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,

  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(hackerNewsApi.middleware)
  ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;