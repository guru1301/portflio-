import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { HangingIDCard } from '../components/HangingIDCard';
import { useThemeColor } from '../context/ThemeColorContext';

interface HeroSectionProps {
  onScrollToWork: () => void;
  onScrollToContact?: () => void;
  onOpenBuildModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToWork,
  onScrollToContact,
  onOpenBuildModal,
}) => {
  const { accentColor } = useThemeColor();
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  // Subtle parallax mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      if (title1Ref.current) {
        gsap.to(title1Ref.current, {
          x: x * 6,
          y: y * 6,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      if (title2Ref.current) {
        gsap.to(title2Ref.current, {
          x: x * -5,
          y: y * -5,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] md:min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:px-16 lg:py-10 overflow-hidden pt-12 sm:pt-16 md:pt-24 bg-[#0c0c10] text-[#f5f5f7]"
    >
      {/* Background subtle radial lighting dynamically controlled by active theme color */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none transition-colors duration-500"
        style={{
          backgroundColor: accentColor,
          opacity: 0.12,
        }}
      />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[90px] pointer-events-none" />

      {/* Top subtle meta tag */}
      <div className="flex justify-between items-center text-xs font-mono-custom text-white/60 tracking-widest uppercase z-10 pt-0 sm:pt-4 border-b border-white/10 pb-2 sm:pb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 min-w-0"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-white/80 truncate text-[11px] sm:text-xs max-w-[55vw] sm:max-w-none">
            BACKEND DEVELOPMENT • DATA ANALYTICS • SOFTWARE ENGINEERING
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden sm:block text-white/50"
        >
          [ {DEVELOPER_INFO.location} • ENTRY-LEVEL &amp; FREELANCE ]
        </motion.div>
      </div>

      {/* Editorial Typography Layout - Moved upwards and placed cleanly on the left */}
      <div className="z-20 relative max-w-6xl mx-auto w-full pt-1 sm:pt-3 md:py-8 md:my-auto pointer-events-none">
        <div className="w-full max-w-[65%] md:max-w-2xl lg:max-w-3xl">
          <div className="flex flex-col pointer-events-auto">
            {/* GURU Title Line - Clean White with Crisp Electric Light Flicker */}
            <motion.h1
              ref={title1Ref}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="tubelight-flicker-white font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-8xl font-black tracking-tight leading-[0.9] uppercase select-none whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              style={{
                ['--accent-electric' as string]: accentColor,
              }}
            >
              <span className="inline-flex whitespace-nowrap">
                {['G', 'U', 'R', 'U'].map((char, idx) => (
                  <span
                    key={idx}
                    className="hover-flicker-letter hero-letter-white inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </motion.h1>

            {/* PRASATH Title Line - Strictly ONE single line, never broken or separated */}
            <motion.h1
              ref={title2Ref}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="tubelight-flicker-accent font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-8xl font-black tracking-tight leading-[0.9] uppercase text-left select-none whitespace-nowrap pl-0 sm:pl-2 md:pl-6 lg:pl-10"
              style={{
                color: accentColor,
              }}
            >
              <span className="inline-flex whitespace-nowrap">
                {['P', 'R', 'A', 'S', 'A', 'T', 'H'].map((char, idx) => (
                  <span
                    key={idx}
                    className="hover-flicker-letter inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </motion.h1>
          </div>

          {/* Sub-headline breakdown - Left aligned below title */}
          <div className="mt-2.5 sm:mt-4 md:mt-8 border-t border-white/10 pt-2 sm:pt-3 md:pt-4 space-y-1 sm:space-y-1.5 md:space-y-2.5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <p className="font-display text-xs sm:text-base md:text-2xl font-extrabold tracking-tight leading-snug uppercase text-white/95">
                SOFTWARE • BACKEND DEVELOPMENT • DATA ANALYTICS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-left font-mono-custom text-[10px] sm:text-xs md:text-sm text-white/70 space-y-1 sm:space-y-1.5"
            >
              <p className="font-bold text-white text-xs sm:text-sm md:text-base tracking-tight">
                Software Engineer | Backend Development &amp; Data Analytics
              </p>
              <p className="text-white/85 font-medium text-[11px] sm:text-xs md:text-sm">
                B.Tech Computer Science &amp; Business Systems Graduate
              </p>
              <p className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-relaxed">
                Building web applications, backend APIs, and data-driven solutions.{' '}
                <span className="text-[#e63946] font-medium">Open to entry-level engineering roles and freelance projects.</span>
              </p>
            </motion.div>

            {/* Action CTA Buttons: Build a Project + Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="pt-2 sm:pt-3.5 flex flex-wrap items-center gap-2.5 sm:gap-3 pointer-events-auto"
            >
              {/* Primary: Build A Project With Me */}
              <button
                onClick={onOpenBuildModal || onScrollToContact}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#e63946] text-white font-mono-custom text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#ff4d6d] transition-all flex items-center gap-2 shadow-lg shadow-[#e63946]/30 active:scale-95 cursor-pointer focus:outline-none"
                data-cursor-label="BUILD"
              >
                <span>BUILD A PROJECT WITH ME</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Secondary: Download Resume */}
              <a
                href={DEVELOPER_INFO.resumeUrl}
                download="Guru_Prasath_Resume.pdf"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/20 bg-white/5 text-white/90 font-mono-custom text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:border-white hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95 cursor-pointer focus:outline-none"
                data-cursor-label="RESUME"
              >
                <Download className="w-3.5 h-3.5 text-[#e63946]" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3D Hanging ID Badge - Full height stage with lanyard entering from ceiling upwards */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        <HangingIDCard location={DEVELOPER_INFO.location} />
      </div>

      {/* Bottom Metadata & Scroll Prompt */}
      <div className="flex justify-between items-center text-xs font-mono-custom text-white/60 z-30 max-w-6xl mx-auto w-full pt-3 sm:pt-4 border-t border-white/10 shrink-0">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/50"
        >
          01 / INTERACTIVE PORTFOLIO
        </motion.span>

        <motion.button
          onClick={onScrollToWork}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-2 text-white/80 hover:text-[#e63946] transition-colors cursor-pointer group focus:outline-none"
        >
          <span className="tracking-widest uppercase text-xs font-bold">EXPLORE WORK</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-[#e63946]" />
        </motion.button>
      </div>
    </section>
  );
};
