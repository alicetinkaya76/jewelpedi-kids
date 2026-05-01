/**
 * imageCredits.js — Faz 7
 *
 * Görsel/medya atıf sistemi. Raporun 6.1 bölümüne göre:
 *   "Her fotoğraf için lisans tek tek doğrulanmalı. CC BY / CC BY-SA
 *    görsellerde kullanıcıya görünür attribution kartı gerekir;
 *    CC0/public domain görseller öğretmen PDF'lerinde daha rahat
 *    kullanılabilir."
 *
 * Şema:
 *   id:            benzersiz slug (genelde exhibit id + "-1", "-hero", "-thumb")
 *   exhibitId:     ilgili sergi/içerik id (opsiyonel)
 *   kind:          'photo' | 'diagram' | 'illustration' | 'video' | 'audio'
 *   license:       'CC0' | 'CC-BY-4.0' | 'CC-BY-SA-4.0' | 'CC-BY-SA-3.0' |
 *                  'PD' (public domain) | 'fair-use-educational' | 'original'
 *   creator:       string (yazar/fotoğrafçı/kurum) — CC BY için zorunlu
 *   source:        kurum/site ismi (ör. 'Wikimedia Commons', 'Smithsonian Open Access')
 *   sourceUrl:     doğrulanmış URL
 *   retrievedAt:   ISO tarihi (yyyy-mm-dd)
 *   requiresAttribution:  boolean — UI'da kredi kartı zorunlu mu?
 *   alt:           { tr, en, ar } — erişilebilirlik için alt metin
 *   caption:       { tr, en, ar } — opsiyonel açıklayıcı altyazı
 *   filePath:      opsiyonel — indirilmiş halde /public/media/... yolu
 *   status:        'pending-verification' | 'verified' | 'rejected' | 'licensed'
 *                   — ilk sürümde çoğu "pending-verification" olur.
 *   notes:         opsiyonel iç not (UI'da gösterilmez)
 *
 * GÜVENLİK KURALLARI
 *   - URL uydurma kesinlikle YASAK. Web search ile doğrulanmış olmalı.
 *   - CC BY / CC BY-SA görseller için requiresAttribution = true.
 *   - Çocuk yüzü görülüyorsa veli sözleşmesi olmadan kullanılamaz.
 *   - Gerçek ustaların yüzü görünen fotoğraflar için usta onayı gerekir.
 *   - Fair use iddiaları yalnızca eğitim ve eleştiri amaçlı; ticari
 *     kullanımda hukukçu onayı.
 *
 * ROADMAP (raporun 6.1 listesi):
 *   Her kayıt "pending-verification" ile başlar; görsel indirilip
 *   /public/media/exhibits/{hallId}/{exhibitId}-hero-1600.webp yoluna
 *   konulduğunda status = 'verified' yapılır ve filePath doldurulur.
 */

