import { baseApi } from "../baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    guestCourses: builder.query({
      query: ({
        page = 1,
        limit = 10,
        searchQ = "",
        sort = "",
        category = "",
      }: {
        page?: number;
        limit?: number;
        searchQ?: string;
        sort?: "high" | "low" | "";
        category?:
          | "Web Development"
          | "Graphic Design & Illustration"
          | "Marketing & Sales"
          | "Communication Skills"
          | "";
      }) => ({
        url: "/course/guest",
        method: "GET",
        params: { page, limit, searchQ, sort, category },
      }),
      providesTags: ["course"],
    }),
    courseDetails: builder.query({
      query: ({ id }: { id: any }) => ({
        url: `/course/guest-details/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    enrolledCheck: builder.query({
      query: ({ id }: { id: any }) => ({
        url: `/course/isenrolled/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
  }),
});
export const {
  useGuestCoursesQuery,
  useCourseDetailsQuery,
  useEnrolledCheckQuery,
} = courseApi;
