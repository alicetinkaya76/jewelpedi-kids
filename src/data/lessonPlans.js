/* Lesson plans for JewelPedi Kids — Faz 2-C.
 *
 * Target: Turkish middle-school (ortaokul 5-8) + adapted for primary
 * (ilkokul 3-4) and high school (lise 9-10).
 *
 * Each plan has: goal, duration, materials, steps, worksheet, discussion.
 * All fields trilingual TR/EN/AR.
 */

export const lessonPlans = [
  /* ═══════════════════════════════════════════════════════
     1. Mohs Sertlik Testi (Hands-on science)
     ═══════════════════════════════════════════════════════ */
  {
    id: 'mohs-scratch-test',
    hall: 'renkli-taslar',
    accent: '#16a085',
    icon: 'amethyst',
    level: { tr: 'Ortaokul 5-8 (10-14 yaş)', en: 'Middle school (10-14)', ar: 'المرحلة المتوسطة (10-14)' },
    duration: { tr: '45 dakika', en: '45 minutes', ar: '45 دقيقة' },
    subject: { tr: 'Fen Bilimleri / Jeoloji', en: 'Science / Geology', ar: 'العلوم / الجيولوجيا' },
    title: {
      tr: 'Mohs Çizim Testi: Hangisi Hangisini Çizer?',
      en: 'Mohs Scratch Test: Which Scratches Which?',
      ar: 'اختبار الخدش: أيها يخدش الآخر؟',
    },
    goal: {
      tr: 'Öğrenciler mineral sertliğini gerçek nesnelerle ölçer ve Mohs skalasının mantığını deneyimler.',
      en: 'Students measure mineral hardness with real objects and grasp the logic of the Mohs scale.',
      ar: 'يقيس الطلاب صلابة المعادن عبر أدوات حقيقية.',
    },
    materials: {
      tr: 'Tırnak (2.5), bakır para (3), demir çivi (~4.5), cam parçası (5.5), çelik bıçak (6.5), zımpara kağıdı (~7). Her öğrenci için küçük mineral örnekleri: talk, jips, kalsit, feldspat, kuvars (veya cam bilye).',
      en: 'Fingernail (2.5), copper coin (3), iron nail (~4.5), glass shard (5.5), steel knife (6.5), sandpaper (~7). Small mineral samples per student: talc, gypsum, calcite, feldspar, quartz (or glass marble).',
      ar: 'ظفر، قطعة نقدية نحاسية، مسمار، زجاج، سكين، ورق صنفرة. عينات معدنية.',
    },
    steps: [
      {
        tr: '1. Başlangıç (5 dk): Öğrencilere "hangi mineral hangisini çizer?" sorusunu sor. Tahmin defterine yazsınlar.',
        en: '1. Opening (5 min): Ask "which mineral scratches which?" Have students write predictions in a notebook.',
        ar: '1. ابدأ بسؤال: أي معدن يخدش الآخر؟',
      },
      {
        tr: '2. Gösterim (10 dk): Tırnakla talk çizilir (yumuşak!). Cam ile kuvars denenir — cam çizilir! Şaşkınlık anı bu.',
        en: '2. Demonstration (10 min): Scratch talc with fingernail (soft!). Try glass against quartz — glass scratches! A moment of surprise.',
        ar: '2. عرض: الظفر يخدش التلك. الكوارتز يخدش الزجاج.',
      },
      {
        tr: '3. Çiftli çalışma (20 dk): Öğrenciler 2\'li gruplara ayrılır. Verilen her mineral çiftini test eder, hangisinin daha sert olduğunu belirler. Çalışma kağıdına kaydeder.',
        en: '3. Pair work (20 min): Students work in pairs. Test each given mineral pair, determining which is harder. Record on worksheet.',
        ar: '3. عمل ثنائي: الطلاب يختبرون أزواج المعادن.',
      },
      {
        tr: '4. Sıralama (5 dk): Tahtaya tüm mineralleri sertlik sırasına diz. Mohs skalası ortaya çıkar!',
        en: '4. Ranking (5 min): Together, arrange all minerals in hardness order on the board. The Mohs scale emerges!',
        ar: '4. الترتيب: رتبوا المعادن على السبورة.',
      },
      {
        tr: '5. Bağlantı (5 dk): "Yüzüğünüz neden çizilmez? Alyans malzemesi seçerken sertlik neden önemli?" sorularını tartış.',
        en: '5. Connection (5 min): Discuss "why doesn\'t your ring get scratched? Why is hardness critical when choosing wedding band material?"',
        ar: '5. ربط: لماذا خاتمك لا يُخدش؟',
      },
    ],
    worksheet: [
      {
        tr: 'Tırnakla çizilen mineraller (Mohs < 2.5):',
        en: 'Minerals scratched by fingernail (Mohs < 2.5):',
        ar: 'ما يخدشه الظفر:',
      },
      {
        tr: 'Bakır parayla çizilen ama tırnakla çizilmeyen (Mohs 2.5–3):',
        en: 'Scratched by copper coin but not fingernail (Mohs 2.5–3):',
        ar: 'ما يخدشه النحاس:',
      },
      {
        tr: 'Cam çizen mineraller (Mohs > 5.5):',
        en: 'Minerals that scratch glass (Mohs > 5.5):',
        ar: 'ما يخدش الزجاج:',
      },
      {
        tr: 'Senin tahminlerinle sonuçlar arasında fark var mıydı? Neden?',
        en: 'Were your predictions different from the results? Why?',
        ar: 'هل تطابقت تنبؤاتك مع النتائج؟ لماذا؟',
      },
      {
        tr: 'Elmas (Mohs 10) ile kuvars (Mohs 7) arasındaki fark ne kadardır — eşit mi?',
        en: 'How much is the difference between diamond (Mohs 10) and quartz (Mohs 7) — equal gap?',
        ar: 'الفرق بين الماس والكوارتز هل هو متساوٍ؟',
      },
    ],
    discussion: [
      {
        tr: 'Mohs skalası "sıra" skalasıdır, "oran" skalası değil. Sence bu neden önemli?',
        en: 'Mohs is an ordinal scale, not ratio. Why does that matter?',
        ar: 'مقياس موس ترتيبي — لماذا يهم ذلك؟',
      },
      {
        tr: 'Kuyumcu bir müşteriye bir taşın "gerçek" olduğunu nasıl anlar? Hangi testler kullanılabilir?',
        en: 'How does a jeweler confirm a stone is "real" for a customer? What tests are possible?',
        ar: 'كيف يتحقق الصائغ من الحجر؟',
      },
    ],
    relatedExhibits: ['mohs-skalasi', 'zumrut', 'yakut', '4c-sistemi'],
  },

  /* ═══════════════════════════════════════════════════════
     2. Gümüş Neden Kararır? (Chemistry activity)
     ═══════════════════════════════════════════════════════ */
  {
    id: 'silver-tarnish-chemistry',
    hall: 'gumus',
    accent: '#85929e',
    icon: 'silver-coin',
    level: { tr: 'Ortaokul 6-8 (11-14 yaş)', en: 'Middle school (11-14)', ar: 'المرحلة المتوسطة (11-14)' },
    duration: { tr: '60 dakika', en: '60 minutes', ar: '60 دقيقة' },
    subject: { tr: 'Kimya', en: 'Chemistry', ar: 'الكيمياء' },
    title: {
      tr: 'Gümüş Neden Kararır ve Evde Nasıl Temizlenir?',
      en: 'Why Silver Tarnishes and How to Clean It at Home',
      ar: 'لماذا تتأكسد الفضة وكيف ننظفها في المنزل',
    },
    goal: {
      tr: 'Öğrenciler oksitlenme ve redüksiyon tepkimelerini somut, mutfak kimyası deneyimiyle anlar.',
      en: 'Students understand oxidation and reduction through a hands-on kitchen chemistry experiment.',
      ar: 'يفهم الطلاب الأكسدة والاختزال عبر تجربة عملية.',
    },
    materials: {
      tr: 'Kararmış gümüş takı veya sikke (her grup için), alüminyum folyo, kabartma tozu (1 çay kaşığı), tuz (1 çay kaşığı), sıcak su, cam kase, maşa, havlu.',
      en: 'Tarnished silver jewelry/coin (per group), aluminum foil, baking soda (1 tsp), salt (1 tsp), hot water, glass bowl, tongs, towel.',
      ar: 'فضة متأكسدة، ألمنيوم، بيكربونات، ملح، ماء ساخن، وعاء.',
    },
    steps: [
      {
        tr: '1. Gözlem (10 dk): Kararmış gümüşü incele. Neden siyah? Oksijenle mi? Öğrencilerin hipotezlerini yaz.',
        en: '1. Observation (10 min): Examine the tarnished silver. Why black? Oxygen? Record student hypotheses.',
        ar: '1. ملاحظة: لماذا الفضة سوداء؟',
      },
      {
        tr: '2. Bilgi (10 dk): Aslında oksijen değil, kükürt: 2 Ag + H₂S → Ag₂S (siyah) + H₂. Tahtaya denklem yaz.',
        en: '2. Info (10 min): It\'s not oxygen, it\'s sulfur: 2 Ag + H₂S → Ag₂S (black) + H₂. Write equation on board.',
        ar: '2. معلومة: الكبريت وليس الأكسجين.',
      },
      {
        tr: '3. Deney (20 dk): Kaseye folyo serilir. Gümüş üstüne konur. Üstüne 1 tsp kabartma tozu + 1 tsp tuz + sıcak su dökülür. Gözlemle!',
        en: '3. Experiment (20 min): Line bowl with foil. Place silver on top. Add 1 tsp baking soda + 1 tsp salt + hot water. Watch!',
        ar: '3. التجربة: رقائق الألمنيوم والفضة والماء الساخن.',
      },
      {
        tr: '4. Açıklama (10 dk): Alüminyum elektronlarını gümüşe verir, gümüş sülfür parçalanır, kükürt alüminyuma geçer. Tahtada denklem: 3 Ag₂S + 2 Al → 6 Ag + Al₂S₃.',
        en: '4. Explanation (10 min): Aluminum donates electrons to silver; silver sulfide breaks; sulfur bonds to aluminum. Equation: 3 Ag₂S + 2 Al → 6 Ag + Al₂S₃.',
        ar: '4. الشرح: الألمنيوم يعطي إلكترونات للفضة.',
      },
      {
        tr: '5. Tartışma (10 dk): Bu neden "kimya"? Başka hangi metaller oksitlenmeyi hızlı yapar? Altın neden oksitlenmez?',
        en: '5. Discussion (10 min): Why is this "chemistry"? Which other metals oxidize quickly? Why doesn\'t gold tarnish?',
        ar: '5. نقاش: لماذا الذهب لا يتأكسد؟',
      },
    ],
    worksheet: [
      {
        tr: 'Gümüş kararmasının kimyasal denklemini yaz:',
        en: 'Write the chemical equation of silver tarnishing:',
        ar: 'اكتب معادلة أكسدة الفضة:',
      },
      {
        tr: 'Deney sonrası folyo nasıl değişti? Neden?',
        en: 'How did the foil change after the experiment? Why?',
        ar: 'كيف تغير الألمنيوم؟',
      },
      {
        tr: 'Altın neden bu şekilde kararmaz? (ipucu: asil metal)',
        en: 'Why doesn\'t gold tarnish this way? (hint: noble metal)',
        ar: 'لماذا لا يتأكسد الذهب؟',
      },
      {
        tr: 'Evde büyükannenin gümüş tepsisini nasıl temizlerdin? Adım adım anlat.',
        en: 'How would you clean your grandmother\'s silver tray at home? Step by step.',
        ar: 'كيف ستنظف صينية جدتك؟',
      },
    ],
    discussion: [
      {
        tr: 'Gümüş takılar havayla temas etmesin diye nasıl saklanmalı?',
        en: 'How should silver jewelry be stored to limit air contact?',
        ar: 'كيف تُخزن الفضة؟',
      },
      {
        tr: 'Yumurta veya soğan yedikten sonra elinde gümüş yüzük varsa ne gözlemlersin?',
        en: 'If you wear a silver ring after eating eggs or onion, what might you observe?',
        ar: 'ماذا يحدث بعد أكل البيض؟',
      },
    ],
    relatedExhibits: ['gumus-bakimi', '925-ayar', 'trabzon-hasiri'],
  },

  /* ═══════════════════════════════════════════════════════
     3. Lidya ve Paranın İcadı (History)
     ═══════════════════════════════════════════════════════ */
  {
    id: 'lydia-coinage-history',
    hall: 'altin',
    accent: '#d4a017',
    icon: 'gold-coin',
    level: { tr: 'Ortaokul 6-8 + Lise', en: 'Middle school + High school', ar: 'المتوسطة والثانوية' },
    duration: { tr: '60 dakika', en: '60 minutes', ar: '60 دقيقة' },
    subject: { tr: 'Sosyal Bilgiler / Tarih', en: 'Social Studies / History', ar: 'الاجتماعيات' },
    title: {
      tr: 'Paranın İcadı: Lidya\'dan Bugüne',
      en: 'The Invention of Money: From Lydia to Today',
      ar: 'اختراع النقود: من ليديا إلى اليوم',
    },
    goal: {
      tr: 'Öğrenciler paranın neden icat edildiğini, Anadolu\'nun bu buluştaki rolünü, modern para standartlarının kökenini keşfeder.',
      en: 'Students discover why money was invented, Anatolia\'s role in this innovation, and the origins of modern monetary standards.',
      ar: 'يكتشف الطلاب لماذا اختُرعت النقود ودور الأناضول.',
    },
    materials: {
      tr: 'Dünya haritası (Anadolu görünecek şekilde), farklı ülkelerden bozuk para örnekleri (TL, USD, EUR, Riyal, vb.), çalışma kağıdı, hesap makinesi.',
      en: 'World map (showing Anatolia), coin samples from various countries (TRY, USD, EUR, Riyal, etc.), worksheet, calculator.',
      ar: 'خريطة العالم وعملات من دول مختلفة.',
    },
    steps: [
      {
        tr: '1. Giriş (10 dk): Para olmasaydı... — öğrencilere sor. Takas ekonomisinin sorunları: değer eşitleme, bölünebilirlik, taşıma.',
        en: '1. Opening (10 min): Ask "what if there were no money?" — discuss barter problems: valuing equivalence, divisibility, portability.',
        ar: '1. افتراض: ماذا لو لم تكن النقود؟',
      },
      {
        tr: '2. Lidya hikâyesi (15 dk): M.Ö. 600, Kral Alyattes ve Sart Irmağı. Doğal elektron (altın-gümüş) sikkeleri. "Ağırlık aynı, mühür aynı — güven."',
        en: '2. Lydia story (15 min): 600 BCE, King Alyattes and the Pactolus River. Natural electrum coins. "Same weight, same seal — trust."',
        ar: '2. قصة ليديا: الملك ألياتيس ونهر باكتولوس.',
      },
      {
        tr: '3. Haritada izleme (10 dk): Uşak, Eşme — gerçek Lidya\'nın konumu. Ticari güzergâhlar: Lidya → Yunanistan → Roma → bugünkü dünya paraları.',
        en: '3. Map tracing (10 min): Uşak, Eşme — the real Lydian sites. Trade routes: Lydia → Greece → Rome → today\'s world currencies.',
        ar: '3. على الخريطة: مسارات التجارة.',
      },
      {
        tr: '4. Mini etkinlik (15 dk): Gruplar kendi "para birimi" tasarlasın. İsim, sembol, ağırlık. Tahtaya asılır, oylama yapılır — en güvenilir para hangisi?',
        en: '4. Mini activity (15 min): Groups design their own "currency." Name, symbol, weight. Posted on board; vote — which is most trustworthy?',
        ar: '4. صمموا عملة خاصة بكم.',
      },
      {
        tr: '5. Kapanış (10 dk): Bugünün paraları neden "altına bağlı değil"? 1971\'de ne oldu? Bitcoin gibi dijital paralar Lidya\'nın nesi olur?',
        en: '5. Closing (10 min): Why are today\'s currencies "not gold-backed"? What happened in 1971? How do digital coins like Bitcoin relate to Lydia?',
        ar: '5. لماذا الدولار لم يعد مرتبطاً بالذهب؟',
      },
    ],
    worksheet: [
      {
        tr: 'Lidya\'nın "paranın icadı" sayılmasının 3 sebebi:',
        en: 'Three reasons Lydia is credited with "inventing money":',
        ar: 'ثلاثة أسباب تجعل ليديا مخترعة النقود:',
      },
      {
        tr: '"Karun kadar zengin" deyimi hangi Lidyalı kraldan gelir?',
        en: 'The phrase "rich as Croesus" refers to which Lydian king?',
        ar: 'من هو قارون؟',
      },
      {
        tr: 'Takas ekonomisinin 2 önemli sorununu yaz:',
        en: 'Two key problems of a barter economy:',
        ar: 'مشكلتان في اقتصاد المقايضة:',
      },
      {
        tr: 'Modern bir paranın güvenilir olması için hangi 3 özelliği olmalı?',
        en: 'Three properties a modern currency must have to be trustworthy:',
        ar: 'ثلاث خصائص للعملة الحديثة:',
      },
    ],
    discussion: [
      {
        tr: 'Lidya\'da bir köylü 5 koyun karşılığı bir inek almak istiyor. Koyunları paraya dönüştürmesi ne işe yarar?',
        en: 'A Lydian peasant wants to trade 5 sheep for 1 cow. Why does turning sheep into coin help?',
        ar: 'كيف تُسهل النقود المقايضة؟',
      },
      {
        tr: 'Bugün Türkiye\'de altın hâlâ "yastık altı" olarak saklanıyor. Bu Lidya geleneğinin devamı mı?',
        en: 'Turks still keep gold "under the pillow" today. Is this a continuation of the Lydian tradition?',
        ar: 'هل اكتناز الذهب تقليد ليدي؟',
      },
    ],
    relatedExhibits: ['altin-tarihcesi', 'ayar-sistemi', 'ceyrek-altin'],
  },

  /* ═══════════════════════════════════════════════════════
     4. Yaşayan Miras: UNESCO ve Coğrafi İşaret
     ═══════════════════════════════════════════════════════ */
  {
    id: 'unesco-intangible-heritage',
    hall: 'zanaat',
    accent: '#7f8c8d',
    icon: 'hasir-weave',
    level: { tr: 'Lise 9-11 (14-16 yaş)', en: 'High school (14-16)', ar: 'الثانوية (14-16)' },
    duration: { tr: '90 dakika (2 ders)', en: '90 minutes (2 classes)', ar: '90 دقيقة' },
    subject: { tr: 'Kültürel Miras / Sosyoloji', en: 'Cultural Heritage / Sociology', ar: 'التراث والاجتماع' },
    title: {
      tr: 'Yaşayan Miras: UNESCO ICH ve Türk Patent Coğrafi İşareti Nasıl Farklıdır?',
      en: 'Living Heritage: How UNESCO ICH and Turkish Geographical Indication Differ',
      ar: 'التراث الحي: الفرق بين قائمة اليونسكو والعلامة الجغرافية التركية',
    },
    goal: {
      tr: 'Öğrenciler "yaşayan miras"ı iki farklı koruma sisteminden inceler: (1) UNESCO\'nun uluslararası Somut Olmayan Miras listesi (Türkiye\'den 30+ unsur var — Karagöz, Âşıklık, Mevlevîlik, Türk kahvesi vb.) ve (2) Türk Patent\'in Coğrafi İşaret sistemi (Trabzon Hasırı 2004, Midyat Telkâri 2013, Siirt Savatı 2019). Bu ikisi farklı listelerdir; bir öğenin birinde olması otomatik olarak diğerinde olduğu anlamına gelmez. Trabzon Hasırı tam olarak bu durumun güzel bir örneğidir: UNESCO listesinde değildir, ama güçlü bir Coğrafi İşaret korumasına sahiptir.',
      en: 'Students examine "living heritage" through two different protection systems: (1) UNESCO\'s international Intangible Cultural Heritage list (Turkey has 30+ elements — Karagöz, Âşıklık, Mevlevî, Turkish coffee, etc.) and (2) Turkey\'s national Geographical Indication registry (Trabzon Hasır 2004, Midyat Telkâri 2013, Siirt Niello 2019). These are separate lists; being on one does not imply being on the other. Trabzon Hasır is exactly this case: not on UNESCO\'s list, but strongly protected by a Geographical Indication.',
      ar: 'يدرس الطلاب "التراث الحي" عبر نظامين: قائمة اليونسكو الدولية، ونظام العلامة الجغرافية التركي الوطني. حصير طرابزون مثال: غير مدرج في اليونسكو لكنه محمي بعلامة جغرافية.',
    },
    materials: {
      tr: 'Trabzon Hasırı videosu (YouTube\'dan), UNESCO Türkiye ICH sayfasının çıktısı (ich.unesco.org/en/state/turkiye-TR), Türk Patent CI sorgu sayfasının çıktısı (ci.turkpatent.gov.tr), dünya haritası, not defteri.',
      en: 'Trabzon Hasır video (YouTube), printout of UNESCO Türkiye ICH page (ich.unesco.org/en/state/turkiye-TR), printout of Turkish Patent GI search page (ci.turkpatent.gov.tr), world map, notebook.',
      ar: 'فيديو الحصير، طباعة صفحة اليونسكو تركيا، طباعة صفحة العلامات الجغرافية التركية، خريطة.',
    },
    steps: [
      {
        tr: '1. Kavram (15 dk): "Somut olmayan miras" nedir? El hareketi, şarkı, teknik, hikâye — sadece insan belleğinde yaşayan. Bir müze vitrinine konamaz; ancak bir usta, bir çırak, bir topluluk tarafından devam ettirilirse yaşar.',
        en: '1. Concept (15 min): What is "intangible heritage"? Hand motion, song, technique, story — living only in human memory. Can\'t be placed in a museum vitrine; it continues only if a master, an apprentice, a community carries it.',
        ar: '1. مفهوم: ما هو التراث غير المادي؟',
      },
      {
        tr: '2. Tehlike (15 dk): 1990 Trabzon — sadece 20 usta kalmış. Neden? Modernleşme, gençlerin göçü, makine taklitleri. "Ölmek üzere olan sanat" senaryosu. Öğrenciler kendi bölgelerinden benzer örnekler paylaşır.',
        en: '2. Danger (15 min): 1990 Trabzon — only 20 masters left. Why? Modernization, youth migration, machine imitations. The "dying art" scenario. Students share similar examples from their region.',
        ar: '2. خطر الاختفاء.',
      },
      {
        tr: '3. İki koruma sistemi (20 dk): (a) UNESCO ICH: Uluslararası, kültürel bir liste; devletler başvurur, UNESCO değerlendirir. Türkiye\'den 30+ unsur var — ancak Trabzon Hasırı bu listede DEĞİLDİR. (b) Türk Patent Coğrafi İşaret: Ulusal, yasal bir tescil; belirli yerde-belirli teknikle üretilen ürünün adını koruma altına alır. Trabzon Hasırı 2004\'te, Midyat Telkâri 2013\'te, Siirt Savatı 2019\'da tescillendi. Tabloda iki sistemi karşılaştır: amaç, kapsam, yasal güç, ticari etki.',
        en: '3. Two protection systems (20 min): (a) UNESCO ICH: International, cultural list; states apply, UNESCO evaluates. Turkey has 30+ elements — but Trabzon Hasır is NOT on it. (b) Turkish Patent GI: National, legal registration; protects the name of a product tied to place+technique. Trabzon Hasır 2004, Midyat Telkâri 2013, Siirt Niello 2019. Compare the two systems: purpose, scope, legal force, commercial effect.',
        ar: '3. نظاما حماية: اليونسكو الدولي والعلامة الجغرافية التركية الوطنية.',
      },
      {
        tr: '4. Araştırma etkinliği (25 dk): 4 kişilik gruplara ayrıl. Yarısı UNESCO ich.unesco.org/en/state/turkiye-TR sayfasından bir Türk UNESCO ICH unsuru seçsin (Karagöz, Âşıklık, Mevlevîlik, Hüsn-i Hat, Türk kahvesi vb.). Diğer yarısı ci.turkpatent.gov.tr üzerinden bir Türk Coğrafi İşareti seçsin (Trabzon Hasırı, Midyat Telkârisi, Siirt Savatı, Kütahya Çinisi, Antep Baklavası vb.). 5 dakikalık sunum hazırla.',
        en: '4. Research activity (25 min): Split into groups of 4. Half pick a Turkish UNESCO ICH element from ich.unesco.org/en/state/turkiye-TR (Karagöz, Minstrelsy, Mevlevî, Hüsn-i Hat, Turkish coffee, etc.). The other half pick a Turkish Geographical Indication from ci.turkpatent.gov.tr (Trabzon Hasır, Midyat Telkâri, Siirt Niello, Kütahya Tiles, Antep Baklava, etc.). Prepare a 5-min presentation.',
        ar: '4. بحث: نصف عن اليونسكو، نصف عن العلامة الجغرافية.',
      },
      {
        tr: '5. Sunum ve tartışma (15 dk): Gruplar sunar. Ortak çıkarım: Her iki sistem de faydalıdır, ama farklı şeyler yaparlar. Bir gelenek UNESCO\'da olmasa da Coğrafi İşaretle güçlü biçimde korunabilir — Trabzon Hasırı bunun kanıtıdır. Bir topluluk, bir usta, bir çırak varsa gelenek yaşar.',
        en: '5. Presentations + discussion (15 min): Groups present. Shared insight: Both systems help, but do different things. A tradition can be strongly protected by a Geographical Indication without being on UNESCO — Trabzon Hasır proves this. A tradition lives as long as there are masters, apprentices, and a community.',
        ar: '5. العرض والنقاش: النظامان مفيدان لأسباب مختلفة.',
      },
    ],
    worksheet: [
      {
        tr: 'Somut (material) ile somut olmayan (immaterial) mirasın farkı nedir? 2\'şer örnek ver.',
        en: 'What is the difference between material and intangible heritage? Give 2 examples each.',
        ar: 'الفرق بين المادي وغير المادي؟',
      },
      {
        tr: 'Trabzon Hasırı\'nın 1990\'larda neredeyse yok olmasının 3 sebebini yaz:',
        en: 'Write 3 reasons Trabzon Hasır nearly disappeared in the 1990s:',
        ar: 'لماذا كاد ينقرض؟',
      },
      {
        tr: 'UNESCO ICH listesi ile Türk Patent Coğrafi İşaret sistemi arasındaki 3 temel farkı yaz: (a) hukuki statü, (b) uluslararası mı ulusal mı, (c) ne koruma sağlar.',
        en: 'List 3 key differences between UNESCO ICH and Turkish Patent Geographical Indication: (a) legal status, (b) international vs national, (c) what each protects.',
        ar: 'ثلاثة فروق بين نظام اليونسكو ونظام العلامة الجغرافية.',
      },
      {
        tr: 'Araştırma görevi: UNESCO Türkiye ICH listesinde hangi unsurlar var? 3 tane yaz ve kısaca açıkla. (Kaynak: ich.unesco.org)',
        en: 'Research task: Name 3 elements on Turkey\'s UNESCO ICH list and briefly explain each. (Source: ich.unesco.org)',
        ar: 'مهمة بحث: اذكر 3 عناصر تركية من قائمة اليونسكو.',
      },
      {
        tr: 'Senin bölgenden bir "yok olma tehlikesi altındaki" gelenek düşün. Onu Coğrafi İşaretle mi, UNESCO başvurusuyla mı, başka bir yolla mı korurdun? Neden? 3 adımlık plan yaz.',
        en: 'Think of an endangered tradition from your region. Would you protect it via Geographical Indication, a UNESCO bid, or another path? Why? Write a 3-step plan.',
        ar: 'تقليد في منطقتك — كيف تحميه؟',
      },
    ],
    discussion: [
      {
        tr: 'Bir geleneği korumanın "müzeleştirmek" olma riski var mı? Nasıl önlenebilir?',
        en: 'Does protecting a tradition risk "museumifying" it? How can we prevent that?',
        ar: 'هل الحماية تُحول التقليد لمتحف؟',
      },
      {
        tr: 'Genç nesil neden bu zanaatları öğrenmek istemiyor? Bunu değiştirmek için ne yapmak gerekir?',
        en: 'Why are younger generations uninterested in learning these crafts? What needs to change?',
        ar: 'لماذا لا يُقبل الشباب؟',
      },
      {
        tr: 'Teknoloji (AI, video, sosyal medya) bu zanaatların korunmasına yardım eder mi, zarar mı verir?',
        en: 'Does technology (AI, video, social media) help or harm craft preservation?',
        ar: 'التكنولوجيا والتراث: فائدة أم ضرر؟',
      },
      {
        tr: 'Coğrafi işaret, bir ürünün ticari başarısını da koruma anlamı taşır. Bu, zanaatın kültürel ruhunu etkiler mi? Nasıl?',
        en: 'A Geographical Indication also protects a product\'s commercial success. Does this affect the cultural spirit of the craft? How?',
        ar: 'هل العلامة الجغرافية تؤثر على روح الحرفة الثقافية؟',
      },
    ],
    relatedExhibits: ['trabzon-hasiri', 'telkari', 'kazaz', 'eskisehir-lutasi'],
  },

  /* ═══════════════════════════════════════════════════════
     YENİ DERS PLANLARI (Faz 7) — Raporun 4.1 tablosundan
     ═══════════════════════════════════════════════════════ */

  /* 5. Pırlanta Kesimi ve Işığın Yansıması */
  {
    id: 'pirlanta-kesim-isik',
    hall: 'pirlanta',
    accent: '#5dade2',
    icon: 'diamond',
    level: { tr: 'Ortaokul 6 (11-12 yaş)', en: 'Grade 6 (11-12)', ar: 'الصف 6' },
    duration: { tr: '40 dakika', en: '40 minutes', ar: '40 دقيقة' },
    subject: { tr: 'Fen Bilimleri / Fizik', en: 'Science / Physics', ar: 'علوم / فيزياء' },
    title: {
      tr: 'Pırlanta Kesimi ve Işığın Yansıması',
      en: 'Diamond Cut and Light Reflection',
      ar: 'قطع الماس وانعكاس الضوء',
    },
    goal: {
      tr: 'Öğrenciler, pırlantanın neden parladığını fiziksel olarak anlar: ışığın gelen ışın–yansıyan ışın ilişkisi ve kesim açısının kritik rolü. MEB FB.6.4.1.1 ve FB.6.4.1.2 doğrudan hedeflenir.',
      en: 'Students grasp physically why a diamond sparkles: incident–reflected ray relationship and the critical role of cut angle. Directly targets Turkish FB.6.4.1.1 and FB.6.4.1.2.',
      ar: 'لماذا يلمع الماس؟ علاقة الشعاع الساقط بالمنعكس.',
    },
    materials: {
      tr: 'Lab\'da "Pırlanta Kesim Simülatörü", ayna, lazer kalem (öğretmende), not defteri, exit ticket.',
      en: '"Diamond Cut Simulator" in the Lab, a mirror, a laser pointer (teacher-held), notebook, exit ticket.',
      ar: 'المحاكي، مرآة، مؤشر ليزر (للمعلم)، دفتر.',
    },
    steps: [
      {
        tr: '1. Merak sorusu (5 dk): Bir pırlantanın yanında bir cam boncuk göster. İkisi de şeffaf — neden sadece pırlanta "parlar"? Öğrenciler hipotez yazar.',
        en: '1. Curiosity (5 min): Show a diamond next to a glass bead. Both transparent — why does only the diamond "sparkle"? Students write hypotheses.',
        ar: '1. سؤال: لماذا يلمع الماس فقط؟',
      },
      {
        tr: '2. Demo (10 dk): Öğretmen lazer kalemle bir aynaya farklı açılarda ışık gönderir. "Gelen ışın" ve "yansıyan ışın" kavramları tahtaya çizilir. Açının yansımayı nasıl değiştirdiği gözlenir.',
        en: '2. Demo (10 min): Teacher shines a laser on a mirror at different angles. "Incident" and "reflected" rays are drawn on the board. Students observe how angle changes reflection.',
        ar: '2. عرض: زاوية الضوء تغير الانعكاس.',
      },
      {
        tr: '3. İstasyon çalışması (15 dk): Sınıf ikişerli çalışır ve JewelPedi Lab\'da "Pırlanta Kesim Simülatörü"nü açar. Kesim açısını değiştirerek ışığın kaç yüzden yansıyıp çıktığını sayar. Veri defterine yazılır.',
        en: '3. Stations (15 min): Students work in pairs on JewelPedi\'s "Diamond Cut Simulator", changing the cut angle and counting how many facets reflect light outward. Data logged.',
        ar: '3. محطات: يعمل الطلاب على المحاكي.',
      },
      {
        tr: '4. Veri paylaşımı (5 dk): Her çift en iyi ve en kötü kesim açısını tahtada yazar. Ortak örüntü: 40-42° pavyon, pırlantanın "en parlak" olduğu açı aralığıdır.',
        en: '4. Share-out (5 min): Each pair writes their best/worst cut angle on the board. The common pattern: 40-42° pavilion is where diamonds sparkle most.',
        ar: '4. تبادل البيانات: 40-42° الأفضل.',
      },
      {
        tr: '5. Exit ticket (5 dk): "Kesim açısı çok büyük olursa ne olur? Işık nereye gider?" 2 cümlelik cevap. Dersin sonunda öğretmene teslim edilir.',
        en: '5. Exit ticket (5 min): "If the cut angle is too large, what happens? Where does the light go?" 2-sentence answer turned in at the end.',
        ar: '5. تذكرة الخروج: ماذا يحدث عند زاوية خاطئة؟',
      },
    ],
    worksheet: [
      {
        tr: 'Gelen ışın ile yansıyan ışın arasındaki açı ilişkisini bir cümlede yaz.',
        en: 'State in one sentence the angle relationship between incident and reflected rays.',
        ar: 'ما علاقة زاوية السقوط بالانعكاس؟',
      },
      {
        tr: 'Pırlantanın "parlaması" neden kesim kalitesine bağlıdır? 3 cümlelik açıklama.',
        en: 'Why does diamond sparkle depend on cut quality? 3-sentence explanation.',
        ar: 'لماذا يعتمد اللمعان على القطع؟',
      },
      {
        tr: 'Simülatörde denediğin 3 farklı kesim açısını ve sonucu tabloya yaz.',
        en: 'List 3 cut angles you tested in the simulator and the result.',
        ar: 'ثلاث زوايا قطع وتأثيرها.',
      },
      {
        tr: 'Pırlanta yerine cam boncuk neden aynı şekilde parlamaz? Kırılma indisi terimini kullan.',
        en: 'Why doesn\'t a glass bead sparkle the same way as a diamond? Use the term refractive index.',
        ar: 'لماذا الزجاج لا يلمع مثل الماس؟',
      },
    ],
    discussion: [
      {
        tr: 'Pırlantadan daha yüksek kırılma indisi olan bir malzeme yapılabilir mi? (Moissanite örneği)',
        en: 'Can we make a material with a higher refractive index than diamond? (Moissanite example)',
        ar: 'هل يمكن مادة أعلى انكساراً من الماس؟',
      },
      {
        tr: 'Bir kuyumcu "mükemmel kesim" yerine "çok iyi kesim" öneriyor. Fark ne olabilir?',
        en: 'A jeweler offers "very good cut" instead of "excellent cut". What might the difference be?',
        ar: 'الفرق بين "ممتاز" و"جيد جداً"؟',
      },
    ],
    relatedExhibits: ['4c-sistemi', 'kesim-sekilleri', 'pirlanta-nasil-olusur'],
  },

  /* 6. Beyaz Işık, Renkli Taşlar ve Algı */
  {
    id: 'beyaz-isik-renkli-taslar',
    hall: 'renkli-taslar',
    accent: '#16a085',
    icon: 'ruby',
    level: { tr: 'Ortaokul 6 (11-12 yaş)', en: 'Grade 6 (11-12)', ar: 'الصف 6' },
    duration: { tr: '40 dakika', en: '40 minutes', ar: '40 دقيقة' },
    subject: { tr: 'Fen Bilimleri / Fizik', en: 'Science / Physics', ar: 'علوم / فيزياء' },
    title: {
      tr: 'Beyaz Işık, Renkli Taşlar ve Algı',
      en: 'White Light, Colored Stones and Perception',
      ar: 'الضوء الأبيض والأحجار الملونة',
    },
    goal: {
      tr: 'Öğrenciler beyaz ışığın aslında tüm renklerin bileşkesi olduğunu, bir taşın "rengi"nin soğurulmayıp geri yansıyan renkler olduğunu keşfeder. MEB FB.6.4.3.2 ve FB.6.4.3.3.',
      en: 'Students discover white light is actually all colors combined, and a stone\'s "color" is the wavelengths it does not absorb but reflects back. Targets FB.6.4.3.2 and FB.6.4.3.3.',
      ar: 'الضوء الأبيض مجموع الألوان؛ لون الحجر ما يُعكس.',
    },
    materials: {
      tr: 'Prizma veya CD, beyaz duvar, beyaz lamba, farklı renklerde taş örnekleri veya renkli cam boncuklar, renk tahmin tablosu.',
      en: 'Prism or a CD, white wall, white lamp, stone samples or colored glass beads, color-prediction table.',
      ar: 'منشور أو قرص CD، جدار أبيض، مصباح، عينات حجرية.',
    },
    steps: [
      {
        tr: '1. Hipotez (5 dk): "Bir zümrüt yeşil görünür. Üstüne kırmızı ışık tutarsam hâlâ yeşil mi görünür?" Tahminler yazılır.',
        en: '1. Hypothesis (5 min): "An emerald looks green. Under red light, will it still look green?" Write predictions.',
        ar: '1. تنبؤ: هل يبقى الزمرد أخضر تحت الأحمر؟',
      },
      {
        tr: '2. Prizma deneyi (10 dk): Prizma ya da CD ile beyaz ışığı renklerine ayır. Öğrenciler beyaz duvarda spektrumu gözlemler. Not edilen renkler: kırmızı, turuncu, sarı, yeşil, mavi, mor.',
        en: '2. Prism demo (10 min): Split white light via prism/CD; students observe the spectrum on a white wall. Colors noted: red, orange, yellow, green, blue, violet.',
        ar: '2. منشور: ضوء أبيض ← طيف.',
      },
      {
        tr: '3. Taş testi (15 dk): Farklı renklerdeki taş/boncuk örneklerine farklı renkte filtrelerle (renkli jelatin/kağıt) ışık gönderilir. Yeşil taşa kırmızı ışık gelince ne olur? (Taş siyah/koyu görünür — çünkü yansıtacak yeşil bileşen yok.) Veri tablosu doldurulur.',
        en: '3. Stone test (15 min): Shine light through colored filters onto stones/beads. What happens when green stone meets red light? (It looks dark — no green component to reflect.) Fill the data table.',
        ar: '3. اختبار الحجر: أخضر تحت أحمر ← داكن.',
      },
      {
        tr: '4. Kavramsallaştırma (5 dk): Tahtaya: "Bir cismin rengi = yansıttığı dalga boyu". Öğrenciler tahminlerini geriye dönüp değerlendirir.',
        en: '4. Conceptualize (5 min): On the board: "An object\'s color = the wavelengths it reflects". Students revisit their hypotheses.',
        ar: '4. مفهوم: اللون = ما يُعكس.',
      },
      {
        tr: '5. Exit ticket (5 dk): "Bir taşın rengi ve kimliği arasında nasıl bir ilişki var? Ruby ve kırmızı garnet aynı renkte görünebilir; neden ikisi aynı taş değildir?" Kısa cevap.',
        en: '5. Exit ticket (5 min): "What\'s the relationship between a stone\'s color and its identity? Ruby and red garnet can look identical; why aren\'t they the same stone?"',
        ar: '5. تذكرة الخروج: اللون والهوية.',
      },
    ],
    worksheet: [
      {
        tr: 'Beyaz ışık hangi renklerden oluşur? Spektrum sırasını yaz.',
        en: 'What colors make up white light? Write the spectrum order.',
        ar: 'ما ألوان الطيف؟',
      },
      {
        tr: 'Yeşil bir taşın yeşil görünmesinin fiziksel nedeni nedir?',
        en: 'Physically, why does a green stone look green?',
        ar: 'فيزيائياً، لماذا يبدو الحجر أخضر؟',
      },
      {
        tr: 'Kırmızı bir zümrüt mümkün müdür? Cevabını açıkla.',
        en: 'Is a red emerald possible? Explain.',
        ar: 'هل يمكن زمرد أحمر؟',
      },
    ],
    discussion: [
      {
        tr: 'Farklı ışık altında farklı görünen taşlara "Alexandrite etkisi" denir. Bu nasıl olur?',
        en: 'Stones that change color under different light are called "alexandrite effect". How does this work?',
        ar: 'تأثير الإسكندريت.',
      },
    ],
    relatedExhibits: ['zumrut', 'yakut', 'safir', 'ametist'],
  },

  /* 7. Hayali Kuyumcu Bütçesi */
  {
    id: 'kuyumcu-butcesi',
    hall: 'altin',
    accent: '#d4a017',
    icon: 'ring',
    level: { tr: 'İlkokul 5 (10-11 yaş)', en: 'Grade 5 (10-11)', ar: 'الصف 5' },
    duration: { tr: '40 dakika', en: '40 minutes', ar: '40 دقيقة' },
    subject: { tr: 'Sosyal Bilgiler / Matematik', en: 'Social Studies / Math', ar: 'اجتماعيات / رياضيات' },
    title: {
      tr: 'Hayali Kuyumcu Bütçesi',
      en: 'Imagined Jeweler\'s Budget',
      ar: 'ميزانية الصائغ الافتراضي',
    },
    goal: {
      tr: 'Öğrenciler hayali bir müşteri için bütçe yönetiminin, ihtiyaç-istek kararlarının ve oran-yüzde hesabının pratik kullanımını deneyimler. MEB SB.5.5.2 ve MAT.5.1.5.',
      en: 'Students experience budget management, need/want decisions and percent/ratio calculations for an imagined client. Targets SB.5.5.2 and MAT.5.1.5.',
      ar: 'إدارة ميزانية لزبون افتراضي.',
    },
    materials: {
      tr: 'JewelPedi Lab\'da "Ayar Hesaplayıcı", bütçe worksheet\'i, hesap makinesi, kalem.',
      en: '"Karat Calculator" in the JewelPedi Lab, budget worksheet, calculator, pencil.',
      ar: 'حاسبة العيار، ورقة ميزانية، آلة حاسبة.',
    },
    steps: [
      {
        tr: '1. Senaryo (5 dk): "Büyükannenin 60. doğum günü için 3.000 TL bütçen var. Altın bir kolye almak istiyorsun. Hangi ayarı seçersin? Kaç gram alabilirsin?" Sorular açıklanır.',
        en: '1. Scenario (5 min): "You have 3,000 TL budget for grandma\'s 60th birthday. You want a gold necklace. Which karat? How many grams?" Questions laid out.',
        ar: '1. سيناريو: ميزانية 3000 ليرة.',
      },
      {
        tr: '2. Ayar tanıma (10 dk): Lab\'da "Ayar Hesaplayıcı" açılır. 14, 18, 22, 24 ayar arasında saf altın oranının nasıl değiştiği gözlenir. Tabloya yazılır.',
        en: '2. Karat recognition (10 min): Open Karat Calculator. Observe how pure-gold fraction changes across 14, 18, 22, 24 karat. Fill the table.',
        ar: '2. التعرف على العيار.',
      },
      {
        tr: '3. Bütçe hesabı (15 dk): Güncel gram altın fiyatı verilir (ör. 3.200 TL/gr saf altın için 24 ayar). Öğrenci 14, 18, 22 ayarda kaç gram alabileceğini hesaplar. "İstek vs ihtiyaç" tartışması: daha hafif ve 22 ayar mı, daha ağır ve 14 ayar mı?',
        en: '3. Budget math (15 min): Provide current gold price (e.g., 3,200 TL/g for 24K). Students compute how many grams of 14, 18, 22 karat they can afford. Discuss need vs want: lighter 22K or heavier 14K?',
        ar: '3. حساب الميزانية.',
      },
      {
        tr: '4. Sunum (7 dk): Her öğrenci önerisini (ayar + gram + tasarım fikri) sınıfla paylaşır. Akranlar değerlendirir.',
        en: '4. Presentation (7 min): Students share their pitch (karat + grams + design idea). Peers evaluate.',
        ar: '4. عرض.',
      },
      {
        tr: '5. Etik not (3 dk): "Müşteri 18 ayar istemiyor, 22 ayar seçmek istiyor ama bütçesi sınırlı. Ona ne söylersin?" Kuyumcu etiği kısa tartışma.',
        en: '5. Ethics note (3 min): "Client wants 22K but budget is tight. What do you say?" Brief jeweler-ethics discussion.',
        ar: '5. أخلاقيات.',
      },
    ],
    worksheet: [
      {
        tr: '14 ayar altının saf altın yüzdesi nedir? Hesapla.',
        en: 'What percentage of 14-karat gold is pure? Calculate.',
        ar: 'نسبة الذهب في 14 قيراط؟',
      },
      {
        tr: '22 ayar 5 gram ve 14 ayar 8 gram kolye — hangisinde daha çok saf altın var? Neden?',
        en: '22K at 5 g vs 14K at 8 g — which has more pure gold? Why?',
        ar: 'أيهما يحوي ذهباً أكثر؟',
      },
      {
        tr: 'Müşteriye adil bir öneri yaz: 3 cümlede.',
        en: 'Write a fair recommendation for the client: 3 sentences.',
        ar: 'اكتب توصية عادلة.',
      },
    ],
    discussion: [
      {
        tr: '22 ayar daha "değerli" mi? Ayar ve dayanıklılık arasında nasıl bir ilişki var?',
        en: 'Is 22K more "valuable"? What\'s the relationship between karat and durability?',
        ar: 'العيار الأعلى أفضل؟',
      },
    ],
    relatedExhibits: ['altin-tarihcesi', 'ayar-sistemi'],
  },

  /* 8. Periyodik Tabloda Değerli Metaller */
  {
    id: 'periyodik-tablo-metaller',
    hall: 'altin',
    accent: '#7d6608',
    icon: 'platinum',
    level: { tr: 'Lise 9 (14-15 yaş)', en: 'Grade 9 (14-15)', ar: 'الصف 9' },
    duration: { tr: '40 dakika', en: '40 minutes', ar: '40 دقيقة' },
    subject: { tr: 'Kimya', en: 'Chemistry', ar: 'كيمياء' },
    title: {
      tr: 'Periyodik Tabloda Değerli Metaller',
      en: 'Precious Metals on the Periodic Table',
      ar: 'المعادن الثمينة في الجدول الدوري',
    },
    goal: {
      tr: 'Öğrenciler altın (Au), gümüş (Ag), platin (Pt), paladyum (Pd) ve rodyum (Rh) elementlerinin periyodik tablodaki yerlerini ve ortak özelliklerini (geçiş metalleri, düşük reaktivite, yüksek yoğunluk) bağlar. MEB KİM.9.1.6.',
      en: 'Students link Au, Ag, Pt, Pd, Rh on the periodic table and see their shared properties (transition metals, low reactivity, high density). Targets KİM.9.1.6.',
      ar: 'روابط المعادن الثمينة في الجدول الدوري.',
    },
    materials: {
      tr: 'Periyodik tablo posteri ya da bir SVG yansıtıcı, JewelPedi Lab\'da "Metal Eritme Sıcaklıkları", kavram haritası şablonu.',
      en: 'Periodic table poster or SVG, "Metal Melting Points" in the Lab, concept-map template.',
      ar: 'جدول دوري ومخطط مفاهيم.',
    },
    steps: [
      {
        tr: '1. Giriş (5 dk): Öğretmen öğrencilere "Değerli metal" terimini tanımlatır. Sınıfta liste yapılır: altın, gümüş, platin, paladyum, rodyum, iridyum.',
        en: '1. Opening (5 min): Teacher asks for a definition of "precious metal". Class lists: gold, silver, platinum, palladium, rhodium, iridium.',
        ar: '1. تعريف المعدن الثمين.',
      },
      {
        tr: '2. Periyodik tabloda yerini bul (10 dk): Her metali işaretle. Hepsinin geçiş metali (d-blok) olduğu, Pt-Pd-Rh grubunun "platin grubu metaller" olarak anıldığı ortaya çıkar.',
        en: '2. Locate on table (10 min): Mark each metal. All are transition metals (d-block); Pt-Pd-Rh form the "platinum group metals".',
        ar: '2. الموقع في الجدول.',
      },
      {
        tr: '3. Özellikler karşılaştırması (15 dk): Lab\'da "Metal Eritme Sıcaklıkları" açılır. Her metalin erime noktası, yoğunluğu ve atom numarası tabloya yazılır. Örüntü: platin grubu hem en yüksek erime noktasına hem de en yüksek yoğunluğa sahip.',
        en: '3. Property comparison (15 min): Open Metal Melting Points. Log melting points, densities, atomic numbers. Pattern: platinum-group has the highest melting points and densities.',
        ar: '3. مقارنة الخصائص.',
      },
      {
        tr: '4. Kavram haritası (5 dk): "Değerli metaller → Geçiş metalleri → Düşük reaktivite → Mücevherde kararmaz" ilişki zinciri öğrenci tarafından çizilir.',
        en: '4. Concept map (5 min): Students draw the chain "Precious → Transition → Low reactivity → Doesn\'t tarnish easily in jewelry".',
        ar: '4. خريطة مفاهيم.',
      },
      {
        tr: '5. Exit ticket (5 dk): "Gümüş kararırken altın neden kararmaz? Periyodik tablo açısından açıkla." Kısa cevap.',
        en: '5. Exit ticket (5 min): "Silver tarnishes but gold doesn\'t — explain via the periodic table."',
        ar: '5. لماذا لا يتأكسد الذهب؟',
      },
    ],
    worksheet: [
      {
        tr: 'Au, Ag, Pt elementlerinin atom numarası ve grup/periyodunu yaz.',
        en: 'State atomic number and group/period for Au, Ag, Pt.',
        ar: 'العدد الذري والمجموعة.',
      },
      {
        tr: 'Platin grubu metaller hangi 6 elementtir? Ortak özellikleri?',
        en: 'Which 6 elements form the platinum group? Their common properties?',
        ar: 'مجموعة البلاتين؟',
      },
      {
        tr: 'Altın ve gümüşün mücevherdeki kimyasal davranışları neden farklıdır?',
        en: 'Why do gold and silver behave chemically differently in jewelry?',
        ar: 'الفرق الكيميائي بين الذهب والفضة.',
      },
    ],
    discussion: [
      {
        tr: 'Rodyum kaplama günümüzde beyaz altında neden kullanılır?',
        en: 'Why is rhodium plating used on white gold today?',
        ar: 'لماذا طلاء الروديوم؟',
      },
    ],
    relatedExhibits: ['platin-nedir', 'altin-tarihcesi', 'gumus-bakimi'],
  },

  /* 9. Sanal Müze Küratörlüğü */
  {
    id: 'sanal-muze-kuratorluk',
    hall: 'zanaat',
    accent: '#8e44ad',
    icon: 'hasir-weave',
    level: { tr: 'Ortaokul 7 (12-13 yaş)', en: 'Grade 7 (12-13)', ar: 'الصف 7' },
    duration: { tr: '80 dakika (2 ders)', en: '80 minutes (2 classes)', ar: '80 دقيقة' },
    subject: { tr: 'Görsel Sanatlar / Teknoloji Tasarım', en: 'Visual Arts / Design & Technology', ar: 'فنون / تصميم' },
    title: {
      tr: 'Sanal Müze Küratörlüğü: Kendi Koleksiyonunu Yap',
      en: 'Virtual Museum Curation: Build Your Own Collection',
      ar: 'القيمومة المتحفية الافتراضية',
    },
    goal: {
      tr: 'Öğrenciler Türk müzeciliğinin temel mantığını öğrenir ve 5 objelik bir dijital mini-sergi hazırlar: obje seçimi, etiket yazımı, alt text, kaynak ve lisans. MEB GS.7.7.1, GS.7.7.2 ve TT.7.B.2.1-2.3.',
      en: 'Students learn museum curation logic and build a 5-object digital mini-exhibition: object selection, label writing, alt text, source and license. Targets GS.7.7.1, GS.7.7.2, TT.7.B.2.1-2.3.',
      ar: 'قيمومة افتراضية بخمس قطع.',
    },
    materials: {
      tr: 'JewelPedi sergi sayfaları, Canva/Google Slides ya da benzeri, görsel kredi şablonu, etiket yazım kartı, imageCredits.js örneği.',
      en: 'JewelPedi exhibit pages, Canva/Google Slides, image-credit template, label-writing card, imageCredits.js sample.',
      ar: 'منصة عرض ونماذج بطاقات.',
    },
    steps: [
      {
        tr: '1. Müze analizi (10 dk): JewelPedi Kids sergi sayfalarından 3 tanesi incelenir. "Bir iyi müze etiketi ne içerir?" tartışılır: başlık, malzeme, tarih, kaynak, 2-3 cümlelik anlatı, alt text.',
        en: '1. Museum analysis (10 min): Examine 3 JewelPedi exhibit pages. Discuss: "What makes a good museum label?" Title, material, date, source, 2-3 sentence narrative, alt text.',
        ar: '1. تحليل المتاحف.',
      },
      {
        tr: '2. Tema seçimi (10 dk): Her öğrenci 5 objelik bir "tema" seçer: "Türkiye\'nin zanaat hazineleri", "Işıkla dans eden taşlar", "Gümüşün hikâyesi" gibi. Tema, koleksiyonun iskeletidir.',
        en: '2. Theme selection (10 min): Each student picks a 5-object theme: "Turkey\'s craft treasures", "Stones that dance with light", "Silver\'s story". The theme is the collection\'s skeleton.',
        ar: '2. اختيار الموضوع.',
      },
      {
        tr: '3. Görsel ve kaynak (20 dk): Wikimedia Commons, Smithsonian Open Access ya da Met Open Access üzerinden lisanslı görseller seçilir. Her görsel için yazar, lisans ve URL kaydedilir. JewelPedi\'deki imageCredits.js şablonu referans alınır.',
        en: '3. Image & source (20 min): Students pick licensed images from Wikimedia Commons, Smithsonian Open Access or Met Open Access. For each: record creator, license, URL. Reference JewelPedi\'s imageCredits.js format.',
        ar: '3. صور ومصادر مرخصة.',
      },
      {
        tr: '4. Etiket yazımı (20 dk): Her obje için 4 satırlık etiket yazılır: başlık, malzeme/tarih, kaynak, 2 cümlelik anlatı. Alt text ayrıca yazılır (görme engellilere).',
        en: '4. Label writing (20 min): 4-line label per object: title, material/date, source, 2-sentence narrative. Alt text separately (for screen readers).',
        ar: '4. كتابة البطاقات.',
      },
      {
        tr: '5. Dijital sergi (15 dk): Canva ya da Google Slides\'ta 6 sayfalık koleksiyon oluşturulur (1 kapak + 5 obje). Sınıfta sunum.',
        en: '5. Digital exhibition (15 min): Build a 6-page collection in Canva or Slides (1 cover + 5 objects). Present to class.',
        ar: '5. العرض الرقمي.',
      },
      {
        tr: '6. Akran değerlendirme (5 dk): "Hangi etiket en net? Hangi tema en iyi birleşmiş? Her görsel lisansı açık mı?" 3 soruluk geri bildirim.',
        en: '6. Peer review (5 min): "Which label is clearest? Which theme holds best? Is every image license clear?" 3-question feedback.',
        ar: '6. تقييم الأقران.',
      },
    ],
    worksheet: [
      {
        tr: 'İyi bir müze etiketinin 5 bileşenini listele.',
        en: 'List the 5 components of a good museum label.',
        ar: 'خمسة عناصر للبطاقة.',
      },
      {
        tr: 'CC BY lisansı ne demek? Bir görsel için ne yapmalısın?',
        en: 'What does CC BY mean? What must you do with such an image?',
        ar: 'ما معنى CC BY؟',
      },
      {
        tr: 'Bir görselin alt text\'i neden önemli? 2 cümleyle açıkla.',
        en: 'Why is alt text important? Explain in 2 sentences.',
        ar: 'لماذا النص البديل مهم؟',
      },
      {
        tr: 'Kendi temanın koleksiyona nasıl ruh verdiğini tarif et.',
        en: 'Describe how your theme gives soul to the collection.',
        ar: 'كيف يُعطي الموضوع الروح للمجموعة؟',
      },
    ],
    discussion: [
      {
        tr: 'Sanal müze, gerçek müze deneyiminin yerini tutar mı? Farkları ne?',
        en: 'Can a virtual museum replace a real one? What\'s different?',
        ar: 'هل يحل المتحف الافتراضي محل الحقيقي؟',
      },
      {
        tr: 'Yapay zeka ürünü görselleri "müze objesi" olarak sunmak etik midir?',
        en: 'Is it ethical to present AI-generated images as "museum objects"?',
        ar: 'هل صور AI أخلاقية كقطع متحفية؟',
      },
    ],
    relatedExhibits: ['trabzon-hasiri', 'telkari', 'altin-tarihcesi', '4c-sistemi', 'zumrut'],
  },
];

export function getLessonPlan(id) {
  return lessonPlans.find((p) => p.id === id);
}
