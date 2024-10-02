import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    appearance: "dark",
  },
  reducers: {
    setTheme: (state, action) => {
      state.appearance = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
