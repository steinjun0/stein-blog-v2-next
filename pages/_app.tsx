import '../styles/globals.css'

import "styles/markdown.css";
import "styles/markdown-editor.css";

import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material';
import Gnb from 'components/Gnb';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import * as gtag from '../lib/gtag';


const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F6WWRZZP6J"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      /> */}
      <ThemeProvider theme={theme} >
        <Gnb />
        <div className='flex justify-center px-4 xl:px-0 my-20'>
          <Component {...pageProps} />
        </div>
      </ThemeProvider >
    </>
  );

}
