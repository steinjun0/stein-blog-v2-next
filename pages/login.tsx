import { Button } from "@mui/material";
import { signIn } from "next-auth/react";


export default function Login() {
    function onClickLogin() {
        console.log('history', history);
        signIn('kakao');

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