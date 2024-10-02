import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/v1",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    profileUpdate: builder.mutation({
      query: (body) => ({
        url: "/auth/profile",
        method: "PUT",
        body,
      }),
    }),
    notes: builder.query({
      query: () => "/notes",
    }),
    note: builder.query({
      query: (id) => `/notes/${id}`,
    }),
    note: builder.mutation({
      query: (body) => ({
        url: "/notes",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useProfileUpdateMutation,
  useNoteMutation,
  useNotesQuery,
  useNoteQuery,
} = api;
