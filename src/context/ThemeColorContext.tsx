import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface ThemeColorPreset {
  name: string;
  hex: string;
  glow: string;
}

export const THEME_COLOR_PRESETS: ThemeColorPreset[] = [
  { name: 'Crimson Red (Default)', hex: '#e63946', glow: 'rgba(230, 57, 70, 0.4)' },
  { name: 'Cyber Cyan', hex: '#00f5d4', glow: 'rgba(0, 245, 212, 0.4)' },
  { name: 'Neon Emerald', hex: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  { name: 'Electric Violet', hex: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  { name: 'Solar Amber', hex: '#ffb703', glow: 'rgba(255, 183, 3, 0.4)' },
  { name: 'Acid Magenta', hex: '#ff007f', glow: 'rgba(255, 0, 127, 0.4)' },
  { name: 'Cobalt Blue', hex: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)' },
  { name: 'Electric Lime', hex: '#a3e635', glow: 'rgba(163, 230, 53, 0.4)' },
];

export const DEFAULT_ACCENT_COLOR = '#e63946';

interface ThemeColorContextType {
  accentColor: string;
  isRgbCycle: boolean;
  setAccentColor: (color: string) => void;
  toggleRgbCycle: () => void;
  resetDefaultColor: () => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

function applyColorToDOM(color: string) {
  if (typeof document === 'undefined') return;

  document.documentElement.style.setProperty('--accent-electric', color);

  let styleEl = document.getElementById('theme-color-override') as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'theme-color-override';
    document.head.appendChild(styleEl);
  }

  // Override Tailwind utility classes and CSS variables globally
  styleEl.textContent = `
    :root {
      --accent-electric: ${color} !important;
    }
    .text-\\[\\#e63946\\] { color: ${color} !important; }
    .bg-\\[\\#e63946\\] { background-color: ${color} !important; }
    .border-\\[\\#e63946\\] { border-color: ${color} !important; }
    .decoration-\\[\\#e63946\\] { text-decoration-color: ${color} !important; }
    .hover\\:text-\\[\\#e63946\\]:hover { color: ${color} !important; }
    .hover\\:bg-\\[\\#e63946\\]:hover { background-color: ${color} !important; }
    .hover\\:border-\\[\\#e63946\\]:hover { border-color: ${color} !important; }
    .group:hover .group-hover\\:text-\\[\\#e63946\\] { color: ${color} !important; }
    .group:hover .group-hover\\:bg-\\[\\#e63946\\] { background-color: ${color} !important; }
    .group:hover .group-hover\\:border-\\[\\#e63946\\] { border-color: ${color} !important; }
    ::selection { background-color: ${color} !important; color: #ffffff !important; }
  `;
}

export const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColorState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-accent-color') || DEFAULT_ACCENT_COLOR;
    }
    return DEFAULT_ACCENT_COLOR;
  });

  const [isRgbCycle, setIsRgbCycle] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-rgb-cycle') === 'true';
    }
    return false;
  });

  const animationFrameRef = useRef<number | null>(null);

  // Apply color to DOM when accentColor changes
  useEffect(() => {
    if (!isRgbCycle) {
      applyColorToDOM(accentColor);
      localStorage.setItem('portfolio-accent-color', accentColor);
    }
  }, [accentColor, isRgbCycle]);

  // Handle RGB Neon Cycle Animation Loop
  useEffect(() => {
    if (isRgbCycle) {
      localStorage.setItem('portfolio-rgb-cycle', 'true');
      let start = performance.now();

      let lastStateUpdate = 0;
      const cycle = (now: number) => {
        const elapsed = (now - start) * 0.045; // Smooth speed
        const hue = Math.floor(elapsed % 360);
        const dynamicColor = `hsl(${hue}, 92%, 58%)`;

        applyColorToDOM(dynamicColor);

        // Smoothly throttle React state updates to avoid GPU canvas texture thrashing
        if (now - lastStateUpdate > 250) {
          lastStateUpdate = now;
          setAccentColorState(dynamicColor);
        }

        animationFrameRef.current = requestAnimationFrame(cycle);
      };

      animationFrameRef.current = requestAnimationFrame(cycle);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      localStorage.setItem('portfolio-rgb-cycle', 'false');
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      applyColorToDOM(accentColor);
    }
  }, [isRgbCycle]);

  const setAccentColor = useCallback((color: string) => {
    setIsRgbCycle(false);
    setAccentColorState(color);
  }, []);

  const toggleRgbCycle = useCallback(() => {
    setIsRgbCycle((prev) => !prev);
  }, []);

  const resetDefaultColor = useCallback(() => {
    setIsRgbCycle(false);
    setAccentColorState(DEFAULT_ACCENT_COLOR);
  }, []);

  return (
    <ThemeColorContext.Provider
      value={{
        accentColor,
        isRgbCycle,
        setAccentColor,
        toggleRgbCycle,
        resetDefaultColor,
      }}
    >
      {children}
    </ThemeColorContext.Provider>
  );
};

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider');
  }
  return context;
};
