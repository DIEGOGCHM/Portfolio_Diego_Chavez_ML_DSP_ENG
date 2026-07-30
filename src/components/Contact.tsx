import React from "react";
import { Panel } from "./Panel";

export default function Contact() {
  return (
    <section id="contact" className="grid grid-cols-12 gap-6 w-full mt-6 mb-12">
      <div className="col-span-12">
        <Panel title="COMMUNICATION INTERFACE" status="active">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 p-4">
            
            <div className="max-w-2xl flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white_clinical">
                Ready to Connect
              </h2>
              <p className="font-mono text-sm text-white_faded leading-relaxed">
                Looking for a Machine Learning DSP Engineer to push the boundaries of audio technology? Initialize a connection sequence below.
              </p>
              
              <a 
                href="mailto:diego.gchm@gmail.com" 
                className="inline-block w-fit bg-white_clinical text-black_core px-6 py-3 font-mono font-bold uppercase text-xs hover:bg-green_signal hover:text-black_core transition-colors"
              >
                &gt; INITIALIZE_EMAIL
              </a>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs uppercase w-full md:w-auto min-w-[200px]">
              <div className="text-[10px] text-gray_signal mb-2">EXTERNAL LINKS</div>
              
              <a href="https://github.com/DIEGOGCHM" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center border-b border-gray_interference pb-2 hover:text-green_signal transition-colors group">
                <span className="tracking-wide">GitHub</span>
                <span className="text-gray_signal group-hover:text-green_signal">&gt;</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center border-b border-gray_interference pb-2 hover:text-green_signal transition-colors group">
                <span className="tracking-wide">LinkedIn</span>
                <span className="text-gray_signal group-hover:text-green_signal">&gt;</span>
              </a>
              <a href="/cvtech.md" download className="flex justify-between items-center border-b border-gray_interference pb-2 hover:text-green_signal transition-colors group">
                <span className="tracking-wide">Download_CV</span>
                <span className="text-gray_signal group-hover:text-green_signal">&gt;</span>
              </a>
            </div>

          </div>
          
          <div className="mt-12 pt-4 border-t border-gray_interference flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-gray_signal">
            <p>&copy; {new Date().getFullYear()} ML DSP PORTFOLIO. ALL RIGHTS RESERVED.</p>
            <p>SYSTEM.STATE: IDLE // AWAITING_INPUT</p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
