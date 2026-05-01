// Takı Atölyesi — Faz 2-B: 2 mevcut derinleştirme + 3 yeni takı türü.

export default [
  /* ─────────────────────────────────────────────────────────
     Yüzük — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'yuzuk',
    cat: 'taki',
    emoji: '💍',
    accent: '#8e44ad',
    name: { tr: 'Yüzük', en: 'Ring', ar: 'الخاتم' },
    intro: {
      tr: 'Bir daire — ama dünyanın en güçlü sembollerinden biri.',
      en: 'A simple circle — one of the world\'s most powerful symbols.',
      ar: 'دائرة بسيطة لكنها من أقوى الرموز في العالم.',
    },
    body: {
      tr: 'Yüzük, insanlığın en eski takılarından biridir ve M.Ö. 2500\'lerde Mezopotamya\'da kullanıldığı bilinmektedir. Nişan yüzüğü geleneği eski Mısır\'a dayanır — daire sonsuzluğu, boş orta ise "beraber yaşanacak kapıyı" simgeler. Sol elin yüzük parmağına takılmasının sebebi ise Mısırlıların "vena amoris" (aşk damarı) adını verdikleri, doğrudan kalbe gittiğini düşündükleri bir damardı (aslında yok ama efsane güzel!). Türk geleneğinde alyanslar genellikle sade, düğün yüzükleri ise taşlıdır.',
      en: 'The ring is one of humanity\'s oldest pieces of jewelry, used in Mesopotamia by 2500 BCE. The engagement ring tradition traces back to ancient Egypt — the circle symbolizes eternity, the empty center "the gateway to life together." The left ring finger was chosen because Egyptians believed a "vena amoris" (vein of love) ran from it to the heart — not actually true, but a lovely legend.',
      ar: 'الخاتم من أقدم المجوهرات، يرمز إلى الأبدية.',
    },
    funFact: {
      tr: 'Dünyanın bilinen en eski alyansı Mısır\'da bulundu ve 4500 yaşında. Altın telle örülmüş basit bir halkaydı — ama sembolizmi hâlâ aynı.',
      en: 'The oldest known wedding ring was found in Egypt and is 4,500 years old — a simple gold wire circle, but with the same symbolism we use today.',
      ar: 'أقدم خاتم زواج معروف من مصر وعمره 4500 سنة.',
    },
    stats: {
      oldest: '4500 yıl',
      types: 'Alyans, taşlı, tektaş, trilogy',
      materials: 'Altın, gümüş, platin, çelik',
    },
    timeline: [
      { year: '-2500',
        event: { tr: 'Mezopotamya\'da mühür yüzükleri — imzanın dedesi.',
                 en: 'Mesopotamian signet rings — the ancestor of signature.',
                 ar: 'خواتم الأختام في بلاد الرافدين.' } },
      { year: '-1300',
        event: { tr: 'Eski Mısır\'da ilk altın telli alyanslar — "vena amoris" efsanesi.',
                 en: 'Ancient Egypt\'s first gold wire wedding rings — "vena amoris" legend.',
                 ar: 'خواتم الزواج في مصر القديمة.' } },
      { year: '1477',
        event: { tr: 'Arşidük Maximilian tarihin ilk pırlanta nişan yüzüğünü Mary of Burgundy\'ye verir.',
                 en: 'Archduke Maximilian gives history\'s first diamond engagement ring to Mary of Burgundy.',
                 ar: 'أول خاتم خطوبة ماسي 1477.' } },
      { year: '1886',
        event: { tr: 'Tiffany & Co. "Tiffany Setting" — 6 tırnaklı havada pırlanta tasarımı.',
                 en: 'Tiffany & Co. launches the "Tiffany Setting" — diamond lifted on 6 prongs.',
                 ar: 'تصميم تيفاني الشهير 1886.' } },
      { year: '1947',
        event: { tr: 'De Beers\'in "A Diamond is Forever" kampanyası nişan yüzüğü piyasasını yaratır.',
                 en: 'De Beers\' "A Diamond is Forever" campaign creates the modern engagement ring market.',
                 ar: 'حملة دي بيرز 1947.' } },
    ],
    digDeeper: [
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Hangi Parmak, Neden?', en: 'Which Finger, Why?', ar: 'أي إصبع، ولماذا؟' },
        body: {
          tr: 'Batı geleneğinde nişan ve alyans sol elin dördüncü parmağına takılır — Mısır kaynaklı "vena amoris" efsanesinin mirası. Ama dünya çapında önemli farklar var:\n\nTürkiye, Almanya, Rusya, Yunanistan, Norveç: Sağ elin yüzük parmağı.\nHindistan: Geleneksel olarak sol el "kirli" sayılırdı, alyans sağ ele takılırdı; Batı etkisiyle değişiyor.\nÇin: Bazı kesimlerde orta parmak evlilik, işaret parmağı bekârlık için ayrılır.\nYahudi geleneği: Düğün sırasında yüzük önce sağ işaret parmağına takılır, sonra yüzük parmağına geçirilir.\n\nBaşparmak yüzükleri genellikle güç, serçe parmak yüzükleri (mühür yüzüğü) soy belirteciydi. Modern moda bunların çoğunu yumuşattı.',
          en: 'In Western tradition, engagement and wedding bands go on the left hand\'s fourth finger — the legacy of the Egyptian "vena amoris" myth. But worldwide there are major differences:\n\nTurkey, Germany, Russia, Greece, Norway: Right hand\'s ring finger.\nIndia: The left hand was traditionally "unclean" and rings went on the right; Western influence is shifting this.\nChina: In some regions middle finger signals marriage; index finger signals single.\nJewish tradition: During the ceremony the ring first goes on the right index finger, then moves to the ring finger.\n\nThumb rings historically signaled power; pinky (signet) rings indicated lineage. Modern fashion has loosened most of these.',
          ar: 'تختلف عادات إصبع الخاتم بين الثقافات.',
        },
      },
      {
        id: 'craft',
        icon: 'craft',
        title: { tr: 'Yüzük Ölçüsü Nasıl Alınır?', en: 'How Ring Sizing Works', ar: 'كيف يُقاس الخاتم' },
        body: {
          tr: 'Yüzük ölçüsü iç çevre ile belirlenir. Türkiye ve Avrupa\'da milimetre bazlı: bir 17 numara yüzük iç çapı 17 mm demek. ABD ise sayısal sistem kullanır (4-13 arası, yarım numaralarla). Japonya\'nın kendi sistemi var (1-27).\n\nParmak boyutu gün içinde %2-4 değişir — sabah en küçük, akşam en büyük. Sıcak havada daha şişkin, soğukta daha ince. Bu yüzden profesyonel kuyumcular ölçüyü gün ortasında alır ve parmak ne çok gevşek ne çok sıkı olacak şekilde ayarlar. Parmaktan çıkarken biraz direnç göstermeli — çıkmıyorsa çok sıkı, kolay kayıyorsa çok büyük.',
          en: 'Ring size is set by inner circumference. In Turkey and Europe it\'s millimeter-based: a size-17 ring has a 17 mm inner diameter. The US uses a numeric scale (4–13 with half sizes). Japan has its own (1–27).\n\nFinger size varies 2–4% during the day — smallest in the morning, largest in the evening. Swollen in heat, thinner in cold. That\'s why professional jewelers take measurements around midday and aim for a fit that\'s neither tight nor loose. The ring should resist slightly when slipping off — no resistance means too big; can\'t come off means too tight.',
          ar: 'مقاس الخاتم يتغير خلال اليوم — الجواهريون يقيسون في الظهر.',
        },
      },
    ],
    related: ['kolye', 'kupe', 'ayar-sistemi'],
  },

  /* ─────────────────────────────────────────────────────────
     Kolye — deepened
     ───────────────────────────────────────────────────────── */
  {
    id: 'kolye',
    cat: 'taki',
    emoji: '📿',
    accent: '#a569bd',
    name: { tr: 'Kolye', en: 'Necklace', ar: 'القلادة' },
    intro: {
      tr: 'Boyuna asılan hikâye — eski Mısır\'dan modern zamanlara.',
      en: 'A story worn around the neck — from ancient Egypt to today.',
      ar: 'قصة تُعلَّق على العنق.',
    },
    body: {
      tr: 'Kolye, boyuna takılan tüm takı türlerinin genel adıdır. Zincir, gerdanlık, madalyon, choker (boğazlı), lariat (uzun) gibi pek çok çeşidi vardır. Taşlı pırlanta tektaş kolyeler modern takı dünyasında en popüler hediye seçeneklerinden biridir. Türk kültüründe altın kolyeler, özellikle "reşat altını" takılı zincirler, düğünlerde geleneksel bir hediyedir.',
      en: 'Necklace is a general term for all neck-worn jewelry. Types include chain, choker, pendant, locket, lariat and collar. Solitaire diamond necklaces are among the most popular modern gift choices. In Turkish culture, gold chains with Resat coins are a traditional wedding gift.',
      ar: 'القلادة اسم عام لكل المجوهرات التي تُعلق على العنق.',
    },
    funFact: {
      tr: 'Dünyanın en pahalı kolyesi "A Heritage in Bloom" adlı Çin\'e ait bir eserdir — 200 milyon dolar değerinde ve 383,40 karat pırlanta içerir!',
      en: 'The world\'s most expensive necklace, "A Heritage in Bloom" from China, is worth $200 million and contains 383.40 carats of diamonds!',
      ar: 'أغلى قلادة في العالم قيمتها 200 مليون دولار.',
    },
    stats: {
      types: 'Zincir, choker, gerdanlık, lariat',
      lengths: 'Choker (35cm) → opera (90cm)',
      oldest: '~40.000 yıl (deniz kabuğu)',
    },
    timeline: [
      { year: '-40000',
        event: { tr: 'İsrail Skhul Mağarası\'nda delikli deniz kabuğu — bilinen en eski takı.',
                 en: 'Pierced seashells at Skhul Cave, Israel — earliest known jewelry.',
                 ar: 'أصداف مثقوبة من كهف سخول.' } },
      { year: '-2000',
        event: { tr: 'Mısır\'da "usekh" geniş yaka kolyeleri — firavunların imzası.',
                 en: 'Egyptian "usekh" broad-collar necklaces — pharaonic signature.',
                 ar: 'قلادة أوسخ المصرية.' } },
      { year: '1200',
        event: { tr: 'Bizans ve Avrupa\'da haç şeklinde kolyeler yaygınlaşır.',
                 en: 'Cross-shaped necklaces spread in Byzantium and Europe.',
                 ar: 'قلائد الصليب.' } },
      { year: '1920',
        event: { tr: 'Coco Chanel "sautoir" (uzun inci kolye) modasını başlatır.',
                 en: 'Coco Chanel popularizes the "sautoir" (long pearl necklace).',
                 ar: 'شانيل والسوتوار.' } },
    ],
    digDeeper: [
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Kolye Uzunluğu Sözlüğü', en: 'Necklace Length Dictionary', ar: 'معجم أطوال القلادة' },
        body: {
          tr: 'Profesyonel kuyumcular kolyeleri uzunluğuna göre sınıflandırır:\n\nCollar (30-33 cm): Boyuna sıkı oturur, genelde 3-4 sıra.\nChoker (35-40 cm): Boğaz altında oturur, tek sıra.\nPrincess (42-45 cm): En yaygın, köprücük kemiğinde oturur — tektaş kolyelerin standart uzunluğu.\nMatinee (50-60 cm): Göğüs üst kısmında, günlük takı.\nOpera (70-90 cm): Göğüs alt kısmında, resmi giyimle. Çift dolanırsa choker olur.\nSautoir / rope (100+ cm): Çok uzun, düğümleyerek veya çift takarak stillenir.\n\nBu uzunluklar elbise yaka şekline göre seçilir — v yaka princess ister, crew neck choker ister.',
          en: 'Professional jewelers classify necklaces by length:\n\nCollar (30–33 cm): Sits tight on the neck, often 3–4 strands.\nChoker (35–40 cm): Sits at the base of the throat, single strand.\nPrincess (42–45 cm): Most common, rests on the collarbone — the standard solitaire length.\nMatinee (50–60 cm): Upper chest, daily wear.\nOpera (70–90 cm): Lower chest, with formal wear. Doubled becomes a choker.\nSautoir / rope (100+ cm): Very long, styled knotted or doubled.\n\nNeckline decides length — V-neck calls for princess, crew neck calls for choker.',
          ar: 'أطوال القلادة تُختار حسب الرقبة.',
        },
      },
    ],
    related: ['yuzuk', 'kupe', 'brosh'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Küpe
     ───────────────────────────────────────────────────────── */
  {
    id: 'kupe',
    cat: 'taki',
    emoji: '👂',
    accent: '#be90d4',
    name: { tr: 'Küpe', en: 'Earring', ar: 'القرط' },
    intro: {
      tr: 'Kulak memesini 7000 yıldır süslüyoruz — ama neden başladık?',
      en: 'We\'ve decorated earlobes for 7,000 years — but why did it start?',
      ar: 'نُزين الأذن منذ 7000 سنة.',
    },
    body: {
      tr: 'Küpe, insanlığın en eski takı formlarından biridir. 5300 yıllık "Ötzi" buzul adamı mumyasında bile iki kulak deliği vardı. Antik Sümer, Mısır, Persia, Roma, Çin — hepsinde küpe yaygındı. Modern küpe türleri: saplama (stud), halka (hoop), sarkma (drop), avize (chandelier), klips (piercing gerektirmez), ear-jacket (arkaya destekli).\n\nTürk kültüründe küpe doğan kız bebeğe "kulak deldirmek" geleneğiyle başlar — çoğunlukla 40 gün ile bir yaş arasında yapılır. İlk küpeler genellikle 22 ayar altından, annenin veya büyükannenin hediyesidir.',
      en: 'Earrings are among humanity\'s oldest jewelry forms. Even the 5,300-year-old "Ötzi" glacier mummy had pierced ears. Ancient Sumer, Egypt, Persia, Rome, China — all wore earrings. Modern types: stud, hoop, drop, chandelier, clip-on (no piercing needed), ear jacket (rear-supported).\n\nIn Turkish culture, earrings begin with the tradition of piercing a baby girl\'s ears — usually between 40 days and one year old. The first earrings are typically 22-karat gold, a gift from mother or grandmother.',
      ar: 'القرط من أقدم المجوهرات، وثقب آذان الأطفال تقليد تركي.',
    },
    funFact: {
      tr: 'Denizci geleneğinde altın küpe takmak bir sigorta gibiydi: eğer denizci başı boş bir sahilde ölürse, küpedeki altın cenaze masrafını karşılardı. 19. yüzyıldan gelen bu gelenek modern denizcilikte hâlâ "altın küpe" deyimiyle yaşar.',
      en: 'Among sailors, gold earrings were a form of insurance: if the sailor died on a foreign shore, the gold funded a decent burial. This 19th-century tradition lives on in the phrase "gold earring sailor."',
      ar: 'البحارة يرتدون أقراطاً ذهبية لتغطية نفقات الدفن.',
    },
    stats: {
      oldest: '7000+ yıl',
      types: 'Stud, hoop, drop, chandelier, clip',
      piercing: '14-18 ayar altın önerilir',
    },
    timeline: [
      { year: '-5000',
        event: { tr: 'Batı Asya\'da en eski altın küpeler.',
                 en: 'Earliest gold earrings in Western Asia.',
                 ar: 'أقدم أقراط ذهبية.' } },
      { year: '-1500',
        event: { tr: 'Mısır\'da "ear spool" (kulak makara) modası — büyük disk şeklinde küpeler.',
                 en: 'Egyptian "ear spool" fashion — large disc earrings.',
                 ar: 'أقراط القرص المصرية.' } },
      { year: '1500',
        event: { tr: 'Rönesans Avrupa\'sında pırlanta saplama küpeler soyluluğun simgesi olur.',
                 en: 'Renaissance Europe: diamond studs symbolize nobility.',
                 ar: 'أقراط الماس في عصر النهضة.' } },
      { year: '1960',
        event: { tr: 'Modern "piercing gun" icat edilir, kulak delme yaygınlaşır.',
                 en: 'Modern "piercing gun" invented, ear piercing becomes mainstream.',
                 ar: 'اختراع مسدس الثقب.' } },
    ],
    digDeeper: [
      {
        id: 'culture',
        icon: 'culture',
        title: { tr: 'Kulak Delmenin Bilimi', en: 'The Science of Piercing', ar: 'علم ثقب الأذن' },
        body: {
          tr: 'Kulak memesinde (lobül) yağ dokusu vardır ama kıkırdak yoktur; bu yüzden iyileşme hızlı, 4-6 hafta. Helix (üst kıkırdak) kısmı iyileşmek 6-12 ay alır, çünkü kıkırdakta kan damarı az. İlk küpe için 14-18 ayar altın, cerrahi çelik veya titanyum önerilir — çünkü düşük kaliteli metalin içindeki nikel veya kurşun enfeksiyona ve alerji reaksiyonuna yol açabilir.\n\nTürkiye\'de "delme anne taşı" geleneği vardır — ilk küpeye genellikle doğumtaşı veya bebeğin ay-rengi taş yerleştirilir. Buna "ailenin ilk hediyesi" denir.',
          en: 'The earlobe has fat but no cartilage, so it heals fast — 4–6 weeks. The helix (upper cartilage) takes 6–12 months because cartilage has fewer blood vessels. First earrings should be 14–18-karat gold, surgical steel or titanium — nickel or lead in low-quality metal can cause infection and allergic reactions.\n\nIn Turkey there\'s a "birth stone" piercing tradition — the first earring often holds a birthstone or the baby\'s zodiac color. Called "the family\'s first gift."',
          ar: 'شحمة الأذن تُشفى في 4-6 أسابيع، أما الغضروف في 6-12 شهر.',
        },
      },
    ],
    related: ['yuzuk', 'kolye', 'brosh'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Broş
     ───────────────────────────────────────────────────────── */
  {
    id: 'brosh',
    cat: 'taki',
    emoji: '🎀',
    accent: '#c39bd3',
    name: { tr: 'Broş', en: 'Brooch', ar: 'البروش' },
    intro: {
      tr: 'Bir iğne, bir cümle — göğsüne taktığın hikâye.',
      en: 'A pin, a statement — a story you wear on your chest.',
      ar: 'دبوس بكلمة — قصة ترتديها.',
    },
    body: {
      tr: 'Broş, bir giyim eşyasının üzerine iğneyle tutturulan süs takısıdır. Kökeni M.Ö. 14. yüzyıla dayanan "fibula" denen Antik Roma pelerin iğnelerine uzanır — tamamen pratikti, toga\'yı tutmak için. Zamanla süs ağır bastı. Victoria dönemi "mourning broş"ları (yas broşu — içinde ölmüş sevilenin saçı veya portresi) 19. yüzyılda yaygındı. II. Dünya Savaşı sonrası Kraliçe II. Elizabeth\'in ünlü "Granny\'s Chips" broşunu (Cullinan III + IV) taktığı fotoğraflar broşu modaya geri getirdi. Madeleine Albright\'ın "broş diplomasisi" — belirli broşlar takarak BM toplantılarında politik mesaj vermek — bu takıyı siyasetle buluşturdu.',
      en: 'A brooch is an ornamental pin worn on clothing. Its origin traces back to the Roman "fibula" — pelerine pins from the 14th century BCE onwards, purely practical for holding togas. Decoration grew over time. Victorian "mourning brooches" (containing a lost loved one\'s hair or portrait) were common in the 19th century. Queen Elizabeth II famously wearing "Granny\'s Chips" (Cullinan III + IV) brought brooches back after WWII. Madeleine Albright\'s "brooch diplomacy" — signaling political messages at UN meetings via specific pins — connected this jewelry to statecraft.',
      ar: 'البروش دبوس زينة، أصله من الدبابيس الرومانية العملية.',
    },
    funFact: {
      tr: 'Madeleine Albright (eski ABD Dışişleri Bakanı) Rusya temsilcisiyle görüşmeden önce "yılan" broşu taktı — bunu "Rusya düşmanca hareket ediyor" sinyali olarak okudular. O gün toplantı çok farklı geçti. Albright\'ın 300+ broştan oluşan koleksiyonu şimdi Albright College\'da.',
      en: 'Madeleine Albright (former US Secretary of State) wore a snake brooch before meeting Russia\'s delegate — read as the signal "Russia is acting hostile." The meeting changed tone. Her 300+ brooch collection now resides at Albright College.',
      ar: 'ألبرايت استخدمت 300 بروش كرسائل دبلوماسية.',
    },
    stats: {
      oldest: '3400 yıl (fibula)',
      famous: 'Cullinan III+IV, Albright koleksiyonu',
      clasps: 'C-clasp, trombone, revolver, double-pin',
    },
    timeline: [
      { year: '-1400',
        event: { tr: 'Tunç Çağı Avrupa\'sında ilk "fibula" pelerin iğneleri.',
                 en: 'Bronze Age Europe\'s first "fibula" cloak pins.',
                 ar: 'دبابيس الفيبولا البرونزية.' } },
      { year: '300',
        event: { tr: 'Bizans dönemi süslü emaye broşları — imparatorluğun mührü.',
                 en: 'Byzantine enameled brooches — symbols of empire.',
                 ar: 'بروش بيزنطي بالمينا.' } },
      { year: '1870',
        event: { tr: 'Viktorya döneminin altın çağı — yas broşları, cameo broşlar.',
                 en: 'Victorian heyday — mourning brooches, cameo brooches.',
                 ar: 'عصر فيكتوريا الذهبي.' } },
      { year: '1925',
        event: { tr: 'Art Deco broşları geometrik, pırlanta ve onyx kombinasyonları.',
                 en: 'Art Deco brooches in geometric diamond-and-onyx compositions.',
                 ar: 'بروش آر ديكو.' } },
      { year: '1994',
        event: { tr: 'Madeleine Albright "broş diplomasisi" kavramını doğurur.',
                 en: 'Madeleine Albright originates "brooch diplomacy."',
                 ar: 'دبلوماسية ألبرايت.' } },
    ],
    related: ['kolye', 'tac', 'yuzuk'],
  },

  /* ─────────────────────────────────────────────────────────
     NEW — Taç (Diadem / Tiara)
     ───────────────────────────────────────────────────────── */
  {
    id: 'tac',
    cat: 'taki',
    emoji: '👑',
    accent: '#d7bde2',
    name: { tr: 'Taç / Diyadem', en: 'Crown / Diadem', ar: 'التاج' },
    intro: {
      tr: 'Hükümdarlığın en eski simgesi — bugün gelinler de takıyor.',
      en: 'Monarchy\'s oldest symbol — today also worn by brides.',
      ar: 'أقدم رموز الملوكية.',
    },
    body: {
      tr: 'Taç (Arapça "tāj" = başlık), diyadem ve tiara benzer ama farklı anlamlara gelir. "Taç" kapalı üst parçayla tam dairesel, hükümdarlığın resmi simgesi. "Diyadem" antik Yunan\'ın açık kumaş bandının metal halefi; daire değil, yarım ay. "Tiara" ise kadınlara özgü, yarım daire, sadece alın/saçtan destekli, Fransız Devrimi sonrası doğdu.\n\nDünyanın en ünlü tacı İngiliz Krallığı\'na ait Imperial State Crown — 2868 pırlanta, Cullinan II, St Edward\'ın Safiri, Siyah Prens Yakutu barındırır. Rus Çarlarının Nagel Oleg Tacı 1762\'den beri her taç giyme töreninde kullanılır. Modern bağlamda tiaralar gelin takısı olarak popüler; özellikle Kraliyet Düğünlerinde.',
      en: 'Crown (from Arabic "tāj" = headwear), diadem and tiara are similar but distinct. A "crown" is fully circular with a closed upper section — formal symbol of sovereignty. A "diadem" is the metal heir of ancient Greece\'s open fabric band; half-moon, not circular. A "tiara" is specifically feminine, semi-circular, resting on forehead or hair alone, originating after the French Revolution.\n\nThe world\'s most famous crown is Britain\'s Imperial State Crown — 2,868 diamonds, Cullinan II, St Edward\'s Sapphire, Black Prince\'s Ruby. Russia\'s Nagel Oleg Crown has been used at every coronation since 1762. In modern context tiaras are popular as bridal jewelry, especially at royal weddings.',
      ar: 'التاج والدياديم والتيارا ثلاثة أنواع تاريخية مختلفة.',
    },
    funFact: {
      tr: 'Kate Middleton\'ın 2011 kraliyet düğününde taktığı "Cartier Halo" tiarası 1936\'da Kral VI. George\'un Kraliçe Ana\'ya düğün hediyesiydi. 888 pırlanta içeren bu tiara kraliyet kasasında saklanır ve sadece özel günlerde kullanılır.',
      en: 'The "Cartier Halo" tiara Kate Middleton wore at her 2011 royal wedding was King George VI\'s 1936 wedding gift to the Queen Mother. Holding 888 diamonds, it\'s kept in the royal vault and brought out only for special occasions.',
      ar: 'تاج كيت ميدلتون هدية جورج السادس عام 1936.',
    },
    stats: {
      types: 'Crown, diadem, tiara',
      diamonds: '2868 (Imperial State)',
      famous: 'Cartier Halo, Nagel Oleg, Vladimir Tiara',
    },
    timeline: [
      { year: '-2500',
        event: { tr: 'Sümer kraliçesi Puabi\'nin mezarında altın yaprak diyadem.',
                 en: 'Sumerian Queen Puabi\'s tomb contains gold-leaf diadem.',
                 ar: 'دياديم الملكة بوابي السومرية.' } },
      { year: '-330',
        event: { tr: 'Büyük İskender Pers diadem geleneğini kabul eder.',
                 en: 'Alexander the Great adopts the Persian diadem.',
                 ar: 'الإسكندر يتبنى الدياديم الفارسي.' } },
      { year: '1661',
        event: { tr: 'İngiltere\'nin St. Edward Tacı — modern kraliyet tacı standardını belirler.',
                 en: 'England\'s St. Edward\'s Crown sets the modern royal crown standard.',
                 ar: 'تاج القديس إدوارد 1661.' } },
      { year: '1900',
        event: { tr: 'Cartier ve Fabergé tiara üretiminin altın çağını yaşatır.',
                 en: 'Cartier and Fabergé lead the golden age of tiara-making.',
                 ar: 'عصر كارتييه وفابرجي الذهبي.' } },
      { year: '2023',
        event: { tr: 'Kral III. Charles taç giyme töreni; St Edward tacı 70 yıl sonra yeniden kullanılır.',
                 en: 'King Charles III\'s coronation; St Edward\'s Crown used after 70 years.',
                 ar: 'تتويج تشارلز الثالث 2023.' } },
    ],
    digDeeper: [
      {
        id: 'famous',
        icon: 'famous',
        title: { tr: 'Rus Tiara Koleksiyonu', en: 'The Russian Tiara Collection', ar: 'مجموعة التيجان الروسية' },
        body: {
          tr: 'Rus İmparatorluk Koleksiyonu dünyanın en spektaküler tiara topluluğuydu. Vladimir Tiara — 1874, Alman yapımı, 15 iç içe halkada pırlanta ve sallanan incilerle. 1917 Devrimi\'nde bir İngiliz ajanı onu Londra\'ya kaçırdı; bugün Kraliyet Kolleksiyonunda II. Elizabeth ve sonrasında Kraliçe Camilla tarafından kullanılıyor.\n\nDiğer ünlü parçalar: Romanov Nuptial Tiara (1800), Saint Nicholas Sapphire Tiara (pantolonuna saklanarak kaçırıldı). Hermitage Müzesi Rusya\'da kalan 4 tiara\'yı sergiliyor. Geri kalanı devrim sonrası satılıp dünyaya dağıldı.',
          en: 'The Russian Imperial Collection was the world\'s most spectacular tiara trove. The Vladimir Tiara — 1874, German-made, 15 interlocking diamond rings with swinging pearls. A British agent smuggled it to London during the 1917 Revolution; today it resides in the Royal Collection, worn by Elizabeth II and later Queen Camilla.\n\nOther famous pieces: the Romanov Nuptial Tiara (1800), the Saint Nicholas Sapphire Tiara (smuggled in trousers). The Hermitage Museum displays the 4 tiaras remaining in Russia. The rest were sold after the revolution and dispersed worldwide.',
          ar: 'المجموعة الروسية تفرقت بعد ثورة 1917.',
        },
      },
    ],
    related: ['brosh', 'kolye', 'kupe'],
  },
];
