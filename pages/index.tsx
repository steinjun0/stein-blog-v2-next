import Head from 'next/head'
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import HomeTitle from '../components/HomeTitle';
import useWindowSize from '../components/hooks/useWindowSize';
import styles from '../styles/Home.module.css'

interface IPostComponent { categories: string[], title: string, subtitle: string }

function PostComponent({ categories, title, subtitle }: IPostComponent) {
  return (
    <div className="w-64 h-44 flex-col justify-center border-b-slate-400 border-b">
      <span className='text-sm'>[{categories.toString().replaceAll(',', ', ')}]</span>
      <h1 className='text-2xl font-medium h-16 mt-1 whitespace-pre-wrap'>{title}</h1>
      <p className='mt-3 whitespace-pre-wrap'>{subtitle}</p>
    </div>
  );
}

function getBreakPoint(width: number): string {
  if (width > 1536) {
    return '2xl'
  } else if (width > 1280) {
    return 'xl'
  } else if (width > 1024) {
    return 'lg'
  } else if (width > 768) {
    return 'md'
  } else if (width > 640) {
    return 'sm'
  } else {
    return 'None'
  }
}

function getMaxPostCount(breakPoint: string): number {
  const maxPostCount: { [key: string]: number } = {
    '2xl': 4,
    'xl': 4,
    'lg': 3,
    'md': 3,
    'sm': 2,
    'None': 1
  }
  return maxPostCount[breakPoint]
}

export default function Home() {
  const [posts, setPosts] = useState<IPostComponent[]>([])
  const [selectIndex, setSelectIndex] = useState<number>(0)

  const size = useWindowSize();
  useEffect(() => {
    const dummyPosts = [
      { categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '제목과 부제목에 대한 간단한 고찰' },
      { categories: ['cat1', 'cat2'], title: '여러가지 상황\n미필적 고의도 범죄다', subtitle: '부제목의 길고 긴 길이.\n그것은 두줄이 되기에 충분했다' },
      { categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '제목과 부제목에 대한 간단한 고찰\n2줄로 나눠봤습니다' },
      { categories: ['cat1', 'cat2'], title: '여러가지 상황', subtitle: '부제목의 길고 긴 길이.\n그것은 두줄이 되기에 충분했다' },
    ]
    setPosts(dummyPosts)
  }, [])

  return (
    <div className='container flex flex-col justify-center' style={{ height: 'calc(100vh - 68px)' }}>
      <div className='flex-col'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex-col'>
            <HomeTitle selectIndex={selectIndex} setSelectIndex={setSelectIndex} />
          </div>
          <div className='flex w-1/3'>
            <div className='relative w-full h-0' style={{ paddingBottom: '100%' }}>
              <Image
                src={'/images/profile.png'}
                alt='profile'
                fill
              />
            </div>
          </div>
        </div>
        {selectIndex ?
          <section className="flex justify-between mt-16 items-center w-100 h-52 border-slate-0 border-0">
            {['/images/dapadaStock.png', '/images/dapadaEdu.png', '/images/careerDive.png'].slice(0, getMaxPostCount(getBreakPoint(size.width))).map((e, i) =>
              <div className='w-64 h-36 relative border-slate-200 border' style={{ overflow: 'hidden' }}>
                <Image
                  src={e}
                  alt='profile'
                  width={256}
                  height={144}
                />
              </div>
            )}
          </section>
          :
          <section className="flex justify-between mt-16 items-center w-100 h-52 border-slate-0 border-0">
            {posts!.slice(0, getMaxPostCount(getBreakPoint(size.width))).map((e, i) =>
              <PostComponent key={i} categories={['cat1', 'cat2']} title={e.title} subtitle={e.subtitle} />
            )}
          </section>}
      </div>

    </div>
  );
}
