import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body: body,
      }),
    }),
    getCurrentUser: builder.query({
      query: (token) => ({
        url: "/users/currentuser",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["userData"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["userData"],
    }),
  }),
});

export const { useSignupMutation, useGetCurrentUserQuery, useLoginMutation } =
  authApi;
