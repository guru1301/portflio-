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
      {/* Desktop Horizontal Pin Layout — All Cards Identical Dimensions */}
      <div className="hidden md:block min-h-screen">
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap items-center h-screen pl-12 lg:pl-24 pr-24 lg:pr-48 gap-12 lg:gap-16"
        >
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="w-[72vw] lg:w-[56vw] xl:w-[48vw] max-w-[760px] h-[590px] max-h-[82vh] flex-none flex flex-col justify-center my-auto group cursor-pointer"
              onClick={() => onSelectProject(project)}
              data-cursor="project"
              data-cursor-label="OPEN"
            >
              {/* Project Card — Uniform box dimensions across all projects */}
              <div className="relative w-full h-full bg-white border border-black/10 rounded-3xl p-6 lg:p-7 flex flex-col justify-between overflow-hidden group-hover:border-[#e63946] transition-colors duration-500 shadow-xl">

                {/* Card Header — Fixed uniform height */}
                <div className="flex justify-between items-start z-10 h-[84px] shrink-0">
                  <div className="flex-1 pr-4 min-w-0">
                    <span className="font-mono-custom text-xs font-bold text-[#e63946] tracking-widest uppercase block">
                      [ PROJECT {project.number} ]
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#111115] tracking-tight uppercase mt-1 truncate group-hover:text-[#e63946] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-mono-custom text-xs lg:text-sm text-[#555560] mt-1 font-medium truncate">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center text-[#111115] group-hover:bg-[#e63946] group-hover:text-white group-hover:border-[#e63946] transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Thumbnail — Strict YouTube Banner / Video 16:9 Aspect Ratio */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#0c0c10] border border-black/10 shrink-0 my-auto shadow-inner group/img">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill Tag at Top Right */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    <span className="font-mono-custom text-[10px] text-white/90 tracking-wider uppercase font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Tagline at Bottom */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-black/65 backdrop-blur-md border border-white/10">
                    <p className="font-mono-custom text-xs text-white/90 truncate">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Bar — Fixed uniform height */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-black/10 z-10 h-[48px] shrink-0">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full border border-black/10 bg-[#f5f4f0] font-mono-custom text-[11px] text-[#555560] whitespace-nowrap shrink-0"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono-custom text-xs text-[#e63946] uppercase tracking-wider font-semibold group-hover:underline whitespace-nowrap shrink-0 flex items-center gap-1">
                    EXPLORE CASE STUDY →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Fallback — All Cards Same Uniform Height & Width */}
      <div className="block md:hidden px-5 py-12 space-y-8">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="w-full h-[490px] bg-white border border-black/10 rounded-2xl p-5 flex flex-col justify-between shadow-lg active:scale-[0.99] transition-transform group cursor-pointer"
          >
            {/* Mobile Header */}
            <div className="h-[74px] shrink-0 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="font-mono-custom text-xs font-bold text-[#e63946]">
                  [ PROJECT {project.number} ]
                </span>
                <span className="font-mono-custom text-[10px] text-[#888895] uppercase">
                  {project.category}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-black text-[#111115] uppercase truncate">
                  {project.title}
                </h3>
                <p className="font-mono-custom text-xs text-[#555560] truncate">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Thumbnail — Strict YouTube Banner 16:9 Aspect Ratio */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0c0c10] border border-black/10 shrink-0 my-auto shadow-inner">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                <p className="font-mono-custom text-[11px] text-white/90 truncate">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="space-y-3 shrink-0">
              <div className="flex items-center gap-1.5 overflow-hidden">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full border border-black/10 bg-[#f5f4f0] text-[10px] font-mono-custom text-[#555560] whitespace-nowrap shrink-0"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button className="w-full py-2.5 rounded-xl border border-[#e63946] text-[#e63946] font-mono-custom text-xs uppercase tracking-wider font-bold hover:bg-[#e63946] hover:text-white transition-colors">
                VIEW CASE STUDY →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
