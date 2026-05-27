import React, { useState, useEffect, useRef } from "react";
import { Landmark, Language } from "../types";
import { translations } from "../translations";
import { 
  Orbit, Compass, Activity, ZoomIn, ZoomOut, Eye, 
  Flame, RotateCw, Calendar, Sliders, Shield, Droplet, 
  Sun, Wind, AlertCircle, Sparkles, CheckCircle2 
} from "lucide-react";
import { OrnamentalCorner } from "./OrnamentKit";

interface DigitalTwinProps {
  lang: Language;
  landmark: Landmark;
}

// Structural zones definitions for user probe selection
interface InspectionZone {
  name: Record<Language, string>;
  stress: string;
  condition: string;
  status: "GOOD" | "WARN" | "CRITICAL";
}

const INSPECTION_ZONES: Record<string, InspectionZone[]> = {
  yasawi: [
    { name: { en: "Central Vault Arch (Pishlaq)", kk: "Орталық күмбез аркасы", ru: "Центральная арка свода" }, stress: "4.2 MPa", condition: "Micro-fissures in internal grout", status: "WARN" },
    { name: { en: "Glazed Turquoise Dome Base", kk: "Көгілдір күмбез табаны", ru: "Основание бирюзового купола" }, stress: "2.1 MPa", condition: "Optimal tile alignment, minor salt crust", status: "GOOD" },
    { name: { en: "Northern Support Pier Footer", kk: "Солтүстік тірек негізі", ru: "Северный опорный пилон" }, stress: "7.8 MPa", condition: "Heavy capillary moisture rising damp", status: "CRITICAL" }
  ],
  otyrar: [
    { name: { en: "Fortress Rampart Base", kk: "Бекініс қамалының негізі", ru: "Основание крепостной стены" }, stress: "1.2 MPa", condition: "Loess soil sliding and erosion", status: "CRITICAL" },
    { name: { en: "Pottery Kiln Arched Swells", kk: "Қыш зауытының аркалары", ru: "Своды обжиговых печей" }, stress: "0.8 MPa", condition: "Crumbling mud layers, needs dry capping", status: "WARN" },
    { name: { en: "Excavated Residential Footings", kk: "Тұрғын үй блоктарының қалдықтары", ru: "Фундаменты жилых кварталов" }, stress: "0.4 MPa", condition: "Stabilized clay loam, optimal state", status: "GOOD" }
  ],
  aishabibi: [
    { name: { en: "Western Facade (Original)", kk: "Батыс қабырғасы (түпнұсқа)", ru: "Западная оригинальная стена" }, stress: "5.1 MPa", condition: "High micro-seismic settlement stress", status: "WARN" },
    { name: { en: "Carved Terracotta Ornaments (Grid)", kk: "Терракота ою-өрнектері", ru: "Резные терракотовые плиты" }, stress: "1.8 MPa", condition: "Wind-induced tile shear, stable matrix", status: "GOOD" },
    { name: { en: "Southeastern Cylindrical Column", kk: "Оңтүстік-шығыс колоннасы", ru: "Юго-восточная колонна" }, stress: "6.4 MPa", condition: "Severe joint mortar washouts", status: "CRITICAL" }
  ]
};

