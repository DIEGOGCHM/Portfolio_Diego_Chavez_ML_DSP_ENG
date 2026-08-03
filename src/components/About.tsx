"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const aboutData = [
  {
    q: "Author Metadata",
    a: "Diego Guillermo Chávez Muñoz. Audio and music technology specialist with cross-disciplinary experience in audio machine learning, multimodal systems, dataset curation, and sound-focused technical production. Graduated with First Class Honours from the University of Hull (UK) and completing his BSc in Technology and Music Production at Tecnológico de Monterrey."
  },
  {
    q: "Experience Highlights",
    a: "Bridging applied ML, DSP thinking, and creative audio engineering. Experience includes Dolby Atmos mixing & Music Supervision, Applied Audio ML Prototyping (PyTorch, CLAP, Stable Audio), Embedded systems & Electromechanical art installations, and Audio dataset curation for contrastive learning."
  },
  {
    q: "Core Focus",
    a: "Audio ML & Multimodal Retrieval, Embedded Audio & Electromechanical Integration, Dolby Atmos Mixing & Immersive Audio, and Audio Dataset Design for Contrastive Models."
  },
  {
    q: "Direction & Goal",
    a: "Committed to pushing the boundaries of spatial and generative audio workflows through perceptual audio feature integration, privacy-focused local-first workflows, and empirical human evaluation methodologies. The long-term goal is to research and deploy real-time audio AI systems in collaborative R&D environments."
  }
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setIsChanging(true);
    setTimeout(() => {
      setDisplayIndex(idx);
      setIsChanging(false);
    }, 200); 
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (wheelTimeout.current) return;
    if (e.deltaY > 10) {
      handleSelect(Math.min(aboutData.length - 1, activeIndex + 1));
    } else if (e.deltaY < -10) {
      handleSelect(Math.max(0, activeIndex - 1));
    }
    wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 400);
  };

  const itemHeight = 64; 

  const itemVariants = {
    active: { opacity: 1, filter: "blur(0px)", color: "var(--white_clinical)", fontWeight: 700, transition: { duration: 0.3 } },
    next1: { opacity: 0.5, filter: "blur(2px)", color: "var(--white_faded)", fontWeight: 500, transition: { duration: 0.3 } },
    next2: { opacity: 0.2, filter: "blur(4px)", color: "var(--gray_signal)", fontWeight: 400, transition: { duration: 0.3 } },
    hidden: { opacity: 0, filter: "blur(8px)", color: "var(--gray_signal)", fontWeight: 400, transition: { duration: 0.3 } }
  };

  return (
    <section 
      id="about" 
      className="w-full bg-transparent text-white_clinical py-32 md:py-48 overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Menu: Scrolling List */}
        <div 
          className="col-span-12 md:col-span-5 flex flex-col pt-8"
          onWheel={handleWheel}
        >
          <div 
            className="relative h-[300px] w-full"
            style={{ maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)" }}
          >
            {/* STATIC SELECTION INDICATOR */}
            <div className="absolute right-0 top-[150px] -translate-y-1/2 z-20 pointer-events-none">
              <span className="font-mono font-black text-sm" style={{ color: "var(--white_clinical)" }}>
                ↑ ↓
              </span>
            </div>

            <motion.div 
              className="absolute w-full"
              initial={false}
              animate={{ y: `calc(150px - ${activeIndex * itemHeight}px - ${itemHeight / 2}px)` }}
              transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1 }}
            >
              {aboutData.map((item, idx) => {
                const distance = Math.abs(idx - activeIndex);
                let state = "hidden";
                if (distance === 0) state = "active";
                else if (distance === 1) state = "next1";
                else if (distance === 2) state = "next2";

                const isActive = idx === activeIndex;

                return (
                  <motion.div 
                    key={idx} 
                    onClick={() => handleSelect(idx)}
                    variants={itemVariants}
                    initial={false}
                    animate={state}
                    whileHover={!isActive ? { opacity: 0.9, filter: "blur(0px)", color: "var(--white_clinical)", transition: { duration: 0.2 } } : {}}
                    className="h-[64px] cursor-pointer flex items-center justify-between group origin-left"
                  >
                    <motion.h3 
                      className="text-base md:text-lg font-mono"
                    >
                      {item.q}
                    </motion.h3>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
        
        {/* Right Side: Terminal Window Style */}
        <div className="col-span-12 md:col-span-7 flex flex-col pt-8">
          <h2 className="text-xl md:text-2xl text-white_clinical mb-6 font-mono tracking-tight">Author Metadata.</h2>
          
          <motion.div 
            layout 
            className="flex flex-col bg-black_core/50 border border-gray_interference rounded-md shadow-sm overflow-hidden"
            transition={{ type: "spring", stiffness: 70, damping: 15, mass: 1 }}
          >
            {/* IN Section */}
            <div className="flex gap-4 border-b border-gray_interference p-6 md:p-8">
               <span className="text-gray_signal font-mono text-sm tracking-widest mt-0.5">IN:</span>
               <AnimatePresence mode="popLayout">
                 <motion.span 
                   key={activeIndex}
                   initial={{ opacity: 0, filter: "blur(4px)" }}
                   animate={{ opacity: 1, filter: "blur(0px)" }}
                   exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   className="uppercase text-white_clinical font-mono text-sm tracking-wider"
                 >
                   {aboutData[activeIndex].q}
                 </motion.span>
               </AnimatePresence>
            </div>
            
            {/* OUT Section */}
            <motion.div layout className="flex gap-4 p-6 md:p-8">
               <span className="text-gray_signal font-mono text-sm tracking-widest mt-1">OUT:</span>
               <div className="flex-1 relative">
                 <AnimatePresence mode="popLayout">
                   {!isChanging && (
                     <motion.span 
                       key={displayIndex}
                       initial={{ opacity: 0, filter: "blur(4px)" }}
                       animate={{ opacity: 1, filter: "blur(0px)" }}
                       exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
                       transition={{ duration: 0.4, ease: "easeOut" }}
                       className="font-sans text-white_faded leading-relaxed text-base md:text-lg block"
                     >
                       {aboutData[displayIndex].a}
                     </motion.span>
                   )}
                 </AnimatePresence>
               </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
