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
    active: { opacity: 1, filter: "blur(0px)", color: "#000000", fontWeight: 700, scale: 1 },
    next1: { opacity: 0.5, filter: "blur(2px)", color: "#666666", fontWeight: 500, scale: 0.95 },
    next2: { opacity: 0.2, filter: "blur(4px)", color: "#AAAAAA", fontWeight: 400, scale: 0.9 },
    hidden: { opacity: 0, filter: "blur(8px)", scale: 0.8 }
  };

  return (
    <section 
      id="about" 
      className="w-screen relative left-1/2 -translate-x-1/2 bg-white text-black py-32 md:py-48 px-6 md:px-12 xl:px-24 overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Menu: Scrolling List */}
        <div 
          className="col-span-12 md:col-span-5 flex flex-col justify-center"
          onWheel={handleWheel}
        >
          <div 
            className="relative h-[300px] w-full"
            style={{ maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)" }}
          >
            <motion.div 
              className="absolute w-full"
              initial={false}
              animate={{ y: `calc(150px - ${activeIndex * itemHeight}px - ${itemHeight / 2}px)` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
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
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="h-[64px] cursor-pointer flex items-center justify-between group origin-left"
                  >
                    <h3 className="text-base md:text-lg font-sans">
                      {item.q}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-black font-sans font-black text-sm ml-4"
                        >
                          ↑ ↓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
        
        {/* Right Side: Terminal Window Style */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl text-black mb-6 font-serif tracking-tight">Author Metadata.</h2>
          
          <motion.div 
            layout 
            className="flex flex-col bg-white border border-[#EAEAEA] rounded-md shadow-sm overflow-hidden"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* IN Section */}
            <div className="flex gap-4 border-b border-[#EAEAEA] p-6 md:p-8">
               <span className="text-gray-400 font-mono text-sm tracking-widest mt-0.5">IN:</span>
               <AnimatePresence mode="wait">
                 <motion.span 
                   key={activeIndex}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0, transition: { duration: 0.1 } }}
                   className="uppercase text-black font-mono text-sm tracking-wider"
                 >
                   {aboutData[activeIndex].q}
                 </motion.span>
               </AnimatePresence>
            </div>
            
            {/* OUT Section */}
            <motion.div layout className="flex gap-4 p-6 md:p-8 min-h-[150px]">
               <span className="text-gray-400 font-mono text-sm tracking-widest mt-1">OUT:</span>
               <div className="flex-1">
                 <AnimatePresence mode="wait">
                   {!isChanging && (
                     <motion.span 
                       key={displayIndex}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0, transition: { duration: 0.1 } }}
                       transition={{ duration: 0.3 }}
                       className="font-serif text-black leading-relaxed text-base md:text-lg inline-block"
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
