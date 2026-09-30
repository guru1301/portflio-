import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { LoopingLabel } from '../components/LoopingLabel';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#0c0c10] text-[#f5f5f7] border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex justify-between items-center text-xs font-mono-custom text-white/50 tracking-widest uppercase border-b border-white/10 pb-4">
          <LoopingLabel
            text="[ 06 — CONTACT & INQUIRIES ]"
            className="font-mono-custom text-xs text-white/60 tracking-widest uppercase font-semibold"
          />
          <span className="text-white/40">GET IN TOUCH</span>
        </div>

        {/* Large Statement */}
        <div className="space-y-4">
          <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.88] uppercase text-white">
            LET'S <br />
            <span className="text-[#e63946]">BUILD</span> <br />
            SOMETHING.
          </h2>
          <p className="font-mono-custom text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl border-l-2 border-[#e63946] pl-4 py-1">
            Open to entry-level software opportunities and selected client web projects.
          </p>
        </div>

        {/* Dual Capability Track: Job Opportunities & Client Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
          {/* Track 1: Job Opportunities */}
          <div className="p-5 sm:p-6 rounded-2xl domain-card-bg border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e63946]" />
              <span className="font-mono-custom text-xs font-bold text-[#e63946] uppercase tracking-wider">
                JOB OPPORTUNITIES
              </span>
            </div>
            <p className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-tight">
              Software Engineering &amp; Data Systems
            </p>
            <p className="font-mono-custom text-xs text-white/60 leading-relaxed">
              Software Engineering • Backend Development • Full-Stack Systems • Data Analytics &amp; Pipelines
            </p>
          </div>

          {/* Track 2: Client Projects */}
          <div className="p-5 sm:p-6 rounded-2xl domain-card-bg border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e63946]" />
              <span className="font-mono-custom text-xs font-bold text-[#e63946] uppercase tracking-wider">
                CLIENT PROJECTS
              </span>
            </div>
            <p className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-tight">
              Independent Web Solutions
            </p>
            <p className="font-mono-custom text-xs text-white/60 leading-relaxed">
              Business Websites • Landing Pages • Portfolio Websites • Custom Web Applications • Dashboards
            </p>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-white/10">
          {/* Email Direct */}
          <div className="space-y-2">
            <span className="font-mono-custom text-xs text-white/50 uppercase tracking-wider">
              DIRECT EMAIL
            </span>
            <div>
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="font-display text-base sm:text-lg md:text-xl font-bold text-white hover:text-[#e63946] transition-colors flex items-center gap-2 break-all sm:break-normal"
                data-cursor-label="MAIL"
              >
                {DEVELOPER_INFO.email}
                <ArrowUpRight className="w-4 h-4 text-[#e63946] shrink-0" />
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-2">
            <span className="font-mono-custom text-xs text-white/50 uppercase tracking-wider">
              DIGITAL PROFILES
            </span>
            <div className="flex flex-col space-y-2 font-mono-custom text-xs md:text-sm font-semibold">
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[#e63946] transition-colors flex items-center gap-2"
                data-cursor-label="GITHUB"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub <ArrowUpRight className="w-4 h-4 ml-auto" />
              </a>
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[#e63946] transition-colors flex items-center gap-2"
                data-cursor-label="LINKEDIN"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
                </svg>
                LinkedIn <ArrowUpRight className="w-4 h-4 ml-auto" />
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <span className="font-mono-custom text-xs text-white/50 uppercase tracking-wider">
              LOCATION & STATUS
            </span>
            <div className="font-mono-custom text-xs md:text-sm space-y-1">
              <p className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4 text-[#e63946]" /> India (IST)
              </p>
              <p className="text-[#e63946] text-xs font-semibold">
                [ {DEVELOPER_INFO.availability} ]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
