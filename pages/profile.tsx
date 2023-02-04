import { Button, Icon, IconButton } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import Swal from "sweetalert2";

export default function Profile() {

    const cardRef = useRef<HTMLDivElement>(null)
    const accXRef = useRef<number>(0)
    const accYRef = useRef<number>(0)

    const isStopAnimationRef = useRef<boolean>(true)
    const [isStopButtonState, setIsStopButtonState] = useState<boolean>(true)
    function moveCard() {
        if (cardRef.current) {
            const cardStyle = cardRef.current!.style
            const maxLeft = window.innerWidth - 277
            const maxTop = window.innerHeight - 120
            const presentLeft = cardStyle.left === '' ? 0 : +cardStyle.left.split('px')[0]
            const presentTop = cardStyle.top === '' ? 0 : +cardStyle.top.split('px')[0]
            if (accXRef.current !== null) {
                const nextLeft = presentLeft + (accXRef.current * 0.3)
                if (nextLeft <= 0) {
                    cardStyle.left = '0px'
                } else if (nextLeft >= maxLeft) {
                    cardStyle.left = `${maxLeft}px`
                } else {
                    cardStyle.left = `${nextLeft}px`
                }
            }
            if (accYRef.current !== null) {
                const nextTop = presentTop + (accYRef.current * 0.3)
                console.log('nextTop', nextTop, 'maxTop', maxTop)
                if (nextTop <= 0) {
                    cardStyle.top = '0px'
                } else if (nextTop >= maxTop) {
                    cardStyle.top = `${maxTop}px`
                } else {
                    cardStyle.top = `${nextTop}px`
                }
            }
            if (!isStopAnimationRef.current) {
                window.requestAnimationFrame(moveCard)
            }
        }

    }

    function catchDevOrientEvent(event: DeviceOrientationEvent) {
        accXRef.current = event.gamma ?? 0
        accYRef.current = event.beta ?? 0
    }
    function catchDevMotionEvent(event: DeviceMotionEvent) {
        accXRef.current = event.acceleration!.x! * 2 ?? 0
        accYRef.current = event.acceleration!.y! * 2 ?? 0
    }

    function requestPermission() {
        if ((window.DeviceOrientationEvent as any).requestPermission) {
            try {
                (window.DeviceOrientationEvent as any).requestPermission()
            } catch {
                (window.DeviceOrientationEvent as any).requestPermission()
                    .then((response: any) => {
                        if (response == 'granted') {
                            window.addEventListener('deviceorientation', (e) => {
                                window.addEventListener("deviceorientation", catchDevOrientEvent, true);
                            })
                        }
                    })
                    .catch(console.error)
            }
        }
    }

    useEffect(() => {
        if (cardRef) {
            if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", catchDevOrientEvent, true);
            } else if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', catchDevMotionEvent, true);
            } else {
                alert('not supported gyro')
            }
            cardRef.current!.style.left = `${(window.innerWidth - 277) / 2}px`
            cardRef.current!.style.top = `${((window.innerHeight - 120) / 2) - 120}px`

        }

        return () => {
            window.removeEventListener('deviceorientation', catchDevOrientEvent)
            window.removeEventListener('devicemotion', catchDevMotionEvent)
        }
    }, [cardRef])

    return (
        <main className="flex flex-col justify-center items-center" style={{ height: 'calc(100vh - 68px)', marginBottom: -80 }}>
            <div
                className="text-lg p-4 border-black border-2"
                style={{
                    position: 'fixed', zIndex: 2, backgroundColor: 'white',
                    width: '277px', height: '120px',
                    transition: 'left ease 0.1s, top ease 0.1s'
                }}
                ref={cardRef}>
                <div className="flex items-center">
                    <img src="/images/icons/github.png" alt="github" style={{ objectFit: 'contain', width: '12px', marginRight: '4px', marginTop: '2px' }} />
                    <a href="https://github.com/steinjun0" className="underline">steinjun0</a>
                </div>
                <div className="flex items-center">
                    <img src="/images/icons/insta.png" alt="insta" style={{ objectFit: 'contain', width: '12px', marginRight: '4px', marginTop: '2px' }} />
                    <a href="https://www.instagram.com/junyoungseok/" className="underline">junyoungseok</a>
                </div>
                <div className="flex items-center">
                    <img src="/images/icons/mail.png" alt="mail" style={{ objectFit: 'contain', width: '12px', marginRight: '4px', marginTop: '2px' }} />
                    junyoung4737@gmail.com
                </div>
            </div>
            <ScreenRotationIcon />

            <IconButton
                sx={{
                    color: 'black', boxShadow: 'none', border: '0px solid black',
                    height: 100, width: 100,
                    zIndex: 1, backgroundColor: 'white !important',
                    '&>*': {
                        fontSize: '70px',
                    }
                }}
                onClick={() => {
                    isStopAnimationRef.current = !isStopAnimationRef.current
                    if (isStopButtonState === true) {
                        requestPermission()
                        window.requestAnimationFrame(moveCard)
                    }
                    setIsStopButtonState(!isStopButtonState)
                }}
            >
                {isStopButtonState ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
            </IconButton>


        </main >
    )
}