"use client";

import { motion } from 'framer-motion';
import { ArrowDown, Code, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 overflow-hidden border-b-2 border-gray_interference">
      {/* Brutalist accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green_signal/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green_signal/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto w-full z-10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-12 bg-green_signal"></div>
          <p className="font-mono text-green_signal font-bold uppercase tracking-widest text-sm">
            Audio Innovation / ML / DSP
          </p>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-foreground mb-8">
          Engineering <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green_signal to-amber_decay">
            Next-Gen
          </span> <br />
          Audio
        </h1>

        <p className="max-w-2xl text-xl md:text-2xl text-gray_signal font-mono mb-12 leading-relaxed">
          Machine Learning DSP Engineer focused on developing audio algorithms and deploying cutting-edge ML solutions to embedded platforms.
        </p>

        <div className="flex flex-wrap gap-6">
          <a href="#projects" className="bg-green_signal text-black_core px-8 py-4 font-mono font-bold uppercase tracking-wide transition-all flex items-center gap-2">
            View Projects <ArrowDown size={20} />
          </a>
          <a href="#contact" className="bg-transparent border-2 border-white_clinical text-white_clinical px-8 py-4 font-mono font-bold uppercase tracking-wide hover:bg-white_clinical hover:text-black_core transition-colors flex items-center gap-2">
            Contact Me <Code size={20} />
          </a>
        </div>
      </motion.div>

      {/* Decorative brutalist tech elements */}
      <div className="absolute right-12 bottom-24 hidden lg:flex flex-col gap-4 text-gray_signal font-mono text-xs opacity-50">
        <div className="flex items-center gap-2">
          <Cpu size={16} />
          <span>SYS.AUDIO.DSP // ACTIVE</span>
        </div>
        <div>ML_MODELS: LOADED</div>
        <div>TARGET: EMBEDDED_PLATFORM</div>
        <div className="w-full h-[1px] bg-gray_signal mt-2"></div>
      </div>
    </section>
  );
}
