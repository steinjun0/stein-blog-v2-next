import { uniqueColors } from "pages/village/square";
import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { ICharacterPos } from "./types";


export default function PawnCharacter(props: { pos: ICharacterPos, index: number; }) {
    const [pos, setPos] = useState<{ top: number, left: number; }>({ top: 0, left: 0 });

    useLayoutEffect(() => {
        setPos(props.pos);
    }, [props.pos]);


    return (
        <div style={{
            backgroundColor: uniqueColors[props.index], borderRadius: '100%', width: '60px', height: '60px',
            position: 'absolute',
            top: pos.top, left: pos.left,
            display: 'flex',
            justifyContent: 'center', alignItems: 'center',
        }}>
            <span>{props.index.toString()}</span>
        </div>
    );
}