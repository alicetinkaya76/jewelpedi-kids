/**
 * _workshopEnrichment.js — Faz 6-G
 *
 * 4 atölye (hasir, telkari-usta, savat, mine) için genişletilmiş
 * metadata katmanı. Atölye adımlarının kendi body'leri (t+d metinleri)
 * OLGUSAL içerik olsa da dokunulmaz — Karar 1 gereği sadece YENİ
 * eklenen alanlar kaynaklanır.
 *
 * Şema (tüm alanlar OPSİYONEL):
 *   intro       { tr, en, ar }                        — atölye tanıtımı (subtitle'dan daha derin)
 *   origin      { place: {tr,en,ar}, era?: {start,end} }
 *   materials   [{ emoji, name:{tr,en,ar}, note?:{tr,en,ar} }]
 *   sources     ['source-id', ...]
 *   relatedExhibits ['exhibit-id', ...]
 *   relatedStories  ['story-id', ...]
 *   relatedLabs     ['lab-id', ...]
 *   relatedQuizzes  ['quiz-category-id']
 *   geoPoints   ['geo-id', ...]                       — atölyenin coğrafyası
 *   vocabulary  ['glossary-term-id', ...]
 *   curatorNote { tr, en, ar, cite?: ['source-id'] }
 *   timeline    [{ year, event: {tr,en,ar}, cite?: [...] }]
 *   safetyNote  { tr, en, ar }                        — "bu sadece tur, gerçek ustalık yıllar alır"
 */

