/**
 * teacherQuestionBanks.js — Faz 7
 *
 * Her ders planı için 5 çoktan seçmeli + 2 açık uçlu soru bankası.
 * Raporun 4.4 bölümündeki tabloya göre hazırlandı. Öğretmenler sınıf
 * değerlendirmelerinde veya exit ticket olarak kullanabilir.
 *
 * Şema:
 *   planId:     lessonPlans.js'deki ders planı id'si
 *   mcq:        [{ id, question:{tr,en,ar}, options:[{tr,en,ar}],
 *                  correctIndex, explanation:{tr,en,ar} }]
 *   open:       [{ id, question:{tr,en,ar}, rubric?:{tr,en,ar} }]
 *
 * Cevap anahtarı öğretmene özel tutulmalı. UI tarafında öğrenci gördüğünde
 * correctIndex ve explanation gizlenir. Açık uçlularda rubric sadece
 * öğretmen paneline gelir.
 */

const mkq = (tr, en, ar) => ({ tr, en, ar });

export const teacherQuestionBanks = {
  // ═══════════════════════════════════════════════════════════════
  // 1. Mohs Sertlik Testi
  // ═══════════════════════════════════════════════════════════════
  'mohs-scratch-test': {
    mcq: [
      {
        id: 'mohs-1',
        question: mkq(
          'Mohs sertlik skalasında 10\'uncu basamak hangi mineraldir?',
          'Which mineral sits at Mohs hardness 10?',
          'أي معدن في صلابة موس 10؟',
        ),
        options: [
          mkq('Kuvars', 'Quartz', 'كوارتز'),
          mkq('Topaz', 'Topaz', 'توباز'),
          mkq('Korund', 'Corundum', 'كوروند'),
          mkq('Elmas', 'Diamond', 'ماس'),
        ],
        correctIndex: 3,
        explanation: mkq(
          'Elmas, Mohs\'un en üst basamağıdır (10). Saf karbon atomlarının tetrahedral bağları bu sertliği verir.',
          'Diamond is at the top of Mohs (10). The tetrahedral bonding of pure carbon atoms gives this hardness.',
          'الماس في قمة موس بسبب الروابط الرباعية السطوح.',
        ),
      },
      {
        id: 'mohs-2',
        question: mkq(
          'Bir taş bakır parayla çizilebiliyor ama tırnakla çizilemiyor. Sertliği yaklaşık kaçtır?',
          'A stone can be scratched by a copper coin but not by a fingernail. Its hardness is about?',
          'حجر يُخدش بالنحاس لا بالظفر — صلابته حوالي؟',
        ),
        options: [
          mkq('1-2 arası', 'Between 1-2', 'بين 1-2'),
          mkq('2.5-3 arası', 'Between 2.5-3', 'بين 2.5-3'),
          mkq('5-6 arası', 'Between 5-6', 'بين 5-6'),
          mkq('7-8 arası', 'Between 7-8', 'بين 7-8'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Tırnak Mohs 2.5, bakır para Mohs 3. Taş ikisinin arasında (2.5-3) bir değerdedir.',
          'Fingernail is Mohs 2.5, copper coin is 3. The stone falls between them.',
          'الظفر 2.5 والنحاس 3 — الحجر بين الاثنين.',
        ),
      },
      {
        id: 'mohs-3',
        question: mkq(
          'Mohs skalası ne tür bir ölçek türüdür?',
          'What kind of scale is the Mohs scale?',
          'ما نوع مقياس موس؟',
        ),
        options: [
          mkq('Mutlak sayısal ölçek', 'Absolute numerical scale', 'مقياس مطلق رقمي'),
          mkq('Logaritmik ölçek', 'Logarithmic scale', 'مقياس لوغاريتمي'),
          mkq('Göreceli/sıralı ölçek', 'Relative / ordinal scale', 'مقياس نسبي'),
          mkq('Sıcaklık ölçeği', 'Temperature scale', 'مقياس حراري'),
        ],
        correctIndex: 2,
        explanation: mkq(
          'Mohs göreceli bir ölçektir: "hangisi hangisini çiziyor?" sorusuna dayalı sıralama. Mohs 10 (elmas) Mohs 9 (korund) değerinden 10 kat değil, yaklaşık 4 kat daha serttir.',
          'Mohs is a relative scale based on which scratches which. Diamond (10) isn\'t 10× harder than corundum (9), but roughly 4× harder.',
          'مقياس نسبي لا مطلق.',
        ),
      },
      {
        id: 'mohs-4',
        question: mkq(
          'İki mineral birbirini karşılıklı çizebiliyorsa ne söyleriz?',
          'If two minerals scratch each other, what do we conclude?',
          'إذا خدش المعدنان بعضهما؟',
        ),
        options: [
          mkq('Biri diğerinden çok sert', 'One is much harder', 'أحدهما أصلب بكثير'),
          mkq('Aynı sertlikte', 'They have equal hardness', 'متساويان في الصلابة'),
          mkq('Biri çatladı', 'One cracked', 'انكسر أحدهما'),
          mkq('Test hatalı', 'Test was wrong', 'الاختبار خاطئ'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Her ikisi birbirini çiziyorsa Mohs değerleri eşit (ya da çok yakın) demektir. Apatit ve florit gibi.',
          'Mutual scratching means roughly equal Mohs values. Apatite and fluorite, for example.',
          'متساويان أو قريبان.',
        ),
      },
      {
        id: 'mohs-5',
        question: mkq(
          'Mücevher bakımı açısından Mohs değeri düşük bir taşa ne önerilir?',
          'For jewelry care, what\'s recommended for a low-Mohs stone?',
          'لرعاية حجر بصلابة منخفضة؟',
        ),
        options: [
          mkq('Günlük yüzükte kullan', 'Use in daily-wear rings', 'استخدمه يومياً'),
          mkq('Ultrasonik temizleyiciye koy', 'Use ultrasonic cleaner', 'تنظيف بالموجات'),
          mkq('Özel çantada sakla, nadiren kullan', 'Store in soft pouch, wear rarely', 'في كيس خاص'),
          mkq('Üstüne başka taş sürt', 'Rub another stone on it', 'افركه بحجر آخر'),
        ],
        correctIndex: 2,
        explanation: mkq(
          'Mohs < 6 olan taşlar kolay çizilir; günlük kullanımda korunmalı, yumuşak bezde saklanmalı. Opal (Mohs 5-6), turkuvaz (5-6), ametist (7) gibi.',
          'Stones below Mohs 6 scratch easily; store in a soft pouch, wear rarely. Opal, turquoise, amethyst.',
          'أحجار أقل من 6 تتلف بسهولة.',
        ),
      },
    ],
    open: [
      {
        id: 'mohs-open-1',
        question: mkq(
          'Mohs skalasını gerçek bir kuyumcu dükkânında hangi amaçla kullanabilir? Senaryo yazarak açıkla.',
          'How might a real jeweler use the Mohs scale? Write a short scenario.',
          'كيف يستخدم الصائغ مقياس موس؟',
        ),
        rubric: mkq(
          'Beklenen cevap: sahtelik kontrolü, bakım önerisi, yüzük taşı seçimi, çizik sonrası şikayet değerlendirmesi.',
          'Expected: fake detection, care advice, ring-stone selection, post-damage evaluation.',
          'المتوقع: كشف التزوير، نصائح الرعاية، اختيار أحجار الخواتم.',
        ),
      },
      {
        id: 'mohs-open-2',
        question: mkq(
          'Mohs sertliğinin düşük olduğu bir taşla bir yüzük tasarlayacaksın. Hangi önlemleri alırdın?',
          'Design a ring with a low-Mohs stone. What precautions would you take?',
          'صمّم خاتماً بحجر صلابته منخفضة.',
        ),
        rubric: mkq(
          'Beklenen: koruyucu yuva (bezel), kalın kenar, günlük değil özel kullanım, yumuşak temizlik.',
          'Expected: bezel setting, thick edge, special-occasion wear, gentle cleaning.',
          'غطاء واقٍ واستخدام محدود.',
        ),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. Pırlanta Kesimi ve Işık
  // ═══════════════════════════════════════════════════════════════
  'pirlanta-kesim-isik': {
    mcq: [
      {
        id: 'kesim-1',
        question: mkq(
          'Işığın yansıması hangi fizik yasasına göre çalışır?',
          'Light reflection follows which physics law?',
          'انعكاس الضوء يخضع لأي قانون؟',
        ),
        options: [
          mkq('Gelen açı = yansıyan açı', 'Angle of incidence = angle of reflection', 'زاوية السقوط = زاوية الانعكاس'),
          mkq('Gelen açı > yansıyan açı', 'Incidence > reflection', 'السقوط > الانعكاس'),
          mkq('Yansıma hep 90°', 'Reflection is always 90°', 'دائماً 90°'),
          mkq('Işık yansımaz, sadece soğurulur', 'Light only absorbs, doesn\'t reflect', 'لا ينعكس'),
        ],
        correctIndex: 0,
        explanation: mkq(
          'Yansıma yasası: gelen ışın açısı, yansıyan ışın açısına eşittir (normalle aynı düzlemde).',
          'Law of reflection: angle of incidence equals angle of reflection (same plane with the normal).',
          'قانون الانعكاس: الزاويتان متساويتان.',
        ),
      },
      {
        id: 'kesim-2',
        question: mkq(
          'Brilliant kesim pırlantanın pavyon açısı ideal olarak yaklaşık kaç derecedir?',
          'Optimal pavilion angle for a brilliant-cut diamond is about?',
          'زاوية البافيليون المثالية حوالي؟',
        ),
        options: [
          mkq('20°', '20°', '20°'),
          mkq('40-42°', '40-42°', '40-42°'),
          mkq('60°', '60°', '60°'),
          mkq('90°', '90°', '90°'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Tolkowsky 1919\'da bu açıyı matematiksel olarak optimize etti: ~40.75°. Bu açının dışında ışık alt kısımdan kaçar.',
          'Tolkowsky optimized this in 1919: ~40.75°. Outside this, light escapes through the bottom.',
          'حسب توليكوفسكي 1919.',
        ),
      },
      {
        id: 'kesim-3',
        question: mkq(
          'Pırlantada "table" hangi bölgedir?',
          'Where is the "table" on a diamond?',
          'ما "السطح" في الماسة؟',
        ),
        options: [
          mkq('Alt sivri uç', 'Bottom point', 'النقطة السفلى'),
          mkq('Orta kuşak', 'Middle girdle', 'الحزام الأوسط'),
          mkq('Üstteki düz geniş yüzey', 'Flat wide upper face', 'السطح العلوي المسطح'),
          mkq('Yan yüzler', 'Side facets', 'الأوجه الجانبية'),
        ],
        correctIndex: 2,
        explanation: mkq(
          '"Table" pırlantanın en geniş, düz üst yüzeyidir. Işığın ana giriş kapısıdır.',
          'The "table" is the wide, flat top face — light\'s main entry.',
          'السطح العلوي هو "الطاولة".',
        ),
      },
      {
        id: 'kesim-4',
        question: mkq(
          'Çok sığ kesilmiş bir pırlantada ne olur?',
          'What happens with a too-shallow diamond cut?',
          'ماذا لو القطع ضحل جداً؟',
        ),
        options: [
          mkq('Daha parlak olur', 'Sparkles more', 'يلمع أكثر'),
          mkq('Işık dipten kaçar, donuk görünür', 'Light escapes bottom, looks dull', 'يهرب الضوء من الأسفل'),
          mkq('Rengi değişir', 'Color changes', 'يتغير اللون'),
          mkq('Daha sert olur', 'Becomes harder', 'يصبح أصلب'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Pavyon çok sığsa ışık tam yansımaz ve alt kısımdan dışarı çıkar — pırlanta donuk görünür.',
          'Too-shallow pavilion fails total internal reflection; light leaks out the bottom, looking dull.',
          'ينكسر الضوء من الأسفل.',
        ),
      },
      {
        id: 'kesim-5',
        question: mkq(
          'Cam boncuk pırlanta gibi parlayamaz çünkü:',
          'A glass bead can\'t sparkle like a diamond because:',
          'لماذا لا يلمع الزجاج مثل الماس؟',
        ),
        options: [
          mkq('Cam renksizdir', 'Glass is colorless', 'الزجاج شفاف'),
          mkq('Kırılma indisi çok düşük', 'Its refractive index is much lower', 'معامل الانكسار أقل'),
          mkq('Cam daha yumuşaktır', 'Glass is softer', 'الزجاج أنعم'),
          mkq('Cam daha ağırdır', 'Glass is heavier', 'الزجاج أثقل'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Pırlanta kırılma indisi 2.42, cam ~1.5. Daha yüksek kırılma indisi → iç yansıma daha güçlü → daha parlak.',
          'Diamond\'s refractive index is 2.42, glass ~1.5. Higher index means stronger internal reflection and more sparkle.',
          'معامل الانكسار أعلى في الماس.',
        ),
      },
    ],
    open: [
      {
        id: 'kesim-open-1',
        question: mkq(
          'Kesim kötü olursa ışık neden kaçar? Basit bir diyagramla açıkla.',
          'Why does light escape with a bad cut? Explain with a simple diagram.',
          'لماذا يهرب الضوء عند قطع سيئ؟',
        ),
        rubric: mkq(
          'Beklenen: ışın izi çizimi, pavyon açısı fazla/sığ olduğunda tam yansımanın olmaması, kritik açı kavramı.',
          'Expected: ray-trace sketch, failure of total internal reflection when pavilion is too steep/shallow, critical-angle concept.',
          'رسم بياني للأشعة وفشل الانعكاس الكلي.',
        ),
      },
      {
        id: 'kesim-open-2',
        question: mkq(
          'Bir pırlanta kesim şemasında crown, table, girdle, pavilion, culet bölümlerini işaretleyip açıkla.',
          'Label crown, table, girdle, pavilion, culet on a diamond diagram and explain each.',
          'علّم الأجزاء على مخطط الماس.',
        ),
        rubric: mkq(
          'Beklenen: doğru yerleştirme + her bölümün işlevi (table: giriş, pavilion: yansıma, girdle: çap, culet: alt nokta).',
          'Expected: correct placement plus function of each part.',
          'المواقع الصحيحة والوظائف.',
        ),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. Beyaz Işık ve Renkli Taşlar
  // ═══════════════════════════════════════════════════════════════
  'beyaz-isik-renkli-taslar': {
    mcq: [
      {
        id: 'renk-1',
        question: mkq(
          'Beyaz ışık aslında:',
          'White light is actually:',
          'الضوء الأبيض هو:',
        ),
        options: [
          mkq('Sadece beyaz', 'Just white', 'أبيض فقط'),
          mkq('Renksiz', 'Colorless', 'بلا لون'),
          mkq('Tüm renkli ışınların toplamı', 'All colored lights combined', 'مجموع كل الألوان'),
          mkq('Mavi + kırmızı', 'Blue + red', 'أزرق + أحمر'),
        ],
        correctIndex: 2,
        explanation: mkq(
          'Beyaz ışık kırmızıdan mora kadar tüm dalga boylarının karışımıdır. Prizma bu karışımı ayırır.',
          'White light is a mix of all wavelengths from red to violet. A prism separates them.',
          'مجموع كل الأطوال الموجية.',
        ),
      },
      {
        id: 'renk-2',
        question: mkq(
          'Yeşil bir zümrüt neden yeşil görünür?',
          'Why does an emerald look green?',
          'لماذا يبدو الزمرد أخضر؟',
        ),
        options: [
          mkq('İçinde yeşil boya var', 'Contains green paint', 'يحوي صبغة خضراء'),
          mkq('Yeşil dalga boyunu yansıtır, diğerlerini soğurur', 'Reflects green wavelength, absorbs others', 'يعكس الأخضر ويمتص الباقي'),
          mkq('Sadece yeşil ışık üretir', 'Produces green light', 'ينتج ضوءاً أخضر'),
          mkq('Yeşil ısınır', 'Warms up in green', 'يحمى في الأخضر'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Zümrüt yeşil dalga boyunu yansıtır, kırmızı ve maviyi soğurur. Gözümüz yansıyan yeşil ışığı görür.',
          'Emerald reflects green wavelengths, absorbs red and blue. Our eyes see the reflected green.',
          'يعكس الأخضر ويمتص الباقي.',
        ),
      },
      {
        id: 'renk-3',
        question: mkq(
          'Yeşil bir taşa kırmızı ışık tutarsan ne görürsün?',
          'Shine red light on a green stone — what do you see?',
          'ضوء أحمر على حجر أخضر؟',
        ),
        options: [
          mkq('Yeşil', 'Green', 'أخضر'),
          mkq('Kırmızı', 'Red', 'أحمر'),
          mkq('Koyu / siyah', 'Dark / black', 'داكن / أسود'),
          mkq('Sarı', 'Yellow', 'أصفر'),
        ],
        correctIndex: 2,
        explanation: mkq(
          'Taş yeşili yansıtır, kırmızıyı soğurur. Kırmızı ışıkta yansıtacak yeşil dalga boyu yok — taş karanlık görünür.',
          'The stone reflects green, absorbs red. With only red light, there\'s no green to reflect — it appears dark.',
          'لا يعكس الأحمر.',
        ),
      },
      {
        id: 'renk-4',
        question: mkq(
          'Prizma beyaz ışığı renklerine nasıl ayırır?',
          'How does a prism split white light?',
          'كيف يفصل المنشور الضوء الأبيض؟',
        ),
        options: [
          mkq('Boyayı değiştirir', 'Changes paint', 'يغير الصبغة'),
          mkq('Farklı dalga boyları farklı açılarla kırılır', 'Different wavelengths refract at different angles', 'أطوال موجية مختلفة تنحرف بزوايا مختلفة'),
          mkq('Camı ısıtır', 'Heats the glass', 'يسخن الزجاج'),
          mkq('Işığı yansıtır sadece', 'Only reflects', 'يعكس فقط'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Farklı dalga boyları camda farklı hızda hareket eder → farklı açılarla kırılır. Kırmızı en az kırılır, mor en çok.',
          'Different wavelengths travel at different speeds through glass, refract at different angles. Red bends least, violet most.',
          'أطوال موجية مختلفة بزوايا مختلفة.',
        ),
      },
      {
        id: 'renk-5',
        question: mkq(
          'Yakut ve kırmızı garnet aynı renktedir. Neden ikisi farklı taştır?',
          'Ruby and red garnet share color. Why are they different stones?',
          'لماذا الياقوت والعقيق مختلفان؟',
        ),
        options: [
          mkq('İki farklı minerallerdir (korund vs garnet grubu)', 'Different minerals (corundum vs garnet group)', 'معدنان مختلفان'),
          mkq('Renkleri aslında farklı', 'Colors are actually different', 'ألوانهما مختلفة'),
          mkq('Ebatları farklı', 'Sizes differ', 'أحجامهما مختلفة'),
          mkq('Biri ısıtılmış', 'One is heated', 'أحدهما مسخن'),
        ],
        correctIndex: 0,
        explanation: mkq(
          'Yakut = korund (Al₂O₃), garnet = farklı bir silikat ailesi. Sertlik, yoğunluk ve kırılma indisi farklı. Renk tek başına tanı değildir.',
          'Ruby = corundum (Al₂O₃), garnet = a different silicate family. Different hardness, density, refractive index. Color alone isn\'t ID.',
          'معادن مختلفة بخصائص مختلفة.',
        ),
      },
    ],
    open: [
      {
        id: 'renk-open-1',
        question: mkq(
          'Bir taşın rengi gözlemciye nasıl ulaşır? Fiziksel yolculuğu adım adım yaz.',
          'How does a stone\'s color reach the observer? Write the physical journey step by step.',
          'كيف يصل لون الحجر للعين؟',
        ),
        rubric: mkq(
          'Beklenen: ışık kaynağı → taşa çarpma → dalga boyu seçici soğurma/yansıma → yansıyan ışığın göze ulaşması → retinada algı.',
          'Expected: light source → hits stone → wavelength-selective absorption/reflection → reflected light reaches eye → retinal perception.',
          'المصدر والانعكاس والإدراك.',
        ),
      },
      {
        id: 'renk-open-2',
        question: mkq(
          'Renk ve kimlik ilişkisi neden tek başına yeterli değildir? Gemolojik kanıt hiyerarşisi perspektifinden yaz.',
          'Why is color-to-identity insufficient alone? Write from a gemological evidence hierarchy perspective.',
          'لماذا اللون غير كافٍ للتعرف؟',
        ),
        rubric: mkq(
          'Beklenen: çok taşın benzer renk alabileceği + ısıtma/boyama müdahaleleri + sentetik üretim + ikincil testlerin (sertlik, yoğunluk, kırılma) gerekliliği.',
          'Expected: many stones share a color, treatments, synthetics, need for secondary tests (hardness, density, refraction).',
          'أحجار كثيرة نفس اللون؛ نحتاج اختبارات ثانوية.',
        ),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. Kuyumcu Bütçesi
  // ═══════════════════════════════════════════════════════════════
  'kuyumcu-butcesi': {
    mcq: [
      {
        id: 'butce-1',
        question: mkq(
          '22 ayar altın yüzde kaç saf altın içerir?',
          '22-karat gold contains what % pure gold?',
          '22 قيراط كم نسبة الذهب الخالص؟',
        ),
        options: [
          mkq('~75%', '~75%', '~75%'),
          mkq('~83%', '~83%', '~83%'),
          mkq('~92%', '~92%', '~92%'),
          mkq('100%', '100%', '100%'),
        ],
        correctIndex: 2,
        explanation: mkq(
          '22/24 = 0.9166... yani yaklaşık %91.7 saf altın, geri kalan bakır veya gümüş alaşımı.',
          '22/24 = ~0.917 or about 91.7% pure gold; the rest is copper/silver alloy.',
          '22÷24 ≈ 91.7٪.',
        ),
      },
      {
        id: 'butce-2',
        question: mkq(
          '14 ayar altın yüzde kaç saf altın içerir?',
          '14-karat gold contains what % pure gold?',
          '14 قيراط كم نسبة الذهب؟',
        ),
        options: [
          mkq('~50%', '~50%', '~50%'),
          mkq('~58.5%', '~58.5%', '~58.5%'),
          mkq('~75%', '~75%', '~75%'),
          mkq('~90%', '~90%', '~90%'),
        ],
        correctIndex: 1,
        explanation: mkq(
          '14/24 ≈ 0.583, yani %58.3 saf altın. Avrupa ve ABD\'de en yaygın takı ayarıdır.',
          '14/24 ≈ 0.583 or 58.3% pure gold. Most common jewelry karat in Europe and the US.',
          '14÷24 ≈ 58٪.',
        ),
      },
      {
        id: 'butce-3',
        question: mkq(
          'Aynı bütçeyle hangisi daha fazla saf altın içerir: 14 ayar 10 gram mı, 22 ayar 6 gram mı?',
          'Same budget: more pure gold in 14K 10g or 22K 6g?',
          'مع نفس الميزانية: 14K 10غ أم 22K 6غ؟',
        ),
        options: [
          mkq('14 ayar 10 gram daha çok saf altın', '14K 10g has more pure gold', '14K 10غ'),
          mkq('22 ayar 6 gram daha çok saf altın', '22K 6g has more pure gold', '22K 6غ'),
          mkq('Aynı', 'Same', 'متساوٍ'),
          mkq('Cevaplanamaz', 'Cannot be answered', 'لا يُجاب'),
        ],
        correctIndex: 0,
        explanation: mkq(
          '14K 10g: 10×0.583 = 5.83g saf altın. 22K 6g: 6×0.917 = 5.50g. 14 ayar 10 gram bir tık daha fazla saf altın içerir.',
          '14K 10g: 10×0.583 = 5.83g pure. 22K 6g: 6×0.917 = 5.50g. 14K 10g has slightly more.',
          '14K 10غ: 5.83غ ذهب خالص. 22K 6غ: 5.50غ.',
        ),
      },
      {
        id: 'butce-4',
        question: mkq(
          'Bir "ihtiyaç" ve "istek" ayırımı yapan bir müşteri ne yapar?',
          'A client distinguishing need vs want would:',
          'زبون يفرّق بين الحاجة والرغبة:',
        ),
        options: [
          mkq('En pahalıyı alır', 'Buys the most expensive', 'يشتري الأغلى'),
          mkq('Bütçesine uygun, amacına uyan seçimi yapar', 'Picks what fits budget and purpose', 'يختار الأنسب'),
          mkq('Her zaman indirim bekler', 'Always waits for a sale', 'ينتظر تخفيضاً'),
          mkq('Hiç almaz', 'Doesn\'t buy', 'لا يشتري'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'İyi bütçe kararı: ihtiyacı (hediye, özel gün) belirler, isteği (belirli ayar/tasarım) bütçeyle dengeler.',
          'Good budgeting: identify need (gift, occasion), balance wants (karat, design) against budget.',
          'قرار جيد يوازن بين الحاجة والميزانية.',
        ),
      },
      {
        id: 'butce-5',
        question: mkq(
          'Günlük kullanımda hangi ayar altın yüzük daha dayanıklıdır?',
          'For daily wear, which karat ring is more durable?',
          'أي عيار أمتن للاستخدام اليومي؟',
        ),
        options: [
          mkq('24 ayar (saf)', '24K (pure)', '24 قيراط'),
          mkq('22 ayar', '22K', '22 قيراط'),
          mkq('14 ayar', '14K', '14 قيراط'),
          mkq('8 ayar', '8K', '8 قيراط'),
        ],
        correctIndex: 2,
        explanation: mkq(
          'Yüksek ayar saf altın yumuşaktır (Mohs 2.5-3). 14 ayar daha fazla alaşım içerir → daha sert, çizilmeye daha dayanıklı.',
          'High-karat gold is softer (Mohs 2.5-3). 14K with more alloy is harder and more scratch-resistant.',
          '14K أصلب بسبب السبيكة.',
        ),
      },
    ],
    open: [
      {
        id: 'butce-open-1',
        question: mkq(
          '22 ayar ile 14 ayar arasındaki farkı bütçe açısından açıkla.',
          'Explain 22K vs 14K from a budget perspective.',
          'اشرح 22K مقابل 14K من زاوية الميزانية.',
        ),
        rubric: mkq(
          'Beklenen: saf altın oranı, gram başına fiyat, aynı bütçede gram ile ayar dengesi, kullanım süresi ve dayanıklılık.',
          'Expected: pure-gold fraction, price per gram, grams-vs-karat trade-off, durability.',
          'نسبة الخالص، السعر، المتانة.',
        ),
      },
      {
        id: 'butce-open-2',
        question: mkq(
          '3.000 TL bütçesi olan bir müşteri için adil bir öneri hazırla. (Ayar + gram + tasarım + gerekçe)',
          'Prepare a fair recommendation for a 3,000 TL budget client. (Karat + grams + design + rationale)',
          'وصية عادلة لميزانية 3000 ليرة.',
        ),
        rubric: mkq(
          'Beklenen: gerçekçi fiyat varsayımı, müşteri ihtiyacını anlama, 14-18 ayar önerisi ve neden, dayanıklılık notu, etik duruş.',
          'Expected: realistic price assumption, understand client need, 14-18K recommendation with reasoning, durability note, ethics.',
          'افتراض واقعي وتبرير.',
        ),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. Periyodik Tabloda Metaller
  // ═══════════════════════════════════════════════════════════════
  'periyodik-tablo-metaller': {
    mcq: [
      {
        id: 'periyodik-1',
        question: mkq(
          'Altının kimyasal sembolü nedir?',
          'Gold\'s chemical symbol?',
          'رمز الذهب الكيميائي؟',
        ),
        options: [
          mkq('Go', 'Go', 'Go'),
          mkq('Au', 'Au', 'Au'),
          mkq('Al', 'Al', 'Al'),
          mkq('Ag', 'Ag', 'Ag'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Au, Latince "aurum" (parlak sabah) kelimesinden. Atom numarası 79.',
          'Au, from Latin "aurum" (shining dawn). Atomic number 79.',
          'Au من اللاتينية aurum.',
        ),
      },
      {
        id: 'periyodik-2',
        question: mkq(
          'Gümüş periyodik tabloda hangi blokta yer alır?',
          'Silver sits in which block of the periodic table?',
          'في أي كتلة تقع الفضة؟',
        ),
        options: [
          mkq('s-blok', 's-block', 'كتلة s'),
          mkq('p-blok', 'p-block', 'كتلة p'),
          mkq('d-blok (geçiş metalleri)', 'd-block (transition)', 'كتلة d'),
          mkq('f-blok', 'f-block', 'كتلة f'),
        ],
        correctIndex: 2,
        explanation: mkq(
          'Ag, Au, Cu, Pt, Pd gibi metaller hep d-blok geçiş metalidir. Bu blok mücevher, katalizör, iletkende anahtardır.',
          'Ag, Au, Cu, Pt, Pd are all d-block transition metals. Key in jewelry, catalysts, conductors.',
          'كل هذه المعادن في كتلة d.',
        ),
      },
      {
        id: 'periyodik-3',
        question: mkq(
          'Platin grubu metaller (PGM) kaç elementten oluşur?',
          'Platinum-group metals (PGM) include how many elements?',
          'كم عدد معادن مجموعة البلاتين؟',
        ),
        options: [
          mkq('3', '3', '3'),
          mkq('6', '6', '6'),
          mkq('10', '10', '10'),
          mkq('15', '15', '15'),
        ],
        correctIndex: 1,
        explanation: mkq(
          '6 PGM: rutenyum (Ru), rodyum (Rh), paladyum (Pd), osmiyum (Os), iridyum (Ir), platin (Pt). Hepsi yoğun, reaksiyona girmez, katalizörde kullanılır.',
          '6 PGMs: Ru, Rh, Pd, Os, Ir, Pt. All dense, inert, used as catalysts.',
          'ست معادن: Ru, Rh, Pd, Os, Ir, Pt.',
        ),
      },
      {
        id: 'periyodik-4',
        question: mkq(
          'Altının kararmamasının kimyasal sebebi nedir?',
          'Why doesn\'t gold tarnish, chemically?',
          'لماذا لا يتأكسد الذهب؟',
        ),
        options: [
          mkq('Altın kuru tutulur', 'Gold stays dry', 'يبقى جافاً'),
          mkq('Düşük reaktivite: oksijen/kükürtle kolay tepkimeye girmez', 'Low reactivity: doesn\'t easily react with O₂ or S', 'انخفاض التفاعلية'),
          mkq('Altın soğuktur', 'Gold is cold', 'الذهب بارد'),
          mkq('Altın hafif yağlıdır', 'Gold is greasy', 'الذهب دهني'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Altın "asal metal" kabul edilir: standart koşullarda oksijen, kükürt, nemle reaksiyona girmez. Bu yüzden binlerce yıl önceki altın hâlâ parlaktır.',
          'Gold is a "noble metal" — doesn\'t react with O₂, S, or moisture under normal conditions. Thousand-year-old gold still shines.',
          'الذهب معدن نبيل.',
        ),
      },
      {
        id: 'periyodik-5',
        question: mkq(
          'Beyaz altın yüzeyinde rodyum kaplama neden kullanılır?',
          'Why is rhodium plating used on white gold surfaces?',
          'لماذا طلاء الروديوم على الذهب الأبيض؟',
        ),
        options: [
          mkq('Daha ucuz', 'Cheaper', 'أرخص'),
          mkq('Daha beyaz parlaklık + kararmaya direnç', 'Whiter luster + tarnish resistance', 'لمعان أبيض ومقاومة التأكسد'),
          mkq('Manyetik yapar', 'Makes it magnetic', 'يجعله مغناطيسياً'),
          mkq('Isı iletir', 'Conducts heat', 'يوصل الحرارة'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Rodyum çok parlak beyazdır, kararmaya direnir. Beyaz altının altında sarımsı ton varsa, rodyum kaplama onu tamamen beyaz gösterir.',
          'Rhodium is brilliantly white and tarnish-resistant. Under yellowish white gold, rhodium plating restores pure white.',
          'الروديوم أبيض لامع مقاوم.',
        ),
      },
    ],
    open: [
      {
        id: 'periyodik-open-1',
        question: mkq(
          'Periyodik tablo mücevher biliminde nasıl kullanılır? Au, Ag, Pt ile somut örnek ver.',
          'How is the periodic table used in jewelry science? Give concrete examples with Au, Ag, Pt.',
          'كيف يُستخدم الجدول في علم المجوهرات؟',
        ),
        rubric: mkq(
          'Beklenen: reaktivite tahmini, alaşım tasarımı, katalitik özellikler, tanı testleri (gümüş nitrat testi gibi).',
          'Expected: predict reactivity, alloy design, catalytic properties, identification tests.',
          'تنبؤ بالتفاعلية وتصميم السبائك.',
        ),
      },
      {
        id: 'periyodik-open-2',
        question: mkq(
          'Platin ve altının kullanım farklarını açıkla. Neden biri diğerine tercih edilir?',
          'Explain differences between platinum and gold use. Why might one be preferred?',
          'الفرق بين استخدام البلاتين والذهب.',
        ),
        rubric: mkq(
          'Beklenen: platinin yoğunluğu/erime noktası/hipoalerjenliği/fiyatı vs altının renk çeşitliliği/işlenebilirliği/tarihsel değeri.',
          'Expected: platinum\'s density/melting point/hypoallergenic/price vs gold\'s color variety/malleability/historical value.',
          'كثافة، سعر، لون، تاريخ.',
        ),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. Sanal Müze Küratörlüğü
  // ═══════════════════════════════════════════════════════════════
  'sanal-muze-kuratorluk': {
    mcq: [
      {
        id: 'muze-1',
        question: mkq(
          'Bir müze etiketinde mutlaka bulunması gereken en temel bilgi hangisi değildir?',
          'Which is NOT required in a basic museum label?',
          'ما لا يجب أن يكون في البطاقة؟',
        ),
        options: [
          mkq('Objenin adı', 'Object name', 'اسم القطعة'),
          mkq('Malzeme ve tarih', 'Material and date', 'المادة والتاريخ'),
          mkq('Kaynak / lisans', 'Source / license', 'المصدر / الرخصة'),
          mkq('Küratörün ev adresi', 'Curator\'s home address', 'عنوان القيّم'),
        ],
        correctIndex: 3,
        explanation: mkq(
          'Etikette: ad, malzeme/tarih, kaynak, kısa anlatı, alt text olur. Küratör adı olabilir ama kişisel adres asla.',
          'A label has: name, material/date, source, short narrative, alt text. Curator may be credited; never personal address.',
          'العنوان الشخصي لا يُدرج.',
        ),
      },
      {
        id: 'muze-2',
        question: mkq(
          'CC BY lisansı ne anlama gelir?',
          'What does CC BY mean?',
          'ماذا تعني CC BY؟',
        ),
        options: [
          mkq('Ücretsizdir, hiç kural yok', 'Free, no rules', 'مجاني دون قواعد'),
          mkq('Kullanabilirsin ama yazarın adını belirtmelisin', 'You may use but must credit the creator', 'يجب ذكر اسم المبدع'),
          mkq('Sadece yetişkinler için', 'Adults only', 'للكبار فقط'),
          mkq('Hiç kullanılmaz', 'Cannot be used', 'ممنوع الاستخدام'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'CC BY: Creative Commons Attribution. Ticari dahil kullanabilirsin AMA yazar adı + lisans + kaynak belirtmen gerekir.',
          'CC BY: use freely (including commercially) provided you credit creator + license + source.',
          'الاستخدام مع ذكر المصدر.',
        ),
      },
      {
        id: 'muze-3',
        question: mkq(
          'Alt text neden önemlidir?',
          'Why is alt text important?',
          'لماذا النص البديل مهم؟',
        ),
        options: [
          mkq('Ekran küçükse görüntü daha iyi olur', 'Makes image smaller', 'يصغّر الصورة'),
          mkq('Görme engelli kullanıcılar ve ekran okuyucular için', 'For blind users and screen readers', 'لضعاف البصر'),
          mkq('SEO gerektirmez', 'Not needed for SEO', 'لا حاجة لـSEO'),
          mkq('Sadece yavaş internet için', 'Only for slow internet', 'للإنترنت البطيء فقط'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Alt text, görme engelli veya görselin yüklenemediği durumlardaki kullanıcıların içeriği kavramasını sağlar. WCAG 2.2 şartıdır.',
          'Alt text allows blind users and screen readers (and failed-image loads) to understand content. Required by WCAG 2.2.',
          'يضمن الوصولية.',
        ),
      },
      {
        id: 'muze-4',
        question: mkq(
          'Smithsonian Open Access görselleri hangi tür lisans sunar?',
          'Smithsonian Open Access uses which license?',
          'ما رخصة Smithsonian Open Access؟',
        ),
        options: [
          mkq('Ücretli abonelik', 'Paid subscription', 'اشتراك مدفوع'),
          mkq('CC0 / Public Domain', 'CC0 / Public Domain', 'CC0'),
          mkq('Sadece eğitim', 'Education only', 'للتعليم فقط'),
          mkq('Copyright saklı', 'All rights reserved', 'كل الحقوق محفوظة'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Smithsonian Open Access, milyonlarca 2D/3D görüntüyü CC0 olarak sunar — ticari dahil istediğin gibi kullanabilirsin. Attribution bile zorunlu değil (ama önerilir).',
          'Smithsonian Open Access publishes millions of 2D/3D images as CC0 — use freely, even commercially. Attribution not required (but recommended).',
          'صور CC0 بالملايين.',
        ),
      },
      {
        id: 'muze-5',
        question: mkq(
          'Bir temanın "koleksiyona ruh vermesi" ne demektir?',
          'What does it mean for a theme to "give soul to a collection"?',
          'ماذا يعني أن يعطي الموضوع روحاً للمجموعة؟',
        ),
        options: [
          mkq('Objeleri rastgele diz', 'Arrange objects randomly', 'ترتيب عشوائي'),
          mkq('Her obje temayı destekleyen bir seçimdir, birlikte hikâye anlatır', 'Each object supports the theme; together they tell a story', 'كل قطعة تدعم الموضوع'),
          mkq('En pahalıları seç', 'Pick the most expensive', 'الأغلى فقط'),
          mkq('Sadece yerel üretim', 'Only local production', 'محلي فقط'),
        ],
        correctIndex: 1,
        explanation: mkq(
          'Bir küratör objeyi rastgele seçmez; her biri ana temaya katkı sağlar. Bu yüzden 5 obje arası bağlantı hissedilir; ziyaretçi bir "yolculuk" yapar.',
          'A curator doesn\'t pick randomly; each object contributes to the theme. The 5 objects feel connected; the visitor travels a path.',
          'كل قطعة تخدم الموضوع.',
        ),
      },
    ],
    open: [
      {
        id: 'muze-open-1',
        question: mkq(
          'İyi bir sergi etiketi nasıl yazılır? Kendi seçtiğin bir objeye 4 satırlık örnek etiket yaz.',
          'How do you write a good exhibit label? Write a 4-line sample for an object of your choice.',
          'كيف تكتب بطاقة جيدة؟ اكتب مثالاً.',
        ),
        rubric: mkq(
          'Beklenen: başlık, malzeme/tarih, kaynak/lisans, 2 cümlelik anlatı; sadelik, doğruluk, erişilebilirlik.',
          'Expected: title, material/date, source/license, 2-sentence narrative; simplicity, accuracy, accessibility.',
          'عنوان، مادة، مصدر، قصة موجزة.',
        ),
      },
      {
        id: 'muze-open-2',
        question: mkq(
          'Bir görselin lisansı neden önemlidir? Yanlış kullanıldığında ne olabilir?',
          'Why does image licensing matter? What can go wrong?',
          'لماذا ترخيص الصور مهم؟',
        ),
        rubric: mkq(
          'Beklenen: telif hakkı ihlali, mahkeme/kaldırma talebi, etik sorumluluk, müzeye güven kaybı.',
          'Expected: copyright infringement, takedown requests, ethical responsibility, loss of trust.',
          'انتهاك حق المؤلف وفقدان الثقة.',
        ),
      },
    ],
  },
};

/**
 * Ders planı id'si için soru bankasını al.
 */
export function getQuestionBank(planId) {
  return teacherQuestionBanks[planId] || null;
}

/**
 * Rastgele n çoktan seçmeli soru al (exit ticket için).
 */
export function sampleMCQs(planId, n = 3) {
  const bank = getQuestionBank(planId);
  if (!bank) return [];
  const pool = [...bank.mcq];
  const out = [];
  while (out.length < n && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}

export const teacherQuestionBankCount = Object.keys(teacherQuestionBanks).length;
