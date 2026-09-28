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
      specularRect: specularRectRef.current,
      coreLockGroup: coreLockGroupRef.current,
      blueprintGroup: blueprintGroupRef.current,
    }));

    // ========================================================================
    // GEOMETRIC ARCHITECTURE — 400x400 VIEWPORT (CENTER AT 200, 200)
    // Uniform 48px structural beams with calibrated 45° precision chamfers
    // ========================================================================

    // Solid closed monolithic G polygon contour
    const solidGPolygon = `
      M 310,80
      L 136,80
      L 80,136
      L 80,264
      L 136,320
      L 264,320
      L 320,264
      L 320,176
      L 192,176
      L 192,224
      L 272,224
      L 272,244
      L 244,272
      L 156,272
      L 128,244
      L 128,156
      L 156,128
      L 310,128
      Z
    `;

    // Centerline optical rail trajectory for the laser trace
    const centerlineD = `
      M 310,104
      L 146,104
      L 104,146
      L 104,254
      L 146,296
      L 254,296
      L 296,254
      L 296,200
      L 192,200
    `;

    // Outer Key Light Chamfer Highlight Rim (Top & Left light exposure)
    const keyLightHighlightD = `
      M 310,80
      L 136,80
      L 80,136
      L 80,264
      L 136,320
    `;

    // Crossbar Cantilever Bevel Highlight Rim
    const crossbarHighlightD = `
      M 320,176
      L 192,176
      L 192,224
    `;

    // Inner Top & Left Key Light Catch
    const innerHighlightD = `
      M 156,128
      L 310,128
    `;

    // Ambient Occlusion Shadow Rim (Bottom & Right)
    const shadowRimD = `
      M 136,320
      L 264,320
      L 320,264
      L 320,176
    `;

    // Crossbar Lower Edge Shadow
    const crossbarShadowD = `
      M 192,224
      L 272,224
      L 272,244
    `;

    // Inner Cavity Shadow
    const innerShadowD = `
      M 272,244
      L 244,272
      L 156,272
      L 128,244
    `;

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
              <stop offset="0%" stopColor="#e63946" stopOpacity="0.22" />
              <stop offset="35%" stopColor="#e63946" stopOpacity="0.06" />
              <stop offset="70%" stopColor="#14141c" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#08080c" stopOpacity="0" />
            </radialGradient>

            {/* Milled Brushed Titanium Metallic Surface */}
            <linearGradient id="g-titanium-face" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c2d3a" />
              <stop offset="28%" stopColor="#1f202c" />
              <stop offset="60%" stopColor="#15151e" />
              <stop offset="85%" stopColor="#0f0f15" />
              <stop offset="100%" stopColor="#09090d" />
            </linearGradient>

            {/* 3D Extruded Chassis Shadow Rim Gradient */}
            <linearGradient id="g-chassis-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a24" />
              <stop offset="50%" stopColor="#0f0f16" />
              <stop offset="100%" stopColor="#040406" />
            </linearGradient>

            {/* Razor-Sharp Knife-Edge Chamfer Platinum Highlight */}
            <linearGradient id="g-knife-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#e63946" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#7a7a90" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
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
              <feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.85" />
            </filter>

            {/* Monolithic G Silhouette Clip Mask */}
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
              LAYER 01: HOLOGRAPHIC BLUEPRINT & ARCHITECTURAL CAD RETICLE
              ================================================================ */}
          <g
            ref={blueprintGroupRef}
            className="pointer-events-none opacity-0"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.6"
          >
            {/* Center Compass Axes */}
            <line x1="25" y1="200" x2="375" y2="200" strokeDasharray="3,6" />
            <line x1="200" y1="25" x2="200" y2="375" strokeDasharray="3,6" />

            {/* Outer Architectural Bounding Reticle */}
            <rect
              x="50"
              y="50"
              width="300"
              height="300"
              fill="none"
              stroke="#e63946"
              strokeOpacity="0.18"
              strokeDasharray="2,8"
            />

            {/* Concentric Precision Degree Dials */}
            <circle
              cx="200"
              cy="200"
              r="172"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeDasharray="2,8"
            />
            <circle
              cx="200"
              cy="200"
              r="146"
              fill="none"
              stroke="rgba(230, 57, 70, 0.12)"
              strokeDasharray="3,12"
            />

            {/* Corner Alignment CAD Calipers */}
            <path d="M 40,64 L 40,40 L 64,40" fill="none" stroke="#e63946" strokeOpacity="0.5" strokeWidth="1.2" />
            <path d="M 336,40 L 360,40 L 360,64" fill="none" stroke="#e63946" strokeOpacity="0.5" strokeWidth="1.2" />
            <path d="M 40,336 L 40,360 L 64,360" fill="none" stroke="#e63946" strokeOpacity="0.5" strokeWidth="1.2" />
            <path d="M 336,360 L 360,360 L 360,336" fill="none" stroke="#e63946" strokeOpacity="0.5" strokeWidth="1.2" />

            {/* Precision Chamfer Alignment Guides */}
            <line x1="136" y1="80" x2="80" y2="136" stroke="#e63946" strokeOpacity="0.3" strokeDasharray="2,4" />
            <line x1="80" y1="264" x2="136" y2="320" stroke="#e63946" strokeOpacity="0.3" strokeDasharray="2,4" />
            <line x1="264" y1="320" x2="320" y2="264" stroke="#e63946" strokeOpacity="0.3" strokeDasharray="2,4" />

            {/* Micro Coordinates HUD Readout */}
            <text
              x="44"
              y="34"
              fill="#e63946"
              opacity="0.8"
              fontSize="7"
              fontFamily="Space Grotesk, monospace"
              letterSpacing="0.16em"
            >
              CAD // GP-G01 ARCHITECTURAL CORE
            </text>
            <text
              x="265"
              y="34"
              fill="rgba(255,255,255,0.45)"
              fontSize="6.5"
              fontFamily="Space Grotesk, monospace"
              letterSpacing="0.12em"
            >
              TOLERANCE: ±0.001mm
            </text>
            <text
              x="44"
              y="376"
              fill="rgba(255,255,255,0.35)"
              fontSize="6.5"
              fontFamily="Space Grotesk, monospace"
              letterSpacing="0.12em"
            >
              COORD: 200.00, 200.00 // 45° CHMR
            </text>
            <text
              x="280"
              y="376"
              fill="#e63946"
              opacity="0.85"
              fontSize="6.5"
              fontFamily="Space Grotesk, monospace"
              letterSpacing="0.14em"
            >
              STATUS: SOLID
            </text>
          </g>

          {/* ================================================================
              LAYER 02: 3D EXTRUDED CHASSIS BACKPLATE & ELEVATION SHADOW
              ================================================================ */}
          <g ref={chassisGroupRef} className="opacity-0">
            {/* 3D Extrusion Depth Layer (translated +5px X, +7px Y) */}
            <path
              d={solidGPolygon}
              fill="url(#g-chassis-bevel)"
              transform="translate(5, 7)"
              filter="url(#g-extrusion-shadow)"
            />
            {/* Deep Milled Chamfer Wall Rim */}
            <path
              d={solidGPolygon}
              fill="none"
              stroke="#07070b"
              strokeWidth="2"
              transform="translate(3, 4)"
            />
          </g>

          {/* ================================================================
              LAYER 03: SOLID MONOLITHIC TITANIUM SURFACE & SPECULAR SHEEN
              ================================================================ */}
          <g ref={solidGroupRef} clipPath="url(#g-silhouette-clip)" className="opacity-0">
            {/* Primary Milled Brushed Titanium Face */}
            <path d={solidGPolygon} fill="url(#g-titanium-face)" />

            {/* Recessed Center Conduit Trench Groove */}
            <path
              d={centerlineD}
              fill="none"
              stroke="#08080d"
              strokeWidth="10"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d={centerlineD}
              fill="none"
              stroke="#181824"
              strokeWidth="11"
              strokeOpacity="0.7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />

            {/* Micro Aerospace Hairline Seams (Panel Joint Lines) */}
            <g stroke="rgba(255, 255, 255, 0.14)" strokeWidth="0.6" strokeDasharray="1,1">
              <line x1="136" y1="80" x2="156" y2="128" />
              <line x1="80" y1="136" x2="128" y2="156" />
              <line x1="80" y1="264" x2="128" y2="244" />
              <line x1="136" y1="320" x2="156" y2="272" />
              <line x1="264" y1="320" x2="244" y2="272" />
              <line x1="320" y1="264" x2="272" y2="244" />
              <line x1="272" y1="176" x2="272" y2="224" />
            </g>

            {/* Cantilever Crossbar Anodized Inlay & Ruby Core Track */}
            <rect
              x="192"
              y="178"
              width="80"
              height="44"
              fill="#0b0b10"
              opacity="0.85"
            />
            <line
              x1="192"
              y1="200"
              x2="272"
              y2="200"
              stroke="url(#g-core-filament-grad)"
              strokeWidth="2.2"
              filter="url(#g-bloom)"
            />

            {/* Micro Engineering Grid Pattern inside Cavity */}
            <g opacity="0.15" stroke="#ffffff" strokeWidth="0.5">
              <line x1="140" y1="140" x2="140" y2="260" strokeDasharray="2,4" />
              <line x1="160" y1="140" x2="160" y2="260" strokeDasharray="2,4" />
            </g>

            {/* Dual-Band Specular Highlight Sweep Beam */}
            <rect
              ref={specularRectRef}
              x="-280"
              y="-180"
              width="650"
              height="110"
              fill="url(#g-specular-sweep)"
              transform="rotate(38, 200, 200)"
              className="opacity-0"
            />
          </g>

          {/* ================================================================
              LAYER 04: BEVELED CHAMFER EDGES & KNIFE-EDGE RIM HIGHLIGHTS
              ================================================================ */}
          <g>
            {/* Full Monolithic Edge Stroke */}
            <path
              ref={bevelStrokeRef}
              d={solidGPolygon}
              fill="none"
              stroke="url(#g-knife-highlight)"
              strokeWidth="1.4"
              className="opacity-0"
            />

            {/* Top-Left Key Light Platinum Catch */}
            <path
              d={keyLightHighlightD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeOpacity="0.9"
              className="opacity-0 key-rim-highlight"
            />

            {/* Crossbar Top Edge Highlight */}
            <path
              d={crossbarHighlightD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeOpacity="0.85"
              className="opacity-0 key-rim-highlight"
            />

            {/* Inner Top Edge Highlight */}
            <path
              d={innerHighlightD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeOpacity="0.75"
              className="opacity-0 key-rim-highlight"
            />

            {/* Bottom-Right Ambient Shadow Rims */}
            <path
              d={shadowRimD}
              fill="none"
              stroke="#040406"
              strokeWidth="1.8"
              strokeOpacity="0.9"
              className="opacity-0 key-rim-highlight"
            />
            <path
              d={crossbarShadowD}
              fill="none"
              stroke="#040406"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              className="opacity-0 key-rim-highlight"
            />
            <path
              d={innerShadowD}
              fill="none"
              stroke="#040406"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              className="opacity-0 key-rim-highlight"
            />
          </g>

          {/* ================================================================
              LAYER 05: PROGRESSIVE WIREFRAME & LASER TRACE TRACK
              ================================================================ */}
          <g ref={wireframeGroupRef} className="opacity-0">
            {/* Glowing Photonic Aura along Centerline */}
            <path
              ref={centerlineGlowPathRef}
              d={centerlineD}
              fill="none"
              stroke="#e63946"
              strokeWidth="12"
              strokeOpacity="0.45"
              strokeLinecap="round"
              strokeLinejoin="miter"
              filter="url(#g-bloom)"
            />

            {/* Laser Core White-Hot Filament */}
            <path
              ref={centerlinePathRef}
              d={centerlineD}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="miter"
              filter="url(#g-bloom)"
            />
          </g>

          {/* ================================================================
              LAYER 06: INITIAL SIGNAL PLASMA SPARK & IGNITION PULSE (310, 104)
              ================================================================ */}
          <g
            ref={sparkGroupRef}
            transform="translate(310, 104)"
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
            transform="translate(310, 104)"
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
              LAYER 08: CANTILEVER CORE NEXUS REACTOR (TERMINATION AT 192, 200)
              ================================================================ */}
          <g
            ref={coreLockGroupRef}
            transform="translate(192, 200)"
            className="opacity-0"
            filter="url(#g-bloom)"
          >
            {/* Precision Diamond Nexus Prism */}
            <polygon
              points="0,-8 8,0 0,8 -8,0"
              fill="#ffffff"
              filter="url(#g-bloom)"
            />
            <circle cx="0" cy="0" r="2" fill="#e63946" />

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
