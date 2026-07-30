import React from "react";

interface DataBlockProps {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
}

export function DataBlock({ label, value, highlight = false }: DataBlockProps) {
  return (
    <div className="flex flex-col border border-gray_interference bg-black_core mt-[-1px]">
      <div className="text-[10px] uppercase text-white_faded border-b border-gray_interference bg-gray_interference/20 px-2 py-1">
        {label}
      </div>
      <div className={`text-sm px-2 py-2 font-mono ${highlight ? "text-green_signal" : "text-white_clinical"}`}>
        {value}
      </div>
    </div>
  );
}
