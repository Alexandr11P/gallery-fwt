import type { AxiosResponse } from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import API_URL from "./config/apiUrl";
import axiosBaseQuery from "./config/axiosBaseQuery";

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}/locations`,
  }),
  endpoints: (builder) => ({
    getLocations: builder.query<{ id: number; location: string }[], string>({
      query: (arg = "") => ({ url: arg, method: "get" }),
      transformResponse: (res: AxiosResponse<{ id: number; location: string }[]>) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetLocationsQuery } = locationsApi;
