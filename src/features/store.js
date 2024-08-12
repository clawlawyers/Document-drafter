// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import documentReducer from "./DocumentSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    document: documentReducer,
  },
});

export default store;
