/**
 * _lessonPlanEnrichment.js — Faz 6-H
 *
 * 4 ders planı için genişletilmiş metadata katmanı. Mevcut planların
 * (lessonPlans.js) step/worksheet/discussion/relatedExhibits alanları
 * zaten zengin; onlara DOKUNULMAZ. Enrichment yalnızca öğretmenin
 * sınıfa hazırlanırken ve dersi değerlendirirken ihtiyaç duyduğu
 * pedagojik katmanı ekler:
 *   - intro (ders neden önemli)
 *   - learningObjectives (3-5 kazanım)
 *   - curriculumLinks (MEB / Cambridge / Common Core)
 *   - assessmentRubric (3-5 kriter, 4 seviye)
 *   - sources (olgusal iddialara bağlı)
 *   - relatedLabs / relatedStories / relatedWorkshops
 *   - curatorNote (öğretmene özel ipucu)
 *
 * Şema (tüm alanlar OPSİYONEL):
 *   intro              { tr, en, ar }
 *   learningObjectives [{tr,en,ar}]   — 3-5 kazanım
 *   curriculumLinks    [{tr,en,ar}]   — müfredat bağlantıları
 *   assessmentRubric   [{
 *                        criterion: {tr,en,ar},
 *                        levels: [
 *                          { score: 4, descriptor: {tr,en,ar} },  // Üst
 *                          { score: 3, descriptor: {tr,en,ar} },
 *                          { score: 2, descriptor: {tr,en,ar} },
 *                          { score: 1, descriptor: {tr,en,ar} },  // Alt
 *                        ]
 *                      }]
 *   sources            ['source-id']
 *   relatedLabs        ['lab-id']
 *   relatedStories     ['story-id']
 *   relatedWorkshops   ['workshop-id']
 *   relatedQuizzes     ['quiz-category-id']
 *   vocabulary         ['glossary-term-id']
 *   curatorNote        { tr, en, ar, cite?: ['source-id'] }
 *
 * Kaynakça disiplini (Karar 1): step/worksheet/discussion body'leri
 * dokunulmadı; yeni olgusal alanlar (curatorNote, learningObjectives
 * kısmen pedagojik-olgusal) kaynaklanır.
 */

