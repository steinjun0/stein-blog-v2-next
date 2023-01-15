import API from "API";
import { isAxiosError } from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Markdown = dynamic(
    () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
    { ssr: false }
);

export default function WorkPage() {
    const router = useRouter()
    const [post, setPost] = useState<{ title: string, subtitle: string, body: string, created_at: Date, updated_at: Date, categories?: { id: number, name: string }[] }>()
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        if (router.isReady) {
            (async () => {
                try {
                    const { data } = await API.getPost({ id: Number(router.query.id) });
                    // data.body 
                    if (process.env.NODE_ENV === 'development') {
                        data.body = data.body.replace('https://api.blog.steinjun.net', '//localhost:8888')
                    }
                    setPost(data)
                } catch (error) {
                    if (isAxiosError(error)) {
                        // handleAxiosError(error);
                    } else {
                        // handleUnexpectedError(error);
                    }
                }
            })()
        }
    }, [router.isReady])

    useEffect(() => {
        if (post !== undefined) {
            setIsLoading(false)
        }
    }, [post])


    // const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "medium", timeStyle: 'short', hour12: false });
    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "medium" });

    return (
        <div className='flex flex-col w-full mt-10'>
            {!isLoading && <div className="flex-col">
                <Head>
                    <link rel="shortcut icon" href="/stein-logo.svg" />
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{post!.title}</title>
                    <meta name="description" content={post!.subtitle} />
                    <meta name="author" content="Steinjun_0" />
                    <meta name="robots" content="index, follow" />

                    {/*  Facebook Meta Tags  */}
                    <meta property="og:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={post!.title} />
                    <meta property="og:description" content={post!.subtitle} />
                    <meta property="og:image" content="/stein-logo.svg" />/

                    {/* Twitter Meta Tags  */}
                    <meta name="twitter:card" content="/stein-logo.svg" />
                    <meta property="twitter:domain" content="blog.steinjun.net" />
                    <meta property="twitter:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                    <meta name="twitter:title" content={post!.title} />
                    <meta name="twitter:description" content={post!.subtitle} />
                    <meta name="twitter:image" content="/stein-logo.svg" />
                </Head>
                <div className="hidden md:flex mb-2 justify-between items-end">
                    <span className="text-3xl" style={{ fontWeight: 700 }}>
                        {post!.title}
                    </span>
                    <div className="flex">
                        {post!.categories?.map((e, i) => {
                            return <span className="text-sm" key={i}>{e.name}{i === (post!.categories!.length - 1) ? '' : <span>, &nbsp;</span>}</span>
                        })}
                    </div>
                </div>

                <div className="flex-col md:hidden mb-4 items-end">
                    <div className="flex mb-2">
                        {post!.categories?.map((e, i) => {
                            return <span className="text-sm" key={i}>{e.name}{i === (post!.categories!.length - 1) ? '' : <span>, &nbsp;</span>}</span>
                        })}
                    </div>
                    <span className="text-3xl" style={{ fontWeight: 700 }}>
                        {post!.title}
                    </span>
                </div>

                <div className="flex justify-between mb-3 items-end">
                    <div className="flex items-end">
                        <span className="mr-3">{post!.subtitle}</span>

                    </div>
                    <div>
                        <span className="text-sm text-gray-700 font-light mr-2">{koDtf.format(post!.created_at)}</span>
                        <span className="text-sm text-gray-700 font-light">{koDtf.format(post!.updated_at)}</span>
                    </div>

                </div>
            </div>}
            <hr className="mb-7" />
            {!isLoading && <Markdown source={post!.body} />}
        </div>
    );
}