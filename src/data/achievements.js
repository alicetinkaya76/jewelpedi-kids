// Başarım rozetleri
// Her rozetin kilidi, Progress context'indeki state'e göre açılır.

export const badges = [
  {
    id: 'first-visit',
    emoji: '🎟️',
    name: { tr: 'İlk Ziyaret', en: 'First Visit', ar: 'الزيارة الأولى' },
    desc: { tr: 'Bir sergi standını ziyaret et.', en: 'Visit one exhibit.', ar: 'زر معرضاً واحداً.' },
    check: (p) => p.visitedExhibits.size >= 1,
  },
  {
    id: 'gold-explorer',
    emoji: '🥇',
    name: { tr: 'Altın Kâşifi', en: 'Gold Explorer', ar: 'مستكشف الذهب' },
    desc: { tr: 'Altın Salonu\'ndaki 3 standı ziyaret et.', en: 'Visit 3 stands in the Gold Hall.', ar: 'زر 3 منصات في قاعة الذهب.' },
    check: (p, ctx) => {
      const ids = ctx.hallExhibitIds.altin || [];
      const hit = ids.filter((id) => p.visitedExhibits.has(id)).length;
      return hit >= 3;
    },
  },
  {
    id: 'stone-scout',
    emoji: '💚',
    name: { tr: 'Taş Gözcüsü', en: 'Stone Scout', ar: 'كشاف الأحجار' },
    desc: { tr: 'Renkli Taşlar Salonu\'ndan 3 stand keşfet.', en: 'Discover 3 stands in the Colored Stones Hall.', ar: 'استكشف 3 من قاعة الأحجار الملونة.' },
    check: (p, ctx) => {
      const ids = ctx.hallExhibitIds['renkli-taslar'] || [];
      return ids.filter((id) => p.visitedExhibits.has(id)).length >= 3;
    },
  },
  {
    id: 'craft-master',
    emoji: '🪡',
    name: { tr: 'Zanaat Ustası', en: 'Craft Master', ar: 'أستاذ الحرف' },
    desc: { tr: 'Türk Zanaatı Salonu\'ndaki tüm standları ziyaret et.', en: 'Visit every stand in the Turkish Craft Hall.', ar: 'زر كل منصات قاعة الحرف.' },
    check: (p, ctx) => {
      const ids = ctx.hallExhibitIds.zanaat || [];
      return ids.length > 0 && ids.every((id) => p.visitedExhibits.has(id));
    },
  },
  {
    id: 'scientist',
    emoji: '🧪',
    name: { tr: 'Bilim İnsanı', en: 'Scientist', ar: 'عالم' },
    desc: { tr: '2 farklı laboratuvar deneyini tamamla.', en: 'Complete 2 lab experiments.', ar: 'أكمل تجربتين.' },
    check: (p) => p.labsCompleted.size >= 2,
  },
  {
    id: 'quiz-apprentice',
    emoji: '⭐',
    name: { tr: 'Quiz Çırağı', en: 'Quiz Apprentice', ar: 'متدرب الاختبار' },
    desc: { tr: 'Bir kategoride en az 3 yıldız kazan.', en: 'Earn at least 3 stars in one category.', ar: 'احصل على 3 نجوم في فئة واحدة.' },
    check: (p) => Object.values(p.quizStars).some((n) => n >= 3),
  },
  {
    id: 'hall-wanderer',
    emoji: '🏛️',
    name: { tr: 'Salon Gezgini', en: 'Hall Wanderer', ar: 'جوّال القاعات' },
    desc: { tr: '5 farklı salonu ziyaret et.', en: 'Visit 5 different halls.', ar: 'زر 5 قاعات مختلفة.' },
    check: (p) => p.visitedHalls.size >= 5,
  },
  {
    id: 'museum-master',
    emoji: '🎓',
    name: { tr: 'Müze Ustası', en: 'Museum Master', ar: 'أستاذ المتحف' },
    desc: { tr: '7 salonun hepsini ve 10 standı ziyaret et.', en: 'Visit all 7 halls and 10 stands.', ar: 'زر كل القاعات و10 منصات.' },
    check: (p) => p.visitedHalls.size >= 7 && p.visitedExhibits.size >= 10,
  },
  /* ─── Oyun rozetleri — Faz 5 ─── */
  {
    id: 'gem-matcher',
    emoji: '💎',
    name: { tr: 'Taş Eşleştirici', en: 'Gem Matcher', ar: 'مطابق الأحجار' },
    desc: {
      tr: 'Taş Eşleştirme oyununda Usta seviyede 500+ puan.',
      en: 'Score 500+ in Gem Match on Master difficulty.',
      ar: 'احرز 500+ في مطابقة الأحجار على مستوى أستاذ.',
    },
    check: (p) => p.badges.has('gem-matcher'),
  },
  {
    id: 'mohs-climber',
    emoji: '⛰️',
    name: { tr: 'Mohs Tırmanıcısı', en: 'Mohs Climber', ar: 'متسلق موس' },
    desc: {
      tr: 'Mohs Merdiveni\'nde Mohs 10 — Elmas seviyesine ulaş.',
      en: 'Reach Mohs 10 — the Diamond tier — in Mohs Climb.',
      ar: 'بلغ موس 10 (الماس) في سلّم موس.',
    },
    check: (p) => p.badges.has('mohs-climber'),
  },
  {
    id: 'time-master',
    emoji: '⏳',
    name: { tr: 'Zaman Ustası', en: 'Time Master', ar: 'أستاذ الزمن' },
    desc: {
      tr: 'Zaman Sıralaması Usta zorlukta 5 turun hepsini mükemmel.',
      en: 'All 5 rounds perfect on Timeline Rush Master.',
      ar: 'كل الجولات الخمس مثالية على مستوى أستاذ.',
    },
    check: (p) => p.badges.has('time-master'),
  },
  {
    id: 'master-jeweler',
    emoji: '💍',
    name: { tr: 'Usta Kuyumcu', en: 'Master Jeweler', ar: 'صائغ ماهر' },
    desc: {
      tr: 'Kuyumcu Atölyesi Usta seviyesinde 5 vardiyayı 75/75 yıldızla bitir.',
      en: 'Clear all 5 shifts at 75/75 stars on Jeweler\'s Shop Master.',
      ar: 'أنهِ 5 ورديات بـ 75/75 نجمة.',
    },
    check: (p) => p.badges.has('master-jeweler'),
  },
  {
    id: 'world-explorer',
    emoji: '🌍',
    name: { tr: 'Dünya Kâşifi', en: 'World Explorer', ar: 'مستكشف عالمي' },
    desc: {
      tr: 'Dünya Turu Usta zorlukta 800+ puan.',
      en: 'Score 800+ on World Tour Master.',
      ar: 'احرز 800+ في جولة العالم على مستوى أستاذ.',
    },
    check: (p) => p.badges.has('world-explorer'),
  },
];

/**
 * Compute which badges are unlocked given progress state.
 * Pass an extra ctx with hallExhibitIds: { hallId: [exhibitId,...] }
 */
export function computeUnlockedBadges(progress, ctx = {}) {
  return badges.filter((b) => {
    try {
      return b.check(progress, ctx);
    } catch (_e) {
      return false;
    }
  });
}
