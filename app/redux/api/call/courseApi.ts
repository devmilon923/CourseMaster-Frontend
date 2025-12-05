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
    sendEnrollRequest: builder.mutation({
      query: ({ id, note }: { id: any; note: string }) => ({
        url: `/course/enroll-request/${id}`,
        method: "POST",
        body: { additionalNote: note },
      }),
      invalidatesTags: ["course"],
    }),
    markAssignmentCompleted: builder.mutation({
      query: ({ link, id }: { id: any; link: string }) => ({
        url: `/course/assignment/mark-completed/${id}`,
        method: "PATCH",
        body: { link },
      }),
      invalidatesTags: ["video"],
    }),

    getMyCourses: builder.query({
      query: ({
        page = 1,
        limit = 10,
        status,
      }: {
        page?: number;
        limit?: number;
        status?: string;
      }) => ({
        url: `/course//enroll-request`,
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: ["course"],
    }),

    getQuiz: builder.query({
      query: ({ id }: { id: any }) => ({
        url: `/course/quiz/${id}`,
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),

    submitQuiz: builder.mutation({
      query: ({ id, answers }: { id: any; answers: [] }) => ({
        url: `/course/quiz-submit/${id}`,
        method: "POST",
        body: { answers: [...answers] },
      }),
      invalidatesTags: ["quiz"],
    }),

    landingStacks: builder.query({
      query: () => ({
        url: `/course/stacks`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),

    // Admin route===========
    adminCourse: builder.query({
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
        url: "/course",
        method: "GET",
        params: { page, limit, searchQ, sort, category },
      }),
      providesTags: ["course"],
    }),
    changeCourseStatus: builder.mutation({
      query: ({ id, body }: { id: any; body: any }) => ({
        url: `/course/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["course"],
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: `/course/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["course"],
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
  useAssignmentCheckQuery,
  useSendEnrollRequestMutation,
  useGetMyCoursesQuery,
  useGetQuizQuery,
  useSubmitQuizMutation,
  useLandingStacksQuery,
  // admin export
  useAdminCourseQuery,
  useChangeCourseStatusMutation,
  useAddCourseMutation
} = courseApi;
