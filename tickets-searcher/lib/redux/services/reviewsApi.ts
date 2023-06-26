import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Review {
  'id': string //'OVPbCJzb8wOGfhJ54JbVc'
  'name': string // 'Хохмач'
  'text': string // 'Это самый смешной фильм, который я когда-либо видел'
  'rating': number // 9
}

export const reviewsApi = createApi({
  reducerPath: 'reviews',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  endpoints: (builder) => ({
    getAllReviews: builder.query<Review[], void>({ query: () => 'reviews' }),
    getReviewsByMovieId: builder.query<Review[], string>({
      query: (movieId) => `reviews?movieId=${movieId}`,
    }),
  }),
})

export const { useGetAllReviewsQuery, useGetReviewsByMovieIdQuery } = reviewsApi
