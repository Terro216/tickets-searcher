import { Movie } from '@/lib/redux/services/movieApi'
import styles from './TicketCard.module.scss'
import Image from 'next/image'
import plusIcon from '@/public/icons/plus.svg'
import minusIcon from '@/public/icons/minus.svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectTicketsByFilmId } from '@/lib/redux/features/cart/selector'
import { cartActions } from '@/lib/redux'
import { genreTranslator } from '@/utils/consts'

type TicketCardProps = Pick<Movie, 'id' | 'posterUrl' | 'genre' | 'title'>

export function TicketCard({ posterUrl, genre, title, id }: TicketCardProps) {
  return (
    <article className={styles.ticketCard}>
      <Image className={styles.poster} width={100} height={120} src={posterUrl} alt={title} />
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <i className={styles.genre}>{genreTranslator[genre]}</i>
        </div>
        <Counter title={title} id={id} />
      </div>
    </article>
  )
}

const Counter = ({ title, id }: Pick<Movie, 'title' | 'id'>) => {
  const ticketCount = useSelector((state) => selectTicketsByFilmId(state, id))
  const dispatch = useDispatch()
  const changeTicketCount = (type: 'remove' | 'add') => {
    if (type === 'add') {
      dispatch(cartActions.addTicket(id))
    } else {
      dispatch(cartActions.removeTicket(id))
    }
  }

  return (
    <div className={styles.counter}>
      <button
        className={styles.plusMinusButton}
        disabled={ticketCount === 0}
        onClick={() => changeTicketCount('remove')}>
        <Image src={minusIcon} alt={`Убрать билет на фильм ${title}`} />
      </button>
      <span className={styles.number}>{ticketCount}</span>
      <button className={styles.plusMinusButton} onClick={() => changeTicketCount('add')}>
        <Image src={plusIcon} alt={`Добавить билет на фильм ${title}`} />
      </button>
    </div>
  )
}
