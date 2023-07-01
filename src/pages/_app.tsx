import Header from '@components/Header/Header'
import { AuthProvider } from '@src/context/AuthContext'
import '@src/styles/globals.scss'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { Montserrat } from 'next/font/google'
import { toast, ToastContainer } from 'react-toastify'
import Navigation from '@components/Navigation/Navigation';
import Footer from '@components/Footer/Footer';
import '../styles/globals.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const montserrat = Montserrat({ subsets: ['latin'], style: "normal", variable: "--montserrat", weight: "500" })
export default function App({ Component, pageProps,router }: AppProps) {
  const excludeLayoutRoutes = ["/", "/cars"];
  const excludeLayoutRoutesFooter = ["/profile", "/myCargos", "/myCars"]
  const theme = createTheme({
    typography: {
      fontFamily: montserrat.style.fontFamily,
    },
  });
  return (
    <AuthProvider>
      <ToastContainer/>
      {/* <style jsx global>
        {`
          html,
          body {
            font-family: ${montserrat.style.fontFamily}!important;
          }
        `}
      </style> */}
      <main className={montserrat.className}>
      <ThemeProvider theme={theme}>
        <Header />
          {excludeLayoutRoutes.includes(router.route) && (
            <Navigation/>
          )}
          <Component {...pageProps} />
          {/* {excludeLayoutRoutes.includes(router.route) && (
             <Footer/>
          )}
           {excludeLayoutRoutesFooter.includes(router.route) && (
             <Footer/>
          )} */}
        </ThemeProvider>
      </main>
      
    </AuthProvider>

  )
}
