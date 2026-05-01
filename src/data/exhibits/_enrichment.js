/**
 * _enrichment.js — Faz 6-A
 *
 * 44 sergi için genişletilmiş alanların merkezi kaydı. Mevcut sergi
 * dosyalarına (altin.js, gumus.js vb.) dokunmak yerine, bu modül
 * ID → yeni alanlar eşlemesi tutar. `index.js` merge eder.
 *
 * Eklenen alanların hiçbiri ZORUNLU değildir — eksik olabilir.
 * UI (Faz 6-B) bu alanları opsiyonel render eder.
 *
 * Şema (yeni alanlar):
 *   specs           — { composition, density, dateRange, ... , cite }
 *   sources         — ['source-id']
 *   comparison      — { withExhibitId, axis, insight }
 *   audioScript     — { tr, en, ar } (60-90sn küratör narration; Faz 7 TTS için hazır)
 *   relatedStories  — ['story-id']
 *   relatedLabs     — ['lab-id']
 *   relatedQuizzes  — ['category-id']
 *   geoPointId      — 'geo-id'  (Faz 6-D harita bağlantısı)
 *   curatorNote     — { tr, en, ar } (kısa "biliyor muydun" kartı için)
 *
 * Kaynakça prensibi (Karar 1 / Minimal):
 *   - specs içindeki sayısal/tarihsel iddialar → sources ile kaynaklanır
 *   - mevcut body metni dokunulmaz, "küratör yorumu" olarak kalır
 */

