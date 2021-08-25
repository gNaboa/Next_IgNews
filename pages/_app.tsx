import '../styles/global.scss'
import Header from '../src/components/Header/index'
import {Provider as NextAuth} from 'next-auth/client'
function MyApp({ Component, pageProps }) {


 return (
    <NextAuth session={pageProps.session}>
   <Header/>
  <Component {...pageProps} />

</NextAuth>
  )
}
 
export default MyApp
