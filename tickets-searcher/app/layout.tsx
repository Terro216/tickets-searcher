import './globals.scss'
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
    },
  ],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body className={roboto.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <div className='select-popup' id='select-popup'></div>
          <div className='modal' id='modal'></div>
        </Providers>
      </body>
    </html>
  )
}
