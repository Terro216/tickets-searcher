'use client'
import { useSelector } from 'react-redux'
import { selectTicketsAmount } from '@/lib/redux/features/cart/selector'

export function Amount() {
  const amount = useSelector((state) => selectTicketsAmount(state))
  return amount
}
