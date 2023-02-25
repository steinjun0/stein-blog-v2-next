import API from 'API';
import { IPost } from 'components/Types';
import Image from 'next/image';
import Link from 'next/link';
import React, { MutableRefObject, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import HomeTitle from '../components/HomeTitle';
import useWindowSize from '../components/hooks/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper";
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { keyframes, styled } from '@mui/system';
import PostCard from 'components/PostCard';
import PostCard2 from 'components/PostCard2';
import PostCard3 from 'components/PostCard3';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppProps } from 'next/app';

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

function Section(props: { title: string, subtitle: string, link: string } & PropsWithChildren) {

  return <div className="flex flex-col justify-start">
    <div>
      <Link className='flex items-end w-fit' href={'/post'}>
        <h1
          className='no-underline hover:underline'
          style={{ fontSize: '36px', fontWeight: '600', marginTop: '24px' }}>{props.title}</h1>
        <ChevronRightIcon className='my-2' style={{ fontSize: '36px' }} />
      </Link>
    </div>
    <h6 style={{ fontSize: '16px', fontWeight: '400', marginTop: '4px' }}>{props.subtitle}</h6>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 justify-center'>
      {props.children}
    </div>
  </div>
}


export default function Home() {
  const [recentPosts, setRecentPosts] = useState<IPost[]>([])
  const [recommendPosts, setRecommendPosts] = useState<IPost[]>([])
  const [periodicalPosts, setPeriodicalPosts] = useState<IPost[]>([])
  const [selectIndex, setSelectIndex] = useState<number>(0)

  const size = useWindowSize();
  useEffect(() => {

    API.getPostsByIds({ ids: [13, 12, 11, 9] }).then((res) => {
      if (res.status === 200) {
        setRecommendPosts(res.data)
      } else {
        alert('post를 받아오지 못했습니다')
      }
    })

    API.getPostsByIds({ ids: [10] }).then((res) => {
      if (res.status === 200) {
        setPeriodicalPosts(res.data)
      } else {
        alert('post를 받아오지 못했습니다')
      }
    })

    API.getPostList({ page: 1, take: 6 }).then((res) => {
      if (res.status === 200) {
        setRecentPosts(res.data)
      } else {
        alert('post를 받아오지 못했습니다')
      }
    })

  }, [])

  return (
    <div className="flex flex-col w-full my-10 justify-start gap-24">
      <Section title='추천 게시물' subtitle='개발에 관심있다면 이런 글은 어떠세요?' link='/post'>
        {
          recommendPosts!
            .filter((e) => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
            .map((post, i) =>
              <PostCard3 key={i} post={post} />
            )
        }
      </Section>

      <Section title='정기 게시물' subtitle='항상 업데이트된 내용을 전달해드립니다!' link='/post'>
        {
          periodicalPosts!
            .filter((e) => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
            .map((post, i) =>
              <PostCard3 key={i} post={post} />
            )
        }
      </Section>

      <Section title='최근 게시물' subtitle='가장 최근 올라온 게시글을 확인하세요!' link='/post'>
        {
          recentPosts!
            .filter((e) => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
            .map((post, i) =>
              <PostCard3 key={i} post={post} />
            )
        }
      </Section>
    </div>
  );
}
