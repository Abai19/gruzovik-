import Header from '@components/Header/Header'
import { AuthProvider } from '@src/context/AuthContext'
import '@src/styles/globals.scss'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { Montserrat } from 'next/font/google'
import { toast, ToastContainer } from 'react-toastify'
import Navigation from '@components/Navigation/Navigation';
const montserrat = Montserrat({ subsets: ['latin'], style: "normal", variable: "--montserrat", weight: "600" })
export default function App({ Component, pageProps,router }: AppProps) {
  const excludeLayoutRoutes = ["/", "/cars"];
  return (
    <AuthProvider>
      <ToastContainer/>
      <main className={montserrat.className}>
        <Header />
          {excludeLayoutRoutes.includes(router.route) && (
            <Navigation/>
          )}
          <Component {...pageProps} />
      </main>
    </AuthProvider>

  )
}
