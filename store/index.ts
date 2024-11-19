import { configureStore } from '@reduxjs/toolkit';
import frontPageReducer from './slices/frontPageSlice';


export default configureStore({
  reducer: {
    frontPage: frontPageReducer,
  },
})