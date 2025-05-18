import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apiSlice";

export const store = configureStore({
  reducer: {
    // Add the productsApi reducer to the store
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
