import API from "API";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function WorkPage() {
    const router = useRouter()
    const [post, setPost] = useState<{ title: string, subtitle: string, body: string, created_at: Date, updated_at: Date }>()
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        if (router.isReady) {
            (async () => {
                try {
                    const { data } = await API.getPost({ id: Number(router.query.id) });
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
                <div className="flex mb-2 justify-between items-end">
                    <span className="text-3xl font-bold">
                        {post!.title}
                    </span>
                    <span className="text-sm">category</span>
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

            {!isLoading && <div className="wmde-markdown wmde-markdown-color" dangerouslySetInnerHTML={{ __html: post!.body }}></div>}
            {/* <MDEditor.Markdown source={md} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </div>
    );
}