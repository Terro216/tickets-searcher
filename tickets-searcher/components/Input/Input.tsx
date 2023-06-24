'use client'
import { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'
import styles from './Input.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectNameFilter } from '@/lib/redux/features/filter/selector'
import { filterActions } from '@/lib/redux/features/filter'

export function Input() {
  const dispatch = useDispatch()
  const inputValue = useSelector((state) => selectNameFilter(state))
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
