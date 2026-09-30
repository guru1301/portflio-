import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DATA } from '../data/portfolioData';
import type { SkillItem } from '../data/portfolioData';
import { LoopingLabel } from '../components/LoopingLabel';
import { TechIcon } from '../components/TechIcon';

export const SkillsSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="relative w-full py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto space-y-10 sm:space-y-12">

        {/* Header */}
        <div className="flex justify-between items-center text-xs font-mono-custom opacity-60 tracking-widest uppercase border-b border-current/10 pb-4">
          <LoopingLabel
            text="[ 05 — TECHNICAL COMPETENCIES ]"
            className="font-mono-custom text-xs opacity-60 tracking-widest uppercase"
          />
          <span>TYPOGRAPHY FIELD</span>
        </div>

        <div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase">
            SKILLS & <br />
            <span className="text-[#e63946]">TECHNICAL SPECTRUM</span>
          </h2>
          <p className="font-mono-custom text-xs md:text-sm opacity-70 mt-2 sm:mt-3">
            Tap or hover over any technology keyword to inspect application context.
          </p>
        </div>

        {/* Dynamic Typography Skill Field */}
        <div className="relative py-4 sm:py-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-6 sm:gap-y-4 md:gap-x-8 md:gap-y-6 max-w-5xl mx-auto">
          {SKILLS_DATA.map((skill) => {
            const isSelected = activeSkill?.name === skill.name;

            const sizeClasses =
              skill.size === 'lg'
                ? 'text-xl sm:text-3xl md:text-5xl font-extrabold'
                : skill.size === 'md'
                ? 'text-lg sm:text-2xl md:text-4xl font-bold'
                : 'text-base sm:text-xl md:text-2xl font-semibold';

            return (
              <motion.div
                key={skill.name}
                className="relative cursor-pointer select-none"
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                onMouseEnter={() => setActiveSkill(skill)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                data-cursor-label="INFO"
              >
                <span
                  className={`font-display tracking-tight uppercase transition-colors duration-300 ${sizeClasses} ${
                    isSelected
                      ? 'text-[#e63946] underline decoration-[#e63946] drop-shadow-[0_2px_12px_rgba(230,57,70,0.4)]'
                      : 'opacity-70 hover:opacity-100 hover:text-[#e63946]'
                  }`}
                >
                  {skill.name}
                </span>

                {/* Subtle bullet separator */}
                <span className="ml-2 sm:ml-4 md:ml-6 opacity-20 text-sm sm:text-lg font-mono-custom">•</span>
              </motion.div>
            );
          })}
        </div>

        {/* Hover / Click Description Card */}
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 md:p-8 rounded-2xl domain-card-bg border border-white/15 border-t-[#e63946]/60 max-w-2xl w-full space-y-3 sm:space-y-4 shadow-2xl shadow-black/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-[#e63946] shrink-0 shadow-inner">
                      <TechIcon name={activeSkill.name} className="w-5 h-5 text-[#e63946]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
                          {activeSkill.name}
                        </h4>
                        <span className="font-mono-custom text-[10px] font-bold text-[#e63946] uppercase tracking-wider bg-[#e63946]/10 px-2.5 py-0.5 rounded-full border border-[#e63946]/30">
                          {activeSkill.category}
                        </span>
                      </div>
                      {activeSkill.focus && (
                        <p className="font-mono-custom text-[11px] text-white/50 tracking-wider uppercase mt-0.5">
                          {activeSkill.focus}
                        </p>
                      )}
                    </div>
                  </div>

                  {activeSkill.appliedIn && (
                    <div className="flex items-center justify-center sm:justify-end gap-1.5 font-mono-custom text-xs text-white/70">
                      <span className="text-[#e63946] font-bold text-[10px] tracking-wider uppercase">APPLIED IN:</span>
                      <span className="text-white/90 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-[11px]">
                        {activeSkill.appliedIn}
                      </span>
                    </div>
                  )}
                </div>

                <p className="font-mono-custom text-xs sm:text-sm text-[#f5f5f7] leading-relaxed text-center sm:text-left">
                  "{activeSkill.description}"
                </p>
              </motion.div>
            ) : (
              <div className="font-mono-custom text-xs text-[#555560] uppercase tracking-widest text-center py-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#e63946]/50 animate-pulse" />
                [ CLICK OR HOVER ANY TECHNOLOGY KEYWORD FOR DETAILED APPLICATION CONTEXT ]
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
