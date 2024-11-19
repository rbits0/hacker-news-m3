import { configureStore } from '@reduxjs/toolkit';
import frontPageReducer from './slices/frontPageSlice';


const store = configureStore({
  reducer: {
    frontPage: frontPageReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;