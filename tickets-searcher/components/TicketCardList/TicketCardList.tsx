'use client'

import { useGetAllMoviesQuery, useGetMoviesByCinemaQuery } from '@/lib/redux/services/movieApi'
import styles from './TicketCardList.module.scss'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCinemaFilter, selectGenreFilter, selectNameFilter } from '@/lib/redux/features/filter/selector'
import { useMemo } from 'react'
import TicketCard from '../TicketCard'
import { selectCartFilms } from '@/lib/redux/features/cart/selector'
import Loader from '../Loader'

interface TicketCardListProps {
  type: 'cart' | 'home'
}

export function TicketCardList({ type }: TicketCardListProps) {
  const { data: allMovies, isLoading: isAllMoviesLoading, error: allMoviesError } = useGetAllMoviesQuery()
  const cinema = useAppSelector((state) => selectCinemaFilter(state))
  const filterName = useAppSelector((state) => selectNameFilter(state))
  const filterGenre = useAppSelector((state) => selectGenreFilter(state))
  const {
    data: cinemaMovies,
    isLoading: isCinemaMoviesLoading,
    error: cinemaMoviesError,
  } = useGetMoviesByCinemaQuery(cinema?.id, { refetchOnMountOrArgChange: true })
  const filmsInCart = Object.keys(useAppSelector((state) => selectCartFilms(state)))

  const cartFilms = allMovies?.filter((movie) => {
    return filmsInCart.includes(movie.id)
  })

  const filteredFilms = useMemo(() => {
    return (cinemaMovies || allMovies)?.filter((movie) => {
      if (filterName) {
        if (!movie.title.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())) return false
      }
      if (filterGenre) {
        return movie.genre === filterGenre
      }
      return true
    })
  }, [allMovies, cinemaMovies, filterName, filterGenre])

  return (
    <section className={`${type === 'home' ? styles.ticketList : styles.cartTicketList}`}>
      {isAllMoviesLoading || isCinemaMoviesLoading ? (
        <Loader />
      ) : allMoviesError || cinemaMoviesError ? (
        'Возникла ошибка! Пожалуйста, обновите страницу'
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
          <div className={styles.empty}>По данному запросу не найдено ни одного билета :(</div>
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
        <div className={styles.emptyCart}>Корзина пуста :(</div>
      )}
    </section>
  )
}
