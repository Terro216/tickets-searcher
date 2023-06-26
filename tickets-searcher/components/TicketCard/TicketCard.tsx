import type { Movie } from '@/lib/redux/services/movieApi'
import styles from './TicketCard.module.scss'
import Image from 'next/image'
import closeIcon from '@/public/icons/close.svg'
import { useAppDispatch } from '@/lib/redux/hooks'
import { cartActions } from '@/lib/redux'
import { genreTranslator } from '@/utils/consts'
import Link from 'next/link'
import TicketCounter from '../TicketCounter'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import modalStyles from '@/app/popups.module.scss'

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
  const dispatch = useAppDispatch()
  const [modalPopupEl, setModalPopupEl] = useState<HTMLElement | null>(null)
  const [isModalOpen, toggleModalOpen] = useState<boolean>(false)
  const removeTicket = (result: boolean) => {
    if (result) {
      dispatch(cartActions.removeFilm(id))
    }
    toggleModalOpen(false)
    modalPopupEl?.removeAttribute('style')
  }

  useEffect(() => {
    const popup = document.getElementById('modal')
    if (popup) {
      // popup.innerHTML = ''
      if (isModalOpen) {
        popup.style.display = 'flex'
        setModalPopupEl(popup)
      } else {
        popup.removeAttribute('style')
        // popup.style.display = 'none' //.classList.remove(modalStyles['modal-visible'])
        setModalPopupEl(null)
      }
    } else {
      console.error('modal not found')
    }
  }, [isModalOpen, modalPopupEl])

  return (
    <>
      <button
        onClick={() => toggleModalOpen((modalOpen) => !modalOpen)}
        className={styles.removeTicketButton}>
        <Image src={closeIcon} alt={`Убрать все билеты на фильм ${title}`} />
      </button>
      {isModalOpen &&
        modalPopupEl &&
        createPortal(<ModalTicketRemover removeTicket={removeTicket} />, modalPopupEl, id)}
    </>
  )
}

const ModalTicketRemover = ({ removeTicket }: { removeTicket: (result: boolean) => void }) => {
  return (
    <div className={styles.removeModal}>
      <div className={styles.modalTitle}>
        <span>Удаление билета</span>
        <Image
          width={16}
          height={16}
          onClick={() => removeTicket(false)}
          src={closeIcon}
          alt='Закрыть окно'
        />
      </div>
      <div className={styles.modalContent}>Вы уверены, что хотите удалить билет?</div>
      <div className={styles.modalButtons}>
        <button className={styles.orange} onClick={() => removeTicket(true)}>
          Да
        </button>
        <button onClick={() => removeTicket(false)}>Нет</button>
      </div>
    </div>
  )
}
