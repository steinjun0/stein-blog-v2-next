import { useEffect, useRef, useState } from "react";
import PostAPI from "apis/post";
import { IPost } from "interfaces/post";
import { useRouter } from "next/router";
import PostCard from 'organisms/common/PostCard';
import { useInfiniteQuery } from "react-query";


export default function Post() {
	const router = useRouter();
	const [posts, setPosts] = useState<IPost[]>([]);
	const postNextPageRef = useRef<number>(1);
	const bottomElementRef = useRef<HTMLDivElement>(null);
	const [isFinish, setIsFinish] = useState<boolean>(false);

	const { fetchNextPage, data, status } = useInfiniteQuery(
		['posts'],
		() => {
			console.log('postNextPageRef.current', postNextPageRef.current);
			const result = getPosts(postNextPageRef.current);
			result.then((res) => {
				console.log('res', res);
				if (Array.isArray(res)) {
					res.length === 0 ? setIsFinish(true) : setIsFinish(false);
				}
			});
			return result;
		},
		{
			getNextPageParam: () => {
				if (!isFinish) {
					return { page: postNextPageRef.current, take: 6 };
				}
			},
			staleTime: 1000 * 60 * 30,
		}
	);

	async function getPosts(page: number, categoryFilters?: string[]) {
		return PostAPI.getPostList({ take: 6, page: page, categoryFilters })
			.then((resPosts) => {
				setPosts((prev) => {
					if (page * 6 < prev.length + resPosts.length) {
						return [...prev];
					}
					else {
						return [...prev, ...resPosts];
					}
				});

				return resPosts;
			}).catch((err) => {
				alert('Post를 받아오지 못하였습니다');
			});
	}

	function getIntersectionHandler() {
		let isLoading = false;
		return async (e: any) => {
			if (e[0].isIntersecting && !isLoading) {
				isLoading = true;
				await fetchNextPage();
				postNextPageRef.current += 1;
				isLoading = false;
			}
		};
	}

	useEffect(() => {
		let observer: IntersectionObserver | null = null;
		let options: IntersectionObserverInit | null = null;
		if (router) {
			if (router.isReady && bottomElementRef.current) {
				options = {
					root: document.querySelector('#scrollArea'),
					rootMargin: '100px',
					threshold: 0,
				};
				observer = new IntersectionObserver(getIntersectionHandler(), options);
				observer.observe(bottomElementRef.current);
			}
		}
		return () => {
			if (observer && options) {
				observer.disconnect();
			}
		};
	}, [router, bottomElementRef]);

	return (
		<div className="flex-col w-full my-10 justify-start">
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
			<div id="bottom-checker" ref={bottomElementRef} />

		</div >
	);
}