import API from 'API';
import { IPost } from 'components/Types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HomeTitle from '../components/HomeTitle';
import useWindowSize from '../components/hooks/useWindowSize';

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
  const [posts, setPosts] = useState<IPost[]>([])
  const [selectIndex, setSelectIndex] = useState<number>(0)

  const size = useWindowSize();
  useEffect(() => {
    API.getPostList({ page: 1, take: 4 }).then((res) => {
      if (res.status === 200) {
        setPosts(res.data)
      } else {
        alert('post를 받아오지 못했습니다')
      }
    })
    // const dummyPosts = [
    //   { categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '제목과 부제목에 대한 간단한 고찰' },
    //   { categories: ['cat1', 'cat2'], title: '여러가지 상황\n미필적 고의도 범죄다', subtitle: '부제목은 무조건 1줄이내. 최대 27자' },
    //   { categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '일이삼사오육칠팔구십일이삼사오육칠' },
    //   { categories: ['cat1', 'cat2'], title: '여러가지 상황', subtitle: '부제목의 길고 긴 길이.\n그것은 두줄이 되기에 충분했다' },
    // ]
    // setPosts(dummyPosts)
  }, [])

  return (
    <div className='container flex flex-col justify-center' style={{ height: 'calc(100vh - 68px)' }}>
      <div className='flex-col'>
        <div className='flex justify-between items-center'>
          <div className='flex-col w-2/3'>
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
          <section className="flex justify-between mt-16 items-center w-full h-52 ">
            {['/images/Dapada.png', '/images/DapadaEdu.png', '/images/CareerDive.png', '/images/DapadaStock.png'].slice(0, getMaxPostCount(getBreakPoint(size.width))).map((e, i) =>
              <div key={i} className='relative border-slate-200 border' style={{ overflow: 'hidden' }}>
                <Image
                  src={e}
                  alt='profile'
                  width={240}
                  height={240 * 9 / 16}
                />
              </div>
            )}
          </section>
          :
          <section className="flex justify-between mt-16 items-center w-full h-52 border-slate-0 border-0">
            {posts!.slice(0, getMaxPostCount(getBreakPoint(size.width))).map((e, i) =>
              <div key={i} className="w-60 h-36 flex-col justify-center border-b-slate-400 border-b">
                <span className='text-xs'>[{[...e.categories.map((cat) => cat.name)].toString()}]</span>
                <Link href={'/post/1'}><h1 className='text-xl font-medium h-16 mt-1 whitespace-pre-wrap [&:hover]:underline'>{e.title}</h1></Link>
                <p className='text-sm overflow-hidden whitespace-nowrap text-ellipsis mt-1'>{e.subtitle}</p>
              </div>
            )}
          </section>}
      </div>

    </div>
  );
}
