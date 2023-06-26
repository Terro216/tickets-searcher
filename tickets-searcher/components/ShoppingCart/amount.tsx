'use client'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectTicketsAmount } from '@/lib/redux/features/cart/selector'

export function Amount() {
  const amount = useAppSelector((state) => selectTicketsAmount(state))
  return amount
}
