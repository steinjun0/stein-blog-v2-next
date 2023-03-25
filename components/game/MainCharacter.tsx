import useFrame from "hooks/useFrame";
import { SocketContext } from "pages/village/square";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ICharacterPos, TCharacterCommand } from "./types";

export default function MainCharacter(props: { commands: Set<TCharacterCommand>; }) {
    const [pos, setPos] = useState<ICharacterPos>({ top: 0, left: 0 });
    const renderingTiming = useFrame(60);
    const speed = 5;
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket?.emit("pos", JSON.stringify(pos));
    }, [pos]);

    useLayoutEffect(() => {
        for (const command of props.commands) {
            switch (command) {
                case 'hold':
                    break;
                case 'up':
                    setPos((prev: ICharacterPos) => {
                        return {
                            top: Math.max(prev.top - speed, 0),
                            left: prev.left
                        };
                    });
                    break;
                case 'left':
                    setPos((prev: ICharacterPos) => {
                        return {
                            top: prev.top,
                            left: Math.max(prev.left - speed, 0),
                        };
                    });
                    break;
                case 'down':
                    setPos((prev: ICharacterPos) => {
                        return {
                            top: Math.max(prev.top + speed, 0),
                            left: prev.left
                        };
                    });
                    break;
                case 'right':
                    setPos((prev: ICharacterPos) => {
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
            backgroundColor: "#00FFFF", borderRadius: '100%', width: '60px', height: '60px',
            position: 'absolute',
            top: pos.top, left: pos.left
        }}>

        </div>
    );
}