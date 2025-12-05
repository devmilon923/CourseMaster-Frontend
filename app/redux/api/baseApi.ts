import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "courseMasterApi",
  tagTypes: ["course", "auth", "module", "video", "assignment", "quiz"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_baseURL,
    prepareHeaders: async (headers) => {
      let token = null;
      token = localStorage.getItem("auth") || null;

      if (!token) {
        token = localStorage.getItem("aauth") || null;
      }
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
