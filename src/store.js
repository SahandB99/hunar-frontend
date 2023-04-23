import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./redux/themeSlice";
import userReducer from "./redux/userSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});