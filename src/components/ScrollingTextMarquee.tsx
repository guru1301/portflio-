import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollingTextMarqueeProps {
  items1?: string[];
  items2?: string[];
  speed?: number;
  /** If true, the section pins while scrolling so all words are readable before moving on */
  pinned?: boolean;
  /** Multiplier for how far each row travels (lower = shorter pin duration) */
}

export const ScrollingTextMarquee: React.FC<ScrollingTextMarqueeProps> = ({
  items1 = ['FULL-STACK SOFTWARE ENGINEER', 'AI & TELEMETRY SYSTEMS', 'HIGH PERFORMANCE WEB', 'DATA ARCHITECTURE'],
  items2 = ['REACT 19', 'TYPESCRIPT', 'THREE.JS', 'PYTHON', 'GSAP ANIMATIONS', 'TAILWIND CSS'],
  speed = 0.3,
  pinned = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // 4x duplication to guarantee seamless horizontal coverage
  const repeatedItems1 = [...items1, ...items1, ...items1, ...items1];
  const repeatedItems2 = [...items2, ...items2, ...items2, ...items2];

  useEffect(() => {
    if (!containerRef.current || !row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
      // Shift distance = one full set of unique items (1/4 of the 4x repeated strip)
      const row1TotalWidth = row1Ref.current!.scrollWidth;
      const row2TotalWidth = row2Ref.current!.scrollWidth;
      const shiftRow1 = row1TotalWidth / 4; // one full loop
      const shiftRow2 = row2TotalWidth / 4;

      // How long (in px of scroll) to keep pinned
      // Enough to reveal all unique words comfortably
      const scrollDistance = Math.max(shiftRow1, shiftRow2) * speed;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinned,
          pinSpacing: pinned,        // adds spacer so following content pushes down correctly
          start: 'top top',
          end: pinned ? `+=${scrollDistance}` : 'bottom top',
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Row 1 travels LEFT
      tl.to(
        row1Ref.current,
        { x: `-${shiftRow1}px`, ease: 'none' },
        0
      );

      // Row 2 travels RIGHT (opposite direction)
      tl.to(
        row2Ref.current,
        { x: `${shiftRow2 * 0.5}px`, ease: 'none' },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed, pinned]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-12 md:py-20 overflow-hidden bg-[#ffffff] border-y border-[#e63946]/20 select-none"
    >
      {/* Ambient electric green backlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#e63946]/[0.02] pointer-events-none" />

      <div className="space-y-4 md:space-y-6 relative z-10">
        {/* Row 1: White text — moves left */}
        <div className="overflow-hidden whitespace-nowrap">
          <div
            ref={row1Ref}
            className="flex items-center gap-6 md:gap-10 whitespace-nowrap will-change-transform"
          >
            {repeatedItems1.map((text, idx) => (
              <div key={idx} className="flex items-center gap-6 md:gap-10 flex-none">
                <span className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl font-black uppercase text-[#111115] tracking-tight">
                  {text}
                </span>
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#e63946] inline-block shadow-[0_0_8px_#e63946]" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Lime text — moves right */}
        <div className="overflow-hidden whitespace-nowrap">
          <div
            ref={row2Ref}
            className="flex items-center gap-6 md:gap-10 whitespace-nowrap will-change-transform"
          >
            {repeatedItems2.map((text, idx) => (
              <div key={idx} className="flex items-center gap-6 md:gap-10 flex-none">
                <span className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl font-black uppercase text-[#e63946] tracking-tight">
                  {text}
                </span>
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white inline-block opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
