import Navbar from '../src/components/navbar'
import '../styles/globals.css'
import '../styles/navbar.css'
import '../styles/register.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'




function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen='false'/>
    </QueryClientProvider>
  )
}

export default MyApp
