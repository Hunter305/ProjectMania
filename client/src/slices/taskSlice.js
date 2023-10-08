import { apiSlice } from "./apiSlice";
import { TASKS_URL } from "../constants";

const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasksForProject: builder.query({
      query: (projectId) => ({
        url: `${TASKS_URL}/${projectId}/task`,
      }),
      keepUnusedDataFor: 5,
    }),
    createTask: builder.mutation({
      query: (projectId, taskData) => ({
        url: `${TASKS_URL}/${projectId}/task`,
        method: "POST",
        body: taskData,
      }),
    }),
  }),
});

export const { useGetTasksForProjectQuery, useCreateTaskMutation } =
  taskApiSlice;
