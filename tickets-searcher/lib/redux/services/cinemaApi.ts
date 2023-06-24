import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export interface Cinema {
  id: string
  movieIds: string[]
  name: string
}
export const cinemaApi = createApi({
  reducerPath: 'cinema',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  endpoints: (builder) => ({
    getCinemas: builder.query<Cinema[], string>({ query: () => 'cinemas' }),
  }),
})

export const { useGetCinemasQuery } = cinemaApi
