"use client";

import React, { useState } from "react";
import { Panel } from "./Panel";

const faqs = [
  {
    q: "Is any of this written by AI?",
    a: "The underlying architecture and core logic are hand-crafted, but I frequently use LLMs to accelerate prototyping, generate boilerplate, and debug complex DSP algorithms."
  },
  {
    q: "How do you build your audio pipelines?",
    a: "I primarily use Python, PyTorch, and specialized models like CLAP for semantic audio retrieval, combined with custom C++ DSP nodes when real-time performance is critical."
  },
  {
    q: "Are you available for freelance work?",
    a: "Yes, I am currently open to freelance opportunities, specifically in audio ML prototyping, dataset curation, and Dolby Atmos immersive mixing."
  },
  {
    q: "Can you build custom hardware interfaces?",
    a: "Yes! I integrate microcontrollers like Arduino and Raspberry Pi with various sensors to create interactive, electromechanical art installations."
  },
  {
    q: "Where are you based?",
    a: "I am based in Mexico, completing my BSc at Tecnológico de Monterrey, but I am fully equipped to collaborate with teams globally on a remote basis."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section id="faq" className="grid grid-cols-12 gap-6 md:gap-12 w-full mt-12 mb-12">
      
      {/* Left Menu: Fading Question List */}
      <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
        <div className="flex flex-col gap-6 md:gap-8 relative">
          {faqs.map((faq, idx) => {
            const distance = Math.abs(idx - activeIndex);
            
            // Calculate opacity and blur based on distance to replicate the mockup's depth effect
            let styleClass = "opacity-100 scale-100";
            if (distance === 1) styleClass = "opacity-50 scale-95";
            if (distance === 2) styleClass = "opacity-25 scale-90 blur-[1px]";
            if (distance > 2) styleClass = "opacity-10 scale-90 blur-[2px]";

            const isActive = idx === activeIndex;

            return (
              <div 
                key={idx} 
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer transition-all duration-500 ease-out flex items-center justify-between group origin-left ${styleClass}`}
              >
                <h3 className={`text-base md:text-lg font-bold transition-colors ${isActive ? 'text-white_clinical' : 'text-white_faded group-hover:text-white_clinical'}`}>
                  {faq.q}
                </h3>
                {isActive && (
                  <span className="text-gray_signal font-mono text-xs hidden md:block tracking-widest">
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
        <h2 className="text-xl md:text-2xl text-white_clinical font-bold mb-6 font-mono tracking-tight">Common Questions.</h2>
        
        {/* We use the existing Panel to maintain the site's aesthetic frame */}
        <Panel noPadding>
          <div className="flex flex-col bg-black_core/50">
            {/* IN Section */}
            <div className="flex gap-4 border-b border-gray_interference p-6 md:p-8 font-mono text-sm md:text-base transition-all duration-300">
               <span className="text-gray_signal font-bold">IN:</span>
               <span className="uppercase text-white_clinical tracking-wide">{faqs[activeIndex].q}</span>
            </div>
            
            {/* OUT Section */}
            <div className="flex gap-4 p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed text-white_faded transition-all duration-300 min-h-[150px]">
               <span className="text-gray_signal font-bold">OUT:</span>
               <span className="animate-in fade-in duration-500">{faqs[activeIndex].a}</span>
            </div>
          </div>
        </Panel>
      </div>

    </section>
  );
}
