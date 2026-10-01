import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { PROJECTS_DATA } from '../data/portfolioData';
import { TechIcon } from '../components/TechIcon';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // DESKTOP: Snappy, instantaneous horizontal scrub (no lag, 1:1 scroll feel)
    mm.add('(min-width: 768px)', () => {
      if (!scrollContainerRef.current) return;
      const scrollWidth = scrollContainerRef.current.scrollWidth - window.innerWidth;

      gsap.to(scrollContainerRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.25, // Snappy 0.25s response — eliminates sluggish trackpad drag
          start: 'top top',
          end: () => `+=${scrollWidth}`, // Proportional 1:1 scroll distance
          invalidateOnRefresh: true,
        },
      });
    });

    // MOBILE: Pure native 120Hz/60Hz hardware scrolling with zero-cost IntersectionObserver
    mm.add('(max-width: 767px)', () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.getAttribute('data-project-index'));
              if (!isNaN(idx)) {
                setActiveMobileIndex(idx);
              }
            }
          });
        },
        { rootMargin: '-25% 0px -45% 0px', threshold: 0.1 }
      );

      mobileCardRefs.current.forEach((el) => {
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  const scrollToMobileCard = (index: number) => {
    const cardEl = mobileCardRefs.current[index];
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveMobileIndex(index);
    }
  };

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#111115] md:overflow-hidden">
      {/* ========================================================= */}
      {/* DESKTOP LAYOUT (Unchanged horizontal pin scrub)           */}
      {/* ========================================================= */}
      <div className="hidden md:block min-h-screen overflow-hidden">
        <div
          ref={scrollContainerRef}
          style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
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
                      [ ENGINEERING PROJECT {project.number} ]
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#111115] tracking-tight uppercase mt-1 truncate group-hover:text-[#e63946] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-mono-custom text-xs lg:text-sm text-[#555560] mt-1 font-medium truncate">
                      {project.subtitle}
                    </p>
                  </div>

                  <div
                    onClick={(e) => {
                      if (project.caseStudy?.liveUrl) {
                        e.stopPropagation();
                        window.open(project.caseStudy.liveUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    title={project.caseStudy?.liveUrl ? `Open ${project.title} live app` : 'Open case study'}
                    className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center text-[#111115] group-hover:bg-[#e63946] group-hover:text-white group-hover:border-[#e63946] transition-all duration-300 shrink-0 cursor-pointer"
                  >
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
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#0c0c10]/90 border border-white/15">
                    <span className="font-mono-custom text-[10px] text-white/90 tracking-wider uppercase font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Tagline at Bottom */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-[#0c0c10]/90 border border-white/10">
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
                        className="px-2.5 py-1 rounded-full border border-black/10 bg-[#f5f4f0] font-mono-custom text-[11px] text-[#555560] whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                      >
                        <TechIcon name={tech} className="w-3 h-3 shrink-0 opacity-70" />
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

      {/* ========================================================= */}
      {/* MOBILE EXPERIENCE: Cinematic Stacking Cards & HUD         */}
      {/* ========================================================= */}
      
      {/* Mobile Sticky HUD Bar: Real-time project tracking and quick jump */}
      <div className="block md:hidden sticky top-0 z-30 bg-[#111115]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#e63946]/20 border border-[#e63946]/40 text-[#e63946] font-mono-custom text-xs font-bold shrink-0">
              {String(activeMobileIndex + 1).padStart(2, '0')} / {String(PROJECTS_DATA.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e63946] animate-pulse shrink-0" />
              <span className="font-display font-black text-sm text-white uppercase tracking-wide truncate">
                {PROJECTS_DATA[activeMobileIndex]?.title}
              </span>
            </div>
          </div>

          {/* Quick Jump Dots */}
          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            {PROJECTS_DATA.map((p, idx) => (
              <button
                key={p.id}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToMobileCard(idx);
                }}
                aria-label={`Jump to project ${p.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeMobileIndex === idx
                    ? 'w-6 bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.8)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Scroll Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#e63946] via-[#ff4d6d] to-[#e63946] transition-all duration-300 ease-out"
            style={{ width: `${((activeMobileIndex + 1) / PROJECTS_DATA.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mobile Card Flow — Silky Smooth Native Momentum Scrolling */}
      <div className="block md:hidden px-4 sm:px-6 pt-4 pb-16 space-y-6">
        {PROJECTS_DATA.map((project, index) => {
          const isActive = activeMobileIndex === index;
          return (
            <div
              key={project.id}
              id={`mobile-card-${index}`}
              data-project-index={index}
              ref={(el) => {
                mobileCardRefs.current[index] = el;
              }}
              className="touch-pan-y"
            >
              {/* Mobile Card */}
              <div
                onClick={() => onSelectProject(project)}
                className={`w-full bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                  isActive
                    ? 'border-2 border-[#e63946] shadow-[0_8px_24px_rgba(230,57,70,0.15)]'
                    : 'border border-black/10'
                }`}
              >
                {/* Mobile Header */}
                <div className="h-[74px] shrink-0 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="font-mono-custom text-xs font-bold text-[#e63946] tracking-wider uppercase">
                      [ ENGINEERING PROJECT {project.number} ]
                    </span>
                    <span className="font-mono-custom text-[10px] text-[#888895] uppercase font-semibold tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-black text-[#111115] uppercase tracking-tight truncate">
                      {project.title}
                    </h3>
                    <p className="font-mono-custom text-xs text-[#555560] truncate font-medium">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Thumbnail — Strict YouTube Banner 16:9 Aspect Ratio */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0c0c10] border border-black/10 shrink-0 my-3 shadow-inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

                  {/* Category Badge on Thumbnail */}
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#0c0c10]/90 border border-white/15">
                    <span className="font-mono-custom text-[9px] text-white/90 tracking-wider uppercase font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Tagline at Bottom */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-lg bg-[#0c0c10]/90 border border-white/10">
                    <p className="font-mono-custom text-[11px] text-white/90 truncate">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="space-y-3 shrink-0 pt-1">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full border border-black/10 bg-[#f5f4f0] text-[10px] font-mono-custom text-[#555560] whitespace-nowrap shrink-0 font-medium inline-flex items-center gap-1.5"
                      >
                        <TechIcon name={tech} className="w-3 h-3 shrink-0 opacity-70" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 min-h-[44px] rounded-xl border border-[#e63946] text-[#e63946] font-mono-custom text-xs uppercase tracking-wider font-bold hover:bg-[#e63946] hover:text-white transition-colors flex items-center justify-center gap-1 active:scale-[0.98]">
                    VIEW CASE STUDY
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
