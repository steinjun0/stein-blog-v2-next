import API from "API"
import { marked } from "marked"
import Link from "next/link"
import post from "pages/post"
import Image from "next/image";
import { IPost } from "./Types";

export default function PostCard({ post }: { post: IPost }) {
    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "long" });
    return <Link href={`/post/${post.id}`}>
        <div className="mt-6 justify-center border-gray-200 border rounded-sm overflow-hidden">
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
}