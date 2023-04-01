import Header from '@components/Header/Header'
import '@src/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], style:"normal", variable: "--montserrat", weight: "600" })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main  className={montserrat.className}>
          <Header/>
         <Component {...pageProps} />
    </main>
 
 )
}
