import React from 'react';

interface ScrollProgressProps {
  activeSection: string;
}

const SECTIONS = [
  { id: 'home', number: '01' },
  { id: 'work', number: '02' },
  { id: 'about', number: '03' },
  { id: 'experience', number: '04' },
  { id: 'skills', number: '05' },
  { id: 'contact', number: '06' },
];

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ activeSection }) => {
  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const currentNum = activeIndex >= 0 ? SECTIONS[activeIndex].number : '01';

  return (
    <div className="fixed right-6 bottom-12 z-[90] hidden md:flex flex-col items-center gap-4 pointer-events-none mix-blend-difference">
      {/* Active number */}
      <span className="font-mono-custom text-xs font-bold text-[#e63946] tracking-wider">
        {currentNum}
      </span>

      {/* Vertical bar dots */}
      <div className="flex flex-col items-center gap-2">
        {SECTIONS.map((sec, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={sec.id}
              className={`w-[2px] transition-all duration-300 rounded-full ${
                isActive ? 'h-6 bg-[#e63946]' : 'h-2 bg-white/20'
              }`}
            />
          );
        })}
      </div>

      <span className="font-mono-custom text-[10px] text-[#111115]/40 tracking-widest uppercase">
        06
      </span>
    </div>
  );
};
