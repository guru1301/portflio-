import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { GSymbol, type GSymbolRef } from './GSymbol';
import './BrandIntro.css';

export interface BrandIntroProps {
  onComplete?: () => void;
  allowSkip?: boolean;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({
  onComplete,
  allowSkip = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const gSymbolRef = useRef<GSymbolRef>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isFinishedRef = useRef(false);

  // Smooth clean exit handler
  const handleSkipOrExit = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        filter: 'blur(8px)',
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    } else {
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    // Lock body scroll while brand intro is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Interactive 3D mouse parallax listener
    const handleMouseMove = (e: MouseEvent) => {
      if (isFinishedRef.current || !gSymbolRef.current?.container) return;
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const yNorm = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      gsap.to(gSymbolRef.current.container, {
        rotateY: xNorm * 10,
        rotateX: -yNorm * 10,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const ctx = gsap.context(() => {
      const g = gSymbolRef.current;
      if (!g || !containerRef.current) return;

      // Master Unified Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (!isFinishedRef.current) {
            isFinishedRef.current = true;
            if (onComplete) onComplete();
          }
        },
      });
      timelineRef.current = tl;

      // Initial state resets
      gsap.set(containerRef.current, { opacity: 1, scale: 1 });
      if (atmosphereRef.current) gsap.set(atmosphereRef.current, { opacity: 0 });
      if (brandTextRef.current) gsap.set(brandTextRef.current, { opacity: 0, y: 22, filter: 'blur(10px)' });

      // Calculate path length for fluid curvy laser trace
      const pathLength = g.centerlinePath ? g.centerlinePath.getTotalLength() : 750;

      if (g.centerlinePath) {
        gsap.set(g.centerlinePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      if (g.centerlineGlowPath) {
        gsap.set(g.centerlineGlowPath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      // Initial sculptural 3D orientation
      if (g.container) {
        gsap.set(g.container, {
          rotateX: -5.5,
          rotateY: 7.5,
          scale: 0.95,
        });
      }

      // Hide active components initially
      if (g.blueprintGroup) gsap.set(g.blueprintGroup, { opacity: 0 });
      if (g.sparkGroup) gsap.set(g.sparkGroup, { opacity: 0, scale: 0 });
      if (g.laserHead) gsap.set(g.laserHead, { opacity: 0 });
      if (g.wireframeGroup) gsap.set(g.wireframeGroup, { opacity: 0 });
      if (g.chassisGroup) gsap.set(g.chassisGroup, { opacity: 0, y: 8 });
      if (g.solidGroup) gsap.set(g.solidGroup, { opacity: 0 });
      if (g.bevelStroke) gsap.set(g.bevelStroke, { opacity: 0 });
      if (g.coreLockGroup) gsap.set(g.coreLockGroup, { opacity: 0, scale: 0 });
      if (g.specularRect) gsap.set(g.specularRect, { opacity: 0 });

      // ====================================================================
      // PHASE 01 — DEEP SPACE & SUBTLE ORBIT RING (0.0s - 0.7s)
      // ====================================================================
      if (atmosphereRef.current) {
        tl.to(atmosphereRef.current, {
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
        }, 0.05);
      }

      if (g.blueprintGroup) {
        tl.to(g.blueprintGroup, {
          opacity: 0.5,
          duration: 0.7,
          ease: 'power2.out',
        }, 0.15);
      }

      // ====================================================================
      // PHASE 02 — FLUID PLASMA SPARK IGNITION (0.4s - 0.9s)
      // Spark at the top-right entry node of the curvy G (285, 128.7)
      // ====================================================================
      if (g.sparkGroup) {
        tl.to(g.sparkGroup, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'back.out(2)',
        }, 0.4);

        tl.fromTo('.spark-ring-1',
          { scale: 0.2, opacity: 1 },
          { scale: 3.2, opacity: 0, duration: 0.7, ease: 'power2.out' },
          0.45
        );
        tl.fromTo('.spark-ring-2',
          { scale: 0.2, opacity: 0.8 },
          { scale: 4.5, opacity: 0, duration: 0.85, ease: 'power2.out' },
          0.52
        );
      }

      // ====================================================================
      // PHASE 03 — FLUID CURVY LASER MILLING & DYNAMIC TRACE (0.85s - 2.5s)
      // Travelling luminous pearl glides along the continuous curves of the G
      // ====================================================================
      if (g.wireframeGroup && g.centerlinePath) {
        tl.to(g.wireframeGroup, {
          opacity: 1,
          duration: 0.15,
        }, 0.85);

        if (g.laserHead) {
          tl.to(g.laserHead, {
            opacity: 1,
            duration: 0.2,
          }, 0.88);
        }

        // Smoothly fade origin spark as the travelling head takes off
        if (g.sparkGroup) {
          tl.to(g.sparkGroup, {
            opacity: 0,
            duration: 0.25,
          }, 1.0);
        }

        // Animate the laser drawing and track the head position in real time along the curve
        const traceObj = { progress: 0 };
        tl.to(traceObj, {
          progress: 1,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (!g.centerlinePath) return;
            const currentDist = traceObj.progress * pathLength;
            const remaining = Math.max(0, pathLength - currentDist);

            g.centerlinePath.style.strokeDashoffset = `${remaining}`;

            if (g.centerlineGlowPath) {
              g.centerlineGlowPath.style.strokeDashoffset = `${remaining}`;
            }

            if (g.laserHead) {
              const pt = g.centerlinePath.getPointAtLength(currentDist);
              g.laserHead.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            }
          },
        }, 0.9);
      }

      // ====================================================================
      // PHASE 04 — CORE NEXUS ARRIVAL LOCK (2.45s - 3.0s)
      // Laser arrives smoothly at the crossbar terminus (195, 200)
      // ====================================================================
      if (g.coreLockGroup) {
        tl.to(g.coreLockGroup, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(2.5)',
        }, 2.45);

        tl.fromTo('.lock-ring-1',
          { scale: 0.2, opacity: 1 },
          { scale: 3.5, opacity: 0, duration: 0.65, ease: 'power2.out' },
          2.47
        );
        tl.fromTo('.lock-ring-2',
          { scale: 0.2, opacity: 0.8 },
          { scale: 4.8, opacity: 0, duration: 0.8, ease: 'power2.out' },
          2.53
        );

        // Dissolve arrival burst cleanly so no circular reticle lines linger on the G
        tl.to(g.coreLockGroup, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        }, 2.7);
      }

      // Laser head dissolves into the core reactor
      if (g.laserHead) {
        tl.to(g.laserHead, {
          opacity: 0,
          duration: 0.2,
        }, 2.5);
      }

      // ====================================================================
      // PHASE 05 — 3D SOLIDIFICATION & CHASSIS ELEVATION (2.55s - 3.2s)
      // Curvy titanium surface solidifies, extruded chassis elevates, bevels gleam
      // ====================================================================
      if (g.solidGroup) {
        tl.to(g.solidGroup, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 2.55);
      }

      if (g.chassisGroup) {
        tl.to(g.chassisGroup, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        }, 2.55);
      }

      if (g.bevelStroke) {
        tl.to(g.bevelStroke, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, 2.6);
      }

      // Fade out laser wireframe completely so zero white trace lines remain across the G
      if (g.wireframeGroup) {
        tl.to(g.wireframeGroup, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        }, 2.62);
      }

      // ====================================================================
      // PHASE 06 — SCULPTURAL 3D PERSPECTIVE LIFT (2.6s - 3.6s)
      // Monogram transitions smoothly to neutral balanced perspective
      // ====================================================================
      if (g.container) {
        tl.to(g.container, {
          rotateX: 0,
          rotateY: 0,
          scale: 1.0,
          duration: 1.1,
          ease: 'power3.out',
        }, 2.6);
      }

      // ====================================================================
      // PHASE 08 — BRAND TYPOGRAPHIC LOCKUP REVEAL (3.3s - 4.2s)
      // Typographic signature smoothly unblurs beneath the curvy G monogram
      // ====================================================================
      if (brandTextRef.current) {
        tl.to(brandTextRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
        }, 3.3);
      }

