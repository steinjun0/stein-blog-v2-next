import API from 'API';
import { IPost } from 'components/Types';
import Image from 'next/image';
import Link from 'next/link';
import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import HomeTitle from '../components/HomeTitle';
import useWindowSize from '../components/hooks/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper";
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { keyframes, styled } from '@mui/system';

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

const imagesAndLink: { image: string, link: string }[] = [
  { image: '/images/Dapada.png', link: 'https://dapada.co.kr/app/' },
  { image: '/images/DapadaEdu.png', link: 'https://careerdive.co.kr/' },
  { image: '/images/CareerDive.png', link: 'https://dapada.co.kr/edu/' },
  { image: '/images/Dacon.png', link: 'https://dacon.io/' }
]

const MovingImageKeyframes = keyframes`
from {
  transform: rotate(0deg);
  left : 0%;
}

8% {
  transform-origin: 100% 100%;
  transform: rotate(0deg);
  left : 0%;
}

10% {
  transform: rotate(2deg);
  left : 2%;
}

12% {
  transform: rotate(0deg);
  left : 2%;
}

50% {
  transform-origin: 100% 100%;
  transform: rotate(0deg);
  left : 2%;
}

52% {
  transform: rotate(2deg);
  left : 4%;
}

54% {
  transform: rotate(0deg);
  left : 4%;
}

70% {
  transform-origin: 0% 100%;
  transform: rotate(0deg);
  left : 4%;
}

72% {
  transform: rotate(-2deg);
  left : 2%;
}

74% {
  transform: rotate(0deg);
  left : 2%;
}

80% {
  transform-origin: 0% 100%;
  transform: rotate(0deg);
  left : 2%;
}

82% {
  transform: rotate(-2deg);
  left : 0%;
}

84% {
  transform: rotate(0deg);
  left : 0%;
}

to {
  transform: rotate(0deg);
  left : 0%;
}
`

const MovingImage = styled(Image)`
  animation: ${MovingImageKeyframes} 10s infinite ease;
`

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
    <div className='container flex flex-col justify-center' style={{ height: 'calc(100vh - 68px)', marginBottom: -80, minHeight: 700 }}>
      {/* calc(100vh - 148px) 68px(nav) + 80px(parent elem mb-20) */}
      <div className='flex-col'>
        <div className='flex justify-between items-center'>
          <div className='flex-col w-2/3'>
            <HomeTitle selectIndex={selectIndex} setSelectIndex={setSelectIndex} />
          </div>
          <div className='flex w-1/3'>
            <Link href={'/profile'} className='relative w-full h-0' style={{ paddingBottom: '100%' }} >
              <MovingImage
                src={'/images/profile.png'}
                alt='profile'
                fill
                sizes="50vw"
                priority
              />
            </Link>
          </div>
        </div>

        <Swiper
          slidesPerView={getMaxPostCount(getBreakPoint(size.width))}
          onSlideChange={() => { }}
          onSwiper={(swiper) => { }}
          className='mt-16 h-52'
          pagination={true}
          autoplay={{ pauseOnMouseEnter: true, delay: 4000 }}
          modules={[Pagination, Autoplay]}
          color="black"
        >
          {selectIndex === 0 ?
            posts!
              .filter((e) => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
              .map((e, i) =>
                <SwiperSlide key={i} className='flex justify-center'>
                  <div className="w-60 h-36 flex-col justify-center border-b-slate-400 border-b">
                    <span className='text-xs'>[{[...e.categories.map((cat) => cat.name)].toString().replaceAll(',', ', ')}]</span>
                    <Link href={`/post/${e.id}`}>
                      <h1 className='text-xl font-medium h-16 mt-1 [&:hover]:underline overflow-hidden text-ellipsis whitespace-pre-wrap '
                        style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxHeight: '3em' }}>
                        {e.title}
                      </h1>
                    </Link>
                    <p className='text-sm overflow-hidden whitespace-pre-wrap text-ellipsis mt-1'
                      style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxHeight: '3em' }}
                    >{e.subtitle}</p>
                  </div>
                </SwiperSlide>
              ) :
            imagesAndLink.map((e, i) =>
              <SwiperSlide key={i} className='flex justify-center'>
                <div className='relative border-slate-200 border' style={{ overflow: 'hidden', height: `${240 * 9 / 16}px` }}>
                  <a href={e.link} target="_blank" rel="noreferrer">
                    <Image
                      src={e.image}
                      alt='profile'
                      width={240}
                      height={240 * 9 / 16}
                    />
                  </a>

                </div>
              </SwiperSlide>

            )
          }
        </Swiper>
      </div>

    </div>
  );
}
