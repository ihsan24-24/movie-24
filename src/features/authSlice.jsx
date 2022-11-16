import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

//? user içinde favorite diye bir key tutacağız false ile başlayacak kalp işareti tıklanınca true ya dönecek favorite değişkeni true ise background color red olan ikon olacak false ise background color olmayan ikon görünecek
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload);
      state.user = payload.email;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
