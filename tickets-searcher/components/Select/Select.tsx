'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './Select.module.scss'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { selectCinemaFilter, selectGenreFilter } from '@/lib/redux/features/filter/selector'
import { filterActions } from '@/lib/redux/features/filter'
import { createPortal } from 'react-dom'
import arrowIcon from '@/public/icons/arrow.svg'
import Image from 'next/image'
import { Cinema, useGetCinemasQuery } from '@/lib/redux/services/cinemaApi'
import { SFPro } from '@/app/layout'
import { Genre } from '@/lib/redux/services/movieApi'
import { genreTranslator } from '@/utils/consts'
import modalStyles from '@/app/popups.module.scss'
import Loader from '../Loader'

interface SelectProps {
  selectType?: 'genre' | 'cinema'
}

export function Select({ selectType }: SelectProps) {
  const dispatch = useAppDispatch()
  const selectValue = useAppSelector((state) =>
    selectType === 'cinema' ? selectCinemaFilter(state).name : selectGenreFilter(state)
  )

  const [isSelectOpen, toggleSelect] = useState(false)
  const [selectPopupEl, setSelectPopupEl] = useState<HTMLElement | null>(null)

  const setCinema = (cinema: Cinema) => {
    dispatch(filterActions.setCinema(cinema))
    toggleSelect(false)
  }
  const setGenre = (genre: Genre) => {
    dispatch(filterActions.setGenre(genre))
    toggleSelect(false)
  }

  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const popup = document.getElementById(`select-popup-${selectType}`)
    if (popup) {
      popup.innerHTML = ''
      if (isSelectOpen) {
        const selectElBounds = selectRef?.current?.getBoundingClientRect() || {
          top: 0,
          height: 0,
          x: 0,
          width: 0,
        }
        popup.style.top = selectElBounds.top + selectElBounds.height + 'px' //window.scrollY +
        popup.style.left = selectElBounds.x + 'px'
        popup.style.width = selectElBounds.width + 'px'
        popup.classList.add(modalStyles['select-popup-visible'])
        setSelectPopupEl(popup)
      } else {
        setSelectPopupEl(null)
        popup.removeAttribute('style')
        popup.classList.remove(modalStyles['select-popup-visible'])
      }
    } else {
      console.error('select-popup not found')
    }
  }, [selectType, isSelectOpen])

  const selectDisplayedValue =
    selectType === 'cinema'
      ? selectValue === ''
        ? 'Выберите кинотеатр'
        : selectValue
      : selectValue === ''
      ? 'Выберите жанр'
      : genreTranslator[selectValue as Genre]

  return (
    <>
      <div
        ref={selectRef}
        className={`${styles.select} ${SFPro.className} ${selectValue === '' ? styles.selectEmpty : ''}`}
        onClick={(e) => {
          e.preventDefault()
          toggleSelect((isSelectOpen) => !isSelectOpen)
        }}>
        <span>{selectDisplayedValue}</span>
        <Image
          className={`${styles.arrow} ${isSelectOpen ? styles.arrowFlip : ''}`}
          src={arrowIcon}
          alt='Раскрыть список'
        />
      </div>
      {isSelectOpen &&
        selectPopupEl &&
        (selectType === 'cinema'
          ? createPortal(<CinemaList setCinema={setCinema} />, selectPopupEl, 'cinema')
          : createPortal(<GenreList setGenre={setGenre} />, selectPopupEl, 'genre'))}
    </>
  )
}

interface CinemaListProps {
  setCinema: (cinema: Cinema) => void
}

const CinemaList = ({ setCinema }: CinemaListProps) => {
  const { data, isLoading, error } = useGetCinemasQuery()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        'Возникла ошибка! Пожалуйста, обновите страницу'
      ) : (
        data &&
        ([{ id: 'resetter', name: '', movieIds: [] }] as Cinema[]).concat(data).map((cinema) => (
          <div
            className={`${styles.selectListItem} ${SFPro.className}`}
            key={cinema.id}
            onClick={() => setCinema(cinema)}>
            {cinema.name === '' ? 'Не выбран' : cinema.name}
          </div>
        ))
      )}
    </>
  )
}

interface GenreListProps {
  setGenre: (genre: Genre) => void
}
const GenreList = ({ setGenre }: GenreListProps) => {
  return Object.entries(genreTranslator).map(([enGenre, ruGenre], i) => (
    <div
      className={`${styles.selectListItem} ${SFPro.className}`}
      key={enGenre + i}
      onClick={() => setGenre(enGenre as Genre)}>
      {ruGenre === '' ? 'Не выбран' : ruGenre}
    </div>
  ))
}
