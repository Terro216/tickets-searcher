import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const movieApi = createApi({
  reducerPath: 'movie',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.SERVER_URL }),
  endpoints: (builder) => ({
    getAllMovies: builder.query({ query: () => 'movies' }),
    getMoviesByCinema: builder.query({ query: (cinemaId) => `movie?cinemaId=${cinemaId}` }),
    getMovieById: builder.query({ query: (movieId) => `movie?movieId=${movieId}` }),
  }),
})

export const { useGetAllMoviesQuery, useGetMovieByIdQuery, useGetMoviesByCinema } = movieApi
