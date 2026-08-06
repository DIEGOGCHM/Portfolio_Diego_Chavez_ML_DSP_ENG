"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";

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

interface ProjectAsset {
  type: string;
  src: string;
  title?: string;
  description?: string;
  headphonesRequired?: boolean;
  invertInDarkMode?: boolean;
}

interface ProjectItem {
  title: string;
  type: string;
  number: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github: string;
  demo?: string | null;
  link: string;
  color: string;
  image: string;
  videoHeader?: string;
  walkthroughVideo?: string;
  isBlueprintProject?: boolean;
  assets?: ProjectAsset[];
}

const projects: ProjectItem[] = [
  {
    title: "Perceptual Translation System",
    type: "Multimodal Audio Intelligence",
    number: "01",
    description: "A computational system that interprets visual input and translates it into structured acoustic inference through multimodal embeddings. It acts as a translator between modalities, bridging the gap between what is seen and what is heard.",
    longDescription: "A computational system designed to run 100% locally. It interprets visual input and text prompts, translating them into structured foley/ambience categories, retrieving indexed sounds using FAISS/CLAP, and synthesizing new sound effects natively via Stable Audio Open. The system retrieves sound. It generates it. It organizes it. It integrates it. It separates semantic understanding from acoustic reality, allowing for precise retrieval and perceptual fidelity.",
    tags: ["Vision Transformer", "GPT-J", "LionCLAP", "Semantic Audio", "Python"],
    github: "https://github.com/DIEGOGCHM",
    demo: null,
    link: "/architecture",
    color: "bg-green_signal",
    image: img11.src,
    videoHeader: '/projects/perceptual_translation_system/VIDEO promo video.mp4',
    walkthroughVideo: '/projects/perceptual_translation_system/VIDEO WT FInal.mp4'
  },
  {
    title: "Del Otro Lado",
    type: "Interactive Art Installation",
    number: "02",
    description: "An immersive sensory art installation exploring migration and reactive perception. Combines electromechanical automation, Arduino/Raspberry Pi sensor integration, and dynamic narrative soundscapes.",
    longDescription: "Designed and developed an immersive interactive installation exploring themes of migration, cultural displacement, and reactive perception through narrative sound design and multisensory interaction. The project combined embedded hardware systems (Arduino, Raspberry Pi), reactive soundscapes, and electromechanical automation to create emotionally driven experiences centered around discomfort, immersion, and audience participation.",
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
    longDescription: "Designed, recorded, and curated specialized high-fidelity audio datasets for training and fine-tuning contrastive audio-text models (such as CLAP). Developed modular processing pipelines for audio cleaning, segmentation, metadata tagging, and semantic text alignment based on critical listening and sound engineering principles.",
    tags: ["Dataset Design", "Audio Curation", "Contrastive Learning", "CLAP"],
    github: "https://github.com/DIEGOGCHM",
    demo: null,
    link: "/functions-walkthrough",
    color: "bg-white_faded",
    image: img1.src
  },
  {
    title: "Human XY Pad",
    type: "Multineumatic Spatial Controller & Granular Audio DSP",
    number: "04",
    description: "An interactive gestural control system and digital musical instrument that transforms physical 3D positioning and body movement into real-time audio DSP parameters and granular synthesis using 6 ultrasonic sensors (HC-SR04) and Arduino C++.",
    longDescription: "The Human XY Pad eliminates physical contact with traditional mechanical interfaces using an array of 6 ultrasonic sensors mounted on standardized rails and a modular granular synthesis engine in Max/MSP. The Arduino C++ microcontroller processes time-of-flight ultrasound signals, filters boundary noise, and calculates spatial multipoint averages across X and Y axes with sub-35ms latency. Axis X modulates the cutoff frequency of a low-pass filter (biquad~), while Axis Y controls the grain emission rate.",
    tags: ["Arduino C++", "Max/MSP", "Granular Synthesis", "HC-SR04 Sensors", "DSP", "Spatial Sensing"],
    github: "https://github.com/DIEGOGCHM",
    demo: null,
    link: "/human-xy-pad",
    color: "bg-cyan_signal",
    image: "/projects/human_xy_pad/Planos1.png",
    videoHeader: '/projects/human_xy_pad/promo_video.mp4',
    isBlueprintProject: true,
    assets: [
        { type: 'image', src: '/projects/human_xy_pad/Planos1.png', title: 'Plan 01 // 2D Spatial Framework & Sensor Array', invertInDarkMode: true },
        { type: 'image', src: '/projects/human_xy_pad/Planos2.png', title: 'Plan 02 // Hardware Wiring & Signal Topology', invertInDarkMode: true },
        { type: 'video', src: '/projects/human_xy_pad/promo_video.mp4', title: 'Real-Time Performance Demo' },
        { type: 'video', src: '/projects/human_xy_pad/pts_loop.mp4', title: 'Sensing & Pointer Loop' },
        { type: 'video', src: '/projects/human_xy_pad/IMG_9040.mov', title: 'Field Testing Log' }
    ]
  },
  {
    title: "SplitGrain",
    type: "Granular Synthesizer & DSP Engine",
    number: "05",
    description: "A virtual synthesizer (VST3/AU/Standalone) built in C++20/JUCE that combines stochastic granular synthesis with an advanced real-time Tonal/Transient Spectral Separation (TSS/HPSS) algorithm.",
    longDescription: "Designed and implemented an 8-voice polyphonic granular virtual synthesizer with real-time Tonal/Transient spectral separation. Developed a DSP algorithm using 2048-point STFT, 2D spectro-temporal median filtering, and 2nd-order phase acceleration tracking to avoid phase artifacts. Optimized the audio processing thread to guarantee real-time performance (zero dynamic memory allocations and lock-free structures). Designed a stochastic granular engine with probability distributions and continuous grain envelope morphing.",
    tags: ["C++20", "JUCE 7", "DSP", "Granular Synthesis", "CMake"],
    github: "https://github.com/DIEGOGCHM",
    demo: null,
    link: "/splitgrain",
    color: "bg-purple-500",
    image: img10.src
  }
];

