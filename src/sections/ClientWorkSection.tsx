import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { CLIENT_PROJECTS_DATA } from '../data/portfolioData';
import { TechIcon } from '../components/TechIcon';
import { LoopingLabel } from '../components/LoopingLabel';

interface ClientWorkSectionProps {
  onSelectProject: (project: Project) => void;
  onScrollToContact?: () => void;
  onScrollToWork?: () => void;
  onOpenBuildModal?: () => void;
}

export const ClientWorkSection: React.FC<ClientWorkSectionProps> = ({
  onSelectProject,
  onScrollToContact,
  onScrollToWork,
  onOpenBuildModal,
}) => {
  return (
    <section
      id="client-work"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#0c0c10] text-[#f5f5f7] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex justify-between items-center text-xs font-mono-custom text-white/50 tracking-widest uppercase border-b border-white/10 pb-4">
          <LoopingLabel
            text="[ 03 — INDEPENDENT WEB SOLUTIONS ]"
            className="font-mono-custom text-xs text-[#e63946] tracking-widest uppercase font-semibold"
          />
          <span className="text-white/40">CLIENT ENGAGEMENTS</span>
        </div>

        {/* Section Heading & Supporting Description */}
        <div className="space-y-3">
          <span className="font-mono-custom text-xs font-bold text-[#e63946] uppercase tracking-widest block">
            INDEPENDENT WEB SOLUTIONS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-white">
            CLIENT WORK
          </h2>
          <p className="font-mono-custom text-xs md:text-sm text-white/70 max-w-2xl leading-relaxed">
            Websites and digital experiences built for real clients, combining responsive design, practical functionality, and production-ready delivery.
          </p>
        </div>

        {/* Client Projects Grid — Exactly reuses the existing project card visual architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CLIENT_PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="w-full flex flex-col justify-center group cursor-pointer"
              onClick={() => onSelectProject(project)}
              data-cursor="project"
              data-cursor-label="OPEN"
            >
              {/* Card Container — Matches SelectedWork card dimensions, padding & rounded corners */}
              <div className="relative w-full h-[520px] sm:h-[550px] bg-white border border-black/10 rounded-3xl p-6 lg:p-7 flex flex-col justify-between overflow-hidden group-hover:border-[#e63946] transition-colors duration-500 shadow-2xl">
                
                {/* Card Header */}
                <div className="flex justify-between items-start z-10 h-[80px] shrink-0">
                  <div className="flex-1 pr-4 min-w-0">
                    <span className="font-mono-custom text-xs font-bold text-[#e63946] tracking-widest uppercase block">
                      [ CLIENT WORK {project.number} ]
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-[#111115] tracking-tight uppercase mt-1 truncate group-hover:text-[#e63946] transition-colors duration-300">
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
                    title={project.caseStudy?.liveUrl ? `Open ${project.title} live website` : 'View details'}
                    className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center text-[#111115] group-hover:bg-[#e63946] group-hover:text-white group-hover:border-[#e63946] transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Thumbnail — Strict YouTube Banner 16:9 Aspect Ratio */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#0c0c10] border border-black/10 shrink-0 my-auto shadow-inner group/img">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-65 transition-opacity" />

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

                {/* Tech Stack Bar */}
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
                    VIEW DETAILS →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Restrained Client Work Call-to-Action — Existing design system styling */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-10 rounded-3xl domain-card-bg border border-white/15 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="font-mono-custom text-xs font-bold text-[#e63946] uppercase tracking-wider block">
              WORK TOGETHER
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              HAVE A PROJECT IN MIND?
            </h3>
            <p className="font-mono-custom text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
              I build modern websites and practical digital solutions for businesses, creators, and individuals.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
            <button
              onClick={() => {
                if (onOpenBuildModal) {
                  onOpenBuildModal();
                } else if (onScrollToContact) {
                  onScrollToContact();
                }
              }}
              className="px-5 py-3 rounded-full bg-[#e63946] text-white font-mono-custom text-xs font-bold uppercase tracking-wider hover:bg-[#ff4d6d] transition-colors flex items-center gap-1.5 shadow-lg shadow-[#e63946]/20 active:scale-95 cursor-pointer"
            >
              START A PROJECT →
            </button>
            <a
              href="#work"
              onClick={(e) => {
                if (onScrollToWork) {
                  e.preventDefault();
                  onScrollToWork();
                }
              }}
              className="px-5 py-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-mono-custom text-xs font-bold uppercase tracking-wider transition-colors active:scale-95"
            >
              VIEW MY WORK →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
