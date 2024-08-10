// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    number: '',
  },
  isOtpVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...action.payload };
    },
    setOtpVerified: (state, action) => {
      state.isOtpVerified = action.payload;
    },
    resetAuth: (state) => {
      return initialState;
    },
  },
});

export const { setFormData, setOtpVerified, resetAuth } = authSlice.actions;

export default authSlice.reducer;
