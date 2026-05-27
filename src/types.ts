export type Language = "en" | "kk" | "ru";

export interface ClimateProfile {
  city: string;
  avgTempDelta: number; // °C seasonal temperature fluctuations
  avgHumidity: number; // % humidity
  annualPrecipitation: number; // mm precipitation
  avgUvIndex: number; // 0-11 UV exposure index
  avgWindSpeed: number; // m/s wind intensity
  seismicVibrations: number; // mm/s typical soil ground vibrations
}

export interface Landmark {
  id: string;
  name: Record<Language, string>;
  region: Record<Language, string>;
  coordinates: { lat: string; lng: string; x: number; y: number }; // x,y are relative coordinates for the custom Kazakhstan vector map
  era: Record<Language, string>;
  description: Record<Language, string>;
  riskLevel: "CRITICAL" | "HIGH" | "STABLE" | "OPTIMAL";
  riskScore: number; // 0 to 100
  crackDensity: number; // % or m/m2
  material: Record<Language, string>;
  climateProfile: ClimateProfile; // Added real environmental and climate dataset profiles
  iotSensors: {
    temperature: number; // °C
    humidity: number; // %
    uvExposure: number; // uW/cm2
    vibration: number; // mm/s
    windImpact: number; // m/s
    history: {
      timestamp: string;
      temp: number;
      humidity: number;
      uv: number;
      vibe: number;
    }[];
  };
  metrics: {
    surfaceErosion: number; // %
    crackGrowthRate: number; // mm/year
    moisturePenetration: number; // %
    structuralStress: number; // MPa
  };
  reconstruction: {
    pastDescription: Record<Language, string>;
    presentDescription: Record<Language, string>;
    futurePredictedDescription: Record<Language, string>;
    beforeImage: string; // fallback stylized graphics
    afterImage: string;
  };
}

export interface ScannerAnalysisResult {
  confidenceScore: number; // 0-100
  riskScore: number; // 0-100
  crackDensity: number; // %
  surfaceDamagePercentage: number; // %
  degradationLevel: "HEAVY" | "MODERATE" | "LIGHT" | "NONE";
  predictedFutureCondition: Record<Language, string>;
  heatmapData: { x: number; y: number; radius: number; intensity: number }[];
  cracks: { points: [number, number][]; type: string; width: number }[];
  annotations: { x: number; y: number; text: Record<Language, string> }[];
}

export type ThemeMode = "scientific" | "hologram";
