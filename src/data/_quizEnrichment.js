/**
 * _quizEnrichment.js — Faz 6-F
 *
 * 8 quiz kategorisi için genişletilmiş metadata. Mevcut sorular (49
 * adet quizzes[] içinde) dokunulmaz; bu modül kategori seviyesinde
 * bağlam sağlar: intro, curator notu, ilgili müze içeriği, sözlük.
 *
 * QuizHub kategoriyi seçince altında QuizCategoryIntro render edilir;
 * QuizPlay bitiş ekranında CuratorStoryNote + RelatedGrid gösterir.
 * Böylece quiz sadece "bil-bilme" oyunu değil, bir öğrenme kapısı olur.
 *
 * Neden kategori-seviyesi (soru-seviyesi değil):
 *   - 49 sorunun hepsine ID verip enrichment bağlamak yüksek risk/düşük fayda
 *   - Kullanıcı quiz oynarken bağlama (ilgili sergi/hikâye/deney) değil cevaba odaklanır
 *   - Bağlam en değerlisi kategori başında (hazırlık) ve bitişte (keşfet)
 *
 * Şema (tüm alanlar OPSİYONEL):
 *   intro           { tr, en, ar }                         — 2-3 cümle giriş
 *   sources         ['source-id', ...]
 *   relatedExhibits ['exhibit-id', ...]
 *   relatedLabs     ['lab-id', ...]
 *   relatedStories  ['story-id', ...]
 *   vocabulary      ['glossary-term-id', ...]
 *   curatorNote     { tr, en, ar, cite?: ['source-id'] }  — bitiş ekranında
 */

