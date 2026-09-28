import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSlideTextProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}

export const ScrollSlideText: React.FC<ScrollSlideTextProps> = ({
  text,
  direction = 'left',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ['15%', '-25%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['-25%', '15%']);

  const x = direction === 'left' ? xLeft : xRight;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pointer-events-none select-none py-4 my-2"
    >
      <motion.div style={{ x }} className="whitespace-nowrap flex gap-12">
        <span
          className={`font-display text-[11vw] font-black uppercase leading-none tracking-tighter opacity-10 stroke-text ${className}`}
        >
          {text} • {text} • {text}
        </span>
      </motion.div>
    </div>
  );
};
