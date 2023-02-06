import API from "API";
import { isAxiosError } from "axios";
import { IPost } from "components/Types";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Markdown = dynamic(
    () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
    { ssr: false }
);

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { data } = await API.getPost({ id: Number(context.query.id) });
    // data.body 
    if (process.env.NODE_ENV === 'development') {
        data.body = data.body.replace('https://api.blog.steinjun.net', '//localhost:8888');
    }
    return {
        props: {
            id: data.id,
            categories: data.categories,
            title: data.title,
            subtitle: data.subtitle,
            body: data.body,
            files: data.files,
            created_at: `${data.created_at}`,
            updated_at: `${data.updated_at}`,
        }, // will be passed to the page component as props
    };
}

export default function WorkPage(props: {
    id: number,
    image?: string,
    categories: Array<{ name: string, id: number }>,
    title: string,
    subtitle: string,
    body: string,
    files: Array<{ id: number, name: string }>
    created_at: string,
    updated_at: string,
}) {
    const router = useRouter()
    const [post, setPost] = useState<IPost>()

    useEffect(() => {
        if (props) {
            let tempPost = {
                id: props.id,
                categories: props.categories,
                title: props.title,
                subtitle: props.subtitle,
                body: props.body,
                files: props.files,
                created_at: new Date(props.created_at),
                updated_at: new Date(props.updated_at)
            }
            setPost(tempPost)
        }
    }, [props])

    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "medium" });

    return (
        <div className='flex flex-col w-full mt-10'>
            <Head>
                <link rel="shortcut icon" href="/stein-logo.svg" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{props.title}</title>
                <meta name="description" content={props.subtitle} />
                <meta name="author" content="Steinjun_0" />
                <meta name="robots" content="index, follow" />

                {/*  Facebook Meta Tags  */}
                <meta property="og:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={props.title} />
                <meta property="og:description" content={props.subtitle} />
                <meta property="og:image" content={API.getServerPostImageUrl({ postId: props.id, fileName: 'thumbnail' })} />

                {/* Twitter Meta Tags  */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="blog.steinjun.net" />
                <meta property="twitter:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                <meta name="twitter:title" content={props.title} />
                <meta name="twitter:description" content={props.subtitle} />
                <meta name="twitter:image" content={API.getServerPostImageUrl({ postId: props.id, fileName: 'thumbnail' })} />
            </Head>
            <div className="flex-col">
                <div className="hidden md:flex mb-2 justify-between items-end">
                    <span className="text-3xl" style={{ fontWeight: 700 }}>
                        {props.title}
                    </span>
                    <div className="flex">
                        {props.categories?.map((e, i) => {
                            return <span className="text-sm" key={i}>{e.name}{i === (props.categories!.length - 1) ? '' : <span>, &nbsp;</span>}</span>
                        })}
                    </div>
                </div>

                <div className="flex-col md:hidden mb-4 items-end">
                    <div className="flex mb-2">
                        {props.categories?.map((e, i) => {
                            return <span className="text-sm" key={i}>{e.name}{i === (props.categories!.length - 1) ? '' : <span>, &nbsp;</span>}</span>
                        })}
                    </div>
                    <span className="text-3xl" style={{ fontWeight: 700 }}>
                        {props.title}
                    </span>
                </div>

                <div className="flex justify-between mb-3 items-end flex-wrap">
                    <div className="flex items-end">
                        <span className="mr-3">{props.subtitle}</span>

                    </div>
                    <div>
                        <span className="text-sm text-gray-700 font-light mr-2">{koDtf.format(new Date(props.created_at))}</span>
                        <span className="text-sm text-gray-700 font-light">{koDtf.format(new Date(props.updated_at))}</span>
                    </div>

                </div>
            </div>
            <hr className="mb-7" />
            <Markdown source={props.body} />
        </div>
    );
}