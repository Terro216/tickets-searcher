'use client'
import styles from './page.module.scss'
import { useGetMovieByIdQuery } from '@/lib/redux/services/movieApi'
import Image from 'next/image'
import TicketCounter from '@/components/TicketCounter'
import { useGetReviewsByMovieIdQuery } from '@/lib/redux/services/reviewsApi'
import defaultPhoto from '@/public/icons/photo.svg'
import { genreTranslator } from '@/utils/consts'
import Loader from '@/components/Loader'

interface FilmPageProps {
  params: { id: string }
}

export const metadata = {
  title: 'Страница фильма',
}

export default function FilmPage({ params }: FilmPageProps) {
  return (
    <section className={styles.filmWrapper}>
      <FilmPageInfo filmId={params.id} />
      <FilmReviews filmId={params.id} />
    </section>
  )
}

interface PartProps {
  filmId: string
}

const FilmPageInfo = ({ filmId }: PartProps) => {
  const { data: filmInfo, isLoading: filmLoading, error } = useGetMovieByIdQuery(filmId)
  return (
    <section className={styles.filmPageInfo}>
      {filmLoading ? (
        <Loader />
      ) : error ? (
        'Возникла ошибка! Пожалуйста, обновите страницу'
      ) : (
        filmInfo && (
          <>
            <Image
              width={400}
              height={500}
              className={styles.poster}
              src={filmInfo.posterUrl}
              alt={`Постер фильма ${filmInfo.title}`}
            />
            <div className={styles.info}>
              <div className={styles.titleWrapper}>
                <h2 className={styles.title}>{filmInfo.title}</h2>
                <TicketCounter title={filmInfo.title || ''} id={filmId} />
              </div>
              <div className={styles.shortInfo}>
                <div className={styles.row}>
                  <span className={styles.miniTitle}>Жанр:</span>
                  <span>{genreTranslator[filmInfo.genre]}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.miniTitle}>Год выпуска:</span>
                  <span>{filmInfo.releaseYear}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.miniTitle}>Рейтинг:</span>
                  <span>{filmInfo.rating}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.miniTitle}>Режиссер:</span>
                  <span>{filmInfo.director}</span>
                </div>
              </div>
              <div className={styles.description}>
                <span className={styles.descriptionTitle}>Описание</span>
                <span className={styles.descriptionContent}>{filmInfo.description}</span>
              </div>
            </div>
          </>
        )
      )}
    </section>
  )
}

const FilmReviews = ({ filmId }: PartProps) => {
  const { data: reviewsList, isLoading: isReviewsLoading, error } = useGetReviewsByMovieIdQuery(filmId)
  return (
    <section className={styles.reviewWrapper}>
      {isReviewsLoading ? (
        <Loader />
      ) : error ? (
        'Возникла ошибка! Пожалуйста, обновите страницу'
      ) : (
        reviewsList &&
        reviewsList.map((review) => (
          <article key={review.id + review.name} className={styles.review}>
            <Image className={styles.profilePicture} src={defaultPhoto} alt='Аватар комментатора' />
            <div className={styles.reviewContent}>
              <div className={styles.reviewHeader}>
                <span>{review.name}</span>
                <span>
                  Оценка: <b>{review.rating}</b>
                </span>
              </div>
              <span className={styles.reviewText}>{review.text}</span>
            </div>
          </article>
        ))
      )}
    </section>
  )
}