export const imageCredits = [
  // ═══════════════════════════════════════════════════════════════
  // ALTIN SALONU
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'altin-tarihcesi-hero-1',
    exhibitId: 'altin-tarihcesi',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Native_gold_nuggets.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Üç doğal altın külçesinin yakın plan fotoğrafı',
      en: 'Close-up photograph of three native gold nuggets',
      ar: 'صورة مقربة لثلاث قطع ذهب طبيعية',
    },
    caption: {
      tr: 'Doğada bulunan saf altın külçeleri — herhangi bir işlemeden önce.',
      en: 'Pure native gold nuggets as found in nature, before any processing.',
      ar: 'قطع ذهب طبيعية نقية كما توجد في الطبيعة.',
    },
    status: 'pending-verification',
    notes: 'Raporun 6.1 tablosundaki ilk öneri. Görsel indirilince filePath eklenecek.',
  },
  {
    id: 'altin-tarihcesi-hero-2',
    exhibitId: 'altin-tarihcesi',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'MNHN Minéralogie',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Native_gold_Auguste_Gon%C3%A9_MNHN_Min%C3%A9ralogie.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Paris Doğa Tarihi Müzesi\'nde sergilenen büyük doğal altın örneği',
      en: 'Large native gold specimen displayed at the Paris Natural History Museum',
      ar: 'قطعة ذهب طبيعية كبيرة معروضة في متحف التاريخ الطبيعي بباريس',
    },
    status: 'pending-verification',
  },

  // ═══════════════════════════════════════════════════════════════
  // PIRLANTA SALONU
  // ═══════════════════════════════════════════════════════════════
  {
    id: '4c-sistemi-hero',
    exhibitId: '4c-sistemi',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Round_Brilliant_Cut_Diamond.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Yuvarlak brilliant kesim pırlantanın yakın planı',
      en: 'Close-up of a round brilliant cut diamond',
      ar: 'لقطة مقربة لماسة مقطوعة بقطع البريليانت المستدير',
    },
    caption: {
      tr: 'Brilliant kesim: 58 fasetli klasik pırlanta geometrisi.',
      en: 'Brilliant cut: the classic 58-facet diamond geometry.',
      ar: 'قطع البريليانت: الهندسة الكلاسيكية بـ58 وجهاً.',
    },
    status: 'pending-verification',
  },
  {
    id: 'kesim-sekilleri-diagram',
    exhibitId: 'kesim-sekilleri',
    kind: 'diagram',
    license: 'CC-BY-SA-3.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Diamond_facets.svg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Brilliant kesimde taç, kuşak ve pavyon yüzeylerini gösteren diyagram',
      en: 'Diagram showing crown, girdle and pavilion facets on a brilliant cut',
      ar: 'رسم تخطيطي يوضح التاج والحزام والبافيليون في قطع البريليانت',
    },
    status: 'pending-verification',
  },
  {
    id: 'kesim-sekilleri-collage',
    exhibitId: 'kesim-sekilleri',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gemstone_cuts.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Farklı değerli taş kesimlerini gösteren kolaj',
      en: 'Collage showing different gemstone cuts',
      ar: 'مجموعة تظهر قطعات مختلفة للأحجار الكريمة',
    },
    status: 'pending-verification',
  },
  {
    id: 'pirlanta-nasil-olusur-hero',
    exhibitId: 'pirlanta-nasil-olusur',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Round_Brilliant_Cut_Diamond.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Oluşum hikâyesinin sonunda kesilmiş pırlanta örneği',
      en: 'Cut diamond shown as the final stage of the formation story',
      ar: 'ماسة مقطوعة تُظهر المرحلة الأخيرة من قصة التكوين',
    },
    status: 'pending-verification',
  },

  // ═══════════════════════════════════════════════════════════════
  // RENKLİ TAŞLAR SALONU
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'zumrut-hero-1',
    exhibitId: 'zumrut',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Smithsonian / Wikimedia Commons',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gachala_Emerald.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Smithsonian koleksiyonundaki Gachala Zümrüdü — büyük yeşil zümrüt kristali',
      en: 'The Gachala Emerald from the Smithsonian collection — a large green emerald crystal',
      ar: 'زمرد غاتشالا الكبير من مجموعة سميثسونيان',
    },
    status: 'pending-verification',
  },
  {
    id: 'zumrut-hero-2',
    exhibitId: 'zumrut',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mim_emerald.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Matris kayası içinde görünen yeşil zümrüt kristalleri',
      en: 'Green emerald crystals visible in a rock matrix',
      ar: 'بلورات زمرد خضراء داخل صخرة',
    },
    status: 'pending-verification',
  },
  {
    id: 'safir-hero-1',
    exhibitId: 'safir',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sapphire_Gem.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Kesilmiş mavi safir değerli taşı',
      en: 'Cut blue sapphire gemstone',
      ar: 'حجر صفير أزرق مقطوع',
    },
    status: 'pending-verification',
  },
  {
    id: 'safir-lab-grown',
    exhibitId: 'safir',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Synthetic_sapphire_3.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Laboratuvarda üretilmiş sentetik safir örneği',
      en: 'Synthetic sapphire sample grown in a laboratory',
      ar: 'عينة صفير صناعي منمى في المختبر',
    },
    caption: {
      tr: 'Verneuil yöntemiyle büyütülmüş sentetik safir.',
      en: 'Synthetic sapphire grown by the Verneuil process.',
      ar: 'صفير صناعي نُمي بطريقة فيرنوي.',
    },
    status: 'pending-verification',
  },
  {
    id: 'yakut-hero',
    exhibitId: 'yakut',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ruby_gem.JPG',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Kesilmiş kırmızı yakut taşı',
      en: 'Cut red ruby gemstone',
      ar: 'حجر ياقوت أحمر مقطوع',
    },
    status: 'pending-verification',
  },
  {
    id: 'ametist-hero-1',
    exhibitId: 'ametist',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Quartz-212109.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Büyük mor ametist jeodu',
      en: 'Large purple amethyst geode',
      ar: 'جيود أميثيست بنفسجي كبير',
    },
    status: 'pending-verification',
  },

  // ═══════════════════════════════════════════════════════════════
  // GÜMÜŞ SALONU
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'gumus-bakimi-hero',
    exhibitId: 'gumus-bakimi',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Acanthite_(Imiter_Silver_Deposit,_near-latest_Neoproterozoic,_~550_Ma;_Imiter_Mine,_Anti-Atlas_Mountains,_Morocco)_2.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Gümüş sülfür minerali akantit örneği — gümüş kararmasının aynı kimyasal ürünü',
      en: 'Acanthite silver-sulfide mineral specimen — the same chemical product as silver tarnish',
      ar: 'عينة معدن الأكانتيت (كبريتيد الفضة) — نفس الناتج الكيميائي لتأكسد الفضة',
    },
    caption: {
      tr: 'Gümüş + kükürt = gümüş sülfür (Ag₂S). Doğada akantit, takıda "kararma" olarak görünür.',
      en: 'Silver + sulfur = silver sulfide (Ag₂S). In nature it\'s acanthite; on jewelry it\'s "tarnish".',
      ar: 'فضة + كبريت = كبريتيد الفضة. في الطبيعة يسمى أكانتيت؛ على المجوهرات "تأكسد".',
    },
    status: 'pending-verification',
  },

  // ═══════════════════════════════════════════════════════════════
  // LİDYA / ALTIN TARİHİ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'lydia-electrum-hero',
    exhibitId: 'ceyrek-altin',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Bank of England Museum / Joy of Museums',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Electrum_Gold_Coin_from_Lydia,_650_BC_-_Bank_of_England_Museum_-_Joy_of_Museums.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'M.Ö. 650 tarihli Lidya elektrum altın sikkesi — Bank of England Müzesi',
      en: 'Lydian electrum gold coin from 650 BC — Bank of England Museum',
      ar: 'عملة إلكتروم ليدية من 650 ق.م. — متحف بنك إنكلترا',
    },
    status: 'pending-verification',
  },
  {
    id: 'lydia-lion-coins',
    exhibitId: 'altin-tarihcesi',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'brewbooks (Flickr) / Wikimedia Commons',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lydian_electrum_Lion_coins_-_Flickr_-_brewbooks.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Aslan motifli Lidya elektrum sikkeleri',
      en: 'Lydian electrum lion coins',
      ar: 'عملات إلكتروم ليدية بنقش الأسد',
    },
    status: 'pending-verification',
  },
  {
    id: 'lydia-izmir-museum',
    exhibitId: 'ceyrek-altin',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Izmir_Archaeology_museum_Greek_coins_5810.jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'İzmir Arkeoloji Müzesi\'nde sergilenen antik sikkeler',
      en: 'Ancient coins on display at the Izmir Archaeology Museum',
      ar: 'عملات قديمة معروضة في متحف الآثار بإزمير',
    },
    status: 'pending-verification',
  },

  // ═══════════════════════════════════════════════════════════════
  // MOHS SKALASI / SERTLİK
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'mohs-corundum',
    exhibitId: 'mohs-skalasi',
    kind: 'photo',
    license: 'CC-BY-SA-4.0',
    creator: 'Wikimedia Commons contributors',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sapphire_(corundum)_(26663158752).jpg',
    retrievedAt: '2026-04-24',
    requiresAttribution: true,
    alt: {
      tr: 'Mohs 9 sertliğinde korundum/safir mineral örneği',
      en: 'Corundum/sapphire mineral specimen with Mohs hardness 9',
      ar: 'عينة كورندوم/صفير بصلابة موس 9',
    },
    status: 'pending-verification',
  },
];

