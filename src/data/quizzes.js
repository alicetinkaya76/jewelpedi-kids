// Quiz soru bankası.
// Kategoriler: altin, gumus, pirlanta, renkli-taslar, platin, taki, zanaat, karisik
// difficulty: 1 = Çırak, 2 = Kalfa, 3 = Usta

export const quizzes = [
  // --- ALTIN ---
  {
    q: { tr: 'Kaç ayar altın en saf olanıdır?', en: 'Which karat is the purest gold?', ar: 'أي عيار هو الأنقى؟' },
    opts: [
      { tr: '14 ayar', en: '14 karat', ar: 'عيار 14' },
      { tr: '18 ayar', en: '18 karat', ar: 'عيار 18' },
      { tr: '22 ayar', en: '22 karat', ar: 'عيار 22' },
      { tr: '24 ayar', en: '24 karat', ar: 'عيار 24' },
    ],
    answer: 3,
    cat: 'altin',
    difficulty: 1,
    explanation: {
      tr: '24 ayar %99,9 saf altındır. Diğer ayarlar alaşımla karıştırılmış altınlardır.',
      en: '24 karat is 99.9% pure gold. Lower karats are alloyed.',
      ar: 'عيار 24 هو 99.9٪ ذهب خالص.',
    },
  },
  {
    q: { tr: 'Çeyrek altın kaç gram ağırlığındadır?', en: 'How much does a quarter gold coin weigh?', ar: 'كم يزن ربع الليرة؟' },
    opts: [
      { tr: '0.5 g', en: '0.5 g', ar: '0.5 غ' },
      { tr: '1.75 g', en: '1.75 g', ar: '1.75 غ' },
      { tr: '3.5 g', en: '3.5 g', ar: '3.5 غ' },
      { tr: '7.2 g', en: '7.2 g', ar: '7.2 غ' },
    ],
    answer: 1,
    cat: 'altin',
    difficulty: 1,
    explanation: {
      tr: 'Çeyrek altın 1,75 gramdır. Yarım altın 3,6 g, tam altın 7,2 g\'dır.',
      en: 'A quarter weighs 1.75 g; half is 3.6 g, and full is 7.2 g.',
      ar: 'ربع الليرة 1.75 غرام.',
    },
  },
  {
    q: { tr: 'Lidyalıların ilk altın sikkeleri bastığı yer neresi?', en: 'Where did Lydians mint the first gold coins?', ar: 'أين سكّ الليديون أول عملات ذهبية؟' },
    opts: [
      { tr: 'Mısır', en: 'Egypt', ar: 'مصر' },
      { tr: 'Anadolu (Uşak)', en: 'Anatolia (Uşak)', ar: 'الأناضول' },
      { tr: 'Mezopotamya', en: 'Mesopotamia', ar: 'بلاد الرافدين' },
      { tr: 'Yunanistan', en: 'Greece', ar: 'اليونان' },
    ],
    answer: 1,
    cat: 'altin',
    difficulty: 2,
    explanation: {
      tr: 'M.Ö. 600 civarı, bugünkü Uşak yakınlarında Lidyalılar ilk altın sikkeleri basmışlardır.',
      en: 'Around 600 BCE near modern-day Uşak in Anatolia.',
      ar: 'حوالي 600 قبل الميلاد قرب أوشاك في الأناضول.',
    },
  },
  {
    q: { tr: '18 ayar altın yüzde kaç saf altındır?', en: 'What is the purity of 18-karat gold?', ar: 'ما نقاء عيار 18؟' },
    opts: [
      { tr: '%58.3', en: '58.3%', ar: '58.3٪' },
      { tr: '%75.0', en: '75.0%', ar: '75.0٪' },
      { tr: '%91.6', en: '91.6%', ar: '91.6٪' },
      { tr: '%99.9', en: '99.9%', ar: '99.9٪' },
    ],
    answer: 1,
    cat: 'altin',
    difficulty: 2,
    explanation: {
      tr: '18/24 = 0,75, yani 18 ayar %75 saf altındır. Kalan %25 alaşımdır.',
      en: '18 ÷ 24 = 0.75, so 18k is 75% gold, 25% alloy.',
      ar: '18/24 = 75٪ ذهب.',
    },
  },

  // --- GUMUS ---
  {
    q: { tr: '925 ayar gümüş yüzde kaç saf gümüştür?', en: 'How pure is sterling (925) silver?', ar: 'ما نقاء فضة 925؟' },
    opts: [
      { tr: '%75', en: '75%', ar: '75٪' },
      { tr: '%80', en: '80%', ar: '80٪' },
      { tr: '%92.5', en: '92.5%', ar: '92.5٪' },
      { tr: '%99.9', en: '99.9%', ar: '99.9٪' },
    ],
    answer: 2,
    cat: 'gumus',
    difficulty: 1,
    explanation: {
      tr: '925 ayar %92,5 saf gümüş + %7,5 bakır içerir.',
      en: '925 silver is 92.5% pure, alloyed with 7.5% copper.',
      ar: '92.5٪ فضة و7.5٪ نحاس.',
    },
  },
  {
    q: { tr: 'Gümüşün kararmasına neden olan element nedir?', en: 'Which element causes silver to tarnish?', ar: 'ما العنصر الذي يُسبب أكسدة الفضة؟' },
    opts: [
      { tr: 'Oksijen (O)', en: 'Oxygen (O)', ar: 'الأكسجين' },
      { tr: 'Kükürt (S)', en: 'Sulfur (S)', ar: 'الكبريت' },
      { tr: 'Karbon (C)', en: 'Carbon (C)', ar: 'الكربون' },
      { tr: 'Azot (N)', en: 'Nitrogen (N)', ar: 'النيتروجين' },
    ],
    answer: 1,
    cat: 'gumus',
    difficulty: 2,
    explanation: {
      tr: 'Gümüş havadaki kükürtle birleşip Ag₂S (gümüş sülfür) oluşturur — bu siyah tabaka oluşur.',
      en: 'Silver reacts with airborne sulfur to form Ag₂S (silver sulfide) — the dark tarnish.',
      ar: 'تتفاعل الفضة مع الكبريت مكوّنة كبريتيد الفضة.',
    },
  },
  {
    q: { tr: 'Trabzon hasırı hangi şehirle özdeşleşmiştir?', en: 'Which city is Trabzon hasır associated with?', ar: 'بأي مدينة يرتبط حصير طرابزون؟' },
    opts: [
      { tr: 'Mardin', en: 'Mardin', ar: 'ماردين' },
      { tr: 'Trabzon', en: 'Trabzon', ar: 'طرابزون' },
      { tr: 'Siirt', en: 'Siirt', ar: 'سيرت' },
      { tr: 'İstanbul', en: 'Istanbul', ar: 'اسطنبول' },
    ],
    answer: 1,
    cat: 'gumus',
    difficulty: 1,
    explanation: {
      tr: 'Adından da anlaşılacağı gibi, Trabzon hasırı Trabzon\'dan geliyor ve 500+ yıllık bir gelenek.',
      en: 'The name says it — Trabzon hasır comes from Trabzon, a 500+ year tradition.',
      ar: 'من اسمه، حصير طرابزون من مدينة طرابزون.',
    },
  },

  // --- PIRLANTA ---
  {
    q: { tr: '4C\'de hangisi YOKTUR?', en: 'Which is NOT one of the 4 Cs?', ar: 'ما ليس من 4C؟' },
    opts: [
      { tr: 'Carat', en: 'Carat', ar: 'Carat' },
      { tr: 'Color', en: 'Color', ar: 'Color' },
      { tr: 'Clarity', en: 'Clarity', ar: 'Clarity' },
      { tr: 'Crystal', en: 'Crystal', ar: 'Crystal' },
    ],
    answer: 3,
    cat: 'pirlanta',
    difficulty: 1,
    explanation: {
      tr: '4C = Carat (ağırlık), Color (renk), Clarity (berraklık), Cut (kesim). "Crystal" listede değildir.',
      en: '4Cs = Carat, Color, Clarity, Cut. "Crystal" is not one of them.',
      ar: 'الأربعة C: الكارات واللون والنقاء والقطع.',
    },
  },
  {
    q: { tr: '1 karat kaç gramdır?', en: 'How many grams is 1 carat?', ar: 'كم غراماً القيراط الواحد؟' },
    opts: [
      { tr: '0.1 g', en: '0.1 g', ar: '0.1 غ' },
      { tr: '0.2 g', en: '0.2 g', ar: '0.2 غ' },
      { tr: '0.5 g', en: '0.5 g', ar: '0.5 غ' },
      { tr: '1 g', en: '1 g', ar: '1 غ' },
    ],
    answer: 1,
    cat: 'pirlanta',
    difficulty: 2,
    explanation: {
      tr: '1 karat = 0,2 gram = 200 miligram. Bu ölçü eskiden keçiboynuzu çekirdeği ağırlığına dayanırdı.',
      en: '1 carat = 0.2 g = 200 mg. Originally based on a carob seed\'s weight.',
      ar: 'القيراط 0.2 غرام، ومصدره بذور الخروب تاريخياً.',
    },
  },
  {
    q: { tr: 'Pırlanta yaklaşık kaç derece sıcaklıkta oluşur?', en: 'At what temperature do diamonds form?', ar: 'عند أي درجة حرارة يتكون الماس؟' },
    opts: [
      { tr: '100–500°C', en: '100–500°C', ar: '100-500' },
      { tr: '500–900°C', en: '500–900°C', ar: '500-900' },
      { tr: '1000–1300°C', en: '1000–1300°C', ar: '1000-1300' },
      { tr: '2500°C+', en: '2500°C+', ar: '2500+' },
    ],
    answer: 2,
    cat: 'pirlanta',
    difficulty: 3,
    explanation: {
      tr: 'Pırlanta 1000–1300°C sıcaklıkta, yaklaşık 150 km derinlikte, yüksek basınç altında oluşur.',
      en: 'Diamonds form at 1000–1300°C under extreme pressure at ~150 km depth.',
      ar: 'يتكون الماس في 1000-1300 درجة على عمق 150 كم.',
    },
  },
  {
    q: { tr: 'Laboratuvar pırlantası ile doğal pırlantanın kimyasal yapısı nasıldır?', en: 'Are lab and natural diamonds chemically different?', ar: 'هل يختلف ماس المختبر كيميائياً عن الطبيعي؟' },
    opts: [
      { tr: 'Tamamen farklı', en: 'Completely different', ar: 'مختلفان تماماً' },
      { tr: 'Aynı — her ikisi de saf karbon', en: 'Same — both pure carbon', ar: 'متطابقان — كلاهما كربون نقي' },
      { tr: 'Laboratuvarda silikon kullanılır', en: 'Lab uses silicon', ar: 'المختبر يستخدم السيليكون' },
      { tr: 'Doğal olanı camdır', en: 'Natural ones are glass', ar: 'الطبيعي زجاج' },
    ],
    answer: 1,
    cat: 'pirlanta',
    difficulty: 2,
    explanation: {
      tr: 'Her ikisi de saf karbonun aynı kristal yapısıdır. Kimyasal olarak özdeşler — fark sadece oluşum sürecinde.',
      en: 'Both are identical crystalline forms of pure carbon. Chemically identical — only the formation process differs.',
      ar: 'كلاهما كربون نقي بنفس البنية البلورية.',
    },
  },

  // --- RENKLI TASLAR ---
  {
    q: { tr: 'Mohs skalasında en sert doğal taş hangisidir?', en: 'Which is the hardest natural stone on Mohs scale?', ar: 'أي حجر الأصلب على مقياس موس؟' },
    opts: [
      { tr: 'Yakut', en: 'Ruby', ar: 'الياقوت' },
      { tr: 'Safir', en: 'Sapphire', ar: 'الصفير' },
      { tr: 'Zümrüt', en: 'Emerald', ar: 'الزمرد' },
      { tr: 'Elmas', en: 'Diamond', ar: 'الماس' },
    ],
    answer: 3,
    cat: 'renkli-taslar',
    difficulty: 1,
    explanation: {
      tr: 'Elmas (pırlanta) Mohs 10 ile skalanın en tepesinde ve doğadaki en sert maddedir.',
      en: 'Diamond is Mohs 10 — the hardest natural material.',
      ar: 'الماس صلابته 10 على مقياس موس.',
    },
  },
  {
    q: { tr: 'Zümrüt hangi mineral ailesinden gelir?', en: 'Which mineral family does emerald belong to?', ar: 'من أي عائلة معدنية الزمرد؟' },
    opts: [
      { tr: 'Korund', en: 'Corundum', ar: 'كوروند' },
      { tr: 'Beril', en: 'Beryl', ar: 'بيريل' },
      { tr: 'Kuvars', en: 'Quartz', ar: 'كوارتز' },
      { tr: 'Feldspat', en: 'Feldspar', ar: 'فلسبار' },
    ],
    answer: 1,
    cat: 'renkli-taslar',
    difficulty: 2,
    explanation: {
      tr: 'Zümrüt, beril ailesindendir. Rengini kromdan alır.',
      en: 'Emerald is a beryl — it gets its green color from chromium.',
      ar: 'الزمرد من عائلة البيريل.',
    },
  },
  {
    q: { tr: 'Yakut ve safir hangi mineralin renk farklılıklarıdır?', en: 'Ruby and sapphire are varieties of which mineral?', ar: 'الياقوت والصفير أشكال من أي معدن؟' },
    opts: [
      { tr: 'Kuvars', en: 'Quartz', ar: 'كوارتز' },
      { tr: 'Korund (Al₂O₃)', en: 'Corundum (Al₂O₃)', ar: 'كوروند' },
      { tr: 'Beril', en: 'Beryl', ar: 'بيريل' },
      { tr: 'Topaz', en: 'Topaz', ar: 'توباز' },
    ],
    answer: 1,
    cat: 'renkli-taslar',
    difficulty: 2,
    explanation: {
      tr: 'Her ikisi de korunddur (alüminyum oksit). Kırmızı olana yakut, diğer renklere safir denir.',
      en: 'Both are corundum (aluminum oxide). Red corundum = ruby; all other colors = sapphire.',
      ar: 'كلاهما كوروند، الأحمر ياقوت والباقي صفير.',
    },
  },
  {
    q: { tr: 'Tırnağının Mohs sertliği yaklaşık kaçtır?', en: 'What is the Mohs hardness of your fingernail?', ar: 'ما صلابة الظفر على مقياس موس؟' },
    opts: [
      { tr: '1', en: '1', ar: '1' },
      { tr: '2.5', en: '2.5', ar: '2.5' },
      { tr: '5', en: '5', ar: '5' },
      { tr: '7', en: '7', ar: '7' },
    ],
    answer: 1,
    cat: 'renkli-taslar',
    difficulty: 2,
    explanation: {
      tr: 'Tırnağın yaklaşık 2,5 sertliktedir — bu yüzden jips (2) ve talk (1) tırnakla çizilebilir.',
      en: 'Your nail is ~2.5, so gypsum (2) and talc (1) are scratchable with it.',
      ar: 'الظفر حوالي 2.5، لذا يخدش التلك والجبس.',
    },
  },

  // --- PLATIN ---
  {
    q: { tr: 'Platin altından kaç kat daha nadirdir?', en: 'How much rarer is platinum than gold?', ar: 'كم يزيد ندرة البلاتين عن الذهب؟' },
    opts: [
      { tr: '2 kat', en: '2×', ar: '2' },
      { tr: '10 kat', en: '10×', ar: '10' },
      { tr: '30 kat', en: '30×', ar: '30' },
      { tr: '100 kat', en: '100×', ar: '100' },
    ],
    answer: 2,
    cat: 'platin',
    difficulty: 2,
    explanation: {
      tr: 'Platin altından yaklaşık 30 kat daha nadirdir. Bu yüzden fiyatı da genellikle daha yüksektir.',
      en: 'Platinum is about 30× rarer than gold, which is why it\'s usually more expensive.',
      ar: 'البلاتين أندر من الذهب بـ30 مرة.',
    },
  },
  {
    q: { tr: 'Platinin kimyasal simgesi nedir?', en: 'What is platinum\'s chemical symbol?', ar: 'ما الرمز الكيميائي للبلاتين؟' },
    opts: [
      { tr: 'Pl', en: 'Pl', ar: 'Pl' },
      { tr: 'Pt', en: 'Pt', ar: 'Pt' },
      { tr: 'Pn', en: 'Pn', ar: 'Pn' },
      { tr: 'Po', en: 'Po', ar: 'Po' },
    ],
    answer: 1,
    cat: 'platin',
    difficulty: 1,
    explanation: {
      tr: 'Platinin simgesi Pt\'dir. İspanyolca "platina" (küçük gümüş) kelimesinden gelir.',
      en: 'Platinum\'s symbol is Pt, from the Spanish "platina" (little silver).',
      ar: 'رمز البلاتين Pt.',
    },
  },

  // --- TAKI ---
  {
    q: { tr: 'Bilinen en eski alyans kaç yaşındadır?', en: 'How old is the oldest known wedding ring?', ar: 'ما عمر أقدم خاتم زواج؟' },
    opts: [
      { tr: '500 yıl', en: '500 years', ar: '500' },
      { tr: '1500 yıl', en: '1500 years', ar: '1500' },
      { tr: '4500 yıl', en: '4500 years', ar: '4500' },
      { tr: '10.000 yıl', en: '10,000 years', ar: '10000' },
    ],
    answer: 2,
    cat: 'taki',
    difficulty: 2,
    explanation: {
      tr: 'Mısır\'da bulunan 4500 yıllık bir altın halka alyans olarak kullanılmıştır.',
      en: 'A 4,500-year-old gold circle from Egypt served as a wedding ring.',
      ar: 'أقدم خاتم زواج من مصر عمره 4500 سنة.',
    },
  },
  {
    q: { tr: 'Yüzük parmağı geleneksel olarak neden sol elin yüzük parmağıdır?', en: 'Why is the left ring finger traditionally used?', ar: 'لماذا خنصر اليد اليسرى للخاتم؟' },
    opts: [
      { tr: 'Pratik olduğu için', en: 'Because it\'s practical', ar: 'لأنه عملي' },
      { tr: 'Kralın emri olduğu için', en: 'By royal decree', ar: 'بأمر ملكي' },
      { tr: 'Mısır\'da "aşk damarı" inancı', en: 'Egyptian "vein of love" belief', ar: 'عرق الحب عند المصريين' },
      { tr: 'Başka sebep yok', en: 'No reason', ar: 'بلا سبب' },
    ],
    answer: 2,
    cat: 'taki',
    difficulty: 3,
    explanation: {
      tr: 'Eski Mısırlılar "vena amoris" (aşk damarı) adlı bir damarın buradan kalbe gittiğine inanıyordu. Aslında böyle bir damar yok, ama efsane kaldı.',
      en: 'Ancient Egyptians believed the "vena amoris" vein ran from that finger to the heart. No such vein exists, but the tradition stuck.',
      ar: 'اعتقد المصريون بوجود "عرق الحب" من هذا الإصبع إلى القلب.',
    },
  },

  // --- ZANAAT ---
  {
    q: { tr: 'Telkâri hangi şehrin ünlü zanaatıdır?', en: 'Which city is famous for filigree (telkari)?', ar: 'أي مدينة تشتهر بالتلكاري؟' },
    opts: [
      { tr: 'İstanbul', en: 'Istanbul', ar: 'اسطنبول' },
      { tr: 'Trabzon', en: 'Trabzon', ar: 'طرابزون' },
      { tr: 'Mardin', en: 'Mardin', ar: 'ماردين' },
      { tr: 'Siirt', en: 'Siirt', ar: 'سيرت' },
    ],
    answer: 2,
    cat: 'zanaat',
    difficulty: 1,
    explanation: {
      tr: 'Telkâri, Mardin\'de yüzyıllardır süregelen bir sanat. Kökeni Mezopotamya\'ya uzanır.',
      en: 'Filigree is a centuries-old craft in Mardin, with Mesopotamian roots.',
      ar: 'التلكاري فن ماردين العريق.',
    },
  },
  {
    q: { tr: 'Savat sanatı nerede yapılır?', en: 'Where is niello (savat) craft practiced?', ar: 'أين تُمارس حرفة السواد؟' },
    opts: [
      { tr: 'İzmir', en: 'Izmir', ar: 'إزمير' },
      { tr: 'Siirt', en: 'Siirt', ar: 'سيرت' },
      { tr: 'Ankara', en: 'Ankara', ar: 'أنقرة' },
      { tr: 'Antalya', en: 'Antalya', ar: 'أنطاليا' },
    ],
    answer: 1,
    cat: 'zanaat',
    difficulty: 1,
    explanation: {
      tr: 'Savat (niello) sanatı Siirt ile özdeşleşmiştir ve 1000 yıllık bir gelenektir.',
      en: 'Niello (savat) is associated with Siirt and is a 1,000-year-old tradition.',
      ar: 'السواد حرفة مرتبطة بسيرت منذ 1000 عام.',
    },
  },
  {
    q: { tr: 'Kapalıçarşı hangi yıl yaptırılmıştır?', en: 'When was the Grand Bazaar built?', ar: 'متى بُني البازار الكبير؟' },
    opts: [
      { tr: '1461', en: '1461', ar: '1461' },
      { tr: '1523', en: '1523', ar: '1523' },
      { tr: '1601', en: '1601', ar: '1601' },
      { tr: '1800', en: '1800', ar: '1800' },
    ],
    answer: 0,
    cat: 'zanaat',
    difficulty: 3,
    explanation: {
      tr: 'Kapalıçarşı 1461\'de Fatih Sultan Mehmet tarafından yaptırılmıştır.',
      en: 'The Grand Bazaar was built in 1461 by Sultan Mehmed II.',
      ar: 'بُني البازار الكبير عام 1461.',
    },
  },

  /* Faz 2-B — yeni sorular (25 ek) */

  // ALTIN +3
  {
    q: { tr: 'İlk altın sikkeler nerede basıldı?', en: 'Where were the first gold coins minted?', ar: 'أين سُكت أول عملات ذهبية؟' },
    opts: [
      { tr: 'Mısır', en: 'Egypt', ar: 'مصر' },
      { tr: 'Roma', en: 'Rome', ar: 'روما' },
      { tr: 'Lidya (Anadolu)', en: 'Lydia (Anatolia)', ar: 'ليديا' },
      { tr: 'Yunanistan', en: 'Greece', ar: 'اليونان' },
    ],
    answer: 2, cat: 'altin', difficulty: 2,
    explanation: {
      tr: 'Lidyalılar M.Ö. 600 civarında bugünkü Uşak yakınlarında ilk standart altın-gümüş (elektron) sikkeleri bastılar.',
      en: 'The Lydians minted the first standardized gold-silver (electrum) coins around 600 BCE near modern Uşak.',
      ar: 'سك الليديون أول عملة عام 600 ق.م.',
    },
  },
  {
    q: { tr: '18 ayar rose gold\'un pembe rengi hangi metalden gelir?', en: 'Which metal gives 18k rose gold its pink color?', ar: 'أي معدن يُعطي الذهب الوردي لونه؟' },
    opts: [
      { tr: 'Gümüş', en: 'Silver', ar: 'الفضة' },
      { tr: 'Bakır', en: 'Copper', ar: 'النحاس' },
      { tr: 'Nikel', en: 'Nickel', ar: 'النيكل' },
      { tr: 'Paladyum', en: 'Palladium', ar: 'البلاديوم' },
    ],
    answer: 1, cat: 'altin', difficulty: 2,
    explanation: {
      tr: 'Pembe-kırmızı ton bakırdan gelir. 18k rose gold tipik olarak 75% Au + 22.5% Cu + 2.5% Ag içerir.',
      en: 'The pink-red tone comes from copper. 18k rose gold is typically 75% Au + 22.5% Cu + 2.5% Ag.',
      ar: 'اللون الوردي من النحاس.',
    },
  },
  {
    q: { tr: 'Saf altın Mohs sertlik skalasında kaçtır?', en: 'How hard is pure gold on the Mohs scale?', ar: 'ما صلابة الذهب على مقياس موس؟' },
    opts: [
      { tr: '2.5–3 (çok yumuşak)', en: '2.5–3 (very soft)', ar: '2.5-3 (طري)' },
      { tr: '5 (orta)', en: '5 (medium)', ar: '5' },
      { tr: '7 (sert)', en: '7 (hard)', ar: '7' },
      { tr: '9 (çok sert)', en: '9 (very hard)', ar: '9' },
    ],
    answer: 0, cat: 'altin', difficulty: 2,
    explanation: {
      tr: 'Saf altın 2.5–3 Mohs sertliğindedir — tırnakla bile çizilebilir. Bu yüzden takıda alaşımlanır.',
      en: 'Pure gold is Mohs 2.5–3 — you can scratch it with your fingernail. That\'s why it\'s alloyed for jewelry.',
      ar: 'الذهب الصافي طريّ جداً، لذا يُخلط في المجوهرات.',
    },
  },

  // GÜMÜŞ +3
  {
    q: { tr: 'Gümüş neden kararır?', en: 'Why does silver tarnish?', ar: 'لماذا تتأكسد الفضة؟' },
    opts: [
      { tr: 'Oksijenle tepkimeye girer', en: 'Reacts with oxygen', ar: 'تتفاعل مع الأكسجين' },
      { tr: 'Havadaki kükürtle tepkimeye girer', en: 'Reacts with sulfur in the air', ar: 'تتفاعل مع الكبريت' },
      { tr: 'Nemden paslanır', en: 'Rusts from moisture', ar: 'تصدأ من الرطوبة' },
      { tr: 'Işıkla kararır', en: 'Darkens from light', ar: 'يغمق من الضوء' },
    ],
    answer: 1, cat: 'gumus', difficulty: 1,
    explanation: {
      tr: 'Gümüş havadaki kükürt (H₂S) ile tepkimeye girer: 2 Ag + H₂S → Ag₂S (siyah) + H₂.',
      en: 'Silver reacts with airborne sulfur (H₂S): 2 Ag + H₂S → Ag₂S (black) + H₂.',
      ar: 'تتفاعل الفضة مع كبريت الهواء.',
    },
  },
  {
    q: { tr: 'Trabzon Hasırı hangi yıl UNESCO listesine girdi?', en: 'When was Trabzon Hasır added to UNESCO\'s list?', ar: 'متى دخل حصير طرابزون قائمة اليونسكو؟' },
    opts: [
      { tr: '2005', en: '2005', ar: '2005' },
      { tr: '2015', en: '2015', ar: '2015' },
      { tr: '2020', en: '2020', ar: '2020' },
      { tr: '2023', en: '2023', ar: '2023' },
    ],
    answer: 2, cat: 'gumus', difficulty: 2,
    explanation: {
      tr: 'Trabzon Hasırı 2020\'de UNESCO Somut Olmayan Kültürel Miras listesine eklendi.',
      en: 'Trabzon Hasır joined UNESCO\'s Intangible Cultural Heritage list in 2020.',
      ar: 'أُدرج في اليونسكو 2020.',
    },
  },
  {
    q: { tr: 'Telkâri sanatının en eski kökeni hangi medeniyettir?', en: 'Which civilization is filigree\'s earliest origin?', ar: 'ما أصل التلكاري؟' },
    opts: [
      { tr: 'Orta Asya', en: 'Central Asia', ar: 'آسيا الوسطى' },
      { tr: 'Mezopotamya (Sümer)', en: 'Mesopotamia (Sumer)', ar: 'بلاد الرافدين' },
      { tr: 'Roma', en: 'Rome', ar: 'روما' },
      { tr: 'Bizans', en: 'Byzantium', ar: 'بيزنطة' },
    ],
    answer: 1, cat: 'gumus', difficulty: 3,
    explanation: {
      tr: 'Telkârinin en eski örnekleri Sümer Ur kraliyet mezarlarında (M.Ö. 2500) bulundu.',
      en: 'The earliest filigree examples are from Sumerian royal tombs at Ur (2500 BCE).',
      ar: 'أقدم الأمثلة في مقابر أور.',
    },
  },

  // PIRLANTA +4
  {
    q: { tr: 'Dünyanın bilinen en büyük ham pırlantası hangisidir?', en: 'What is the largest rough diamond ever found?', ar: 'ما أكبر ماسة خام في التاريخ؟' },
    opts: [
      { tr: 'Hope', en: 'Hope', ar: 'الأمل' },
      { tr: 'Koh-i-Noor', en: 'Koh-i-Noor', ar: 'كوه نور' },
      { tr: 'Cullinan', en: 'Cullinan', ar: 'كولينان' },
      { tr: 'Excelsior', en: 'Excelsior', ar: 'إكسيلسيور' },
    ],
    answer: 2, cat: 'pirlanta', difficulty: 2,
    explanation: {
      tr: 'Cullinan 3.106,75 karat ağırlığında 26 Ocak 1905\'te Güney Afrika Premier Madeni\'nde bulundu.',
      en: 'Cullinan, at 3,106.75 carats, was found on 26 January 1905 at South Africa\'s Premier Mine.',
      ar: 'كولينان 3106 قيراط.',
    },
  },
  {
    q: { tr: 'Hope Pırlantası\'nın mavi rengi neyden gelir?', en: 'What gives the Hope Diamond its blue color?', ar: 'ما يُعطي ماسة الأمل لونها؟' },
    opts: [
      { tr: 'Kobalt', en: 'Cobalt', ar: 'الكوبالت' },
      { tr: 'Bor atomları', en: 'Boron atoms', ar: 'ذرات البورون' },
      { tr: 'Demir', en: 'Iron', ar: 'الحديد' },
      { tr: 'Bakır', en: 'Copper', ar: 'النحاس' },
    ],
    answer: 1, cat: 'pirlanta', difficulty: 3,
    explanation: {
      tr: 'Hope\'un mavisi, bir milyon karbona düşen ~1 bor atomundan gelir. Bor, Hope\'u elektrik iletken de yapar.',
      en: 'Hope\'s blue comes from ~1 boron atom per million carbon atoms. Boron also makes Hope electrically conductive.',
      ar: 'اللون من البورون.',
    },
  },
  {
    q: { tr: 'Pırlantaları yüzeye çıkaran volkanik kayaç hangisidir?', en: 'What rock type brings diamonds to the surface?', ar: 'ما الصخر الذي يحمل الماس؟' },
    opts: [
      { tr: 'Granit', en: 'Granite', ar: 'الجرانيت' },
      { tr: 'Bazalt', en: 'Basalt', ar: 'البازلت' },
      { tr: 'Kimberlit', en: 'Kimberlite', ar: 'الكمبرليت' },
      { tr: 'Kalker', en: 'Limestone', ar: 'الحجر الجيري' },
    ],
    answer: 2, cat: 'pirlanta', difficulty: 2,
    explanation: {
      tr: 'Kimberlit, 150 km derinlikten saatte 40+ km hızla yükselen volkanik kayaçtır.',
      en: 'Kimberlite is volcanic rock rising from 150 km depth at 40+ km/h.',
      ar: 'الكمبرليت الوحيد.',
    },
  },
  {
    q: { tr: 'Koh-i-Noor pırlantasının orijinal (kesimden önceki) ağırlığı neydi?', en: 'What was Koh-i-Noor\'s weight before it was recut?', ar: 'كم وزن كوه نور قبل القطع؟' },
    opts: [
      { tr: '~45 ct', en: '~45 ct', ar: '~45' },
      { tr: '~105 ct', en: '~105 ct', ar: '~105' },
      { tr: '~186 ct', en: '~186 ct', ar: '~186' },
      { tr: '~530 ct', en: '~530 ct', ar: '~530' },
    ],
    answer: 2, cat: 'pirlanta', difficulty: 3,
    explanation: {
      tr: 'Koh-i-Noor 1852\'de Londra\'da yeniden kesildi: 186 → 105,6 karat. Bugün Kraliçe Ana\'nın tacındadır.',
      en: 'Koh-i-Noor was recut in London in 1852: 186 → 105.6 carats. Today it sits in the Queen Mother\'s Crown.',
      ar: '186 ثم 105.6 بعد إعادة القطع.',
    },
  },

  // RENKLİ TAŞLAR +6
  {
    q: { tr: 'Yakutun kırmızısını hangi element yapar?', en: 'What element makes ruby red?', ar: 'أي عنصر يُعطي الياقوت لونه؟' },
    opts: [
      { tr: 'Demir', en: 'Iron', ar: 'الحديد' },
      { tr: 'Krom (Cr)', en: 'Chromium (Cr)', ar: 'الكروم' },
      { tr: 'Vanadyum', en: 'Vanadium', ar: 'الفاناديوم' },
      { tr: 'Titanyum', en: 'Titanium', ar: 'التيتانيوم' },
    ],
    answer: 1, cat: 'renkli-taslar', difficulty: 2,
    explanation: {
      tr: 'Krom atomları (Cr³⁺) beyaz ışığın yeşil bölgesini yutar, yakutun kırmızısını yansıtır. Aynı element zümrüdü de yeşil yapar — kristal yapı belirleyicidir.',
      en: 'Chromium atoms (Cr³⁺) absorb green light, reflecting ruby\'s red. The same element makes emerald green — crystal structure decides.',
      ar: 'الكروم يُعطي الياقوت لونه.',
    },
  },
  {
    q: { tr: 'Opalin "renk oyunu" (play-of-color) nasıl oluşur?', en: 'How does opal\'s "play-of-color" form?', ar: 'كيف يتكون رقص ألوان الأوبال؟' },
    opts: [
      { tr: 'Kimyasal bileşimden', en: 'From chemical composition', ar: 'من التركيب' },
      { tr: 'Mikroskobik silika küreciklerinden', en: 'From microscopic silica spheres', ar: 'من كرات السيليكا' },
      { tr: 'Suyla tepkimeden', en: 'From water reaction', ar: 'من التفاعل مع الماء' },
      { tr: 'Radyasyondan', en: 'From radiation', ar: 'من الإشعاع' },
    ],
    answer: 1, cat: 'renkli-taslar', difficulty: 3,
    explanation: {
      tr: 'Opaldeki silika küreciklerinin (150-300 nm) düzenli dizilişi ışığı spektruma ayırır — gökkuşağı efektinin sebebi.',
      en: 'Regular arrangement of silica spheres (150–300 nm) in opal diffracts light into its spectrum.',
      ar: 'كرات السيليكا تُشتت الضوء.',
    },
  },
  {
    q: { tr: '"Watermelon" (karpuz) takma adıyla ünlü taş hangisidir?', en: 'Which stone is nicknamed "watermelon"?', ar: 'أي حجر لقبه "البطيخ"؟' },
    opts: [
      { tr: 'Opal', en: 'Opal', ar: 'الأوبال' },
      { tr: 'Turmalin', en: 'Tourmaline', ar: 'التورمالين' },
      { tr: 'Ametist', en: 'Amethyst', ar: 'الجمشت' },
      { tr: 'Topaz', en: 'Topaz', ar: 'التوباز' },
    ],
    answer: 1, cat: 'renkli-taslar', difficulty: 2,
    explanation: {
      tr: 'Watermelon turmalin — yeşil kabuk + pembe çekirdek iki-renkli kristal.',
      en: 'Watermelon tourmaline — a bicolor crystal with green rind and pink center.',
      ar: 'التورمالين ثنائي اللون.',
    },
  },
  {
    q: { tr: 'Peridot hangi ayın doğum taşıdır?', en: 'Peridot is birthstone of which month?', ar: 'البيريدوت حجر أي شهر؟' },
    opts: [
      { tr: 'Haziran', en: 'June', ar: 'يونيو' },
      { tr: 'Ağustos', en: 'August', ar: 'أغسطس' },
      { tr: 'Ekim', en: 'October', ar: 'أكتوبر' },
      { tr: 'Aralık', en: 'December', ar: 'ديسمبر' },
    ],
    answer: 1, cat: 'renkli-taslar', difficulty: 1,
    explanation: {
      tr: 'Peridot Ağustos doğum taşıdır. Mineral adı olivin, Mısır\'daki St. John Adası 3500 yıldır kaynak.',
      en: 'Peridot is August\'s birthstone. Mineral name olivine; Egypt\'s St. John\'s Island supplies it for 3,500 years.',
      ar: 'حجر ميلاد أغسطس.',
    },
  },
  {
    q: { tr: '"Garnet" ismi hangi meyveden gelir?', en: '"Garnet" comes from which fruit?', ar: 'اسم غارنت من أي فاكهة؟' },
    opts: [
      { tr: 'Çilek', en: 'Strawberry', ar: 'الفراولة' },
      { tr: 'Nar', en: 'Pomegranate', ar: 'الرمان' },
      { tr: 'Üzüm', en: 'Grape', ar: 'العنب' },
      { tr: 'Kiraz', en: 'Cherry', ar: 'الكرز' },
    ],
    answer: 1, cat: 'renkli-taslar', difficulty: 2,
    explanation: {
      tr: 'Garnet, Latince "granatus" (nar) kelimesinden gelir.',
      en: '"Garnet" comes from Latin "granatus" (pomegranate).',
      ar: 'الاسم من الرمان اللاتيني.',
    },
  },
  {
    q: { tr: 'Lapis lazuli kaç yıldır Sar-i Sang\'tan çıkarılıyor?', en: 'How long has lapis been mined at Sar-i Sang?', ar: 'منذ متى يُستخرج اللازورد؟' },
    opts: [
      { tr: '500 yıl', en: '500 years', ar: '500' },
      { tr: '1500 yıl', en: '1,500 years', ar: '1500' },
      { tr: '6000+ yıl', en: '6,000+ years', ar: '6000+' },
      { tr: '12000 yıl', en: '12,000 years', ar: '12000' },
    ],
    answer: 2, cat: 'renkli-taslar', difficulty: 3,
    explanation: {
      tr: '6000+ yıldır aralıksız çalışan dünyanın bilinen en eski aktif madenidir.',
      en: 'Over 6,000 years continuous operation — the longest continuously-active known mine.',
      ar: 'أقدم منجم نشط.',
    },
  },

  // PLATİN +3
  {
    q: { tr: 'Dünyadaki platin rezervinin yaklaşık %75\'i hangi ülkede?', en: 'About 75% of world platinum lies in which country?', ar: 'في أي دولة 75٪ من البلاتين؟' },
    opts: [
      { tr: 'Rusya', en: 'Russia', ar: 'روسيا' },
      { tr: 'Kanada', en: 'Canada', ar: 'كندا' },
      { tr: 'Güney Afrika', en: 'South Africa', ar: 'جنوب أفريقيا' },
      { tr: 'Avustralya', en: 'Australia', ar: 'أستراليا' },
    ],
    answer: 2, cat: 'platin', difficulty: 2,
    explanation: {
      tr: 'Güney Afrika\'nın Bushveld Kompleksi dünya platin rezervinin ~%75\'ini barındırır.',
      en: 'South Africa\'s Bushveld Complex holds ~75% of world platinum reserves.',
      ar: '75٪ في بوشفيلد.',
    },
  },
  {
    q: { tr: 'Platinin en büyük endüstriyel kullanımı hangisidir?', en: 'What is platinum\'s largest industrial use?', ar: 'ما أكبر استخدام صناعي للبلاتين؟' },
    opts: [
      { tr: 'Mücevher', en: 'Jewelry', ar: 'المجوهرات' },
      { tr: 'Otomotiv katalitik dönüştürücüler', en: 'Automotive catalytic converters', ar: 'محفزات السيارات' },
      { tr: 'Bilgisayar çipleri', en: 'Computer chips', ar: 'الرقائق' },
      { tr: 'Diş protezleri', en: 'Dental prosthetics', ar: 'الأسنان' },
    ],
    answer: 1, cat: 'platin', difficulty: 2,
    explanation: {
      tr: 'Dünya platin üretiminin %40\'ı katalitik dönüştürücülere gider — zehirli egzoz gazlarını dönüştürür.',
      en: '40% of world platinum goes into catalytic converters — converting toxic exhaust gases.',
      ar: '40٪ للمحفزات.',
    },
  },
  {
    q: { tr: '19. yüzyılda platin sikke basan tek ülke hangisidir?', en: 'Which country uniquely minted platinum coinage in the 19th century?', ar: 'أي دولة سكّت عملات بلاتينية؟' },
    opts: [
      { tr: 'İngiltere', en: 'UK', ar: 'بريطانيا' },
      { tr: 'Rusya', en: 'Russia', ar: 'روسيا' },
      { tr: 'ABD', en: 'USA', ar: 'أمريكا' },
      { tr: 'Osmanlı', en: 'Ottoman Empire', ar: 'العثمانية' },
    ],
    answer: 1, cat: 'platin', difficulty: 3,
    explanation: {
      tr: 'Rusya 1828-1845 arası 3 ve 6 ruble platin paralar bastı.',
      en: 'Russia minted 3- and 6-ruble platinum coins 1828–1845.',
      ar: 'روسيا 1828-1845.',
    },
  },

  // TAKI +3
  {
    q: { tr: 'Prenses Diana\'nın nişan yüzüğünde hangi taş vardı?', en: 'What stone was in Princess Diana\'s engagement ring?', ar: 'ما حجر خاتم الأميرة ديانا؟' },
    opts: [
      { tr: 'Pırlanta', en: 'Diamond', ar: 'الماس' },
      { tr: 'Zümrüt', en: 'Emerald', ar: 'الزمرد' },
      { tr: 'Yakut', en: 'Ruby', ar: 'الياقوت' },
      { tr: 'Seylan safiri', en: 'Ceylon sapphire', ar: 'صفير سيلاني' },
    ],
    answer: 3, cat: 'taki', difficulty: 1,
    explanation: {
      tr: '12 karatlık Seylan safiri; yüzük şimdi Prenses Kate\'te.',
      en: 'A 12-carat Ceylon sapphire; the ring now belongs to Princess Kate.',
      ar: 'صفير سيلاني 12 قيراطاً.',
    },
  },
  {
    q: { tr: '"Tiffany Setting" pırlanta yüzüğü hangi yıl tanıtıldı?', en: 'When was the Tiffany Setting introduced?', ar: 'متى قُدّم تصميم تيفاني؟' },
    opts: [
      { tr: '1720', en: '1720', ar: '1720' },
      { tr: '1886', en: '1886', ar: '1886' },
      { tr: '1947', en: '1947', ar: '1947' },
      { tr: '2000', en: '2000', ar: '2000' },
    ],
    answer: 1, cat: 'taki', difficulty: 2,
    explanation: {
      tr: 'Tiffany & Co. 1886\'da 6 platin tırnakla pırlantayı havaya kaldıran tasarımı tanıttı.',
      en: 'Tiffany & Co. introduced the 6-platinum-prong lift in 1886.',
      ar: '1886 من تيفاني.',
    },
  },
  {
    q: { tr: 'Dünyanın bilinen en eski alyansı ne kadar eskidir?', en: 'How old is the oldest known wedding ring?', ar: 'كم عمر أقدم خاتم زواج؟' },
    opts: [
      { tr: '500 yıl', en: '500 years', ar: '500' },
      { tr: '1500 yıl', en: '1,500 years', ar: '1500' },
      { tr: '4500 yıl', en: '4,500 years', ar: '4500' },
      { tr: '10000 yıl', en: '10,000 years', ar: '10000' },
    ],
    answer: 2, cat: 'taki', difficulty: 2,
    explanation: {
      tr: 'Eski Mısır\'da bulunan 4500 yıllık altın telli halka — basit ama sembolizmi aynı.',
      en: 'A 4,500-year-old gold-wire ring found in ancient Egypt.',
      ar: 'عمره 4500 سنة من مصر.',
    },
  },

  // ZANAAT +3
  {
    q: { tr: 'Eskişehir Lüle Taşı\'nın en tuhaf özelliği nedir?', en: 'What is the most unusual property of Eskişehir meerschaum?', ar: 'ما أغرب صفة لحجر لولا؟' },
    opts: [
      { tr: 'Suda yüzer', en: 'It floats in water', ar: 'يطفو على الماء' },
      { tr: 'Gece parlar', en: 'Glows at night', ar: 'يتوهج ليلاً' },
      { tr: 'Mıknatısa yapışır', en: 'Sticks to magnets', ar: 'ينجذب للمغناطيس' },
      { tr: 'Suda çözünür', en: 'Dissolves in water', ar: 'يذوب في الماء' },
    ],
    answer: 0, cat: 'zanaat', difficulty: 2,
    explanation: {
      tr: 'Lüle taşı gözenekli yapısı sayesinde çok hafiftir (1–1,5 g/cm³) ve suda yüzer. Adı da zaten "deniz köpüğü" (Almanca Meerschaum).',
      en: 'Due to its porous structure, meerschaum is very light (1–1.5 g/cm³) and floats in water. The name itself means "sea-foam" in German.',
      ar: 'الحجر مسامي فيطفو.',
    },
  },
  {
    q: { tr: 'Mine (enamel) sanatında cam hangi sıcaklıkta metale kaynaşır?', en: 'At what temperature does enamel glass fuse to metal?', ar: 'عند أي درجة حرارة تنصهر المينا؟' },
    opts: [
      { tr: '200–300°C', en: '200–300°C', ar: '200-300' },
      { tr: '450–600°C', en: '450–600°C', ar: '450-600' },
      { tr: '750–900°C', en: '750–900°C', ar: '750-900' },
      { tr: '1200–1500°C', en: '1200–1500°C', ar: '1200-1500' },
    ],
    answer: 2, cat: 'zanaat', difficulty: 3,
    explanation: {
      tr: 'Mine 750-900°C\'de fırında eritilir. Metal ve cam birlikte soğuduğunda moleküler düzeyde birleşir.',
      en: 'Enamel is fired at 750–900°C. Metal and glass bond at molecular level as they cool together.',
      ar: 'تُفرن عند 750-900°م.',
    },
  },
  {
    q: { tr: 'Kazaziye sanatında gümüş tel ne kadar incedir?', en: 'How thin is the silver wire in kazaz?', ar: 'كم رفع سلك الكزّاز؟' },
    opts: [
      { tr: '~1 mm', en: '~1 mm', ar: '~1' },
      { tr: '~0.5 mm', en: '~0.5 mm', ar: '~0.5' },
      { tr: '~0.05–0.1 mm (saç telinden ince)', en: '~0.05–0.1 mm (thinner than hair)', ar: '~0.05 (أرفع من الشعرة)' },
      { tr: '~2 mm', en: '~2 mm', ar: '~2' },
    ],
    answer: 2, cat: 'zanaat', difficulty: 2,
    explanation: {
      tr: 'Kazaz teli 0,05-0,1 mm — insan saçından (~0,08 mm) bile ince. Usta büyüteç altında çalışır.',
      en: 'Kazaz wire is 0.05–0.1 mm — thinner than human hair (~0.08 mm). Masters work under magnifiers.',
      ar: 'أرفع من الشعرة.',
    },
  },

  // KARIŞIK +2
  {
    q: { tr: 'Hangisi Mohs skalasında 10 sertliktedir?', en: 'Which is Mohs 10 hardness?', ar: 'أي حجر صلابته 10 على موس؟' },
    opts: [
      { tr: 'Yakut', en: 'Ruby', ar: 'الياقوت' },
      { tr: 'Safir', en: 'Sapphire', ar: 'الصفير' },
      { tr: 'Zümrüt', en: 'Emerald', ar: 'الزمرد' },
      { tr: 'Pırlanta (elmas)', en: 'Diamond', ar: 'الماس' },
    ],
    answer: 3, cat: 'karisik', difficulty: 1,
    explanation: {
      tr: 'Pırlanta (elmas) Mohs 10 — doğadaki en sert mineral. Yakut ve safir 9; zümrüt 7,5-8.',
      en: 'Diamond is Mohs 10 — the hardest natural mineral. Ruby and sapphire are 9; emerald 7.5–8.',
      ar: 'الماس 10، الأصعب.',
    },
  },
  {
    q: { tr: '"Elementlerin asili" sayılan metal hangisidir?', en: 'Which metal is considered "the noblest of nobles"?', ar: 'أي معدن "أنبل النبيلين"؟' },
    opts: [
      { tr: 'Altın', en: 'Gold', ar: 'الذهب' },
      { tr: 'Gümüş', en: 'Silver', ar: 'الفضة' },
      { tr: 'Platin', en: 'Platinum', ar: 'البلاتين' },
      { tr: 'Bakır', en: 'Copper', ar: 'النحاس' },
    ],
    answer: 2, cat: 'karisik', difficulty: 3,
    explanation: {
      tr: 'Platin "asil metaller" ailesinin en asil üyesidir: oksijenle, suyla veya çoğu asitle reaksiyona girmez. Sadece "kral suyu" onu çözebilir.',
      en: 'Platinum is the noblest of the "noble metals": non-reactive with oxygen, water, or most acids. Only "aqua regia" dissolves it.',
      ar: 'البلاتين أنبل المعادن النبيلة.',
    },
  },
];

