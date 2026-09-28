import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoopingLabelProps {
  text: string;
  className?: string;
}

/**
 * Displays a section label that continuously loops upward → downward → upward…
 * Two copies of the text are stacked; GSAP animates them together with yoyo.
 */
export const LoopingLabel: React.FC<LoopingLabelProps> = ({ text, className = '' }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    const items = wrapRef.current.querySelectorAll<HTMLSpanElement>('.loop-text');

    const ctx = gsap.context(() => {
      // Set initial positions: item 0 visible (y=0), item 1 below (y=100%)
      gsap.set(items[1], { yPercent: 100 });

      // Animate both upward together; yoyo reverses direction on alternate repeats
      gsap.to(items, {
        yPercent: '-=100',    // move both up by 100%
        duration: 2.2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,           // reverses → gives upward + downward loop
        repeatDelay: 1.2,     // pause at each extreme before reversing
        stagger: 0,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: '1.25em' }}   // clips to exactly one line height
    >
      {/* Two identical copies stacked; one always entering as other exits */}
      <span className="loop-text absolute inset-x-0 top-0 whitespace-nowrap">{text}</span>
      <span className="loop-text absolute inset-x-0 top-0 whitespace-nowrap">{text}</span>
    </div>
  );
};
