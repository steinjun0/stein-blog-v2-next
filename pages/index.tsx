import Head from 'next/head'
import Image from 'next/image'
import HomeTitle from '../components/HomeTitle';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='container'>
      <div className='flex justify-center items-center  w-full'>
        <div className='flex-col w-1/2'>
          <HomeTitle />
        </div>
        <div className='flex-col ml-20'>
          <div className='w-10 bg-slate-500' style={{ width: '480px', height: '480px' }}>image</div>
          <div>post</div>
        </div>
      </div>
    </div>
  );
}
