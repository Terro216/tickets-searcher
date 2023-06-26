import TicketCardList from '@/components/TicketCardList'
import styles from './page.module.scss'
import { Amount } from '@/components/ShoppingCart/amount'

export default function Cart() {
  return (
    <>
      <TicketCardList type='cart' />
      <TicketSum />
    </>
  )
}

const TicketSum = () => {
  return (
    <div className={styles.ticketSum}>
      <span>Итого билетов:</span>
      <span>
        <Amount />
      </span>
    </div>
  )
}
