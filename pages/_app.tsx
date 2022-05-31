import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux';

// Init
import {
  store as reduxStore,
} from '../redux';


// context
import { AuthProvider } from '../hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // HOC
    <AuthProvider>
      <ReduxProvider store={reduxStore}>
        <Component {...pageProps} />
      </ReduxProvider>
    </AuthProvider>
  )
}

export default MyApp
