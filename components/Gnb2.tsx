import { Logout } from "@mui/icons-material";
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { styled } from "@mui/system";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import API from "API";

const NavContainer = styled('div')((props) => (
    {
        maxWidth: '1240px',
        marginLeft: '0',
        [props.theme.breakpoints.up(1240)]: {
            marginLeft: 'calc(50vw - 620px)',
        }
    }
))

const NeuroButton = styled('button')(() => (
    {
        height: 36, padding: '6px 10px 10px 10px', border: 0, backgroundColor: '#f0f0f0',
        boxShadow: '5px 5px 10px #ccc, -5px -5px 15px #fff, inset 5px 5px 10px #f0f0f0, inset -5px -5px 15px #f0f0f0',
        marginTop: '-10px',
        transition: 'all 0.1s ease',
        borderRadius: '12px',
        ':active': {
            boxShadow: '5px 5px 10px #f0f0f0, -5px -5px 15px #f0f0f0, inset 5px 5px 10px #ccc, inset -5px -5px 15px #f0f0f0'
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
    const [userData, setUserData] = useState<any>({ id: -1 })
    const open = Boolean(anchorEl);

    const [isLogined, setIsLogined] = useState<boolean>(false)

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
        if (router.isReady) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init('1add2d01ae1a29668f10cd0d48ce63c5')
            }
            const accessToken = localStorage.getItem('access_token')
            if (accessToken) {
                window.Kakao.Auth.setAccessToken(accessToken)
                axios.get('https://kapi.kakao.com/v1/user/access_token_info', { headers: { Authorization: `Bearer ${accessToken}` } })
                    .then((res) => {
                        if (res.status === 200) {
                            setUserData({ 'id': localStorage.getItem('id') ? +localStorage.getItem('id')! : -1 })
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

            const adminUrlList = ['/post/edit/[id]']
            if (adminUrlList.includes(router.pathname)) {
                if (accessToken) {
                    window.Kakao.Auth.setAccessToken(`${accessToken}`);
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                    }).then((res: any) => {
                        localStorage.setItem('nickname', res.properties.nickname)
                        localStorage.setItem('profile_image', res.properties.profile_image)
                        localStorage.setItem('thumbnail_image', res.properties.thumbnail_image)
                        localStorage.setItem('thumbnail_image', res.properties.thumbnail_image)
                        localStorage.setItem('id', res.id)
                        API.getIsAdmin({ accessToken }).then((res) => {
                            if (res.data !== true) {
                                Swal.fire({
                                    title: '허가되지 않은 사용자',
                                    text: '여긴 허가된 사용자만 접속할 수 있는 uri입니다',
                                    icon: 'warning',
                                    color: 'black',
                                    confirmButtonColor: 'black',
                                    iconColor: 'black'
                                }).then(() => {
                                    router.push('/')
                                })
                            }
                        }).catch(() => {
                            router.push('/')
                            Swal.fire({
                                title: '허가되지 않은 사용자',
                                text: '네트워크 오류로 인증에 실패했습니다.',
                                icon: 'warning',
                                color: 'black',
                                confirmButtonColor: 'black',
                                iconColor: 'black'
                            })
                        })

                    })
                } else {
                    router.push('/')
                    Swal.fire({
                        title: '허가되지 않은 사용자',
                        text: '여긴 허가된 사용자만 접속할 수 있는 uri입니다',
                        icon: 'warning',
                        color: 'black',
                        confirmButtonColor: 'black',
                        iconColor: 'black'
                    })
                }
            }
        }

    }, [router.asPath, router.isReady])



    // fixed top-0 left-0 w-screen z-10
    return <nav className=""
        style={{
            // paddingBottom: 6,
            // boxShadow: '0px 50px 50px #f0f0f0',
            // backgroundColor: '#e0e0e0',
        }}
    >
        <NavContainer
            className='flex md:py-4 xl:px-0 xs:p-4 p-4 justify-between items-end'
        // style={{
        //     borderBottom: (router.asPath !== '/' && (scroll && scroll.y >= 30)) ? '1px solid #e5e7eb' : '1px solid transparent',
        //     transition: 'border-bottom ease 0.5s'
        // }}
        >
            <Link href={'/'}>
                <div className='flex items-end justify-between rounded-xl'
                    style={{
                        filter: 'drop-shadow(5px 5px 5px #aaa) drop-shadow(-5px -5px 5px #fff)',
                        backgroundColor: '#f0f0f0',
                        padding: 5
                    }}
                >
                    <p className='text-3xl'
                        style={{
                            fontWeight: 700,
                        }}>stein</p>
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
                <NeuroButton
                    type="button"

                    onClick={() => {
                        // router.push('/login')
                    }}>
                    Login
                </NeuroButton>
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
                {userData.id === 2651014525 &&
                    [{ icon: <SignalCellularAltRoundedIcon fontSize="small" />, title: 'Google Anaylytics', link: "https://analytics.google.com/analytics/web/#/p353329117/reports/intelligenthome" },
                    { icon: <DataUsageIcon fontSize="small" />, title: 'Google Search', link: "https://search.google.com/search-console?resource_id=https%3A%2F%2Fblog.steinjun.net%2F" }
                    ].map((e, i) => {
                        return <MenuItem key={i} onClick={() => {
                            window.open(e.link, '_blank')
                            handleClose();
                        }}>
                            <ListItemIcon>
                                {e.icon}
                            </ListItemIcon>
                            {e.title}
                        </MenuItem>
                    })
                }
                {userData.id === 2651014525 &&
                    <hr></hr>
                }
                <MenuItem
                    onClick={() => {
                        handleClose();
                        onClickLogout()
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </NavContainer >
    </nav>
}