export const quizEnrichment = {
  // ═══════════════════════════════════════════════════════════════
  // KARIŞIK
  // ═══════════════════════════════════════════════════════════════
  karisik: {
    intro: {
      tr: 'Tüm kategorilerden rastgele sorular. Altın, pırlanta, gümüş, renkli taşlar ve zanaatın birbirleriyle nasıl örtüştüğünü test et.',
      en: 'Random questions across all categories. Test how gold, diamonds, silver, colored stones and crafts connect.',
      ar: 'أسئلة عشوائية من جميع الفئات — اختبر كيف تتشابك المواضيع.',
    },
    relatedExhibits: ['mohs-skalasi', 'altin-tarihcesi', '4c-sistemi'],
    relatedStories: ['kleopatra-zumrut', 'pirlantanin-3-milyar-yili'],
    relatedLabs: ['guess', 'mohs'],
    vocabulary: ['mohs', 'ayar', 'karat', 'alasim'],
    curatorNote: {
      tr: 'Karışık mod, farklı konulardaki ufak detayların birbiriyle ilişkilerini yakalamak için iyi bir ısınma. Güçlü olduğun kategoriyi tanıdığında, zayıf olana odaklanabilirsin.',
      en: 'Mixed mode is a good warm-up to spot how small details across topics relate. Once you know your strong category, you can focus on your weak one.',
      ar: 'النمط المختلط إحماء جيد لاكتشاف الروابط بين المواضيع.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ALTIN
  // ═══════════════════════════════════════════════════════════════
  altin: {
    intro: {
      tr: 'Ayar nedir, bilezik neden 22 ayar, çeyrek altın kaç gramdır? Altın kültürünün hem fizik hem ekonomik soruları.',
      en: 'What is karat, why are bracelets 22 karat, how much does a quarter coin weigh? Both physical and economic questions about gold culture.',
      ar: 'ما هو العيار، لماذا الأساور 22 قيراطاً، كم يزن ربع الليرة؟ أسئلة عن ثقافة الذهب.',
    },
    sources: ['turkish-mint', 'lbma-gold-standard', 'british-museum-lydia'],
    relatedExhibits: ['ceyrek-altin', 'tam-altin', 'yarim-altin', 'ayar-sistemi', 'altin-tarihcesi', 'bilezik'],
    relatedLabs: ['karat', 'lydia', 'melt'],
    relatedStories: ['altin-nugget-yolculugu'],
    vocabulary: ['ayar', 'alasim', 'milyem', 'lidya', 'elektrum', 'solidus-coin', 'hallmark'],
    curatorNote: {
      tr: 'Türkiye\'de altın hem takı hem tasarruf aracıdır. Bu yüzden altın soruları sadece metalin kimyasını değil, toplumsal pratiği de kapsar — çeyrek/yarım/tam ağırlıkları, "22 ayar düğün" geleneği gibi.',
      en: 'In Türkiye gold is both jewellery and savings. So gold questions cover not just the chemistry but social practice — quarter/half/full coin weights, the "22-karat wedding" tradition.',
      ar: 'في تركيا الذهب أداة ادخار وزينة — الأسئلة تشمل الكيمياء والعادات الاجتماعية معاً.',
      cite: ['turkish-mint'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // GÜMÜŞ
  // ═══════════════════════════════════════════════════════════════
  gumus: {
    intro: {
      tr: 'Sterling nedir, 925 ne anlama gelir, gümüş neden kararır? Gümüşün kimyasını ve Türk zanaatındaki özel yerini test et.',
      en: 'What is sterling, what does 925 mean, why does silver tarnish? Test the chemistry and its special role in Turkish crafts.',
      ar: 'ما الإسترلينج، ماذا يعني 925، لماذا تتأكسد الفضة؟',
    },
    sources: ['crc-handbook', 'webelements', 'gemsociety-trabzon'],
    relatedExhibits: ['925-ayar', 'trabzon-hasiri', 'telkari', 'savat'],
    relatedLabs: ['tarnish', 'melt'],
    relatedStories: ['trabzon-hasiri-unesco', 'mardinli-telkari-ustasi-ayse'],
    vocabulary: ['sterling', 'britannia-silver', 'hasir', 'telkari', 'kazaz', 'kararma', 'niello'],
    curatorNote: {
      tr: 'Gümüş altından daha "yaşayan" bir metal: havayla etkileşir, kararır, yeniden parlayacak şekilde temizlenir. Bu yüzden gümüş bir evin içinde sürekli bakım gerektiren bir nesnedir — kullanmazsan kararır, kullanırsan parlar.',
      en: 'Silver is more "alive" than gold: it interacts with air, tarnishes, can be cleaned back to shine. So in a home silver needs ongoing care — neglect it and it dims; use it and it glows.',
      ar: 'الفضة أكثر "حيوية" من الذهب — تتفاعل مع الهواء وتحتاج رعاية مستمرة.',
      cite: ['crc-handbook'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // PIRLANTA
  // ═══════════════════════════════════════════════════════════════
  pirlanta: {
    intro: {
      tr: '4C sistemi, brilliant kesim, en büyük ham pırlanta... GIA standartlarından pırlantanın 3 milyar yıllık hikâyesine uzanan sorular.',
      en: '4Cs, brilliant cut, largest rough diamond... Questions spanning from GIA standards to a diamond\'s 3-billion-year story.',
      ar: '4C والبريلانت وأكبر ماسة خام — أسئلة تمتد من معايير GIA إلى قصة 3 مليار سنة.',
    },
    sources: ['gia-diamond-grading', 'gia-4cs', 'tolkowsky-1919', 'wiki-cullinan-diamond', 'royal-cullinan'],
    relatedExhibits: ['4c-sistemi', 'kesim-sekilleri', 'pirlanta-nasil-olusur', 'cullinan', 'hope-pirlantasi'],
    relatedLabs: ['light', 'mohs'],
    relatedStories: ['pirlantanin-3-milyar-yili'],
    vocabulary: ['4c', 'bril', 'karat', 'tolkowsky', 'kimberlit', 'crown-angle', 'pavilion', 'table-facet', 'culet', 'hpht-treatment', 'cvd', 'conflict-diamond'],
    curatorNote: {
      tr: '4C sistemi (Carat, Color, Clarity, Cut) sadece fiyat değerlendirmesi değil — pırlantayı nesne olarak görmek için bir dildir. Aynı ağırlıktaki iki pırlantadan biri hakikaten parlar, diğeri sönüktür; 4C sana bunun nedenini söyler.',
      en: 'The 4Cs aren\'t just pricing — they\'re a language for seeing a diamond as an object. Two same-weight diamonds can be brilliant or dull; the 4Cs tell you why.',
      ar: 'نظام 4C ليس للتسعير فقط — بل لغة لفهم الماسة كجسم.',
      cite: ['gia-4cs'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // RENKLİ TAŞLAR
  // ═══════════════════════════════════════════════════════════════
  'renkli-taslar': {
    intro: {
      tr: 'Yakut ile safir aynı mineralden mi? Zümrüdün "jardin"i ne demek? Turkuvaz neden "Türk taşı" adını taşır? Renk, mineral ailesi ve köken üzerine sorular.',
      en: 'Are ruby and sapphire the same mineral? What\'s emerald\'s "jardin"? Why is turquoise called the "Turkish stone"? Questions on colour, mineral families and origin.',
      ar: 'هل الياقوت والصفير نفس المعدن؟ ما "جاردين" الزمرد؟ لماذا سُمي الفيروز حجراً تركياً؟',
    },
    sources: ['gia-colored-stone', 'mindat-database'],
    relatedExhibits: ['yakut', 'safir', 'zumrut', 'turkuvaz', 'lapis-lazuli', 'akuamarin', 'mohs-skalasi'],
    relatedLabs: ['mohs', 'guess'],
    relatedStories: ['kleopatra-zumrut'],
    vocabulary: ['korund', 'beril', 'jardin', 'pigeon-blood', 'play-of-color', 'asterism', 'inclusion', 'mohs'],
    curatorNote: {
      tr: 'Renkli taşların "kimlik sırrı" genelde eser elementlerdir: yakutu yakut yapan ~%1 krom, safiri mavi yapan demir+titanyum. Aynı kristal ağının içinde birkaç atom değişir, renk tamamen değişir — mineralojide çok az yerde bu kadar belirgin görülen bir olgu.',
      en: 'Color stones\' "identity secret" is usually trace elements: ~1% chromium makes ruby ruby, iron+titanium makes sapphire blue. A few atoms change in the same crystal lattice — a phenomenon rarely this stark elsewhere in mineralogy.',
      ar: 'سر "هوية" الأحجار الملونة عناصر ضئيلة — كروم للياقوت، حديد-تيتانيوم للصفير.',
      cite: ['gia-colored-stone', 'mindat-database'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // PLATİN
  // ═══════════════════════════════════════════════════════════════
  platin: {
    intro: {
      tr: 'Platin neden altından daha yoğun ama daha az yaygın? Neden "asil metal"? Bu sorular platinin 19. yüzyıla kadar kuyumculuğa girememesinin fiziksel nedenlerini inceler.',
      en: 'Why is platinum denser than gold but less common? Why "noble metal"? These questions examine why platinum entered jewellery only after the 19th century.',
      ar: 'لماذا البلاتين أكثف من الذهب لكنه أندر؟ لماذا "نبيل"؟',
    },
    sources: ['rsc-platinum', 'crc-handbook', 'iupac-periodic'],
    relatedExhibits: ['platin-nedir', 'platin-vs-altin', 'platin-tarihi', 'platin-endustri'],
    relatedLabs: ['melt', 'karat'],
    vocabulary: ['paladyum', 'rodyum', 'alasim'],
    curatorNote: {
      tr: 'Platinin altından daha zor işlenmesinin nedeni net: erime noktası 1768°C, altınkinden ~700°C yüksek. Oksijen-hidrojen ocakları 1800\'lerin sonunda geliştirilene kadar kuyumcular platini eritip kalıba dökemezdi. Bu yüzden "yeni" bir metal sayılır — halbuki biliniyordu çok önceden.',
      en: 'Platinum is harder to work than gold for one clear reason: its melting point is 1768°C, about 700°C higher than gold. Until oxy-hydrogen torches arrived in the late 1800s, jewellers couldn\'t cast it. So it\'s a "new" metal — even though it had been known for ages.',
      ar: 'البلاتين صعب الصياغة لأن نقطة انصهاره 1768°م — حتى مشاعل الأكسجين-الهيدروجين في أواخر 1800 لم يُصَغْ.',
      cite: ['rsc-platinum'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // TAKI
  // ═══════════════════════════════════════════════════════════════
  taki: {
    intro: {
      tr: 'Yüzüğün parmaktaki yeri neden kültürden kültüre değişir? Kolyenin "pendant"ı ne demek? Takı tipi, takma yeri ve anlam üzerine sorular.',
      en: 'Why does a ring\'s finger change culture to culture? What is a necklace\'s "pendant"? Questions on jewellery types, placement and meaning.',
      ar: 'لماذا يختلف إصبع الخاتم بين الثقافات؟ ما "الشاكر" للعقد؟',
    },
    sources: ['britannica-general', 'topkapi-treasury'],
    relatedExhibits: ['yuzuk', 'kolye', 'kupe', 'brosh', 'tac'],
    relatedLabs: [],
    relatedStories: ['mardinli-telkari-ustasi-ayse'],
    vocabulary: ['alyans', 'tektas', 'vena-amoris'],
    curatorNote: {
      tr: 'Takının anatomisi (yüzük, kolye, küpe, broş, taç) yaklaşık 5000 yıldır neredeyse hiç değişmedi — çünkü insan bedeni değişmedi. Değişen sadece süsleme: kullanılan taşlar, işlenme teknikleri, kimin takıp kimin takmadığı.',
      en: 'The anatomy of jewellery (ring, necklace, earring, brooch, crown) has barely changed in ~5000 years — because the human body hasn\'t. What changes is only the adornment: stones used, techniques, who wears which.',
      ar: 'تشريح المجوهرات لم يتغير منذ 5000 سنة — فقط الزخرفة تتغير.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ZANAAT
  // ═══════════════════════════════════════════════════════════════
  zanaat: {
    intro: {
      tr: 'Telkâri ile savat arasındaki fark ne? Kapalıçarşı\'nın ismi nereden geliyor? Kazazlık nerede yapılır? Türk kuyumculuk geleneği üzerine sorular.',
      en: 'What\'s the difference between filigree and niello? Where does "Grand Bazaar" get its name? Where is kazaz made? Questions on Turkish jewellery craft tradition.',
      ar: 'ما الفرق بين التلكاري والسواد؟ أين يُصنع الكزاز؟',
    },
    sources: ['gemsociety-trabzon', 'turkpatent-gi-trabzon-hasir', 'daily-sabah-trabzon', 'topkapi-treasury'],
    relatedExhibits: ['telkari', 'savat', 'mine', 'kapalicarsi', 'kazaz', 'trabzon-hasiri', 'eskisehir-lutasi'],
    relatedLabs: ['tarnish'],
    relatedStories: ['mardinli-telkari-ustasi-ayse', 'trabzon-hasiri-unesco'],
    vocabulary: ['telkari', 'savat', 'hasir', 'kazaz', 'mine', 'niello', 'cloisonne'],
    curatorNote: {
      tr: 'Türk zanaatının coğrafyası belirgindir: telkâri Mardin (özellikle Midyat), savat Siirt-Midyat, kazaz ve hasır Trabzon, mine İstanbul ve Anadolu geneli, lületaşı Eskişehir. Her zanaat kendi şehrinin coğrafi işaretiyle korumaya alınmıştır — küresel rekabete karşı yerel bir kimlik duvarı.',
      en: 'Turkish craft geography is specific: filigree in Mardin (especially Midyat), niello in Siirt-Midyat, kazaz and hasır in Trabzon, enamel across İstanbul and Anatolia, meerschaum in Eskişehir. Each craft is protected by its city\'s Geographical Indication — a local identity wall against global competition.',
      ar: 'الحرف التركية مرتبطة بمدن محددة، وكلّ منها محمي بعلامة جغرافية.',
      cite: ['turkpatent-gi-trabzon-hasir'],
    },
  },
};

// ─── Merge helper ─────────────────────────────────────────────
/**
 * Bir quiz kategori kaydını (categories[] array elemanı) enrichment
 * ile birleştir. Enrichment değerleri ÜSTE yazar. Mevcut alanlar
 * (id, tr/en/ar, emoji) korunur.
 */
export function enrichQuizCategory(cat) {
  if (!cat || !cat.id) return cat;
  const extra = quizEnrichment[cat.id];
  if (!extra) return cat;
  return { ...cat, ...extra };
}

export const quizEnrichmentCount = Object.keys(quizEnrichment).length;
