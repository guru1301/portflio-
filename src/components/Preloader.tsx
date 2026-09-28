import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const STAGES = [0, 17, 38, 64, 82, 100];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (stageIndex < STAGES.length - 1) {
      // Step rapidly through numbers (approx 200ms per step = 1.2s total)
      timer = setTimeout(() => {
        setStageIndex((prev) => prev + 1);
      }, 220);
    } else {
      // Reached 100
      timer = setTimeout(() => {
        setIsFinished(true);
        setTimeout(() => {
          onComplete();
        }, 800); // allow curtains to slide away
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [stageIndex, onComplete]);

  const currentCount = STAGES[stageIndex].toString().padStart(2, '0');

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div className="fixed inset-0 z-[999999] pointer-events-auto flex flex-col justify-between p-8 md:p-16 bg-[#f8f7f3] text-[#111115]">
          {/* Top subtle header */}
          <div className="flex justify-between items-center text-xs font-mono-custom tracking-widest text-[#555560] uppercase">
            <span>[ SYSTEM INITIALIZING ]</span>
            <span>2026 / CSBS</span>
          </div>

          {/* Main Title & Counter Center */}
          <div className="my-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase text-[#111115]"
              >
                GURU PRASATH
              </motion.h1>
              <p className="font-mono-custom text-sm md:text-base text-[#555560] mt-3 tracking-wide">
                SOFTWARE / DATA / FULL-STACK
              </p>
            </div>

            <div className="font-display text-7xl md:text-9xl lg:text-[13rem] font-bold tracking-tighter leading-none text-[#e63946] tabular-nums">
              {currentCount}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full bg-black/5 h-[2px] relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-[#e63946]"
              initial={{ width: '0%' }}
              animate={{ width: `${STAGES[stageIndex]}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          {/* Sliding Curtains when finished */}
          {stageIndex === STAGES.length - 1 && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-[#f8f7f3] z-10"
                initial={{ y: '0%' }}
                animate={{ y: '-100%' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1/2 bg-[#f8f7f3] z-10"
                initial={{ y: '0%' }}
                animate={{ y: '100%' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
