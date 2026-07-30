import React from "react";
import { Panel } from "./Panel";
import { DataBlock } from "./DataBlock";

export default function Skills() {
  return (
    <section className="grid grid-cols-12 gap-6 w-full mt-6">
      <div className="col-span-12">
        <Panel title="SYSTEM CAPABILITIES & EXPERTISE" status="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-4">
              <DataBlock label="Languages & Data" value="Python, C++" highlight />
              <DataBlock label="Frameworks" value="PyTorch, TensorFlow" />
            </div>
            
            <div className="flex flex-col gap-4">
              <DataBlock label="Audio ML & Research" value="Multimodal Pipelines" highlight />
              <DataBlock label="Methods" value="Audio-Text Retrieval (CLAP), Dataset Curation" />
            </div>

            <div className="flex flex-col gap-4">
              <DataBlock label="Embedded & Hardware" value="Arduino, Raspberry Pi" highlight />
              <DataBlock label="Integration" value="Sensor Integration, Automation" />
            </div>

            <div className="flex flex-col gap-4">
              <DataBlock label="Audio & DSP Tools" value="Dolby Atmos Immersive" highlight />
              <DataBlock label="Applications" value="Pro Tools, Logic Pro, Ableton" />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray_interference flex flex-col gap-2">
            <div className="text-[10px] text-gray_signal uppercase">Runtime Metrics</div>
            <div className="flex justify-between text-xs">
              <span className="text-white_faded">AUDIO_ML_PIPELINES</span>
              <span className="text-green_signal">LOCAL_FIRST_OFFLINE</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white_faded">IMMERSIVE_AUDIO_ENGINE</span>
              <span className="text-white_clinical">DOLBY_ATMOS_COMPLIANT</span>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
