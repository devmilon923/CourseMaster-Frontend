import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "socialMediaApi",
  tagTypes: ["course", "auth", "module", "video", "assignment", "quiz"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_baseURL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("auth") || null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
