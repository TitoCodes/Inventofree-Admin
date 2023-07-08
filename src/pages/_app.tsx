import React from 'react'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import '../css/main.css'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  const title = `Inventofree Admin`

  const description = 'Inventofree Admin - free inventory management system'

  const url = 'https://inventofree.titocodes.com'

  const imageWidth = '1920'

  const imageHeight = '960'

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta name="description" content={description} />

            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="JustBoil.me" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content={imageWidth} />
            <meta property="og:image:height" content={imageHeight} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image:width" content={imageWidth} />
            <meta property="twitter:image:height" content={imageHeight} />

            <link rel="icon" href="/inventofree-admin/favicon.png" />
          </Head>

          {/* <Script
            Google analytics script goes here
          /> */}

          {/* <Script id="google-analytics" strategy="afterInteractive">
            Google scripts here
          </Script> */}

          <Component {...pageProps} />
        </>
      )}
    </Provider>
  )
}

export default MyApp
