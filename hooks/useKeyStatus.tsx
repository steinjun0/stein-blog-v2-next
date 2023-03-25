import { useState, useEffect } from "react";

export default function useKeyStatus(): { code: KeyboardEvent["code"], isPress: boolean; } {
    const [keyStatus, setKeyStatus] = useState<{ code: KeyboardEvent["code"], isPress: boolean; }>({ code: '', isPress: false });
    function onKeyDown(e: KeyboardEvent) {
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