/**
 * pricing.js — JewelerShop fiyat hesaplama motoru.
 *
 * Bütün fiyatlar TL cinsinden, 2026 başı yaklaşık piyasa değerleri.
 * Pedagojik: gerçek kuyumcu fiyatlarıyla aynı sırayı tutsun istedim
 * ama kayda değer tam rakamlar değil — sezgisel doğru olması yeterli.
 *
 * Bileşenler:
 *   - METAL: saf Au/Ag/Pt gram fiyatı × alaşım saflığı × miktar
 *   - STONE: karat × kalite çarpanı × tür çarpanı
 *   - CUT:   işçilik katsayısı (kesim zorluğuna göre)
 *   - SETTING: montaj malzeme + işçilik (solitaire/halo/trilogy)
 *   - WORKMANSHIP: toplamın %15'i olarak hesaplanır
 */

/* Metal seçenekleri. pricePerGram 2026 referans değerleri. */
export const METALS = [
  {
    id: '22k',  priceBase: 3500, purity: 0.916,
    allergenic: false, tone: '#fde047',
    name:  { tr: '22 Ayar Altın', en: '22k Gold',  ar: 'ذهب 22 قيراط' },
    desc:  { tr: '%91.6 saf altın. Düğün geleneği.', en: '91.6% pure. Wedding tradition.', ar: 'ذهب 91.6%.' },
  },
  {
    id: '18k',  priceBase: 2800, purity: 0.75,
    allergenic: false, tone: '#facc15',
    name:  { tr: '18 Ayar Altın', en: '18k Gold',  ar: 'ذهب 18 قيراط' },
    desc:  { tr: '%75 saf. Daha dayanıklı.', en: '75% pure. More durable.', ar: 'ذهب 75٪ أصلب.' },
  },
  {
    id: '14k',  priceBase: 2200, purity: 0.585,
    allergenic: true, tone: '#f59e0b',  // 14k often has nickel
    name:  { tr: '14 Ayar Altın', en: '14k Gold',  ar: 'ذهب 14 قيراط' },
    desc:  { tr: '%58.5 saf. Uygun fiyatlı, nikel içerebilir.', en: '58.5% pure. Budget-friendly, may contain nickel.', ar: 'ذهب 58.5٪ قد يحتوي نيكل.' },
  },
  {
    id: '925',  priceBase: 40,   purity: 0.925,
    allergenic: false, tone: '#d1d5db',
    name:  { tr: '925 Ayar Gümüş', en: 'Sterling Silver', ar: 'فضة 925' },
    desc:  { tr: '%92.5 saf gümüş.', en: '92.5% pure silver.', ar: 'فضة 92.5٪.' },
  },
  {
    id: 'pt',   priceBase: 3800, purity: 0.95,
    allergenic: false, tone: '#e5e7eb',
    name:  { tr: 'Platin', en: 'Platinum', ar: 'بلاتين' },
    desc:  { tr: '%95 saf. Çok dayanıklı, hipoalerjenik.', en: '95% pure. Very durable, hypoallergenic.', ar: 'بلاتين 95٪.' },
  },
];

/* Stone options — price per carat for average quality. */
export const STONES = [
  {
    id: 'diamond',  icon: 'diamond',  pricePerCarat: 18000,
    classical: true, modern: true,
    name: { tr: 'Pırlanta', en: 'Diamond',  ar: 'ماس' },
  },
  {
    id: 'ruby',     icon: 'ruby',     pricePerCarat: 9000,
    classical: true, modern: false,
    name: { tr: 'Yakut',    en: 'Ruby',     ar: 'ياقوت' },
  },
  {
    id: 'sapphire', icon: 'sapphire', pricePerCarat: 7000,
    classical: true, modern: true,
    name: { tr: 'Safir',    en: 'Sapphire', ar: 'صفير' },
  },
  {
    id: 'emerald',  icon: 'emerald',  pricePerCarat: 6500,
    classical: true, modern: false,
    name: { tr: 'Zümrüt',   en: 'Emerald',  ar: 'زمرد' },
  },
  {
    id: 'amethyst', icon: 'amethyst', pricePerCarat: 600,
    classical: false, modern: true,
    name: { tr: 'Ametist',  en: 'Amethyst', ar: 'جمشت' },
  },
  {
    id: 'garnet',   icon: 'garnet',   pricePerCarat: 800,
    classical: false, modern: true,
    name: { tr: 'Garnet',   en: 'Garnet',   ar: 'غارنت' },
  },
  {
    id: 'turquoise',icon: 'turquoise',pricePerCarat: 400,
    classical: false, modern: true,
    name: { tr: 'Turkuvaz', en: 'Turquoise',ar: 'فيروز' },
  },
];

