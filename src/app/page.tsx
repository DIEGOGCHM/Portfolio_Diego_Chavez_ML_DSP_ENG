import { HeroCanvas } from "@/components/HeroCanvas";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Swiss grid wrapper that spans everything */}
      <div className="w-full max-w-[1600px] mx-auto border-x border-gray_interference flex flex-col relative min-h-screen">
        
        {/* Scroll-scrubbed Hero block bounded by grid */}
        <div className="w-full relative border-b border-gray_interference">
          <HeroCanvas />
        </div>

        {/* Content with internal grid lines */}
        <div className="p-6 md:p-12 xl:p-24 flex flex-col gap-12 relative overflow-hidden">
          {/* Vertical grid lines (absolute) to give it a blueprint feel */}
          <div className="absolute inset-0 pointer-events-none flex justify-evenly opacity-30 z-0">
            <div className="w-px h-full bg-gray_interference"></div>
            <div className="w-px h-full bg-gray_interference"></div>
            <div className="w-px h-full bg-gray_interference"></div>
          </div>

          <div className="relative z-10 flex flex-col gap-6 md:gap-12">
            <About />
            <FAQ />
            <Projects />
            <Contact />
          </div>
        </div>

      </div>
    </main>
  );
}