      // ====================================================================
      // PHASE 09 — CINEMATIC RELEASE (4.4s - 4.95s)
      // Seamlessly scales forward and dissolves into the main portfolio
      // ====================================================================
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        filter: 'blur(6px)',
        duration: 0.55,
        ease: 'power2.inOut',
      }, 4.4);
    });

    // Keyboard listener for Escape or Space skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (allowSkip && (e.key === 'Escape' || e.key === ' ')) {
        e.preventDefault();
        handleSkipOrExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleSkipOrExit, allowSkip, onComplete]);

  return (
    <div
      ref={containerRef}
      className="brand-intro-container"
      onClick={allowSkip ? handleSkipOrExit : undefined}
      role="banner"
      aria-label="Brand identity reveal"
    >
      {/* Background Volumetric Atmosphere */}
      <div ref={atmosphereRef} className="brand-intro-atmosphere" />

      {/* Center Brand Identity Construction */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Sculptural Curvy G Monogram Construction */}
        <GSymbol ref={gSymbolRef} />

        {/* Brand Typographic Identity Lockup */}
        <div
          ref={brandTextRef}
          className="flex flex-col items-center text-center space-y-3 pointer-events-none"
        >
          <h1 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white uppercase brand-intro-typography">
            GURU PRASATH
          </h1>
          <div className="brand-intro-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e63946] animate-pulse shadow-[0_0_8px_#e63946]" />
            <span className="font-mono-custom text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.28em] brand-intro-subtitle">
              SOFTWARE &bull; DATA &bull; ARCHITECTURE
            </span>
          </div>
        </div>
      </div>

      {/* Luxury Non-Intrusive Skip Affordance */}
      {allowSkip && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkipOrExit();
          }}
          className="brand-intro-skip hover:opacity-100 opacity-60 focus:outline-none"
          aria-label="Skip brand intro"
        >
          SKIP <span className="opacity-50 ml-1 font-mono text-[9px]">[ESC]</span>
        </button>
      )}
    </div>
  );
};
