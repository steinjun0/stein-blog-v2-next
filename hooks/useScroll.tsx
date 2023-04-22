import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function useScroll() {
    const [lastScrollTop, setLastScrollTop] = useState<number>(0);
    const [scrollY, setScrollY] = useState<number>(1);
    const [scrollX, setScrollX] = useState<number>(1);
    const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>();
    const [scrollPercentage, setScrollPercentage] = useState<number>(0);

    const listener = (e: Event) => {
        let h = document.documentElement, b = document.body;
        let percent = (h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight) * 100;
        const bodyOffset = document.body.getBoundingClientRect();
        if (bodyOffset) {
            setScrollY(-bodyOffset.top);
            setScrollX(bodyOffset.left);
            setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
            setLastScrollTop(-bodyOffset.top);
            setScrollPercentage(percent);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    });
    return {
        scrollY,
        scrollX,
        scrollDirection,
        scrollPercentage
    };
}