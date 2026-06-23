import BASE_URL, { baseApi } from "./baseApi";

export interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    description: string;
    skills: string[];
    link: string;
    slug: string;
}

export interface TrackingApplication{
   _id:string,
   user:string,
   job:Job,
   status:string,
  createdAt: string
}

export interface TrackingApplicationResponse{
    message:string
    data:TrackingApplication[]
}
export const jobApplication = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTrackingJob: builder.mutation({
            query: (jobData) => ({
                url: `${BASE_URL}/applications`,
                method: "POST",
                body: jobData
            })
        }),
        getTrackingJobs: builder.query<TrackingApplicationResponse,void>({
            query: () => ({
                url: `${BASE_URL}/applications`,
                method: "GET"
            })
        }),
        updateTrackingJobs: builder.mutation({
            query:({id,updateJobStatus}) => ({
               url: `${BASE_URL}/applications/${id}`,
               method:'PATCH',
               body: updateJobStatus
            }) 
        }),
        deleteTrackingJob: builder.mutation({
            query: ({id}) => ({
                url:`${BASE_URL}/applications/${id}`,
                method:"DELETE",
                body:id
            })
        })
    })

})

export const {useCreateTrackingJobMutation,useGetTrackingJobsQuery,useUpdateTrackingJobsMutation,useDeleteTrackingJobMutation} = jobApplication