"use client";

import React, { useState } from "react";
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

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setIsChanging(true);
    setTimeout(() => {
      setDisplayIndex(idx);
      setIsChanging(false);
    }, 200);
  };

  const itemHeight = 64;

  return (
    <section id="skills" className="w-full bg-transparent text-white_clinical py-32 md:py-48">
      <div className="grid grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Menu: Scrolling List */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <div className="relative h-[300px] w-full overflow-visible pointer-events-none">
            <motion.div 
              className="absolute w-full pointer-events-auto"
              initial={false}
              animate={{ y: `calc(150px - ${activeIndex * itemHeight}px - ${itemHeight / 2}px)` }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
            >
              {skillsData.map((item, idx) => {
                const distance = Math.abs(idx - activeIndex);
                
                let styleClass = "opacity-100 scale-100 font-bold text-white_clinical";
                if (distance === 1) styleClass = "opacity-40 scale-95 text-white_faded font-medium";
                if (distance === 2) styleClass = "opacity-20 scale-90 text-gray_signal blur-[1px]";
                if (distance > 2) styleClass = "opacity-0 scale-90 text-gray_signal blur-[2px] pointer-events-none";

                const isActive = idx === activeIndex;

                return (
                  <div 
                    key={idx} 
                    onClick={() => handleSelect(idx)}
                    className={`h-[64px] cursor-pointer transition-all duration-500 ease-out flex items-center justify-between group origin-left ${styleClass}`}
                  >
                    <h3 className={`text-base md:text-lg transition-colors font-mono`}>
                      {item.q}
                    </h3>
                    {isActive && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white_clinical font-mono font-black text-sm ml-4"
                      >
                        ↑ ↓
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
        
        {/* Right Side: Terminal Window Style */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl text-white_clinical mb-6 font-mono tracking-tight">System Capabilities & Expertise.</h2>
          
          <div className="flex flex-col bg-black_core/50 border border-gray_interference rounded-md overflow-hidden">
            {/* IN Section */}
            <div className="flex gap-4 border-b border-gray_interference p-6 md:p-8">
               <span className="text-gray_signal font-mono text-sm tracking-widest">IN:</span>
               <span className="uppercase text-white_clinical font-mono text-sm tracking-wider">
                  {skillsData[activeIndex].q}
               </span>
            </div>
            
            {/* OUT Section */}
            <div className="flex gap-4 p-6 md:p-8 min-h-[150px]">
               <span className="text-gray_signal font-mono text-sm tracking-widest mt-1">OUT:</span>
               <div className="flex-1">
                 <AnimatePresence mode="wait">
                   {!isChanging && (
                     <motion.span 
                       key={displayIndex}
                       initial={{ opacity: 0, y: 5 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, transition: { duration: 0.1 } }}
                       transition={{ duration: 0.3 }}
                       className="font-sans text-white_faded leading-relaxed text-base md:text-lg inline-block"
                     >
                       {skillsData[displayIndex].a}
                     </motion.span>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
