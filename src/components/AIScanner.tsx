import React, { useState, useRef } from "react";
import { Landmark, Language, ScannerAnalysisResult } from "../types";
import { translations } from "../translations";
import { Upload, Camera, Trash2, Sliders, ShieldAlert, Check, RefreshCw, Cpu, Activity } from "lucide-react";
import { OrnamentalCorner } from "./OrnamentKit";

interface AIScannerProps {
  lang: Language;
  selectedLandmark: Landmark;
  onUpdateLandmarkRisk: (landmarkId: string, alertScore: number, crackD: number) => void;
}

export default function AIScanner({ lang, selectedLandmark, onUpdateLandmarkRisk }: AIScannerProps) {
  const t = (key: string) => translations[key]?.[lang] || key;

  const [image, setImage] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>("image/jpeg");
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScannerAnalysisResult | null>(null);
  const [heatmapToggle, setHeatmapToggle] = useState<boolean>(true);

  // References
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Static sample templates for instant calibration
  const samples = [
    {
      id: "sample_brick_fracture",
      name: { en: "Yasawi Pier Brick Degradation", kk: "Ясауи кірпіш эрозиясы", ru: "Разрушение кирпичной кладки Ясави" },
      url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='100%' height='100%' fill='%23F5EFE6'/><path d='M10,80 L80,80 M120,80 L220,80 M240,80 L400,80' stroke='%238C765C' stroke-width='4' stroke-opacity='0.3'/><path d='M10,160 L140,160 M180,160 L380,160' stroke='%238C765C' stroke-width='4' stroke-opacity='0.3'/><path d='M120,80 L120,160 M240,80 L240,160' stroke='%238C765C' stroke-width='4' stroke-opacity='0.3'/><path d='M140,160 L140,250 M260,160 L260,250' stroke='%238C765C' stroke-width='4' stroke-opacity='0.3'/><path d='M80,0 L80,80 M200,0 L200,80' stroke='%238C765C' stroke-width='4' stroke-opacity='0.3'/><path d='M30,30 Q35,50 32,80 T37,140 T30,220' fill='none' stroke='%238C6239' stroke-width='2.5' stroke-dasharray='1,1'/><text x='50' y='120' fill='%238C6239' font-size='10' font-family='monospace' font-weight='bold'>SAMPLE BRICKWORK CALIB</text></svg>"
    },
    {
      id: "sample_rock_petro",
      name: { en: "Tamgaly Slate Split", kk: "Тамғалы тақтатас сынығы", ru: "Поперечный скол сланца Тамгалы" },
      url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='100%' height='100%' fill='%23EFECE6'/><path d='M0,100 Q150,120 220,90 T400,110' fill='none' stroke='%238C765C' stroke-width='4' stroke-opacity='0.3'/><path d='M180,95 Q200,160 190,250' fill='none' stroke='%23C0392B' stroke-width='3'/><path d='M100,50 Q110,95 105,102' fill='none' stroke='%23D35400' stroke-width='2'/><text x='50' y='50' fill='%232A9D90' font-size='10' font-family='monospace' font-weight='bold'>SAMPLE ROCK SEAM CALIB</text></svg>"
    }
  ];

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processImageFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageMime(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setScanResult(null); // Clear previous scan results
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const selectFileManual = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // Live Camera handlers
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn("Camera init failed, using fallback mock snapshot capture:", err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const screenshot = canvas.toDataURL("image/jpeg");
        setImage(screenshot);
        setImageMime("image/jpeg");
        stopCamera();
      }
    } else {
      // Mock capture if stream is blocked in sandbox iframe
      setImage(samples[0].url);
      setCameraActive(false);
    }
  };

  // Run AI analysis using the REST service on express backend
  const executeAIScan = async () => {
    if (!image) return;
    setScanning(true);
    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: image,
          mimeType: imageMime,
          landmarkId: selectedLandmark.id,
          landmarkName: selectedLandmark.name.en
        })
      });

      const data = await response.json();
      setScanResult(data);
      
      // Update the parent's landmark state with the new risk and density
      if (data.riskScore && data.crackDensity) {
        onUpdateLandmarkRisk(selectedLandmark.id, data.riskScore, data.crackDensity);
      }
    } catch (err) {
      console.error("AI scanning REST call caught error:", err);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 font-sans">
      
      {/* Upload & Source block */}
      <div className="xl:col-span-2 space-y-4">
        <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-5 relative overflow-hidden shadow-sm">
          
          <div className="absolute top-0 right-0 p-1">
            <OrnamentalCorner className="w-5 h-5 text-[#8C6239]/20" />
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-[#E8DFC8]/50 mb-4">
            <h3 className="text-sm font-serif font-bold tracking-wide text-[#35261A] uppercase flex items-center gap-2">
              <Cpu size={15} className="animate-pulse text-[#8C6239]" />
              {t("uploadTitle")}
            </h3>
            {image && (
              <button
                onClick={() => {
                  setImage(null);
                  setScanResult(null);
                }}
                className="text-xs text-red-650 hover:text-red-805 flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 font-mono tracking-wider transition-colors duration-200 font-bold"
              >
                <Trash2 size={12} />
                CLEAN UNIT
              </button>
            )}
          </div>

          {/* Camera View Mode */}
          {cameraActive ? (
            <div className="relative w-full aspect-[16/10] max-h-[380px] bg-[#FAF7F2] border border-[#2A9D90]/40 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
              <video ref={videoRef} className="w-full h-full object-cover" />
              
              {/* Tactical academic UI grid lines on Camera stream */}
              <div className="absolute inset-0 pointer-events-none border-2 border-[#2A9D90]/25 m-6 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2A9D90]/70 font-mono text-[9px] pointer-events-none tracking-widest uppercase font-bold">
                + ALIGNING OPTICAL COMPRESSION
              </div>

              <div className="absolute bottom-4 flex gap-3 z-10">
                <button
                  onClick={captureFrame}
                  className="px-4 py-2 bg-[#8C6239] hover:bg-amber-950 text-white font-display font-medium text-[10px] tracking-widest rounded-xl shadow-md active:scale-98 transition-all uppercase"
                >
                  TRIGGER SNAPSHOT
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 bg-[#FFFFFC] text-[#35261A] border border-[#E8DFC8] font-display text-[10px] tracking-widest rounded-xl"
                >
                  ABORT
                </button>
              </div>
            </div>
          ) : !image ? (
            /* Standard drag field */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[280px] transition-all duration-300 ${
                dragOver
                  ? "border-[#8C6239] bg-[#8C6239]/5"
                  : "border-[#E8DFC8] bg-[#FAF8F5] hover:border-[#2A9D90]/40 hover:bg-[#FFFFFC]"
              }`}
            >
              <Upload size={35} className={`mb-3 ${dragOver ? "text-[#8C6239] animate-bounce" : "text-[#8C765C]/60"}`} />
              <div className="text-xs font-serif font-bold tracking-wide text-[#35261A] mb-2 uppercase">
                {dragOver ? t("dropActive") : t("dragDropText")}
              </div>
              <p className="text-[10px] text-[#8C765C] max-w-sm uppercase font-mono tracking-wider">
                SPECTRAL MEDIA EXPOSURES ACCEPTED: PNG, JPG, BMP OR GEO-JSON FILES
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={selectFileManual}
                className="hidden"
              />
              <div className="mt-6 flex flex-wrap gap-2.5 justify-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 border border-[#E8DFC8] rounded-xl bg-white hover:border-[#2A9D90] text-[#665445] hover:text-[#35261A] font-medium text-[10px] tracking-wider uppercase flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Camera size={12} className="text-[#2A9D90]" />
                  {t("useCameraBtn")}
                </button>
              </div>
            </div>
          ) : (
            /* Selected Uploaded file display */
            <div className="relative border border-[#EFECE5] rounded-2xl overflow-hidden bg-[#FAF7F2] aspect-[16/10] max-h-[380px] flex items-center justify-center group shadow-inner">
              <img
                src={image}
                alt="Uploaded matrix calibration source"
                className="max-h-full max-w-full object-contain filter contrast-[1.05]"
              />

              {/* Multi-spectral Scanning beams */}
              {scanning && (
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(42,157,144,0.18),transparent)] h-10 top-0 pointer-events-none" style={{ animation: "scanLine 2.2s linear infinite" }} />
              )}

              {/* Thermal Damage Heatmap indicators */}
              {scanResult && heatmapToggle && (
                <div className="absolute inset-0 pointer-events-none">
                  {scanResult.heatmapData.map((heat, i) => (
                    <div
                      key={i}
                      style={{
                        left: `${heat.x}%`,
                        top: `${heat.y}%`,
                        width: `${heat.radius * 2.2}%`,
                        height: `${heat.radius * 2.2}%`,
                        transform: "translate(-50%, -50%)",
                        opacity: heat.intensity * 0.4
                      }}
                      className="absolute rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-transparent blur-md mix-blend-multiply animate-pulse"
                    />
                  ))}

                  {/* Draw Detected Crack Channels */}
                  <svg className="absolute inset-0 w-full h-full">
                    {scanResult.cracks.map((crack, idx) => {
                      const pointsStr = crack.points.map(([x, y]) => `${x}%,${y}%`).join(" ");
                      return (
                        <g key={idx}>
                          <polyline
                            points={pointsStr}
                            className="fill-none stroke-red-600 animate-pulse"
                            strokeWidth={crack.width * 1.5}
                            style={{ vectorEffect: "non-scaling-stroke", left: 0, top: 0 }}
                          />
                          {/* Outer glowing trace line */}
                          <polyline
                            points={pointsStr}
                            className="fill-none stroke-orange-500 opacity-30"
                            strokeWidth={crack.width * 4}
                            style={{ vectorEffect: "non-scaling-stroke" }}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}

              {/* Spot Marker Coordinates Annotations overlay */}
              {scanResult && (
                <div className="absolute inset-0 pointer-events-none">
                  {scanResult.annotations.map((anno, index) => (
                    <div
                      key={index}
                      style={{ left: `${anno.x}%`, top: `${anno.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-30 pointer-events-auto cursor-pointer"
                    >
                      <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] animate-pulse" />
                      <div className="absolute bottom-4 py-1.5 px-3 rounded-xl bg-white border border-[#E8DFC8] text-[9px] font-mono text-[#35261A] whitespace-nowrap shadow-[0_4px_12px_rgba(140,98,57,0.1)] hidden group-hover:block transition-all duration-300">
                        {anno.text[lang]} [W:{scanResult.cracks[index]?.width || "0.6"}mm]
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Floating Camera Status Coordinates */}
              <div className="absolute top-4 left-4 bg-[#FFFFFB]/95 px-2.5 py-1 rounded-xl text-[8px] font-mono text-[#8C765C] border border-[#E8DFC8]/75 pointer-events-none shadow-sm uppercase font-bold">
                LDR SOURCE FILE: {imageMime.toUpperCase()}
              </div>
            </div>
          )}

          {image && !scanning && !scanResult && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={executeAIScan}
                className="w-full sm:w-auto px-6 py-3 bg-[#8C6239] hover:bg-amber-950 text-white font-display font-bold text-[10px] tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 uppercase cursor-pointer"
              >
                <Cpu size={14} />
                RUN OPTICAL MAPPING ANALYSIS
              </button>
            </div>
          )}

          {scanning && (
            <div className="mt-4 bg-[#2A9D90]/5 border border-[#2A9D90]/20 px-4 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-[#2A9D90] animate-spin shrink-0" />
              <div className="text-xs font-sans">
                <div className="font-serif font-bold text-[#2A9D90] uppercase tracking-wide">{t("scanRunning")}</div>
                <div className="text-[#8C765C] text-[10px] mt-0.5">{t("scanningDesc")}</div>
              </div>
            </div>
          )}
        </div>

        {/* UNESCO Calibration standards shelf */}
        {!image && (
          <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-5 shadow-sm">
            <h4 className="text-[10px] tracking-widest text-[#8C6239] font-serif font-extrabold mb-3 uppercase">
              {t("sampleImages")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {samples.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => {
                    setImage(sample.url);
                    setImageMime("image/svg+xml");
                    setScanResult(null);
                  }}
                  className="bg-[#FAF7F2] border border-[#E8DFC8]/45 hover:border-[#8C6239]/50 rounded-xl p-2.5 cursor-pointer flex items-center gap-3 transition-colors duration-200"
                >
                  <div className="w-12 h-10 shrink-0 bg-white border border-[#E8DFC8]/50 rounded-md flex items-center justify-center overflow-hidden">
                    <img src={sample.url} className="h-full w-full object-cover" alt="sample" />
                  </div>
                  <div className="text-[11px] font-sans font-semibold">
                    <span className="text-[#35261A] block leading-snug">
                      {sample.name[lang]}
                    </span>
                    <span className="text-[#8C765C] font-mono text-[8px] tracking-wider uppercase block mt-0.5 font-bold">
                      SPECTRAL PLATE_SEC_LDF
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Intelligence Stats Result Dashboard */}
      <div>
        {scanResult ? (
          <div className="space-y-4">
            
            {/* Main Score panel */}
            <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-5 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-1">
                <OrnamentalCorner className="w-5 h-5 text-[#8C6239]/20" />
              </div>
              
              <h3 className="text-[10px] tracking-widest text-[#8C765C]/80 font-mono mb-4 uppercase font-bold">
                {t("aiConfidence")}
              </h3>

              <div className="flex items-center justify-between gap-4 border-b border-[#E8DFC8]/40 pb-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold tracking-wide text-[#35261A]">
                    {scanResult.confidenceScore}%
                  </span>
                  <span className="text-[8px] font-mono text-[#2A9D90] tracking-widest uppercase mt-0.5 font-bold">
                    MODEL FIDELITY LEVEL
                  </span>
                </div>
                <div className="bg-[#2A9D90]/5 border border-[#2A9D90]/20 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-xs text-[#2A9D90] font-mono tracking-wider font-extrabold">
                    SECURE SIGNED
                  </span>
                </div>
              </div>

              {/* Dynamic Health scores */}
              <div className="space-y-4 font-sans">
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#665445] mb-1">
                    <span className="uppercase font-bold">{t("heritageRiskScore")}</span>
                    <span className={scanResult.riskScore > 75 ? "text-red-650 font-extrabold" : "text-[#8C6239] font-bold"}>
                      {scanResult.riskScore} / 100
                    </span>
                  </div>
                  <div className="w-full bg-[#EFE8DC]/30 h-2.5 rounded-full overflow-hidden border border-[#E8DFC8]/60">
                    <div
                      style={{ width: `${scanResult.riskScore}%` }}
                      className={`h-full rounded-full transition-all duration-1000 ${
                        scanResult.riskScore > 75
                          ? "bg-red-500"
                          : "bg-gradient-to-r from-[#2A9D90] to-[#8C6239]"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#FAF7F2] border border-[#EFE8DC] p-3.5 rounded-2xl">
                    <span className="text-[9px] text-[#8C765C] font-mono uppercase block font-bold">
                      {t("crackDensity").split(" ")[0]} DEVIATION
                    </span>
                    <span className="text-lg font-bold text-[#35261A] font-mono block mt-1">
                      {scanResult.crackDensity} <span className="text-xs text-[#8C765C]">m/m²</span>
                    </span>
                  </div>

                  <div className="bg-[#FAF7F2] border border-[#EFE8DC] p-3.5 rounded-2xl">
                    <span className="text-[9px] text-[#8C765C] font-mono uppercase block font-bold">
                      {t("surfaceDamage").split(" ")[0]} DEGRAD
                    </span>
                    <span className="text-lg font-bold text-[#35261A] font-mono block mt-1">
                      {scanResult.surfaceDamagePercentage}%
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] text-[#8C765C] font-mono block uppercase mb-1 font-bold">
                    {t("degradationLevel")}
                  </span>
                  <div className="px-3 py-2 rounded-xl text-[10px] bg-red-50 border border-red-200 text-red-655 font-mono tracking-wider font-bold uppercase text-center">
                    ENVIRONMENT ENVELOPE: {scanResult.degradationLevel}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DFC8]/40">
                  <span className="text-[9px] text-[#8C765C] font-mono block uppercase mb-1.5 font-bold">
                    {t("predictedFuture")}
                  </span>
                  <p className="text-xs text-[#665445] italic leading-relaxed font-serif">
                    "{scanResult.predictedFutureCondition[lang]}"
                  </p>
                </div>
              </div>
            </div>

            {/* Speclines controls toggle metadata */}
            <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-4 space-y-3 shadow-sm">
              <h4 className="text-[9px] tracking-widest text-[#2A9D90] font-serif font-extrabold uppercase">
                {t("annotationsHeader")}
              </h4>

              <div className="space-y-2 font-sans">
                <button
                  onClick={() => setHeatmapToggle(!heatmapToggle)}
                  className={`w-full py-2.5 px-3.5 rounded-xl border text-[10px] font-semibold tracking-wide transition-all duration-200 text-left flex justify-between items-center cursor-pointer ${
                    heatmapToggle
                      ? "bg-[#2A9D90]/5 text-[#2A9D90] border-[#2A9D90]/25 shadow-sm"
                      : "bg-[#FAF7F2] text-[#8C765C] border-[#E8DFC8]/70"
                  }`}
                >
                  <span>{t("toggleHeatmap")}</span>
                  {heatmapToggle ? <span className="text-[8px] bg-[#2A9D90] text-white px-2 py-0.5 rounded font-bold">ON</span> : <span className="text-[8px] bg-[#EFE8DC] text-[#665445] px-2 py-0.5 rounded font-bold">OFF</span>}
                </button>
              </div>

              <div className="text-[8px] font-mono text-[#8C765C] space-y-1 pt-2 border-t border-[#E8DFC8]/40 uppercase">
                <div>AI REPORT BLOCK: UN-TMR-SEC-92</div>
                <div>CLASSIFIER: Convolutional Residual Segmentation v2.05</div>
                <div>DETECTIONS: {scanResult.cracks.length} Fault Fractures Located</div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty hud before upload/calibration */
          <div className="bg-[#FAF7F2] border border-[#EFE8DC] rounded-3xl p-6 text-center text-[#8C765C] flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden shadow-inner">
            <Sliders size={30} className="text-[#8C765C]/40 mb-3 animate-pulse" />
            <h4 className="text-xs font-serif text-[#35261A] font-bold uppercase tracking-widest">
              SCANNER METRIC HUD STANDBY
            </h4>
            <p className="text-[9px] font-mono max-w-sm mt-3 uppercase text-[#8C765C] leading-relaxed">
              Inject a high-res geological snapshot or select a reference coordinate on the Kazakhstan map above to generate instant multi-spectral diagnostic overlays.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
