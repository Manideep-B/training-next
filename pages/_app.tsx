import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import NavTop from "../components/NavTop"
import Flooter from "../components/Flooter"
import {StoreProvider} from '../utlis/Store'

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <> 
      <StoreProvider>
        <NavTop />
          <Layout>
           <Component {...pageProps} />
          </Layout>
        <Flooter />
      </StoreProvider>
    </>
  )
}

export default MyApp
