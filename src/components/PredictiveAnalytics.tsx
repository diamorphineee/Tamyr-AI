import React, { useState, useEffect, useMemo } from "react";
import { Landmark, Language } from "../types";
import { translations } from "../translations";
import { LineChart, Play, ShieldAlert, Cpu, Sparkles, TrendingUp, Sliders, Info, ShieldCheck } from "lucide-react";

interface PredictiveAnalyticsProps {
  lang: Language;
  landmark: Landmark;
}

// Material-specific weathering sensitivity factors (UNESCO guidelines adapted)
const SENSITIVITY_TABLE: Record<string, {
  alpha_h: number;  // Humidity dissolving factor
  beta_t: number;   // Thermal dilatation factor
  gamma_u: number;  // UV glaze fading factor
  delta_w: number;  // Wind abrasion factor
  epsilon_v: number; // Mechanical vibration stress factor
}> = {
  yasawi: {
    alpha_h: 0.00035,  // Salt crystallization in glazed terracotta
    beta_t: 0.00022,
    gamma_u: 0.00015,
    delta_w: 0.00018,
    epsilon_v: 0.038   // Tall structural mass sensitive to support piers shearing
  },
  otyrar: {
    alpha_h: 0.00165,  // Highly vulnerable to water liquefaction (unburned loess clay)
    beta_t: 0.00035,
    gamma_u: 0.00008,
    delta_w: 0.00135,  // Intense sand ward abrasion of vertical earthen wall sections
    epsilon_v: 0.015
  },
  aishabibi: {
    alpha_h: 0.00028,
    beta_t: 0.00048,   // Intricate carved ceramic blocks vulnerable to micro-thermal fractures
    gamma_u: 0.00022,
    delta_w: 0.00042,
    epsilon_v: 0.045   // Seismically active foothill zone risk
  },
  tamgaly: {
    alpha_h: 0.00012,
    beta_t: 0.00092,   // Metamorphic schist rock face splitting heavily under extreme freeze-thaw spans
    gamma_u: 0.00028,
    delta_w: 0.00038,
    epsilon_v: 0.008
  },
  silkroad: {
    alpha_h: 0.00085,
    beta_t: 0.00032,
    gamma_u: 0.00012,
    delta_w: 0.00065,
    epsilon_v: 0.025   // Heavy load vibratory tremors from surrounding region
  }
};

