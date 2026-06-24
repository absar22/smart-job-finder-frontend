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
    logout:builder.mutation<void,void>({
      query:() => ({
        url:"/auth/logout",
        method:"POST" 
      }),
      invalidatesTags:["User"]
    }),

    // Upload image
    uploadProfile: builder.mutation({
      query:(formData) => ({
        url:"/auth/upload-profile",
        method:"PUT",
        body:formData
      }),
      invalidatesTags:["User"]
    })
    
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useLoginMutation, useMeQuery, useLogoutMutation, useUploadProfileMutation } = authApi;
