import { Divider, Slide } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "API"
import { marked } from "marked"
import { useScroll } from "components/hooks/useScroll";


export default function Post() {
	const scrollHook = useScroll();
	const [posts, setPosts] = useState<{ id: number, image: string, categories: Array<{ name: string, id: number }>, title: string, subtitle: string, body: string }[]>([])
	// const [postPage, setPostPage] = useState<number>(1);
	const [postPage, setPostPage] = useState<number>(1)
	let isGetAllPosts: boolean = false

	useEffect(() => {
		API.getPostList({ take: 4, page: postPage }).then((res) => {
			if (res.status === 200) {
				setPosts(res.data)
			} else {
				alert('Post를 받아오지 못하였습니다')
			}
		});
	}, [])

	useEffect(() => {
		console.log('isGetAllPosts', isGetAllPosts)
		console.log('postPage', postPage)
		if (!isGetAllPosts && scrollHook.scrollPercentage >= 80) {
			API.getPostList({ take: 4, page: postPage + 1 }).then((res) => {
				if (res.status === 200) {
					if (res.data.length > 0) {
						setPosts([...posts, ...res.data])
						setPostPage(postPage + 1)
					} else {
						console.log('finish~!!!!!')
						isGetAllPosts = true
					}

				} else {
					alert('Post를 받아오지 못하였습니다')
				}
			});
		}
	}, [scrollHook])

	return (
		<div className="flex-col w-full my-10 justify-start">
			<div className="flex items-end">
				<h1 className="text-7xl mr-3 font-medium">Post</h1>
				<span >Study · Engineering · Art · Life · etc.</span>
			</div>
			<Slide in={true} direction={'right'}>
				<Divider style={{ marginLeft: '158px' }} color={'black'} />
			</Slide>



			<div className="flex flex-wrap xs:justify-center gap-3 xl:justify-between mt-4">
				{posts.map(
					(post, i) => (
						<div key={i} className="w-96 mt-6 justify-center border-gray-200 border rounded-sm overflow-hidden">
							<Link href={`/post/${post.id}`}>
								<div className="flex flex-col justify-center" style={{ maxHeight: 382, minHeight: 382, overflow: 'hidden' }}>
									<img
										src={API.getPostFileUrl({ postId: post.id, fileName: 'thumbnail' })}
										alt={`${post.id}-thumnail`}
									/>
								</div>
							</Link>


							<div className="flex-col p-4 pb-3 border-t border-gray-200">
								<Link href={`/post/${post.id}`}><h1 className='text-2xl whitespace-pre-wrap [&:hover]:underline' style={{ fontWeight: '700' }}>{post.title}</h1></Link>
								<p className='text-sm overflow-hidden whitespace-wrap text-ellipsis mt-3 mb-3 text-gray-500'
									style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', fontWeight: 300 }}>
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
									<span className="text-gray-400">22.11.12</span>
								</div>
							</div>

						</div>))}
			</div>

		</div >
	);
}