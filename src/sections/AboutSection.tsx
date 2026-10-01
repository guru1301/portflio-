import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEVELOPER_INFO, EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { LoopingLabel } from '../components/LoopingLabel';

gsap.registerPlugin(ScrollTrigger);

/* ─── Headline lines config ─────────────────────────────── */
const HEADLINE_LINES = [
  { text: 'I BUILD', accent: false },
  { text: 'SOFTWARE', accent: true },
  { text: 'AROUND', accent: false },
  { text: 'REAL PROBLEMS.', accent: false },
];

export const AboutSection: React.FC = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const linesRef     = useRef<(HTMLDivElement | null)[]>([]);
  const bioRef       = useRef<HTMLParagraphElement>(null);
  const bio2Ref      = useRef<HTMLParagraphElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const eduHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      /* 1. Section label fade-in */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -12 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );

      /* 2. Headline — each line clips up from behind a mask */
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* 3. Bio paragraph 1 — words highlight progressively on scroll */
      if (bioRef.current) {
        const words = bioRef.current.querySelectorAll('span.word');
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        );
      }

      /* 4. Bio paragraph 2 — fade up */
      gsap.fromTo(
        bio2Ref.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: bio2Ref.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      /* 5. Location card — slides in from right */
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      /* 6. Education header */
      gsap.fromTo(
        eduHeaderRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: eduHeaderRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Split bio text into individually-wrapped words */
  const wrapWords = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="word inline-block mr-[0.28em]">{w}</span>
    ));

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle radial glow behind headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #e63946 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* ── Section label ── */}
        <div
          ref={headerRef}
          className="flex justify-between items-center text-xs font-mono-custom opacity-60 tracking-widest uppercase border-b border-current/10 pb-4"
        >
          <LoopingLabel
            text="[ 03 — PHILOSOPHY & BACKGROUND ]"
            className="font-mono-custom text-xs opacity-60 tracking-widest uppercase"
          />
          <span>B.TECH CSBS / 2026</span>
        </div>

        {/* ── Headline + bio grid ── */}
        <div>
          {/* Clipping headline */}
          <div className="overflow-hidden">
            {HEADLINE_LINES.map((line, i) => (
              <div key={i} className="overflow-hidden leading-none mb-1">
                <div
                  ref={el => { linesRef.current[i] = el; }}
                  className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase ${
                    line.accent ? 'text-[#e63946]' : ''
                  }`}
                >
                  {line.text}
                </div>
              </div>
            ))}
          </div>

          {/* Bio + card grid */}
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Bio text with word-highlight animation */}
            <div className="md:col-span-7 space-y-5">
              <p
                ref={bioRef}
                className="font-mono-custom text-sm md:text-lg leading-relaxed"
              >
                {wrapWords(DEVELOPER_INFO.bioExtended)}
              </p>

              <p
                ref={bio2Ref}
                className="font-mono-custom text-xs md:text-sm opacity-70 leading-relaxed"
              >
                Building web applications, backend APIs, and data-driven solutions. Open to entry-level engineering roles and freelance projects.
              </p>
            </div>

            {/* Location card — slides from right */}
            <div
              ref={cardRef}
              className="md:col-span-5 p-6 md:p-7 rounded-2xl domain-card-bg border border-white/15 space-y-3.5
                         shadow-2xl hover:border-[#e63946]/50 transition-colors duration-500"
            >
              <div className="flex items-center gap-2.5 text-[#e63946]">
                <MapPin className="w-4 h-4 shrink-0 text-[#e63946]" />
                <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#e63946]">
                  LOCATION &amp; STATUS
                </span>
              </div>

              <p className="font-display text-lg md:text-xl font-bold text-white tracking-tight">
                Based in {DEVELOPER_INFO.location}
              </p>

              <div className="space-y-1 font-mono-custom text-xs md:text-sm text-white/80 leading-relaxed">
                <span className="text-[#e63946] font-semibold text-[11px] tracking-wider uppercase block">CURRENTLY BUILDING:</span>
                <p className="text-white/90">Software Systems • Backend APIs • Data Applications • Client Websites</p>
              </div>

              {/* Animated pulse dot badge */}
              <div className="pt-1.5 flex items-center">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#e63946]/10 border border-[#e63946]/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63946] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e63946]" />
                  </span>
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#e63946]">
                    BUILDING • LEARNING • SHIPPING
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Education timeline ── */}
        <div className="pt-8 border-t border-current/10 space-y-10">
          <div ref={eduHeaderRef} className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-[#e63946]" />
            <h3 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight uppercase">
              ACADEMIC TIMELINE &amp; EDUCATION
            </h3>
          </div>

          <div className="space-y-8 relative before:absolute before:left-3 md:before:left-8 before:top-3 before:bottom-3 before:w-[2px] before:bg-black/15">
            {EDUCATION_DATA.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-8 sm:pl-10 md:pl-20 group"
              >
                {/* Timeline node */}
                <div className="absolute left-3 md:left-8 top-3.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#e63946] bg-[#f8f7f3] group-hover:scale-125 group-hover:bg-[#e63946] transition-all duration-300" />

                <div className="p-4 sm:p-6 md:p-8 rounded-2xl domain-card-bg border border-white/15 group-hover:border-[#e63946]/50 shadow-2xl transition-all duration-300 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="font-mono-custom text-xs font-bold text-[#e63946] uppercase tracking-widest">
                      {edu.period}
                    </span>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#e63946]" />
                      <span className="font-mono-custom text-xs md:text-sm font-black text-white bg-[#e63946]/10 border border-[#e63946]/30 px-3 py-1 rounded-full">
                        SCORE: {edu.score}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg md:text-2xl font-extrabold uppercase text-white">
                      {edu.degree}
                    </h4>
                    <p className="font-mono-custom text-xs md:text-sm text-white/75 mt-1">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
