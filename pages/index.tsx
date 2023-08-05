import PostAPI from 'apis/post';
import { IPost } from 'interfaces/post';
import Link from 'next/link';

import { useRouter } from 'next/router';
import PostCard from 'organisms/common/PostCard';
import Profile from 'organisms/index/Profile';
import Section from 'organisms/index/Section';
import { useQueries } from 'react-query';

export default function Home() {
  const router = useRouter();
  // useQuery(
  //   ['posts', { page: 1, take: 3 }],
  //   () => PostAPI.getPostList({ page: 1, take: 3 })
  // );

  const [recentArticlesQuery, recommendPostsQuery, periodicalPostsQuery] = useQueries<[
    [IPost[]], [IPost[]], [IPost[]]
  ]>([
    {
      queryKey: ['posts', { categoryFilters: ['Article'], page: 1, take: 6 }],
      queryFn: () => PostAPI.getPostList({ page: 1, take: 6 }),
    },
    {
      queryKey: ['posts', { categoryFilters: ['Feed'], page: 1, take: 6 }],
      queryFn: () => PostAPI.getPostList({ categoryFilters: ['Feed'], page: 1, take: 6 }),
      staleTime: 1000 * 60 * 60,
    },
    {
      queryKey: ['posts', { categoryFilters: ['Periodical'] }],
      queryFn: () => PostAPI.getPostList({ categoryFilters: ['Periodical'] }),
      staleTime: 1000 * 60 * 60
    },
  ]);

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
      <Section title='최근 아티클' subtitle='개발과 관련된 지식과 경험' link='/posts?category=Article'>
        {recentArticlesQuery.isSuccess && getPostCardList(recentArticlesQuery.data)}
      </Section>

      <Section title='피드' subtitle='가벼운 게시글' link='/posts?category=Feed'>
        {recommendPostsQuery.data && getPostCardList(recommendPostsQuery.data)}
      </Section>

      {/* <Section title='정기 게시물' subtitle='항상 업데이트된 내용을 전달해드립니다!'>
        {periodicalPostsQuery.data && getPostCardList(periodicalPostsQuery.data)}
      </Section> */}

      <Link className='flex items-end no-underline hover:underline' href={'/posts'}>
        <div className='hidden sm:flex justify-center items-center w-full border-gray-200 border rounded-sm p-4'>
          <h1 className="font-bold text-xl">전체 게시글 보러가기 →</h1>
        </div>

        <div className="flex flex-col sm:hidden justify-start border-gray-200 border-b pb-8 rounded-sm overflow-hidden w-full gap-3">
          <h3 className='font-bold text-2xl [&:hover]:underline' style={{ fontWeight: '700' }}>전체 게시글 보러가기 →</h3>
        </div>
      </Link>
    </div>
  );
}
