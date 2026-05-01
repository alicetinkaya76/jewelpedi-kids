// Pırlanta Salonu — Faz 2-A'da derinleştirildi + 3 ünlü pırlanta eklendi.
// Şema: Faz 0'daki alanlar + Faz 2 eklemeleri (gallery, timeline, digDeeper,
// scienceBox, storyThread). Tüm yeni alanlar opsiyonel.

export default [
  /* ─────────────────────────────────────────────────────────
     4C — The grading system
     ───────────────────────────────────────────────────────── */
  {
    id: '4c-sistemi',
    cat: 'pirlanta',
    emoji: '🔍',
    accent: '#5dade2',
    name: { tr: '4C Sistemi', en: 'The 4 Cs', ar: 'نظام 4C' },
    intro: {
      tr: 'Her pırlantanın değerini dört harfle ölçüyoruz: C-C-C-C.',
      en: 'Every diamond is measured by four letters: C-C-C-C.',
      ar: 'كل ماسة تُقاس بأربعة حروف.',
    },
    body: {
      tr: '4C, bir pırlantanın değerini belirleyen dört özelliktir: Carat (karat/ağırlık), Clarity (berraklık), Color (renk) ve Cut (kesim). Karat ağırlığı ölçer — 1 karat = 0,2 gram. Berraklık, taşın içinde ne kadar küçük kusur (inclusion) olduğunu gösterir; FL (flawless/kusursuz) en iyisi, I3 en düşüğü. Renk D\'den (renksiz, en değerli) Z\'ye (sarımsı) kadar derecelendirilir. Kesim ise ışığın taştan nasıl çıktığını belirler — en önemli özellik odur.',
      en: 'The 4Cs are carat (weight), clarity (imperfections), color (tint) and cut (light performance). 1 carat = 0.2 g. Clarity runs FL to I3, color D to Z. Cut is considered the most important — it determines how light leaves the stone.',
      ar: 'الأربعة C: القيراط والنقاء واللون والقطع.',
    },
    funFact: {
      tr: 'Aynı karat ağırlığında iki pırlantanın fiyatı, kesim kalitesine göre 3–5 kat farklı olabilir! Yani bir taşın "büyük" olması onu daha değerli yapmaya yetmez.',
      en: 'Two diamonds of the same carat can differ in price by 3–5× depending on cut quality — "bigger" doesn\'t always mean more valuable.',
      ar: 'الفرق بين ماستين بنفس الوزن يصل لـ 3-5 أضعاف بسبب القطع.',
    },
    stats: {
      carat: '1 ct = 0.2 g',
      clarity: 'FL → I3',
      color: 'D → Z',
      cut: 'Excellent → Poor',
    },
    gallery: [
      { type: 'svg', component: 'diamond', animate: true,
        caption: { tr: 'Brilliant kesim — 58 yüzey', en: 'Brilliant cut — 58 facets', ar: 'القطع البريلانت' } },
    ],
    timeline: [
      { year: '1477',
        event: { tr: 'İlk pırlanta nişan yüzüğü — Arşidük Maximilian, Mary of Burgundy\'ye verir.',
                 en: 'First diamond engagement ring — Archduke Maximilian to Mary of Burgundy.',
                 ar: 'أول خاتم خطوبة ماسي عام 1477.' } },
      { year: '1919',
        event: { tr: 'Marcel Tolkowsky ideal brilliant kesimi matematiksel olarak hesaplar.',
                 en: 'Marcel Tolkowsky mathematically calculates the ideal brilliant cut.',
                 ar: 'تولكوفسكي يحسب القطع المثالي عام 1919.' } },
      { year: '1953',
        event: { tr: 'Richard Liddicoat GIA\'da 4C sistemini başlatır.',
                 en: 'Richard Liddicoat launches the 4C grading system at GIA.',
                 ar: 'ليديكوت يطلق نظام 4C عام 1953.' } },
      { year: '2000',
        event: { tr: 'Kimberley Süreci (çatışma pırlantaları) imzalanır.',
                 en: 'Kimberley Process signed to combat conflict diamonds.',
                 ar: 'توقيع عملية كيمبرلي عام 2000.' } },
    ],
    digDeeper: [
      {
        id: 'history',
        icon: 'history',
        title: { tr: 'Sistem Nasıl Doğdu?', en: 'How the System Was Born', ar: 'كيف وُلد النظام' },
        body: {
          tr: '4C\'den önce kuyumcular her biri farklı kelimeler kullanırdı — "birinci sınıf", "temiz", "beyaz" gibi belirsiz terimler. Bu yüzden iki kuyumcu aynı taşa iki farklı fiyat biçebilirdi. 1953\'te Amerika\'daki Gemoloji Enstitüsü (GIA) başkanı Richard Liddicoat basit ama katı bir sistem yayınladı: dört özellik, her biri ölçülebilir standart harflerle. Bugün dünyanın her yerinde aynı dil konuşulur.',
          en: 'Before the 4Cs, jewelers used vague personal terms — "first class," "clean," "white" — so two jewelers could price the same stone very differently. In 1953, Richard Liddicoat, president of the Gemological Institute of America, published a simple, strict system: four measurable properties with standard grades. Today the whole world speaks the same language.',
          ar: 'قبل 4C، كان كل جواهري يستخدم مصطلحاته الخاصة. عام 1953 وحّد ليديكوت اللغة.',
        },
      },
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Kesim Neden En Önemli?', en: 'Why Cut Matters Most', ar: 'لماذا القطع هو الأهم' },
        body: {
          tr: 'Bir pırlanta, içine giren ışığın sadece doğru açıyla yansıyıp tekrar yukarı çıkmasıyla parlar. Kesim açıları yanlışsa — pavilion çok sığ ya da çok derinse — ışık taşın altından kaçar, taş camsı ve donuk görünür. Tolkowsky 1919\'da pavilion açısını 40,75°, taç açısını 34,5° olarak hesapladı. Bu değerlerden 1° sapma bile parlaklığı %10-15 düşürebilir.\n\nBu yüzden "renksiz ama kötü kesim" bir pırlanta, "hafif sarımsı ama mükemmel kesim" bir pırlantadan genellikle daha mat görünür.',
          en: 'A diamond sparkles only when light enters, bounces off facets at the right angle, and returns out the top. If cut angles are off — pavilion too shallow or too deep — light leaks out the bottom and the stone looks glassy and dull. Tolkowsky calculated pavilion 40.75°, crown 34.5°. Even 1° drift can drop brilliance 10–15%.\n\nThat\'s why a colorless but poorly cut diamond often looks duller than a slightly tinted but perfectly cut one.',
          ar: 'القطع هو ما يُرجع الضوء إلى الأعلى. خطأ درجة واحدة يُقلل البريق 10-15%.',
        },
      },
    ],
    related: ['kesim-sekilleri', 'pirlanta-nasil-olusur', 'cullinan'],
  },

  /* ─────────────────────────────────────────────────────────
     Kesim Şekilleri — Cut shapes
     ───────────────────────────────────────────────────────── */
  {
    id: 'kesim-sekilleri',
    cat: 'pirlanta',
    emoji: '💠',
    accent: '#3498db',
    name: { tr: 'Kesim Şekilleri', en: 'Cut Shapes', ar: 'أشكال القطع' },
    intro: {
      tr: 'Yuvarlak, prenses, zümrüt, oval... Her biri ayrı bir karakter.',
      en: 'Round, princess, emerald, oval... each shape has its own character.',
      ar: 'مستدير، أميرة، زمرد، بيضاوي... لكل شكل طابعه.',
    },
    body: {
      tr: 'En popüler kesim şekilleri: Yuvarlak brilliant (en parlak), prenses (kare, modern), zümrüt (dikdörtgen, sakin), oval (uzun, zarif), armut (damla şeklinde), kalp, marquise (gözyaşı) ve asher. Yuvarlak brilliant kesim 57 veya 58 yüzeyden oluşur ve ışığı en iyi yansıtan kesim olarak kabul edilir. Zümrüt kesim ise berraklığı ön plana çıkarır — pencere gibidir, taşın içini gösterir.',
      en: 'Popular cuts: round brilliant (brightest), princess (square, modern), emerald (rectangular, calm), oval (long, graceful), pear (drop-shaped), heart, marquise and asscher. The round brilliant has 57–58 facets and is considered the best at returning light. The emerald cut emphasizes clarity — it\'s like a window into the stone.',
      ar: 'الأشكال الشائعة: مستدير، أميرة، زمرد، بيضاوي، كمثرى، قلب.',
    },
    funFact: {
      tr: 'Yuvarlak brilliant kesimi 1919\'da Marcel Tolkowsky adlı bir matematikçi tasarladı. Işığın pırlantada en çok nasıl parlayacağını hesapladı ve bugün hâlâ kullandığımız açıları buldu.',
      en: 'The round brilliant cut was designed in 1919 by mathematician Marcel Tolkowsky, who calculated the ideal angles still used today.',
      ar: 'صمم ماركيل تولكوفسكي القطع البريلانتي المستدير عام 1919.',
    },
    stats: {
      shapes: '10+ yaygın şekil',
      facets: '57–58 (brilliant)',
      oldest: 'Rose cut (1500\'ler)',
    },
    gallery: [
      { type: 'svg', component: 'diamond', animate: true,
        caption: { tr: 'Yuvarlak brilliant', en: 'Round brilliant', ar: 'مستدير' } },
      { type: 'svg', component: 'emerald',
        caption: { tr: 'Zümrüt kesim (step cut)', en: 'Emerald cut (step cut)', ar: 'قطع الزمرد' } },
      { type: 'svg', component: 'sapphire',
        caption: { tr: 'Cushion (yastık)', en: 'Cushion cut', ar: 'قطع الوسادة' } },
      { type: 'svg', component: 'topaz',
        caption: { tr: 'Armut kesim', en: 'Pear cut', ar: 'قطع الكمثرى' } },
    ],
    timeline: [
      { year: '1300',
        event: { tr: 'Point cut — sadece doğal oktahedron şekli cilalanır.',
                 en: 'Point cut — natural octahedral shape simply polished.',
                 ar: 'القطع النقطي عام 1300.' } },
      { year: '1450',
        event: { tr: 'Table cut — üst kısım düzleştirilir.',
                 en: 'Table cut — top flattened for a "window".',
                 ar: 'قطع الطاولة عام 1450.' } },
      { year: '1650',
        event: { tr: 'Rose cut — çok yüzeyli, yuvarlak profilli.',
                 en: 'Rose cut — many-faceted, domed profile.',
                 ar: 'قطع الوردة عام 1650.' } },
      { year: '1919',
        event: { tr: 'Tolkowsky matematiksel ideal brilliant kesimi yayınlar.',
                 en: 'Tolkowsky publishes mathematically ideal brilliant.',
                 ar: 'تولكوفسكي عام 1919.' } },
    ],
    digDeeper: [
      {
        id: 'history',
        icon: 'history',
        title: { tr: 'Kesimin Evrimi', en: 'The Evolution of Cutting', ar: 'تطور القطع' },
        body: {
          tr: 'İlk pırlanta kesimleri çok basitti — 14. yüzyılda "point cut" dedikleri kesim, taşın doğal oktahedron (sekiz yüzlü piramit) şeklini bozmadan sadece cilalıyordu. 15. yüzyılda "table cut" üst köşeyi düzleştirdi. 17. yüzyılda "rose cut" ile daha çok yüzey eklendi ama taşın alt kısmı hâlâ düzdü. Modern brilliant ise matematikseldi: ışık ne zaman içeri girer, hangi açılardan yansır, tam olarak hesaplanmış. Her yüzyılda daha çok parlaklık, daha çok ışık dönüşü.',
          en: 'The earliest diamond cuts were crude — the 14th-century "point cut" simply polished the natural octahedron without reshaping it. The 15th-century "table cut" flattened the top. The 17th-century "rose cut" added more facets but left the bottom flat. The modern brilliant was mathematical: exactly calculated angles for when light enters and how it returns. Each century: more sparkle, more light return.',
          ar: 'تطورت القطع من النقطي (1300) إلى البريلانت المحسوب رياضياً (1919).',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Her Şeklin Kendi Karakteri', en: 'Every Shape Has a Personality', ar: 'لكل شكل شخصية' },
        body: {
          tr: 'Kesim şekli sadece görsel değil, karakter taşır. Yuvarlak brilliant en fazla parlaklık verir ama yaygın olduğu için "güvenli" seçimdir. Zümrüt kesim içini gösterdiği için sadece yüksek berraklıkta kullanılır — taşın "dürüst" halidir. Prenses kesim köşeli ve moderndir, 1980\'lerde popülerleşti. Marquise (Markiz) 18. yüzyılda Fransa Kralı XV. Louis tarafından sevgilisi Madame de Pompadour\'un gülümsemesini anlatmak için tasarlandı.',
          en: 'Cut shape carries character, not just looks. Round brilliant returns the most light — the safe, familiar choice. Emerald cut reveals interior clarity, so it\'s reserved for very clean stones — the "honest" cut. Princess cut is angular and modern, popularized in the 1980s. The marquise was commissioned in 18th-century France by King Louis XV to mirror the smile of his lover Madame de Pompadour.',
          ar: 'لكل قطع طابعه — من البريلانت الآمن إلى الماركيز الذي صممه لويس الخامس عشر.',
        },
      },
    ],
    interactive: 'light',
    related: ['4c-sistemi', 'pirlanta-nasil-olusur'],
  },

  /* ─────────────────────────────────────────────────────────
     Pırlanta Nasıl Oluşur? — How diamonds form
     ───────────────────────────────────────────────────────── */
  {
    id: 'pirlanta-nasil-olusur',
    cat: 'pirlanta',
    emoji: '🌋',
    accent: '#2874a6',
    name: { tr: 'Pırlanta Nasıl Oluşur?', en: 'How Diamonds Form', ar: 'كيف تتكون الماسة' },
    intro: {
      tr: 'Yerin 150 km altında, milyar yıllık basınç altında...',
      en: '150 km beneath the Earth, under a billion years of pressure...',
      ar: 'على عمق 150 كم تحت الأرض، بضغط مليار سنة.',
    },
    body: {
      tr: 'Pırlanta, karbon atomlarının yerin derinliklerinde yüksek sıcaklık (1000–1300°C) ve muazzam basınç altında kristalleşmesiyle oluşur. Bu olay yaklaşık 150 kilometre derinlikte, milyar yıldan uzun sürelerde gerçekleşir. Sonra yanardağ patlamaları bu taşları yüzeye yakın yerlere taşır — özellikle "kimberlit" adı verilen kayaçlarla. Bu yüzden pırlanta madenleri eski yanardağ bacalarında bulunur.',
      en: 'Diamonds form when carbon atoms crystallize under high temperature (1000–1300°C) and immense pressure, about 150 km deep. This takes over a billion years. Volcanic eruptions then carry them near the surface in rocks called kimberlite — which is why diamond mines are found in ancient volcanic pipes.',
      ar: 'تتكون الماسة من بلورات الكربون على عمق 150 كم تحت ضغط وحرارة هائلين.',
    },
    funFact: {
      tr: 'Pırlantalar dünyadaki en eski malzemelerden biridir — bazıları 3 milyar yaşında! Yani senin dedenin dedesinin dedesinin... dedesinden bile çok daha yaşlı.',
      en: 'Diamonds are among Earth\'s oldest materials — some are 3 billion years old!',
      ar: 'بعض الماسات عمرها 3 مليار سنة.',
    },
    stats: {
      depth: '150 km',
      temperature: '1000–1300°C',
      age: '1–3 milyar yıl',
      carrier: 'Kimberlit kayacı',
    },
    scienceBox: {
      formula: 'C (saf karbon)',
      crystalSystem: 'Cubic (isometric)',
      hardness: '10 (Mohs)',
      refractiveIndex: '2.417',
      density: '3.52 g/cm³',
      cleavage: 'Perfect octahedral',
      notes: {
        tr: 'Pırlanta ile kurşun kalemin ucundaki grafit tamamen aynı elementtir: karbon. Fark sadece atomların nasıl bağlandığında — grafitte kat kat kayıcı, pırlantada 4 yönlü sıkı tetrahedral. Yapı her şeyi değiştirir.',
        en: 'Diamond and the graphite in a pencil tip are the same element: carbon. The only difference is how atoms bond — slippery layers in graphite, tight four-way tetrahedra in diamond. Structure changes everything.',
        ar: 'الماس والغرافيت كلاهما كربون، الفرق في ترتيب الذرات.',
      },
    },
    timeline: [
      { year: '-3000000000',
        event: { tr: 'Dünya manto\'sunda en eski pırlantalar oluşmaya başlar.',
                 en: 'Earliest known diamonds begin forming in Earth\'s mantle.',
                 ar: 'تبدأ الماسات الأولى بالتكون قبل 3 مليار سنة.' } },
      { year: '1866',
        event: { tr: 'Güney Afrika\'da "Eureka" pırlantası bir çocuk tarafından bulunur.',
                 en: '"Eureka" diamond found by a child in South Africa.',
                 ar: 'اكتشاف ماسة "يوريكا" في جنوب أفريقيا.' } },
      { year: '1871',
        event: { tr: 'Kimberley madeni açılır, modern pırlanta çağı başlar.',
                 en: 'Kimberley Mine opens, launching the modern diamond era.',
                 ar: 'افتتاح منجم كيمبرلي عام 1871.' } },
      { year: '1954',
        event: { tr: 'GE\'de Tracy Hall ilk yapay pırlantayı HPHT ile üretir.',
                 en: 'Tracy Hall (GE) grows the first synthetic diamond via HPHT.',
                 ar: 'أول ماسة اصطناعية عام 1954.' } },
    ],
    digDeeper: [
      {
        id: 'geology',
        icon: 'geology',
        title: { tr: 'Kimberlit Bacaları', en: 'Kimberlite Pipes', ar: 'أنابيب الكمبرليت' },
        body: {
          tr: 'Pırlantayı yüzeye çıkaran bir tek kayaç türü var: kimberlit. Bu, yerin 150 km altından yüzeye kadar hızla yükselen magmanın soğumasıyla oluşan volkanik bir kayaç. Yükseliş çok hızlı olmalı — saatte 40 km\'den hızlı — yoksa pırlanta yolda grafite dönüşür. Bu yüzden pırlanta madenleri huni şeklinde "bacalar"dır: güney Afrika, Botsvana, Sibirya, Kanada, Avustralya.',
          en: 'Only one rock type delivers diamonds to the surface: kimberlite. It\'s a volcanic rock formed when magma rushes up from 150 km depth and cools. The ascent has to be fast — over 40 km/hour — otherwise diamond converts to graphite on the way up. That\'s why diamond mines are funnel-shaped "pipes": South Africa, Botswana, Siberia, Canada, Australia.',
          ar: 'الكمبرليت هو الصخر الوحيد الذي يحمل الماس إلى السطح.',
        },
      },
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Karbon\'un İki Yüzü', en: 'Carbon\'s Two Faces', ar: 'وجها الكربون' },
        body: {
          tr: 'Pırlantada her karbon atomu 4 komşu atoma eşit mesafede ve eşit güçlü bağla bağlıdır — tetrahedral düzen. Bu yapı her yönde aynı derece güçlüdür, bu yüzden sertlik 10 Mohs. Grafitte ise karbonlar altıgen tabakalar halinde dizilir. Tabakalar içinde bağlar çok güçlü, ama tabakalar arası çok zayıf — bu yüzden kalem kağıda yazarken tabakalar kayar. Aynı element, iki farklı yapı, birbirinin tam zıttı özellikler.',
          en: 'In diamond, each carbon atom is bonded to 4 neighbors at equal distance with equal strength — a tetrahedral arrangement. This makes the structure equally strong in every direction, giving Mohs 10. In graphite, carbons sit in hexagonal sheets. Bonds within a sheet are strong, but between sheets are weak — which is why a pencil tip slides apart onto paper. Same element, two structures, opposite properties.',
          ar: 'ذرات الكربون تترتب بأربعة اتجاهات في الماس، بطبقات في الغرافيت.',
        },
      },
    ],
    storyThread: 'pirlantanin-3-milyar-yili',
    related: ['lab-pirlantasi', '4c-sistemi', 'cullinan'],
  },

  /* ─────────────────────────────────────────────────────────
     Lab-grown diamond
     ───────────────────────────────────────────────────────── */
  {
    id: 'lab-pirlantasi',
    cat: 'pirlanta',
    emoji: '🧪',
    accent: '#85c1e9',
    name: { tr: 'Laboratuvar Pırlantası', en: 'Lab-Grown Diamond', ar: 'ماس المختبر' },
    intro: {
      tr: 'Haftalar içinde laboratuvarda büyütülen gerçek pırlanta.',
      en: 'A real diamond grown in a lab in just weeks.',
      ar: 'ماس حقيقي يُنتج في المختبر خلال أسابيع.',
    },
    body: {
      tr: 'Laboratuvar pırlantaları, doğal pırlantalarla kimyasal olarak aynıdır — aynı karbon yapısı, aynı sertlik, aynı parlaklık. Fark tek: doğada milyar yıl geçen süreç laboratuvarda 6-10 hafta sürer. İki yöntem kullanılır: HPHT (yüksek basınç, yüksek sıcaklık — doğal süreci taklit eder) ve CVD (kimyasal buhar biriktirme — karbon gazından kat kat büyütür). Genellikle doğal pırlantadan %30-50 daha ucuz ve çevreye daha az zarar verir.',
      en: 'Lab-grown diamonds are chemically identical to natural ones — same carbon structure, same hardness, same brilliance. The only difference: a billion-year process becomes 6–10 weeks. Two methods: HPHT (high pressure/high temp, mimicking nature) and CVD (chemical vapor deposition, building up carbon gas layer by layer). Typically 30–50% cheaper with lower environmental impact.',
      ar: 'ماس المختبر متطابق كيميائياً مع الطبيعي، ويُنتج في 6-10 أسابيع.',
    },
    funFact: {
      tr: 'Laboratuvar pırlantası ile doğal pırlantayı gözle ayırt etmek neredeyse imkânsızdır. Sadece özel cihazlarla farkları görülür — ve bu fark genelde içindeki mikroskobik ipuçlarında gizlidir.',
      en: 'Telling lab-grown from natural diamonds by eye is nearly impossible — only special instruments can spot microscopic differences.',
      ar: 'لا يمكن التمييز بينهما بالعين المجردة.',
    },
    stats: {
      growth: '6–10 hafta',
      hardness: '10 Mohs (aynı)',
      methods: 'HPHT, CVD',
      price: '-30% ila -50%',
    },
    digDeeper: [
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'HPHT vs CVD', en: 'HPHT vs CVD', ar: 'HPHT مقابل CVD' },
        body: {
          tr: 'HPHT yöntemi (High Pressure High Temperature) doğal süreci taklit eder: küçük bir pırlanta tohumu, sıvılaşmış metal alaşım ve karbon kaynağı yaklaşık 1500°C ve 5-6 GPa basınçta bir araya getirilir. Kristal saatlerce büyür.\n\nCVD yöntemi (Chemical Vapor Deposition) ise tamamen farklı: pırlanta tohumu bir vakum odasına konur, içeri metan gazı verilir, plazma ile parçalanır. Karbon atomları tohumun üstüne katman katman yerleşir. CVD daha yavaş ama daha yüksek saflık sağlar.',
          en: 'HPHT (High Pressure High Temperature) mimics nature: a small diamond seed, molten metal solvent and carbon source are combined at ~1500°C and 5–6 GPa. The crystal grows over hours.\n\nCVD (Chemical Vapor Deposition) is entirely different: a diamond seed sits in a vacuum chamber, methane gas flows in, and a plasma breaks it apart. Carbon atoms settle onto the seed layer by layer. CVD is slower but yields higher purity.',
          ar: 'HPHT يُقلد الطبيعة تحت ضغط 6 غيغاباسكال، CVD يبني طبقة طبقة من غاز الميثان.',
        },
      },
      {
        id: 'ethics',
        icon: 'ethics',
        title: { tr: 'Etik ve Çevre', en: 'Ethics and Environment', ar: 'الأخلاق والبيئة' },
        body: {
          tr: 'Laboratuvar pırlantaları genellikle çevresel etki ve sosyal açılardan avantajlı sayılır: kimberlit madeni açmak bir dağın tepesini delmek demek, çevredeki toprağa ve akiferlere etki eder. Çatışma pırlantaları sorunu (Kimberley Süreci 2000\'de başladı) hâlâ %100 çözülmüş değil. Ancak lab-diamond üretimi de büyük elektrik tüketir — Çin ve Hindistan\'daki tesislerin çoğu kömür elektriği kullanıyor. "Daha iyi" olması enerji kaynağına bağlı.',
          en: 'Lab-grown diamonds are often considered advantageous environmentally and socially: opening a kimberlite mine means boring through a mountaintop, affecting surrounding soil and aquifers. The conflict-diamond problem (Kimberley Process, 2000) is not fully solved. But lab-diamond production uses large amounts of electricity — many Chinese and Indian facilities run on coal. "Better" depends on the energy source.',
          ar: 'ماس المختبر أقل ضرراً بيئياً، لكنه يستهلك كهرباء كثيرة.',
        },
      },
    ],
    related: ['pirlanta-nasil-olusur', '4c-sistemi'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Cullinan Diamond
     ───────────────────────────────────────────────────────── */
  {
    id: 'cullinan',
    cat: 'pirlanta',
    emoji: '👑',
    accent: '#1a5276',
    name: {
      tr: 'Cullinan — Afrika\'nın Yıldızı',
      en: 'Cullinan — The Great Star of Africa',
      ar: 'كولينان — نجمة أفريقيا',
    },
    intro: {
      tr: '3.106 karatlık dünyanın en büyük ham pırlantası. Bir madencinin yumruğu büyüklüğünde.',
      en: 'At 3,106 carats, the largest rough diamond ever found — the size of a miner\'s fist.',
      ar: 'أكبر ماسة خام في التاريخ: 3,106 قيراط.',
    },
    body: {
      tr: 'Cullinan, 26 Ocak 1905\'te Güney Afrika\'daki Premier Madeni\'nde yüzey müfettişi Frederick Wells tarafından duvardan çıkarılırken bulundu. 3.106,75 karat ağırlığındaydı — 621 gram, yumruk büyüklüğünde. Madenin sahibi Thomas Cullinan\'ın ismini aldı ve Kral VII. Edward\'ın 66. doğum gününde Birleşik Krallık\'a hediye edildi. Amsterdam\'da Joseph Asscher tarafından 9 büyük ve 96 küçük taşa kesildi. En büyüğü — Cullinan I, 530,2 karat — Londra\'daki Kral Asası\'nın üstündedir.',
      en: 'Cullinan was found on 26 January 1905 at the Premier Mine in South Africa by surface superintendent Frederick Wells, sticking out of a wall. It weighed 3,106.75 carats — 621 grams, the size of a fist. Named after mine owner Thomas Cullinan, it was gifted to Britain on King Edward VII\'s 66th birthday. Joseph Asscher of Amsterdam cut it into 9 major and 96 minor stones. The largest — Cullinan I at 530.2 carats — sits atop the Sovereign\'s Sceptre in London.',
      ar: 'عُثر على كولينان عام 1905 في منجم بريمير بجنوب أفريقيا، ثم قُطع إلى 9 قطع كبرى.',
    },
    funFact: {
      tr: 'Joseph Asscher Cullinan\'ı kesmeye başladığında bıçağı ilk vuruşta kırıldı! İkinci deneme başarılı oldu, ama rivayete göre Asscher kesimden sonra bayılmış.',
      en: 'When Joseph Asscher made the first cut on Cullinan, his blade snapped! The second attempt succeeded — legend says Asscher fainted afterwards from the strain.',
      ar: 'انكسر شفرة أشير في أول محاولة لقطع كولينان.',
    },
    stats: {
      rough: '3,106.75 ct',
      cullinanI: '530.2 ct',
      cullinanII: '317.4 ct',
      majorStones: '9',
      found: '26 Ocak 1905',
    },
    timeline: [
      { year: '1905',
        event: { tr: 'Frederick Wells, Premier Madeni\'nde Cullinan\'ı bulur.',
                 en: 'Frederick Wells finds Cullinan at Premier Mine.',
                 ar: 'اكتشاف كولينان عام 1905.' } },
      { year: '1907',
        event: { tr: 'Transvaal Hükümeti Kral VII. Edward\'a hediye eder.',
                 en: 'Transvaal Government gifts it to King Edward VII.',
                 ar: 'تُهدى لإدوارد السابع عام 1907.' } },
      { year: '1908',
        event: { tr: 'Joseph Asscher Amsterdam\'da 9 ana taşa keser.',
                 en: 'Joseph Asscher cuts it in Amsterdam into 9 main stones.',
                 ar: 'قطعها أشير عام 1908.' } },
    ],
    digDeeper: [
      {
        id: 'history',
        icon: 'history',
        title: { tr: 'İngiltere\'ye Yolculuk', en: 'The Journey to Britain', ar: 'الرحلة إلى بريطانيا' },
        body: {
          tr: 'Cullinan\'ı Londra\'ya güvenle göndermek büyük bir sorundu. Taşın sigorta değeri astronomik. Özel bir plan yapıldı: "sahte Cullinan" büyük bir steam gemisinde askerlerle yola çıkarıldı, herkes dikkatini oraya verdi. Gerçek Cullinan ise sıradan bir posta paketinde, basit bir kutuda gönderildi. Planlı bir aldatmaca — ve işe yaradı.',
          en: 'Shipping Cullinan to London was a major problem — the insurance value was astronomical. A special plan was hatched: a "decoy Cullinan" sailed on a major steamship with armed guards, drawing all attention. The real Cullinan travelled in an ordinary postal package in a plain box. A deliberate deception — and it worked.',
          ar: 'استخدم الإنجليز خداعاً لنقل كولينان: طرد بريدي عادي.',
        },
      },
    ],
    related: ['hope-pirlantasi', 'koh-i-noor', 'pirlanta-nasil-olusur'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Hope Diamond
     ───────────────────────────────────────────────────────── */
  {
    id: 'hope-pirlantasi',
    cat: 'pirlanta',
    emoji: '💙',
    accent: '#21618c',
    name: {
      tr: 'Hope Pırlantası',
      en: 'The Hope Diamond',
      ar: 'ماسة الأمل',
    },
    intro: {
      tr: 'Karanlıkta kırmızı parlayan, tarih boyunca elden ele dolaşmış derin mavi pırlanta.',
      en: 'A deep blue diamond that glows red in the dark and passed through centuries of hands.',
      ar: 'ماسة زرقاء عميقة تُضيء أحمر في الظلام.',
    },
    body: {
      tr: 'Hope Pırlantası 45,52 karat, derin mavi renklidir. Mavilik, kristal içindeki bor (boron) atomlarından gelir. Mor ötesi ışık altında tuhaf bir özellik gösterir: 1-2 dakika boyunca kırmızı fosforesan ışır. Hindistan\'da Golconda madenlerinden çıkarıldı, 17. yüzyılda Fransa\'ya geldi, Kral XIV. Louis\'nin koleksiyonuna girdi. Fransız Devrimi\'nde çalındı, sonraları Londra\'da Henry Philip Hope\'a ait olduğu için bu ismi aldı. Bugün Washington\'da Smithsonian\'da sergileniyor.',
      en: 'The Hope Diamond is 45.52 carats and deep blue — the color comes from boron atoms in the crystal. Under UV light it shows a strange trait: it phosphoresces red for 1–2 minutes. Mined in India\'s Golconda region, it reached France in the 17th century and entered King Louis XIV\'s collection. Stolen during the French Revolution, it later belonged to Henry Philip Hope in London — where it got its name. Today it\'s on display at the Smithsonian in Washington.',
      ar: 'ماسة الأمل: 45.52 قيراط، زرقاء عميقة، من مناجم جولكندا.',
    },
    funFact: {
      tr: '"Hope Pırlantası\'nın lanetli olduğu" söylencesi büyük ölçüde bir 1911 gazete haberinden geldi — satış pazarlığında ilgi yaratmak için uydurulmuştu. Gerçekte taşın sahiplerinin hayatları sıradan derecede iyi ve kötü geçmiştir.',
      en: 'The "Hope Diamond curse" legend came largely from a 1911 newspaper story — invented to generate sale interest. Actual owners\' lives were ordinary mixes of good and bad fortune.',
      ar: 'أسطورة لعنة الماسة مختلقة من مقال صحفي عام 1911.',
    },
    stats: {
      weight: '45.52 ct',
      color: 'Fancy dark grayish-blue',
      origin: 'Golconda, Hindistan',
      current: 'Smithsonian, Washington',
      cause: 'Bor atomları',
    },
    scienceBox: {
      formula: 'C (bor safsızlığı)',
      crystalSystem: 'Cubic',
      hardness: '10 (Mohs)',
      refractiveIndex: '2.417',
      density: '3.52 g/cm³',
      notes: {
        tr: 'Mavilik, kristal başına milyon karbon atomuna düşen yaklaşık 1 bor atomundan kaynaklanır. Bor yarı-iletkendir, bu yüzden Hope elektriği iletir — çoğu pırlantanın yapamadığı bir şey.',
        en: 'The blue color comes from roughly 1 boron atom per million carbon atoms. Boron is a semiconductor, so Hope actually conducts electricity — something most diamonds can\'t do.',
        ar: 'اللون الأزرق من ذرات البورون. الماسة تُوصل الكهرباء.',
      },
    },
    timeline: [
      { year: '1668',
        event: { tr: 'Jean-Baptiste Tavernier Hindistan\'dan 112 karat mavi pırlanta getirir.',
                 en: 'Tavernier brings a 112-carat blue diamond from India.',
                 ar: 'تافيرنييه يجلب الماسة من الهند عام 1668.' } },
      { year: '1668',
        event: { tr: 'Kral XIV. Louis satın alır.',
                 en: 'King Louis XIV purchases it.',
                 ar: 'لويس الرابع عشر يشتريها.' } },
      { year: '1792',
        event: { tr: 'Fransız Devrimi sırasında çalınır.',
                 en: 'Stolen during the French Revolution.',
                 ar: 'سُرقت عام 1792.' } },
      { year: '1839',
        event: { tr: 'Henry Philip Hope\'un koleksiyonunda görünür, ismini alır.',
                 en: 'Appears in Henry Philip Hope\'s collection; takes his name.',
                 ar: 'تدخل مجموعة هوب عام 1839.' } },
      { year: '1958',
        event: { tr: 'Harry Winston Smithsonian\'a bağışlar.',
                 en: 'Harry Winston donates it to the Smithsonian.',
                 ar: 'وينستون يهديها لسميثسونيان 1958.' } },
    ],
    digDeeper: [
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Kırmızı Parlama', en: 'The Red Glow', ar: 'الوهج الأحمر' },
        body: {
          tr: 'Hope\'u karanlık bir odada mor ötesi ışık altına koyun, ışığı kapatın — taş 1-2 dakika kırmızı parlar. Bu "fosforesans" denir, flüoresansın kardeşi ama daha uzun ömürlüdür. Moleküler seviyede ne olduğu hâlâ tam anlaşılmış değil. Smithsonian araştırmacıları her mavi pırlantanın bu özelliği farklı derecede gösterdiğini keşfetti — bir tür "parmak izi" gibi.',
          en: 'Place Hope in a dark room, shine UV, switch it off — the stone glows red for 1–2 minutes. This is "phosphorescence," fluorescence\'s long-lived cousin. The exact molecular mechanism is still not fully understood. Smithsonian researchers discovered every blue diamond does this to a different degree — a kind of "fingerprint."',
          ar: 'تُضيء ماسة الأمل حمراء تحت الأشعة فوق البنفسجية.',
        },
      },
    ],
    related: ['cullinan', 'koh-i-noor', '4c-sistemi'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Koh-i-Noor
     ───────────────────────────────────────────────────────── */
  {
    id: 'koh-i-noor',
    cat: 'pirlanta',
    emoji: '🕌',
    accent: '#148f77',
    name: {
      tr: 'Koh-i-Noor — Işığın Dağı',
      en: 'Koh-i-Noor — Mountain of Light',
      ar: 'كوه نور — جبل النور',
    },
    intro: {
      tr: 'Sekiz yüzyıl boyunca imparatorluklar arasında gezen, dört ülkenin geri istediği pırlanta.',
      en: 'A diamond that travelled through empires for eight centuries — and is claimed today by four countries.',
      ar: 'ماسة انتقلت بين الإمبراطوريات لثمانية قرون.',
    },
    body: {
      tr: 'Koh-i-Noor, Farsça "Işığın Dağı" demek. Kökeni muhtemelen 13. yüzyıl Hindistan\'ı, Golconda bölgesidir. Başlangıçta yaklaşık 186 karattı. Moğol İmparatorluğu\'nun Tavus Tahtı\'nın süsüydü, 1739\'da Pers Şahı Nadir Şah Delhi\'yi yağmalayınca İran\'a gitti ("Koh-i-Noor" adını Nadir verdi), sonra Afgan krallarına, ardından Pencap\'ın Sih Maharacası Ranjit Singh\'e geçti. 1849\'da İngilizler Pencap\'ı ilhak edince Kraliçe Victoria\'ya gönderildi. 1852\'de yeniden kesildi — 105,6 karata düştü. Şu an Londra Kulesi\'nde Kraliçe Ana\'nın tacındadır.',
      en: 'Koh-i-Noor is Persian for "Mountain of Light." It likely originates in 13th-century India\'s Golconda region, initially around 186 carats. It adorned the Mughal Peacock Throne, then passed to Persian Shah Nader after his 1739 sack of Delhi (Nader gave it the name Koh-i-Noor), then to Afghan kings, then to Sikh Maharaja Ranjit Singh of Punjab. When Britain annexed Punjab in 1849, it was sent to Queen Victoria. Recut in 1852 — reduced to 105.6 carats. It now sits in the Queen Mother\'s Crown in the Tower of London.',
      ar: 'كوه نور سافرت من الهند إلى إيران إلى أفغانستان إلى بريطانيا.',
    },
    funFact: {
      tr: 'Koh-i-Noor\'un tarih boyunca neredeyse her erkek sahibi talihsizlik yaşamıştır. Bu yüzden gelenekte yalnızca kraliyet kadınları taşımıştır — Kraliçe Victoria, Kraliçe Alexandra, Kraliçe Mary, Kraliçe Ana.',
      en: 'Nearly every male owner of Koh-i-Noor through history suffered misfortune. By tradition it\'s therefore worn only by royal women — Queen Victoria, Alexandra, Mary, the Queen Mother.',
      ar: 'يرتديها فقط نساء العائلة المالكة البريطانية.',
    },
    stats: {
      current: '105.6 ct',
      original: '~186 ct',
      recut: '1852',
      location: 'Tower of London',
      claims: 'Hindistan, Pakistan, Afganistan, İran',
    },
    timeline: [
      { year: '1200',
        event: { tr: 'Muhtemelen Golconda\'da çıkarılır.',
                 en: 'Likely mined in Golconda, India.',
                 ar: 'استُخرجت من جولكندا.' } },
      { year: '1628',
        event: { tr: 'Şah Jahan\'ın Tavus Tahtı\'nda yerini alır.',
                 en: 'Set into Shah Jahan\'s Peacock Throne.',
                 ar: 'توضع في عرش الطاووس.' } },
      { year: '1739',
        event: { tr: 'Nadir Şah\'ın Delhi baskını — ismi verir.',
                 en: 'Nader Shah sacks Delhi; names it Koh-i-Noor.',
                 ar: 'نادر شاه يسميها كوه نور.' } },
      { year: '1849',
        event: { tr: 'İngiliz Doğu Hindistan Şirketi Kraliçe Victoria\'ya gönderir.',
                 en: 'East India Company sends it to Queen Victoria.',
                 ar: 'تُرسل إلى فكتوريا 1849.' } },
      { year: '1852',
        event: { tr: 'Londra\'da yeniden kesim: 186 → 105,6 karat.',
                 en: 'Recut in London: 186 → 105.6 carats.',
                 ar: 'قطعها الجديد 1852.' } },
    ],
    digDeeper: [
      {
        id: 'ethics',
        icon: 'ethics',
        title: { tr: 'Dört Ülkenin Talebi', en: 'Four Nations Claim It', ar: 'أربع دول تطالب بها' },
        body: {
          tr: 'Hindistan, Pakistan, Afganistan ve İran dört ülke de Koh-i-Noor\'un kendilerine ait olduğunu öne sürer. Hindistan köken itibariyle, Pakistan Ranjit Singh\'in hazinesinin devamı olarak, Afganistan Ahmad Şah Durrani\'nin mülkiyeti üzerinden, İran Nadir Şah\'ın aldığı ganimet nedeniyle talep ediyor. Birleşik Krallık geri vermeyi reddediyor — bu konu bir kez daha 2023\'te Kral III. Charles\'ın taç giyme töreni sırasında uluslararası tartışma oldu.',
          en: 'India, Pakistan, Afghanistan and Iran all claim Koh-i-Noor. India by origin, Pakistan as successor to Ranjit Singh\'s treasury, Afghanistan through Ahmad Shah Durrani, Iran because Nader Shah seized it as spoils. The UK declines to return it — the dispute flared again in 2023 around King Charles III\'s coronation.',
          ar: 'أربع دول تطالب باسترجاع كوه نور.',
        },
      },
    ],
    related: ['cullinan', 'hope-pirlantasi'],
  },
];