export const workshopEnrichment = {
  // ═══════════════════════════════════════════════════════════════
  // 1. HASIR — Trabzon Hasırı
  // ═══════════════════════════════════════════════════════════════
  hasir: {
    intro: {
      tr: 'Trabzon\'un 700 yıllık gümüş zanaatı. Üç gramlık saf gümüş külçe, binlerce elle sıkılmış mikro halkaya dönüşüyor — ve bir kolye 40-60 saatte tamamlanıyor. Geleneksel teknik 2004\'te Türk Patent coğrafi işaretiyle koruma altına alındı.',
      en: 'Trabzon\'s 700-year-old silver craft. A 3-gram pure-silver ingot becomes thousands of hand-linked micro-rings — and a necklace takes 40-60 hours. The technique was registered with a Turkish Geographical Indication in 2004.',
      ar: 'حرفة طرابزون الفضية العريقة منذ 700 سنة. سبيكة فضية تتحول إلى آلاف الحلقات الصغيرة المنسوجة يدوياً، ويستغرق العقد الواحد 40-60 ساعة. مسجلة علامة جغرافية تركية منذ 2004.',
    },
    origin: {
      place: { tr: 'Trabzon, Türkiye', en: 'Trabzon, Türkiye', ar: 'طرابزون، تركيا' },
      era: { start: 1300, end: null },
    },
    materials: [
      { emoji: '🪙', name: { tr: '999 saf gümüş külçe', en: '999 pure silver ingot', ar: 'سبيكة فضة 999' },
        note: { tr: '3-5 gram, sonradan bakır ile 925 ayara inecek', en: '3-5 grams, later alloyed to 925 sterling', ar: '3-5 غرام' } },
      { emoji: '🪛', name: { tr: 'Hadde (tel çekme aleti)', en: 'Draw plate (wire reducer)', ar: 'لوح السحب' } },
      { emoji: '✂️', name: { tr: 'Keskin makas', en: 'Sharp shears', ar: 'مقص حاد' } },
      { emoji: '🔥', name: { tr: 'Mikro alev (halka kapatmak için)', en: 'Micro flame (for closing rings)', ar: 'لهب صغير' } },
      { emoji: '✋', name: { tr: 'Ustanın parmakları (20-30 yıl deneyim)', en: 'The master\'s fingers (20-30 years of experience)', ar: 'أصابع الأستاذ' } },
    ],
    sources: ['gemsociety-trabzon', 'daily-sabah-trabzon', 'turkpatent-gi-trabzon-hasir'],
    relatedExhibits: ['trabzon-hasiri', '925-ayar', 'telkari'],
    relatedStories: ['trabzon-hasiri-unesco'],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['gumus', 'zanaat'],
    geoPoints: ['trabzon-hasir'],
    vocabulary: ['hasir', 'sterling', 'kararma'],
    curatorNote: {
      tr: 'Trabzon Hasırı\'nın önemi hızda değil, dayanıklılıkta: halkalar birbirine değil örgüye kilitlendiği için bir halka kopsa bile kolye sökülmez. Bu, fiziksel bir el yazısı gibidir — iki ustanın yaptığı hasır bile birbirinden ayırt edilebilir, çünkü sıkılık, halka çapı ve örgü ritmi her ustada özgündür.',
      en: 'The strength of Trabzon Hasır isn\'t speed but resilience: rings lock into the weave rather than each other, so a single broken ring doesn\'t unravel the necklace. It\'s a physical handwriting — even two masters\' hasır can be told apart by ring tension, diameter and rhythm.',
      ar: 'قوة حصير طرابزون في متانته لا سرعته — الحلقات مثبتة بالنسج لا ببعضها، فلا ينفرط العقد بانكسار حلقة واحدة. وهو توقيع مادي: يمكن تمييز عمل أستاذين اثنين بالشد والقطر والإيقاع.',
      cite: ['gemsociety-trabzon', 'turkpatent-gi-trabzon-hasir'],
    },
    timeline: [
      {
        year: '~1300',
        event: {
          tr: 'Trabzon Hasırı\'nın ilk örnekleri belirir; teknik bölgede aile atölyelerinde gelişir.',
          en: 'The first examples of Trabzon Hasır appear; the technique develops in family workshops.',
          ar: 'أول أمثلة حصير طرابزون تظهر؛ تتطور في ورش العائلات.',
        },
      },
      {
        year: '2004',
        event: {
          tr: 'Türk Patent ve Marka Kurumu "Trabzon Hasır Bileziği"ni coğrafi işaret olarak tescil eder.',
          en: 'The Turkish Patent Institute registers "Trabzon Hasır Bracelet" as a geographical indication.',
          ar: 'تسجيل "سوار حصير طرابزون" كعلامة جغرافية.',
        },
        cite: ['turkpatent-gi-trabzon-hasir'],
      },
      {
        year: '2024',
        event: {
          tr: 'Körfez turistlerinin talebiyle ihracat rekorları kırılır; genç usta eğitim programları açılır.',
          en: 'Gulf tourist demand drives export records; young master training programs open.',
          ar: 'طلب السياح الخليجيين يدفع الصادرات لأرقام قياسية.',
        },
        cite: ['daily-sabah-trabzon'],
      },
    ],
    safetyNote: {
      tr: 'Bu 8 adımlık anlatım gerçek ustalığın birkaç saatlik yüzeyidir. Trabzon\'da çırak-kalfa-usta geleneği 7-10 yıl sürer; bir ustanın parmakları binlerce saat tekrar sonunda halkaları gözsüz sıkabilir hale gelir.',
      en: 'This 8-step walkthrough is a few-hour surface of real mastery. The apprentice-journeyman-master tradition in Trabzon lasts 7-10 years; a master\'s fingers can tighten rings without looking after thousands of hours.',
      ar: 'هذه الخطوات الـ8 مجرد سطح بضع ساعات من البراعة الحقيقية. تقليد التدرج يستمر 7-10 سنوات.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. TELKARI-USTA — Mardin/Midyat Telkârisi
  // ═══════════════════════════════════════════════════════════════
  'telkari-usta': {
    intro: {
      tr: 'Mardin\'in Midyat ilçesi 500 yıllık telkârinin merkezidir. Saç teli kadar ince gümüş, cımbızla dantel gibi örülür. Teknik 2013\'te "Midyat Telkârisi" adıyla Türk Patent coğrafi işaretiyle tescil edildi.',
      en: 'Midyat, a district of Mardin, has been the centre of filigree for 500 years. Hair-thin silver wire is woven like lace with tweezers. The technique was registered as "Midyat Telkâri" Geographical Indication in 2013.',
      ar: 'ميديات في ماردين مركز التلكاري منذ 500 سنة. يُنسج السلك الرفيع بالملقط كالدانتيل. سُجل "تلكاري ميديات" علامة جغرافية تركية عام 2013.',
    },
    origin: {
      place: { tr: 'Mardin / Midyat, Türkiye', en: 'Mardin / Midyat, Türkiye', ar: 'ماردين / ميديات، تركيا' },
      era: { start: 1500, end: null },
    },
    materials: [
      { emoji: '💍', name: { tr: 'Kalın gümüş çerçeve teli (~1 mm)', en: 'Thick silver frame wire (~1 mm)', ar: 'سلك فضي ثخين' } },
      { emoji: '🧵', name: { tr: 'Saç teli kalınlığında gümüş tel (0.2-0.3 mm)', en: 'Hair-thin silver wire (0.2-0.3 mm)', ar: 'سلك فضي رفيع' } },
      { emoji: '🔧', name: { tr: 'Cımbız (desen yerleştirme)', en: 'Tweezers (pattern placement)', ar: 'ملقط' } },
      { emoji: '🧂', name: { tr: 'Gümüş lehim tozu', en: 'Silver solder powder', ar: 'مسحوق لحام فضي' } },
      { emoji: '🍶', name: { tr: 'Sirke banyosu (asit temizleme)', en: 'Vinegar bath (acid cleaning)', ar: 'حمام خل' } },
    ],
    sources: ['turkpatent-gi-midyat-telkari'],
    relatedExhibits: ['telkari', 'trabzon-hasiri'],
    relatedStories: ['mardinli-telkari-ustasi-ayse'],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['zanaat', 'gumus'],
    geoPoints: ['mardin-telkari'],
    vocabulary: ['telkari', 'niello', 'cloisonne'],
    curatorNote: {
      tr: 'Telkârinin matematiksel gizemi şudur: bir 5×5 cm pano 40-80 saat emek ister; yüzeyde görünen her desen bir "boşluk" da üretir, ve bu boşluklar ışığın arkadan süzülmesine izin verir. Böylece bir telkâri broş aslında taş değil, "ışık bekleyen" bir araçtır — güneş değişince iyi telkâri de değişir.',
      en: 'Filigree\'s mathematical mystery: a 5×5 cm panel takes 40-80 hours; every visible pattern produces a "void", and voids let light filter through from behind. So a good filigree piece is not stone but a "light-waiting" instrument — as the sun shifts, good filigree shifts with it.',
      ar: 'سر التلكاري الرياضي: 40-80 ساعة لقطعة 5×5 سم، وكل نمط يترك فراغاً يسمح للضوء بالمرور — القطعة أداة "تنتظر الضوء".',
      cite: ['turkpatent-gi-midyat-telkari'],
    },
    timeline: [
      {
        year: '~1500',
        event: {
          tr: 'Telkâri Osmanlı döneminde Mardin ve Süryani gümüşçülerle kök salar.',
          en: 'Filigree takes root during the Ottoman era via Mardin and Syriac silversmiths.',
          ar: 'التلكاري يتجذر في العهد العثماني عبر صاغة ماردين والسريان.',
        },
      },
      {
        year: '2013',
        event: {
          tr: 'Türk Patent "Midyat Telkârisi"ni coğrafi işaret olarak tescil eder (C2013/024).',
          en: 'The Turkish Patent Institute registers "Midyat Telkâri" as a geographical indication.',
          ar: 'تسجيل "تلكاري ميديات" علامة جغرافية.',
        },
        cite: ['turkpatent-gi-midyat-telkari'],
      },
    ],
    safetyNote: {
      tr: 'Bu 6 adım telkârinin anatomisidir; bir kuyumcu yardımı olmadan evde yapılamaz. Çünkü 0.2 mm gümüş tel ve lehim alevi, el iyice sabit olmadan tüm deseni eritir.',
      en: 'These 6 steps are filigree\'s anatomy; they can\'t be done at home without jeweller assistance. Because 0.2 mm silver wire and solder flame will melt the whole pattern if your hand isn\'t perfectly steady.',
      ar: 'الخطوات 6 هي تشريح التلكاري؛ لا يمكن القيام بها في البيت بدون مساعدة صائغ.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. SAVAT — Siirt Savatı
  // ═══════════════════════════════════════════════════════════════
  savat: {
    intro: {
      tr: '1000 yıllık bir geleneğin Türkiye\'deki son yuvaları Siirt ve Midyat\'tır. Gümüşün oyulmuş çizgilerine "niello" adlı siyah alaşım doldurulur — sonuç, 1000 yıl sonra bile kararmayan kalıcı bir siyah-beyaz desendir. "Siirt Savatı" adıyla 2019\'da Türk Patent coğrafi işaretiyle tescillendi.',
      en: 'A 1000-year-old tradition whose last Turkish homes are Siirt and Midyat. Engraved channels in silver are filled with "niello", a black alloy — the result is a permanent black-and-white pattern that will still shine in 1000 years. Registered as "Siirt Niello" Geographical Indication in 2019.',
      ar: 'تقليد عمره 1000 سنة، آخر موطن تركي له سيرت وميديات. تُملأ القنوات المحفورة بسبيكة سوداء "نيلّو". سُجل علامة جغرافية عام 2019 باسم "سواد سيرت".',
    },
    origin: {
      place: { tr: 'Siirt & Midyat, Türkiye', en: 'Siirt & Midyat, Türkiye', ar: 'سيرت وميديات، تركيا' },
      era: { start: 900, end: null },
    },
    materials: [
      { emoji: '🥈', name: { tr: 'Gümüş levha (925 ayar)', en: 'Silver sheet (sterling)', ar: 'لوح فضي' } },
      { emoji: '🖋️', name: { tr: 'Çelik kalem (ince iz)', en: 'Steel stylus (fine lines)', ar: 'قلم فولاذي' } },
      { emoji: '🔪', name: { tr: 'Burin (derin oyma)', en: 'Burin (deep engraving)', ar: 'إزميل' } },
      { emoji: '⚫', name: { tr: 'Niello tozu (Ag+Cu+Pb+S)', en: 'Niello powder (Ag+Cu+Pb+S)', ar: 'مسحوق نيلّو' },
        note: { tr: 'Gümüş-bakır-kurşun-kükürt karışımı; ~400°C\'de erir', en: 'Silver-copper-lead-sulfur mix; melts at ~400°C', ar: 'يصهر عند 400°م' } },
      { emoji: '🧪', name: { tr: 'Zayıf bor asit (yağdan arındırma)', en: 'Mild boric acid (degreasing)', ar: 'حمض ضعيف' } },
      { emoji: '🔥', name: { tr: 'Üfleme lambası', en: 'Blowtorch', ar: 'مشعل نفخ' } },
    ],
    sources: ['turkpatent-gi-siirt-savat', 'crc-handbook'],
    relatedExhibits: ['savat', '925-ayar', 'telkari'],
    relatedStories: ['mardinli-telkari-ustasi-ayse'],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['zanaat', 'gumus'],
    geoPoints: ['midyat-savat'],
    vocabulary: ['savat', 'niello', 'sterling'],
    curatorNote: {
      tr: 'Niello moleküler düzeyde gümüşle kaynaştığı için "boya" değil "malzeme"dir. Bu yüzden yüzyıllarca solmaz, dökülmez, kararmaz. Rus Çarı I. Petro, 1719\'da Tula şehrinde özel niello atölyeleri kurdu; aynı teknik aynı dönemde Siirt\'te zaten 800 yıldır yapılıyordu. "Yeni" kıtalar "eski" zanaatları yakalıyordu.',
      en: 'Niello bonds molecularly with silver, so it\'s not "paint" but "material". That\'s why it doesn\'t fade, chip, or tarnish for centuries. Russian Tsar Peter I built niello workshops in Tula in 1719; the same technique had been practiced in Siirt for 800 years. The "new" world was catching up with the "old" craft.',
      ar: 'النيلّو يرتبط بالفضة ذرياً، فهو "مادة" لا "طلاء". لذا لا يبهت لقرون. أنشأ القيصر بطرس الأكبر ورش نيلّو في تولا 1719؛ في سيرت كانت الحرفة قائمة منذ 800 سنة.',
      cite: ['turkpatent-gi-siirt-savat', 'crc-handbook'],
    },
    timeline: [
      {
        year: '~900',
        event: {
          tr: 'Niello (Latince nigellum = küçük siyah) tekniği Bizans ve Selçuklu zanaatkârları arasında yayılır.',
          en: 'Niello (Latin nigellum = little black) spreads among Byzantine and Seljuk craftsmen.',
          ar: 'تقنية النيلّو تنتشر بين الحرفيين البيزنطيين والسلاجقة.',
        },
      },
      {
        year: '~1200',
        event: {
          tr: 'Siirt ve güneydoğu Anadolu savat ustalarının merkezi haline gelir.',
          en: 'Siirt and southeastern Anatolia become the centre of niello masters.',
          ar: 'سيرت تصبح مركز أساتذة السواد.',
        },
      },
      {
        year: '2019',
        event: {
          tr: 'Türk Patent "Siirt Savatı"nı coğrafi işaret olarak tescil eder.',
          en: 'The Turkish Patent Institute registers "Siirt Niello" as a geographical indication.',
          ar: 'تسجيل "سواد سيرت" علامة جغرافية.',
        },
        cite: ['turkpatent-gi-siirt-savat'],
      },
    ],
    safetyNote: {
      tr: 'Bor asit banyosu gerçek atölyede havalandırmada yapılır; ev ortamında tehlikelidir. Niello tozunda kurşun bulunur — yutulmaması için maske ve eldiven zorunludur. Bu 7 adım anlatım, sadece zanaatın mantığını gösterir.',
      en: 'The boric acid bath must be done under proper ventilation; it\'s unsafe at home. Niello powder contains lead — mask and gloves are essential. These 7 steps only show the logic of the craft.',
      ar: 'حمام الحمض يتطلب تهوية. مسحوق النيلّو يحوي رصاصاً — الكمامة والقفازات ضروريتان.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. MINE — İstanbul Minesi (Enamel)
  // ═══════════════════════════════════════════════════════════════
  mine: {
    intro: {
      tr: 'Bizans ve sonra Osmanlı tarafından geliştirilen bu teknik metal üzerine renkli camı moleküler seviyede kaynaştırır. "Mine" kelimesi Osmanlıca\'dan Türkçeye geçmiştir ve "emay" veya "enamel" olarak da bilinir. Topkapı hazinesindeki çoğu nesne bu tekniğin en güzel örneklerini içerir.',
      en: 'Developed by the Byzantines then Ottomans, this technique fuses coloured glass onto metal at molecular level. The word "mine" (pronounced mee-neh) is Ottoman Turkish for enamel. Most pieces in the Topkapı Treasury showcase its finest examples.',
      ar: 'تقنية طورها البيزنطيون ثم العثمانيون، تُصهر الزجاج الملون على المعدن ذرياً. "مينا" من التركية العثمانية تعني "إناميل".',
    },
    origin: {
      place: { tr: 'İstanbul, Türkiye', en: 'İstanbul, Türkiye', ar: 'إسطنبول، تركيا' },
      era: { start: 500, end: null },
    },
    materials: [
      { emoji: '🥉', name: { tr: 'Bakır veya gümüş levha', en: 'Copper or silver sheet', ar: 'لوح نحاس أو فضة' } },
      { emoji: '🪡', name: { tr: 'İnce altın/gümüş tel (cloisonné)', en: 'Fine gold/silver wire (cloisonné)', ar: 'سلك دقيق' },
        note: { tr: 'Her rengin sınırını çizer', en: 'Outlines each colour region', ar: 'يحدد كل لون' } },
      { emoji: '🎨', name: { tr: 'Cam tozu (8-12 renk)', en: 'Glass powder (8-12 colours)', ar: 'مسحوق زجاج ملون' },
        note: { tr: 'Kobalt=mavi, bakır=yeşil, demir=kırmızı — renk metal oksitlerden gelir', en: 'Cobalt=blue, copper=green, iron=red — colour comes from metal oxides', ar: 'الألوان من أكاسيد المعادن' } },
      { emoji: '🔥', name: { tr: 'Fırın (750-900°C)', en: 'Kiln (750-900°C)', ar: 'فرن' },
        note: { tr: 'Her pişirme 2-5 dakika; 3-5 tekrar', en: 'Each firing 2-5 min; 3-5 repeats', ar: 'كل حرق 2-5 دقائق' } },
      { emoji: '💎', name: { tr: 'Taş cila + parlatma kremi', en: 'Stone sander + polish cream', ar: 'حجر صنفرة + كريم تلميع' } },
    ],
    sources: ['vam-enamel', 'topkapi-treasury', 'crc-handbook'],
    relatedExhibits: ['mine', 'savat', 'telkari'],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['zanaat'],
    geoPoints: ['istanbul-mine'],
    vocabulary: ['mine', 'niello', 'cloisonne'],
    curatorNote: {
      tr: 'Mine renklerinin hiç solmamasının gizemi budur: bu tabaka "boya" değil, moleküler seviyede metalle kaynaşmış camdır. UV, su, oksijen — hiçbiri camın kimyasal yapısını değiştiremez. Bu yüzden Topkapı hazinesindeki 500 yıllık mineli kılıç kabzaları hâlâ yapıldığı gün kadar canlıdır, halbuki aynı dönem yağlıboyaları çoktan kararmış veya pullanmıştır.',
      en: 'The mystery of mine colours never fading: the layer isn\'t "paint" but glass fused molecularly with metal. UV, water, oxygen — nothing alters the glass\'s chemistry. So a 500-year-old enamelled sword hilt in the Topkapı Treasury is as vivid today as when it was made, while oil paintings from the same era have darkened or flaked.',
      ar: 'سر ألوان المينا: ليست طلاء بل زجاج ملتحم بالمعدن ذرياً. لا الأشعة ولا الماء ولا الأكسجين يغيرون كيميائه — لذا مقابض السيوف المينا في طوب قابي لا تزال زاهية بعد 500 سنة.',
      cite: ['vam-enamel', 'topkapi-treasury'],
    },
    timeline: [
      {
        year: '~500',
        event: {
          tr: 'Bizans İmparatorluğu\'nda cloisonné (telli mine) en parlak dönemine girer; altın üzerine kırmızı mineli haçlar çağın prestij nesnesi olur.',
          en: 'Byzantine cloisonné enters its peak; gold crosses with red enamel become the era\'s prestige objects.',
          ar: 'المينا البيزنطية تدخل ذروتها؛ الصلبان الذهبية الحمراء رموز الرقي.',
        },
      },
      {
        year: '~1550',
        event: {
          tr: 'Osmanlı kuyumcuları mine tekniğini hat ve çiçek desenleriyle birleştirir; Topkapı hazinesindeki eserlerin çoğu bu dönemdedir.',
          en: 'Ottoman jewellers combine enamel with calligraphic and floral patterns; most Topkapı Treasury pieces date to this era.',
          ar: 'الصاغة العثمانيون يدمجون المينا بالخط والزخارف — أغلب قطع طوب قابي من هذه الحقبة.',
        },
        cite: ['topkapi-treasury'],
      },
    ],
    safetyNote: {
      tr: '750-900°C fırın, endüstriyel atölye ekipmanıdır; ev ortamında asla denenmemelidir. Cam tozu solunduğunda silikoz riski taşır. Bu 6 adım anlatım, eserin nasıl doğduğunu anlamak içindir.',
      en: 'A 750-900°C kiln is industrial workshop equipment; never attempt at home. Glass powder carries silicosis risk if inhaled. These 6 steps are for understanding how the piece is born, not a home guide.',
      ar: 'الفرن 750-900°م معدات صناعية؛ لا تُجرب منزلياً. مسحوق الزجاج يشكل خطر السيليكوز.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // YENİ ATÖLYELER (Faz 7)
  // ═══════════════════════════════════════════════════════════════

  // 5. KÜTAHYA ÇİNİLİ MÜCEVHER KUTUSU
  'kutahya-cini-kutu': {
    intro: {
      tr: 'Kütahya çinisi, Osmanlı saray mutfağından günümüze uzanan 500 yıllık bir süslemeciliktir. Bu atölye çini geleneğini taş saklama kutusuyla buluşturur: çocuk hem zanaatı hem koleksiyonculuğu deneyimler.',
      en: 'Kütahya tiles are a 500-year decorative tradition stretching from Ottoman court kitchens to today. This workshop fuses tile heritage with a stone-storage box — the child experiences both craft and collecting.',
      ar: 'زخارف كوتاهيا تقليد عثماني عمره 500 سنة. هذه الورشة تجمع التراث مع صندوق أحجار.',
    },
    origin: {
      place: { tr: 'Kütahya, Türkiye', en: 'Kütahya, Türkiye', ar: 'كوتاهيا، تركيا' },
      era: { start: 1500, end: null },
    },
    materials: [
      { emoji: '📦', name: { tr: 'Karton mücevher kutusu', en: 'Cardboard jewelry box', ar: 'صندوق كرتوني' } },
      { emoji: '🖍️', name: { tr: 'Akrilik kalem (beyaz, mavi, turkuvaz, kırmızı)', en: 'Acrylic markers (white, blue, turquoise, red)', ar: 'أقلام أكريليك' } },
      { emoji: '📐', name: { tr: 'Ön kesimli motif şablonu', en: 'Pre-cut motif template', ar: 'قالب زخرفي' } },
      { emoji: '🏷️', name: { tr: 'Sergi etiketi kağıdı', en: 'Exhibit label card', ar: 'بطاقة متحفية' } },
    ],
    relatedExhibits: ['4c-sistemi'],
    relatedQuizzes: ['zanaat'],
    vocabulary: ['telkari'],
    curatorNote: {
      tr: 'Kütahya çinisinin ikonik renkleri tesadüf değil: kobalt mavi İran\'dan gelir, mercan kırmızısı İznik\'ten. Her bölgenin renk kodu vardır. Bu atölyede üç rengi aşmamak, tarihsel sadakati de öğretir.',
      en: 'Kütahya\'s iconic palette isn\'t random: cobalt blue comes from Iran, coral red from İznik. Every region has its color code. Keeping to three colors also teaches historical fidelity.',
      ar: 'ألوان كوتاهيا ليست اعتباطية — الكوبالت من إيران والأحمر من إزنيق.',
    },
    safetyNote: {
      tr: 'Maket bıçağı kullanma. Yalnızca ön kesimli şablon. Akrilik kalemin aseton kokusu güçlü olursa pencereyi aç. Küçük parça (sticker, boncuk) 6 yaş altı için uygun değildir.',
      en: 'No utility knives — use the pre-cut template only. If acrylic marker fumes are strong, open a window. Small parts (stickers, beads) unsuitable for under-6.',
      ar: 'قالب مقصوص مسبقاً فقط. لا أدوات حادة.',
    },
  },

  // 6. ESKİŞEHİR LÜLETAŞI
  'eskisehir-lutasi': {
    intro: {
      tr: 'Eskişehir lületaşı, dünyada neredeyse sadece bu bölgede çıkan beyaz, gözenekli ve olağanüstü yumuşak bir mineraldir. Bu atölyede gerçek lületaşı yerine güvenli sabun üzerinde oyma tekniğini deneyimliyoruz.',
      en: 'Eskişehir meerschaum is a white, porous, exceptionally soft mineral mined almost exclusively in this region. This workshop uses safe soap as a stand-in to practice the carving logic.',
      ar: 'حجر البحر الأبيض من إسكيشهير. نحت على الصابون محاكاة للتقنية.',
    },
    origin: {
      place: { tr: 'Eskişehir, Türkiye', en: 'Eskişehir, Türkiye', ar: 'إسكيشهير، تركيا' },
      era: { start: 1700, end: null },
    },
    materials: [
      { emoji: '🧼', name: { tr: 'Yumuşak beyaz sabun', en: 'Soft white soap', ar: 'صابون أبيض ناعم' } },
      { emoji: '🪵', name: { tr: 'Plastik oyma çubuğu / kürdan', en: 'Plastic carving stick / toothpick', ar: 'أداة نحت بلاستيكية' } },
      { emoji: '🧽', name: { tr: 'Nemli sünger', en: 'Damp sponge', ar: 'إسفنجة مبللة' } },
      { emoji: '📓', name: { tr: 'Jeolojik etiket kartı', en: 'Geology label card', ar: 'بطاقة جيولوجية' } },
    ],
    sources: ['britannica-general'],
    relatedExhibits: ['mohs-skalasi'],
    relatedLabs: ['mohs'],
    vocabulary: ['mohs'],
    curatorNote: {
      tr: 'Lületaşı Mohs sertliği 2-2.5 — tırnakla çizilebilir. Yumuşaklığın sırrı iskelet yapısıdır: magnezyum silikat, içi delik bir süngere benzer. Bu yüzden hem yumuşaktır hem de suda yüzer. "Lületaşı" adı "lüle" (pipo) + "taş" — en çok pipo üretiminde kullanılır.',
      en: 'Meerschaum sits at Mohs 2-2.5 — a fingernail can scratch it. The softness comes from a skeletal structure: magnesium silicate resembling a porous sponge. That\'s why it\'s both soft and floats on water. The Turkish name means "pipe stone" — pipes are its main product.',
      ar: 'صلابة موس 2-2.5 — يمكن خدشه بالظفر. مركّب من سيليكات المغنيسيوم المسامي.',
    },
    safetyNote: {
      tr: 'Gerçek lületaşı oymaca metal bıçak kullanır; çocuklara verilmez. Plastik oyma çubuğu, kürdan, peynir bıçağı (uç yuvarlanmış) güvenlidir. Toz oluşursa nemli bezle toplanır, solunmaz.',
      en: 'Real meerschaum carving uses metal blades; not for children. Plastic carving sticks, toothpicks, round-tip cheese knives are safe. If dust forms, wipe with a damp cloth; don\'t inhale.',
      ar: 'النحت الحقيقي بأدوات معدنية حادة — ممنوع للأطفال.',
    },
  },

  // 7. BRILLIANT KAĞIT MODEL
  'elmas-kagit-model': {
    intro: {
      tr: 'Elmasın brilliant kesimi 19. yüzyılda Marcel Tolkowsky tarafından matematiksel olarak optimize edildi: 57-58 faset, belirli açılar, ışığın içeri girip geri dönmesi için hassas bir geometri. Bu atölye, o geometriyi kağıt modelle elle inşa etmektir.',
      en: 'The diamond\'s brilliant cut was mathematically optimized by Marcel Tolkowsky in the 19th century: 57-58 facets, specific angles, a precise geometry for light to enter and bounce back. This workshop builds that geometry by hand with paper.',
      ar: 'قطع البريليانت هندسة دقيقة طوّرها توليكوفسكي — 57-58 وجهاً.',
    },
    origin: {
      place: { tr: 'Antwerp/Amsterdam (teknik), küresel uygulama', en: 'Antwerp/Amsterdam (technique), applied globally', ar: 'أنتويرب/أمستردام تقنياً' },
      era: { start: 1919, end: null },
    },
    materials: [
      { emoji: '📄', name: { tr: 'Brilliant açınım şablonu', en: 'Brilliant unfold template', ar: 'قالب البريليانت' } },
      { emoji: '✂️', name: { tr: 'Makas (yuvarlak uç)', en: 'Scissors (round-tip)', ar: 'مقص برأس مدور' } },
      { emoji: '📐', name: { tr: 'Cetvel', en: 'Ruler', ar: 'مسطرة' } },
      { emoji: '🖊️', name: { tr: 'Kapalı kalem ucu (kat izi için)', en: 'Closed pen tip (scoring)', ar: 'طرف قلم مغلق' } },
      { emoji: '🔦', name: { tr: 'Fener ya da telefon ışığı', en: 'Flashlight or phone light', ar: 'مصباح' } },
    ],
    sources: ['gia-colored-stone', 'britannica-general'],
    relatedExhibits: ['4c-sistemi', 'kesim-sekilleri', 'pirlanta-nasil-olusur'],
    relatedLabs: ['light'],
    relatedQuizzes: ['pirlanta'],
    vocabulary: ['mohs'],
    curatorNote: {
      tr: 'Tolkowsky\'nin formülü şu: pavilion açısı ~40.75°, crown açısı ~34.5°, table oranı %53. Bu sayılar sabittir — çünkü ışığın pavyondan tam yansıması için fiziksel şart budur. Çocuk modelinde bu oranlar korunur: iyi yapıştırılmış bir model dahi parlak bir ışık oyunu yapar.',
      en: 'Tolkowsky\'s formula: pavilion angle ~40.75°, crown angle ~34.5°, table ratio 53%. These numbers are fixed — because full light reflection off the pavilion physically requires them. The children\'s model preserves the ratios: even a well-glued paper version shows a luminous play of light.',
      ar: 'زاوية البافيليون 40.75°، التاج 34.5°، السطح 53%.',
    },
    safetyNote: {
      tr: 'Yuvarlak uçlu makas. Yapıştırıcı sıvı olmasın — stick tipi tercih edilir. Fener göze tutulmamalı.',
      en: 'Round-tip scissors. Avoid liquid glue — prefer stick type. Don\'t point the flashlight at eyes.',
      ar: 'مقص بطرف مدور.',
    },
  },

  // 8. KRİSTAL YETİŞTİRME
  'kristal-yetistirme': {
    intro: {
      tr: 'Kristal yetiştirme hem sabır hem kimyadır: doymuş bir çözeltiden tek tek atomlar bir tohumun üstüne dizilir. Bir haftada çocuk, ametistin milyonlarca yılda ne yaptığını küçük ölçekte gözlemler.',
      en: 'Crystal growing is patience and chemistry: atoms in a saturated solution lay themselves one by one onto a seed. In a week the child observes, at small scale, what amethyst does over millions of years.',
      ar: 'زراعة البلورات صبر وكيمياء.',
    },
    origin: {
      place: { tr: 'Tüm dünya — doğada ve laboratuvarda', en: 'Worldwide — in nature and in labs', ar: 'حول العالم' },
    },
    materials: [
      { emoji: '🫙', name: { tr: 'Temiz cam kavanoz', en: 'Clean glass jar', ar: 'برطمان زجاجي نظيف' } },
      { emoji: '🥄', name: { tr: 'Şeker veya şap (öğretmen onaylı)', en: 'Sugar or alum (teacher-approved)', ar: 'سكر أو شب' } },
      { emoji: '♨️', name: { tr: 'Sıcak su (öğretmen kontrolünde)', en: 'Hot water (teacher-controlled)', ar: 'ماء ساخن' } },
      { emoji: '🧵', name: { tr: 'Temiz ip', en: 'Clean string', ar: 'خيط نظيف' } },
      { emoji: '📏', name: { tr: 'Cetvel ve gözlem defteri', en: 'Ruler and observation log', ar: 'مسطرة ودفتر' } },
    ],
    sources: ['mindat-database', 'britannica-general'],
    relatedExhibits: ['ametist', 'mohs-skalasi', 'pirlanta-nasil-olusur'],
    relatedLabs: ['mohs', 'virtual-gemologist'],
    relatedQuizzes: ['renkli-taslar'],
    vocabulary: ['mohs'],
    curatorNote: {
      tr: 'Ametist doğada tam olarak bu mekanizmayla büyür — ama daha uzun sürede ve demir iyonlarının kafese girmesiyle mor renk kazanarak. Senin kristalin şeffaf (veya tuzlu) olsa da, görsel olarak aynı süreci izler: bir çekirdek, düzenli bir örüntü, sabırlı büyüme.',
      en: 'Amethyst grows in nature by exactly this mechanism — but over far longer, with iron ions entering the lattice to give it purple color. Your crystal may be clear (or salty) but visually follows the same process: a seed, a regular pattern, patient growth.',
      ar: 'الأميثيست ينمو بنفس الطريقة في الطبيعة — لكن ببطء شديد ومع دخول الحديد للشبكة.',
      cite: ['mindat-database'],
    },
    safetyNote: {
      tr: 'Sıcak su öğretmen tarafından hazırlanır. Boraks (laundry borax) yerine şeker veya şap kullanılır — güvenlik nedeniyle. Çözeltiyi içmeyin.',
      en: 'Hot water is handled by the teacher. Use sugar or alum instead of laundry borax — for safety. Do not drink the solution.',
      ar: 'الماء الساخن تحت إشراف المعلم. لا تشرب المحلول.',
    },
  },

  // 9. UV FLORESANS
  'uv-floresans': {
    intro: {
      tr: 'UV ışığı görünür ışığın ötesinde bir dalga boyudur. Bazı malzemeler — florit, bazı elmaslar, tonik su, vitamin B2 — UV\'yi emer, sonra görünür ışık olarak yayar. Bu atölye, gemolog laboratuvarında yapılan gerçek bir testi güvenli biçimde canlandırır.',
      en: 'UV is a wavelength beyond visible light. Some materials — fluorite, certain diamonds, tonic water, vitamin B2 — absorb UV and re-emit visible light. This workshop safely recreates a real test performed in gemological labs.',
      ar: 'UV وراء الضوء المرئي.',
    },
    origin: {
      place: { tr: 'Gemoloji laboratuvarları — dünya çapında', en: 'Gemological labs — worldwide', ar: 'مختبرات الجيمولوجيا' },
    },
    materials: [
      { emoji: '🔦', name: { tr: 'UV fener (küçük, LED)', en: 'UV flashlight (small, LED)', ar: 'مصباح UV صغير' } },
      { emoji: '📦', name: { tr: 'Ayakkabı kutusu (karanlık kutu)', en: 'Shoebox (dark box)', ar: 'علبة أحذية' } },
      { emoji: '🖍️', name: { tr: 'Fosforlu kalemler, tonik su', en: 'Highlighters, tonic water', ar: 'أقلام فلورسنت، ماء تونيك' } },
      { emoji: '💎', name: { tr: 'Mümkünse florit ya da mineral örnekleri', en: 'Fluorite or mineral specimens if available', ar: 'عينات معدنية إن وجدت' } },
    ],
    sources: ['gia-colored-stone', 'mindat-database'],
    relatedExhibits: ['zumrut', 'yakut', '4c-sistemi'],
    relatedLabs: ['virtual-gemologist', 'guess'],
    vocabulary: ['mohs', 'inclusion'],
    curatorNote: {
      tr: 'Bir elmasın UV altında mavi parlaması "fluorescence" derecesi olarak 4C sisteminin dışında ayrı bir özelliktir ve piyasada fiyatı hafifçe düşürür (çünkü gün ışığında sütümsü bir etki yaratabilir). Ama bu özellik, aynı zamanda sahte elmastan gerçeği ayırmanın güvenilir yollarından biridir.',
      en: 'A diamond\'s blue UV glow is a separate attribute outside the 4Cs, and it slightly lowers market price (it can create a milky look in sunlight). But the same property is a reliable way to separate fake diamonds from real ones.',
      ar: 'توهج الماس الأزرق ميزة خارج 4C.',
      cite: ['gia-colored-stone'],
    },
    safetyNote: {
      tr: 'UV ışığını asla göze tutma. Cilde uzun süre tutulmaz. Fener karanlık kutunun içinde, kısa süreli kullanılır. Küçük çocuklarda yetişkin denetimi zorunlu.',
      en: 'Never point UV at eyes. Avoid long skin exposure. Keep the flashlight inside the dark box, brief bursts only. Adult supervision required with younger children.',
      ar: 'لا تسلط UV على العين أبداً.',
    },
  },

  // 10. YOĞUNLUK DEDEKTİF
  'yogunluk-dedektif': {
    intro: {
      tr: 'Yoğunluk, gemolojinin en güvenilir testlerinden biridir çünkü renkten, boyuttan, hatta yüzey parlaklığından bağımsızdır. Arşimed\'in M.Ö. 3. yüzyılda bulduğu su yer değiştirme yöntemi, bugün bile değişmemiştir.',
      en: 'Density is one of gemology\'s most reliable tests because it\'s independent of color, size, even surface shine. The water-displacement method Archimedes discovered in the 3rd century BC remains unchanged.',
      ar: 'الكثافة أحد أصدق اختبارات الجيمولوجيا.',
    },
    origin: {
      place: { tr: 'Antik Yunan (Arşimed); modern gemoloji laboratuvarları', en: 'Ancient Greece (Archimedes); modern gemological labs', ar: 'اليونان القديمة، مختبرات حديثة' },
      era: { start: -250, end: null },
    },
    materials: [
      { emoji: '⚖️', name: { tr: 'Dijital hassas tartı (0.01 g)', en: 'Digital scale (0.01 g)', ar: 'ميزان رقمي' } },
      { emoji: '🥛', name: { tr: 'Plastik mezür (50 ml, 100 ml)', en: 'Plastic graduated cylinder', ar: 'مخبار بلاستيكي' } },
      { emoji: '💧', name: { tr: 'Temiz su', en: 'Clean water', ar: 'ماء نظيف' } },
      { emoji: '🪨', name: { tr: 'Taş örnekleri (5-10 g)', en: 'Stone samples (5-10 g)', ar: 'عينات حجرية' } },
      { emoji: '📋', name: { tr: 'Veri tablosu', en: 'Data table', ar: 'جدول بيانات' } },
    ],
    sources: ['gia-colored-stone', 'mindat-database', 'britannica-general'],
    relatedExhibits: ['mohs-skalasi', 'yakut', 'safir', 'pirlanta-nasil-olusur'],
    relatedLabs: ['virtual-gemologist', 'mohs'],
    relatedQuizzes: ['renkli-taslar', 'pirlanta'],
    vocabulary: ['mohs'],
    curatorNote: {
      tr: 'Özgül ağırlık — yoğunluğun sudaki oranı — eğitim dışında "heavy liquid" denen özel sıvılarla yapılır: bromoform, di-iodomethane. Gemolog, taşı sıvıya bırakır; batarsa yoğunluk sıvıdan yüksek, yüzerse düşüktür. Bu "eşik testi" çocuklar için güvenli değildir; su yer değiştirme yöntemi ise eğitimin tam kalbinde durur.',
      en: 'Specific gravity — the water ratio of density — is measured outside classrooms with "heavy liquids" like bromoform or di-iodomethane. The gemologist drops the stone in; if it sinks, density > liquid; if it floats, density < liquid. This threshold test isn\'t safe for children; water displacement sits at the heart of school use.',
      ar: 'الثقل النوعي يُقاس بسوائل خاصة في المختبرات — ليست آمنة للأطفال.',
      cite: ['gia-colored-stone'],
    },
    safetyNote: {
      tr: 'Cam mezür yerine plastik — kırılma riski yok. Su dökülürse havluyla hemen temizle. Tartıyı nemden koru.',
      en: 'Use plastic cylinder instead of glass — no shatter risk. Mop spills with a towel at once. Keep the scale dry.',
      ar: 'مخبار بلاستيكي — لا زجاج.',
    },
  },
};

// ─── Merge helper ─────────────────────────────────────────────
/**
 * Bir atölye kaydını (WorkshopHub'daki workshops array elemanı)
 * enrichment ile birleştir. Enrichment değerleri ÜSTE yazar;
 * mevcut alanlar (id, emoji, tone, title, subtitle, steps) korunur.
 * NOT: Enrichment'ta title/subtitle yok, steps yok — dolayısıyla
 * bunlar güvende kalır.
 */
export function enrichWorkshop(workshop) {
  if (!workshop || !workshop.id) return workshop;
  const extra = workshopEnrichment[workshop.id];
  if (!extra) return workshop;
  return { ...workshop, ...extra };
}

export const workshopEnrichmentCount = Object.keys(workshopEnrichment).length;