/**
 * Bir exhibit id için tüm görsel kredilerini döner.
 */
export function getImageCreditsFor(exhibitId) {
  return imageCredits.filter((c) => c.exhibitId === exhibitId);
}

/**
 * Id ile tek bir kredi kaydı al.
 */
export function getImageCredit(id) {
  return imageCredits.find((c) => c.id === id);
}

/**
 * CC BY / CC BY-SA gibi attribution gerektiren lisans mı?
 */
export function requiresAttribution(credit) {
  if (!credit) return false;
  if (credit.requiresAttribution === true) return true;
  const openAttribution = ['CC-BY-4.0', 'CC-BY-SA-4.0', 'CC-BY-SA-3.0'];
  return openAttribution.includes(credit.license);
}

/**
 * Attribution cümlesi üret (tek satır). Örn:
 *   "Foto: Wikimedia Commons contributors — Wikimedia Commons (CC BY-SA 4.0)"
 */
export function buildAttributionLine(credit, locale = 'tr') {
  if (!credit) return '';
  const photo = { tr: 'Foto', en: 'Photo', ar: 'صورة' }[locale] || 'Photo';
  const license = credit.license.replace(/-/g, ' ');
  const parts = [
    `${photo}: ${credit.creator || '—'}`,
    credit.source,
    `(${license})`,
  ].filter(Boolean);
  return parts.join(' — ');
}

export const imageCreditCount = imageCredits.length;
