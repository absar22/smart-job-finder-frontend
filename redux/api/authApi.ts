import { baseApi } from "./baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // SIGNUP
    signup: builder.mutation({
      query:(data)=>({
        url: "/auth/signup",
        method:"POST",
        body:data
      }),
    }),

    // LOGIN
    login: builder.mutation({
      query:(data)=>({
        url: "/auth/login",
        method:"POST",
        body:data
      }),
    }),

    // CURRENT USER / ME
    me:builder.query({
      query:()=> ({
        url:"/auth/me",
        method:"GET"
      }),
      providesTags:["User"],
    }),

    // Logout
    logout:builder.mutation({
      query:() => ({
        url:"/auth/logout",
        method:"POST" 
      })
    })
    
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useLoginMutation, useMeQuery, useLogoutMutation } = authApi;
