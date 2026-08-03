"use client";

import React, { useState } from "react";
import { motion, useDragControls } from "framer-motion";

interface PanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  status?: "active" | "inactive" | "warning";
  noPadding?: boolean;
}

export function Panel({ children, title, className = "", status, noPadding = false }: PanelProps) {
  const dragControls = useDragControls();
  const [zIndex, setZIndex] = useState(1);

  return (
    <motion.div 
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={() => setZIndex(10)}
      onPointerUp={() => setZIndex(1)}
      style={{ zIndex }}
      className={`flex flex-col bg-[#111111]/80 backdrop-blur-md border border-[#F4F4F0]/20 shadow-2xl overflow-hidden rounded-sm relative ${className}`}
    >
      {title && (
        <div 
          className="can-drag h-6 min-h-[24px] border-b border-[#F4F4F0]/20 flex justify-between items-center px-4 cursor-none bg-[#111111] hover:bg-[#1a1a1a] transition-colors"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#F4F4F0]/60">{title}</span>
          {status && (
            <div className="flex items-center gap-2">
              <div 
                className={`w-1.5 h-1.5 rounded-full ${
                  status === "active" ? "bg-green_signal" : 
                  status === "warning" ? "bg-amber_decay" : "bg-gray_signal"
                }`} 
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#F4F4F0]/60 opacity-70">
                {status}
              </span>
            </div>
          )}
        </div>
      )}
      <div className={`${noPadding ? 'p-0' : 'p-4'} flex-grow relative`}>
        {children}
      </div>
    </motion.div>
  );
}
