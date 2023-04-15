import API from 'API';
import { IPost } from 'interfaces/post';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import PostCard from 'organisms/common/PostCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Profile from 'organisms/index/Profile';
import Section from 'organisms/index/Section';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [recommendPosts, setRecommendPosts] = useState<IPost[]>([]);
  const [periodicalPosts, setPeriodicalPosts] = useState<IPost[]>([]);

  const recommendPostIds = [15, 16, 11];
  const periodicalPostIds = [10, 18];

  useEffect(() => {

    API.getPostsByIds({ ids: recommendPostIds }).then((res) => {
      if (res.status === 200) {
        setRecommendPosts(res.data.sort(
          (a: IPost, b: IPost) => recommendPostIds.indexOf(a.id) - recommendPostIds.indexOf(b.id)
        )
        );
      } else {
        alert('post를 받아오지 못했습니다');
      }
    });

    API.getPostsByIds({ ids: periodicalPostIds }).then((res) => {
      if (res.status === 200) {
        setPeriodicalPosts(res.data.sort(
          (a: IPost, b: IPost) => periodicalPostIds.indexOf(a.id) - periodicalPostIds.indexOf(b.id)
        )
        );
      } else {
        alert('post를 받아오지 못했습니다');
      }
    });

    API.getPostList({ page: 1, take: 3 }).then((res) => {
      if (res.status === 200) {
        setRecentPosts(res.data);
      } else {
        alert('post를 받아오지 못했습니다');
      }
    });

  }, []);

  function getPostCardList(postsData: IPost[]) {
    return postsData
      .filter((e) => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
      .map((post, i) =>
        <PostCard key={i} post={post} />
      );
  }

  return (
    <div className="flex flex-col w-full my-10 justify-start gap-24">

      <Profile />

      <Section title='추천 게시물' subtitle='개발에 관심있다면 이런 글은 어떠세요?' link='/post'>
        {getPostCardList(recommendPosts)}
      </Section>

      <Section title='정기 게시물' subtitle='항상 업데이트된 내용을 전달해드립니다!' link='/post'>
        {getPostCardList(periodicalPosts)}
      </Section>

      <Section title='최근 게시물' subtitle='가장 최근 올라온 게시글을 확인하세요!' link='/post'>
        {getPostCardList(recentPosts)}
      </Section>

      <Link className='flex items-end no-underline hover:underline' href={'/post'}>
        <div className='flex justify-center items-center w-full border-gray-200 border rounded-sm p-4'>
          <h1
            style={{ fontSize: '24px', fontWeight: '600' }}>전체 게시글 보러가기</h1>
          <ChevronRightIcon className='my-2' style={{ fontSize: '36px' }} />
        </div>
      </Link>
    </div>
  );
}
