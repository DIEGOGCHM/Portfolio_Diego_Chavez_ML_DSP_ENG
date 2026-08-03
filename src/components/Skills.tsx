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
    }, 200); // Small delay to simulate terminal thinking / typing
  };

  const itemHeight = 64; // Fixed height per item for reliable math

  return (
    <section id="skills" className="w-full bg-white text-black py-32 md:py-48 px-6 md:px-12 xl:px-24">
      <div className="grid grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Menu: Scrolling List */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <div className="relative h-[300px] w-full overflow-visible pointer-events-none">
            {/* The list shifts vertically to keep active item perfectly centered */}
            <motion.div 
              className="absolute w-full pointer-events-auto"
              initial={false}
              animate={{ y: `calc(150px - ${activeIndex * itemHeight}px - ${itemHeight / 2}px)` }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
            >
              {skillsData.map((item, idx) => {
                const distance = Math.abs(idx - activeIndex);
                
                let styleClass = "opacity-100 scale-100 font-bold text-black";
                if (distance === 1) styleClass = "opacity-40 scale-95 text-gray-700 font-medium";
                if (distance === 2) styleClass = "opacity-20 scale-90 text-gray-500 blur-[1px]";
                if (distance > 2) styleClass = "opacity-0 scale-90 text-gray-400 blur-[2px] pointer-events-none";

                const isActive = idx === activeIndex;

                return (
                  <div 
                    key={idx} 
                    onClick={() => handleSelect(idx)}
                    className={`h-[64px] cursor-pointer transition-all duration-500 ease-out flex items-center justify-between group origin-left ${styleClass}`}
                  >
                    <h3 className={`text-base md:text-lg transition-colors`}>
                      {item.q}
                    </h3>
                    {isActive && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-black font-sans font-black text-sm ml-4"
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
          <h2 className="text-xl md:text-2xl text-black mb-6 font-serif tracking-tight">System Capabilities & Expertise.</h2>
          
          <div className="flex flex-col bg-white border border-[#EAEAEA] rounded-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* IN Section */}
            <div className="flex gap-4 border-b border-[#EAEAEA] p-6 md:p-8">
               <span className="text-gray-400 font-mono text-sm tracking-widest">IN:</span>
               <span className="uppercase text-black font-mono text-sm tracking-wider">
                  {skillsData[activeIndex].q}
               </span>
            </div>
            
            {/* OUT Section */}
            <div className="flex gap-4 p-6 md:p-8 min-h-[150px]">
               <span className="text-gray-400 font-mono text-sm tracking-widest mt-1">OUT:</span>
               <div className="flex-1">
                 <AnimatePresence mode="wait">
                   {!isChanging && (
                     <motion.span 
                       key={displayIndex}
                       initial={{ opacity: 0, y: 5 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, transition: { duration: 0.1 } }}
                       transition={{ duration: 0.3 }}
                       className="font-serif text-black leading-relaxed text-base md:text-lg inline-block"
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
