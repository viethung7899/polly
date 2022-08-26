import { withTRPC } from '@trpc/next'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import superjson from 'superjson'
import { AppRouter } from '../server'
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const getEndingLink = () => {
  if (typeof window === 'undefined') {
    return httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`
    })
  }

  let wsURL = `ws://localhost:${process.env.WS_PORT ?? 3001}`
  if (process.env.VERCEL_URL)
    wsURL = `wss://${process.env.VERCEL_URL}`

  const client = createWSClient({
    url: wsURL
  })

  return wsLink<AppRouter>({
    client
  })
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      links: [getEndingLink()],
      headers() {
        return {
          cookie: ctx?.req?.headers.cookie
        }
      },
      url: `${getBaseUrl()}/api/trpc`,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      transformer: superjson,
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp)
