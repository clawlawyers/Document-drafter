// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import documentReducer from "./DocumentSlice";
import breakoutSlice from "./breakoutSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    document: documentReducer,
    breakout:breakoutSlice
  },
});

export default store;
