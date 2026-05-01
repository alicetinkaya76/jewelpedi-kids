/**
 * geoPoints.js — Faz 6-A
 *
 * Merkezi coğrafi veri tabanı. worldMap.js (%-coord SVG pinler) ve
 * worldOrigins.js (10 taş kökeni) birleştirildi ve ~40 noktaya genişletildi.
 *
 * Faz 6-D'de Leaflet + Protomaps ile haritada render edilir.
 * Mevcut World Tour oyunu (worldOrigins) bu dosyaya göç edecek.
 *
 * Şema:
 *   id          benzersiz kısa kebab-case ID
 *   lat, lng    gerçek coğrafi koordinatlar (dereceler)
 *   kind        'mine' | 'workshop' | 'museum' | 'site' | 'trade-hub' | 'deposit'
 *   name        { tr, en, ar }
 *   place       { tr, en, ar } — "Şehir, Ülke" formatı
 *   stones      ilgili taş/metal ID'leri (opsiyonel)
 *   crafts      ilgili zanaat ID'leri (opsiyonel)
 *   hintRegion  { tr, en, ar } — World Tour "Çırak" zorluk ipucu
 *   fact        { tr, en, ar } — 1-2 cümlelik eğitim notu
 *   exhibitIds  ilgili sergi ID'leri (boş olabilir — crossRefs bunu doldurur)
 *   era         tarihsel aralık (opsiyonel, ör. {start:-4000,end:null})
 *   active      maden/atölye hâlâ faal mi (opsiyonel)
 *
 * NOT: Koordinatlar OpenStreetMap/Wikipedia referansıyla yaklaşık 0.1°
 *      (~11 km) hassasiyette. Harita amaçlı yeterli; bilimsel değildir.
 */

