import API from "api/post";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "interfaces/post";
import { HTMLAttributes, useRef } from "react";

export default function PostCard({ post, ...props }: { post: IPost; } & HTMLAttributes<HTMLDivElement>) {
    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "long" });
    const titleRef = useRef<HTMLHeadingElement>(null);
    return <div {...props} className="justify-center border-gray-200 border rounded-sm overflow-hidden" style={{ minHeight: '574px' }}>
        <Link href={`/post/${post.id}`} className="flex h-full">
            <div className="flex flex-col justify-between w-full">
                <div className="relative" style={{ maxHeight: 382, minHeight: 382, overflow: 'hidden', maxWidth: '100%' }}>
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
                <div className="flex flex-col justify-between p-4 pb-3 border-t border-gray-200 h-full">
                    <div className="flex flex-col">
                        <h1 ref={titleRef} className='text-2xl whitespace-pre-wrap [&:hover]:underline' style={{ fontWeight: '700' }}>{post.title}</h1>
                        <h4 className='whitespace-pre-wrap [&:hover]:underline' style={{ fontWeight: '500', minHeight: '32px', fontSize: '16px' }}>{post.subtitle}</h4>
                    </div>
                    <p className='text-sm overflow-hidden whitespace-wrap text-ellipsis mt-3 text-gray-500'
                        style={{ WebkitLineClamp: titleRef.current?.clientHeight === 32 ? 3 : 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', fontWeight: 300, minHeight: '40px' }}>
                        {marked.parse(post.body).replace(/<[^>]*>/g, '')}
                    </p>
                </div>
                <div>
                    <hr />
                    <div className="flex justify-between text-xs p-4 mt-auto">
                        <div className="flex flex-wrap gap-1">
                            {post.categories.map((e, i) => {
                                return <div key={i} className="bg-gray-700 rounded-sm text-white" style={{ padding: '2px 4px', fontWeight: 400 }}>
                                    <span>{e.name}</span>
                                </div>;
                            })}
                        </div>
                        <span className="text-gray-400">{koDtf.format(post.createdAt)}</span>
                    </div>
                </div>

            </div>
        </Link>
    </div>;
}