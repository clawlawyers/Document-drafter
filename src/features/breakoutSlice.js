import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breakoutData: null,
  loading: false,
  error: null,
};

const breakoutSlice = createSlice({
  name: 'breakout',
  initialState,
  reducers: {
    setBreakoutData: (state, action) => {
      state.breakoutData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearBreakoutData: (state) => {
      state.breakoutData = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setBreakoutData, setLoading, setError, clearBreakoutData } = breakoutSlice.actions;

export default breakoutSlice.reducer;
