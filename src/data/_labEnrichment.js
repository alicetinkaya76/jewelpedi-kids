/**
 * _labEnrichment.js — Faz 6-E
 *
 * 7 deney için genişletilmiş alanların merkezi kaydı. Deney bileşenleri
 * (KaratCalculator, MohsScratch, vb.) dokunulmaz — interaktif davranış
 * dışarıdan enjeksiyon istemez. Bu modül yalnızca `LabPage`'in aktif
 * deneyi etrafında render ettiği "müze duvarı" içeriğini sağlar:
 * başlık, amaç, materyaller, prosedür, kaynaklar, ilgili içerik,
 * küratör notu, tarih şeridi, sözlük.
 *
 * Tüm alanlar OPSİYONEL. Veri yoksa UI o bölümü render etmez.
 *
 * Şema:
 *   title        — {tr,en,ar}
 *   goal         — {tr,en,ar}           (2-3 cümle, ne öğretiyor)
 *   materials    — [{emoji, name:{tr,en,ar}, note?:{tr,en,ar}}]
 *   procedure    — [{step:{tr,en,ar}, cite?:[source-id]}]
 *   safetyNote   — {tr,en,ar}           ("bu simülasyon, gerçek değil")
 *   sources      — ['source-id']
 *   relatedExhibits — ['exhibit-id']
 *   relatedStories  — ['story-id']
 *   relatedQuizzes  — ['quiz-category-id']
 *   vocabulary   — ['glossary-term-id']
 *   curatorNote  — {tr,en,ar, cite?:[source-id]}
 *   timeline     — [{year, event:{tr,en,ar}, cite?:[source-id]}]
 *
 * Kaynakça prensibi (Karar 1): yalnızca OLGUSAL alanlar kaynaklanır
 * (procedure, curatorNote, timeline, materials.note). Deney bileşenlerinin
 * içindeki JSX/metinler dokunulmaz; onlar 'küratör yorumu' kategorisidir.
 */

