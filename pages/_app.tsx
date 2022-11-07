import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className='flex p-4'>
        <Link href={'/'}>
          <p className='text-3xl' style={{ fontWeight: 700 }}>Stein</p>
        </Link>
      </nav>
      <div className='flex justify-center px-8'>
        <Component {...pageProps} />
      </div>
    </>
  );

}
