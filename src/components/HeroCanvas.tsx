"use client";

import React, { useEffect, useRef, useState } from "react";

const WAV_FILENAMES = [
    "DSP",
    "ML",
    "FFT",
    "TENSOR",
    "NODE",
    "BUF",
    "C++",
    "PY",
    "WAV",
    "01",
    "10",
    "AI",
    "SYS",
    "CORE",
];

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;
    canvasIndex: number;
    scale: number;
    targetScale: number;
    jitterOffset: number;
}

export function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<"loading" | "scattered" | "collapsing" | "resolved">("loading");
    const [progress, setProgress] = useState(0);
    const requestRef = useRef<number>();

    // Interaction state
    const mouseRef = useRef({ x: -1000, y: -1000 });

    // Core physics structures
    const particlesRef = useRef<Particle[]>([]);
    const cachedTextsRef = useRef<HTMLCanvasElement[]>([]);

    // Prepare text sprites
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Cache the strings into tiny offscreen canvases to heavily optimize drawImage
        const cache = WAV_FILENAMES.map((text) => {
            const c = document.createElement("canvas");
            const ctx = c.getContext("2d")!;
            ctx.font = "12px monospace";
            const w = ctx.measureText(text).width;
            c.width = w + 4;
            c.height = 16;
            ctx.font = "12px monospace";
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)"; // Brighter white for crisp look
            ctx.fillText(text, 0, 12);
            return c;
        });
        cachedTextsRef.current = cache;
    }, []);

    // Main system initialization
    useEffect(() => {
        if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;

        const canvas = canvasRef.current;
        canvas.width = w;
        canvas.height = h;

        const initSystem = async () => {
            // Wait for fonts to be ready so our text extraction mask is accurate
            await document.fonts.ready;

            // 1. Generate text mask
            const maskCanvas = document.createElement("canvas");
            maskCanvas.width = w;
            maskCanvas.height = h;
            const mctx = maskCanvas.getContext("2d")!;
            mctx.fillStyle = "white";
            mctx.textAlign = "center";
            mctx.textBaseline = "middle";

            // Responsive font sizing based on width
            const isMobile = w <= 768;
            // Larger font sizes on mobile to make the text naturally bigger and easier to read
            const fontSize = w > 1024 ? 100 : w > 768 ? 70 : Math.max(36, Math.min(54, w / 7.2));
            mctx.font = `bold ${fontSize}px monospace`;

            const lines = ["DIEGO CHAVEZ", "ML DSP ENG", "PORTFOLIO"];
            const lineHeight = fontSize * 1.1;

            lines.forEach((line, i) => {
                mctx.fillText(line, w / 2, h / 2 + (i - 1) * lineHeight);
            });

            const imageData = mctx.getImageData(0, 0, w, h).data;

            // 2. Extract target points (sample every N pixels for density calculation)
            // step = 7 ensures we get enough spacing to clearly define the letters.
            const step = isMobile ? 4 : 7;
            const targets: { x: number, y: number }[] = [];

            for (let y = 0; y < h; y += step) {
                for (let x = 0; x < w; x += step) {
                    const alpha = imageData[(y * w + x) * 4 + 3];
                    if (alpha > 128) {
                        // Remove spatial jitter completely to ensure the particles form 
                        // razor-sharp, perfectly legible letters on the grid.
                        targets.push({ x: x, y: y });
                    }
                }
            }

            // Shuffle targets to distribute randomly during scatter
            targets.sort(() => Math.random() - 0.5);

            // 3. Create particles mapped to those targets
            const pArray: Particle[] = [];
            // Scale math: We need the short strings to overlap horizontally (width > step) 
            // but NOT vertically (height < step). 
            // step is 7. A string is ~12px tall base. With scale 0.31, height is ~3.7px (leaves 3.3px vertical gap).
            // Width of 3 chars is ~22px. With scale 0.31, width is ~6.8px (touches horizontally).
            const targetScale = isMobile ? (fontSize / 100) * 0.28 : (fontSize / 100) * 0.31;
            for (let i = 0; i < targets.length; i++) {
                pArray.push({
                    x: Math.random() * w, // start scattered randomly
                    y: Math.random() * h,
                    originX: Math.random() * w,
                    originY: Math.random() * h,
                    targetX: targets[i].x,
                    targetY: targets[i].y,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    canvasIndex: Math.floor(Math.random() * cachedTextsRef.current.length),
                    scale: 0.8 + Math.random() * 0.4, // Initial visible string size
                    targetScale: targetScale, // Micro-text size when forming the title
                    jitterOffset: Math.random() * Math.PI * 2
                });
            }

            particlesRef.current = pArray;
            setPhase("scattered");
        };

        initSystem();

        // Resize handler (very basic rebuild or just ignoring to keep performant, usually we'd rebuild mask)
        const handleResize = () => {
            // For stability, we won't aggressively rebuild mask on every tick, just correct canvas dims
            canvas.width = containerRef.current?.clientWidth || w;
            canvas.height = containerRef.current?.clientHeight || h;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Render Loop
    useEffect(() => {
        if (phase === "loading") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false })!; // optimization

        let time = 0;

        const loop = () => {
            time += 0.016; // ~60fps
            const w = canvas.width;
            const h = canvas.height;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const particles = particlesRef.current;
            const sprites = cachedTextsRef.current;

            // Clear canvas properly so background themes (light/dark) show through
            ctx.clearRect(0, 0, w, h);

            const isCollapsing = phase === "collapsing";
            const isResolved = phase === "resolved";

            // Batch global state changes if possible (not needed for simple drawImage)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                if (phase === "scattered") {
                    // Wandering behavior with mouse repulsion
                    const dx = mx - p.x;
                    const dy = my - p.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 40000) { // Mouse repulsion radius ~200px
                        const force = 40000 / (distSq + 1000);
                        p.vx -= (dx / Math.sqrt(distSq)) * force * 0.05;
                        p.vy -= (dy / Math.sqrt(distSq)) * force * 0.05;
                    }

                    // Wander to origin
                    p.vx += (p.originX - p.x) * 0.0005;
                    p.vy += (p.originY - p.y) * 0.0005;

                    // Friction & Velocity application
                    p.vx *= 0.95;
                    p.vy *= 0.95;
                    p.x += p.vx;
                    p.y += p.vy;

                } else if (isCollapsing) {
                    // Lerp to target position rapidly but smoothly
                    p.x += (p.targetX - p.x) * 0.08;
                    p.y += (p.targetY - p.y) * 0.08;
                    p.scale += (p.targetScale - p.scale) * 0.08;

                    // When close enough, resolve
                    if (i === 0 && Math.abs(p.x - p.targetX) < 0.5) {
                        setPhase("resolved");
                    }
                } else if (isResolved) {
                    // Locked in state, introduce microscopic data static jitter
                    p.x = p.targetX + Math.sin(time * 10 + p.jitterOffset) * 0.3;
                    p.y = p.targetY + Math.cos(time * 12 + p.jitterOffset) * 0.3;
                    p.scale = p.targetScale;
                }

                // Render always as text (strings are now shorter for better performance and look)
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
    }, [phase]);

    // Loading bar progression effect
    useEffect(() => {
        if (phase !== "resolved") return;

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 8 + 4; // Faster increments
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }, 800); // Faster redirect/scroll
            }
            setProgress(Math.min(currentProgress, 100));
        }, 40);

        return () => clearInterval(interval);
    }, [phase]);

    const handleTrigger = () => {
        if (phase === "scattered") setPhase("collapsing");
        // If it's resolved, maybe reset it?
        if (phase === "resolved") {
            // Reset logic for replayability
            particlesRef.current.forEach(p => {
                p.originX = Math.random() * containerRef.current!.clientWidth;
                p.originY = Math.random() * containerRef.current!.clientHeight;
                p.scale = 0.8 + Math.random() * 0.4;
            });
            setPhase("scattered");
        }
    };

    return (
        <div ref={containerRef} className="w-full h-full relative bg-transparent overflow-hidden flex flex-col items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none mix-blend-difference" />

            {/* UI Overlay */}
            <div className={`z-10 absolute bottom-12 flex flex-col items-center gap-4 transition-opacity duration-1000 ${phase !== "scattered" ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="text-gray_signal text-[10px] uppercase font-mono bg-black_layer px-2 py-0.5 border border-gray_interference mb-4">
                    Awaiting initialization
                </div>
                <button
                    onClick={handleTrigger}
                    disabled={phase !== "scattered"}
                    className="font-mono text-sm px-8 py-3 bg-white_clinical text-black_core font-bold hover:bg-gray_interference hover:text-white_clinical transition-colors tracking-widest uppercase cursor-pointer relative overflow-hidden group"
                >
                    {phase === "loading" ? "Compiling..." : "Initialize System"}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-black_layer mix-blend-multiply" />
                </button>
            </div>

            {phase === "resolved" && (
                <div className="z-10 absolute bottom-16 flex flex-col items-center gap-4 w-[80vw] max-w-[400px] bg-black_layer p-6 border border-gray_interference backdrop-blur-sm bg-opacity-80">
                    <div className="text-white_clinical text-xs font-mono uppercase tracking-widest flex justify-between w-full">
                        <span className="text-gray_signal">Initializing Subsystems</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray_interference">
                        <div className="h-full bg-white_clinical transition-all duration-75" style={{ width: `${progress}%` }} />
                    </div>
                    {progress >= 100 && (
                        <div className="text-green_signal text-sm font-mono uppercase font-bold tracking-widest animate-pulse mt-2">
                            SYSTEM_ONLINE
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
