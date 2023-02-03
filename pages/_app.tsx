import '../styles/globals.css'

import "styles/markdown.css";
import "styles/markdown-editor.css";

import type { AppProps } from 'next/app'
import Link from 'next/link';
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});


export default function App({ Component, pageProps }: AppProps) {
  const description = "Blog for Stein. Engineering, Music, Camera, Art, and Life."
  const url = "https://blog.steinjun.net/"
  return (
    <>
      <ThemeProvider theme={theme}>
        <nav className='flex md:py-4 xl:px-0 xs:p-4 p-4' >
          <Link href={'/'}>
            <div className='flex items-end'>
              <p className='text-3xl' style={{ fontWeight: 700 }}>stein</p>
              {/* <Image style={{ margin: '0 0px 4px 8px', }} src={'/stein-logo.svg'} alt={'logo'} width={24} height={24}></Image> */}
            </div>
          </Link>
        </nav >
        <div className='flex justify-center px-4 xl:px-0 mb-20'>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );

}
