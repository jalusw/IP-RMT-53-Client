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
  tagTypes: ["Note"],
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
    googleAuth: builder.mutation({
      query: (body) => ({
        url: "/auth/google",
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
      providesTags: ["Note"],
    }),
    note: builder.query({
      query: (id) => `/notes/${id}`,
    }),
    createNote: builder.mutation({
      query: (body) => ({
        url: "/notes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation({
      query: (body) => ({
        url: `/notes/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
    }),
    enhanceNote: builder.mutation({
      query: (body) => ({
        url: `/assistant/enhance`,
        body,
        method: "POST",
      }),
    }),
    summarizeNote: builder.mutation({
      query: (body) => ({
        url: `/assistant/summarize`,
        body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleAuthMutation,
  useProfileUpdateMutation,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useEnhanceNoteMutation,
  useSummarizeNoteMutation,
  useNotesQuery,
  useNoteQuery,
} = api;
