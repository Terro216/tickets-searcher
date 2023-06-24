import ShoppingCart from '../ShoppingCart'
import styles from './header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Билетопоиск</h2>
      <ShoppingCart />
    </header>
  )
}
