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
        filter: 'blur(6px)',
        duration: 0.4,
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
        rotateY: xNorm * 11,
        rotateX: -yNorm * 11,
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

      // Calculate path length for laser trace
      const pathLength = g.centerlinePath ? g.centerlinePath.getTotalLength() : 716;

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
          rotateX: -6.5,
          rotateY: 8.5,
          scale: 0.94,
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
      gsap.set('.key-rim-highlight', { opacity: 0 });
      if (g.coreLockGroup) gsap.set(g.coreLockGroup, { opacity: 0, scale: 0 });
      if (g.specularRect) gsap.set(g.specularRect, { opacity: 0 });

      // ====================================================================
      // PHASE 01 — DEEP SPACE & BLUEPRINT CADENCE (0.0s - 0.7s)
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
          opacity: 0.6,
          duration: 0.7,
          ease: 'power2.out',
        }, 0.15);
      }

      // ====================================================================
      // PHASE 02 — INITIAL SIGNAL PLASMA SPARK (0.45s - 0.95s)
      // Origin ignition at the top-right entry node (310, 104)
      // ====================================================================
      if (g.sparkGroup) {
        tl.to(g.sparkGroup, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'back.out(2)',
        }, 0.45);

        tl.fromTo('.spark-ring-1',
          { scale: 0.2, opacity: 1 },
          { scale: 3.2, opacity: 0, duration: 0.7, ease: 'power2.out' },
          0.5
        );
        tl.fromTo('.spark-ring-2',
          { scale: 0.2, opacity: 0.8 },
          { scale: 4.5, opacity: 0, duration: 0.85, ease: 'power2.out' },
          0.6
        );
      }

      // ====================================================================
      // PHASE 03 — PRECISION LASER MILLING & DYNAMIC TRACE (0.9s - 2.55s)
      // Laser head physically glides along the 8 segments of the G
      // ====================================================================
      if (g.wireframeGroup && g.centerlinePath) {
        tl.to(g.wireframeGroup, {
          opacity: 1,
          duration: 0.15,
        }, 0.9);

        if (g.laserHead) {
          tl.to(g.laserHead, {
            opacity: 1,
            duration: 0.2,
          }, 0.92);
        }

        // Smoothly fade origin spark as the travelling head takes off
        if (g.sparkGroup) {
          tl.to(g.sparkGroup, {
            opacity: 0,
            duration: 0.25,
          }, 1.05);
        }

        // Animate the laser drawing and track the head position in real time
        const traceObj = { progress: 0 };
        tl.to(traceObj, {
          progress: 1,
          duration: 1.65,
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
        }, 0.95);
      }

      // ====================================================================
      // PHASE 04 — CANTILEVER CORE REACTOR LOCK (2.55s - 3.1s)
      // Laser arrives at (192, 200); core nexus diamond ignites with shockwaves
      // ====================================================================
      if (g.coreLockGroup) {
        tl.to(g.coreLockGroup, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(2.5)',
        }, 2.55);

        tl.fromTo('.lock-ring-1',
          { scale: 0.2, opacity: 1 },
          { scale: 3.5, opacity: 0, duration: 0.65, ease: 'power2.out' },
          2.57
        );
        tl.fromTo('.lock-ring-2',
          { scale: 0.2, opacity: 0.8 },
          { scale: 4.8, opacity: 0, duration: 0.8, ease: 'power2.out' },
          2.63
        );
      }

      // Laser head dissolves into the core reactor
      if (g.laserHead) {
        tl.to(g.laserHead, {
          opacity: 0,
          duration: 0.2,
        }, 2.6);
      }

      // ====================================================================
      // PHASE 05 — 3D SOLIDIFICATION & CHASSIS ELEVATION (2.65s - 3.3s)
      // Titanium surface solidifies, extruded chassis elevates, bevels gleam
      // ====================================================================
      if (g.solidGroup) {
        tl.to(g.solidGroup, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 2.65);
      }

      if (g.chassisGroup) {
        tl.to(g.chassisGroup, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        }, 2.65);
      }

      if (g.bevelStroke) {
        tl.to(g.bevelStroke, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, 2.7);
      }

      tl.to('.key-rim-highlight', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 2.72);

      // Soften wireframe and blueprint into background ambient
      if (g.wireframeGroup) {
        tl.to(g.wireframeGroup, {
          opacity: 0.35,
          duration: 0.5,
        }, 2.75);
      }

      if (g.blueprintGroup) {
        tl.to(g.blueprintGroup, {
          opacity: 0.22,
          duration: 0.5,
        }, 2.75);
      }

      // ====================================================================
      // PHASE 06 — SCULPTURAL 3D PERSPECTIVE LIFT (2.7s - 3.8s)
      // Monogram transitions smoothly to neutral balanced perspective
      // ====================================================================
      if (g.container) {
        tl.to(g.container, {
          rotateX: 0,
          rotateY: 0,
          scale: 1.0,
          duration: 1.15,
          ease: 'power3.out',
        }, 2.7);
      }

      // ====================================================================
      // PHASE 07 — DUAL-BAND SPECULAR CHROME LIGHT SWEEP (3.15s - 4.1s)
      // Prismatic reflection glides across the titanium face catching edges
      // ====================================================================
      if (g.specularRect) {
        tl.fromTo(g.specularRect,
          { x: -320, y: -200, opacity: 0 },
          {
            x: 360,
            y: 280,
            opacity: 1,
            duration: 0.95,
            ease: 'power2.inOut',
            onComplete: () => {
              if (g.specularRect) gsap.set(g.specularRect, { opacity: 0 });
            },
          },
          3.15
        );
      }

      // ====================================================================
      // PHASE 08 — BRAND TYPOGRAPHIC LOCKUP REVEAL (3.6s - 4.45s)
      // Typographic signature smoothly unblurs beneath the G monogram
      // ====================================================================
      if (brandTextRef.current) {
        tl.to(brandTextRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
        }, 3.6);
      }

      // ====================================================================
      // PHASE 09 — CINEMATIC RELEASE (4.65s - 5.2s)
      // Seamlessly scales forward and dissolves into the main portfolio
      // ====================================================================
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        filter: 'blur(4px)',
        duration: 0.55,
        ease: 'power2.inOut',
      }, 4.65);
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

      {/* Top Telemetry Header */}
      <div className="brand-intro-telemetry">
        <span className="brand-intro-telemetry-dot" />
        <span>CORE ARCHITECTURE // 2026</span>
      </div>

      {/* Architectural Corner Alignment Viewfinder Brackets */}
      <div className="brand-intro-corner brand-intro-corner-tl" />
      <div className="brand-intro-corner brand-intro-corner-tr" />
      <div className="brand-intro-corner brand-intro-corner-bl" />
      <div className="brand-intro-corner brand-intro-corner-br" />

      {/* Center Brand Identity Construction */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Sculptural Geometric G Construction with Dynamic GSAP Control */}
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
            <span className="font-mono-custom text-[10px] sm:text-xs text-white/70 uppercase tracking-[0.3em] brand-intro-subtitle">
              SOFTWARE &bull; DATA &bull; ARCHITECTURE
            </span>
          </div>
        </div>
      </div>

      {/* Non-Intrusive Skip Affordance */}
      {allowSkip && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkipOrExit();
          }}
          className="brand-intro-skip hover:opacity-100 opacity-60 focus:outline-none"
          aria-label="Skip brand intro"
        >
          [ ESC &bull; SKIP ]
        </button>
      )}
    </div>
  );
};
