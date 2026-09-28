import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pipette, RotateCcw, Check, Sparkles, X } from 'lucide-react';
import { useThemeColor, THEME_COLOR_PRESETS, DEFAULT_ACCENT_COLOR } from '../../context/ThemeColorContext';

export const ThemeColorPicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { accentColor, isRgbCycle, setAccentColor, toggleRgbCycle, resetDefaultColor } = useThemeColor();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close panel when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Convert current color or hue to 0-360 for linear slider
  const [hueValue, setHueValue] = useState(0);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value, 10);
    setHueValue(hue);
    const hex = hslToHex(hue, 90, 56);
    setAccentColor(hex);
  };

  // Helper HSL to Hex
  function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  return (
    <div className="relative">
      {/* Ink Dropper / Pipette Header Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white font-mono-custom text-xs tracking-wider uppercase hover:border-white/30 transition-all cursor-pointer focus:outline-none shadow-lg group"
        data-cursor-label="COLOR"
        aria-label="Open theme color palette"
        aria-expanded={isOpen}
      >
        <div className="relative flex items-center justify-center">
          <Pipette className="w-3.5 h-3.5 text-white/90 group-hover:scale-110 transition-transform" />
          {/* Active color pip indicator */}
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-black/80"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
          />
        </div>
        <span className="hidden sm:inline text-[11px] font-semibold tracking-widest text-white/80">
          THEME
        </span>
      </button>

      {/* Luxury Color Picker Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 w-auto sm:w-[340px] max-w-[calc(100vw-24px)] p-4 sm:p-5 rounded-3xl bg-[#0f0f14]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[1000] text-white"
          >
            {/* Header bar */}
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/30"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 10px ${accentColor}`,
                  }}
                />
                <span className="font-mono-custom text-xs font-bold tracking-widest uppercase text-white/90">
                  ACCENT COLOR
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Close color palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Curated Presets Grid */}
            <div className="mt-4">
              <span className="font-mono-custom text-[10px] text-white/50 uppercase tracking-widest block mb-2.5">
                CURATED PRESETS
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {THEME_COLOR_PRESETS.map((preset) => {
                  const isSelected = !isRgbCycle && accentColor.toLowerCase() === preset.hex.toLowerCase();
                  return (
                    <button
                      key={preset.hex}
                      onClick={() => setAccentColor(preset.hex)}
                      className="group relative flex flex-col items-center justify-center p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                      title={preset.name}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: preset.hex,
                          boxShadow: isSelected ? `0 0 14px ${preset.hex}` : `0 0 6px ${preset.hex}40`,
                        }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Linear Rainbow Hue Spectrum Slider */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono-custom text-[10px] text-white/50 uppercase tracking-widest">
                  LINEAR SPECTRUM
                </span>
                <span className="font-mono-custom text-[10px] text-white/70 uppercase">
                  {accentColor.toUpperCase()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hueValue}
                onChange={handleHueChange}
                className="w-full h-3 rounded-full appearance-none cursor-pointer outline-none"
                style={{
                  background:
                    'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
                }}
              />
            </div>

            {/* Animated Neon RGB Cycle Button */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={toggleRgbCycle}
                className={`w-full py-2.5 px-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer font-mono-custom text-xs uppercase tracking-wider font-bold ${
                  isRgbCycle
                    ? 'border-white bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles
                    className={`w-4 h-4 ${
                      isRgbCycle ? 'text-[#ffbe0b] animate-spin' : 'text-white/50'
                    }`}
                  />
                  <span>NEON RGB CYCLE</span>
                </div>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full ${
                    isRgbCycle
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {isRgbCycle ? 'ACTIVE' : 'OFF'}
                </span>
              </button>
            </div>

            {/* Custom Hex Picker & Reset */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-white/60 hover:text-white font-mono-custom text-[11px] transition-colors">
                <input
                  type="color"
                  value={accentColor.startsWith('#') ? accentColor : DEFAULT_ACCENT_COLOR}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                />
                <span>CUSTOM COLOR</span>
              </label>

              <button
                onClick={resetDefaultColor}
                className="flex items-center gap-1.5 text-white/50 hover:text-[#e63946] transition-colors font-mono-custom text-[11px] cursor-pointer"
                title="Reset to default Crimson Red (#e63946)"
              >
                <RotateCcw className="w-3 h-3" />
                <span>DEFAULT</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
