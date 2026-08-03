"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillsData = [
  {
    q: "Languages & Data",
    a: "Python, C++"
  },
  {
    q: "Frameworks",
    a: "PyTorch, TensorFlow"
  },
  {
    q: "Audio ML & Research",
    a: "Multimodal Pipelines"
  },
  {
    q: "Methods",
    a: "Audio-Text Retrieval (CLAP), Dataset Curation"
  },
  {
    q: "Embedded & Hardware",
    a: "Arduino, Raspberry Pi"
  },
  {
    q: "Integration",
    a: "Sensor Integration, Automation"
  },
  {
    q: "Audio & DSP Tools",
    a: "Dolby Atmos Immersive"
  },
  {
    q: "Applications",
    a: "Pro Tools, Logic Pro, Ableton"
  }
];

export default function Skills() {
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
      handleSelect(Math.min(skillsData.length - 1, activeIndex + 1));
    } else if (e.deltaY < -10) {
      handleSelect(Math.max(0, activeIndex - 1));
    }
    wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 400);
  };

  const itemHeight = 64; 

  const itemVariants = {
    active: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.3 } },
    next1: { opacity: 0.5, filter: "blur(2px)", scale: 0.95, transition: { duration: 0.3 } },
    next2: { opacity: 0.2, filter: "blur(4px)", scale: 0.9, transition: { duration: 0.3 } },
    hidden: { opacity: 0, filter: "blur(8px)", scale: 0.8, transition: { duration: 0.3 } }
  };

  return (
    <section 
      id="skills" 
      className="w-full bg-transparent text-white_clinical py-32 md:py-48 overflow-hidden"
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
              transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
            >
              {skillsData.map((item, idx) => {
                const distance = Math.abs(idx - activeIndex);
                let state = "hidden";
                if (distance === 0) state = "active";
                else if (distance === 1) state = "next1";
                else if (distance === 2) state = "next2";

                const isActive = idx === activeIndex;
                const fontClass = isActive ? "font-bold text-white_clinical" : "font-medium text-white_faded";

                return (
                  <motion.div 
                    key={idx} 
                    onClick={() => handleSelect(idx)}
                    variants={itemVariants}
                    initial={false}
                    animate={state}
                    whileHover={!isActive ? { opacity: 0.8, filter: "blur(0px)", scale: 0.98, transition: { duration: 0.2 } } : {}}
                    className={`h-[64px] cursor-pointer flex items-center justify-between group origin-left ${fontClass}`}
                  >
                    <h3 className="text-base md:text-lg font-mono transition-colors duration-300">
                      {item.q}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span 
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          className="text-white_clinical font-mono font-black text-sm ml-4"
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
          <h2 className="text-xl md:text-2xl text-white_clinical mb-6 font-mono tracking-tight">System Capabilities & Expertise.</h2>
          
          <motion.div 
            layout 
            className="flex flex-col bg-black_core/50 border border-gray_interference rounded-md shadow-sm overflow-hidden"
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* IN Section */}
            <div className="flex gap-4 border-b border-gray_interference p-6 md:p-8">
               <span className="text-gray_signal font-mono text-sm tracking-widest mt-0.5">IN:</span>
               <AnimatePresence mode="popLayout">
                 <motion.span 
                   key={activeIndex}
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                   className="uppercase text-white_clinical font-mono text-sm tracking-wider"
                 >
                   {skillsData[activeIndex].q}
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
                       initial={{ opacity: 0, y: 5 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, transition: { duration: 0.1 } }}
                       transition={{ duration: 0.3 }}
                       className="font-sans text-white_faded leading-relaxed text-base md:text-lg block"
                     >
                       {skillsData[displayIndex].a}
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
