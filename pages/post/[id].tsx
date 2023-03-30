import API from "API";
import { IPost } from "components/Types";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { numberWithCommas } from "utils";


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

    useEffect(() => {
        if (router.isReady && router.query.id === '10') {
            API.getBaekjoonData().then((res: { data: { solvedacTierImg: string, solved: number, rating: number } }) => {
                if (document.getElementById('baekjoon-tier'))
                    document.getElementById('baekjoon-tier')?.setAttribute('src', res.data.solvedacTierImg)
                if (document.getElementById('solved-num'))
                    document.getElementById('solved-num')!.innerHTML = `${numberWithCommas(res.data.solved)}문제`
                if (document.getElementById('baekjun-rating'))
                    document.getElementById('baekjun-rating')!.innerHTML = `${numberWithCommas(res.data.rating)}등`
            })
            API.getSolvedacData().then((res) => {
                if (document.getElementById('solvedac-rating'))
                    document.getElementById('solvedac-rating')!.innerHTML = `${numberWithCommas(res.data.rank)}등`
            })
        }
    }, [router.isReady])

    const koDtf = new Intl.DateTimeFormat("ko", { dateStyle: "medium" });

    return (
        <div className='flex flex-col w-full max-w-2xl mt-10 pb-20'>
            <Head>
                <link rel="shortcut icon" href="/stein-logo.svg" />
                <title key="title">{props.title}</title>
                <meta key="description" name="description" content={props.subtitle} />
                <meta key="author" name="author" content="Steinjun_0" />

                {/*  Facebook Meta Tags  */}
                <meta key="og:url" property="og:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                <meta key="og:type" property="og:type" content="website" />
                <meta key="og:title" property="og:title" content={props.title} />
                <meta key="og:description" property="og:description" content={props.subtitle} />
                <meta key="og:image" property="og:image" content={API.getServerPostImageUrl({ postId: props.id, fileName: 'thumbnail' })} />

                {/* Twitter Meta Tags  */}
                <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta key="twitter:domain" property="twitter:domain" content="blog.steinjun.net" />
                <meta key="twitter:url" property="twitter:url" content={`https://blog.steinjun.net/post/${router.query.id}`} />
                <meta key="twitter:title" name="twitter:title" content={props.title} />
                <meta key="twitter:description" name="twitter:description" content={props.subtitle} />
                <meta key="twitter:image" name="twitter:image" content={API.getServerPostImageUrl({ postId: props.id, fileName: 'thumbnail' })} />
            </Head>
            <div className="flex-col">
                <div className="flex-col mb-4 items-end">
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