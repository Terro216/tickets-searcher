'use client'

/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { store } from './redux/store'
import { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
