import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Genre = '' | 'horror' | 'comedy' | 'fantasy' | 'action'
export type ruGenre = '' | 'Хоррор' | 'Комедия' | 'Фэнтези' | 'Боевик'

export interface Movie {
  'title': string //'Властелин колец: Братство Кольца'
  'posterUrl': string //'https://i.postimg.cc/pdCLNMqX/1.webp'
  'releaseYear': number //2001
  'description': string //'Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную власть, но был обязан служить злу.Тихая деревня, где живут хоббиты. Придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу, волшебник Гэндальф начинает вести разговор о кольце, которое Бильбо нашел много лет назад. Это кольцо принадлежало когда-то темному властителю Средиземья Саурону, и оно дает большую власть своему обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем. Бильбо отдает Кольцо племяннику Фродо, чтобы тот отнёс его к Роковой Горе и уничтожил.'
  'genre': Genre
  'id': string //'2aT976Fs_Bek0e2ZR_05V'
  'rating': number //8
  'director': string //'Питер Джексон'
  'reviewIds': string[] //['M0bg9QY5gVtupNaglrmua', 'w32kK5oV6UIr1ZHdkkMAn']
}

export const movieApi = createApi({
  reducerPath: 'movie',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  endpoints: (builder) => ({
    getAllMovies: builder.query<Movie[], void>({ query: () => 'movies' }),
    getMovieById: builder.query<Movie, string>({ query: (movieId) => `movie?movieId=${movieId}` }),
    getMoviesByCinema: builder.query<Movie[], string>({ query: (cinemaId) => `movie?cinemaId=${cinemaId}` }),
  }),
})

export const { useGetAllMoviesQuery, useGetMovieByIdQuery, useGetMoviesByCinemaQuery } = movieApi
