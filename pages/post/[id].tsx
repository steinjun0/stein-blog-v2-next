import API from "API";
import { AxiosResponse, isAxiosError } from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function WorkPage() {
    const router = useRouter()
    const [post, setPost] = useState<{ title: string, subtitle: string, body: string, created_at: Date, updated_at: Date }>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [md, setMd] = useState<string>()

    useEffect(() => {
        if (router.isReady) {
            (async () => {
                try {
                    const { data } = await API.getPost({ id: router.query.id });
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
        console.log('post12', post)
        if (post !== undefined) {
            setIsLoading(false)
        }
    }, [post])

    const koDtf = new Intl.DateTimeFormat("ko");

    return (
        <div className='flex flex-col w-full mt-10'>

            {!isLoading && <div className="flex-col">
                <div className="flex mb-2">
                    <span className="text-3xl font-bold">
                        {post!.title}
                    </span>
                </div>
                <div className="flex justify-between mb-3 items-end">
                    <div className="flex items-end">
                        <span className="mr-3">{post!.subtitle}</span>
                        <span className="text-sm mr-2 text-gray-700 font-light">{post!.created_at.toString()}</span>
                        <span className="text-sm text-gray-700 font-light">{post!.updated_at.toString()}</span>
                    </div>
                    <span className="text-sm">category</span>
                </div>
            </div>}
            <hr className="mb-7" />
            <div className="container">
                <MDEditor
                    value={md}
                    onChange={setMd}
                />
            </div>

            {!isLoading && <div className="wmde-markdown wmde-markdown-color" dangerouslySetInnerHTML={{ __html: post!.body }}></div>}
            {/* <MDEditor.Markdown source={md} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </div>
    );
}