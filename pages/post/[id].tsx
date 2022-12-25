import API from "API";
import { AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WorkPage() {
    const router = useRouter()
    const [post, setPost] = useState<{ title: string, subtitle: string, body: string, created_at: Date, updated_at: Date }>()


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
    // useEffect(() => {
    //     (async ()=>{
    //         if (router.isReady) {
    //             try {

    //             const { data } = await API.getPost({ id: router.query.id });
    //             user = data.userDetails;
    //           } catch (error) {
    //             if (axios.isAxiosError(error)) {
    //               handleAxiosError(error);
    //             } else {
    //               handleUnexpectedError(error);
    //             }
    //           }        
    //         }
    //     })

    //         API.getPost({ id: router.query.id }).then((res) => {
    //             if (res.status === 200) {

    //             }
    //             console.log(res)
    //         })
    //     }
    // }, [router.isReady])

    return (
        <div className='flex flex-col w-full mt-10'>
            <div className="flex-col">
                <div className="flex mb-2">
                    <span className="text-5xl">
                        {post?.title}
                    </span>
                </div>
                <div className="flex justify-between mb-3">
                    <div className="flex items-end">
                        <span className="text-lg mr-3">{post?.subtitle}</span>
                        <span className="mr-2 text-gray-700">{post?.created_at.toString()}</span>
                        <span className="text-gray-700">{post?.updated_at.toString()}</span>
                    </div>
                    <span>category</span>
                </div>
            </div>
            <hr className="mb-7" />
            <div>{post?.body}</div>
        </div>
    );
}