import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Move } from 'lucide-react';
import { useThemeColor } from '../context/ThemeColorContext';
import { TECH_STACK_NODES } from '../data/portfolioData';

interface DomainCard {
  id: string;
  label: string;
  tags: string[];
}

const DOMAIN_CARDS: DomainCard[] = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    tags: ['FRONTEND', 'React.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    tags: ['BACKEND', 'Spring Boot', 'FastAPI', 'Java'],
  },
  {
    id: 'database',
    label: 'DATABASE',
    tags: ['DATABASE', 'PostgreSQL', 'MongoDB', 'SQL'],
  },
  {
    id: 'data',
    label: 'DATA',
    tags: ['DATA', 'Power BI', 'Pandas', 'DAX'],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    tags: ['TOOLS', 'Git / GitHub', 'Postman'],
  },
];

export const TechStackCanvas: React.FC = () => {
  const { accentColor } = useThemeColor();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 960, height: 600 });

  // Center node data
  const centerNode = TECH_STACK_NODES.find((n) => n.id === 'guru');

  // Initial layout calculation (Center fact table with surrounding domain tables)
  const getInitialPositions = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const cx = w / 2;
    const cy = h / 2;

    if (isMobile) {
      return {
        guru: { x: cx - 130, y: cy - 70 },
        frontend: { x: 20, y: 30 },
        backend: { x: w - 190, y: 30 },
        database: { x: 20, y: h - 170 },
        data: { x: cx - 85, y: h - 140 },
        tools: { x: w - 180, y: h - 170 },
      };
    }

    // Desktop spread
    return {
      guru: { x: cx - 170, y: cy - 65 },
      frontend: { x: Math.max(30, cx - 400), y: cy - 180 },
      backend: { x: Math.min(w - 220, cx + 220), y: cy - 180 },
      database: { x: Math.max(30, cx - 400), y: cy + 70 },
      data: { x: cx - 85, y: Math.min(h - 130, cy + 155) },
      tools: { x: Math.min(w - 220, cx + 220), y: cy + 70 },
    };
  }, []);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    getInitialPositions(960, 600)
  );

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        setContainerSize({ width: w, height: h });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update positions when container dimensions change
  useEffect(() => {
    if (containerRef.current) {
      setPositions(getInitialPositions(containerSize.width, containerSize.height));
    }
  }, [containerSize.width, containerSize.height, getInitialPositions]);

  // Pointer drag controller (smooth, native, multi-device compatible)
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.setPointerCapture(e.pointerId);
    setDraggingId(id);
    setActiveCategory(id === 'guru' ? null : id);

    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: positions[id]?.x ?? 0,
      origY: positions[id]?.y ?? 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const { id, startX, startY, origX, origY } = dragRef.current;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const cardW = id === 'guru' ? (containerSize.width < 768 ? 260 : 340) : 180;
    const cardH = id === 'guru' ? 130 : 120;

    const maxX = Math.max(10, containerSize.width - cardW - 10);
    const maxY = Math.max(10, containerSize.height - cardH - 10);

    const nextX = Math.max(10, Math.min(maxX, origX + dx));
    const nextY = Math.max(10, Math.min(maxY, origY + dy));

    setPositions((prev) => ({
      ...prev,
      [id]: { x: nextX, y: nextY },
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      dragRef.current = null;
      setDraggingId(null);
    }
  };

  const handleResetLayout = () => {
    setPositions(getInitialPositions(containerSize.width, containerSize.height));
    setActiveCategory(null);
  };

  // Center card coordinates
  const guruPos = positions['guru'] || { x: containerSize.width / 2 - 170, y: containerSize.height / 2 - 65 };
  const guruW = containerSize.width < 768 ? 260 : 340;
  const guruH = 130;
  const guruCenter = {
    x: guruPos.x + guruW / 2,
    y: guruPos.y + guruH / 2,
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 md:py-20 px-4 flex flex-col items-center select-none">
      {/* Original Section Header */}
      <div className="text-center mb-8">
        <span
          className="font-mono-custom text-xs tracking-widest uppercase px-3 py-1 rounded-full border transition-colors duration-300"
          style={{
            borderColor: `${accentColor}50`,
            color: accentColor,
            backgroundColor: `${accentColor}12`,
          }}
        >
          [ ARCHITECTURE & STACK NETWORK ]
        </span>
        <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-[#111115] mt-4">
          INTERCONNECTED DOMAINS
        </h3>
        <p className="font-mono-custom text-xs md:text-sm text-[#555560] mt-2 max-w-lg mx-auto">
          Database modeling view. Drag cards around the center table to explore relationships.
        </p>
      </div>

      {/* Interactive Modeling Canvas Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full aspect-[4/3] md:aspect-[16/9] min-h-[480px] sm:min-h-[540px] md:min-h-[620px] bg-[#111115] border border-white/10 rounded-3xl p-4 sm:p-6 md:p-12 overflow-hidden shadow-2xl touch-pan-y"
      >
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient Theme Color Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15 blur-[120px] transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 65%)`,
          }}
        />

        {/* Top Controls: Drag hint & Reset button */}
        <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-white/70 font-mono-custom text-[11px] uppercase tracking-wider backdrop-blur-xs pointer-events-auto">
            <Move className="w-3.5 h-3.5 text-white/50" />
            <span className="hidden sm:inline">Drag cards freely</span>
            <span className="sm:hidden">Drag cards</span>
          </div>

          <button
            onClick={handleResetLayout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono-custom text-xs uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-lg pointer-events-auto"
            title="Reset cards to default layout"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        </div>

        {/* Dynamic SVG Relational Connection Lines (Power BI Modeling style) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <filter id="net-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {DOMAIN_CARDS.map((cat) => {
            const cardPos = positions[cat.id] || { x: 0, y: 0 };
            const cardW = 180;
            const cardH = 110;
            const targetX = cardPos.x + cardW / 2;
            const targetY = cardPos.y + cardH / 2;

            const isHighlighted = activeCategory === cat.id || draggingId === cat.id;

            // Power BI Stepped / Smooth S-Curve Bezier Connection
            const startX = guruCenter.x;
            const startY = guruCenter.y;
            const midX = (startX + targetX) / 2;
            const pathData = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${targetY}, ${targetX} ${targetY}`;

            return (
              <g key={`cable-${cat.id}`}>
                {/* Glow underlay */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={isHighlighted ? 6 : 2}
                  opacity={isHighlighted ? 0.5 : 0.12}
                  filter="url(#net-glow)"
                />

                {/* Primary cable */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isHighlighted ? accentColor : 'rgba(255, 255, 255, 0.28)'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                />

                {/* Relational Port Endpoint Badges */}
                <circle
                  cx={startX + (targetX - startX) * 0.28}
                  cy={startY + (targetY - startY) * 0.28}
                  r="7"
                  fill="#111115"
                  stroke={isHighlighted ? accentColor : 'rgba(255, 255, 255, 0.35)'}
                  strokeWidth="1.5"
                />
                <text
                  x={startX + (targetX - startX) * 0.28}
                  y={startY + (targetY - startY) * 0.28}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  1
                </text>

                <circle
                  cx={targetX - (targetX - startX) * 0.28}
                  cy={targetY - (targetY - startY) * 0.28}
                  r="7"
                  fill="#111115"
                  stroke={isHighlighted ? accentColor : 'rgba(255, 255, 255, 0.35)'}
                  strokeWidth="1.5"
                />
                <text
                  x={targetX - (targetX - startX) * 0.28}
                  y={targetY - (targetY - startY) * 0.28}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  *
                </text>
              </g>
            );
          })}
        </svg>

        {/* Center Fact Card: GURU PRASATH (Draggable) */}
        <div
          onPointerDown={(e) => handlePointerDown('guru', e)}
          style={{
            transform: `translate3d(${guruPos.x}px, ${guruPos.y}px, 0)`,
            zIndex: draggingId === 'guru' ? 50 : 25,
            width: guruW,
          }}
          className={`absolute top-0 left-0 cursor-grab active:cursor-grabbing transition-shadow duration-200 touch-none ${
            draggingId === 'guru' ? 'scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.9)]' : ''
          }`}
        >
          <div
            className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-white border-2 shadow-2xl transition-all duration-300"
            style={{
              borderColor: accentColor,
              boxShadow: `0 0 35px ${accentColor}35`,
            }}
          >
            <span
              className="font-mono-custom text-[10px] uppercase tracking-widest mb-1 font-bold"
              style={{ color: accentColor }}
            >
              CORE ENGINEER
            </span>
            <h4 className="font-display text-xl md:text-3xl font-black tracking-tight text-[#111115] text-center">
              {centerNode?.label || 'GURU PRASATH'}
            </h4>
            <span className="font-mono-custom text-xs text-[#555560] mt-1 text-center">
              FULL-STACK / DATA / SOFTWARE
            </span>
          </div>
        </div>

        {/* 5 Domain Cards with EXACT Original Words & Tags (Draggable) */}
        {DOMAIN_CARDS.map((cat) => {
          const pos = positions[cat.id] || { x: 50, y: 50 };
          const isSelected = activeCategory === cat.id;
          const isDragging = draggingId === cat.id;

          return (
            <div
              key={cat.id}
              onPointerDown={(e) => handlePointerDown(cat.id, e)}
              onMouseEnter={() => {
                if (!draggingId) setActiveCategory(cat.id);
              }}
              onMouseLeave={() => {
                if (!draggingId && activeCategory === cat.id) setActiveCategory(null);
              }}
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                zIndex: isDragging ? 50 : isSelected ? 35 : 20,
              }}
              className={`absolute top-0 left-0 cursor-grab active:cursor-grabbing transition-all duration-200 touch-none ${
                isDragging ? 'scale-[1.05] shadow-[0_20px_45px_rgba(0,0,0,0.9)]' : ''
              }`}
            >
              <div
                className={`p-4 md:p-5 rounded-xl border backdrop-blur-md transition-all duration-300 select-none ${
                  isSelected || isDragging
                    ? 'text-white scale-105 shadow-xl'
                    : 'bg-white/95 text-[#111115] border-white/40 hover:border-white/70 shadow-lg'
                }`}
                style={{
                  backgroundColor: isSelected || isDragging ? accentColor : undefined,
                  borderColor: isSelected || isDragging ? accentColor : undefined,
                  boxShadow:
                    isSelected || isDragging
                      ? `0 0 25px ${accentColor}60`
                      : '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                {/* Header with Title and Dot */}
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected || isDragging ? 'bg-white' : ''
                    }`}
                    style={{
                      backgroundColor:
                        isSelected || isDragging ? '#ffffff' : accentColor,
                    }}
                  />
                  <span className="font-display font-bold text-xs md:text-sm tracking-wider uppercase">
                    {cat.label}
                  </span>
                </div>

                {/* Sub Tech Tags Inside Card */}
                <div className="mt-2.5 flex flex-wrap gap-1 max-w-[160px]">
                  {cat.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] font-mono-custom px-1.5 py-0.5 rounded ${
                        isSelected || isDragging
                          ? 'bg-white/20 text-white font-semibold'
                          : 'bg-[#111115]/10 text-[#111115] font-medium'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
