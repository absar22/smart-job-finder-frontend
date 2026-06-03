
import { baseApi } from "./baseApi";

export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  link: string;
  skills: string[];
  slug: string;
  createdAt?: string;
}

export interface JobsResponse {
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
}


export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, { page: number; limit: number; location?:string; company?:string;skills?:string }>({
      query: ({ page, limit,location,company,skills }) => `/jobs?page=${page}&limit=${limit}${location ? `&location=${location}` : ''}${company ? `&company=${company}` : ''}${skills ? `&skills=${skills}` : ''}`,
      providesTags: (result) =>
        result
          ? [
              { type: "Jobs" as const, id: "LIST" },
              ...result.jobs.map((job) => ({ type: "Job" as const, id: job._id })),
            ]
          : [{ type: "Jobs" as const, id: "LIST" }],
    }),

    getJobBySlug: builder.query<Job, string>({
      query: (slug) => `/jobs/${slug}`,
      transformResponse: (response: { job: Job }) => response.job,
      providesTags: (result) =>
        result
          ? [
              { type: "Job" as const, id: result._id },
              { type: "Job" as const, id: result.slug },
            ]
          : [],
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
  query: (jobData) => ({
    url: '/jobs',
    method: 'POST',
    body: jobData,
  }),
  invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
}),
  }),

  overrideExisting: false,
});

export const { useGetJobsQuery, useGetJobBySlugQuery, useCreateJobMutation } = jobApi;