// Duplicate the array many times to simulate infinite scroll
const displayProjects = Array(8).fill(projects).flat();

function BlueprintTabViewer({ project, onExpand }: { project: ProjectItem; onExpand: (asset: ProjectAsset) => void }) {
  const [selectedPlan, setSelectedPlan] = useState<'plan1' | 'plan2' | 'all'>('plan1');

  return (
    <div className="w-full min-h-screen bg-background text-white_clinical font-mono relative overflow-y-auto p-4 sm:p-8 md:p-16 flex flex-col items-center z-50">
      <div className="relative z-20 w-full max-w-7xl flex flex-col gap-8 pb-16">
        
        {/* CAD Technical Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray_interference pb-6 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-gray_signal text-xs uppercase tracking-widest font-bold">
                CAD SCHEMATIC VIEWER // {project.number}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white_clinical">
              {project.title} Schematics
            </h2>
            <p className="text-xs md:text-sm text-white_faded mt-1 max-w-2xl">
              Transparent hardware blueprints and signal topology diagrams.
            </p>
          </div>

          {/* Interactive Plan Selector Buttons */}
          <div className="flex flex-wrap gap-2 p-1 border border-gray_interference rounded-md bg-black_core/50 shadow-sm">
            <button
              onClick={() => setSelectedPlan('plan1')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all rounded-sm cursor-pointer ${
                selectedPlan === 'plan1' 
                  ? 'bg-foreground text-background' 
                  : 'text-white_clinical/80 hover:text-white_clinical hover:bg-black_layer/50'
              }`}
            >
              Plan 01: Spatial Frame
            </button>
            <button
              onClick={() => setSelectedPlan('plan2')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all rounded-sm cursor-pointer ${
                selectedPlan === 'plan2' 
                  ? 'bg-foreground text-background' 
                  : 'text-white_clinical/80 hover:text-white_clinical hover:bg-black_layer/50'
              }`}
            >
              Plan 02: Hardware Wiring
            </button>
            <button
              onClick={() => setSelectedPlan('all')}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all rounded-sm cursor-pointer ${
                selectedPlan === 'all' 
                  ? 'bg-foreground text-background' 
                  : 'text-white_clinical/80 hover:text-white_clinical hover:bg-black_layer/50'
              }`}
            >
              Dual Schematic View
            </button>
          </div>
        </div>

        {/* Blueprint Canvas Rendering */}
        {selectedPlan === 'all' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Plan 1 Card */}
            <div 
              onClick={() => onExpand({ type: 'image', src: '/projects/human_xy_pad/Planos1.png', title: 'Plan 01 // 2D Spatial Framework & Sensor Array', invertInDarkMode: true })}
              className="relative group cursor-zoom-in border border-gray_interference bg-black_core/50 p-6 rounded-md overflow-hidden hover:border-gray_signal transition-all shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-gray_interference pb-3 mb-4">
                <span className="text-xs text-foreground font-bold uppercase tracking-widest">
                  PLAN 01 // 2D SPATIAL FRAMEWORK
                </span>
                <span className="text-[10px] text-gray_signal border border-gray_interference px-2 py-0.5 rounded-sm">
                  PNG TRANSPARENT
                </span>
              </div>
              <div className="w-full h-80 flex items-center justify-center p-2 bg-background border border-gray_interference/50 rounded-sm">
                <img 
                  src="/projects/human_xy_pad/Planos1.png" 
                  alt="Plan 01 Spatial Framework" 
                  className="max-w-full max-h-full object-contain theme-invert" 
                />
              </div>
              <div className="mt-4 pt-3 border-t border-gray_interference flex justify-between items-center text-xs text-white_faded">
                <span>Click to Fullscreen Inspect</span>
                <span className="text-foreground font-bold uppercase">6-Sensor Array</span>
              </div>
            </div>

            {/* Plan 2 Card */}
            <div 
              onClick={() => onExpand({ type: 'image', src: '/projects/human_xy_pad/Planos2.png', title: 'Plan 02 // Hardware Wiring & Signal Topology', invertInDarkMode: true })}
              className="relative group cursor-zoom-in border border-gray_interference bg-black_core/50 p-6 rounded-md overflow-hidden hover:border-gray_signal transition-all shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-gray_interference pb-3 mb-4">
                <span className="text-xs text-foreground font-bold uppercase tracking-widest">
                  PLAN 02 // HARDWARE WIRING & TOPOLOGY
                </span>
                <span className="text-[10px] text-gray_signal border border-gray_interference px-2 py-0.5 rounded-sm">
                  PNG TRANSPARENT
                </span>
              </div>
              <div className="w-full h-80 flex items-center justify-center p-2 bg-background border border-gray_interference/50 rounded-sm">
                <img 
                  src="/projects/human_xy_pad/Planos2.png" 
                  alt="Plan 02 Hardware Wiring" 
                  className="max-w-full max-h-full object-contain theme-invert" 
                />
              </div>
              <div className="mt-4 pt-3 border-t border-gray_interference flex justify-between items-center text-xs text-white_faded">
                <span>Click to Fullscreen Inspect</span>
                <span className="text-foreground font-bold uppercase">Arduino / Max MSP</span>
              </div>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => onExpand({ 
              type: 'image', 
              src: selectedPlan === 'plan1' ? '/projects/human_xy_pad/Planos1.png' : '/projects/human_xy_pad/Planos2.png', 
              title: selectedPlan === 'plan1' ? 'Plan 01 // 2D Spatial Framework & Sensor Array' : 'Plan 02 // Hardware Wiring & Signal Topology',
              invertInDarkMode: true
            })}
            className="relative w-full border border-gray_interference bg-black_core/50 p-6 sm:p-10 md:p-16 rounded-md cursor-zoom-in group overflow-hidden shadow-sm hover:border-gray_signal transition-all flex flex-col"
          >
            {/* Technical CAD Overlay Annotations */}
            <div className="w-full flex justify-between items-start mb-6 border-b border-gray_interference pb-4">
              <div className="text-[11px] text-foreground font-bold tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-foreground" />
                AXIS ORIGIN [0.00, 0.00]
              </div>
              <div className="text-[11px] text-foreground font-bold tracking-widest">
                MAX BOUNDARY: 150.00 cm
              </div>
            </div>

            {/* Main Transparent Schematic Image */}
            <div className="w-full h-[55vh] flex items-center justify-center p-4 bg-background border border-gray_interference/50 rounded-sm mb-6">
              <img 
                src={selectedPlan === 'plan1' ? '/projects/human_xy_pad/Planos1.png' : '/projects/human_xy_pad/Planos2.png'} 
                alt="Human XY Pad Blueprint Schematic" 
                className="max-w-full max-h-full object-contain theme-invert" 
              />
            </div>
            
            <div className="w-full flex justify-between items-end">
              <div className="text-[11px] text-gray_signal">
                LAYER: TRANSPARENT VECTOR PNG (1:1 CAD SCALE)
              </div>
              <div className="text-[11px] text-foreground font-bold tracking-widest flex items-center gap-2">
                <span>FULLSCREEN LIGHTBOX</span>
                <ExternalLinkIcon />
              </div>
            </div>
          </div>
        )}

        {/* Blueprint Specifications HUD Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mt-2">
          <div className="border border-gray_interference bg-black_core/50 p-4 rounded-md shadow-sm">
            <span className="text-gray_signal text-[10px] block uppercase font-bold tracking-widest mb-2 border-b border-gray_interference pb-1">CAPACITY & SENSORS</span>
            <span className="text-foreground font-bold block">6x HC-SR04 Ultrasound</span>
            <span className="text-white_faded text-[10px]">Dual Axis Rail System</span>
          </div>
          <div className="border border-gray_interference bg-black_core/50 p-4 rounded-md shadow-sm">
            <span className="text-gray_signal text-[10px] block uppercase font-bold tracking-widest mb-2 border-b border-gray_interference pb-1">TIME-OF-FLIGHT MATH</span>
            <span className="text-foreground font-bold block">d = (t × 0.0343) / 2</span>
            <span className="text-white_faded text-[10px]">Sea level sound speed constant</span>
          </div>
          <div className="border border-gray_interference bg-black_core/50 p-4 rounded-md shadow-sm">
            <span className="text-gray_signal text-[10px] block uppercase font-bold tracking-widest mb-2 border-b border-gray_interference pb-1">SERIAL PROTOCOL</span>
            <span className="text-foreground font-bold block">Arduino C++ (&lt; 35ms)</span>
            <span className="text-white_faded text-[10px]">9600 bps USB stream</span>
          </div>
          <div className="border border-gray_interference bg-black_core/50 p-4 rounded-md shadow-sm">
            <span className="text-gray_signal text-[10px] block uppercase font-bold tracking-widest mb-2 border-b border-gray_interference pb-1">DSP SYNTHESIS</span>
            <span className="text-foreground font-bold block">Max/MSP Granular Patch</span>
            <span className="text-white_faded text-[10px]">biquad~ LPF & Grain Rate</span>
          </div>
        </div>

      </div>
    </div>
  );
}

interface SplitTextRowProps {
  project: ProjectItem;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}

const SplitTextRow = React.memo(function SplitTextRow({ project, isActive, onHover, onClick }: SplitTextRowProps) {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line1CharsRef = useRef<NodeListOf<Element> | null>(null);
  const line2CharsRef = useRef<NodeListOf<Element> | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fullText = `${project.number} // ${project.title}`;

  useEffect(() => {
    if (line1Ref.current) line1CharsRef.current = line1Ref.current.querySelectorAll(".char-span");
    if (line2Ref.current) line2CharsRef.current = line2Ref.current.querySelectorAll(".char-span");
  }, [fullText]);

  const handleMouseEnter = useCallback(() => {
    // Fast GSAP animation runs immediately
    const line1Chars = line1CharsRef.current || line1Ref.current?.querySelectorAll(".char-span");
    const line2Chars = line2CharsRef.current || line2Ref.current?.querySelectorAll(".char-span");

    if (line1Chars && line2Chars) {
      gsap.killTweensOf([line1Chars, line2Chars]);
      gsap.timeline()
        .to(line1Chars, { yPercent: -100, duration: 0.3, ease: "power3.out", stagger: 0.012 }, 0)
        .to(line2Chars, { yPercent: -100, duration: 0.3, ease: "power3.out", stagger: 0.012 }, 0);
    }

    // Debounce background state change slightly for ultra-smooth scrolling
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      onHover();
    }, 40);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    const line1Chars = line1CharsRef.current || line1Ref.current?.querySelectorAll(".char-span");
    const line2Chars = line2CharsRef.current || line2Ref.current?.querySelectorAll(".char-span");

    if (line1Chars && line2Chars) {
      gsap.killTweensOf([line1Chars, line2Chars]);
      gsap.timeline()
        .to(line1Chars, { yPercent: 0, duration: 0.25, ease: "power2.inOut", stagger: 0.008 }, 0)
        .to(line2Chars, { yPercent: 0, duration: 0.25, ease: "power2.inOut", stagger: 0.008 }, 0);
    }
  }, []);

  const renderSplitLetters = useCallback((text: string, isLine2 = false) => {
    const words = text.split(" ");
    return words.map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {word.split("").map((char, cIdx) => (
          <span
            key={cIdx}
            className={`inline-block transition-colors duration-200 char-span ${
              isLine2
                ? 'text-green_signal font-bold'
                : isActive ? 'text-green_signal font-bold' : 'text-white_clinical/80 group-hover:text-white_clinical'
            }`}
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            {char}
          </span>
        ))}
        {wIdx < words.length - 1 && (
          <span className="inline-block whitespace-pre">&nbsp;</span>
        )}
      </span>
    ));
  }, [isActive]);

  const line1Letters = useMemo(() => renderSplitLetters(fullText, false), [fullText, renderSplitLetters]);
  const line2Letters = useMemo(() => renderSplitLetters(fullText, true), [fullText, renderSplitLetters]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative overflow-hidden py-4 px-4 md:px-6 cursor-pointer border-b border-gray_interference/30 transition-all duration-300 font-mono ${
        isActive
          ? "bg-black_layer/80 border-l-2 border-l-green_signal shadow-sm opacity-100"
          : "hover:bg-black_layer/40 border-l-2 border-l-transparent opacity-60 hover:opacity-100"
      }`}
    >
      <div className="relative h-6 md:h-7 overflow-hidden flex items-center">
        {/* Line 1: Visible by default */}
        <div
          ref={line1Ref}
          className="absolute inset-0 flex items-center text-xs md:text-sm uppercase tracking-widest whitespace-nowrap"
        >
          {line1Letters}
        </div>

        {/* Line 2: Duplicated for hover reveal */}
        <div
          ref={line2Ref}
          className="absolute inset-0 flex items-center text-xs md:text-sm uppercase tracking-widest whitespace-nowrap translate-y-full"
        >
          {line2Letters}
        </div>
      </div>
    </div>
  );
});

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewState, setViewState] = useState(0); // 0: Overview, 1: Detail, 2: Gallery
  const [lightboxAsset, setLightboxAsset] = useState<ProjectAsset | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);



  const handleHoverProject = useCallback((originalIndex: number) => {
    setActiveIndex((prev) => (prev === originalIndex ? prev : originalIndex));
  }, []);

  // Seamless Infinite Scroll Loop Handler
  const handleInfiniteScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const totalSets = 8;
    const singleSetHeight = scrollHeight / totalSets;
    const threshold = singleSetHeight;

    if (scrollTop < threshold) {
      // Near top boundary: jump 3 sets down
      container.scrollTop += singleSetHeight * 3;
    } else if (scrollTop + clientHeight > scrollHeight - threshold) {
      // Near bottom boundary: jump 3 sets up
      container.scrollTop -= singleSetHeight * 3;
    }
  }, []);

  // Initial scroll position to the middle for immediate seamless bidirectional scroll
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
      
      {/* Left Column: Typography Split-Text Project List */}
      <div 
        ref={scrollRef}
        onScroll={handleInfiniteScroll}
        className="w-full md:w-1/3 lg:w-1/4 h-[35vh] md:h-full overflow-y-auto hide-scrollbar overscroll-contain border-t md:border-t-0 md:border-r border-gray_interference bg-background relative z-20"
      >
        <div className="py-[6vh] md:py-[25vh] flex flex-col">
            {displayProjects.map((project, i) => {
                const originalIndex = i % projects.length;
                const isActive = activeIndex === originalIndex;

                return (
                  <SplitTextRow
                    key={i}
                    project={project}
                    isActive={isActive}
                    onHover={() => handleHoverProject(originalIndex)}
                    onClick={() => {
                      setActiveIndex(originalIndex);
                      setViewState(1);
                    }}
                  />
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
                    {/* Immersive Background Gallery */}
                    {isActive && (
                      <div className="absolute inset-0 w-full h-full p-2 md:p-4 grid grid-cols-4 grid-rows-2 gap-1 md:gap-2">
                          {/* Get a unique slice of 5 images from the pool for each project (indices swapped for 0 and 2) */}
                          {(() => {
                              const startIndex = [8, 4, 2, 0][idx % 4];
                              return [...allImages.slice(startIndex), ...allImages.slice(0, startIndex)].slice(0, 5);
                          })().map((img, i) => {
                              // Perfect 4x2 grid math: 1 large (2x2), 4 small (1x1)
                              const isLarge = i === 0;
                              
                              return (
                                  <div 
                                      key={i}
                                      className={`relative overflow-hidden border border-gray_interference/10 ${isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                                  >
                                      <img 
                                          src={img.src} 
                                          alt={`gallery element ${i}`} 
                                          className="w-full h-full object-cover" 
                                      />
                                  </div>
                              );
                          })}
                      </div>
                    )}
                    
                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black_core via-black_core/90 to-transparent opacity-100 pointer-events-none" />
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black_core/50 to-transparent backdrop-blur-[2px] pointer-events-none" />

                    {/* Content Wrapper to keep everything at the bottom */}
                    <div className="relative z-20 w-full flex-1 flex flex-col justify-end pointer-events-none">
                        
                        {/* Content Layer (Overview - Sheet 1) */}
                        <div className={`flex flex-col max-w-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${viewState > 0 && isActive ? 'opacity-0 -translate-y-12 absolute bottom-0 pointer-events-none' : 'opacity-100 translate-y-0 relative pointer-events-auto'}`}>
                            {/* Huge Typography Title */}
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white_clinical leading-[0.85] mb-8 w-fit drop-shadow-sm">
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
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white_clinical leading-[0.85] mb-6 w-fit drop-shadow-sm">
                                {project.title} {'//'} EXTENDED DATA
                            </h2>
                            
                            <div className="bg-black_core/70 backdrop-blur-md border border-gray_interference p-6 md:p-8 flex flex-col gap-6 text-white_clinical font-mono text-sm shadow-2xl font-medium pointer-events-auto">
                                <div className="flex items-center gap-4 border-b border-gray_interference pb-4">
                                    <span className="text-green_signal uppercase tracking-widest text-xs font-bold">SYSTEM.LOG {'//'} {project.number}</span>
                                    <span className="text-white_clinical font-bold uppercase tracking-widest text-xs">{project.type}</span>
                                </div>
                                <p className="leading-relaxed">
                                    {project.description}
                                </p>
                                <p className="leading-relaxed text-white_clinical/70">
                                    {project.longDescription || `(Extended information, architecture schematics, and functional walkthroughs can be injected here for ${project.title}. This overlay maintains the immersive background context while providing deeper technical insights natively inside the carousel.)`}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray_interference">
                                    {project.tags.map((tag, i) => (
                                    <span key={i} className="border border-green_signal/30 text-green_signal px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                                        {tag}
                                    </span>
                                    ))}
                                </div>
                                                         {/* Button to open Gallery (Sheet 3) if assets exist */}
                                {(project.assets || project.walkthroughVideo) && (
                                    <div className="mt-4">
                                        {project.walkthroughVideo ? (
                                            <button 
                                                onClick={() => setLightboxAsset({ 
                                                    type: 'video', 
                                                    src: project.walkthroughVideo!,
                                                    title: "System Walkthrough",
                                                    description: "Functional overview and processing pipeline demonstration for the Perceptual Translation System.",
                                                    headphonesRequired: true
                                                })} 
                                                className="inline-flex items-center gap-2 bg-white_clinical text-black_core px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-green_signal transition-colors w-fit border-none cursor-pointer outline-none"
                                            >
                                                Watch Walkthrough
                                                <ExternalLinkIcon />
                                            </button>
                                        ) : project.isBlueprintProject ? (
                                            <button 
                                                onClick={() => setViewState(2)} 
                                                className="inline-flex items-center gap-2 bg-white_clinical text-black_core px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-green_signal transition-colors w-fit border-none cursor-pointer outline-none shadow-lg"
                                            >
                                                View Technical Schematics
                                                <ExternalLinkIcon />
                                            </button>
                                         ) : (
                                             <button 
                                                 onClick={() => setViewState(2)} 
                                                 className="inline-flex items-center gap-2 bg-white_clinical text-black_core px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-green_signal transition-colors w-fit border-none cursor-pointer outline-none"
                                             >
                                                 Show Visual Gallery
                                                 <ExternalLinkIcon />
                                             </button>
                                         )}
                                     </div>
                                 )}
                             </div>
                         </div>

                         {/* Content Layer (Scrollable Gallery / Blueprint Tab - Sheet 3) */}
                         <div className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-background transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${viewState === 2 && isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'}`}>
                             {project.isBlueprintProject ? (
                                 <BlueprintTabViewer project={project} onExpand={(asset) => setLightboxAsset(asset)} />
                             ) : (
                                 <>
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
                                             <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85] mb-6 drop-shadow-sm mix-blend-difference">
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
                                                             <video src={asset.src} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
                                                         ) : (
                                                             <img src={asset.src} alt={`Asset ${i}`} className="w-full h-auto object-cover" loading="lazy" />
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
                                 </>
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
                        className={`absolute bottom-6 md:bottom-16 right-6 md:right-16 pointer-events-auto text-white_clinical hover:text-green_signal transition-all duration-300 group flex items-center gap-4 cursor-pointer outline-none bg-transparent border-none drop-shadow-sm ${viewState === 2 ? 'z-50 text-foreground mix-blend-difference !text-white' : 'z-40'}`}
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
                {lightboxAsset.headphonesRequired && (
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/70 backdrop-blur-md border border-white/20 text-white px-4 py-2 md:px-5 md:py-3 font-mono text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-3 rounded-sm shadow-xl pointer-events-auto z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                        Use Headphones
                    </div>
                )}
                {lightboxAsset.description && (
                    <div className="absolute bottom-8 left-4 md:bottom-12 md:left-12 bg-black/70 backdrop-blur-md border border-white/20 text-white p-4 md:p-5 max-w-xs md:max-w-sm font-mono text-xs leading-relaxed hidden sm:block rounded-sm shadow-xl pointer-events-auto z-10">
                        <div className="text-green_signal font-bold mb-2 uppercase tracking-widest text-[10px] md:text-xs">{lightboxAsset.title}</div>
                        <div className="opacity-80">{lightboxAsset.description}</div>
                    </div>
                )}
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
                        className={`max-w-full max-h-full object-contain shadow-2xl pointer-events-auto ${lightboxAsset.invertInDarkMode ? 'theme-invert' : ''}`} 
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
        ${lightboxAsset ? `
        #custom-cursor {
            display: none !important;
        }
        * {
            cursor: auto !important;
        }
        ` : ''}
      `}} />
    </section>
  );
}
