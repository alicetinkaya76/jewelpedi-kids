/**
 * worldOrigins.js — World Tour oyun verisi.
 *
 * Her giriş: bir mücevher/zanaat + gerçek kökeni (lat/lng), trilingual prompt
 * ve eğitim faktı. Gerçek madencilik coğrafyasıyla eşleşmeye çalıştık —
 * Muzo emeralds gerçekten Kolombiya'da, Sar-i Sang lapis'i gerçekten
 * Afganistan'da vb.
 *
 * "prompt" alanı oyunda görünen isim: kısa, görsel, sergiden hatırlanabilir.
 * "hintRegion" zorluk kolaylaştırıcı (Çırak): o kıtayı gösteren yarıküre ipucu.
 */

export const worldOrigins = [
  {
    id: 'lapis-afghanistan',
    prompt:  { tr: 'Sar-i Sang lapis lazuli',    en: 'Sar-i Sang lapis lazuli',     ar: 'لازورد سار-إي-سانغ' },
    lat: 36.5, lng: 71.0,
    place:   { tr: 'Badakhşan, Afganistan',       en: 'Badakhshan, Afghanistan',     ar: 'بدخشان، أفغانستان' },
    hintRegion: { tr: 'Orta Asya',                 en: 'Central Asia',                ar: 'آسيا الوسطى' },
    fact: {
      tr: '6000 yıldır aralıksız işletilen dünya\'nın en eski aktif madeni. Antik Mısır firavunlarının da lapis\'i buradan geldi.',
      en: 'The oldest continuously-active mine on Earth — 6,000 years. Even Ancient Egyptian pharaohs imported their lapis from here.',
      ar: 'أقدم منجم نشط منذ 6000 عام. حتى فراعنة مصر استوردوا منه.',
    },
  },
  {
    id: 'emerald-colombia',
    prompt:  { tr: 'Muzo zümrüdü',                 en: 'Muzo emerald',                ar: 'زمرد موزو' },
    lat: 5.5, lng: -74.1,
    place:   { tr: 'Muzo, Kolombiya',              en: 'Muzo, Colombia',              ar: 'موزو، كولومبيا' },
    hintRegion: { tr: 'Güney Amerika',             en: 'South America',               ar: 'أمريكا الجنوبية' },
    fact: {
      tr: 'Dünya\'nın en değerli zümrütleri. 1537\'den beri işletiliyor. Kolombiya zümrütleri "tropik yeşil" diye bilinir — ötekilerden daha parlak, mavimsi-yeşil.',
      en: 'The world\'s finest emeralds. Mined since 1537. Colombian emeralds are called "tropical green" — brighter, bluer than any other source.',
      ar: 'أجود الزمرد في العالم منذ 1537.',
    },
  },
  {
    id: 'sapphire-kashmir',
    prompt:  { tr: 'Peygamber çiçeği safiri',      en: 'Cornflower blue sapphire',    ar: 'صفير أزهار الذرة' },
    lat: 34.1, lng: 77.2,
    place:   { tr: 'Keşmir, Hindistan',            en: 'Kashmir, India',              ar: 'كشمير، الهند' },
    hintRegion: { tr: 'Asya',                      en: 'Asia',                        ar: 'آسيا' },
    fact: {
      tr: 'Efsanevi peygamber çiçeği mavisi safirler sadece 1881-1935 arası bu vadide çıkarıldı. Artık tükenmiş sayılıyor — mevcut parçalar müze değerinde.',
      en: 'The legendary cornflower-blue sapphires came only from this valley, and only between 1881-1935. Now considered depleted — existing stones are museum-grade.',
      ar: 'صفير نادر لا يستخرج إلا من هذه الوادي (1881-1935).',
    },
  },
  {
    id: 'turquoise-iran',
    prompt:  { tr: 'Nişabur turkuvazı',            en: 'Nishapur turquoise',          ar: 'فيروز نيسابور' },
    lat: 36.2, lng: 58.8,
    place:   { tr: 'Nişabur, İran',                en: 'Nishapur, Iran',              ar: 'نيسابور، إيران' },
    hintRegion: { tr: 'Orta Doğu',                 en: 'Middle East',                 ar: 'الشرق الأوسط' },
    fact: {
      tr: '7000 yıllık turkuvaz madenleri. "Turkuvaz" kelimesi Fransızca "turc" (Türk)\'ten geliyor — İran\'dan Avrupa\'ya Türk tacirlerle geçtiği için.',
      en: '7,000-year-old turquoise mines. The word "turquoise" comes from French "turc" (Turk) — because it reached Europe via Turkish merchants.',
      ar: 'مناجم فيروز عمرها 7000 عام.',
    },
  },
  {
    id: 'opal-australia',
    prompt:  { tr: 'Coober Pedy opali',            en: 'Coober Pedy opal',            ar: 'أوبال كوبر بيدي' },
    lat: -29.0, lng: 134.75,
    place:   { tr: 'Coober Pedy, Avustralya',       en: 'Coober Pedy, Australia',      ar: 'كوبر بيدي، أستراليا' },
    hintRegion: { tr: 'Okyanusya',                 en: 'Oceania',                     ar: 'أوقيانوسيا' },
    fact: {
      tr: 'Dünya\'nın opal üretiminin %95\'i Avustralya\'dan. Coober Pedy\'de yaz sıcaklığı 45°C, bu yüzden madenciler yeraltında evlerde yaşıyor.',
      en: '95% of the world\'s opal comes from Australia. Summer temperatures in Coober Pedy hit 45°C, so miners literally live in underground homes.',
      ar: '95٪ من الأوبال من أستراليا. يعيش العمال تحت الأرض بسبب الحرارة.',
    },
  },
  {
    id: 'ruby-myanmar',
    prompt:  { tr: 'Mogok güvercin kanı yakutu',   en: 'Mogok pigeon-blood ruby',     ar: 'ياقوت دم الحمام' },
    lat: 22.9, lng: 96.5,
    place:   { tr: 'Mogok, Myanmar',               en: 'Mogok, Myanmar',              ar: 'موجوك، ميانمار' },
    hintRegion: { tr: 'Güneydoğu Asya',            en: 'Southeast Asia',              ar: 'جنوب شرق آسيا' },
    fact: {
      tr: 'Dünya\'nın en kırmızı, en değerli yakutları. "Güvercin kanı" bu vadiye özgü floresan kırmızı — karanlıkta bile kırmızı parlar.',
      en: 'The world\'s reddest, most-prized rubies. "Pigeon-blood" is a fluorescent red unique to this valley — they glow red even in the dark.',
      ar: 'أحمر الياقوت الأغلى في العالم؛ يتوهج حتى في الظلام.',
    },
  },
  {
    id: 'diamond-south-africa',
    prompt:  { tr: 'Kimberley pırlantası',          en: 'Kimberley diamond',           ar: 'ماس كيمبرلي' },
    lat: -28.7, lng: 24.8,
    place:   { tr: 'Kimberley, Güney Afrika',       en: 'Kimberley, South Africa',     ar: 'كيمبرلي، جنوب أفريقيا' },
    hintRegion: { tr: 'Afrika',                    en: 'Africa',                      ar: 'أفريقيا' },
    fact: {
      tr: '"Kimberlit borusu" adını buradan alıyor — modern pırlanta endüstrisi 1866\'da burada başladı. 3100 karatlık Cullinan elması burada bulundu.',
      en: 'The term "kimberlite pipe" comes from here — the modern diamond industry started in 1866 at this spot. The 3,100-carat Cullinan was found here.',
      ar: 'مصطلح "كيمبرلي" يعود لهذا المكان؛ صناعة الماس الحديثة بدأت هنا عام 1866.',
    },
  },
  {
    id: 'garnet-bohemia',
    prompt:  { tr: 'Bohem garnet',                 en: 'Bohemian garnet',             ar: 'غارنت بوهيمي' },
    lat: 50.0, lng: 14.4,
    place:   { tr: 'Bohemya, Çek Cumhuriyeti',      en: 'Bohemia, Czech Republic',     ar: 'بوهيميا، التشيك' },
    hintRegion: { tr: 'Avrupa',                    en: 'Europe',                      ar: 'أوروبا' },
    fact: {
      tr: 'Koyu kırmızı pyrop garnetler. 15. yüzyıldan beri işletiliyor. Viktorya döneminde İngiltere\'de moda olunca milyonlarca parça ihraç edildi.',
      en: 'Deep-red pyrope garnets, mined since the 15th century. When they became Victorian-era fashion in Britain, millions of pieces were exported.',
      ar: 'غارنت بيروب أحمر غامق منذ القرن 15.',
    },
  },
  {
    id: 'pearl-bahrain',
    prompt:  { tr: 'Basra körfezi incisi',          en: 'Persian Gulf pearl',          ar: 'لؤلؤ الخليج العربي' },
    lat: 26.2, lng: 50.6,
    place:   { tr: 'Bahreyn',                      en: 'Bahrain',                     ar: 'البحرين' },
    hintRegion: { tr: 'Orta Doğu',                 en: 'Middle East',                 ar: 'الشرق الأوسط' },
    fact: {
      tr: 'Bahreyn "inci adası" demektir. 20. yüzyıl başına dek ekonomisi tamamen inciye dayalıydı; sonra Japon kültür incisi bu ticareti bitirdi.',
      en: 'Bahrain means "two seas" — it was historically the pearl island. Until the early 1900s its entire economy was pearls; then Japanese cultured pearls killed the trade.',
      ar: 'كان اقتصاد البحرين قائماً على اللؤلؤ حتى بداية القرن العشرين.',
    },
  },
  {
    id: 'amber-baltic',
    prompt:  { tr: 'Baltık kehribarı',             en: 'Baltic amber',                ar: 'كهرمان البلطيق' },
    lat: 54.7, lng: 20.5,
    place:   { tr: 'Kaliningrad / Baltık kıyısı',  en: 'Kaliningrad / Baltic coast',  ar: 'ساحل بلطي' },
    hintRegion: { tr: 'Avrupa',                    en: 'Europe',                      ar: 'أوروبا' },
    fact: {
      tr: 'Dünya\'nın kehribarının %90\'ı Baltık kıyısından. 50 milyon yıl önce kozalaklı ağaçların sakızı! Bazıları içinde fosil böcek bulundurur.',
      en: '90% of the world\'s amber comes from the Baltic coast. It\'s fossilized pine resin from 50 million years ago — sometimes containing perfect fossil insects!',
      ar: '90٪ من الكهرمان من ساحل بحر البلطيق — راتنج متحجر عمره 50 مليون سنة.',
    },
  },
];
