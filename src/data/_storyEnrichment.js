/**
 * _storyEnrichment.js — Faz 6-C
 *
 * 5 hikâye için genişletilmiş alanların merkezi kaydı. Mevcut stories.js
 * dokunulmaz (sahne body'leri "küratör yorumu" olarak kalır, Karar 1).
 * Bu modül ID → yeni alanlar eşlemesi tutar; stories/index.js'teki
 * enrichStory() merge eder.
 *
 * Eklenen alanların hiçbiri ZORUNLU değildir. StoryPage (Faz 6-C UI)
 * bu alanları opsiyonel render eder.
 *
 * Şema (yeni alanlar):
 *   sources         — ['source-id']  (hikâyenin kaynakça listesi)
 *   relatedLabs     — ['lab-id']
 *   relatedQuizzes  — ['quiz-category-id']
 *   geoPoints       — ['geo-id']  (hikâyenin geçtiği yerler, çoklu)
 *   timeline        — [{year, event:{tr,en,ar}, cite?:[source-id]}]
 *   vocabulary      — ['glossary-term-id']
 *   curatorNote     — {tr,en,ar, cite?:[source-id]}
 *
 * Kaynakça prensibi (Karar 1 / Minimal):
 *   - timeline tarihleri + curatorNote olguları → sources ile kaynaklanır
 *   - mevcut scene body metinleri dokunulmaz
 *   - specs alanı hikâyelerde anlamlı değildir (sergi kavramı); onun
 *     yerine timeline'ın `cite` alanı footnote kaynağı olur.
 */