export const labEnrichment = {
  // ═══════════════════════════════════════════════════════════════
  // 1. KARAT — Ayar Hesaplayıcı
  // ═══════════════════════════════════════════════════════════════
  karat: {
    title: {
      tr: 'Ayar Hesaplayıcı',
      en: 'Karat Calculator',
      ar: 'حاسبة العيار',
    },
    goal: {
      tr: 'Bir altın parçanın kaç ayar olduğunu ne değiştirir? 8, 14, 18, 22 ve 24 ayar arasında saf altın oranı, alaşım miktarı ve renk nasıl değişir — bu deneyde görsel olarak dene.',
      en: 'What makes a gold piece a specific karat? Slide through 8, 14, 18, 22 and 24 karat and see how pure-gold fraction, alloy weight and colour change — all in real time.',
      ar: 'ما الذي يحدد عيار قطعة ذهبية؟ جرّب بين 8، 14، 18، 22 و24 قيراطاً وشاهد كيف تتغير نسبة الذهب والسبيكة واللون.',
    },
    materials: [
      { emoji: '📏', name: { tr: 'Ayar seçici', en: 'Karat slider', ar: 'منزلق العيار' } },
      { emoji: '⚖️', name: { tr: 'Tartı (simülasyon)', en: 'Virtual scale', ar: 'ميزان افتراضي' } },
      { emoji: '🎨', name: { tr: 'Renk paleti', en: 'Colour palette', ar: 'لوحة الألوان' } },
    ],
    procedure: [
      {
        step: {
          tr: 'Ayar dilim çubuğunu 8 ile 24 arasında hareket ettir; saf altın yüzdesi anında hesaplanır (ayar/24).',
          en: 'Move the karat slider between 8 and 24; pure-gold fraction is computed instantly as karat/24.',
          ar: 'حرّك منزلق العيار بين 8 و24؛ تُحسب نسبة الذهب الخالص فوراً (العيار/24).',
        },
      },
      {
        step: {
          tr: 'Toplam ağırlığı 1-50 gram arasında ayarla; saf altın ağırlığı ve alaşım ağırlığı otomatik bölünür.',
          en: 'Adjust total weight between 1 and 50 grams; pure-gold mass and alloy mass split automatically.',
          ar: 'اضبط الوزن الإجمالي بين 1 و50 غراماً؛ يتم تقسيم كتلة الذهب والسبيكة تلقائياً.',
        },
      },
      {
        step: {
          tr: 'Daire renk önizlemesine bak: düşük ayar bakır alaşımlıdır (hafif kırmızı), 24 ayar saf sarı olur.',
          en: 'Look at the color preview: lower karats are copper-rich (reddish), 24 karat is pure yellow.',
          ar: 'انظر إلى معاينة اللون: العيارات الأقل نحاسية (محمرة)، 24 قيراطاً أصفر خالص.',
        },
      },
    ],
    safetyNote: {
      tr: 'Bu simülasyon alaşım renklerini yaklaşık olarak gösterir. Gerçek altın ürünlerde renk ayrıca gümüş, paladyum veya çinko katkılarına göre değişir.',
      en: 'This simulation approximates alloy colours. Real gold pieces can also contain silver, palladium or zinc, altering the colour.',
      ar: 'هذه المحاكاة تُقدّر الألوان تقريباً. الذهب الحقيقي قد يحوي أيضاً فضة أو بلاديوم أو زنكاً.',
    },
    sources: ['turkish-mint', 'lbma-gold-standard'],
    relatedExhibits: ['ceyrek-altin', 'tam-altin', 'yarim-altin', 'ayar-sistemi'],
    relatedStories: ['altin-nugget-yolculugu'],
    relatedQuizzes: ['altin'],
    vocabulary: ['ayar', 'alasim', 'milyem'],
    curatorNote: {
      tr: 'Türkiye\'de standart kuyumculuk ayarı 14 ayar (585‰), 18 ayar (750‰) ve 22 ayar (916‰)\'dır. 8 ayar altın Avrupa\'da yasaldır ama Türkiye\'de sertifikalı satışa genelde çıkmaz.',
      en: 'In Türkiye, standard jewellery karats are 14 (585‰), 18 (750‰) and 22 (916‰). 8-karat gold is legal in parts of Europe but is rarely sold certified in Türkiye.',
      ar: 'في تركيا، العيارات القياسية هي 14 (585‰) و18 (750‰) و22 (916‰). الذهب 8 قيراط قانوني في أوروبا لكنه نادر في تركيا.',
      cite: ['lbma-gold-standard', 'turkish-mint'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. MOHS — Çizim Testi
  // ═══════════════════════════════════════════════════════════════
  mohs: {
    title: {
      tr: 'Mohs Çizim Testi',
      en: 'Mohs Scratch Test',
      ar: 'اختبار خدش موس',
    },
    goal: {
      tr: 'Hangi mineral hangisini çizer? Friedrich Mohs\'un 1812\'de geliştirdiği 1\'den 10\'a sertlik skalasını burada yaşa: iki mineral seç, test et, izini gör.',
      en: 'Which mineral scratches which? Experience the 1-to-10 hardness scale that Friedrich Mohs devised in 1812: pick two minerals, test them, watch the mark appear.',
      ar: 'أيّ معدن يخدش الآخر؟ جرّب مقياس الصلابة من 1 إلى 10 الذي طوّره موس عام 1812: اختر معدنين واختبرهما.',
    },
    materials: [
      { emoji: '🪨', name: { tr: '17 mineral/alet', en: '17 minerals/tools', ar: '17 معدن/أداة' } },
      { emoji: '🔬', name: { tr: 'Test tezgahı', en: 'Test bench', ar: 'منضدة اختبار' } },
      { emoji: '📊', name: { tr: 'Mohs merdiveni', en: 'Mohs ladder', ar: 'سلم موس' } },
    ],
    procedure: [
      {
        step: {
          tr: 'A yuvasına bir mineral koy, ardından B yuvasına bir başkasını — ya da bir test aleti (tırnak, çivi, cam).',
          en: 'Place a mineral in slot A, then another — or a test tool (fingernail, nail, glass) — in slot B.',
          ar: 'ضع معدناً في الفتحة A، ثم آخر أو أداة اختبار في الفتحة B.',
        },
      },
      {
        step: {
          tr: '"Çiz!" düğmesine bas. Daha yumuşak olan çizilir; Mohs değeri daha yüksek olan kazanır.',
          en: 'Press "Scratch!" — the softer sample gets marked; the higher Mohs value wins.',
          ar: 'اضغط "اخدش!". الأنعم يخدش؛ الأعلى على مقياس موس يفوز.',
        },
        cite: ['mohs-1812', 'britannica-mohs'],
      },
      {
        step: {
          tr: 'Her farklı ikili bir yıldız kazandırır; tüm 10 Mohs kademesini dene → "Mineralog" rozeti.',
          en: 'Each unique pair earns a star; test all 10 Mohs tiers → "Mineralogist" badge.',
          ar: 'كل زوج جديد يكسب نجمة؛ جرّب كل المستويات العشرة للحصول على شارة "عالم معادن".',
        },
      },
    ],
    safetyNote: {
      tr: 'Gerçek Mohs testinde mineraller çizilince kalıcı iz bırakır. Bu simülasyon mineralleri hasar vermeden test etmene izin verir.',
      en: 'A real Mohs test leaves permanent scratches. This simulation lets you test minerals without damaging them.',
      ar: 'اختبار موس الحقيقي يترك أثراً دائماً. هذه المحاكاة تسمح بالاختبار بلا أذى.',
    },
    sources: ['mohs-1812', 'britannica-mohs', 'mindat-database'],
    relatedExhibits: ['mohs-skalasi', 'pirlanta-nasil-olusur', 'yakut', 'safir'],
    relatedStories: ['pirlantanin-3-milyar-yili'],
    relatedQuizzes: ['renkli-taslar', 'pirlanta'],
    vocabulary: ['mohs', 'korund', 'beril'],
    timeline: [
      {
        year: '1812',
        event: {
          tr: 'Friedrich Mohs Graz\'da "Versuch einer Elementar-Methode..." kitabında skalayı yayımlar.',
          en: 'Friedrich Mohs publishes the scale in his book "Versuch einer Elementar-Methode..." in Graz.',
          ar: 'فريدريك موس ينشر المقياس في كتابه عام 1812 في غراتس.',
        },
        cite: ['mohs-1812'],
      },
      {
        year: '1822',
        event: {
          tr: 'Skala 10-mineral diziliminde son halini alır: talk (1) → elmas (10).',
          en: 'The scale settles into its 10-mineral order: talc (1) → diamond (10).',
          ar: 'يستقر المقياس في ترتيبه النهائي: تلك (1) إلى ماس (10).',
        },
        cite: ['britannica-mohs'],
      },
    ],
    curatorNote: {
      tr: 'Mohs skalası sıralamadır, aralık değildir: elmas (10) kuvarstan (7) yaklaşık 6 kat daha sert olsa da skala bu farkı göstermez. Sayısal sertlik için Vickers veya Knoop testleri kullanılır.',
      en: 'Mohs is an ordinal, not interval scale: diamond (10) is roughly 6× harder than quartz (7), but the scale doesn\'t show this gap. For numerical hardness, use Vickers or Knoop tests.',
      ar: 'مقياس موس ترتيبي لا فاصلي: الماس (10) أصلب من الكوارتز (7) بنحو 6 أضعاف لكن المقياس لا يُظهر الفجوة. للقيم الرقمية يُستخدم فيكرز أو كنوب.',
      cite: ['britannica-mohs', 'mindat-database'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. TARNISH — Gümüş Oksitlenme
  // ═══════════════════════════════════════════════════════════════
  tarnish: {
    title: {
      tr: 'Gümüş Oksitlenme',
      en: 'Silver Tarnish',
      ar: 'تأكسد الفضة',
    },
    goal: {
      tr: 'Gümüş takılar neden kararır? Havadaki kükürt gazları gümüşle ne yapar? Bu 5 adımda bir takının birkaç günde nasıl karardığını, sonra nasıl temizlendiğini gör.',
      en: 'Why does silver jewellery darken? What do airborne sulfur gases do to silver? Follow 5 steps showing how a piece tarnishes over days — and how it cleans up.',
      ar: 'لماذا تسوّد المجوهرات الفضية؟ ماذا يفعل الكبريت بها؟ في 5 خطوات: كيف تتأكسد ثم كيف تُنظف.',
    },
    materials: [
      { emoji: '🪞', name: { tr: 'Gümüş takı (sterling 925‰)', en: 'Silver piece (sterling 925‰)', ar: 'قطعة فضية (925‰)' } },
      { emoji: '💨', name: { tr: 'Hava (H₂S ve SO₂ içerir)', en: 'Air (contains H₂S and SO₂)', ar: 'هواء (يحوي H₂S وSO₂)' } },
      { emoji: '🧂', name: { tr: 'Alüminyum folyo + tuzlu su (temizlik için)', en: 'Aluminum foil + salt water (for cleaning)', ar: 'ورق ألمنيوم + ماء مالح (للتنظيف)' } },
    ],
    procedure: [
      {
        step: {
          tr: 'Gümüş yüzey başta atomik düzeyde pürüzsüzdür — ışığı nerdeyse ideal yansıtır.',
          en: 'Fresh silver is atomically smooth — it reflects light almost ideally.',
          ar: 'الفضة الجديدة ملساء ذرياً وتعكس الضوء بشكل مثالي.',
        },
      },
      {
        step: {
          tr: 'Havadaki H₂S ile reaksiyon: 2 Ag(k) + H₂S(g) → Ag₂S(k) + H₂(g). Gümüş sülfür (Ag₂S) siyah bir ince filmdir.',
          en: 'Reaction with atmospheric H₂S: 2 Ag(s) + H₂S(g) → Ag₂S(s) + H₂(g). Silver sulfide (Ag₂S) is a thin black film.',
          ar: 'التفاعل مع كبريتيد الهيدروجين: 2Ag + H₂S → Ag₂S + H₂. كبريتيد الفضة طبقة رقيقة سوداء.',
        },
        cite: ['crc-handbook'],
      },
      {
        step: {
          tr: 'Kararma yaklaşık 50 nanometre kalınlığa ulaştığında tam siyah görünür, ama altındaki gümüş sağlamdır.',
          en: 'At about 50 nm thick, the tarnish appears fully black — but the silver beneath is unharmed.',
          ar: 'عند سمك 50 نانومتر تقريباً يبدو السطح أسود تماماً، لكن الفضة سليمة.',
        },
      },
      {
        step: {
          tr: 'Temizlemek için ters redoks reaksiyonu: alüminyum folyoya sar, kaynar tuzlu suya koy. Al gümüşten daha reaktif olduğu için kükürdü "çalar" ve Ag₂S → Ag\'ye döner.',
          en: 'To clean, reverse the redox: wrap in aluminum foil, dip in hot salt water. Al is more reactive, so it "steals" the sulfur and Ag₂S reduces back to Ag.',
          ar: 'للتنظيف، تفاعل أكسدة عكسي: لف القطعة بورق ألمنيوم في ماء مالح ساخن. الألمنيوم أكثر تفاعلاً فيسرق الكبريت.',
        },
      },
    ],
    safetyNote: {
      tr: 'Evde deneyebilirsin — kaynar su dikkat ister, ama reaksiyon güvenlidir. Gümüş antikalarda önce bir kuyumcuya danış: bazı patina\'lar değerli olabilir.',
      en: 'You can try this at home — hot water needs care, but the reaction is safe. For antique silver, ask a jeweller first: some patinas are valuable.',
      ar: 'يمكن تجربتها منزلياً؛ انتبه للماء الساخن. في التحف العتيقة استشر صائغاً أولاً.',
    },
    sources: ['crc-handbook', 'webelements'],
    relatedExhibits: ['925-ayar', 'trabzon-hasiri', 'telkari', 'savat'],
    relatedStories: ['trabzon-hasiri-unesco', 'mardinli-telkari-ustasi-ayse'],
    relatedQuizzes: ['gumus', 'zanaat'],
    vocabulary: ['alasim', 'hasir', 'sterling', 'britannia-silver', 'kararma'],
    curatorNote: {
      tr: 'Ag₂S görünür olmasa bile gümüşün yüzeyinde her zaman nano-ölçekte bir oksit/sülfür tabakası olur. Bu yüzden tamamen "temiz" gümüş yüzey aslında kısa ömürlüdür — atmosfer devreye girer girmez kararma başlar.',
      en: 'Even when invisible, a nano-scale oxide/sulfide film always exists on silver surfaces. "Perfectly clean" silver is short-lived — tarnish begins as soon as it meets air.',
      ar: 'حتى عندما لا تُرى، توجد طبقة نانومترية دائماً على الفضة. الفضة "النقية تماماً" قصيرة العمر.',
      cite: ['webelements'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. LIGHT — Pırlanta Kesim Simülatörü
  // ═══════════════════════════════════════════════════════════════
  light: {
    title: {
      tr: 'Pırlanta Kesim Simülatörü',
      en: 'Diamond Cut Simulator',
      ar: 'محاكي قطع الماس',
    },
    goal: {
      tr: 'Pırlanta neden parlar? 1919\'da Marcel Tolkowsky "ideal" açıları hesapladı: 40.75° pavilion ve 34.5° crown. Bu deneyde açıları değiştir, ışığın taştan nasıl çıktığını gör.',
      en: 'Why does a diamond sparkle? In 1919 Marcel Tolkowsky computed the "ideal" angles: 40.75° pavilion, 34.5° crown. Change the angles and see how light escapes.',
      ar: 'لماذا يتلألأ الماس؟ عام 1919 حسب توْلكوفسكي الزوايا المثالية: 40.75° للبافيليون، 34.5° للتاج.',
    },
    materials: [
      { emoji: '💎', name: { tr: 'Pırlanta modeli (2D yan kesit)', en: 'Diamond model (2D cross-section)', ar: 'نموذج ماسة (مقطع 2D)' } },
      { emoji: '☀️', name: { tr: 'Işık kaynağı', en: 'Light source', ar: 'مصدر ضوء' } },
      { emoji: '📐', name: { tr: 'Açı kontrolleri', en: 'Angle controls', ar: 'أدوات الزاوية' } },
    ],
    procedure: [
      {
        step: {
          tr: 'Başlangıç: Tolkowsky ideal açıları — yukarıdan giren ışık iki kez iç yansır ve tacın üstünden çıkar (maksimum parlaklık).',
          en: 'Start: Tolkowsky\'s ideal angles — light enters, reflects internally twice, and exits the crown (maximum brilliance).',
          ar: 'البداية: زوايا توْلكوفسكي المثالية — الضوء يدخل، ينعكس داخلياً مرتين، ثم يخرج من التاج.',
        },
        cite: ['tolkowsky-1919'],
      },
      {
        step: {
          tr: 'Pavilion açısını değiştir: çok düşük → ışık dibinden sızar ("dead center"); çok yüksek → dar şaft, taş koyu görünür.',
          en: 'Change pavilion angle: too shallow → light leaks from the bottom ("dead center"); too steep → narrow shaft, stone looks dark.',
          ar: 'غيّر زاوية البافيليون: قليلة → يتسرب الضوء من الأسفل؛ كبيرة → يظهر الماس قاتماً.',
        },
      },
      {
        step: {
          tr: 'Crown açısını değiştir: dar tac → "fire" (spektrum renkleri) az; geniş tac → fire fazla ama brilliance (parlaklık) az.',
          en: 'Change crown angle: narrow crown → less "fire" (spectral colors); wide crown → more fire but less brilliance.',
          ar: 'غيّر زاوية التاج: ضيقة → "نار" أقل (ألوان طيفية)؛ واسعة → نار أكثر لكن لمعاناً أقل.',
        },
        cite: ['gia-4cs'],
      },
    ],
    safetyNote: {
      tr: 'Bu 2D simülasyon ışığı yaklaşık gösterir. Gerçek brilliant kesim 57 veya 58 yüzeyli 3B bir yapıdır; GIA gibi laboratuvarlar kesim kalitesini "Excellent → Poor" arasında 5 kademede derecelendirir.',
      en: 'This 2D simulation approximates light paths. A real brilliant cut has 57 or 58 facets in 3D; labs like GIA grade cut quality on a 5-tier "Excellent → Poor" scale.',
      ar: 'هذه محاكاة ثنائية الأبعاد تقريبية. القطع البريليانت الحقيقي ثلاثي الأبعاد بـ57-58 وجهاً.',
    },
    sources: ['tolkowsky-1919', 'gia-diamond-grading', 'gia-4cs'],
    relatedExhibits: ['4c-sistemi', 'kesim-sekilleri', 'pirlanta-nasil-olusur', 'cullinan'],
    relatedStories: ['pirlantanin-3-milyar-yili'],
    relatedQuizzes: ['pirlanta'],
    vocabulary: ['bril', 'tolkowsky', '4c', 'crown-angle', 'pavilion', 'table-facet', 'culet'],
    timeline: [
      {
        year: '1919',
        event: {
          tr: 'Marcel Tolkowsky Londra Üniversitesi\'ndeki doktora tezinde ideal brilliant kesim açılarını hesaplar.',
          en: 'Marcel Tolkowsky computes the ideal brilliant cut angles in his University of London PhD thesis.',
          ar: 'توْلكوفسكي يحسب الزوايا المثالية في أطروحته بجامعة لندن عام 1919.',
        },
        cite: ['tolkowsky-1919'],
      },
      {
        year: '1953',
        event: {
          tr: 'GIA 4C sistemi (Carat, Color, Clarity, Cut) resmileşir — Cut değerlendirmesi Tolkowsky ölçütlerine bağlıdır.',
          en: 'GIA formalises the 4Cs (Carat, Color, Clarity, Cut) — Cut grading is based on Tolkowsky\'s criteria.',
          ar: 'يُرسَّم نظام 4C لدى GIA — تقييم القطع مبني على معايير توْلكوفسكي.',
        },
        cite: ['gia-4cs'],
      },
    ],
    curatorNote: {
      tr: 'Tolkowsky değerleri "matematiksel ideal", ama güzel bir elmas mekanik formül değildir: "fire" (renk oyunu), "scintillation" (kıpır kıpır parıltı) ve "brilliance" (parlaklık) hep beraber değerlendirilir. Farklı kesim stilleri (oval, princess, cushion) farklı dengeler sunar.',
      en: 'Tolkowsky values are the "mathematical ideal" — but a beautiful diamond is not a formula: "fire" (color play), "scintillation" (sparkle) and "brilliance" are judged together. Different cuts (oval, princess, cushion) offer different balances.',
      ar: 'قيم توْلكوفسكي هي "المثال الرياضي" فقط؛ الماسة الجميلة توازن بين "النار" و"الوميض" و"اللمعان".',
      cite: ['gia-4cs', 'gia-diamond-grading'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. LYDIA — Lidya Darphanesi
  // ═══════════════════════════════════════════════════════════════
  lydia: {
    title: {
      tr: 'Lidya Darphanesi',
      en: 'Lydian Mint',
      ar: 'سك العملة الليدية',
    },
    goal: {
      tr: 'İnsanlık tarihinin ilk standart altın-gümüş sikkeleri M.Ö. ~600\'de Lidya Krallığı\'nda (bugünkü Manisa/Sardes) basıldı. Bu deneyde kral Kroisos\'un kuyumcusu ol: külçe tart, ay kalıbına dök, mühürle.',
      en: 'The first standardised gold-silver coins in human history were struck around 600 BCE in the Kingdom of Lydia (modern Manisa/Sardis). In this experiment become Croesus\'s coin-master: weigh the ingot, pour into the die, stamp.',
      ar: 'أول عملات ذهبية-فضية معيارية في التاريخ صُكّت قرابة 600 ق.م في مملكة ليديا (سارديس). في هذه التجربة كن صائغ الملك كروسوس: زِن، اسكب، اطبع.',
    },
    materials: [
      { emoji: '🌾', name: { tr: 'Sart Irmağı\'ndan elektrum tozu', en: 'Electrum dust from the Pactolus', ar: 'غبار إلكتروم من باكتولوس' } },
      { emoji: '⚖️', name: { tr: 'Bronz terazi + standart ağırlıklar', en: 'Bronze scale + standard weights', ar: 'ميزان برونزي + أوزان قياسية' } },
      { emoji: '🔥', name: { tr: 'Kömür ocak (~1100 °C)', en: 'Coal furnace (~1100 °C)', ar: 'فرن فحم (~1100°م)' } },
      { emoji: '🏺', name: { tr: 'Balçık kalıp ("ay" deseni)', en: 'Clay die (\'moon\' pattern)', ar: 'قالب طيني' } },
      { emoji: '🐱', name: { tr: 'Kral\'ın mühürü (aslan-boğa)', en: 'King\'s stamp (lion-bull)', ar: 'ختم الملك (أسد-ثور)' } },
    ],
    procedure: [
      {
        step: {
          tr: 'Külçeyi 10.7 gram olarak tart — "stater" standart ağırlığı. Eksik: ayıp; fazla: krala kayıp.',
          en: 'Weigh the ingot at 10.7 grams — the "stater" standard. Less: shame; more: royal loss.',
          ar: 'زِن السبيكة عند 10.7 غراماً — معيار "الستاتر". أقل: عار؛ أكثر: خسارة ملكية.',
        },
        cite: ['british-museum-lydia'],
      },
      {
        step: {
          tr: 'Elektrumu ocak üzerinde erit (altın %55-73, gümüş kalanı). Balçık kalıba dök, soğu.',
          en: 'Melt the electrum on the furnace (55-73% gold, rest silver). Pour into the clay die, cool.',
          ar: 'اصهر الإلكتروم (55-73% ذهب، الباقي فضة). اسكب في القالب.',
        },
      },
      {
        step: {
          tr: 'Aslan-boğa mühürünü üstten çekiçle bas — kral Kroisos\'un imzası. Sikke artık "güvenilir" sayılır.',
          en: 'Hammer the lion-bull stamp on top — King Croesus\'s signature. The coin is now "trustworthy".',
          ar: 'اطبع ختم "أسد-ثور" — توقيع الملك. العملة أصبحت "موثوقة".',
        },
        cite: ['british-museum-croesus'],
      },
    ],
    safetyNote: {
      tr: 'Bu simülasyonda tarihsel akış sadeleştirildi. Gerçek Lidya darphanesinde önce altın ve gümüş ayrı ayrı saflaştırılır (cupellation), sonra istenen alaşım karıştırılırdı — Kroisos\'un katkısı aslında bu ayrıştırma sürecidir.',
      en: 'Historical flow simplified here. Real Lydian minting first purified gold and silver separately (cupellation), then recombined at desired ratio — Croesus\'s real innovation was this refining step.',
      ar: 'التبسيط في المحاكاة. العملية الحقيقية كانت تتضمن الفصل والتنقية أولاً.',
    },
    sources: ['british-museum-lydia', 'british-museum-croesus', 'britannica-general'],
    relatedExhibits: ['altin-tarihcesi', 'ceyrek-altin', 'tam-altin'],
    relatedStories: ['altin-nugget-yolculugu'],
    relatedQuizzes: ['altin'],
    vocabulary: ['ayar', 'alasim', 'lidya', 'elektrum', 'solidus-coin'],
    timeline: [
      {
        year: '-600',
        event: {
          tr: 'Lidya Krallığı dünyanın ilk standart ağırlıklı altın-gümüş sikkelerini basmaya başlar (Sardes).',
          en: 'The Kingdom of Lydia begins striking the world\'s first weight-standardised gold-silver coins (Sardis).',
          ar: 'ليديا تبدأ سك أول عملات موحدة الوزن في التاريخ (سارديس).',
        },
        cite: ['british-museum-lydia'],
      },
      {
        year: '-560',
        event: {
          tr: 'Kral Kroisos tahta çıkar; altın ve gümüşün ayrı ayrı saflaştırılmış "Croeseid" serisi basılır.',
          en: 'King Croesus ascends the throne; the "Croeseid" series of separately refined gold and silver coins is struck.',
          ar: 'اعتلاء الملك كروسوس العرش؛ صُكّت سلسلة "كرويسيد" المصفاة.',
        },
        cite: ['british-museum-croesus'],
      },
      {
        year: '-546',
        event: {
          tr: 'Pers Kralı II. Kyros Lidya\'yı fetheder; darphane Pers sikkecilik sisteminin temeli olur.',
          en: 'Persian king Cyrus II conquers Lydia; the mint becomes the basis of the Persian coinage system.',
          ar: 'كورش الثاني الفارسي يفتح ليديا؛ تصبح دار السك أساساً للنظام الفارسي.',
        },
      },
    ],
    curatorNote: {
      tr: '"Karun kadar zengin" deyimi Kroisos\'tan gelir (Yunancası Kroisos → Türkçe Karun). İlk sikke icadının serveti simgelemesi çok uygun: standart ağırlık + kral mührü güveni yarattı; güven ticareti yarattı; ticaret serveti yarattı.',
      en: 'The phrase "rich as Croesus" comes from King Croesus. It\'s fitting that the invention of coinage symbolises wealth: standard weight + royal seal built trust, trust built trade, trade built fortunes.',
      ar: 'عبارة "غنيّ كقارون" تأتي من كروسوس. الوزن الموحَّد وختم الملك بنيا الثقة، والثقة بنت التجارة.',
      cite: ['british-museum-croesus'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. MELT — Erime Noktaları
  // ═══════════════════════════════════════════════════════════════
  melt: {
    title: {
      tr: 'Erime Noktaları',
      en: 'Melting Points',
      ar: 'نقاط الانصهار',
    },
    goal: {
      tr: 'Hangi metal önce erir? Kalay 232°C\'de, platin 1768°C\'de. Sıcaklığı arttırdıkça sırayla 8 metalin eridiğini izle — ve bir kuyumcunun neden ocak sıcaklığını hassas kontrol etmesi gerektiğini anla.',
      en: 'Which metal melts first? Tin at 232°C, platinum at 1768°C. Crank up the heat and watch 8 metals melt in sequence — and understand why a jeweller must control furnace temperature precisely.',
      ar: 'أي معدن ينصهر أولاً؟ القصدير عند 232°م، البلاتين عند 1768°م. ارفع الحرارة وشاهد 8 معادن تنصهر تباعاً.',
    },
    materials: [
      { emoji: '🔥', name: { tr: 'Ocak (0-2000 °C)', en: 'Furnace (0-2000 °C)', ar: 'فرن (0-2000°م)' } },
      { emoji: '📊', name: { tr: '8 metal: kalay, kurşun, çinko, gümüş, altın, bakır, demir, platin', en: '8 metals: tin, lead, zinc, silver, gold, copper, iron, platinum', ar: '8 معادن: قصدير، رصاص، زنك، فضة، ذهب، نحاس، حديد، بلاتين' } },
      { emoji: '🌡️', name: { tr: 'Referans çizgisi (o anki sıcaklık)', en: 'Reference line (current temperature)', ar: 'خط مرجعي (الحرارة الحالية)' } },
    ],
    procedure: [
      {
        step: {
          tr: 'Isı kaydırıcısını yavaşça yukarı çek. Her metal kendi erime noktasında renklenir ve barı sertleşir.',
          en: 'Slowly drag the heat slider up. Each metal lights up and its bar solidifies at its melting point.',
          ar: 'ارفع الحرارة ببطء. كل معدن يُضيء عند نقطة انصهاره.',
        },
      },
      {
        step: {
          tr: 'Kalay 232°C\'de ilk eriyen — bu yüzden bakır ile kalay alaşımı (bronz) kolay dökülür.',
          en: 'Tin melts first at 232°C — this is why copper-tin alloy (bronze) is easy to cast.',
          ar: 'القصدير ينصهر أولاً عند 232°م — لذلك البرونز سهل السباكة.',
        },
        cite: ['crc-handbook'],
      },
      {
        step: {
          tr: 'Altın 1064°C, bakır 1085°C. Bu 21°C\'lik fark kuyumcunun külçeye bakır eklerken kritik — bakır eritmeden altın eritirsen eşit alaşım olmaz.',
          en: 'Gold 1064°C, copper 1085°C. This 21°C gap is critical when a jeweller alloys gold with copper — you must melt both together.',
          ar: 'الذهب 1064°م والنحاس 1085°م. فرق 21°م حرج في سبك الذهب والنحاس معاً.',
        },
        cite: ['crc-handbook', 'webelements'],
      },
      {
        step: {
          tr: '1768°C\'ye ulaş: platin erir — ama ocakların büyük çoğunluğu platine ulaşamaz. Bu yüzden platin kuyumculuğu 1900 sonrası yaygınlaşmıştır (oksijen-hidrojen ocakları).',
          en: 'Reach 1768°C: platinum melts — but most furnaces can\'t reach this. Platinum jewellery spread only after 1900 with oxy-hydrogen torches.',
          ar: 'عند 1768°م ينصهر البلاتين — معظم الأفران لا تصل لذلك. البلاتين صاغة انتشر بعد 1900 بمشاعل الأكسجين-الهيدروجين.',
        },
        cite: ['rsc-platinum'],
      },
    ],
    safetyNote: {
      tr: 'Bu grafik CRC Handbook verilerine dayanır (1 atm basınç, saf metal). Gerçek kuyumculuk alaşımları 50-150°C daha düşük bir sıcaklıkta erir (alaşımlı metallerin "solidus" ve "liquidus" eğrileri vardır).',
      en: 'This chart uses CRC Handbook values (1 atm, pure metals). Real jewellery alloys melt 50-150°C lower (alloys have "solidus" and "liquidus" curves).',
      ar: 'المخطط يعتمد على CRC (1 ضغط جوي، معدن نقي). السبائك الحقيقية تنصهر أدنى بـ50-150°م.',
    },
    sources: ['crc-handbook', 'webelements', 'iupac-periodic', 'rsc-platinum'],
    relatedExhibits: ['tam-altin', 'platin-nedir', '925-ayar', 'platin-vs-altin'],
    relatedStories: ['altin-nugget-yolculugu'],
    relatedQuizzes: ['altin', 'platin', 'gumus'],
    vocabulary: ['alasim', 'paladyum', 'rodyum'],
    curatorNote: {
      tr: 'Bir metalin erime noktası atomlarının birbirine ne kadar sıkı tutunduğuyla ilgilidir. Platin, metalik bağların çok güçlü olduğu bir "d-blok geçiş metali" olduğu için tüm kuyumcu metallerinin en yüksek erime noktasına sahiptir.',
      en: 'A metal\'s melting point reflects how tightly its atoms hold together. Platinum, a "d-block transition metal" with very strong metallic bonds, has the highest melting point among common jewellery metals.',
      ar: 'نقطة الانصهار تعكس قوة الروابط المعدنية. البلاتين معدن انتقالي بروابط قوية جداً — لذا أعلى نقطة انصهار بين معادن الصياغة.',
      cite: ['iupac-periodic', 'rsc-platinum'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. GUESS — Taş Tanıma
  // ═══════════════════════════════════════════════════════════════
  guess: {
    title: {
      tr: 'Taş Tanıma',
      en: 'Stone Guess',
      ar: 'تخمين الحجر',
    },
    goal: {
      tr: 'Bir gemolog rol yap: renk, sertlik, köken ipuçlarıyla 5 farklı taşı doğru tahmin et. Her ipucu seni gerçek gemolojik ayırt etme yöntemine bir adım daha yaklaştırır.',
      en: 'Play gemologist: use hints about color, hardness and origin to identify 5 different stones. Each clue brings you closer to real gemological identification methods.',
      ar: 'العب دور عالم الأحجار: استخدم تلميحات اللون والصلابة والأصل لتحدد 5 أحجار مختلفة.',
    },
    materials: [
      { emoji: '🔍', name: { tr: '5 gizli taş', en: '5 hidden stones', ar: '5 أحجار مخفية' } },
      { emoji: '💡', name: { tr: 'İpucu sistemi (3 ipucu/puzzle)', en: 'Clue system (3 clues/puzzle)', ar: 'نظام تلميحات (3 لكل لغز)' } },
      { emoji: '☑️', name: { tr: 'Çoktan seçmeli cevap', en: 'Multiple choice answers', ar: 'خيارات متعددة' } },
    ],
    procedure: [
      {
        step: {
          tr: 'Sıradaki puzzle rastgele seçilir. Önce sadece boş kart — hiç bilgi yok.',
          en: 'A random puzzle appears. At first, just an empty card — no information.',
          ar: 'يظهر لغز عشوائي. البداية بلا معلومات.',
        },
      },
      {
        step: {
          tr: '"İpucu al" butonuna bas. Her ipucu gerçek gemolojik özelliklerden biri: renk, Mohs sertliği, köken bölgesi, veya ayırt edici fiziksel özellik (örn. inklüzyon tipi).',
          en: 'Click "Show clue." Each hint is a real gemological property: colour, Mohs hardness, origin, or a distinguishing physical feature (e.g. inclusion type).',
          ar: 'انقر "تلميح". كل تلميح خاصية جيمولوجية حقيقية: لون، صلابة، أصل، أو خاصية فيزيائية.',
        },
        cite: ['gia-colored-stone'],
      },
      {
        step: {
          tr: 'Yeterli ipucuyla 4 seçenekten birini seç. Yanlışsa doğru cevap açıklanır; yeni puzzle\'a geç.',
          en: 'With enough clues, pick one of 4 options. If wrong, the correct answer is revealed; move on to a new puzzle.',
          ar: 'بعد التلميحات، اختر من 4. إذا أخطأت يُكشف الجواب.',
        },
      },
    ],
    safetyNote: {
      tr: 'Gerçek bir gemolog ipucu bekleyemez — refraktometre, spektroskop ve mikroskop gibi araçlarla 1-2 dakikada ayırır. Bu deney ayırt etmenin mantığını öğretir, araç değil.',
      en: 'A real gemologist doesn\'t wait for clues — refractometers, spectroscopes and microscopes resolve ID in 1-2 minutes. This experiment teaches the logic, not the tools.',
      ar: 'عالم الأحجار الحقيقي لا ينتظر تلميحات — يستخدم أدوات دقيقة. هذه التجربة تعلّم المنطق فقط.',
    },
    sources: ['gia-colored-stone', 'mindat-database', 'britannica-general'],
    relatedExhibits: ['yakut', 'zumrut', 'safir', 'turkuvaz', 'pirlanta-nasil-olusur'],
    relatedStories: ['kleopatra-zumrut', 'pirlantanin-3-milyar-yili'],
    relatedQuizzes: ['renkli-taslar', 'pirlanta'],
    vocabulary: ['korund', 'beril', 'jardin', 'mohs', 'inclusion'],
    curatorNote: {
      tr: 'Yakut ve safir aynı mineraldir (korund, Al₂O₃). Fark: krom izi → kırmızı (yakut); demir veya titanyum → mavi ve diğer renkler (safir). Bu yüzden "yakut" ve "safir" aynı gemolojik test sonuçları verir; ayırt eden sadece renktir.',
      en: 'Ruby and sapphire are the same mineral (corundum, Al₂O₃). The difference: chromium trace → red (ruby); iron or titanium → blue and other colours (sapphire). So ruby and sapphire give identical gemological readings; only colour distinguishes them.',
      ar: 'الياقوت والصفير نفس المعدن (كوروند، Al₂O₃). الفرق: الكروم يُعطي الأحمر (ياقوت)، الحديد والتيتانيوم يُعطون الأزرق (صفير).',
      cite: ['gia-colored-stone', 'mindat-database'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. VIRTUAL GEMOLOGIST — 5-test Stone Identification (Faz 7)
  // ═══════════════════════════════════════════════════════════════
  'virtual-gemologist': {
    title: {
      tr: 'Sanal Gemolog Atölyesi',
      en: 'Virtual Gemologist Workshop',
      ar: 'ورشة الجيمولوجي الافتراضية',
    },
    goal: {
      tr: 'Bilinmeyen bir taşı beş gemolojik testle kimliklendirmek: Mohs sertliği, renk, yoğunluk, UV floresans ve optik özellik. Her test tek başına yetmez — sonuç, kanıtların birbirini desteklemesiyle güvenilir olur. Bu atölye, bir gemoloğun düşünme disiplinini öğretir: hızlı tanı değil, kanıta dayalı tanı.',
      en: 'Identify an unknown stone through five gemological tests: Mohs hardness, color, density, UV fluorescence and optical property. No single test is conclusive — reliability comes from evidence reinforcing evidence. This workshop teaches a gemologist\'s thinking discipline: not fast answers, but evidence-based answers.',
      ar: 'تعرّف على حجر مجهول عبر خمسة اختبارات: صلابة موس، اللون، الكثافة، الفلورسنس UV، والخاصية البصرية. لا اختبار وحده كافٍ — الموثوقية من تضافر الأدلة.',
    },
    materials: [
      { emoji: '💎', name: { tr: 'Bilinmeyen taş', en: 'Unknown stone', ar: 'حجر مجهول' } },
      { emoji: '🔬', name: { tr: 'Beş test alet seti (simülasyon)', en: 'Five-test tool kit (simulation)', ar: 'مجموعة أدوات الاختبار' } },
      { emoji: '⚖️', name: { tr: 'Dijital tartı ve mezür', en: 'Digital scale and graduated cylinder', ar: 'ميزان رقمي ومخبار' } },
      { emoji: '💡', name: { tr: 'UV (mor) fener', en: 'UV (purple) flashlight', ar: 'ضوء بنفسجي' } },
      { emoji: '📓', name: { tr: 'Laboratuvar defteri', en: 'Lab notebook', ar: 'دفتر المختبر' } },
    ],
    procedure: [
      {
        step: {
          tr: '1. SENARYO: Sana getirilen taş için bir "vaka ipucu" oku. Bu taş, iki olası kimlikten hangisi olabilir? (ör. garnet mi yakut mu)',
          en: '1. SCENARIO: Read the case clue for your stone. Which of two likely identities could it be? (e.g., garnet vs ruby)',
          ar: '1. السيناريو: اقرأ التلميح ثم حدد الاحتمالين.',
        },
      },
      {
        step: {
          tr: '2. MOHS: Taşı beş farklı alet karşısında dene (tırnak, bakır, cam, çelik, zımpara). Hangi alet taşı çiziyor, hangisi çizemiyor? Sertliği ara değer olarak saptama.',
          en: '2. MOHS: Test the stone against five tools (nail, copper, glass, steel, sandpaper). Which scratches the stone, which doesn\'t? Bracket the hardness.',
          ar: '2. موس: جرّب خمس أدوات ثم احصر الصلابة.',
        },
      },
      {
        step: {
          tr: '3. RENK: Taşı beyaz ışıkta gözlemle ve renk ailesini (renksiz, kırmızı, yeşil, mavi, mor) kaydet. Unutma: renk tek başına kanıt değildir.',
          en: '3. COLOR: Observe under white light and log the color family (colorless, red, green, blue, purple). Remember: color alone is not evidence.',
          ar: '3. اللون: لاحظ تحت الضوء الأبيض.',
        },
      },
      {
        step: {
          tr: '4. YOĞUNLUK: Taşı tart (kütle), sonra mezüre daldır ve yükselen suyu oku (hacim). Yoğunluk = kütle ÷ hacim. Referans: su 1.0, kuvars 2.65, safir 4.0, pırlanta 3.52 g/cm³.',
          en: '4. DENSITY: Weigh the stone (mass), then displace water (volume). Density = mass ÷ volume. Reference: water 1.0, quartz 2.65, sapphire 4.0, diamond 3.52 g/cm³.',
          ar: '4. الكثافة: الكتلة ÷ الحجم.',
        },
      },
      {
        step: {
          tr: '5. UV: Taşı karanlık kutuda UV altına koy. Mavi, kırmızı ya da parlamıyor (inert)? Kaydet.',
          en: '5. UV: Place the stone in a dark box under UV. Blue glow, red glow or inert? Record.',
          ar: '5. UV: هل يتوهج أزرق أم أحمر أم لا؟',
        },
      },
      {
        step: {
          tr: '6. OPTİK: Polariskop altında taşı döndür. Tek kırılımlı (elmas, garnet) mı, çift kırılımlı (kuvars, safir, yakut) mı?',
          en: '6. OPTICS: Rotate under a polariscope. Single refraction (diamond, garnet) or double refraction (quartz, sapphire, ruby)?',
          ar: '6. البصريات: مفرد أم مزدوج؟',
        },
      },
      {
        step: {
          tr: '7. SENTEZ: Topladığın beş kanıtı yan yana koy. Dört aday arasından hangisi beş testin hepsiyle uyumlu? Tanı koy.',
          en: '7. SYNTHESIS: Line up your five evidence lines. Which of four candidates fits all five? Make the call.',
          ar: '7. التركيب: أي مرشح يطابق كل الأدلة؟',
        },
      },
      {
        step: {
          tr: '8. RAPOR: Doğruysan gemolog raporu kartı üretilir. Yanlışsa hangi kanıtın yanlış yorumlandığını düşün ve tekrar dene.',
          en: '8. REPORT: If correct, your gemologist\'s report card is generated. If wrong, consider which piece of evidence was misread and try again.',
          ar: '8. التقرير: إذا كنت محقاً تحصل على تقرير.',
        },
      },
    ],
    safetyNote: {
      tr: 'Bu simülasyon çocuklara test mantığını öğretir. Gerçek taşları test ederken: Mohs deneyleri sadece değersiz örneklerde yapılır; UV ışığı asla göze tutulmaz; asit ve kesici alet gerektiren testler (özgül ağırlık sıvıları, kesit alımı) gemolog laboratuvarlarına bırakılır.',
      en: 'This simulation teaches the logic to children. For real-world testing: Mohs trials are only done on low-value samples; never point UV at eyes; tests requiring acid or cutting (heavy liquids, sectioning) belong to gemological labs.',
      ar: 'المحاكاة لتعليم الأطفال المنطق فقط. الاختبارات الحقيقية التي تحتاج حمضاً أو قطعاً تبقى لمختبرات الجيمولوجيا.',
    },
    sources: ['gia-colored-stone', 'mindat-database', 'britannica-general'],
    relatedExhibits: ['yakut', 'zumrut', 'safir', 'ametist', 'pirlanta-nasil-olusur', 'mohs-skalasi', '4c-sistemi'],
    relatedStories: ['pirlantanin-3-milyar-yili', 'kleopatra-zumrut'],
    relatedQuizzes: ['renkli-taslar', 'pirlanta'],
    vocabulary: ['mohs', 'inclusion', 'korund', 'beril', 'jardin'],
    curatorNote: {
      tr: 'Gemolojide altın kural: tek bir testten kesinlik çıkmaz. Pırlanta ve moissanite aynı sertlikte görünür (Mohs 9.25 ve 10); ama termal ilettikleri ısı farklıdır. Yakut ve kırmızı garnet aynı rengi paylaşır; ama çift kırılımda yakut farklı davranır. Bu yüzden beş test birlikte anlam kazanır. Raporda her kanıt ayrı satır olarak listelenir — çünkü gerçek bir gemolog raporu da budur.',
      en: 'The gemological golden rule: no single test is conclusive. Diamond and moissanite share visual hardness (Mohs 9.25 and 10) but differ in thermal conductivity. Ruby and red garnet share color but behave differently under birefringence. That\'s why five tests matter together. The report lists each line of evidence separately — because that\'s what a real gemologist\'s report does.',
      ar: 'القاعدة الذهبية: لا اختبار وحده حاسم. خمسة اختبارات معاً تُعطي الموثوقية.',
      cite: ['gia-colored-stone'],
    },
  },
};

// ─── Merge helper ─────────────────────────────────────────────
/**
 * Bir deney kaydını (LabPage'deki experiments array elemanı) enrichment ile
 * birleştir. Enrichment değerleri ÜSTE yazar. Mevcut alanlar (id, Icon, Cmp,
 * tone) korunur.
 */
export function enrichLab(experiment) {
  if (!experiment || !experiment.id) return experiment;
  const extra = labEnrichment[experiment.id];
  if (!extra) return experiment;
  return {
    ...experiment,
    ...extra,
  };
}

export const labEnrichmentCount = Object.keys(labEnrichment).length;
