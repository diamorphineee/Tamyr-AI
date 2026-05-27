import React, { useState, useEffect } from "react";
import { Landmark, Language } from "../types";
import { translations } from "../translations";
import { Thermometer, Droplets, Sun, Activity, Wind, AlertTriangle, Radio } from "lucide-react";

interface IoTSensorsProps {
  lang: Language;
  landmark: Landmark;
}

export default function IoTSensors({ lang, landmark }: IoTSensorsProps) {
  const t = (key: string) => translations[key]?.[lang] || key;

  // Real-time fluctuating states to simulate actual live streams
  const [liveTemp, setLiveTemp] = useState<number>(landmark.iotSensors.temperature);
  const [liveHumidity, setLiveHumidity] = useState<number>(landmark.iotSensors.humidity);
  const [liveUv, setLiveUv] = useState<number>(landmark.iotSensors.uvExposure);
  const [liveVibration, setLiveVibration] = useState<number>(landmark.iotSensors.vibration);
  const [liveWind, setLiveWind] = useState<number>(landmark.iotSensors.windImpact);
  const [sensorStatus, setSensorStatus] = useState<"NOMINAL" | "ALERT">("NOMINAL");

  // Tiny fluctuator effect
  useEffect(() => {
    // Synchronize initial prop states
    setLiveTemp(landmark.iotSensors.temperature);
    setLiveHumidity(landmark.iotSensors.humidity);
    setLiveUv(landmark.iotSensors.uvExposure);
    setLiveVibration(landmark.iotSensors.vibration);
    setLiveWind(landmark.iotSensors.windImpact);
  }, [landmark]);

  useEffect(() => {
    const streamInterval = setInterval(() => {
      setLiveTemp((prev) => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setLiveHumidity((prev) => Math.max(5, Math.min(100, parseFloat((prev + (Math.random() * 0.8 - 0.4)).toFixed(1)))));
      setLiveUv((prev) => Math.max(0, parseFloat((prev + (Math.random() * 10 - 5)).toFixed(0))));
      setLiveVibration((prev) => parseFloat(Math.max(0.01, prev + (Math.random() * 0.04 - 0.02)).toFixed(3)));
      setLiveWind((prev) => parseFloat(Math.max(0, prev + (Math.random() * 0.6 - 0.3)).toFixed(1)));
    }, 2800);

    return () => clearInterval(streamInterval);
  }, []);

  // Monitor seismic and moisture extremes to trigger visual alarms
  useEffect(() => {
    if (liveVibration > 0.35 || liveHumidity > 60 || liveTemp > 38) {
      setSensorStatus("ALERT");
    } else {
      setSensorStatus("NOMINAL");
    }
  }, [liveVibration, liveHumidity, liveTemp]);

  return (
    <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-5 font-sans relative overflow-hidden shadow-sm">
      
      {/* Visual cyber grids backdrop */}
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-[0.05] bg-[radial-gradient(#8C6239_1px,transparent_1px)] bg-[size:10px_10px]" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-[#E8DFC8]/40 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Radio className="text-[#8C6239] shrink-0 animate-pulse" size={16} />
          <h3 className="text-xs font-bold tracking-widest text-[#35261A] font-serif uppercase">
            {t("sensorOverview")}
          </h3>
        </div>

        {/* Live Status alarm banner */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-wider font-extrabold uppercase border ${
            sensorStatus === "ALERT"
              ? "bg-red-50 text-red-700 border-red-200 shadow-sm animate-bounce"
              : "bg-[#2A9D90]/5 text-[#2A9D90] border-[#2A9D90]/20"
          }`}
        >
          {sensorStatus === "ALERT" ? <AlertTriangle size={10} /> : null}
          NODE STATE: {sensorStatus}
        </div>
      </div>

      <p className="text-xs text-[#8C765C] mb-5 leading-normal">
        {t("sensorExplain")}
      </p>

      {/* Grid of the 5 channel telemetry cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Card 1: Temp */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC8]/60 p-4 rounded-2xl flex flex-col justify-between min-h-[120px] transition-colors duration-300 hover:border-[#8C6239]/40 relative">
          <div className="flex justify-between items-start">
            <span className="text-[9px] text-[#8C765C] font-mono tracking-wider font-bold">
              {t("tempLabel").split(" ")[0]} 
            </span>
            <Thermometer className="text-[#E76F51]" size={14} />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#35261A] tracking-tight">
              {liveTemp}°C
            </span>
            <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                style={{ width: `${Math.min(100, Math.max(5, (liveTemp + 10) * 1.5))}%` }}
                className="h-full bg-[#E76F51] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Humidity */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC8]/60 p-4 rounded-2xl flex flex-col justify-between min-h-[120px] transition-colors duration-300 hover:border-[#8C6239]/40">
          <div className="flex justify-between items-start">
            <span className="text-[9px] text-[#8C765C] font-mono tracking-wider font-bold">
              {t("humidLabel").split(" ")[0]}
            </span>
            <Droplets className="text-sky-600" size={14} />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#35261A] tracking-tight">
              {liveHumidity}%
            </span>
            <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                style={{ width: `${liveHumidity}%` }}
                className={`h-full rounded-full ${liveHumidity > 60 ? "bg-red-500 animate-pulse" : "bg-sky-500"}`}
              />
            </div>
          </div>
        </div>

        {/* Card 3: UV Exposure */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC8]/60 p-4 rounded-2xl flex flex-col justify-between min-h-[120px] transition-colors duration-300 hover:border-[#8C6239]/40">
          <div className="flex justify-between items-start">
            <span className="text-[9px] text-[#8C765C] font-mono tracking-wider font-bold">
              {t("uvLabel").split(" ")[0]}
            </span>
            <Sun className="text-amber-653" size={14} />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#35261A] tracking-tight">
              {liveUv} <span className="text-[9px] text-[#8C765C]">uW</span>
            </span>
            <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                style={{ width: `${Math.min(100, (liveUv / 1000) * 100)}%` }}
                className="h-full bg-[#D4AF37] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Vibration */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC8]/60 p-4 rounded-2xl flex flex-col justify-between min-h-[120px] transition-colors duration-300 hover:border-[#8C6239]/40">
          <div className="flex justify-between items-start">
            <span className="text-[9px] text-[#8C765C] font-mono tracking-wider font-bold">
              {t("vibLabel").split(" ")[0]}
            </span>
            <Activity className="text-[#2A9D90]" size={14} />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#35261A] tracking-tight">
              {liveVibration} <span className="text-[9px] text-[#8C765C]">mm/s</span>
            </span>
            <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                style={{ width: `${Math.min(100, liveVibration * 150)}%` }}
                className={`h-full rounded-full ${liveVibration > 0.35 ? "bg-red-500 animate-pulse" : "bg-[#2A9D90]"}`}
              />
            </div>
          </div>
        </div>

        {/* Card 5: Wind Impact */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC8]/60 p-4 rounded-2xl flex flex-col justify-between min-h-[120px] transition-colors duration-300 hover:border-[#8C6239]/40">
          <div className="flex justify-between items-start">
            <span className="text-[9px] text-[#8C765C] font-mono tracking-wider font-bold">
              {t("windLabel").split(" ")[0]}
            </span>
            <Wind className="text-slate-500" size={14} />
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#35261A] tracking-tight">
              {liveWind} <span className="text-[9px] text-[#8C765C]">m/s</span>
            </span>
            <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                style={{ width: `${Math.min(100, (liveWind / 25) * 100)}%` }}
                className="h-full bg-slate-400 rounded-full"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Underline indicators */}
      <div className="mt-4 pt-3 border-t border-[#E8DFC8]/40 flex items-center justify-between text-[8px] font-mono text-[#8C765C] uppercase tracking-wider font-bold">
        <span>TRANSMITT CHANNEL: 16-BIT MULTIPLEXED SIG</span>
        <span className="text-[#8C6239]">LATENCY_PING: 42ms (SYS_SAT_OK)</span>
      </div>
    </div>
  );
}
