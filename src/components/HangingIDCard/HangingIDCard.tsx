import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { IDCardScene } from './IDCardScene';
import { DEFAULT_CARD_CONFIG } from './config';
import { useThemeColor } from '../../context/ThemeColorContext';
import type { HangingIDCardProps } from './types';

export const HangingIDCard: React.FC<HangingIDCardProps> = ({
  photo = '/assets/profile.jpg',
  name = 'GURU PRASATH',
  role = 'SOFTWARE & SYSTEMS DEVELOPER',
  institution = 'Saranathan College of Eng.',
  degree = 'B.Tech CSBS (2022 — 2026)',
  location = 'India',
  code = 'GP-2026-CSBS',
  className = '',
  config: userConfig,
}) => {
  const { accentColor } = useThemeColor();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

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

  // Compute responsive anchor X position (placed cleanly on the right side)
  const anchorX = useMemo(() => {
    if (windowWidth < 640) return 0.5; // Slightly right of center on mobile
    if (windowWidth < 1024) return 1.8; // Right of center on tablet
    if (windowWidth < 1440) return 2.8; // Right on standard desktop
    return 3.2; // Right on wide desktop
  }, [windowWidth]);

  // Compute responsive scale for clear text visibility
  const responsiveScale = useMemo(() => {
    if (windowWidth < 640) return 0.65; // Mobile
    if (windowWidth < 1024) return 0.76; // Tablet
    if (windowWidth < 1440) return 0.86; // Desktop
    return 0.94; // Large desktop
  }, [windowWidth]);

  // Merge default config with user overrides and responsive positioning
  const config = useMemo(() => {
    return {
      ...DEFAULT_CARD_CONFIG,
      ...userConfig,
      scale: (userConfig?.scale ?? DEFAULT_CARD_CONFIG.scale) * responsiveScale,
      lanyard: {
        ...DEFAULT_CARD_CONFIG.lanyard,
        anchor: [anchorX, 4.3, 0] as [number, number, number],
        accentColor: accentColor || DEFAULT_CARD_CONFIG.lanyard.accentColor,
        ...userConfig?.lanyard,
      },
    };
  }, [userConfig, responsiveScale, anchorX, accentColor]);

  const defaultClasses =
    'absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden';

  return (
    <div
      className={`select-none touch-none ${className || defaultClasses}`}
      aria-label="Interactive 3D Hanging ID Badge - Drag freely left and right across hero"
    >
      <Canvas
        camera={{ position: [0, 0.2, 7.8], fov: 38 }}
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

      {/* Subtle hint indicator positioned in lower right */}
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
