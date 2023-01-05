import '../styles/globals.css'

import "styles/markdown.css";
import "styles/markdown-editor.css";

import type { AppProps } from 'next/app'
import Link from 'next/link';
import Head from 'next/head';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/stein-logo.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>stein-blog</title>
        <meta name="description" content="Blog for Stein. Programming, Music, Camera, Art, and Life." />
        <meta name="author" content="Steinjun_0" />
        <meta name="robots" content="index, follow" />

        {/*  Facebook Meta Tags  */}
        <meta property="og:url" content="https://blog.steinjun.net/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="stein-blog" />
        <meta property="og:description" content="Blog for Stein. Programming, Music, Camera, Art, and Life." />
        <meta property="og:image" content="/stein-logo.svg" />/

        {/* Twitter Meta Tags  */}
        <meta name="twitter:card" content="/stein-logo.svg" />
        <meta property="twitter:domain" content="blog.steinjun.net" />
        <meta property="twitter:url" content="https://blog.steinjun.net" />
        <meta name="twitter:title" content="stein-blog" />
        <meta name="twitter:description" content="Blog for Stein. Programming, Music, Camera, Art, and Life." />
        <meta name="twitter:image" content="/stein-logo.svg" />
      </Head>
      <nav className='flex p-4'>
        <Link href={'/'}>
          <div className='flex items-end'>
            <p className='text-3xl' style={{ fontWeight: 700 }}>stein</p>
            {/* <Image style={{ margin: '0 0px 4px 8px', }} src={'/stein-logo.svg'} alt={'logo'} width={24} height={24}></Image> */}
          </div>
        </Link>
      </nav>
      <div className='flex justify-center px-4 xl:px-0'>
        <Component {...pageProps} />
      </div>
    </>
  );

}
