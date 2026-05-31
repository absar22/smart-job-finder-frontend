import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) {
  throw new Error("Missing API base URL");
}
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // important for cookies
  }),
  tagTypes: ["Jobs", "Job", "Auth", "User", "SavedJobs"],   //this allows RTK query cache invalidation.
  endpoints: () => ({}),
});

export default BASE_URL;
