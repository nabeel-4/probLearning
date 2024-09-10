import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes:["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({ query: () => "posts" ,
        providesTags:["Posts"]
    }),
    getPostById: builder.query({
        query: (id) => `posts/${id}`,
        providesTags: (result, error, id) => [{ type: "Posts", id }],
      }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags:["Posts"]
    }),
  }),
});

export const { useGetPostsQuery ,useCreatePostMutation ,useGetPostByIdQuery} = myApi;
