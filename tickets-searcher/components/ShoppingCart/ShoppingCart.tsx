import basketIcon from '@/public/icons/basket.svg'
import Image from 'next/image'
import styles from './cart.module.scss'
import Link from 'next/link'
import { Amount } from './amount'

export function ShoppingCart() {
  return (
    <Link href='/cart'>
      <div className={styles.cart}>
        <div className={styles.counter}>
          <Amount />
        </div>
        <Image src={basketIcon} alt='Корзина' />
      </div>
    </Link>
  )
}
