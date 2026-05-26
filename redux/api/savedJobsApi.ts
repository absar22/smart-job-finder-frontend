import { baseApi } from "./baseApi";

interface SavedJob {
  _id: string
  user: string
  job: string
  createdAt: string
}

export const savedJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
// Post JOBS
    saveJob: builder.mutation<void, { jobId: string }>({
      query: ({ jobId }) => ({
        url: '/saved-jobs/save',
        method: 'POST',
        body: { jobId }
      })
    }),
// Remove JOBS
    removeJob: builder.mutation<void, { jobId: string }>({
      query: ({ jobId }) => ({
        url: '/saved-jobs/remove',
        method: 'DELETE',
        body: { jobId }
      })
    }),

    // Get SAVED JOBS
    getSavedJobs: builder.query<SavedJob[], void>({
      query: () => ({
        url: '/saved-jobs',
        method: 'GET'
      })
    })

  })
})

export const {
  useSaveJobMutation,
  useRemoveJobMutation,
  useGetSavedJobsQuery
} = savedJobsApi