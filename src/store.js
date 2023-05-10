import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import userSlice from "./api/globalSlices/user.slices";

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
