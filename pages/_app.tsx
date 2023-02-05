import '../styles/globals.css'

import "styles/markdown.css";
import "styles/markdown-editor.css";

import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material';
import Gnb from 'components/Gnb';


const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Gnb />
        <div className='flex justify-center px-4 xl:px-0 mb-20'>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );

}
