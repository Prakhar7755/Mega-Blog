import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    //TODO: add more slices here for posts
  },
});
