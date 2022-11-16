import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import favoritesSlice from "../features/favoritesSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoritesSlice,
  },
});
export default store;
