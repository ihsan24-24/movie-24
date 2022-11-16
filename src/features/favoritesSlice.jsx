import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filmsList: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearFavoriteList: (state) => {
      state.filmsList = [];
    },
    addList: (state, { payload }) => {
      state.filmsList = [...state.filmsList, payload.payload];
    },
    removeList: (state, { payload }) => {
      state.filmsList = state.filmsList.filter(
        (item) => item.id !== payload.payload.id
      );
    },
  },
});
export const { clearFavoriteList, addList, removeList } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
