/**
 * curriculumMap.js — Faz 7
 *
 * Raporun 5. bölümündeki eşleşmeleri tek bir veri dosyasına dönüştürür.
 * Her kayıt bir sergi/lab/atölye/hikâye/ders planı kimliğini MEB ve NGSS
 * kazanımlarına + yaş + zorluk + süre etiketlerine bağlar. UI bileşenleri
 * (örn. ContentBadges) bu kaynaktan beslenir.
 *
 * Şema:
 *   type:          'exhibit' | 'lab' | 'workshop' | 'story' | 'lesson' | 'game'
 *   id:            ilgili içeriğin id'si (exhibit-id, lab-id, ...)
 *   ageMin, ageMax: yaş aralığı (integer, dahil)
 *   grades:        ['4','5','6', ...] — ilgili sınıflar (string)
 *   subjects:      ['fen','sosyal','teknoloji','gorsel','coğrafya','kimya','matematik','türkçe']
 *   difficulty:    'easy' | 'medium' | 'hard'
 *   durationMin:   tahminî süre (dakika)
 *   mebCodes:      [{ code, label: {tr,en,ar} }]  — MEB kazanım kodları + kısa açıklama
 *   ngssCodes:     [{ code, label: {tr,en,ar} }]  — NGSS kodları (opsiyonel)
 *   outputs:       ['worksheet','report','model','presentation','sketch','lab-notebook']
 *                  — beklenen ürün türleri
 *   notes:         { tr, en, ar } — kısa öğretmen notu (opsiyonel)
 *
 * KURAL: Tüm kazanım kodları 2024 MEB öğretim programı kod formatında
 * yazılır (ör. "FB.6.4.1.1" — Fen Bilimleri, 6. sınıf, 4. ünite, 1. konu,
 * 1. kazanım). Coğrafya "COĞ.10.3.2" formatı kullanılır. Teknoloji Tasarım
 * "TT.7.B.1.6" formatındadır. Görsel Sanatlar "GS.7.7.2"dir.
 *
 * Kaynak: mufredat.meb.gov.tr (öğretim programları).
 */

const mk = (tr, en, ar) => ({ tr, en, ar });

