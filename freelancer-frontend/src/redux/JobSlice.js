import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    appliedJobs: [],
    jobs: [],
  },
  reducers: {
    applyJob: (state, action) => {
      state.appliedJobs.push(action.payload);
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
  },
});

export const { applyJob, addJob } = jobSlice.actions;
export default jobSlice.reducer;
