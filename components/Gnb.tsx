import { Logout } from "@mui/icons-material";
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { styled } from "@mui/system";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";

const Nav = styled('nav')((props) => (
    {
        maxWidth: '1240px',
        marginLeft: '0',
        [props.theme.breakpoints.up(1240)]: {
            marginLeft: 'calc(50vw - 620px)',
        }
    }
))

function useScroll() {
    const [scroll, setScroll] = useState<{
        x: number,
        y: number,
    }>();
    function onScroll() {
        setScroll({
            x: window.scrollX,
            y: window.scrollY,
        })
    }
    useEffect(() => {
        if (window) {
            window.addEventListener('scroll', onScroll)
        }
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])
    return scroll
}

export default function Gnb() {
    const router = useRouter()
    const scroll = useScroll()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [isLogined, setIsLogined] = useState<boolean>(false)
    const [nickname, setNickname] = useState<string>('')

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function onClickLogout() {
        ['id', 'nickname', 'profile_image', 'access_token', 'thumbnail_image'].forEach((e: string) => localStorage.removeItem(e))
        setIsLogined(false)
        router.reload()
    }

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('1add2d01ae1a29668f10cd0d48ce63c5')
        }
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            window.Kakao.Auth.setAccessToken(accessToken)
            axios.get('https://kapi.kakao.com/v1/user/access_token_info', { headers: { Authorization: `Bearer ${accessToken}` } })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLogined(true)
                    }
                }).catch((error) => {
                    console.log('res.status', error.response)
                    if (error.response.status === 401) {
                        ['id', 'access_token', 'nickname', 'profile_image', 'thumbnail_image']
                            .forEach((e) => { localStorage.removeItem(e) })
                        Swal.fire({
                            title: '로그인 안내',
                            text: '카카오 로그인이 만료되었어요! 로그인이 필요한 서비스를 이용하시려면 다시 로그인 해주세요!',
                            icon: 'info',
                            color: 'black',
                            confirmButtonColor: 'black',
                            iconColor: 'black'
                        })
                    } else if (error.response.status === 400) {
                        if (error.response.data.code === -1) {
                            alert('카카오 플랫폼 서비스의 일시적 내부 장애 상태 입니다. 잠시 뒤에 다시 시도해주세요.')
                        } else if (error.response.data.code === -2) {
                            alert(`필수 인자가 포함되지 않은 경우나 호출 인자값의 데이터 타입이 적절하지 않거나 허용된 범위를 벗어난 경우
                요청 시 주어진 액세스 토큰 정보가 잘못된 형식인 경우로 올바른 형식으로 요청했는지 확인. code: -2`)
                        }
                    } else {
                        alert('unknown error')
                    }
                })
        }
    }, [router.asPath])

    useEffect(() => {
        if (scroll) {
            if (scroll.x >= 30) {

            }
        }
    }, [scroll])



    return <Nav
        className='flex md:py-4 xl:px-0 xs:p-4 p-4 justify-between items-end bg-white fixed top-0 left-0 w-screen z-10'
        style={{
            borderBottom: (router.asPath !== '/' && (scroll && scroll.y >= 30)) ? '1px solid #e5e7eb' : '1px solid transparent',
            transition: 'border-bottom ease 0.5s'
        }}>
        <Link href={'/'}>
            <div className='flex items-end justify-between'>
                <p className='text-3xl' style={{ fontWeight: 700 }}>stein</p>
                {/* <Image style={{ margin: '0 0px 4px 8px', }} src={'/stein-logo.svg'} alt={'logo'} width={24} height={24}></Image> */}
            </div>
        </Link>
        {isLogined
            ?
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar
                    sx={{ width: 36, height: 36, border: '1px solid gray' }}
                    src={localStorage.getItem('thumbnail_image')!}
                >
                    {localStorage.getItem('nickname') !== null && localStorage.getItem('nickname')![0]}
                </Avatar>
            </IconButton> :
            <Button style={{ height: 36 }}
                color='primary'
                variant='outlined'
                onClick={() => { router.push('/login') }}>
                Login
            </Button>
        }
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={() => {
                handleClose();
                onClickLogout()
            }}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    </Nav >
}