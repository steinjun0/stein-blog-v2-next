import { useEffect, useRef } from "react";

export default function IntersectionObserverComponent({
    onIntersect,
    observerOptions
}: {
    onIntersect: () => IntersectionObserverCallback;
    observerOptions: IntersectionObserverInit;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const observer = new IntersectionObserver(onIntersect(), observerOptions);
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    return <div ref={ref} />;
}

