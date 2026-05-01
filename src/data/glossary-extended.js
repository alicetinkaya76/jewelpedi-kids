/**
 * glossary-extended.js — Faz 6-A
 *
 * Mevcut glossary.js'i 53 → 83 terime genişletir. Tüm terimler eklendiğinde
 * 6-B'de GlossaryPage'de tek bir birleşik liste olarak gösterilir.
 *
 * Etymology politikası (Karar 1 / Minimal):
 *   - Yalnızca Online Etymology Dictionary veya TDK'den DOĞRULANMIŞ olanlar
 *   - Doğrulanamayan terimlerde etymology alanı YOKTUR (uydurma yasak)
 *   - Her etymology için `cite` alanında kaynak ID'si
 *
 * Ana `glossary` array'ini mutate etmek yerine ayrı dosyada — böylece
 * backward compat korunur, GlossaryPage basit bir `concat()` ile birleştirir.
 */

export const glossaryExtended = [
  // ─── Genel (terimler + etymology bazıları doğrulanmış) ────────
  {
    id: 'karat-weight',
    term: { tr: 'Karat (ağırlık)', en: 'Carat (mass)', ar: 'قيراط (وزن)' },
    cat: 'pirlanta',
    def: {
      tr: 'Kıymetli taşların ağırlık birimi. 1 karat = 0,2 gram = 200 mg. 1907\'de uluslararası metrik karat olarak standart edildi.',
      en: 'Weight unit for gemstones. 1 carat = 0.2 g = 200 mg. Standardized as the metric carat in 1907.',
      ar: 'وحدة وزن الأحجار الكريمة: 0.2 غرام.',
    },
    etymology: {
      tr: 'Yunanca "keration" (keçiboynuzu tohumu, "küçük boynuz") → Arapça qīrāt → İtalyanca carato → carat. Keçiboynuzu tohumları eşit ağırlıkları nedeniyle antik dönemde terazi ağırlığı olarak kullanıldı.',
      en: 'From Greek "keration" (carob seed, "little horn") → Arabic qīrāṭ → Italian carato → carat. Carob seeds were used in antiquity as balance weights because of their uniform mass.',
      ar: 'من اليونانية keration (بذرة الخروب) → قيراط.',
    },
    cite: ['etymonline'],
  },

  {
    id: 'kimberlit-deep',
    term: { tr: 'Kimberlit Borusu', en: 'Kimberlite Pipe', ar: 'أنبوب كمبرليت' },
    cat: 'pirlanta',
    def: {
      tr: 'Pırlantaları yer mantosunun 150-200 km derinliğinden yüzeye taşıyan volkanik baca yapısı. Güney Afrika\'daki Kimberley şehrinden adını alır.',
      en: 'Volcanic pipe that brings diamonds from 150-200 km deep in the mantle to the surface. Named after Kimberley, South Africa.',
      ar: 'أنبوب بركاني ينقل الماس من العمق إلى السطح.',
    },
  },

  {
    id: 'fluorescence',
    term: { tr: 'Floresans', en: 'Fluorescence', ar: 'فلورة' },
    cat: 'pirlanta',
    def: {
      tr: 'Ultraviyole ışık altında görünür ışık yayma özelliği. Pırlantaların %30\'u UV altında mavi parlar; Hope elması ise kırmızı floresans gösterir.',
      en: 'Emission of visible light under ultraviolet illumination. 30% of diamonds glow blue under UV; the Hope Diamond famously glows red.',
      ar: 'انبعاث الضوء تحت الأشعة فوق البنفسجية.',
    },
  },

  {
    id: 'inclusion',
    term: { tr: 'İnklüzyon', en: 'Inclusion', ar: 'شوائب' },
    cat: 'pirlanta',
    def: {
      tr: 'Bir taşın içinde hapsolmuş başka bir mineral, gaz kabarcığı veya çatlak. GIA clarity (berraklık) sıralamasının temeli bu iç özelliklerdir.',
      en: 'A foreign mineral, gas bubble, or fracture trapped inside a stone. GIA clarity grading is based on these internal features.',
      ar: 'شوائب داخلية تحدد نقاء الحجر.',
    },
  },

  {
    id: 'table-facet',
    term: { tr: 'Masa Yüzeyi (Table)', en: 'Table Facet', ar: 'وجه الطاولة' },
    cat: 'pirlanta',
    def: {
      tr: 'Pırlantanın üst merkezindeki büyük düz yüzey. Tolkowsky\'ye göre çapın %53\'ü olmalı — %54-69 arası GIA tarafından kabul edilir.',
      en: 'The large flat facet at the diamond\'s top center. Per Tolkowsky: 53% of diameter; GIA accepts 54-69%.',
      ar: 'الوجه العلوي المسطح للماس.',
    },
  },

  {
    id: 'culet',
    term: { tr: 'Külot (Culet)', en: 'Culet', ar: 'قاعدة الماس' },
    cat: 'pirlanta',
    def: {
      tr: 'Pırlantanın en alt ucu. Klasik brilliant kesimde minik bir 58. yüzey; modern kesimlerde genellikle sivri bir nokta.',
      en: 'The bottom tip of a diamond. In classic brilliant cuts, a small 58th facet; in modern cuts, usually a pointed apex.',
      ar: 'الرأس السفلي للماس.',
    },
  },

  // ─── Altın ───────────────────────────────────────────────────
  {
    id: 'milyem',
    term: { tr: 'Milyem', en: 'Millesimal Fineness', ar: 'نقاء الألف' },
    cat: 'altin',
    def: {
      tr: 'Değerli metalin saflığını binde birlik oranla ifade eden birim. 22 ayar = 916 milyem (%91,6); 18 ayar = 750; 24 ayar = 999,9.',
      en: 'Precious metal purity expressed per thousand. 22k = 916‰; 18k = 750; 24k = 999.9.',
      ar: 'نقاء المعدن بالآلاف. 22 عيار = 916.',
    },
  },
  {
    id: 'altin-standardi',
    term: { tr: 'Altın Standardı', en: 'Gold Standard', ar: 'معيار الذهب' },
    cat: 'altin',
    def: {
      tr: 'Bir ülkenin para biriminin sabit miktarda altına dönüştürülebildiği ekonomik sistem. 19. yy\'ın ortası – 1971 (ABD) arasında egemendi.',
      en: 'Monetary system where currency is directly convertible to a fixed amount of gold. Dominant from mid-19th century until 1971 (US).',
      ar: 'نظام نقدي يربط العملة بالذهب.',
    },
  },
  {
    id: 'solidus-coin',
    term: { tr: 'Solidus', en: 'Solidus', ar: 'سوليدوس' },
    cat: 'altin',
    def: {
      tr: '4. yüzyılda I. Konstantin tarafından basılan Roma altın sikkesi. 24 keratia ağırlığındaydı — bugünkü 24 ayar sisteminin kökeni.',
      en: 'A Roman gold coin issued by Constantine I in the 4th century, weighing 24 keratia — the origin of today\'s 24-karat system.',
      ar: 'عملة ذهبية رومانية أصل نظام العيار 24.',
    },
    cite: ['etymonline'],
  },
  {
    id: 'elektrum',
    term: { tr: 'Elektrum', en: 'Electrum', ar: 'إلكترم' },
    cat: 'altin',
    def: {
      tr: 'Altın ve gümüşün doğada bulunan alaşımı (%60-90 altın + gümüş). Lidya sikkeleri (M.Ö. ~600) bu metalden yapılmıştır.',
      en: 'Natural alloy of gold and silver (60-90% gold + silver). Lydian coins (c. 600 BCE) were minted from it.',
      ar: 'سبيكة طبيعية من الذهب والفضة.',
    },
  },
  {
    id: 'mucur',
    term: { tr: 'Meşgur / Hurdaaltın', en: 'Scrap Gold', ar: 'ذهب مستعمل' },
    cat: 'altin',
    def: {
      tr: 'Eski takılardan veya sanayi atıklarından rafine edilen altın. Piyasadaki altının yaklaşık %25\'i her yıl mücur olarak yeniden dolaşıma girer.',
      en: 'Gold refined from old jewelry or industrial scrap. About 25% of annual gold supply comes from scrap recycling.',
      ar: 'ذهب معاد تدويره.',
    },
  },

  // ─── Gümüş ──────────────────────────────────────────────────
  {
    id: 'sterling',
    term: { tr: 'Sterling', en: 'Sterling Silver', ar: 'فضة إسترلينج' },
    cat: 'gumus',
    def: {
      tr: '%92,5 gümüş + %7,5 bakır alaşımı. 1851 İngiltere Gümüş Damgalama Yasası\'nda standart edildi.',
      en: '92.5% silver + 7.5% copper alloy. Standardized by the 1851 British hallmarking act.',
      ar: 'فضة إسترلينج 925.',
    },
    etymology: {
      tr: 'Olasılıkla Normanların "easterling" parasından — Doğu Almanya\'dan gelen gümüş tüccarları için kullanılan terim.',
      en: 'Likely from the Norman "easterling" — silver merchants from eastern Germany.',
      ar: 'من "إيسترلينغ" تجار الفضة.',
    },
    cite: ['etymonline'],
  },
  {
    id: 'kararma',
    term: { tr: 'Kararma (tarnish)', en: 'Tarnish', ar: 'اسوداد' },
    cat: 'gumus',
    def: {
      tr: 'Gümüşün havadaki hidrojen sülfür (H₂S) ile reaksiyona girip gümüş sülfüre (Ag₂S) dönüşmesi. Siyahımsı yüzey katmanı oluşur.',
      en: 'Silver reacting with atmospheric hydrogen sulfide (H₂S) to form silver sulfide (Ag₂S) — a blackish surface layer.',
      ar: 'تفاعل الفضة مع كبريتيد الهيدروجين.',
    },
  },
  {
    id: 'britannia-silver',
    term: { tr: 'Britannia Gümüşü', en: 'Britannia Silver', ar: 'فضة بريتانيا' },
    cat: 'gumus',
    def: {
      tr: '%95,84 (958 milyem) gümüş alaşımı. 1697\'de İngiltere\'de sterling\'den daha saf bir standart olarak tanımlandı.',
      en: 'Silver alloy of 95.84% (958‰) purity. Defined in England in 1697 as a purer standard than sterling.',
      ar: 'فضة 958 من إنجلترا.',
    },
  },
  {
    id: 'niello',
    term: { tr: 'Niello / Savat', en: 'Niello', ar: 'سواد' },
    cat: 'zanaat',
    def: {
      tr: 'Oyulmuş gümüş yüzeye gümüş-bakır-kurşun-kükürt alaşımı siyah dolgu yapma tekniği. Midyat\'ta hâlâ uygulanır.',
      en: 'Technique of filling engraved silver with a silver-copper-lead-sulfur black alloy. Still practiced in Midyat.',
      ar: 'تقنية حشو الفضة بسبيكة سوداء.',
    },
  },

  // ─── Pırlanta ve gemoloji ─────────────────────────────────────
  {
    id: 'crown-angle',
    term: { tr: 'Taç Açısı', en: 'Crown Angle', ar: 'زاوية التاج' },
    cat: 'pirlanta',
    def: {
      tr: 'Pırlantanın üst kısmının (taç) masa yüzeyiyle yaptığı açı. Tolkowsky ideali 34,5°; GIA "Excellent" için 31-36°.',
      en: 'Angle between the diamond\'s crown and its table facet. Tolkowsky ideal: 34.5°; GIA "Excellent" range: 31-36°.',
      ar: 'زاوية تاج الماس.',
    },
    cite: ['tolkowsky-1919'],
  },
  {
    id: 'pavilion',
    term: { tr: 'Alt Taraf (Pavilion)', en: 'Pavilion', ar: 'القاعدة' },
    cat: 'pirlanta',
    def: {
      tr: 'Pırlantanın kuşak altındaki konik alt kısmı. Işığın taşa giriş ve yansıma bölgesi; ideal açı 40,75°.',
      en: 'The conical lower portion of a diamond below the girdle. Where light enters and reflects; ideal angle 40.75°.',
      ar: 'الجزء السفلي المخروطي للماس.',
    },
    cite: ['tolkowsky-1919'],
  },
  {
    id: 'girdle',
    term: { tr: 'Kuşak (Girdle)', en: 'Girdle', ar: 'حزام الماس' },
    cat: 'pirlanta',
    def: {
      tr: 'Pırlantanın en geniş yerindeki ince halka. Taçla pavilion\'u ayırır; kalınlığı "çok ince" ile "çok kalın" arasında derecelendirilir.',
      en: 'The thin band at the widest part of a diamond, separating crown from pavilion. Graded from "extremely thin" to "extremely thick".',
      ar: 'الحزام الفاصل بين التاج والقاعدة.',
    },
  },
  {
    id: 'cleavage',
    term: { tr: 'Bölünme', en: 'Cleavage', ar: 'انشقاق' },
    cat: 'pirlanta',
    def: {
      tr: 'Bir kristalin belirli düzlemler boyunca kolayca kırılma eğilimi. Elmas oktahedral yönlerde mükemmel bölünme gösterir — kesimin temeli.',
      en: 'A crystal\'s tendency to split along specific planes. Diamond has perfect cleavage in octahedral directions — the basis of cutting.',
      ar: 'انشقاق البلورات في اتجاهات معينة.',
    },
  },
  {
    id: 'hpht-treatment',
    term: { tr: 'HPHT İşlemi', en: 'HPHT Treatment', ar: 'معالجة HPHT' },
    cat: 'pirlanta',
    def: {
      tr: 'Yüksek Basınç Yüksek Sıcaklık — doğal pırlantaları renkçe iyileştirmek veya lab pırlantası üretmek için kullanılır. Tespit edilebilir.',
      en: 'High Pressure High Temperature — used to improve natural diamond color or grow lab diamonds. Detectable by gemologists.',
      ar: 'معالجة بضغط وحرارة عاليين.',
    },
  },
  {
    id: 'cvd',
    term: { tr: 'CVD (Kimyasal Buhar Biriktirme)', en: 'CVD (Chemical Vapor Deposition)', ar: 'ترسيب بالبخار الكيميائي' },
    cat: 'pirlanta',
    def: {
      tr: 'Karbon gazının düşük basınç altında ısıtılarak pırlanta kristaline dönüştürülmesi. HPHT\'nin yanında ikinci ana lab pırlanta üretim yöntemi.',
      en: 'Growing diamond crystal from carbon gas under low pressure. The second major lab-diamond method alongside HPHT.',
      ar: 'زراعة الماس من غاز الكربون.',
    },
  },
  {
    id: 'conflict-diamond',
    term: { tr: 'Çatışma Elması', en: 'Conflict Diamond', ar: 'ماس الدم' },
    cat: 'pirlanta',
    def: {
      tr: 'Silahlı çatışma bölgelerinden savaş finansmanı amacıyla satılan elmas. Kimberley Süreci (2003) bunları pazar dışına itmeyi amaçlar.',
      en: 'Diamond mined in war zones to finance conflict. The Kimberley Process (2003) aims to remove these from the market.',
      ar: 'ماس من مناطق الصراع.',
    },
  },

  // ─── Renkli Taşlar ────────────────────────────────────────────
  {
    id: 'korund-fam',
    term: { tr: 'Korund Ailesi', en: 'Corundum Family', ar: 'عائلة الكوروند' },
    cat: 'renkli-taslar',
    def: {
      tr: 'Alüminyum oksit (Al₂O₃) minerali ve varyeteleri: krom içeriyorsa yakut, demir+titanyum içeriyorsa safir. Mohs 9.',
      en: 'Aluminum oxide (Al₂O₃) and its varieties: ruby (with chromium) and sapphire (with iron+titanium). Mohs 9.',
      ar: 'عائلة كوروند: الياقوت والصفير.',
    },
  },
  {
    id: 'beryl-fam',
    term: { tr: 'Beril Ailesi', en: 'Beryl Family', ar: 'عائلة البيريل' },
    cat: 'renkli-taslar',
    def: {
      tr: 'Berilyum alüminyum silikat: zümrüt (krom ile yeşil), akuamarin (demir ile mavi), morganit (pembe), heliodor (sarı).',
      en: 'Beryllium aluminum silicate: emerald (chromium → green), aquamarine (iron → blue), morganite (pink), heliodor (yellow).',
      ar: 'عائلة البيريل: الزمرد والأكوامارين.',
    },
  },
  {
    id: 'piezoelectric',
    term: { tr: 'Piezoelektrik', en: 'Piezoelectricity', ar: 'كهرضغطية' },
    cat: 'renkli-taslar',
    def: {
      tr: 'Basınç altında elektrik üreten malzeme özelliği. Turmalin ve kuvars doğal piezoelektrik taşlardır — kuvars saatleri bu özelliği kullanır.',
      en: 'The ability to generate electricity under pressure. Tourmaline and quartz are naturally piezoelectric — used in quartz watches.',
      ar: 'توليد كهرباء تحت الضغط.',
    },
  },
  {
    id: 'refractive-index',
    term: { tr: 'Kırılma İndisi', en: 'Refractive Index (RI)', ar: 'معامل الانكسار' },
    cat: 'renkli-taslar',
    def: {
      tr: 'Işığın taşa girerken ne kadar yavaşladığını gösteren sayı. Pırlanta 2,42 (çok yüksek, parlaklığın sebebi); cam ~1,5.',
      en: 'How much light slows down entering a stone. Diamond: 2.42 (very high, source of its brilliance); glass: ~1.5.',
      ar: 'مقياس سرعة الضوء داخل الحجر.',
    },
  },
  {
    id: 'play-of-color',
    term: { tr: 'Oyun-Renk', en: 'Play-of-Color', ar: 'لعب اللون' },
    cat: 'renkli-taslar',
    def: {
      tr: 'Opal\'da görülen renk değiştiren parıldama. Taşın içindeki silisyum kürecikleri ışığı prizma gibi ayırır.',
      en: 'The color-shifting sparkle seen in opal. Microscopic silica spheres inside diffract light like a prism.',
      ar: 'ظاهرة اللون المتغير في الأوبال.',
    },
  },
  {
    id: 'asterism',
    term: { tr: 'Asterizm (Yıldızlı)', en: 'Asterism', ar: 'نجمية' },
    cat: 'renkli-taslar',
    def: {
      tr: 'Bazı safir ve yakutlarda görülen 6 ışınlı yıldız efekti. Rutile iğnelerinin kesim düzlemiyle hizalanmasından doğar ("cabochon" kesimde görünür).',
      en: 'A 6-rayed star effect in some sapphires and rubies. Caused by rutile needles aligned with the cut plane; visible in cabochon cuts.',
      ar: 'نجم 6 شعاع في بعض الياقوت والصفير.',
    },
  },

  // ─── Zanaat ──────────────────────────────────────────────────
  {
    id: 'cloisonne',
    term: { tr: 'Mine (Cloisonné)', en: 'Cloisonné', ar: 'مينا كلوازوني' },
    cat: 'zanaat',
    def: {
      tr: 'Metal iskelete telle hücreler (Fransızca "cloisons") oluşturup içlerini renkli cam tozu ile doldurup fırınlama tekniği. Bizans\'tan Çin\'e yayıldı.',
      en: 'Technique of forming wire cells (French "cloisons") on metal and filling with colored glass powder before firing. Spread from Byzantium to China.',
      ar: 'تقنية الخلايا السلكية مع المينا.',
    },
  },
  {
    id: 'hallmark',
    term: { tr: 'Damga', en: 'Hallmark', ar: 'ختم' },
    cat: 'zanaat',
    def: {
      tr: 'Değerli metalin saflık ve köken onayını gösteren resmi işaret. Türkiye\'de "damga" veya "ayar damgası" denir; 1300\'lerden beri uygulanır.',
      en: 'Official mark certifying precious metal purity and origin. In use since the 1300s.',
      ar: 'ختم رسمي يضمن نقاء المعدن.',
    },
  },
];

// Merge helper — ana glossary ile birleşik liste döner
export function allGlossaryTerms(baseGlossary) {
  return [...baseGlossary, ...glossaryExtended];
}

export const extendedCount = glossaryExtended.length;
