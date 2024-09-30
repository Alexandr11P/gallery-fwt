import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../../shared/slices/theme.slice";
import { paintingsApi } from "@/shared/api/getPaintings";
import filtersSlice from "@/shared/slices/filters.slice";
import { authorsApi } from "@/shared/api/getAuthors";
import { locationsApi } from "@/shared/api/getLocations";
import filtersPanelSlice from "@/shared/slices/filtersPanel.slice";

export const store = configureStore({
  reducer: {
    [themeSlice.reducerPath]: themeSlice.reducer,
    [filtersSlice.reducerPath]: filtersSlice.reducer,
    [filtersPanelSlice.reducerPath]: filtersPanelSlice.reducer,
    [paintingsApi.reducerPath]: paintingsApi.reducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(paintingsApi.middleware)
      .concat(authorsApi.middleware)
      .concat(locationsApi.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof store.getState>;
