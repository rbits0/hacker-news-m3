import { configureStore } from '@reduxjs/toolkit';
import { hackerNewsApi } from './services/hackerNews';
import settingsReducer from './slices/settings';


const store = configureStore({
  reducer: {
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(hackerNewsApi.middleware)
  ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;