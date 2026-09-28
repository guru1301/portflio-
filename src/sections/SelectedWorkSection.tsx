import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { PROJECTS_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply horizontal pin on desktop screens (md: 768px+)
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop || !sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainerRef.current!.scrollWidth - window.innerWidth;

      gsap.to(scrollContainerRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth * 1.2}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#111115] overflow-hidden">
      {/* Desktop Horizontal Pin Layout */}
      <div className="hidden md:block min-h-screen">
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap items-center h-screen pl-12 lg:pl-24 pr-24 lg:pr-48 gap-16 lg:gap-24"
        >
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="w-[80vw] lg:w-[68vw] max-w-[1100px] flex-none flex flex-col justify-center h-[82vh] group cursor-pointer"
              onClick={() => onSelectProject(project)}
              data-cursor="project"
              data-cursor-label="OPEN"
            >
              {/* Project Card — white card on black bg */}
              <div className="relative w-full h-full bg-white border border-black/10 rounded-3xl p-8 lg:p-12 flex flex-col justify-between overflow-hidden group-hover:border-[#e63946] transition-colors duration-500 shadow-xl">

                {/* Card Header */}
                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="font-mono-custom text-xs font-bold text-[#e63946] tracking-widest uppercase">
                      [ PROJECT {project.number} ]
                    </span>
                    <h3 className="font-display text-4xl lg:text-6xl font-black text-[#111115] tracking-tighter uppercase mt-1 group-hover:text-[#e63946] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-mono-custom text-sm text-[#555560] mt-1 font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-[#111115] group-hover:bg-[#e63946] group-hover:text-white group-hover:border-[#e63946] transition-all duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>

                {/* Image */}
                <div className="relative my-6 w-full flex-1 rounded-2xl overflow-hidden bg-[#f0efec] border border-black/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                    <p className="font-mono-custom text-xs text-white/80">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/10 z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full border border-black/10 bg-[#f5f4f0] font-mono-custom text-[11px] text-[#555560]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono-custom text-xs text-[#e63946] uppercase tracking-wider font-semibold group-hover:underline">
                    EXPLORE CASE STUDY →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Fallback — also white cards on black bg */}
      <div className="block md:hidden px-6 py-12 space-y-10">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="w-full bg-white border border-black/10 rounded-2xl p-6 flex flex-col space-y-4 shadow-lg active:scale-[0.99] transition-transform"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono-custom text-xs font-bold text-[#e63946]">
                {project.number}
              </span>
              <span className="font-mono-custom text-[11px] text-[#888895] uppercase">
                {project.category}
              </span>
            </div>

            <div>
              <h3 className="font-display text-3xl font-black text-[#111115] uppercase">
                {project.title}
              </h3>
              <p className="font-mono-custom text-xs text-[#555560] mt-1">
                {project.subtitle}
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full border border-black/10 bg-[#f5f4f0] text-[10px] font-mono-custom text-[#555560]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button className="w-full py-3 rounded-xl border border-[#e63946] text-[#e63946] font-mono-custom text-xs uppercase tracking-wider font-bold hover:bg-[#e63946] hover:text-white transition-colors">
              VIEW CASE STUDY
            </button>
          </div>
        ))}
      </div>
    </section>
  
  );
};