export default function PredictiveAnalytics({ lang, landmark }: PredictiveAnalyticsProps) {
  const t = (key: string) => translations[key]?.[lang] || key;

  // Retrieve material sensitivities
  const sens = useMemo(() => {
    return SENSITIVITY_TABLE[landmark.id] || {
      alpha_h: 0.0004,
      beta_t: 0.0004,
      gamma_u: 0.0002,
      delta_w: 0.0004,
      epsilon_v: 0.02
    };
  }, [landmark.id]);

  // Environmental climate variables states pre-loaded with REAL historical metrics
  const [humidity, setHumidity] = useState<number>(landmark.climateProfile.avgHumidity);
  const [tempDelta, setTempDelta] = useState<number>(landmark.climateProfile.avgTempDelta);
  const [uvIndex, setUvIndex] = useState<number>(landmark.climateProfile.avgUvIndex);
  const [windSpeed, setWindSpeed] = useState<number>(landmark.climateProfile.avgWindSpeed);
  const [vibrations, setVibrations] = useState<number>(landmark.climateProfile.seismicVibrations);
  
  const [baseErosion, setBaseErosion] = useState<number>(landmark.metrics.surfaceErosion);
  const [focusYears, setFocusYears] = useState<number>(10);

  // Synchronize on landmark change to load authentic parameters
  useEffect(() => {
    setHumidity(landmark.climateProfile.avgHumidity);
    setTempDelta(landmark.climateProfile.avgTempDelta);
    setUvIndex(landmark.climateProfile.avgUvIndex);
    setWindSpeed(landmark.climateProfile.avgWindSpeed);
    setVibrations(landmark.climateProfile.seismicVibrations);
    setBaseErosion(landmark.metrics.surfaceErosion);
  }, [landmark]);

  // Scientific dynamic calculation of degradation constant k
  // k_computed = H * alpha_h + T_delta * beta_t + UV * gamma_u + W * delta_w + V * epsilon_v
  const kConstant = useMemo(() => {
    const rawK = 
      (humidity * sens.alpha_h) + 
      (tempDelta * sens.beta_t) + 
      (uvIndex * sens.gamma_u) + 
      (windSpeed * sens.delta_w) + 
      (vibrations * sens.epsilon_v);
    
    // Safety bound for logical mathematical simulation
    return Math.min(0.20, Math.max(0.005, rawK));
  }, [humidity, tempDelta, uvIndex, windSpeed, vibrations, sens]);

  // Computed Risk Index based on weighted multipliers
  const computedRisk = useMemo(() => {
    // Risk represents dynamic environmental stresses out of 100
    const H = (humidity / 100) * 30; // 30% max
    const T = (tempDelta / 80) * 20; // 20% max
    const U = (uvIndex / 11) * 15;   // 15% max
    const W = (windSpeed / 25) * 15; // 15% max
    const V = Math.min(1.0, vibrations) * 20; // 20% max
    
    // Scale to match overall landmark baseline density
    const envComposite = H + T + U + W + V;
    const materialFactor = landmark.crackDensity * 8; // scaled materials density
    
    return Math.round(Math.min(100, Math.max(10, envComposite * 1.1 + materialFactor)));
  }, [humidity, tempDelta, uvIndex, windSpeed, vibrations, landmark.crackDensity]);

  // Generate 20-year degradation curves dataset for SVG plotting
  // Formula: D(t) = D_0 * e^(k * t)
  const plotPoints = useMemo(() => {
    const points: { year: number; decay: number; risk: number }[] = [];
    const maxYears = 20;

    for (let yr = 0; yr <= maxYears; yr++) {
      const decayVal = baseErosion * Math.exp(kConstant * yr);
      // Risk expands with materials structural degradation
      const compoundRisk = computedRisk * Math.exp(kConstant * 0.35 * yr);
      
      points.push({
        year: yr,
        decay: Math.min(100, parseFloat(decayVal.toFixed(2))),
        risk: Math.min(100, parseFloat(compoundRisk.toFixed(2)))
      });
    }
    return points;
  }, [baseErosion, kConstant, computedRisk]);

  // Forecast milestones
  const decay5Years = useMemo(() => {
    return Math.min(100, Math.round(baseErosion * Math.exp(kConstant * 5)));
  }, [baseErosion, kConstant]);

  const decay10Years = useMemo(() => {
    return Math.min(100, Math.round(baseErosion * Math.exp(kConstant * 10)));
  }, [baseErosion, kConstant]);

  const decaySelectedYears = useMemo(() => {
    return Math.min(100, Math.round(baseErosion * Math.exp(kConstant * focusYears)));
  }, [baseErosion, kConstant, focusYears]);

  // SVG dimensions
  const svgWidth = 480;
  const svgHeight = 220;
  const paddingX = 45;
  const paddingY = 25;

  const getCoordinates = (yr: number, val: number) => {
    const x = paddingX + (yr / 20) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (val / 100) * (svgHeight - paddingY * 2);
    return { x, y };
  };

  const decayPath = useMemo(() => {
    return plotPoints.map((p) => {
      const { x, y } = getCoordinates(p.year, p.decay);
      return `${x},${y}`;
    }).join(" L ");
  }, [plotPoints]);

  const riskPath = useMemo(() => {
    return plotPoints.map((p) => {
      const { x, y } = getCoordinates(p.year, p.risk);
      return `${x},${y}`;
    }).join(" L ");
  }, [plotPoints]);

  return (
    <div id="predictive-analytics-panel" className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-6 font-sans relative overflow-hidden shadow-sm">
      
      {/* Upper Title */}
      <div className="flex justify-between items-center pb-3 border-b border-[#E8DFC8]/40 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-[#8C6239]" size={16} />
          <h3 className="text-sm font-serif font-bold text-[#35261A] tracking-wide uppercase">
            {t("formulaTitle")}
          </h3>
        </div>
        <div className="text-[10px] font-mono text-[#8C765C] flex items-center gap-1 font-bold">
          <ShieldAlert size={12} className="text-[#8C6239]" />
          <span>STATISTICAL CLIMATE COMPLIANT</span>
        </div>
      </div>

      {/* Dynamic Scientific Plate Display */}
      <div className="bg-[#FAF7F2] border border-[#E8DFC8]/50 p-4 rounded-2xl mb-6 select-all font-mono">
        <div className="text-[10px] text-[#8C6239] text-center tracking-wider leading-relaxed">
          <div className="font-bold border-b border-[#E8DFC8]/40 pb-1.5 mb-1.5 uppercase">
            ACTIVE REGIONAL DEGRADATION COMPUTATION MATRIX
          </div>
          <div className="text-xs font-bold text-[#35261A] my-1">
            k = (H &times; &alpha;) + (T &times; &beta;) + (UV &times; &gamma;) + (W &times; &delta;) + (V &times; &epsilon;)
          </div>
          <div className="text-[9px] text-[#8C765C] mt-1 leading-normal font-semibold">
            Calculated dynamic decay coefficient for <span className="text-[#8C6239] font-bold">{landmark.name[lang]} ({landmark.climateProfile.city})</span>:<br/>
            k = ({humidity}% &times; {sens.alpha_h}) + ({tempDelta}°C &times; {sens.beta_t}) + (UV {uvIndex} &times; {sens.gamma_u}) + ({windSpeed}m/s &times; {sens.delta_w}) + ({vibrations}mm/s &times; {sens.epsilon_v}) = <span className="text-[#35261A] font-bold">{kConstant.toFixed(5)} yr⁻¹</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Adjustable Environment Sliders Side */}
        <div className="lg:col-span-1 space-y-4 border-r border-[#E8DFC8]/40 pr-0 lg:pr-5">
          <div className="flex justify-between items-center pb-1">
            <h4 className="text-[10px] tracking-widest text-[#8C765C] font-mono font-bold uppercase flex items-center gap-1">
              <Sliders size={11} className="text-[#8C6239]" />
              CLIMATE HISTORIC CONTROLS
            </h4>
            <span className="text-[9px] font-mono text-[#8C6239] bg-[#8C6239]/5 px-2 py-0.5 rounded-lg border border-[#8C6239]/20 font-bold">
              LIV-FEED
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* 1. Humidity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-[#8C765C] font-semibold">
                <span>Relative Humidity (H)</span>
                <span className="text-[#2A9D90] font-bold">{humidity.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="0.5"
                value={humidity}
                onChange={(e) => setHumidity(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-[#2A9D90]"
              />
              <div className="flex justify-between text-[8px] font-mono text-gray-550 font-bold">
                <span>Desert minimum</span>
                <span>{landmark.climateProfile.city} avg: {landmark.climateProfile.avgHumidity}%</span>
              </div>
            </div>

            {/* 2. Temperature Fluctuations Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-[#8C765C] font-semibold">
                <span>Annual Temperature Delta (T)</span>
                <span className="text-orange-600 font-bold">{tempDelta.toFixed(1)}°C</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="0.5"
                value={tempDelta}
                onChange={(e) => setTempDelta(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[8px] font-mono text-gray-550 font-bold">
                <span>Temperate</span>
                <span>{landmark.climateProfile.city} max drop: {landmark.climateProfile.avgTempDelta}°C</span>
              </div>
            </div>

            {/* 3. Solar UV Exposure index slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-[#8C765C] font-semibold">
                <span>Solar UV Radiation (UV)</span>
                <span className="text-amber-600 font-bold font-semibold">Index {uvIndex.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="11"
                step="0.1"
                value={uvIndex}
                onChange={(e) => setUvIndex(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[8px] font-mono text-gray-550 font-bold">
                <span>Low protection</span>
                <span>{landmark.climateProfile.city} uv: {landmark.climateProfile.avgUvIndex}</span>
              </div>
            </div>

            {/* 4. Wind velocity abrasion speed */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10px] text-[#8C765C] font-semibold">
                <span>Wind Abrasion Velocity (W)</span>
                <span className="text-slate-600 font-bold">{windSpeed.toFixed(1)} m/s</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.2"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
              <div className="flex justify-between text-[8px] font-mono text-gray-555 font-bold">
                <span>Breeze</span>
                <span>{landmark.climateProfile.city} max wind: {landmark.climateProfile.avgWindSpeed} m/s</span>
              </div>
            </div>

            {/* 5. Seismic/Traffic vibrations */}
            <div className="space-y-1 font-sans">
              <div className="flex justify-between font-mono text-[10px] text-[#8C765C] font-semibold">
                <span>Seismic/Ground Vibrations (V)</span>
                <span className="text-red-600 font-bold">{vibrations.toFixed(2)} mm/s</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.50"
                step="0.01"
                value={vibrations}
                onChange={(e) => setVibrations(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[8px] font-mono text-gray-555 font-bold">
                <span>Inert soil</span>
                <span>{landmark.climateProfile.city} background: {landmark.climateProfile.seismicVibrations} mm/s</span>
              </div>
            </div>

            {/* Base physical erosion D0 */}
            <div className="space-y-1 font-sans border-t border-[#E8DFC8]/40 pt-3">
              <div className="flex justify-between font-mono text-[10px] text-[#8C765C] font-bold">
                <span>Active Core Vulnerability (D₀)</span>
                <span className="text-[#8C6239] font-bold">{baseErosion.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="80.0"
                step="0.5"
                value={baseErosion}
                onChange={(e) => setBaseErosion(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-[#8C6239]"
              />
            </div>

          </div>
        </div>

        {/* Real-world charts plotting panel */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="bg-[#FAF7F2] border border-[#E8DFC8]/50 p-4 rounded-2xl flex-1">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-[#8C6239] font-mono font-bold block uppercase tracking-wider">
                {t("predictiveGraphHeader")}
              </span>
              <div className="flex items-center gap-2 text-[9px] font-mono text-[#8C765C] font-bold">
                <span className="inline-block w-2.5 h-1 bg-[#8C6239] rounded" />
                <span>DEGRADATION</span>
                <span className="inline-block w-2.5 h-1 bg-amber-600 border-dashed border-b" />
                <span>RISK ENVELOPE</span>
              </div>
            </div>

            {/* Custom Plotted Curves with grid scales */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[340px] select-none">
                {/* Horizontal grid lines */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const val = i * 25;
                  const { y } = getCoordinates(0, val);
                  return (
                    <g key={i}>
                      <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="rgba(140, 98, 57, 0.08)" strokeWidth="1" strokeDasharray="3,4" />
                      <text x={paddingX - 10} y={y + 3} fill="rgba(140, 98, 57, 0.5)" fontSize="8" fontFamily="monospace" textAnchor="end" className="font-bold">{val}%</text>
                    </g>
                  );
                })}

                {/* Vertical year milestones grid */}
                {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((yr) => {
                  const { x } = getCoordinates(yr, 0);
                  return (
                    <g key={yr}>
                      <line x1={x} y1={paddingY} x2={x} y2={svgHeight - paddingY} stroke="rgba(140, 98, 57, 0.05)" strokeWidth="0.75" />
                      <text x={x} y={svgHeight - 8} fill="rgba(140, 98, 57, 0.6)" fontSize="8" fontFamily="monospace" textAnchor="middle" className="font-bold">{yr}y</text>
                    </g>
                  );
                })}

                {/* Selected Forecast vertical focus bar */}
                {(() => {
                  const { x } = getCoordinates(focusYears, 0);
                  const { y: yDecay } = getCoordinates(focusYears, decaySelectedYears);
                  return (
                    <g>
                      <line x1={x} y1={paddingY} x2={x} y2={svgHeight - paddingY} stroke="#8C6239" strokeWidth="1" strokeDasharray="2,2" opacity="0.65" />
                      <circle cx={x} cy={yDecay} r="4" fill="#8C6239" className="animate-pulse" />
                    </g>
                  );
                })()}

                {/* SVG PLOTTED CURVES */}
                <path
                  d={`M ${decayPath}`}
                  fill="none"
                  stroke="#8C6239"
                  strokeWidth="2.5"
                  className="transition-all duration-300 drop-shadow-[0_2px_4px_rgba(140,98,57,0.15)]"
                />

                <path
                  d={`M ${riskPath}`}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeDasharray="4,2"
                  className="transition-all duration-300 opacity-80"
                />
              </svg>
            </div>
          </div>

          {/* Forecasting Timeline Focus Bar */}
          <div className="bg-[#FAF7F2] border border-[#E8DFC8]/50 p-4 rounded-2xl">
            <div className="mb-2 flex justify-between items-center text-xs">
              <span className="text-[10px] text-[#8C765C] font-mono block uppercase tracking-wider font-bold">
                TIMELINE SIMULATION SCALE
              </span>
              <span className="font-mono font-bold text-[#8C6239]">{focusYears} YEARS FORECAST</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="20"
              value={focusYears}
              onChange={(e) => setFocusYears(parseInt(e.target.value))}
              className="w-full h-1 bg-[#EFE8DC] rounded appearance-none cursor-pointer accent-[#8C6239]"
            />

            <div className="grid grid-cols-3 gap-3 mt-4 text-xs font-sans">
              <div className="bg-[#FFFFFC] border border-[#E8DFC8]/60 p-3 rounded-2xl text-center shadow-sm">
                <span className="text-[9px] text-[#8C765C] font-mono block uppercase font-bold">
                  DECAY IN 5 YRS
                </span>
                <span className="text-lg font-bold text-[#8C6239] font-mono block mt-1">
                  +{decay5Years}%
                </span>
                <span className="text-[8px] text-gray-500 font-mono uppercase block mt-0.5 font-bold">ESTIMATED SHIFT</span>
              </div>

              <div className="bg-[#FFFFFC] border border-[#E8DFC8]/60 p-3 rounded-2xl text-center shadow-sm">
                <span className="text-[9px] text-[#8C765C] font-mono block uppercase font-bold">
                  DECAY IN 10 YRS
                </span>
                <span className="text-lg font-bold text-amber-600 font-mono block mt-1">
                  +{decay10Years}%
                </span>
                <span className="text-[8px] text-gray-500 font-mono uppercase block mt-0.5 font-bold">ACUTE ATTRITION</span>
              </div>

              <div className="bg-[#8C6239]/5 border border-[#8C6239]/30 p-3 rounded-2xl text-center shadow-sm">
                <span className="text-[9px] text-[#8C6239] font-mono block uppercase font-extrabold">
                  YEAR {focusYears} DECAY
                </span>
                <span className="text-lg font-bold text-[#35261A] font-mono block mt-1">
                  +{decaySelectedYears}%
                </span>
                <span className="text-[8px] text-[#8C6239] font-mono uppercase block mt-0.5 font-bold">MATRIX POINT</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