export const curriculumMap = [
  // ═══════════════════════════════════════════════════════════════
  // FEN — 6. SINIF, IŞIK KONUSU
  // ═══════════════════════════════════════════════════════════════
  {
    type: 'lab',
    id: 'light', // DiamondCutSimulator
    ageMin: 11,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['fen'],
    difficulty: 'medium',
    durationMin: 25,
    mebCodes: [
      { code: 'FB.6.4.1.1', label: mk(
        'Işığın yansıması olgusunu açıklar.',
        'Explains the phenomenon of light reflection.',
        'يشرح ظاهرة انعكاس الضوء.',
      ) },
      { code: 'FB.6.4.1.2', label: mk(
        'Gelen ışın ve yansıyan ışın arasındaki ilişkiyi gösterir.',
        'Shows the relationship between incident and reflected rays.',
        'يوضح العلاقة بين الشعاع الساقط والمنعكس.',
      ) },
    ],
    ngssCodes: [
      { code: '5-PS1-3', label: mk(
        'Malzemeleri gözlenebilir özelliklerine göre tanımlar.',
        'Makes observations to identify materials by properties.',
        'يحدد المواد بخصائصها الملاحظة.',
      ) },
    ],
    outputs: ['worksheet', 'lab-notebook'],
  },
  {
    type: 'lab',
    id: 'guess', // StoneGuessing
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6'],
    subjects: ['fen'],
    difficulty: 'easy',
    durationMin: 15,
    mebCodes: [
      { code: 'FB.6.4.3.3', label: mk(
        'Cisimlerin neden farklı renklerde göründüğünü açıklar.',
        'Explains why objects appear in different colors.',
        'يشرح سبب ظهور الأشياء بألوان مختلفة.',
      ) },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'lab',
    id: 'mohs',
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6', '7', '8', '9'],
    subjects: ['fen', 'kimya'],
    difficulty: 'medium',
    durationMin: 30,
    mebCodes: [
      { code: 'KİM.9.2.8', label: mk(
        'Katıların özelliklerini (sertlik, yoğunluk, parlaklık) karşılaştırır.',
        'Compares properties of solids (hardness, density, luster).',
        'يقارن خصائص الأجسام الصلبة.',
      ) },
    ],
    ngssCodes: [
      { code: 'MS-PS1-2', label: mk(
        'Yoğunluk ve diğer özelliklerden madde tanımlar.',
        'Analyzes/interprets data on properties of substances.',
        'يحلل بيانات خصائص المواد.',
      ) },
    ],
    outputs: ['worksheet', 'lab-notebook'],
  },
  {
    type: 'lab',
    id: 'tarnish', // SilverTarnish
    ageMin: 12,
    ageMax: 18,
    grades: ['7', '8', '9'],
    subjects: ['fen', 'kimya'],
    difficulty: 'medium',
    durationMin: 40,
    mebCodes: [
      { code: 'KİM.9.1.1', label: mk(
        'Kimyanın günlük hayatla ilişkisini açıklar.',
        'Explains the relationship of chemistry to everyday life.',
        'يشرح علاقة الكيمياء بالحياة اليومية.',
      ) },
      { code: 'KİM.9.1.2', label: mk(
        'Kimyasal güvenlik kurallarına göre çalışır.',
        'Works according to chemical safety rules.',
        'يعمل وفق قواعد السلامة الكيميائية.',
      ) },
    ],
    outputs: ['report', 'lab-notebook'],
  },
  {
    type: 'lab',
    id: 'karat', // KaratCalculator
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6', '7'],
    subjects: ['matematik', 'sosyal'],
    difficulty: 'easy',
    durationMin: 20,
    mebCodes: [
      { code: 'MAT.5.1.5', label: mk(
        'Yüzde hesaplama ve oran-orantı kurar.',
        'Calculates percentages, sets up ratios and proportions.',
        'يحسب النسب المئوية والنسب والتناسب.',
      ) },
      { code: 'SB.5.5.2', label: mk(
        'Bütçe planlama ve ihtiyaç–istek kararlarını değerlendirir.',
        'Evaluates budget planning and need/want decisions.',
        'يقيّم قرارات تخطيط الميزانية.',
      ) },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'lab',
    id: 'lydia', // LydiaMint
    ageMin: 10,
    ageMax: 15,
    grades: ['6', '7'],
    subjects: ['sosyal'],
    difficulty: 'medium',
    durationMin: 35,
    mebCodes: [
      { code: 'SB.6.3.2', label: mk(
        'Medeniyetlerin ortak mirasa katkılarını açıklar.',
        'Explains civilizations\' contributions to shared heritage.',
        'يشرح مساهمات الحضارات في التراث المشترك.',
      ) },
      { code: 'SB.6.3.3', label: mk(
        'Geçmişte ticaret ve paranın gelişimini ilişkilendirir.',
        'Relates the historical development of trade and money.',
        'يربط تطور التجارة والنقود.',
      ) },
    ],
    outputs: ['worksheet', 'presentation'],
  },
  {
    type: 'lab',
    id: 'virtual-gemologist',
    ageMin: 11,
    ageMax: 16,
    grades: ['6', '7', '8', '9'],
    subjects: ['fen', 'kimya'],
    difficulty: 'hard',
    durationMin: 40,
    mebCodes: [
      { code: 'FB.6.4.3.3', label: mk('Cisimlerin renkli görünmesi.', 'Why objects appear colored.', 'لماذا تظهر الأشياء ملونة.') },
      { code: 'KİM.9.2.8', label: mk('Katıların özellikleri (sertlik, yoğunluk).', 'Properties of solids (hardness, density).', 'خصائص المواد الصلبة.') },
    ],
    ngssCodes: [
      { code: '5-PS1-3', label: mk('Malzemeleri özelliklerine göre tanımlar.', 'Identify materials by properties.', 'يحدد المواد بخصائصها.') },
      { code: 'MS-PS1-2', label: mk('Madde tanımı için verileri yorumlar.', 'Analyze data to identify substances.', 'يحلل البيانات لتحديد المواد.') },
    ],
    outputs: ['lab-notebook', 'report'],
    notes: {
      tr: 'Kanıt-hipotez-sonuç döngüsü. 5 testin birbirini desteklediği durumda tanı güvenilirdir.',
      en: 'Evidence–hypothesis–conclusion cycle. When 5 tests reinforce each other, the ID is reliable.',
      ar: 'دورة الأدلة والفرضية والنتيجة.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // SERGİLER
  // ═══════════════════════════════════════════════════════════════
  {
    type: 'exhibit',
    id: '4c-sistemi',
    ageMin: 11,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['fen'],
    difficulty: 'medium',
    durationMin: 15,
    mebCodes: [
      { code: 'FB.6.4.1.1', label: mk('Işığın yansıması.', 'Light reflection.', 'انعكاس الضوء.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'exhibit',
    id: 'kesim-sekilleri',
    ageMin: 11,
    ageMax: 14,
    grades: ['6'],
    subjects: ['fen', 'gorsel'],
    difficulty: 'medium',
    durationMin: 12,
    mebCodes: [
      { code: 'FB.6.4.1.1', label: mk('Işığın yansıması.', 'Light reflection.', 'انعكاس الضوء.') },
      { code: 'GS.7.3.2', label: mk('Işık ve renk etkilerini görsel anlatıma uygular.', 'Applies light/color effects in visual expression.', 'يطبق تأثيرات الضوء واللون.') },
    ],
    outputs: ['sketch'],
  },
  {
    type: 'exhibit',
    id: 'zumrut',
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6'],
    subjects: ['fen', 'sosyal'],
    difficulty: 'easy',
    durationMin: 10,
    mebCodes: [
      { code: 'FB.6.4.3.3', label: mk('Cisimlerin renkli görünmesi.', 'Why objects appear colored.', 'لماذا تظهر الأشياء ملونة.') },
      { code: 'SB.6.2.1', label: mk('Konum ve harita bilgisi.', 'Location and map literacy.', 'الموقع والخرائط.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'exhibit',
    id: 'yakut',
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6'],
    subjects: ['fen'],
    difficulty: 'easy',
    durationMin: 10,
    mebCodes: [
      { code: 'FB.6.4.3.2', label: mk('Beyaz ışığın bileşenleri.', 'Components of white light.', 'مكونات الضوء الأبيض.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'exhibit',
    id: 'safir',
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6'],
    subjects: ['fen'],
    difficulty: 'easy',
    durationMin: 10,
    mebCodes: [
      { code: 'FB.6.4.3.2', label: mk('Beyaz ışık ve renk.', 'White light and color.', 'الضوء الأبيض واللون.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'exhibit',
    id: 'pirlanta-nasil-olusur',
    ageMin: 12,
    ageMax: 16,
    grades: ['6', '10'],
    subjects: ['fen', 'coğrafya'],
    difficulty: 'medium',
    durationMin: 15,
    mebCodes: [
      { code: 'COĞ.10.3.1', label: mk('Yer kabuğunun tektonik yapısı.', 'Tectonic structure of Earth\'s crust.', 'البنية التكتونية.') },
      { code: 'FB.4.3.2', label: mk('Dünya\'nın yapısı için bilimsel model.', 'Scientific model of Earth\'s structure.', 'نموذج بنية الأرض.') },
    ],
    ngssCodes: [
      { code: 'MS-ESS2-1', label: mk('Kayaç döngüsü ve kristalleşme.', 'Rock cycle and crystallization.', 'دورة الصخور والتبلور.') },
    ],
    outputs: ['sketch', 'presentation'],
  },
  {
    type: 'exhibit',
    id: 'altin-tarihcesi',
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6'],
    subjects: ['sosyal'],
    difficulty: 'easy',
    durationMin: 12,
    mebCodes: [
      { code: 'SB.5.5.1', label: mk('Kaynaklar ve ekonomik faaliyetler.', 'Resources and economic activities.', 'الموارد والأنشطة الاقتصادية.') },
      { code: 'SB.6.3.2', label: mk('Medeniyetlerin ortak mirasa katkısı.', 'Civilizations\' shared heritage.', 'التراث المشترك للحضارات.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'exhibit',
    id: 'ayar-sistemi',
    ageMin: 10,
    ageMax: 13,
    grades: ['5', '6'],
    subjects: ['matematik', 'sosyal'],
    difficulty: 'easy',
    durationMin: 12,
    mebCodes: [
      { code: 'MAT.5.1.5', label: mk('Yüzde ve oran.', 'Percentage and ratio.', 'النسبة المئوية والنسبة.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'exhibit',
    id: 'trabzon-hasiri',
    ageMin: 10,
    ageMax: 16,
    grades: ['5', '6', '7'],
    subjects: ['sosyal', 'gorsel', 'teknoloji'],
    difficulty: 'medium',
    durationMin: 15,
    mebCodes: [
      { code: 'SB.5.5.3', label: mk('Ekonomik faaliyetler ve yerel zanaat.', 'Economic activities and local craft.', 'الأنشطة الاقتصادية والحرف المحلية.') },
      { code: 'SB.6.3.2', label: mk('Ortak miras: Anadolu zanaatları.', 'Shared heritage: Anatolian crafts.', 'التراث المشترك.') },
    ],
    outputs: ['worksheet', 'presentation'],
    notes: {
      tr: 'Trabzon Hasırı UNESCO listesinde değildir; Türk Patent Coğrafi İşaret (2004) ile korunur.',
      en: 'Trabzon Hasır is not on the UNESCO list; it is protected by Turkish GI (2004).',
      ar: 'حصير طرابزون محمي بعلامة جغرافية تركية وطنية، ليس في قائمة اليونسكو.',
    },
  },
  {
    type: 'exhibit',
    id: 'telkari',
    ageMin: 10,
    ageMax: 16,
    grades: ['5', '6', '7'],
    subjects: ['sosyal', 'gorsel', 'teknoloji'],
    difficulty: 'medium',
    durationMin: 15,
    mebCodes: [
      { code: 'SB.6.3.2', label: mk('Medeniyetlerin ortak mirasa katkısı.', 'Civilizations\' contribution to shared heritage.', 'مساهمة الحضارات في التراث.') },
      { code: 'GS.7.7.1', label: mk('Türk müzeciliği.', 'Turkish museum heritage.', 'التراث المتحفي التركي.') },
    ],
    outputs: ['sketch'],
    notes: {
      tr: 'Midyat Telkâri, Türk Patent Coğrafi İşareti (2013) ile korunur; UNESCO listesinde değildir.',
      en: 'Midyat Telkâri is protected by Turkish GI (2013); not on the UNESCO list.',
      ar: 'تلكاري ميديات محمي بعلامة جغرافية تركية (2013)، ليس في قائمة اليونسكو.',
    },
  },
  {
    type: 'exhibit',
    id: 'platin-nedir',
    ageMin: 13,
    ageMax: 18,
    grades: ['9'],
    subjects: ['kimya'],
    difficulty: 'medium',
    durationMin: 15,
    mebCodes: [
      { code: 'KİM.9.1.6', label: mk('Periyodik tablo ve element grupları.', 'Periodic table and element groups.', 'الجدول الدوري.') },
    ],
    outputs: ['sketch'],
  },

  // ═══════════════════════════════════════════════════════════════
  // ATÖLYELER
  // ═══════════════════════════════════════════════════════════════
  {
    type: 'workshop',
    id: 'hasir',
    ageMin: 8,
    ageMax: 14,
    grades: ['5', '6', '7'],
    subjects: ['sosyal', 'gorsel'],
    difficulty: 'medium',
    durationMin: 45,
    mebCodes: [
      { code: 'SB.6.3.2', label: mk('Ortak miras ve yerel zanaat.', 'Shared heritage and local craft.', 'التراث المشترك والحرف.') },
      { code: 'GS.7.7.2', label: mk('Dijital araçlarla sanal müze.', 'Virtual museum with digital tools.', 'متحف افتراضي.') },
    ],
    outputs: ['sketch', 'presentation'],
  },
  {
    type: 'workshop',
    id: 'telkari-usta',
    ageMin: 9,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['gorsel', 'teknoloji'],
    difficulty: 'hard',
    durationMin: 75,
    mebCodes: [
      { code: 'TT.7.B.1.6', label: mk('Kullanıcı/malzeme/çevre etmenleri.', 'User/material/environment factors in design.', 'عوامل التصميم.') },
      { code: 'TT.7.B.1.8', label: mk('Güvenlik kurallarına uyma.', 'Following safety rules.', 'اتباع قواعد السلامة.') },
    ],
    outputs: ['sketch'],
  },
  {
    type: 'workshop',
    id: 'savat',
    ageMin: 10,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['sosyal', 'kimya'],
    difficulty: 'hard',
    durationMin: 60,
    mebCodes: [
      { code: 'SB.6.3.2', label: mk('Ortak miras ve yerel zanaat.', 'Shared heritage and local craft.', 'التراث المشترك.') },
    ],
    outputs: ['presentation'],
  },
  {
    type: 'workshop',
    id: 'mine',
    ageMin: 10,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['sosyal', 'gorsel', 'kimya'],
    difficulty: 'hard',
    durationMin: 60,
    mebCodes: [
      { code: 'SB.6.3.2', label: mk('Ortak miras — Bizans/Osmanlı mine.', 'Shared heritage — Byzantine/Ottoman enamel.', 'التراث المشترك.') },
    ],
    outputs: ['presentation'],
  },

  // ═══════════════════════════════════════════════════════════════
  // YENİ ATÖLYELER (Faz 7)
  // ═══════════════════════════════════════════════════════════════
  {
    type: 'workshop',
    id: 'kutahya-cini-kutu',
    ageMin: 8,
    ageMax: 12,
    grades: ['3', '4', '5'],
    subjects: ['gorsel', 'sosyal'],
    difficulty: 'easy',
    durationMin: 75,
    mebCodes: [
      { code: 'GS.7.7.2', label: mk('Dijital araçlarla sanal müze.', 'Virtual museum with digital tools.', 'متحف افتراضي.') },
    ],
    ngssCodes: [
      { code: '3-5-ETS1', label: mk('Tasarım problemi tanımlama.', 'Defining design problems.', 'تعريف مشكلة التصميم.') },
    ],
    outputs: ['sketch', 'model'],
  },
  {
    type: 'workshop',
    id: 'eskisehir-lutasi',
    ageMin: 9,
    ageMax: 14,
    grades: ['5', '6', '10'],
    subjects: ['coğrafya', 'teknoloji'],
    difficulty: 'medium',
    durationMin: 60,
    mebCodes: [
      { code: 'COĞ.10.3.2', label: mk('Kayaç/iklim/aşınma ilişkisi.', 'Rock/climate/erosion relationship.', 'العلاقة بين الصخر والمناخ والتعرية.') },
      { code: 'TT.7.B.1.8', label: mk('Güvenlik kurallarına uyma.', 'Following safety rules.', 'قواعد السلامة.') },
    ],
    ngssCodes: [
      { code: '4-ESS2-1', label: mk('Aşınma ve erozyon süreçleri.', 'Weathering and erosion.', 'التعرية والحت.') },
    ],
    outputs: ['model', 'worksheet'],
  },
  {
    type: 'workshop',
    id: 'elmas-kagit-model',
    ageMin: 10,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['fen', 'matematik'],
    difficulty: 'medium',
    durationMin: 75,
    mebCodes: [
      { code: 'FB.6.4.1.1', label: mk('Işığın yansıması.', 'Light reflection.', 'انعكاس الضوء.') },
      { code: 'MAT.7.3.1', label: mk('Geometrik şekiller ve simetri.', 'Geometric shapes and symmetry.', 'الأشكال والتناظر.') },
    ],
    ngssCodes: [
      { code: '5-PS1-3', label: mk('Malzeme özellikleriyle tanıma.', 'Identify materials by properties.', 'التعرف بالخصائص.') },
    ],
    outputs: ['model', 'worksheet'],
  },
  {
    type: 'workshop',
    id: 'kristal-yetistirme',
    ageMin: 9,
    ageMax: 14,
    grades: ['5', '6', '9'],
    subjects: ['fen', 'kimya'],
    difficulty: 'medium',
    durationMin: 45,
    mebCodes: [
      { code: 'KİM.9.2.8', label: mk('Katıların özellikleri.', 'Properties of solids.', 'خصائص المواد الصلبة.') },
    ],
    ngssCodes: [
      { code: 'MS-ESS2-1', label: mk('Kristalleşme ve Dünya materyalleri.', 'Crystallization and Earth materials.', 'التبلور.') },
    ],
    outputs: ['lab-notebook', 'report'],
  },
  {
    type: 'workshop',
    id: 'uv-floresans',
    ageMin: 10,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['fen'],
    difficulty: 'medium',
    durationMin: 45,
    mebCodes: [
      { code: 'FB.6.4.3.2', label: mk('Beyaz ışık ve spektrum.', 'White light and spectrum.', 'الضوء الأبيض والطيف.') },
    ],
    ngssCodes: [
      { code: '5-PS1-3', label: mk('Malzeme özellikleri.', 'Material properties.', 'خصائص المواد.') },
    ],
    outputs: ['lab-notebook', 'worksheet'],
  },
  {
    type: 'workshop',
    id: 'yogunluk-dedektif',
    ageMin: 10,
    ageMax: 14,
    grades: ['6', '7'],
    subjects: ['fen', 'matematik'],
    difficulty: 'medium',
    durationMin: 60,
    mebCodes: [
      { code: 'KİM.9.2.8', label: mk('Katı özellikleri: yoğunluk.', 'Properties of solids: density.', 'الكثافة.') },
      { code: 'MAT.6.2.3', label: mk('Ölçme ve birim dönüşümü.', 'Measurement and unit conversion.', 'القياس والتحويل.') },
    ],
    ngssCodes: [
      { code: 'MS-PS1-2', label: mk('Yoğunlukla madde tanıma.', 'Identifying substances via density.', 'التعرف بالكثافة.') },
    ],
    outputs: ['lab-notebook', 'worksheet'],
  },

  // ═══════════════════════════════════════════════════════════════
  // DERS PLANLARI
  // ═══════════════════════════════════════════════════════════════
  {
    type: 'lesson',
    id: 'mohs-scratch-test',
    ageMin: 10,
    ageMax: 14,
    grades: ['5', '6', '7', '8'],
    subjects: ['fen'],
    difficulty: 'medium',
    durationMin: 45,
    mebCodes: [
      { code: 'KİM.9.2.8', label: mk('Katıların özellikleri.', 'Properties of solids.', 'خصائص المواد الصلبة.') },
    ],
    ngssCodes: [
      { code: 'MS-PS1-2', label: mk('Madde özellikleri analizi.', 'Properties of substances.', 'خصائص المواد.') },
    ],
    outputs: ['worksheet', 'lab-notebook'],
  },
  {
    type: 'lesson',
    id: 'unesco-intangible-heritage',
    ageMin: 14,
    ageMax: 17,
    grades: ['9', '10', '11'],
    subjects: ['sosyal'],
    difficulty: 'hard',
    durationMin: 90,
    mebCodes: [
      { code: 'SB.6.3.2', label: mk('Ortak miras ve koruma.', 'Shared heritage and preservation.', 'التراث والحماية.') },
    ],
    outputs: ['presentation', 'report'],
    notes: {
      tr: 'Önemli: UNESCO ICH listesi ile Türk Patent Coğrafi İşaret ayrı sistemlerdir. Trabzon Hasırı UNESCO listesinde değildir, CI ile korunur.',
      en: 'Important: UNESCO ICH list and Turkish GI system are separate. Trabzon Hasır is not on UNESCO, but is protected by GI.',
      ar: 'مهم: قائمة اليونسكو والعلامة الجغرافية التركية نظامان مختلفان.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // YENİ DERS PLANLARI (Faz 7) — teacherLessonPlans.js ile eşli
  // ═══════════════════════════════════════════════════════════════
  {
    type: 'lesson',
    id: 'pirlanta-kesim-isik',
    ageMin: 11,
    ageMax: 13,
    grades: ['6'],
    subjects: ['fen'],
    difficulty: 'medium',
    durationMin: 40,
    mebCodes: [
      { code: 'FB.6.4.1.1', label: mk('Işığın yansıması.', 'Light reflection.', 'انعكاس الضوء.') },
      { code: 'FB.6.4.1.2', label: mk('Gelen ve yansıyan ışın.', 'Incident and reflected rays.', 'الأشعة الساقطة والمنعكسة.') },
    ],
    outputs: ['worksheet', 'lab-notebook'],
  },
  {
    type: 'lesson',
    id: 'beyaz-isik-renkli-taslar',
    ageMin: 11,
    ageMax: 13,
    grades: ['6'],
    subjects: ['fen'],
    difficulty: 'medium',
    durationMin: 40,
    mebCodes: [
      { code: 'FB.6.4.3.2', label: mk('Beyaz ışık.', 'White light.', 'الضوء الأبيض.') },
      { code: 'FB.6.4.3.3', label: mk('Cisimlerin renkli görünmesi.', 'Why objects appear colored.', 'لماذا تظهر الأشياء ملونة.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'lesson',
    id: 'kuyumcu-butcesi',
    ageMin: 10,
    ageMax: 12,
    grades: ['5'],
    subjects: ['sosyal', 'matematik'],
    difficulty: 'easy',
    durationMin: 40,
    mebCodes: [
      { code: 'SB.5.5.2', label: mk('Bütçe planlama.', 'Budget planning.', 'تخطيط الميزانية.') },
      { code: 'MAT.5.1.5', label: mk('Yüzde ve oran.', 'Percentage and ratio.', 'النسبة والنسبة المئوية.') },
    ],
    outputs: ['worksheet'],
  },
  {
    type: 'lesson',
    id: 'periyodik-tablo-metaller',
    ageMin: 14,
    ageMax: 16,
    grades: ['9'],
    subjects: ['kimya'],
    difficulty: 'medium',
    durationMin: 40,
    mebCodes: [
      { code: 'KİM.9.1.6', label: mk('Periyodik tablo.', 'Periodic table.', 'الجدول الدوري.') },
    ],
    outputs: ['sketch', 'worksheet'],
  },
  {
    type: 'lesson',
    id: 'sanal-muze-kuratorluk',
    ageMin: 12,
    ageMax: 14,
    grades: ['7'],
    subjects: ['gorsel', 'teknoloji'],
    difficulty: 'medium',
    durationMin: 80,
    mebCodes: [
      { code: 'GS.7.7.1', label: mk('Türk müzeciliği.', 'Turkish museum heritage.', 'التراث المتحفي.') },
      { code: 'GS.7.7.2', label: mk('Sanal müze oluşturma.', 'Creating a virtual museum.', 'إنشاء متحف افتراضي.') },
      { code: 'TT.7.B.2.1', label: mk('Taslak, 2D dijital görsel, sunum.', 'Sketch, 2D digital, presentation.', 'الرسم التخطيطي الرقمي.') },
    ],
    outputs: ['presentation', 'sketch'],
  },
];

/**
 * İçerik id'sine ve tipine göre curriculum eşleşmesini bul.
 */
export function getCurriculumEntry(type, id) {
  return curriculumMap.find((e) => e.type === type && e.id === id);
}

/**
 * Tek bir id için (tip bilmesek) tüm eşleşmeleri döner.
 */
export function getCurriculumEntriesById(id) {
  return curriculumMap.filter((e) => e.id === id);
}

/**
 * Belirli bir sınıfa/konuya göre uygun içerikleri listele.
 */
export function findByGrade(grade) {
  return curriculumMap.filter((e) => e.grades.includes(String(grade)));
}

export function findBySubject(subject) {
  return curriculumMap.filter((e) => e.subjects.includes(subject));
}

export const curriculumMapCount = curriculumMap.length;
