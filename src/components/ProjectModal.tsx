import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Cpu, Layers, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { TechIcon } from './TechIcon';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('lenis-stopped');
      try {
        (window as unknown as { lenis?: { stop: () => void } }).lenis?.stop();
      } catch {
        // ignore
      }
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('lenis-stopped');
      try {
        (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
      } catch {
        // ignore
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto bg-black/90 backdrop-blur-xl overscroll-contain"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Modal Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 pointer-events-auto"
        />

        {/* Modal Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl domain-card-bg border border-white/15 rounded-t-3xl sm:rounded-3xl overflow-hidden pointer-events-auto shadow-2xl mt-auto sm:my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col overscroll-contain"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-5 bg-[#18181e]/95 backdrop-blur-md border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-mono-custom text-xs font-bold text-[#e63946]">
                [ {project.number} ]
              </span>
              <span className="font-mono-custom text-xs text-white/60 uppercase tracking-wider hidden sm:inline">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 min-w-[40px] min-h-[40px] rounded-full border border-white/20 bg-white/5 hover:bg-[#e63946] hover:border-[#e63946] text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none"
              data-cursor-label="CLOSE"
              aria-label="Close case study modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div
            className="overflow-y-auto p-4 sm:p-6 md:p-10 space-y-8 md:space-y-12 overscroll-contain touch-pan-y"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Title Section */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                  {project.title}
                </h2>
                {project.caseStudy.liveUrl && (
                  <a
                    href={project.caseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e63946] text-white hover:bg-[#ff4d6d] font-mono-custom text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#e63946]/20 cursor-pointer"
                  >
                    <span>Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="font-display text-lg md:text-xl text-[#e63946] mt-2 font-semibold">
                {project.subtitle}
              </p>
              <p className="font-mono-custom text-sm md:text-base text-[#d1d1d6] mt-4 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Main Visual */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h4 className="font-mono-custom text-xs text-[#e63946] uppercase tracking-widest mb-3 font-semibold">
                TECHNOLOGY STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono-custom text-white tracking-wide hover:border-[#e63946]/50 transition-colors inline-flex items-center gap-1.5"
                  >
                    <TechIcon name={tech} className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Architecture Flow Diagram if present */}
            {project.architectureNodes && project.architectureNodes.length > 0 && (
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
                <div className="flex items-center gap-2 text-[#e63946]">
                  <Cpu className="w-5 h-5" />
                  <h4 className="font-mono-custom text-sm font-bold tracking-wider uppercase">
                    SYSTEM ARCHITECTURE WORKFLOW
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative">
                  {project.architectureNodes.map((node, idx) => (
                    <div
                      key={node.id}
                      className="relative p-4 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between space-y-2 hover:border-[#e63946]/60 transition-colors"
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono-custom text-white/50">
                        <span>STEP 0{idx + 1}</span>
                        {idx < project.architectureNodes!.length - 1 && (
                          <span className="hidden md:inline text-[#e63946]">→</span>
                        )}
                      </div>
                      <span className="font-display font-bold text-sm text-white">
                        {node.label}
                      </span>
                      {node.sub && (
                        <span className="font-mono-custom text-[11px] text-white/70">
                          {node.sub}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview & Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#e63946]" />
                  PROJECT OVERVIEW
                </h4>
                <p className="font-mono-custom text-xs md:text-sm text-[#d1d1d6] leading-relaxed">
                  {project.caseStudy.overview}
                </p>

                <div className="pt-4">
                  <h5 className="font-mono-custom text-xs text-white font-bold uppercase mb-2">
                    TECHNICAL ARCHITECTURE
                  </h5>
                  <p className="font-mono-custom text-xs md:text-sm text-[#d1d1d6] leading-relaxed">
                    {project.caseStudy.technicalArchitecture}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#e63946]" />
                  KEY IMPLEMENTATIONS
                </h4>
                <ul className="space-y-2.5">
                  {project.caseStudy.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-mono-custom text-[#d1d1d6]">
                      <span className="text-[#e63946] font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Impact & Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-xs font-mono-custom text-[#d1d1d6]">
                <span className="text-[#e63946] font-bold">OUTCOME: </span>
                {project.caseStudy.impactOrOutcome}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {project.caseStudy.liveUrl && (
                  <a
                    href={project.caseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#e63946] hover:bg-[#ff4d6d] text-white font-mono-custom text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-[#e63946]/25"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.caseStudy.githubUrl && (
                  <a
                    href={project.caseStudy.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-[#e63946] hover:border-[#e63946] text-white font-mono-custom text-xs tracking-wider uppercase transition-all"
                  >
                    Code Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