export const storyEnrichment = {
  // ═══════════════════════════════════════════════════════════════
  // 1. KLEOPATRA'NIN ZÜMRÜDÜ
  // ═══════════════════════════════════════════════════════════════
  'kleopatra-zumrut': {
    sources: [
      'wiki-mons-smaragdus',
      'cailliaud-1822',
      'gia-colored-stone',
      'britannica-general',
    ],
    relatedLabs: ['guess', 'mohs'],
    relatedQuizzes: ['renkli-taslar'],
    geoPoints: ['cleopatra-mons-smaragdus', 'emerald-colombia'],
    timeline: [
      {
        year: '-40',
        event: {
          tr: 'Kleopatra Zümrüt Dağı madenlerini kendi adına bağlar.',
          en: 'Cleopatra brings the Emerald Mountain mines under her own name.',
          ar: 'كليوباترا تضع مناجم جبل الزمرد باسمها.',
        },
        cite: ['britannica-general'],
      },
      {
        year: '-30',
        event: {
          tr: 'Kleopatra ölür; Roma Mısır\'ı alır, madenler bir süre daha işler.',
          en: 'Cleopatra dies; Rome takes Egypt, mines operate a while longer.',
          ar: 'موت كليوباترا؛ روما تستولي على مصر، المناجم تستمر فترة.',
        },
      },
      {
        year: '400',
        event: {
          tr: '4. yüzyılda madenler terk edilir; kum yolları kapatır.',
          en: 'The mines are abandoned in the 4th century; sand closes the paths.',
          ar: 'تُهجر المناجم في القرن الرابع؛ تغطيها الرمال.',
        },
      },
      {
        year: '1817',
        event: {
          tr: 'Fransız mineralog Frédéric Cailliaud eski maden ağızlarını yeniden keşfeder.',
          en: 'French mineralogist Frédéric Cailliaud rediscovers the old mine mouths.',
          ar: 'العالم الفرنسي كاليود يعيد اكتشاف فوهات المناجم.',
        },
        cite: ['cailliaud-1822', 'wiki-mons-smaragdus'],
      },
    ],
    vocabulary: ['beril', 'jardin', 'korund', 'mohs'],
    curatorNote: {
      tr: 'Kleopatra döneminde Akdeniz dünyasının bilinen tek zümrüt kaynağı Mısır\'ın doğu çölüdür; Kolombiya madenlerinin keşfi için 16. yüzyıla kadar beklenecektir.',
      en: 'In Cleopatra\'s time, Egypt\'s eastern desert was the only known emerald source in the Mediterranean world; Colombia\'s mines would not be discovered until the 16th century.',
      ar: 'في زمن كليوباترا، كانت صحراء مصر الشرقية المصدر الوحيد المعروف للزمرد في المتوسط؛ اكتُشفت مناجم كولومبيا فقط في القرن 16.',
      cite: ['gia-colored-stone'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. PIRLANTANIN 3 MİLYAR YILI
  // ═══════════════════════════════════════════════════════════════
  'pirlantanin-3-milyar-yili': {
    sources: [
      'wiki-cullinan-diamond',
      'worldhistory-cullinan',
      'royal-cullinan',
      'gia-diamond-grading',
      'mindat-database',
    ],
    relatedLabs: ['light', 'mohs'],
    relatedQuizzes: ['pirlanta'],
    geoPoints: ['diamond-kimberley', 'tower-of-london'],
    timeline: [
      {
        year: '-3000000000',
        event: {
          tr: '3 milyar yıl önce: Dünya\'nın mantosunda pırlanta kristalleşmeye başlar (~150 km derinlik).',
          en: '3 billion years ago: diamond crystallises in Earth\'s mantle (~150 km depth).',
          ar: 'قبل 3 مليار سنة: تتبلور الماسة في وشاح الأرض (150 كم).',
        },
        cite: ['mindat-database'],
      },
      {
        year: '1905',
        event: {
          tr: '26 Ocak 1905: Frederick Wells Cullinan\'ı Premier Madeni\'nde bulur — 3.106 karat.',
          en: '26 January 1905: Frederick Wells finds the Cullinan at the Premier Mine — 3,106 carats.',
          ar: '26 يناير 1905: فريدريك ويلز يكتشف ماسة كولينان (3,106 قيراط).',
        },
        cite: ['wiki-cullinan-diamond', 'worldhistory-cullinan'],
      },
      {
        year: '1908',
        event: {
          tr: '1908: Joseph Asscher Amsterdam\'da Cullinan\'ı 9 büyük + 96 küçük parçaya keser.',
          en: '1908: Joseph Asscher cleaves the Cullinan in Amsterdam into 9 major and 96 minor stones.',
          ar: '1908: جوزيف أشر يقطع كولينان في أمستردام إلى 9 قطع كبرى و96 صغرى.',
        },
        cite: ['wiki-cullinan-diamond'],
      },
      {
        year: '1910',
        event: {
          tr: '1910: Cullinan I (530,2 karat) Kral Asası\'na monte edilir — Londra Kulesi.',
          en: '1910: Cullinan I (530.2 ct) is mounted in the Sovereign\'s Sceptre — Tower of London.',
          ar: '1910: تُثبت كولينان الأولى (530.2 قيراط) في صولجان التاج — برج لندن.',
        },
        cite: ['royal-cullinan'],
      },
    ],
    vocabulary: ['kimberlit', 'karat', '4c', 'bril', 'tolkowsky'],
    curatorNote: {
      tr: 'Cullinan dünyanın en büyük ham mücevher pırlantasıdır; parçalarının en büyüğü (Cullinan I) bugüne dek kesilmiş en büyük renksiz pırlantadır.',
      en: 'Cullinan is the largest gem-quality rough diamond ever found; its largest cut piece (Cullinan I) remains the largest colourless cut diamond in existence.',
      ar: 'كولينان أكبر ماسة خام ذات جودة جوهرية؛ وأكبر قطعة مقطوعة منها (كولينان I) هي الأكبر اللون عديمة المقطوعة حتى اليوم.',
      cite: ['wiki-cullinan-diamond'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. ALTIN KÜLÇESİNİN YOLCULUĞU
  // ═══════════════════════════════════════════════════════════════
  'altin-nugget-yolculugu': {
    sources: [
      'ligo-gw170817',
      'nasa-neutron-star-gold',
      'british-museum-lydia',
      'british-museum-croesus',
      'lbma-gold-standard',
    ],
    relatedLabs: ['karat', 'lydia', 'melt'],
    relatedQuizzes: ['altin'],
    geoPoints: ['lydia-mint', 'istanbul-kapalicarsi', 'gold-egypt'],
    timeline: [
      {
        year: '-5000000000',
        event: {
          tr: '~5 milyar yıl önce: Güneş Sistemi\'nin altın atomları nötron yıldızı çarpışmalarından geri kalan tozdan şekillenir.',
          en: '~5 billion years ago: the Solar System\'s gold atoms form from debris of neutron star mergers.',
          ar: 'قبل ~5 مليار سنة: تتشكل ذرات ذهب المجموعة الشمسية من حطام اندماج النجوم النيوترونية.',
        },
        cite: ['nasa-neutron-star-gold', 'ligo-gw170817'],
      },
      {
        year: '-600',
        event: {
          tr: 'M.Ö. ~600: Lidya Kralı Kroisos insanlık tarihinin ilk standart altın sikkesini bastırır (Sardis).',
          en: 'c. 600 BCE: King Croesus of Lydia strikes humanity\'s first standardised gold coins (Sardis).',
          ar: 'حوالي 600 ق.م: الملك كروسوس الليدي يسك أول عملات ذهبية معيارية في التاريخ (سارديس).',
        },
        cite: ['british-museum-lydia', 'british-museum-croesus'],
      },
      {
        year: '2017',
        event: {
          tr: '17 Ağustos 2017: LIGO/Virgo nötron yıldızı birleşmesinden (GW170817) ağır element üretimini doğrudan gözler.',
          en: '17 August 2017: LIGO/Virgo directly observe heavy-element production in a neutron-star merger (GW170817).',
          ar: '17 أغسطس 2017: مرصد LIGO/Virgo يرصد مباشرةً تخليق العناصر الثقيلة في اندماج نجوم نيوترونية (GW170817).',
        },
        cite: ['ligo-gw170817'],
      },
    ],
    vocabulary: ['ayar', 'alasim', 'lidya', 'solidus-coin', 'elektrum'],
    curatorNote: {
      tr: '2017\'deki GW170817 olayı, nötron yıldızlarının gerçekten ağır element (altın, platin, uranyum) ürettiğinin ilk doğrudan astronomik kanıtıdır.',
      en: 'The 2017 GW170817 event is the first direct astronomical evidence that neutron-star mergers actually synthesise heavy elements (gold, platinum, uranium).',
      ar: 'حدث GW170817 عام 2017 هو أول دليل فلكي مباشر على أن اندماج النجوم النيوترونية يُخلّق فعلاً عناصر ثقيلة.',
      cite: ['ligo-gw170817'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. TRABZON HASIRI'NIN CANLANMA YOLU
  // ═══════════════════════════════════════════════════════════════
  'trabzon-hasiri-unesco': {
    sources: [
      'turkpatent-gi-trabzon-hasir',
      'gemsociety-trabzon',
      'daily-sabah-trabzon',
      'unesco-ich-turkiye',
    ],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['zanaat'],
    geoPoints: ['trabzon-hasir', 'istanbul-kapalicarsi'],
    timeline: [
      {
        year: '1500',
        event: {
          tr: '16. yüzyıl: Trabzon\'da Pontus Rum kuyumcuları gümüş tel dokuma tekniğini geliştirir.',
          en: '16th century: Pontic Greek goldsmiths in Trabzon develop the silver-wire weaving technique.',
          ar: 'القرن 16: صاغة بنطيون يطورون في طرابزون تقنية نسج السلك الفضي.',
        },
      },
      {
        year: '2004',
        event: {
          tr: '2004: "Trabzon Hasırı" Türk Patent\'te coğrafi işaret olarak tescillenir — isim korumaya alınır.',
          en: '2004: "Trabzon Hasır" is registered as a Geographical Indication with the Turkish Patent Office — the name is protected.',
          ar: '2004: يُسجَّل "حصير طرابزون" كعلامة جغرافية لدى دار السك التركية.',
        },
        cite: ['turkpatent-gi-trabzon-hasir'],
      },
      {
        year: '2025',
        event: {
          tr: '2020\'ler: Düğün sezonunda Körfez ülkelerinden turist talebi artar; Trabzon atölyeleri yurt dışı tasarım varyantları geliştirir.',
          en: '2020s: Gulf-country tourist demand grows in wedding season; Trabzon workshops develop new designs for foreign buyers.',
          ar: 'عقد 2020: طلب سياحي من الخليج يزداد في موسم الأعراس؛ ورش طرابزون تطور تصاميم جديدة.',
        },
        cite: ['daily-sabah-trabzon'],
      },
    ],
    vocabulary: ['hasir', 'telkari', 'kazaz', 'kararma'],
    curatorNote: {
      tr: 'Trabzon Hasırı UNESCO Somut Olmayan Miras listesinde değildir; Türkiye\'nin UNESCO ICH kayıtları resmî listede ayrıca görülebilir. Koruma bugün ulusal düzeyde — 2004 coğrafi işareti — üzerinden yürür.',
      en: 'Trabzon Hasır is not on the UNESCO Intangible Heritage list; Türkiye\'s actual UNESCO-ICH entries are visible on the official list. Present-day protection runs through the national-level 2004 Geographical Indication.',
      ar: 'حصير طرابزون ليس مُسجّلاً في قائمة اليونسكو للتراث غير المادي؛ الحماية الحالية عبر العلامة الجغرافية الوطنية لعام 2004.',
      cite: ['unesco-ich-turkiye', 'turkpatent-gi-trabzon-hasir'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. MARDİNLİ TELKÂRİ USTASI AYŞE HANIM
  // ═══════════════════════════════════════════════════════════════
  'mardinli-telkari-ustasi-ayse': {
    sources: [
      'gemsociety-trabzon',
      'britannica-general',
      'tdk-sozluk',
    ],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['zanaat'],
    geoPoints: ['mardin-telkari', 'midyat-savat'],
    timeline: [
      {
        year: '-2800',
        event: {
          tr: 'M.Ö. ~2800: Mezopotamya\'da ince gümüş tel dokuması (telkâri ataları) ilk kez görülür.',
          en: 'c. 2800 BCE: early fine silver-wire work — ancestor of filigree — appears in Mesopotamia.',
          ar: 'حوالي 2800 ق.م: يظهر أقدم نسج سلك فضي رفيع في بلاد الرافدين — سلف التلكاري.',
        },
      },
      {
        year: '1500',
        event: {
          tr: '15. yüzyıl: Telkâri tekniği bugünkü biçimine ulaşır; Mardin Süryani, Ermeni ve Müslüman ustalar arasında yayılır.',
          en: '15th century: filigree reaches its current form; in Mardin the craft spreads among Syriac, Armenian and Muslim masters.',
          ar: 'القرن 15: التلكاري يتخذ شكله الحالي؛ ينتشر في ماردين بين الصناع السريان والأرمن والمسلمين.',
        },
      },
      {
        year: '2013',
        event: {
          tr: '2013: "Midyat Telkârisi" Türk Patent\'te coğrafi işaret olarak tescillenir.',
          en: '2013: "Midyat Telkari" is registered as a Geographical Indication in Türkiye.',
          ar: '2013: يُسجَّل "تلكاري ميديات" كعلامة جغرافية في تركيا.',
        },
        cite: ['turkpatent-gi-trabzon-hasir'], // same authority, different registration
      },
    ],
    vocabulary: ['telkari', 'savat', 'mine', 'kazaz'],
    curatorNote: {
      tr: 'Telkâri Mardin ile özdeşleşmiş olsa da Mardin ilindeki Midyat ilçesi tescil kapsamının merkezidir; birçok atölye Süryani ve Ermeni topluluklarından gelen ustalarca sürdürülmüştür.',
      en: 'Though filigree is identified with Mardin, the district of Midyat (in Mardin province) is the centre of the registered area; many workshops have been sustained by Syriac and Armenian masters.',
      ar: 'رغم ارتباط التلكاري بماردين، فإن قضاء ميديات (في محافظة ماردين) هو مركز التسجيل؛ كثير من الورش يُديرها صناع سريان وأرمن.',
    },
  },
};

// ─── Merge helper ─────────────────────────────────────────────
/**
 * Bir hikâye objesini enrichment ile birleştir. Enrichment değerleri ÜSTE yazar.
 * Mevcut alanlar (örn. Phase 2-C scenes, takeaway, relatedExhibits) korunur.
 *
 * Not: relatedExhibits zaten stories.js'de tanımlı; enrichment'ta tekrarlanmaz.
 */
export function enrichStory(story) {
  if (!story || !story.id) return story;
  const extra = storyEnrichment[story.id];
  if (!extra) return story;
  return {
    ...story,
    ...extra,
  };
}

export const storyEnrichmentCount = Object.keys(storyEnrichment).length;
