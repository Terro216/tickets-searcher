'use client'

import { useGetAllMoviesQuery, useGetMoviesByCinemaQuery } from '@/lib/redux/services/movieApi'
import styles from './TicketCardList.module.scss'
import { useSelector } from 'react-redux'
import { selectCinemaFilter, selectGenreFilter, selectNameFilter } from '@/lib/redux/features/filter/selector'
import { useMemo } from 'react'
import TicketCard from '../TicketCard'
import { genreTranslator } from '@/utils/consts'
import { selectCartFilms } from '@/lib/redux/features/cart/selector'

interface TicketCardListProps {
  type: 'cart' | 'home'
}

export function TicketCardList({ type }: TicketCardListProps) {
  const { data: allMovies, isLoading: isAllMoviesLoading, error: allMoviesError } = useGetAllMoviesQuery()
  const cinema = useSelector((state) => selectCinemaFilter(state))
  const filterName = useSelector((state) => selectNameFilter(state))
  const filterGenre = useSelector((state) => selectGenreFilter(state))
  const {
    data: cinemaMovies,
    isLoading: isCinemaMoviesLoading,
    error: cinemaMoviesError,
  } = useGetMoviesByCinemaQuery(cinema?.id)
  const filmsInCart = Object.keys(useSelector((state) => selectCartFilms(state)))

  const cartFilms = allMovies?.filter((movie) => {
    return filmsInCart.includes(movie.id)
  })

  const filteredFilms = useMemo(() => {
    return (cinemaMovies || allMovies)?.filter((movie) => {
      if (filterName) {
        if (!movie.title.toLocaleLowerCase().startsWith(filterName.toLocaleLowerCase())) return false
      }
      if (filterGenre) {
        return movie.genre === filterGenre
      }
      return true
    })
  }, [allMovies, cinemaMovies, filterName, filterGenre])

  return (
    <section className={`${type === 'home' ? styles.ticketList : styles.cartTicketList}`}>
      {isAllMoviesLoading || (cinema && isCinemaMoviesLoading) ? (
        'loading...'
      ) : allMoviesError || (cinema && cinemaMoviesError) ? (
        'error'
      ) : type === 'home' ? (
        filteredFilms && filteredFilms.length !== 0 ? (
          filteredFilms.map((film) => (
            <TicketCard
              key={film.id}
              id={film.id}
              posterUrl={film.posterUrl}
              genre={film.genre}
              title={film.title}
              type={type}
            />
          ))
        ) : (
          <div>По данному запросу нет билетов :(</div>
        )
      ) : cartFilms && cartFilms.length !== 0 ? (
        cartFilms.map((film) => (
          <TicketCard
            key={film.id}
            id={film.id}
            posterUrl={film.posterUrl}
            genre={film.genre}
            title={film.title}
            type={type}
          />
        ))
      ) : (
        <div>По данному запросу нет билетов :(</div>
      )}
    </section>
  )
}
