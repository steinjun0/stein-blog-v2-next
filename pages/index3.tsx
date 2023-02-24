import { Divider, FormControl, InputLabel, MenuItem, Slide } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import API from "API"
import { marked } from "marked"
import { useScroll } from "components/hooks/useScroll";
import { IPost } from "components/Types";
import Select from '@mui/material/Select'
import Image from "next/image";
import { useRouter } from "next/router";
import PostCard from "components/PostCard";


export default function Post() {
	const router = useRouter()

	const [posts, setPosts] = useState<IPost[]>([])
	const postNextPageRef = useRef<number>(1);
	const [tagList, setTagList] = useState<string[]>(['All', 'Study', 'Engineering', 'Music', 'Art', 'etc'])
	const tagRef = useRef<string>('All')
	const [tag, setTag] = useState<string>('All')
	const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "long" });
	const bottomElementRef = useRef<HTMLDivElement>(null)

	async function getPosts(page: number, tag: string) {
		await API.getPostList({ take: 6, page: page, tagFilter: tag }).then((res) => {
			if (res.status === 200) {
				setPosts((prev) => {
					if (page * 6 < prev.length + res.data.length) {
						return [...prev]
					}
					else {
						if (res.data.length !== 0)
							postNextPageRef.current = page + 1
						return [...prev, ...res.data]
					}
				})
			} else {
				alert('Post를 받아오지 못하였습니다')
			}
		})
	}

	useEffect(() => {
		tagRef.current = tag
		getPosts(1, tag)
		postNextPageRef.current = 1
		return () => {
			setPosts([])
		}
	}, [tag])

	useEffect(() => {
		let observer: IntersectionObserver | null = null
		let options: IntersectionObserverInit | null = null
		if (router) {
			if (router.isReady && bottomElementRef.current) {
				options = {
					root: document.querySelector('#scrollArea'),
					rootMargin: '100px',
					threshold: 0,
				}

				observer = new IntersectionObserver((e: any) => {
					if (e[0].isIntersecting) {
						getPosts(postNextPageRef.current, tagRef.current)
					}
				}, options)

				observer.observe(bottomElementRef.current)
			}
		}
		return () => {
			if (observer && options) {
				observer.disconnect()
			}
		}
	}, [router, bottomElementRef])

	return (
		<div className="flex-col w-full my-10 justify-start">

			<h1 style={{ fontSize: '28px', fontWeight: '500', marginTop: '24px' }}>최근 게시물</h1>

			<div className="flex flex-wrap xs:justify-center gap-3 xl:justify-between mt-4">
				{posts
					.filter(e => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
					.map(
						(post, i) => (
							<PostCard key={i} post={post} />
						)
					)
				}
			</div>
			<div style={{ height: 300 }}></div>
			<div id="bottom-checker" ref={bottomElementRef} />

		</div >
	);
}