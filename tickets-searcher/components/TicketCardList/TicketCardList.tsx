'use client'

import { useGetAllMoviesQuery, useGetMoviesByCinemaQuery } from '@/lib/redux/services/movieApi'
import styles from './TicketCardList.module.scss'
import { useSelector } from 'react-redux'
import { selectCinemaFilter, selectGenreFilter, selectNameFilter } from '@/lib/redux/features/filter/selector'
import { useMemo } from 'react'
import TicketCard from '../TicketCard'
import { genreTranslator } from '@/utils/consts'

export function TicketCardList() {
  const { data: allMovies, isLoading: isAllMoviesLoading, error: allMoviesError } = useGetAllMoviesQuery()
  const cinema = useSelector((state) => selectCinemaFilter(state))
  const filterName = useSelector((state) => selectNameFilter(state))
  const filterGenre = useSelector((state) => selectGenreFilter(state))
  const {
    data: cinemaMovies,
    isLoading: isCinemaMoviesLoading,
    error: cinemaMoviesError,
  } = useGetMoviesByCinemaQuery(cinema?.id)

  const filteredFilms = useMemo(() => {
    if (!cinemaMovies) {
      return allMovies?.filter((movie) => {
        if (filterName) {
          if (!movie.title.startsWith(filterName)) return false
        }
        if (filterGenre) {
          return movie.genre === filterGenre
        }
        return true
      })
    }
  }, [allMovies, cinemaMovies, filterName, filterGenre])

  return (
    <section className={styles.ticketList}>
      {filteredFilms && filteredFilms.length !== 0 ? (
        filteredFilms.map((film) => (
          <TicketCard
            key={film.id}
            id={film.id}
            posterUrl={film.posterUrl}
            genre={film.genre}
            title={film.title}
          />
        ))
      ) : (
        <div>По данному запросу нет билетов :(</div>
      )}
    </section>
  )
}
