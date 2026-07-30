import React from "react";
import { Panel } from "./Panel";

export default function About() {
  return (
    <section id="about" className="grid grid-cols-12 gap-6 w-full">
      <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
        <Panel title="AUTHOR METADATA">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col xl:flex-row gap-6 items-stretch">
              <div className="h-48 sm:h-auto sm:w-32 md:w-48 bg-gray_interference border border-gray_signal flex-shrink-0 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Retrato.jpg" alt="Diego Guillermo Chávez Muñoz" className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 object-top" />
              </div>

              <div className="flex-1 flex flex-col justify-center gap-4">
                <h2 className="text-lg text-white_clinical font-bold leading-tight">Diego Guillermo Chávez Muñoz</h2>
                <div className="text-sm text-white_faded leading-relaxed">
                  <p>Audio and music technology specialist with cross-disciplinary experience in audio machine learning, multimodal systems, dataset curation, and sound-focused technical production. Graduated with First Class Honours from the University of Hull (UK) and completing his BSc in Technology and Music Production at Tecnológico de Monterrey. Focuses on bridging applied ML, DSP thinking, and creative audio engineering.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-white_faded">
              <div className="border-t border-gray_interference pt-4">
                <span className="block text-gray_signal uppercase text-xs mb-2 tracking-widest">Experience Includes:</span>
                <ul className="list-disc list-inside space-y-1">
                  <li>Dolby Atmos mixing & Music Supervision</li>
                  <li>Applied Audio ML Prototyping (PyTorch, CLAP, Stable Audio)</li>
                  <li>Embedded systems & Electromechanical art installations</li>
                  <li>Audio dataset curation for contrastive learning</li>
                </ul>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
        <Panel title="FOCUS" status="active">
          <ul className="space-y-2 text-sm text-white_clinical font-mono">
            <li className="border-l-2 border-green_signal pl-3">Audio ML & Multimodal Retrieval</li>
            <li className="border-l-2 border-green_signal pl-3">Embedded Audio & Electromechanical Integration</li>
            <li className="border-l-2 border-green_signal pl-3">Dolby Atmos Mixing & Immersive Audio</li>
            <li className="border-l-2 border-green_signal pl-3">Audio Dataset Design for Contrastive Models</li>
          </ul>
        </Panel>

        <Panel title="DIRECTION & GOAL">
          <div className="space-y-4 text-sm text-white_faded leading-relaxed">
            <p>Committed to pushing the boundaries of spatial and generative audio workflows through:</p>
            <ul className="list-disc list-inside space-y-1 text-white_clinical font-mono bg-black_core p-4 border border-gray_interference text-xs">
              <li>perceptual audio feature integration (texture, timbre, spatial quality)</li>
              <li>privacy-focused, local-first workflows for creative professionals</li>
              <li>empirical human evaluation methodologies for generative audio</li>
            </ul>
            <p className="border-l border-green_signal pl-4 pt-2 mt-4 italic text-green_signal">
              The long-term goal is to research and deploy real-time audio AI systems in collaborative R&D environments.
            </p>
          </div>
        </Panel>
      </div>
    </section>
  );
}
