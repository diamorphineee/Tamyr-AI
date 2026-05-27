import React, { useState } from "react";
import { Landmark, Language } from "../types";
import { defaultLandmarks } from "../data";
import { translations } from "../translations";
import { FileText, Cpu, Download, CheckSquare, Sparkles, Database, File, RefreshCw } from "lucide-react";

interface ResearchDashboardProps {
  lang: Language;
  selectedLandmark: Landmark;
}

export default function ResearchDashboard({ lang, selectedLandmark }: ResearchDashboardProps) {
  const t = (key: string) => translations[key]?.[lang] || key;

  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [reportResult, setReportResult] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Calls the server-side express /api/gemini/report route 
  const fetchScientificAIReport = async () => {
    setGeneratingReport(true);
    setReportResult(null);
    try {
      const response = await fetch("/api/gemini/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ landmark: selectedLandmark })
      });
      const data = await response.json();
      setReportResult(data.report || "");
    } catch (err) {
      console.error("AI Report generation fetch failed:", err);
    } finally {
      setGeneratingReport(false);
    }
  };

  // Triggers official scientific standard download log
  const downloadReportFile = () => {
    if (!reportResult) return;
    setDownloadSuccess(true);
    
    const blob = new Blob([reportResult], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `TAMYR_AI_PRESERVATION_REPORT_${selectedLandmark.id.toUpperCase()}_2026.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 font-sans">
      
      {/* Comparative landmarks integrity matrix */}
      <div className="xl:col-span-2 space-y-4">
        <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-5 relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E8DFC8]/40 mb-4">
            <Database className="text-[#8C6239]" size={15} />
            <h3 className="text-sm font-bold tracking-widest text-[#35261A] font-serif uppercase animate-pulse">
              {t("materialsComparative")}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="text-[10px] text-[#8C765C] font-mono border-b border-[#E8DFC8]/40 uppercase tracking-widest font-bold">
                <tr>
                  <th className="py-3 px-2">Landmark Site</th>
                  <th className="py-3 px-2 text-center">Structural Material</th>
                  <th className="py-3 px-2 text-center">Risk Index</th>
                  <th className="py-3 px-2 text-center">Erosion %</th>
                  <th className="py-3 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFC8]/30 font-sans text-[#665445]">
                {defaultLandmarks.map((loc) => {
                  const isSelected = selectedLandmark.id === loc.id;
                  return (
                    <tr
                      key={loc.id}
                      className={`hover:bg-[#8C6239]/5 transition-colors duration-150 ${
                        isSelected ? "bg-[#8C6239]/5 font-semibold" : ""
                      }`}
                    >
                      <td className="py-3.5 px-2 font-bold text-[#35261A] flex items-center gap-2">
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239] animate-ping" />}
                        {loc.name[lang]}
                      </td>
                      <td className="py-3.5 px-2 text-center text-[#8C765C] max-w-[150px] truncate">
                        {loc.material[lang]}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-[#35261A]">
                        {loc.riskScore}/100
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-[#35261A]">
                        {loc.metrics.surfaceErosion}%
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono">
                        <span
                          className={`inline-block text-[9px] px-2 py-0.5 rounded-lg border font-bold ${
                            loc.riskLevel === "CRITICAL"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : loc.riskLevel === "HIGH"
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : "bg-[#2A9D90]/5 text-[#2A9D90] border-[#2A9D90]/25"
                          }`}
                        >
                          {loc.riskLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Neural Analysis comparative levels */}
        <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-5 shadow-sm">
          <h4 className="text-[10px] tracking-widest text-[#8C6239] font-mono font-bold mb-4 uppercase">
            SOCIALLY LINKED PRESERVATION LOGS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-[#FAF7F2] border border-[#E8DFC8]/50 rounded-2xl shadow-sm">
              <span className="font-bold text-[#35261A] block mb-1">UNESCO COOPERATIVE REGISTRY</span>
              <p className="text-[#8C765C] leading-relaxed text-[11px] font-medium">
                TAMYR AI connects with regional archaeological registers under the Central Asia Silk Road corridor initiative. All diagnostics are archived dynamically to physical cold-storage backups in Astana and Turkistan regional research hubs.
              </p>
            </div>
            <div className="p-3 bg-[#FAF7F2] border border-[#E8DFC8]/50 rounded-2xl shadow-sm">
              <span className="font-bold text-[#35261A] block mb-1">NASA CLIMATE DATABASE GRAB</span>
              <p className="text-[#8C765C] leading-relaxed text-[11px] font-medium">
                Every 24 hours, local ambient parameters are synchronized with multi-spectral satellite imagery. Surface moisture, atmospheric salt content, and surrounding rural vibration indexes are feed-mapped onto localized neural structures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Report Generator Area */}
      <div>
        <div className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-5 relative overflow-hidden shadow-sm flex flex-col justify-between h-full min-h-[380px]">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#E8DFC8]/40 mb-4">
              <FileText className="text-[#8C6239]" size={15} />
              <h3 className="text-xs font-bold tracking-widest text-[#35261A] font-serif uppercase">
                {t("researchHeader").split(" ")[0]} LAB GENERATOR
              </h3>
            </div>

            <p className="text-xs text-[#8C765C] leading-relaxed mb-4">
              Trigger a multi-modal AI materials diagnostics audit matching professional preservation guidelines. It queries live IoT sensors, erosion speeds, and crack projections.
            </p>

            {/* Render results or generating status */}
            {generatingReport ? (
              <div className="bg-[#FAF7F2] border border-[#E8DFC8]/50 rounded-2xl p-4 text-center py-10 flex flex-col items-center justify-center space-y-3">
                <RefreshCw size={24} className="animate-spin text-[#8C6239]" />
                <span className="text-xs font-mono text-[#8C6239] tracking-wider animate-pulse font-bold">
                  NEURAL NETWORK COMPILING AUDIT DATA...
                </span>
              </div>
            ) : reportResult ? (
              <div className="bg-[#FAF7F2] border border-[#E8DFC8]/50 rounded-2xl p-4 max-h-[300px] overflow-y-auto text-xs font-mono text-[#665445] leading-relaxed space-y-3 shadow-inner select-text">
                {/* Visual Report layout with dynamic scientific headers */}
                <span className="text-[9px] text-[#8C6239] font-bold block tracking-widest border-b border-[#E8DFC8]/50 pb-1 uppercase">
                  TAMYR INTER-MODEL SYSTEM TELEMETRY
                </span>
                
                {/* Split text by headings to render nicely */}
                <div className="whitespace-pre-wrap font-sans text-xs text-[#665445] space-y-2">
                  {reportResult}
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF7F2] border border-dashed border-[#E8DFC8]/60 rounded-2xl p-6 text-center py-12 text-[#8C765C]">
                <Cpu size={25} className="mx-auto mb-2 text-[#8C765C]/50 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider block font-bold">
                  REPORT BUFFER EMPTY
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 mt-4">
            {!reportResult && !generatingReport && (
              <button
                onClick={fetchScientificAIReport}
                className="w-full py-2.5 bg-[#8C6239]/10 text-[#8C6239] hover:bg-[#8C6239]/20 border border-[#8C6239]/30 hover:border-[#8C6239]/60 rounded-xl text-[10px] font-mono tracking-widest uppercase transition-all duration-200 text-center flex items-center justify-center gap-2 font-bold cursor-pointer"
              >
                <Cpu size={14} />
                {t("generateAIReport")}
              </button>
            )}

            {reportResult && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9px] font-mono">
                <button
                  onClick={fetchScientificAIReport}
                  className="py-2.5 px-1 bg-[#FAF7F2] text-[#8C765C] hover:text-[#35261A] border border-[#E8DFC8] hover:bg-white rounded-xl tracking-wider uppercase transition-colors cursor-pointer font-bold"
                >
                  RE-COMPILING
                </button>
                <button
                  onClick={downloadReportFile}
                  className="py-2.5 px-1 bg-[#8C6239] hover:bg-amber-700 text-white font-bold rounded-xl tracking-wider uppercase transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                >
                  <Download size={10} />
                  {downloadSuccess ? "MD COMPLETED!" : t("exportPdfBtn").split(" ")[1] + " .MD"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
