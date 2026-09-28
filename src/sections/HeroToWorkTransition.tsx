import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoopingLabel } from '../components/LoopingLabel';

gsap.registerPlugin(ScrollTrigger);

export const HeroToWorkTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Line travels across viewport
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 25%',
            scrub: 0.5,
          },
        }
      );

      // Oversized letters enter progressively
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 md:py-24 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center bg-[#0c0c10] text-[#f5f5f7] border-b border-white/10"
    >
      <div className="w-full max-w-6xl flex flex-col items-start">
        <LoopingLabel
          text="[ 02 — FEATURED CASE STUDIES ]"
          className="font-mono-custom text-xs md:text-sm text-[#e63946] tracking-widest uppercase mb-2 font-bold"
        />

        <h2
          ref={textRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase select-none text-white"
        >
          SELECTED WORK
        </h2>

        <p className="font-mono-custom text-xs md:text-sm text-white/70 mt-3 max-w-xl leading-relaxed">
          A curated collection of software systems, full-stack applications, data analytics, and telemetry engines.
        </p>

        {/* Traveling Thin Line */}
        <div
          ref={lineRef}
          className="w-full h-[1px] bg-gradient-to-r from-[#e63946] via-white/40 to-transparent origin-left mt-6"
        />
      </div>
    </div>
  );
};
