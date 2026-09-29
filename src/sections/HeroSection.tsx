import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { HangingIDCard } from '../components/HangingIDCard';
import { useThemeColor } from '../context/ThemeColorContext';

interface HeroSectionProps {
  onScrollToWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToWork }) => {
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
      className="relative min-h-[100dvh] md:min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 overflow-hidden pt-12 sm:pt-16 md:pt-28 bg-[#0c0c10] text-[#f5f5f7]"
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
          <span className="text-white/80 truncate text-[11px] sm:text-xs max-w-[48vw] sm:max-w-none">
            {DEVELOPER_INFO.subtitle}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden sm:block text-white/50"
        >
          [ {DEVELOPER_INFO.location} ]
        </motion.div>
      </div>

      {/* Editorial Typography Layout - Moved upwards and placed cleanly on the left */}
      <div className="z-20 relative max-w-6xl mx-auto w-full pt-1 sm:pt-3 md:py-12 md:my-auto pointer-events-none">
        <div className="max-w-[55%] sm:max-w-[58%] md:max-w-xl">
          <div className="flex flex-col">
            {/* GURU Title Line */}
            <motion.h1
              ref={title1Ref}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] uppercase select-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              GURU
            </motion.h1>

            {/* PRASATH Title Line - Aligned to left */}
            <motion.h1
              ref={title2Ref}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] uppercase text-left select-none pl-0 sm:pl-2 md:pl-8 lg:pl-12 text-[#e63946]"
              style={{
                filter: `drop-shadow(0 4px 30px ${accentColor}4d)`,
              }}
            >
              PRASATH
            </motion.h1>
          </div>

          {/* Sub-headline breakdown - Left aligned below title */}
          <div className="mt-2.5 sm:mt-4 md:mt-12 border-t border-white/10 pt-2 sm:pt-3 md:pt-6 space-y-1 sm:space-y-1.5 md:space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <p className="font-display text-xs sm:text-base md:text-2xl font-extrabold tracking-tight leading-snug uppercase text-white/95">
                COMPUTER SCIENCE &amp; SOFTWARE DEVELOPMENT
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-left font-mono-custom text-[10px] sm:text-xs md:text-sm text-white/70 space-y-0.5 sm:space-y-1"
            >
              <p className="font-semibold text-white/90">{DEVELOPER_INFO.institution}</p>
              <p>
                Based in {DEVELOPER_INFO.location} —{' '}
                <span className="text-[#e63946] font-medium">{DEVELOPER_INFO.availability}</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3D Hanging ID Badge - Full height stage with lanyard entering from ceiling upwards */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        <HangingIDCard />
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
