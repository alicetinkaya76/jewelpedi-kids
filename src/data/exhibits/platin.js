// Platin Salonu — Faz 2-B derinleştirildi + 2 yeni sergi.

export default [
  /* ─────────────────────────────────────────────────────────
     Platin Nedir? — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'platin-nedir',
    cat: 'platin',
    emoji: '⚪',
    accent: '#aab7b8',
    name: { tr: 'Platin Nedir?', en: 'What is Platinum?', ar: 'ما هو البلاتين؟' },
    intro: {
      tr: 'Altından 30 kat nadir, gümüşten 10 kat güçlü.',
      en: '30× rarer than gold, 10× tougher than silver.',
      ar: 'أندر من الذهب 30 مرة وأقوى من الفضة 10 مرات.',
    },
    body: {
      tr: 'Platin (simge: Pt), yerkabuğunda çok nadir bulunan gümüş-beyazı renkli bir metaldir. Altından 30 kat daha nadirdir — yani dünyada her yıl çıkarılan platinin hepsi bir olimpik havuzu dolduramaz! Yoğunluğu çok yüksektir (21,4 g/cm³), yani aynı hacimde diğer metallerden çok daha ağırdır. Korozyona karşı inanılmaz dayanıklıdır, havada paslanmaz, kararmaz.',
      en: 'Platinum (Pt) is an extremely rare silver-white metal. It\'s 30× rarer than gold — all the platinum mined in a year wouldn\'t fill an Olympic pool! Very dense (21.4 g/cm³) and astonishingly corrosion-resistant: it doesn\'t rust or tarnish in air.',
      ar: 'البلاتين معدن فضي اللون نادر جداً، كثافته 21.4 غ/سم³.',
    },
    funFact: {
      tr: 'Platin o kadar sağlamdır ki, 2000\'li yıllarda yapılan bir platin alyans elli yıl sonra bile ilk günkü kadar parlaktır. Altın ve gümüş aşınır, platin sadece "yoğunlaşır".',
      en: 'Platinum is so tough that a wedding ring made today will look nearly new 50 years later — while gold and silver wear down, platinum simply compacts.',
      ar: 'خاتم البلاتين يبقى كجديد بعد 50 عاماً.',
    },
    stats: {
      symbol: 'Pt',
      density: '21.4 g/cm³',
      rarity: '30× nadir (altına göre)',
      melting: '1768°C',
    },
    scienceBox: {
      formula: 'Pt (saf element)',
      crystalSystem: 'Cubic (FCC)',
      hardness: '3.5–4 (Mohs); ~4.5 (alaşım)',
      density: '21.45 g/cm³',
      notes: {
        tr: 'Platin "asil metaller" ailesinin en asil üyelerindendir: ne oksijenle, ne suyla, ne çoğu asitle tepkimeye girer. Sadece "kral suyu" (nitrik + hidroklorik asit karışımı) onu çözebilir. Bu yüzden laboratuvar kapları, el yapımı kimyasal deneylerin en yüksek sıcaklıklara dayanan potaları platinden yapılır. Ergime noktası 1768°C — altından 700 derece daha yüksek.',
        en: 'Platinum is the noblest of the "noble metals": it doesn\'t react with oxygen, water or most acids. Only "aqua regia" (nitric + hydrochloric acid) dissolves it. That\'s why the most heat-resistant lab crucibles are made from platinum. Its melting point is 1768°C — 700 degrees hotter than gold.',
        ar: 'البلاتين لا يتفاعل مع الأكسجين ولا الماء، ودرجة انصهاره 1768 مئوية.',
      },
    },
    timeline: [
      { year: '1557',
        event: { tr: 'İspanyollar Kolombiya\'da platini ilk kez tanımlar ("platina" = küçük gümüş).',
                 en: 'Spanish encounter platinum in Colombia ("platina" = little silver).',
                 ar: 'الإسبان يكتشفون البلاتين في كولومبيا.' } },
      { year: '1752',
        event: { tr: 'İsveçli Scheffer platini ayrı bir element olarak kabul ettirir.',
                 en: 'Swedish chemist Scheffer classifies platinum as a distinct element.',
                 ar: 'شيفر يُصنفه عنصراً مستقلاً.' } },
      { year: '1819',
        event: { tr: 'Rusya Ural Dağları\'nda platin bulur, platin ruble basılır.',
                 en: 'Russia discovers platinum in the Urals; mints platinum rubles.',
                 ar: 'روسيا تكتشفه في الأورال.' } },
      { year: '1924',
        event: { tr: 'Hans Merensky Güney Afrika\'da dev "Merensky Reef" yatağını bulur.',
                 en: 'Hans Merensky finds South Africa\'s vast "Merensky Reef" deposit.',
                 ar: 'اكتشاف رصيف ميرنسكي.' } },
    ],
    digDeeper: [
      {
        id: 'geology',
        icon: 'geology',
        title: { tr: 'Neden Bu Kadar Nadir?', en: 'Why So Rare?', ar: 'لماذا كل هذه الندرة؟' },
        body: {
          tr: 'Dünyada bilinen platin rezervinin %75\'i tek bir bölgededir: Güney Afrika\'nın Bushveld Kompleksi. Rusya Ural Dağları ve Zimbabwe\'deki Great Dyke ikinci-üçüncü sırada. Platinum çekirdeği içeren kayaların çok özel koşullarda — yanardağ magmasının uzun sürede yavaş soğumasıyla — oluşması gerekir. Bu yüzden dünyada sadece sayılı yerde vardır.\n\nAltın dünyada yılda 3000 ton çıkarılırken, platin sadece 180 ton çıkarılır. Ve bu 180 tonun neredeyse tamamı birkaç madendir — altında onlarca ülkede yüzlerce maden vardır.',
          en: '75% of the world\'s known platinum reserves lie in one region: South Africa\'s Bushveld Complex. Russia\'s Urals and Zimbabwe\'s Great Dyke hold second and third place. Platinum-bearing rocks require special conditions — volcanic magma cooling very slowly over long time spans. That\'s why the world has only a handful of productive sites.\n\nGold is mined at about 3,000 tons per year globally; platinum only 180 tons. And nearly all of that 180 tons comes from a few mines — while gold is pulled from hundreds of mines across dozens of countries.',
          ar: '75٪ من البلاتين في جنوب أفريقيا، إنتاجه السنوي 180 طناً فقط.',
        },
      },
    ],
    related: ['platin-vs-altin', 'platin-tarihi', 'platin-endustri'],
  },

  /* ─────────────────────────────────────────────────────────
     Platin vs Beyaz Altın vs Gümüş — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'platin-vs-altin',
    cat: 'platin',
    emoji: '⚖️',
    accent: '#808b96',
    name: { tr: 'Platin vs Beyaz Altın vs Gümüş', en: 'Platinum vs White Gold vs Silver', ar: 'البلاتين مقابل الذهب الأبيض والفضة' },
    intro: {
      tr: 'Hepsi gümüş rengi ama hepsi farklı — nasıl ayırt edilir?',
      en: 'All silver-colored, but all different — how to tell them apart?',
      ar: 'جميعها فضية اللون، لكن كيف نميزها؟',
    },
    body: {
      tr: 'Platin en ağır (21,4 g/cm³), en dayanıklı ve en pahalıdır. Beyaz altın aslında sarı altının paladyum veya nikel ile karışımıdır ve üzerine rodyum kaplama yapılır — bu kaplama zamanla aşınır ve yenilenmesi gerekir. Gümüş en hafif ve en ucuzdur ama kararır ve yumuşaktır. Bir mağazada elinde tuttuğunda ağır olan muhtemelen platindir.',
      en: 'Platinum is the heaviest (21.4 g/cm³), toughest and most expensive. White gold is yellow gold alloyed with palladium or nickel, then rhodium-plated — the plating wears and needs renewal. Silver is lightest and cheapest but tarnishes and is soft. The heavy one in your hand is usually platinum.',
      ar: 'البلاتين الأثقل والأقوى، الذهب الأبيض مطلي بالروديوم، الفضة الأخف والأرخص.',
    },
    funFact: {
      tr: 'Dünyada bilinen platin rezervinin %75\'i sadece Güney Afrika\'da bulunur! Rusya ve Zimbabwe ikinci ve üçüncü sıradadır.',
      en: '75% of the world\'s known platinum reserves are in South Africa alone.',
      ar: '75٪ من احتياطي البلاتين العالمي في جنوب أفريقيا.',
    },
    stats: {
      Platin: '21.4 g/cm³, 1768°C',
      'Beyaz altın': '~15 g/cm³ (18k)',
      Gümüş: '10.5 g/cm³, 962°C',
    },
    digDeeper: [
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Ağırlık Testi', en: 'The Weight Test', ar: 'اختبار الوزن' },
        body: {
          tr: 'Üç metalin görünümü birbirine çok benzediği için kuyumcular güvenilir bir "elde tartma" testi kullanır. Aynı hacimde:\n\n• Gümüş yüzük: 10.5 g/cm³ — en hafif, \"boşluklu\" hissi\n• Beyaz altın yüzük (18k): ~15 g/cm³ — orta\n• Platin yüzük: 21.4 g/cm³ — iki katı, elde "taş gibi" ağır\n\nDeneyimli bir kuyumcu gözleri kapalı bile platin ve beyaz altını elde tartarak ayırabilir. Sertifika olmadığı durumlarda yoğunluk testi (Arşimet prensibiyle) kullanılır: yüzük suya daldırılır, çıkan suyun hacmi ölçülür, ağırlık bölünür, yoğunluk bulunur.',
          en: 'Because the three metals look nearly identical, jewelers use a reliable "weight-in-hand" test. For the same volume:\n\n• Silver ring: 10.5 g/cm³ — lightest, feels "hollow"\n• White gold ring (18k): ~15 g/cm³ — middle\n• Platinum ring: 21.4 g/cm³ — double the silver, feels "stone-heavy"\n\nAn experienced jeweler can tell platinum from white gold by hand alone, eyes closed. Without paperwork, density testing (Archimedes principle) settles it: dip the ring in water, measure displaced volume, divide the weight, get the density.',
          ar: 'الوزن في اليد يُميز الثلاثة — البلاتين ضعف وزن الفضة.',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Rodyum Kaplamanın Ömrü', en: 'The Life of Rhodium Plating', ar: 'عمر طلاء الروديوم' },
        body: {
          tr: 'Beyaz altının aslında yansıttığı renk, saf sarı altının soluk bir gümüş tonudur — kuyumcular bunu yeterince beyaz bulmaz, bu yüzden üstüne çok ince (0,75-2,5 mikron) bir rodyum tabakası kaplarlar. Rodyum platin ailesinden bir metaldir ve saf beyaz yansıma sağlar.\n\nAma rodyum kaplama ömürlüdür: günlük giyilen bir alyansta 1-3 yıl sürer, sonra altın rengi alttan yansımaya başlar ve yüzük biraz sarımsı görünür. Kuyumcu tekrar kaplayabilir, fiyat 30-70 dolar civarındadır. Platin yüzük ise kaplama gerektirmez — rengi doğal olarak beyaz ve kalıcıdır.',
          en: 'White gold actually reflects a pale silvery tone of pure yellow gold — jewelers don\'t find it white enough, so they apply a very thin (0.75–2.5 micron) rhodium coating. Rhodium is a platinum-family metal and gives a pure white reflection.\n\nBut rhodium plating is finite: on a daily-worn wedding ring it lasts 1–3 years, then gold starts peeking through and the ring looks slightly yellow. A jeweler can re-plate it for $30–70. A platinum ring needs no plating — its color is naturally white and permanent.',
          ar: 'طلاء الروديوم على الذهب الأبيض يدوم 1-3 سنوات فقط.',
        },
      },
    ],
    related: ['platin-nedir', 'ayar-sistemi'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Platinin Tarihi
     ───────────────────────────────────────────────────────── */
  {
    id: 'platin-tarihi',
    cat: 'platin',
    emoji: '📜',
    accent: '#616a6b',
    name: { tr: 'Platinin Tarihi', en: 'History of Platinum', ar: 'تاريخ البلاتين' },
    intro: {
      tr: 'İspanyol fatihler "küçük gümüş" diye atmıştı — şimdi altından daha pahalı.',
      en: 'Spanish conquistadors tossed it aside as "little silver" — today it outpriced gold.',
      ar: 'رماه الإسبان كـ"فضة صغيرة" — اليوم أغلى من الذهب.',
    },
    body: {
      tr: 'Platinin bilim tarihindeki yolu ilginçtir: 16. yüzyıl İspanyol fatihleri Kolombiya\'da platine rastladığında onu "fazla sert altın" sanıp çöpe attılar. İsim kalıntıları "platina" (küçük gümüş, aşağılayıcı) olarak tarihte kaldı. 1750\'lerde İsveçli kimyager Scheffer platinin gerçek bir element olduğunu kanıtladı. 1819\'da Rusya Ural dağlarında büyük yataklar bulunca dünya ilk kez platin sikke basmaya başladı. 1924\'te Güney Afrika\'daki Merensky Reef keşfedildi — bugün dünya platininin çoğunun geldiği yer. 20. yüzyılın başında Art Deco dönemi platini takı dünyasına getirdi.',
      en: 'Platinum\'s scientific journey is peculiar: 16th-century Spanish conquistadors in Colombia dismissed it as "unworkably hard gold" and threw it out. The name "platina" (little silver, a slight) stuck. In the 1750s, Swedish chemist Scheffer proved platinum was a real element. When Russia discovered huge deposits in the Urals in 1819, the world minted platinum coins for the first time. South Africa\'s Merensky Reef was found in 1924 — still the source of most platinum today. Art Deco brought platinum into jewelry in the early 20th century.',
      ar: 'ظن الإسبان أنه فضة، ثم أصبح معدناً ثميناً عام 1750.',
    },
    funFact: {
      tr: '19. yüzyıl başında Rusya platini madeni para olarak kullandı — dünya tarihinde platin sikke basan tek ülke. 1828-1845 arası 3 ve 6 ruble platin paralar tedavüldeydi. Bugün bunlar koleksiyonerler arasında çok değerli.',
      en: 'Early-19th-century Russia was the only country ever to circulate platinum coinage — 3 and 6 ruble platinum coins (1828–1845). They\'re now highly collectible.',
      ar: 'روسيا الدولة الوحيدة التي سكت عملات بلاتينية.',
    },
    stats: {
      'İlk Avrupa teması': '1557 (Kolombiya)',
      'İlk resmi element': '1752',
      'Rus platin rublesi': '1828-1845',
      'Merensky Reef': '1924',
    },
    timeline: [
      { year: '-700',
        event: { tr: 'Kolombiya\'nın Tumaco kültürü altın-platin alaşımı süs eşyaları yapar.',
                 en: 'Colombia\'s Tumaco culture crafts gold-platinum alloy ornaments.',
                 ar: 'ثقافة تومكاو تصنع حلي ذهب-بلاتين.' } },
      { year: '1557',
        event: { tr: 'İspanyol Antonio de Ulloa platinin ilk Avrupa kaydını tutar.',
                 en: 'Spanish Antonio de Ulloa records first European mention of platinum.',
                 ar: 'أول تسجيل أوروبي للبلاتين.' } },
      { year: '1803',
        event: { tr: 'William Hyde Wollaston ilk saf platini elde eder, paladyum ve rodyumu keşfeder.',
                 en: 'Wollaston isolates pure platinum and discovers palladium & rhodium.',
                 ar: 'وولاستون يُنقي البلاتين.' } },
      { year: '1901',
        event: { tr: 'Louis Cartier Paris\'te platin mücevher çağını başlatır.',
                 en: 'Louis Cartier launches the era of platinum jewelry in Paris.',
                 ar: 'كارتييه يبدأ عصر مجوهرات البلاتين.' } },
      { year: '1924',
        event: { tr: 'Merensky Reef keşfi — dünya platin arzı 10 katına çıkar.',
                 en: 'Merensky Reef discovery multiplies world platinum supply 10-fold.',
                 ar: 'اكتشاف رصيف ميرنسكي يضاعف الإنتاج.' } },
    ],
    digDeeper: [
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Art Deco ve Platin', en: 'Art Deco and Platinum', ar: 'الآر ديكو والبلاتين' },
        body: {
          tr: '1900-1939 arası dönem "Platin Çağı" olarak adlandırılır. Louis Cartier ve Harry Winston gibi kuyumcular platinin benzersiz özelliğini keşfetmişti: çok ince ama son derece güçlü "telkâri" ve "milgrain" işçilik mümkün. Altında bu kadar ince çalışmak işi zayıflatırdı, platinde aynı incelik yıllarca dayanıyordu.\n\nArt Deco tarzı geometrik motiflerle, pırlanta milgrain süslemelerle, saplı pend kolyelerle şekillendi. Tiffany & Co.\'nun 1886\'da tanıttığı "Tiffany Setting" nişan yüzüğü de platindendi — 6 platin tırnakla pırlantayı havaya kaldıran tasarım. II. Dünya Savaşı\'nda platin stratejik metal ilan edildi, sivil kuyumculukta yasaklandı; bu yüzden 1940\'ların yüzükleri altındandır.',
          en: 'The period 1900–1939 is called the "Platinum Age." Jewelers like Louis Cartier and Harry Winston had discovered platinum\'s unique strength: extraordinarily thin yet strong filigree and millegrain work was possible. Gold that thin would flex; platinum that thin held for decades.\n\nArt Deco style took shape around geometric motifs, diamond millegrain, drop pendants. Tiffany & Co.\'s 1886 "Tiffany Setting" engagement ring was also platinum — six platinum prongs lifting the diamond into air. In WWII, platinum was declared a strategic metal and banned from civilian jewelry; that\'s why 1940s rings are gold.',
          ar: 'من 1900-1939 كان عصر البلاتين — آر ديكو والخاتم الماسي الشهير.',
        },
      },
    ],
    related: ['platin-nedir', 'platin-endustri'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Platinin Endüstriyel Yüzü
     ───────────────────────────────────────────────────────── */
  {
    id: 'platin-endustri',
    cat: 'platin',
    emoji: '🔧',
    accent: '#566573',
    name: { tr: 'Platin Sadece Takı Değil', en: 'Platinum Beyond Jewelry', ar: 'البلاتين ليس للمجوهرات فقط' },
    intro: {
      tr: 'Dünyadaki platinin yarıdan fazlası mücevher değil, arabalarda!',
      en: 'More than half of the world\'s platinum isn\'t in jewelry — it\'s in cars!',
      ar: 'أكثر من نصف البلاتين في السيارات لا المجوهرات.',
    },
    body: {
      tr: 'Platinin belki de en önemli kullanımı takı değil, "katalitik dönüştürücüler"dir: her modern benzinli veya dizel otomobilin egzoz sisteminde platin içeren bir parça vardır. Platin, zehirli egzoz gazlarını (CO, NOx, HC) zararsız gazlara dönüştüren katalizör görevi görür. Dünya platin üretiminin yaklaşık %40\'ı buraya gider. Diğer kritik alanlar: tıbbi cihazlar (kalp kapakçıkları, pacemaker telleri), laboratuvar kapları (1768°C\'ye dayanıklı), elektronik (sabit disk kafaları), gübre üretimi (amonyak sentezi katalizörü). Yani elinizdeki platin yüzük bir teknoloji devrimi metalıdır.',
      en: 'Platinum\'s most important use may not be jewelry but "catalytic converters" — every modern gas or diesel car has a platinum-containing part in its exhaust. Platinum catalyzes toxic exhaust gases (CO, NOx, hydrocarbons) into harmless gases. About 40% of global platinum production goes there. Other critical uses: medical devices (heart valves, pacemaker leads), lab crucibles (handles 1768°C), electronics (hard-disk heads), fertilizer production (ammonia synthesis catalyst). A platinum ring on your finger is a technology-revolution metal.',
      ar: '40٪ من البلاتين يذهب للمحفزات في السيارات، والباقي للطب والمختبرات.',
    },
    funFact: {
      tr: 'Her otomobilin katalitik dönüştürücüsünde yaklaşık 3-7 gram platin vardır — bir alyans kadar. Bu yüzden hurdacılık pazarında "kat" hırsızlığı büyük bir sorun: bir katta 100-500 dolar değerinde platin var.',
      en: 'Each car\'s catalytic converter contains 3–7 grams of platinum — about a wedding ring\'s worth. That\'s why "cat" theft is a major scrap-market problem: each converter holds $100–500 of platinum.',
      ar: 'كل محفز سيارة يحتوي 3-7 غرام بلاتين — بقيمة 100-500 دولار.',
    },
    stats: {
      'Otomotiv kullanımı': '~%40 küresel arz',
      'Mücevher': '~%25',
      'Kimya/gübre': '~%15',
      'Elektronik + tıp': '~%20',
    },
    scienceBox: {
      formula: 'Pt (+Pd, Rh katalizörde)',
      crystalSystem: 'Cubic (FCC)',
      hardness: '3.5–4 (Mohs)',
      density: '21.45 g/cm³',
      notes: {
        tr: 'Platin katalizör olarak çalışırken kendisi tepkimeye girmez — sadece yüzeyinde reaksiyonun çok daha hızlı gerçekleşmesini sağlar. Bir gram platin, kendi ağırlığının milyonlarca katı kadar gazı dönüştürebilir. Bu "katalitik" özelliği hem endüstriyi hem çevre teknolojisini mümkün kılan şeydir.',
        en: 'When platinum acts as a catalyst, it doesn\'t participate in the reaction itself — it just makes the reaction happen far faster on its surface. One gram of platinum can process millions of times its own weight in gas. This catalytic property is what enables both industry and environmental tech.',
        ar: 'البلاتين محفز — يُسرع التفاعل دون أن يُستهلك.',
      },
    },
    digDeeper: [
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Paladyum Ailesi', en: 'The Palladium Family', ar: 'عائلة البلاديوم' },
        body: {
          tr: 'Platin aslında bir ailenin parçasıdır: "platin grubu metaller" (PGM). Ailenin üyeleri platin, paladyum, rodyum, rutenyum, iridyum ve osmiyum. Hepsi benzer kimyasal davranışa sahiptir ve çoğunlukla aynı madenden birlikte çıkarılır — Güney Afrika\'nın Bushveld\'inde platinle birlikte paladyum da elde edilir.\n\nPaladyum 2000\'ler başında katalizör olarak ucuz bir alternatif sayılırdı, ama 2020\'lerde otomotiv talebinin patlamasıyla platinden bile pahalı oldu. Rodyum, beyaz altın kaplamasında kullanılan kardeş — 2021\'de bir ara gramı 900 dolara kadar çıktı, altından 14 kat pahalı. İridyum ve osmiyum ise dolma kalem uçlarından uzay roketlerinde kullanılır.',
          en: 'Platinum is part of a family: the "platinum group metals" (PGM). Members: platinum, palladium, rhodium, ruthenium, iridium, osmium. All share similar chemical behavior and are usually extracted together — South Africa\'s Bushveld yields palladium alongside platinum.\n\nPalladium was considered a cheaper catalyst alternative in the early 2000s; by the 2020s, auto demand pushed it above platinum in price. Rhodium, used in white-gold plating, briefly hit $900/gram in 2021 — 14× the price of gold. Iridium and osmium appear everywhere from fountain-pen nibs to space rocket components.',
          ar: 'عائلة البلاتين ستة معادن: بلاتين، بلاديوم، روديوم، روثينيوم، إيريديوم، أوزميوم.',
        },
      },
    ],
    related: ['platin-nedir', 'platin-tarihi'],
  },
];