/* Cut quality — multiplier applied to stone price. */
export const CUTS = [
  { id: 'brilliant', multiplier: 1.25, classical: true,  modern: true,
    name: { tr: 'Brilliant', en: 'Brilliant', ar: 'برلنت' } },
  { id: 'princess',  multiplier: 1.10, classical: false, modern: true,
    name: { tr: 'Princess',  en: 'Princess',  ar: 'أميري' } },
  { id: 'emerald',   multiplier: 1.00, classical: true,  modern: false,
    name: { tr: 'Zümrüt',    en: 'Emerald',   ar: 'زمردي' } },
];

/* Setting — affects metal grams used + workmanship. */
export const SETTINGS = [
  { id: 'solitaire', gramsFactor: 1.0, laborFactor: 1.0, classical: true,  modern: true,
    name: { tr: 'Solitaire (Tek Taş)', en: 'Solitaire', ar: 'حجر منفرد' } },
  { id: 'halo',      gramsFactor: 1.3, laborFactor: 1.35, classical: false, modern: true,
    name: { tr: 'Halo',                en: 'Halo',      ar: 'هالة' } },
  { id: 'trilogy',   gramsFactor: 1.2, laborFactor: 1.25, classical: true,  modern: false,
    name: { tr: 'Trilogy (Üç Taş)',    en: 'Trilogy',   ar: 'ثلاثية' } },
];

/* Carat options user can pick from. */
export const CARATS = [0.25, 0.5, 0.75, 1.0, 1.5, 2.0];

/**
 * Compute full design price.
 *   design = { metalId, stoneId, cutId, settingId, carats }
 * Returns { metalCost, stoneCost, workmanship, total, grams }.
 */
export function calcPrice(design) {
  const metal   = METALS.find((m) => m.id === design.metalId)   || METALS[1];
  const stone   = STONES.find((s) => s.id === design.stoneId)   || STONES[0];
  const cut     = CUTS.find((c)   => c.id === design.cutId)     || CUTS[0];
  const setting = SETTINGS.find((s) => s.id === design.settingId)|| SETTINGS[0];
  const carats  = design.carats ?? 0.5;

  /* Typical ring weight 4g solitaire → scaled by setting. */
  const grams = 4 * setting.gramsFactor;

  const metalCost = metal.priceBase * metal.purity * grams;
  const stoneCost = stone.pricePerCarat * cut.multiplier * carats;
  const base = metalCost + stoneCost;
  const workmanship = Math.round(base * 0.15 * setting.laborFactor);
  const total = Math.round(metalCost + stoneCost + workmanship);

  return {
    metalCost: Math.round(metalCost),
    stoneCost: Math.round(stoneCost),
    workmanship,
    total,
    grams: Math.round(grams * 10) / 10,
  };
}

/**
 * Evaluate a design against a customer brief.
 * Returns { material, design, price, total } each /5, plus overall /15 and
 * a list of {tr,en,ar} notes explaining what worked and what didn't.
 */
