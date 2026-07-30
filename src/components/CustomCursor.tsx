"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        // Advanced cursor tracking without react state lag using native css vars for 60fps
        const handleMouseMove = (e: MouseEvent) => {
            document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
        };

        const handleMouseLeave = () => setHidden(true);
        const handleMouseEnter = () => setHidden(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 pointer-events-none z-[10000] w-6 h-6 transition-opacity duration-150 ${hidden ? 'opacity-0' : 'opacity-100'}`}
            style={{
                transform: `translate3d(calc(var(--cursor-x) - 12px), calc(var(--cursor-y) - 12px), 0)`,
                willChange: 'transform'
            }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white_clinical opacity-80 drop-shadow-md">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <circle cx="12" cy="12" r="4"></circle>
            </svg>
        </div>
    );
}