export const geoPoints = [
  // ═══════════════════════════════════════════════════════════════
  // TAŞ KÖKENLERİ — worldOrigins.js'ten taşındı (şema korunarak)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'lapis-afghanistan',
    lat: 36.5, lng: 71.0,
    kind: 'mine',
    name: { tr: 'Sar-i Sang lapis lazuli madeni', en: 'Sar-i Sang lapis lazuli mine', ar: 'منجم لازورد سار-إي-سانغ' },
    place: { tr: 'Badakhşan, Afganistan', en: 'Badakhshan, Afghanistan', ar: 'بدخشان، أفغانستان' },
    stones: ['lapis-lazuli'],
    hintRegion: { tr: 'Orta Asya', en: 'Central Asia', ar: 'آسيا الوسطى' },
    fact: {
      tr: '6000 yıldır aralıksız işletilen dünyanın en eski aktif madeni. Antik Mısır firavunlarının lapisi de buradan geldi.',
      en: 'The oldest continuously-active mine on Earth — 6,000 years. Even Ancient Egyptian pharaohs imported their lapis from here.',
      ar: 'أقدم منجم نشط منذ 6000 عام. حتى فراعنة مصر استوردوا منه.',
    },
    exhibitIds: ['lapis-lazuli'],
    era: { start: -4000, end: null },
    active: true,
  },
  {
    id: 'emerald-colombia',
    lat: 5.5, lng: -74.1,
    kind: 'mine',
    name: { tr: 'Muzo zümrüt madeni', en: 'Muzo emerald mine', ar: 'منجم زمرد موزو' },
    place: { tr: 'Muzo, Kolombiya', en: 'Muzo, Colombia', ar: 'موزو، كولومبيا' },
    stones: ['zumrut'],
    hintRegion: { tr: 'Güney Amerika', en: 'South America', ar: 'أمريكا الجنوبية' },
    fact: {
      tr: 'Dünyanın en değerli zümrütleri. 1537\'den beri işletiliyor. Kolombiya zümrütleri "tropik yeşil" diye bilinir.',
      en: 'The world\'s finest emeralds. Mined since 1537. Colombian emeralds are called "tropical green".',
      ar: 'أجود الزمرد في العالم منذ 1537.',
    },
    exhibitIds: ['zumrut'],
    era: { start: 1537, end: null },
    active: true,
  },
  {
    id: 'sapphire-kashmir',
    lat: 34.1, lng: 77.2,
    kind: 'mine',
    name: { tr: 'Keşmir safir madeni', en: 'Kashmir sapphire mine', ar: 'منجم صفير كشمير' },
    place: { tr: 'Keşmir, Hindistan', en: 'Kashmir, India', ar: 'كشمير، الهند' },
    stones: ['safir'],
    hintRegion: { tr: 'Asya', en: 'Asia', ar: 'آسيا' },
    fact: {
      tr: 'Efsanevi peygamber çiçeği mavisi safirler sadece 1881-1935 arası bu vadide çıkarıldı. Artık tükenmiş sayılıyor.',
      en: 'The legendary cornflower-blue sapphires came only from this valley, 1881-1935. Now considered depleted.',
      ar: 'صفير نادر لا يستخرج إلا من هذه الوادي (1881-1935).',
    },
    exhibitIds: ['safir'],
    era: { start: 1881, end: 1935 },
    active: false,
  },
  {
    id: 'turquoise-nishapur',
    lat: 36.2, lng: 58.8,
    kind: 'mine',
    name: { tr: 'Nişabur turkuvaz madeni', en: 'Nishapur turquoise mine', ar: 'منجم فيروز نيسابور' },
    place: { tr: 'Nişabur, İran', en: 'Nishapur, Iran', ar: 'نيسابور، إيران' },
    stones: ['turkuvaz'],
    hintRegion: { tr: 'Orta Doğu', en: 'Middle East', ar: 'الشرق الأوسط' },
    fact: {
      tr: '7000 yıllık turkuvaz madenleri. "Turkuvaz" kelimesi İran\'dan Avrupa\'ya Türk tacirler aracılığıyla geçtiği için Fransızca "turc"ten gelir.',
      en: '7,000-year-old turquoise mines. The word "turquoise" comes from French "turc" because it reached Europe via Turkish merchants.',
      ar: 'مناجم فيروز عمرها 7000 عام.',
    },
    exhibitIds: ['turkuvaz'],
    era: { start: -5000, end: null },
    active: true,
  },
  {
    id: 'opal-coober-pedy',
    lat: -29.0, lng: 134.75,
    kind: 'mine',
    name: { tr: 'Coober Pedy opal madenleri', en: 'Coober Pedy opal fields', ar: 'حقول أوبال كوبر بيدي' },
    place: { tr: 'Coober Pedy, Avustralya', en: 'Coober Pedy, Australia', ar: 'كوبر بيدي، أستراليا' },
    stones: ['opal'],
    hintRegion: { tr: 'Okyanusya', en: 'Oceania', ar: 'أوقيانوسيا' },
    fact: {
      tr: 'Dünya opal üretiminin %95\'i Avustralya\'dan. Yaz sıcaklığı 45°C; madenciler yeraltı evlerde yaşar.',
      en: '95% of world opal comes from Australia. Summer hits 45°C; miners live in underground homes.',
      ar: '95٪ من الأوبال من أستراليا.',
    },
    exhibitIds: ['opal'],
    era: { start: 1915, end: null },
    active: true,
  },
  {
    id: 'ruby-mogok',
    lat: 22.9, lng: 96.5,
    kind: 'mine',
    name: { tr: 'Mogok güvercin kanı yakut madeni', en: 'Mogok pigeon-blood ruby mine', ar: 'منجم ياقوت موجوك' },
    place: { tr: 'Mogok, Myanmar', en: 'Mogok, Myanmar', ar: 'موجوك، ميانمار' },
    stones: ['yakut'],
    hintRegion: { tr: 'Güneydoğu Asya', en: 'Southeast Asia', ar: 'جنوب شرق آسيا' },
    fact: {
      tr: 'Dünyanın en değerli yakutları. "Güvercin kanı" bu vadiye özgü floresan kırmızı — karanlıkta bile kırmızı parlar.',
      en: 'The world\'s most-prized rubies. "Pigeon-blood" is a fluorescent red unique to this valley.',
      ar: 'أحمر الياقوت الأغلى في العالم.',
    },
    exhibitIds: ['yakut'],
    era: { start: -600, end: null },
    active: true,
  },
  {
    id: 'diamond-kimberley',
    lat: -28.7, lng: 24.8,
    kind: 'mine',
    name: { tr: 'Kimberley pırlanta madeni', en: 'Kimberley diamond mine', ar: 'منجم ماس كيمبرلي' },
    place: { tr: 'Kimberley, Güney Afrika', en: 'Kimberley, South Africa', ar: 'كيمبرلي، جنوب أفريقيا' },
    stones: ['pirlanta'],
    hintRegion: { tr: 'Afrika', en: 'Africa', ar: 'أفريقيا' },
    fact: {
      tr: '"Kimberlit borusu" adını buradan alır. Modern pırlanta endüstrisi 1866\'da burada başladı. 3106 karatlık Cullinan burada bulundu.',
      en: 'The "kimberlite pipe" takes its name from here. Modern diamond industry started 1866. The 3,106-carat Cullinan was found here.',
      ar: 'بدأت صناعة الماس الحديثة هنا عام 1866.',
    },
    exhibitIds: ['cullinan', 'pirlanta-nasil-olusur'],
    era: { start: 1866, end: null },
    active: true,
  },
  {
    id: 'garnet-bohemia',
    lat: 50.0, lng: 14.4,
    kind: 'mine',
    name: { tr: 'Bohemya garnet madenleri', en: 'Bohemian garnet mines', ar: 'مناجم غارنت بوهيميا' },
    place: { tr: 'Bohemya, Çek Cumhuriyeti', en: 'Bohemia, Czech Republic', ar: 'بوهيميا، التشيك' },
    stones: ['garnet'],
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: 'Koyu kırmızı pyrop garnetler. 15. yüzyıldan beri işletilir. Viktorya döneminde İngiltere\'de moda olunca milyonlarca parça ihraç edildi.',
      en: 'Deep-red pyrope garnets, mined since the 15th century. Millions of pieces exported during the Victorian boom.',
      ar: 'غارنت بيروب أحمر غامق منذ القرن 15.',
    },
    exhibitIds: ['garnet'],
    era: { start: 1450, end: null },
    active: true,
  },
  {
    id: 'pearl-bahrain',
    lat: 26.2, lng: 50.6,
    kind: 'site',
    name: { tr: 'Bahreyn inci yatakları', en: 'Bahrain pearl beds', ar: 'مغاصات لؤلؤ البحرين' },
    place: { tr: 'Bahreyn', en: 'Bahrain', ar: 'البحرين' },
    stones: ['inci'],
    hintRegion: { tr: 'Orta Doğu', en: 'Middle East', ar: 'الشرق الأوسط' },
    fact: {
      tr: 'Bahreyn "iki deniz" demektir. 20. yüzyıl başına dek ekonomisi inciye dayalıydı; Japon kültür incisi bu ticareti bitirdi.',
      en: 'Bahrain means "two seas" — historically the pearl island. Its pearl economy collapsed when Japanese cultured pearls emerged.',
      ar: 'كان اقتصاد البحرين قائماً على اللؤلؤ حتى بداية القرن العشرين.',
    },
    exhibitIds: [],
    era: { start: -3000, end: 1930 },
    active: false,
  },
  {
    id: 'amber-baltic',
    lat: 54.7, lng: 20.5,
    kind: 'deposit',
    name: { tr: 'Baltık kehribar yatağı', en: 'Baltic amber deposit', ar: 'ترسبات كهرمان البلطيق' },
    place: { tr: 'Kaliningrad / Baltık kıyısı', en: 'Kaliningrad / Baltic coast', ar: 'ساحل البلطي' },
    stones: ['kehribar'],
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: 'Dünya kehribarının %90\'ı Baltık kıyısından. 50 milyon yıl önce kozalaklı ağaçların sakızı; bazıları fosil böcek içerir.',
      en: '90% of the world\'s amber comes from the Baltic. Fossilized pine resin from 50 million years ago — some contain perfect fossil insects.',
      ar: '90٪ من الكهرمان من ساحل بحر البلطيق.',
    },
    exhibitIds: [],
    era: { start: -50000000, end: null },
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // EK ULUSLARARASI MADENLER / YATAKLAR
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'platinum-bushveld',
    lat: -25.1, lng: 27.2,
    kind: 'mine',
    name: { tr: 'Bushveld platin yatağı', en: 'Bushveld platinum complex', ar: 'مجمع بوشفيلد للبلاتين' },
    place: { tr: 'Bushveld, Güney Afrika', en: 'Bushveld, South Africa', ar: 'بوشفيلد، جنوب أفريقيا' },
    stones: ['platin'],
    hintRegion: { tr: 'Afrika', en: 'Africa', ar: 'أفريقيا' },
    fact: {
      tr: 'Dünya platin rezervinin %75\'i buradadır. Bushveld kompleksi dünyanın en büyük platin grubu metal yatağıdır.',
      en: '75% of world platinum reserves are here. Bushveld is the largest platinum-group-metal deposit on Earth.',
      ar: '75٪ من احتياطي البلاتين العالمي.',
    },
    exhibitIds: ['platin-nedir', 'platin-endustri'],
    active: true,
  },
  {
    id: 'diamond-yakutia',
    lat: 62.6, lng: 113.9,
    kind: 'mine',
    name: { tr: 'Mir pırlanta madeni (Yakutistan)', en: 'Mir diamond mine (Yakutia)', ar: 'منجم مير للماس' },
    place: { tr: 'Mirny, Rusya', en: 'Mirny, Russia', ar: 'ميرني، روسيا' },
    stones: ['pirlanta'],
    hintRegion: { tr: 'Kuzey Asya', en: 'North Asia', ar: 'شمال آسيا' },
    fact: {
      tr: 'Dünyanın ikinci en büyük insan yapımı çukuru. -60°C\'de çalışılan açık ocak pırlanta madeni.',
      en: 'The second-largest human-made hole in the world. An open-pit diamond mine operating at −60°C.',
      ar: 'ثاني أكبر حفرة من صنع الإنسان.',
    },
    exhibitIds: ['pirlanta-nasil-olusur'],
    era: { start: 1955, end: null },
    active: true,
  },
  {
    id: 'gold-witwatersrand',
    lat: -26.2, lng: 28.0,
    kind: 'mine',
    name: { tr: 'Witwatersrand altın havzası', en: 'Witwatersrand gold basin', ar: 'حوض ويتواترسراند' },
    place: { tr: 'Johannesburg, Güney Afrika', en: 'Johannesburg, South Africa', ar: 'جوهانسبرغ، جنوب أفريقيا' },
    stones: ['altin'],
    hintRegion: { tr: 'Afrika', en: 'Africa', ar: 'أفريقيا' },
    fact: {
      tr: 'İnsanlık tarihi boyunca çıkarılan altının yaklaşık %40\'ı bu havzadan geldi. 1886\'da keşfedildi.',
      en: 'About 40% of all gold ever mined in human history came from this basin. Discovered in 1886.',
      ar: 'نحو 40٪ من ذهب التاريخ البشري من هذا الحوض.',
    },
    exhibitIds: ['altin-tarihcesi'],
    era: { start: 1886, end: null },
    active: true,
  },
  {
    id: 'gold-varna',
    lat: 43.2, lng: 27.9,
    kind: 'site',
    name: { tr: 'Varna altın nekropolü', en: 'Varna gold necropolis', ar: 'نيكروبوليس فارنا الذهبي' },
    place: { tr: 'Varna, Bulgaristan', en: 'Varna, Bulgaria', ar: 'فارنا، بلغاريا' },
    stones: ['altin'],
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: 'Bilinen en eski altın takılar burada bulundu. M.Ö. 4500 civarı, 3000+ altın parça 294 mezarda.',
      en: 'The oldest known gold jewelry was found here. Around 4500 BCE, over 3,000 gold objects in 294 graves.',
      ar: 'أقدم مجوهرات ذهبية معروفة (4500 ق.م).',
    },
    exhibitIds: ['altin-tarihcesi'],
    era: { start: -4600, end: -4200 },
    active: false,
  },
  {
    id: 'gold-egypt',
    lat: 25.7, lng: 32.6,
    kind: 'site',
    name: { tr: 'Mısır firavun altın atölyeleri', en: 'Egyptian pharaonic gold workshops', ar: 'ورش الذهب الفرعونية' },
    place: { tr: 'Luksor, Mısır', en: 'Luxor, Egypt', ar: 'الأقصر، مصر' },
    stones: ['altin'],
    hintRegion: { tr: 'Kuzey Afrika', en: 'North Africa', ar: 'شمال أفريقيا' },
    fact: {
      tr: 'Tutankamon\'un altın maskesi (M.Ö. ~1323) 10.23 kg saf altından. Antik Mısır altın işçiliğinin zirvesi.',
      en: 'Tutankhamun\'s gold mask (c. 1323 BCE) is 10.23 kg of pure gold — the peak of Ancient Egyptian goldsmithing.',
      ar: 'قناع توت عنخ آمون الذهبي (1323 ق.م) 10.23 كغ.',
    },
    exhibitIds: ['altin-tarihcesi'],
    era: { start: -3000, end: -30 },
    active: false,
  },
  {
    id: 'lydia-mint',
    lat: 38.5, lng: 28.0,
    kind: 'site',
    name: { tr: 'Lidya elektrum sikkeleri basımevi', en: 'Lydian electrum mint', ar: 'مسكوكات ليديا' },
    place: { tr: 'Sardes, Türkiye', en: 'Sardis, Turkey', ar: 'ساردس، تركيا' },
    stones: ['altin', 'gumus'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: 'M.Ö. ~600\'de dünyanın ilk standart sikkeleri burada basıldı. Elektrum (altın-gümüş doğal alaşımı).',
      en: 'Around 600 BCE the world\'s first standardized coins were minted here. Electrum (natural gold-silver alloy).',
      ar: 'أول عملات معدنية في التاريخ (600 ق.م).',
    },
    exhibitIds: [],
    era: { start: -650, end: -547 },
    active: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // ÜNLÜ MÜZELER (pırlantalar, hazineler)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'smithsonian-dc',
    lat: 38.89, lng: -77.03,
    kind: 'museum',
    name: { tr: 'Smithsonian Doğa Tarihi Müzesi', en: 'Smithsonian Natural History Museum', ar: 'متحف سميثسونيان' },
    place: { tr: 'Washington DC, ABD', en: 'Washington DC, USA', ar: 'واشنطن، الولايات المتحدة' },
    hintRegion: { tr: 'Kuzey Amerika', en: 'North America', ar: 'أمريكا الشمالية' },
    fact: {
      tr: 'Hope pırlantası (45.52 karat mavi) ve 10.000\'den fazla gem örneği burada sergilenir.',
      en: 'The Hope Diamond (45.52-carat blue) and over 10,000 gem specimens are displayed here.',
      ar: 'ماسة الأمل (45.52 قيراط) ومجموعة الأحجار الكريمة.',
    },
    exhibitIds: ['hope-pirlantasi'],
    active: true,
  },
  {
    id: 'tower-of-london',
    lat: 51.508, lng: -0.076,
    kind: 'museum',
    name: { tr: 'Londra Kulesi Mücevher Dairesi', en: 'Tower of London Jewel House', ar: 'دار جواهر التاج' },
    place: { tr: 'Londra, İngiltere', en: 'London, England', ar: 'لندن، إنجلترا' },
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: 'İngiltere Kraliyet mücevherleri — Cullinan I (530.4 karat) ve Koh-i-Noor dahil.',
      en: 'The British Crown Jewels — including Cullinan I (530.4 ct) and the Koh-i-Noor.',
      ar: 'جواهر التاج البريطاني بما فيها كولينان والكوه نور.',
    },
    exhibitIds: ['cullinan', 'koh-i-noor'],
    active: true,
  },
  {
    id: 'topkapi-museum',
    lat: 41.0115, lng: 28.9833,
    kind: 'museum',
    name: { tr: 'Topkapı Sarayı — Hazine-i Hümayun', en: 'Topkapı Palace Treasury', ar: 'خزانة قصر توبكابي' },
    place: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey', ar: 'اسطنبول، تركيا' },
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: 'Kaşıkçı Elması (86 karat), Topkapı Hançeri (3 zümrüt), Osmanlı tahtları — dünyanın en zengin hazine koleksiyonlarından.',
      en: 'Spoonmaker\'s Diamond (86 ct), Topkapı Dagger (3 emeralds), Ottoman thrones — one of the richest treasure collections.',
      ar: 'من أغنى كنوز المتاحف في العالم.',
    },
    exhibitIds: [],
    active: true,
  },
  {
    id: 'green-vault-dresden',
    lat: 51.0526, lng: 13.7373,
    kind: 'museum',
    name: { tr: 'Dresden Yeşil Kasa', en: 'Dresden Green Vault', ar: 'القبو الأخضر في دريسدن' },
    place: { tr: 'Dresden, Almanya', en: 'Dresden, Germany', ar: 'دريسدن، ألمانيا' },
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: 'Avrupa\'nın en eski müzelerinden biri (1723). Dresden Yeşili pırlantası (41 karat) burada sergilenir.',
      en: 'One of Europe\'s oldest museums (1723). Home of the 41-carat Dresden Green diamond.',
      ar: 'أحد أقدم المتاحف الأوروبية (1723).',
    },
    exhibitIds: [],
    active: true,
  },
  {
    id: 'gia-carlsbad',
    lat: 33.13, lng: -117.31,
    kind: 'museum',
    name: { tr: 'GIA Gem Müzesi', en: 'GIA Gem Museum', ar: 'متحف GIA للأحجار الكريمة' },
    place: { tr: 'Carlsbad, California', en: 'Carlsbad, California', ar: 'كارلسباد، كاليفورنيا' },
    hintRegion: { tr: 'Kuzey Amerika', en: 'North America', ar: 'أمريكا الشمالية' },
    fact: {
      tr: 'Dünyanın önde gelen gemoloji enstitüsü. 4C sistemini geliştirdi; pırlanta sertifikaları burada verilir.',
      en: 'The world\'s leading gemological institute. Developed the 4Cs system; certifies diamonds globally.',
      ar: 'أبرز معهد للأحجار الكريمة في العالم.',
    },
    exhibitIds: ['4c-sistemi'],
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // TÜRKİYE — zanaat şehirleri ve tarihî ticaret merkezleri
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'istanbul-kapalicarsi',
    lat: 41.0108, lng: 28.9680,
    kind: 'trade-hub',
    name: { tr: 'Kapalıçarşı', en: 'Grand Bazaar', ar: 'البازار الكبير' },
    place: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey', ar: 'اسطنبول، تركيا' },
    crafts: ['kuyumculuk', 'altin-bilezik'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: '1461\'den beri faal dünyanın en eski kapalı çarşılarından biri. 4000 dükkân, yüzlerce kuyumcu.',
      en: 'One of the world\'s oldest covered markets, active since 1461. 4,000 shops, hundreds of jewelers.',
      ar: 'أقدم أسواق العالم المغطاة (1461).',
    },
    exhibitIds: ['kapalicarsi'],
    era: { start: 1461, end: null },
    active: true,
  },
  {
    // Faz 6-Z: mine atölyesi için dedike workshop-kind nokta.
    // Kapalıçarşı çevresi ve Eyüp tarihi mine/emay atölyelerinin merkeziydi.
    id: 'istanbul-mine',
    lat: 41.0289, lng: 28.9402,  // Eyüp / Kapalıçarşı arası
    kind: 'workshop',
    name: { tr: 'İstanbul Minesi atölyeleri', en: 'Istanbul Enamel workshops', ar: 'ورش مينا إسطنبول' },
    place: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey', ar: 'اسطنبول، تركيا' },
    crafts: ['mine', 'cloisonne'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: 'Bizans döneminden beri süren emay/mine geleneği. Topkapı hazinesi bu tekniğin en güzel örneklerini içerir.',
      en: 'Enamel tradition continuous since the Byzantine era. Topkapı Treasury holds the finest examples.',
      ar: 'تقليد المينا منذ العصر البيزنطي — أجمل أمثلته في طوب قابي.',
    },
    exhibitIds: ['mine'],
    era: { start: 500, end: null },
    active: true,
  },
  {
    id: 'trabzon-hasir',
    lat: 41.0015, lng: 39.7178,
    kind: 'workshop',
    name: { tr: 'Trabzon Hasırı atölyeleri', en: 'Trabzon Hasır workshops', ar: 'ورش حصير طرابزون' },
    place: { tr: 'Trabzon, Türkiye', en: 'Trabzon, Turkey', ar: 'طرابزون، تركيا' },
    crafts: ['trabzon-hasiri', 'kazaz'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: 'Halka halka örülen gümüş tel zanaatı. 2004\'ten beri Türk Patent coğrafi işaret koruması altında.',
      en: 'Silver-wire ring-weaving craft. Protected as Turkish Geographical Indication since 2004.',
      ar: 'حرفة نسج الفضة — محمية بعلامة جغرافية تركية منذ 2004.',
    },
    exhibitIds: ['trabzon-hasiri', 'kazaz'],
    active: true,
  },
  {
    id: 'mardin-telkari',
    lat: 37.3125, lng: 40.7351,
    kind: 'workshop',
    name: { tr: 'Mardin telkâri atölyeleri', en: 'Mardin filigree workshops', ar: 'ورش تلكاري ماردين' },
    place: { tr: 'Mardin, Türkiye', en: 'Mardin, Turkey', ar: 'ماردين، تركيا' },
    crafts: ['telkari'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: 'İnce gümüş telin dantel gibi örüldüğü filigran sanatı. Süryani-Arap-Türk geleneği bir arada.',
      en: 'Fine-silver-wire lacework. Syriac-Arab-Turkish tradition intertwined.',
      ar: 'فن تلكاري بالخيوط الفضية.',
    },
    exhibitIds: ['telkari'],
    active: true,
  },
  {
    id: 'midyat-savat',
    lat: 37.4178, lng: 41.3658,
    kind: 'workshop',
    name: { tr: 'Midyat savat (niello) atölyeleri', en: 'Midyat niello workshops', ar: 'ورش السواد في مدياد' },
    place: { tr: 'Midyat, Türkiye', en: 'Midyat, Turkey', ar: 'مدياد، تركيا' },
    crafts: ['savat'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: 'Gümüş yüzeye siyah alaşım dolgu yapma sanatı. Midyat Süryani ustalarının yüzyıllardır sürdürdüğü teknik.',
      en: 'Black-alloy inlay on silver. Syriac masters of Midyat have practiced it for centuries.',
      ar: 'فن حشو الفضة بسبيكة سوداء.',
    },
    exhibitIds: ['savat'],
    active: true,
  },
  {
    id: 'eskisehir-lutasi',
    lat: 39.7767, lng: 30.5206,
    kind: 'mine',
    name: { tr: 'Eskişehir lületaşı madeni', en: 'Eskişehir meerschaum mine', ar: 'منجم حجر اللول في إسكي شهير' },
    place: { tr: 'Eskişehir, Türkiye', en: 'Eskişehir, Turkey', ar: 'إسكي شهير، تركيا' },
    stones: ['lutasi'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: 'Dünyadaki ticari değer taşıyan tek lületaşı yatağı. Süngersi, suya temasla sertleşen beyaz mineral.',
      en: 'The only commercially-viable meerschaum deposit in the world. Spongy white mineral that hardens when wet.',
      ar: 'الوديعة الوحيدة تجارياً لحجر اللول.',
    },
    exhibitIds: ['eskisehir-lutasi'],
    active: true,
  },
  {
    id: 'sivas-divrigi',
    lat: 39.3733, lng: 38.1186,
    kind: 'site',
    name: { tr: 'Divriği Ulu Camii (UNESCO)', en: 'Divriği Great Mosque (UNESCO)', ar: 'جامع ديفريي الكبير' },
    place: { tr: 'Sivas, Türkiye', en: 'Sivas, Turkey', ar: 'سيواس، تركيا' },
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: '13. yüzyıl Anadolu Selçuklu taş işçiliğinin zirvesi. Mücevher olmasa da kuyumculuktan ilham almış süsleme.',
      en: '13th-century Anatolian Seljuk stone-carving peak. Not jewelry itself, but ornament patterns borrowed from jewelry.',
      ar: 'ذروة الحجر السلجوقي في القرن 13.',
    },
    exhibitIds: [],
    era: { start: 1228, end: null },
    active: true,
  },
  {
    id: 'ankara-darphane',
    lat: 39.9334, lng: 32.8597,
    kind: 'workshop',
    name: { tr: 'Ankara Darphanesi', en: 'Turkish Mint (Ankara)', ar: 'دار سك العملة التركية' },
    place: { tr: 'Ankara, Türkiye', en: 'Ankara, Turkey', ar: 'أنقرة، تركيا' },
    crafts: ['altin-para'],
    hintRegion: { tr: 'Anadolu', en: 'Anatolia', ar: 'الأناضول' },
    fact: {
      tr: '1923\'ten beri Cumhuriyet altınları, çeyrek/yarım/tam basımları burada yapılır.',
      en: 'Since 1923, Republic gold coins (quarter/half/full) have been minted here.',
      ar: 'تُسك الليرات الذهبية منذ 1923.',
    },
    exhibitIds: ['ceyrek-altin', 'tam-altin', 'yarim-altin'],
    era: { start: 1923, end: null },
    active: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // KÜLTÜREL / TARİHÎ KESİŞİMLER
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'cleopatra-mons-smaragdus',
    lat: 25.0, lng: 34.5,
    kind: 'site',
    name: { tr: 'Kleopatra\'nın Zümrüt Madenleri', en: 'Cleopatra\'s Emerald Mines', ar: 'مناجم زمرد كليوباترا' },
    place: { tr: 'Sikait, Mısır Doğu Çölü', en: 'Sikait, Egyptian Eastern Desert', ar: 'سكيت، الصحراء الشرقية' },
    stones: ['zumrut'],
    hintRegion: { tr: 'Kuzey Afrika', en: 'North Africa', ar: 'شمال أفريقيا' },
    fact: {
      tr: '"Mons Smaragdus" — Ptolemaios ve Roma dönemi zümrüt kaynağı. Kolombiya keşfedilene dek Avrupa\'nın tek zümrüdü.',
      en: '"Mons Smaragdus" — emerald source of Ptolemaic and Roman eras. Europe\'s only emerald until Colombia was discovered.',
      ar: 'مصدر الزمرد الوحيد في أوروبا حتى اكتشاف كولومبيا.',
    },
    exhibitIds: ['zumrut'],
    era: { start: -300, end: 400 },
    active: false,
  },
  {
    id: 'golconda-diamonds',
    lat: 17.4, lng: 78.4,
    kind: 'mine',
    name: { tr: 'Golconda pırlanta madenleri', en: 'Golconda diamond mines', ar: 'مناجم جولكوندا' },
    place: { tr: 'Haydarabad, Hindistan', en: 'Hyderabad, India', ar: 'حيدر آباد، الهند' },
    stones: ['pirlanta'],
    hintRegion: { tr: 'Güney Asya', en: 'South Asia', ar: 'جنوب آسيا' },
    fact: {
      tr: 'Koh-i-Noor, Hope, Dresden Yeşili, Orlov — dünyanın en ünlü pırlantalarının çoğu buradan çıktı.',
      en: 'Koh-i-Noor, Hope, Dresden Green, Orlov — most of the world\'s most famous diamonds came from here.',
      ar: 'منبع أشهر الماسات في العالم.',
    },
    exhibitIds: ['koh-i-noor', 'hope-pirlantasi'],
    era: { start: -300, end: 1725 },
    active: false,
  },
  {
    id: 'mycenae-gold',
    lat: 37.7306, lng: 22.7553,
    kind: 'site',
    name: { tr: 'Miken altın maskeleri', en: 'Mycenaean gold masks', ar: 'أقنعة ميسيناي الذهبية' },
    place: { tr: 'Miken, Yunanistan', en: 'Mycenae, Greece', ar: 'ميسيناي، اليونان' },
    stones: ['altin'],
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: '"Agamemnon Maskesi" (M.Ö. ~1550) dahil Bronz Çağı altın işçiliğinin en ünlü örnekleri.',
      en: 'Including the "Mask of Agamemnon" (c. 1550 BCE) — Bronze Age goldsmithing at its most famous.',
      ar: 'قناع أجاممنون (1550 ق.م).',
    },
    exhibitIds: ['altin-tarihcesi'],
    era: { start: -1600, end: -1100 },
    active: false,
  },
  {
    id: 'potosi-silver',
    lat: -19.58, lng: -65.75,
    kind: 'mine',
    name: { tr: 'Potosí gümüş dağı', en: 'Potosí silver mountain', ar: 'جبل الفضة بوتوسي' },
    place: { tr: 'Potosí, Bolivya', en: 'Potosí, Bolivia', ar: 'بوتوسي، بوليفيا' },
    stones: ['gumus'],
    hintRegion: { tr: 'Güney Amerika', en: 'South America', ar: 'أمريكا الجنوبية' },
    fact: {
      tr: 'Cerro Rico ("zengin dağ") — 16-19. yüzyılda İspanyol imparatorluğuna dünya gümüşünün yarısını verdi.',
      en: 'Cerro Rico ("rich mountain") — supplied half the world\'s silver to the Spanish Empire, 16th-19th c.',
      ar: 'نصف فضة العالم للإمبراطورية الإسبانية.',
    },
    exhibitIds: ['925-ayar'],
    era: { start: 1545, end: null },
    active: true,
  },
  {
    id: 'nova-scotia-gold',
    lat: 44.65, lng: -63.57,
    kind: 'mine',
    name: { tr: 'Nova Scotia altın yatakları', en: 'Nova Scotia gold fields', ar: 'حقول ذهب نوفا سكوشا' },
    place: { tr: 'Halifax, Kanada', en: 'Halifax, Canada', ar: 'هاليفاكس، كندا' },
    stones: ['altin'],
    hintRegion: { tr: 'Kuzey Amerika', en: 'North America', ar: 'أمريكا الشمالية' },
    fact: {
      tr: '1858 altına hücumu. Kanada\'nın ilk büyük altın keşfi; endüstriyel altın madenciliğinin başlangıcı.',
      en: 'The 1858 gold rush. Canada\'s first major gold discovery; birth of industrial gold mining.',
      ar: 'هجمة الذهب 1858.',
    },
    exhibitIds: [],
    era: { start: 1858, end: null },
    active: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // ÜNLÜ MÜCEVHER MERKEZLERİ (kesim, ticaret)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'antwerp-diamond',
    lat: 51.2168, lng: 4.4214,
    kind: 'trade-hub',
    name: { tr: 'Antwerp pırlanta merkezi', en: 'Antwerp diamond district', ar: 'حي الماس في أنتويرب' },
    place: { tr: 'Antwerp, Belçika', en: 'Antwerp, Belgium', ar: 'أنتويرب، بلجيكا' },
    stones: ['pirlanta'],
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: 'Dünyanın işlenmiş pırlantasının %84\'ü buradan geçer. 15. yüzyıldan beri pırlanta merkezi.',
      en: '84% of the world\'s rough diamonds pass through here. Diamond hub since the 15th century.',
      ar: 'يمر 84٪ من الماس العالمي من هنا.',
    },
    exhibitIds: ['kesim-sekilleri'],
    era: { start: 1450, end: null },
    active: true,
  },
  {
    id: 'jaipur-gems',
    lat: 26.9124, lng: 75.7873,
    kind: 'trade-hub',
    name: { tr: 'Jaipur renkli taş merkezi', en: 'Jaipur colored-stone hub', ar: 'مركز الأحجار الملونة جايبور' },
    place: { tr: 'Jaipur, Hindistan', en: 'Jaipur, India', ar: 'جايبور، الهند' },
    stones: ['zumrut', 'yakut', 'safir'],
    hintRegion: { tr: 'Güney Asya', en: 'South Asia', ar: 'جنوب آسيا' },
    fact: {
      tr: 'Dünyanın en büyük renkli taş kesim merkezi. Zümrüt ve yakut kesim işçiliğinin %80\'i.',
      en: 'World\'s largest colored-gem cutting hub. 80% of emerald and ruby cutting.',
      ar: 'أكبر مركز قطع الأحجار الملونة.',
    },
    exhibitIds: [],
    active: true,
  },
  {
    id: 'new-york-47th',
    lat: 40.7570, lng: -73.9798,
    kind: 'trade-hub',
    name: { tr: '47. Cadde mücevher bölgesi', en: '47th Street Diamond District', ar: 'حي الماس 47' },
    place: { tr: 'New York, ABD', en: 'New York, USA', ar: 'نيويورك' },
    stones: ['pirlanta'],
    hintRegion: { tr: 'Kuzey Amerika', en: 'North America', ar: 'أمريكا الشمالية' },
    fact: {
      tr: 'Manhattan\'ın pırlanta sokağı. ABD mücevher ticaretinin %90\'ı tek bir blokta.',
      en: 'Manhattan\'s diamond block. 90% of U.S. jewelry trade on one street.',
      ar: 'شارع الماس في مانهاتن.',
    },
    exhibitIds: [],
    active: true,
  },
  {
    id: 'basel-fair',
    lat: 47.5596, lng: 7.5886,
    kind: 'trade-hub',
    name: { tr: 'Basel Saat ve Mücevher Fuarı (tarihi)', en: 'Basel Watch & Jewellery Fair (historic)', ar: 'معرض بازل للساعات والمجوهرات' },
    place: { tr: 'Basel, İsviçre', en: 'Basel, Switzerland', ar: 'بازل، سويسرا' },
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: '1917-2019 arası dünya mücevher endüstrisinin yıllık zirvesi. 2020\'de sona erdi.',
      en: '1917-2019 the annual summit of the world\'s jewelry industry. Ended in 2020.',
      ar: 'قمة المجوهرات السنوية (1917-2019).',
    },
    exhibitIds: [],
    era: { start: 1917, end: 2019 },
    active: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // ZANAAT ATÖLYELERİ (uluslararası)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'florence-ponte-vecchio',
    lat: 43.7680, lng: 11.2531,
    kind: 'workshop',
    name: { tr: 'Ponte Vecchio kuyumcu dükkânları', en: 'Ponte Vecchio jewelers', ar: 'مجوهريو بونتي فيكيو' },
    place: { tr: 'Floransa, İtalya', en: 'Florence, Italy', ar: 'فلورنسا، إيطاليا' },
    crafts: ['kuyumculuk'],
    hintRegion: { tr: 'Avrupa', en: 'Europe', ar: 'أوروبا' },
    fact: {
      tr: '1593\'ten beri aynı köprü üstünde aynı kuyumcu dükkânları. Medici dönemi zanaatının yaşayan kalıntısı.',
      en: 'Same jewelry shops on the same bridge since 1593. Living Medici-era craft.',
      ar: 'مجوهرات على الجسر منذ 1593.',
    },
    exhibitIds: [],
    era: { start: 1593, end: null },
    active: true,
  },
  {
    id: 'cloisonne-beijing',
    lat: 39.9042, lng: 116.4074,
    kind: 'workshop',
    name: { tr: 'Pekin cloisonné (mine) atölyeleri', en: 'Beijing cloisonné workshops', ar: 'ورش المينا البكيني' },
    place: { tr: 'Pekin, Çin', en: 'Beijing, China', ar: 'بكين، الصين' },
    crafts: ['cloisonne'],
    hintRegion: { tr: 'Doğu Asya', en: 'East Asia', ar: 'شرق آسيا' },
    fact: {
      tr: '14. yüzyıldan beri Ming sarayı için üretilen mine işçiliği. Bakır iskelet + telli hücreler + renkli cam eritme.',
      en: 'Enamel craft produced for the Ming court since the 14th century. Copper frame + wire cells + melted colored glass.',
      ar: 'فن المينا منذ عصر مينغ (القرن 14).',
    },
    exhibitIds: [],
    era: { start: 1350, end: null },
    active: true,
  },
];

// ─── Yardımcı erişim fonksiyonları ────────────────────────────

const geoById = Object.fromEntries(geoPoints.map((g) => [g.id, g]));

export function getGeoPoint(id) {
  return geoById[id] || null;
}

export function getGeoByKind(kind) {
  return geoPoints.filter((g) => g.kind === kind);
}

export function getGeoByExhibit(exhibitId) {
  return geoPoints.filter((g) => g.exhibitIds?.includes(exhibitId));
}

export function getGeoByStone(stoneId) {
  return geoPoints.filter((g) => g.stones?.includes(stoneId));
}

export const geoPointCount = geoPoints.length;

// ─── Geriye dönük uyumluluk: World Tour oyunu hâlâ worldOrigins.js kullanıyor.
// 6-D'de Leaflet geçişi sırasında oyun bu dosyaya migrate edilecek. O güne kadar
// bu modül paralel olarak yaşar; veri duplikasyonu bilinçli — hızlı geçiş için.
