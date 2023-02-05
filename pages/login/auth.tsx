import axios from "axios"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next/types"
import { useEffect } from "react"

declare global {
    interface Window {
        Kakao: any
    }
}

export default function auth() {
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            console.log(router.query)
            axios.post(`https://kauth.kakao.com/oauth/token`, null,
                {
                    params: {
                        grant_type: 'authorization_code',
                        client_id: 'd7a844464da45dc0b7775bc28d740477',
                        redirect_uri: 'http://localhost:3000/login/auth',
                        code: router.query.code
                    }
                }
            ).then((res) => {
                localStorage.setItem('access_token', res.data.access_token);
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init('1add2d01ae1a29668f10cd0d48ce63c5')
                }
                window.Kakao.Auth.setAccessToken(`${res.data.access_token}`);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                }).then((res: any) => {
                    console.log('/v2/user/me', res)
                    localStorage.setItem('nickname', res.properties.nickname)
                    localStorage.setItem('profile_image', res.properties.profile_image)
                    localStorage.setItem('thumbnail_image', res.properties.thumbnail_image)
                    localStorage.setItem('thumbnail_image', res.properties.thumbnail_image)
                    localStorage.setItem('id', res.id)
                })
                router.push('/')

            }).catch(() => {
                alert('Fail to get Kakao Access Token')
            })
        }
    }, [router.isReady])

    useEffect(() => {
        console.log('hi')
    }, [])


    return <div>

    </div>
}