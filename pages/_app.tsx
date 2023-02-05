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
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js" integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx" crossOrigin="anonymous"></script>
        <Gnb />
        <div className='flex justify-center px-4 xl:px-0 mb-20'>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );

}
