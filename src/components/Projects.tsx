"use client";

import React, { useState, useRef, useEffect } from "react";

import img1 from "../../assets/cosmos_1019079168.jpeg";
import img2 from "../../assets/cosmos_1049549194.jpeg";
import img3 from "../../assets/cosmos_1098895203.jpeg";
import img4 from "../../assets/cosmos_1233646093.jpeg";
import img5 from "../../assets/cosmos_184632003.jpeg";
import img6 from "../../assets/cosmos_1894204742.jpeg";
import img7 from "../../assets/cosmos_1906474767.jpeg";
import img8 from "../../assets/cosmos_1921523755.jpeg";
import img9 from "../../assets/cosmos_242018715.jpeg";
import img10 from "../../assets/cosmos_402620997.jpeg";
import img11 from "../../assets/cosmos_59952192.jpeg";
import img12 from "../../assets/cosmos_650624235.jpeg";
import img13 from "../../assets/cosmos_733538922.jpeg";

const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13];

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const projects = [
  {
    title: "Image-to-Sound AI",
    type: "Multimodal AI & Sound Design",
    number: "01",
    description: "A standalone multimodal system that transforms cinematic images into structured sound design suggestions using computer vision, language models, CLAP embeddings, and Stable Audio. Features a local-first PySide6 desktop interface.",
    tags: ["PyTorch", "CLAP", "Stable Audio", "Computer Vision", "Python"],
    github: "https://github.com/DIEGOGCHM",
    demo: null,
    link: "/architecture",
    color: "bg-green_signal",
    image: img11.src
  },
  {
    title: "Del Otro Lado",
    type: "Interactive Art Installation",
    number: "02",
    description: "An immersive sensory art installation exploring migration and reactive perception. Combines electromechanical automation, Arduino/Raspberry Pi sensor integration, and dynamic narrative soundscapes.",
    tags: ["Arduino", "Raspberry Pi", "Embedded", "Sound Design", "Sensors"],
    github: "https://github.com/DIEGOGCHM",
    demo: null,
    link: "/del-otro-lado",
    color: "bg-amber_decay",
    image: img6.src,
    videoHeader: '/projects/del_otro_lado/20260306220654230.MP4',
    assets: [
        { type: 'video', src: '/projects/del_otro_lado/20260306220654230-1.MP4' },
        { type: 'image', src: '/projects/del_otro_lado/FullSizeRender.jpeg' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8334.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8477.PNG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8506.JPG' },
        { type: 'video', src: '/projects/del_otro_lado/IMG_8525.MP4' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8540.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8553.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8554.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8664.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8691.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8692.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8697.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8703.JPG' },
        { type: 'image', src: '/projects/del_otro_lado/IMG_8718.JPEG' },
    ]
  },
  {
    title: "Contrastive Datasets",
    type: "Dataset Curation & ML Support",
    number: "03",
    description: "Design, recording, and curation of high-quality audio datasets for training audio-text contrastive models. Includes workflows for cleaning, labeling, and semantic alignment.",
    tags: ["Dataset Design", "Audio Curation", "Contrastive Learning", "CLAP"],
    github: "https://github.com/DIEGOGCHM",
    demo: null,
    link: "/functions-walkthrough",
    color: "bg-white_faded",
    image: img1.src
  },
];

// Duplicate the array many times to simulate infinite scroll
const displayProjects = Array(8).fill(projects).flat();

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewState, setViewState] = useState(0); // 0: Overview, 1: Detail, 2: Gallery
  const [lightboxAsset, setLightboxAsset] = useState<{type: string, src: string} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Independent high-performance mouse tracking per window
  const handleWindowMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    e.currentTarget.style.setProperty('--mouse-x', x.toString());
    e.currentTarget.style.setProperty('--mouse-y', y.toString());
  };

  const handleWindowMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reset to center
    e.currentTarget.style.setProperty('--mouse-x', '0.5');
    e.currentTarget.style.setProperty('--mouse-y', '0.5');
  };

  // Handle infinite scroll loop
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollPosition = scrollRef.current.scrollTop;
        const windowHeight = window.innerHeight;
        const index = Math.round(scrollPosition / windowHeight);
        
        if (index !== activeIndex) {
          setActiveIndex(index);
          setViewState(0); // Reset view state when changing projects
        }
      }
    };

  // Initial scroll position to the middle to allow scrolling up immediately
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight / 2;
    }
  }, []);

  useEffect(() => {
    setViewState(0);
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="w-full h-screen bg-background relative flex flex-col-reverse md:flex-row overflow-hidden border-y border-gray_interference font-mono"
    >
      
      {/* Left Column: Infinite Thumbnail List */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full md:w-1/4 h-[30vh] md:h-full overflow-y-auto hide-scrollbar border-t md:border-t-0 md:border-r border-gray_interference bg-background relative z-20"
        style={{ scrollBehavior: 'auto' }} // Disable smooth scrolling for seamless jumping
      >
        <div className="py-[10vh] md:py-[40vh] flex flex-col gap-4 px-4 md:px-8">
            {displayProjects.map((project, i) => {
                const originalIndex = i % projects.length;
                const isActive = activeIndex === originalIndex;

                return (
                    <div 
                        key={i} 
                        onClick={() => setActiveIndex(originalIndex)}
                        className={`flex items-center gap-4 cursor-pointer group transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                    >
                        {/* Thumbnail / Indicator */}
                        <div className={`relative transition-all duration-700 ease-out flex-shrink-0 ${isActive ? 'w-10 h-10 md:w-12 md:h-12 rounded-full' : 'w-16 h-16 md:w-20 md:h-20 rounded-none'}`}>
                            <div className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? 'bg-green_signal rounded-full' : 'bg-gray_interference'}`}>
                                {!isActive && (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Title & Type (Only visible when active or hovering) */}
                        <div className={`flex flex-col transition-all duration-500 overflow-hidden ${isActive ? 'max-w-[300px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[300px] group-hover:opacity-50 group-hover:translate-x-0'}`}>
                            <span className="text-[10px] text-gray_signal uppercase tracking-widest mb-1 whitespace-nowrap">
                                {project.type}
                            </span>
                            <span className="text-sm md:text-base font-bold uppercase text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                                {project.title}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Right Column: Immersive Detail View */}
      <div className="w-full md:w-3/4 h-[70vh] md:h-full relative overflow-hidden bg-black_core z-10">
        
        {/* Render all projects absolutely and transition their opacity for smooth crossfading */}
        {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            
            return (
                <div 
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col justify-end p-6 md:p-16 ${isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}
                >
                    {/* Immersive Background Gallery (Window Scan Effect) */}
                    <div className={`absolute inset-0 w-full h-full p-2 md:p-4 grid grid-cols-4 grid-rows-2 gap-1 md:gap-2 transition-transform duration-[20s] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}>
                        {/* Get a unique slice of 5 images from the pool for each project (indices swapped for 0 and 2) */}
                        {(() => {
                            const startIndex = [8, 4, 0][idx];
                            return [...allImages.slice(startIndex), ...allImages.slice(0, startIndex)].slice(0, 5);
                        })().map((img, i) => {
                            // Perfect 4x2 grid math: 1 large (2x2), 4 small (1x1)
                            const isLarge = i === 0;
                            
                            return (
                                <div 
                                    key={i}
                                    onMouseMove={handleWindowMouseMove}
                                    onMouseLeave={handleWindowMouseLeave}
                                    className={`relative cursor-crosshair overflow-hidden border border-gray_interference/10 ${isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                                    style={{ '--mouse-x': '0.5', '--mouse-y': '0.5' } as React.CSSProperties}
                                >
                                    {/* The image is much larger (150%) to allow significant panning travel */}
                                    <img 
                                        src={img.src} 
                                        alt={`gallery element ${i}`} 
                                        className="absolute inset-0 w-[150%] h-[150%] max-w-none object-cover transition-transform duration-300 ease-out" 
                                        style={{
                                            // -33.33% exact math for 150% size: 50% extra space / 150% total size = 33.33%
                                            transform: `translate(calc(-33.33% * var(--mouse-x)), calc(-33.33% * var(--mouse-y)))`
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black_core via-black_core/90 to-transparent opacity-100 pointer-events-none" />
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black_core/50 to-transparent backdrop-blur-[2px] pointer-events-none" />

                    {/* Content Wrapper to keep everything at the bottom */}
                    <div className="relative z-20 w-full flex-1 flex flex-col justify-end pointer-events-none">
                        
                        {/* Content Layer (Overview - Sheet 1) */}
                        <div className={`flex flex-col max-w-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${viewState > 0 && isActive ? 'opacity-0 -translate-y-12 absolute bottom-0 pointer-events-none' : 'opacity-100 translate-y-0 relative pointer-events-auto'}`}>
                            {/* Huge Typography Title */}
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black leading-[0.85] mb-8 w-fit drop-shadow-sm">
                                {project.title}
                            </h2>

                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Description Block */}
                                <p className="text-white_clinical font-medium text-sm md:text-base leading-relaxed md:max-w-md">
                                    {project.description}
                                </p>

                                {/* Tags and Links */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                        <span key={i} className="border border-white_faded/30 bg-black_layer/50 backdrop-blur-md text-white_clinical px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                                            {tag}
                                        </span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        <a href={project.github} className="text-white_clinical hover:text-green_signal transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                                            <GithubIcon /> Source
                                        </a>
                                        {project.demo && (
                                        <a href={project.demo} className="text-white_clinical hover:text-green_signal transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                                            <ExternalLinkIcon /> Demo
                                        </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Layer (Detail View - Sheet 2) */}
                        <div className={`absolute bottom-0 left-0 p-6 md:p-16 flex flex-col max-w-4xl transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${viewState === 1 && isActive ? 'opacity-100 translate-y-0 pointer-events-auto z-40' : (viewState === 2 ? 'opacity-0 -translate-y-12 pointer-events-none z-0' : 'opacity-0 translate-y-12 pointer-events-none z-0')}`}>
                            {/* Smaller Typography Title for Detail */}
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-[0.85] mb-6 w-fit drop-shadow-sm">
                                {project.title} {'//'} EXTENDED DATA
                            </h2>
                            
                            <div className="bg-black_core/70 backdrop-blur-md border border-gray_interference p-6 md:p-8 flex flex-col gap-6 text-white_clinical font-mono text-sm shadow-2xl font-medium pointer-events-auto">
                                <div className="flex items-center gap-4 border-b border-gray_interference pb-4">
                                    <span className="text-green_signal uppercase tracking-widest text-xs font-bold">SYSTEM.LOG {'//'} {project.number}</span>
                                    <span className="text-black font-bold uppercase tracking-widest text-xs">{project.type}</span>
                                </div>
                                <p className="leading-relaxed">
                                    {project.description}
                                </p>
                                <p className="leading-relaxed text-black/70">
                                    (Extended information, architecture schematics, and functional walkthroughs can be injected here for {project.title}. This overlay maintains the immersive background context while providing deeper technical insights natively inside the carousel.)
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray_interference">
                                    {project.tags.map((tag, i) => (
                                    <span key={i} className="border border-green_signal/30 text-green_signal px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                                        {tag}
                                    </span>
                                    ))}
                                </div>
                                
                                {/* Button to open Gallery (Sheet 3) if assets exist */}
                                {project.assets && (
                                    <div className="mt-4">
                                        <button 
                                            onClick={() => setViewState(2)} 
                                            className="inline-flex items-center gap-2 bg-white_clinical text-white px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-green_signal transition-colors w-fit border-none cursor-pointer outline-none"
                                        >
                                            Show Visual Gallery
                                            <ExternalLinkIcon />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Layer (Scrollable Gallery - Sheet 3) */}
                        <div className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-background transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${viewState === 2 && isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                            
                            {/* Header Section */}
                            <div className="relative w-full h-[70vh] md:h-screen flex flex-col justify-center items-center p-6 md:p-16 pointer-events-none overflow-hidden">
                                {/* Video Header */}
                                {project.videoHeader && (
                                    <video 
                                        src={project.videoHeader} 
                                        autoPlay loop muted playsInline
                                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                                    />
                                )}
                                
                                <div className="relative z-20 flex flex-col items-center justify-center text-center">
                                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black leading-[0.85] mb-6 drop-shadow-sm mix-blend-difference text-white">
                                        {project.title}
                                    </h2>
                                    <p className="text-white mix-blend-difference uppercase tracking-widest font-bold text-xs md:text-sm">
                                        Scroll for Editorial Gallery
                                    </p>
                                </div>
                            </div>

                            {/* Masonry Gallery Section */}
                            {project.assets && (
                                <div className="w-full max-w-[1600px] mx-auto p-4 md:p-16 py-16 md:py-24 bg-background">
                                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
                                        {project.assets.map((asset, i) => (
                                            <div 
                                                key={i} 
                                                className="break-inside-avoid relative overflow-hidden bg-gray_interference/20 group cursor-pointer"
                                                onClick={() => setLightboxAsset(asset)}
                                            >
                                                {asset.type === 'video' ? (
                                                    <video src={asset.src} autoPlay loop muted playsInline className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" />
                                                ) : (
                                                    <img src={asset.src} alt={`Asset ${i}`} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                                                )}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none flex items-center justify-center">
                                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white mix-blend-difference border border-white px-4 py-2 font-mono text-xs uppercase tracking-widest bg-black/30 backdrop-blur-sm">
                                                        Expand
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Explore / Back Toggle (Bottom Right) */}
                    <button 
                        onClick={() => {
                            if (viewState === 0) setViewState(1);
                            else if (viewState === 1) setViewState(0);
                            else if (viewState === 2) setViewState(1);
                        }} 
                        className={`absolute bottom-6 md:bottom-16 right-6 md:right-16 pointer-events-auto text-black hover:text-green_signal transition-all duration-300 group flex items-center gap-4 cursor-pointer outline-none bg-transparent border-none drop-shadow-sm ${viewState === 2 ? 'z-50 text-foreground mix-blend-difference !text-white' : 'z-40'}`}
                    >
                        {viewState > 0 ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-2 transition-transform w-12 h-12 md:w-16 md:h-16">
                                    <line x1="22" y1="12" x2="2" y2="12"></line>
                                    <polyline points="9 19 2 12 9 5"></polyline>
                                </svg>
                                <span className="font-mono text-sm md:text-base tracking-widest uppercase hidden md:block">
                                    Back
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="font-mono text-sm md:text-base tracking-widest uppercase hidden md:block">
                                    Explore
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform w-12 h-12 md:w-16 md:h-16">
                                    <line x1="0" y1="12" x2="22" y2="12"></line>
                                    <polyline points="15 5 22 12 15 19"></polyline>
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            );
        })}

      </div>

      {/* Lightbox Modal */}
      {lightboxAsset && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out transition-opacity duration-300"
            onClick={() => setLightboxAsset(null)}
        >
            <button className="absolute top-6 right-6 md:top-12 md:right-12 text-white hover:text-green_signal transition-colors z-[101] bg-black/50 p-4 rounded-full border border-white/10 backdrop-blur-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                {lightboxAsset.type === 'video' ? (
                    <video 
                        src={lightboxAsset.src} 
                        autoPlay loop controls 
                        className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto" 
                    />
                ) : (
                    <img 
                        src={lightboxAsset.src} 
                        alt="Fullscreen view" 
                        className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto" 
                    />
                )}
            </div>
        </div>
      )}
      
      {/* Global CSS to hide scrollbar for the immersive feel but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
