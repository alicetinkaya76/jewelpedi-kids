/**
 * sources.js — Faz 6-A
 *
 * Kaynakça kayıtları. Minimal yaklaşım: yalnızca sergi specs alanındaki
 * sayısal/tarihsel iddialar ve doğrulanabilir olgular için referans verilir.
 * Mevcut anlatı metinleri (body) "küratör yorumu" kategorisine girer ve
 * burada listelenmez.
 *
 * Şema:
 *   id:       benzersiz kısa ID (kebab-case)
 *   kind:     'book' | 'article' | 'web' | 'museum' | 'journal' | 'database'
 *   title:    kaynağın başlığı (original dilde)
 *   author:   yazar/kurum (string ya da null)
 *   year:     yayın yılı (number ya da null)
 *   publisher: yayınevi/kurum (opsiyonel)
 *   url:      doğrulanmış URL (opsiyonel — uydurma kesin yasak)
 *   retrievedAt: web kaynağı için son teyit tarihi (ISO-8601)
 *
 * NOT: Bu liste Faz 6-A başlangıcıdır. 6-B'de UI'a bağlandıkça genişleyecek.
 * Her yeni kaynak web search ile teyit edilmelidir.
 */

export const sources = [
  // ─── Mohs skalası ─────────────────────────────────────────────
  {
    id: 'mohs-1812',
    kind: 'book',
    title:
      'Versuch einer Elementar-Methode zur naturhistorischen Bestimmung und Erkennung der Fossilien',
    author: 'Friedrich Mohs',
    year: 1812,
    publisher: 'Arnoldsche Buchhandlung, Graz',
  },
  {
    id: 'britannica-mohs',
    kind: 'web',
    title: 'Mohs hardness',
    author: 'Encyclopædia Britannica editors',
    year: 2025,
    url: 'https://www.britannica.com/science/Mohs-hardness',
    retrievedAt: '2026-04-21',
  },

  // ─── Pırlanta kesim ──────────────────────────────────────────
  {
    id: 'tolkowsky-1919',
    kind: 'book',
    title: 'Diamond Design: A Study of the Reflection and Refraction of Light in a Diamond',
    author: 'Marcel Tolkowsky',
    year: 1919,
    publisher: 'E. & F. N. Spon, London (University of London PhD thesis)',
  },

  // ─── Gemoloji kurumsal kaynaklar ─────────────────────────────
  {
    id: 'gia-diamond-grading',
    kind: 'database',
    title: 'GIA Diamond Grading System',
    author: 'Gemological Institute of America',
    year: null,
    url: 'https://www.gia.edu/gia-about/4cs-diamond-quality',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'gia-colored-stone',
    kind: 'database',
    title: 'GIA Colored Stone Reference',
    author: 'Gemological Institute of America',
    year: null,
    url: 'https://www.gia.edu/gem-encyclopedia',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'mindat-database',
    kind: 'database',
    title: 'Mindat.org — Mineral Species and Occurrences',
    author: 'Hudson Institute of Mineralogy',
    year: null,
    url: 'https://www.mindat.org',
    retrievedAt: '2026-04-21',
  },

  // ─── Türk el sanatları — UNESCO ──────────────────────────────
  {
    id: 'unesco-ich-2024',
    kind: 'database',
    title: 'UNESCO Intangible Cultural Heritage Lists',
    author: 'UNESCO',
    year: null,
    url: 'https://ich.unesco.org/en/lists',
    retrievedAt: '2026-04-21',
  },

  // ─── Altın standartları ──────────────────────────────────────
  {
    id: 'lbma-gold-standard',
    kind: 'web',
    title: 'LBMA Good Delivery Rules for Gold and Silver Bars',
    author: 'London Bullion Market Association',
    year: null,
    url: 'https://www.lbma.org.uk/good-delivery',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'turkish-mint',
    kind: 'web',
    title: 'Darphane ve Damga Matbaası — Altın Paralar',
    author: 'T.C. Hazine ve Maliye Bakanlığı Darphane Genel Müdürlüğü',
    year: null,
    url: 'https://www.darphane.gov.tr',
    retrievedAt: '2026-04-21',
  },

  // ─── Tarihî pırlantalar ──────────────────────────────────────
  {
    id: 'smithsonian-hope',
    kind: 'museum',
    title: 'The Hope Diamond — Specimen Record',
    author: 'Smithsonian National Museum of Natural History',
    year: null,
    url: 'https://naturalhistory.si.edu/exhibits/hope-diamond',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'royal-cullinan',
    kind: 'museum',
    title: 'The Crown Jewels — Cullinan Diamonds',
    author: 'Royal Collection Trust',
    year: null,
    url: 'https://www.rct.uk/collection/themes/trails/the-crown-jewels',
    retrievedAt: '2026-04-21',
  },

  // ─── Lidya sikkeleri ─────────────────────────────────────────
  {
    id: 'british-museum-lydia',
    kind: 'museum',
    title: 'Lydian electrum coins — collection record',
    author: 'The British Museum',
    year: null,
    url: 'https://www.britishmuseum.org',
    retrievedAt: '2026-04-21',
  },

  // ─── Platin ──────────────────────────────────────────────────
  {
    id: 'rsc-platinum',
    kind: 'database',
    title: 'Periodic Table — Platinum',
    author: 'Royal Society of Chemistry',
    year: null,
    url: 'https://www.rsc.org/periodic-table/element/78/platinum',
    retrievedAt: '2026-04-21',
  },

  // ─── Topkapı — Osmanlı mücevher ──────────────────────────────
  {
    id: 'topkapi-treasury',
    kind: 'museum',
    title: 'Topkapı Sarayı Müzesi — Hazine-i Hümayun Koleksiyonu',
    author: 'Türkiye Cumhuriyeti Kültür ve Turizm Bakanlığı',
    year: null,
    url: 'https://millisaraylar.gov.tr/saraylar/topkapi-sarayi',
    retrievedAt: '2026-04-21',
  },

  // ─── USGS maden kaynakları ──────────────────────────────────
  {
    id: 'usgs-mineral-commodities',
    kind: 'database',
    title: 'Mineral Commodity Summaries',
    author: 'U.S. Geological Survey',
    year: 2024,
    url: 'https://www.usgs.gov/centers/national-minerals-information-center',
    retrievedAt: '2026-04-21',
  },

  // ─── Etymology ───────────────────────────────────────────────
  {
    id: 'etymonline',
    kind: 'web',
    title: 'Online Etymology Dictionary',
    author: 'Douglas Harper',
    year: null,
    url: 'https://www.etymonline.com',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'tdk-sozluk',
    kind: 'database',
    title: 'Türk Dil Kurumu Güncel Türkçe Sözlük',
    author: 'Türk Dil Kurumu',
    year: null,
    url: 'https://sozluk.gov.tr',
    retrievedAt: '2026-04-21',
  },

  // ─── Genel ansiklopedik ─────────────────────────────────────
  {
    id: 'britannica-general',
    kind: 'web',
    title: 'Encyclopædia Britannica',
    author: 'Encyclopædia Britannica editors',
    year: null,
    url: 'https://www.britannica.com',
    retrievedAt: '2026-04-21',
  },

  // ─── Faz 6-C: Hikâye kaynakları ─────────────────────────────
  {
    id: 'wiki-cullinan-diamond',
    kind: 'web',
    title: 'Cullinan Diamond',
    author: 'Wikipedia contributors',
    year: null,
    url: 'https://en.wikipedia.org/wiki/Cullinan_Diamond',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'worldhistory-cullinan',
    kind: 'web',
    title: 'Cullinan Diamond',
    author: 'Mark Cartwright',
    year: 2021,
    publisher: 'World History Encyclopedia',
    url: 'https://www.worldhistory.org/Cullinan_Diamond/',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'wiki-mons-smaragdus',
    kind: 'web',
    title: 'Mons Smaragdus (Wadi Sikait)',
    author: 'Wikipedia contributors',
    year: null,
    url: 'https://en.wikipedia.org/wiki/Wadi_Sikait',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'cailliaud-1822',
    kind: 'book',
    title: 'Voyage à l\'Oasis de Thèbes et dans les déserts situés à l\'orient et à l\'occident de la Thébaïde',
    author: 'Frédéric Cailliaud',
    year: 1822,
    publisher: 'Imprimerie Royale, Paris',
  },
  {
    id: 'ligo-gw170817',
    kind: 'journal',
    title: 'Multi-messenger Observations of a Binary Neutron Star Merger (GW170817)',
    author: 'LIGO/Virgo Scientific Collaboration et al.',
    year: 2017,
    publisher: 'The Astrophysical Journal Letters',
    url: 'https://doi.org/10.3847/2041-8213/aa91c9',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'nasa-neutron-star-gold',
    kind: 'web',
    title: 'Neutron Star Mergers Produce Heavy Elements Including Gold',
    author: 'NASA Goddard Space Flight Center',
    year: null,
    url: 'https://www.nasa.gov/universe/neutron-star-collision',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'british-museum-croesus',
    kind: 'museum',
    title: 'Croeseid — Lydian gold and silver coinage of Croesus',
    author: 'The British Museum',
    year: null,
    url: 'https://www.britishmuseum.org',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'gemsociety-trabzon',
    kind: 'article',
    title: 'Weaved Bracelets of Trabzon',
    author: 'Fatma Oya Borahan (International Gem Society)',
    year: null,
    url: 'https://www.gemsociety.org/article/weaved-bracelets-of-trabzon/',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'daily-sabah-trabzon',
    kind: 'article',
    title: 'Summer wedding season boosts Trabzon\'s gold mesh jewelry',
    author: 'Daily Sabah / Anadolu Agency',
    year: 2025,
    url: 'https://www.dailysabah.com/turkiye/summer-wedding-season-boosts-trabzons-gold-mesh-jewelry-in-turkiye/news',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'turkpatent-gi-trabzon-hasir',
    kind: 'database',
    title: 'Trabzon Hasırı — Coğrafi İşaret Tescil Belgesi',
    author: 'Türk Patent ve Marka Kurumu',
    year: 2004,
    url: 'https://ci.turkpatent.gov.tr',
    retrievedAt: '2026-04-21',
  },
  {
    id: 'unesco-ich-turkiye',
    kind: 'database',
    title: 'Türkiye — Elements on the UNESCO Intangible Cultural Heritage Lists',
    author: 'UNESCO',
    year: null,
    url: 'https://ich.unesco.org/en/state/turkiye-TR?info=elements-on-the-lists',
    retrievedAt: '2026-04-21',
  },

  // ─── Faz 6-E: Lab kaynakları ────────────────────────────────
  {
    id: 'crc-handbook',
    kind: 'book',
    title: 'CRC Handbook of Chemistry and Physics (104th Edition)',
    author: 'John R. Rumble (ed.)',
    year: 2023,
    publisher: 'CRC Press',
  },
  {
    id: 'webelements',
    kind: 'web',
    title: 'WebElements Periodic Table',
    author: 'Mark Winter (University of Sheffield)',
    year: null,
    url: 'https://www.webelements.com',
    retrievedAt: '2026-04-22',
  },
  {
    id: 'iupac-periodic',
    kind: 'database',
    title: 'IUPAC Periodic Table of the Elements',
    author: 'International Union of Pure and Applied Chemistry',
    year: null,
    url: 'https://iupac.org/what-we-do/periodic-table-of-elements/',
    retrievedAt: '2026-04-22',
  },
  {
    id: 'gia-4cs',
    kind: 'web',
    title: '4Cs of Diamond Quality',
    author: 'Gemological Institute of America',
    year: null,
    url: 'https://4cs.gia.edu/',
    retrievedAt: '2026-04-22',
  },

  // ─── Faz 6-G: Atölye kaynakları ────────────────────────────
  {
    id: 'turkpatent-gi-midyat-telkari',
    kind: 'database',
    title: 'Coğrafi İşaret Tescili: Midyat Telkâri',
    author: 'Türk Patent ve Marka Kurumu',
    year: 2013,
    url: 'https://www.ci.gov.tr/',
    retrievedAt: '2026-04-23',
    note: 'Başvuru no: C2013/024, Mardin Midyat ilçesi',
  },
  {
    id: 'turkpatent-gi-siirt-savat',
    kind: 'database',
    title: 'Coğrafi İşaret Tescili: Siirt Savatı',
    author: 'Türk Patent ve Marka Kurumu',
    year: 2019,
    url: 'https://www.ci.gov.tr/',
    retrievedAt: '2026-04-23',
  },
  {
    id: 'vam-enamel',
    kind: 'web',
    title: 'Enamel: Techniques and History',
    author: 'Victoria and Albert Museum',
    year: null,
    url: 'https://www.vam.ac.uk/articles/enamel-techniques-and-history',
    retrievedAt: '2026-04-23',
  },

  // ─── Faz 6-H: Öğretmen / eğitim kaynakları ────────────────
  {
    id: 'meb-ortaokul-fen-mufredat',
    kind: 'database',
    title: 'Ortaokul Fen Bilimleri Dersi Öğretim Programı (3-8. sınıflar)',
    author: 'T.C. Millî Eğitim Bakanlığı, Talim ve Terbiye Kurulu Başkanlığı',
    year: 2024,
    url: 'https://mufredat.meb.gov.tr/',
    retrievedAt: '2026-04-23',
  },
  {
    id: 'bloom-taxonomy-revised',
    kind: 'book',
    title: 'A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom\'s Taxonomy',
    author: 'Anderson, L.W. & Krathwohl, D.R. (eds.)',
    year: 2001,
    publisher: 'Longman, New York',
  },
];

