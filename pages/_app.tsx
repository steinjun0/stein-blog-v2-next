import '../styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className='flex p-4'>
        <p className='text-3xl font-bold'>Stein</p>
      </nav>
      <div className='flex justify-center px-8'>
        <Component {...pageProps} />
      </div>
    </>
  );

}