import { enrichQuizCategory } from './_quizEnrichment.js';

const _categoriesBase = [
  { id: 'karisik', tr: 'Karışık', en: 'Mixed', ar: 'منوعة', emoji: '🎲' },
  { id: 'altin', tr: 'Altın', en: 'Gold', ar: 'الذهب', emoji: '🥇' },
  { id: 'gumus', tr: 'Gümüş', en: 'Silver', ar: 'الفضة', emoji: '🪙' },
  { id: 'pirlanta', tr: 'Pırlanta', en: 'Diamond', ar: 'الماس', emoji: '💎' },
  { id: 'renkli-taslar', tr: 'Renkli Taşlar', en: 'Colored Stones', ar: 'أحجار ملونة', emoji: '💚' },
  { id: 'platin', tr: 'Platin', en: 'Platinum', ar: 'البلاتين', emoji: '⚪' },
  { id: 'taki', tr: 'Takı', en: 'Jewelry', ar: 'مجوهرات', emoji: '💍' },
  { id: 'zanaat', tr: 'Zanaat', en: 'Craft', ar: 'حرف', emoji: '🪡' },
];

// Faz 6-F: tüm kategoriler enrichment ile birleştirilir (immutable)
export const categories = _categoriesBase.map(enrichQuizCategory);

export function getCategory(id) {
  return categories.find((c) => c.id === id) || null;
}

export function getQuizzesByCategory(categoryId, difficulty = null) {
  let pool = categoryId === 'karisik' ? quizzes : quizzes.filter((q) => q.cat === categoryId);
  if (difficulty) pool = pool.filter((q) => q.difficulty === difficulty);
  // Return up to 8 items shuffled
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(8, shuffled.length));
}
