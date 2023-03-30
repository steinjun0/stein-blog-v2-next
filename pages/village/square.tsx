import ChatBlock from "components/game/ChatBlock";
import MainCharacter from "components/game/MainCharacter";
import PawnCharacter from "components/game/PawnCharacter";
import { ClientToServerEvents, ICharacterPos, IMessage, ServerToClientEvents, TCharacterCommand } from "components/game/types";
import useKeyStatus from "hooks/useKeyStatus";
import { useRouter } from "next/router";
import { createContext, MutableRefObject, Ref, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


function convertKeyCodeToCommand(code: KeyboardEvent["code"]): TCharacterCommand {
    switch (code) {
        case 'KeyW':
            return 'up';
        case 'KeyA':
            return 'left';
        case 'KeyS':
            return 'down';
        case 'KeyD':
            return 'right';
        default:
            return 'hold';
    }
}

function GameScreen() {
    const inputKeyStatus: { code: KeyboardEvent["code"], isPress: boolean; } = useKeyStatus();
    const [characterCommands, setCharacterCommands] = useState<Set<TCharacterCommand>>(new Set(['hold']));
    const characterCommandsTemp = useRef<Set<TCharacterCommand>>(new Set(['hold']));
    const router = useRouter();
    const [isClient, setIsClient] = useState<boolean>(false);

    const [pawnPositions, setPawnPositions] = useState<ICharacterPos[]>([]);
    useEffect(() => {
        if (router.isReady) {
            setIsClient(true);
        }
    }, [router]);
    const socket = useContext(SocketContext);
    socket?.on("pos", (positions: string) => {
        setPawnPositions(JSON.parse(positions).map((e: string) => JSON.parse(e)));
    });

    useEffect(() => {
        if (inputKeyStatus.isPress) {
            characterCommandsTemp.current.delete('hold');
            characterCommandsTemp.current.add(convertKeyCodeToCommand(inputKeyStatus.code));

        } else {
            characterCommandsTemp.current.delete(convertKeyCodeToCommand(inputKeyStatus.code));
            if (characterCommandsTemp.current.size === 0) {
                characterCommandsTemp.current.add('hold');
            }
        }
        setCharacterCommands(characterCommandsTemp.current);
    }, [inputKeyStatus]);
    return (
        <div className="w-full h-full bg-[#FFF0E6] relative">
            {pawnPositions.map((pos, index) => {
                return <PawnCharacter key={index} pos={pos} index={index} />;
            })}
            {isClient && <MainCharacter commands={characterCommands} />}
        </div>
    );
}


export const SocketContext = createContext<Socket<ServerToClientEvents, ClientToServerEvents> | undefined | null>(null);

export const uniqueColors = ['#FFA07A', '#8BAAFF', '#8BAA8B', '#FFD700'];
export default function Square() {
    // const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const [gameScreenHeight, setGameScreenHeight] = useState<number | undefined>();

    useEffect(() => {
        setGameScreenHeight(document.documentElement.clientWidth);
        console.log('connect');
        setSocket(io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string));
        return () => {
            console.log('disconnect');
            socket?.disconnect();
            socket?.close();
        };
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
            <SocketContext.Provider value={socket}>
                <GameScreen />
                <div className="fixed w-96">
                    <ChatBlock />
                </div>
            </SocketContext.Provider>
        </div>
    );
}