import { useEffect, useState } from "react";

export default function useFrame(fps: number) {
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
    return prevRenderedTime;
}