export const lessonPlanEnrichment = {
  // ═══════════════════════════════════════════════════════════════
  // 1. MOHS SCRATCH TEST
  // ═══════════════════════════════════════════════════════════════
  'mohs-scratch-test': {
    intro: {
      tr: 'Bu ders öğrencilerin mineral sertliğini soyut sayısal bir kavram olarak değil, ellerinde ve gözlerinde deneyimleyerek öğrenmesini sağlar. Mohs skalasının asıl zorluğu ordinal (sıra) olması — 40 dakikalık bir sınıf deneyinde bunun nasıl gösterilebildiği bu plandadır.',
      en: 'This lesson lets students experience mineral hardness not as an abstract number but in their hands and eyes. Mohs scale\'s real subtlety is that it is ordinal (not ratio) — this plan shows how to demonstrate that in a 40-minute class.',
      ar: 'يتيح الدرس للطلاب اختبار صلابة المعادن يدوياً لا رقمياً. صعوبة مقياس موس الحقيقية: أنه ترتيبي لا نسبي.',
    },
    learningObjectives: [
      {
        tr: 'Mohs skalasının 10 mineralini ve her birinin sertlik değerini tanımlayabilir (Bilgi)',
        en: 'Identify the 10 Mohs minerals and their hardness values (Knowledge)',
        ar: 'يحدد معادن موس العشرة وصلاباتها',
      },
      {
        tr: 'Ev ve okul eşyalarını (tırnak, cam, bıçak) Mohs değerleriyle eşleştirebilir (Uygulama)',
        en: 'Match common household items (fingernail, glass, knife) to Mohs values (Application)',
        ar: 'يربط الأدوات اليومية بقيم موس',
      },
      {
        tr: 'İki mineralden hangisinin diğerini çizdiğini test ederek sertlik sıralaması yapabilir (Analiz)',
        en: 'Rank minerals by hardness through empirical scratch testing (Analysis)',
        ar: 'يرتب المعادن بالصلابة تجريبياً',
      },
      {
        tr: 'Mohs skalasının ordinal (sıralama) ile ratio (oran) skala arasındaki farkı açıklayabilir (Değerlendirme)',
        en: 'Explain the difference between ordinal and ratio scales using Mohs as example (Evaluation)',
        ar: 'يميز بين المقاييس الترتيبية والنسبية',
      },
    ],
    curriculumLinks: [
      {
        tr: 'MEB 6. Sınıf Fen Bilimleri: "Madde ve Özellikleri" ünitesi — minerallerin fiziksel özellikleri',
        en: 'Turkish MEB Grade 6 Science: "Matter and Properties" — physical properties of minerals',
        ar: 'منهج الصف السادس التركي: "المادة وخصائصها"',
      },
      {
        tr: 'Cambridge Lower Secondary Science: Stage 8 — Properties of materials',
        en: 'Cambridge Lower Secondary Science Stage 8 — Properties of materials',
        ar: 'كامبريدج المرحلة 8 — خصائص المواد',
      },
      {
        tr: 'US NGSS MS-PS1: Matter and its Interactions',
        en: 'US NGSS MS-PS1: Matter and its Interactions',
        ar: 'المعايير الأمريكية NGSS MS-PS1',
      },
    ],
    assessmentRubric: [
      {
        criterion: {
          tr: 'Mineral çifti testi doğruluğu',
          en: 'Accuracy of mineral pair testing',
          ar: 'دقة اختبار أزواج المعادن',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Tüm çiftler doğru sıralanmış, her gözlem yazılı', en: 'All pairs ranked correctly, every observation recorded', ar: 'ترتيب دقيق كامل' } },
          { score: 3, descriptor: { tr: 'Çoğu çift doğru, küçük hatalar var', en: 'Most pairs correct, minor errors', ar: 'معظمها صحيح' } },
          { score: 2, descriptor: { tr: 'Yarı doğru, gözlem eksik', en: 'Half correct, observations incomplete', ar: 'نصف صحيح' } },
          { score: 1, descriptor: { tr: 'Çoğunlukla yanlış veya eksik', en: 'Mostly incorrect or missing', ar: 'ناقص غالباً' } },
        ],
      },
      {
        criterion: {
          tr: 'Çalışma kağıdındaki kavramsal sorular',
          en: 'Conceptual worksheet answers',
          ar: 'إجابات ورقة العمل',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Ordinal/ratio farkı net, elmas-kuvars sorusu doğru', en: 'Ordinal/ratio distinction clear, diamond-quartz gap answered', ar: 'الفرق الترتيبي/النسبي واضح' } },
          { score: 3, descriptor: { tr: 'Temel kavramlar doğru, derinlik sınırlı', en: 'Basic concepts correct, limited depth', ar: 'المفاهيم الأساسية صحيحة' } },
          { score: 2, descriptor: { tr: 'Bazı sorular boş veya yüzeysel', en: 'Some answers blank or superficial', ar: 'بعض الإجابات سطحية' } },
          { score: 1, descriptor: { tr: 'Kavramsal hatalar baskın', en: 'Conceptual errors dominate', ar: 'أخطاء مفاهيمية كثيرة' } },
        ],
      },
      {
        criterion: {
          tr: 'Grupla işbirliği ve güvenlik',
          en: 'Group cooperation and safety',
          ar: 'التعاون والأمان',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Aktif işbirliği, malzeme güvenliği kusursuz', en: 'Active cooperation, flawless material safety', ar: 'تعاون وأمان ممتاز' } },
          { score: 3, descriptor: { tr: 'İyi işbirliği, küçük güvenlik uyarıları', en: 'Good cooperation, minor safety reminders', ar: 'جيد مع تنبيهات' } },
          { score: 2, descriptor: { tr: 'Sınırlı katılım', en: 'Limited participation', ar: 'مشاركة محدودة' } },
          { score: 1, descriptor: { tr: 'İşbirliği eksik veya güvenlik ihlali', en: 'No cooperation or safety violation', ar: 'ضعف التعاون' } },
        ],
      },
    ],
    sources: ['mohs-1812', 'britannica-mohs', 'meb-ortaokul-fen-mufredat', 'bloom-taxonomy-revised'],
    relatedLabs: ['mohs', 'guess'],
    relatedStories: ['pirlantanin-3-milyar-yili'],
    relatedWorkshops: [],
    relatedQuizzes: ['renkli-taslar', 'pirlanta'],
    vocabulary: ['mohs', 'korund', 'beril'],
    curatorNote: {
      tr: 'Güvenlik uyarısı: Cam parçaları ve bıçak kenarı çocuk ellerinde risklidir. Her test öncesi grupları koruyucu gözlük ve sabitlenmiş mineral örnekleriyle hazırlayın. Mohs skalası ilkokul öğrencileriyle de yapılabilir ama 3-4. sınıf için sadece tırnak-para-cam üçlüsü yeter (6 adet yerine).',
      en: 'Safety note: Glass shards and knife edges can be risky in children\'s hands. Prepare each group with safety goggles and fixed mineral samples before testing. Mohs scale also works with primary students but for grades 3-4 the fingernail-coin-glass trio is enough (instead of 6 items).',
      ar: 'تحذير أمان: قطع الزجاج خطرة — استخدم نظارات واقية. للصفوف الابتدائية اكتفِ بالظفر والنقود والزجاج.',
      cite: ['britannica-mohs'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. SILVER TARNISH CHEMISTRY
  // ═══════════════════════════════════════════════════════════════
  'silver-tarnish-chemistry': {
    intro: {
      tr: 'Bu ders iki şeyi aynı anda yapar: (1) oksidasyon-redüksiyon kavramını görülebilir bir deneyle gösterir; (2) "mutfak kimyası" deneyimi üzerinden soyut denklemleri somut kılar. 60 dakika içinde hem denklem yazmayı hem de el hareketinin kimyasal anlamını öğretir.',
      en: 'This lesson does two things at once: (1) demonstrates oxidation-reduction with a visible experiment; (2) makes abstract equations concrete through "kitchen chemistry". In 60 minutes, students learn to write equations and to see the chemical meaning behind a manual action.',
      ar: 'يُعلّم الدرس الأكسدة والاختزال عبر تجربة منزلية مرئية — الطلاب يكتبون المعادلات ويرون تأثيرها.',
    },
    learningObjectives: [
      {
        tr: 'Gümüş oksitlenme denklemini (2 Ag + H₂S → Ag₂S + H₂) yazabilir ve her terimin rolünü açıklayabilir (Bilgi + Kavrama)',
        en: 'Write the silver tarnish equation (2 Ag + H₂S → Ag₂S + H₂) and explain each term\'s role (Knowledge + Comprehension)',
        ar: 'يكتب معادلة التأكسد ويشرح كل عنصر',
      },
      {
        tr: 'Alüminyum folyo + kabartma tozu + tuz deneyini güvenle uygulayabilir (Uygulama)',
        en: 'Safely perform the aluminum foil + baking soda + salt experiment (Application)',
        ar: 'يجري التجربة بأمان',
      },
      {
        tr: 'Ters redoks tepkimesini (3 Ag₂S + 2 Al → 6 Ag + Al₂S₃) açıklayabilir ve temizleme tekniğini yorumlayabilir (Analiz)',
        en: 'Explain the reverse redox reaction (3 Ag₂S + 2 Al → 6 Ag + Al₂S₃) and interpret the cleaning technique (Analysis)',
        ar: 'يشرح تفاعل الأكسدة-الاختزال العكسي',
      },
      {
        tr: 'Altının neden oksitlenmediğini "asil metal" kavramı üzerinden ilişkilendirebilir (Sentez)',
        en: 'Relate why gold doesn\'t tarnish to the "noble metal" concept (Synthesis)',
        ar: 'يربط عدم تأكسد الذهب بمفهوم المعدن النبيل',
      },
    ],
    curriculumLinks: [
      {
        tr: 'MEB 7. Sınıf Fen: "Madde ve Isı / Kimyasal Tepkimeler" ünitesi',
        en: 'Turkish MEB Grade 7 Science: "Matter and Heat / Chemical Reactions" unit',
        ar: 'منهج الصف السابع التركي: "التفاعلات الكيميائية"',
      },
      {
        tr: 'MEB 8. Sınıf Fen: "Asit-Baz Tepkimeleri" (temel kimya becerisi)',
        en: 'Turkish MEB Grade 8 Science: "Acid-Base Reactions" (foundational chemistry)',
        ar: 'منهج الصف الثامن التركي: "الأكسدة والاختزال"',
      },
      {
        tr: 'UK National Curriculum KS3 Chemistry: Chemical reactions; pure substances and mixtures',
        en: 'UK National Curriculum KS3 Chemistry: Chemical reactions; pure substances and mixtures',
        ar: 'المنهج البريطاني KS3 للكيمياء',
      },
    ],
    assessmentRubric: [
      {
        criterion: {
          tr: 'Kimyasal denklem yazımı ve dengeleme',
          en: 'Chemical equation writing and balancing',
          ar: 'كتابة وموازنة المعادلات',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Her iki denklem doğru yazılmış ve dengelenmiş', en: 'Both equations written and balanced correctly', ar: 'معادلتان دقيقتان' } },
          { score: 3, descriptor: { tr: 'Bir denklem tam, diğerinde küçük hata', en: 'One equation perfect, minor error in other', ar: 'معادلة واحدة سليمة' } },
          { score: 2, descriptor: { tr: 'Denklemler yazılmış ama dengelenmemiş', en: 'Equations written but unbalanced', ar: 'غير موزونة' } },
          { score: 1, descriptor: { tr: 'Denklem boş veya temel hata', en: 'Equations missing or fundamentally wrong', ar: 'خاطئة' } },
        ],
      },
      {
        criterion: {
          tr: 'Deney gözlemleri ve açıklama',
          en: 'Experimental observations and explanation',
          ar: 'الملاحظات التجريبية',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Renk değişimi, koku, bulanıklık hepsi kaydedilmiş; bilimsel nedenler açık', en: 'Color change, smell, cloudiness all recorded; scientific reasons clear', ar: 'ملاحظات كاملة' } },
          { score: 3, descriptor: { tr: 'Gözlemler yeterli, kısmi açıklama', en: 'Observations sufficient, partial explanation', ar: 'جيدة' } },
          { score: 2, descriptor: { tr: 'Gözlem eksik veya yalnızca görsel', en: 'Missing observations or visual only', ar: 'ناقصة' } },
          { score: 1, descriptor: { tr: 'Gözlem yok veya yanlış', en: 'No or incorrect observations', ar: 'لا توجد ملاحظات' } },
        ],
      },
      {
        criterion: {
          tr: 'Altın/asil metal kavramı tartışması',
          en: 'Discussion of gold / noble metal concept',
          ar: 'مناقشة المعدن النبيل',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Altının inertliği elektron konfigürasyonu ile açıklanır', en: 'Gold\'s inertness explained via electron configuration', ar: 'يشرح بإلكترونات' } },
          { score: 3, descriptor: { tr: 'Altın oksitlenmez denir ama sebebi yüzeysel', en: 'Gold doesn\'t oxidize is stated but reason shallow', ar: 'سطحي' } },
          { score: 2, descriptor: { tr: 'Sadece "altın iyidir" tipi ifade', en: 'Only "gold is better" type statement', ar: 'غير دقيق' } },
          { score: 1, descriptor: { tr: 'Kavram anlaşılmamış', en: 'Concept not understood', ar: 'لم يُفهم' } },
        ],
      },
    ],
    sources: ['crc-handbook', 'webelements', 'meb-ortaokul-fen-mufredat'],
    relatedLabs: ['tarnish', 'melt'],
    relatedStories: ['trabzon-hasiri-unesco', 'mardinli-telkari-ustasi-ayse'],
    relatedWorkshops: ['hasir', 'telkari-usta'],
    relatedQuizzes: ['gumus'],
    vocabulary: ['sterling', 'kararma', 'alasim'],
    curatorNote: {
      tr: 'Pedagojik ipucu: Deneyden önce öğrencilerin hipotezlerini yazdırın — bu adım sık atlanır ama "beklentim neydi, ne gördüm, neden farklıydı" zinciri oksidasyon kavramının kalıcılığını büyük ölçüde arttırır. Deney sonrası folyonun kararması da bir gözlem — folyo kükürdü kabul ediyor, bu redoks\'un ters yönüdür.',
      en: 'Pedagogical tip: Have students write their hypotheses BEFORE the experiment — often skipped, but the "my expectation vs. observation vs. why differed" chain dramatically increases retention of oxidation concepts. The foil darkening after the experiment is also a key observation — it\'s accepting the sulfur, showing redox in reverse.',
      ar: 'نصيحة: اطلب من الطلاب كتابة فرضياتهم قبل التجربة. سواد الألمنيوم بعدها ملاحظة رئيسية — الكبريت انتقل إليه.',
      cite: ['bloom-taxonomy-revised'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. LYDIA COINAGE HISTORY
  // ═══════════════════════════════════════════════════════════════
  'lydia-coinage-history': {
    intro: {
      tr: 'Bu ders "paranın olmaması" hipotezinden başlayıp Anadolu\'nun M.Ö. 600\'deki tarihsel hamlesini ve bunun bugünkü küresel finans sistemine nasıl yol açtığını gösterir. Tarihten finans okuryazarlığına köprü — öğrenciler tarihsel olayı soyut ekonomik kavramla eşler.',
      en: 'The lesson starts from the hypothesis "what if there were no money?" and shows how Anatolia\'s 600 BCE move led to today\'s global finance. A bridge from history to financial literacy — students link a historical event to abstract economic concepts.',
      ar: 'الدرس يبدأ بفرضية "لا نقود" ويُظهر خطوة الأناضول 600 ق.م كأساس للمال المعاصر.',
    },
    learningObjectives: [
      {
        tr: 'Takas ekonomisinin üç ana problemini (değer, bölünebilirlik, taşıma) tanımlayabilir (Bilgi)',
        en: 'Identify the three main problems of a barter economy (value equivalence, divisibility, portability)',
        ar: 'يحدد مشاكل المقايضة الثلاث',
      },
      {
        tr: 'Lidya Krallığı\'nın coğrafi konumunu haritada gösterebilir ve M.Ö. 600 bağlamını açıklayabilir (Bilgi + Kavrama)',
        en: 'Locate the Kingdom of Lydia on a map and describe its 600 BCE context',
        ar: 'يحدد مملكة ليديا جغرافياً',
      },
      {
        tr: 'Modern bir paranın 3 temel özelliğini (standart ağırlık, otorite mührü, kabul edilebilirlik) listeleyebilir (Analiz)',
        en: 'List the 3 core properties of modern currency (standard weight, authority seal, acceptance)',
        ar: 'يُحدد خصائص العملة الحديثة',
      },
      {
        tr: 'Kendi hayali parasını tasarlayarak güven ve standart kavramlarını uygulayabilir (Yaratma)',
        en: 'Design their own fictional currency, applying concepts of trust and standardization (Creation)',
        ar: 'يصمم عملة متخيلة مطبقاً المفاهيم',
      },
    ],
    curriculumLinks: [
      {
        tr: 'MEB 6. Sınıf Sosyal Bilgiler: "İpek Yolunda Türkler / Ticaret ve Medeniyet" ünitesi',
        en: 'Turkish MEB Grade 6 Social Studies: "Turks on the Silk Road / Trade and Civilization"',
        ar: 'منهج الصف السادس — التجارة في طريق الحرير',
      },
      {
        tr: 'MEB 9. Sınıf Tarih: "İlk ve Orta Çağlarda Avrasya" ünitesi — Anadolu medeniyetleri',
        en: 'Turkish MEB Grade 9 History: "Eurasia in the Ancient and Medieval Ages" — Anatolian civilizations',
        ar: 'منهج الصف التاسع — حضارات الأناضول',
      },
      {
        tr: 'IB MYP Individuals & Societies: Global interactions — money and trade',
        en: 'IB MYP Individuals & Societies: Global interactions — money and trade',
        ar: 'برنامج البكالوريا الدولية — التفاعلات العالمية',
      },
    ],
    assessmentRubric: [
      {
        criterion: {
          tr: 'Lidya ve para icadı bağlantısı',
          en: 'Lydia and money invention connection',
          ar: 'ربط ليديا واختراع النقود',
        },
        levels: [
          { score: 4, descriptor: { tr: '3 sebep net, Kroisos bağlantısı, standart ağırlık açıklanıyor', en: '3 reasons clear, Croesus connection, standard weight explained', ar: 'ثلاثة أسباب واضحة' } },
          { score: 3, descriptor: { tr: '2 sebep doğru, kralın rolü yüzeysel', en: '2 reasons right, king\'s role shallow', ar: 'سببان' } },
          { score: 2, descriptor: { tr: 'Yalnızca kronoloji, neden-sonuç zayıf', en: 'Only chronology, weak causation', ar: 'تسلسل زمني فقط' } },
          { score: 1, descriptor: { tr: 'Lidya kavramı yerine oturmamış', en: 'Lydia concept not understood', ar: 'غير مفهوم' } },
        ],
      },
      {
        criterion: {
          tr: 'Takas-ekonomi sorunları ve çözümleri',
          en: 'Barter problems and solutions',
          ar: 'مشاكل المقايضة والحلول',
        },
        levels: [
          { score: 4, descriptor: { tr: '3 sorun + nasıl para çözdüğü örnekli', en: '3 problems + how money solved them with examples', ar: 'ثلاث مشاكل وحلولها' } },
          { score: 3, descriptor: { tr: '2-3 sorun ama çözüm soyut', en: '2-3 problems but abstract solutions', ar: 'حلول مجردة' } },
          { score: 2, descriptor: { tr: 'Tek örnek, kavramsal eksik', en: 'Single example, conceptually thin', ar: 'مثال واحد' } },
          { score: 1, descriptor: { tr: 'Takas kavramı anlaşılmamış', en: 'Barter concept missing', ar: 'مفقود' } },
        ],
      },
      {
        criterion: {
          tr: 'Kendi para birimi tasarımı yaratıcılığı',
          en: 'Creativity of own currency design',
          ar: 'إبداع تصميم العملة',
        },
        levels: [
          { score: 4, descriptor: { tr: 'İsim, sembol, ağırlık, güvenlik önlemi — hepsi gerekçeli', en: 'Name, symbol, weight, security measure — all justified', ar: 'كل التفاصيل مبررة' } },
          { score: 3, descriptor: { tr: 'Temel öğeler var, gerekçe kısmi', en: 'Basic elements, partial justification', ar: 'عناصر أساسية' } },
          { score: 2, descriptor: { tr: 'Sadece görsel tasarım', en: 'Only visual design', ar: 'تصميم بصري فقط' } },
          { score: 1, descriptor: { tr: 'Eksik veya konu dışı', en: 'Missing or off-topic', ar: 'غير مناسب' } },
        ],
      },
    ],
    sources: ['british-museum-lydia', 'british-museum-croesus', 'meb-ortaokul-fen-mufredat'],
    relatedLabs: ['lydia', 'karat'],
    relatedStories: ['altin-nugget-yolculugu'],
    relatedWorkshops: [],
    relatedQuizzes: ['altin'],
    vocabulary: ['lidya', 'elektrum', 'ayar', 'solidus-coin'],
    curatorNote: {
      tr: 'Pedagojik ipucu: 4. adımın (kendi parasını tasarla) "güven" boyutunu atlamayın — sadece güzel görseller yapmak kolay, ama "bu parayı neden herkes kabul edecek?" sorusu Lidya\'nın gerçek atılımını yakalar. Ayrıca haritada Uşak/Eşme\'yi gösterirken bugün oradaki altın madenlerinin hâlâ aktif olduğunu söyleyin — tarih bitmemiş bir hikâye.',
      en: 'Pedagogical tip: Don\'t skip the "trust" dimension of step 4 (design your currency) — pretty designs are easy, but "why would anyone accept this money?" is the question that captures Lydia\'s real breakthrough. When showing Uşak/Eşme on the map, mention that the gold mines there are still active today — history is an ongoing story.',
      ar: 'نصيحة: لا تُغفل بُعد "الثقة" في الخطوة 4 — تصميم جميل سهل، لكن السؤال الحقيقي: لماذا سيقبلها الناس؟',
      cite: ['british-museum-croesus'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. UNESCO INTANGIBLE HERITAGE
  // ═══════════════════════════════════════════════════════════════
  'unesco-intangible-heritage': {
    intro: {
      tr: 'Bu lise dersi 90 dakikalık bir vaka çalışmasıdır: Trabzon Hasırı 1990\'larda neredeyse yok oluyordu; 2004 coğrafi işaret tescili, çıraklık programları ve marka çalışmaları ile nasıl kurtarıldı? Öğrenciler bir geleneğin ölümcül tehlikesini ve kurtarma mekanizmasını birlikte inceler.',
      en: 'This 90-minute high-school case study: Trabzon Hasır nearly died in the 1990s; how was it saved through the 2004 geographical indication, apprenticeship programs, and branding? Students examine a tradition\'s mortal risk and its rescue mechanism together.',
      ar: 'دراسة حالة 90 دقيقة: حصير طرابزون كاد ينقرض في التسعينيات؛ كيف أُنقذ عبر العلامة الجغرافية وبرامج التدريب؟',
    },
    learningObjectives: [
      {
        tr: 'Somut ve somut olmayan miras kavramlarını ayırt edebilir ve her biri için 3+ örnek verebilir (Bilgi + Kavrama)',
        en: 'Distinguish material and intangible heritage; give 3+ examples of each',
        ar: 'يميز بين التراث المادي وغير المادي',
      },
      {
        tr: 'Trabzon Hasırı vakasında 3 tehdit (modernleşme, göç, makine rekabeti) ve 3 müdahale (GI, çıraklık, marka) ilişkilendirebilir (Analiz)',
        en: 'In the Trabzon Hasır case, link 3 threats (modernization, migration, machine competition) to 3 interventions (GI, apprenticeship, branding)',
        ar: 'يربط التهديدات بالتدخلات في حالة حصير طرابزون',
      },
      {
        tr: 'Başka bir Türk somut olmayan mirasını araştırarak aynı analitik çerçeveyi uygulayabilir (Uygulama + Sentez)',
        en: 'Apply the same analytical framework to another Turkish intangible heritage through research',
        ar: 'يطبق الإطار التحليلي على تراث آخر',
      },
      {
        tr: 'Bir geleneği korurken "müzeleştirmenin" riskini değerlendirebilir (Değerlendirme)',
        en: 'Evaluate the risk of "museumification" when preserving a tradition',
        ar: 'يقيّم مخاطر "التحويل لمتحف"',
      },
      {
        tr: 'Kendi bölgesinden bir mirası koruma planı tasarlayabilir (Yaratma)',
        en: 'Design a preservation plan for a heritage from their own region (Creation)',
        ar: 'يصمم خطة حماية تراث محلي',
      },
    ],
    curriculumLinks: [
      {
        tr: 'MEB 10. Sınıf Sosyoloji: "Toplumsal Kurumlar — Kültür" ünitesi',
        en: 'Turkish MEB Grade 10 Sociology: "Social Institutions — Culture" unit',
        ar: 'منهج الصف العاشر — الثقافة والمؤسسات',
      },
      {
        tr: 'MEB 11. Sınıf Coğrafya: "Türkiye\'nin Turizm Potansiyeli" ünitesi — kültürel miras turizmi',
        en: 'Turkish MEB Grade 11 Geography: "Turkey\'s Tourism Potential" unit — cultural heritage tourism',
        ar: 'منهج الصف الحادي عشر — السياحة التراثية',
      },
      {
        tr: 'UNESCO Intangible Cultural Heritage Convention (2003) Article 2 — tanım ve kapsam',
        en: 'UNESCO Intangible Cultural Heritage Convention (2003) Article 2 — definition and scope',
        ar: 'اتفاقية اليونسكو للتراث غير المادي 2003',
      },
    ],
    assessmentRubric: [
      {
        criterion: {
          tr: 'Kavram ayrımı (somut / somut olmayan)',
          en: 'Concept distinction (material / intangible)',
          ar: 'التمييز المفاهيمي',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Her ikisinin 3+ örneği, sınır durumları (örn. müzik) tartışılıyor', en: '3+ examples of each; edge cases (e.g. music) discussed', ar: 'أمثلة كثيرة وحدود' } },
          { score: 3, descriptor: { tr: 'İyi örnekler, sınır durumları yüzeysel', en: 'Good examples, edge cases shallow', ar: 'جيد مع سطحية' } },
          { score: 2, descriptor: { tr: 'Sadece tanım, örnek az', en: 'Only definition, few examples', ar: 'تعريف فقط' } },
          { score: 1, descriptor: { tr: 'Karıştırılıyor', en: 'Concepts confused', ar: 'خلط' } },
        ],
      },
      {
        criterion: {
          tr: 'Vaka analizi — tehdit/müdahale eşleştirmesi',
          en: 'Case analysis — threat/intervention mapping',
          ar: 'تحليل الحالة',
        },
        levels: [
          { score: 4, descriptor: { tr: '3 tehdit + 3 müdahale + hangisi hangisine çözüm gerekçelendiriliyor', en: '3 threats + 3 interventions + which addressed which, justified', ar: 'تحليل مبرر' } },
          { score: 3, descriptor: { tr: 'Liste tamam ama ilişkilendirme kısmi', en: 'Lists complete but partial linking', ar: 'قوائم كاملة' } },
          { score: 2, descriptor: { tr: 'Liste kısmi veya tek yön', en: 'Partial lists or one-sided', ar: 'ناقص' } },
          { score: 1, descriptor: { tr: 'Neden-sonuç eksik', en: 'Causation missing', ar: 'غير مرتبط' } },
        ],
      },
      {
        criterion: {
          tr: 'Araştırma sunumu kalitesi',
          en: 'Research presentation quality',
          ar: 'جودة عرض البحث',
        },
        levels: [
          { score: 4, descriptor: { tr: 'Kaynak gösterimi, analitik çerçeve uygulanmış, sınıfa ilgi çekici', en: 'Sources cited, framework applied, engaging to class', ar: 'مصادر وإطار تحليلي' } },
          { score: 3, descriptor: { tr: 'İçerik iyi, sunum orta', en: 'Good content, average delivery', ar: 'محتوى جيد' } },
          { score: 2, descriptor: { tr: 'Bilgi yüzeysel veya sunum zayıf', en: 'Shallow info or weak delivery', ar: 'سطحي' } },
          { score: 1, descriptor: { tr: 'Hazırlıksız', en: 'Unprepared', ar: 'غير محضّر' } },
        ],
      },
      {
        criterion: {
          tr: 'Kendi bölgesi için koruma planı',
          en: 'Protection plan for own region',
          ar: 'خطة حماية محلية',
        },
        levels: [
          { score: 4, descriptor: { tr: '3 adımlı uygulanabilir plan, paydaşlar tanımlı', en: '3-step feasible plan, stakeholders identified', ar: 'خطة قابلة للتطبيق' } },
          { score: 3, descriptor: { tr: 'Adımlar var, uygulanabilirlik orta', en: 'Steps present, feasibility average', ar: 'خطوات متوسطة' } },
          { score: 2, descriptor: { tr: 'Hayalci veya genel', en: 'Idealistic or generic', ar: 'عام' } },
          { score: 1, descriptor: { tr: 'Plan yok', en: 'No plan', ar: 'لا توجد' } },
        ],
      },
    ],
    sources: ['turkpatent-gi-trabzon-hasir', 'unesco-ich-turkiye', 'daily-sabah-trabzon', 'gemsociety-trabzon'],
    relatedLabs: ['tarnish'],
    relatedStories: ['trabzon-hasiri-unesco', 'mardinli-telkari-ustasi-ayse'],
    relatedWorkshops: ['hasir', 'telkari-usta', 'savat'],
    relatedQuizzes: ['zanaat'],
    vocabulary: ['hasir', 'telkari', 'savat', 'cloisonne'],
    curatorNote: {
      tr: 'Dikkat: Bu ders planı "Trabzon Hasırı UNESCO\'ya girdi" yönünde okunmamalıdır — Trabzon Hasırı UNESCO Somut Olmayan Miras listesinde DEĞİLDİR, yalnızca Türk Patent Coğrafi İşareti (2004) ile korunmaktadır. UNESCO Türkiye listesi ayrı bir sistemdir (Karagöz, Âşıklık, Mevlevîlik vb. orada). Bu nüans sınıfta öğretmen tarafından açıkça belirtilmelidir; araştırma etkinliğinde öğrenciler "her korunan gelenek UNESCO\'da değildir" gerçeğiyle karşılaşacaktır.',
      en: 'Important: This lesson should not be read as "Trabzon Hasır entered UNESCO" — Trabzon Hasır is NOT on the UNESCO Intangible Heritage list; it is protected only by Turkish Geographical Indication (2004). UNESCO\'s Türkiye list is a separate system (Karagöz, Âşık tradition, Mevlevî, etc. are there). This distinction should be made explicit in class; the research activity will bring students face-to-face with the fact that "not every protected tradition is on UNESCO".',
      ar: 'هام: هذا الدرس لا يعني أن حصير طرابزون مسجل في اليونسكو — هو محمي فقط بالعلامة الجغرافية التركية (2004). قائمة اليونسكو لتركيا نظام منفصل (كراغوز، المولوية...). اشرح هذا الفرق للطلاب.',
      cite: ['turkpatent-gi-trabzon-hasir', 'unesco-ich-turkiye'],
    },
  },
};

// ─── Merge helper ─────────────────────────────────────────────
/**
 * Bir ders planı kaydını (lessonPlans[] elemanı) enrichment ile
 * birleştir. Enrichment değerleri ÜSTE yazar; mevcut alanlar
 * (id, hall, accent, icon, level, duration, subject, title, goal,
 * materials, steps, worksheet, discussion, relatedExhibits) korunur.
 *
 * NOT: Enrichment'ta `goal` alanı yoktur, dolayısıyla mevcut goal
 * korunur. Diğer base alanlar da enrichment ile çakışmaz.
 */
export function enrichLessonPlan(plan) {
  if (!plan || !plan.id) return plan;
  const extra = lessonPlanEnrichment[plan.id];
  if (!extra) return plan;
  return { ...plan, ...extra };
}

export const lessonPlanEnrichmentCount = Object.keys(lessonPlanEnrichment).length;
