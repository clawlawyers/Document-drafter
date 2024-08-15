// src/redux/store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authReducer from "./authSlice";
import documentReducer from "./DocumentSlice";
import breakoutSlice from "./breakoutSlice";
import storage from "redux-persist/lib/storage";
import PromptSlice from "./PromptSlice";
const persistConfigure = {
  key: "root",
  version: 1,
  storage,
};
const reducer = combineReducers({
  breakout: breakoutSlice,
  auth: authReducer,
  document: documentReducer,
  prompt : PromptSlice
});

const persistedReducer = persistReducer(persistConfigure, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
