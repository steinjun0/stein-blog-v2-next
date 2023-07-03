import PostAPI from "apis/post";
import PostCard from 'organisms/common/PostCard';
import { useInfiniteQuery } from "react-query";
import IntersectionObserverComponent from "components/common/IntersectionObserverComponent";

export default function Post() {

	const { fetchNextPage, data, status } = useInfiniteQuery(
		['posts'],
		({ pageParam = { page: 1, take: 6 } }) => {
			return PostAPI.getPostList(pageParam);
		},
		{
			getNextPageParam: () => {
				try {
					if (data?.pages[data?.pages.length - 1].length === 0) {
						return undefined;
					} else {
						const nextPage: number = (data?.pages.length ?? 0) + 1;
						const nextParam = { page: nextPage, take: 6 };
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

	return (
		<div id="posts-container" className="flex-col w-full my-10 justify-start">
			<div className="flex flex-col justify-start">
				<div className="flex w-full justify-between items-end">
					<div>
						<div>

							<h1
								className='no-underline hover:underline'
								style={{ fontSize: '36px', fontWeight: '600', marginTop: '24px' }}>최근 게시글</h1>
						</div>

						<h6 style={{ fontSize: '16px', fontWeight: '400', marginTop: '4px' }}>가장 최근 올라온 게시글을 확인하세요!</h6>
					</div>
				</div>

				<div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 justify-center'>
					{status === 'success' && data.pages.map(page => {
						return page
							?.filter(e => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
							?.map(
								(post, i) => (
									<PostCard key={i} post={post} className="min-w-full" />
								)
							);
					})}
				</div>
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