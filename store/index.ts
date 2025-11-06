import { configureStore } from '@reduxjs/toolkit';
import { hackerNewsApi } from './services/hackerNews';
import settingsReducer from './slices/settings';
import accountStateReducer from './slices/accountState';
import { algoliaApi } from './services/algolia';
import { rememberEnhancer, rememberReducer } from 'redux-remember';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = {
  [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
  [algoliaApi.reducerPath]: algoliaApi.reducer,
  settings: settingsReducer,
  accountState: accountStateReducer,
};

// Note: Strange TypeScript behaviour... right now TypeScript has store typed
// correctly, but if I put rememberReducer(reducers) inline in configureStore,
// store's type becomes EnhancedStore<any, ...>
const reducer = rememberReducer(reducers);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(hackerNewsApi.middleware)
      .concat(algoliaApi.middleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      rememberEnhancer(AsyncStorage, ['settings', 'accountState']),
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