export function evaluate(design, customer) {
  const price = calcPrice(design);
  const metal = METALS.find((m) => m.id === design.metalId);
  const stone = STONES.find((s) => s.id === design.stoneId);
  const cut   = CUTS.find((c)   => c.id === design.cutId);
  const setting = SETTINGS.find((s) => s.id === design.settingId);

  /* Material (5 pts): allergy respected, metal tier appropriate. */
  let materialScore = 5;
  const materialNotes = [];
  if (customer.allergy && metal.allergenic) {
    materialScore -= 4;
    materialNotes.push({
      tr: `Müşteri ${metal.name.tr.toLowerCase()} alerjisi bildirmişti — nikel içerebilir.`,
      en: `Customer reported allergy — ${metal.name.en} may contain nickel.`,
      ar: `الزبون لديه حساسية — قد يحوي نيكل.`,
    });
  } else {
    materialNotes.push({
      tr: 'Alerji uygun metal seçildi. 👍',
      en: 'Hypoallergenic metal chosen. 👍',
      ar: 'المعدن آمن للحساسية. 👍',
    });
  }

  /* Design (5 pts): style preference matches. */
  let designScore = 5;
  const designNotes = [];
  const wantsClassical = customer.style === 'classical';
  const stoneMatch = wantsClassical ? stone.classical : stone.modern;
  const cutMatch   = wantsClassical ? cut.classical : cut.modern;
  const setMatch   = wantsClassical ? setting.classical : setting.modern;
  const matches = [stoneMatch, cutMatch, setMatch].filter(Boolean).length;
  if (matches === 3) {
    designNotes.push({
      tr: `Tam ${wantsClassical ? 'klasik' : 'modern'} bir tasarım — istediğim bu! 🌟`,
      en: `Pure ${wantsClassical ? 'classical' : 'modern'} design — just what I wanted! 🌟`,
      ar: `تصميم ${wantsClassical ? 'كلاسيكي' : 'عصري'} مثالي!`,
    });
  } else if (matches === 2) {
    designScore -= 1;
    designNotes.push({
      tr: `İsteğime yakın ama tam değil.`,
      en: `Close to my taste, not quite there.`,
      ar: `قريب من ذوقي لكن ليس تماماً.`,
    });
  } else if (matches === 1) {
    designScore -= 3;
    designNotes.push({
      tr: `Bu tamamen farklı bir stilde...`,
      en: `This is a completely different style...`,
      ar: `هذا طراز مختلف تماماً...`,
    });
  } else {
    designScore -= 5;
    designNotes.push({
      tr: `Ben ${wantsClassical ? 'klasik' : 'modern'} istedim, bu hiç uymuyor.`,
      en: `I asked for ${wantsClassical ? 'classical' : 'modern'} and this doesn't fit at all.`,
      ar: `طلبت ${wantsClassical ? 'كلاسيكي' : 'عصري'} وهذا بعيد تماماً.`,
    });
  }

  /* Price (5 pts): within ±10% of budget = 5, within ±25% = 3, else 0. */
  let priceScore = 0;
  const priceNotes = [];
  const delta = price.total - customer.budget;
  const absPct = Math.abs(delta) / customer.budget;
  if (absPct <= 0.10) {
    priceScore = 5;
    priceNotes.push({
      tr: 'Bütçemde — tam isabet! 💰',
      en: 'Right on budget! 💰',
      ar: 'ضمن ميزانيتي تماماً!',
    });
  } else if (absPct <= 0.25) {
    priceScore = 3;
    priceNotes.push(delta > 0
      ? { tr: 'Biraz pahalı ama... tamam.', en: 'A bit over budget, but ok.', ar: 'أغلى قليلاً لكن مقبول.' }
      : { tr: 'Bütçemin altında — iyi!', en: 'Under budget — nice!', ar: 'أقل من ميزانيتي — ممتاز!' });
  } else if (delta > 0) {
    priceScore = Math.max(0, 5 - Math.round(absPct * 10));
    priceNotes.push({
      tr: `Bütçemin çok üstünde. %${Math.round(absPct * 100)} fazla.`,
      en: `Way over budget — ${Math.round(absPct * 100)}% over.`,
      ar: `أعلى من ميزانيتي بنسبة ${Math.round(absPct * 100)}٪.`,
    });
  } else {
    priceScore = 2;
    priceNotes.push({
      tr: 'Bu kadar ucuz mu? Kalite korkutucu.',
      en: 'That cheap? Makes me worry about quality.',
      ar: 'رخيص جداً — يقلقني!',
    });
  }

  const total = materialScore + designScore + priceScore;
  return {
    material: { score: Math.max(0, materialScore), notes: materialNotes },
    design:   { score: Math.max(0, designScore),   notes: designNotes },
    price:    { score: Math.max(0, priceScore),    notes: priceNotes },
    total: Math.max(0, total),
    computed: price,
  };
}
