// Dünya Mücevher Haritası verileri
// Basit SVG noktalar üstünde pozisyon + içerik

export const worldPoints = [
  {
    id: 'colombia',
    name: { tr: 'Kolombiya', en: 'Colombia', ar: 'كولومبيا' },
    x: 26, y: 58, // percentage positions on world map
    note: { tr: 'Muzo — dünyanın en iyi zümrütleri', en: 'Muzo — the world\'s finest emeralds', ar: 'أجود زمرد في العالم' },
    emoji: '💚',
  },
  {
    id: 'myanmar',
    name: { tr: 'Myanmar', en: 'Myanmar', ar: 'ميانمار' },
    x: 70, y: 48,
    note: { tr: 'Mogok — güvercin kanı yakut', en: 'Mogok — pigeon blood rubies', ar: 'ياقوت دم الحمام' },
    emoji: '❤️',
  },
  {
    id: 'kashmir',
    name: { tr: 'Keşmir', en: 'Kashmir', ar: 'كشمير' },
    x: 66, y: 42,
    note: { tr: 'Efsanevi "peygamber çiçeği" safirleri', en: 'Legendary cornflower blue sapphires', ar: 'صفير أزرق أسطوري' },
    emoji: '💙',
  },
  {
    id: 'south-africa',
    name: { tr: 'Güney Afrika', en: 'South Africa', ar: 'جنوب أفريقيا' },
    x: 52, y: 80,
    note: { tr: 'Dünya platin rezervinin %75\'i + Cullinan pırlantası', en: '75% of platinum reserves + the Cullinan diamond', ar: '75٪ من البلاتين + ماس كولينان' },
    emoji: '⚪',
  },
  {
    id: 'russia',
    name: { tr: 'Rusya', en: 'Russia', ar: 'روسيا' },
    x: 62, y: 28,
    note: { tr: 'Yakutistan pırlanta madenleri', en: 'Yakutia diamond mines', ar: 'مناجم ماس ياكوتيا' },
    emoji: '💎',
  },
  {
    id: 'egypt',
    name: { tr: 'Mısır', en: 'Egypt', ar: 'مصر' },
    x: 54, y: 48,
    note: { tr: 'Dünyanın en eski altın takıları ve alyansları', en: 'Oldest known gold jewelry and wedding rings', ar: 'أقدم مجوهرات ذهبية' },
    emoji: '🥇',
  },
  {
    id: 'iran',
    name: { tr: 'İran', en: 'Iran', ar: 'إيران' },
    x: 60, y: 45,
    note: { tr: 'Nişabur — 7000 yıllık turkuvaz madenleri', en: 'Nishapur — 7,000-year-old turquoise mines', ar: 'مناجم الفيروز في نيسابور' },
    emoji: '🟦',
  },
  {
    id: 'australia',
    name: { tr: 'Avustralya', en: 'Australia', ar: 'أستراليا' },
    x: 82, y: 78,
    note: { tr: 'Opal: dünyanın %95\'i buradan çıkar', en: 'Opal: 95% of the world\'s supply', ar: 'الأوبال: 95٪ من الإنتاج العالمي' },
    emoji: '🌈',
  },
];

// Türkiye zanaat şehirleri — daha detaylı iç harita
export const turkeyCities = [
  {
    id: 'istanbul',
    name: { tr: 'İstanbul', en: 'Istanbul', ar: 'اسطنبول' },
    x: 30, y: 25,
    crafts: ['Kapalıçarşı', 'Altın bilezik üretimi', 'Kuyumculuk merkezi'],
    emoji: '🏛️',
  },
  {
    id: 'trabzon',
    name: { tr: 'Trabzon', en: 'Trabzon', ar: 'طرابزون' },
    x: 72, y: 28,
    crafts: ['Trabzon Hasırı', 'Kazaz'],
    emoji: '🧶',
  },
  {
    id: 'mardin',
    name: { tr: 'Mardin', en: 'Mardin', ar: 'ماردين' },
    x: 85, y: 70,
    crafts: ['Telkâri (filigran)'],
    emoji: '🕸️',
  },
  {
    id: 'siirt',
    name: { tr: 'Siirt', en: 'Siirt', ar: 'سيرت' },
    x: 88, y: 62,
    crafts: ['Savat (Niello)'],
    emoji: '🖤',
  },
  {
    id: 'eskisehir',
    name: { tr: 'Eskişehir', en: 'Eskişehir', ar: 'إسكي شهير' },
    x: 40, y: 42,
    crafts: ['Lületaşı oymacılığı'],
    emoji: '🤍',
  },
  {
    id: 'usak',
    name: { tr: 'Uşak', en: 'Uşak', ar: 'أوشاك' },
    x: 28, y: 50,
    crafts: ['Lidya altın sikkeleri (M.Ö. 600)'],
    emoji: '🪙',
  },
];
