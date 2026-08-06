"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!<>[]{}";

// Deterministic scramble generator for SSR and initial hydration parity
function getDeterministicScramble(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ' || text[i] === '\n') {
      result += text[i];
    } else {
      const idx = (text.charCodeAt(i) * 17 + i * 11) % CHARS.length;
      result += CHARS[idx];
    }
  }
  return result;
}

function ScrambleText({ text, scrollYProgress }: { text: string; scrollYProgress: MotionValue<number> }) {
  const [isMounted, setIsMounted] = useState(false);
  const staticScramble = useMemo(() => getDeterministicScramble(text), [text]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayText = useTransform(scrollYProgress, (latest) => {
    if (latest >= 1) return text;
    if (latest <= 0) return staticScramble;

    const correctCount = Math.floor(latest * text.length);
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ' || text[i] === '\n') {
        result += text[i];
        continue;
      }
      if (i < correctCount) {
        result += text[i];
      } else {
        const charIdx = (text.charCodeAt(i) + Math.floor(latest * 100) + i) % CHARS.length;
        result += CHARS[charIdx];
      }
    }
    return result;
  });

  if (!isMounted) {
    return <span>{staticScramble}</span>;
  }

  return <motion.span>{displayText}</motion.span>;
}

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

function SkillRow({ item }: { item: { q: string, a: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 90%"] 
  });
  
  // Fade in the row during the first 20% of its scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  const values = item.a.split(',').map(v => v.trim().toUpperCase());

  return (
    <motion.div ref={ref} style={{ opacity }} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
      {/* Left Column: Key */}
      <div className="md:col-span-5 text-white_clinical tracking-wider text-sm md:text-base leading-loose">
        <ScrambleText text={`[${item.q.toUpperCase()}]`} scrollYProgress={scrollYProgress} />
      </div>
      
      {/* Right Column: Values */}
      <div className="md:col-span-7 flex flex-col">
        {values.map((val, vIdx) => (
          <span key={vIdx} className="text-white_clinical text-sm md:text-base tracking-wider leading-loose">
            <ScrambleText text={val} scrollYProgress={scrollYProgress} />
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="w-full bg-transparent text-white_clinical py-32 md:py-48 overflow-hidden font-mono"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-10 md:gap-y-14">
          {skillsData.map((item, idx) => (
            <SkillRow key={idx} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
