// Gümüş Salonu — Faz 2-A derinleştirildi. 925-ayar (scienceBox, timeline),
// gumus-bakimi (scienceBox + digDeeper), trabzon-hasiri (tam set + storyThread),
// telkari (timeline + digDeeper).

export default [
  /* ─────────────────────────────────────────────────────────
     925 Ayar Gümüş — Sterling Silver
     ───────────────────────────────────────────────────────── */
  {
    id: '925-ayar',
    cat: 'gumus',
    emoji: '🔘',
    accent: '#95a5a6',
    name: { tr: '925 Ayar Gümüş', en: 'Sterling Silver (925)', ar: 'فضة عيار 925' },
    intro: {
      tr: '%92,5 saf gümüş + %7,5 bakır. Takılardaki standart.',
      en: '92.5% pure silver + 7.5% copper. The jewelry standard.',
      ar: '92.5٪ فضة نقية + 7.5٪ نحاس.',
    },
    body: {
      tr: 'Saf gümüş (999 ayar) çok yumuşak olduğu için takı yapımında kullanılmaz — parmağınla bile çizebilirsin. Bu yüzden gümüş, genellikle bakırla karıştırılır. 925 ayar damgası, bu takının %92,5 saf gümüş içerdiğini garanti eder. Dünyada uluslararası kabul gören standarttır.',
      en: 'Pure 999 silver is too soft for jewelry — you could scratch it with a fingernail. So it\'s alloyed with copper. The 925 stamp guarantees 92.5% pure silver content — the international standard.',
      ar: 'الفضة النقية طرية جداً، لذا تُخلط بالنحاس. دمغة 925 تضمن 92.5٪ نقاء.',
    },
    funFact: {
      tr: '"Sterling" adı Orta Çağ İngilteresi\'ndeki "easterling" penilerinden gelir — Kuzey Almanya\'dan gelen tüccarların kullandığı yüksek saflıktaki gümüş sikkeler.',
      en: 'The name "sterling" comes from medieval English "easterling" pennies — high-purity silver coins brought by northern German traders.',
      ar: 'اسم "ستيرلينغ" من بنسات "إيسترلينغ" في إنجلترا العصور الوسطى.',
    },
    stats: {
      purity: '92.5%',
      alloy: 'Bakır (%7.5)',
      stamp: '925 / Ag 925',
    },
    scienceBox: {
      formula: 'Ag 92.5% + Cu 7.5%',
      crystalSystem: 'Cubic (FCC)',
      hardness: '2.5–3 (Mohs, saf); ~3.5 (925)',
      density: '10.36 g/cm³ (925); 10.49 g/cm³ (saf Ag)',
      notes: {
        tr: 'Gümüş simgesi Ag, Latince "argentum" (parlak) kelimesinden gelir. Saf gümüş tüm metaller arasında ışığı en iyi yansıtan metaldir (%95) — bu yüzden aynalar gümüş kaplanır. Ayrıca elektrik ve ısıyı altından bile iyi iletir. Bakırla alaşım sertliği artırır ama aynı zamanda kararmayı da hızlandırır.',
        en: 'Silver\'s symbol Ag comes from Latin "argentum" (bright). Pure silver reflects more light than any other metal (95%) — that\'s why mirrors are silver-coated. It also conducts electricity and heat better than gold. Alloying with copper increases hardness but also speeds up tarnish.',
        ar: 'الفضة أكثر المعادن عكساً للضوء، لهذا تُكسى المرايا بها.',
      },
    },
    timeline: [
      { year: '-3000',
        event: { tr: 'Anadolu\'da ilk gümüş cevheri (galenit) işlemesi başlar.',
                 en: 'First silver ore (galena) smelting begins in Anatolia.',
                 ar: 'بدء صهر الفضة في الأناضول.' } },
      { year: '1158',
        event: { tr: 'İngiliz "easterling" peniler yüksek saflıkta gümüş standardı oluşturur.',
                 en: 'English "easterling" pennies set high-purity silver standard.',
                 ar: 'بنسات إيسترلينغ الإنجليزية.' } },
      { year: '1275',
        event: { tr: '925 ayar resmî standart olarak İngiltere Hazinesi tarafından kabul edilir.',
                 en: '925 purity adopted as UK Treasury standard.',
                 ar: 'اعتماد عيار 925 رسمياً.' } },
      { year: '1906',
        event: { tr: 'Türkiye\'de kuyumcular için ayar damgası zorunluluğu getirilir.',
                 en: 'Karat-stamping becomes mandatory for Turkish jewelers.',
                 ar: 'إلزام ختم العيار في تركيا.' } },
    ],
    related: ['gumus-bakimi', 'trabzon-hasiri', 'telkari'],
  },

  /* ─────────────────────────────────────────────────────────
     Gümüş Neden Kararır?
     ───────────────────────────────────────────────────────── */
  {
    id: 'gumus-bakimi',
    cat: 'gumus',
    emoji: '✨',
    accent: '#85929e',
    name: { tr: 'Gümüş Neden Kararır?', en: 'Why Silver Tarnishes', ar: 'لماذا تتأكسد الفضة' },
    intro: {
      tr: 'Gümüş aslında paslanmaz — kararır. Aradaki fark büyük.',
      en: 'Silver doesn\'t rust — it tarnishes. That\'s a big difference.',
      ar: 'الفضة لا تصدأ بل تتأكسد.',
    },
    body: {
      tr: 'Gümüş havadaki kükürt (sülfür) ile tepkimeye girer ve yüzeyinde ince bir gümüş sülfür (Ag₂S) tabakası oluşur. Bu tabaka ilk başta sarımsı, sonra koyu kahverengi ve en sonunda siyah görünür. Paslanma (oksitlenme) ise oksijenle tepkimedir ve gümüşte çok yavaş olur — bu yüzden gümüş "paslanmaz" denir ama kararır.',
      en: 'Silver reacts with sulfur in the air, forming a thin layer of silver sulfide (Ag₂S) on its surface. This layer first looks yellowish, then brown, then black. Rusting (oxidation with oxygen) happens very slowly on silver — so silver doesn\'t rust, but it does tarnish.',
      ar: 'تتفاعل الفضة مع كبريت الهواء مكوّنة طبقة رقيقة من كبريتيد الفضة.',
    },
    funFact: {
      tr: 'Gümüşün kararmasını önlemenin en kolay yolu onu hava almayan bir torbada saklamak. Alüminyum folyoya ve sıcak tuzlu suya koyarak kararmış gümüşü evde temizleyebilirsin — bu kimyasal bir tepkimedir!',
      en: 'The easiest way to prevent tarnish is to store silver in an air-tight bag. You can clean tarnished silver at home using aluminum foil and hot salt water — a real chemical reaction!',
      ar: 'يمكن تنظيف الفضة المتأكسدة بورق الألمنيوم والماء المالح الساخن.',
    },
    stats: {
      reaction: '2 Ag + H₂S → Ag₂S + H₂',
      color: 'Sarı → kahverengi → siyah',
      prevention: 'Hava almayan saklama',
    },
    scienceBox: {
      formula: 'Ag₂S (gümüş sülfür — kararma ürünü)',
      crystalSystem: 'Monoclinic',
      hardness: '2–2.5 (Mohs, sülfür tabakası)',
      density: '7.23 g/cm³',
      notes: {
        tr: 'Kararma nanometrik incelikte başlar — ilk tabaka yalnızca birkaç atom kalınlığındadır ve hafif sarımsı görünür. Saatler, günler geçtikçe tabaka kalınlaşır: kahverengi, koyu kırmızı, sonunda siyah. Nem havada kükürt varsa süreci hızlandırır. Yumurta, soğan, patates gibi sülfür içeren gıdalar da gümüşü hızla karartır.',
        en: 'Tarnish begins at a nanometric scale — the first layer is only a few atoms thick and looks pale yellow. Over hours and days it thickens: brown, dark red, finally black. Humidity plus sulfur in air accelerates it. Sulfur-rich foods (eggs, onion, potato) also darken silver fast.',
        ar: 'الطبقة تبدأ بضع ذرات فقط ثم تسودّ. الرطوبة والكبريت تُسرّعان العملية.',
      },
    },
    digDeeper: [
      {
        id: 'chemistry',
        icon: 'chemistry',
        title: { tr: 'Evde Elektrokimyasal Temizlik', en: 'DIY Electrochemistry at Home', ar: 'تنظيف كيميائي منزلي' },
        body: {
          tr: 'Kararmış bir gümüş yüzüğü alüminyum folyo kaplı bir kaseye koy, üstüne bir çay kaşığı tuz ve bir çay kaşığı kabartma tozu ekle, üstüne sıcak su dök. Birkaç dakika içinde kararma kaybolur — ve siyah tabaka alüminyum folyoya geçer.\n\nBu sihir değil, "elektrokimya". Alüminyum elektronlarını gümüşe "ödünç verir", gümüş sülfürde bağlı olan gümüş atomları serbest kalır, alüminyum kükürtle bağlanır (Al₂S₃). Kararma alüminyuma geçer. Bu prensibi 1957\'de bir kimyager mutfak sihri olarak yazdı, günümüzde ders kitaplarına girdi.',
          en: 'Put a tarnished silver ring into a foil-lined bowl, add a teaspoon of salt and a teaspoon of baking soda, pour in hot water. Within minutes, the tarnish lifts off — the black layer transfers to the aluminum foil.\n\nThis isn\'t magic, it\'s electrochemistry. Aluminum "lends" electrons to silver, the silver atoms bound in silver sulfide are freed, and aluminum bonds with the sulfur (Al₂S₃). The tarnish moves to the aluminum. A chemist wrote it up as kitchen magic in 1957; it\'s in textbooks today.',
          ar: 'الألمنيوم يُعير إلكتروناته للفضة، فتنتقل طبقة الأكسدة إليه.',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Kararmayı Süs Olarak Kullanmak', en: 'Tarnish as Decoration', ar: 'استخدام الأكسدة كزينة' },
        body: {
          tr: 'Kuyumcular bazen kararmayı özellikle tetikler — buna "oxidized silver" veya Türkçe\'de "yakma" denir. Gümüşe kükürt çözeltisi sürüp ısıtıldığında yüzey anında siyahlaşır; sonra parlak yüzeyler cilalanıp siyah sadece oyukların içinde kalır. Sonuç: desenin çukurları siyah, yüksek yerler parlak gümüş — kontrast güçlü bir tasarım. Telkâri ustaları bazen bu tekniği eserlerinin ayrıntısını ortaya çıkarmak için kullanır.',
          en: 'Jewelers sometimes trigger tarnish on purpose — called "oxidized silver." Applying a sulfur solution and heating blackens the surface instantly; then high points are polished, leaving black only in the recesses. Result: pattern hollows are black, raised surfaces are bright silver — a high-contrast design. Filigree masters sometimes use this to bring out a piece\'s detail.',
          ar: 'يستخدم الصاغة الأكسدة عمداً لإبراز التفاصيل.',
        },
      },
    ],
    interactive: 'tarnish',
    related: ['925-ayar', 'telkari'],
  },

  /* ─────────────────────────────────────────────────────────
     Trabzon Hasırı — deepened, full set
     ───────────────────────────────────────────────────────── */
  {
    id: 'trabzon-hasiri',
    cat: 'gumus',
    emoji: '🧶',
    accent: '#7f8c8d',
    name: { tr: 'Trabzon Hasırı', en: 'Trabzon Chain-Weave', ar: 'حصير طرابزون' },
    intro: {
      tr: 'Karadeniz\'in sabırla örülen gümüş şaheseri.',
      en: 'The Black Sea\'s patiently-woven silver masterpiece.',
      ar: 'تحفة فضية منسوجة بصبر من منطقة البحر الأسود.',
    },
    body: {
      tr: 'Trabzon hasırı, çok ince gümüş tellerin sabır ve ustalıkla birbirine örülmesiyle yapılır. Usta, önce gümüş teli ince ince çeker, sonra küçük halkalar keser, bu halkaları birer birer elle örer. Bir tek bilezik için binlerce halka gerekebilir ve birkaç günden bir haftaya kadar çalışma alır. 500 yılı aşkın bir gelenektir ve 2004\'te Türk Patent ve Marka Kurumu tarafından "Coğrafi İşaret" tescilli olarak koruma altına alınmıştır. Not: Trabzon Hasırı, UNESCO\'nun Somut Olmayan Kültürel Miras listesinde değildir; bu koruma ulusal düzeydedir.',
      en: 'Trabzon hasır is made by patiently weaving very thin silver wires by hand. The master first draws the wire thin, cuts tiny rings and weaves them together one by one. A single bracelet may require thousands of rings and take days. A 500-year-old tradition, registered since 2004 by the Turkish Patent and Trademark Office as a protected Geographical Indication (GI). Note: Trabzon Hasır is not on UNESCO\'s Intangible Cultural Heritage list; this is a national-level protection.',
      ar: 'يُصنع بحياكة أسلاك فضية رفيعة جداً يدوياً. تقليد عمره أكثر من 500 سنة، مسجل منذ 2004 كعلامة جغرافية تركية محمية. ملاحظة: حصير طرابزون غير مدرج على قائمة اليونسكو للتراث اللامادي؛ هذه حماية وطنية.',
    },
    funFact: {
      tr: 'Gerçek Trabzon hasırı asla mıknatısa yapışmaz — çünkü gümüş mıknatıslanmaz. Ayrıca ışığa tutulduğunda örgünün ince damarları görünür, makine yapımı taklitlerde bu "canlılık" olmaz.',
      en: 'Real Trabzon hasır never sticks to magnets — silver isn\'t magnetic. Held up to light, the weave\'s fine threads come alive; machine copies lack this quality.',
      ar: 'الحصير الأصلي لا يلتصق بالمغناطيس.',
    },
    stats: {
      origin: 'Trabzon',
      age: '500+ yıl',
      technique: 'El örgü gümüş tel',
      recognition: 'Türk Patent Coğrafi İşaret (2004)',
    },
    timeline: [
      { year: '1500',
        event: { tr: 'Trabzon\'un Pontus Rum kuyumcuları hasır tekniğini geliştirir.',
                 en: 'Trabzon\'s Pontic Greek jewelers develop the hasır technique.',
                 ar: 'تطوير تقنية الحصير في طرابزون.' } },
      { year: '1920',
        event: { tr: 'Nüfus mübadelesi sonrası Türk ustalar geleneği sürdürür.',
                 en: 'After population exchange, Turkish masters continue the tradition.',
                 ar: 'استمرار التقليد بعد تبادل السكان.' } },
      { year: '2004',
        event: { tr: 'Trabzon Hasırı Türkiye\'nin Coğrafi İşareti olarak tescillenir.',
                 en: 'Trabzon Hasır registered as a Turkish Geographical Indication.',
                 ar: 'تسجيل حصير طرابزون عام 2004.' } },
      { year: '2020',
        event: { tr: 'Trabzon\'da 200\'ü aşan usta aktif çalışır; destekli çıraklık programları genişler.',
                 en: 'Trabzon\'s active master count exceeds 200; subsidized apprentice programs expand.',
                 ar: 'أكثر من 200 صانع نشط في طرابزون وتوسع برامج التدريب المدعومة.' } },
    ],
    digDeeper: [
      {
        id: 'craft',
        icon: 'craft',
        title: { tr: 'Bir Bileziğin İmalat Aşamaları', en: 'Making a Bracelet, Step by Step', ar: 'خطوات صناعة السوار' },
        body: {
          tr: '1. Tel çekme: 925 ayar gümüş külçe, elde çekme merdanesiyle 0,2-0,3 mm kalınlığa düşürülür — bazen 30-40 defa geçirilir.\n\n2. Bobin ve helezon: Çekilmiş tel bir mil üzerine sıkı sıkıya sarılır, sonra mil çıkarılır ve uzun bir helezon (yay) elde edilir.\n\n3. Halka kesimi: Keskin bir matkap ya da el testeresi ile helezon boylamasına kesilir — her sarım bir yüzük halkası olur.\n\n4. Örgü: Ustanın tezgâhında her halka bir öncekine açılır, bir sonrakine geçirilir, sonra kapatılır. Bir 18 cm bileklikte yaklaşık 4.000-6.000 halka vardır.\n\n5. Lehimleme: Her halkanın ağzı ayrı ayrı gümüş lehim tozu ile kapatılır — tel örgü tek parça olur.\n\n6. Parlatma: Son parlatma makinesinde mate ve cila arasında tercih yapılır.',
          en: '1. Wire drawing: A 925 silver bar is pulled through a drawplate by hand down to 0.2–0.3 mm — sometimes 30–40 passes.\n\n2. Coiling: The drawn wire is tightly wound around a mandrel; the mandrel is removed, leaving a long spring-like coil.\n\n3. Ring cutting: A fine saw or drill slices the coil lengthwise — each loop becomes one ring.\n\n4. Weaving: At the bench, each ring is opened, linked to the next, then closed. An 18 cm bracelet typically holds 4,000–6,000 rings.\n\n5. Soldering: Each ring\'s joint is closed individually with silver solder paste — the weave becomes one piece.\n\n6. Finishing: Final polish chooses between matte and high-shine.',
          ar: 'ست مراحل: سحب السلك، لف الحلزون، قص الحلقات، الحياكة، اللحام، التلميع.',
        },
      },
      {
        id: 'history',
        icon: 'history',
        title: { tr: 'Coğrafi İşarete Giden Yol', en: 'The Road to Geographical Indication', ar: 'الطريق إلى العلامة الجغرافية' },
        body: {
          tr: '20. yüzyılın sonlarında Trabzon hasırı neredeyse tükeniyordu: sadece birkaç yaşlı usta kalmıştı, genç nesil bu zahmetli işi öğrenmek istemiyordu, ucuz makine taklitleri pazarı dolduruyordu. Durum kritikti. 2000\'lerin başında Trabzon Ticaret ve Sanayi Odası coğrafi işaret çalışmalarına başladı, sertifikalı ustalar listesi oluşturdu, atölyelerde çıraklık programları açıldı. 2004\'te Türk Patent ve Marka Kurumu "Trabzon Hasırı"nı Coğrafi İşaret olarak tescil etti — artık bu isim sadece belirlenen teknik ve yerle üretildiğinde kullanılabilir. Bu koruma UNESCO Somut Olmayan Kültürel Miras listesinden farklıdır; UNESCO tescili ayrı ve uluslararası bir süreçtir, Trabzon Hasırı bu listede yer almaz. Bugün Trabzon\'da 200\'ü aşkın usta aktif olarak çalışıyor.',
          en: 'By the late 20th century Trabzon hasır was dying: only a few elderly masters remained, young people avoided the demanding craft, cheap machine imitations flooded the market. In the early 2000s the Trabzon Chamber of Commerce launched geographical indication (GI) work, registered a list of certified masters, and opened apprentice programs. In 2004 the Turkish Patent and Trademark Office registered "Trabzon Hasır" as a protected Geographical Indication — the name can now only be used for bracelets made with the specified technique in the specified region. This protection is different from UNESCO\'s Intangible Cultural Heritage list; UNESCO inscription is a separate, international process — Trabzon Hasır is not on the UNESCO list. Today more than 200 active masters work in Trabzon.',
          ar: 'كاد الفن ينقرض في أواخر القرن 20. عام 2004 سجّله معهد البراءات التركي كعلامة جغرافية محمية. هذه حماية وطنية تختلف عن قائمة اليونسكو للتراث اللامادي — حصير طرابزون ليس على قائمة اليونسكو. اليوم يعمل أكثر من 200 صانع في طرابزون.',
        },
      },
    ],
    storyThread: 'trabzon-hasiri-unesco',
    related: ['925-ayar', 'telkari', 'bilezik'],
  },

  /* ─────────────────────────────────────────────────────────
     Telkâri — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'telkari',
    cat: 'gumus',
    emoji: '🕸️',
    accent: '#566573',
    name: { tr: 'Telkâri', en: 'Filigree (Telkâri)', ar: 'تلكاري' },
    intro: {
      tr: 'Mardin\'in incecik tellerle ördüğü dantel gibi zanaat.',
      en: 'Mardin\'s lace-like silver filigree craft.',
      ar: 'حرفة الفضة الدانتيلية في ماردين.',
    },
    body: {
      tr: 'Telkâri, ince gümüş tellerin dantel gibi örülerek eser haline getirildiği bir sanattır. Mardin bu sanatın dünyada bilinen merkezlerinden biridir ve teknik Mezopotamya\'dan gelmiştir. Usta, 0,25 mm kalınlığındaki gümüş teli eğer, kıvırır, lehimler ve çiçek, yıldız veya geometrik desenler oluşturur. Bir kolye kolyesini tamamlamak bir ustaya haftalar alabilir.',
      en: 'Filigree is an art of weaving fine silver wire into lace-like pieces. Mardin is one of the world\'s centers for this craft, a technique originating in Mesopotamia. Masters bend, curl and solder 0.25 mm silver wire into flowers, stars and geometric patterns. One necklace can take weeks.',
      ar: 'فن نسج خيوط فضية رقيقة، ماردين من مراكزه العالمية.',
    },
    funFact: {
      tr: 'Telkâri sanatının yaşı 5000 yılın üzerindedir. Bugün dünyada bu zanaatı usta seviyede sürdüren sadece birkaç yüz kişi kalmıştır.',
      en: 'Filigree is over 5,000 years old, and fewer than a few hundred masters practice it worldwide today.',
      ar: 'عمر فن التلكاري أكثر من 5000 سنة.',
    },
    stats: {
      wire: '0.25 mm',
      origin: 'Mardin',
      time: 'Haftalar (bir eser için)',
      heritage: 'Mezopotamya — 3000 yıl',
    },
    timeline: [
      { year: '-2500',
        event: { tr: 'Ur (Sümer) kraliyet mezarlarında ilk filigree takılar.',
                 en: 'Earliest filigree jewelry in royal tombs of Ur (Sumer).',
                 ar: 'مقابر أور السومرية.' } },
      { year: '-500',
        event: { tr: 'Etrüsk ustaları "granülasyon" tekniğini geliştirir.',
                 en: 'Etruscan masters refine granulation technique.',
                 ar: 'الإتروسكانيون يُطورون تقنية التحبيب.' } },
      { year: '600',
        event: { tr: 'Bizans İmparatorluğu\'nda kilise haçları telkâri ile süslenir.',
                 en: 'Byzantine crosses decorated with filigree work.',
                 ar: 'الفن في الكنائس البيزنطية.' } },
      { year: '1200',
        event: { tr: 'Süryani kuyumcular Mardin\'de telkâri atölyeleri kurar.',
                 en: 'Syriac jewelers establish filigree workshops in Mardin.',
                 ar: 'الصاغة السريان في ماردين.' } },
      { year: '2013',
        event: { tr: 'Mardin Telkârisi Türkiye Coğrafi İşareti alır.',
                 en: 'Mardin Telkâri granted Turkish Geographical Indication.',
                 ar: 'تسجيل تلكاري ماردين 2013.' } },
    ],
    digDeeper: [
      {
        id: 'craft',
        icon: 'craft',
        title: { tr: 'Üç Temel Hareket', en: 'The Three Core Movements', ar: 'الحركات الثلاث الأساسية' },
        body: {
          tr: 'Telkâri ustasının üç temel hareketi vardır: "bükme" (teli belli bir açıyla kıvırmak), "sarma" (teli bir başka telin etrafına helezon şeklinde sarmak) ve "lehimleme" (iki teli küçük bir gümüş nokta ile birleştirmek).\n\nTüm karmaşık desenler aslında bu üç hareketin tekrar ve kombinasyonudur. Usta, 0,25 mm kalınlığındaki gümüş teli cımbız ve ince pensle işler. Lehimleme için gümüş tozu ve boraks (Na₂B₄O₇) karıştırılır, desen üzerine yerleştirilir ve oksijen+asetilen alevli üfleme lambası ile 780°C civarında eritilir. Gümüş damlası iki teli birleştirir. Tek bir çiçek deseninde 40-60 lehim noktası olabilir.',
          en: 'A filigree master has three core movements: "bending" (curling the wire at a specific angle), "winding" (spiraling the wire around another wire) and "soldering" (joining two wires with a tiny silver bead).\n\nAll complex patterns are combinations and repetitions of these three. The master works 0.25 mm silver wire with tweezers and fine pliers. For soldering, silver powder is mixed with borax (Na₂B₄O₇), placed on the pattern and melted at ~780°C with an oxygen-acetylene blowtorch. A silver droplet bonds the wires. A single flower pattern may require 40–60 solder joints.',
          ar: 'ثلاث حركات: ثني، لفّ، لحام — منها تُصنع كل النقوش.',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Süryani Mirası', en: 'The Syriac Legacy', ar: 'الإرث السرياني' },
        body: {
          tr: 'Mardin\'in telkâri geleneği, 13. yüzyıldan bu yana bölgedeki Süryani Hıristiyan topluluklarına dayanır. Süryani ustalar tekniği kilise haçları, ikona çerçeveleri ve kadın takıları için kullanıyordu. Osmanlı döneminde Müslüman, Hristiyan ve Yahudi ustalar aynı atölyelerde çalıştı, tekniği birbirine aktardı. 20. yüzyılın göçleri sonrası Süryani nüfus Mardin\'de azaldı ama tekniği aktaran usta-çırak zinciri kırılmadı.\n\nBugün Mardin\'in dar sokaklarındaki atölyelerde Müslüman, Hristiyan ve Süryani ustalar hâlâ yan yana çalışır. Bu, Türkiye\'nin çok kültürlü zanaat geleneğinin hâlâ yaşayan bir örneğidir.',
          en: 'Mardin\'s filigree tradition goes back to Syriac Christian communities in the region from the 13th century. Syriac masters used the technique for church crosses, icon frames and women\'s jewelry. During the Ottoman period Muslim, Christian and Jewish masters worked side by side in the same workshops, passing the technique to each other. After 20th-century migrations the Syriac population in Mardin shrank — but the master-apprentice chain carrying the craft did not break.\n\nToday in the narrow streets of Mardin, Muslim, Christian and Syriac masters still work alongside each other. It\'s a living example of Turkey\'s multi-cultural craft heritage.',
          ar: 'الفن يعود لمجتمعات ماردين السريانية، ويستمر حتى اليوم بتنوع ثقافي.',
        },
      },
    ],
    storyThread: 'mardinli-telkari-ustasi-ayse',
    related: ['trabzon-hasiri', '925-ayar', 'gumus-bakimi'],
  },
];
