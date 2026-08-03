"use client";

import React, { useEffect, useRef } from "react";

const WAV_FILENAMES = [
    "DSP", "ML", "FFT", "TENSOR", "NODE", "BUF", "C++", "PY", "WAV", "01", "10", "AI", "SYS", "CORE",
];

interface Particle {
    baseOriginX: number;
    baseOriginY: number;
    originX: number;
    originY: number;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;
    originScale: number;
    targetScale: number;
    scale: number;
    x: number;
    y: number;
    canvasIndex: number;
    jitterOffset: number;
}

export function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    // Scroll state
    const scrollProgressRef = useRef(0);

    // Interaction state
    const mouseRef = useRef({ x: -1000, y: -1000 });

    // Core physics structures
    const particlesRef = useRef<Particle[]>([]);
    const cachedTextsRef = useRef<HTMLCanvasElement[]>([]);

    // Prepare text sprites
    useEffect(() => {
        if (typeof window === "undefined") return;

        const cache = WAV_FILENAMES.map((text) => {
            const c = document.createElement("canvas");
            const ctx = c.getContext("2d")!;
            ctx.font = "12px monospace";
            const w = ctx.measureText(text).width;
            c.width = w + 4;
            c.height = 16;
            ctx.font = "12px monospace";
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.fillText(text, 0, 12);
            return c;
        });
        cachedTextsRef.current = cache;
    }, []);

    // Main system initialization
    useEffect(() => {
        if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        canvas.width = w;
        canvas.height = h;

        const initSystem = async () => {
            await document.fonts.ready;

            const maskCanvas = document.createElement("canvas");
            maskCanvas.width = w;
            maskCanvas.height = h;
            const mctx = maskCanvas.getContext("2d")!;
            mctx.fillStyle = "white";
            mctx.textAlign = "center";
            mctx.textBaseline = "middle";

            const isMobile = w <= 768;
            const fontSize = w > 1024 ? 100 : w > 768 ? 70 : Math.max(36, Math.min(54, w / 7.2));
            mctx.font = `bold ${fontSize}px monospace`;

            const lines = ["DIEGO CHAVEZ", "ML DSP ENG", "PORTFOLIO"];
            const lineHeight = fontSize * 1.1;

            lines.forEach((line, i) => {
                mctx.fillText(line, w / 2, h / 2 + (i - 1) * lineHeight);
            });

            const imageData = mctx.getImageData(0, 0, w, h).data;
            const step = isMobile ? 4 : 7;
            const targets: { x: number, y: number }[] = [];

            for (let y = 0; y < h; y += step) {
                for (let x = 0; x < w; x += step) {
                    const alpha = imageData[(y * w + x) * 4 + 3];
                    if (alpha > 128) {
                        targets.push({ x: x, y: y });
                    }
                }
            }

            targets.sort(() => Math.random() - 0.5);

            const pArray: Particle[] = [];
            const targetScale = isMobile ? (fontSize / 100) * 0.28 : (fontSize / 100) * 0.31;
            for (let i = 0; i < targets.length; i++) {
                const rx = Math.random() * w;
                const ry = Math.random() * h;
                pArray.push({
                    baseOriginX: rx,
                    baseOriginY: ry,
                    originX: rx,
                    originY: ry,
                    targetX: targets[i].x,
                    targetY: targets[i].y,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    originScale: 0.8 + Math.random() * 0.4,
                    targetScale: targetScale,
                    scale: 1,
                    x: rx,
                    y: ry,
                    canvasIndex: Math.floor(Math.random() * cachedTextsRef.current.length),
                    jitterOffset: Math.random() * Math.PI * 2
                });
            }

            particlesRef.current = pArray;
        };

        initSystem();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // maxScroll is the amount we can scroll while container is over the viewport
            const maxScroll = rect.height - window.innerHeight;
            const scrolled = -rect.top;
            
            let progress = scrolled / maxScroll;
            progress = Math.max(0, Math.min(1, progress));
            scrollProgressRef.current = progress;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false })!;

        let time = 0;
        let smoothProgress = scrollProgressRef.current; // start where we are

        const loop = () => {
            time += 0.016;
            
            // Smoothly interpolate towards the target scroll progress
            smoothProgress += (scrollProgressRef.current - smoothProgress) * 0.08;
            
            if (indicatorRef.current) {
                indicatorRef.current.style.opacity = smoothProgress > 0.8 ? `${(1 - smoothProgress) * 5}` : "0.7";
            }

            const w = canvas.width;
            const h = canvas.height;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const particles = particlesRef.current;
            const sprites = cachedTextsRef.current;

            ctx.clearRect(0, 0, w, h);

            // Calculate ease for particle interpolation (smoothstep)
            const ease = smoothProgress * smoothProgress * (3 - 2 * smoothProgress);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Wander physics for the origin
                const dx = mx - p.originX;
                const dy = my - p.originY;
                const distSq = dx * dx + dy * dy;

                if (distSq < 40000) { 
                    const force = 40000 / (distSq + 1000);
                    p.vx -= (dx / Math.sqrt(distSq)) * force * 0.05;
                    p.vy -= (dy / Math.sqrt(distSq)) * force * 0.05;
                }

                p.vx += (p.baseOriginX - p.originX) * 0.0005;
                p.vy += (p.baseOriginY - p.originY) * 0.0005;
                p.vx *= 0.95;
                p.vy *= 0.95;
                p.originX += p.vx;
                p.originY += p.vy;

                let targetX = p.targetX;
                let targetY = p.targetY;

                // Add jitter when fully formed
                if (ease > 0.95) {
                    const jitterAmt = (ease - 0.95) * 20; // scales 0 to 1
                    targetX += Math.sin(time * 10 + p.jitterOffset) * 0.3 * jitterAmt;
                    targetY += Math.cos(time * 12 + p.jitterOffset) * 0.3 * jitterAmt;
                }

                // Interpolate based on scroll ease
                p.x = p.originX + (targetX - p.originX) * ease;
                p.y = p.originY + (targetY - p.originY) * ease;
                p.scale = p.originScale + (p.targetScale - p.originScale) * ease;

                const sprite = sprites[p.canvasIndex];
                if (sprite) {
                    const sw = sprite.width * p.scale;
                    const sh = sprite.height * p.scale;
                    ctx.drawImage(sprite, p.x - sw / 2, p.y - sh / 2, sw, sh);
                }
            }

            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[300vh] relative bg-transparent">
            {/* Sticky wrapper to keep canvas in view while scrolling through the 300vh */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center pointer-events-none">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-difference" />
            </div>
            
            {/* Scroll Indicator */}
            <div ref={indicatorRef} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 mix-blend-difference pointer-events-none transition-opacity duration-75">
                <span className="text-white_clinical text-[10px] font-mono uppercase tracking-[0.2em]">Scroll to Initialize</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white_clinical to-transparent animate-pulse" />
            </div>
        </div>
    );
}

