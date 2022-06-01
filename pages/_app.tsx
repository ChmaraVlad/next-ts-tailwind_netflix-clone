import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux';

// Init
import {
  store as reduxStore,
} from '../redux';


// context
import { AuthProvider } from '../tools/hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // HOC
    <ReduxProvider store={reduxStore}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ReduxProvider>
  )
}

export default MyApp
