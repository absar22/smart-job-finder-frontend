import { baseApi } from "./baseApi";
import { Job } from "./jobApi";

interface SavedJob {
  _id: string
  user: string
  job: Job
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
      }),
      invalidatesTags: ['SavedJobs'] // This tells RTK Query to invalidate the cache for saved jobs when a new job is saved
    }),
// Remove JOBS
    removeJob: builder.mutation<void, { jobId: string }>({
      query: ({ jobId }) => ({
        url: '/saved-jobs/remove',
        method: 'DELETE',
        body: { jobId }
      }),
      invalidatesTags: ['SavedJobs'] // This tells RTK Query to invalidate the cache for saved jobs when a job is removed
    }),

    // Get SAVED JOBS
    getSavedJobs: builder.query<SavedJob[], void>({
      query: () => ({
        url: '/saved-jobs',
        method: 'GET'
      }),
      providesTags: ['SavedJobs'] // This allows RTK Query to know when to invalidate the cache for saved jobs
    })

  })
})

export const {useSaveJobMutation,useRemoveJobMutation,useGetSavedJobsQuery} = savedJobsApi