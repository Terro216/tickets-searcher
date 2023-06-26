import './globals.scss'
import modalStyles from './popups.module.scss'

import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { Providers } from '@/lib/Providers'

const roboto = Roboto({ subsets: ['cyrillic', 'cyrillic-ext', 'latin'], weight: ['500', '700'] })
export const SFPro = localFont({
  src: [
    {
      path: '../public/fonts/SFProText/SFProText-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../public/fonts/SFProText/SFProText-Medium.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../public/fonts/SFProText/SFProText-Semibold.ttf',
      style: 'normal',
      weight: '600',
    },
  ],
})

export const metadata = {
  title: 'Главная страница',
  description: 'Сервис онлайн покупки билетов Билетопоиск',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body className={roboto.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <div className={modalStyles['select-popup']} id='select-popup-cinema'></div>
          <div className={modalStyles['select-popup']} id='select-popup-genre'></div>
          <div className={modalStyles['modal']} id='modal'></div>
        </Providers>
      </body>
    </html>
  )
}
