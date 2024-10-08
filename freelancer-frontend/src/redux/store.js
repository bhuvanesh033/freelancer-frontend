import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import jobSlice from './JobSlice'; // Ensure JobSlice is correctly implemented

const store = configureStore({
  reducer: {
    auth: authSlice,
    jobs: jobSlice,
  },
});

export default store;
