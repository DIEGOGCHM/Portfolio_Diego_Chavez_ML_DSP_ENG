"use client";

import React, { useEffect, useState } from "react";

export function Header() {
  const [theme, setTheme] = useState<"terminal" | "print">("print");

  useEffect(() => {
    // Check if there is a saved preference or default to print
    if (theme === "terminal") {
      document.documentElement.setAttribute("data-theme", "terminal");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "terminal" ? "print" : "terminal");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="flex justify-between items-center px-6 py-4 text-xs font-mono uppercase tracking-widest text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green_signal animate-pulse" />
            <span className="opacity-70">SYS.ONLINE</span>
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="hover:text-green_signal transition-colors group flex items-center gap-2 cursor-pointer"
        >
          <span>MODE: {theme}</span>
          <span className="opacity-0 group-hover:opacity-100">&gt;</span>
        </button>
      </div>
    </header>
  );
}
