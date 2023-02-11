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
			<div className="flex justify-between sm:justify-start items-end">
				<h1 className="text-7xl mr-3 font-medium">Post</h1>

				<div className="hidden sm:flex flex-wrap">
					{
						tagList.map(
							(e, i) =>
								<div key={i} className="flex items-end">
									<div className="flex flex-col items-center">
										{e === tag && <span className="h-4">▾</span>}
										<div className={e === tag ? 'font-medium' : 'text-gray-400 cursor-pointer'} onClick={() => { setTag(e) }}>
											{e}
										</div>
									</div>
									<div>
										{i < tagList.length - 1 ? <span className="text-gray-400">&nbsp;·&nbsp;</span> : ''}
									</div>
								</div>
						)
					}
				</div>

				<div className="flex sm:hidden w-40" style={{ marginBottom: '-2px' }}>
					<FormControl variant="standard" className="w-full" >
						<InputLabel id="select-label">TAG</InputLabel>
						<Select
							onChange={(e) => { setTag(e.target.value as string) }}
							value={tag}
							label={'Tag'}
							sx={{ boxShadow: 'none', '::before': { border: '0 !important' }, '::after': { border: 0 } }}
						>
							{tagList.map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
						</Select>
					</FormControl>
				</div>


			</div>
			<Slide in={true} direction={'right'}>
				<Divider style={{ marginLeft: '158px' }} color={'black'} />
			</Slide>

			<div className="flex flex-wrap xs:justify-center gap-3 xl:justify-between mt-4">
				{posts
					.filter(e => process.env.NODE_ENV === 'development' || !e.categories.map(i => i.name).includes('test'))
					.map(
						(post, i) => (
							<Link key={i} href={`/post/${post.id}`}>
								<div className="w-96 mt-6 justify-center border-gray-200 border rounded-sm overflow-hidden">
									<div className="relative" style={{ maxHeight: 382, minHeight: 382, overflow: 'hidden' }}>
										<Image
											src={API.getServerPostImageUrl({ postId: post.id, fileName: 'thumbnail' })}
											alt={`${post.id}-thumnail`}
											fill
											className="object-contain"
											priority
											sizes="(max-width: 812px) 100vw,
											(max-width: 1208px) 50vw,
											33vw"
										/>
									</div>


									<div className="flex-col p-4 pb-3 border-t border-gray-200">
										<h1 className='text-2xl whitespace-pre-wrap [&:hover]:underline' style={{ fontWeight: '700', minHeight: '64px' }}>{post.title}</h1>
										<p className='text-sm overflow-hidden whitespace-wrap text-ellipsis mt-3 mb-3 text-gray-500'
											style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', fontWeight: 300, minHeight: '40px' }}>
											{marked.parse(post.body).replace(/<[^>]*>/g, '')}
										</p>
										<hr />
										<div className="flex justify-between text-xs pt-3">
											<div className="flex flex-wrap gap-1">
												{post.categories.map((e, i) => {
													return <div key={i} className="bg-gray-700 rounded-sm text-white" style={{ padding: '2px 4px', fontWeight: 400 }}>
														<span>{e.name}</span>
													</div>
												})}
											</div>
											<span className="text-gray-400">{koDtf.format(post.created_at)}</span>
										</div>

									</div>

								</div>
							</Link>
						)
					)
				}

			</div>
			<div style={{ height: 300 }}></div>
			<div id="bottom-checker" ref={bottomElementRef} />

		</div >
	);
}