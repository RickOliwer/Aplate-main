import { ApolloProvider } from '@apollo/client'
import Layout from '../components/Layout'
import Client from '../src/apollo/client'
import '../styles/globals.css'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return(
    <ApolloProvider client={Client}>
      <Layout data={pageProps?.data}>

        <Component {...pageProps} />
      </Layout>

    </ApolloProvider>
  )
}

export default MyApp
