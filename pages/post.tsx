import { Divider } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Work() {
	const [category, setCategory] = useState<String>('All')
	const [posts, setPosts] = useState<{ categories: string[], title: string, subtitle: string, body: string }[]>([])

	useEffect(() => {
		const dummyPosts = [
			{ categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '제목과 부제목에 대한 간단한 고찰', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
			{ categories: ['cat1', 'cat2'], title: '여러가지 상황\n미필적 고의도 범죄다', subtitle: '부제목은 무조건 1줄이내. 최대 27자', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
			{ categories: ['cat1', 'cat2'], title: '이 글의 제목은 \n"무엇이 제목인가"', subtitle: '일이삼사오육칠팔구십일이삼사오육칠', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
			{ categories: ['cat1', 'cat2'], title: '여러가지 상황', subtitle: '부제목의 길고 긴 길이.\n그것은 두줄이 되기에 충분했다', body: ' 저번 게시글에서 캐릭터의 움직임을 구현하고, 해당 캐릭터를 따라오는 AI를 구현했다. 이제 캐릭터에 교체 가능한 무기를 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오 장착시키고, 무기의 자동 공격을 구현해보자. 계획 1. 게임에 등장할 모델들 구현, 디자인하기 ✅ 2. 캐릭터 움직임 구현하기 ✅ 3. 캐릭터를 해당 캐릭터를 따라오' },
		]
		setPosts(dummyPosts)
	}, [])

	return (
		<div className="flex-col w-full mt-10 justify-start">
			<div className="flex items-end">
				<h1 className="text-7xl mr-3 font-medium">Post</h1>
				<span >Study · Engineering · Art · Life · etc.</span>
			</div>
			<Divider style={{ marginLeft: '158px' }} color={'black'} />

			<div className="flex w-52 mt-10 justify-between [&>span]:cursor-pointer">
				{['All', 'Product', 'Project'].map(
					(e) =>
						<span className={category === e ? 'underline decoration-solid' : 'text-gray-300'}
							onClick={() => setCategory(e)}>{e}</span>)}
			</div>

			<div>
				{posts.map(
					(post) => (
						<div className="w-full mt-6 flex-col justify-center border-b-slate-400 border-b">
							<span className='text-xs'>[{post.categories.toString().replaceAll(',', ', ')}]</span>
							<Link href={'/post/1'}><h1 className='text-xl font-medium mt-1 whitespace-wrap [&:hover]:underline'>{post.title}</h1></Link>
							<p className='text-sm overflow-hidden whitespace-wrap text-ellipsis mt-3 mb-6'
								style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>{post.body}</p>
						</div>))}
			</div>

		</div >
	);
}