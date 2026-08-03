"use client";

import React from "react";

const skillsData = [
  {
    q: "Languages & Data",
    a: "Python, C++, MATLAB, R, SQL"
  },
  {
    q: "Frameworks",
    a: "PyTorch, TensorFlow, Scikit-Learn"
  },
  {
    q: "Audio ML & Research",
    a: "Multimodal Pipelines, VGGish, YAMNet, Whisper, Meta AudioCraft"
  },
  {
    q: "Methods",
    a: "Audio-Text Retrieval (CLAP), Dataset Curation, Supervised/Unsupervised Learning, CNNs, RNNs"
  },
  {
    q: "Embedded & Hardware",
    a: "Arduino, Raspberry Pi, Daisy Seed"
  },
  {
    q: "Integration",
    a: "Sensor Integration, Automation, API Development (Flask, FastAPI, Docker)"
  },
  {
    q: "Audio & DSP Tools",
    a: "Dolby Atmos Immersive, Max/MSP, PureData, JUCE, Csound, SuperCollider, Ableton Live"
  },
  {
    q: "Applications",
    a: "Pro Tools, Logic Pro, Ableton"
  }
];

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="w-full bg-transparent text-white_clinical py-32 md:py-48 overflow-hidden font-mono"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 xl:px-24">
        
        <div className="flex flex-col gap-10 md:gap-14">
          {skillsData.map((item, idx) => {
            const values = item.a.split(',').map(v => v.trim().toUpperCase());
            
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
                {/* Left Column: Key */}
                <div className="md:col-span-5 text-white_clinical tracking-wider text-sm md:text-base leading-loose">
                  [{item.q.toUpperCase()}]
                </div>
                
                {/* Right Column: Values */}
                <div className="md:col-span-7 flex flex-col">
                  {values.map((val, vIdx) => (
                    <span key={vIdx} className="text-white_clinical text-sm md:text-base tracking-wider leading-loose">
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
