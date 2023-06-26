import type { Movie } from '@/lib/redux/services/movieApi'
import styles from './TicketCounter.module.scss'
import Image from 'next/image'
import plusIcon from '@/public/icons/plus.svg'
import minusIcon from '@/public/icons/minus.svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectTicketsByFilmId } from '@/lib/redux/features/cart/selector'
import { cartActions } from '@/lib/redux'

export function TicketCounter({ title, id }: Pick<Movie, 'title' | 'id'>) {
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
        <Image src={minusIcon} alt={`Убрать 1 билет на фильм ${title}`} />
      </button>
      <span className={styles.number}>{ticketCount}</span>
      <button
        disabled={ticketCount === 30}
        className={styles.plusMinusButton}
        onClick={() => changeTicketCount('add')}>
        <Image src={plusIcon} alt={`Добавить 1 билет на фильм ${title}`} />
      </button>
    </div>
  )
}
