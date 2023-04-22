import { Button } from "@mui/material";
import { useEffect } from "react";


export default function Login() {

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('1add2d01ae1a29668f10cd0d48ce63c5');
        }
    }, []);


    function onClickLogin() {
        if (window.Kakao.isInitialized()) {
            const authRes = window.Kakao.Auth.authorize({
                redirectUri: `${process.env.NEXT_PUBLIC_HOST}/login/auth`,
                scope: 'profile_nickname,profile_image'
            });
        }

    }

    return (<div className="flex flex-col justify-center" style={{ height: 'calc(100vh - 148px)' }}>

        <div style={{ width: '242px' }}>
            <Button
                sx={{
                    backgroundImage: `url(//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg) !important`,
                    backgroundSize: '242px',
                    height: 52.47
                }}
                onClick={onClickLogin}
                fullWidth
            />
        </div>

    </div>);
}