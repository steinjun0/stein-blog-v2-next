import API from "API"
import { marked } from "marked"
import Link from "next/link"
import post from "pages/post"
import Image from "next/image";
import { IPost } from "./Types";

export default function PostCard2({ post }: { post: IPost }) {
    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "long" });
    return <Link href={`/post/${post.id}`}>
        <div className="mt-6 justify-center rounded-xl overflow-hidden"
            style={{
                background: '#e0e0e0',
                padding: '24px',
                // filter: 'drop-shadow(20px 20px 20px #bebebe) drop-shadow(20px 20px 20px #bebebe)',
                // boxShadow: '-12px -12px 12px #fff'
                boxShadow: '20px 20px 46px #bebebe,  inset 0 0 20px #e0e0e0'
                // -20px -20px 46px #ffffff,
            }}>
            <div
                className="rounded-xl"
                style={{
                    background: '#ffffff',
                    padding: '40px',
                    filter: 'drop-shadow(20px 20px 10px #ddd)',
                    boxShadow: 'inset -6px -6px 6px #ddd, inset 3px 3px 3px #f0f0f0',
                    maxHeight: 342,
                }}>
                <div className="relative"
                    style={{
                        maxHeight: 342,
                        minHeight: 264, overflow: 'hidden',
                    }}>
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
            </div>


            <div
                className="flex-col p-4 pb-3  rounded-xl mt-2"
                style={{
                    background: '#ffffff',
                    padding: '40px',
                    filter: 'drop-shadow(20px 20px 10px #ddd)',
                    boxShadow: 'inset -6px -6px 6px #ddd, inset 3px 3px 3px #f0f0f0',
                }}
            >
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
                </div>
                <div className="text-gray-400 mt-2" style={{ fontSize: 12 }}>{koDtf.format(post.created_at)}</div>

            </div>

        </div>
    </Link>
}