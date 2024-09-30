import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosResponse } from "axios";
import { Painting } from "../types/Painting";
import API_URL from "./config/apiUrl";
import axiosBaseQuery from "./config/axiosBaseQuery";
import { GetPaintingsParams } from "../types/GetPaintingsParams";

export const paintingsApi = createApi({
  reducerPath: "paintingsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}/paintings`,
  }),
  endpoints: (builder) => ({
    getPaintings: builder.query<{ paintings: Painting[]; numOfPages: number }, GetPaintingsParams>({
      query: (q) => {
        let param = `?_limit=6&_page=${q.page}`;
        if (q.text) param = param.concat(`&q=${q.text}`);
        if (q.authorId) param = param.concat(`&authorId=${q.authorId}`);
        if (q.locationId) param = param.concat(`&locationId=${q.locationId}`);
        if (q.from) param = param.concat(`&created_gte=${q.from}`);
        if (q.from) param = param.concat(`&created_lte${q.to}`);
        return { url: param, method: "get" };
      },

      transformResponse: (res: AxiosResponse<Painting[]>) => {
        return { paintings: res.data, numOfPages: Math.ceil(Number(res?.headers["x-total-count"]) / 6) };
      },
    }),
  }),
});

export const { useGetPaintingsQuery } = paintingsApi;
