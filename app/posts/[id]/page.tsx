import { API_BASE_URL } from "apis/API";
import PostAPI from "apis/post";
import { IPost } from "interfaces/post";
import { Metadata } from "next";
import MarkdownViewer from "./markdownViewer";

async function getServerSideProps(id: number): Promise<IPost> {
    const res = await (fetch(`${API_BASE_URL}/post/${id}`));
    const post = await res.json();
    if (process.env.NODE_ENV === 'development') {
        post.body = post.body.replace('https://api.blog.steinjun.net', '//localhost:8888');
    }
    return {
        id: post.id,
        categories: post.categories,
        title: post.title,
        subtitle: post.subtitle,
        body: post.body,
        files: post.files,
        createdAt: new Date(post.created_at),
        updatedAt: new Date(post.updated_at),
    };
}

export async function generateMetadata(
    { params }: { params: { id: string; }; }
): Promise<Metadata> {
    const post = await getServerSideProps(Number(params.id));
    return {
        title: post.title,
        description: post.subtitle,
        openGraph: {
            title: post.title,
            description: post.subtitle,
            url: `https://blog.steinjun.net/posts/${params.id}`,
            type: 'website',
            images: [
                {
                    url: PostAPI.getServerPostImageUrl({ postId: post.id, fileName: 'thumbnail' }),
                    width: 800,
                    height: 600,
                    alt: post.title
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            site: `https://blog.steinjun.net/posts/${params.id}`,
            creator: "steinjun0",
            "images": PostAPI.getServerPostImageUrl({ postId: post.id, fileName: 'thumbnail' })
        }
    };
}

export default async function WorkPage({ params }: { params: { id: string; }; }) {
    const post = await getServerSideProps(Number(params.id));
    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "medium" });


    return (
        <div className='flex flex-col w-full max-w-2xl mt-10 pb-20'>
            <div className="flex-col">
                <div className="flex-col mb-4 items-end">
                    <div className="flex mb-2">
                        {post.categories?.map((e, i) => {
                            return <span className="text-sm" key={i}>{e.name}{i === (post.categories!.length - 1) ? '' : <span>, &nbsp;</span>}</span>;
                        })}
                    </div>
                    <span className="text-3xl" style={{ fontWeight: 700 }}>
                        {post.title}
                    </span>
                </div>

                <div className="flex justify-between mb-3 items-end flex-wrap">
                    <div className="flex items-end">
                        <span className="mr-3">{post.subtitle}</span>

                    </div>
                    <div>
                        <span className="text-sm text-gray-700 font-light mr-2">{koDtf.format(post.createdAt)}</span>
                        <span className="text-sm text-gray-700 font-light">{koDtf.format(post.updatedAt)}</span>
                    </div>

                </div>
            </div>
            <hr className="mb-7" />
            {/* {post.body} */}
            <MarkdownViewer source={post.body} />
        </div>
    );
}