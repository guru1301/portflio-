import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ThemeColorPicker } from './ThemeColorPicker';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', number: '01', label: 'HOME' },
  { id: 'work', number: '02', label: 'WORK' },
  { id: 'about', number: '03', label: 'ABOUT' },
  { id: 'experience', number: '04', label: 'EXPERIENCE' },
  { id: 'skills', number: '05', label: 'SKILLS' },
  { id: 'contact', number: '06', label: 'CONTACT' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Header Fixed Bar */}
      <header className="fixed top-0 left-0 w-full z-[999] px-4 py-3.5 sm:px-6 sm:py-4 md:px-12 md:py-6 flex justify-between items-center pointer-events-none">
        {/* Brand Top Left - Minimal GURU Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="pointer-events-auto text-left group cursor-pointer focus:outline-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-lg hover:border-[#e63946] transition-all"
          data-cursor-label="GURU"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-pulse" />
          <span className="font-display font-black text-sm md:text-base tracking-wider text-white group-hover:text-[#e63946] transition-colors uppercase">
            GURU
          </span>
        </button>

        {/* Top Right Action Group: Theme Palette & Menu Button */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Dynamic Theme Color Customizer */}
          <ThemeColorPicker />

          {/* Index / Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white font-mono-custom text-xs tracking-widest uppercase hover:border-[#e63946] hover:text-[#e63946] transition-all cursor-pointer focus:outline-none shadow-lg"
            data-cursor-label={isOpen ? 'CLOSE' : 'MENU'}
            aria-label={isOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
            {isOpen ? <X className="w-4 h-4 text-[#e63946]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0.5% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0.5% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[998] flex flex-col justify-between p-6 sm:p-8 md:p-16 lg:p-20 overflow-y-auto bg-[#111115] text-[#f5f5f7]"
          >
            {/* Top info */}
            <div className="flex justify-between items-center text-xs font-mono-custom text-[#555560] tracking-widest pt-12 md:pt-4">
              <span>INDEX / NAVIGATION</span>
              <span>INDIA (IST)</span>
            </div>

            {/* Menu Links */}
            <nav className="my-auto py-6">
              <ul className="space-y-3 md:space-y-4">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                    >
                      <button
                        onClick={() => handleLinkClick(item.id)}
                        className="group flex items-baseline gap-6 md:gap-12 w-full text-left cursor-pointer focus:outline-none"
                        data-cursor-label="GO"
                      >
                        <span className="font-mono-custom text-xs md:text-sm text-[#555560] group-hover:text-[#e63946] transition-colors">
                          {item.number}
                        </span>

                        <span
                          className={`font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase transition-all duration-300 ${
                            isActive
                              ? 'text-[#e63946] translate-x-3 md:translate-x-6'
                              : 'group-hover:translate-x-3 md:group-hover:translate-x-6'
                          }`}
                        >
                          {item.label}
                        </span>

                        {isActive && (
                          <span className="ml-auto hidden md:inline-block text-xs font-mono-custom text-[#e63946] uppercase border border-[#e63946]/40 px-3 py-1 rounded-full">
                            [ ACTIVE ]
                          </span>
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono-custom text-[#555560] border-t border-current/10 pt-6">
              <div>
                <p className="font-semibold mb-1">DEGREE</p>
                <p>{DEVELOPER_INFO.degree}</p>
                <p>{DEVELOPER_INFO.institution}</p>
              </div>

              <div>
                <p className="font-semibold mb-1">CONNECT</p>
                <div className="flex gap-4">
                  <a
                    href={DEVELOPER_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#e63946] transition-colors flex items-center gap-1"
                  >
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href={DEVELOPER_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#e63946] transition-colors flex items-center gap-1"
                  >
                    LinkedIn <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="md:text-right">
                <p className="font-semibold mb-1">STATUS</p>
                <p className="text-[#e63946] font-mono-custom">[ {DEVELOPER_INFO.availability} ]</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
