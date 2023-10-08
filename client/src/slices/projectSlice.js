import { apiSlice } from "./apiSlice";
import { PROJECTS_URL } from "../constants";
import { USERS_URL } from "../constants";

const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsForUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/projects`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: PROJECTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: PROJECTS_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProjectsForUserQuery,
  useGetAllProjectsQuery,
  useCreateProjectMutation,
} = projectsApiSlice;
