import type { Movie } from '@/lib/redux/services/movieApi'
import styles from './TicketCard.module.scss'
import Image from 'next/image'
import closeIcon from '@/public/icons/close.svg'
import { useDispatch } from 'react-redux'
import { cartActions } from '@/lib/redux'
import { genreTranslator } from '@/utils/consts'
import Link from 'next/link'
import TicketCounter from '../TicketCounter'

type TicketCardProps = Pick<Movie, 'id' | 'posterUrl' | 'genre' | 'title'> & {
  type: 'cart' | 'home'
}

export function TicketCard({ posterUrl, genre, title, id, type }: TicketCardProps) {
  return (
    <article className={styles.ticketCard}>
      <Image className={styles.poster} width={100} height={120} src={posterUrl} alt={title} />
      <div className={styles.content}>
        <div className={styles.info}>
          <Link href={`film/${id}`}>
            <h3 className={styles.title}>{title}</h3>
          </Link>
          <i className={styles.genre}>{genreTranslator[genre]}</i>
        </div>
        <TicketCounter title={title} id={id} />
        {type === 'cart' && <TicketRemover title={title} id={id} />}
      </div>
    </article>
  )
}

const TicketRemover = ({ title, id }: Pick<Movie, 'title' | 'id'>) => {
  const dispatch = useDispatch()
  const removeTicket = () => {
    dispatch(cartActions.removeFilm(id))
  }
  return (
    <button onClick={removeTicket} className={styles.removeTicketButton}>
      <Image src={closeIcon} alt={`Убрать все билеты на фильм ${title}`} />
    </button>
  )
}
