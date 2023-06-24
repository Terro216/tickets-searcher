import Link from 'next/link'
import styles from './footer.module.scss'
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href='/qa'>Вопросы-ответы</Link>
      <Link href='/about-us'>О нас</Link>
    </footer>
  )
}
