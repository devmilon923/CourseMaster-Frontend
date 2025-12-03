import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        headers: {
          "Content-Type": "multipart/formData",
        },
        body,
      }),
      invalidatesTags: ["auth", "course", "assignment", "module", "video"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    profile: builder.query({
      query: () => ({
        url: "/auth/my-profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation,useProfileQuery } = authApi;
