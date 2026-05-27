import React, { useEffect, useRef } from "react";
import { Language, Landmark } from "../types";
import { translations } from "../translations";
import { defaultLandmarks } from "../data";
import { Compass, Landmark as LandmarkIcon, ArrowRight, ShieldCheck, BookOpen, Star, Sparkles, MapPin } from "lucide-react";
import { KoshkarMuiiz, SilkRoadDivider, OrnamentalCorner, TurkicRosette } from "./OrnamentKit";

interface AILandingProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onEnterApp: () => void;
  onQuickViewLandmark: (landmark: Landmark) => void;
}

export default function AILanding({ lang, setLang, onEnterApp, onQuickViewLandmark }: AILandingProps) {
  const t = (key: string) => translations[key]?.[lang] || key;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Elegant Atlas & Celestial Caravan Routes Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Historical trade spots representing caravan checkpoints on the Silk Road
    interface TradePost {
      x: number;
      y: number;
      label: string;
      labelRu: string;
      labelKk: string;
      pulseRate: number;
    }

    const tradePosts: TradePost[] = [
      { x: width * 0.28, y: height * 0.72, label: "TURKISTAN (YASAWI)", labelRu: "ТУРКЕСТАН", labelKk: "ТҮРКІСТАН", pulseRate: 0.015 },
      { x: width * 0.42, y: height * 0.64, label: "OTYRAR", labelRu: "ОТРАР", labelKk: "ОТЫРАР", pulseRate: 0.012 },
      { x: width * 0.76, y: height * 0.45, label: "ALTAY (TAMGALY)", labelRu: "ТАМГАЛЫ", labelKk: "ТАМҒАЛЫ", pulseRate: 0.02 },
      { x: width * 0.52, y: height * 0.78, label: "TARAZ (AISHA BIBI)", labelRu: "ТАРАЗ", labelKk: "ТАРАЗ", pulseRate: 0.009 },
      { x: width * 0.65, y: height * 0.58, label: "TALGARI COOP", labelRu: "ТАЛГАРСКИЙ ПОСТ", labelKk: "ТАЛҒАР БЕКЕТІ", pulseRate: 0.01 }
    ];

    // Soft starry golden night sky over the steppes
    const stars = Array.from({ length: 85 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.9,
      size: Math.random() * 1.3 + 0.4,
      alpha: Math.random() * 0.4 + 0.15,
      flicker: Math.random() * 0.012 + 0.003
    }));

    let compassRotation = 0;

    const drawCompassRose = (cx: number, cy: number, radius: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(compassRotation);

      // Outer compass ring
      ctx.strokeStyle = "rgba(140, 98, 57, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(140, 98, 57, 0.03)";
      ctx.beginPath();
      ctx.arc(0, 0, radius - 8, 0, Math.PI * 2);
      ctx.stroke();

      // Cardinal lines
      ctx.strokeStyle = "rgba(140, 98, 57, 0.12)";
      ctx.beginPath();
      ctx.moveTo(0, -radius); ctx.lineTo(0, radius);
      ctx.moveTo(-radius, 0); ctx.lineTo(radius, 0);
      ctx.stroke();

      // Compass points (North, South, East, West blades)
      ctx.fillStyle = "rgba(140, 98, 57, 0.12)";
      // North
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-6, -radius + 15); ctx.lineTo(0, -radius); ctx.fill();
      ctx.fillStyle = "rgba(140, 98, 57, 0.05)";
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(6, -radius + 15); ctx.lineTo(0, -radius); ctx.fill();

      // South
      ctx.fillStyle = "rgba(140, 98, 57, 0.12)";
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(6, radius - 15); ctx.lineTo(0, radius); ctx.fill();
      ctx.fillStyle = "rgba(140, 98, 57, 0.05)";
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-6, radius - 15); ctx.lineTo(0, radius); ctx.fill();

      ctx.restore();
    };

    const drawAtlasGrid = () => {
      // Ancient Atlas latitude/longitude curves
      ctx.strokeStyle = "rgba(140, 98, 57, 0.02)";
      ctx.lineWidth = 0.5;

      const centerX = width * 0.5;
      const centerY = height * 1.5; // curved arc center far below the screen

      // Drawing longitudinal curves from center bottom
      for (let r = height * 1.1; r < height * 1.7; r += 50) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, Math.PI * 1.3, Math.PI * 1.7);
        ctx.stroke();
      }

      // Latitudinal lines projecting outwards
      for (let angle = Math.PI * 1.35; angle <= Math.PI * 1.65; angle += 0.05) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * height * 1.8, centerY + Math.sin(angle) * height * 1.8);
        ctx.stroke();
      }
    };

    let pulseStep = 0;

    const render = () => {
      // Clear with step background colors: warm historical light parchment hues
      ctx.fillStyle = "#FAF6F0";
      ctx.fillRect(0, 0, width, height);

      // Warm radial lighting from the center to represent delicate museum twilight
      const radialGradient = ctx.createRadialGradient(width * 0.5, height * 0.45, 50, width * 0.5, height * 0.5, width * 0.8);
      radialGradient.addColorStop(0, "#FAF6F0");
      radialGradient.addColorStop(0.5, "#FAF0E4");
      radialGradient.addColorStop(1, "#FAF1E6");
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw geographic atlas grid lines
      drawAtlasGrid();

      // Draw starry ambient sky with soft gold sparkles
      stars.forEach((star) => {
        star.alpha += star.flicker;
        if (star.alpha > 0.6 || star.alpha < 0.1) {
          star.flicker = -star.flicker;
        }
        ctx.fillStyle = `rgba(184, 144, 71, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Slowly rotate ancient compass rose in background
      compassRotation += 0.0004;
      drawCompassRose(width * 0.72, height * 0.48, width * 0.18 + 40);

      // Connect Caravan Trading Posts with ancient dotted pathways (The Great Silk Road)
      ctx.strokeStyle = "rgba(140, 98, 57, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      for (let i = 0; i < tradePosts.length - 1; i++) {
        ctx.moveTo(tradePosts[i].x, tradePosts[i].y);
        ctx.lineTo(tradePosts[i + 1].x, tradePosts[i + 1].y);
      }
      ctx.lineTo(tradePosts[0].x, tradePosts[0].y);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      pulseStep += 0.03;

      // Render Caravan nodes – ancient copper lanterns of history
      tradePosts.forEach((post) => {
        const pulseRatio = 1 + Math.sin(pulseStep * post.pulseRate * 12) * 0.4;
        
        ctx.fillStyle = "#B89047";
        ctx.beginPath();
        ctx.arc(post.x, post.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(140, 98, 57, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(post.x, post.y, 8 * pulseRatio, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(42, 157, 144, 0.1)";
        ctx.beginPath();
        ctx.arc(post.x, post.y, 15 * pulseRatio, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(115, 86, 62, 0.7)";
        ctx.font = "bold 8px 'Cinzel', serif";
        const labelText = lang === "ru" ? post.labelRu : lang === "kk" ? post.labelKk : post.label;
        ctx.fillText(labelText, post.x + 10, post.y + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#35261A] flex flex-col justify-between font-sans relative overflow-hidden select-none">
      
      {/* Animated old-atlas canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Heritage Header status bar */}
      <header className="border-b border-[#E8DFC8]/60 bg-[#FFFFFA]/90 backdrop-blur-md relative z-10 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <KoshkarMuiiz className="text-[#8C6239] w-6 h-6 shrink-0" />
          <span className="text-[10px] font-display font-semibold tracking-widest text-[#35261A] uppercase">
            {t("unescoNASA")}
          </span>
        </div>

        {/* Elegant visual controls & Language Selectors */}
        <div className="flex items-center gap-6">
          <div className="flex gap-1 border border-[#E0D6C3] bg-[#EFE8DC] p-1 rounded-xl backdrop-blur-md self-center">
            {(["en", "kk", "ru"] as Language[]).map((ln) => (
              <button
                key={ln}
                onClick={() => setLang(ln)}
                className={`px-3 py-1 text-[9px] font-mono tracking-wider font-extrabold rounded-lg uppercase transition-colors duration-200 ${
                  lang === ln ? "bg-[#8C6239] text-white shadow-sm" : "text-[#665445] hover:text-[#35261A]"
                }`}
              >
                {ln}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[#2A9D90] text-[10px] font-mono tracking-widest font-extrabold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2A9D90] animate-ping" />
            {t("systemStatus")}
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-10 md:py-16 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* Left Side Content description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 border border-[#8C6239]/20 bg-[#EFE8DC]/40 px-4 py-2 rounded-full shadow-sm">
            <span className="text-[9px] font-display font-bold tracking-widest text-[#8C6239] uppercase flex items-center gap-1">
              <Star size={11} className="fill-[#8C6239] text-[#8C6239]" />
              {lang === "ru"
                ? "НАЦИОНАЛЬНЫЙ ИИ-ПРОЕКТ ИССЛЕДОВАНИЯ И РЕСТАВРАЦИИ"
                : lang === "kk"
                ? "ҰЛТТЫҚ AI ЗЕРТТЕУ ЖӘНЕ РЕСТАВРАЦИЯ ЖОБАСЫ"
                : "NATIONAL AI RESTORATION & EXPEDITION SYSTEM"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-wider leading-none uppercase text-[#35261A]">
            <span>{t("appName")}</span>
            <span className="text-[#8C6239] block mt-1">
              {lang === "ru" ? "МҰРА ПЛАТФОРМАСЫ" : lang === "kk" ? "МҰРА ПЛАТФОРМАСЫ" : "HERITAGE PLATFORM"}
            </span>
          </h1>

          <div className="w-24 h-[1.5px] bg-gradient-to-r from-[#8C6239] to-transparent my-1" />

          <p className="text-sm md:text-base text-[#665445] font-serif italic leading-relaxed max-w-xl">
            "{t("discoverMission")}"
          </p>

          <p className="text-xs text-[#8C765C] leading-relaxed font-sans max-w-lg">
            {t("scienceGradePreservation")}
          </p>

          {/* Large dynamic entrance button */}
          <div className="pt-4">
            <button
              onClick={onEnterApp}
              className="px-8 py-4 bg-[#8C6239] hover:bg-[#704D2E] text-white font-display font-extrabold text-xs tracking-widest rounded-xl shadow-[0_4px_24px_rgba(140,98,57,0.15)] hover:shadow-[0_4px_30px_rgba(140,98,57,0.3)] transition-all duration-300 transform hover:scale-[1.01] active:scale-98 flex items-center gap-3 uppercase text-center cursor-pointer"
            >
              {t("launchConsole")}
              <ArrowRight size={14} className="stroke-[3px]" />
            </button>
          </div>
        </div>

        {/* Right side elegant museum exhibit plate */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <div className="bg-[#FFFFFC] border border-[#EBE3D3] rounded-3xl p-6 backdrop-blur-md relative overflow-hidden shadow-[0_6px_25px_rgba(140,98,57,0.06)] space-y-4">
            {/* Visual golden corners */}
            <div className="absolute top-0 right-0">
              <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
            </div>
            <div className="absolute bottom-0 left-0 transform rotate-180">
              <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
            </div>

            <span className="text-[9px] text-[#2A9D90] font-display font-bold tracking-widest block uppercase border-b border-[#E8DFC8]/50 pb-2">
              {lang === "ru"
                ? "АРХЕОЛОГИЧЕСКИЙ РЕЕСТР ОБЪЕКТОВ"
                : lang === "kk"
                ? "АРХЕОЛОГИЯЛЫҚ НЫСАНДАР РЕЕСТРІ"
                : "ARCHAEOLOGICAL MONUMENT REGISTER"}
            </span>

            {/* Quick overview of landmark selections */}
            <div className="space-y-3 font-sans">
              {defaultLandmarks.map((loc) => {
                const isCritIdx = loc.riskLevel === "CRITICAL";
                return (
                  <div
                    key={loc.id}
                    onClick={() => onQuickViewLandmark(loc)}
                    className="flex justify-between items-center p-3 bg-[#FAF7F2] hover:bg-[#EFE8DC]/30 border border-[#E8DFC8]/45 hover:border-[#8C6239]/35 rounded-xl cursor-pointer transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#35261A] font-serif leading-snug">
                        {loc.name[lang]}
                      </span>
                      <span className="text-[8px] text-[#8C765C]/80 uppercase tracking-wider font-mono block mt-0.5">
                        {loc.region[lang]}
                      </span>
                    </div>
                    <span
                      className={`text-[8px] px-2 py-0.5 rounded font-extrabold font-mono tracking-wide flex items-center gap-1 border ${
                        isCritIdx
                          ? "bg-red-50 text-red-650 border-red-200"
                          : "bg-orange-50 text-orange-650 border-orange-200"
                      }`}
                    >
                      RISK: {loc.riskScore}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Grid of academic innovation highlights */}
      <section className="bg-[#FAF8F5]/30 border-t border-[#E8DFC8]/60 relative z-10 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="p-5 bg-[#FFFFFB] border border-[#EFECE5] rounded-2xl space-y-3 relative group hover:border-[#8C6239]/40 transition-colors duration-300 shadow-sm">
            <div className="absolute top-0 right-0 p-1 opacity-20">
              <OrnamentalCorner className="w-4 h-4 text-[#8C6239]" />
            </div>
            <div className="text-[#2A9D90]">
              <Compass size={18} />
            </div>
            <span className="font-display font-medium text-[#35261A] block uppercase text-[10px] tracking-wider">
              {t("scanner").toUpperCase()} OVERLAYS
            </span>
            <p className="text-[#665445] leading-relaxed text-[11px]">
              {lang === "ru"
                ? "Высокоточное компьютерное зрение со спектральным анализом выветривания и глубины трещин глины."
                : lang === "kk"
                ? "Компьютерлік көру арқылы саздағы жарықшақтар мен жел эрозиясын жоғары дәлдікпен спектрлік талдау."
                : "Multi-channel spectral computer vision detects brick weathering, clay dampness, and micro-cracks immediately."}
            </p>
          </div>

          <div className="p-5 bg-[#FFFFFB] border border-[#EFECE5] rounded-2xl space-y-3 relative group hover:border-[#8C6239]/40 transition-colors duration-300 shadow-sm">
            <div className="absolute top-0 right-0 p-1 opacity-20">
              <OrnamentalCorner className="w-4 h-4 text-[#8C6239]" />
            </div>
            <div className="text-[#8C6239]">
              <BookOpen size={18} />
            </div>
            <span className="font-display font-medium text-[#35261A] block uppercase text-[10px] tracking-wider">
              {t("reconstruction").toUpperCase()} SLIDERS
            </span>
            <p className="text-[#665445] leading-relaxed text-[11px]">
              {lang === "ru"
                ? "Цифровые слайдеры реставрации восстанавливают утраченные архитектурные элементы и пигменты эпох."
                : lang === "kk"
                ? "Реставрациялық сандық слайдерлер жоғалған сәулет элементтерін ең жақсы тарихи сызбалармен қалпына келтіреді."
                : "Interactive digital sliders restore historical pigments and construct ruined structures geometrically over centuries."}
            </p>
          </div>

          <div className="p-5 bg-[#FFFFFB] border border-[#EFECE5] rounded-2xl space-y-3 relative group hover:border-[#8C6239]/40 transition-colors duration-300 shadow-sm">
            <div className="absolute top-0 right-0 p-1 opacity-20">
              <OrnamentalCorner className="w-4 h-4 text-[#8C6239]" />
            </div>
            <div className="text-[#8C6239]">
              <Sparkles size={18} />
            </div>
            <span className="font-display font-medium text-[#35261A] block uppercase text-[10px] tracking-wider">
              DEGRADATION PROJECTION
            </span>
            <p className="text-[#665445] leading-relaxed text-[11px]">
              {lang === "ru"
                ? "Проекционные климатические модели ЮНЕСКО вычисляют прогноз разрушения памятников на 10 лет вперед."
                : lang === "kk"
                ? "ЮНЕСКО климаттық болжау үлгісі тарихи ескерткіштердің 10 жылға дейінгі тозу қарқынын есептейді."
                : "Preservation forecasts powered by official UNESCO formulas project masonry decay up to 10 years into the future."}
            </p>
          </div>

          <div className="p-5 bg-[#FFFFFB] border border-[#EFECE5] rounded-2xl space-y-3 relative group hover:border-[#8C6239]/40 transition-colors duration-300 shadow-sm">
            <div className="absolute top-0 right-0 p-1 opacity-20">
              <OrnamentalCorner className="w-4 h-4 text-[#8C6239]" />
            </div>
            <div className="text-[#2A9D90]">
              <Star size={18} />
            </div>
            <span className="font-display font-medium text-[#35261A] block uppercase text-[10px] tracking-wider">
              SPECTRAL RECONSTRUCTION
            </span>
            <p className="text-[#665445] leading-relaxed text-[11px]">
              {lang === "ru"
                ? "Интерфейс исследования трехмерных моделей под разным углом лазера для микросейсмического контроля."
                : lang === "kk"
                ? "Микросейсмикалық бақылау үшін әртүрлі лазер бұрыштары бар үш өлшемді инженерлік модельдерді зерттеу."
                : "Interrogate high-definition 3D wireframe models under multi-axis rotations and thermographic depth filters."}
            </p>
          </div>

        </div>
      </section>

      {/* Elegant museum feet */}
      <footer className="border-t border-[#E8DFC8]/60 bg-[#FAF1E6] py-5 px-6 flex flex-col sm:flex-row justify-between items-center text-[9px] font-display text-[#8C765C] uppercase tracking-widest gap-2 relative z-10">
        <span>НАЦИОНАЛЬНЫЙ ИИ-КООРДИНАТОР СОХРАНЕНИЯ НАСЛЕДИЯ КАЗАХСТАНА © 2026</span>
        <div className="flex items-center gap-1.5 text-[#8C6239]">
          <span>СОВМЕСТНО С ЮНЕСКО</span>
          <KoshkarMuiiz className="w-3.5 h-3.5" />
        </div>
      </footer>

    </div>
  );
}
