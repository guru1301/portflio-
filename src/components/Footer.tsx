import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-[#0c0c10] border-t border-white/10 text-xs font-mono-custom text-white/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
            GURU PRASATH
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white/70">Computer Science & Software</span>
          <span className="text-white/20">|</span>
          <span className="text-[#e63946] font-bold">2026</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={DEVELOPER_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="text-white/80 hover:text-[#e63946] transition-colors"
          >
            GitHub
          </a>
          <a
            href={DEVELOPER_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-white/80 hover:text-[#e63946] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${DEVELOPER_INFO.email}`}
            className="text-white/80 hover:text-[#e63946] transition-colors"
          >
            Email
          </a>
        </div>

        <div>
          <span className="text-white/40">Designed & built by Guru Prasath.</span>
        </div>
      </div>
    </footer>
  );
};
