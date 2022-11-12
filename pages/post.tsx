import { Divider, Slide } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Work() {
	const [mainCategory, setMainCategory] = useState<string>('Programming')
	const [subCategory, setSubCategory] = useState<string>('')

	const [categories, setCategories] = useState<{ mainCategories: string[], subCategories: { [key: string]: string[] } }>(
		{
			mainCategories: ['Programming', 'Music', 'Art', 'Life'],
			subCategories: {
				Programming: ['react', 'vue', 'python'],
				Music: ['Compose', 'Record', 'Play'],
				Art: ['Photo', 'Drawing'],
				Life: ['log'],
			}
		}
	);

	const [mainCategories, setMainCategories] = useState<string[]>(['Programming', 'Music', 'Art', 'Life'])
	const [subCategories, setSubCategories] = useState<string[]>([])


	const [posts, setPosts] = useState<{ image: string, categories: string[], title: string, subtitle: string, body: string }[]>([])
	const [isSlideStart, setIsSlideStart] = useState<boolean>(false)
	useEffect(() => {
		const dummyPosts = [
			{ image: '/images/DapadaSquare.png', categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '제목과 부제목에 대한 간단한 고찰', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
			{ image: '/images/DapadaEduSquare.png', categories: ['cat1', 'cat2'], title: '여러가지 상황\n미필적 고의도 범죄다', subtitle: '부제목은 무조건 1줄이내. 최대 27자', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
			{ image: '/images/CareerDiveSquare.png', categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '일이삼사오육칠팔구십일이삼사오육칠', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
			{ image: '/images/DapadaSquare.png', categories: ['cat1', 'cat2'], title: '여러가지 상황', subtitle: '부제목의 길고 긴 길이.\n그것은 두줄이 되기에 충분했다', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
		]
		setPosts(dummyPosts)
		setIsSlideStart(true)
	}, [])

	return (
		<div className="flex-col w-full mt-10 justify-start">
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
							{/* <span className='text-xs'>[{post.categories.toString().replaceAll(',', ', ')}]</span> */}
							<Link href={'/post/1'}>
								<Image
									src={post.image}
									alt='profile'
									width={600}
									height={600}
								/>
							</Link>

							<div className="flex-col p-4 pb-3 border-t border-gray-200">
								<Link href={'/post/1'}><h1 className='text-2xl whitespace-pre-wrap [&:hover]:underline' style={{ fontWeight: '700' }}>{post.title}</h1></Link>
								<p className='text-sm overflow-hidden whitespace-wrap text-ellipsis mt-3 mb-3 text-gray-500'
									style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', fontWeight: 300 }}>{post.body}</p>
								<hr />
								<div className="flex justify-between text-xs pt-3">
									<div className="flex flex-wrap gap-1">
										{['vue', 'react', 'FE'].map((e, i) => {
											return <div key={i} className="bg-gray-700 rounded-sm text-white" style={{ padding: '2px 4px', fontWeight: 400 }}>
												<span>{e}</span>
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