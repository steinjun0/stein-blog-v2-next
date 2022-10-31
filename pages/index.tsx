import Head from 'next/head'
import Image from 'next/image';
import HomeTitle from '../components/HomeTitle';
import styles from '../styles/Home.module.css'


function PostComponent({ categories, title, subtitle }: { categories: string[], title: string, subtitle: string }) {
  return (
    <div className="w-64 h-40 flex-col justify-center border-b-slate-400 border-b">
      <span className='text-sm'>[{categories.toString().replaceAll(',', ', ')}]</span>
      <h1 className='text-2xl font-medium h-16 mt-1 whitespace-pre-wrap'>{title}</h1>
      <p className='mt-3 mb-5 whitespace-pre-wrap'>{subtitle}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className='container'>
      <div className='flex justify-center items-center  w-full'>
        <div className='flex-col w-1/2'>
          <HomeTitle />
        </div>
        <div className='flex-col ml-20'>
          <Image
            src={'/images/profile.png'}
            alt='profile'
            width={480}
            height={480} />
        </div>
      </div>
      <section className="flex justify-center items-center w-100 h-52 border-slate-500 border">

        <PostComponent categories={['cat1', 'cat2']} title={'이 글의 제목은 \n"무엇이 제목인가"'} subtitle={'제목과 부제목에 대한 간단한 고찰'} />
        <PostComponent categories={['cat1', 'cat2']} title={'여러가지 상황'} subtitle={'부제목의 길고 긴 길이.\n그것은 두줄이 되기에 충분했다'} />
      </section>

    </div>
  );
}
