import Link from 'next/link'
import ShoppingCart from '../ShoppingCart'
import styles from './header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <h2 className={styles.title}>Билетопоиск</h2>
      </Link>
      <ShoppingCart />
    </header>
  )
}
