import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './JobSlice'
const store = configureStore({
    reducer: {
        jobs: jobSlice
    }
});

export default store;
