/*
 * Games metadata registry — Faz 5.
 *
 * Each entry describes a game that lives under /games/:id. The `component`
 * field is a dynamic import function so GamePlay can lazy-load just the
 * active game (keeping initial JS bundle small).
 *
 * All user-facing strings are trilingual { tr, en, ar }.
 */

export const DIFFICULTIES = ['cirak', 'kalfa', 'usta'];

export const DIFFICULTY_LABELS = {
  cirak:  { tr: 'Çırak',   en: 'Apprentice', ar: 'متدرب' },
  kalfa:  { tr: 'Kalfa',   en: 'Journeyman', ar: 'صانع' },
  usta:   { tr: 'Usta',    en: 'Master',     ar: 'أستاذ' },
};

export const games = [
  /* ── 1. Gem Match-3 ────────────────────────────────────────── */
  {
    id: 'gem-match-3',
    genre: 'arcade',
    icon: 'emerald',
    accent: '#27ae60',
    durationMin: 2,
    difficulty: DIFFICULTIES,
    badgeId: 'gem-matcher',
    relatedHall: '/halls/renkli-taslar',
    componentLoader: () => import('../games/GemMatch3.jsx'),
    title: {
      tr: 'Taş Eşleştirme',
      en: 'Gem Match',
      ar: 'مطابقة الأحجار',
    },
    tagline: {
      tr: 'Aynı taşları 3\'lü dizilere getir, süre dolmadan zincir yap.',
      en: 'Line up three or more matching gems before the timer runs out.',
      ar: 'اصطف ثلاث أحجار متماثلة قبل انتهاء الوقت.',
    },
    description: {
      tr: 'Klasik patlamalı bulmacanın mücevher versiyonu. Komşu iki taşı yer değiştir, 3 veya daha fazlasını aynı hizaya getir — patlar. Zincir combo\'ları büyük bonus verir.',
      en: 'The classic cascade puzzle, reimagined with real gems. Swap two neighbors to line up three or more — they burst. Chain combos earn big multipliers.',
      ar: 'لغز التساقط الكلاسيكي مع أحجار حقيقية. بدّل حجرين متجاورين لتصطف ثلاثة أو أكثر — تنفجر. السلاسل تعطي مضاعفات.',
    },
    learningGoals: {
      tr: [
        'Taşların Mohs sertliklerini akıl süzgecinden geçir',
        'Renk ve isim eşleştirmesi (zümrüt/yakut/safir...)',
        'Zincirleme sebep-sonuç düşünmek',
      ],
      en: [
        'Internalize each gem\'s Mohs hardness',
        'Match color to name (emerald/ruby/sapphire...)',
        'Think in chained cause-and-effect',
      ],
      ar: [
        'استيعاب صلابة موس لكل حجر',
        'ربط اللون بالاسم',
        'التفكير في سلاسل السبب والنتيجة',
      ],
    },
  },

  /* ── 2. Mohs Climb ─────────────────────────────────────────── */
  {
    id: 'mohs-climb',
    genre: 'arcade',
    icon: 'diamond',
    accent: '#5dade2',
    durationMin: 3,
    difficulty: DIFFICULTIES,
    badgeId: 'mohs-climber',
    relatedHall: '/lab',
    componentLoader: () => import('../games/MohsClimb.jsx'),
    title: {
      tr: 'Mohs Merdiveni',
      en: 'Mohs Climb',
      ar: 'سلّم موس',
    },
    tagline: {
      tr: 'Talk\'tan Elmas\'a tırman — sadece senden sert minerali yutabilirsin.',
      en: 'Climb from talc to diamond — eat only minerals harder than you.',
      ar: 'تسلّق من التلك إلى الماس — لا تأكل إلا الأصلب.',
    },
    description: {
      tr: 'Ekrandan geçen mineralleri topla. Ama dikkat: sadece senden daha sert olanı yutabilirsin. Yanlış hamle canına mal olur. Mohs 10 — Elmas seviyesine ulaşabilecek misin?',
      en: 'Collect minerals streaming across the screen — but only harder ones. Wrong picks cost a life. Can you reach Mohs 10, the Diamond?',
      ar: 'اجمع المعادن الأصلب فقط. الأخطاء تكلّفك حياة. هل تبلغ الماس (موس 10)؟',
    },
    learningGoals: {
      tr: [
        'Mohs skalası sıralaması (1\'den 10\'a)',
        'Her adımın hangi mineral olduğu',
        'Sertlik ≠ değer (elmas en sert ama en pahalı değil)',
      ],
      en: [
        'Mohs scale ordering (1 through 10)',
        'Which mineral sits at each rung',
        'Hardness ≠ value (diamond is hardest, not costliest)',
      ],
      ar: [
        'ترتيب مقياس موس من 1 إلى 10',
        'أي معدن في كل درجة',
        'الصلابة لا تعني القيمة',
      ],
    },
  },

  /* ── 3. Timeline Rush ──────────────────────────────────────── */
  {
    id: 'timeline-rush',
    genre: 'quiz',
    icon: 'gold-coin',
    accent: '#d4a017',
    durationMin: 2,
    difficulty: DIFFICULTIES,
    badgeId: 'time-master',
    relatedHall: '/timeline',
    componentLoader: () => import('../games/TimelineRush.jsx'),
    title: {
      tr: 'Zaman Sıralaması',
      en: 'Timeline Rush',
      ar: 'سباق الخط الزمني',
    },
    tagline: {
      tr: 'Mücevher tarihinde 5 olay — en eskiden en yeniye sırala.',
      en: '5 events from jewelry history — sort from oldest to newest.',
      ar: '5 أحداث — رتّبها من الأقدم إلى الأحدث.',
    },
    description: {
      tr: 'Karışmış 5 tarihsel olay verilir. Kronolojik sıraya dizmek için üst-alt oklarını kullan. Doğru sıraladığın her olay +10 puan, hızlı bitirirsen süre bonusu.',
      en: 'Five historical events scramble in. Use up/down arrows to arrange them chronologically. +10 points per correct slot, bonus for speed.',
      ar: 'خمسة أحداث مختلطة. رتّبها زمنياً بأزرار أعلى/أسفل. 10 نقاط لكل ترتيب صحيح + مكافأة السرعة.',
    },
    learningGoals: {
      tr: [
        'Mücevher tarihinin büyük dönüm noktaları',
        'Göreli zaman duygusu (MÖ, MS, yüzyıl)',
        'Coğrafya + kronoloji ilişkisi',
      ],
      en: [
        'Major milestones in jewelry history',
        'Relative time sense (BCE, CE, centuries)',
        'Link between geography and chronology',
      ],
      ar: [
        'أبرز محطات تاريخ المجوهرات',
        'الإحساس بالزمن النسبي',
        'الربط بين الجغرافيا والزمن',
      ],
    },
  },

  /* ── 4. Jeweler's Shop ─────────────────────────────────────── */
  {
    id: 'jewelers-shop',
    genre: 'strategy',
    icon: 'ruby',
    accent: '#c0392b',
    durationMin: 4,
    difficulty: DIFFICULTIES,
    badgeId: 'master-jeweler',
    relatedHall: '/halls/altin',
    componentLoader: () => import('../games/JewelerShop.jsx'),
    title: {
      tr: 'Kuyumcu Atölyesi',
      en: 'Jeweler\'s Shop',
      ar: 'ورشة الصائغ',
    },
    tagline: {
      tr: 'Müşteri bir yüzük istiyor — bütçe, alerji, stil. Sen tasarla.',
      en: 'A customer wants a ring — budget, allergy, style. You design it.',
      ar: 'زبون يريد خاتماً — ميزانية، حساسية، ذوق. صمّم له.',
    },
    description: {
      tr: 'Gerçek bir kuyumcu olsaydın nasıl tasarlardın? Müşterinin isteğine göre metal (14k/18k/22k altın, 925 gümüş, platin) ve taş seç. Bütçeyi aşmadan en iyi parçayı çıkar.',
      en: 'Think like a real jeweler. Pick metal (14k/18k/22k gold, sterling, platinum) and stone to match the customer\'s brief — without blowing the budget.',
      ar: 'كأنك صائغ حقيقي: اختر المعدن والحجر ليناسب طلب الزبون دون تجاوز الميزانية.',
    },
    learningGoals: {
      tr: [
        'Altın ayarı (karat) ve gram fiyatı ilişkisi',
        'Taş fiyatlaması: karat × kalite çarpanları',
        'Malzeme-bütçe dengesi kurmak',
      ],
      en: [
        'Karat vs gram price relationship',
        'Gemstone pricing: carat × quality multipliers',
        'Balancing material choice against budget',
      ],
      ar: [
        'العلاقة بين العيار وسعر الغرام',
        'تسعير الأحجار: القيراط × معاملات الجودة',
        'موازنة المواد والميزانية',
      ],
    },
  },

  /* ── 5. World Tour ─────────────────────────────────────────── */
  {
    id: 'world-tour',
    genre: 'quiz',
    icon: 'lapis',
    accent: '#2980b9',
    durationMin: 3,
    difficulty: DIFFICULTIES,
    badgeId: 'world-explorer',
    relatedHall: '/map',
    componentLoader: () => import('../games/WorldTour.jsx'),
    title: {
      tr: 'Dünya Turu',
      en: 'World Tour',
      ar: 'جولة حول العالم',
    },
    tagline: {
      tr: 'Bu taş dünyanın neresinden? Haritada en yakın noktayı tıkla.',
      en: 'Where in the world does this stone come from? Pin the map.',
      ar: 'من أين هذا الحجر؟ حدّد المكان على الخريطة.',
    },
    description: {
      tr: '10 mücevher — 10 köken. Lapis lazuli Afganistan\'da mı, Mısır\'da mı? Muzo zümrütleri Kolombiya\'dan mı? Haritaya tıkla, yakınsan 100p, uzaksan 10p.',
      en: '10 gems — 10 origins. Is lapis lazuli from Afghanistan or Egypt? Are Muzo emeralds Colombian? Click the map — close = 100p, far = 10p.',
      ar: '10 أحجار — 10 مواطن. انقر الخريطة: قريب = 100 نقطة، بعيد = 10.',
    },
    learningGoals: {
      tr: [
        'Dünya madenciliğinin coğrafyası',
        'Taş-ülke eşleştirmesi (safir-Keşmir, turkuvaz-İran...)',
        'Mesafe hesabı sezgisi',
      ],
      en: [
        'Geography of world mining',
        'Stone-country pairings (sapphire-Kashmir, turquoise-Iran...)',
        'Intuition for geographic distance',
      ],
      ar: [
        'جغرافيا التعدين العالمي',
        'الربط بين الحجر والبلد',
        'الحس بالمسافات',
      ],
    },
  },
];

export function getGame(id) {
  return games.find((g) => g.id === id);
}

/* Badges registered by game IDs — consumed by achievements.js. */
export const GAME_BADGE_IDS = games.map((g) => g.badgeId);
