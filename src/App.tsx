import React, { useState } from "react";
import { Language, Landmark } from "./types";
import { defaultLandmarks } from "./data";
import { translations } from "./translations";
import AILanding from "./components/AILanding";
import InteractiveMap from "./components/InteractiveMap";
import AIScanner from "./components/AIScanner";
import AIReconstruction from "./components/AIReconstruction";
import PredictiveAnalytics from "./components/PredictiveAnalytics";
import DigitalTwin from "./components/DigitalTwin";
import IoTSensors from "./components/IoTSensors";
import ResearchDashboard from "./components/ResearchDashboard";
import { 
  Home, 
  Compass, 
  Activity, 
  Cpu, 
  Layers, 
  FolderArchive, 
  Settings, 
  BookOpen, 
  Radio, 
  Globe, 
  Sparkles, 
  ChevronRight, 
  Heart,
  Calendar,
  Layers as LayersIcon
} from "lucide-react";
import { KoshkarMuiiz, SilkRoadDivider, OrnamentalCorner, TurkicRosette } from "./components/OrnamentKit";

type ActiveSidebarTab = "home" | "monuments" | "analytics" | "prediction" | "twin" | "archive" | "settings";

export default function App() {
  const [lang, setLang] = useState<Language>("ru");
  const [currentPage, setCurrentPage] = useState<"landing" | "dashboard">("landing");
  const [activeTab, setActiveTab] = useState<ActiveSidebarTab>("home");
  const [landmarks, setLandmarks] = useState<Landmark[]>(defaultLandmarks);
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>("yasawi");

  // Local state for sub-controls inside composite analytics
  const [analyticsSubTab, setAnalyticsSubTab] = useState<"scanner" | "iot" | "lab">("scanner");

  const selectedLandmark = landmarks.find((l) => l.id === selectedLandmarkId) || landmarks[0];

  const t = (key: string) => translations[key]?.[lang] || key;

  // Callback to update parent landmark parameters on active CV scanning results
  const updateLandmarkRisk = (landmarkId: string, alertScore: number, crackD: number) => {
    setLandmarks((prev) =>
      prev.map((l) =>
        l.id === landmarkId
          ? {
              ...l,
              riskScore: alertScore,
              crackDensity: crackD,
              riskLevel: alertScore > 80 ? "CRITICAL" : alertScore > 55 ? "HIGH" : "STABLE",
            }
          : l
      )
    );
  };

  const handleSelectLandmarkFromMap = (landmark: Landmark) => {
    setSelectedLandmarkId(landmark.id);
    setActiveTab("twin"); // trigger 3D telemetry digital twin
  };

  const handleQuickViewLandmark = (landmark: Landmark) => {
    setSelectedLandmarkId(landmark.id);
    setCurrentPage("dashboard");
    setActiveTab("twin");
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#35261A] flex flex-col font-sans selection:bg-[#2A9D90]/20 selection:text-[#35261A] overflow-x-hidden">
      
      {currentPage === "landing" ? (
        /* 1. SEAMLESS LIGHT-PARCHMENT CINEMATIC LANDING OVERVIEW */
        <AILanding
          lang={lang}
          setLang={setLang}
          onEnterApp={() => {
            setCurrentPage("dashboard");
            setActiveTab("home");
          }}
          onQuickViewLandmark={handleQuickViewLandmark}
        />
      ) : (
        /* 2. PREMIUM HISTORICAL MUSEUM DASHBOARD WITH LEFT SIDEBAR */
        <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF6F0]">
          
          {/* LEFT SIDEBAR NAVIGATION - PRECISELY STYLED TO MUSEUM SPECIFICATIONS */}
          <aside className="w-full md:w-72 bg-[#F4EDE2] border-r border-[#E8DFC8]/75 flex flex-col shrink-0 relative z-30 shadow-sm">
            {/* Visual Soft Texture Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-[#8C6239]/5 pointer-events-none" />
            
            {/* Elegant Ornamental Corner Decor */}
            <div className="absolute top-0 left-0 p-1 opacity-10 pointer-events-none">
              <OrnamentalCorner className="w-16 h-16 text-[#8C6239]" />
            </div>

            {/* Sidebar Logo Header Area */}
            <div className="px-6 py-6 border-b border-[#E8DFC8]/75 relative flex items-center gap-3">
              <div 
                className="p-2 bg-[#EFE8DC] border border-[#8C6239]/40 rounded-xl cursor-pointer hover:bg-[#E5DCCF] transition-all duration-300 shadow-sm"
                onClick={() => setCurrentPage("landing")}
              >
                <KoshkarMuiiz className="text-[#8C6239] w-7 h-7 shrink-0" />
              </div>
              <div>
                <span className="text-[9px] tracking-widest text-[#2A9D90] font-mono block font-bold leading-none uppercase">
                  TAMYR ARCHIVE
                </span>
                <h1
                  onClick={() => setCurrentPage("landing")}
                  className="text-lg font-display font-bold tracking-wider text-[#35261A] hover:text-[#8C6239] cursor-pointer mt-0.5 uppercase"
                >
                  Tamyr AI
                </h1>
              </div>
            </div>

            {/* Navigation Tabs List */}
            <nav className="flex-grow py-6 px-3 space-y-1.5 overflow-y-auto relative z-10">
              
              {/* HOME LINK */}
              <button
                onClick={() => setActiveTab("home")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "home"
                    ? "bg-[#EFE8DC] text-[#35261A] shadow-sm border-l-4 border-[#8C6239]"
                    : "text-[#665445] hover:bg-[#EFE8DC]/50 hover:text-[#35261A]"
                }`}
              >
                <Home size={15} className={`shrink-0 ${activeTab === "home" ? "text-[#8C6239]" : "text-[#8C765C]"}`} />
                {lang === "en" ? "Home" : lang === "kk" ? "Басты бет" : "Главная лаборатория"}
              </button>

              {/* MONUMENTS LINK */}
              <button
                onClick={() => setActiveTab("monuments")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "monuments"
                    ? "bg-[#EFE8DC] text-[#35261A] shadow-sm border-l-4 border-[#8C6239]"
                    : "text-[#665445] hover:bg-[#EFE8DC]/50 hover:text-[#35261A]"
                }`}
              >
                <Compass size={15} className={`shrink-0 ${activeTab === "monuments" ? "text-[#8C6239]" : "text-[#8C765C]"}`} />
                {lang === "en" ? "Monuments" : lang === "kk" ? "Ескерткіштер" : "Реестр Памятников"}
              </button>

              {/* ANALYTICS LINK */}
              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "analytics"
                    ? "bg-[#EFE8DC] text-[#35261A] shadow-sm border-l-4 border-[#8C6239]"
                    : "text-[#665445] hover:bg-[#EFE8DC]/50 hover:text-[#35261A]"
                }`}
              >
                <Cpu size={15} className={`shrink-0 ${activeTab === "analytics" ? "text-[#8C6239]" : "text-[#8C765C]"}`} />
                {lang === "en" ? "Analytics" : lang === "kk" ? "Талдаулар" : "Сенсорный Анализ"}
              </button>

              {/* PREDICTION LINK */}
              <button
                onClick={() => setActiveTab("prediction")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "prediction"
                    ? "bg-[#EFE8DC] text-[#35261A] shadow-sm border-l-4 border-[#8C6239]"
                    : "text-[#665445] hover:bg-[#EFE8DC]/50 hover:text-[#35261A]"
                }`}
              >
                <Activity size={15} className={`shrink-0 ${activeTab === "prediction" ? "text-[#8C6239]" : "text-[#8C765C]"}`} />
                {lang === "en" ? "Prediction" : lang === "kk" ? "Болжаулар" : "Прогноз Разрушений"}
              </button>

              {/* DIGITAL TWIN LINK */}
              <button
                onClick={() => setActiveTab("twin")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "twin"
                    ? "bg-[#EFE8DC] text-[#35261A] shadow-sm border-l-4 border-[#8C6239]"
                    : "text-[#665445] hover:bg-[#EFE8DC]/50 hover:text-[#35261A]"
                }`}
              >
                <Layers size={15} className={`shrink-0 ${activeTab === "twin" ? "text-[#8C6239]" : "text-[#8C765C]"}`} />
                {lang === "en" ? "Digital Twin" : lang === "kk" ? "Сандық егіз" : "Цифровой Двойник"}
              </button>

              {/* ARCHIVE LINK */}
              <button
                onClick={() => setActiveTab("archive")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "archive"
                    ? "bg-[#EFE8DC] text-[#35261A] shadow-sm border-l-4 border-[#8C6239]"
                    : "text-[#665445] hover:bg-[#EFE8DC]/50 hover:text-[#35261A]"
                }`}
              >
                <FolderArchive size={15} className={`shrink-0 ${activeTab === "archive" ? "text-[#8C6239]" : "text-[#8C765C]"}`} />
                {lang === "en" ? "Archive" : lang === "kk" ? "Мұрағат" : "Цифровая Реставрация"}
              </button>

              {/* SETTINGS LINK */}
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "settings"
                    ? "bg-[#EFE8DC] text-[#35261A] shadow-sm border-l-4 border-[#8C6239]"
                    : "text-[#665445] hover:bg-[#EFE8DC]/50 hover:text-[#35261A]"
                }`}
              >
                <Settings size={15} className={`shrink-0 ${activeTab === "settings" ? "text-[#8C6239]" : "text-[#8C765C]"}`} />
                {lang === "en" ? "Settings" : lang === "kk" ? "Баптаулар" : "Параметры"}
              </button>

            </nav>

            {/* Sidebar Bottom Area: Language & Controls */}
            <div className="p-4 border-t border-[#E8DFC8]/75 space-y-4 bg-black/[0.02] relative z-20">
              
              {/* Monitored Landmark Indicator Widget */}
              <div className="bg-[#FFFFFC] border border-[#EBE3D3] rounded-2xl p-3.5 shadow-sm space-y-1">
                <span className="text-[9px] text-[#2A9D90] font-mono font-bold tracking-wider block uppercase">
                  {t("landmarkLabel").toUpperCase()}
                </span>
                <span className="font-serif font-bold text-xs text-[#35261A] block truncate leading-snug">
                  {selectedLandmark.name[lang]}
                </span>
                <span className="text-[9px] text-[#8C765C]/80 block truncate">
                  {selectedLandmark.region[lang]}
                </span>
              </div>

              {/* Language Selector Dropdown */}
              <div className="flex justify-between items-center bg-[#EFE8DC] border border-[#E0D6C3] p-1.5 rounded-xl">
                {(["en", "kk", "ru"] as Language[]).map((ln) => (
                  <button
                    key={ln}
                    onClick={() => setLang(ln)}
                    className={`flex-grow py-1 px-2.5 text-[10px] font-mono tracking-wider font-bold rounded-lg uppercase transition-all duration-200 ${
                      lang === ln 
                        ? "bg-[#8C6239] text-white shadow-sm" 
                        : "text-[#665445] hover:text-[#35261A]"
                    }`}
                  >
                    {ln}
                  </button>
                ))}
              </div>

              {/* Exit button to Cinematic Intro */}
              <button
                onClick={() => setCurrentPage("landing")}
                className="w-full text-center py-2 text-[9px] font-mono font-bold tracking-widest text-[#8C6239] bg-transparent hover:bg-[#EFE8DC]/40 hover:text-amber-800 rounded-lg transition-all border border-[#8C6239]/20 uppercase"
              >
                {lang === "ru" ? "НА ГЛАВНУЮ" : lang === "kk" ? "БАСТЫ БЕТ" : "LANDING VIEW"}
              </button>
            </div>
          </aside>

          {/* LARGE CENTRAL WORKSPACE */}
          <main className="flex-grow flex flex-col min-h-screen py-6 px-4 md:px-8 space-y-6 relative z-10 overflow-y-auto">
            
            {/* 1. DYNAMIC TOP ARCHIVAL HEADER BANNER WITH CASPIAN TEXTURE */}
            <header className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-5 shadow-[0_4px_24px_rgba(140,98,57,0.03)] flex flex-col lg:flex-row justify-between lg:items-center gap-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 select-none opacity-[0.03] pointer-events-none">
                <TurkicRosette className="w-48 h-48 text-[#8C6239]" />
              </div>
              
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] tracking-widest text-[#2A9D90] font-mono block font-extrabold uppercase leading-none">
                  KAZAKHSTAN ACADEMIC PRESERVATION CENTER • ЮНЕСКО
                </span>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-[#35261A] tracking-tight">
                    {selectedLandmark.name[lang]}
                  </h2>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      selectedLandmark.riskLevel === "CRITICAL"
                        ? "bg-red-500 shadow-sm"
                        : selectedLandmark.riskLevel === "HIGH"
                        ? "bg-orange-500 shadow-sm"
                        : "bg-green-600 shadow-sm"
                    }`}
                  />
                </div>
                <div className="text-[11px] text-[#8C765C] flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{selectedLandmark.region[lang]}</span>
                  <span className="text-[#8C6239]/40">•</span>
                  <span>{selectedLandmark.era[lang]}</span>
                </div>
              </div>

              {/* Global Quick switcher block */}
              <div className="flex items-center gap-2 overflow-x-auto shrink-0 select-none py-1 relative z-10 font-sans">
                {landmarks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLandmarkId(l.id)}
                    className={`px-3 py-1.5 text-[10px] font-semibold border rounded-lg whitespace-nowrap transition-all uppercase ${
                      l.id === selectedLandmarkId
                        ? "bg-[#8C6239] border-[#8C6239] text-white shadow-sm"
                        : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#665445] hover:bg-[#EFE8DC]/30 hover:text-[#35261A]"
                    }`}
                  >
                    {l.name[lang].split(" ")[0]}
                  </button>
                ))}
              </div>
            </header>

            {/* 2. MAIN ACTIVE TAB STAGES */}
            <div className="flex-grow">
              
              {/* HOME TAB - POWERFUL SYSTEM OVERVIEW AND PRESERVATION INSIGHTS */}
              {activeTab === "home" && (
                <div className="space-y-6">
                  {/* Dynamic Kazakh Ornament Divider */}
                  <div className="py-2">
                    <SilkRoadDivider className="text-[#8C6239]/25" />
                  </div>

                  {/* Summary Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Welcome Academic Note */}
                    <div className="md:col-span-2 bg-gradient-to-br from-[#FFFFFB] to-[#FAF8F5] border border-[#EFECE5] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0">
                        <OrnamentalCorner className="w-12 h-12 text-[#8C6239]/10" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-serif font-bold text-[#35261A] tracking-wide leading-tight">
                          {lang === "en" 
                            ? "National AI Archival Platform" 
                            : lang === "kk" 
                            ? "Ұлттық тарихи мұра ядросы" 
                            : "Национальная платформа ИИ по сохранению историко-культурного наследия"}
                        </h3>
                        <p className="text-xs text-[#665445] leading-relaxed font-sans max-w-xl">
                          {lang === "en" 
                            ? "Tamyr AI synthesizes multi-spectral telemetries, computer vision fracture detectors, and climate decomposition algorithms to dynamically trace structures built across the ancient Silk Road route in Kazakhstan." 
                            : lang === "kk" 
                            ? "Тамыр AI Қазақстандағы ежелгі Жібек жолы бойында салынған нысандарды қадағалау үшін көп спектрлі телеметрияларды, компьютерлік көру және сейсмикалық бақылау алгоритмдерін біріктіреді." 
                            : "Тамыр AI объединяет мультиспектральную телеметрию, детекторы трещин компьютерного зрения и климатические модели для динамического мониторинга древних памятников Великого Шёлкового пути в Казахстане."}
                        </p>
                      </div>

                      {/* Navigation Helper Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => setActiveTab("monuments")}
                          className="px-4.5 py-2.5 bg-[#8C6239] hover:bg-amber-900 text-white font-semibold text-[10px] tracking-wider uppercase rounded-xl shadow-sm transition-all duration-300"
                        >
                          {lang === "en" ? "Explore Map" : lang === "kk" ? "Картаны шолу" : "Открыть Карту"}
                        </button>
                        <button
                          onClick={() => setActiveTab("twin")}
                          className="px-4.5 py-2.5 bg-[#EFE8DC] hover:bg-[#E5DCCF] text-[#35261A] font-semibold text-[10px] tracking-wider uppercase rounded-xl transition-all duration-300"
                        >
                          {lang === "en" ? "3D Twin" : lang === "kk" ? "3D Егізі" : "Цифровой Двойник"}
                        </button>
                      </div>
                    </div>

                    {/* Preservation Status Indicators Card */}
                    <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-6 shadow-sm space-y-4 relative flex flex-col justify-between">
                      <span className="text-[9px] text-[#2A9D90] font-mono font-bold tracking-widest block uppercase border-b border-[#E8DFC8]/40 pb-2">
                        {lang === "en" ? "METRICAL STATUS" : lang === "kk" ? "СТАТИСТИКА КӨРСЕТКІШТЕРІ" : "ОСНОВНЫЕ МЕТРИКИ"}
                      </span>
                      
                      <div className="space-y-3.5 my-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#8C765C]">{lang === "en" ? "Total Monitored" : lang === "kk" ? "Бақыланатын нысандар" : "Всего объектов"}</span>
                          <span className="font-bold text-[#35261A] font-mono">05</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#8C765C]">{lang === "en" ? "Alarms Active" : lang === "kk" ? "Дабыл саны" : "Активные тревоги"}</span>
                          <span className="font-bold text-red-650 bg-red-100/60 px-2 py-0.5 rounded font-mono text-[10px]">02 CRITICAL</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#8C765C]">{lang === "en" ? "Digital Twins Ready" : lang === "kk" ? "3D нысандар дайын" : "3D Двойников создано"}</span>
                          <span className="font-bold text-teal-650 bg-teal-100/60 px-2 py-0.5 rounded font-mono text-[10px]">100% COMPLETE</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[#8C765C]">{lang === "en" ? "Data Integration" : lang === "kk" ? "Бірігу деңгейі" : "Интеграция данных"}</span>
                          <span className="font-bold text-amber-750 bg-amber-100/60 px-2 py-0.5 rounded font-mono text-[10px]">UNESCO-NASA</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E8DFC8]/40 text-[9px] font-mono text-[#8C765C]">
                        {lang === "en" ? "SYSTEM CALIBRATION OK" : lang === "kk" ? "КАЛИБРЛЕУ ТҰРАҚТЫ" : "КАЛИБРОВКА СИСТЕМЫ В НОРМЕ"}
                      </div>
                    </div>

                  </div>

                  {/* Panoramic Grid of Monuments Showcase */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-[#8C765C] tracking-widest uppercase">
                      {lang === "en" ? "ACTIVE PRESERVATION REGISTRY" : lang === "kk" ? "БЕЛСЕНДІ КОРПУС ТІЗІМІ" : "РЕЕСТР МОНИТОРИНГА ПАМЯТНИКОВ"}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {landmarks.map((loc) => {
                        const isSelected = loc.id === selectedLandmarkId;
                        return (
                          <div
                            key={loc.id}
                            onClick={() => setSelectedLandmarkId(loc.id)}
                            className={`p-4 rounded-2xl border transition-all duration-400 cursor-pointer flex flex-col justify-between h-36 relative ${
                              isSelected
                                ? "bg-[#FFFFFA] border-[#8C6239] shadow-md"
                                : "bg-[#FFFFFC] border-[#E8DFC8]/50 hover:border-[#8C765C]/80 shadow-sm"
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="text-[8px] font-mono text-[#8C765C] block uppercase truncate">
                                {loc.region[lang].split(",")[0]}
                              </span>
                              <h5 className="font-serif font-bold text-xs text-[#35261A] line-clamp-2 leading-snug">
                                {loc.name[lang]}
                              </h5>
                            </div>

                            <div className="pt-2 flex justify-between items-center">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                loc.riskLevel === "CRITICAL"
                                  ? "bg-red-50 text-red-650"
                                  : loc.riskLevel === "HIGH"
                                  ? "bg-orange-50 text-orange-650"
                                  : "bg-green-50 text-green-650"
                              }`}>
                                RISK: {loc.riskScore}%
                              </span>
                              <ChevronRight size={12} className="text-[#8C765C]" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* MONUMENTS TAB - LANDMARKS EXPEDITION GEOGRAPHIC INTERACTIVE MAP */}
              {activeTab === "monuments" && (
                <div className="space-y-6">
                  {/* Outer Map Card Container */}
                  <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-1 shadow-sm overflow-hidden">
                    <InteractiveMap
                      lang={lang}
                      selectedLandmark={selectedLandmark}
                      onSelectLandmark={handleSelectLandmarkFromMap}
                    />
                  </div>

                  {/* Selected Landmark Description card */}
                  <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    <div className="md:col-span-2 space-y-3">
                      <span className="text-[10px] text-[#2A9D90] font-mono font-bold tracking-widest uppercase block">
                        {lang === "en" ? "HISTORICAL ARCHIVE DOSSIER" : lang === "kk" ? "ТАРИХИ МҰРАҒАТ ДЕРЕКТЕРІ" : "ДОСЬЕ ИСТОРИЧЕСКОГО ПАМЯТНИКА"}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#35261A]">
                        {selectedLandmark.name[lang]}
                      </h3>
                      <p className="text-xs text-[#665445] leading-relaxed font-sans">
                        {selectedLandmark.description[lang]}
                      </p>
                    </div>

                    <div className="bg-[#FAF7F2] border border-[#EFE8DC] rounded-2xl p-4.5 space-y-4">
                      <span className="text-[9px] text-[#8C765C] font-mono font-bold tracking-wider block uppercase border-b border-[#E8DFC8] pb-1.5">
                        {lang === "en" ? "TECHNICAL SUMMARY" : lang === "kk" ? "ТЕХНИКАЛЫҚ ШОЛУ" : "ТЕХНИЧЕСКАЯ СПЕЦИФИКАЦИЯ"}
                      </span>
                      <div className="space-y-2.5 text-xs">
                        <div>
                          <span className="text-[9px] text-[#8C765C]/80 block uppercase font-mono">{t("materialLabel")}</span>
                          <span className="font-semibold text-[#35261A] text-[11px] block mt-0.5">{selectedLandmark.material[lang]}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#8C765C]/80 block uppercase font-mono">{t("currentRiskStatusLabel")}</span>
                          <span className={`font-bold text-[11px] block mt-0.5 ${
                            selectedLandmark.riskLevel === "CRITICAL" ? "text-red-650" : selectedLandmark.riskLevel === "HIGH" ? "text-orange-650" : "text-green-650"
                          }`}>
                            {selectedLandmark.riskLevel} ({selectedLandmark.riskScore} / 100)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ANALYTICS TAB - AISCANNER with beautiful subtab bar */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  
                  {/* Sub-tab navigation bar for Analytics, allowing swapping scanner / IoT / lab reports */}
                  <div className="flex border-b border-[#E8DFC8]/70 bg-[#FFFFFB] p-1 rounded-2xl shadow-sm gap-1 max-w-lg">
                    <button
                      onClick={() => setAnalyticsSubTab("scanner")}
                      className={`flex-grow py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all ${
                        analyticsSubTab === "scanner"
                          ? "bg-[#EFE8DC] text-[#35261A] shadow-inner font-bold"
                          : "text-[#665445] hover:text-[#35261A]"
                      }`}
                    >
                      {lang === "en" ? "Surface Scanner" : lang === "kk" ? "Беттік сканерлеу" : "Спектрометр поверхности"}
                    </button>
                    <button
                      onClick={() => setAnalyticsSubTab("iot")}
                      className={`flex-grow py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all ${
                        analyticsSubTab === "iot"
                          ? "bg-[#EFE8DC] text-[#35261A] shadow-inner font-bold"
                          : "text-[#665445] hover:text-[#35261A]"
                      }`}
                    >
                      {lang === "en" ? "Environment Monitors" : lang === "kk" ? "Микроклимат" : "Датчики климата"}
                    </button>
                    <button
                      onClick={() => setAnalyticsSubTab("lab")}
                      className={`flex-grow py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all ${
                        analyticsSubTab === "lab"
                          ? "bg-[#EFE8DC] text-[#35261A] shadow-inner font-bold"
                          : "text-[#665445] hover:text-[#35261A]"
                      }`}
                    >
                      {lang === "en" ? "AI Report Unit" : lang === "kk" ? "ИИ-Есептеме генераторы" : "Генератор Отчетов ИИ"}
                    </button>
                  </div>

                  {/* Render content based on subtab */}
                  <div className="transition-all duration-300">
                    {analyticsSubTab === "scanner" && (
                      <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-5 shadow-sm">
                        <AIScanner 
                          lang={lang} 
                          selectedLandmark={selectedLandmark} 
                          onUpdateLandmarkRisk={updateLandmarkRisk} 
                        />
                      </div>
                    )}

                    {analyticsSubTab === "iot" && (
                      <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-5 shadow-sm">
                        <IoTSensors lang={lang} landmark={selectedLandmark} />
                      </div>
                    )}

                    {analyticsSubTab === "lab" && (
                      <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-5 shadow-sm">
                        <ResearchDashboard lang={lang} selectedLandmark={selectedLandmark} />
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* PREDICTION TAB - LINE CHARTS, MATHEMATICAL COEFFICIENTS */}
              {activeTab === "prediction" && (
                <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-5 shadow-sm">
                  <PredictiveAnalytics lang={lang} landmark={selectedLandmark} />
                </div>
              )}

              {/* DIGITAL TWIN TAB - WIREFRAMES & LASERS */}
              {activeTab === "twin" && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Side: 3D Render block (Col width 8) */}
                  <div className="xl:col-span-8 flex flex-col justify-between">
                    <DigitalTwin lang={lang} landmark={selectedLandmark} />
                  </div>

                  {/* Right Side: Laser Metrics block (Col width 4) */}
                  <div className="xl:col-span-4 bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-6 flex flex-col justify-between shadow-sm relative">
                    <div className="absolute top-0 right-0 p-1">
                      <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
                    </div>
                    
                    <div className="space-y-4">
                      <span className="text-[9px] text-[#2A9D90] font-mono font-bold tracking-widest uppercase block border-b border-[#E8DFC8]/45 pb-2 mb-3">
                        LIDAR STRUCTURAL METRICS
                      </span>
                      
                      <div className="space-y-4 text-xs font-sans">
                        <div className="p-3 bg-[#FAF7F2] border border-[#EFE8DC] rounded-xl">
                          <span className="text-[#8C765C] text-[9px] uppercase tracking-wider block font-mono">SURFACE EROSION INDEX</span>
                          <span className="font-bold text-[#35261A] text-lg block mt-0.5">{selectedLandmark.metrics.surfaceErosion}%</span>
                        </div>
                        <div className="p-3 bg-[#FAF7F2] border border-[#EFE8DC] rounded-xl">
                          <span className="text-[#8C765C] text-[9px] uppercase tracking-wider block font-mono">CRACK SHIFT GROWTH RATIO</span>
                          <span className="font-bold text-[#35261A] text-lg block mt-0.5">{selectedLandmark.metrics.crackGrowthRate} mm/year</span>
                        </div>
                        <div className="p-3 bg-[#FAF7F2] border border-[#EFE8DC] rounded-xl">
                          <span className="text-[#8C765C] text-[9px] uppercase tracking-wider block font-mono">MOISTURE REFRACTION DAMP</span>
                          <span className="font-bold text-[#35261A] text-lg block mt-0.5">{selectedLandmark.metrics.moisturePenetration}%</span>
                        </div>
                        <div className="p-3 bg-[#FAF7F2] border border-[#EFE8DC] rounded-xl">
                          <span className="text-[#8C765C] text-[9px] uppercase tracking-wider block font-mono">STRUCTURAL STRESS BOUNDS</span>
                          <span className="text-[#8C6239] font-bold text-lg block mt-0.5">{selectedLandmark.metrics.structuralStress} MPa</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E8DFC8]/45 mt-6 text-[9px] font-mono text-[#8C765C]">
                      SEC CODE: TMR-{selectedLandmark.id.toUpperCase()}-05
                    </div>
                  </div>

                </div>
              )}

              {/* ARCHIVE TAB - CHRONO RECONSRUCTION COMPARATIVE VIEW */}
              {activeTab === "archive" && (
                <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-5 shadow-sm">
                  <AIReconstruction lang={lang} landmark={selectedLandmark} />
                </div>
              )}

              {/* SETTINGS TAB - RECALIBRATIONS, LANGUAGE, WEIGHTS */}
              {activeTab === "settings" && (
                <div className="bg-[#FFFFFB] border border-[#EFECE5] rounded-3xl p-6 shadow-sm space-y-6">
                  
                  {/* Header Title */}
                  <div className="border-b border-[#E8DFC8]/45 pb-4">
                    <span className="text-[10px] text-[#2A9D90] font-mono font-bold tracking-widest block uppercase">
                      TAMYR PLATFORM CONFIGURATION
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#35261A] mt-0.5">
                      System Simulation Settings
                    </h3>
                  </div>

                  {/* Settings Grid Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
                    
                    {/* Weights Adjuster Settings */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-sm text-[#35261A] flex items-center gap-2">
                        <Activity size={14} className="text-[#8C6239]" />
                        {lang === "en" ? "Risk Weight Coefficients" : lang === "kk" ? "Қауіп коэффиценттері" : "Коэффициенты веса факторов риска"}
                      </h4>
                      <p className="text-[#665445] text-[11px] leading-relaxed">
                        Customize weight calibrations contributing to the composite risk alarm scores across high-precision climate models.
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-[11px] text-[#665445] mb-1">
                            <span>Moisture Penetration Weight</span>
                            <span className="font-semibold text-[#35261A]">40% (0.4)</span>
                          </div>
                          <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#8C6239] h-full" style={{ width: "40%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-[#665445] mb-1">
                            <span>Seismic / Vibration Stress Weight</span>
                            <span className="font-semibold text-[#35261A]">30% (0.3)</span>
                          </div>
                          <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#8C6239] h-full" style={{ width: "30%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-[#665445] mb-1">
                            <span>Environmental Humidity Weight</span>
                            <span className="font-semibold text-[#35261A]">20% (0.2)</span>
                          </div>
                          <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#8C6239] h-full" style={{ width: "20%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-[#665445] mb-1">
                            <span>Temperature Stress Weight</span>
                            <span className="font-semibold text-[#35261A]">10% (0.1)</span>
                          </div>
                          <div className="w-full bg-[#EFE8DC] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#8C6239] h-full" style={{ width: "10%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* App Language, Developer and Database Details */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-sm text-[#35261A] flex items-center gap-2">
                        <Globe size={14} className="text-[#2A9D90]" />
                        {lang === "en" ? "Platform Integration Diagnostics" : lang === "kk" ? "Платформа диагностикасы" : "Диагностические Панели"}
                      </h4>
                      
                      <div className="bg-[#FAF7F2] border border-[#EFE8DC] rounded-2xl p-4.5 space-y-3">
                        <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                          <span className="text-[#8C765C] text-[10px] uppercase font-mono">REST Engine Status:</span>
                          <span className="text-[10px] font-mono font-bold text-teal-600 uppercase">ONLINE OPERATIONAL</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                          <span className="text-[#8C765C] text-[10px] uppercase font-mono">Gemini Integration:</span>
                          <span className="text-[10px] font-mono font-bold text-[#8C6239] uppercase">gemini-3.5-flash AI</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                          <span className="text-[#8C765C] text-[10px] uppercase font-mono">NASA LIDAR coordinates:</span>
                          <span className="text-[10px] font-mono text-[#35261A]">WGS84 calibrated</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8C765C] text-[10px] uppercase font-mono">UNESCO Criteria Status:</span>
                          <span className="text-[10px] font-mono text-[#35261A] font-bold">Category-II Compliant</span>
                        </div>
                      </div>

                      {/* Recalibration trigger button */}
                      <button
                        onClick={() => {
                          setLandmarks(defaultLandmarks);
                          alert(lang === "ru" ? "Телеметрический поток успешно перекалиброван." : lang === "kk" ? "Телеметриялық ағын сәтті қайта калибрленді." : "Telemetry matrix re-calibrated successfully.");
                        }}
                        className="w-full py-3 bg-[#8C6239] hover:bg-amber-950 text-white font-semibold text-[10px] tracking-widest uppercase rounded-xl transition-all shadow-sm"
                      >
                        RE-INITIALIZE HERITAGE COEFFICIENTS
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* Core Bottom Footer Coordinate Metadata */}
            <footer className="border-t border-[#E8DFC8]/75 pt-5 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-[#8C765C] uppercase tracking-widest gap-2">
              <span>TAMYR AI 2026 // Казахстан</span>
            </footer>

          </main>

        </div>
      )}

    </div>
  );
}
