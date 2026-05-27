import React from "react";

/**
 * A collection of premium, modern but historically authentic Kazakh traditional ornaments
 * and design elements rendered as crisp SVG components.
 */

// Symmetrical traditional Kazakh ornament (Koshkar Muiiz - Ram's Horn)
export function KoshkarMuiiz({ className = "w-10 h-10 text-brand-gold", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60,110 C50,110 38,92 34,80 C30,68 18,65 14,75 C10,85 24,98 34,94 C44,90 40,70 32,74 C24,78 26,92 20,95 C14,98 5,88 12,74 C19,60 38,55 48,70 C58,85 62,110 60,110 Z"
      />
      <path
        d="M60,110 C70,110 82,92 86,80 C90,68 102,65 106,75 C110,85 96,98 86,94 C76,90 80,70 88,74 C96,78 94,92 100,95 C106,98 115,88 108,74 C101,60 82,55 72,70 C62,85 58,110 60,110 Z"
      />
      <path
        d="M60,10 C50,10 42,28 38,40 C34,52 22,55 18,45 C14,35 28,22 38,26 C48,30 44,50 36,46 C28,42 30,28 24,25 C18,22 9,32 16,46 C23,60 42,65 52,50 C62,35 60,10 60,10 Z"
      />
      <path
        d="M60,10 C70,10 78,28 82,40 C86,52 98,55 102,45 C106,35 92,22 82,26 C72,30 76,50 84,46 C92,42 90,28 96,25 C102,22 111,32 104,46 C97,60 78,65 68,50 C58,35 60,10 60,10 Z"
      />
    </svg>
  );
}

// Silk Road geometric divider motif
export function SilkRoadDivider({ className = "w-full text-brand-gold my-4" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <svg
        viewBox="0 0 160 30"
        className="w-32 h-6 text-brand-gold shrink-0"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Symmetrical rhombic Turkic glyph patterns */}
        <polygon points="80,5 92,15 80,25 68,15" className="fill-brand-gold" />
        <polygon points="50,10 58,15 50,20 42,15" className="fill-brand-gold/60" />
        <polygon points="110,10 118,15 110,20 102,15" className="fill-brand-gold/60" />
        <polygon points="20,12 25,15 20,18 15,15" className="fill-brand-gold/30" />
        <polygon points="140,12 145,15 140,18 135,15" className="fill-brand-gold/30" />
        
        {/* Connecting elegant horizontal guide lines */}
        <line x1="25" y1="15" x2="42" y2="15" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <line x1="58" y1="15" x2="68" y2="15" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <line x1="92" y1="15" x2="102" y2="15" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <line x1="118" y1="15" x2="135" y2="15" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
      </svg>
      <div className="h-[1px] flex-grow bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent" />
    </div>
  );
}

// Traditional ornamental corner accents for cards or frames
export function OrnamentalCorner({ className = "w-6 h-6 text-brand-gold/40" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5,40 L5,5 L40,5" />
      <path d="M11,40 L11,11 L40,11" strokeWidth="0.75" strokeDasharray="1,1" />
      <circle cx="5" cy="5" r="2.5" fill="currentColor" />
    </svg>
  );
}

// Traditional rosette (Zhelkoz - star shape/sun flower)
export function TurkicRosette({ className = "w-16 h-16 text-brand-gold" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(50,50)">
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M0,0 L12,-12 L30,0 L12,12 Z"
            transform={`rotate(${i * 45})`}
            className="opacity-90"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M0,0 L8,-8 L22,0 L8,8 Z"
            transform={`rotate(${i * 45 + 22.5})`}
            className="text-brand-turquoise opacity-80"
          />
        ))}
        <circle cx="0" cy="0" r="6" className="text-brand-gold fill-current" />
      </g>
    </svg>
  );
}
