import { createSlice } from "@reduxjs/toolkit";

const initialState: { isDark: boolean } = {
  isDark: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    turnTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const { turnTheme } = themeSlice.actions;
export default themeSlice;