// ─── Hızlı erişim haritası ────────────────────────────────────
const sourceMap = Object.fromEntries(sources.map((s) => [s.id, s]));

export function getSource(id) {
  return sourceMap[id] || null;
}

export function getSources(ids) {
  if (!Array.isArray(ids)) return [];
  return ids.map((id) => sourceMap[id]).filter(Boolean);
}

/**
 * Chicago-lite format:
 *   "Mohs (1812), Versuch einer Elementar-Methode..."
 *   "British Museum, 'Lydian electrum coins'"
 *   "GIA, '4Cs Diamond Quality' (gia.edu)"
 */
export function formatSource(source, locale = 'tr') {
  if (!source) return '';
  const { author, year, title, url, kind } = source;

  const authorShort =
    typeof author === 'string' && author.length > 60
      ? author.split(',')[0].trim()
      : author || '';

  const yearPart = year ? ` (${year})` : '';
  const titlePart = title ? `, "${title}"` : '';

  let urlPart = '';
  if (url) {
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      urlPart = ` — ${host}`;
    } catch {
      urlPart = '';
    }
  }

  const kindTag =
    kind === 'museum'
      ? { tr: ' [müze kaydı]', en: ' [museum record]', ar: ' [سجل متحف]' }[locale]
      : kind === 'database'
      ? { tr: ' [veritabanı]', en: ' [database]', ar: ' [قاعدة بيانات]' }[locale]
      : '';

  return `${authorShort}${yearPart}${titlePart}${urlPart}${kindTag}`;
}

export const sourceCount = sources.length;
