// Renkli Taşlar Salonu — Faz 2-A derinleştirme + 3 yeni sergi (ametist,
// akuamarin, lapis-lazuli).

export default [
  /* ─────────────────────────────────────────────────────────
     Zümrüt — Emerald (deepened)
     ───────────────────────────────────────────────────────── */
  {
    id: 'zumrut',
    cat: 'renkli-taslar',
    emoji: '💚',
    accent: '#27ae60',
    name: { tr: 'Zümrüt', en: 'Emerald', ar: 'الزمرد' },
    intro: {
      tr: 'Yeşilin kraliçesi — Kleopatra\'nın favori taşı.',
      en: 'The queen of green — Cleopatra\'s favorite stone.',
      ar: 'ملكة اللون الأخضر.',
    },
    body: {
      tr: 'Zümrüt, "beril" adı verilen mineral ailesinden gelir ve yeşil rengini içindeki krom ve vanadyum atomlarından alır. Mohs skalasında 7,5–8 sertliktedir. Kolombiya\'nın Muzo bölgesi dünyanın en iyi zümrütlerini üretir. Zümrütlerin neredeyse tamamında içsel çatlaklar bulunur — buna Fransızca "jardin" (bahçe) denir ve taşın DNA\'sı gibidir.',
      en: 'Emerald is part of the beryl mineral family, taking its green color from chromium and vanadium atoms. It ranks 7.5–8 on the Mohs scale. Colombia\'s Muzo region produces the world\'s finest. Nearly all emeralds have internal cracks — called "jardin" (garden) in French, like the stone\'s DNA.',
      ar: 'الزمرد من عائلة البيريل، يستمد اللون الأخضر من الكروم.',
    },
    funFact: {
      tr: 'Hemen hemen her zümrütün içinde küçük çatlaklar vardır. Bu yüzden zümrütler genellikle sedir yağıyla "dolgu" yapılır — çatlakları az görünür kılmak için. Bu yasal ve normaldir.',
      en: 'Nearly every emerald has tiny cracks, so they\'re often filled with cedar oil to reduce visibility — a legal and standard practice.',
      ar: 'غالبية الزمرد يُملأ بالزيت لإخفاء الشقوق.',
    },
    stats: {
      hardness: '7.5–8 Mohs',
      family: 'Beril',
      color: 'Krom + vanadyum',
      origin: 'Kolombiya, Zambiya',
    },
    scienceBox: {
      formula: 'Be₃Al₂Si₆O₁₈',
      crystalSystem: 'Hexagonal',
      hardness: '7.5–8 (Mohs)',
      refractiveIndex: '1.576–1.582',
      density: '2.76 g/cm³',
      cleavage: 'Indistinct',
      notes: {
        tr: 'Saf beril renksizdir (goshenite). Krom girerse zümrüt, demir girerse akuamarin, manganez girerse morganit olur. Aynı iskelet, farklı "safsızlık", bambaşka taş.',
        en: 'Pure beryl is colorless (goshenite). Add chromium → emerald, iron → aquamarine, manganese → morganite. Same skeleton, different "impurities," very different gem.',
        ar: 'البيريل النقي شفاف — الكروم يجعله زمرداً، والحديد أكوامارين.',
      },
    },
    timeline: [
      { year: '-1500',
        event: { tr: 'Mısır\'ın "Kleopatra Madenleri"nde zümrüt çıkarılıyor.',
                 en: '"Cleopatra\'s Mines" in Egypt produce emeralds.',
                 ar: 'تُستخرج الزمرد من مناجم كليوباترا.' } },
      { year: '-30',
        event: { tr: 'Kleopatra kendi adına zümrüt madenleri işletir.',
                 en: 'Cleopatra operates emerald mines in her name.',
                 ar: 'كليوباترا تُدير مناجم الزمرد.' } },
      { year: '1558',
        event: { tr: 'İspanyol fatihler Kolombiya\'da Muzo\'yu keşfeder.',
                 en: 'Spanish conquistadors discover Muzo in Colombia.',
                 ar: 'الإسبان يكتشفون موزو عام 1558.' } },
      { year: '1911',
        event: { tr: 'Kolombiya dünya zümrüt üretiminin yarısından fazlasını sağlıyor.',
                 en: 'Colombia supplies more than half the world\'s emeralds.',
                 ar: 'كولومبيا تُنتج أكثر من نصف العالم.' } },
    ],
    digDeeper: [
      {
        id: 'chemistry',
        icon: 'chemistry',
        title: { tr: 'Rengi Yapan Şey', en: 'What Makes the Color', ar: 'ما يصنع اللون' },
        body: {
          tr: 'Saf beril aslında renksizdir — "goshenite" denir, şeffaf bir taştır. Zümrütün o canlı yeşili, kristal yapısına bir milyon berile yaklaşık 100 krom (Cr³⁺) veya vanadyum (V³⁺) atomunun girmesiyle oluşur. Bu "safsızlıklar" gelen beyaz ışığın kırmızı-mor ucunu yutar, yeşili geçirir. Aynı krom yakutta kırmızı yapar — kristal yapı her şeyi belirler.',
          en: 'Pure beryl is actually colorless — it\'s called goshenite, a clear stone. Emerald\'s vivid green comes from roughly 100 chromium (Cr³⁺) or vanadium (V³⁺) atoms entering the crystal per million beryl atoms. These "impurities" absorb the red–purple end of incoming white light, passing green through. The same chromium makes ruby red — crystal structure decides everything.',
          ar: 'الكروم يُلون الزمرد أخضر والياقوت أحمر — البنية البلورية تُحدد النتيجة.',
        },
      },
      {
        id: 'ethics',
        icon: 'ethics',
        title: { tr: 'Zümrüt ve Etik', en: 'Emerald and Ethics', ar: 'الزمرد والأخلاق' },
        body: {
          tr: 'Kolombiya zümrüt madenciliği tarih boyunca zordur: resmi şirketler ile "guaquero" denen küçük ölçekli madenciler arasında gerilim, çevresel etki, iş güvenliği sorunları. 2000\'lerden sonra "Muzo Responsibly Sourced" gibi sertifikasyon programları durumu iyileştirmeye çalışıyor, ama hâlâ tam çözülmedi. Zambiya\'nın Kagem madeni bugün dünyanın en büyük tek zümrüt kaynağı ve genelde daha şeffaf tedarik zinciri sunuyor.',
          en: 'Colombian emerald mining is historically tough: tension between registered companies and small-scale "guaquero" miners, environmental impact, worker safety. Since the 2000s, certification programs like "Muzo Responsibly Sourced" have pushed improvements, though the issue isn\'t solved. Zambia\'s Kagem is now the single largest emerald source and typically offers a more transparent supply chain.',
          ar: 'تواجه صناعة الزمرد تحديات أخلاقية وبيئية، تحاول برامج الشهادات معالجتها.',
        },
      },
    ],
    storyThread: 'kleopatra-zumrut',
    related: ['yakut', 'safir', 'mohs-skalasi', 'akuamarin'],
  },

  /* ─────────────────────────────────────────────────────────
     Yakut — Ruby (deepened)
     ───────────────────────────────────────────────────────── */
  {
    id: 'yakut',
    cat: 'renkli-taslar',
    emoji: '❤️',
    accent: '#c0392b',
    name: { tr: 'Yakut', en: 'Ruby', ar: 'الياقوت' },
    intro: {
      tr: 'Kırmızının en asili — pırlantadan bile nadir olabilir.',
      en: 'The noblest red — sometimes rarer than diamond.',
      ar: 'الأحمر الأنبل.',
    },
    body: {
      tr: 'Yakut, korund ailesindendir (aynı safir gibi) ve kırmızı rengini içindeki krom atomlarından alır. Mohs 9 sertliktedir — pırlantadan sonra en sert doğal taşlardan biridir. En değerli yakutlar Myanmar\'dan (eski adıyla Burma) çıkar ve "güvercin kanı" (pigeon blood) rengi denilen parlak kırmızı tona sahiptir. Büyük, kusursuz bir yakut aynı boyuttaki pırlantadan bile değerli olabilir.',
      en: 'Ruby belongs to the corundum family (like sapphire) and gets its red from chromium. It\'s Mohs 9 — one of nature\'s hardest stones after diamond. The most prized rubies come from Myanmar (formerly Burma) with a color called "pigeon blood" red. A large, flawless ruby can be worth more than the same-sized diamond.',
      ar: 'الياقوت من عائلة الكوروند، صلابته 9 بعد الماس مباشرة.',
    },
    funFact: {
      tr: 'Yakutların büyük çoğunluğu fluoresan özellik gösterir — yani UV ışık altında kendi kendine parlar! Bu, onlara gün ışığında bile içeriden bir "yanma" etkisi verir.',
      en: 'Most rubies are fluorescent — they glow on their own under UV light! This makes them look "lit from within" even in daylight.',
      ar: 'معظم الياقوت يتوهج تحت الأشعة فوق البنفسجية.',
    },
    stats: {
      hardness: '9 Mohs',
      family: 'Korund (Al₂O₃)',
      color: 'Krom (Cr)',
      origin: 'Myanmar, Mozambik, Tayland',
    },
    scienceBox: {
      formula: 'Al₂O₃ + Cr',
      crystalSystem: 'Trigonal',
      hardness: '9 (Mohs)',
      refractiveIndex: '1.762–1.770',
      density: '4.00 g/cm³',
      cleavage: 'None',
      notes: {
        tr: 'Yakut ile safir kimyasal olarak aynı minerallerdir (korund). Ayıran şey safsızlık: krom kırmızı yakut, demir + titanyum mavi safir, vanadyum mor safir yapar. Bu yüzden "kırmızı safir" denen şey yoktur — ona yakut denir.',
        en: 'Ruby and sapphire are chemically the same mineral (corundum). The difference is impurities: chromium → red ruby, iron + titanium → blue sapphire, vanadium → purple sapphire. That\'s why there\'s no such thing as a "red sapphire" — red corundum is always called ruby.',
        ar: 'الياقوت والصفير نفس المعدن — الفرق في الشوائب.',
      },
    },
    timeline: [
      { year: '500',
        event: { tr: 'Myanmar\'daki Mogok vadisinde yakut çıkarılıyor.',
                 en: 'Ruby mining active in Mogok Valley, Myanmar.',
                 ar: 'يُستخرج الياقوت من وادي موغوك.' } },
      { year: '1500',
        event: { tr: '"Pigeon blood" terimi Myanmar\'da standart haline gelir.',
                 en: 'Term "pigeon blood" becomes standard in Myanmar.',
                 ar: 'مصطلح "دم الحمامة" يُصبح معيارياً.' } },
      { year: '1902',
        event: { tr: 'Auguste Verneuil ilk yapay yakutu üretir.',
                 en: 'Auguste Verneuil creates the first synthetic ruby.',
                 ar: 'أول ياقوت اصطناعي عام 1902.' } },
      { year: '1960',
        event: { tr: 'Theodore Maiman yakutu ilk çalışan lazerde kullanır.',
                 en: 'Theodore Maiman uses ruby in the first working laser.',
                 ar: 'الياقوت في أول ليزر عام 1960.' } },
    ],
    digDeeper: [
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Kırmızıyı Veren Krom', en: 'Why Chromium Makes Red', ar: 'لماذا الكروم يصنع الأحمر' },
        body: {
          tr: 'Korund aslında renksiz bir mineraldir (Al₂O₃). Kristal büyürken alüminyum atomlarının arasına az sayıda krom (Cr³⁺) atomu girerse, bu atomlar beyaz ışığın sarı-yeşil bölgesini yutar. Geriye kırmızı ve mavi geçer — göz bunu "pigeon blood red" olarak görür. Kromun elektronları enerji aldığında ısınır ve biraz sonra yine kırmızı ışık salar — bu yüzden yakut UV altında içsel olarak parlar. Aynı özellik ilk lazeri 1960\'ta mümkün kıldı.',
          en: 'Corundum is actually colorless (Al₂O₃). As the crystal grows, if a few chromium (Cr³⁺) atoms sneak in between aluminum atoms, those chromium atoms absorb the yellow–green part of white light. Red and blue pass through — the eye reads it as "pigeon blood red." Chromium electrons also re-emit red light after absorbing energy — which is why ruby glows under UV. The same property enabled the first laser in 1960.',
          ar: 'ذرات الكروم تمتص الأخضر وتُرجع الأحمر — وهذا ما جعلها في أول ليزر.',
        },
      },
      {
        id: 'famous',
        icon: 'famous',
        title: { tr: '"Güvercin Kanı" Derecesi', en: 'The "Pigeon Blood" Grade', ar: 'درجة "دم الحمامة"' },
        body: {
          tr: 'Myanmar\'ın Mogok vadisinde yüzyıllardır en değerli yakutlara "ko-twe" (güvercin kanı) denir. Gerçekte yeni kesilmiş bir güvercin kanının kırmızısını değil, floresanı nedeniyle iç açısından ışık salan derin, mavi tonlu saf kırmızıyı tanımlar. GIA bu rengi artık standardize etti: "pigeon\'s blood" etiketli yakutlar belirli bir renk kabininde test edilir. Bir karatlık bir pigeon-blood yakut aynı karatlık pırlantanın 10-20 katı fiyata satılabilir.',
          en: 'In Myanmar\'s Mogok Valley, the most valued rubies have been called "ko-twe" (pigeon blood) for centuries. It doesn\'t actually mean fresh pigeon blood — it names a deep, slightly blue-toned pure red that glows from within due to fluorescence. GIA has now standardized the grade: rubies labeled "pigeon\'s blood" are tested in a specific color booth. A one-carat pigeon-blood ruby can sell for 10–20× the price of a one-carat diamond.',
          ar: 'ياقوت "دم الحمامة" قد يُباع بعشرات أضعاف سعر الماس.',
        },
      },
    ],
    related: ['safir', 'zumrut', 'mohs-skalasi'],
  },

  /* ─────────────────────────────────────────────────────────
     Safir — Sapphire (deepened)
     ───────────────────────────────────────────────────────── */
  {
    id: 'safir',
    cat: 'renkli-taslar',
    emoji: '💙',
    accent: '#2874a6',
    name: { tr: 'Safir', en: 'Sapphire', ar: 'الصفير' },
    intro: {
      tr: 'Mavi deyince — ama aslında her renkte safir olabilir.',
      en: 'Blue is the classic — but sapphires come in every color.',
      ar: 'الأزرق هو الأشهر، لكن الصفير يأتي بكل الألوان.',
    },
    body: {
      tr: 'Safir, yakut gibi korund ailesindendir — aslında kırmızı olmayan tüm korundlara safir denir. Demir ve titanyum atomları mavi safirlere rengini verir, ama pembe, sarı, yeşil, mor ve hatta renksiz (beyaz) safirler de vardır. Keşmir safirleri, "mavi ten" denen bulanık/kadifemsi mavi tonlarıyla efsanedir.',
      en: 'Sapphire is the same mineral family as ruby — any non-red corundum is a sapphire. Iron and titanium produce the famous blue, but pink, yellow, green, purple and even colorless (white) sapphires exist. Kashmir sapphires are legendary for their "cornflower blue" velvety tone.',
      ar: 'الصفير من عائلة الياقوت، يأتي بكل الألوان عدا الأحمر.',
    },
    funFact: {
      tr: 'Prenses Diana\'nın nişan yüzüğünde 12 karatlık Seylan safiri vardı. Bu yüzük şimdi Prenses Kate\'e geçti — ve o günden beri "Diana safiri" olarak biliniyor.',
      en: 'Princess Diana\'s 12-carat Ceylon sapphire engagement ring now belongs to Princess Kate — known as the "Diana sapphire".',
      ar: 'خاتم خطوبة الأميرة ديانا كان يحمل صفيراً سيلانياً بوزن 12 قيراطاً.',
    },
    stats: {
      hardness: '9 Mohs',
      family: 'Korund (Al₂O₃)',
      color: 'Demir + titanyum (mavi)',
      origin: 'Keşmir, Seylan, Myanmar',
    },
    scienceBox: {
      formula: 'Al₂O₃ + Fe, Ti',
      crystalSystem: 'Trigonal',
      hardness: '9 (Mohs)',
      refractiveIndex: '1.762–1.770',
      density: '4.00 g/cm³',
      cleavage: 'None',
      notes: {
        tr: 'Mavi safirde demir (Fe²⁺) ve titanyum (Ti⁴⁺) atomları yan yana dizilir. İkisi arasında elektron bir atomdan ötekine "zıplar" ve bu süreç beyaz ışığın sarı-kırmızı kısmını yutar. Geriye mavi kalır. Buna "intervalance charge transfer" denir.',
          en: 'In blue sapphire, iron (Fe²⁺) and titanium (Ti⁴⁺) atoms sit side by side. An electron "hops" between them, absorbing the yellow–red part of white light. Blue is what\'s left. The phenomenon is called "intervalance charge transfer."',
          ar: 'الحديد والتيتانيوم يتبادلان الإلكترونات، فيظهر اللون الأزرق.',
      },
    },
    timeline: [
      { year: '600',
        event: { tr: 'Sri Lanka (Seylan) safir ticaretinde merkez haline gelir.',
                 en: 'Sri Lanka (Ceylon) becomes a center of sapphire trade.',
                 ar: 'سريلانكا مركزاً لتجارة الصفير.' } },
      { year: '1881',
        event: { tr: 'Keşmir\'de safir yatakları keşfedilir — "cornflower blue".',
                 en: 'Kashmir sapphire deposits discovered — "cornflower blue".',
                 ar: 'اكتشاف صفير كشمير عام 1881.' } },
      { year: '1902',
        event: { tr: 'Verneuil yöntemi ile ilk yapay safir üretilir.',
                 en: 'First synthetic sapphire made via Verneuil process.',
                 ar: 'أول صفير اصطناعي عام 1902.' } },
      { year: '1981',
        event: { tr: 'Diana\'nın nişan yüzüğü Seylan safirini dünyaya tanıtır.',
                 en: 'Diana\'s engagement ring makes Ceylon sapphire globally famous.',
                 ar: 'خاتم الأميرة ديانا يُشهر صفير سيلان.' } },
    ],
    digDeeper: [
      {
        id: 'geology',
        icon: 'geology',
        title: { tr: 'Keşmir Efsanesi', en: 'The Kashmir Legend', ar: 'أسطورة كشمير' },
        body: {
          tr: 'Keşmir safirleri 1881\'de Himalayalar\'ın 4500 metre yüksekliğinde bir çığ sonrası açığa çıktı. Sadece 1887-1927 arasında aktif olarak kazıldı — sonra yatak bitti. Bu 40 yıllık dönemin safirleri "kadifemsi" denilen hafifçe bulanık kristal yapılarıyla ünlüdür: ışığı dağıtır, sanki içinde hafif bir sis varmış gibi hissettirir. Bir Keşmir safirinin pazarda çıkması bugün nadirdir ve müzayedelerde karatı 200.000 doların üstüne çıkabilir.',
          en: 'Kashmir sapphires surfaced after an 1881 avalanche at 4,500 m in the Himalayas. The deposit was actively mined only between 1887 and 1927 — then it was gone. Sapphires from those 40 years are famous for a "velvety" slightly hazy quality: they scatter light as if a thin mist sat inside. A Kashmir sapphire hitting the market today is rare, with auction prices above $200,000 per carat.',
          ar: 'صفير كشمير نادر جداً وقد يتجاوز سعر القيراط 200 ألف دولار.',
        },
      },
      {
        id: 'famous',
        icon: 'famous',
        title: { tr: 'Her Renkte Safir', en: 'Every Color of Sapphire', ar: 'الصفير بكل الألوان' },
        body: {
          tr: 'Pembe safir (biraz krom — yakuta yakın), sarı safir (demir), yeşil safir (demir + titanyum birlikte ama farklı oranda), mor safir (vanadyum), turuncu safir (demir + krom)... Ayrıca çok nadir "padparadscha" denen pembe-turuncu bir karışım vardır — adı Sinhala dilinde "lotus çiçeği" demek, sadece Sri Lanka\'da çıkar ve yakut kadar değerli olabilir.',
          en: 'Pink sapphire (a little chromium — close to ruby), yellow sapphire (iron), green sapphire (iron + titanium in different ratios), purple sapphire (vanadium), orange sapphire (iron + chromium)... There\'s also a very rare pink-orange blend called "padparadscha" — the name means "lotus blossom" in Sinhala; found only in Sri Lanka and sometimes as valuable as ruby.',
          ar: 'الصفير يأتي بكل الألوان، أندرها "بادبارادشا" من سريلانكا.',
        },
      },
    ],
    related: ['yakut', 'zumrut', 'mohs-skalasi'],
  },

  /* ─────────────────────────────────────────────────────────
     Turkuvaz — Turquoise (deepened)
     ───────────────────────────────────────────────────────── */
  {
    id: 'turkuvaz',
    cat: 'renkli-taslar',
    emoji: '🟦',
    accent: '#48c9b0',
    name: { tr: 'Turkuvaz', en: 'Turquoise', ar: 'الفيروز' },
    intro: {
      tr: 'Adı bile "Türk" demek — ama taş İran\'dan gelir.',
      en: 'Its name literally means "Turkish" — but the stone is Persian.',
      ar: 'اسمه يعني "تركي" لكنه من بلاد فارس.',
    },
    body: {
      tr: 'Turkuvaz, bakır ve alüminyum fosfatı içeren bir mineraldir. Adını İran\'dan Avrupa\'ya Türkler aracılığıyla geldiği için almıştır — "Türk taşı" demektir. Mohs 5–6 sertliktedir, yani diğer kıymetli taşlardan yumuşaktır ve özen ister. Anadolu\'da Eskişehir\'in lületaşıyla karıştırılmamalıdır — bunlar farklı minerallerdir. Yerli Amerikalılar, Mısırlılar ve Orta Doğu kültürleri bu taşa ruhsal anlam yüklemiştir.',
      en: 'Turquoise is a copper–aluminum phosphate mineral. Its name means "Turkish" because it reached Europe through Turkish traders from Persia. It ranks 5–6 on Mohs — softer than the Big Four and needs care. Native Americans, Egyptians and Middle Eastern cultures all attach spiritual meaning to it.',
      ar: 'الفيروز فوسفات النحاس والألمنيوم، وصل لأوروبا عبر الأتراك.',
    },
    funFact: {
      tr: 'Dünyanın en eski turkuvaz takıları Mısır\'dan geliyor — 7500 yıllık bir bilezik, kraliçe Zer\'in bileğinde bulunmuştu.',
      en: 'The oldest known turquoise jewelry is a 7,500-year-old bracelet found on Queen Zer\'s wrist in Egypt.',
      ar: 'أقدم مجوهرات الفيروز المعروفة عمرها 7500 سنة من مصر.',
    },
    stats: {
      hardness: '5–6 Mohs',
      formula: 'CuAl₆(PO₄)₄(OH)₈·4H₂O',
      origin: 'İran, ABD, Çin',
      cultural: 'Şans ve koruma taşı',
    },
    scienceBox: {
      formula: 'CuAl₆(PO₄)₄(OH)₈·4H₂O',
      crystalSystem: 'Triclinic',
      hardness: '5–6 (Mohs)',
      refractiveIndex: '1.610–1.650',
      density: '2.6–2.9 g/cm³',
      cleavage: 'Good (rarely seen — cabochons)',
      notes: {
        tr: 'Turkuvazın yeşilimsi-mavi tonu bakır atomlarının suyla etkileşiminden gelir. Kurursa veya uzun süre ışıkta tutulursa rengini kaybedebilir. İçindeki siyah veya kahverengi "damarlar", çevresindeki ana kayadan (limonit, gotit) gelir.',
        en: 'Turquoise\'s blue-green tone comes from copper atoms interacting with water in the structure. Drying out, or long light exposure, can fade it. The dark veins come from the surrounding host rock (limonite, goethite).',
        ar: 'اللون من النحاس والماء — والخطوط السوداء من الصخر المحيط.',
      },
    },
    timeline: [
      { year: '-5000',
        event: { tr: 'Mısır Sina yarımadasında turkuvaz madenleri açılır.',
                 en: 'Turquoise mines open in Egypt\'s Sinai Peninsula.',
                 ar: 'مناجم الفيروز في سيناء.' } },
      { year: '-1325',
        event: { tr: 'Tutankamon\'un ölüm maskesi turkuvazla süslenir.',
                 en: 'Tutankhamun\'s death mask inlaid with turquoise.',
                 ar: 'قناع توت عنخ آمون مُطعم بالفيروز.' } },
      { year: '1000',
        event: { tr: 'İran\'ın Neyşabur madenleri dünya ticaretinin merkezi olur.',
                 en: 'Iran\'s Neyshabur mines become the global trade center.',
                 ar: 'مناجم نيسابور مركزاً للتجارة.' } },
      { year: '1900',
        event: { tr: 'Amerika güneybatısında Pueblo ve Navaho turkuvaz gümüşçülüğü canlanır.',
                 en: 'American Southwest Pueblo and Navajo turquoise silverwork revives.',
                 ar: 'إحياء مجوهرات الفيروز عند شعوب نافاهو.' } },
    ],
    digDeeper: [
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Türk İsmi, Fars Taşı', en: 'Turkish Name, Persian Stone', ar: 'اسم تركي، حجر فارسي' },
        body: {
          tr: 'Avrupa dillerindeki "turquoise" ismi, Eski Fransızca "pierre turquoise"dan (Türk taşı) geliyor. Oysa tarihsel olarak taşın kendi evi İran\'ın Neyşabur bölgesidir — Farslar bu taşı 2000 yıldan fazla işlemiştir. 12-15. yüzyıllarda İpek Yolu üzerinden Türk tüccarlar bu taşı Avrupa pazarlarına getirince, Avrupalılar onu "Türkler\'den gelen taş" olarak tanıdı. İsim yapıştı. İran\'da bugün hâlâ "firuze" deniyor — Farsça "zafer" demek.',
          en: 'The European name "turquoise" comes from Old French "pierre turquoise" (Turkish stone). Yet the stone\'s actual homeland is Iran\'s Neyshabur region — Persians have worked it for over 2,000 years. When Turkish traders brought it along the Silk Road in the 12th–15th centuries, Europeans named it "the stone from the Turks." The name stuck. In Iran it\'s still called "firuzeh" — Persian for "victory."',
          ar: 'اسمه الأوروبي فرنسي يعني "الحجر التركي" لكنه فارسي أصلاً.',
        },
      },
    ],
    related: ['zumrut', 'yakut', 'lapis-lazuli'],
  },

  /* ─────────────────────────────────────────────────────────
     Mohs (light scienceBox only — it's a concept exhibit)
     ───────────────────────────────────────────────────────── */
  {
    id: 'mohs-skalasi',
    cat: 'renkli-taslar',
    emoji: '📊',
    accent: '#16a085',
    name: { tr: 'Mohs Sertlik Skalası', en: 'Mohs Hardness Scale', ar: 'مقياس موس للصلابة' },
    intro: {
      tr: '1\'den 10\'a kadar — hangisi hangisini çizer?',
      en: 'From 1 to 10 — which one scratches which?',
      ar: 'من 1 إلى 10 — أيها يخدش الآخر؟',
    },
    body: {
      tr: '1812\'de Alman mineralog Friedrich Mohs tarafından geliştirilen bu skala, minerallerin birbirini çizme yeteneğini ölçer. 1: talk (en yumuşak, tırnakla çizilir), 2: jips, 3: kalsit (bakır para ile çizilir), 4: fluorit, 5: apatit, 6: feldspat, 7: kuvars (cam çizer), 8: topaz, 9: korund (yakut, safir), 10: elmas (en sert). Her seviye, bir öncekinden kat be kat sert değildir — örneğin elmas korunddan 4 kat daha serttir.',
      en: 'Developed in 1812 by German mineralogist Friedrich Mohs, this scale measures what scratches what. 1: talc (softest), 2: gypsum, 3: calcite, 4: fluorite, 5: apatite, 6: feldspar, 7: quartz, 8: topaz, 9: corundum (ruby, sapphire), 10: diamond. The jumps aren\'t equal — diamond is 4× harder than corundum.',
      ar: 'مقياس وضعه العالم الألماني موس عام 1812، من 1 (التلك) إلى 10 (الماس).',
    },
    funFact: {
      tr: 'Tırnağın sertliği Mohs 2.5\'tır. Yani tırnakla çizebildiğin her şey 2.5\'tan yumuşaktır. Bakır para 3, cam ise yaklaşık 5.5 — taş alırken bu ipuçlarını kullanabilirsin.',
      en: 'Your fingernail is Mohs 2.5, a copper coin 3, glass about 5.5 — handy benchmarks when identifying stones.',
      ar: 'صلابة الظفر 2.5، والقطعة النحاسية 3.',
    },
    stats: {
      '10 (Elmas)': '4× daha sert',
      '9 (Korund)': 'Yakut, safir',
      '7 (Kuvars)': 'Cam çizer',
      '2.5 (Tırnak)': 'Referans',
    },
    digDeeper: [
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Neden Eşit Adımlar Değil?', en: 'Why the Steps Aren\'t Equal', ar: 'لماذا الخطوات غير متساوية' },
        body: {
          tr: 'Mohs skalası "sıra" skalasıdır, "oran" skalası değil. Yani 10 sertliğindeki elmas, 5 sertliğindeki apatiten "iki kat" değil, ondan yaklaşık 400 kat daha serttir. Modern mineraloglar mutlak değerler için Vickers ve Knoop sertlik testlerini kullanır: korund ~2200 HV iken elmas ~10000 HV\'dir.',
          en: 'Mohs is an "ordinal" scale, not a "ratio" scale. Diamond (10) isn\'t "twice" as hard as apatite (5) — it\'s around 400× harder. Modern mineralogists use Vickers and Knoop tests for absolute values: corundum ≈ 2,200 HV versus diamond ≈ 10,000 HV.',
          ar: 'مقياس موس ترتيبي فقط — الماس 400 مرة أصلب من الأباتيت.',
        },
      },
    ],
    interactive: 'mohs',
    related: ['zumrut', 'yakut', 'safir'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Ametist
     ───────────────────────────────────────────────────────── */
  {
    id: 'ametist',
    cat: 'renkli-taslar',
    emoji: '🟣',
    accent: '#8e44ad',
    name: { tr: 'Ametist', en: 'Amethyst', ar: 'الجمشت' },
    intro: {
      tr: 'Morun kraliçesi. Bir zamanlar pırlanta kadar değerliydi — Brezilya\'yı bulana kadar.',
      en: 'The queen of purple — once as valuable as diamond, until Brazil was found.',
      ar: 'ملكة اللون البنفسجي.',
    },
    body: {
      tr: 'Ametist, mor kuvarstır — yani SiO₂ kristali, demir atomlarıyla boyanmış hali. Mohs 7 sertliğindedir, oldukça dayanıklı. 18. yüzyıla kadar ametist dört büyük taştan (pırlanta, zümrüt, yakut, safir) biri sayılırdı. Sonra 1800\'lerde Brezilya\'da dev ametist yatakları bulundu — dev mağaraları dolduran jeotlar. Birden bolca ulaşılabilir oldu ve pahalı sınıftan çıktı. Ama hâlâ özellikle derin mor tonlar değerlidir.',
      en: 'Amethyst is purple quartz — SiO₂ crystal colored by iron atoms. Mohs 7, very durable. Until the 18th century, amethyst was one of the four great precious stones (alongside diamond, emerald, ruby, sapphire). Then enormous deposits were found in Brazil in the 1800s — cathedral-sized geodes packed with crystals. Supply exploded, prices fell, and amethyst left the luxury tier. Yet the deepest purple tones remain valuable today.',
      ar: 'الجمشت كوارتز بنفسجي، كان من الأحجار الأربعة الكبرى قبل اكتشاف البرازيل.',
    },
    funFact: {
      tr: 'Eski Yunanlılar ametistin sarhoşluğu önlediğine inanırdı — aslında "ametist" adı Yunanca "methystos" (sarhoş) kelimesine "a-" (karşı) önekinin eklenmesiyle oluşur: "sarhoş olmayan". Bu yüzden kadehler ametistten yapılırdı.',
      en: 'The ancient Greeks believed amethyst prevented drunkenness — the name itself is Greek "a-methystos", meaning "not drunk". Drinking cups were carved from amethyst for the effect.',
      ar: 'اسم الجمشت يعني "غير السكران" باليونانية.',
    },
    stats: {
      hardness: '7 Mohs',
      formula: 'SiO₂ + Fe',
      origin: 'Brezilya, Uruguay, Zambiya',
      color: 'Demir (Fe⁴⁺)',
    },
    scienceBox: {
      formula: 'SiO₂ (kuvars)',
      crystalSystem: 'Trigonal',
      hardness: '7 (Mohs)',
      refractiveIndex: '1.544–1.553',
      density: '2.65 g/cm³',
      cleavage: 'None',
      notes: {
        tr: 'Ametistin moru, demir atomlarının kristal oluşurken radyasyona maruz kalmasıyla oluşur — Dünya içindeki doğal radyoaktiviteden. Bu yüzden ametist ısıtılırsa rengi değişir: 470°C\'de açık sarı "citrine" olur. Pek çok piyasa sitrini aslında ısıtılmış ametisttir.',
        en: 'Amethyst\'s purple forms when iron atoms are exposed to natural radiation as the crystal grows — radioactivity from within the Earth. Heat reverses it: at 470°C amethyst turns pale yellow "citrine." Much commercial citrine is actually heat-treated amethyst.',
        ar: 'اللون من إشعاع طبيعي. التسخين يحول الجمشت إلى سترين.',
      },
    },
    timeline: [
      { year: '-3000',
        event: { tr: 'Mısırlılar ametistle amulet ve yüzük yapar.',
                 en: 'Egyptians carve amethyst into amulets and rings.',
                 ar: 'المصريون يصنعون التمائم.' } },
      { year: '-400',
        event: { tr: 'Yunanlılar "sarhoş olmayan" efsanesi için içki kadehleri yapar.',
                 en: 'Greeks carve drinking cups for the "not-drunk" legend.',
                 ar: 'اليونانيون يصنعون كؤوس الشراب.' } },
      { year: '1800',
        event: { tr: 'Brezilya\'nın Minas Gerais bölgesinde dev jeotlar bulunur.',
                 en: 'Huge geodes discovered in Brazil\'s Minas Gerais region.',
                 ar: 'اكتشاف الجيودات البرازيلية.' } },
      { year: '1900',
        event: { tr: 'Üretim patlaması fiyatları düşürür, ametist "yarı kıymetli" olur.',
                 en: 'Supply boom drops prices; amethyst becomes "semi-precious."',
                 ar: 'تصنيف الجمشت كحجر شبه كريم.' } },
    ],
    digDeeper: [
      {
        id: 'history',
        icon: 'history',
        title: { tr: 'Kraliyet Taşından Yaygın Taşa', en: 'From Royal to Common', ar: 'من الملكي إلى الشائع' },
        body: {
          tr: 'Orta çağ Avrupası\'nda ametist papaların ve kardinallerin yüzüklerinde standarttı — "piskopos taşı" denirdi. 18. yüzyıla kadar pırlanta kadar pahalıydı ve Rusya\'nın Ural madenlerinden geliyordu. 1800\'lerde Brezilya\'da dağ boyutlarında jeotlar açığa çıkınca, dünya üretimi 10 yıl içinde binlerce kat arttı. Takı yapımcıları için güzel haberdi — herkes artık mor takı alabilirdi. Ama piyasa değeri çöktü. Bu, arz-talep dinamiğinin taş dünyasındaki en dramatik örneklerinden biridir.',
          en: 'In medieval Europe, amethyst was standard on popes\' and cardinals\' rings — called the "bishop\'s stone." Until the 18th century it was as expensive as diamond and came from Russia\'s Ural mines. When mountain-sized geodes were uncovered in Brazil in the 1800s, global supply rose thousands-fold within a decade. Good news for jewelers — everyone could now own purple. But market value collapsed. It\'s one of the most dramatic supply-and-demand stories in gem history.',
          ar: 'كان من أغلى الأحجار، ثم هبط سعره مع اكتشاف البرازيل.',
        },
      },
    ],
    related: ['zumrut', 'akuamarin', 'mohs-skalasi'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Akuamarin
     ───────────────────────────────────────────────────────── */
  {
    id: 'akuamarin',
    cat: 'renkli-taslar',
    emoji: '🌊',
    accent: '#5dade2',
    name: { tr: 'Akuamarin', en: 'Aquamarine', ar: 'الأكوامارين' },
    intro: {
      tr: 'Zümrütün mavi kardeşi — deniz suyu gibi şeffaf.',
      en: 'Emerald\'s blue sibling — clear as seawater.',
      ar: 'الأخ الأزرق للزمرد.',
    },
    body: {
      tr: 'Akuamarin, zümrütle aynı aileden (beril) ama rengini krom yerine demir atomlarından alır. Açık mavi-yeşilden saf camlı maviye kadar tonları vardır. Mohs 7,5-8 sertliktedir. Latince adı "aqua marina" — deniz suyu. Brezilya akuamarin üretiminin %85\'ini yapar. Tarihsel olarak denizcilerin koruyucu taşı sayılırdı: "akuamarin tılsımı taşıyan denize güvenle açılır". Kraliçe II. Elizabeth\'in meşhur tacı, Brezilya Devlet Başkanı Vargas tarafından 1953\'te hediye edilen akuamarinlerden yapılmıştı.',
      en: 'Aquamarine is in the beryl family like emerald, but iron gives it its color instead of chromium. Tones range from pale blue-green to pure glassy blue. Mohs 7.5–8. The Latin name "aqua marina" means seawater. Brazil produces 85% of the world\'s aquamarine. Historically it was the sailor\'s protective stone: "a sailor carrying aquamarine puts to sea safely." Queen Elizabeth II\'s famous parure was made from aquamarines gifted by Brazilian President Vargas in 1953.',
      ar: 'الأكوامارين من عائلة الزمرد، لكن لونه من الحديد لا الكروم.',
    },
    funFact: {
      tr: 'Dünyanın en büyük kesilmiş akuamarini 10.363 karat ağırlığındaki "Don Pedro" obeliski — 36 cm uzunluğunda bir kristal. Şimdi Smithsonian\'da sergileniyor.',
      en: 'The world\'s largest cut aquamarine is the 10,363-carat "Don Pedro" obelisk, 36 cm tall. It\'s now displayed at the Smithsonian.',
      ar: 'أكبر أكوامارين مقطوع وزنه 10,363 قيراط، معروض في سميثسونيان.',
    },
    stats: {
      hardness: '7.5–8 Mohs',
      family: 'Beril',
      formula: 'Be₃Al₂Si₆O₁₈ + Fe',
      origin: 'Brezilya, Pakistan, Nijerya',
    },
    scienceBox: {
      formula: 'Be₃Al₂Si₆O₁₈ + Fe²⁺',
      crystalSystem: 'Hexagonal',
      hardness: '7.5–8 (Mohs)',
      refractiveIndex: '1.577–1.583',
      density: '2.71 g/cm³',
      cleavage: 'Indistinct',
      notes: {
        tr: 'Akuamarin çoğunlukla yeşilimsi-mavi çıkar. Piyasadaki çoğu temiz mavi akuamarin ısıtma işleminden geçmiştir: 400-450°C\'de sarımsı ve yeşil bileşenler kaybolur, saf mavi kalır. İşlem yasal ve kalıcıdır.',
        en: 'Most natural aquamarine comes out greenish-blue. Most of the pure-blue aquamarine on the market has been heat-treated: at 400–450°C, yellow and green components vanish, leaving pure blue. The treatment is legal and permanent.',
        ar: 'معظم الأكوامارين الأزرق النقي معالج بالحرارة.',
      },
    },
    timeline: [
      { year: '300',
        event: { tr: 'Roma tüccarları Mısır\'dan akuamarin getirir.',
                 en: 'Roman traders import aquamarine from Egypt.',
                 ar: 'تجار روما يستوردون من مصر.' } },
      { year: '1500',
        event: { tr: 'Portekiz denizcileri akuamarini koruyucu sayar.',
                 en: 'Portuguese sailors wear aquamarine for protection.',
                 ar: 'البحارة البرتغاليون يحملونه.' } },
      { year: '1910',
        event: { tr: 'Brezilya Marambaia\'da 110 kg\'lık tek kristal bulunur.',
                 en: 'A 110-kg single crystal found in Marambaia, Brazil.',
                 ar: 'بلورة 110 كغ في البرازيل.' } },
      { year: '1953',
        event: { tr: 'Brezilya Devlet Başkanı Vargas, Kraliçe II. Elizabeth\'e akuamarin takı seti hediye eder.',
                 en: 'Brazilian President Vargas gifts Queen Elizabeth II an aquamarine parure.',
                 ar: 'هدية فارغاس إلى الملكة إليزابيث.' } },
    ],
    digDeeper: [
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Mart Doğumlu Taşı', en: 'March\'s Birthstone', ar: 'حجر مواليد مارس' },
        body: {
          tr: 'Akuamarin, modern takı kültüründe Mart ayı doğum taşıdır. Denizcilik geleneğinde ise Poseidon\'un hediyesi sayılırdı — sirenler onu düşürmüş. 19-20. yüzyılın büyük kuyumcu evleri (Tiffany, Cartier) akuamarini Art Deco döneminde sık kullandı: büyük, berrak, geometrik kesilmiş. O dönemin yüzüklerinde 10-20 karatlık taşlar yaygındı, çünkü fiyatı zümrütün yanında çok uygundur.',
          en: 'Aquamarine is March\'s modern birthstone. In maritime tradition it was Poseidon\'s gift — dropped by sirens. The great jewelry houses (Tiffany, Cartier) used it heavily in the Art Deco period: large, clear, geometrically cut. Rings from that era often hold 10–20-carat stones, because aquamarine is inexpensive next to emerald.',
          ar: 'حجر ميلاد مارس، كان شائعاً في حقبة الآر ديكو.',
        },
      },
    ],
    related: ['zumrut', 'ametist', 'turkuvaz'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Lapis Lazuli
     ───────────────────────────────────────────────────────── */
  {
    id: 'lapis-lazuli',
    cat: 'renkli-taslar',
    emoji: '🔷',
    accent: '#1f4e79',
    name: { tr: 'Lapis Lazuli', en: 'Lapis Lazuli', ar: 'اللازورد' },
    intro: {
      tr: 'Gökyüzü mavisi, altın benekli — Tutankamon\'un yüzüne ışıldayan taş.',
      en: 'Sky-blue with gold flecks — the stone that shone on Tutankhamun\'s face.',
      ar: 'أزرق السماء، مُنقط بالذهب.',
    },
    body: {
      tr: 'Lapis lazuli tek bir mineral değildir — lazurit (asıl mavi), kalsit (beyaz çizgiler) ve pirit (altın renkli noktalar) karışımı bir kayaçtır. Mohs 5-5,5, yumuşaktır. 6000 yıl boyunca dünyanın en iyi lapis kaynağı Afganistan\'ın Badakhşan bölgesindeki Sar-i Sang madenleridir — bugün bile açık. Lapis, Tutankamon\'un maskesinde, Lapis Lazuli Sümer heykellerinde, Ortaçağ Avrupa kiliselerinde ve Vermeer\'in Kız İnciyle Küpe\'sinde karşımıza çıkar (Vermeer mavisi aslında lapis\'ten öğütülen "ultramarin" pigmentiydi).',
      en: 'Lapis lazuli isn\'t a single mineral — it\'s a rock: lazurite (the real blue), calcite (white streaks) and pyrite (golden flecks). Mohs 5–5.5, soft. For 6,000 years the world\'s finest lapis has come from the Sar-i Sang mines in Badakhshan, Afghanistan — still active today. Lapis appears on Tutankhamun\'s mask, in Sumerian statuary, in medieval European churches and in Vermeer\'s Girl with a Pearl Earring (Vermeer blue was ultramarine pigment ground from lapis).',
      ar: 'اللازورد ليس معدناً واحداً بل صخر — لازوريت وكالسيت وبيريت.',
    },
    funFact: {
      tr: 'Ortaçağ\'da lapis\'ten yapılan ultramarin pigmenti, resim sanatının en pahalı rengiydi — gramı altından pahalıydı. Ressamlar sadece Meryem Ana\'nın elbisesi için ayırırdı.',
      en: 'In the Middle Ages, ultramarine pigment from lapis was the most expensive color in painting — gram for gram, pricier than gold. Painters reserved it only for the Virgin Mary\'s robes.',
      ar: 'الأزرق اللازوردي كان أغلى الألوان في التصوير في العصور الوسطى.',
    },
    stats: {
      hardness: '5–5.5 Mohs',
      origin: 'Afganistan (Sar-i Sang)',
      components: 'Lazurit + kalsit + pirit',
      age: '6000+ yıl ticaret',
    },
    scienceBox: {
      formula: '(Na,Ca)₈(AlSiO₄)₆(S,SO₄,Cl)₂ — lazurit',
      crystalSystem: 'Cubic (lazurite)',
      hardness: '5–5.5 (Mohs)',
      refractiveIndex: '1.50',
      density: '2.7–2.9 g/cm³',
      cleavage: 'Poor',
      notes: {
        tr: 'Lapis\'in derin mavisi aslında iyonik bir efekttir: lazurit yapısında sülfür iyonları (S₃⁻) ışığın sarı ve kırmızı bölgelerini yutar, mavi geçirir. Pirit kristalleri ("altın sanılır ama demir sülfürü") güneş gibi parlar ama gerçek altın değildir.',
        en: 'Lapis\'s deep blue is actually an ionic effect: sulfur ions (S₃⁻) in the lazurite structure absorb yellow and red wavelengths, passing blue. The pyrite crystals ("fool\'s gold" — iron sulfide) sparkle like sunlight but aren\'t real gold.',
        ar: 'اللون من أيونات الكبريت، والبريق الذهبي من البيريت.',
      },
    },
    timeline: [
      { year: '-4000',
        event: { tr: 'Sar-i Sang madenlerinden Sümer\'e lapis ticareti başlar.',
                 en: 'Lapis trade begins from Sar-i Sang mines to Sumer.',
                 ar: 'بدء تجارة اللازورد من سار-إي-سانغ.' } },
      { year: '-1325',
        event: { tr: 'Tutankamon\'un ölüm maskesi lapis kakma ile dekore edilir.',
                 en: 'Tutankhamun\'s death mask inlaid with lapis.',
                 ar: 'قناع توت عنخ آمون مُطعم باللازورد.' } },
      { year: '1200',
        event: { tr: 'Avrupalı ressamlar ultramarin pigmenti için lapis ithal eder.',
                 en: 'European painters import lapis for ultramarine pigment.',
                 ar: 'استيراد اللازورد لصنع اللون الأزرق.' } },
      { year: '1826',
        event: { tr: 'Sentetik ultramarin icat edilir — lapis fiyatı düşer.',
                 en: 'Synthetic ultramarine invented — lapis prices fall.',
                 ar: 'اختراع اللازورد الصناعي.' } },
    ],
    digDeeper: [
      {
        id: 'history',
        icon: 'history',
        title: { tr: '6000 Yıllık Tek Maden', en: 'One Mine for 6,000 Years', ar: 'منجم واحد لـ 6000 سنة' },
        body: {
          tr: 'Dünyadaki yüksek kaliteli lapisin neredeyse tamamı Afganistan\'ın Badakhşan bölgesindeki Sar-i Sang madenlerinden gelir. Bu madenler 6000 yıldır aralıksız işletiliyor — bilinen en eski aralıksız aktif madendir. Büyük İskender, Marco Polo, Moğol hanları, İpek Yolu tüccarları — hepsi oradan geçti. Bugün madenler hâlâ küçük ölçekli olarak, geleneksel yöntemlerle çalıştırılıyor. Dinamit bile kullanılmıyor; ateş ve soğuk su ile kayanın çatlaması bekleniyor.',
          en: 'Almost all high-quality lapis comes from the Sar-i Sang mines in Badakhshan, Afghanistan. These mines have been worked continuously for 6,000 years — the longest continuously-active mine known. Alexander the Great, Marco Polo, Mongol khans, Silk Road traders — all passed through. The mines are still small-scale today, traditional methods. Even dynamite isn\'t used; fire-and-cold-water splits the rock.',
          ar: 'منجم سار-إي-سانغ يعمل منذ 6000 سنة.',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Vermeer\'in Mavisi', en: 'Vermeer\'s Blue', ar: 'أزرق فيرمير' },
        body: {
          tr: 'Johannes Vermeer\'in ünlü "Kız İnciyle Küpe"sinde (1665) kızın başörtüsü o sarsıcı derin mavi rengini bulmuştu. O mavi, öğütülmüş lapis lazuliden yapılan "ultramarin" pigmentidir. Vermeer\'in zamanında 1 ons ultramarin, aynı ağırlıktaki altının fiyatındaydı. Vermeer öyle cömertçe kullandı ki ölürken borç içindeydi. Bu pigment için "Meryem\'e özel" demek yetersiz — Vermeer için bu, resmin ruhuydu.',
          en: 'Vermeer\'s famous Girl with a Pearl Earring (1665) owes its stunning deep blue to "ultramarine" — pigment ground from lapis lazuli. In Vermeer\'s day, one ounce of ultramarine cost as much as the same weight in gold. Vermeer used it so generously that he died in debt. Calling it "reserved for the Virgin Mary" undersells what this pigment meant to Vermeer — it was the soul of the painting.',
          ar: 'استخدم فيرمير اللازورد بسخاء في لوحته الشهيرة.',
        },
      },
    ],
    related: ['turkuvaz', 'zumrut', 'ametist'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Opal (Faz 2-B)
     ───────────────────────────────────────────────────────── */
  {
    id: 'opal',
    cat: 'renkli-taslar',
    emoji: '🌈',
    accent: '#7fb3d5',
    name: { tr: 'Opal', en: 'Opal', ar: 'الأوبال' },
    intro: {
      tr: 'Tek bir taşın içinde gökkuşağının tamamı — "ateş" dediğimiz oyun.',
      en: 'A whole rainbow inside one stone — the "fire" we call play-of-color.',
      ar: 'قوس قزح كامل داخل حجر واحد.',
    },
    body: {
      tr: 'Opal, hidratlı silikat mineralidir — yapısında %6-10 oranında su barındırır. Bir opalde görülen renk dansına "play-of-color" (renk oyunu) denir ve bu, taşın içindeki mikroskobik silika küreciklerinin düzenli sıralanıp ışığı kırmasıyla oluşur. Dünya opalinin %95\'i Avustralya\'dan, özellikle Coober Pedy ve Lightning Ridge bölgelerinden çıkar. 2008\'den itibaren Etiyopya\'nın Welo bölgesi de önemli bir kaynak haline geldi. Opal Ekim ayı doğum taşıdır ve Mohs 5,5-6,5 sertliğiyle görece yumuşaktır — özen ister.',
      en: 'Opal is a hydrated silicate mineral — its structure contains 6–10% water. The "play-of-color" dance comes from microscopic silica spheres inside the stone, regularly arranged to diffract light. 95% of world opal comes from Australia, especially Coober Pedy and Lightning Ridge. Since 2008 Ethiopia\'s Welo region has also become a major source. Opal is October\'s birthstone, and at Mohs 5.5–6.5 it\'s relatively soft — needs care.',
      ar: 'الأوبال سيليكات رطبة، 95٪ منها من أستراليا.',
    },
    funFact: {
      tr: 'Dünyada bilinen en büyük opal "Olympic Australis" — 17.000 karat, 3.450 gram! 1956\'da Coober Pedy\'de bir madenci tarafından yarıya yakın yer altında bulunmuş. Değeri 2,5 milyon dolardan fazla.',
      en: 'The world\'s largest known opal is "Olympic Australis" — 17,000 carats, 3,450 g! A miner found it nearly underground at Coober Pedy in 1956. Valued at over $2.5 million.',
      ar: 'أكبر أوبال في العالم وزنه 3450 غراماً.',
    },
    stats: {
      hardness: '5.5–6.5 Mohs',
      formula: 'SiO₂·nH₂O',
      origin: 'Avustralya (%95), Etiyopya',
      water: '%6–10',
    },
    scienceBox: {
      formula: 'SiO₂·nH₂O',
      crystalSystem: 'Amorphous',
      hardness: '5.5–6.5 (Mohs)',
      refractiveIndex: '1.44–1.47',
      density: '1.98–2.20 g/cm³',
      notes: {
        tr: 'Opalin renk oyunu kristal kafesten değil, mikroskobik silika kürelerinin düzeninden gelir. Küreler 150-300 nm çapındadır — görünür ışığın dalga boyuyla aynı mertebede. Bu yüzden ışık kürelerden kırılarak spektrumuna ayrılır. Küreler ne kadar iyi sıralanmışsa, renk oyunu o kadar canlı. "Common opal" denen sıradan türde küreler dağınıktır, renk oyunu yoktur.',
        en: 'Opal\'s play-of-color comes not from crystal lattice but from the arrangement of microscopic silica spheres. The spheres are 150–300 nm in diameter — on the same scale as visible light\'s wavelength. Light diffracts off the spheres and splits into spectrum. The better-ordered the spheres, the more vivid the color. "Common opal" has disordered spheres and no play-of-color.',
        ar: 'رقص الألوان من كرات السيليكا الدقيقة بحجم موجة الضوء.',
      },
    },
    timeline: [
      { year: '75',
        event: { tr: 'Pliny Yaşlı opali "ateşten yapılma" diye tanımlar.',
                 en: 'Pliny the Elder describes opal as "made of fire."',
                 ar: 'بليني الأكبر يصف الأوبال.' } },
      { year: '1877',
        event: { tr: 'Avustralya\'da ilk ticari opal madeni açılır (Listowel Downs).',
                 en: 'First commercial opal mine opens in Australia (Listowel Downs).',
                 ar: 'أول منجم أوبال أسترالي.' } },
      { year: '1956',
        event: { tr: 'Coober Pedy\'de "Olympic Australis" bulunur.',
                 en: 'Olympic Australis found at Coober Pedy.',
                 ar: 'اكتشاف أوليمبيك أوستراليس.' } },
      { year: '2008',
        event: { tr: 'Etiyopya Welo bölgesinde yeni opal yatağı keşfedilir.',
                 en: 'New opal deposit discovered in Welo, Ethiopia.',
                 ar: 'اكتشاف أوبال ولو.' } },
    ],
    related: ['ametist', 'turkuvaz', 'tourmaline'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Turmalin (Faz 2-B)
     ───────────────────────────────────────────────────────── */
  {
    id: 'tourmaline',
    cat: 'renkli-taslar',
    emoji: '🍉',
    accent: '#d98880',
    name: { tr: 'Turmalin', en: 'Tourmaline', ar: 'التورمالين' },
    intro: {
      tr: 'Gökkuşağı taşı — iki rengi tek kristalde taşıyabilir (karpuz gibi).',
      en: 'The rainbow stone — can hold two colors in one crystal, like watermelon.',
      ar: 'حجر قوس قزح — يحمل لونين في بلورة واحدة.',
    },
    body: {
      tr: 'Turmalin muhtemelen doğada en geniş renk yelpazesine sahip taştır: pembe, yeşil, mavi, sarı, siyah, kırmızı, mor — ve bunların iki veya üçünün aynı kristalde olduğu "bicolor" veya "tricolor" türler. En meşhurları: yeşil-pembe "karpuz turmalin" (watermelon), elektrik neon mavi "Paraíba turmalin" (2001\'de Brezilya\'nın Paraíba eyaletinde bulundu, kilo başına 50.000 dolara kadar çıkabilir), derin kırmızı "rubellite", mavi-yeşil "indigolite". Mohs 7-7,5 sertliğinde. Antik Mısırlılar onun "dünyadan gökyüzüne giderken gökkuşağının renklerinden rengi kapmış" olduğuna inanırdı.',
      en: 'Tourmaline probably has the widest color range of any natural stone: pink, green, blue, yellow, black, red, purple — plus "bicolor" or "tricolor" crystals holding two or three at once. The most famous: green-pink "watermelon tourmaline", electric neon-blue "Paraíba tourmaline" (found in Brazil\'s Paraíba in 2001, prices up to $50,000/kg), deep red "rubellite", blue-green "indigolite". Mohs 7–7.5. Ancient Egyptians believed it "caught colors from the rainbow on its way from Earth to sky."',
      ar: 'التورمالين أغنى حجر بالألوان، يحتوي عدة ألوان في بلورة واحدة.',
    },
    funFact: {
      tr: 'Turmalin ısındığında veya sürtüldüğünde pozitif ve negatif elektrik yükü alır — "piezoelectric" ve "pyroelectric" özelliktir. Bu yüzden 1700\'lerde Hollandalı tüccarlar onu pipolarının küllerini çekmek için kullanırmış!',
      en: 'Tourmaline builds up positive and negative charges when heated or rubbed — it\'s piezoelectric and pyroelectric. Dutch traders in the 1700s reportedly used it to clean ash out of their pipes!',
      ar: 'التورمالين يُولد شحنة كهربائية عند تسخينه.',
    },
    stats: {
      hardness: '7–7.5 Mohs',
      colors: 'Pembe, yeşil, mavi, sarı, siyah, bicolor',
      famous: 'Paraíba (elektrik mavi)',
      origin: 'Brezilya, Afganistan, Mozambik',
    },
    scienceBox: {
      formula: '(Na,Ca)(Mg,Li,Al,Fe)₃Al₆(BO₃)₃Si₆O₁₈(OH)₄',
      crystalSystem: 'Trigonal',
      hardness: '7–7.5 (Mohs)',
      refractiveIndex: '1.620–1.640',
      density: '3.02–3.26 g/cm³',
      notes: {
        tr: 'Turmalin karmaşık bir silikat ailesi — aslında tek mineral değil, 30\'dan fazla mineral içeren bir grup. En yaygın türler: elbaite (renkli varyeteler), schorl (siyah, %95 piyasa), dravite (kahverengi). Paraíba turmalinin elektrik mavisi bakır ve mangandan kaynaklanır — doğadaki tek bakır-içeren turmalin.',
        en: 'Tourmaline is a complex silicate family — not one mineral but a group of 30+ species. Most common: elbaite (colored varieties), schorl (black, 95% of market), dravite (brown). Paraíba\'s electric blue comes from copper and manganese — the only naturally copper-bearing tourmaline.',
        ar: 'التورمالين عائلة من 30 معدناً، أشهرها إلبيت وشورل.',
      },
    },
    timeline: [
      { year: '1703',
        event: { tr: 'Hollanda tüccarları Seylan\'dan "turmali" getirir.',
                 en: 'Dutch traders bring "turmali" from Ceylon.',
                 ar: 'جلبه التجار من سيلان.' } },
      { year: '1880',
        event: { tr: 'Maine, ABD\'de büyük turmalin yatakları bulunur.',
                 en: 'Large tourmaline deposits found in Maine, USA.',
                 ar: 'اكتشاف في ولاية مين.' } },
      { year: '1989',
        event: { tr: 'Paraíba\'da elektrik mavisi turmalin Heitor Dimas Barbosa tarafından keşfedilir.',
                 en: 'Paraíba neon-blue discovered by Heitor Dimas Barbosa.',
                 ar: 'اكتشاف بارايبا 1989.' } },
      { year: '2001',
        event: { tr: 'Paraíba turmalini dünya piyasalarına çıkar — fiyat patlaması.',
                 en: 'Paraíba reaches world markets — price explosion.',
                 ar: 'وصول بارايبا للأسواق.' } },
    ],
    related: ['zumrut', 'ametist', 'opal'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Topaz (Faz 2-B)
     ───────────────────────────────────────────────────────── */
  {
    id: 'topaz',
    cat: 'renkli-taslar',
    emoji: '🟧',
    accent: '#e59866',
    name: { tr: 'Topaz', en: 'Topaz', ar: 'التوباز' },
    intro: {
      tr: 'Kasım doğumlu taşı — "sarhoş güneş" denilen turuncu Imperial topaz en değerlisi.',
      en: 'November\'s birthstone — the orange "drunken sun" Imperial topaz is the most prized.',
      ar: 'حجر شهر نوفمبر — الإمبراطوري البرتقالي الأثمن.',
    },
    body: {
      tr: 'Topaz, alüminyum ve florun bir silikat mineralidir — Mohs 8 sertliğinde, kıymetli taşlar arasında oldukça dayanıklıdır. En ünlüsü Brezilya\'nın Ouro Preto bölgesinden çıkan "Imperial topaz" — şeftali kabuğu turuncusu, 18. yüzyıl Portekiz Kraliyet koleksiyonunda "güneşin sarhoşluğu" diye adlandırılmıştır. Mavi topaz çoğunlukla ısıtılmış/radyasyonla renklendirilmiş — doğal mavi topaz çok nadir. Renksiz topaz ise eski zamanlarda pırlanta taklidi olarak kullanıldı. "Hiddenite" ve "Kunzit" yanlış yerlerde topaz sanılır ama farklı minerallerdir. Topaz Kasım doğum taşı.',
      en: 'Topaz is an aluminum-fluorine silicate mineral — Mohs 8, quite durable among gems. The most famous is "Imperial topaz" from Brazil\'s Ouro Preto — peach-orange, called "sun\'s drunkenness" in the 18th-century Portuguese royal collection. Blue topaz is usually heat-treated or irradiated — natural blue topaz is very rare. Colorless topaz was historically used as diamond imitation. Hiddenite and kunzite are sometimes mistaken for topaz but are different minerals. Topaz is November\'s birthstone.',
      ar: 'التوباز سيليكات الألمنيوم والفلور، صلابته 8.',
    },
    funFact: {
      tr: 'Dünyanın en büyük kesilmiş topazı "El-Dorado" — 31.000 karat (6,2 kg), Brezilya Minas Gerais\'ten çıktı. Bir ilk bulunduğunda kesimciler bu kadar büyük bir taşla ne yapacaklarını bilemediler.',
      en: 'The world\'s largest cut topaz is "El-Dorado" — 31,000 carats (6.2 kg) from Minas Gerais, Brazil. When first found, cutters didn\'t know what to do with a stone that big.',
      ar: 'أكبر توباز مقطوع يزن 6.2 كغ.',
    },
    stats: {
      hardness: '8 Mohs',
      formula: 'Al₂SiO₄(F,OH)₂',
      famous: 'Imperial topaz (Brezilya)',
      birthstone: 'Kasım',
    },
    scienceBox: {
      formula: 'Al₂SiO₄(F,OH)₂',
      crystalSystem: 'Orthorhombic',
      hardness: '8 (Mohs)',
      refractiveIndex: '1.609–1.643',
      density: '3.49–3.57 g/cm³',
      cleavage: 'Perfect basal',
      notes: {
        tr: 'Topazın perfect basal (taban) dilinimi — yani tek bir düzlemde kolayca kırılır. Bu yüzden Mohs 8 sertliğine rağmen yere düşerse tabanından kırılabilir. Yüzük kesimlerinde dilinim düzlemi kenara yerleştirilerek bu zayıflık azaltılır.',
        en: 'Topaz has perfect basal cleavage — it splits easily along one plane. Despite Mohs 8 hardness, it can crack from the base if dropped. In ring cuts, the cleavage plane is oriented to the side to minimize this weakness.',
        ar: 'له انفصام قاعدي تام — قد ينكسر إذا سقط.',
      },
    },
    timeline: [
      { year: '-2000',
        event: { tr: 'Mısır\'da "krizolit" adıyla sarı topaz takı yapımı.',
                 en: 'Yellow topaz jewelry in Egypt under the name "chrysolith."',
                 ar: 'توباز أصفر في مصر.' } },
      { year: '1737',
        event: { tr: 'Brezilya Ouro Preto\'da ilk Imperial topaz bulunur.',
                 en: 'First Imperial topaz found in Ouro Preto, Brazil.',
                 ar: 'أول توباز إمبراطوري 1737.' } },
      { year: '1768',
        event: { tr: 'Portekiz Kraliyeti topazı "güneş taşı" ilan eder.',
                 en: 'Portuguese Crown declares topaz the "sun stone."',
                 ar: 'التاج البرتغالي يُعلنه حجر الشمس.' } },
    ],
    related: ['ametist', 'zumrut', 'akuamarin'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Peridot (Faz 2-B)
     ───────────────────────────────────────────────────────── */
  {
    id: 'peridot',
    cat: 'renkli-taslar',
    emoji: '💚',
    accent: '#82e0aa',
    name: { tr: 'Peridot', en: 'Peridot', ar: 'البيريدوت' },
    intro: {
      tr: 'Yanardağların iç ateşinden doğan yeşil — uzaydan da gelir.',
      en: 'Green born from volcanic fire — and sometimes from space.',
      ar: 'أخضر يولد من نار البراكين.',
    },
    body: {
      tr: 'Peridot (mineral adı "olivine"), demir ve magnezyum içeren silikat mineralidir. Rengi koyu kireç yeşilinden zeytin yeşiline kadar uzanır — bu renk tek başına demirden kaynaklanır, çoğu taşın aksine. Peridot yerin mantosunda oluşur ve yanardağ patlamalarıyla yüzeye çıkar — yani çoğu peridot yanardağ taşıdır. Dünyanın en önemli kaynağı Mısır\'ın Kızıldeniz\'deki St. John Adası\'dır, 3500 yıldır çıkarılıyor. ABD\'nin Arizona San Carlos bölgesi ikinci büyük kaynaktır. İlginç olan şu: bazı meteoritlerde de peridot bulunur — yani uzaydan düşen taşlardan. Ağustos doğum taşı.',
      en: 'Peridot (mineral name "olivine") is an iron-magnesium silicate. Its color runs from lime green to olive green — the color comes from iron alone, unusual among gems. Peridot forms in Earth\'s mantle and reaches the surface in volcanic eruptions — most peridot is volcanic. The world\'s most important source is Egypt\'s St. John\'s Island in the Red Sea, mined for 3,500 years. Arizona\'s San Carlos is the second major source. Remarkably, some meteorites also contain peridot — stones that fell from space. August birthstone.',
      ar: 'البيريدوت من أعماق الأرض، وبعضه من الفضاء.',
    },
    funFact: {
      tr: '2003\'te Antarktika\'da bulunan ALH 84001 meteoritinde peridot kristalleri tespit edildi. Bu meteorit Mars\'tan geldiği için, bizim takılarımıza bir benzer taş Mars\'ta da var demektir!',
      en: 'In the ALH 84001 meteorite (found in Antarctica, 2003) peridot crystals were identified. Since that meteorite originated from Mars, a stone just like our jewelry is found on Mars too!',
      ar: 'الكويكب ALH 84001 من المريخ يحتوي بيريدوت.',
    },
    stats: {
      hardness: '6.5–7 Mohs',
      formula: '(Mg,Fe)₂SiO₄',
      origin: 'Mısır, Arizona, Myanmar',
      birthstone: 'Ağustos',
    },
    scienceBox: {
      formula: '(Mg,Fe)₂SiO₄ (olivin)',
      crystalSystem: 'Orthorhombic',
      hardness: '6.5–7 (Mohs)',
      refractiveIndex: '1.650–1.681',
      density: '3.27–3.37 g/cm³',
      notes: {
        tr: 'Olivinin yeşil tonu demirden gelir (Fe²⁺). Saf magnezyum olivini ("forsterite") renksizdir, saf demir olivini ("fayalite") siyah-yeşil. Mücevher kalitesi peridotta demir oranı %8-15 arasındadır. Yerin üst mantosu yaklaşık %60 olivinden oluşur — yani peridot Dünya\'nın en bol minerallerinden biridir, sadece yüzeye çıkması nadirdir.',
        en: 'Olivine\'s green tone comes from iron (Fe²⁺). Pure magnesium olivine ("forsterite") is colorless; pure iron olivine ("fayalite") is blackish-green. Gem-quality peridot holds 8–15% iron. Earth\'s upper mantle is ~60% olivine — so peridot is one of Earth\'s most abundant minerals, only rare at the surface.',
        ar: 'اللون من الحديد. البيريدوت يُشكل 60٪ من وشاح الأرض.',
      },
    },
    timeline: [
      { year: '-1500',
        event: { tr: 'St. John Adası\'nda Mısırlılar peridot çıkarır — "Akşam Zümrüdü".',
                 en: 'Egyptians mine peridot at St. John\'s Island — "the Evening Emerald."',
                 ar: 'مصريون يستخرجون بيريدوت سان جون.' } },
      { year: '1500',
        event: { tr: 'Haçlı Seferleri Avrupa\'ya peridot taşır; kiliselerde "zümrüt" olarak kullanılır.',
                 en: 'Crusaders bring peridot to Europe; mistaken for emerald in churches.',
                 ar: 'الحروب الصليبية تنقل الحجر.' } },
      { year: '1994',
        event: { tr: 'Pakistan Himalaya Kashmir bölgesinde dev peridot yatağı.',
                 en: 'Huge peridot deposit found in Himalayan Kashmir, Pakistan.',
                 ar: 'اكتشاف في كشمير.' } },
    ],
    related: ['zumrut', 'topaz', 'garnet'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Garnet (Faz 2-B)
     ───────────────────────────────────────────────────────── */
  {
    id: 'garnet',
    cat: 'renkli-taslar',
    emoji: '🔴',
    accent: '#cb4335',
    name: { tr: 'Garnet', en: 'Garnet', ar: 'العقيق الأحمر (غارنت)' },
    intro: {
      tr: 'Nar taneleri gibi parlayan koyu kırmızı — ama aslında altı farklı mineralin aile adı.',
      en: 'Pomegranate-seed red — but it\'s actually a family of six different minerals.',
      ar: 'أحمر يُشبه حبّات الرمان — عائلة من ستة معادن.',
    },
    body: {
      tr: 'Garnet tek bir mineral değil, yaklaşık 20 benzer minerali kapsayan bir ailedir. Ana grupları: almandin (en yaygın, koyu kırmızı), pirop (kan kırmızısı, Çek Cumhuriyeti meşhurdur), demantoid (yeşil, tüm taşlardan daha parlak — Rus Ural), tsavorit (yeşil, Kenya/Tanzanya), spessartin (turuncu), rodolit (pembe-mor). "Garnet" adı Latince "granatus" — nar demek, çünkü nar tanesine benzer. Ocak doğum taşı. Mohs 6,5-7,5 sertliğinde. Bazı koyu kırmızı antik Mısır takıları 3000 yıldır hâlâ parlaklığını korumuş garnetlerdir.',
      en: 'Garnet isn\'t one mineral but a family of about 20 related minerals. Main groups: almandine (most common, deep red), pyrope (blood red, famous from the Czech Republic), demantoid (green, brighter than any other gem — Russian Urals), tsavorite (green, Kenya/Tanzania), spessartine (orange), rhodolite (pink-purple). The name comes from Latin "granatus" — pomegranate, because the stone looks like a pomegranate seed. January birthstone. Mohs 6.5–7.5. Some ancient Egyptian red garnet jewelry has kept its shine for 3,000 years.',
      ar: 'الغارنت عائلة من 20 معدناً، أشهرها الأحمر الألماندين.',
    },
    funFact: {
      tr: 'Demantoid garnet — yeşil bir tür — pırlantadan bile fazla parlaklığa sahiptir (ışığı daha fazla kırar, "dispersion" değeri daha yüksek). Rus çarlarının favori taşıydı. Bugün karatı 5000-20000 dolara satılabilir.',
      en: 'Demantoid garnet — a green variety — actually has higher dispersion than diamond, splitting light into more color flash. It was the favorite of Russian tsars. Today it can sell for $5,000–20,000 per carat.',
      ar: 'الديمانتويد الأخضر يُشتت الضوء أكثر من الماس.',
    },
    stats: {
      hardness: '6.5–7.5 Mohs',
      groups: '6+ ana varyete',
      birthstone: 'Ocak',
      famous: 'Demantoid (Rus Ural)',
    },
    scienceBox: {
      formula: 'A₃B₂(SiO₄)₃ — A: Ca/Mg/Fe/Mn, B: Al/Fe/Cr',
      crystalSystem: 'Cubic',
      hardness: '6.5–7.5 (Mohs)',
      refractiveIndex: '1.72–1.94 (varyeteye göre)',
      density: '3.5–4.3 g/cm³',
      notes: {
        tr: 'Garnet formülündeki A ve B konumları birçok farklı metali kabul eder. Magnezyum girerse pirop, demir girerse almandin, mangan girerse spessartin, kalsiyum+alüminyum girerse grossülar, kalsiyum+krom girerse uvarovit, kalsiyum+demir girerse andradite. Bu yüzden garnet bir değil, 20\'den fazla farklı mineral türü içerir.',
        en: 'The A and B positions in garnet\'s formula accept many different metals. Magnesium → pyrope, iron → almandine, manganese → spessartine, calcium + aluminum → grossular, calcium + chromium → uvarovite, calcium + iron → andradite. That\'s how garnet covers 20+ distinct mineral species.',
        ar: 'الغارنت يضم معادن كثيرة بتركيبات متعددة.',
      },
    },
    timeline: [
      { year: '-3500',
        event: { tr: 'Mısırlılar firavun mezarlarında garnet kolyeler bırakır.',
                 en: 'Egyptians leave garnet necklaces in pharaoh tombs.',
                 ar: 'المصريون يدفنون الغارنت مع الفراعنة.' } },
      { year: '1500',
        event: { tr: 'Bohemya (Çek) piropu Orta Avrupa zenginlerinin gözdesi olur.',
                 en: 'Bohemian pyrope becomes a favorite of Central European elite.',
                 ar: 'بيروب بوهيميا في أوروبا.' } },
      { year: '1868',
        event: { tr: 'Rus Ural\'da demantoid keşfedilir — Fabergé\'nin favori taşlarından.',
                 en: 'Demantoid discovered in the Russian Urals — a Fabergé favorite.',
                 ar: 'اكتشاف الديمانتويد الروسي.' } },
      { year: '1967',
        event: { tr: 'Kenya\'da tsavorit (yeşil garnet) bulunur.',
                 en: 'Tsavorite (green garnet) found in Kenya.',
                 ar: 'اكتشاف تسافوريت كينيا.' } },
    ],
    related: ['peridot', 'yakut', 'ametist'],
  },
];
