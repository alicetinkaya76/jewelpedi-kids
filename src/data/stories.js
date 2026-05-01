/* Story threads for JewelPedi Kids — Faz 2-C (base) + Faz 6-C (enrichment).
 *
 * Each story is character-driven or place-driven narrative that weaves
 * together multiple exhibits into one flowing arc. 5 scenes per story,
 * trilingual, with a gem icon + accent color per scene.
 *
 * Shape (base):
 *   { id, hall, accent, icon, readMinutes,
 *     title: {tr,en,ar}, subtitle: {tr,en,ar},
 *     scenes: [{ id, title: {tr,en,ar}, body: {tr,en,ar},
 *                icon?: string, pullquote?: {tr,en,ar} }],
 *     takeaway: {tr,en,ar},
 *     relatedExhibits: [ids] }
 *
 * Faz 6-C additions (via _storyEnrichment.js, all OPTIONAL):
 *   sources, relatedLabs, relatedQuizzes, geoPoints, timeline,
 *   vocabulary, curatorNote
 */

// _stories_raw: 2-C'den kalan ham tanımlar. Dışarıya export edilen `stories`
// Faz 6-C'de enrichment ile birleştirilmiş versiyondur.
const _stories_raw = [
  /* ═══════════════════════════════════════════════════════
     1. KLEOPATRA'NIN ZÜMRÜDÜ
     ═══════════════════════════════════════════════════════ */
  {
    id: 'kleopatra-zumrut',
    hall: 'renkli-taslar',
    accent: '#27ae60',
    icon: 'emerald',
    readMinutes: 5,
    title: {
      tr: 'Kleopatra\'nın Zümrüdü',
      en: 'Cleopatra\'s Emerald',
      ar: 'زمرد كليوباترا',
    },
    subtitle: {
      tr: 'Bir kraliçe, doğu çöllerinde bir madenin sahibiydi — 2000 yıl boyunca kayboldu, sonra bulundu.',
      en: 'A queen owned mines in the eastern desert — lost for 2,000 years, then found again.',
      ar: 'ملكة تملك مناجم في الصحراء — فُقدت 2000 سنة ثم اكتُشفت.',
    },
    scenes: [
      {
        id: 'opening',
        icon: 'emerald',
        title: {
          tr: 'Mısır\'ın Doğusundaki Dağ',
          en: 'The Mountain East of Egypt',
          ar: 'الجبل شرق مصر',
        },
        body: {
          tr: 'Mısır\'ın Nil Nehri\'nin doğusunda, sıcak çölün ortasında bir dağ vardı. Antik Yunanlılar ona "Mons Smaragdus" derdi — Zümrüt Dağı. Yüksekliği 1600 metreydi. Dağın kayalarında ince yeşil damarlar görülürdü: saf zümrüt. Roma İmparatorluğu\'ndan önce Mısır\'ın son büyük kraliçesi bu dağı biliyordu. İsmi Kleopatra. Yıl M.Ö. 40\'lardı.',
          en: 'East of Egypt\'s Nile, in the hot desert, stood a mountain. Ancient Greeks called it "Mons Smaragdus" — Emerald Mountain. It rose 1,600 meters. Thin green veins ran through its rocks: pure emerald. Before the Roman Empire, Egypt\'s last great queen knew this mountain. Her name was Cleopatra. The year was around 40 BCE.',
          ar: 'شرق نيل مصر، في الصحراء الحارة، وقف جبل. سماه اليونانيون "جبل الزمرد". عروقه الخضراء زمرد نقي. عرفته كليوباترا عام 40 ق.م.',
        },
      },
      {
        id: 'queens-mines',
        icon: 'gold-coin',
        title: {
          tr: 'Kraliçenin Madenleri',
          en: 'The Queen\'s Mines',
          ar: 'مناجم الملكة',
        },
        body: {
          tr: 'Kleopatra zeki ve hırslı bir kraliçeydi. Sadece Mısır\'ı yönetmek yetmiyordu — dünyanın en güzel taşlarını da sahiplenmek istedi. Zümrüt Dağı\'nın madenlerini kendi ismine bağladı. "Cleopatra Madenleri" denildi onlara. İşçiler taş oyarak yüzlerce metre derinliğe indi. Yakılan meşaleler karanlıkta yeşil damarları aydınlatırdı. Bu madenler Akdeniz dünyasındaki tek zümrüt kaynağıydı — başka hiçbir yerde çıkmıyordu.',
          en: 'Cleopatra was clever and ambitious. Ruling Egypt alone wasn\'t enough — she wanted to own the world\'s finest stones. She put the emerald mines under her own name. People called them "Cleopatra\'s Mines." Workers cut down through stone, hundreds of meters deep. Torches lit the green veins in the darkness. These mines were the only source of emerald in the Mediterranean world — nowhere else produced them.',
          ar: 'وضعت كليوباترا المناجم باسمها. حُفرت أعماق مئات الأمتار، وأضاءت المشاعل العروق الخضراء. كانت المناجم الوحيدة للزمرد في المتوسط.',
        },
        pullquote: {
          tr: '"Zümrüt, kraliçenin taşıdır."',
          en: '"Emerald is the queen\'s stone."',
          ar: '"الزمرد حجر الملكة."',
        },
      },
      {
        id: 'master',
        icon: 'filigree-wire',
        title: {
          tr: 'İki Bin Yıl Önce Bir Usta',
          en: 'A Master 2,000 Years Ago',
          ar: 'صانع قبل 2000 سنة',
        },
        body: {
          tr: 'Madenlerde çalışan bir kuyumcu hayal et. Küçük bir atölyede, yağ lambasının titrek ışığında taş yontuyor. Zümrütlerin içindeki minicik çatlakları görüyor — Fransızcada bugün "jardin" (bahçe) diyoruz bunlara. Usta biliyor: bu çatlakları gizleyemez. Sadece taşı öyle kesmelidir ki ışık çatlakların üstünden sekip geçmesin. Her zümrüt biricik — kendi bahçesi, kendi hikâyesi.',
          en: 'Imagine a goldsmith in those mines. In a small workshop, under flickering oil-lamp light, carving stone. He sees tiny fractures inside the emeralds — we still call these "jardin" (garden) in French today. The master knows: he can\'t hide the cracks. He can only cut the stone so light skips over them. Every emerald is unique — its own garden, its own story.',
          ar: 'تخيّل صائغاً في المناجم. يحفر الحجر على ضوء مصباح زيتي. يرى شقوقاً داخل الزمرد — نُسميها "جاردين". كل زمردة فريدة.',
        },
      },
      {
        id: 'gifts',
        icon: 'emerald',
        title: {
          tr: 'Kleopatra\'nın Hediyeleri',
          en: 'Cleopatra\'s Gifts',
          ar: 'هدايا كليوباترا',
        },
        body: {
          tr: 'Kleopatra zümrütlerle diplomasi yapardı. Roma\'dan gelen elçilere, müttefik krallara, müttefik olmasını istediği liderlere yeşil taşlar hediye ederdi. Bir kolye, bir yüzük, bir küpe — hepsinin üzerinde kraliçenin ismi kazınıydı. Mesajı açıktı: "Ben yalnız değilim, Mısır\'ın hazineleri benim elimde." Bazı hediyeler Roma\'nın palatin tepesine, bazıları Hindistan saraylarına kadar gitti.',
          en: 'Cleopatra used emeralds as diplomacy. To Roman envoys, to allied kings, to leaders she wanted as allies, she sent green stones. A necklace, a ring, a pair of earrings — each engraved with her name. The message was clear: "I am not alone, Egypt\'s treasures are in my hands." Some gifts traveled to Rome\'s Palatine Hill, some as far as Indian courts.',
          ar: 'أهدت كليوباترا الزمرد للسفراء والملوك، كل قطعة منقوشة باسمها. وصلت إلى روما والهند.',
        },
      },
      {
        id: 'rediscovery',
        icon: 'emerald',
        title: {
          tr: 'Unutuluş ve Yeniden Keşif',
          en: 'Forgetting and Rediscovery',
          ar: 'النسيان والاكتشاف الجديد',
        },
        body: {
          tr: 'Kleopatra M.Ö. 30\'da öldü. Roma Mısır\'ı aldı. Madenler bir süre daha çalıştı, ama 4. yüzyılda terk edildi. Kum yolları kapattı, hatıralar soldu. 1400 yıl boyunca kimse bilmiyordu o dağın nerede olduğunu. 1817\'de Fransız bir mineralog, Frédéric Cailliaud, çölde haftalarca yürüdü. Sonunda eski madenlerin ağzını buldu — tozun altında eski Yunan lambalarının parçaları yatıyordu. Kleopatra\'nın madenleri geri dönmüştü.',
          en: 'Cleopatra died in 30 BCE. Rome took Egypt. The mines ran for a while longer, then were abandoned in the 4th century. Sand closed the paths; memory faded. For 1,400 years no one knew where that mountain was. In 1817, a French mineralogist, Frédéric Cailliaud, walked the desert for weeks. Finally he found the old mine mouths — beneath the dust, fragments of ancient Greek oil lamps. Cleopatra\'s mines had come back.',
          ar: 'ماتت كليوباترا عام 30 ق.م. هُجرت المناجم في القرن الرابع. عام 1817 اكتشفها العالم الفرنسي كاليود من جديد.',
        },
      },
    ],
    takeaway: {
      tr: 'Bir taşın hikâyesi sadece kimyasından değil, kimlerin ellerinden geçtiğinden de gelir. Zümrüt bir kristalden fazlası — bir kraliçenin imzasıydı.',
      en: 'A stone\'s story isn\'t only in its chemistry, but in whose hands it passed through. Emerald is more than a crystal — it carried a queen\'s signature.',
      ar: 'قصة الحجر ليست من كيمياءه فقط، بل من الأيدي التي حملته. الزمرد كان بصمة ملكة.',
    },
    relatedExhibits: ['zumrut', 'yakut', 'safir'],
  },

  /* ═══════════════════════════════════════════════════════
     2. PIRLANTANIN 3 MİLYAR YILI
     ═══════════════════════════════════════════════════════ */
  {
    id: 'pirlantanin-3-milyar-yili',
    hall: 'pirlanta',
    accent: '#5dade2',
    icon: 'diamond',
    readMinutes: 5,
    title: {
      tr: 'Pırlantanın 3 Milyar Yılı',
      en: 'The 3 Billion Years of a Diamond',
      ar: '3 مليار سنة من عمر الماسة',
    },
    subtitle: {
      tr: 'Bir pırlantanın yolculuğu, insanlığın yaşından bin kat eskidir.',
      en: 'A diamond\'s journey is a thousand times older than humanity itself.',
      ar: 'رحلة الماسة أقدم من البشرية بألف مرة.',
    },
    scenes: [
      {
        id: 'deep-past',
        icon: 'diamond',
        title: {
          tr: 'Milyarlarca Yıl Önce',
          en: 'Billions of Years Ago',
          ar: 'منذ مليارات السنين',
        },
        body: {
          tr: '3 milyar yıl önce. Dünya gençti. İnsanlar yoktu, dinozorlar yoktu, hatta ağaçlar bile yoktu. Okyanuslarda sadece küçük bakteriler vardı. Bu bakteriler öldüğünde, karbon atomları çökeldi. Milyonlarca yıl boyunca bu karbon okyanus tabanında biriktirildi. Yerkabuğu hareket ediyordu, ve tabandaki karbon yavaşça, yavaşça yerin daha derinlerine taşındı.',
          en: 'Three billion years ago. Earth was young. No humans, no dinosaurs, not even trees. Only small bacteria lived in the oceans. When those bacteria died, carbon atoms settled down. Over millions of years this carbon piled up on the ocean floor. Earth\'s crust was moving, and the carbon slowly, slowly was carried deeper into the Earth.',
          ar: 'قبل 3 مليار سنة. الأرض كانت فتية. فقط بكتيريا في المحيط. حين ماتت، ترسّب الكربون إلى الأعماق.',
        },
      },
      {
        id: 'transformation',
        icon: 'diamond',
        title: {
          tr: 'Karbonun Dönüşümü',
          en: 'Carbon\'s Transformation',
          ar: 'تحول الكربون',
        },
        body: {
          tr: '150 kilometre derinlikte artık basınç 60.000 atmosferdi — denizin dibindeki basıncın binlerce katı. Sıcaklık 1200°C\'ye ulaştı, bir fırının üç katı. Bu olağandışı koşullarda karbon atomları bambaşka bir yapıyla dizildi. Her atom 4 komşuya eşit mesafede, tetrahedral düzende. Bu, bildiğimiz en sert madde: pırlanta. Bir kurşun kalemin grafitiyle aynı atomlar, ama tamamen farklı dizilmiş. Yapı her şeyi değiştirir.',
          en: 'At 150 km depth pressure reached 60,000 atmospheres — thousands of times deeper than the sea. Temperature climbed to 1200°C, three times hotter than an oven. In these extreme conditions, carbon atoms aligned in an entirely new pattern. Each atom bonded to 4 neighbors at equal distance, in tetrahedral order. This is the hardest substance we know: diamond. Same atoms as pencil graphite, but completely rearranged. Structure changes everything.',
          ar: 'على عمق 150 كم، ضغط 60 ألف جو وحرارة 1200 مئوية. ترتبت ذرات الكربون في هيكل رباعي السطوح: ماسة.',
        },
        pullquote: {
          tr: '"Aynı atomlar, farklı yapı — farklı taş."',
          en: '"Same atoms, different structure — different stone."',
          ar: '"نفس الذرات، بنية مختلفة، حجر مختلف."',
        },
      },
      {
        id: 'silent-wait',
        icon: 'diamond',
        title: {
          tr: 'Sessiz Bekleyiş',
          en: 'The Silent Wait',
          ar: 'الانتظار الصامت',
        },
        body: {
          tr: 'Ve sonra pırlanta bekledi. Milyon değil, milyar yıl. Dünya yüzeyinde dinozorlar doğdu ve yok oldu. Kıtalar birbirinden koptu. İnsanlar ortaya çıktı, piramitler kuruldu, Roma yükselip çöktü — ama derinde, karanlıkta, pırlanta aynı kalıyordu. Zamanın üstünde bir şekilde. Bu yüzden pırlantalar Dünya\'nın en eski nesneleri arasındadır — 3 milyar yıl, güneşin yaşına yakın bir ölçek.',
          en: 'And then the diamond waited. Not millions but billions of years. On Earth\'s surface, dinosaurs came and went. Continents split apart. Humans emerged, pyramids were built, Rome rose and fell — but deep below, in the dark, diamond remained. Somehow above time. That\'s why diamonds are among Earth\'s oldest objects — 3 billion years, a scale close to the age of the Sun.',
          ar: 'وانتظرت الماسة. مليارات السنين. ظهرت الديناصورات وانقرضت، بُنيت الأهرامات، سقطت روما — والماسة في أعماقها.',
        },
      },
      {
        id: 'eruption',
        icon: 'diamond',
        title: {
          tr: 'Yeryüzüne Hızlı Yolculuk',
          en: 'A Fast Trip to the Surface',
          ar: 'رحلة سريعة إلى السطح',
        },
        body: {
          tr: 'Bir gün — jeoloji ölçeğinde "bir gün" milyonlarca yıl demek — derinde ani bir yanardağ patlaması oldu. Eriyik kaya saatte 40 kilometreden hızlı yukarı fırladı. Pırlanta bu kayayla birlikte 150 km boyunca yolcu oldu. Bu hız kritikti: daha yavaş olsa pırlanta yolda grafite dönüşürdü. Kaya Dünya yüzeyine çıktığında soğudu ve "kimberlit" adını aldı. Kimberlit ve pırlanta, sadece birkaç düzinenin olduğu bacalarda bir arada bekledi. Ta ki insanlar gelene kadar.',
          en: 'One day — "one day" in geological scale means millions of years — a sudden volcanic eruption happened deep down. Molten rock shot upward at over 40 km/h. The diamond rode that rock 150 km up. Speed was critical: slower, and the diamond would have turned back into graphite on the way. When the rock reached Earth\'s surface it cooled and got the name "kimberlite." Kimberlite and diamond waited together in just a few dozen narrow pipes. Until humans came.',
          ar: 'ثار بركان بسرعة 40 كم/ساعة. خرجت الماسة مع صخر "الكمبرليت". السرعة حفظتها من التحول للغرافيت.',
        },
      },
      {
        id: 'daylight',
        icon: 'diamond',
        title: {
          tr: 'Gün Işığı',
          en: 'Daylight',
          ar: 'ضوء النهار',
        },
        body: {
          tr: '26 Ocak 1905, Güney Afrika. Sabahın köründe, Premier Madeni\'nde bir yüzey müfettişi olan Frederick Wells, gün boyu yürüdüğü şaftın duvarına baktı. Kayanın içinde bir şey parlıyordu — insan yumruğu büyüklüğünde. Bıçağıyla çıkardı. Kaldırdığında eline sığmadı. Taşı hemen tartmak istedi: 3.106,75 karat. Dünya tarihinin en büyük ham pırlantası. 3 milyar yıldır derinlerde bekliyordu. Bugün adına "Cullinan" diyoruz ve Londra Kulesi\'nde Kral Asası\'nın üstünde yaşıyor.',
          en: 'January 26, 1905, South Africa. Early morning at the Premier Mine, a surface superintendent named Frederick Wells looked at the wall of the shaft he\'d walked all day. Something shone in the rock — the size of a human fist. He pulled it out with his knife. When he lifted it, it didn\'t fit in his palm. He wanted to weigh it immediately: 3,106.75 carats. The largest rough diamond in world history. It had waited 3 billion years in the deep. Today we call it "Cullinan," and it lives atop the Sovereign\'s Sceptre in the Tower of London.',
          ar: '26 يناير 1905. وجد فريدريك ويلز ماسة بحجم قبضة يد في منجم بريمير. 3106 قيراط — كولينان، أكبر ماسة خام في التاريخ.',
        },
      },
    ],
    takeaway: {
      tr: 'Parmağındaki minik pırlanta Dünya\'dan daha yaşlı bir şey olabilir. O sadece bir taş değil — zamanın bir parçası.',
      en: 'The tiny diamond on your finger could be older than anything else on Earth. It isn\'t just a stone — it\'s a piece of time.',
      ar: 'الماسة الصغيرة في يدك قد تكون أقدم شيء على الأرض. إنها قطعة من الزمن.',
    },
    relatedExhibits: ['pirlanta-nasil-olusur', 'cullinan', '4c-sistemi'],
  },

  /* ═══════════════════════════════════════════════════════
     3. ALTIN KÜLÇESİNİN YOLCULUĞU
     ═══════════════════════════════════════════════════════ */
  {
    id: 'altin-nugget-yolculugu',
    hall: 'altin',
    accent: '#d4a017',
    icon: 'gold-bar',
    readMinutes: 5,
    title: {
      tr: 'Altın Külçesinin Yolculuğu',
      en: 'Journey of a Gold Nugget',
      ar: 'رحلة سبيكة ذهب',
    },
    subtitle: {
      tr: 'Yıldızlar patladığında başladı, bir gelinin bileğinde sona erdi.',
      en: 'It began when stars exploded, and ended on a bride\'s wrist.',
      ar: 'بدأت من انفجار النجوم، وانتهت في يد عروس.',
    },
    scenes: [
      {
        id: 'star-death',
        icon: 'gold-bar',
        title: {
          tr: 'Yıldızların Ölümü',
          en: 'The Death of Stars',
          ar: 'موت النجوم',
        },
        body: {
          tr: 'Altın, Dünya\'da yapılamaz. Altın atomları ancak çok büyük bir enerjide oluşur — nötron yıldızlarının çarpışmasında. İki çok yoğun yıldız birbirine çarptığında, saniyeler içinde altın, platin, uranyum gibi ağır elementler oluşur ve uzaya saçılır. Bizim Güneş Sistemimizdeki altın, yaklaşık 5-6 milyar yıl önceki yıldız çarpışmalarından kalan toz. Her altın alyans, bir yıldızın ölümünün bir parçasıdır.',
          en: 'Gold cannot be made on Earth. Gold atoms form only at enormous energies — in the collision of neutron stars. When two ultra-dense stars crash together, in seconds, heavy elements like gold, platinum and uranium form and scatter into space. All the gold in our solar system is dust from star collisions 5–6 billion years ago. Every gold wedding band is a piece of a dying star.',
          ar: 'الذهب لا يُصنع على الأرض، بل في اصطدام النجوم النيوترونية. كل خاتم ذهبي جزء من نجم محتضر.',
        },
        pullquote: {
          tr: '"Her altın alyans bir yıldızın ölümünden doğar."',
          en: '"Every gold ring is born from a dying star."',
          ar: '"كل خاتم ذهبي يولد من موت نجم."',
        },
      },
      {
        id: 'earth-treasure',
        icon: 'gold-bar',
        title: {
          tr: 'Dünya\'nın Hazinesi',
          en: 'Earth\'s Treasure',
          ar: 'كنز الأرض',
        },
        body: {
          tr: 'Dünya 4,5 milyar yıl önce oluştu. Altın atomları eriyik kayanın içinde vardı. Ama altın çok ağır bir metal — hemen hemen her şeyden ağırdır. Bu yüzden genç Dünya\'nın eriyik haldeki malzemesi içinde altın dibe çökeldi, Dünya\'nın çekirdeğine. Yerkabuğunda kalan "az" altın aslında 4 milyar yıl sonra gelen göktaşı bombardımanıyla taşındı. Uzaydan düşen taşlarda küçük altın zerreleri vardı. Yüzey altınının çoğu aslında uzaydan gelen lahana taneleri.',
          en: 'Earth formed 4.5 billion years ago. Gold atoms were in the molten rock. But gold is an extremely heavy metal — heavier than almost anything else. So in the young Earth\'s molten state, gold sank to the core. The "little" gold in the crust actually came 4 billion years later, delivered by meteorite bombardment. Falling rocks carried tiny gold crystals. Most surface gold is, in fact, seed grains from space.',
          ar: 'تكونت الأرض قبل 4.5 مليار سنة. غاص معظم الذهب في قلبها. الذهب الذي في القشرة أتى من النيازك بعد مليار سنة.',
        },
      },
      {
        id: 'pactolus',
        icon: 'gold-coin',
        title: {
          tr: 'Sart Irmağı\'nın Tortuları',
          en: 'The Silt of the Pactolus',
          ar: 'رواسب نهر باكتولوس',
        },
        body: {
          tr: 'Batı Anadolu\'da — bugünkü Manisa yakınlarında — küçük bir ırmak vardır. Antik adıyla Pactolus, Türkçesi Sart. Bu ırmak yüksekteki dağlardan akardı ve suyla birlikte minik altın pulları taşırdı. Sart Irmağı yıllar boyunca bu altını nehir yatağında biriktirdi. M.Ö. 600 civarında Lidyalı bir çocuk, ayakları suda, ilk kez gördü o pulları. Eliyle aldı — kendine ait bir yıldızın tozu tutuyordu. Ama henüz bilmiyordu.',
          en: 'In western Anatolia — near modern Manisa — there\'s a small river. Pactolus in ancient Greek, Sart in Turkish. It flowed from high mountains and carried tiny gold flakes with its water. Over years the Pactolus built up that gold in its bed. Around 600 BCE a Lydian child, feet in the water, saw those flakes for the first time. He took one in his hand — holding dust from his own star. He didn\'t know yet.',
          ar: 'نهر باكتولوس في غرب الأناضول حمل رقائق ذهبية. عام 600 ق.م التقطها طفل ليدي ولم يعرف أنها غبار نجم.',
        },
      },
      {
        id: 'croesus-coin',
        icon: 'gold-coin',
        title: {
          tr: 'Kroisos\'un Sikkeleri',
          en: 'The Coins of Croesus',
          ar: 'عملات كروسوس',
        },
        body: {
          tr: 'O çocuk büyüdü. Lidya Krallığı\'nın kuyumcusu oldu. Tartıyı öğrendi, eritmeyi öğrendi, damgalamayı öğrendi. Kralı Kroisos gelecek dünya için bir fikir üretti: "Her parça aynı ağırlıkta, aynı saflıkta olsun. Kral\'ın mührünü taşısın. Böylece güvenilir olsun." Bu insanlık tarihinin ilk standart altın parasıydı. "Karun kadar zengin" deyimi buradan gelir — Kroisos\'un serveti. Kuyumcu çocuğun topladığı ilk altın pullar, milyarlarca sikkeye kardeş oldu.',
          en: 'That child grew up. He became a goldsmith to the Kingdom of Lydia. He learned to weigh, to melt, to stamp. His king, Croesus, had an idea for the future: "Let every piece be the same weight, same purity. Let it carry the king\'s seal. So it can be trusted." This was humanity\'s first standardized gold coin. The phrase "rich as Croesus" comes from him. The first flakes the goldsmith child gathered became ancestors of billions of coins.',
          ar: 'كبر الصبي وصار صائغاً لمملكة ليديا. سك الملك كروسوس أول عملة ذهبية معيارية. من هنا عبارة "غني كقارون".',
        },
      },
      {
        id: 'today-dowry',
        icon: 'filigree-wire',
        title: {
          tr: 'Bugünün Çeyizi',
          en: 'Today\'s Dowry',
          ar: 'مهر اليوم',
        },
        body: {
          tr: '2600 yıl sonra, İstanbul. Kapalıçarşı\'nın bir kuyumcusunda bir genç kadın, düğününe hazırlanıyor. Annesi ve kayınvalidesi ona ayrı ayrı bilezikler hediye etmiş — 22 ayar, her biri 20 gram. Gelinin bileklerinde altın yıldırımlar gibi parlıyor. Kimse söylemiyor ama herkes biliyor: bunlar sadece süs değil. Ekonomi zorlaştığında, bu bilezikler aileyi ayakta tutacak. Altının 5 milyar yıllık yolculuğu — nötron yıldızından genç gelinin bileğine. Her yıldız dönüyor insana.',
          en: '2,600 years later, in Istanbul. At a Grand Bazaar jeweler, a young woman prepares for her wedding. Her mother and mother-in-law have gifted her bracelets separately — 22 karat, 20 grams each. Gold strikes on the bride\'s wrists like lightning. Nobody says it but everyone knows: these aren\'t just decoration. When the economy tightens, these bracelets will hold the family up. Gold\'s 5-billion-year journey — from neutron star to a young bride\'s wrist. Every star comes back to a person.',
          ar: 'بعد 2600 سنة في اسطنبول، عروس تستلم أساور ذهبية من أمها وحماتها. رحلة الذهب من نجم نيوتروني إلى معصم عروس.',
        },
      },
    ],
    takeaway: {
      tr: 'Altın ile ilişkimiz 6000 yıllıktır ama altının kendisi çok daha eski. Her altın parçası aslında bir yıldızın hikâyesidir — o yıldızın mektubu senin elinde.',
      en: 'Our relationship with gold is 6,000 years old, but the gold itself is far older. Every piece of gold is really a star\'s story — that star\'s letter in your hand.',
      ar: 'علاقتنا بالذهب عمرها 6000 سنة، لكن الذهب نفسه أقدم بكثير. كل قطعة هي رسالة نجم.',
    },
    relatedExhibits: ['altin-tarihcesi', 'ayar-sistemi', 'bilezik'],
  },

  /* ═══════════════════════════════════════════════════════
     4. TRABZON HASIRI'NIN CANLANMA YOLU
     ═══════════════════════════════════════════════════════ */
  {
    id: 'trabzon-hasiri-unesco',
    hall: 'gumus',
    accent: '#7f8c8d',
    icon: 'hasir-weave',
    readMinutes: 5,
    title: {
      tr: 'Trabzon Hasırı\'nın Canlanma Yolu',
      en: 'The Revival of Trabzon Hasır',
      ar: 'طريق إحياء حصير طرابزون',
    },
    subtitle: {
      tr: '500 yıllık bir zanaat, tükenmek üzereyken coğrafi işaretle kendi adını korudu.',
      en: 'A 500-year craft, almost extinct, kept its own name through geographical indication.',
      ar: 'حرفة عمرها 500 سنة كادت تنقرض، فحمت اسمها بعلامة جغرافية.',
    },
    scenes: [
      {
        id: 'black-sea',
        icon: 'hasir-weave',
        title: {
          tr: 'Karadeniz Kıyısında',
          en: 'On the Black Sea Coast',
          ar: 'على ساحل البحر الأسود',
        },
        body: {
          tr: '16. yüzyılda Trabzon, İpek Yolu\'nun son duraklarından biriydi. Gümüş, İran\'dan geliyor, gemilerle Avrupa\'ya ulaşıyordu. Şehirdeki Pontus Rum kuyumcuları inanılmaz ince bir teknik geliştirdiler: gümüş teli saç teli kadar inceltmek ve sonra onu örgü gibi bir kumaşa dokumak. Buna "hasır" dediler — Türkçede "dokuma" demek. Bu takı bileğe sarıldığında kumaş gibi akıyor, gümüş gibi parlıyordu.',
          en: 'In the 16th century Trabzon was one of the last stops on the Silk Road. Silver came from Persia and shipped from there to Europe. In the city, Pontic Greek goldsmiths developed an incredibly fine technique: draw silver wire as thin as a hair, then weave it into a fabric-like braid. They called it "hasır" — Turkish for "weave." Worn around the wrist, the jewelry flowed like cloth and shone like silver.',
          ar: 'في القرن 16 كان صاغة طرابزون البنطيون ينسجون السلك الفضي كقماش — سموه "حصير" وهو من الحرير.',
        },
      },
      {
        id: 'masters-to-masters',
        icon: 'hasir-weave',
        title: {
          tr: 'Ustalardan Ustalara',
          en: 'From Master to Master',
          ar: 'من صانع إلى صانع',
        },
        body: {
          tr: 'Bu zanaat okullardan öğrenilmezdi. Bir çocuk, 12-13 yaşında, bir ustanın yanına çırak olarak verilirdi. İlk yıl süpürge tutar, usta çay verir. İkinci yıl usta ona ilk teli teslim eder. Üçüncü yıl ilk halka kesimini dener. Beşinci yıl ilk bileziğini tamamlar. Ve tam on yılda "kalfa" olur, kendi adına çalışabilir. Trabzon sokaklarında beş yüz yıl boyunca, her nesilde, usta çocuğun eline tel tutuşturuyordu.',
          en: 'This craft wasn\'t learned in schools. A boy, 12 or 13 years old, was given to a master as apprentice. First year he\'d hold brooms, pour tea. Second year the master handed him the first wire. Third year his first ring cut. Fifth year his first finished bracelet. At exactly ten years he\'d become a "journeyman" — able to work on his own. In Trabzon\'s streets for five hundred years, every generation, a master placed wire into a child\'s hand.',
          ar: 'كان الصانع يُعلم صبياً عمره 12 سنة. عشر سنوات حتى يصبح كلفة. 500 سنة والتقليد يتوارث.',
        },
      },
      {
        id: 'near-extinction',
        icon: 'hasir-weave',
        title: {
          tr: 'Neredeyse Kaybolan Sanat',
          en: 'The Nearly Lost Art',
          ar: 'الفن الذي كاد يُفقد',
        },
        body: {
          tr: '1990\'larda bir sorun vardı. Gençler artık 10 yıl bir atölyede oturmak istemiyordu. Makineler benzer görünen bilezikleri 100 kat ucuza üretiyordu — turistler farkı bilmiyordu. Yaşlı ustalar emekli olmaya başladı. Trabzon\'da sadece 20 aktif usta kalmıştı. İşin sırları 20 kişinin hafızasındaydı. Bir kar fırtınası ya da bir hastalık geçmiş hatırayla birlikte sanatı da alıp götürebilirdi. Beş yüz yıllık gelenek sessizce eriyordu.',
          en: 'In the 1990s there was a problem. Young people no longer wanted to sit in a workshop for 10 years. Machines produced similar-looking bracelets 100× cheaper — tourists didn\'t know the difference. Old masters began to retire. Only 20 active masters remained in Trabzon. The craft\'s secrets lived in just 20 memories. A blizzard or an illness could carry the memory — and with it the art — away. A 500-year tradition was quietly dissolving.',
          ar: 'في التسعينيات ضاق الشباب بعشر سنوات تدريب. بقي 20 صانعاً فقط. 500 سنة من التقليد كانت تذوب.',
        },
      },
      {
        id: 'rebirth',
        icon: 'hasir-weave',
        title: {
          tr: 'Yeniden Doğuş',
          en: 'Rebirth',
          ar: 'ولادة جديدة',
        },
        body: {
          tr: '2000\'lerin başında Trabzon Ticaret Odası harekete geçti. Önce "coğrafi işaret" başvurusunu hazırladılar: bu bilezik sadece burada, bu tekniğe göre yapıldığında "Trabzon Hasırı" denilebilir. 2004\'te onay geldi. Sonra ustalar kayıt altına alındı, atölyelerde devletin desteklediği çıraklık programları açıldı. Genç çocuklar burs karşılığında öğreniyordu. Yıllar içinde Trabzon\'da yüzlerce kadın dokumacı bu işle geçimini sağlar oldu; biri telleri çekiyor, biri dokuyor, biri atölyede birleştiriyor.',
          en: 'In the early 2000s the Trabzon Chamber of Commerce stepped in. First they prepared a "Geographical Indication" application: this bracelet can only be called "Trabzon Hasır" when made here, with this technique. Approval came in 2004. Then masters were registered and state-supported apprentice programs opened in workshops. Young children learned in exchange for stipends. Over the years hundreds of women weavers in Trabzon came to make their living this way — one drawing the wire, one weaving, one finishing at the workshop.',
          ar: 'في 2000 بدأت غرفة تجارة طرابزون. عام 2004 تسجيل جغرافي. فُتحت برامج تدريب مدعومة. ومع السنين صار في طرابزون مئات النساء ينسجن الحصير معيشةً لعائلاتهن.',
        },
      },
      {
        id: 'to-world',
        icon: 'hasir-weave',
        title: {
          tr: 'Bir Çocuğun Eline Geçen Tel',
          en: 'The Wire That Reached a Child\'s Hand',
          ar: 'السلك الذي وصل إلى يد طفل',
        },
        body: {
          tr: 'Bir akşam, 2018 yazı. Trabzon\'da küçük bir atölye. On üç yaşındaki Mert, ustasının yanında oturuyor — iki yıldır her gün gelip gidiyor. Bugün usta ona ilk kez kendi başına ince teli uzatıyor: 0,25 mm gümüş, bir saç telinden daha ince. "Bu senin ilk bileziğin olacak," diyor. "On iki gün sonra bitireceksin. Acele etmek yasak." Mert elinde teli titreterek tutuyor. Camın dışında — Kunduracılar Caddesi\'nde — turistler geçiyor; son yıllarda Körfez ülkelerinden gelenler artmış, Trabzon Hasırı aramaya geliyorlar. Beş yüz yıl boyunca usta çocuğun eline tel tutuşturdu; bu akşam sıra Mert\'te. Ustanın gözü hafifçe yaşlı: ikisi de biliyor, artık bir zincirin halkası oldu.',
          en: 'A summer evening, 2018. A small workshop in Trabzon. Thirteen-year-old Mert sits beside his master — he has come here every day for two years. Today, for the first time, the master hands him the thin wire on his own: 0.25 mm silver, finer than a strand of hair. "This will be your first bracelet," he says. "You\'ll finish it in twelve days. Hurry is forbidden." Mert holds the wire, his hand trembling slightly. Outside the window — on Kunduracılar Street — tourists pass by; visitors from Gulf countries have grown in recent years, searching for Trabzon Hasır. For five hundred years a master placed wire in a child\'s hand; tonight it\'s Mert\'s turn. The master\'s eyes glisten a little: they both know, he has become a link in the chain.',
          ar: 'مساء صيف 2018. ورشة صغيرة في طرابزون. مرت (13 سنة) بجانب أستاذه منذ سنتين. اليوم يُسلمه السلك الفضي أول مرة (0.25 مم). "هذه أول أساورك، في 12 يوماً، دون استعجال." في الخارج سياح من الخليج يسألون عن حصير طرابزون. خمسمئة سنة، الصانع يُسلم السلك لطفل — الليلة دور مرت.',
        },
      },
    ],
    takeaway: {
      tr: 'Bir zanaat ölmez: taşıyıcıları olduğu sürece. Trabzon\'un gümüş elleri, ismini koruyan bir işaretle geleceğe uzanıyor.',
      en: 'A craft doesn\'t die — as long as there are hands to carry it. Trabzon\'s silver hands reach into the future, their name protected by a mark of origin.',
      ar: 'الحرفة لا تموت ما دامت أيادٍ تحملها. أيادي طرابزون الفضية تمتد إلى المستقبل، اسمها محميّ بعلامة المنشأ.',
    },
    relatedExhibits: ['trabzon-hasiri', '925-ayar', 'telkari'],
  },

  /* ═══════════════════════════════════════════════════════
     5. MARDİNLİ TELKÂRİ USTASI AYŞE HANIM
     ═══════════════════════════════════════════════════════ */
  {
    id: 'mardinli-telkari-ustasi-ayse',
    hall: 'zanaat',
    accent: '#566573',
    icon: 'filigree-wire',
    readMinutes: 5,
    title: {
      tr: 'Mardinli Telkâri Ustası Ayşe Hanım',
      en: 'Ayşe Hanım, Mardin\'s Filigree Master',
      ar: 'عائشة هانم، صانعة التلكاري من ماردين',
    },
    subtitle: {
      tr: 'Taş sokaklarda, üç farklı dinden ustaların atölyelerinde bir sanat nasıl yaşıyor.',
      en: 'How an art lives on, in stone streets, among workshops of three different faiths.',
      ar: 'كيف يستمر فن في أزقة حجرية، بين ورش من ثلاث ديانات مختلفة.',
    },
    scenes: [
      {
        id: 'morning',
        icon: 'filigree-wire',
        title: {
          tr: 'Mardin\'de Bir Sabah',
          en: 'A Morning in Mardin',
          ar: 'صباح في ماردين',
        },
        body: {
          tr: 'Mardin, Mezopotamya ovasına bakan bir yamaçta kurulmuş. Eski taş evleri, dar merdivenli sokakları, güneşi gün boyu farklı tonlarda yansıtan bal rengi kaleleri var. Sabah saat yedi. Ayşe Hanım — altmış beş yaşında bir telkâri ustası — atölyesine doğru yürüyor. Elinde bir bardak çay, bir dolma ekmek. Geçtiği her kapıda bir usta "Günaydın" diyor. Kimisi Müslüman, kimisi Süryani Hristiyan, kimisi Ermeni. Ayşe teyze her birini çocukluğundan tanır.',
          en: 'Mardin sits on a slope overlooking the Mesopotamian plain. It has old stone houses, narrow stepped streets, honey-colored citadels reflecting the sun in shifting tones all day. It\'s 7 a.m. Ayşe Hanım — a 65-year-old filigree master — walks to her workshop. A glass of tea in hand, a stuffed bread. At every door she passes, a master says "Good morning." Some Muslim, some Syriac Christian, some Armenian. Aunt Ayşe has known each since childhood.',
          ar: 'ماردين على منحدر يُطل على ميسوبوتاميا. عائشة هانم (65 سنة) صانعة تلكاري، تمشي في الشارع صباحاً. كل باب تمر به، صانع مسلم أو سرياني أو أرمني يُحييها.',
        },
      },
      {
        id: 'bench',
        icon: 'filigree-wire',
        title: {
          tr: 'Büyükannenin Tezgâhı',
          en: 'Grandmother\'s Bench',
          ar: 'منضدة الجدة',
        },
        body: {
          tr: 'Atölye küçüktür — bir oda, bir pencere, bir tezgâh. Tezgâhın yanında bir cam vitrin: içinde altmış yıldır biriktirilmiş eserler. En üstte büyükannesinin yüz yıllık bir kolyesi. Ayşe teyze telkâri öğrenirken ona ilk teli büyükannesi vermişti. "Bu tel 0,25 milimetredir," demişti. "Ama bir milimetrenin sadece dörtte biri değil. Sabrın ölçüsüdür." Ayşe teyze o günden beri her gün aynı kalınlıktaki teli işler. 53 yıl geçti.',
          en: 'The workshop is small — one room, one window, one bench. Beside the bench, a glass cabinet: sixty years of saved work inside. At the top, her grandmother\'s century-old necklace. When Ayşe was learning filigree, it was her grandmother who handed her her first wire. "This wire is 0.25 millimeters," she had said. "But it isn\'t just a quarter of a millimeter. It\'s a measure of patience." Aunt Ayşe has worked wire of that exact thickness every day since. 53 years have passed.',
          ar: 'الورشة غرفة صغيرة بنضدة وواجهة زجاج. في الأعلى قلادة جدتها عمرها 100 سنة. "هذا السلك 0.25 مم — ليس ربع ملم بل مقياس الصبر."',
        },
        pullquote: {
          tr: '"Tel dörtte bir milim değil — sabrın ölçüsüdür."',
          en: '"The wire isn\'t a quarter of a millimeter — it\'s a measure of patience."',
          ar: '"السلك ليس ربع ملم بل مقياس الصبر."',
        },
      },
      {
        id: 'three-motions',
        icon: 'filigree-wire',
        title: {
          tr: 'Üç Hareket, Binlerce Desen',
          en: 'Three Movements, Thousands of Patterns',
          ar: 'ثلاث حركات، آلاف النقوش',
        },
        body: {
          tr: 'Telkârinin tüm sırrı üç harekette: bükmek, sarmak ve lehimlemek. Bir teli doğru açıyla kırarsan bir yaprak. İki teli birbirine dolarsan bir gövde. Küçük bir gümüş damlasıyla iki parçayı birleştirirsen bir çiçek. Ayşe teyze sabah on ikiye kadar bir kolyenin tek bir yaprağını tamamlar. Sonra çay molası. Sonra ikinci yaprak. Binlerce yaprak birleşince bir desen olur. Ayşe\'nin kolyesinde 2.400 lehim noktası var.',
          en: 'The whole secret of filigree is in three movements: bending, winding and soldering. Bend a wire at the right angle — a leaf. Wrap two wires around each other — a stem. Join two pieces with a tiny silver bead — a flower. Aunt Ayşe completes a single leaf of one necklace by noon. Then a tea break. Then the second leaf. Thousands of leaves combined make a pattern. Ayşe\'s necklace holds 2,400 solder points.',
          ar: 'ثلاث حركات: ثني، لفّ، لحام. ورقة، ثم جذع، ثم زهرة. عائشة تُنجز ورقة واحدة حتى الظهر، ثم ثانية. قلادتها تحوي 2400 نقطة لحام.',
        },
      },
      {
        id: 'neighbors',
        icon: 'niello-pattern',
        title: {
          tr: 'Komşu Ustalar',
          en: 'The Neighbor Masters',
          ar: 'الصناع الجيران',
        },
        body: {
          tr: 'Ayşe teyzenin iki komşusu vardır. Sağındaki atölye: Süryani Hristiyan usta Yusuf. Savat (niello) sanatını baba-oğul üç kuşak yapıyor. Solundaki atölye: Ermeni kökenli Artin usta, mine (emaye) üzerinde çalışır. Üçünün atölyeleri arasında eski bir gelenek var. Büyük bir sipariş geldiğinde — bir düğün takımı, bir müzayede parçası — üçü birleşir. Ayşe teyzenin telkâri çerçevesine, Yusuf usta savat gölgesini, Artin usta minenin kırmızısını ekler. Mardin\'in sanatı bir kişinin işi değildir — üç dinin, üç geleneğin birlikte işidir.',
          en: 'Aunt Ayşe has two neighbors. The workshop to her right: Syriac Christian master Yusuf. Three generations, father to son, have worked niello there. To her left: Artin, of Armenian descent, works in enamel. Between their three workshops there\'s an old tradition. When a big commission comes — a wedding set, an auction piece — the three combine. To Ayşe\'s filigree frame, Master Yusuf adds the niello shadow, Master Artin the enamel\'s red. Mardin\'s art isn\'t one person\'s work — it\'s the work of three faiths, three traditions, together.',
          ar: 'جارة عائشة: يوسف السرياني (سواد) وأرتين الأرمني (مينا). ثلاث ورش معاً، ثلاث ديانات، ثلاث حرف — فن ماردين المشترك.',
        },
      },
      {
        id: 'apprentice',
        icon: 'filigree-wire',
        title: {
          tr: 'Yeni Bir Çırak',
          en: 'A New Apprentice',
          ar: 'متدرب جديد',
        },
        body: {
          tr: 'Salı sabahı. Ayşe teyzenin atölyesine on dört yaşında bir kız giriyor — Elif. Annesi Ayşe teyzenin dükkanında çalışırmış, şimdi kızı öğrenmek istiyor. Elif utanarak yaklaşıyor, ellerini arkasında tutuyor. Ayşe teyze cam vitrinini açıyor, en altta küçük bir sarı çekmece var. Oradan bir tel parçası çıkarıyor — 0,25 mm. "Bu tel büyükannemin bana verdiği telin aynısı," diyor. "Şimdi senin. Bir iş öğrenmeye değil, bir sabır öğrenmeye başlıyorsun. On yıl sonra kalfa olursun. Sonra isterseniz dünyaya kendi eserinle konuşursun." Elif eline telini alıyor. Mardin\'in bir sokağında, beş yüz yıllık bir zanaat yeni bir kalbe taşınıyor.',
          en: 'Tuesday morning. A 14-year-old girl enters Aunt Ayşe\'s workshop — Elif. Her mother worked in Ayşe\'s shop; now her daughter wants to learn. Elif approaches shyly, hands behind her back. Aunt Ayşe opens her glass cabinet, a small yellow drawer at the bottom. She pulls out a piece of wire — 0.25 mm. "This is the same wire my grandmother gave me," she says. "Now it\'s yours. You\'re starting not to learn a job, but to learn patience. In ten years you\'ll be a journeyman. After that, if you want, you\'ll speak to the world with your own work." Elif takes the wire in her hand. On a Mardin street, a 500-year craft moves into a new heart.',
          ar: 'ثلاثاء صباحاً. تدخل إيليف (14 سنة) الورشة. تفتح عائشة الدرج الأصفر وتُعطيها سلكاً 0.25 مم: "هذا السلك الذي أعطته جدتي لي. الآن لك". خمسمائة سنة من الفن تنتقل لقلب جديد.',
        },
      },
    ],
    takeaway: {
      tr: 'Bir zanaat sadece teknik değildir — insandan insana geçen bir söz, bir teldir. Mardin\'de bu söz bugün hâlâ aktarılıyor.',
      en: 'A craft isn\'t just technique — it\'s a word, a wire, passed from person to person. In Mardin that word is still being handed on today.',
      ar: 'الحرفة ليست فقط تقنية — بل كلمة وسلك يُسلّم من يد إلى يد. في ماردين، الكلمة لا تزال تُنقل.',
    },
    relatedExhibits: ['telkari', 'savat', 'mine'],
  },
];

import { enrichStory } from './_storyEnrichment.js';

// Faz 6-C: Tüm hikâyeler enrichment ile zenginleştirilir (immutable).
// `_stories_raw` yukarıda tanımlı; dışa aktarılan `stories` enriched versiyonudur.
export const stories = _stories_raw.map(enrichStory);

export function getStory(id) {
  return stories.find((s) => s.id === id);
}

export function getStoriesByExhibit(exhibitId) {
  return stories.filter((s) => (s.relatedExhibits || []).includes(exhibitId));
}
