// Zanaat Salonu — Faz 2-B: 2 derinleştirildi + 3 yeni zanaat eklendi.

export default [
  /* ─────────────────────────────────────────────────────────
     Savat (Niello) — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'savat',
    cat: 'zanaat',
    emoji: '🖤',
    accent: '#935116',
    name: { tr: 'Savat (Niello)', en: 'Niello (Savat)', ar: 'سواد (نيلّو)' },
    intro: {
      tr: 'Gümüşün üzerine siyah desen: Siirt\'in bin yıllık sanatı.',
      en: 'Black pattern on silver: Siirt\'s thousand-year-old art.',
      ar: 'نقش أسود على الفضة: فن سيرت العتيق.',
    },
    body: {
      tr: 'Savat (uluslararası adıyla "niello"), gümüş veya altının üzerine özel bir siyah alaşım (gümüş + kurşun + bakır + kükürt) eritilip oyulmuş desenlerin içine doldurulmasıyla yapılır. Anadolu\'da en çok Siirt ile özdeşleşmiştir ve yüzlerce yıllık bir gelenektir. Bir ustanın bir tabakyı bitirmesi haftalar alır. Desenler genellikle geometrik, bitki motifli veya hat yazılıdır.',
      en: 'Niello (savat in Turkish) is made by melting a black alloy of silver, lead, copper and sulfur into engraved patterns on silver or gold. In Anatolia it\'s most associated with Siirt, with centuries of tradition. A master may take weeks to finish a single piece. Patterns are geometric, floral or calligraphic.',
      ar: 'السواد نقش أسود على الفضة، فن متأصل في سيرت.',
    },
    funFact: {
      tr: 'Savat desenlerinin siyahı sonsuza kadar kalır — çünkü bu boya değil, metalin içine kaynaşmış bir alaşımdır. 1000 yıllık savat eserleri bugün hâlâ ilk günkü gibi parlar.',
      en: 'Niello\'s black lasts forever — it\'s not paint, but an alloy fused into the metal. 1,000-year-old niello pieces still shine today.',
      ar: 'السواد لا يبهت لأنه سبيكة وليس طلاء.',
    },
    stats: {
      origin: 'Siirt',
      technique: 'Oyma + siyah alaşım dolgu',
      age: '1000+ yıl',
    },
    scienceBox: {
      formula: 'Ag₂S + Cu₂S + PbS (niello)',
      crystalSystem: 'Monoclinic (Ag₂S)',
      hardness: '2–2.5 (Mohs)',
      density: '~7.2 g/cm³',
      notes: {
        tr: 'Niello, %50 gümüş sülfür + %25 bakır sülfür + %25 kurşun sülfür karışımıdır. Oda sıcaklığında katı, 400°C\'de erir. Usta, oyulmuş deseni bor asitle temizler, niello tozunu üstüne serper, alevle ısıtır. Erimiş alaşım desenin çukurlarına akar. Soğuduğunda yüzey zımparalanıp cilalanır — çıkıntılar beyaz gümüş, çukurlar siyah niello olarak kalır.',
        en: 'Niello is 50% silver sulfide + 25% copper sulfide + 25% lead sulfide. Solid at room temperature, melting at 400°C. The master cleans the engraved pattern with boric acid, sprinkles niello powder over it, heats with a flame. The molten alloy flows into the hollows. Once cool, the surface is sanded and polished — raised parts remain bright silver, the hollows remain black niello.',
        ar: 'النيلّو خليط كبريتيدات الفضة والنحاس والرصاص، ينصهر عند 400°م.',
      },
    },
    timeline: [
      { year: '-1400',
        event: { tr: 'Mısır\'da altın üzerine ilk niello kullanımı — Tutankamon\'un hançer kınında.',
                 en: 'Earliest niello on gold in Egypt — Tutankhamun\'s dagger sheath.',
                 ar: 'نيلّو مصري قديم.' } },
      { year: '300',
        event: { tr: 'Bizans kilise eşyalarında niello standart teknik olur.',
                 en: 'Niello becomes standard on Byzantine church objects.',
                 ar: 'النيلّو في الكنائس البيزنطية.' } },
      { year: '900',
        event: { tr: 'Rus Kiev\'inde niello yaygınlaşır — tsarevich süs eşyaları.',
                 en: 'Kiev niello spreads across Russia — royal regalia.',
                 ar: 'انتشار النيلّو في كييف.' } },
      { year: '1500',
        event: { tr: 'Siirt ustaları Osmanlı saray için niello hançer, kemer, kılıç yapar.',
                 en: 'Siirt masters supply niello daggers, belts and swords to the Ottoman court.',
                 ar: 'صاغو سيرت للبلاط العثماني.' } },
      { year: '2008',
        event: { tr: 'Siirt Savatı Türkiye Coğrafi İşareti tescili alır.',
                 en: 'Siirt niello receives Turkish Geographical Indication.',
                 ar: 'تسجيل سواد سيرت 2008.' } },
    ],
    digDeeper: [
      {
        id: 'craft',
        icon: 'craft',
        title: { tr: 'Üretimin 5 Aşaması', en: 'The Five Production Stages', ar: 'خمس مراحل للإنتاج' },
        body: {
          tr: '1. Desen çizimi: Usta gümüş yüzeye ince bir çelik kalemle desen çizer — çoğunlukla geometrik veya çiçek motifleri.\n\n2. Oyma: Çizgiler kalın bir çelik burin ile derinleştirilir, 0,3-0,5 mm derinlik.\n\n3. Alaşım hazırlığı: Gümüş, bakır, kurşun ve toz kükürt belirli oranlarda karıştırılır, döküm potasında eritilir. Soğuduğunda ince toz haline getirilir.\n\n4. Uygulama: Oyulmuş yüzey bor asitle temizlenir, üstüne niello tozu serpilir, üfleme lambası ile ısıtılır. Toz erir, çukurlara akar.\n\n5. Son işlem: Taş bileme ve cilalama ile yüzey pürüzsüzleştirilir. Beyaz gümüş ve siyah niello arasındaki kontrast keskinleşir.',
          en: '1. Drawing: The master etches a design onto the silver surface with a fine steel stylus — usually geometric or floral.\n\n2. Engraving: A thick steel burin deepens the lines, 0.3–0.5 mm deep.\n\n3. Alloy preparation: Silver, copper, lead and sulfur powder are mixed in specific ratios, melted in a crucible. When cool, the alloy is ground to fine powder.\n\n4. Application: The engraved surface is cleaned with boric acid, niello powder is sprinkled over, a blowtorch is applied. The powder melts and flows into the recesses.\n\n5. Finishing: Stone-sanding and polishing smooth the surface. Contrast between white silver and black niello sharpens.',
          ar: 'خمس مراحل: الرسم، الحفر، تحضير السبيكة، التطبيق، الصقل.',
        },
      },
    ],
    related: ['telkari', 'trabzon-hasiri', 'kazaz'],
  },

  /* ─────────────────────────────────────────────────────────
     Kapalıçarşı — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'kapalicarsi',
    cat: 'zanaat',
    emoji: '🏛️',
    accent: '#cb4335',
    name: { tr: 'Kapalıçarşı', en: 'The Grand Bazaar', ar: 'البازار الكبير' },
    intro: {
      tr: 'Dünyanın en eski ve büyük alışveriş merkezi — 560 yıldır kuyumculuğun merkezi.',
      en: 'The world\'s oldest and largest covered market — 560 years as a jewelry capital.',
      ar: 'أقدم وأكبر سوق مغطى في العالم — 560 سنة كعاصمة للمجوهرات.',
    },
    body: {
      tr: 'İstanbul\'un kalbinde yer alan Kapalıçarşı, 1461\'de Fatih Sultan Mehmet tarafından yaptırılmıştır. 60\'tan fazla sokak, 4000\'den fazla dükkân ve altı kapı barındırır. Bu dükkânların önemli bir kısmı kuyumcudur — 3000\'den fazla kuyumcu vardır. Her gün 250.000 - 400.000 ziyaretçi gelir. Türk altın bilezik üretiminin büyük bölümü bu çarşıda yapılır ve buradan dünyaya dağıtılır.',
      en: 'At the heart of Istanbul, the Grand Bazaar was built in 1461 by Sultan Mehmed II. It contains 60+ streets, 4,000+ shops and six gates — including over 3,000 jewelers. 250,000–400,000 visitors pass through daily. Much of Turkish gold bracelet production happens here and ships worldwide.',
      ar: 'بُني البازار الكبير عام 1461 في اسطنبول، يضم أكثر من 3000 محل مجوهرات.',
    },
    funFact: {
      tr: 'Kapalıçarşı\'da her sabah tüm kuyumcular 8:30\'da altın fiyatını aynı anda öğrenmek için "Sarraflar Odası"na bakarlar. Altın fiyatı burada belirlenir ve günlük alışverişin temeli olur.',
      en: 'Each morning at 8:30 AM, all bazaar jewelers check the "Sarraflar Odası" for the day\'s gold price — where it\'s set and traded from.',
      ar: 'يُحدد سعر الذهب يومياً في "غرفة الصرافين" في البازار.',
    },
    stats: {
      built: '1461',
      shops: '4000+',
      jewelers: '3000+',
      visitors: '250-400 bin/gün',
    },
    timeline: [
      { year: '1455',
        event: { tr: 'Fatih "İç Bedesten"i inşa ettirir — Kapalıçarşı\'nın çekirdeği.',
                 en: 'Sultan Mehmed builds the "Iç Bedesten" — nucleus of the Grand Bazaar.',
                 ar: 'بناء البديستان الداخلي.' } },
      { year: '1461',
        event: { tr: 'İki bedesten birleştirilir, örtülü çarşı genişlemeye başlar.',
                 en: 'Two bedestens are joined; covered bazaar begins expanding.',
                 ar: 'دمج البديستين.' } },
      { year: '1894',
        event: { tr: 'Büyük İstanbul depremi çarşıyı ağır hasara uğratır.',
                 en: 'The Great Istanbul earthquake heavily damages the bazaar.',
                 ar: 'زلزال اسطنبول 1894.' } },
      { year: '1954',
        event: { tr: 'Büyük yangın çarşının önemli bir bölümünü yakar; restore edilir.',
                 en: 'A major fire burns much of the bazaar; it\'s restored.',
                 ar: 'حريق 1954.' } },
      { year: '2009',
        event: { tr: 'Kapalıçarşı ziyaretçi sayısı zirveye ulaşır — yıllık 91 milyon.',
                 en: 'Grand Bazaar annual visitors peak at 91 million.',
                 ar: '91 مليون زائر سنوياً.' } },
    ],
    digDeeper: [
      {
        id: 'history',
        icon: 'history',
        title: { tr: 'Bedestenlerin Hikâyesi', en: 'The Story of Bedestens', ar: 'قصة البدسستانات' },
        body: {
          tr: 'Kapalıçarşı aslında iki ayrı "bedesten"in etrafında büyümüştür. Bedesten, duvarları taş, çatısı kubbeli, en değerli malların satıldığı güvenli pazar binasıdır — banka öncesi dönemin hazinesi.\n\nİç Bedesten (1455) en eski kısımdır — 15 kubbeli, 44 dükkânlı. Burada altın, pırlanta, gümüş satılır. Osmanlı dönemi boyunca Müslüman, Ermeni, Rum ve Yahudi tüccarlar yan yana işlediler.\n\nSandal Bedesteni (1460) ipek kumaş için. 20 kubbeli. İpek ticaretinin merkeziydi, bugün bohça bohça atlas halılar sergileniyor.\n\nSarraflar Sokağı — iki bedestenin arasında — altın-döviz çevrim işlemlerinin yapıldığı yer. Bugün hâlâ fiyat referansı oradan alınır.',
          en: 'The Grand Bazaar grew around two separate "bedestens" — stone-walled, dome-roofed secure market buildings where the most valuable goods were sold. Pre-bank treasuries.\n\nInner Bedesten (1455) is the oldest part — 15 domes, 44 shops. Gold, diamonds, silver trade here. Throughout the Ottoman period Muslim, Armenian, Greek and Jewish merchants worked side by side.\n\nSandal Bedesten (1460) for silk fabric. 20 domes. It was the silk-trade hub; today bundles of atlas carpets are displayed.\n\nSarraflar Sokağı (Money-Changers\' Street) between the two bedestens — where gold-currency exchange happens. Price references still originate there.',
          ar: 'البازار نما حول بدستانين، والصرافة بينهما.',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Bir Kuyumcu Sokağı', en: 'A Jewelry Street', ar: 'شارع الصاغة' },
        body: {
          tr: 'Kapalıçarşı\'nın en kalabalık damarı Kalpakçılar Caddesi — iki yanı baştan sona vitrinlerden oluşur, tek bir 300 metrelik koridor binlerce yüzük, bilezik, kolye sergiler. Kuyumcular kategorilere göre gruplaşır: "Kuyumcular Kapısı" tarafı altın, "Mahmutpaşa" yönü gümüş, "Nuruosmaniye" tarafı taşlı takı.\n\nAtölyeler bazen dükkânın arkasındadır. Bir bilezik almak, onu sizin gözünüzün önünde üretmek anlamına gelebilir — 20-30 dakika bekleyişte usta sizin için bileziği tamamlar. Kapalıçarşı\'nın bu "siparişe göre üretim" kültürü 500 yıldır aynı ritimde sürüyor.',
          en: 'The Bazaar\'s busiest artery is Kalpakçılar Avenue — vitrines on both sides along a single 300-meter corridor displaying thousands of rings, bracelets, necklaces. Jewelers cluster by category: "Kuyumcular Gate" side for gold, "Mahmutpaşa" direction for silver, "Nuruosmaniye" side for gemstone jewelry.\n\nWorkshops are sometimes behind the shops. Buying a bracelet can mean watching it being made — a 20–30 minute wait while the master completes your piece. The Bazaar\'s "made-to-order" culture has run at this pace for 500 years.',
          ar: 'شارع كالباكشيلار هو عمود البازار الرئيسي.',
        },
      },
    ],
    related: ['bilezik', 'altin-tarihcesi', 'telkari'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Kazaz
     ───────────────────────────────────────────────────────── */
  {
    id: 'kazaz',
    cat: 'zanaat',
    emoji: '🧵',
    accent: '#7d6608',
    name: { tr: 'Kazaziye', en: 'Kazaz (Silk-Silver Braiding)', ar: 'كزّاز' },
    intro: {
      tr: 'Gümüş teli ipekle örmek — Trabzon\'un ikinci büyük zanaatı.',
      en: 'Weaving silver wire with silk — Trabzon\'s second great craft.',
      ar: 'ضفر الفضة مع الحرير — حرفة طرابزون الثانية الكبرى.',
    },
    body: {
      tr: 'Kazaziye, ince gümüş telin renkli ipek iplikle birlikte örülerek yapıldığı Trabzon kökenli el sanatıdır. Gümüş tel o kadar incedir ki (0,05-0,1 mm), ipekle örülünce kumaş gibi yumuşak ama metal parıltılı bir yüzey oluşur. Kolye, bileklik, zincir kemer gibi takılarda kullanılır. İpek çoğunlukla siyah veya lacivert tercih edilir — gümüş ışığı daha çok yakalasın diye. Bir ustanın bir günde sadece 5-10 cm örgü tamamlayabildiği bu sanat, Trabzon Ticaret Odası\'nın çabalarıyla ulusal düzeyde yaşatılmaya devam ediyor.',
      en: 'Kazaz is a Trabzon-origin craft weaving fine silver wire together with colored silk thread. The silver wire is so thin (0.05–0.1 mm) that when woven with silk it creates a fabric-soft yet metal-luminous surface. Used in necklaces, bracelets and belt chains. Silk is usually black or navy — to let the silver catch more light. A master produces just 5–10 cm of weave per day. The tradition is kept alive at the national level through the efforts of the Trabzon Chamber of Commerce and registered masters.',
      ar: 'فن طرابزوني يجمع السلك الفضي بالحرير.',
    },
    funFact: {
      tr: 'Kazaziye örgüsünde kullanılan gümüş tel, bir saç telinden daha incedir — insan saçı ~0,08 mm, kazaz teli 0,05-0,1 mm. Bu yüzden usta büyüteç altında çalışır.',
      en: 'The silver wire in kazaz is thinner than a human hair — hair is ~0.08 mm, kazaz wire 0.05–0.1 mm. Masters work under magnifiers.',
      ar: 'سلك الكزّاز أرفع من الشعرة البشرية.',
    },
    stats: {
      origin: 'Trabzon',
      wire: '0.05–0.1 mm',
      production: '5-10 cm/gün',
      recognition: 'Yaşayan Trabzon Zanaatı (ulusal)',
    },
    timeline: [
      { year: '1400',
        event: { tr: 'Trabzon Pontus kuyumcuları ipek-gümüş örgüyü geliştirir.',
                 en: 'Trabzon Pontic jewelers develop silk-silver braiding.',
                 ar: 'صاغو طرابزون يُطورون الكزّاز.' } },
      { year: '1700',
        event: { tr: 'Osmanlı saray giysilerinde kazaz sırma (tela) yaygın kullanılır.',
                 en: 'Kazaz braid becomes common in Ottoman court garments.',
                 ar: 'الكزّاز في البلاط العثماني.' } },
      { year: '1990',
        event: { tr: 'Usta sayısı 20\'ye düşer, gelenek tükenme sınırında.',
                 en: 'Master count drops to 20; tradition nears extinction.',
                 ar: 'تقلص عدد المعلمين.' } },
      { year: '2020',
        event: { tr: 'Trabzon Ticaret Odası kazaziye ustaları için destekli çıraklık programları başlatır.',
                 en: 'Trabzon Chamber of Commerce launches subsidized apprentice programs for kazaz masters.',
                 ar: 'برامج تدريب مدعومة لصانعي الكزّاز.' } },
    ],
    related: ['trabzon-hasiri', 'telkari', 'mine'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Mine (Enamel)
     ───────────────────────────────────────────────────────── */
  {
    id: 'mine',
    cat: 'zanaat',
    emoji: '🎨',
    accent: '#117a65',
    name: { tr: 'Mine Sanatı', en: 'Enamel Art', ar: 'فن المينا' },
    intro: {
      tr: 'Metalin üzerine cam eritmek — Bizans\'tan Fabergé\'ye.',
      en: 'Melting glass onto metal — from Byzantium to Fabergé.',
      ar: 'إذابة الزجاج على المعدن.',
    },
    body: {
      tr: 'Mine (uluslararası adıyla "enamel" veya "émail"), metal yüzeye çok ince cam tozunun yerleştirilip fırında (750-900°C) eritilerek renkli cam tabaka oluşturma sanatıdır. Metal ve cam birlikte soğuduğunda moleküler düzeyde birleşir — kopmaz, solmaz. Türkiye\'de İstanbul ve Eskişehir mine sanatının merkezidir. Teknikler: champlevé (oyulmuş yüzeye), cloisonné (ince tel bölmeli), plique-à-jour (arkası açık, vitray gibi), guilloché (desenli yüzeye şeffaf mine — Fabergé\'nin imzası). Türk mine sanatında özellikle Konstantinopol Sarayı kiliselerinin kullandığı Bizans minesi tarzı yaşıyor.',
      en: 'Enamel (mine in Turkish) is the art of fusing colored glass powder onto metal by firing at 750–900°C. As metal and glass cool together they bond at molecular level — won\'t chip, won\'t fade. In Turkey, Istanbul and Eskişehir are enamel centers. Techniques: champlevé (engraved recesses), cloisonné (wire cells), plique-à-jour (open-backed, stained-glass-like), guilloché (transparent enamel over patterned metal — Fabergé\'s signature). Turkish enamel work especially preserves the Byzantine style once used in Constantinople\'s palace chapels.',
      ar: 'المينا صهر الزجاج الملون على المعدن.',
    },
    funFact: {
      tr: 'Fabergé\'nin ünlü Rus İmparatorluk yumurtaları (50 adet) çoğunlukla guilloché mine ile yapılmıştır. Üstündeki transparan mine altındaki motor-turn oyulmuş deseni gösterir, ışığa tutunca örgü gibi dalgalanır. Bir yumurta bugün 30 milyon dolara kadar satılıyor.',
      en: 'Fabergé\'s Imperial Russian Easter eggs (50 total) are mostly guilloché enamel. Transparent enamel over engine-turned pattern creates a woven, shimmering effect. One egg sells for up to $30 million today.',
      ar: 'بيض فابرجي الشهير من صنع المينا.',
    },
    stats: {
      temperature: '750–900°C',
      techniques: '4 ana (champlevé, cloisonné, plique, guilloché)',
      origin: 'Bizans (5. yy)',
    },
    scienceBox: {
      formula: 'SiO₂ + Na₂O + PbO + metal oksitler (renk)',
      crystalSystem: 'Amorphous (cam)',
      hardness: '5–6 (Mohs)',
      density: '2.5–3 g/cm³',
      notes: {
        tr: 'Mine rengi metal oksitlerden gelir: kobalt (Co) mavi, bakır (Cu) yeşil-mavi, demir (Fe) kırmızı-kahverengi, manganez (Mn) mor, kadmiyum (Cd) sarı-kırmızı. Her renk için ayrı cam toz reçetesi vardır ve her biri farklı fırın sıcaklığı gerektirir — genelde sıcak renkler önce, soğuk renkler sonra fırınlanır.',
        en: 'Enamel color comes from metal oxides: cobalt (Co) blue, copper (Cu) green-blue, iron (Fe) red-brown, manganese (Mn) purple, cadmium (Cd) yellow-red. Each color has its own glass powder recipe and firing temperature — warm colors typically fired first, cool colors after.',
        ar: 'ألوان المينا من أكاسيد المعادن: الكوبالت أزرق، النحاس أخضر، الحديد أحمر.',
      },
    },
    timeline: [
      { year: '-1600',
        event: { tr: 'Mykenai\'da bilinen en eski cam-metal birleşimi.',
                 en: 'Earliest known glass-on-metal work at Mycenae.',
                 ar: 'أقدم مينا في ميسينا.' } },
      { year: '500',
        event: { tr: 'Bizans imparatorluğu cloisonné\'yi kilise sanatının standardı yapar.',
                 en: 'Byzantine Empire makes cloisonné standard in church art.',
                 ar: 'البيزنطيون يُعمّمون الكلوازونيه.' } },
      { year: '1885',
        event: { tr: 'Fabergé ilk İmparatorluk Paskalya Yumurtası\'nı yapar.',
                 en: 'Fabergé makes the first Imperial Easter Egg.',
                 ar: 'فابرجي وأول بيضة إمبراطورية.' } },
      { year: '1920',
        event: { tr: 'Art Deco akımı mineyi modern takıya getirir — Cartier, Van Cleef.',
                 en: 'Art Deco brings enamel into modern jewelry — Cartier, Van Cleef.',
                 ar: 'الآر ديكو والمينا.' } },
    ],
    related: ['savat', 'telkari', 'eskisehir-lutasi'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Eskişehir Lüle Taşı
     ───────────────────────────────────────────────────────── */
  {
    id: 'eskisehir-lutasi',
    cat: 'zanaat',
    emoji: '🪨',
    accent: '#a6acaf',
    name: { tr: 'Eskişehir Lüle Taşı', en: 'Eskişehir Meerschaum', ar: 'حجر لولا إسكي شهير' },
    intro: {
      tr: 'Yüzen taş, dünyada sadece Eskişehir\'de çıkar.',
      en: 'The floating stone — mined only in Eskişehir.',
      ar: 'الحجر الذي يطفو — يُستخرج فقط في إسكي شهير.',
    },
    body: {
      tr: 'Lüle taşı (bilimsel adı "sepiolit", uluslararası adı "meerschaum" — Almanca "deniz köpüğü") dünyada neredeyse sadece Eskişehir\'in Sepetçi ve Gökçeoğlu havzalarında ticari kalitede çıkan benzersiz bir mineraldir. Çıktığında yumuşak ve nemlidir — bir saat eline ne kadar yumuşakça baksan işleyebilirsin. Kuruduğunda taş sertliğinde olur. Kütlesi çok hafif (1-1,5 g/cm³) — suda yüzer! 19. yüzyıldan bu yana özellikle pipo yapımında ünlüdür: lüle taşı pipolar havadan filtre gibi çalışır, tütünün tadını tutar. Oyma figür, heykel, tesbih, ağızlık yapımında da kullanılır. Ham taş ihracı 1970\'lerde yasaklandı — Eskişehir\'in kendine özgü zanaatı korunsun diye.',
      en: 'Meerschaum (scientific name "sepiolite", Turkish "lüle taşı") is a unique mineral found at commercial quality almost only in Eskişehir\'s Sepetçi and Gökçeoğlu basins. When mined it\'s soft and moist — workable like soap under the hand. Once dry it becomes stone-hard. Extremely light (1–1.5 g/cm³) — it floats in water! Since the 19th century famous especially for pipe-making: meerschaum pipes filter smoke like a sponge and hold tobacco flavor. Also carved into figurines, sculptures, prayer beads and cigarette holders. Raw export was banned in the 1970s to protect Eskişehir\'s unique craft.',
      ar: 'حجر لولا يُستخرج فقط من إسكي شهير، يطفو على الماء ويُستخدم للغلايين.',
    },
    funFact: {
      tr: 'Yeni bir lüle taşı pipo beyaz-kremdir. Kullanıldıkça renk değiştirir: önce altın sarısı, sonra turuncu, yıllar içinde koyu kahverengiye kadar kızarır. Koleksiyonerler iyi "kızarmış" pipo için hatta ayrı fiyat öder — renk bir çeşit yaş işareti.',
      en: 'A new meerschaum pipe is white-cream. With use it changes color: first golden yellow, then orange, over years deepening to rich brown. Collectors pay more for well-"ripened" pipes — the color marks age like a tree ring.',
      ar: 'غليون لولا الجديد كريمي، يكتسب لوناً ذهبياً ثم بنياً مع السنين.',
    },
    stats: {
      formula: 'Mg₄Si₆O₁₅(OH)₂·6H₂O',
      density: '1.0–1.5 g/cm³ (yüzer)',
      hardness: '2–2.5 Mohs (yumuşak)',
      origin: 'Eskişehir (tek ticari kaynak)',
    },
    scienceBox: {
      formula: 'Mg₄Si₆O₁₅(OH)₂·6H₂O (sepiolit)',
      crystalSystem: 'Orthorhombic',
      hardness: '2–2.5 (Mohs)',
      refractiveIndex: '1.52',
      density: '1.0–1.5 g/cm³',
      notes: {
        tr: 'Lüle taşı aslında hidratlı magnezyum silikatıdır ve gözenekli yapısı nedeniyle çok hafiftir — gözenekler %80\'e kadar hacmi kaplar. Bu gözeneklilik pipolarda tütünün sıcaklığını ve buharlarını emer, dolayısıyla "yumuşatılmış" bir tütün tadı oluşturur. Kırmızıya döner çünkü tütün yağları tabakalanır.',
        en: 'Meerschaum is actually hydrated magnesium silicate, and its porous structure makes it extraordinarily light — pores can occupy up to 80% of the volume. This porosity in pipes absorbs tobacco heat and vapor, creating a "mellowed" smoke. It reddens because tobacco oils layer into the pores over time.',
        ar: 'سيليكات مغنيسيوم مسامية، والمسام تشكل 80% من الحجم.',
      },
    },
    timeline: [
      { year: '1700',
        event: { tr: 'Eskişehir\'in ilk lüle taşı madenleri açılır.',
                 en: 'First Eskişehir meerschaum mines open.',
                 ar: 'افتتاح أول منجم.' } },
      { year: '1800',
        event: { tr: 'Avusturya-Viyana Avrupa pipo üretiminin merkezi olur.',
                 en: 'Vienna becomes Europe\'s meerschaum pipe-making center.',
                 ar: 'فيينا مركز صناعة الغلايين.' } },
      { year: '1975',
        event: { tr: 'Türkiye ham lüle taşı ihracını yasaklar — zanaat yerel kalır.',
                 en: 'Turkey bans raw meerschaum export — craft stays local.',
                 ar: 'حظر تصدير الحجر الخام.' } },
      { year: '2023',
        event: { tr: 'Eskişehir Lüle Taşı Türkiye Coğrafi İşareti tescili.',
                 en: 'Eskişehir Meerschaum receives Turkish Geographical Indication.',
                 ar: 'تسجيل جغرافي 2023.' } },
    ],
    related: ['mine', 'savat', 'kapalicarsi'],
  },
];
