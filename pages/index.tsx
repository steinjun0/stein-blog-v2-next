import API from 'API';
import { IPost } from 'components/Types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HomeTitle from '../components/HomeTitle';
import useWindowSize from '../components/hooks/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import 'swiper/css'
import "swiper/css/pagination";

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
    'md': 2,
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
  }, [])

  return (
    <div className='container flex flex-col justify-center' style={{ height: 'calc(100vh - 148px)', minHeight: 700 }}>
      {/* calc(100vh - 150px) 68px(nav) + 80px(parent elem mb-20) */}
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

        <Swiper
          slidesPerView={getMaxPostCount(getBreakPoint(size.width))}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className='mt-16 h-52'
          pagination={true}
          modules={[Pagination]}
          color="black"
        >
          {selectIndex === 0 ?
            posts!
              .filter((e) => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
              .map((e, i) =>
                <SwiperSlide key={i} className='flex justify-center '>
                  <div className="w-60 h-36 flex-col justify-center border-b-slate-400 border-b">
                    <span className='text-xs'>[{[...e.categories.map((cat) => cat.name)].toString().replaceAll(',', ', ')}]</span>
                    <Link href={`/post/${e.id}`}><h1 className='text-xl font-medium h-16 mt-1 whitespace-pre-wrap [&:hover]:underline'>{e.title}</h1></Link>
                    <p className='text-sm overflow-hidden whitespace-nowrap text-ellipsis mt-1'>{e.subtitle}</p>
                  </div>
                </SwiperSlide>
              ) :
            ['/images/Dapada.png', '/images/DapadaEdu.png', '/images/CareerDive.png', '/images/Dacon.png'].map((e, i) =>
              <SwiperSlide key={i} className='flex justify-center'>
                <div className='relative border-slate-200 border' style={{ overflow: 'hidden', height: `${240 * 9 / 16}px` }}>
                  <Image
                    src={e}
                    alt='profile'
                    width={240}
                    height={240 * 9 / 16}
                  />
                </div>
              </SwiperSlide>

            )
          }
        </Swiper>
      </div>

    </div>
  );
}
