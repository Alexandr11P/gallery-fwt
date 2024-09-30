import type { AxiosResponse } from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import API_URL from "./config/apiUrl";
import axiosBaseQuery from "./config/axiosBaseQuery";

export const authorsApi = createApi({
  reducerPath: "authorsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}/authors`,
  }),
  endpoints: (builder) => ({
    getAuthors: builder.query<{ id: number; name: string }[], string>({
      query: (arg = "") => ({ url: arg, method: "get" }),
      transformResponse: (res: AxiosResponse<{ id: number; name: string }[]>) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetAuthorsQuery } = authorsApi;
