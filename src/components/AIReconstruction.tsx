import React, { useState } from "react";
import { Landmark, Language } from "../types";
import { translations } from "../translations";
import { Sliders, Sparkles, AlertCircle, History, Clock, Wand2 } from "lucide-react";
import { OrnamentalCorner } from "./OrnamentKit";

interface AIReconstructionProps {
  lang: Language;
  landmark: Landmark;
}

export default function AIReconstruction({ lang, landmark }: AIReconstructionProps) {
  const t = (key: string) => translations[key]?.[lang] || key;

  const [sliderVal, setSliderVal] = useState<number>(50); // 0 to 100 representing horizontal slider percentage
  const [timelineMode, setTimelineMode] = useState<"past" | "present" | "future">("present");
  const [pigmentSim, setPigmentSim] = useState<number>(85);
  const [fractalRegen, setFractalRegen] = useState<number>(90);

  // Render stylized SVG of each landmark based on age mode
  const renderProceduralHistoricLandmark = (mode: "restored" | "ruins" | "future_decay") => {
    const isYasawi = landmark.id === "yasawi";
    const isTamgaly = landmark.id === "tamgaly";
    const isOtyrar = landmark.id === "otyrar";
    const isAisha = landmark.id === "aishabibi";

    // Setup visual colors based on epoch mode
    const wallColor = mode === "restored" ? "#8C6239" : mode === "ruins" ? "#B89047" : "#543C25";
    const domeColor = mode === "restored" ? "#2A9D90" : mode === "ruins" ? "#207A70" : "#14524B";
    const pigmentOpacity = mode === "restored" ? pigmentSim / 100 : mode === "ruins" ? 0.35 : 0.15;
    const crackStrokeWidth = mode === "restored" ? 0 : mode === "ruins" ? 1.5 : 3.5;
    const crackColor = mode === "future_decay" ? "#C0392B" : "#B89047";

    if (isYasawi) {
      return (
        <svg viewBox="0 0 500 300" className="w-full h-full select-none">
          <defs>
            <radialGradient id="skyGrad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#FFFFFB" />
              <stop offset="100%" stopColor="#FAF6F0" />
            </radialGradient>
            <linearGradient id="goldCarve" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B89047" />
              <stop offset="100%" stopColor="#8C6239" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#skyGrad)" />
          
          {/* Ground floor line */}
          <line x1="0" y1="260" x2="500" y2="260" stroke="#8C765C" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Core Mausoleum massive structural block */}
          <rect x="160" y="100" width="180" height="150" fill={wallColor} rx="6" />
          
          {/* Main Arched entryway */}
          <path d="M200,250 L200,160 Q250,115 300,160 L300,250 Z" fill="#F4EDE2" stroke="#8C6239" strokeWidth="2" />
          
          {/* Inner portal frame with glazes */}
          <path d="M210,250 M210,180 Q250,140 290,180 Z" fill="none" stroke={domeColor} strokeWidth="6" strokeOpacity={pigmentOpacity} />

          {/* Central Blue Dome of Turkistan */}
          <path d="M205,100 Q205,45 250,40 Q295,45 295,100 Z" fill={domeColor} fillOpacity={mode === "restored" ? 1 : 0.5} stroke="#1B6F65" strokeWidth="1.5" />
          
          {/* Dome ridges flute details */}
          {Array.from({ length: 6 }).map((_, i) => {
            const xOffset = 215 + i * 14;
            return (
              <path key={i} d={`M${xOffset},98 Q250,45 250,40`} fill="none" stroke="#14524B" strokeWidth="1" strokeOpacity="0.5" />
            );
          })}

          {/* Left and Right columns - Minarets */}
          <rect x="135" y="80" width="25" height="170" fill={wallColor} rx="3" />
          <rect x="340" y="80" width="25" height="170" fill={wallColor} rx="3" />
          
          {/* Column tops */}
          <path d="M130,80 L165,80 L155,60 L140,60 Z" fill="#8C6239" stroke="#E8DFC8" strokeWidth="0.5" />
          <path d="M335,80 L370,80 L360,60 L345,60 Z" fill="#8C6239" stroke="#E8DFC8" strokeWidth="0.5" />

          {/* Ornamental calligraphy borders (Restored) */}
          {mode === "restored" && (
            <g opacity={pigmentOpacity}>
              <rect x="165" y="105" width="170" height="15" fill="none" stroke="url(#goldCarve)" strokeWidth="1" />
              <text x="250" y="115" fill="#B89047" fontSize="8" fontFamily="Georgia, serif" textAnchor="middle" letterSpacing="1.5" fontWeight="bold">۞ ЯСАУИ ТАЗА ЛЕЙЛ ГЕОМЕТРИЯ ۞</text>
            </g>
          )}

          {/* Damage overlay fractures */}
          {mode !== "restored" && (
            <g stroke={crackColor} strokeWidth={crackStrokeWidth} fill="none">
              <path d="M150,120 L145,150 L152,190" />
              <path d="M210,120 Q230,135 220,150" />
              {mode === "future_decay" && (
                <g stroke="#C0392B" strokeWidth="3">
                  <path d="M250,220 L248,255 L252,280" />
                  <circle cx="250" cy="220" r="3.5" fill="#C0392B" />
                </g>
              )}
            </g>
          )}

          {/* Ambient Particles */}
          {mode === "restored" && (
            <g fill="#B89047" opacity="0.6">
              <circle cx="180" cy="90" r="1.5" className="animate-ping" />
              <circle cx="320" cy="70" r="1" />
              <circle cx="250" cy="30" r="2" />
            </g>
          )}
        </svg>
      );
    } else if (isTamgaly) {
      return (
        <svg viewBox="0 0 500 300" className="w-full h-full select-none">
          <defs>
            <radialGradient id="rockGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="100%" stopColor="#EFEBDE" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#rockGrad)" />
          
          {/* Rock seam angles segments */}
          <polygon points="50,50 300,50 250,280 40,280" fill="#E8DEC9" stroke="#EFECE5" />
          <polygon points="300,50 460,80 440,280 250,280" fill="#E8DFC8" stroke="#EFECE5" />

          {/* Solar deity engraving */}
          <g transform="translate(180, 140)">
            <g stroke={mode === "restored" ? "#B89047" : "#8C765C"} strokeWidth={mode === "restored" ? 4 : 2} opacity={pigmentOpacity}>
              <line x1="0" y1="-30" x2="0" y2="-50" />
              <line x1="20" y1="-20" x2="35" y2="-35" />
              <line x1="30" y1="0" x2="50" y2="0" />
              <line x1="20" y1="20" x2="35" y2="35" />
              <line x1="0" y1="30" x2="0" y2="45" />
              <line x1="-20" y1="20" x2="-35" y2="35" />
              <line x1="-30" y1="0" x2="-50" y2="0" />
              <line x1="-20" y1="-20" x2="-35" y2="-35" />
            </g>

            <circle cx="0" cy="0" r="25" fill="#FAF6F0" stroke={mode === "restored" ? "#B89047" : "#8C765C"} strokeWidth={mode === "restored" ? 4 : 2} />
            <circle cx="-8" cy="-5" r="3" fill={mode === "restored" ? "#B89047" : "#8C765C"} />
            <circle cx="8" cy="-5" r="3" fill={mode === "restored" ? "#B89047" : "#8C765C"} />
            <path d="M-10,8 Q0,16 10,8" fill="none" stroke={mode === "restored" ? "#B89047" : "#8C765C"} strokeWidth="2.5" />
          </g>

          {/* Dancing hunter figures */}
          <g transform="translate(320, 180)" stroke={mode === "restored" ? "#B89047" : "#8c765c"} strokeWidth="3" fill="none" opacity={mode === "restored" ? 0.95 : 0.45}>
            <circle cx="0" cy="-20" r="4" fill="currentColor" stroke="none" />
            <line x1="0" y1="-16" x2="0" y2="5" />
            <line x1="0" y1="-5" x2="-15" y2="-10" />
            <line x1="0" y1="-5" x2="15" y2="-12" />
            <line x1="0" y1="5" x2="-10" y2="25" />
            <line x1="0" y1="5" x2="10" y2="25" />
          </g>

          {mode !== "restored" && (
            <g stroke={crackColor} strokeWidth={crackStrokeWidth} fill="none">
              <path d="M40,120 L150,140" />
              <path d="M300,100 L320,250" />
              {mode === "future_decay" && (
                <path d="M120,50 L100,280" stroke="#C0392B" strokeWidth="4" />
              )}
            </g>
          )}
        </svg>
      );
    } else {
      // Otyrar structure generic
      return (
        <svg viewBox="0 0 500 300" className="w-full h-full select-none">
          <defs>
            <radialGradient id="skyGradOtyrar" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#FFFFFC" />
              <stop offset="100%" stopColor="#FAF7F1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#skyGradOtyrar)" />
          
          <line x1="0" y1="260" x2="500" y2="260" stroke="#8C6239" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Fortress walls */}
          <polygon points="60,260 90,140 410,140 440,260" fill={wallColor} />
          <path d="M220,260 L220,180 Q250,140 280,180 L280,260 Z" fill="#F4EDE2" stroke="#8C6239" strokeWidth="2" />

          {/* Decorative lines */}
          <line x1="90" y1="160" x2="410" y2="160" stroke="#FAF8F5" strokeWidth="2" opacity={pigmentOpacity} />

          {mode !== "restored" && (
            <g stroke={crackColor} strokeWidth={crackStrokeWidth} fill="none">
              <path d="M120,150 L140,220" />
              <path d="M380,165 L360,240" />
            </g>
          )}
        </svg>
      );
    }
  };

  return (
    <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-6 relative overflow-hidden shadow-sm font-sans">
      
      {/* Golden corners matching museum dashboard direction */}
      <div className="absolute top-0 right-0 p-1">
        <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center relative z-10 mb-5 gap-3">
        <div className="flex items-center gap-2.5">
          <History className="text-[#8C6239]" size={20} />
          <h2 className="text-lg font-serif font-bold tracking-wide text-[#35261A] uppercase">
            {t("reconstruction").toUpperCase()} MATRIX COMPARATOR
          </h2>
        </div>

        {/* Dynamic timeline epoch selectors */}
        <div className="flex gap-1 border border-[#EBE3D3] bg-[#EFE8DC]/80 p-1 rounded-xl">
          <button
            onClick={() => { setTimelineMode("past"); setSliderVal(100); }}
            className={`px-3 py-1 text-[9px] font-mono tracking-wider rounded-lg uppercase transition-all duration-200 font-bold ${
              timelineMode === "past" ? "bg-[#B89047] text-white shadow-sm" : "text-[#665445] hover:text-[#35261A]"
            }`}
          >
            {t("pastLabel").split(" ")[0]}
          </button>
          <button
            onClick={() => { setTimelineMode("present"); setSliderVal(50); }}
            className={`px-3 py-1 text-[9px] font-mono tracking-wider rounded-lg uppercase transition-all duration-200 font-bold ${
              timelineMode === "present" ? "bg-[#2A9D90] text-white shadow-sm" : "text-[#665445] hover:text-[#35261A]"
            }`}
          >
            {t("presentLabel").split(" ")[0]}
          </button>
          <button
            onClick={() => { setTimelineMode("future"); setSliderVal(0); }}
            className={`px-3 py-1 text-[9px] font-mono tracking-wider rounded-lg uppercase transition-all duration-200 font-bold ${
              timelineMode === "future" ? "bg-red-600 text-white shadow-sm" : "text-[#665445] hover:text-[#35261A]"
            }`}
          >
            {t("futureLabel").split(" ")[0]}
          </button>
        </div>
      </div>

      <p className="text-xs text-[#8C765C] mb-4 tracking-tight leading-relaxed">
        {t("reconsSub")}
      </p>

      {/* BEFORE / AFTER Slide Curtain Container */}
      <div className="relative aspect-[16/10] bg-[#FAF8F3] border border-[#E8DFC8]/60 rounded-2xl overflow-hidden group select-none shadow-inner">
        
        {/* Full Left Panel: RUINS STATE */}
        <div className="absolute inset-0">
          {renderProceduralHistoricLandmark(timelineMode === "future" ? "future_decay" : "ruins")}
          
          {/* Tag labels overlay */}
          <div className="absolute bottom-4 left-4 py-1.5 px-3 rounded-xl bg-white/95 border border-red-200 text-[9px] font-mono text-red-650 tracking-wider font-bold shadow-sm">
            {timelineMode === "future" ? t("futureLabel") : t("presentLabel")}
          </div>
        </div>

        {/* Full Right Panel: RESTORED ORIGINAL (magically clipped based on sliderVal) */}
        <div
          className="absolute inset-y-0 right-0 overflow-hidden pointer-events-none"
          style={{ left: `${sliderVal}%` }}
        >
          {/* Inner offset viewport mapping to map SVG size correctly */}
          <div
            className="absolute inset-y-0 right-0"
            style={{ width: "100%", right: 0 }}
          >
            {renderProceduralHistoricLandmark("restored")}
          </div>

          {/* Tag labels overlay */}
          <div className="absolute bottom-4 right-4 py-1.5 px-3 rounded-xl bg-white/95 border border-[#E8DFC8]/70 text-[9px] font-mono text-[#B89047] tracking-wider text-right font-bold shadow-sm">
            {t("pastLabel")}
          </div>
        </div>

        {/* Vertical Separator lines slider line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-[#B89047]"
          style={{ left: `${sliderVal}%` }}
        >
          {/* Sliding Central Knob controller Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#B89047] text-[#B89047] flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md">
            <Wand2 size={12} className="text-[#8C6239]" />
          </div>
        </div>

        {/* Sliding Range Overlay Invisible input on top */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderVal}
          onChange={(e) => setSliderVal(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      {/* Interactive restoration description panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 pt-4 border-t border-[#E8DFC8]/45 bg-black/[0.01] p-4 rounded-2xl">
        <div>
          <span className="text-[10px] text-[#B89047] font-mono font-bold block uppercase mb-1">
            {t("pastLabel")} (XI-XII ВВ.)
          </span>
          <p className="text-[11px] text-[#665445] leading-relaxed font-sans font-medium">
            {landmark.reconstruction.pastDescription[lang]}
          </p>
        </div>
        <div>
          <span className="text-[10px] text-[#2A9D90] font-mono font-bold block uppercase mb-1">
            {t("presentLabel")} (СОВРЕМЕННОСТЬ)
          </span>
          <p className="text-[11px] text-[#665445] leading-relaxed font-sans font-medium">
            {landmark.reconstruction.presentDescription[lang]}
          </p>
        </div>
        <div>
          <span className="text-[10px] text-red-655 font-mono font-bold block uppercase mb-1">
            {t("futureLabel")} (ПРОГНОЗ БЕЗ МЕР)
          </span>
          <p className="text-[11px] text-[#665445] leading-relaxed font-sans font-medium">
            {landmark.reconstruction.futurePredictedDescription[lang]}
          </p>
        </div>
      </div>

      {/* AI Restorative Precision Tune knobs (simulated) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 pt-4 border-t border-[#E8DFC8]/45">
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-[#665445] font-bold">
            <span>{t("restoreOriginalColors")}</span>
            <span className="text-[#B89047] font-bold">{pigmentSim}% SAT</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={pigmentSim}
            onChange={(e) => setPigmentSim(parseInt(e.target.value))}
            className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-[#B89047]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-[#665445] font-bold">
            <span>{t("restoreStructural")}</span>
            <span className="text-[#2A9D90] font-bold">{fractalRegen}% REG</span>
          </div>
          <input
            type="range"
            min="40"
            max="100"
            value={fractalRegen}
            onChange={(e) => setFractalRegen(parseInt(e.target.value))}
            className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-[#2A9D90]"
          />
        </div>
      </div>

    </div>
  );
}
