'use client'
import { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'
import styles from './Input.module.scss'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { selectNameFilter } from '@/lib/redux/features/filter/selector'
import { filterActions } from '@/lib/redux/features/filter'
import { useDebounce } from '@/utils/hooks'

export function Input() {
  const dispatch = useAppDispatch()
  const inputValue = useAppSelector((state) => selectNameFilter(state))
  const setInputValue = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(filterActions.setName(event.target.value))

  return (
    <input
      className={styles.input}
      type='text'
      placeholder='Введите название'
      value={inputValue}
      onChange={setInputValue}></input>
  )
}
