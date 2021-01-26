import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (<Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
