// Sergi salonları (exhibit halls) — 7 kategori.
// Her salonun kendi renk paleti ve karakteri var.

export const halls = [
  {
    id: 'altin',
    emoji: '🥇',
    accent: '#d4a017',
    soft: '#fdebd0',
    ink: '#7a5c0a',
    name: { tr: 'Altın Salonu', en: 'Gold Hall', ar: 'قاعة الذهب' },
    tagline: {
      tr: '5000 yıllık sarı hikâye.',
      en: 'A 5,000-year-old golden story.',
      ar: 'قصة ذهبية عمرها 5000 سنة.',
    },
    curatorNote: {
      tr: 'Bu salonda altının tarihini, ayar sistemini ve Türk kültüründeki yerini keşfedeceksin. Çeyrekten Cumhuriyet altınına, bileziklerden düğün geleneklerine.',
      en: 'In this hall you\'ll discover gold\'s history, the karat system and its place in Turkish culture — from coin denominations to wedding traditions.',
      ar: 'في هذه القاعة ستكتشف تاريخ الذهب ونظام العيار ومكانته في الثقافة التركية.',
    },
  },
  {
    id: 'gumus',
    emoji: '🪙',
    accent: '#7f8c8d',
    soft: '#eaecee',
    ink: '#2c3e50',
    name: { tr: 'Gümüş Salonu', en: 'Silver Hall', ar: 'قاعة الفضة' },
    tagline: {
      tr: 'Işıldayan beyaz metal.',
      en: 'The shining white metal.',
      ar: 'المعدن الأبيض اللامع.',
    },
    curatorNote: {
      tr: 'Gümüş neden kararır? Trabzon hasırı nasıl örülür? Telkâri ustaları telleri nasıl eğer? Bu salon sana Anadolu\'nun gümüş zanaatlarını tanıtır.',
      en: 'Why does silver tarnish? How is Trabzon chain-weave made? This hall introduces you to Anatolia\'s silver crafts.',
      ar: 'لماذا تتأكسد الفضة؟ تعرّف على حرف الفضة الأناضولية.',
    },
  },
  {
    id: 'pirlanta',
    emoji: '💎',
    accent: '#5dade2',
    soft: '#d6eaf8',
    ink: '#1a5276',
    name: { tr: 'Pırlanta Salonu', en: 'Diamond Hall', ar: 'قاعة الماس' },
    tagline: {
      tr: 'Işığın dansı.',
      en: 'The dance of light.',
      ar: 'رقصة الضوء.',
    },
    curatorNote: {
      tr: 'Pırlanta doğanın en sert malzemesidir. Bu salonda 4C sistemini, ışığın nasıl kırıldığını ve laboratuvar pırlantalarının hikâyesini öğreneceksin.',
      en: 'Diamond is nature\'s hardest material. Learn the 4Cs, how light refracts, and the story of lab-grown diamonds.',
      ar: 'الماس أصلب مادة في الطبيعة. تعلّم نظام 4C وكيفية انكسار الضوء.',
    },
  },
  {
    id: 'renkli-taslar',
    emoji: '💚',
    accent: '#27ae60',
    soft: '#d5f5e3',
    ink: '#145a32',
    name: { tr: 'Renkli Taşlar Salonu', en: 'Colored Stones Hall', ar: 'قاعة الأحجار الملونة' },
    tagline: {
      tr: 'Gökkuşağı mineralleri.',
      en: 'Rainbow minerals.',
      ar: 'معادن قوس قزح.',
    },
    curatorNote: {
      tr: 'Zümrüt yeşili, yakut kırmızısı, safir mavisi... Her taşın bir kökeni, bir sertliği ve bir hikâyesi var. Bu salon onların hepsini bir araya getirir.',
      en: 'Emerald green, ruby red, sapphire blue... Every stone has an origin, a hardness and a story.',
      ar: 'أخضر الزمرد وأحمر الياقوت وأزرق الصفير... لكل حجر قصة.',
    },
  },
  {
    id: 'platin',
    emoji: '⚪',
    accent: '#aab7b8',
    soft: '#f2f4f4',
    ink: '#4d5656',
    name: { tr: 'Platin Salonu', en: 'Platinum Hall', ar: 'قاعة البلاتين' },
    tagline: {
      tr: 'Sessiz ama nadir.',
      en: 'Quiet but rare.',
      ar: 'هادئ ولكن نادر.',
    },
    curatorNote: {
      tr: 'Platin, altından 30 kat daha nadirdir. Bu salonda platinin özelliklerini ve neden özel olduğunu keşfedeceksin.',
      en: 'Platinum is 30 times rarer than gold. Discover its properties and why it\'s special.',
      ar: 'البلاتين أندر من الذهب بثلاثين مرة.',
    },
  },
  {
    id: 'taki',
    emoji: '💍',
    accent: '#8e44ad',
    soft: '#e8daef',
    ink: '#512e5f',
    name: { tr: 'Takı Atölyesi', en: 'Jewelry Workshop', ar: 'ورشة المجوهرات' },
    tagline: {
      tr: 'Yüzükten taça her şey.',
      en: 'From rings to tiaras.',
      ar: 'من الخواتم إلى التيجان.',
    },
    curatorNote: {
      tr: 'Bir yüzük nasıl yapılır? Küpe ve kolye arasındaki farklar nelerdir? Bu salonda takı türlerini ve kültürel anlamlarını öğreneceksin.',
      en: 'How is a ring made? Learn about jewelry types and their cultural meanings.',
      ar: 'كيف يُصنع الخاتم؟ تعرّف على أنواع المجوهرات.',
    },
  },
  {
    id: 'zanaat',
    emoji: '🪡',
    accent: '#e67e22',
    soft: '#fef5e7',
    ink: '#784212',
    name: { tr: 'Türk Zanaatı Salonu', en: 'Turkish Craft Hall', ar: 'قاعة الحرف التركية' },
    tagline: {
      tr: 'El emeği, göz nuru.',
      en: 'Crafted by hand, polished by eye.',
      ar: 'صنع اليد، جلاء العين.',
    },
    curatorNote: {
      tr: 'Trabzon hasırı, Mardin telkârisi, Siirt savatı... Anadolu\'nun yüzyıllık zanaatları bu salonda yaşıyor. Her birinin kendi şehri, kendi tekniği var.',
      en: 'Trabzon chain-weave, Mardin filigree, Siirt niello... Anatolia\'s century-old crafts live here.',
      ar: 'حصير طرابزون وتلكاري ماردين... تعيش الحرف الأناضولية العريقة هنا.',
    },
  },
];

export function getHall(id) {
  return halls.find((h) => h.id === id);
}
