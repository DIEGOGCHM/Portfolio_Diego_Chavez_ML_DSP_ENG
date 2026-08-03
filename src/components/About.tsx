"use client";

import React, { useState } from "react";

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

  return (
    <section id="about" className="w-full bg-white text-black py-24 px-6 md:px-12 xl:px-24 rounded-lg my-12 shadow-2xl">
      <div className="grid grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Menu: Fading List */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <div className="flex flex-col gap-6 relative font-sans">
            {aboutData.map((item, idx) => {
              const distance = Math.abs(idx - activeIndex);
              
              let styleClass = "opacity-100 scale-100 font-bold text-black";
              if (distance === 1) styleClass = "opacity-40 scale-95 text-gray-700 font-medium";
              if (distance === 2) styleClass = "opacity-20 scale-90 text-gray-500 blur-[1px]";
              if (distance > 2) styleClass = "opacity-10 scale-90 text-gray-400 blur-[2px]";

              const isActive = idx === activeIndex;

              return (
                <div 
                  key={idx} 
                  onClick={() => setActiveIndex(idx)}
                  className={`cursor-pointer transition-all duration-500 ease-out flex items-center justify-between group origin-left ${styleClass}`}
                >
                  <h3 className={`text-base md:text-lg transition-colors`}>
                    {item.q}
                  </h3>
                  {isActive && (
                    <span className="text-black font-sans font-black text-sm ml-4">
                      ↑ ↓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Right Side: Terminal Window Style */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
          
          <div className="flex flex-col bg-white border border-[#EAEAEA] rounded-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* IN Section */}
            <div className="flex gap-4 border-b border-[#EAEAEA] p-6 md:p-8">
               <span className="text-gray-400 font-mono text-sm tracking-widest">IN:</span>
               <span className="uppercase text-black font-mono text-sm tracking-wider">{aboutData[activeIndex].q}</span>
            </div>
            
            {/* OUT Section */}
            <div className="flex gap-4 p-6 md:p-8 min-h-[200px]">
               <span className="text-gray-400 font-mono text-sm tracking-widest">OUT:</span>
               <span className="font-serif text-black leading-relaxed text-base md:text-lg animate-in fade-in duration-500">
                 {aboutData[activeIndex].a}
               </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
