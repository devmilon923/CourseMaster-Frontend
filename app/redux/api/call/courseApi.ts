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

    assignmentCheck: builder.query({
      query: ({ id }: { id: any }) => ({
        url: `/course/isassignmented/${id}`,
        method: "GET",
      }),
      providesTags: ["module"],
    }),

    getCourseModule: builder.query({
      query: ({ id }: { id: any }) => ({
        url: `/course/user/module/${id}`,
        method: "GET",
      }),
      providesTags: ["module"],
    }),
    getModuleVideos: builder.query({
      query: ({ id }: { id: any }) => ({
        url: `/course/user/videos/${id}`,
        method: "GET",
      }),
      providesTags: ["video"],
    }),
    markVideoAsCompleted: builder.mutation({
      query: ({ id }: { id: any }) => ({
        url: `/course/video/mark-completed/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["video"],
    }),

    markAssignmentCompleted: builder.mutation({
      query: ({ link, id }: { id: any; link: string }) => ({
        url: `/course/assignment/mark-completed/${id}`,
        method: "PATCH",
        body: { link },
      }),
      invalidatesTags: ["video"],
    }),
  }),
});
export const {
  useGuestCoursesQuery,
  useCourseDetailsQuery,
  useEnrolledCheckQuery,
  useGetCourseModuleQuery,
  useGetModuleVideosQuery,
  useMarkVideoAsCompletedMutation,
  useMarkAssignmentCompletedMutation,
  useAssignmentCheckQuery
} = courseApi;
