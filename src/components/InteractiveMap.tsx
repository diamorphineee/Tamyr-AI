import React, { useState } from "react";
import { Landmark, Language } from "../types";
import { defaultLandmarks } from "../data";
import { translations } from "../translations";
import { MapPin, ShieldAlert, Cpu, Orbit, Compass, Activity } from "lucide-react";
import { KoshkarMuiiz, SilkRoadDivider, OrnamentalCorner, TurkicRosette } from "./OrnamentKit";

interface InteractiveMapProps {
  lang: Language;
  selectedLandmark: Landmark;
  onSelectLandmark: (landmark: Landmark) => void;
}

export default function InteractiveMap({
  lang,
  selectedLandmark,
  onSelectLandmark,
}: InteractiveMapProps) {
  const t = (key: string) => translations[key]?.[lang] || key;
  const [hovered, setHovered] = useState<Landmark | null>(null);

  const locations = defaultLandmarks;

  return (
    <div className="w-full bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-6 relative overflow-hidden shadow-sm">
      {/* Background Vintage Map Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(140,98,57,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(140,98,57,0.025)_1px,transparent_1px)] bg-[size:35px_35px] opacity-70 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-[#2A9D90]/10 via-[#8C6239] to-[#2A9D90]/10 pointer-events-none" />

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 p-1">
        <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
      </div>
      <div className="absolute bottom-0 left-0 p-1 transform rotate-180">
        <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Compass className="text-[#8C6239] shrink-0 animate-spin" size={20} style={{ animationDuration: "35s" }} />
            <h2 className="text-xl font-display font-bold tracking-wide text-[#35261A] uppercase">
              {t("mapTitle")}
            </h2>
          </div>
          <p className="text-xs text-[#665445] font-serif italic mt-1 max-w-2xl">
            {t("mapSub")}
          </p>
        </div>

        {/* Live Grid Coordinates Status ticker */}
        <div className="flex items-center gap-2.5 border border-[#2A9D90]/25 bg-[#2A9D90]/5 px-3.5 py-1.5 rounded-xl text-[10px] font-mono text-[#2A9D90] tracking-widest shrink-0 uppercase font-black">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A9D90] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2A9D90]"></span>
          </span>
          {t("coordinates").toUpperCase()}: EXP-KAZ-SEC-42
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Map Stage */}
        <div className="lg:col-span-3 min-h-[350px] md:min-h-[420px] bg-[#FAF7F2] border border-[#E8DFC8]/50 rounded-2xl relative flex items-center justify-center p-4">
          
          {/* Subtle radar / compass compass rotation backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[conic-gradient(from_0deg_at_50%_50%,#8C6239,transparent_60deg)] animate-spin" style={{ animationDuration: "25s" }} />
          
          {/* Outer Compass Calibration Ticks */}
          <div className="absolute top-4 left-4 text-[9px] font-mono text-[#8C765C] space-y-0.5">
            <div>CHART: UNESCO_EXP_CHART_8.04</div>
            <div>STATUS: INTEGRITY GRID CALIBRATED</div>
          </div>
          <div className="absolute bottom-4 right-4 text-[9px] font-mono text-[#8C6239] tracking-wider flex items-center gap-1.5">
            <Compass size={11} className="animate-pulse text-[#8C6239]" />
            N 48° 0' 0" / E 68° 0' 0"
          </div>

          {/* SVG Map Container representing Kazakhstan boundaries stylistically */}
          <div className="w-full max-w-[680px] aspect-[16/10] relative">
            
            {/* Outline of Kazakhstan */}
            <svg
              viewBox="0 0 100 60"
              className="w-full h-full text-[#8C6239]/10 stroke-[#8C6239]/20 stroke-[0.3] fill-[#FFFFFD] drop-shadow-sm filter transition-all duration-700"
            >
              <polygon
                points="10,25 20,20 35,16 45,15 55,14 70,12 85,15 92,20 95,25 93,34 90,40 85,48 76,46 72,50 63,48 55,52 48,50 42,48 35,51 25,49 18,52 14,50 11,46 5,42 8,32"
                className="fill-[#FFFDF8] hover:fill-[#FFFFFD] transition-colors duration-500 fill-opacity-95 text-[#8C6239]/15"
              />
              
              {/* Major Interior Lakes */}
              <ellipse cx="71" cy="42" rx="3.5" ry="1.2" className="fill-[#FAF7F2] stroke-[#8C6239]/10 stroke-[0.2]" />
              <ellipse cx="14" cy="38" rx="2" ry="4" className="fill-[#FAF7F2] stroke-[#8C6239]/10 stroke-[0.2]" />

              <line x1="10" y1="30" x2="90" y2="30" className="stroke-[#8C6239]/5 stroke-[0.1] stroke-dasharray-[1,2]" />
              <line x1="50" y1="10" x2="50" y2="50" className="stroke-[#8C6239]/5 stroke-[0.1] stroke-dasharray-[1,2]" />
            </svg>

            {/* Pulsing Active Coordinate hotspots */}
            {locations.map((loc) => {
              const isSelected = selectedLandmark.id === loc.id;
              const isHovered = hovered?.id === loc.id;
              
              const getRiskColor = (level: string) => {
                if (level === "CRITICAL") return "bg-red-500 text-red-500";
                if (level === "HIGH") return "bg-orange-500 text-orange-500";
                return "bg-[#2A9D90] text-[#2A9D90]";
              };

              const getRiskGlow = (level: string) => {
                if (level === "CRITICAL") return "shadow-[0_0_12px_rgba(239,68,68,0.4)]";
                if (level === "HIGH") return "shadow-[0_0_12px_rgba(249,115,22,0.4)]";
                return "shadow-[0_0_12px_rgba(42,157,144,0.4)]";
              };

              const getBorderColor = (level: string) => {
                if (level === "CRITICAL") return "border-red-200";
                if (level === "HIGH") return "border-orange-200";
                return "border-[#2A9D90]/25";
              };

              return (
                <div
                  key={loc.id}
                  style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                  onClick={() => onSelectLandmark(loc)}
                  onMouseEnter={() => setHovered(loc)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Outer Radar Pulsing Anchor wave - warm tones */}
                  <span className="absolute inline-flex h-8 w-8 -left-3 -top-3 rounded-full bg-current opacity-20 animate-ping group-hover:scale-110 duration-1000" style={{ color: loc.riskLevel === "CRITICAL" ? "#EF4444" : loc.riskLevel === "HIGH" ? "#F97316" : "#2A9D90" }} />

                  {/* Dot Marker with responsive size highlight */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${getRiskColor(loc.riskLevel).split(" ")[0]} ${getRiskGlow(loc.riskLevel)} ${
                      isSelected ? "scale-125 ring-2 ring-[#8C6239]" : "scale-100 group-hover:scale-110"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Anchor label popover layout */}
                  <div
                    className={`absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 py-1.5 px-3 rounded-xl border bg-white text-[10px] tracking-wider whitespace-nowrap text-[#35261A] shadow-[0_4px_16px_rgba(140,98,57,0.08)] ${getBorderColor(loc.riskLevel)} ${
                      isSelected || isHovered
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold font-serif text-[#35261A]">
                      <span className={`w-1.5 h-1.5 rounded-full ${getRiskColor(loc.riskLevel).split(" ")[0]}`} />
                      {loc.name[lang]}
                    </div>
                    <div className="text-[8px] text-[#8C765C] font-mono flex justify-between gap-4 mt-0.5 uppercase">
                      <span>{loc.coordinates.lat}</span>
                      <span className="text-[#8C6239] font-bold">R-SCORE: {loc.riskScore}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Landmark Inspect specs HUD */}
        <div className="space-y-4">
          <div className="bg-[#FFFFFA] border border-[#E8DFC8]/60 rounded-2xl p-5 h-full flex flex-col justify-between relative shadow-sm">
            <div className="absolute top-0 right-0 p-1 opacity-20">
              <OrnamentalCorner className="w-4 h-4 text-[#8C6239]" />
            </div>

            <div>
              <div className="flex justify-between items-start border-b border-[#E8DFC8]/50 pb-3 mb-3">
                <div>
                  <div className="text-[9px] tracking-widest text-[#2A9D90] font-mono flex items-center gap-1 uppercase font-bold">
                    <Activity size={10} className="animate-pulse" />
                    {selectedLandmark.region[lang]}
                  </div>
                  <h3 className="text-md font-serif font-bold text-[#35261A] tracking-wide mt-1 uppercase">
                    {selectedLandmark.name[lang]}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div>
                  <span className="text-[#8C765C] block text-[9px] uppercase tracking-wider font-mono">
                    {t("eraLabel")}
                  </span>
                  <span className="text-[#35261A] font-bold font-serif text-sm">
                    {selectedLandmark.era[lang]}
                  </span>
                </div>

                <div>
                  <span className="text-[#8C765C] block text-[9px] uppercase tracking-wider font-mono">
                    {t("materialLabel")}
                  </span>
                  <span className="text-[#8C6239] font-bold text-sm">
                    {selectedLandmark.material[lang]}
                  </span>
                </div>

                <div>
                  <span className="text-[#8C765C] block text-[9px] uppercase tracking-wider font-mono">
                    {t("currentRiskStatusLabel")}
                  </span>
                  <span
                    className={`inline-block font-bold rounded px-2 py-0.5 text-[8px] tracking-widest mt-1 ${
                      selectedLandmark.riskLevel === "CRITICAL"
                        ? "bg-red-50 text-red-650 border border-red-200"
                        : selectedLandmark.riskLevel === "HIGH"
                        ? "bg-orange-50 text-orange-650 border border-orange-200"
                        : "bg-green-50 text-green-650 border border-green-200"
                    }`}
                  >
                    {selectedLandmark.riskLevel} ARCHEOLOGICAL RISK
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E8DFC8]/50">
                  <span className="text-[#8C765C] block text-[9px] uppercase tracking-wider font-mono mb-1">
                    {t("coordinatesBrief")}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#35261A]">
                    <div className="bg-[#EFE8DC]/30 border border-[#E8DFC8]/50 p-1 rounded-lg text-center font-bold">
                      LAT: {selectedLandmark.coordinates.lat}
                    </div>
                    <div className="bg-[#EFE8DC]/30 border border-[#E8DFC8]/50 p-1 rounded-lg text-center font-bold">
                      LNG: {selectedLandmark.coordinates.lng}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8DFC8]/50">
              <div className="flex justify-between items-center bg-[#2A9D90]/5 border border-[#2A9D90]/20 text-[#2A9D90] px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-bold">
                <span>PRESERVATION R-SCORE</span>
                <span className="font-extrabold text-sm">{selectedLandmark.riskScore}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
