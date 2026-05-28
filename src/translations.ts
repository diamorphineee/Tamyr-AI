import { Language } from "./types";

export const translations: Record<string, Record<Language, string>> = {
  // Navigation & General
  appName: {
    en: "TAMYR AI",
    kk: "ТАМЫР AI",
    ru: "ТАМЫР AI"
  },
  tagline: {
    en: "National AI Scientific Platform for Historical & Cultural Heritage Preservation of Kazakhstan",
    kk: "Қазақстанның тарихи-мәдени мұрасын сақтауға арналған Ұлттық AI ғылыми платформасы",
    ru: "Национальная научная платформа ИИ для сохранения историко-культурного наследия Казахстана"
  },
  unescoNASA: {
    en: "UNITED KAZAKHSTAN HERITAGE ARCHIVE & RESTORATION PROJECT",
    kk: "ҚАЗАҚСТАННЫҢ БІРІККЕН МҰРА МҰРАҒАТЫ ЖӘНЕ РЕСТАВРАЦИЯ ЖОБАСЫ",
    ru: "ОБЪЕДИНЕННЫЙ АРХИВ НАСЛЕДИЯ КАЗАХСТАНА И ЦИФРОВАЯ РЕСТАВРАЦИЯ"
  },
  scanner: {
    en: "AI Spectrometer",
    kk: "AI Спектрометрі",
    ru: "ИИ Спектрометр"
  },
  reconstruction: {
    en: "Digital Restoration",
    kk: "Сандық Реставрация",
    ru: "Цифровая Реставрация"
  },
  predictive: {
    en: "Predictive Analytics",
    kk: "Болжамдық Талдау",
    ru: "Прогностический Анализ"
  },
  interactiveMap: {
    en: "Expedition Map",
    kk: "Экспедиция Картасы",
    ru: "Экспедиционная Карта"
  },
  digitalTwin: {
    en: "Digital Restoration Twin",
    kk: "Сандық Реставрация Егізі",
    ru: "Цифровой Двойник Памятников"
  },
  iotSensor: {
    en: "Microclimate Sensors",
    kk: "Микроклиматтың Сенсорлары",
    ru: "Микроклиматические Датчики"
  },
  dashboard: {
    en: "Academic Lab",
    kk: "Академиялық Зертхана",
    ru: "Академическая Лаборатория"
  },
  landing: {
    en: "Heritage Overview",
    kk: "Мұра Шолуы",
    ru: "Главная Страница"
  },

  // Landing Page Elements
  discoverMission: {
    en: "PRESERVING THE ANCIENT SILK ROAD CIVILIZATIONS OF KAZAKHSTAN WITH SCIENTIFIC RESTORATIVE AI NETWORK MODELS",
    kk: "ҚАЗАҚСТАННЫҢ ЕЖЕЛГІ ЖІБЕК ЖОЛЫ ӨРКЕНИЕТТЕРІН ҒЫЛЫМИ РЕСТАВРАЦИЯЛЫҚ AI МОДЕЛДЕРІМЕН САҚТАУ",
    ru: "СОХРАНЕНИЕ ДРЕВНЕГО НАСЛЕДИЯ ШЕЛКОВОГО ПУТИ КАЗАХСТАНА С ПОМОЩЬЮ ИИ-МОДЕЛЕЙ ЦИФРОВОЙ РЕСТАВРАЦИИ"
  },
  scienceGradePreservation: {
    en: "TAMYR AI uses Computer Vision, microclimate diagnostics, and structural preservation tracking in compliance with UNESCO world-heritage criteria.",
    kk: "ТАМЫР AI ЮНЕСКО-ның дүниежүзілік мұра критерийлеріне сәйкес компьютерлік көруді, микроклиматтық диагностиканы және құрылымдық сақтауды қадағалауды пайдаланады.",
    ru: "ТАМЫР AI использует алгоритмы компьютерного зрения, климатическую микродиагностику и прогнозирование сохранности по стандартам ЮНЕСКО."
  },
  systemStatus: {
    en: "UNESCO Preservation Model Active",
    kk: "ЮНЕСКО сақтау моделі белсенді",
    ru: "Модель сохранения ЮНЕСКО активна"
  },
  activeSatellites: {
    en: "REST LEVEL: INTEGRAL",
    kk: "ҚАЛПЫНА КЕЛТІРУ МӘРТЕБЕСІ: ТОЛЫҚ",
    ru: "СТАТУС СОХРАНЕНИЯ: ЦЕЛОСТНЫЙ"
  },
  aboutProject: {
    en: "About Tamyr Platform",
    kk: "Тамыр платформасы туралы",
    ru: "О платформе Тамыр"
  },
  preservationMission: {
    en: "Preservation Mission",
    kk: "Сақтау миссиясы",
    ru: "Миссия Сохранения"
  },
  exploreTechs: {
    en: "Scientific Innovation",
    kk: "Ғылыми инновациялар",
    ru: "Научные Инновации"
  },
  launchConsole: {
    en: "Enter Heritage Research Cabinet",
    kk: "Ғылыми-зерттеу кабинетіне кіру",
    ru: "Войти в Научно-Исследовательский Кабинет"
  },

  // 1. AI Heritage Scanner Page
  uploadTitle: {
    en: "HERITAGE SURFACE HIGH-RES SPECTROMETER SCANNER",
    kk: "МҰРАНЫҢ БЕТКІ ҚАБАТЫН ЖОҒАРЫ АЖЫРАТЫМДЫ SPECTROMETER СКАННЕРІ",
    ru: "ВЫСОКОТОЧНЫЙ СПЕКТРОМЕТРИЧЕСКИЙ СКАНЕР ПОВЕРХНОСТИ"
  },
  dragDropText: {
    en: "DRAG & DROP IMAGE OR CLICK TO SELECT HIGH-RES TELEMETRY PHOTO",
    kk: "ЖОҒАРЫ САПАЛЫ ТЕЛЕМЕТРИЯЛЫҚ СУРЕТТІ ТАРТЫҢЫЗ НЕМЕСЕ ТАҢДАУ ҮШІН БАСЫҢЫЗ",
    ru: "ПЕРЕТАЩИТЕ ИЗОБРАЖЕНИЕ ИЛИ НАЖМИТЕ ДЛЯ ВЫБОРА ТЕЛЕМЕТРИЧЕСКОГО СНИМКА"
  },
  dropActive: {
    en: "RELEASE TO INJECT INTO MATRIX",
    kk: "МАТРИЦАҒА ЕНГІЗУ ҮШІН ЖІБЕРІҢІЗ",
    ru: "ОТПУСТИТЕ ДЛЯ ЗАГРУЗКИ В МАТРИЦУ"
  },
  useCameraBtn: {
    en: "ACTIVATE CAMERA SENSORS & LIDAR",
    kk: "КАМЕРА СЕНСОРЛАРЫ МЕН LIDAR БЕЛСЕНДІРУ",
    ru: "АКТИВИРОВАТЬ КАМЕРНЫЙ СЕНСОР И LIDAR"
  },
  cameraReady: {
    en: "LIDAR OPTICAL MATRIX SECURED. PRESS SCAN.",
    kk: "LIDAR ОПТИКАЛЫҚ МАТРИЦАСЫ ҚАУІПСІЗ. СКАНИРЛЕУДІ БАСЫҢЫЗ.",
    ru: "ОПТИЧЕСКАЯ МАТРИЦА LIDAR ГОТОВА. НАЖМИТЕ СКАНИРОВАТЬ."
  },
  sampleImages: {
    en: "LOAD UNESCO EXPERIMENTAL CALIBRATION SAMPLES:",
    kk: "ЮНЕСКО ЭКСПЕРИМЕНТТІК КАЛИБРЛЕУ ҮЛГІЛЕРІН ЖҮКТЕУ:",
    ru: "ЗАГРУЗИТЬ КАЛИБРОВОЧНЫЕ ОБРАЗЦЫ ЮНЕСКО:"
  },
  scanRunning: {
    en: "EXECUTING COMPUTER VISION TENSOR LAB ANALYSIS...",
    kk: "КӨМПЬЮТЕРЛІК КӨРУ ТЕНЗОРЛЫҚ ЗЕРТХАНАЛЫҚ ТАЛДАУ ОРЫНДАЛУДА...",
    ru: "ВЫПОЛНЯЕТСЯ ТЕНЗОРНЫЙ АНАЛИЗ КОМПЬЮТЕРНЫМ ЗРЕНИЕМ..."
  },
  scanningDesc: {
    en: "Detecting structural shifts, micro-fracture progression, mechanical erosions, and mineral degradations...",
    kk: "Құрылымдық ығысуларды, микрожарықшақтардың дамуын, механикалық эрозияларды және минералдық деградацияны анықтау...",
    ru: "Обнаружение структурных сдвигов, прогрессирования микротрещин, механической эрозии и деградации минералов..."
  },
  aiConfidence: {
    en: "AI Lab Confidence Status",
    kk: "AI зертханалық сенімділік мәртебесі",
    ru: "Статус Уверенности ИИ"
  },
  heritageRiskScore: {
    en: "HERITAGE RISK SCORE",
    kk: "МҰРА ТӘУЕКЕЛДІГІНІҢ БАҒАСЫ",
    ru: "ИНДЕКС РИСКА НАСЛЕДИЯ"
  },
  crackDensity: {
    en: "Crack Mechanical Density",
    kk: "Жарықтардың механикалық тығыздығы",
    ru: "Плотность Трещин и Микротрещин"
  },
  surfaceDamage: {
    en: "Surface Material Loss Rate",
    kk: "Беткі материалдың бұзылу деңгейі",
    ru: "Степень Повреждения Поверхности"
  },
  degradationLevel: {
    en: "Environmental Erosion Impact",
    kk: "Қоршаған ортаның эрозиялық әсері",
    ru: "Уровень Деградации Материала"
  },
  predictedFuture: {
    en: "Decadal Structural Integrity Forecast",
    kk: "Она жылдық құрылымдық тұтастықты болжау",
    ru: "Десятилетний Прогноз Целостности"
  },
  heatmapOverlay: {
    en: "CV SPECTRUM OVERLAY (HEATMAP)",
    kk: "CV СПЕКТР ИНКРУСТАЦИЯСЫ (ҚЫЗУ КАРТАСЫ)",
    ru: "НАЛОЖЕНИЕ СПЕКТРА КОМПЬЮТЕРНОГО ЗРЕНИЯ"
  },
  toggleHeatmap: {
    en: "TOGGLE HEATMAP / EDGE SCAN",
    kk: "ЖАРЫҚ КАРТАСЫН / ШЕКАРАЛЫҚ СКАНДЫ ҚОСУ",
    ru: "ПЕРЕКЛЮЧИТЬ ТЕПЛОВУЮ КАРТУ / СЕТКУ ТРЕЩИН"
  },
  annotationsHeader: {
    en: "TELEMETRY SPECS & ANNOTATIONS",
    kk: "ТЕЛЕМЕТРИЯЛЫҚ  СИПАТТАМАЛАР КАРТАСЫ",
    ru: "ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ И АННОТАЦИИ"
  },

  // 2. Reconstruction System Page
  reconsTitle: {
    en: "DIGITAL SPACE Restorative Comparison & Chrono-Slider",
    kk: "Сандық кеңістікті қабылдау және Хроно-слайдер",
    ru: "Реставрационное сравнение и Хроно-Слайдер"
  },
  reconsSub: {
    en: "Drag the slider to sweep between the ruined present-day state and the fully restored digital twin model matching structural archives",
    kk: "Қазіргі қираған күй мен мұрағаттық деректерге негізделген толық қалпына келтірілген бейне арасындағы байланысты бақылаңыз",
    ru: "Перемещайте слайдер для переключения между текущим состоянием и полностью восстановленным цифровым двойником по архивным чертежам"
  },
  pastLabel: {
    en: "PAST (ORIGINAL)",
    kk: "ӨТКЕН (ТАРИХИ)",
    ru: "ПРОШЛОЕ (ТАРИХИ)"
  },
  presentLabel: {
    en: "PRESENT (RUINS)",
    kk: "ҚАЗІРГІ СӘТ (БҮГІН)",
    ru: "НАСТОЯЩЕЕ (РАЗРУШЕНИЯ)"
  },
  futureLabel: {
    en: "FUTURE (FORECAST)",
    kk: "БОЛАШАҚ (БОЛЖАМ)",
    ru: "БУДУЩЕЕ (ПРОГНОЗ)"
  },
  restoreOriginalColors: {
    en: "AI Original Pigment Simulation",
    kk: "AI ежелгі пигменттерді қалпына келтіру",
    ru: "ИИ Симуляция Первородных Пигментов"
  },
  restoreStructural: {
    en: "AI Vector Fractal Regeneration",
    kk: "AI векторлық фрагменттерді қалпына келтіру",
    ru: "ИИ Векторная Регенерация Фрагментов"
  },

  // 3. Predictive Destruction Analytics
  formulaTitle: {
    en: "UNESCO MATHEMATICAL DEGRADATION ENGINE & RISK ESTIMATION",
    kk: "ЮНЕСКО ТОЗУДЫҢ МАТЕМАТИКАЛЫҚ МОДЕЛІ ЖӘНЕ ҚАУІП-ҚАТЕРЛЕРДІ БАҒАЛАУ",
    ru: "МАТЕМАТИЧЕСКАЯ МОДЕЛЬ ДЕГРАДАЦИИ ЮНЕСКО И ОЦЕНКА РИСКОВ"
  },
  formulaDisplay: {
    en: "Degradation over Time: D(t) = D₀ × e^(kt)  |  Risk Coef: R = 0.4C + 0.3H + 0.2T + 0.1V",
    kk: "Уақыт бойынша тозу: D(t) = D₀ × e^(kt)  |  Қауіп Коэф: R = 0.4C + 0.3H + 0.2T + 0.1V",
    ru: "Деградация во времени: D(t) = D₀ × e^(kt)  |  Коэф. Риска: R = 0.4C + 0.3H + 0.2T + 0.1V"
  },
  degradationRate: {
    en: "Degradation Constant (k)",
    kk: "Тозу коэффициенті (k)",
    ru: "Константа Деградации (k)"
  },
  vibrationImpact: {
    en: "Seismic Wind/Vibration Stress (V)",
    kk: "Сейсмикалық діріл жүктемесі (V)",
    ru: "Сейсмическая / Вибрационная Нагрузка (V)"
  },
  tempStress: {
    en: "Seasonal Temperature Stress (T)",
    kk: "Температуралық циклдік ауытқу (T)",
    ru: "Температурный Циклический Стресс (T)"
  },
  humidityImpact: {
    en: "Hydrothermal Humidity Impact (H)",
    kk: "Ылғалдылық және тұздану әсері (H)",
    ru: "Гидротермическое Воздействие Влаги (H)"
  },
  baseDegradation: {
    en: "Base Structural Weakness (D₀)",
    kk: "Бастапқы құрылымдық әлсіздік (D₀)",
    ru: "Начальное Ослабление Конструкции (D₀)"
  },
  simulationYears: {
    en: "Timeline Depth Focus (t in Years)",
    kk: "Болжау уақыт тереңдігі (t - Жыл)",
    ru: "Глубина Моделирования (t в годах)"
  },
  runSimulation: {
    en: "EXECUTE TELEMETRY MATRIX PROJECTION",
    kk: "ТЕЛЕМЕТРИЯЛЫҚ БОЛЖАЛДЫ ОРЫНДАУ",
    ru: "ЗАПУСТИТЬ ТЕЛЕМЕТРИЧЕСКУЮ ПРОЕКЦИЮ"
  },
  predictiveGraphHeader: {
    en: "PREDICTIVE DEGRADATION DYNAMICS & MICRO-CRACK PROPAGATION",
    kk: "ТОЗУ ДИНАМИКАСЫ ЖӘНЕ МИКРОЖАРЫҚШАҚТАРДЫҢ ДАМУЫН БОЛЖАУ",
    ru: "ДИНАМИКА ДЕГРАДАЦИИ И ПРОГНОЗИРОВАНИЕ РОСТА ТРЕЩИН"
  },
  environmentalFactors: {
    en: "Active Climate Vector Feedpoints",
    kk: "Климаттық белсенді деректер арнасы",
    ru: "Показатели Активных Климатических Факторов"
  },

  // 4. Map Section
  mapTitle: {
    en: "KAZAKHSTAN MONITORED ANTI-GRAVITY HERITAGE HEAT ZONE MAP",
    kk: "ҚАЗАҚСТАННЫҢ МОНИТОРИНГ ЖАСАЛАТЫН МҰРА КАРТАСЫ",
    ru: "КАРТА МОНИТОРИНГА НАСЛЕДИЯ КАЗАХСТАНА"
  },
  mapSub: {
    en: "Click on glowing active sensors to trigger telemetry lock, digital multi-spectral twins, and continuous risk assessment",
    kk: "Телеметрияны бекітуді, көпспектрлі сандық егіздерді және үздіксіз тәуекелдерді тауып бағалауды іске қосу үшін белсенді сенсорларды басыңыз",
    ru: "Нажмите на светящиеся датчики для захвата телеметрии, вызова мультиспектрального двойника и анализа рисков"
  },
  coordinates: {
    en: "Satellite Locked",
    kk: "Жерсерік бекітілді",
    ru: "Спутниковый Сектор Заблокирован"
  },
  coordinatesBrief: {
    en: "RADAR COORDINATES:",
    kk: "РАДАРЛЫҚ КООРДИНАТТАРЫ:",
    ru: "КООРДИНАТЫ РАДАРА:"
  },

  // 5. Digital Twin Section
  twinTitle: {
    en: "LIDAR HOLOGRAPHIC GEOPHYSICAL DIGITAL TWIN INSPECTOR",
    kk: "LIDAR ГОЛОГРАФИЯЛЫҚ ГЕОФИЗИКАЛЫҚ САНДЫҚ ЕГІЗ ИНСПЕКТОРЫ",
    ru: "LIDAR ГОЛОГРАФИЧЕСКИЙ ГЕОФИЗИЧЕСКИЙ ИНСПЕКТОР ДВОЙНИКА"
  },
  twinSub: {
    en: "Use dashboard buttons to run multi-angle laser swivels, structural wireframe analysis, and thermal matrix diagnostics",
    kk: "Көпбұрышты лазерлік айналуды, құрылымдық сымдық жақтау талдауын және термиялық матрицалық диагностиканы орындау үшін функцияларды пайдаланыңыз",
    ru: "Используйте кнопки управления для многоугольного лазерного сканирования, анализа трехмерной сетки и тепловизора"
  },
  rotateTwin: {
    en: "LASER SWIVEL OPTICAL MATRIX",
    kk: "ОПТИКАЛЫҚ СҮЗГІНІ АЙНАЛДЫРУ",
    ru: "ВРАЩАТЬ ОПТИЧЕСКУЮ МАТРИЦУ"
  },
  wireframeView: {
    en: "VECTOR STRUCTURAL WIREFRAME",
    kk: "ВЕКТОРЛЫҚ СЫМДЫҚ ЖАҚТАУ",
    ru: "ВЕКТОРНАЯ СЕТКА КОНСТРУКЦИИ"
  },
  thermalMatrix: {
    en: "THERMOGRAPHIC RADAR DEPTH",
    kk: "ТЕРМОГРАФИЯЛЫҚ РАДАР ТЕРЕҢДІГІ",
    ru: "ТЕРМОГРАФИЧЕСКИЙ РАДАР ГЛУБИНЫ"
  },
  recalibrateLidar: {
    en: "RECALIBRATE QUANTUM FLUX",
    kk: "КВАНТТЫҚ АҒЫНДЫ ҚАЙТА КАЛИБРЛЕУ",
    ru: "ПЕРЕКАЛИБРОВАТЬ КВАНТОВЫЙ ПОТОК"
  },

  // 6. IoT Sensor Monitoring
  sensorOverview: {
    en: "REAL-TIME IoT MULTI-SPECTRAL TELEMETRY SENSORS",
    kk: "НАҚТЫ УАҚЫТТАҒЫ IoT КӨПСПЕКТРЛІ ТЕЛЕМЕТРИЯЛЫҚ СЕНСОРЛАР СЕРИЯСЫ",
    ru: "СЕРИЯ ДАТЧИКОВ МУЛЬТИСПЕКТРАЛЬНОЙ ТЕЛЕМЕТРИИ IoT"
  },
  sensorExplain: {
    en: "Continuous 5-channel data stream directly from site environmental modules. Alerts auto-trigger above critical thresholds.",
    kk: "Нысанның экологиялық модульдерінен тікелей 5 арналы үздіксіз деректер ағыны. Сын деңгейден асқанда дабылдар іске қосылады.",
    ru: "Непрерывный 5-канальный поток данных напрямую с экологических модулей объекта. Оповещения срабатывают при превышении порогов."
  },
  tempLabel: {
    en: "THERMAL INDEX",
    kk: "ТЕМПЕРАТУРАЛЫҚ ИНДЕКС",
    ru: "ТЕМПЕРАТУРНЫЙ РЕЖИМ"
  },
  humidLabel: {
    en: "HYDROTHERMIC IMPACT",
    kk: "ЫЛҒАЛДЫЛЫҚ ДӘРЕЖЕСІ",
    ru: "ГИДРОТЕРМИЧЕСКАЯ ВЛАЖНОСТЬ"
  },
  uvLabel: {
    en: "UV INTENSITY RATIO",
    kk: "УЛЬТРАКҮЛГІН СӘУЛЕЛЕНУ",
    ru: "ИНТЕНСИВНОСТЬ УФ-ИЗЛУЧЕНИЯ"
  },
  vibLabel: {
    en: "STRUCTURAL MICRO-SEISMICS",
    kk: "МИКРОСЕЙСМИКАЛЫҚ ДІРІЛДЕР",
    ru: "МИКРОСЕЙСМИЧЕСКИЕ ВИБРАЦИИ"
  },
  windLabel: {
    en: "WIND VELOCITY FORCE",
    kk: "ЖЕЛ КҮШІ ЖӘНЕ ЖЫЛДАМДЫҚ",
    ru: "СИЛА И СКОРОСТЬ ВЕТРА"
  },

  // 7. Research Lab & Report Generator
  researchHeader: {
    en: "UNESCO-NASA SCIENTIFIC LAB PORTAL & ARCHIVE COMPARATOR",
    kk: "ЮНЕСКО-НАСА ҒЫЛЫМИ ЗЕРТХАНАСЫ ЖӘНЕ САЛЫСТЫРМАЛЫ МҰРАҒАТ",
    ru: "КОМПАРАТОР НАУЧНОГО АРХИВА ЮНЕСКО-НАСА И ЛАБОРАТОРИЯ"
  },
  generateAIReport: {
    en: "GENERATE MULTI-MODAL AI DIAGNOSIS REPORT",
    kk: "ЖАН-ЖАҚТЫ AI ДИАГНОСТИКАЛЫҚ ЕСЕПТІ ДАЙЫНДАУ",
    ru: "СФОРМИРОВАТЬ НЕЙРО-ОТЧЕТ КОМПЛЕКСНОЙ ДИАГНОСТИКИ"
  },
  exportPdfBtn: {
    en: "DOWNLOAD SECURED SCIENTIFIC PDF MANUAL",
    kk: "ҚАУІПСІЗ ҒЫЛЫМИ PDF НҰСҚАУЛЫҚТЫ ЖҮКТЕУ",
    ru: "СКАЧАТЬ ОФИЦИАЛЬНЫЙ НАУЧНЫЙ ОТЧЕТ В PDF"
  },
  materialsComparative: {
    en: "LANDMARK INTEGRITY STATUS MATRIX",
    kk: "МҰРАЛАРДЫҢ ТҰТАСТЫҒЫ СИПАТТАМА МАТРИЦАСЫ",
    ru: "МАТРИЦА СРАВНИТЕЛЬНОЙ ХАРАКТЕРИСТИКИ НАСЛЕДИЯ"
  },

  // Interactive dialog triggers
  landmarkLabel: {
    en: "Monitored Landmark",
    kk: "Бақыланатын тарихи орын",
    ru: "Контролируемый Объект"
  },
  eraLabel: {
    en: "Historical Era",
    kk: "Тарихи дәуірі",
    ru: "Историческая Эпоха"
  },
  materialLabel: {
    en: "Main Material Structure",
    kk: "Негізгі материалдық құрылымы",
    ru: "Основной Материал"
  },
  currentRiskStatusLabel: {
    en: "AI Structural Alarm Status",
    kk: "AI құрылымдық дабыл жағдайы",
    ru: "Статус Тревоги Конструкции"
  },

  // New mathematical model & slider translation keys
  statisticalCompliance: {
    en: "STATISTICAL CLIMATE COMPLIANT",
    kk: "КЛИМАТТЫҚ СТАТИСТИКАҒА СӘЙКЕС",
    ru: "СООТВЕТСТВУЕТ КЛИМАТИЧЕСКИМ СТАНДАРТАМ"
  },
  activeComputationMatrix: {
    en: "ACTIVE REGIONAL DEGRADATION COMPUTATION MATRIX",
    kk: "БЕЛСЕНДІ АЙМАҚТЫҚ ТОЗУДЫ ЕСЕПТЕУ МАТРИЦАСЫ",
    ru: "АКТИВНАЯ МАТРИЦА РАСЧЕТА РЕГИОНАЛЬНОЙ ДЕГРАДАЦИИ"
  },
  calcDecayCoef: {
    en: "Calculated dynamic decay coefficient for",
    kk: "Келесі нысан үшін есептелген динамикалық тозу коэффициенті:",
    ru: "Рассчитанный динамический коэффициент распада для"
  },
  climateHistoricControls: {
    en: "CLIMATE HISTORIC CONTROLS",
    kk: "ТАРИХИ КЛИМАТ КҮЙЛЕРІН БАСҚАРУ",
    ru: "ИСТОРИЧЕСКИЙ КОНТРОЛЬ КЛИМАТА"
  },
  relativeHumidity: {
    en: "Relative Humidity (H)",
    kk: "Салыстырмалы ылғалдылық (H)",
    ru: "Относительная влажность (H)"
  },
  annualTempDelta: {
    en: "Annual Temperature Delta (T)",
    kk: "Жылдық температуралық ауытқу (T)",
    ru: "Годовой перепад температур (T)"
  },
  solarUv: {
    en: "Solar UV Radiation (UV)",
    kk: "Күн ультракүлгін сәулеленуі (UV)",
    ru: "Солнечная УФ-радиация (UV)"
  },
  windAbrVelocity: {
    en: "Wind Abrasion Velocity (W)",
    kk: "Желдік үгілу жылдамдығы (W)",
    ru: "Скорость ветровой абразии (W)"
  },
  seismicVib: {
    en: "Seismic/Ground Vibrations (V)",
    kk: "Сейсмикалық/Жер қыртысының дірілдері (V)",
    ru: "Сейсмические/Грунтовые вибрации (V)"
  },
  activeCoreVuln: {
    en: "Active Core Vulnerability (D₀)",
    kk: "Бастапқы белсенді осалдық (D₀)",
    ru: "Активная базовая уязвимость (D₀)"
  },
  degradation: {
    en: "DEGRADATION",
    kk: "ТОЗУ ДЕҢГЕЙІ",
    ru: "ДЕГРАДАЦИЯ"
  },
  riskEnvelope: {
    en: "RISK ENVELOPE",
    kk: "ҚАУІП ШЕГІ",
    ru: "ЗОНА РИСКА"
  },
  timelineSimScale: {
    en: "TIMELINE SIMULATION SCALE",
    kk: "БОЛЖАУ УАҚЫТЫНЫҢ ШЕГІ",
    ru: "ШКАЛА МОДЕЛИРОВАНИЯ ВРЕМЕНИ"
  },
  yearsForecast: {
    en: "YEARS FORECAST",
    kk: "ЖЫЛДАРДЫҢ БОЛЖАМЫ",
    ru: "ЛЕТ ПРОГНОЗА"
  },
  decayIn5: {
    en: "DECAY IN 5 YRS",
    kk: "5 ЖЫЛДАҒЫ ТОЗУ",
    ru: "РАСПАД ЗА 5 ЛЕТ"
  },
  decayIn10: {
    en: "DECAY IN 10 YRS",
    kk: "10 ЖЫЛДАҒЫ ТОЗУ",
    ru: "РАСПАД ЗА 10 ЛЕТ"
  },
  yearDecay: {
    en: "YEAR DECAY",
    kk: "ЖЫЛДЫҚ ТОЗУ",
    ru: "РАСПАД ЗА ГОД"
  },
  estimatedShift: {
    en: "ESTIMATED SHIFT",
    kk: "БОЛЖАЛДЫ ӨЗГЕРІС",
    ru: "ОЖИДАЕМЫЙ СДВИГ"
  },
  acuteAttrition: {
    en: "ACUTE ATTRITION",
    kk: "ЕЛЕУЛІ ТОЗУ",
    ru: "ОСТРОЕ ИСТОЩЕНИЕ"
  },
  matrixPoint: {
    en: "MATRIX POINT",
    kk: "МАТРИЦА НҮКТЕСІ",
    ru: "ТОЧКА МАТРИЦЫ"
  },
  desertMin: {
    en: "Desert minimum",
    kk: "Шөлейтті деңгей",
    ru: "Пустынный минимум"
  },
  temperateLabel: {
    en: "Temperate",
    kk: "Қоңыржай",
    ru: "Умеренно"
  },
  maxDrop: {
    en: "max drop",
    kk: "макс. төмендеу",
    ru: "макс. перепад"
  },
  lowProtection: {
    en: "Low protection",
    kk: "Төмен қорғаныс",
    ru: "Слабая защита"
  },
  breeze: {
    en: "Breeze",
    kk: "Жеңіл жел",
    ru: "Бриз"
  },
  maxWind: {
    en: "max wind",
    kk: "макс. жел күші",
    ru: "макс. ветер"
  },
  inertSoil: {
    en: "Inert soil",
    kk: "Инертті топырақ",
    ru: "Инертный грунт"
  },
  background: {
    en: "background",
    kk: "фонды",
    ru: "фоновые"
  },
  liveFeed: {
    en: "LIVE-FEED",
    kk: "ТІКЕЛЕЙ АРНА",
    ru: "ПРЯМОЙ КАНАЛ"
  },
  
  // Dualslider Reconstruction view additionals
  rebuildLabel: {
    en: "REBUILD",
    kk: "ҚАЛПЫНА КЕЛТІРУ",
    ru: "РЕКОНСТРУКЦИЯ"
  },
  weatheredLabel: {
    en: "Weathered",
    kk: "Бұзылған",
    ru: "Разрушено"
  },
  xmlEraPast: {
    en: "XI-XII CENTURIES",
    kk: "XI-XII ҒАСЫРЛАР",
    ru: "XI-XII ВЕКА"
  },
  xmlEraPresent: {
    en: "PRESENT (MODERNITY)",
    kk: "БҮГІН (ҚАЗІРГІ СӘТ)",
    ru: "СОВРЕМЕННОСТЬ"
  },
  xmlEraFuture: {
    en: "FUTURE FORECAST (NO ACTION)",
    kk: "БОЛАШАҚ БОЛЖАМ (ЕМ СИПАТСЫЗ)",
    ru: "ПРОГНОЗ БЕЗ МЕР"
  },

  // Twin additions
  envLayersLabel: {
    en: "ENVIRONMENT LAYERS",
    kk: "ҚОРШАҒАН ОРТА ҚАБАТТАРЫ",
    ru: "ЭКОЛОГИЧЕСКИЕ СЛОИ"
  },
  moistureLabel: {
    en: "Moisture",
    kk: "Ылғалдылық",
    ru: "Влажность"
  },
  solarUvLabel: {
    en: "Solar UV",
    kk: "Күн ультракүлгіні",
    ru: "Солнечный УФ"
  },
  windTwinLabel: {
    en: "Wind",
    kk: "Жел",
    ru: "Ветер"
  },
  seismicLabel: {
    en: "Seismic",
    kk: "Сейсмика",
    ru: "Сейсмика"
  },
  reconsSliderLabel: {
    en: "RECONSTRUCTION SLIDER",
    kk: "ҚАЛПЫНА КЕЛТІРУ СЛАЙДЕРІ",
    ru: "СЛАЙДЕР РЕКОНСТРУКЦИИ"
  },
  timelineShift: {
    en: "TIMELINE SHIFT",
    kk: "УАҚЫТ ШЕГІН ЖЫЛЖЫТУ",
    ru: "СДВИГ ВО ВРЕМЕНИ"
  },
  polygonsHide: {
    en: "POLYGONS HIDE",
    kk: "КӨПБҰРЫШТАРДЫ ЖАСЫРУ",
    ru: "СКРЫТЬ ПОЛИГОНЫ"
  },
  wireframeNet: {
    en: "WIREFRAME NET",
    kk: "ҚАҢҚАЛЫҚ ТОР",
    ru: "КАРКАСНАЯ СЕТКА"
  },
  cleanUnit: {
    en: "CLEAN UNIT",
    kk: "НАТИЖЕНІ ТАЗАРТУ",
    ru: "ОЧИСТИТЬ ЭКРАН"
  },
  lidarScanningStatus: {
    en: "LIDAR SURFACE SCANNING: NOMINAL",
    kk: "LIDAR БЕТКІ СКАНЕРЛЕУ: БІРҚАЛЫПТЫ",
    ru: "LIDAR СКАНИРОВАНИЕ ПОВЕРХНОСТИ: НОРМА"
  },
  lidarStructuralMetrics: {
    en: "LIDAR STRUCTURAL METRICS",
    kk: "LIDAR ҚҰРЫЛЫМДЫҚ МЕТРИКАЛАРЫ",
    ru: "СТРУКТУРНЫЕ МЕТРИКИ LIDAR"
  },
  surfaceErosionIndex: {
    en: "SURFACE EROSION INDEX",
    kk: "БЕТКІ ЭРОЗИЯ КӨРСЕТКІШІ",
    ru: "ИНДЕКС ЭРОЗИИ ПОВЕРХНОСТИ"
  },
  crackShiftGrowthRatio: {
    en: "CRACK SHIFT GROWTH RATIO",
    kk: "ЖАРЫҚ ТРАЕКТОРИЯСЫНЫҢ ӨСУ КӨРСЕТКІШІ",
    ru: "СКОРОСТЬ РАСШИРЕНИЯ ТРЕЩИН"
  },
  moistureRefractionDamp: {
    en: "MOISTURE REFRACTION DAMP",
    kk: "ЫЛҒАЛДЫҢ СІҢУ ДӘРЕЖЕСІ",
    ru: "СТЕПЕНЬ ВЛАЖНОСТНОГО НАСЫЩЕНИЯ"
  },
  structuralStressBounds: {
    en: "STRUCTURAL STRESS BOUNDS",
    kk: "ҚҰРЫЛЫМДЫҚ ШЕКТІ КҮШТЕМЕ",
    ru: "ПРЕДЕЛЫ СТРУКТУРНОГО НАПРЯЖЕНИЯ"
  },
  tamyrPlatformConfiguration: {
    en: "TAMYR PLATFORM CONFIGURATION",
    kk: "ТАМЫР ПЛАТФОРМА СИПАТТАМАЛАРЫ",
    ru: "КОНФИГУРАЦИЯ ПЛАТФОРМЫ ТАМЫР"
  },
  systemSimulationSettings: {
    en: "System Simulation Settings",
    kk: "Жүйені модельдеу күйлері",
    ru: "Настройки Симуляции Системы"
  },
  riskWeightCoefficients: {
    en: "Risk Weight Coefficients",
    kk: "Қауіп коэффиценттері",
    ru: "Коэффициенты веса факторов риска"
  },
  customizeWeightCalibrations: {
    en: "Customize weight calibrations contributing to the composite risk alarm scores across high-precision climate models.",
    kk: "Дәлдігі жоғары климаттық модельдер бойынша қауіптің аралас дабыл бағаларына әсер ететін салмақты калибрлеуді бейімдеу.",
    ru: "Настройка весовых коэффициентов деградации, влияющих на общий уровень риска в высокоточных климатических моделях."
  },
  moisturePenetrationWeight: {
    en: "Moisture Penetration Weight",
    kk: "Ылғалдың сіңу салмағы",
    ru: "Вес Влажностного Проникновения"
  },
  seismicVibrationStressWeight: {
    en: "Seismic / Vibration Stress Weight",
    kk: "Сейсмикалық / Діріл жүктемесінің салмағы",
    ru: "Вес Сейсмической / Вибрационной Нагрузки"
  },
  environmentalHumidityWeight: {
    en: "Environmental Humidity Weight",
    kk: "Қоршаған орта ылғалдылық салмағы",
    ru: "Вес Влажности Окружающей Среды"
  },
  temperatureStressWeight: {
    en: "Temperature Stress Weight",
    kk: "Температуралық күйзеліс салмағы",
    ru: "Вес Температурного Напряжения"
  },
  platformIntegrationDiagnostics: {
    en: "Platform Integration Diagnostics",
    kk: "Платформа диагностикасы",
    ru: "Диагностические Панели"
  },
  restEngineStatus: {
    en: "REST Engine Status:",
    kk: "REST қозғалтқышының күйі:",
    ru: "Статус REST Модуля:"
  },
  onlineOperational: {
    en: "ONLINE OPERATIONAL",
    kk: "ЖҰМЫС ІСТЕП ТҰР",
    ru: "АКТИВЕН / РАБОТАЕТ"
  },
  geminiIntegration: {
    en: "Gemini Integration:",
    kk: "Gemini интеграциясы:",
    ru: "Интеграция с Gemini:"
  },
  nasaLidarCoordinates: {
    en: "NASA LIDAR coordinates:",
    kk: "NASA LIDAR координаттары:",
    ru: "NASA LIDAR Координаты:"
  },
  wgs84Calibrated: {
    en: "WGS84 calibrated",
    kk: "WGS84 калибрленген",
    ru: "WGS84 откалибровано"
  },
  unescoCriteriaStatus: {
    en: "UNESCO Criteria Status:",
    kk: "ЮНЕСКО өлшемшарттарының күйі:",
    ru: "Статус Критериев ЮНЕСКО:"
  },
  categoryIiCompliant: {
    en: "Category-II Compliant",
    kk: "II санатқа сәйкес",
    ru: "Соответствует II Категории"
  },
  reInitializeHeritageCoefficients: {
    en: "RE-INITIALIZE HERITAGE COEFFICIENTS",
    kk: "МҰРА КОЭФФИЦИЕНТТЕРІН ҚАЙТА ҚОРЫТЫНДЫЛАУ",
    ru: "СБРОСИТЬ И ПЕРЕКАЛИБРОВАТЬ КОЭФФИЦИЕНТЫ"
  }
};