export default function DigitalTwin({ lang, landmark }: DigitalTwinProps) {
  const t = (key: string) => translations[key]?.[lang] || key;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lab Controls state
  const [timelineMode, setTimelineMode] = useState<"past" | "present" | "future">("present");
  const [restorationProgress, setRestorationProgress] = useState<number>(0); // 0% to 100%
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [selectedZoneIdx, setSelectedZoneIdx] = useState<number>(0);

  // Environmental layers triggers
  const [envLayers, setEnvLayers] = useState({
    moisture: false,
    wind: false,
    seismic: false,
    uv: false
  });

  // Orbital controls
  const [angleX, setAngleX] = useState<number>(0.35);
  const [angleY, setAngleY] = useState<number>(0.65);
  const [zoom, setZoom] = useState<number>(1.0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  
  // Scans and calibrations
  const [beamWave, setBeamWave] = useState<number>(0);
  const [labStatus, setLabStatus] = useState<string>("LOCK SECURED");

  // Multi-angle automatic rotation loop
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setAngleY((prev) => (prev + 0.008) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(interval);
  }, [isRotating]);

  // Optical laser scanning pulse
  useEffect(() => {
    const pulse = setInterval(() => {
      setBeamWave((prev) => (prev + 1.2) % 100);
    }, 45);
    return () => clearInterval(pulse);
  }, []);

  const triggerCalibrationVec = () => {
    setLabStatus("ANALYZING MATRIX...");
    setTimeout(() => {
      setLabStatus("LAB CALIBRATED");
      setZoom(1.0);
      setAngleX(0.35);
      setAngleY(0.65);
      setRestorationProgress(0);
      setTimelineMode("present");
      setEnvLayers({ moisture: false, wind: false, seismic: false, uv: false });
    }, 1200);
  };

  // Drag interaction physics
  const isDragging = useRef(false);
  const previousMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePos.current = { x: e.clientX, y: e.clientY };
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - previousMousePos.current.x;
    const dy = e.clientY - previousMousePos.current.y;
    setAngleY((prev) => (prev + dx * 0.007) % (Math.PI * 2));
    setAngleX((prev) => Math.max(-0.9, Math.min(0.9, prev + dy * 0.007)));
    previousMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => { isDragging.current = false; };

  const vibrations = landmark.climateProfile.seismicVibrations;

  // Render Loop inside Solid Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Elegant light parchment backdrop
    ctx.fillStyle = "#FAF7F2";
    ctx.fillRect(0, 0, W, H);

    // Subtle warm center lighting
    const radial = ctx.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, W * 0.65);
    radial.addColorStop(0, "#FFFDF9");
    radial.addColorStop(1, "#FAF1E6");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // Grid coordinates
    ctx.strokeStyle = "rgba(140, 98, 57, 0.05)";
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
    ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
    ctx.stroke();

    // Secondary coordinates bounds checker
    ctx.strokeStyle = "rgba(140, 98, 57, 0.02)";
    ctx.strokeRect(50, 40, W - 100, H - 80);

    // Compute active shaking factor for Seismic Layer
    let seismicOffset = 0;
    if (envLayers.seismic) {
      seismicOffset = Math.sin(Date.now() * 0.12) * (vibrations * 1.8);
    }

    // -------------------------------------------------------------
    // Define 3D Solid Polygon mesh geometry
    interface Point3D { x: number; y: number; z: number }
    interface Face3D {
      indices: number[];
      baseColor: string;
      originalGlaze?: boolean; // Glazed turquoise tile
      patternType?: "tiles" | "brick" | "rock" | "ground";
      dangerHighlight?: boolean; // Highlighted danger structural sector
    }

    let vertices: Point3D[] = [];
    let faces: Face3D[] = [];

    const modelScale = 115 * zoom;

    if (landmark.id === "yasawi") {
      // 1. KHOJA AHMED YASAWI MAUSOLEUM SOLID 3D MODEL
      // Cubic base vertices (8 points, bounds [-1, 1])
      vertices = [
        // Base Wall Cubics [0-7]
        { x: -0.9, y: 1.0, z: -0.9 }, { x: 0.9, y: 1.0, z: -0.9 },
        { x: 0.9, y: 1.0, z: 0.9 },   { x: -0.9, y: 1.0, z: 0.9 },
        { x: -0.9, y: -0.2, z: -0.9 }, { x: 0.9, y: -0.2, z: -0.9 },
        { x: 0.9, y: -0.2, z: 0.9 },   { x: -0.9, y: -0.2, z: 0.9 },

        // Front Pishlaq Portal tower projections (8 vertices) [8-15]
        { x: -1.1, y: 1.0, z: 1.0 }, { x: -0.5, y: 1.0, z: 1.0 },
        { x: -1.1, y: -0.7, z: 1.0 }, { x: -0.5, y: -0.7, z: 1.0 }, // Left pillar

        { x: 0.5, y: 1.0, z: 1.0 }, { x: 1.1, y: 1.0, z: 1.0 },
        { x: 0.5, y: -0.7, z: 1.0 }, { x: 1.1, y: -0.7, z: 1.0 },  // Right pillar

        // Portal arch backing face [16-19]
        { x: -0.5, y: 1.0, z: 0.5 }, { x: 0.5, y: 1.0, z: 0.5 },
        { x: -0.5, y: -0.4, z: 0.5 }, { x: 0.5, y: -0.4, z: 0.5 }
      ];

      // Add dome cylinder collar octagon [20-27]
      const collarOffset = vertices.length;
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        vertices.push({
          x: Math.cos(theta) * 0.65,
          y: -0.22,
          z: Math.sin(theta) * 0.65
        });
      }

      // Add dome dome top octagon [28-35]
      const domeOffset = vertices.length;
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        vertices.push({
          x: Math.cos(theta) * 0.70,
          y: -0.65,
          z: Math.sin(theta) * 0.70
        });
      }

      // Dome tip [36]
      const domeTipIdx = vertices.length;
      vertices.push({ x: 0, y: -0.92, z: 0 });

      // Ground Plane [37-40]
      const groundOffset = vertices.length;
      vertices.push(
        { x: -2.0, y: 1.0, z: -2.0 }, { x: 2.0, y: 1.0, z: -2.0 },
        { x: 2.0, y: 1.0, z: 2.0 }, { x: -2.0, y: 1.0, z: 2.0 }
      );

      // Define solid polygon faces for Yasawi - back side to front side
      faces = [
        // Ground plane
        { indices: [groundOffset, groundOffset+1, groundOffset+2, groundOffset+3], baseColor: "#221915", patternType: "ground" },

        // Base cubes faces
        { indices: [0, 1, 5, 4], baseColor: "#937B65", patternType: "brick" }, // Back wall
        { indices: [1, 2, 6, 5], baseColor: "#846B55", patternType: "brick" }, // Right wall
        { indices: [3, 0, 4, 7], baseColor: "#846B55", patternType: "brick", dangerHighlight: true }, // Left wall (structural hazard)
        { indices: [2, 3, 7, 6], baseColor: "#9E846E", patternType: "brick" }, // Front core-wall behind arch

        // Left entryway pillar
        { indices: [8, 9, 11, 10], baseColor: "#A68D76", patternType: "brick" }, // Front Left Facade
        // Right entryway pillar
        { indices: [12, 13, 15, 14], baseColor: "#A68D76", patternType: "brick" }, // Front Right Facade

        // Recessed Arch portal
        { indices: [16, 17, 19, 18], baseColor: "#755F4D", patternType: "brick" },

        // Dome collar drum faces (8 segments connecting octagonal drum)
        ...Array.from({ length: 8 }).map((_, i) => {
          const next = (i + 1) % 8;
          return {
            indices: [collarOffset + i, collarOffset + next, i + 4, ((i + 1) % 4) + 4],
            baseColor: "#8D735E",
            patternType: "brick" as const
          };
        }),

        // Magnificient Glazed turquoise dome segments (8 wedges)
        ...Array.from({ length: 8 }).map((_, i) => {
          const next = (i + 1) % 8;
          return {
            indices: [domeOffset + i, domeOffset + next, domeTipIdx],
            baseColor: "#14B8A6",
            originalGlaze: true,
            patternType: "tiles" as const
          };
        }),

        // Dome drum collar vertical faces
        ...Array.from({ length: 8 }).map((_, i) => {
          const next = (i + 1) % 8;
          return {
            indices: [collarOffset + i, collarOffset + next, domeOffset + next, domeOffset + i],
            baseColor: "#109D90",
            originalGlaze: true,
            patternType: "tiles" as const
          };
        })
      ];

    } else if (landmark.id === "otyrar") {
      // 2. OTYRAR ARCHAEOLOGICAL SITE ARCHITECTURAL MOUNDS
      // Excavated layered loess clay towers [0-7]
      vertices = [
        { x: -1.2, y: 1.0, z: -1.2 }, { x: 1.2, y: 1.0, z: -1.2 },
        { x: 1.2, y: 1.0, z: 1.2 },   { x: -1.2, y: 1.0, z: 1.2 },
        { x: -1.0, y: 0.1, z: -1.0 }, { x: 1.0, y: 0.1, z: -1.0 },
        { x: 1.0, y: 0.1, z: 1.0 },   { x: -1.0, y: 0.1, z: 1.0 }
      ];

      // Reconstructed Central brick pointed kiln arch [8-13]
      const archOffset = vertices.length;
      vertices.push(
        { x: -0.4, y: 0.1, z: 0.1 }, { x: -0.4, y: -0.5, z: 0.1 },
        { x: 0, y: -0.85, z: 0.1 },  { x: 0.4, y: -0.5, z: 0.1 },
        { x: 0.4, y: 0.1, z: 0.1 },  { x: 0, y: -0.5, z: 0.1 }
      );

      // Add excavated wall lines (box cells) [14-21]
      const wallCellOffset = vertices.length;
      vertices.push(
        { x: -0.8, y: 1.0, z: -0.8 }, { x: -0.8, y: 0.5, z: -0.8 },
        { x: -0.2, y: 1.0, z: -0.8 }, { x: -0.2, y: 0.6, z: -0.8 },
        { x: 0.6, y: 1.0, z: -0.2 }, { x: 0.6, y: 0.4, z: -0.2 },
        { x: 0.6, y: 1.0, z: 0.6 }, { x: 0.6, y: 0.5, z: 0.6 }
      );

      // Ground plate [22-25]
      const gpOffset = vertices.length;
      vertices.push(
        { x: -2.2, y: 1.0, z: -2.2 }, { x: 2.2, y: 1.0, z: -2.2 },
        { x: 2.2, y: 1.0, z: 2.2 }, { x: -2.2, y: 1.0, z: 2.2 }
      );

      faces = [
        { indices: [gpOffset, gpOffset+1, gpOffset+2, gpOffset+3], baseColor: "#1B1310", patternType: "ground" },

        // Main clay defensive mound walls
        { indices: [0, 1, 5, 4], baseColor: "#6D513A", patternType: "brick" },
        { indices: [1, 2, 6, 5], baseColor: "#7D5F46", patternType: "brick", dangerHighlight: true }, // eroding sector
        { indices: [2, 3, 7, 6], baseColor: "#6D513A", patternType: "brick" },
        { indices: [3, 0, 4, 7], baseColor: "#7D5F46", patternType: "brick" },

        // Flat top of clay mound platform
        { indices: [4, 5, 6, 7], baseColor: "#573F2B", patternType: "ground" },

        // Pottery kiln arch facets
        { indices: [archOffset, archOffset+1, archOffset+5], baseColor: "#5A4230", patternType: "brick" },
        { indices: [archOffset+1, archOffset+2, archOffset+5], baseColor: "#8D6242", patternType: "brick" },
        { indices: [archOffset+2, archOffset+3, archOffset+5], baseColor: "#8D6242", patternType: "brick" },
        { indices: [archOffset+3, archOffset+4, archOffset+5], baseColor: "#5A4230", patternType: "brick" },

        // Excavated ancient cells walls
        { indices: [wallCellOffset, wallCellOffset+1, wallCellOffset+3, wallCellOffset+2], baseColor: "#6D513A", patternType: "brick" },
        { indices: [wallCellOffset+4, wallCellOffset+5, wallCellOffset+7, wallCellOffset+6], baseColor: "#5E4633", patternType: "brick" }
      ];

    } else {
      // 3. AISHA BIBI MAUSOLEUM SOLID 3D MODEL
      // Cubic central base [0-7]
      vertices = [
        { x: -0.85, y: 1.0, z: -0.85 }, { x: 0.85, y: 1.0, z: -0.85 },
        { x: 0.85, y: 1.0, z: 0.85 },   { x: -0.85, y: 1.0, z: 0.85 },
        { x: -0.85, y: -0.3, z: -0.85 }, { x: 0.85, y: -0.3, z: -0.85 },
        { x: 0.85, y: -0.3, z: 0.85 },   { x: -0.85, y: -0.3, z: 0.85 }
      ];

      // 4 taper pillars at 4 corners (cylindrical prisms tapering upwards)
      // Front Left Pillar vertex offsets [8-13]
      const FLOffset = vertices.length;
      vertices.push(
        { x: -1.05, y: 1.0, z: 1.05 }, { x: -0.75, y: 1.0, z: 1.05 }, { x: -0.9, y: 1.0, z: 0.75 }, 
        { x: -1.00, y: -0.4, z: 1.00 }, { x: -0.80, y: -0.4, z: 1.00 }, { x: -0.9, y: -0.4, z: 0.80 }
      );

      // Front Right Pillar vertex offsets [14-19]
      const FROffset = vertices.length;
      vertices.push(
        { x: 0.75, y: 1.0, z: 1.05 }, { x: 1.05, y: 1.0, z: 1.05 }, { x: 0.9, y: 1.0, z: 0.75 },
        { x: 0.80, y: -0.4, z: 1.00 }, { x: 1.00, y: -0.4, z: 1.00 }, { x: 0.9, y: -0.4, z: 0.85 }
      );

      // Pointy pyramid clay roof [20-24]
      const roofOffset = vertices.length;
      vertices.push(
        { x: -0.9, y: -0.3, z: -0.9 }, { x: 0.9, y: -0.3, z: -0.9 },
        { x: 0.9, y: -0.3, z: 0.9 },   { x: -0.9, y: -0.3, z: 0.9 },
        { x: 0, y: -0.95, z: 0 } // Roof peak
      );

      // Portal door recess [25-28]
      const doorOffset = vertices.length;
      vertices.push(
        { x: -0.35, y: 1.0, z: 0.86 }, { x: 0.35, y: 1.0, z: 0.86 },
        { x: -0.35, y: 0.25, z: 0.86 }, { x: 0.35, y: 0.25, z: 0.86 }
      );

      // Ground plane [29-32]
      const gpOffset = vertices.length;
      vertices.push(
        { x: -2.1, y: 1.0, z: -2.1 }, { x: 2.1, y: 1.0, z: -2.1 },
        { x: 2.1, y: 1.0, z: 2.1 }, { x: -2.1, y: 1.0, z: 2.1 }
      );

      faces = [
        { indices: [gpOffset, gpOffset+1, gpOffset+2, gpOffset+3], baseColor: "#1E1512", patternType: "ground" },

        // Core building walls (Terracotta tiles patterned)
        { indices: [0, 1, 5, 4], baseColor: "#CFA07C", patternType: "tiles" }, // Back wall
        { indices: [1, 2, 6, 5], baseColor: "#BC8E69", patternType: "tiles" }, // Right wall
        { indices: [2, 3, 7, 6], baseColor: "#CFA07C", patternType: "tiles", dangerHighlight: true }, // Front wall (cracked)
        { indices: [3, 0, 4, 7], baseColor: "#BC8E69", patternType: "tiles" }, // Left wall

        // Pyramid clay roof cones (4 faces)
        { indices: [roofOffset, roofOffset+1, roofOffset+4], baseColor: "#A06B4B", patternType: "brick" },
        { indices: [roofOffset+1, roofOffset+2, roofOffset+4], baseColor: "#935E3E", patternType: "brick" },
        { indices: [roofOffset+2, roofOffset+3, roofOffset+4], baseColor: "#A06B4B", patternType: "brick" },
        { indices: [roofOffset+3, roofOffset+4, roofOffset], baseColor: "#935E3E", patternType: "brick" },

        // Front Left corner column
        { indices: [FLOffset, FLOffset+1, FLOffset+4, FLOffset+3], baseColor: "#D19C74", patternType: "tiles" },
        { indices: [FLOffset+1, FLOffset+2, FLOffset+5, FLOffset+4], baseColor: "#C38E66", patternType: "tiles" },
        { indices: [FLOffset+2, FLOffset, FLOffset+3, FLOffset+5], baseColor: "#B5815A", patternType: "tiles" },

        // Front Right column
        { indices: [FROffset, FROffset+1, FROffset+4, FROffset+3], baseColor: "#D19C74", patternType: "tiles", dangerHighlight: true },
        { indices: [FROffset+1, FROffset+2, FROffset+5, FROffset+4], baseColor: "#C38E66", patternType: "tiles" },

        // Recessed Arch Door face
        { indices: [doorOffset, doorOffset+1, doorOffset+3, doorOffset+2], baseColor: "#4E3727", patternType: "brick" }
      ];
    }

    // -------------------------------------------------------------
    // 3D Rotations and Matrix Projection
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    const projectedPoints: { x: number; y: number; zDepth: number }[] = [];

    vertices.forEach((pt) => {
      // Rotation on Y index
      let x1 = pt.x * cosY - pt.z * sinY;
      let z1 = pt.x * sinY + pt.z * cosY;

      // Rotation on X index
      let y2 = pt.y * cosX - z1 * sinX;
      let z2 = pt.y * sinX + z1 * cosX;

      // Add shaking dynamic offset if active
      if (envLayers.seismic) {
        x1 += (Math.random() * 0.05 - 0.025) * (vibrations * 1.5);
        y2 += (Math.random() * 0.05 - 0.025) * (vibrations * 1.5);
      }

      // Proportional distance perspective divide
      const distance = 4.2;
      const dFactor = 1.0;
      const scaleProject = dFactor / (z2 * 0.15 + distance);

      // Translate center
      const px = W / 2 + x1 * modelScale * scaleProject;
      const py = H / 2 + y2 * modelScale * scaleProject + seismicOffset; // seismic macro vertical tremor

      projectedPoints.push({
        x: px,
        y: py,
        zDepth: z2 // save real Z coordinates depth for painters sorting algorithm
      });
    });

    // -------------------------------------------------------------
    // Face Depth Sorting (Painter's algorithm back-to-front drawing)
    const facesWithDepth = faces.map((face, index) => {
      let sumZ = 0;
      face.indices.forEach((idx) => {
        sumZ += projectedPoints[idx]?.zDepth || 0;
      });
      const avgZ = sumZ / face.indices.length;
      return { face, avgZ, originalIndex: index };
    });

    // Sort descending by Z distance (lower values are further into front layout)
    facesWithDepth.sort((a, b) => b.avgZ - a.avgZ);

    // Dynamic light ray vector for standard diff shadows
    const L = { x: 0.53, y: -0.75, z: 0.38 }; // light coming from high right front

    // -------------------------------------------------------------
    // Rendering solid polygon surfaces
    facesWithDepth.forEach(({ face }) => {
      ctx.beginPath();
      let valid = true;
      face.indices.forEach((idx, i) => {
        const pt = projectedPoints[idx];
        if (!pt) { valid = false; return; }
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      if (!valid) return;

      // 1. Compute normal lighting shading intensity factor
      // Calculate face normal from the first three 3D vertices
      let shade = 1.0;
      if (face.indices.length >= 3) {
        const pA = vertices[face.indices[0]];
        const pB = vertices[face.indices[1]];
        const pC = vertices[face.indices[2]];
        
        // Vectors
        const u = { x: pB.x - pA.x, y: pB.y - pA.y, z: pB.z - pA.z };
        const v = { x: pC.x - pA.x, y: pC.y - pA.y, z: pC.z - pA.z };
        
        // Cross product normal vector
        const NX = u.y * v.z - u.z * v.y;
        const NY = u.z * v.x - u.x * v.z;
        const NZ = u.x * v.y - u.y * v.x;
        const mag = Math.sqrt(NX*NX + NY*NY + NZ*NZ);
        
        if (mag > 0) {
          const norm = { x: NX / mag, y: NY / mag, z: NZ / mag };
          const dot = norm.x * L.x + norm.y * L.y + norm.z * L.z;
          shade = 0.55 + 0.45 * Math.max(0, dot); // ambient 0.55, directional 0.45
        }
      }

      // Apply environmental UV heat layer intensity highlight on upward facing polygons
      let uvHighlight = 0;
      if (envLayers.uv && face.indices.length >= 3) {
        const pA = vertices[face.indices[0]];
        const pB = vertices[face.indices[1]];
        const pC = vertices[face.indices[2]];
        const NX = (pB.y - pA.y) * (pC.z - pA.z) - (pB.z - pA.z) * (pC.y - pA.y);
        const NY = (pB.z - pA.z) * (pC.x - pA.x) - (pB.x - pA.x) * (pC.z - pA.z);
        const NZ = (pB.x - pA.x) * (pC.y - pA.y) - (pB.y - pA.y) * (pC.x - pA.x);
        const normY = NY / Math.sqrt(NX*NX + NY*NY + NZ*NZ || 1);
        
        if (normY < -0.3) { // pointing upwards
          uvHighlight = Math.abs(normY) * 0.45;
        }
      }

      // Translate core hex colors based on timeline and restoration sliders
      let hexColor = face.baseColor;
      
      // If original glaze sector and we are in PAST or sliding restoration progress to 100%
      if (face.originalGlaze) {
        if (timelineMode === "past" || restorationProgress > 45) {
          hexColor = "#14B8A6"; // complete, shiny glowing turquoise
        } else if (timelineMode === "future") {
          hexColor = "#3D2B24"; // highly weathered, crumbling tiles
        } else {
          // Weathered current mix based on restoration slider index
          // Interpolate between clay-base tone (#705745) and turquoise (#14B8A6)
          const mix = restorationProgress / 100;
          const r = Math.round(112 * (1 - mix) + 20 * mix);
          const g = Math.round(87 * (1 - mix) + 184 * mix);
          const b = Math.round(69 * (1 - mix) + 166 * mix);
          hexColor = `rgb(${r},${g},${b})`;
        }
      } else if (face.patternType === "tiles") {
        if (timelineMode === "past" || restorationProgress > 60) {
          hexColor = "#D5A982"; // perfect, glowing cream-golden terracotta carved tiles
        } else if (timelineMode === "future") {
          hexColor = "#664F3D"; // cracked, deeply decayed loam tilework
        }
      }

      // Convert rgb shades
      let finalFill = hexColor;
      if (hexColor.startsWith("#")) {
        const rVal = parseInt(hexColor.slice(1, 3), 16);
        const gVal = parseInt(hexColor.slice(3, 5), 16);
        const bVal = parseInt(hexColor.slice(5, 7), 16);
        
        let finalR = Math.min(255, Math.max(0, Math.round(rVal * shade)));
        let finalG = Math.min(255, Math.max(0, Math.round(gVal * shade)));
        let finalB = Math.min(255, Math.max(0, Math.round(bVal * shade)));

        // Add UV Thermal overlay color
        if (uvHighlight > 0) {
          finalR = Math.min(255, Math.round(finalR + uvHighlight * 255));
          finalG = Math.min(255, Math.round(finalG * (1 - uvHighlight)));
          finalB = Math.min(255, Math.round(finalB * (1 - uvHighlight * 1.5)));
        }

        // Apply moisture rising damp overlay gradient on ground segments (blue shift)
        if (envLayers.moisture && face.patternType === "ground") {
          finalB = Math.min(255, Math.round(finalB + 50));
          finalG = Math.min(255, Math.round(finalG + 15));
        }

        finalFill = `rgb(${finalR},${finalG},${finalB})`;
      }

      ctx.fillStyle = finalFill;
      ctx.fill();

      // Draw wireframe outlines if active, or very thin soft borders for depth representation
      if (showWireframe) {
        ctx.strokeStyle = "rgba(42, 157, 144, 0.55)";
        ctx.lineWidth = 0.65;
        ctx.stroke();
      } else {
        ctx.strokeStyle = "rgba(140, 98, 57, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 2. Draw textures details (procedural tiles grid, clay brick gaps, slate laminas)
      if (!showWireframe) {
        if (face.patternType === "tiles" && (timelineMode !== "future")) {
          // Draw dense micro carvings terracotta grid lines representing fine tiles
          ctx.strokeStyle = "rgba(255,255,255,0.06)";
          ctx.lineWidth = 0.45;
          ctx.stroke();
        } else if (face.patternType === "brick") {
          // Draw simple brick bands lines
          ctx.strokeStyle = "rgba(0,0,0,0.08)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // 3. Highlight AI danger zone overlays dynamically
      if (face.dangerHighlight && (timelineMode === "present" || timelineMode === "future") && (restorationProgress < 40)) {
        // Overlay a pulsing translucent volcanic-red warning color
        const pulse = 0.15 + Math.sin(Date.now() * 0.005) * 0.06;
        ctx.fillStyle = `rgba(239, 68, 68, ${pulse})`;
        ctx.fill();
        
        ctx.strokeStyle = "rgba(239, 68, 68, 0.45)";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }
    });

    // -------------------------------------------------------------
    // Draw crack overlays DIRECTLY in 3D perspective space
    if (timelineMode !== "past" && restorationProgress < 80) {
      ctx.strokeStyle = "#EF4444"; // high-fidelity hazard crack color
      ctx.lineWidth = 1.4;
      ctx.shadowColor = "#EF4444";
      ctx.shadowBlur = 1.5;

      const draw3DCrackLine = (p1Idx: number, p2Idx: number) => {
        const pt1 = projectedPoints[p1Idx];
        const pt2 = projectedPoints[p2Idx];
        if (pt1 && pt2) {
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          // Wavy natural fault cracks shape
          const midX = (pt1.x + pt2.x) / 2 + (Math.random() * 2.5 - 1.25);
          const midY = (pt1.y + pt2.y) / 2 + (Math.random() * 2.5 - 1.25);
          ctx.lineTo(midX, midY);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }
      };

      if (landmark.id === "yasawi") {
        draw3DCrackLine(3, 7); // deep crack on left wall
        draw3DCrackLine(4, 7);
      } else if (landmark.id === "otyrar") {
        draw3DCrackLine(1, 5); // wall erosion
        draw3DCrackLine(2, 6);
      } else if (landmark.id === "aishabibi") {
        draw3DCrackLine(2, 6); // column stress
        draw3DCrackLine(6, 7);
      }

      ctx.shadowBlur = 0; // reset
    }

    // -------------------------------------------------------------
    // Draw real-time wind flowing streamlines particle overlays
    if (envLayers.wind) {
      ctx.strokeStyle = "rgba(200, 220, 240, 0.22)";
      ctx.lineWidth = 1.0;
      const scanTime = Date.now() * 0.002;
      for (let i = 0; i < 4; i++) {
        const yStart = 60 + i * 55;
        const waveX = (scanTime * 60 + i * 90) % W;
        ctx.beginPath();
        ctx.moveTo(waveX, yStart);
        ctx.bezierCurveTo(
          waveX + 30, yStart - 15 + Math.sin(scanTime + i) * 10,
          waveX + 70, yStart + 15 - Math.sin(scanTime + i) * 10,
          waveX + 110, yStart
        );
        ctx.stroke();
      }
    }

    // -------------------------------------------------------------
    // Draw active scanning laser scanner (glowing blue line)
    const scanLineY = (beamWave / 100) * H;
    ctx.strokeStyle = "rgba(20, 184, 166, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#14B8A6";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(35, scanLineY);
    ctx.lineTo(W - 35, scanLineY);
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // If active reconstruction is simulating
    if (restorationProgress > 0 && restorationProgress < 100) {
      // Draw glowing orange reconstruction coordinates
      ctx.fillStyle = "rgba(212, 175, 55, 0.55)";
      for (let i = 0; i < 6; i++) {
        const pX = (W / 2) + Math.sin(Date.now() * 0.05 + i) * (W * 0.25);
        const pY = (H / 2) + Math.cos(Date.now() * 0.03 + i) * (H * 0.25);
        ctx.fillRect(pX - 1.5, pY - 1.5, 3, 3);
      }
    }

  }, [landmark, angleX, angleY, zoom, timelineMode, restorationProgress, showWireframe, envLayers, vibrations, beamWave]);

  const activeZones = INSPECTION_ZONES[landmark.id] || [];
  const selectedZone = activeZones[selectedZoneIdx];

  return (
    <div id="digital-twin-laboratory" className="bg-[#FFFFFC] border border-[#EFECE5] rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden shadow-sm">
      
      {/* Visual glowing border trims and ornaments */}
      <div className="absolute top-0 right-0 p-1">
        <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
      </div>
      <div className="absolute bottom-0 left-0 p-1 transform rotate-180">
        <OrnamentalCorner className="w-6 h-6 text-[#8C6239]/20" />
      </div>

      <div>
        <div className="flex justify-between items-start pb-3 border-b border-[#E8DFC8]/40 mb-4 gap-2">
          <div className="flex items-center gap-2">
            <RotateCw className="text-[#8C6239] shrink-0 animate-spin" size={15} style={{ animationDuration: "14s" }} />
            <h3 className="text-sm font-serif font-bold text-[#35261A] tracking-wide uppercase">
              {t("twinTitle")}
            </h3>
          </div>
          <span className="text-[9px] font-mono tracking-wider text-[#2A9D90] bg-[#2A9D90]/5 px-2 py-1 rounded-lg border border-[#2A9D90]/25 font-bold uppercase shrink-0">
            {labStatus}
          </span>
        </div>
        <p className="text-xs text-[#8C765C] font-serif italic mb-4">
          Interactive material mapping, depth-sorted solid geometry, and live virtual restoration simulator.
        </p>
      </div>

      {/* Main 3D canvas stage and status hud panels */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
        
        {/* Left Side: Diagnostics probe list */}
        <div className="lg:col-span-1 bg-[#FAF7F2] border border-[#E8DFC8]/50 p-4 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[9px] text-[#8C6239] font-mono font-bold tracking-widest border-b border-[#E8DFC8]/50 pb-1.5 mb-2.5 uppercase font-extrabold">
              ARCHEOLOGICAL PROBES
            </div>
            
            <div className="space-y-2">
              {activeZones.map((z, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedZoneIdx(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-sans transition-all duration-200 block cursor-pointer ${
                    selectedZoneIdx === idx
                      ? "bg-[#8C6239]/10 border-[#8C6239]/40 text-[#35261A] shadow-sm"
                      : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#665445] hover:text-[#35261A] hover:border-[#8C6239]/40"
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="truncate">{z.name[lang]}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      z.status === "CRITICAL" ? "bg-red-500" : z.status === "WARN" ? "bg-yellow-500" : "bg-green-500"
                    }`} />
                  </div>
                  <div className="text-[8px] font-mono text-[#8C765C] mt-1 uppercase flex justify-between font-bold">
                    <span>Stress: {z.stress}</span>
                    <span className={
                      z.status === "CRITICAL" ? "text-red-550 font-bold" : z.status === "WARN" ? "text-amber-750 font-bold" : "text-green-650 font-bold"
                    }>{z.status}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active selected zone detailed scientific readouts */}
          {selectedZone && (
            <div className="bg-[#FFFFFC] border border-[#E8DFC8]/40 p-2.5 rounded-xl font-mono text-[9px] text-[#8C765C] space-y-1">
              <span className="text-[#8C6239] font-bold block uppercase border-b border-[#EBE3D3] pb-1 mb-1">
                PROBE_LOGS_{selectedZoneIdx + 1}
              </span>
              <div>SPEC_INDEX: <span className="text-[#35261A] font-semibold">FEA_Z_{selectedZoneIdx * 3 + 12}</span></div>
              <div>STRESS_COEF: <span className="text-[#35261A] font-semibold">{selectedZone.stress}</span></div>
              <div>DESCRIPTION: <span className="text-[#665445] italic font-semibold">{selectedZone.condition}</span></div>
            </div>
          )}
        </div>

        {/* Center: The main 3D canvas stage */}
        <div className="lg:col-span-2 min-h-[300px] bg-[#FAF7F2] border border-[#E8DFC8]/60 rounded-2xl relative overflow-hidden group">
          {/* Angle and calibration trackers */}
          <div className="absolute top-3 left-4 text-[8px] font-mono text-[#8C765C] space-y-0.5 pointer-events-none font-bold">
            <div>3D_AZIMUTH: {((angleY * 180 / Math.PI) % 360).toFixed(1)}°</div>
            <div>ELEVATION: {(angleX * 180 / Math.PI).toFixed(0)}°</div>
            <div>POLY_RENDER: DEPTH_SORTED SOLID</div>
          </div>

          <div className="absolute top-3 right-4 text-[8px] font-mono text-[#8C6239] pointer-events-none text-right font-bold">
            <div>OBJECT_ID: {landmark.id.toUpperCase()}_TWIN_8</div>
            <div>CONSERVATION_LAB_EST: {landmark.riskScore ? (100 - landmark.riskScore + restorationProgress * 0.4).toFixed(0) : 80}%</div>
          </div>

          <canvas
            ref={canvasRef}
            width={440}
            height={320}
            className="w-full h-full cursor-grab active:cursor-grabbing max-h-[360px]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />

          {/* Bottom active scanning laser beam overlay indicator */}
          <div className="absolute bottom-3 inset-x-4 pointer-events-none flex justify-between text-[8px] font-mono text-[#8C765C] font-bold">
            <span>ZOOM: {Math.round(zoom * 100)}%</span>
            <span className="text-[#2A9D90] animate-pulse font-bold">{t("lidarScanningStatus")}</span>
          </div>
        </div>

        {/* Right Side: Virtual environment layers and active timeline toggles */}
        <div className="lg:col-span-1 bg-[#FAF7F2] border border-[#E8DFC8]/50 p-4 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[9px] text-[#8C6239] font-mono font-bold tracking-widest border-b border-[#E8DFC8]/55 pb-1.5 mb-2.5 uppercase">
              {t("envLayersLabel")}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <button
                onClick={() => setEnvLayers(prev => ({ ...prev, moisture: !prev.moisture }))}
                className={`flex items-center gap-1.5 p-2 rounded-xl border uppercase transition-all duration-200 font-bold cursor-pointer ${
                  envLayers.moisture 
                    ? "bg-sky-50 border-sky-300 text-sky-700" 
                    : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#8C765C] hover:text-[#35261A]"
                }`}
              >
                <Droplet size={11} />
                {t("moistureLabel")}
              </button>

              <button
                onClick={() => setEnvLayers(prev => ({ ...prev, uv: !prev.uv }))}
                className={`flex items-center gap-1.5 p-2 rounded-xl border uppercase transition-all duration-200 font-bold cursor-pointer ${
                  envLayers.uv 
                    ? "bg-yellow-50 border-yellow-300 text-amber-805" 
                    : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#8C765C] hover:text-[#35261A]"
                }`}
              >
                <Sun size={11} />
                {t("solarUvLabel")}
              </button>

              <button
                onClick={() => setEnvLayers(prev => ({ ...prev, wind: !prev.wind }))}
                className={`flex items-center gap-1.5 p-2 rounded-xl border uppercase transition-all duration-200 font-bold cursor-pointer ${
                  envLayers.wind 
                    ? "bg-slate-100 border-slate-300 text-slate-705" 
                    : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#8C765C] hover:text-[#35261A]"
                }`}
              >
                <Wind size={11} />
                {t("windTwinLabel")}
              </button>

              <button
                onClick={() => setEnvLayers(prev => ({ ...prev, seismic: !prev.seismic }))}
                className={`flex items-center gap-1.5 p-2 rounded-xl border uppercase transition-all duration-200 font-bold cursor-pointer ${
                  envLayers.seismic 
                    ? "bg-red-50 border-red-200 text-red-655 animate-pulse" 
                    : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#8C765C] hover:text-[#35261A]"
                }`}
              >
                <Activity size={11} />
                {t("seismicLabel")}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[9px] text-[#8C765C] font-mono font-bold tracking-wider block uppercase">
              {t("reconsSliderLabel")}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={restorationProgress}
              onChange={(e) => setRestorationProgress(parseInt(e.target.value))}
              className="w-full h-1 bg-[#EFE8DC] rounded appearance-none cursor-pointer accent-[#8C6239]"
            />
            <div className="flex justify-between font-mono text-[9px] text-[#8C765C] uppercase font-bold">
              <span>{t("weatheredLabel")} (0%)</span>
              <span className="text-[#8C6239] font-bold">{t("rebuildLabel")}: {restorationProgress}%</span>
            </div>
          </div>

          <div>
            <div className="text-[9px] text-[#8C6239] font-mono font-bold tracking-widest border-b border-[#E8DFC8]/55 pb-1.5 mb-2.5 uppercase">
              {t("timelineShift")}
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[9px] font-mono">
              <button
                onClick={() => { setTimelineMode("past"); setRestorationProgress(100); }}
                className={`py-2 rounded-xl border uppercase font-bold transition-all duration-150 cursor-pointer ${
                  timelineMode === "past" 
                    ? "bg-[#8C6239] border-[#8C6239] text-white" 
                    : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#8C765C] hover:text-[#35261A]"
                }`}
              >
                {t("pastLabel")}
              </button>

              <button
                onClick={() => { setTimelineMode("present"); setRestorationProgress(0); }}
                className={`py-2 rounded-xl border uppercase font-bold transition-all duration-150 cursor-pointer ${
                  timelineMode === "present" ? "bg-[#2A9D90] border-[#2A9D90] text-white" : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#8C765C] hover:text-[#35261A]"
                }`}
              >
                {t("presentLabel")}
              </button>

              <button
                onClick={() => { setTimelineMode("future"); setRestorationProgress(0); }}
                className={`py-2 rounded-xl border uppercase font-bold transition-all duration-150 cursor-pointer ${
                  timelineMode === "future" 
                    ? "bg-red-600 border-red-600 text-white" 
                    : "bg-[#FFFFFC] border-[#E8DFC8]/60 text-[#8C765C] hover:text-[#35261A]"
                }`}
              >
                {t("futureLabel")}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Control console controls row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-[#E8DFC8]/40 relative z-10 text-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className={`flex items-center gap-1.5 py-2 px-3 tracking-wider rounded-xl border text-[10px] font-mono uppercase transition-all duration-300 cursor-pointer ${
              showWireframe 
                ? "bg-[#2A9D90]/10 text-[#2A9D90] border-[#2A9D90]/40 font-bold" 
                : "bg-white text-[#8C765C] border-[#E8DFC8] hover:text-[#35261A]"
            }`}
          >
            <Eye size={12} />
            {showWireframe ? t("polygonsHide") : t("wireframeNet")}
          </button>

          <button
            onClick={triggerCalibrationVec}
            className="flex items-center gap-1.5 py-2 px-3 tracking-wider border border-[#E8DFC8] bg-white text-[#8C765C] hover:text-[#8C6239] rounded-xl text-[10px] font-mono uppercase transition-all cursor-pointer font-bold"
          >
            <RotateCw size={12} className={labStatus.includes("ANAL") ? "animate-spin" : ""} />
            LAB_RESET
          </button>
        </div>

        <div className="flex items-center gap-4 text-[#8C765C] font-mono text-[9px] font-bold">
          <div className="flex items-center gap-1">
            <span>ZOOM:</span>
            <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))} className="p-1.5 border border-[#E8DFC8] rounded-lg bg-white hover:text-[#8C6239] cursor-pointer">
              <ZoomOut size={11} />
            </button>
            <span className="text-[#35261A] w-8 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))} className="p-1.5 border border-[#E8DFC8] rounded-lg bg-white hover:text-[#8C6239] cursor-pointer">
              <ZoomIn size={11} />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span>AUTO-SPIN:</span>
            <input
              type="checkbox"
              checked={isRotating}
              onChange={(e) => setIsRotating(e.target.checked)}
              className="rounded border-[#E8DFC8] bg-white text-[#8C6239] focus:ring-0 cursor-pointer w-4 h-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
