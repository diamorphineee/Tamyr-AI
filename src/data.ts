import { Landmark } from "./types";

export const landmarksData: Landmark[] = [
  {
    id: "yasawi",
    name: {
      en: "Khoja Ahmed Yasawi Mausoleum",
      kk: "Қожа Ахмет Ясауи кесенесі",
      ru: "Мавзолей Ходжи Ахмеда Ясави"
    },
    region: {
      en: "Turkistan, South Kazakhstan",
      kk: "Түркістан, Оңтүстік Қазақстан",
      ru: "Туркестан, Южный Казахстан"
    },
    coordinates: { lat: "43.2983° N", lng: "68.2711° E", x: 42, y: 72 },
    era: {
      en: "Late 14th Century (Timurid Era)",
      kk: "XIV ғасырдың соңы (Әмір Темір дәуірі)",
      ru: "Конец XIV века (Эпоха Тимуридов)"
    },
    description: {
      en: "A masterpiece of Timurid architecture standing 38.7 meters high. It features the largest brick dome in Central Asia, decorated with glazed tiles and Quranic calligraphy. Active preservation struggles with rising dampness, structural micro-cracks in support piers, and salt crystallization on historical bricks.",
      kk: "Биіктігі 38,7 метр болатын Темір дәуірі сәулет өнерінің жауһары. Қазақстандағы ең үлкен кірпіш күмбезге ие, қыш тыстармен және Құран каллиграфиясымен безендірілген. Қорғау жұмыстары негізгі тіректердегі ішкі ылғалдылықпен және тұздану процесімен үздіксіз күресіп келеді.",
      ru: "Шедевр тимуридской архитектуры высотой 38,7 метров с самым большим кирпичным кудолом в Центральной Азии. Фасады украшены глазурованной плиткой и каллиграфией. Сохранение затруднено капиллярным подъемом грунтовых вод, солевой кристаллизацией и микротрещинами опорных пилонов."
    },
    riskLevel: "HIGH",
    riskScore: 78,
    crackDensity: 2.34,
    material: {
      en: "Ganch Mortar & Glazed Terracotta Bricks",
      kk: "Ганч ерітіндісі және күйдірілген кірпіштер",
      ru: "Ганчевый раствор и обожженный глазурованный кирпич"
    },
    climateProfile: {
      city: "Turkestan",
      avgTempDelta: 63.5, // Extreme desert continental thermal span (-20°C winter to +43.5°C summer)
      avgHumidity: 31.4,  // Dry desert humidity index
      annualPrecipitation: 188.0, // Low desert rainfall in mm
      avgUvIndex: 9.2,   // High solar UV radiation load
      avgWindSpeed: 4.6,  // Steady hot winds leading to salt weathering
      seismicVibrations: 0.08 // Stable core tectonic zone
    },
    iotSensors: {
      temperature: 24.3,
      humidity: 31.4,
      uvExposure: 180,
      vibration: 0.12,
      windImpact: 4.8,
      history: [
        { timestamp: "00:00", temp: 18.2, humidity: 35, uv: 0, vibe: 0.10 },
        { timestamp: "04:00", temp: 16.5, humidity: 38, uv: 0, vibe: 0.08 },
        { timestamp: "08:00", temp: 21.0, humidity: 33, uv: 80, vibe: 0.15 },
        { timestamp: "12:00", temp: 28.5, humidity: 25, uv: 250, vibe: 0.22 },
        { timestamp: "16:00", temp: 29.1, humidity: 22, uv: 190, vibe: 0.18 },
        { timestamp: "20:00", temp: 22.4, humidity: 30, uv: 5, vibe: 0.11 }
      ]
    },
    metrics: {
      surfaceErosion: 18.4,
      crackGrowthRate: 0.42,
      moisturePenetration: 42.1,
      structuralStress: 4.8
    },
    reconstruction: {
      pastDescription: {
        en: "Completed in 1405 by order of Emir Timur, fully clad in glorious glowing turquoise tiles, presenting absolute structural geometry and sharp gold calligraphy borders.",
        kk: "1405 жылы Әмір Темірдің бұйрығымен аяқталған, толықтай көгілдір және алтын түстес қыштармен қапталған, геометриясы мінсіз сәулет өнерінің символы.",
        ru: "Завершен в 1405 году по приказу Тамерлана, полностью облицованный сияющей бирюзовой глазурью, с идеальной геометрией и четкими золотыми каллиграфическими фризами."
      },
      presentDescription: {
        en: "Unfinished portals due to Timur's death; missing external tile sectors on specific walls; surface erosion and crack development on the northern piers.",
        kk: "Әмір Темірдің өліміне байланысты аяқталмаған негізгі портал; солтүстік қабырғаларындағы қыш қаптаманың түсуі; микрожарықтардың пайда болуы.",
        ru: "Недостроенный главный портал из-за смерти Тимура; утрата наружных изразцов на боковых стенах; выветривание швов кирпичной кладки на северных пилонах."
      },
      futurePredictedDescription: {
        en: "Without active AI-guided moisture drying and structural reinforcement, moisture will expand crack channels by 12% in 5 years, with mosaic crumbling on critical segments.",
        kk: "Белсенді ылғалды жою және тіректерді нығайту жұмыстары жүргізілмесе, жарықшақтар 5 жылда 12%-ға ұлғайып, мозаикалар түсе бастайды.",
        ru: "Без активного осушения опор и укрепления фундаментов, трещины и мозаичное осыпание расширятся на 12% за 5 лет на критических несущих пилонах."
      },
      beforeImage: "yasawi_before",
      afterImage: "yasawi_after"
    }
  },
  {
    id: "tamgaly",
    name: {
      en: "Tamgaly Petroglyphs",
      kk: "Тамғалы петроглифтері",
      ru: "Петроглифы Тамгалы"
    },
    region: {
      en: "Zhetysu Region, East Kazakhstan",
      kk: "Жетісу облысы, Шығыс Қазақстан",
      ru: "Жетысуйская область, Восточный Казахстан"
    },
    coordinates: { lat: "43.7319° N", lng: "75.5342° E", x: 74, y: 76 },
    era: {
      en: "Bronze Age (2nd Millennium BC)",
      kk: "Қола дәуірі (б.з.д. II мыңжылдық)",
      ru: "Эпоха Бронзы (II тысячелетие до н.э.)"
    },
    description: {
      en: "Over 5,000 rare petroglyphs depicting sun-headed deities, ancient warriors, marriages, and sacrificial animals carved into slate rock faces. Endangered by tectonic micro-fracturing, thermal cracking from extreme continental seasonal delta temperatures, and lichen bio-erosion.",
      kk: "Күн басты құдайлар, ежелгі жауынгерлер, неке қию рәсімдері мен аңдар бейнеленген 5000-нан астам сирек петроглифтер. Жартастардың маусымдық термиялық өзгерулерден жарылуы мен қыналардың биоэрозиясы негізгі қауіп болып табылады.",
      ru: "Более 5000 редких петроглифов с изображениями солнцеголовых божеств, воинов, обрядов и животных на сланцевых скалах. Подвержены тектоническому растрескиванию, температурному выветриванию и биоэрозии лишайниками."
    },
    riskLevel: "CRITICAL",
    riskScore: 92,
    crackDensity: 4.82,
    material: {
      en: "Metamorphic Schist Slate",
      kk: "Метаморфты тақтатас",
      ru: "Метаморфический сланец"
    },
    climateProfile: {
      city: "Zhetysu (Almaty Foothills)",
      avgTempDelta: 58.0, // Mountain foothill temperature oscillations (-18°C winter night to +40°C summer)
      avgHumidity: 38.0,
      annualPrecipitation: 312.0,
      avgUvIndex: 8.8,
      avgWindSpeed: 6.4,  // Canyon winds rushing through slate surfaces
      seismicVibrations: 0.15 // Active Foothill tectonic tremors
    },
    iotSensors: {
      temperature: 31.8,
      humidity: 21.4,
      uvExposure: 780,
      vibration: 0.04,
      windImpact: 8.2,
      history: [
        { timestamp: "00:00", temp: 15.0, humidity: 31, uv: 0, vibe: 0.02 },
        { timestamp: "04:00", temp: 11.2, humidity: 35, uv: 0, vibe: 0.01 },
        { timestamp: "08:00", temp: 24.5, humidity: 26, uv: 310, vibe: 0.03 },
        { timestamp: "12:00", temp: 36.8, humidity: 18, uv: 920, vibe: 0.06 },
        { timestamp: "16:00", temp: 38.2, humidity: 15, uv: 810, vibe: 0.04 },
        { timestamp: "20:00", temp: 26.0, humidity: 24, uv: 20, vibe: 0.02 }
      ]
    },
    metrics: {
      surfaceErosion: 34.2,
      crackGrowthRate: 0.89,
      moisturePenetration: 11.4,
      structuralStress: 8.5
    },
    reconstruction: {
      pastDescription: {
        en: "Deep obsidian-black and dark brown glistening rock panels with stark, deeply engraved white silhouettes of religious deities and wild herds reflecting ancient solar rituals.",
        kk: "Күн құдайлары мен жабайы жануарлар бейнеленген, терең әрі анық ойылып салынған ақ түсті жартас суреттері.",
        ru: "Блестящие черно-бурые сланцевые плоскости с четкими глубокими белыми силуэтами солнцеголовых богов и диких стад периода расцвета солярных культов."
      },
      presentDescription: {
        en: "Severe fracturing and block splitting along tectonic seams, fading of contrast due to dust sedimentation, and deep lichen-induced chemical degradation.",
        kk: "Тектоникалық жіктердің кеңеюі, жартастардың баяу қирауы және қыналардың өсуі салдарынан контрасттың жоғалуы.",
        ru: "Глубокие трещины с риском откола целых блоков; потускнение рисунков из-за пылевого осаждения и разрушение камня агрессивными лишайниковыми кислотами."
      },
      futurePredictedDescription: {
        en: "Complete detachment of Site-3 central monolith plaque within 7 years unless structural clamping and polymer injection are executed under continuous automated LiDAR monitoring.",
        kk: "Егер полимерлі инъекциялар мен сенсорлық бекітулер орнатылмаса, 7 жыл ішінде 3-ші аймақтың орталық суреттері бар блок құлап қалуы мүмкін.",
        ru: "Полный откол центральной плиты Сектора-3 в течение 7 лет без скорейшей фиксации анкерами и инъектирования укрепляющих полимеров."
      },
      beforeImage: "tamgaly_before",
      afterImage: "tamgaly_after"
    }
  },
  {
    id: "otyrar",
    name: {
      en: "Otyrar Archaeological Site",
      kk: "Отырар археологиялық орны",
      ru: "Отрарское городище"
    },
    region: {
      en: "Otyrar District, near Shymkent",
      kk: "Отырар ауданы, Шымкент маңы",
      ru: "Отрарский район, близ Шымкента"
    },
    coordinates: { lat: "42.8525° N", lng: "68.3014° E", x: 44, y: 70 },
    era: {
      en: "1st Century AD - 18th Century AD",
      kk: "I ғасыр - XVIII ғасыр (Шыңғыс хан соғысы)",
      ru: "I в. н.э. - XVIII в. н.э. (Осада Чингисхана)"
    },
    description: {
      en: "An oasis city that served as a critical Scientific and Trading hub on the Silk Road, holding the legendary Library of Otyrar. Made of sun-dried mud bricks, Otyrar faces heavy wind erosion, rain-induced clay liquefaction, mud slip failures, and micro-collapses of excavated residential walls.",
      kk: "Ұлы Жібек жолындағы ірі қаржы, сауда және ғылыми орталық, Отырар кітапханасы орналасқан тарихи қала. Балшық кірпіштерден тұрғызылғандықтан, жел және жаңбыр эрозиясына тым сезімтал келеді.",
      ru: "Город-оазис, бывший важнейшим научным центром Шелкового пути и родиной знаменитой Отрарской библиотеки. Из-за необожженного саманного кирпича страдает от размыва дождями и выветривания."
    },
    riskLevel: "HIGH",
    riskScore: 84,
    crackDensity: 3.12,
    material: {
      en: "Adobe Clay Mudbrick & Loess",
      kk: "Саман кірпіш және Лёсс балшығы",
      ru: "Саманный (сырцовый) кирпич и лесс"
    },
    climateProfile: {
      city: "Shymkent",
      avgTempDelta: 55.4, // Steep seasonal thermal shifts
      avgHumidity: 38.6,
      annualPrecipitation: 412.0, // High spring rainfall precipitating clay erosion!
      avgUvIndex: 8.4,
      avgWindSpeed: 8.8, // Massive windwards mudbrick weathering and abrasion
      seismicVibrations: 0.12
    },
    iotSensors: {
      temperature: 28.5,
      humidity: 38.6,
      uvExposure: 520,
      vibration: 0.15,
      windImpact: 11.2,
      history: [
        { timestamp: "00:00", temp: 19.5, humidity: 45, uv: 0, vibe: 0.12 },
        { timestamp: "04:00", temp: 15.0, humidity: 50, uv: 0, vibe: 0.09 },
        { timestamp: "08:00", temp: 25.4, humidity: 40, uv: 180, vibe: 0.16 },
        { timestamp: "12:00", temp: 31.0, humidity: 32, uv: 610, vibe: 0.24 },
        { timestamp: "16:00", temp: 33.2, humidity: 30, uv: 540, vibe: 0.20 },
        { timestamp: "20:00", temp: 23.0, humidity: 39, uv: 10, vibe: 0.14 }
      ]
    },
    metrics: {
      surfaceErosion: 48.7,
      crackGrowthRate: 1.15,
      moisturePenetration: 54.0,
      structuralStress: 3.2
    },
    reconstruction: {
      pastDescription: {
        en: "A massive, multi-tiered fortress town with high protective adobe ramparts, mosques, bathhouses, pottery kilns, and heavily guarded entry gates rising above the Syrdarya basin.",
        kk: "Сырдария бассейнінде орналасқан зәулім қамал қабырғалары бар, мешіттер, моншалар мен кітапханадан тұратын алып тарихи бекініс-қала.",
        ru: "Великолепный укрепленный город с монументальными глинобитными стенами, развитой фортификацией, мечетями, хаммамами и караван-сараями у излучины Сырдарьи."
      },
      presentDescription: {
        en: "Excavated layout remnants with highly eroded low earthen walls, partially structured pottery district arches protected by modern physical metal canopies.",
        kk: "Қазба жұмыстарының нәтижесінде ашылған, желдің әсерінен мүжілген төмен қабырғалар мен күмбездер.",
        ru: "Археологические раскопы стен и печей, подверженные интенсивному размыву глины осадками, частично перекрытые защитными навесами."
      },
      futurePredictedDescription: {
        en: "Complete loss of vertical residential segments and core pottery kiln arches within 10 years without micro-silica soil stabilization and dynamic sensor alerts.",
        kk: "Саздақтарды микрокремниймен нығайтпаса, табылған тұрғын үй блоктары мен аркалар 10 жылға дейін толық мүжіліп жермен жексен болады.",
        ru: "Исчезновение вертикальных жилых профилей раскопок и сводов печей за 10 лет без срочного силикатного инъектирования грунтовых систем."
      },
      beforeImage: "otyrar_before",
      afterImage: "otyrar_after"
    }
  },
  {
    id: "aishabibi",
    name: {
      en: "Aisha Bibi Mausoleum",
      kk: "Айша бибі кесенесі",
      ru: "Мавзолей Aisha-Bibi"
    },
    region: {
      en: "Taraz Outskirts, Jambyl Region",
      kk: "Тараз қаласының маңы, Жамбыл облысы",
      ru: "Окрестности Тараза, Жамбылская область"
    },
    coordinates: { lat: "42.8483° N", lng: "71.2758° E", x: 48, y: 73 },
    era: {
      en: "11th-12th Century (Karakhanid Era)",
      kk: "XI-XII ғасырлар (Қарахан мемлекеті)",
      ru: "XI-XII века (Эпоха Караханидов)"
    },
    description: {
      en: "A monument of breathtaking beauty fully covered with complex terracotta carved tiles featuring 60 varieties of geometric and floral ornaments. Only the western facade survived to the 20th century. High risk of salt crystallization, tile shearing due to wind stresses, and seismic activity.",
      kk: "60-тан астам күрделі геометриялық және өсімдік тектес қыш оюлармен қапталған сәулет өнерінің зауалы. ХХ ғасырға тек батыс қабырғасы жеткен. Терракота плиткаларының маусымдық тұздануы мен сейсмикалық тербелістер басты қауіп.",
      ru: "Шедевр средневекового зодчества, полностью облицованный терракотовыми плитками с 60 видами узоров. До ХХ века дошла лишь западная стена. Высока угроза сейсмических деформаций и солевой деструкции плиток."
    },
    riskLevel: "STABLE",
    riskScore: 45,
    crackDensity: 1.12,
    material: {
      en: "Carved Terracotta tiles & Clay brickwork",
      kk: "Оюлы терракота тақталары мен саз балшық кірпіштері",
      ru: "Резные терракотовые плиты и глиняный кирпич"
    },
    climateProfile: {
      city: "Taraz",
      avgTempDelta: 48.0, // Mild temperate continental fluctuations
      avgHumidity: 46.5,
      annualPrecipitation: 350.0,
      avgUvIndex: 7.5,
      avgWindSpeed: 3.8,
      seismicVibrations: 0.28 // Very high seismic hazard risk (western Tian Shan foothills)
    },
    iotSensors: {
      temperature: 22.0,
      humidity: 48.0,
      uvExposure: 340,
      vibration: 0.18,
      windImpact: 5.4,
      history: [
        { timestamp: "00:00", temp: 16.0, humidity: 55, uv: 0, vibe: 0.12 },
        { timestamp: "04:00", temp: 13.5, humidity: 58, uv: 0, vibe: 0.10 },
        { timestamp: "08:00", temp: 20.2, humidity: 50, uv: 120, vibe: 0.15 },
        { timestamp: "12:00", temp: 24.8, humidity: 44, uv: 410, vibe: 0.22 },
        { timestamp: "16:00", temp: 25.5, humidity: 41, uv: 350, vibe: 0.19 },
        { timestamp: "20:00", temp: 19.8, humidity: 49, uv: 5, vibe: 0.13 }
      ]
    },
    metrics: {
      surfaceErosion: 12.1,
      crackGrowthRate: 0.18,
      moisturePenetration: 24.5,
      structuralStress: 5.1
    },
    reconstruction: {
      pastDescription: {
        en: "An elegant tomb with square geometry and central archway, with corner pillars covered entirely in exquisite carved cream-terracotta tiles that capture sunlight.",
        kk: "Күн сәулесімен шағылысатын, таңғажайып терракота тақтайшаларымен қапталған бұрыштық бағаналары бар алып күмбезді кесене.",
        ru: "Легкий усыпальничный павильон, угловые колонны которого сплошь покрыты ажурной кремовой терракотовой резьбой, создающей уникальную игру света и тени."
      },
      presentDescription: {
        en: "Reconstructed building utilising modern clay brick core and replicating saved classical patterns using ancient chemical backing for stabilization.",
        kk: "Мұқият қалпына келтірілген негізгі корпус, сақталған батыс қабырғасы мен көне технология бойынша жасалған жаңа плиткалар тобы.",
        ru: "Бережно воссозданное здание вокруг уцелевшей западной стены, с применением стабилизационных уплотнителей швов плитки."
      },
      futurePredictedDescription: {
        en: "Excellent preservation path with stabilized clay matrix. Small maintenance required to fix joint fillings on the eastern facade in 5 years due to wind sheer.",
        kk: "Қазіргі таңда тұрақты сақталу деңгейінде. Шығыс қабырғасындағы жел жүктемесінен жеке плиткаларды бекіту 5 жылда бір рет қажет болуы мүмкін.",
        ru: "Прогноз сохранности стабильный при текущем температурно-влажностном режиме. В течение 5 лет потребуются локальные швы-затирки восточного фасада."
      },
      beforeImage: "aishabibi_before",
      afterImage: "aishabibi_after"
    }
  },
  {
    id: "silkroad",
    name: {
      en: "Ancient Silk Road Trade Post",
      kk: "Суяб - Ұлы Жібек Жолы бекеті",
      ru: "Древний пост Шелкового Пути"
    },
    region: {
      en: "Talgari Uplands and Shu Valley",
      kk: "Талғар маңы және Шу аңғары",
      ru: "Талгарские предгорья и Чуйская долина"
    },
    coordinates: { lat: "43.3321° N", lng: "77.2144° E", x: 74, y: 72 },
    era: {
      en: "6th-10th Century AD (Sogdian Era)",
      kk: "VI-X ғасырлар (Соғды дәуірі)",
      ru: "VI-X века н.э. (Согдийский этап)"
    },
    description: {
      en: "A strategic caravan-station holding archaeological traces of multicultural exchanges (Sogdian, Turkic, Chinese, Persian). Vulnerable to agricultural soil erosion, high vibration from nearby rural infrastructure roads, and groundwater flooding on base trenches.",
      kk: "Әртүрлі ұлттардың (соғды, түрік, қытай, парсы) мәдени араласу ізін сақтаған маңызды сауда-керуен бекеті. Ауыл шаруашылығы жер эрозиясы мен жолдарға жақын болуы үлкен жүктеме береді.",
      ru: "Стратегический перевалочный пункт-раскоп, свидетельствующий о мультикультурном обмене (согдийцев, тюрков, китайцев). Уязвим к вибрационной нагрузке дорог и подтоплению сырца."
    },
    riskLevel: "HIGH",
    riskScore: 72,
    crackDensity: 2.91,
    material: {
      en: "Compacted Loess Soil & River Stones",
      kk: "Престелген балшық пен өзен тастары",
      ru: "Паксовые (глинобитные) слои и речной бут"
    },
    climateProfile: {
      city: "Taraz Region (Shu)",
      avgTempDelta: 51.5,
      avgHumidity: 44.0,
      annualPrecipitation: 300.0,
      avgUvIndex: 7.8,
      avgWindSpeed: 4.2,
      seismicVibrations: 0.24 // Severe seismic baseline factors from the basin fractures
    },
    iotSensors: {
      temperature: 19.5,
      humidity: 50.2,
      uvExposure: 290,
      vibration: 0.45,
      windImpact: 4.1,
      history: [
        { timestamp: "00:00", temp: 12.0, humidity: 60, uv: 0, vibe: 0.38 },
        { timestamp: "04:00", temp: 9.5, humidity: 64, uv: 0, vibe: 0.35 },
        { timestamp: "08:00", temp: 17.0, humidity: 54, uv: 110, vibe: 0.42 },
        { timestamp: "12:00", temp: 22.4, humidity: 46, uv: 390, vibe: 0.52 },
        { timestamp: "16:00", temp: 23.0, humidity: 44, uv: 310, vibe: 0.48 },
        { timestamp: "20:00", temp: 15.2, humidity: 53, uv: 10, vibe: 0.41 }
      ]
    },
    metrics: {
      surfaceErosion: 29.5,
      crackGrowthRate: 0.51,
      moisturePenetration: 38.2,
      structuralStress: 6.4
    },
    reconstruction: {
      pastDescription: {
        en: "Garrison fortifications with active caravanserai courtyards, stables for camels, religious shrines, open currency markets, and deep cellars storing Silk trade rolls.",
        kk: "Қызу сауда алаңдары бар, түйелерге арналған қоралары, діни ғибадатханалары және Жібек орамдары сақталатын жертөлелері бар сауда бекеті.",
        ru: "Обширный караван-сарай с гарнизонным рвом, стойлами для верблюдов, рыночной площадью и жилыми кельями купцов."
      },
      presentDescription: {
        en: "Eroded wall outlines, stony foundations, and buried brick channels uncovered by scientific archaeological excavation teams.",
        kk: "Желдің әсерінен мүжілген қабырға іздері, өзен тастарынан қаланған іргетас қалдықтары.",
        ru: "Линейные глиняные оплывшие валы, каменный настил дворов и опорные участки бывших угловых башен."
      },
      futurePredictedDescription: {
        en: "Ground vibration streams from new vehicles will fracture structural bases within 5 years unless a geographical dynamic protection loop is established.",
        kk: "Көлік тербелісі мен ауыл шаруашылығы жұмысының салдарынан 5 жылда іргетастар жарылып қирайды. Қауіпсіз аймақ белгілеу қажет.",
        ru: "Оползневое разрушение траншей раскопок от дорожной вибрации через 5 лет, если не ограничить движение тяжелогрузного транспорта."
      },
      beforeImage: "silkroad_before",
      afterImage: "silkroad_after"
    }
  }
];

export const defaultLandmarks = landmarksData;
