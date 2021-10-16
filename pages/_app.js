import Navbar from '../src/components/navbar'
import '../styles/globals.css'
import '../styles/navbar.css'
import '../styles/register.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { defaultQueryFn } from '../src/query/query'




function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        queryFn: defaultQueryFn,
        // suspense: true
      },
      
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen='false' />
    </QueryClientProvider>
  )
}

export default MyApp
