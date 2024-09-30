import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetPaintingsParams } from "../types/GetPaintingsParams";

const initialState: GetPaintingsParams = {
  page: 1,
  text: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Omit<GetPaintingsParams, "text" | "page">>) {
      const ObjTypedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

      ObjTypedKeys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
      state.page = 1;
    },
    find(state, action: PayloadAction<string | undefined>) {
      state.text = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setFilters, find, setPage } = filtersSlice.actions;
export default filtersSlice;
