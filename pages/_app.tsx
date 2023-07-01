import '../styles/globals.css';

import "styles/markdown.css";
import "styles/markdown-editor.css";

import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material';
import Gnb from 'organisms/common/Gnb';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import * as gtag from '../lib/gtag';
import useAdminCheck from 'hooks/useAdminCheck';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from "next-auth/react";
import Script from 'next/script';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

const queryClient = new QueryClient();


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();


  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  const description = "Blog for Stein. Engineering, Music, Camera, Art, and Life.";
  const url = "https://blog.steinjun.net/";
  return (
    <>
      <Head>
        <title key="title">stein-blog</title>
        <link rel="shortcut icon" href="https://blog.steinjun.net/stein-logo.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta key="description" name="description" content={description} />
        <meta key="author" name="author" content="Steinjun_0" />
        <meta name="robots" content="index, follow" />
        <meta name="color-scheme" content="light only" />

        {/*  Facebook Meta Tags  */}
        <meta key="og:url" property="og:url" content={url} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content="stein-blog" />
        <meta key="og:description" property="og:description" content={description} />
        <meta key="og:image" property="og:image" content="https://blog.steinjun.net/stein-logo.svg" />

        {/* Twitter Meta Tags  */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:domain" property="twitter:domain" content="blog.steinjun.net" />
        <meta key="twitter:url" property="twitter:url" content={url} />
        <meta key="twitter:title" name="twitter:title" content="stein-blog" />
        <meta key="twitter:description" name="twitter:description" content={description} />
        <meta key="twitter:image" name="twitter:image" content="https://blog.steinjun.net/stein-logo.svg" />

      </Head>
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      /> */}
      <Script id='ga-script' async src="https://www.googletagmanager.com/gtag/js?id=G-F6WWRZZP6J"></Script>
      <Script
        id='ga-run-script'
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
      <ThemeProvider theme={theme} >
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Gnb />
            <div className='flex justify-center'>
              <div className='flex justify-center px-4 xl:px-0 mt-20 w-screen' style={{ maxWidth: '1240px' }}>
                <Component {...pageProps} />
              </div>
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider >
    </>
  );

}
