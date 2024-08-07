import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    appliedJobs: [],
  },
  reducers: {
    applyJob: (state, action) => {
      state.appliedJobs.push(action.payload);
    },
  },
});

export const { applyJob } = jobSlice.actions;
export default jobSlice.reducer;
