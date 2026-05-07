import { createSlice } from "@reduxjs/toolkit";
interface Job{
  _id:string,
  title:string,
  description:string,
  company:string,
  location:string,
  salary:number,
  link:string,
  skills:string[],
  slug:string
}
interface JobState{
    jobs: Job[],
    loading:boolean,
    selectedJob: Job | null,
    error: string | null,
    totalJobs: number,
    currentPage: number,
    totalPages: number
}
const initialState: JobState = {
    jobs: [],
    loading: false,
    selectedJob: null,
    error: null,
    totalJobs: 0,
    currentPage: 1,
    totalPages: 1
}

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers:{
        setJobs:(state,action)=>{
           state.jobs=action.payload
        },
        setSelectedJob:(state,action)=>{
           state.selectedJob=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setPagination:(state,action)=>{
            state.totalJobs=action.payload.totalJobs
            state.totalPages=action.payload.totalPages
            state.currentPage=action.payload.currentPage
         
        },
        clearSelectedJob:(state)=>{
            state.selectedJob=null
        },
    }
});

export const { setJobs, setSelectedJob, setLoading, setError, setPagination, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;