export const exhibitEnrichment = {
  // ═══════════════════════════════════════════════════════════════
  // ALTIN SALONU
  // ═══════════════════════════════════════════════════════════════
  'ceyrek-altin': {
    specs: {
      weight: '1.75 g',
      purity: '22k / 916‰',
      diameter: '18 mm',
      dateRange: '1923–günümüz',
      mintedAt: 'Ankara Darphanesi',
      cite: ['turkish-mint'],
    },
    sources: ['turkish-mint'],
    comparison: {
      withExhibitId: 'tam-altin',
      axis: 'weight',
      insight: {
        tr: 'Çeyrek tam altının dörtte biri; birim gram fiyatı aynı, pratik değeri daha küçük ve daha hediye-uyumlu.',
        en: 'A quarter weighs one-fourth of a full coin; per-gram price is identical, but it\'s smaller and more giftable.',
        ar: 'ربع الليرة ربع الليرة الكاملة.',
      },
    },
    relatedStories: ['altin-nugget-yolculugu'],
    relatedLabs: ['karat'],
    relatedQuizzes: ['altin'],
    geoPointId: 'ankara-darphane',
    curatorNote: {
      tr: 'Darphane her yıl yaklaşık 2 milyon çeyrek altın basar. Hepsi Türkiye içinde tüketilir.',
      en: 'The Turkish Mint produces about 2 million quarter coins per year — almost all consumed domestically.',
      ar: 'تنتج دار السك نحو مليوني قطعة سنوياً.',
    },
  },

  'tam-altin': {
    specs: {
      weight: '7.2 g',
      purity: '22k / 916‰',
      diameter: '28 mm',
      dateRange: '1923–günümüz',
      mintedAt: 'Ankara Darphanesi',
      cite: ['turkish-mint'],
    },
    sources: ['turkish-mint', 'lbma-gold-standard'],
    audioScript: {
      tr: 'Elinizdeki bu altın sadece bir para değil — 1923\'te, yeni kurulan Cumhuriyet\'in ekonomik kimliğinin bir parçası olarak basılmaya başlandı. 7.2 gram, 22 ayar. Üzerindeki Atatürk portresi 1928\'den bu yana hemen hemen hiç değişmedi. Düğünlerde damat omuzluğu olarak takılır, hediye olarak verilir, birikim olarak saklanır. Dünya altın pazarının genelinde tam altınlar yatırım aracıdır; Türkiye\'de ise hem para, hem hediye, hem hatıra.',
      en: 'This gold is more than a coin — its minting began in 1923 as part of the young Republic\'s economic identity. 7.2 grams, 22 karat. Its Atatürk portrait has barely changed since 1928. It\'s pinned to grooms at weddings, gifted, saved as a store of value. In most of the world, full-gold coins are investment vehicles; in Turkey, they\'re also currency, gift, and heirloom all at once.',
      ar: 'ليست مجرد عملة — بدأ سكها عام 1923 مع الجمهورية الجديدة. 7.2 غرام من عيار 22. تُعلق للعروسين وتُحفظ كتوفير.',
    },
    relatedStories: ['altin-nugget-yolculugu'],
    relatedLabs: ['karat'],
    relatedQuizzes: ['altin'],
    geoPointId: 'ankara-darphane',
  },

  'yarim-altin': {
    specs: {
      weight: '3.6 g',
      purity: '22k / 916‰',
      diameter: '22 mm',
      dateRange: '1923–günümüz',
      mintedAt: 'Ankara Darphanesi',
      cite: ['turkish-mint'],
    },
    sources: ['turkish-mint'],
    comparison: {
      withExhibitId: 'ceyrek-altin',
      axis: 'weight',
      insight: {
        tr: 'Yarım altın, çeyreğin iki katı ağırlık ve değerdedir; aynı ayarda, aynı saflıkta.',
        en: 'A half-gold is twice the weight and value of a quarter — same karat, same purity.',
        ar: 'نصف الليرة يساوي ربعين.',
      },
    },
    relatedQuizzes: ['altin'],
    geoPointId: 'ankara-darphane',
  },

  'bilezik': {
    specs: {
      purity: '22k / 916‰ (Türkiye standardı)',
      density: '17.7 g/cm³',
      hardnessMohs: 3.0,
      cite: ['lbma-gold-standard'],
    },
    sources: ['lbma-gold-standard'],
    relatedStories: ['altin-nugget-yolculugu'],
    relatedLabs: ['karat'],
    relatedQuizzes: ['altin', 'taki'],
    geoPointId: 'istanbul-kapalicarsi',
    curatorNote: {
      tr: 'Türkiye\'de üretilen altın bileziklerin %70\'i Kapalıçarşı atölyelerinden çıkar.',
      en: '70% of Turkish gold bracelets come from Grand Bazaar workshops.',
      ar: '70٪ من الأساور الذهبية من البازار الكبير.',
    },
  },

  'ayar-sistemi': {
    specs: {
      standard24k: '99.9%+ saf altın',
      standard22k: '91.67% altın + bakır/gümüş',
      standard18k: '75.0% altın',
      standard14k: '58.3% altın',
      standard8k: '33.3% altın (AB minimum)',
      cite: ['lbma-gold-standard'],
    },
    sources: ['lbma-gold-standard', 'britannica-general'],
    relatedLabs: ['karat'],
    relatedQuizzes: ['altin'],
    comparison: {
      withExhibitId: 'altin-tarihcesi',
      axis: 'historical',
      insight: {
        tr: 'Ayar sistemi 24 parçaya bölmeye dayanır; bu gelenek Roma döneminden (24 keratia = 1 solidus) kalma.',
        en: 'The karat system is based on 24 parts — a tradition going back to Rome (24 keratia = 1 solidus).',
        ar: 'نظام العيار من 24 جزءاً يعود إلى العصر الروماني.',
      },
    },
  },

  'altin-tarihcesi': {
    specs: {
      earliestJewelry: 'Varna Nekropolü, Bulgaristan, M.Ö. ~4500',
      firstCoins: 'Lidya, M.Ö. ~600',
      tutankhamunMask: '10.23 kg saf altın, M.Ö. ~1323',
      witwatersrandDiscovery: '1886',
      cite: ['usgs-mineral-commodities', 'britannica-general'],
    },
    sources: ['usgs-mineral-commodities', 'britannica-general'],
    audioScript: {
      tr: 'Altının hikâyesi insanlığın yazılı tarihinden daha eski. Bulgaristan\'da Varna nekropolünde, bundan altı bin beş yüz yıl önce, bir adam üç bin parçadan fazla altın takıyla birlikte gömüldü. Altın o tarihten beri sembol: güç, sadakat, ölümsüzlük. Mısır firavunlarının mezarları, Lidyalıların ilk sikkeleri, Medici\'lerin ticareti, Witwatersrand\'ın altına hücumu — hepsi aynı metalin etrafında döner. Bugün çıkarılmış tüm altın yaklaşık 210 bin tondur ve neredeyse tamamı hâlâ dolaşımdadır.',
      en: 'Gold\'s story is older than human writing. In Varna, Bulgaria, 6,500 years ago, a man was buried with over 3,000 pieces of gold. It has been a symbol ever since — power, loyalty, immortality. The tombs of the pharaohs, the first Lydian coins, Medici trade, the Witwatersrand rush: all revolve around the same metal. All the gold ever mined totals about 210,000 tonnes, and almost all of it is still in circulation.',
      ar: 'قصة الذهب أقدم من الكتابة البشرية. نحو 210 آلاف طن استخرجت عبر التاريخ، ولا تزال جميعها متداولة.',
    },
    relatedStories: ['altin-nugget-yolculugu'],
    relatedLabs: ['lydia'],
    relatedQuizzes: ['altin'],
    geoPointId: 'gold-varna',
  },

  // ═══════════════════════════════════════════════════════════════
  // GÜMÜŞ SALONU
  // ═══════════════════════════════════════════════════════════════
  '925-ayar': {
    specs: {
      composition: '92.5% gümüş + 7.5% bakır',
      density: '10.36 g/cm³',
      hardnessMohs: 2.7,
      meltingPoint: '893 °C (alaşım)',
      purityStandard: 'Sterling — 1851 İngiltere Gümüş Damgalama Yasası',
      cite: ['lbma-gold-standard', 'britannica-general'],
    },
    sources: ['lbma-gold-standard', 'britannica-general'],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['gumus'],
    geoPointId: 'potosi-silver',
    curatorNote: {
      tr: 'Saf gümüş (999) çok yumuşaktır, takı olarak işe yaramaz. %7.5 bakır eklemek sertliği ikiye katlar.',
      en: 'Pure silver (999) is too soft to wear. Adding 7.5% copper doubles its hardness.',
      ar: 'الفضة النقية طرية جداً للزينة.',
    },
  },

  'gumus-bakimi': {
    specs: {
      tarnishCause: 'H₂S (hidrojen sülfür) ile reaksiyon → Ag₂S',
      cleaningMethod: 'Aluminyum folyo + sıcak su + sodyum bikarbonat',
      cite: ['britannica-general'],
    },
    sources: ['britannica-general'],
    relatedLabs: ['tarnish'],
    relatedQuizzes: ['gumus'],
  },

  'trabzon-hasiri': {
    specs: {
      origin: 'Trabzon, Türkiye',
      heritage: 'Türk Patent Coğrafi İşaret (2004)',
      technique: 'Halka halka örülmüş gümüş tel',
      unescoStatus: 'UNESCO Somut Olmayan Miras listesinde DEĞİLDİR — koruma ulusal düzeydedir',
      cite: ['turkpatent-gi-trabzon-hasir'],
    },
    sources: ['turkpatent-gi-trabzon-hasir', 'gemsociety-trabzon', 'daily-sabah-trabzon'],
    audioScript: {
      tr: 'Trabzon hasır bileziği, ilk bakışta bir mücevherden çok minyatür bir dokuma gibi görünür. Çünkü öyle: ince gümüş tel, binlerce minik halka haline getirilip tek tek birbirine geçirilir — sonra dikdörtgen yüzey halinde düz tutacak kadar sıkı örülür. Bir usta günde sadece 3-4 santim ilerleyebilir. Bir tek bileklik, nihai cila ve kapatma dahil, bir iki hafta sürer. Tekniğin kökeni Osmanlı dönemine kadar gider ama Trabzon çarşısında kuşaktan kuşağa aktarılmış bir zanaat olarak bugüne ulaşmıştır. 2004\'te Türk Patent ve Marka Kurumu tarafından Coğrafi İşaret olarak tescil edildi — bu, "Trabzon Hasırı" adını sadece belirli bir tekniği uygulayan Trabzonlu ustaların kullanabileceği anlamına gelir. Önemli bir not: bu koruma UNESCO Somut Olmayan Miras listesinden farklıdır; Trabzon Hasırı UNESCO ICH listesinde yer almaz. Sahte değil, seri üretim yok: bir Trabzon hasırı hâlâ elle örülmek zorunda, çünkü makine o kadar küçük halkaları geçiremiyor.',
      en: 'A Trabzon hasır bracelet looks less like jewelry than like miniature textile. That is because it is: fine silver wire is shaped into thousands of tiny rings, interlocked by hand, and woven tightly enough that the surface lies flat. A master weaves only three or four centimeters a day. A single bracelet takes one to two weeks. The tradition dates to the Ottoman period and has been passed down generation to generation in the Trabzon markets. In 2004 it was registered by the Turkish Patent and Trademark Office as a protected Geographical Indication — meaning the name "Trabzon Hasır" may only be used for pieces made with the prescribed technique in Trabzon. Important: this national protection is different from the UNESCO Intangible Cultural Heritage list; Trabzon Hasır is not on the UNESCO ICH list. It cannot be mass-produced — no machine can thread the rings.',
      ar: 'سوار حصير طرابزون مصنوع من آلاف الحلقات الفضية اليدوية. مسجل عام 2004 كعلامة جغرافية تركية محمية. ملاحظة: غير مدرج على قائمة اليونسكو — هذه حماية وطنية.',
    },
    relatedStories: ['trabzon-hasiri-unesco'],
    relatedQuizzes: ['zanaat'],
    geoPointId: 'trabzon-hasir',
    curatorNote: {
      tr: 'Bir ustabaşı günde sadece 3-4 cm hasır örebilir. Bir bileklik tamamlamak 1-2 hafta alır. "Trabzon Hasırı" ismi 2004\'ten beri Türk Patent Coğrafi İşareti ile korunuyor — UNESCO listesinden farklı ama aynı derecede önemli ulusal bir koruma.',
      en: 'A master weaves only 3-4 cm of hasır per day. A single bracelet takes 1-2 weeks. The name "Trabzon Hasır" has been protected since 2004 by a Turkish Geographical Indication — a national protection distinct from, but as meaningful as, UNESCO listing.',
      ar: 'يحتاج السوار إلى أسبوعين من العمل. الاسم محمي منذ 2004 بعلامة جغرافية تركية.',
      cite: ['turkpatent-gi-trabzon-hasir'],
    },
  },

  'telkari': {
    specs: {
      origin: 'Mardin, Türkiye',
      wireGauge: '0.2 mm (insan saçı inceliğinde)',
      technique: 'Bükülüp dantel gibi örülmüş gümüş tel',
      protection: 'Türk Patent Coğrafi İşaret — Midyat Telkâri (2013)',
      unescoStatus: 'UNESCO Somut Olmayan Miras listesinde DEĞİLDİR — koruma ulusal düzeydedir',
      cite: ['turkpatent-gi-midyat-telkari'],
    },
    sources: ['turkpatent-gi-midyat-telkari'],
    audioScript: {
      tr: 'Telkâri, kelime olarak Farsça "tel kâri" yani "tel işi" anlamına gelir. Mardin, Midyat ve çevresinde yüzyıllardır yapılan bir zanaattır. Usta, 0.2 milimetre — yani insan saçı inceliğinde — gümüş teli alır, bunu çift büker, sonra çekiçleyerek düzleştirir. Bu tel daha sonra dantel gibi bükülür, kıvrılır, gümüş bir çerçevenin içine yerleştirilir ve çok düşük ısıda lehimlenir. Asıl hüner lehimlemede: ısı bir saniye fazla olursa bütün dantel erir ve parça çöpe gider. Mardin\'de bir usta bu zanaatı çıraklıkla, yıllar içinde öğrenir — ne bir okul kitabı, ne bir kısa yol vardır. 2013\'te "Midyat Telkâri" Türk Patent tarafından Coğrafi İşaret olarak tescillendi; bu isim sadece bölgede, tanımlı teknikle üretildiğinde kullanılabilir. Bu koruma UNESCO Somut Olmayan Miras listesinden farklıdır; Telkâri UNESCO listesinde yer almaz, ulusal bir coğrafi işaret korumasına sahiptir.',
      en: 'Telkari comes from the Persian "wire work." The craft has thrived in Mardin and Midyat for centuries. A master takes silver wire just 0.2 millimeters thick — the thinness of a human hair — twists it, flattens it, then bends it like lace inside a silver frame and solders it at low heat. The real skill is the soldering: a second too long and the whole lacework melts. A Mardin master learns the craft only through years of apprenticeship — there is no textbook, no shortcut. In 2013 "Midyat Telkâri" was registered by the Turkish Patent Office as a protected Geographical Indication; the name can only be used for pieces made with the defined technique in the defined region. This protection is distinct from UNESCO Intangible Cultural Heritage listing — Telkâri is not on the UNESCO list; it holds a national-level GI protection.',
      ar: 'التلكاري حرفة فضية من ماردين. الأسلاك بسمك 0.2 مم. مسجل عام 2013 كعلامة جغرافية تركية باسم "ميديات تلكاري". غير مدرج على قائمة اليونسكو — حماية وطنية.',
    },
    relatedStories: ['mardinli-telkari-ustasi-ayse'],
    relatedQuizzes: ['zanaat'],
    geoPointId: 'mardin-telkari',
  },

  // ═══════════════════════════════════════════════════════════════
  // PIRLANTA SALONU
  // ═══════════════════════════════════════════════════════════════
  '4c-sistemi': {
    specs: {
      developedBy: 'GIA (Gemological Institute of America)',
      developedYear: 1953,
      criteria: 'Carat (ağırlık), Color (renk), Clarity (berraklık), Cut (kesim)',
      cite: ['gia-diamond-grading'],
    },
    sources: ['gia-diamond-grading'],
    relatedLabs: ['light'],
    relatedQuizzes: ['pirlanta'],
    geoPointId: 'gia-carlsbad',
    curatorNote: {
      tr: 'Richard Liddicoat, GIA\'nın 4C sistemini 1953\'te ortaya koymadan önce, pırlanta değerlendirmesi "güzel", "parlak" gibi subjektif kelimelerle yapılıyordu.',
      en: 'Before Richard Liddicoat introduced GIA\'s 4Cs in 1953, diamonds were graded with subjective words like "nice" or "brilliant."',
      ar: 'قبل 1953 كان تقييم الماس بكلمات ذاتية.',
    },
  },

  'kesim-sekilleri': {
    specs: {
      brilliantFacetCount: '58 (57 + culet)',
      brilliantDesigner: 'Marcel Tolkowsky',
      brilliantYear: 1919,
      brilliantTableSize: '53% çapın',
      brilliantCrownAngle: '34.5°',
      brilliantPavilionAngle: '40.75°',
      cite: ['tolkowsky-1919', 'gia-diamond-grading'],
    },
    sources: ['tolkowsky-1919', 'gia-diamond-grading'],
    relatedLabs: ['light'],
    relatedQuizzes: ['pirlanta'],
    geoPointId: 'antwerp-diamond',
    audioScript: {
      tr: 'Bir pırlantayı güzel yapan nedir? Boyut değil — ışık. 1919\'da Belçikalı bir matematik öğrencisi, Marcel Tolkowsky, Londra Üniversitesi\'nde doktora tezinde bu soruyu matematikle çözdü. Yuvarlak bir pırlantanın üst açısı 34.5 derece, alt açısı 40.75 derece olmalıydı. Masa, çapın yüzde 53\'ü. Bu oranlarla kesilen bir taş, üstten giren ışığı neredeyse kayıpsız tekrar üstten geri yollar. 58 yüzey. Yüz yıldan fazladır standart bu.',
      en: 'What makes a diamond beautiful? Not size — light. In 1919, a Belgian math student named Marcel Tolkowsky solved this with equations in his PhD thesis at the University of London. The crown angle should be 34.5°, the pavilion 40.75°, the table 53% of the diameter. Cut to these numbers, a stone returns light almost losslessly. 58 facets. It\'s been the standard for over a century.',
      ar: 'في 1919 حسب مارسيل تولكوفسكي القطع المثالي للماس: 58 وجهاً، زاوية 34.5° و40.75°.',
    },
  },

  'pirlanta-nasil-olusur': {
    specs: {
      depth: '150-200 km (mantoda)',
      pressure: '4.5-6 GPa (~50.000 atmosfer)',
      temperature: '900-1300 °C',
      ageRange: '1-3.5 milyar yıl',
      transport: 'Kimberlit boruları (volkanik patlama)',
      cite: ['usgs-mineral-commodities', 'britannica-general'],
    },
    sources: ['usgs-mineral-commodities', 'britannica-general'],
    relatedStories: ['pirlantanin-3-milyar-yili'],
    relatedLabs: ['mohs'],
    relatedQuizzes: ['pirlanta'],
    geoPointId: 'diamond-kimberley',
  },

  'lab-pirlantasi': {
    specs: {
      method1: 'HPHT (Yüksek Basınç Yüksek Sıcaklık)',
      method2: 'CVD (Kimyasal Buhar Biriktirme)',
      firstSynthesis: 'General Electric, 1954',
      currentMarketShare: '~%20 (2024 itibarıyla)',
      cite: ['usgs-mineral-commodities'],
    },
    sources: ['usgs-mineral-commodities', 'gia-diamond-grading'],
    relatedQuizzes: ['pirlanta'],
    curatorNote: {
      tr: 'Lab pırlantası ile doğal pırlanta fiziksel olarak aynıdır. Fark sadece menşe — ve günümüzde fiyat (%60-80 daha ucuz).',
      en: 'Lab and natural diamonds are physically identical. The only differences are origin and price (lab is 60-80% cheaper today).',
      ar: 'الماس المصنع مطابق للطبيعي فيزيائياً.',
    },
  },

  'cullinan': {
    specs: {
      roughWeight: '3106 karat (621.2 g)',
      foundYear: 1905,
      foundLocation: 'Premier Mine, Güney Afrika',
      finder: 'Frederick Wells',
      cullinanI: '530.4 karat (Afrika\'nın Büyük Yıldızı)',
      cullinanII: '317.4 karat',
      totalFragments: '9 büyük + 96 küçük parça',
      cite: ['royal-cullinan'],
    },
    sources: ['royal-cullinan'],
    audioScript: {
      tr: 'Cullinan pırlantası, bugüne kadar bulunmuş en büyük gem-kalite ham pırlantadır: 3106 karat, yani 621 gram — bir çay bardağı ağırlığında. 1905\'te Güney Afrika\'daki Premier Madeni\'nde, yüzeye yakın bulundu; madencilerden Frederick Wells onu yüzeyde bir çakmak taşı sanmış. Öyle büyüktü ki hiç kimse kendinden emin olamadı. Transvaal hükümeti taşı İngiltere\'ye, Kral Edward VII\'ye doğum günü hediyesi olarak gönderdi. Amsterdam\'daki Asscher kardeşlere kesim için teslim edildi: Joseph Asscher ilk denemede bıçağını kırdı, ikinci denemede taş ikiye ayrıldı ve ünlü efsaneye göre Asscher bayıldı. Sonunda 9 büyük parçaya ayrıldı. En büyüğü, 530.4 karatlık Cullinan I, İngiliz Kraliyet Asa\'sında yerini aldı ve bugün Londra Kulesi\'nde sergileniyor.',
      en: 'The Cullinan is the largest gem-quality rough diamond ever found: 3106 carats, about 621 grams — the weight of a mug of tea. It was discovered in 1905 at the Premier Mine in South Africa, near the surface; the foreman, Frederick Wells, first mistook it for a piece of glass planted as a prank. The Transvaal government sent it to King Edward VII as a birthday gift. In Amsterdam, Joseph Asscher broke his blade on the first cleaving attempt. On the second, the stone split — and legend says Asscher fainted. It yielded nine major stones. The largest, Cullinan I at 530.4 carats, sits in the British Sovereign\'s Sceptre in the Tower of London.',
      ar: 'ألماسة كولينان هي الأكبر التي وُجدت: 3106 قيراطاً. اكتُشفت 1905 في جنوب أفريقيا، وهي اليوم في الصولجان الملكي البريطاني.',
    },
    relatedQuizzes: ['pirlanta'],
    geoPointId: 'tower-of-london',
    curatorNote: {
      tr: 'Cullinan I\'i kesen usta Joseph Asscher, ilk denemede bıçağını kırdı. İkinci denemede taş ikiye ayrıldı — ve Asscher bayıldı.',
      en: 'Joseph Asscher broke his blade on the first attempt to cleave Cullinan I. On the second try, the stone split — and Asscher fainted.',
      ar: 'كسر الحرفي أدواته في المحاولة الأولى.',
    },
  },

  'hope-pirlantasi': {
    specs: {
      weight: '45.52 karat',
      color: 'Fancy Deep Greyish Blue',
      fluorescence: 'Kırmızı UV floresansı (10-20 saniye)',
      origin: 'Golconda, Hindistan (muhtemelen)',
      currentLocation: 'Smithsonian, Washington DC',
      cite: ['smithsonian-hope'],
    },
    sources: ['smithsonian-hope'],
    audioScript: {
      tr: 'Hope pırlantası 45.52 karatlık derin gri-mavi bir taştır. Rengini veren bor atomlarıdır — pırlanta içindeki bir kafes kusuruyla birlikte ışığı emip bu olağanüstü maviyi yansıtır. En ilginç özelliği, UV ışık altında on saniye boyunca kırmızı parlamasıdır; bu özellik, taşın imzası gibidir. Muhtemelen 17. yüzyılda Hindistan\'ın Golconda bölgesinden Fransa\'ya getirildi; kralların arasında el değiştirdi, defalarca çalındı, defalarca yeniden kesildi. "Lanetli" olduğuna dair hikâyeler çoğunlukla Lordlar ve reklamcıların ürettiği efsanelerdir. Bugün Washington\'da Smithsonian Ulusal Doğal Tarih Müzesi\'nin daimi sergisindedir — ve dünyada en çok ziyaret edilen müze nesnelerinden biridir.',
      en: 'The Hope Diamond is a 45.52-carat deep greyish-blue stone. Its color comes from boron atoms trapped in the crystal lattice. Its signature trait: it glows red under UV light for about ten seconds afterward. It likely came from the Golconda region of India in the 17th century, passed through French kings, was stolen and recut several times. Tales of a "curse" are largely myths spun by later owners and the press. Today it sits in the Smithsonian in Washington — one of the most visited single museum objects in the world.',
      ar: 'ألماسة هوب 45.52 قيراطاً، أزرق عميق. من غولكوندا في الهند، ومعروضة في سميثسونيان.',
    },
    relatedQuizzes: ['pirlanta'],
    geoPointId: 'smithsonian-dc',
  },

  'koh-i-noor': {
    specs: {
      currentWeight: '105.6 karat',
      originalWeight: '186 karat (1852 öncesi)',
      origin: 'Golconda (Kollur), Hindistan',
      currentLocation: 'Londra Kulesi, Kraliçe Ana\'nın tacı',
      disputedClaim: 'Hindistan, Pakistan, İran, Afganistan talep ediyor',
      cite: ['royal-cullinan'],
    },
    sources: ['royal-cullinan'],
    audioScript: {
      tr: 'Koh-i-Noor, Farsça "Işık Dağı" demektir. Bugün 105.6 karat, ama 1852\'de yeniden kesilmeden önce 186 karattı — yani orijinalinin yarısını kaybetti. Hindistan\'ın Golconda bölgesinden, Kollur madenlerinden çıktığı düşünülüyor. Hint hükümdarlarının, Moğol imparatorlarının, Fars şahlarının, Afgan emirlerinin elinden geçti; sonunda 1849\'da İngiliz Doğu Hindistan Şirketi tarafından Kraliçe Victoria\'ya sunuldu. Bugün Londra Kulesi\'nde, Kraliçe Ana\'nın tacında sergileniyor. Dört ülke — Hindistan, Pakistan, İran ve Afganistan — taşın iadesini talep ediyor. Bu yüzden Koh-i-Noor, bir mücevher olduğu kadar, tarihte kimin kime ait olduğunu sorgulayan açık bir dava.',
      en: 'Koh-i-Noor means "Mountain of Light" in Persian. It weighs 105.6 carats today, but before being recut in 1852 it was 186 — it lost almost half its original mass. It likely came from the Kollur mines in Golconda, India. It passed through Mughal emperors, Persian shahs, Afghan amirs, and was finally handed to Queen Victoria in 1849 by the British East India Company. It now sits in the Tower of London, mounted in the Queen Mother\'s crown. Four countries — India, Pakistan, Iran, and Afghanistan — have formally requested its return. The diamond is as much a diplomatic question as it is a gem.',
      ar: 'كوه نور يعني "جبل النور". من غولكوندا في الهند، وهو اليوم في تاج الملكة الأم في لندن.',
    },
    relatedQuizzes: ['pirlanta'],
    geoPointId: 'tower-of-london',
  },

  // ═══════════════════════════════════════════════════════════════
  // RENKLİ TAŞLAR SALONU
  // ═══════════════════════════════════════════════════════════════
  'zumrut': {
    specs: {
      formula: 'Be₃Al₂(SiO₃)₆ + Cr (beryl ailesi)',
      hardnessMohs: 7.5,
      refractiveIndex: '1.576-1.582',
      density: '2.72 g/cm³',
      crystalSystem: 'Hekzagonal',
      topSource: 'Muzo, Kolombiya',
      cite: ['mindat-database', 'gia-colored-stone'],
    },
    sources: ['mindat-database', 'gia-colored-stone'],
    audioScript: {
      tr: 'Elinizde zümrüt varsa, onun yeşilini bu kadar canlı yapan şey: birkaç krom ya da vanadyum atomu. Beryl ailesine ait bu taş, saf olduğunda renksizdir; ama kristal büyürken oraya giren minik metaller, ışığı emip size bu olağanüstü yeşili geri yansıtır. Mohs skalasında 7.5 sertliğinde — yüzüğe takılabilir ama kolay kırılır, çünkü içinde çoğu zaman mikro çatlaklar olur. Bugün en kaliteli zümrütlerin çoğu Kolombiya\'nın Muzo bölgesinden gelir. Ama zümrüt tarihi çok daha eskidir: Mısır\'da Kleopatra kendi adına madenler işletmiş, zümrüdü taç, yüzük, hatta süs kutusu olarak hediye etmiştir. Yeşil, o zaman da şimdi de, soyluluğun ve yeniden doğumun rengiydi.',
      en: 'The vivid green of an emerald comes from just a few atoms of chromium or vanadium locked into a beryl crystal. Pure beryl is colorless — but when tiny metals enter during growth, they absorb light and send back this remarkable green. At Mohs 7.5 it can be set in a ring, but it\'s fragile: most emeralds carry microscopic fractures. The finest stones today come from Muzo, Colombia. But emerald\'s story is far older: in ancient Egypt, Cleopatra operated mines bearing her name and gave emeralds as gifts of state. Green meant royalty and rebirth then — and still does.',
      ar: 'اللون الأخضر للزمرد يأتي من ذرات الكروم. 7.5 على مقياس موس. أجود الأحجار من كولومبيا، وتاريخه يمتد إلى كليوباترا.',
    },
    relatedStories: ['kleopatra-zumrut'],
    relatedLabs: ['mohs'],
    relatedQuizzes: ['renkli-taslar'],
    geoPointId: 'emerald-colombia',
  },

  'yakut': {
    specs: {
      formula: 'Al₂O₃ + Cr (korund ailesi)',
      hardnessMohs: 9.0,
      refractiveIndex: '1.762-1.770',
      density: '4.00 g/cm³',
      crystalSystem: 'Trigonal',
      topSource: 'Mogok, Myanmar',
      priceRecord: 'Sunrise Ruby, 25.59 ct, $30.3M (2015)',
      cite: ['mindat-database', 'gia-colored-stone'],
    },
    sources: ['mindat-database', 'gia-colored-stone'],
    audioScript: {
      tr: 'Yakut ve safir aslında aynı mineraldir: korund. Ama içine bir iz miktarda krom girerse, kristal kırmızıya boyanır ve yakut olur. Demir ve titanyum girerse mavi — yani safir. Sadece rengi değiştiren birkaç atom yüzünden birine kraliçe, diğerine prenses denir. Yakut, Mohs skalasında 9 sertliğindedir; sadece pırlanta ondan daha serttir. En değerli yakutlar Myanmar\'ın Mogok vadisinden çıkar; "güvercin kanı" denilen hafif mavimsi-kırmızı tonlar rekor fiyatlara satılır. 2015\'te Sunrise Ruby denilen 25.59 karatlık bir yakut açık artırmada 30.3 milyon dolara gitti. Bir kırmızı taşa bu kadar değer biçmenin arkasında sadece nadirlik değil, bir de insanlığın binlerce yıllık tutkusu var.',
      en: 'Rubies and sapphires are the same mineral — corundum. A trace of chromium turns the crystal red, and it becomes a ruby. Iron and titanium turn it blue — sapphire. A handful of atoms makes the difference. Ruby sits at Mohs 9, second only to diamond. The finest stones come from the Mogok Valley in Myanmar; the "pigeon blood" tones fetch record prices. In 2015 the Sunrise Ruby, at 25.59 carats, sold at auction for $30.3 million. The price reflects not just rarity — it reflects thousands of years of human obsession with red.',
      ar: 'الياقوت والياقوت الأزرق من نفس المعدن: الكوراندوم. الكروم يجعله أحمر، والحديد يجعله أزرق. الأفضل من موغوك في ميانمار.',
    },
    relatedLabs: ['mohs', 'guess'],
    relatedQuizzes: ['renkli-taslar'],
    geoPointId: 'ruby-mogok',
  },

  'safir': {
    specs: {
      formula: 'Al₂O₃ + Fe/Ti (korund ailesi)',
      hardnessMohs: 9.0,
      refractiveIndex: '1.762-1.770',
      density: '4.00 g/cm³',
      crystalSystem: 'Trigonal',
      legendarySource: 'Keşmir (1881-1935)',
      cite: ['mindat-database', 'gia-colored-stone'],
    },
    sources: ['mindat-database', 'gia-colored-stone'],
    audioScript: {
      tr: 'Safir denince çoğumuz mavi düşünürüz — ama aslında safir korundun mavi dışındaki her rengidir: sarı, pembe, mor, yeşil, hatta renksiz. Kırmızı olursa adı yakut olur, bu yüzden "bütün renklerde safir, tek renkte yakut" denir. Mohs skalasında 9 sertlikte — pırlantadan sonra en sert ikinci taştır. En efsanevi safir kaynağı Keşmir\'dir: Himalayalar\'da 4500 metre yüksekte, sadece 1881 ile 1935 arasında aktif olarak çıkarıldı. O madenden çıkan koyu mavi, "kadife mavisi" denilen eşsiz tonuyla bilinir ve açık artırmalarda hâlâ rekor fiyatlar görür. İngiltere kraliyet ailesinin nişan yüzüklerinde tekrar tekrar safir tercih edilmesi tesadüf değil: ortaçağ inancına göre safir dürüstlüğü simgeler.',
      en: 'Most people picture sapphire as blue — but sapphire is any color of corundum except red. Yellow, pink, violet, green, even colorless. When it\'s red, it\'s called ruby. At Mohs 9 it\'s the second hardest gem after diamond. The most legendary source is Kashmir: high in the Himalayas, mined actively only between 1881 and 1935. Its "velvet blue" still fetches record prices at auction. British royal engagement rings have favored sapphires for a reason — in medieval tradition, sapphire stood for honesty.',
      ar: 'الصفير يأتي بكل ألوان الكوراندوم ما عدا الأحمر. 9 على مقياس موس. كشمير هو المصدر الأسطوري.',
    },
    relatedLabs: ['mohs'],
    relatedQuizzes: ['renkli-taslar'],
    geoPointId: 'sapphire-kashmir',
    comparison: {
      withExhibitId: 'yakut',
      axis: 'rarity',
      insight: {
        tr: 'Yakut ve safir kimyasal olarak aynı mineraldir (korund). Fark sadece eser element: krom yakut, demir+titanyum safir yapar.',
        en: 'Ruby and sapphire are the same mineral (corundum). The only difference is trace element: chromium → ruby, iron+titanium → sapphire.',
        ar: 'الياقوت والصفير نفس المعدن (كوروند).',
      },
    },
  },

  'turkuvaz': {
    specs: {
      formula: 'CuAl₆(PO₄)₄(OH)₈·4H₂O',
      hardnessMohs: 5.5,
      density: '2.76 g/cm³',
      crystalSystem: 'Triklinik',
      topSource: 'Nişabur, İran (7000 yıl)',
      etymology: 'Fransızca "turc" (Türk) — Türk tacirler aracılığıyla Avrupa\'ya ulaştığı için',
      cite: ['mindat-database', 'etymonline'],
    },
    sources: ['mindat-database', 'etymonline'],
    relatedQuizzes: ['renkli-taslar'],
    geoPointId: 'turquoise-nishapur',
  },

  'mohs-skalasi': {
    specs: {
      developer: 'Friedrich Mohs',
      year: 1812,
      publication: 'Versuch einer Elementar-Methode...',
      city: 'Graz, Avusturya',
      range: '1 (talk) — 10 (elmas)',
      note: 'Doğrusal değil — elmas (10) korundtan (9) ~4× daha sert (mutlak ölçümde)',
      cite: ['mohs-1812', 'britannica-mohs'],
    },
    sources: ['mohs-1812', 'britannica-mohs'],
    relatedLabs: ['mohs'],
    relatedQuizzes: ['renkli-taslar'],
    audioScript: {
      tr: '1812. Graz şehri, Avusturya. Alman mineralog Friedrich Mohs yeni işe başladığı müzede binlerce mineral parçasıyla karşılaşır. Her biri farklı — ama nasıl sıralanacak? Mohs\'un çözümü basit: bir mineral diğerini çizebiliyorsa ondan serttir. On referans mineral seçer: talk, alçıtaşı, kalsit, florit, apatit, ortoklaz, kuvars, topaz, korund, elmas. Bugün hâlâ jeoloji öğrencilerinin cebinde bu on mineralden örnekler taşır. İki yüzyıl sonra, bilimin en basit ve en uzun ömürlü araçlarından biri.',
      en: '1812, Graz, Austria. German mineralogist Friedrich Mohs starts at a museum and faces thousands of mineral pieces. All different — how to rank them? His answer is simple: if one mineral scratches another, it\'s harder. Ten reference minerals: talc, gypsum, calcite, fluorite, apatite, orthoclase, quartz, topaz, corundum, diamond. Geology students still carry these ten in their pockets today. Two centuries later, still one of the simplest and most enduring tools in science.',
      ar: 'في 1812 بغراتس، صمم فريدريش موس مقياس الصلابة من 1 إلى 10.',
    },
  },

  'ametist': {
    specs: {
      formula: 'SiO₂ (kuvars ailesi) + Fe eser',
      hardnessMohs: 7.0,
      density: '2.65 g/cm³',
      color: 'Mor — demir iyonlarının radyasyon etkisiyle',
      etymology: 'Yunanca "amethystos" (sarhoş etmeyen) — mor rengin şarap kokusunu bastırdığına inanılıyordu',
      cite: ['mindat-database', 'etymonline'],
    },
    sources: ['mindat-database', 'etymonline'],
    relatedQuizzes: ['renkli-taslar'],
  },

  'akuamarin': {
    specs: {
      formula: 'Be₃Al₂(SiO₃)₆ + Fe (beryl ailesi)',
      hardnessMohs: 7.5,
      density: '2.72 g/cm³',
      color: 'Açık mavi — demir iyonları',
      etymology: 'Latince "aqua marina" (deniz suyu)',
      topSource: 'Minas Gerais, Brezilya',
      cite: ['mindat-database', 'etymonline'],
    },
    sources: ['mindat-database', 'etymonline'],
    relatedQuizzes: ['renkli-taslar'],
  },

  'lapis-lazuli': {
    specs: {
      formula: 'Lazurit + kalsit + pirit (metamorfik kayaç)',
      hardnessMohs: 5.5,
      density: '2.70-2.90 g/cm³',
      topSource: 'Sar-i Sang, Afganistan (6000 yıl)',
      historicUse: 'Rönesans\'ta "ultramarin" boyasının kaynağı (altından pahalı)',
      cite: ['mindat-database', 'britannica-general'],
    },
    sources: ['mindat-database', 'britannica-general'],
    relatedQuizzes: ['renkli-taslar'],
    geoPointId: 'lapis-afghanistan',
    curatorNote: {
      tr: 'Vermeer\'in "İnci Küpeli Kız" tablosundaki mavi başörtüsü, Afganistan\'dan getirilen lapis lazuli\'den yapılmış ultramarin boyaydı.',
      en: 'The blue headscarf in Vermeer\'s "Girl with a Pearl Earring" was ultramarine paint, made from lapis lazuli shipped from Afghanistan.',
      ar: 'لوحة فيرمير تستخدم لازورد أفغاني.',
    },
  },

  'opal': {
    specs: {
      formula: 'SiO₂·nH₂O (su içerir)',
      hardnessMohs: 5.5,
      density: '2.10 g/cm³',
      topSource: 'Coober Pedy, Avustralya (%95)',
      opticalEffect: 'Oyun-renk (play-of-color) — ışığın silisyum kürecikleri arasında kırılması',
      cite: ['mindat-database', 'gia-colored-stone'],
    },
    sources: ['mindat-database', 'gia-colored-stone'],
    relatedQuizzes: ['renkli-taslar'],
    geoPointId: 'opal-coober-pedy',
  },

  'tourmaline': {
    specs: {
      formula: 'Karmaşık borosilikat (11 farklı tür)',
      hardnessMohs: 7.5,
      density: '3.06 g/cm³',
      specialProperty: 'Piezoelektrik + piroelektrik (ısıtılınca/baskıda elektrik üretir)',
      topSource: 'Minas Gerais, Brezilya',
      cite: ['mindat-database'],
    },
    sources: ['mindat-database'],
    relatedQuizzes: ['renkli-taslar'],
  },

  'topaz': {
    specs: {
      formula: 'Al₂SiO₄(F,OH)₂',
      hardnessMohs: 8.0,
      density: '3.53 g/cm³',
      crystalSystem: 'Ortorombik',
      famousSpecimen: 'El Dorado Topaz (31.000+ karat)',
      cite: ['mindat-database'],
    },
    sources: ['mindat-database'],
    relatedQuizzes: ['renkli-taslar'],
  },

  'peridot': {
    specs: {
      formula: '(Mg,Fe)₂SiO₄ (olivin ailesi)',
      hardnessMohs: 6.5,
      density: '3.34 g/cm³',
      specialOrigin: 'Meteorlarda da bulunur (pallasit)',
      topSource: 'Zabargad Adası, Mısır (M.Ö. 1500\'den beri)',
      cite: ['mindat-database', 'gia-colored-stone'],
    },
    sources: ['mindat-database', 'gia-colored-stone'],
    relatedQuizzes: ['renkli-taslar'],
  },

  'garnet': {
    specs: {
      formula: 'X₃Y₂(SiO₄)₃ (6 ana tür)',
      hardnessMohs: 7.5,
      density: '3.5-4.3 g/cm³',
      topSource: 'Bohemya (pyrop), Tanzanya (tsavorit)',
      cite: ['mindat-database'],
    },
    sources: ['mindat-database'],
    relatedQuizzes: ['renkli-taslar'],
    geoPointId: 'garnet-bohemia',
  },

  // ═══════════════════════════════════════════════════════════════
  // PLATİN SALONU
  // ═══════════════════════════════════════════════════════════════
  'platin-nedir': {
    specs: {
      symbol: 'Pt',
      atomicNumber: 78,
      density: '21.45 g/cm³',
      meltingPoint: '1768 °C',
      hardnessMohs: 4.3,
      purityStandard: '95% (pm950) — mücevher için',
      topSource: 'Bushveld, Güney Afrika (%75)',
      cite: ['rsc-platinum', 'usgs-mineral-commodities'],
    },
    sources: ['rsc-platinum', 'usgs-mineral-commodities'],
    audioScript: {
      tr: 'Platin, periyodik tabloda 78 numara, sembolü Pt. Kelime İspanyolca "platina" yani "küçük gümüş" demek; 16. yüzyılda Güney Amerika\'da altın madencileri bu gri-beyaz metali gördüklerinde, gümüşe benzettikleri için onu istemedikleri, hatta "olgunlaşmamış altın" sanıp yere attıkları söylenir. Oysa platin, bildiğimiz en dayanıklı ve en yoğun değerli metallerden biridir: 21.45 gram santimetreküp — yani aynı boyutta bir platin yüzük, aynı altın yüzükten neredeyse %10 daha ağırdır. 1768 santigrat derecede erir; altının 1064 derecesinden çok daha yüksek. Bu yüzden platin işçiliği altın işçiliğinden daha zordur, daha özel ekipman ister. Bugün dünya platin üretiminin yaklaşık dörtte üçü Güney Afrika\'nın Bushveld bölgesinden gelir. Mücevherde genellikle %95 saflıkta — yani "pm950" damgasıyla — kullanılır.',
      en: 'Platinum is element 78 on the periodic table — symbol Pt. The name comes from the Spanish "platina," meaning "little silver." In the 16th century South American gold miners encountered the grey-white metal and dismissed it as unripe gold. But platinum is one of the toughest, densest precious metals we know: 21.45 grams per cubic centimeter — a platinum ring weighs almost ten percent more than the same gold ring. It melts at 1,768°C, far higher than gold\'s 1,064°C, which makes platinum jewelry harder to work and requires specialized equipment. Roughly three quarters of the world\'s platinum comes from the Bushveld Complex in South Africa. In jewelry it is usually 95% pure — stamped "pm950."',
      ar: 'البلاتين عنصر رقم 78، رمزه Pt. أثقل وأصعب تشكيلاً من الذهب، وينصهر عند 1768 درجة. ثلاثة أرباع الإنتاج العالمي من جنوب أفريقيا.',
    },
    relatedLabs: ['melt'],
    relatedQuizzes: ['platin'],
    geoPointId: 'platinum-bushveld',
  },

  'platin-vs-altin': {
    comparison: {
      withExhibitId: 'ayar-sistemi',
      axis: 'purity',
      insight: {
        tr: 'Platin mücevherde %95 saftır; altın en fazla %91.6 (22 ayar). Platin daha yoğun (21.45 vs 19.3 g/cm³), aynı yüzüğün kütlesi %40 fazla.',
        en: 'Platinum jewelry is 95% pure; gold is max 91.6% (22k). Platinum is denser (21.45 vs 19.3 g/cm³), so the same ring is 40% heavier.',
        ar: 'البلاتين أنقى وأثقل من الذهب.',
      },
    },
    specs: {
      platinumDensity: '21.45 g/cm³',
      goldDensity: '19.32 g/cm³',
      platinumHardness: '4.3 Mohs',
      goldHardness: '2.5-3.0 Mohs',
      cite: ['rsc-platinum'],
    },
    sources: ['rsc-platinum', 'britannica-general'],
    relatedLabs: ['karat'],
    relatedQuizzes: ['platin'],
  },

  'platin-tarihi': {
    specs: {
      firstEuropeanRecord: 'Antonio de Ulloa, 1735 (Kolombiya)',
      firstIndustrialUse: 'Fabergé (1900\'ler)',
      cartierDedication: '1896 — Louis Cartier platini mücevher metali olarak konumlandırdı',
      cite: ['rsc-platinum', 'britannica-general'],
    },
    sources: ['rsc-platinum', 'britannica-general'],
    relatedQuizzes: ['platin'],
  },

  'platin-endustri': {
    specs: {
      catalyticConverterUse: 'Dünya platin talebinin ~%40\'ı',
      jewelryUse: '~%30',
      otherIndustrial: '~%30 (kimya, elektronik, tıp)',
      cite: ['usgs-mineral-commodities'],
    },
    sources: ['usgs-mineral-commodities'],
    relatedQuizzes: ['platin'],
    geoPointId: 'platinum-bushveld',
    curatorNote: {
      tr: 'Yüzüğünüzdeki platin, bir arabanın katalitik konvertöründeki platinle aynı. Aynı maden, farklı iş.',
      en: 'The platinum in your ring is identical to the platinum in a car\'s catalytic converter. Same mine, different job.',
      ar: 'نفس المعدن للمجوهرات والمحولات الحفازة.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // TAKI SALONU
  // ═══════════════════════════════════════════════════════════════
  'yuzuk': {
    specs: {
      oldestKnownRing: 'Mısır, M.Ö. ~3000 (saz halkası)',
      weddingRingOrigin: 'Antik Roma — iuris vinculum (hukuk bağı)',
      diamondRingFirstUse: '1477 — Avusturya Arşidükü Maximilian\'dan Burgonyalı Mary\'ye',
      cite: ['britannica-general'],
    },
    sources: ['britannica-general', 'gia-colored-stone'],
    relatedQuizzes: ['taki'],
  },

  'kolye': {
    specs: {
      oldestKnownNecklace: '75.000 yıl (Blombos Mağarası, Güney Afrika — deniz kabuğu)',
      goldNecklaceAntiquity: 'Varna, M.Ö. ~4500',
      cite: ['britannica-general'],
    },
    sources: ['britannica-general'],
    relatedQuizzes: ['taki'],
  },

  'kupe': {
    specs: {
      earliestKnown: 'Ur kraliyet mezarları, M.Ö. ~2500 (altın halka küpeler)',
      cite: ['britannica-general'],
    },
    sources: ['britannica-general'],
    relatedQuizzes: ['taki'],
  },

  'brosh': {
    specs: {
      ancientPurpose: 'Kıyafet sabitleyici (Roma fibulae, Kelt pinleri)',
      decorativeShift: 'Orta Çağ\'dan sonra yalnızca süsleme',
      cite: ['britannica-general'],
    },
    sources: ['britannica-general'],
    relatedQuizzes: ['taki'],
  },

  'tac': {
    specs: {
      oldestExistingCrown: 'Demir Taç (İtalya, 6-9. yy)',
      britishCrownJewels: 'Londra Kulesi\'nde — 140+ parça',
      cite: ['royal-cullinan'],
    },
    sources: ['royal-cullinan'],
    relatedQuizzes: ['taki'],
    geoPointId: 'tower-of-london',
  },

  // ═══════════════════════════════════════════════════════════════
  // ZANAAT SALONU
  // ═══════════════════════════════════════════════════════════════
  'savat': {
    specs: {
      origin: 'Midyat, Türkiye (Süryani geleneği)',
      composition: 'Gümüş + bakır + kurşun + kükürt (siyah alaşım)',
      technique: 'Oyulmuş gümüş yüzeye siyah alaşım dolgu + ısıl işlem',
      protection: 'Türk Patent Coğrafi İşaret — Siirt Savatı (2019)',
      cite: ['turkpatent-gi-siirt-savat'],
    },
    sources: ['turkpatent-gi-siirt-savat'],
    relatedQuizzes: ['zanaat'],
    geoPointId: 'midyat-savat',
  },

  'kapalicarsi': {
    specs: {
      builtYear: 1461,
      builder: 'Fatih Sultan Mehmed',
      shopCount: '~4000 dükkân',
      jewelryShops: '~1000 kuyumcu/altıncı',
      annualVisitors: '~100 milyon (COVID öncesi)',
      cite: ['britannica-general'],
    },
    sources: ['britannica-general'],
    audioScript: {
      tr: 'Kapalıçarşı, 1461\'de Fatih Sultan Mehmed\'in emriyle inşa edilmeye başlandı. Başlangıçta iki küçük bedestenden — Cevahir Bedesteni ve Sandal Bedesteni — ibaretti; zamanla etrafı kubbeli sokaklarla örüldü ve bugünkü devasa labirent ortaya çıktı. Bugün yaklaşık 4000 dükkânı ve 60\'tan fazla sokağı var. Yalnızca kuyumcu ve altıncı sayısı binin üzerinde. Türkiye\'de üretilen altın bileziklerin yaklaşık yüzde yetmişi buradaki atölyelerden çıkıyor; yani elinizdeki "Kapalıçarşı\'dan alınmış" etiketinin ardında gerçek bir coğrafi gerçeklik var. COVID öncesi çarşıyı yıllık yaklaşık 100 milyon kişi ziyaret ediyordu; bu, dünyada en çok ziyaret edilen kapalı alanlardan biri olma anlamına geliyor. Bir kuyumcu dükkânı, babasından, dedesinden, büyük dedesinden devralmış olabilir — çarşıda üçüncü, dördüncü kuşak esnaf hâlâ yaygın.',
      en: 'Construction of the Grand Bazaar began in 1461 by order of Sultan Mehmed the Conqueror. It started as two small bedestens — Cevahir and Sandal — and was slowly wrapped in domed streets to become today\'s vast labyrinth. It has roughly 4,000 shops along more than 60 streets, of which over a thousand are jewelers and goldsmiths. About seventy percent of Turkey\'s gold bracelets are made in these workshops, so a "from the Grand Bazaar" label carries real geographic meaning. Before 2020 it welcomed about 100 million visitors a year — among the most visited covered spaces on Earth. Third- and fourth-generation shopkeepers are still the norm.',
      ar: 'البازار الكبير بُني عام 1461 في عهد السلطان محمد الفاتح. يحوي نحو 4000 محل، منها أكثر من 1000 صائغ.',
    },
    relatedQuizzes: ['zanaat'],
    geoPointId: 'istanbul-kapalicarsi',
  },

  'kazaz': {
    specs: {
      origin: 'Trabzon, Türkiye',
      technique: 'İplik sarılmış gümüş + dokuma tezgâhında örüm',
      status: 'Yok olma tehlikesinde olan zanaat — ulusal destekle korunuyor',
      cite: ['gemsociety-trabzon'],
    },
    sources: ['gemsociety-trabzon', 'turkpatent-gi-trabzon-hasir'],
    relatedQuizzes: ['zanaat'],
    geoPointId: 'trabzon-hasir',
  },

  'mine': {
    specs: {
      techniqueName: 'Mine (cloisonné, champlevé, plique-à-jour)',
      materials: 'Bakır/gümüş + cam tozu + 800°C fırın',
      byzantineOrigin: 'İstanbul, 10-12. yüzyıl',
      cite: ['britannica-general'],
    },
    sources: ['britannica-general'],
    relatedQuizzes: ['zanaat'],
    geoPointId: 'cloisonne-beijing',
  },

  'eskisehir-lutasi': {
    specs: {
      mineralName: 'Sepiyolit (magnezyum silikat)',
      formula: 'Mg₄Si₆O₁₅(OH)₂·6H₂O',
      hardnessMohs: 2.0,
      density: '2.0 g/cm³ (kuru)',
      uniqueProperty: 'Dünyada ticari olarak çıkarılan tek yatak',
      cite: ['mindat-database'],
    },
    sources: ['mindat-database'],
    relatedQuizzes: ['zanaat'],
    geoPointId: 'eskisehir-lutasi',
    curatorNote: {
      tr: 'Lületaşı kuruduğunda sertleşir. Yeni çıkarıldığında bir sabun kadar yumuşaktır; sanatçı o aşamada keser.',
      en: 'Meerschaum hardens as it dries. Fresh from the mine, it\'s soft as soap; the carver works it at that stage.',
      ar: 'يصبح حجر اللول صلباً بعد الجفاف.',
    },
  },
};

// ─── Merge helper ─────────────────────────────────────────────
/**
 * Bir sergi objesini enrichment ile birleştir. Enrichment değerleri ÜSTE yazar
 * (override). Mevcut alanlar (örn. Phase 2 gallery/timeline) korunur.
 */
export function enrichExhibit(exhibit) {
  if (!exhibit || !exhibit.id) return exhibit;
  const extra = exhibitEnrichment[exhibit.id];
  if (!extra) return exhibit;

  // specs zaten varsa, merge et (yeni alanlar eski üzerine biner)
  const mergedSpecs = exhibit.specs || extra.specs
    ? { ...exhibit.specs, ...(extra.specs || {}) }
    : undefined;

  return {
    ...exhibit,
    ...extra,
    ...(mergedSpecs ? { specs: mergedSpecs } : {}),
  };
}

export const enrichmentCount = Object.keys(exhibitEnrichment).length;
