import { useEffect, useRef, useState } from "react";
import PostAPI from "apis/post";
import { IPost } from "interfaces/post";
import { useRouter } from "next/router";
import PostCard from 'organisms/common/PostCard';


export default function Post() {
	const router = useRouter();

	const [posts, setPosts] = useState<IPost[]>([]);
	const postNextPageRef = useRef<number>(1);
	const bottomElementRef = useRef<HTMLDivElement>(null);

	async function getPosts(page: number, categoryFilters?: string[]) {
		await PostAPI.getPostList({ take: 6, page: page, categoryFilters }).then((res) => {
			if (res.status === 200) {
				setPosts((prev) => {
					if (page * 6 < prev.length + res.data.length) {
						return [...prev];
					}
					else {
						if (res.data.length !== 0)
							postNextPageRef.current = page + 1;
						return [...prev, ...res.data];
					}
				});
			} else {
				alert('Post를 받아오지 못하였습니다');
			}
		});
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

				observer = new IntersectionObserver((e: any) => {
					if (e[0].isIntersecting) {
						getPosts(postNextPageRef.current);
					}
				}, options);

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
					{posts
						.filter(e => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
						.map(
							(post, i) => (
								<PostCard key={i} post={post} className="min-w-full" />
							)
						)
					}
				</div>
			</div>
			<div style={{ height: 300 }}></div>
			<div id="bottom-checker" ref={bottomElementRef} />

		</div >
	);
}