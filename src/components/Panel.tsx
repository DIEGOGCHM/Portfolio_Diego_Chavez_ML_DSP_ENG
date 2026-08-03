import React from "react";

interface PanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  status?: "active" | "inactive" | "warning";
  noPadding?: boolean;
}

export function Panel({ children, title, className = "", status, noPadding = false }: PanelProps) {
  return (
    <div className={`border border-gray_interference bg-[#111111]/80 backdrop-blur-md shadow-2xl flex flex-col ${className}`}>
      {title && (
        <div className="border-b border-gray_interference bg-gray_interference/30 px-3 py-1.5 flex justify-between items-center text-xs text-white_faded">
          <span className="uppercase tracking-widest">{title}</span>
          {status && (
            <div className="flex items-center gap-2">
              <div 
                className={`w-1.5 h-1.5 rounded-full ${
                  status === "active" ? "bg-green_signal" : 
                  status === "warning" ? "bg-amber_decay" : "bg-gray_signal"
                }`} 
              />
              <span className="opacity-70">{status.toUpperCase()}</span>
            </div>
          )}
        </div>
      )}
      <div className={`${noPadding ? 'p-0' : 'p-4'} flex-grow`}>
        {children}
      </div>
    </div>
  );
}
