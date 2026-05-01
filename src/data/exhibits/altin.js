// Altın Salonu — Faz 2-A derinleştirme.
// Para standları (çeyrek/yarım/tam) sade kalır. Kavramsal olanlar
// (ayar-sistemi, bilezik, altin-tarihcesi) genişletildi.

export default [
  /* Çeyrek Altın — Faz 0 baseline */
  {
    id: 'ceyrek-altin',
    cat: 'altin',
    emoji: '🪙',
    accent: '#f1c40f',
    name: { tr: 'Çeyrek Altın', en: 'Quarter Gold Coin', ar: 'ربع ليرة ذهبية' },
    intro: {
      tr: 'Türkiye\'nin en tanıdık altın parası — düğünlerde, sünnetlerde, bayramlarda.',
      en: 'Turkey\'s most familiar gold coin — seen at weddings, circumcisions and holidays.',
      ar: 'أشهر قطعة ذهبية في تركيا، تُهدى في الأعراس والأعياد.',
    },
    body: {
      tr: 'Çeyrek altın, tam altının dörtte biri ağırlığındadır. 22 ayar altından basılır ve yaklaşık 1,75 gram gelir. Tarihsel olarak Osmanlı döneminden Cumhuriyet\'e geçişte bir altın standardı olarak kullanılmıştır. Bugün Türkiye\'de hediye geleneğinin simgesidir: yeni doğan bir bebeğe, yeni evlenen bir çifte ya da bir sünnet çocuğuna takılır.',
      en: 'A quarter gold coin weighs a quarter of a full gold coin — about 1.75 grams of 22-karat gold. It became standardized during the transition from the Ottoman Empire to the Turkish Republic. Today it\'s the symbol of gift-giving tradition, pinned to babies, newlyweds and children at circumcision ceremonies.',
      ar: 'يزن ربع الليرة الذهبية حوالي 1.75 غرام من ذهب عيار 22. تقليد شائع في تركيا لتقديمه كهدية في المناسبات.',
    },
    funFact: {
      tr: 'Bir çeyrek altın yaklaşık 2 parmak büyüklüğünde olmasına rağmen, içinde saf altın olarak 1,6 gramdan fazla altın bulunur.',
      en: 'A quarter coin is barely the size of two fingertips, yet contains over 1.6 grams of pure gold.',
      ar: 'بالرغم من حجمها الصغير، تحتوي على أكثر من 1.6 غرام من الذهب الخالص.',
    },
    stats: {
      weight: '1.75 g',
      purity: '22 ayar / 916‰',
      diameter: '18 mm',
    },
    related: ['tam-altin', 'yarim-altin', 'ayar-sistemi'],
  },

  /* Tam Altın */
  {
    id: 'tam-altin',
    cat: 'altin',
    emoji: '🏅',
    accent: '#e67e22',
    name: { tr: 'Tam Altın (Cumhuriyet)', en: 'Full Gold (Republic)', ar: 'ليرة ذهبية كاملة' },
    intro: {
      tr: 'Üzerinde Atatürk portresi bulunan, 7 gram ağırlığındaki geleneksel altın para.',
      en: 'The traditional 7-gram gold coin bearing Atatürk\'s portrait.',
      ar: 'قطعة ذهبية تقليدية تزن 7 غرامات وتحمل صورة أتاتورك.',
    },
    body: {
      tr: '1923\'te Cumhuriyet\'in kuruluşundan sonra Darphane tarafından basılmaya başlanmıştır. 22 ayar altından yapılır ve 7,2 gram ağırlığındadır. Düğünlerde damat omuzluğu olarak, özel günlerde ise birikim aracı olarak kullanılır. "Ata lira" da denir.',
      en: 'Minted by the Turkish state mint since the founding of the Republic in 1923. Made of 22-karat gold, weighing 7.2 grams. Worn as a groom\'s sash piece at weddings and kept as savings.',
      ar: 'تُسك منذ عام 1923 من ذهب عيار 22 وتزن 7.2 غرام.',
    },
    funFact: {
      tr: 'Türkiye\'de basılan tam altınlar, dünya pazarındaki diğer altın sikkelerden farklı olarak genellikle takı amaçlı kullanılır, yatırım değil.',
      en: 'Turkish full-gold coins are usually worn as jewelry, unlike other global gold coins which are mainly investment pieces.',
      ar: 'تستخدم في تركيا غالبًا كمجوهرات، لا كاستثمار فقط.',
    },
    stats: {
      weight: '7.2 g',
      purity: '22 ayar / 916‰',
      diameter: '28 mm',
    },
    related: ['ceyrek-altin', 'bilezik', 'altin-tarihcesi'],
  },

  /* Yarım Altın */
  {
    id: 'yarim-altin',
    cat: 'altin',
    emoji: '🟡',
    accent: '#f5b041',
    name: { tr: 'Yarım Altın', en: 'Half Gold Coin', ar: 'نصف ليرة ذهبية' },
    intro: {
      tr: 'Tam altının yarısı — orta boy, düğünlerin favorisi.',
      en: 'Half the weight of a full gold — mid-size, a wedding favorite.',
      ar: 'يزن نصف الليرة الكاملة، المفضل في الأعراس.',
    },
    body: {
      tr: 'Yarım altın, tam altının yarısı ağırlığındadır: yaklaşık 3,6 gram, 22 ayar. Çeyrekle tam altın arasında köprü kurar ve düğünlerde en çok tercih edilen hediye türlerinden biridir.',
      en: 'Weighs about 3.6 grams of 22-karat gold — the middle option between a quarter and a full coin, and among the most popular wedding gifts.',
      ar: 'يزن حوالي 3.6 غرام من ذهب عيار 22.',
    },
    funFact: {
      tr: 'Bir yarım altın, yaklaşık 2 çeyrek altın değerindedir ama biraz daha pahalıdır — çünkü basım maliyeti her sikke için ayrıca eklenir.',
      en: 'A half gold is worth about 2 quarters, but slightly more expensive — minting cost is added per coin.',
      ar: 'يساوي تقريبًا قطعتي ربع ذهب ولكنه أغلى قليلاً بسبب تكلفة السك.',
    },
    stats: {
      weight: '3.6 g',
      purity: '22 ayar / 916‰',
      diameter: '22 mm',
    },
    related: ['ceyrek-altin', 'tam-altin'],
  },

  /* ─────────────────────────────────────────────────────────
     Altın Bilezik — deepened with timeline + digDeeper
     ───────────────────────────────────────────────────────── */
  {
    id: 'bilezik',
    cat: 'altin',
    emoji: '🟨',
    accent: '#d4a017',
    name: { tr: 'Altın Bilezik', en: 'Gold Bracelet', ar: 'سوار ذهبي' },
    intro: {
      tr: 'Anadolu\'nun en sevilen takısı — kalın, süslü, zarif.',
      en: 'Anatolia\'s most beloved piece of jewelry — bold, ornate, elegant.',
      ar: 'أشهر مجوهرات الأناضول.',
    },
    body: {
      tr: 'Türk kuyumculuk geleneğinde bilezik, bir kadının en değerli takılarından biridir. 22 ayar altından üretilir ve genellikle 15–25 gram ağırlığındadır. Düz bilezik, burma bilezik, hasır bilezik ve Ajda bilezik gibi pek çok çeşidi vardır. Her biri farklı bir örgü veya desene sahiptir.',
      en: 'In Turkish jewelry tradition, bracelets are among a woman\'s most valued possessions. Typically 22-karat and 15–25 grams. Many varieties: plain, twisted, chain-weave and Ajda. Each has its own pattern and construction.',
      ar: 'من أهم مجوهرات المرأة في التقاليد التركية، من ذهب عيار 22.',
    },
    funFact: {
      tr: 'Türkiye\'nin dünya altın bilezik pazarında büyük payı vardır — İstanbul Kapalıçarşı, yüzyıllardır bilezik üretiminin merkezidir.',
      en: 'Turkey holds a major share of the global gold bracelet market — Istanbul\'s Grand Bazaar has been the center for centuries.',
      ar: 'لتركيا حصة كبيرة في سوق الأساور الذهبية العالمي.',
    },
    stats: {
      weight: '15–25 g (tipik)',
      purity: '22 ayar',
      variants: '8+ farklı örgü',
    },
    timeline: [
      { year: '-900',
        event: { tr: 'Urartu kuyumcuları Doğu Anadolu\'da altın bileklik işler.',
                 en: 'Urartu goldsmiths craft bracelets in Eastern Anatolia.',
                 ar: 'صاغو أورارتو يصنعون الأساور الذهبية.' } },
      { year: '1600',
        event: { tr: 'Osmanlı saray kuyumcuları telkâri ve hasır bilezik üretir.',
                 en: 'Ottoman court goldsmiths produce filigree and chain-weave bracelets.',
                 ar: 'صاغو البلاط العثماني يصنعون التلكاري.' } },
      { year: '1968',
        event: { tr: 'Ajda Pekkan\'ın bileğindeki ince burma bilezik moda olur — "Ajda bilezik" adını alır.',
                 en: 'Ajda Pekkan\'s twisted wrist stack sparks the "Ajda bracelet" craze.',
                 ar: 'أساور أجدا تُصبح موضة في السبعينات.' } },
      { year: '2020',
        event: { tr: 'Türkiye dünya altın bilezik üretiminin büyük bölümünü Kapalıçarşı eliyle yapar.',
                 en: 'Turkey produces a major share of global gold bracelets from the Grand Bazaar.',
                 ar: 'تركيا من أكبر منتجي الأساور.' } },
    ],
    digDeeper: [
      {
        id: 'craft',
        icon: 'craft',
        title: { tr: 'Örgü Çeşitleri', en: 'Weave Varieties', ar: 'أنواع الضفائر' },
        body: {
          tr: 'Burma bilezik: iki ya da dört altın tel birbirine döndürülerek helezon oluşturulur. En yaygın ve dayanıklı çeşittir.\n\nHasır bilezik: çok ince tellerin elle dokunmasıyla esnek bir kumaş gibi örgü oluşturur — Trabzon hasırı en ünlüsü.\n\nAjda bilezik: 1970\'lerin ince, birbirine yaslanmış burma bilezik destesi. Birer santim kalınlığında, kolda üst üste taşınır.\n\nKelepçe bilezik: açık uçlu, katı, bilek etrafını yarım daire gibi saran kalın biçim. Genelde süslü desen kabartmalı.\n\nTaş bilezik: düz bir şeritin üzerine bir yuvaya oturtulmuş değerli taş. Modern düğün takısında yaygın.',
          en: 'Burma (twisted): two or four gold wires spiraled together. Most common and durable.\n\nHasır (chain-weave): very fine wires hand-woven into a flexible fabric — Trabzon hasır is the most famous.\n\nAjda: 1970s-era stack of thin twisted bangles, worn together — one above the other up the wrist.\n\nKelepçe (cuff): open-ended, rigid, half-moon shape hugging the wrist. Usually embossed with patterns.\n\nTaş (stone-set): flat band with a gem socket. Common in modern wedding jewelry.',
          ar: 'البورما، الحصير، أجدا، الكلبجة، والمرصع — كل نوع بأسلوبه.',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Düğün ve Çeyiz Geleneği', en: 'Wedding and Dowry Tradition', ar: 'تقليد العرس والمهر' },
        body: {
          tr: 'Türk düğün geleneğinde bilezik sadece takı değil, ekonomik güvencedir. Gelinin kayınvalidesinden, annesinden, akrabalarından aldığı bilezikler birlikte "çeyiz" oluşturur. 22 ayar tercih edilmesinin sebebi saflık değeri yüksek olduğu için piyasada kolay satılabilmesidir — zor günlerde bozdurulabilecek bir rezerv. Bu yüzden Türk kadınlarının bileklerindeki altınlar, ülke tasarruf rezervinin önemli bir kısmını oluşturur: ekonomik kriz dönemlerinde bu "yastık altı" altınlar devletin döviz rezervinden daha büyük olabilir.',
          en: 'In Turkish wedding tradition, bracelets are more than jewelry — they\'re economic security. Those a bride receives from her mother-in-law, mother and relatives together form her "çeyiz" (dowry). 22-karat is preferred because of its high purity: easy to sell, a hedge for hard times. That\'s why gold on Turkish wrists represents a significant piece of the country\'s savings: in economic crises, household gold can exceed state foreign-currency reserves.',
          ar: 'السوار الذهبي في التقليد التركي ضمان اقتصادي وليس مجرد زينة.',
        },
      },
    ],
    related: ['ayar-sistemi', 'trabzon-hasiri', 'telkari', 'altin-tarihcesi'],
  },

  /* ─────────────────────────────────────────────────────────
     Ayar Sistemi — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'ayar-sistemi',
    cat: 'altin',
    emoji: '📏',
    accent: '#b9770e',
    name: { tr: 'Ayar Sistemi (14/18/22/24)', en: 'Karat System', ar: 'نظام العيار' },
    intro: {
      tr: 'Ayar, altının saflığını ölçer. 24 ayar = %100 altın.',
      en: 'Karat measures gold purity. 24 karat = 100% gold.',
      ar: 'العيار يقيس نقاء الذهب. 24 عيار = ذهب خالص 100٪.',
    },
    body: {
      tr: 'Ayar sistemi, altının içindeki saf altın oranını 24 birim üzerinden ölçer. 14 ayar altın %58,3 saf altın, 18 ayar %75, 22 ayar %91,6, 24 ayar ise %99,9 saf altındır. Saf altın çok yumuşak olduğu için takılarda kullanılmaz — bu yüzden bakır, gümüş veya çinko ile karıştırılır. Bu karışıma "alaşım" denir.',
      en: 'The karat system measures pure gold content out of 24 parts. 14k = 58.3% pure, 18k = 75%, 22k = 91.6%, 24k = 99.9%. Pure gold is too soft to wear, so it\'s alloyed with copper, silver or zinc.',
      ar: 'يقيس نظام العيار نسبة الذهب النقي من أصل 24 جزءاً.',
    },
    funFact: {
      tr: 'Her ülkenin tercih ettiği ayar farklıdır. Türkiye ve Orta Doğu\'da 22 ayar, Avrupa\'da 18 ayar, Amerika\'da 14 ayar yaygındır. Çin ve Hindistan ise 24 ayarı bile sever.',
      en: 'Preferred karats vary by country. Turkey and the Middle East prefer 22k, Europe 18k, the US 14k, while China and India even favor 24k.',
      ar: 'تختلف الأعيرة المفضلة حسب البلد.',
    },
    stats: {
      '24 ayar': '99.9% saf',
      '22 ayar': '91.6% saf',
      '18 ayar': '75.0% saf',
      '14 ayar': '58.3% saf',
    },
    scienceBox: {
      formula: 'Au (+ Cu/Ag/Zn/Pd alaşımı)',
      crystalSystem: 'Cubic (FCC)',
      hardness: '2.5–3 (Mohs, saf); 3–4 (18k)',
      density: '19.32 g/cm³ (saf); 15.6 g/cm³ (18k)',
      notes: {
        tr: 'Altın simgesi Au, Latince "aurum" (parlayan şafak) kelimesinden gelir. Saf altın o kadar yumuşaktır ki tırnakla bile çizilebilir. Bu yüzden yüzük ve bilezik için saf altın bir işe yaramaz — alaşım gerekir. Bakır eklenirse alaşım kırmızımsı (rose gold), gümüş eklenirse açık sarı, paladyum eklenirse beyaz altın olur. Renk saflıktan değil, karıştırılan metalden gelir.',
          en: 'Gold\'s symbol Au comes from Latin "aurum" (glowing dawn). Pure gold is so soft you can scratch it with your fingernail. That\'s why rings and bracelets can\'t be made from pure gold — alloy is required. Adding copper makes the alloy reddish (rose gold), silver lightens it to pale yellow, palladium makes it white gold. Color comes from the alloy metal, not purity.',
          ar: 'الذهب النقي طري جداً. اللون من المعدن المخلوط لا من النقاء.',
      },
    },
    timeline: [
      { year: '-2500',
        event: { tr: 'Mısırlı kuyumcular altını bakırla karıştırarak sertleştirmeyi keşfeder.',
                 en: 'Egyptian goldsmiths discover hardening gold by alloying with copper.',
                 ar: 'المصريون يكتشفون خلط الذهب بالنحاس.' } },
      { year: '1300',
        event: { tr: 'Fransa kuyumcu loncaları "poinçon" denetim damgalarını yerleştirir.',
                 en: 'French goldsmith guilds introduce "poinçon" hallmark stamps.',
                 ar: 'النقابات الفرنسية تُدخل أختام الضمان.' } },
      { year: '1906',
        event: { tr: 'Birleşik Krallık Hallmarking Yasası ile resmi ayar denetimi başlar.',
                 en: 'UK Hallmarking Act formalises karat verification.',
                 ar: 'قانون الضمان في بريطانيا.' } },
      { year: '1984',
        event: { tr: 'Türkiye\'de yeni Ayar Damgası Yönetmeliği yürürlüğe girer.',
                 en: 'Turkey enforces new karat-stamping regulation.',
                 ar: 'تركيا تُلزم ختم العيار عام 1984.' } },
    ],
    digDeeper: [
      {
        id: 'chemistry',
        icon: 'chemistry',
        title: { tr: 'Alaşımın Renk Kimyası', en: 'The Color Chemistry of Alloys', ar: 'كيمياء ألوان السبائك' },
        body: {
          tr: 'Altın alaşımlarında her ek metal kendi rengini ekler: Bakır (Cu) sıcak pembe-kırmızı tonlar verir — "rose gold". Gümüş (Ag) altın sarısını daha soluk, soğuk bir tona çeker. Paladyum (Pd) veya nikel (Ni) altını beyaza çevirir (beyaz altın). Çinko (Zn) kırılganlığı azaltır, işlenebilirlik artırır.\n\n18 ayar sarı altın tipik olarak: 75% Au + 12,5% Cu + 12,5% Ag. 18 ayar rose gold: 75% Au + 22,5% Cu + 2,5% Ag. Her kuyumcu kendi "reçetesine" sahiptir ve bu reçete o yüzüğün rengini belirler.',
          en: 'Each added metal adds its color: Copper (Cu) warms toward pink-red — rose gold. Silver (Ag) cools the tone to pale yellow. Palladium (Pd) or nickel (Ni) turn gold white. Zinc (Zn) reduces brittleness, improves workability.\n\nA typical 18k yellow gold is: 75% Au + 12.5% Cu + 12.5% Ag. 18k rose gold: 75% Au + 22.5% Cu + 2.5% Ag. Every goldsmith has a "recipe" that determines the final color.',
          ar: 'النحاس يُعطي ذهباً وردياً، الفضة أصفر فاتح، البلاديوم أبيض.',
        },
      },
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Ülkeden Ülkeye Neden Farklı?', en: 'Why Different Countries Prefer Different Karats', ar: 'لماذا تختلف الأعيرة' },
        body: {
          tr: 'Bölge tercihleri tesadüf değildir — hem kültürel hem ekonomik. Orta Doğu ve Hindistan: 22-24 ayar. Bunun iki sebebi var: görsel olarak altının o "sıcak sarı" hali görünsün diye ve takı aynı zamanda bir yatırım/çeyiz olduğundan saflık önemli. Avrupa: 18 ayar ağırlıklı. Daha sert alaşım günlük takı için uygun, renk daha zarif, işçilik daha ince çalışılabilir. ABD: 14 ayar. Dayanıklılık + fiyat öncelikli, yüzük günlük takılabilir. Çin: 24 ayar ("pure gold") özellikle geleneksel düğün takısında tercih edilir — saflık sembolik öneme sahiptir.',
          en: 'Regional preferences aren\'t accidents — they\'re cultural and economic. Middle East and India: 22–24k. Two reasons: visually for that "warm yellow" richness, and because the jewelry doubles as investment/dowry so purity matters. Europe: mostly 18k. Harder alloy for daily wear, more refined color, finer workability. USA: 14k. Durability + price first; rings worn daily. China: 24k ("pure gold") is favored for traditional wedding jewelry — purity carries symbolic weight.',
          ar: 'كل منطقة تُفضل عيارها لأسباب ثقافية واقتصادية.',
        },
      },
    ],
    interactive: 'karat',
    related: ['ceyrek-altin', 'bilezik', 'altin-tarihcesi'],
  },

  /* ─────────────────────────────────────────────────────────
     Altının Tarihçesi — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'altin-tarihcesi',
    cat: 'altin',
    emoji: '📜',
    accent: '#a04000',
    name: { tr: 'Altının Tarihçesi', en: 'A Brief History of Gold', ar: 'تاريخ الذهب' },
    intro: {
      tr: '6000 yıldır insanlar altını peşinde — nedenini öğrenelim.',
      en: 'Humans have chased gold for 6,000 years — let\'s find out why.',
      ar: 'منذ 6000 سنة والإنسان يلاحق الذهب.',
    },
    body: {
      tr: 'Altın, insanlık tarafından bilinen en eski metallerden biridir. İlk altın takılar M.Ö. 4000 civarında Varna\'da (bugünkü Bulgaristan) bulunmuştur. Mısırlılar altını "tanrıların eti" olarak görmüş, Tutankhamun\'un maskesi tamamen altından yapılmıştır. Anadolu\'da Lidyalılar M.Ö. 600 civarında ilk altın sikkeleri basmışlardır — bugünkü Uşak\'ın Eşme ilçesi yakınlarında.',
      en: 'Gold is one of the oldest metals known to humanity. The earliest gold jewelry was found in Varna (modern Bulgaria), c. 4000 BCE. Egyptians called it "the flesh of the gods" — Tutankhamun\'s mask is pure gold. In Anatolia, the Lydians minted the first gold coins around 600 BCE near modern-day Uşak.',
      ar: 'الذهب من أقدم المعادن. سك الليديون أول عملات ذهبية في الأناضول قرابة 600 قبل الميلاد.',
    },
    funFact: {
      tr: 'İnsanlık tarihi boyunca çıkarılan tüm altın, kenarı 22 metre olan bir kübün içine sığar! Dünya\'daki altının çoğu hâlâ yerkabuğunda duruyor.',
      en: 'All the gold ever mined in human history would fit inside a cube only 22 meters on each side!',
      ar: 'كل الذهب المستخرج في التاريخ يتسع في مكعب طول ضلعه 22 متراً!',
    },
    stats: {
      'İlk takı': 'M.Ö. 4000',
      'İlk sikke': 'M.Ö. ~600 (Lidya)',
      'Toplam çıkarılan': '~210.000 ton',
    },
    timeline: [
      { year: '-4000',
        event: { tr: 'Varna (Bulgaristan) nekropolünde bilinen en eski altın takılar.',
                 en: 'Oldest known gold jewelry at Varna necropolis, Bulgaria.',
                 ar: 'أقدم مجوهرات في فارنا.' } },
      { year: '-1325',
        event: { tr: 'Tutankhamun\'un ölüm maskesi 11 kg saf altından yapılır.',
                 en: 'Tutankhamun\'s death mask cast from 11 kg of pure gold.',
                 ar: 'قناع توت عنخ آمون 11 كغ ذهب.' } },
      { year: '-600',
        event: { tr: 'Lidyalılar Anadolu\'da ilk altın-gümüş (elektron) sikkeleri basar.',
                 en: 'Lydians mint the first gold-silver (electrum) coins in Anatolia.',
                 ar: 'الليديون يسكون أول عملة عام 600 ق.م.' } },
      { year: '1849',
        event: { tr: 'California altına hücum — 300.000 kişi Batı\'ya göç eder.',
                 en: 'California Gold Rush — 300,000 migrate west.',
                 ar: 'حمى الذهب في كاليفورنيا 1849.' } },
      { year: '1971',
        event: { tr: 'ABD altın standardını terk eder; dolar altına bağlı olmaktan çıkar.',
                 en: 'US abandons gold standard; dollar no longer pegged to gold.',
                 ar: 'الولايات المتحدة تترك معيار الذهب.' } },
      { year: '2024',
        event: { tr: 'Altın ons fiyatı ilk kez $2,500\'ı aşar.',
                 en: 'Gold price crosses $2,500 per ounce for the first time.',
                 ar: 'الذهب يتجاوز 2500 دولار للأونصة.' } },
    ],
    digDeeper: [
      {
        id: 'history',
        icon: 'history',
        title: { tr: 'Lidya ve Paranın İcadı', en: 'Lydia and the Invention of Money', ar: 'ليديا واختراع النقود' },
        body: {
          tr: 'Anadolu\'nun Lidya Krallığı\'nda, M.Ö. 600 civarında Kral Alyattes döneminde insanlık tarihinin ilk standart metal para birimi basıldı. Kullanılan alaşım, Sart ırmağının (Gediz) suyundan çıkarılan doğal "elektron" — altınla gümüşün karışımı. Her sikkenin ağırlığı aynıydı, üzerinde aslan başı mührü vardı. Bu, o ana kadar mal-karşılığı ticareti yapan dünyayı sonsuza kadar değiştirdi: bir krallığın arkasında durduğu, her yere taşınabilen, aynı değere sahip bir para.\n\nAlyattes\'in oğlu Kroisos (Karun) saf altın ve saf gümüş sikkeleri ayrı ayrı basmaya başladı — "bimetallic" sistem. "Karun kadar zengin" deyimi buradan gelir.',
          en: 'In Anatolia\'s Kingdom of Lydia, around 600 BCE under King Alyattes, the first standardized metal coinage in human history was struck. The alloy was natural "electrum" — a mix of gold and silver panned from the Pactolus (Sart) River. Each coin weighed the same, stamped with a lion\'s head. This transformed a barter-based world forever: a portable, state-backed, uniform-value currency.\n\nAlyattes\' son Croesus began striking pure gold and pure silver coins separately — a "bimetallic" system. The phrase "rich as Croesus" comes from him.',
          ar: 'سك الليديون أول عملة معيارية من الإلكتروم — خليط الذهب والفضة.',
        },
      },
      {
        id: 'science',
        icon: 'science',
        title: { tr: 'Altın Neden Değerli?', en: 'Why Gold?', ar: 'لماذا الذهب؟' },
        body: {
          tr: 'İnsanlığın 6000 yıldır altına bu kadar takılı olmasının nedeni hem kimya hem ekonomi. Kimyasal açıdan altın "asil metal"dir: oksijenle reaksiyona girmez (yani paslanmaz, kararmaz), suda çözünmez, asitlerin çoğuna dayanır. Bu yüzden Mısır firavunlarının 3000 yıllık altın maskesi bugün hâlâ pırıl pırıl.\n\nEkonomik açıdan: az bulunur ama yok değildir. Demir kadar çok olsaydı değersiz olurdu; platin kadar az bulunsaydı o kadar yaygın kullanılamazdı. Dayanıklı, bölünebilir, taşınabilir, kimyasal olarak değişmez — para için "mükemmel" bir madde. Modern ekonomide artık resmi para standardı olmasa bile merkez bankaları hâlâ rezerv altın tutar.',
          en: 'Why has humanity fixated on gold for 6,000 years? Both chemistry and economics. Chemically, gold is a "noble metal": it doesn\'t react with oxygen (so it doesn\'t rust or tarnish), doesn\'t dissolve in water, resists most acids. That\'s why Egyptian pharaohs\' 3,000-year-old gold masks still gleam today.\n\nEconomically: rare but not absent. If it were as common as iron, it would be worthless; as rare as platinum, too scarce for widespread use. Durable, divisible, portable, chemically unchanging — a "perfect" material for money. Even though no currency is pegged to gold today, central banks still hold gold reserves.',
          ar: 'الذهب لا يصدأ ولا يتفاعل، لذا بقي مظهره آلاف السنين.',
        },
      },
    ],
    storyThread: 'altin-nugget-yolculugu',
    related: ['ayar-sistemi', 'bilezik', 'tam-altin'],
  },
];
