import styles from './page.module.scss'
import Filters from '@/components/Filters'
import TicketCardList from '@/components/TicketCardList'

export const metadata = {
  title: 'Главная страница',
}

export default function Home() {
  return (
    <section className={styles.homePageWrapper}>
      <Filters />
      <TicketCardList type='home' />
    </section>
  )
}
