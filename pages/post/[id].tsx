import PostAPI from "api/post";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PostService from "services/post";


const Markdown = dynamic(
    () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
    { ssr: false }
);


interface IPostProps {
    id: number,
    categories: { id: number, name: string; }[],
    title: string,
    subtitle: string,
    body: string,
    files: { id: number, name: string, url: string; }[],
    createdAt: string,
    updatedAt: string,
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const post = (await PostAPI.getPost({ id: Number(context.query.id) })).data;
    // data.body 
    if (process.env.NODE_ENV === 'development') {
        post.body = post.body.replace('https://api.blog.steinjun.net', '//localhost:8888');
    }
    return {
        props: {
            id: post.id,
            categories: post.categories,
            title: post.title,
            subtitle: post.subtitle,
            body: post.body,
            files: post.files,
            createdAt: `${post.createdAt}`,
            updatedAt: `${post.updatedAt}`,
        }, // should pass stringified props
    };
}


export default function WorkPage(post: IPostProps) {
    const router = useRouter();
    useEffect(() => {
        if (router.isReady && router.query.id === '10') {
            PostService.updateBeakjoon();
        }
    }, [router.isReady]);

    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "medium" });

    return (
        <div className='flex flex-col w-full max-w-2xl mt-10 pb-20'>
            <Head>
                <link rel="shortcut icon" href="/stein-logo.svg" />
                <title key="title">{post.title}</title>
                <meta key="description" name="description" content={post.subtitle} />
                <meta key="author" name="author" content="Steinjun_0" />

                {/*  Facebook Meta Tags  */}
                <meta key="og:url" property="og:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                <meta key="og:type" property="og:type" content="website" />
                <meta key="og:title" property="og:title" content={post.title} />
                <meta key="og:description" property="og:description" content={post.subtitle} />
                <meta key="og:image" property="og:image" content={PostAPI.getServerPostImageUrl({ postId: post.id, fileName: 'thumbnail' })} />

                {/* Twitter Meta Tags  */}
                <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta key="twitter:domain" property="twitter:domain" content="blog.steinjun.net" />
                <meta key="twitter:url" property="twitter:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                <meta key="twitter:title" name="twitter:title" content={post.title} />
                <meta key="twitter:description" name="twitter:description" content={post.subtitle} />
                <meta key="twitter:image" name="twitter:image" content={PostAPI.getServerPostImageUrl({ postId: post.id, fileName: 'thumbnail' })} />
            </Head>
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
                        <span className="text-sm text-gray-700 font-light mr-2">{koDtf.format(new Date(post.createdAt))}</span>
                        <span className="text-sm text-gray-700 font-light">{koDtf.format(new Date(post.updatedAt))}</span>
                    </div>

                </div>
            </div>
            <hr className="mb-7" />
            <Markdown source={post.body} />
        </div>
    );
}