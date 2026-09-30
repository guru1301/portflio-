import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { IDCardScene } from './IDCardScene';
import { DEFAULT_CARD_CONFIG } from './config';
import { useThemeColor } from '../../context/ThemeColorContext';
import type { HangingIDCardProps } from './types';

export const HangingIDCard: React.FC<HangingIDCardProps> = ({
  photo = '/assets/profile.jpg',
  name = 'GURU PRASATH',
  role = 'SOFTWARE & WEB SOLUTIONS',
  institution = 'Saranathan College of Engineering',
  degree = '2022 — 2026',
  location = 'India',
  code = 'GP-2026',
  className = '',
  config: userConfig,
}) => {
  const { accentColor } = useThemeColor();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Pause 3D physics and rendering when hero is scrolled out of viewport
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Responsive resize tracking
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Responsive anchor position:
  // On mobile (< 480px): Anchored at [0.82, 4.3, 0] so it hangs on the right side, clear of left typography
  // On phablet (< 768px): [1.05, 4.3, 0]
  // On tablet (< 1024px): [1.8, 4.3, 0]
  // On desktop (< 1440px): [2.8, 4.3, 0]
  // On wide desktop (>= 1440px): [3.2, 4.3, 0]
  const anchor = useMemo<[number, number, number]>(() => {
    if (windowWidth < 480) return [0.82, 4.3, 0];
    if (windowWidth < 768) return [1.05, 4.3, 0];
    if (windowWidth < 1024) return [1.8, 4.3, 0];  // Tablet
    if (windowWidth < 1440) return [2.8, 4.3, 0];  // Desktop
    return [3.2, 4.3, 0];                          // Wide desktop
  }, [windowWidth]);

  // Compute responsive restLength for the lanyard rope:
  // On mobile: 4.7 puts the card at restY = 4.3 - 4.7 = -0.40, vertically centered on the right
  // On desktop: 4.6 puts the card at restY = 4.3 - 4.6 = -0.30 (unchanged desktop layout)
  const restLength = useMemo(() => {
    if (windowWidth < 768) return 4.7;
    return DEFAULT_CARD_CONFIG.lanyard.restLength;
  }, [windowWidth]);

  // Compute responsive scale:
  // On mobile: 0.70 is compact yet sharp and completely avoids any collision with text
  // On desktop: 0.74 (tablet) / 0.86 (desktop) / 0.94 (wide desktop)
  const responsiveScale = useMemo(() => {
    if (windowWidth < 480) return 0.75;           // Compact, crisp, avoids any collision
    if (windowWidth < 768) return 0.78;           // Phablet
    if (windowWidth < 1024) return 0.82;          // Tablet
    if (windowWidth < 1440) return 0.95;          // Desktop
    return 1.04;                                  // Large desktop
  }, [windowWidth]);

  // Merge default config with user overrides and responsive positioning
  const config = useMemo(() => {
    return {
      ...DEFAULT_CARD_CONFIG,
      ...userConfig,
      scale: (userConfig?.scale ?? DEFAULT_CARD_CONFIG.scale) * responsiveScale,
      lanyard: {
        ...DEFAULT_CARD_CONFIG.lanyard,
        anchor,
        restLength,
        accentColor: accentColor || DEFAULT_CARD_CONFIG.lanyard.accentColor,
        ...userConfig?.lanyard,
      },
    };
  }, [userConfig, responsiveScale, anchor, restLength, accentColor]);

  const defaultClasses = 'w-full h-full relative overflow-hidden';

  return (
    <div
      ref={wrapperRef}
      className={`select-none touch-pan-y pointer-events-none ${className || defaultClasses}`}
      style={{ touchAction: 'pan-y' }}
      aria-label="Interactive 3D Hanging ID Badge"
    >
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        camera={{ position: [0, isMobile ? 0 : 0.2, 7.8], fov: 38 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        shadows
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          touchAction: 'pan-y',
        }}
      >
        <IDCardScene
          config={config}
          photo={photo}
          name={name}
          role={role}
          institution={institution}
          degree={degree}
          location={location}
          code={code}
          isReducedMotion={isReducedMotion}
        />
      </Canvas>

      {/* Subtle hint indicator for mobile */}
      <div className="flex sm:hidden absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none opacity-70 items-center gap-1.5 text-[10px] font-mono-custom uppercase tracking-wider text-white/80 bg-black/70 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md shadow-lg z-30">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: accentColor || '#e63946' }}
        />
        <span>Interactive 3D Badge • Drag to swing</span>
      </div>

      {/* Subtle hint indicator positioned in lower right on desktop */}
      <div className="hidden sm:flex absolute bottom-8 right-8 pointer-events-none opacity-40 hover:opacity-80 transition-opacity items-center gap-1.5 text-[10px] font-mono-custom uppercase tracking-wider text-white/70 bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: accentColor || '#e63946' }}
        />
        <span>Drag badge freely across hero</span>
      </div>
    </div>
  );
};
