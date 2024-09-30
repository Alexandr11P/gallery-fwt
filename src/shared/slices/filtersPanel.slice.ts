import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

const filtersPanelSlice = createSlice({
  name: "filtersPanel",
  initialState,
  reducers: {
    setIsOpenFilter(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpenFilter } = filtersPanelSlice.actions;
export default filtersPanelSlice;
