import React, { forwardRef } from 'react';

export interface GSymbolRef {
  container: HTMLDivElement | null;
  svg: SVGSVGElement | null;
  sparkGroup: SVGGElement | null;
  laserHead: SVGGElement | null;
  centerlinePath: SVGPathElement | null;
  centerlineGlowPath: SVGPathElement | null;
  wireframeGroup: SVGGElement | null;
  chassisGroup: SVGGElement | null;
  solidGroup: SVGGElement | null;
  bevelStroke: SVGPathElement | null;
  redOutlineGroup: SVGGElement | null;
  formationBurst: SVGGElement | null;
  specularRect: SVGRectElement | null;
  coreLockGroup: SVGGElement | null;
  blueprintGroup: SVGGElement | null;
}

export const GSymbol = forwardRef<GSymbolRef, { className?: string }>(
  ({ className = '' }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const svgRef = React.useRef<SVGSVGElement>(null);
    const sparkGroupRef = React.useRef<SVGGElement>(null);
    const laserHeadRef = React.useRef<SVGGElement>(null);
    const centerlinePathRef = React.useRef<SVGPathElement>(null);
    const centerlineGlowPathRef = React.useRef<SVGPathElement>(null);
    const wireframeGroupRef = React.useRef<SVGGElement>(null);
    const chassisGroupRef = React.useRef<SVGGElement>(null);
    const solidGroupRef = React.useRef<SVGGElement>(null);
    const bevelStrokeRef = React.useRef<SVGPathElement>(null);
    const redOutlineGroupRef = React.useRef<SVGGElement>(null);
    const formationBurstRef = React.useRef<SVGGElement>(null);
    const specularRectRef = React.useRef<SVGRectElement>(null);
    const coreLockGroupRef = React.useRef<SVGGElement>(null);
    const blueprintGroupRef = React.useRef<SVGGElement>(null);

    React.useImperativeHandle(ref, () => ({
      container: containerRef.current,
      svg: svgRef.current,
      sparkGroup: sparkGroupRef.current,
      laserHead: laserHeadRef.current,
      centerlinePath: centerlinePathRef.current,
      centerlineGlowPath: centerlineGlowPathRef.current,
      wireframeGroup: wireframeGroupRef.current,
      chassisGroup: chassisGroupRef.current,
      solidGroup: solidGroupRef.current,
      bevelStroke: bevelStrokeRef.current,
      redOutlineGroup: redOutlineGroupRef.current,
      formationBurst: formationBurstRef.current,
      specularRect: specularRectRef.current,
      coreLockGroup: coreLockGroupRef.current,
      blueprintGroup: blueprintGroupRef.current,
    }));

    // ========================================================================
    // SCULPTURAL CURVILINEAR GEOMETRY — 400x400 VIEWPORT (CENTER AT 200, 200)
    // Continuous flowing organic curves, silky rounded caps & balanced crossbar
    // ========================================================================

    // Solid closed continuous Curvy G monogram contour
    const solidGPolygon = `
      M 304.2,112.6
      A 136,136 0 1,0 336,200
      L 336,175
      L 205,175
      A 25,25 0 0 0 205,225
      L 282.3,225
      A 86,86 0 1,1 265.9,144.7
      A 25,25 0 0 1 304.2,112.6
      Z
    `.replace(/\s+/g, ' ').trim();

    // Centerline fluid trajectory for the luminous trace
    const centerlineD = `
      M 285.0,128.7
      A 111,111 0 1,0 311,200
      L 311,185
      A 15,15 0 0 0 296,200
      L 195,200
    `.replace(/\s+/g, ' ').trim();
    return (
      <div
        ref={containerRef}
        className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] flex items-center justify-center select-none ${className}`}
        style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient Volumetric Radial Aura */}
            <radialGradient id="g-ambient-glow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#e63946" stopOpacity="0.28" />
              <stop offset="35%" stopColor="#e63946" stopOpacity="0.08" />
              <stop offset="70%" stopColor="#14141c" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#08080c" stopOpacity="0" />
            </radialGradient>

            {/* Milled Brushed Titanium Sleek Grey Face */}
            <linearGradient id="g-titanium-face" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#484a5c" />
              <stop offset="22%" stopColor="#373948" />
              <stop offset="50%" stopColor="#2b2d39" />
              <stop offset="78%" stopColor="#20212b" />
              <stop offset="100%" stopColor="#2c2d3a" />
            </linearGradient>

            {/* Electric Crimson Red Contour Gradient */}
            <linearGradient id="g-red-contour" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d5e" />
              <stop offset="30%" stopColor="#e63946" />
              <stop offset="70%" stopColor="#ff2a3f" />
              <stop offset="100%" stopColor="#d62839" />
            </linearGradient>

            {/* Inset Perimeter Ambient Rim Light */}
            <linearGradient id="g-inner-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="25%" stopColor="#7a7c8e" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#14141d" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>

            {/* 3D Extruded Chassis Shadow Rim Gradient */}
            <linearGradient id="g-chassis-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22232f" />
              <stop offset="50%" stopColor="#12131a" />
              <stop offset="100%" stopColor="#050508" />
            </linearGradient>

            {/* Razor-Sharp Knife-Edge Chamfer Platinum Highlight */}
            <linearGradient id="g-knife-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#ff8591" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#e63946" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#8a8c9e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
            </linearGradient>

            {/* Core Cantilever Ruby Laser Filament */}
            <linearGradient id="g-core-filament-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#ff4d5e" />
              <stop offset="75%" stopColor="#e63946" />
              <stop offset="100%" stopColor="#ff7080" />
            </linearGradient>

            {/* Dual-Band Chromatic Specular Sweep Beam */}
            <linearGradient id="g-specular-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="18%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="47%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="52%" stopColor="#ff6272" stopOpacity="0.85" />
              <stop offset="58%" stopColor="#80d4ff" stopOpacity="0.35" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* High-Precision Optical Bloom Filter */}
            <filter id="g-bloom" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense Incandescent Ignition Spark Glow */}
            <filter id="g-spark-core" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5.0" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 3D Extrusion Elevation Drop Shadow */}
            <filter id="g-extrusion-shadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.85" />
            </filter>

            {/* Curvy G Silhouette Clip Mask */}
            <clipPath id="g-silhouette-clip">
              <path d={solidGPolygon} />
            </clipPath>
          </defs>

          {/* ================================================================
              LAYER 00: AMBIENT VOLUMETRIC AURA
              ================================================================ */}
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="url(#g-ambient-glow)"
            className="pointer-events-none"
          />

          {/* ================================================================
              LAYER 01: MINIMAL CELESTIAL ORBITS (Clean & empty)
              ================================================================ */}
          <g
            ref={blueprintGroupRef}
            className="pointer-events-none opacity-0"
          />

          {/* ================================================================
              LAYER 02: 3D EXTRUDED CHASSIS BACKPLATE & ELEVATION SHADOW
              ================================================================ */}
          <g ref={chassisGroupRef} className="opacity-0">
            {/* 3D Extrusion Depth Layer (translated +5px X, +7px Y) with subtle ruby rim */}
            <path
              d={solidGPolygon}
              fill="url(#g-chassis-bevel)"
              stroke="#e63946"
              strokeWidth="0.8"
              strokeOpacity="0.4"
              transform="translate(5, 7)"
              filter="url(#g-extrusion-shadow)"
            />
            {/* Deep Milled Chamfer Wall Rim */}
            <path
              d={solidGPolygon}
              fill="none"
              stroke="#0a0a10"
              strokeWidth="2.5"
              transform="translate(3, 4)"
            />
          </g>

          {/* ================================================================
              LAYER 03: SOLID MONOLITHIC CURVY TITANIUM SURFACE & SPECULAR SHEEN
              ================================================================ */}
          <g ref={solidGroupRef} clipPath="url(#g-silhouette-clip)" className="opacity-0">
            {/* Primary Milled Brushed Titanium Sleek Grey Face */}
            <path d={solidGPolygon} fill="url(#g-titanium-face)" />

            {/* Micro-chamfer Inset Edge Soft Light for 3D Relief */}
            <path
              d={solidGPolygon}
              fill="none"
              stroke="url(#g-inner-rim)"
              strokeWidth="3.2"
              strokeOpacity="0.6"
            />

            {/* Recessed Center Conduit Trench Groove */}
            <path
              d={centerlineD}
              fill="none"
              stroke="#0c0d13"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={centerlineD}
              fill="none"
              stroke="#1b1c26"
              strokeWidth="11"
              strokeOpacity="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Glowing Ruby Core Circuit Hairline in Trench */}
            <path
              d={centerlineD}
              fill="none"
              stroke="#e63946"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#g-bloom)"
            />

            {/* Cantilever Crossbar Anodized Inlay & Ruby Core Track */}
            <rect
              x="195"
              y="178"
              width="85"
              height="44"
              rx="22"
              fill="#101118"
              stroke="#e63946"
              strokeWidth="1.2"
              strokeOpacity="0.6"
              opacity="0.95"
            />
            <line
              x1="195"
              y1="200"
              x2="280"
              y2="200"
              stroke="url(#g-core-filament-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#g-bloom)"
            />

            {/* Dual-Band Specular Highlight Sweep Beam */}
            <rect
              ref={specularRectRef}
              x="-280"
              y="-180"
              width="650"
              height="110"
              fill="url(#g-specular-sweep)"
              transform="rotate(38, 200, 200)"
              className="opacity-0 pointer-events-none"
            />
          </g>

          {/* ================================================================
              LAYER 04: VIBRANT RED OUTLINE & KNIFE-EDGE RIM HIGHLIGHTS
              ================================================================ */}
          <g ref={redOutlineGroupRef} className="opacity-0">
            {/* Outer Volumetric Crimson Halo Glow */}
            <path
              d={solidGPolygon}
              fill="none"
              stroke="#e63946"
              strokeWidth="7"
              strokeOpacity="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#g-bloom)"
            />

            {/* Middle Electric Ruby Edge Aura */}
            <path
              d={solidGPolygon}
              fill="none"
              stroke="#ff3b4e"
              strokeWidth="3.6"
              strokeOpacity="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Razor-Sharp Crisp Red Contour Line */}
            <path
              d={solidGPolygon}
              fill="none"
              stroke="url(#g-red-contour)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Precision Platinum-Ruby Chamfer Highlight for High-End Metallic Sheen */}
            <path
              ref={bevelStrokeRef}
              d={solidGPolygon}
              fill="none"
              stroke="url(#g-knife-highlight)"
              strokeWidth="1.0"
              strokeOpacity="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <g ref={formationBurstRef} className="opacity-0 pointer-events-none" />

          {/* ================================================================
              LAYER 05: PROGRESSIVE WIREFRAME & CURVED LASER TRACE TRACK
              ================================================================ */}
          <g ref={wireframeGroupRef} className="opacity-0">
            {/* Glowing Photonic Aura along Curved Centerline */}
            <path
              ref={centerlineGlowPathRef}
              d={centerlineD}
              fill="none"
              stroke="#e63946"
              strokeWidth="12"
              strokeOpacity="0.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#g-bloom)"
            />

            {/* Laser Core White-Hot Filament */}
            <path
              ref={centerlinePathRef}
              d={centerlineD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#g-bloom)"
            />
          </g>

          {/* ================================================================
              LAYER 06: INITIAL SIGNAL PLASMA SPARK & IGNITION PULSE (285, 128.7)
              ================================================================ */}
          <g
            ref={sparkGroupRef}
            transform="translate(285, 128.7)"
            className="opacity-0"
            filter="url(#g-spark-core)"
          >
            {/* Radial Sonic Expansion Rings */}
            <circle
              cx="0"
              cy="0"
              r="8"
              fill="none"
              stroke="#e63946"
              strokeWidth="1.6"
              className="spark-ring-1"
            />
            <circle
              cx="0"
              cy="0"
              r="16"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.0"
              strokeOpacity="0.75"
              className="spark-ring-2"
            />

            {/* Intense White Plasma Core */}
            <circle cx="0" cy="0" r="4" fill="#ffffff" />
            <circle cx="0" cy="0" r="8" fill="#e63946" opacity="0.7" />
          </g>

          {/* ================================================================
              LAYER 07: KINETIC TRAVELLING LASER HEAD (TRACKS TIP IN REAL TIME)
              ================================================================ */}
          <g
            ref={laserHeadRef}
            transform="translate(285, 128.7)"
            className="opacity-0 pointer-events-none"
            filter="url(#g-spark-core)"
          >
            {/* Optical Anamorphic Flare Streak */}
            <line x1="-18" y1="0" x2="18" y2="0" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.9" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.7" />

            {/* Blazing Incandescent Core Dot */}
            <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="9" fill="#e63946" opacity="0.65" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#e63946" strokeWidth="1" strokeOpacity="0.4" />
          </g>

          {/* ================================================================
              LAYER 08: CANTILEVER CORE NEXUS REACTOR (TERMINATION AT 195, 200)
              ================================================================ */}
          <g
            ref={coreLockGroupRef}
            transform="translate(195, 200)"
            className="opacity-0"
            filter="url(#g-bloom)"
          >
            {/* Precision Diamond Nexus Prism */}
            <polygon
              points="0,-8 8,0 0,8 -8,0"
              fill="#ffffff"
              filter="url(#g-bloom)"
            />
            <circle cx="0" cy="0" r="2.5" fill="#e63946" />

            {/* Concentric Precision Reticle Rings */}
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="none"
              stroke="#e63946"
              strokeWidth="1.0"
              strokeDasharray="2,3"
            />
            <circle
              cx="0"
              cy="0"
              r="14"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.7"
              strokeOpacity="0.6"
            />

            {/* Reactor Shockwave Pulse Wave Rings */}
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="none"
              stroke="#e63946"
              strokeWidth="1.8"
              className="lock-ring-1"
            />
            <circle
              cx="0"
              cy="0"
              r="22"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              className="lock-ring-2"
            />
          </g>
        </svg>
      </div>
    );
  }
);

GSymbol.displayName = 'GSymbol';
