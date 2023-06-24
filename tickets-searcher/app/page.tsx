import styles from './page.module.scss'
import Filters from '@/components/Filters'
import TicketCardList from '@/components/TicketCardList'

export default function Home() {
  return (
    <main className={styles.main}>
      <Filters />
      <TicketCardList />
    </main>
  )
}
