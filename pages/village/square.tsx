import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import { MutableRefObject, Ref, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
interface IMessage { owner: string, value: string; }

interface ServerToClientEvents {
    message: ({ owner, value }: IMessage) => void;
}

interface ClientToServerEvents {
    message: (value: string) => void;
}

function useKeyStatus(): { code: KeyboardEvent["code"], isPress: boolean; } {
    const [keyStatus, setKeyStatus] = useState<{ code: KeyboardEvent["code"], isPress: boolean; }>({ code: '', isPress: false });
    function onKeyDown(e: KeyboardEvent) {
        console.log('e', e);
        setKeyStatus((prev) => {
            if (prev.code === e.code && prev.isPress === true) {
                return prev;
            }
            return { code: e.code, isPress: true };
        });
    }
    function onKeyUp(e: KeyboardEvent) {
        setKeyStatus({ code: e.code, isPress: false });
    }
    useEffect(() => {
        addEventListener('keydown', onKeyDown);
        addEventListener('keyup', onKeyUp);
        return () => {
            removeEventListener('keydown', onKeyDown);
            removeEventListener('keyup', onKeyUp);
        };
    }, []);
    return keyStatus;
}

type TCharacterCommand = "hold" | "up" | "left" | "down" | "right";

function useFrame(fps: number) {
    const [prevRenderedTime, setPrevRenderedTime] = useState<number>(Date.now());
    useEffect(() => {
        requestAnimationFrame(animate);
    }, []);
    function animate() {
        const now = Date.now();
        if ((now - prevRenderedTime) > (1000 / fps)) {
            setPrevRenderedTime(now);
        }
        requestAnimationFrame(animate);
    }


    // useEffect(() => {
    //     const now = Date.now();
    //     if ((now - prevRenderedTime) > (1000 / fps)) {
    //         setPrevRenderedTime(now);
    //     }
    // });
    return prevRenderedTime;
}

function Character(props: { commands: Set<TCharacterCommand>; }) {
    interface characterPos { top: number, left: number; }
    const [pos, setPos] = useState<{ top: number, left: number; }>({ top: 0, left: 0 });
    const renderingTiming = useFrame(60);
    const speed = 5;
    useLayoutEffect(() => {
        for (const command of props.commands) {
            switch (command) {
                case 'hold':
                    setPos((prev: characterPos) => {
                        return {
                            top: prev.top,
                            left: prev.left,
                        };
                    });
                    break;
                case 'up':
                    setPos((prev: characterPos) => {
                        return {
                            top: Math.max(prev.top - speed, 0),
                            left: prev.left
                        };
                    });
                    break;
                case 'left':
                    setPos((prev: characterPos) => {
                        return {
                            top: prev.top,
                            left: Math.max(prev.left - speed, 0),
                        };
                    });
                    break;
                case 'down':
                    setPos((prev: characterPos) => {
                        return {
                            top: Math.max(prev.top + speed, 0),
                            left: prev.left
                        };
                    });
                    break;
                case 'right':
                    setPos((prev: characterPos) => {
                        return {
                            top: prev.top,
                            left: Math.max(prev.left + speed, 0),
                        };
                    });
                    break;

            }
        }

    }, [renderingTiming]);
    return (
        <div style={{
            backgroundColor: "white", borderRadius: '100%', width: '40px', height: '40px',
            position: 'relative',
            top: pos.top, left: pos.left
        }}>

        </div>
    );
}

function GameScreen() {
    const inputKeyStatus: { code: KeyboardEvent["code"], isPress: boolean; } = useKeyStatus();
    const [characterCommands, setCharacterCommands] = useState<Set<TCharacterCommand>>(new Set(['hold']));
    const characterCommandsTemp = useRef<Set<TCharacterCommand>>(new Set(['hold']));
    useEffect(() => {
        if (inputKeyStatus.isPress) {
            characterCommandsTemp.current.delete('hold');
            switch (inputKeyStatus.code) {
                case 'KeyW':
                    characterCommandsTemp.current.add('up');
                    break;
                case 'KeyA':
                    characterCommandsTemp.current.add('left');
                    break;
                case 'KeyS':
                    characterCommandsTemp.current.add('down');
                    break;
                case 'KeyD':
                    characterCommandsTemp.current.add('right');
                    break;
            }
        } else {
            switch (inputKeyStatus.code) {
                case 'KeyW':
                    characterCommandsTemp.current.delete('up');
                    break;
                case 'KeyA':
                    characterCommandsTemp.current.delete('left');
                    break;
                case 'KeyS':
                    characterCommandsTemp.current.delete('down');
                    break;
                case 'KeyD':
                    characterCommandsTemp.current.delete('right');
                    break;
            }
            if (characterCommandsTemp.current.size === 0) {
                characterCommandsTemp.current.add('hold');
            }
        }
        setCharacterCommands(characterCommandsTemp.current);
    }, [inputKeyStatus]);
    return (
        <div className="w-full h-full bg-orange-200">
            <Character commands={characterCommands} />
        </div>
    );
}

function ChatBlock(props: { socketRef: MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents> | undefined>; }) {
    const [messageInput, setMessageInput] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const chatDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        props.socketRef.current = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string);
        props.socketRef.current.on("message", (message: IMessage) => {
            setMessages((prev) => [...prev, message]);
        });
        return () => {
            props.socketRef.current && props.socketRef.current.close();
        };
    }, []);

    useEffect(() => {
        chatDivRef.current?.scrollTo(0, chatDivRef.current.scrollHeight);
    }, [messages]);


    return (
        <>
            <div
                className="h-72 max-h-72 overflow-scroll p-4 rounded-md"
                style={{
                    backgroundColor: isOpenChat ? '#222' : '#2224',
                }}
                ref={chatDivRef}
            >
                {messages.map((e, i) => <div key={i}>
                    <span className="text-cyan-300">{e.owner}</span>&nbsp;<span className="text-white">{e.value}</span>
                </div>)}
            </div>

            <TextField
                className="w-full"
                style={{
                    backgroundColor: isOpenChat ? '#ffff' : '#eee4',
                }}
                onChange={(e) => {
                    setMessageInput(e.target.value);
                }}
                onFocus={() => {
                    setIsOpenChat(true);
                }}
                onBlur={() => {
                    setIsOpenChat(false);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13 && messageInput.replace(/ /g, '') !== '' && props.socketRef.current) {
                        e.preventDefault();
                        props.socketRef.current!.emit('message', messageInput);
                        setMessageInput('');
                    }
                }}
                value={messageInput}
            >
            </TextField>
        </>
    );
}

export default function Square() {
    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const router = useRouter();
    const [gameScreenHeight, setGameScreenHeight] = useState<number | undefined>();
    useEffect(() => {
        setGameScreenHeight(document.documentElement.clientWidth);
    }, []);
    return (
        <div
            className="flex flex-col justify-end items-center"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                alignItems: 'center',
                minHeight: 'calc(100vh - 80px)',
                minWidth: gameScreenHeight
            }}
        >

            <GameScreen />
            <div className="fixed w-96">
                <ChatBlock socketRef={socketRef} />
            </div>

        </div>
    );
}