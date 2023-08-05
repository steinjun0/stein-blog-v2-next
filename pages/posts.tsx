import PostAPI from "apis/post";
import IntersectionObserverComponent from "components/common/IntersectionObserverComponent";
import { useRouter } from "next/router";
import PostCard from 'organisms/common/PostCard';
import Section from "organisms/index/Section";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function Post() {
	const router = useRouter();
	const [category, setCategory] = useState<string>(router?.query?.category as string ?? 'Article');
	const { fetchNextPage, data, status, remove, refetch } = useInfiniteQuery(
		['posts'],
		({ pageParam = { page: 1, take: 6, categoryFilters: category === "" ? undefined : [category] } }) => {
			return PostAPI.getPostList(pageParam);
		},
		{
			getNextPageParam: () => {
				try {
					if (data?.pages[data?.pages.length - 1].length === 0) {
						return undefined;
					} else {
						const nextPage: number = (data?.pages.length ?? 0) + 1;
						const nextParam = { page: nextPage, take: 6, categoryFilters: category === "" ? undefined : [category] };
						return nextParam;
					}
				} catch (error) {
					return { page: 1, take: 6 };
				}
			},
			onSuccess: (data) => {
				if (data.pages[data.pages.length - 1].length === 0) {
					data.pages.pop();
					data.pageParams.pop();
					return;
				}
			},
			staleTime: 1000 * 60 * 30,
		}
	);

	function intersectHandler() {
		let isLoading = false;
		return async (e: any) => {
			if (e[0].isIntersecting && !isLoading) {
				isLoading = true;
				await fetchNextPage();
				isLoading = false;
			}
		};
	}

	useEffect(() => {
		remove();
		refetch();
	}, [category]);

	useEffect(() => {
		if (router?.query?.category) {
			setCategory(router?.query?.category as string);
		}
	}, [router?.query?.category]);

	return (
		<div id="posts-container" className="flex-col w-full my-10 justify-start">
			<div className="flex flex-col justify-start">
				<div className="flex gap-3 cursor-pointer mb-2">
					<div onClick={() => setCategory('')}
						style={category === '' ? { fontWeight: 500, textDecoration: 'underline' } : { fontWeight: 400, color: "#aaa" }}>전체</div>
					<div onClick={() => setCategory('Article')}
						style={category === 'Article' ? { fontWeight: 500, textDecoration: 'underline' } : { fontWeight: 400, color: "#aaa" }}>아티클</div>
					<div onClick={() => setCategory('Feed')}
						style={category === 'Feed' ? { fontWeight: 500, textDecoration: 'underline' } : { fontWeight: 400, color: "#aaa" }}>피드</div>
				</div>
				<Section title='최근 게시글' subtitle='가장 최근 올라온 게시글을 확인하세요!'>

					{status === 'success' && data.pages.map(page => {
						return page
							?.filter(e => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
							?.map(
								(post, i) => (
									<PostCard key={i} post={post} className="min-w-full" />
								)
							);
					})}
				</Section>
			</div>
			<div style={{ height: 300 }}></div>

			{/* <div id="bottom-checker" ref={oberverRefCallback} /> */}
			<IntersectionObserverComponent
				onIntersect={intersectHandler}
				observerOptions={{
					rootMargin: '100px',
					threshold: 0,
				}} />
		</div >
	);
}