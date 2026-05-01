import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RefreshCw, Trophy, PartyPopper } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { pick, cx } from '../utils/helpers.js';
import WorkshopHero from '../components/workshop/WorkshopHero.jsx';
import { CitationsFootnote, RelatedGrid } from '../components/museum/index.js';
import CuratorStoryNote from '../components/common/CuratorStoryNote.jsx';
import StoryTimeline from '../components/common/StoryTimeline.jsx';
import VocabularyChips from '../components/common/VocabularyChips.jsx';
import ContentBadges from '../components/common/ContentBadges.jsx';
import { enrichWorkshop } from '../data/_workshopEnrichment.js';
import { getSource } from '../data/sources.js';

/* ──────────────────────────────────────────────────────────────
   WorkshopHub — Faz 3 (base) + Faz 6-G (enrichment UI)

   Her atölyenin etrafına müze vitrini katmanı:
     - WorkshopHero (intro + origin + materials + safetyNote)    ÜSTTE
     - step-by-step walkthrough (mevcut, dokunulmadı)            ORTADA
     - CuratorStoryNote → Timeline → Vocabulary → RelatedGrid    ALTTA
     - CitationsFootnote                                         EN ALTTA

   Step body'leri DOKUNULMADI — Karar 1 disiplini.
   ────────────────────────────────────────────────────────────── */

// Faz 3 temel veri — step body'leri birebir korundu
const BASE_WORKSHOPS = [
  {
    id: 'hasir',
    emoji: '🧶',
    tone: '#7f8c8d',
    title: { tr: 'Trabzon Hasırı Nasıl Yapılır?', en: 'How to Make Trabzon Hasır', ar: 'كيفية صنع حصير طرابزون' },
    subtitle: { tr: '8 adımda Karadeniz\'in gümüş şaheseri.', en: 'The Black Sea\'s silver masterpiece in 8 steps.', ar: 'في 8 خطوات.' },
    steps: [
      { tr: { t: 'Gümüşü seç', d: '999 saf gümüş alınır. Karıştığı bakırın oranı ancak en son aşamada ayarlanır.' },
        en: { t: 'Choose the silver', d: 'Pure 999 silver is selected; alloying happens only at the end.' },
        ar: { t: 'اختيار الفضة', d: 'تُختار الفضة النقية.' } },
      { tr: { t: 'Teli ince ince çek', d: 'Hadde adı verilen aletle gümüş, kıl kalınlığına dek çekilir (0.2-0.3 mm).' },
        en: { t: 'Draw the wire', d: 'Silver is drawn to hair-thin (0.2-0.3 mm) using a draw plate.' },
        ar: { t: 'سحب السلك', d: 'يُسحب السلك إلى سماكة الشعرة.' } },
      { tr: { t: 'Küçük halkalar kes', d: 'Ucu zembereğe sarılan tel, keskin bir makasla tek tek halka haline getirilir.' },
        en: { t: 'Cut small rings', d: 'The wire is coiled and cut into individual rings with shears.' },
        ar: { t: 'قص الحلقات', d: 'يُقص السلك إلى حلقات صغيرة.' } },
      { tr: { t: 'Halkaları birleştir', d: 'Her halka bir öncekine geçirilir ve küçük alev ile uç kısımları kapatılır.' },
        en: { t: 'Link the rings', d: 'Each ring is linked to the last and closed with a small flame.' },
        ar: { t: 'ربط الحلقات', d: 'تربط الحلقات ببعضها.' } },
      { tr: { t: 'Örgüyü dik', d: 'Ustanın parmakları halkaları sabırla dokur. Bir saat içinde sadece birkaç santim ilerlenir.' },
        en: { t: 'Weave the pattern', d: 'The master weaves rings patiently — only a few centimeters per hour.' },
        ar: { t: 'نسج النمط', d: 'ينسج الأستاذ بصبر.' } },
      { tr: { t: 'Yüzeyi düzelt', d: 'Çekiç ve törpü ile örgü dümdüz edilir; her halka göz kırpar gibi sıkılanır.' },
        en: { t: 'Smooth the surface', d: 'Hammer and file flatten the weave; each ring is tightened.' },
        ar: { t: 'تنعيم السطح', d: 'يُنعم السطح بالمبرد.' } },
      { tr: { t: 'Parlat', d: 'Özel bez ve parlatma macunu ile eser ayna gibi ışıldar.' },
        en: { t: 'Polish', d: 'Specialty cloth and polish make the piece shine like a mirror.' },
        ar: { t: 'تلميع', d: 'يُلمّع حتى يلمع كالمرآة.' } },
      { tr: { t: 'Damga vur', d: 'Son olarak 925 ayar damgası ve ustanın imzası vurulur.' },
        en: { t: 'Stamp & sign', d: 'Finally, the 925 hallmark and the master\'s signature are stamped.' },
        ar: { t: 'الدمغ', d: 'يُدمغ بعيار 925.' } },
    ],
  },
  {
    id: 'telkari-usta',
    emoji: '🕸️',
    tone: '#8e44ad',
    title: { tr: 'Telkâri Ustası Ol', en: 'Become a Filigree Master', ar: 'كن أستاذ التلكاري' },
    subtitle: { tr: 'Mardin\'in dantel gibi gümüş sanatı — 6 adım.', en: 'Mardin\'s lace-like silver art in 6 steps.', ar: 'فن ماردين في 6 خطوات.' },
    steps: [
      { tr: { t: 'Çerçeveyi hazırla', d: 'Kalın gümüş telden desenin dış çerçevesi yapılır (5x5 cm gibi küçük bir alan).' },
        en: { t: 'Build the frame', d: 'A thicker silver wire forms the outer frame (around 5×5 cm).' },
        ar: { t: 'إعداد الإطار', d: 'سلك أثخن للإطار الخارجي.' } },
      { tr: { t: 'İnce teli hazırla', d: 'Ayrı bir gümüş tel saç teli kadar inceltilir ve düz bir yüzeyde "yıldız, çiçek, spiral" gibi desenler bükülür.' },
        en: { t: 'Prepare fine wire', d: 'A separate silver wire is drawn hair-thin and bent into stars, flowers and spirals.' },
        ar: { t: 'إعداد السلك الرفيع', d: 'يُسحب سلك دقيق.' } },
      { tr: { t: 'Desenleri yerleştir', d: 'İnce bükülmüş parçalar cımbızla çerçeve içine yerleştirilir.' },
        en: { t: 'Place patterns', d: 'The bent pieces are placed with tweezers inside the frame.' },
        ar: { t: 'وضع النماذج', d: 'تُوضع بالملقط.' } },
      { tr: { t: 'Lehimle', d: 'Gümüş lehim tozu serpilir, çok kısa bir alev verilir — parçalar birbirine kaynar.' },
        en: { t: 'Solder', d: 'Silver solder powder is sprinkled; a brief flame melts it and joins everything.' },
        ar: { t: 'اللحام', d: 'يُلحم باللهب.' } },
      { tr: { t: 'Sirkede yıka', d: 'Asit oranı düşük zayıf bir sirke banyosu, lehim lekelerini temizler.' },
        en: { t: 'Acid wash', d: 'A mild vinegar-acid bath cleans solder residues.' },
        ar: { t: 'غسل حمضي', d: 'حمام خفيف لإزالة آثار اللحام.' } },
      { tr: { t: 'Parlat ve sun', d: 'İnce parlatma ile dantel gibi bir eser ortaya çıkar.' },
        en: { t: 'Polish and present', d: 'A gentle polish reveals a lace-like masterpiece.' },
        ar: { t: 'تلميع', d: 'تلميع نهائي.' } },
    ],
  },
  {
    id: 'savat',
    emoji: '🖤',
    tone: '#935116',
    title: { tr: 'Siirt Savatı Nasıl Yapılır?', en: 'How to Make Siirt Niello', ar: 'كيف يُصنع سواد سيرت' },
    subtitle: { tr: 'Gümüşün üzerine siyah desen — 7 adımda 1000 yıllık sanat.', en: 'Black pattern on silver — 1,000 years of art in 7 steps.', ar: 'نقش أسود على الفضة — فن 1000 سنة في 7 خطوات.' },
    steps: [
      { tr: { t: 'Desen çiz', d: 'Gümüş yüzeye ince çelik kalemle geometrik, çiçek veya hat deseni çizilir.' },
        en: { t: 'Draw the pattern', d: 'A fine steel stylus traces a geometric, floral or calligraphic pattern onto silver.' },
        ar: { t: 'رسم النمط', d: 'يُرسم النمط على الفضة.' } },
      { tr: { t: 'Derinleştirerek oy', d: 'Kalın çelik burin ile çizgiler 0,3-0,5 mm derinliğe oyulur — niellonun dolacağı kanallar.' },
        en: { t: 'Engrave deeply', d: 'A thick steel burin deepens lines to 0.3–0.5 mm — the channels for niello.' },
        ar: { t: 'الحفر العميق', d: 'تُعمق الخطوط بالإزميل.' } },
      { tr: { t: 'Niello alaşımını hazırla', d: 'Gümüş, bakır, kurşun ve kükürt özel oranlarda potada eritilir, soğuyunca toz haline getirilir.' },
        en: { t: 'Prepare the alloy', d: 'Silver, copper, lead and sulfur melt in a crucible at set ratios, then are ground to fine powder when cool.' },
        ar: { t: 'تحضير السبيكة', d: 'فضة ونحاس ورصاص وكبريت.' } },
      { tr: { t: 'Bor asitle temizle', d: 'Oyulmuş yüzey, niello\'nun iyi akabilmesi için zayıf bor asitle yağdan arındırılır.' },
        en: { t: 'Clean with boric acid', d: 'The engraved surface is degreased with mild boric acid so niello can flow well.' },
        ar: { t: 'تنظيف بالحمض', d: 'إزالة الزيوت.' } },
      { tr: { t: 'Niello tozunu serp', d: 'Kanalların içine niello tozu serpilir, fazlası fırçayla süpürülür.' },
        en: { t: 'Sprinkle the powder', d: 'Niello powder is sprinkled into the channels; excess is brushed away.' },
        ar: { t: 'رش المسحوق', d: 'مسحوق النيلّو في القنوات.' } },
      { tr: { t: 'Alevle erit', d: 'Üfleme lambasıyla 400°C\'ye ısıtılır. Toz erir, siyah alaşım kanallara akar ve gümüşle moleküler düzeyde birleşir.' },
        en: { t: 'Melt with flame', d: 'A blowtorch heats to 400°C. Powder melts, the black alloy flows into channels and bonds at molecular level.' },
        ar: { t: 'الصهر', d: '400 درجة مئوية.' } },
      { tr: { t: 'Zımpara ve cilala', d: 'Taş bileme ile yüzey pürüzsüzleştirilir. Çıkıntılar beyaz gümüş, çukurlar kalıcı olarak siyah — 1000 yıl sonra bile aynı parlaklık.' },
        en: { t: 'Sand and polish', d: 'Stone-sanding smooths the surface. Ridges stay bright silver; hollows stay permanently black — the same shine 1,000 years later.' },
        ar: { t: 'الصنفرة والتلميع', d: 'لمعان يدوم ألف سنة.' } },
    ],
  },
  {
    id: 'mine',
    emoji: '🎨',
    tone: '#117a65',
    title: { tr: 'İstanbul Minesi Nasıl Yapılır?', en: 'How to Make Istanbul Enamel', ar: 'كيف تُصنع مينا اسطنبول' },
    subtitle: { tr: 'Metalin üzerine renkli cam — Bizans\'tan bize kalan altı adım.', en: 'Colored glass on metal — six steps from Byzantium to us.', ar: 'زجاج ملون على المعدن.' },
    steps: [
      { tr: { t: 'Metali hazırla', d: 'Bakır veya gümüş levha kesilir, kenarları temizlenir, yüzey tel fırça ile pürüzlendirilir (cam daha iyi tutsun).' },
        en: { t: 'Prepare the metal', d: 'Copper or silver sheet is cut, edges cleaned, surface roughened with wire brush for better glass adhesion.' },
        ar: { t: 'تحضير المعدن', d: 'نحاس أو فضة منظفة.' } },
      { tr: { t: 'Desen böl (cloisonné)', d: 'İnce gümüş veya altın teller, olmasını istediğin rengin sınırını çizecek şekilde yüzeye dikilir. Telin iki yanı iki ayrı renk olacak.' },
        en: { t: 'Divide with cloisons', d: 'Fine silver or gold wires are fixed to outline each color region. Either side of the wire will become a different color.' },
        ar: { t: 'تقسيم بالأسلاك', d: 'أسلاك تحد كل لون.' } },
      { tr: { t: 'Rengi seç, cam tozu ekle', d: 'Her telin arasına farklı renkte cam tozu eklenir. Kobalt mavi, bakır yeşil, demir kırmızı — renk tamamen metal oksitten gelir.' },
        en: { t: 'Place colored powder', d: 'Different colored glass powders go between the wires. Cobalt for blue, copper for green, iron for red — all color comes from metal oxides.' },
        ar: { t: 'وضع المسحوق', d: 'أكاسيد المعادن للألوان.' } },
      { tr: { t: 'Fırına koy', d: 'Parça 750-900°C\'deki fırına sürülür. Cam tozu erir ve metalle moleküler seviyede birleşir. Bir fırınlama 2-5 dakika sürer.' },
        en: { t: 'Kiln-fire', d: 'The piece enters a 750–900°C kiln. Glass powder melts and bonds with metal at molecular level. Each firing takes 2–5 minutes.' },
        ar: { t: 'الفرن', d: '750-900 درجة مئوية.' } },
      { tr: { t: 'Tekrar doldur ve pişir', d: 'Cam soğuyunca hafif çöker — boşluklar kalır. Yeniden toz eklenir, yeniden fırınlanır. 3-5 kez tekrar edilir.' },
        en: { t: 'Refill and refire', d: 'As glass cools it slightly sinks — gaps remain. More powder is added, kiln fired again. Repeat 3–5 times.' },
        ar: { t: 'تكرار', d: 'يتكرر 3-5 مرات.' } },
      { tr: { t: 'Taş cilası', d: 'Yüzey taş bileme ve parlatma kremi ile cam gibi pürüzsüzleşir. Sonsuza kadar solmaz — bu boya değil, kaynaşmış camdır.' },
        en: { t: 'Stone polish', d: 'Stone-sanding and polishing cream makes the surface glass-smooth. It never fades — this isn\'t paint, it\'s fused glass.' },
        ar: { t: 'التلميع', d: 'لا تبهت أبداً.' } },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // YENİ ATÖLYELER (Faz 7) — Raporun 2. bölümünden
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'kutahya-cini-kutu',
    emoji: '🏺',
    tone: '#1f4e8f',
    title: { tr: 'Kütahya Çinili Mücevher Kutusu', en: 'Kütahya Tile Jewelry Box', ar: 'صندوق مجوهرات بزخارف كوتاهيا' },
    subtitle: { tr: 'Mavi-beyaz Kütahya motifleriyle kendi kutunu tasarla — 8 adım.', en: 'Design your own box with blue-and-white Kütahya motifs — 8 steps.', ar: 'صمّم صندوقك بأنماط كوتاهيا الزرقاء والبيضاء.' },
    steps: [
      { tr: { t: 'Çini örneklerini incele', d: 'Gerçek Kütahya çini örnekleri görseline bak: lale, karanfil, rumi, rozet motifleri. Renk paleti: beyaz zemin, kobalt mavi, turkuvaz, mercan kırmızısı.' },
        en: { t: 'Study real tiles', d: 'Look at Kütahya tile images: tulip, carnation, rumi, rosette motifs. Palette: white base, cobalt blue, turquoise, coral red.' },
        ar: { t: 'ادرس الأمثلة الأصلية', d: 'لاحظ الزخارف والألوان.' } },
      { tr: { t: 'Kutunu hazırla', d: 'Karton bir mücevher kutusu al. Kenarları temiz, yüzeyi pürüzsüz olmalı. Ön kesimli şablon kullan — maket bıçağı yok.' },
        en: { t: 'Prepare the box', d: 'Take a cardboard jewelry box. Clean edges, smooth surface. Use a pre-cut template — no utility knives.' },
        ar: { t: 'حضّر الصندوق', d: 'صندوق كرتوني بحواف نظيفة.' } },
      { tr: { t: 'Motifi seç', d: 'Tek bir ana motif seç (lale, karanfil ya da rumi). Simetri planla: kutunun dört yüzünde nasıl tekrar edecek?' },
        en: { t: 'Choose one motif', d: 'Pick one main motif (tulip, carnation or rumi). Plan the symmetry — how does it repeat on the four sides?' },
        ar: { t: 'اختر زخرفة', d: 'زخرفة رئيسية واحدة.' } },
      { tr: { t: 'Eskiz çiz', d: 'Kurşun kalemle kutunun dışına desenin anahatlarını çiz. Çok bastırma — akrilik kalem üstüne kolayca kapatır.' },
        en: { t: 'Sketch in pencil', d: 'Trace the motif outline lightly in pencil. Don\'t press — acrylic covers it easily.' },
        ar: { t: 'ارسم بالقلم الرصاص', d: 'رسم خفيف.' } },
      { tr: { t: 'Renk kodu belirle', d: 'Çini geleneğinde "zemin" beyaz bırakılır; motif mavi/turkuvaz boyanır, küçük aksanlar kırmızı ya da yeşil olur. Üç rengi geçme.' },
        en: { t: 'Set the color code', d: 'In Kütahya tradition the background stays white; the motif is blue/turquoise, with small red or green accents. Keep to three colors.' },
        ar: { t: 'الألوان', d: 'خلفية بيضاء، زخرفة زرقاء.' } },
      { tr: { t: 'Boya', d: 'Akrilik kalemle sabırla boya. Büyük alanları önce, ince çizgileri sonra doldur. Her kat tamamen kurusun.' },
        en: { t: 'Paint', d: 'Patiently with acrylic markers. Large areas first, fine lines last. Let each layer dry completely.' },
        ar: { t: 'ارسم', d: 'بصبر واترك كل طبقة تجف.' } },
      { tr: { t: '"Taş kartı" yerleştir', d: 'Kutunun içine küçük bir kart: "Bu kutuda hangi taş saklanır? Neden onu seçtin?" Çocuğun kendi koleksiyon hikâyesi.' },
        en: { t: 'Add a "stone card"', d: 'Inside, a small card: "What stone lives in this box? Why this one?" The child\'s own collection story.' },
        ar: { t: 'بطاقة حجر', d: 'قصة الطفل عن حجره.' } },
      { tr: { t: 'Mini sergi etiketi', d: 'Kutunun altına müze etiketi yaz: başlık, tarih, motif adı, 2 cümle anlatı. Sınıf sergisinde yan yana dizilir.' },
        en: { t: 'Museum label', d: 'On the bottom, a museum label: title, date, motif name, 2-sentence narrative. Class exhibit lines them up.' },
        ar: { t: 'بطاقة متحفية', d: 'عنوان وقصة قصيرة.' } },
    ],
  },
  {
    id: 'eskisehir-lutasi',
    emoji: '🪨',
    tone: '#d4a017',
    title: { tr: 'Lületaşı Oyma Simülasyonu', en: 'Meerschaum Carving Simulation', ar: 'محاكاة نحت حجر البحر' },
    subtitle: { tr: 'Eskişehir\'in beyaz taşını sabun üzerinde dene — 8 adım.', en: 'Try Eskişehir\'s white stone on a soap blank — 8 steps.', ar: 'جرّب حجر بحر إسكيشهير على قالب صابون.' },
    steps: [
      { tr: { t: 'Lületaşını tanı', d: 'Lületaşı (sepiolit), Eskişehir\'de çıkan beyaz, gözenekli, çok yumuşak bir mineraldir (Mohs 2-2.5). İşlendiğinde renk alır, pipo ve figürlerde kullanılır.' },
        en: { t: 'Meet meerschaum', d: 'Meerschaum (sepiolite) is a white, porous, very soft mineral (Mohs 2-2.5) mined in Eskişehir. It takes color when worked; used in pipes and figurines.' },
        ar: { t: 'ما هو حجر البحر؟', d: 'معدن أبيض مسامي ناعم من إسكيشهير.' } },
      { tr: { t: 'Güvenli malzeme seç', d: 'Gerçek lületaşı yerine yumuşak sabun ya da hava kuruyan kil kullan. Aynı yumuşaklığa yakın, çok daha güvenli.' },
        en: { t: 'Choose a safe material', d: 'Use soft soap or air-dry clay instead of real meerschaum. Similar softness, much safer.' },
        ar: { t: 'مادة آمنة', d: 'صابون بدل الحجر الحقيقي.' } },
      { tr: { t: 'Taslak çiz', d: 'Oyma planını kâğıda çiz: hayvan başı, çiçek, geometrik form... Basit bir siluetle başla.' },
        en: { t: 'Sketch the plan', d: 'Draw the carving plan on paper: animal head, flower, geometric form... Start with a simple silhouette.' },
        ar: { t: 'ارسم الخطة', d: 'صورة ظلية بسيطة.' } },
      { tr: { t: 'Dış formu işaretle', d: 'Plastik oyma çubuğu veya kürdanla sabunun dış hatlarını çiz. Metal bıçak YOK.' },
        en: { t: 'Mark the outline', d: 'Trace the outer silhouette on the soap with a plastic carving stick or toothpick. No metal blades.' },
        ar: { t: 'علّم الخط الخارجي', d: 'بأداة بلاستيكية.' } },
      { tr: { t: 'Dışarıdan içeri oy', d: 'Küçük, sabırlı hareketlerle fazla sabunu uzaklaştır. Her hareketi kontrol et — derinlik bir milimetreyi geçmesin.' },
        en: { t: 'Carve outside-in', d: 'Remove material with small, patient motions. Control every stroke — stay within one millimeter.' },
        ar: { t: 'انحت من الخارج', d: 'حركات صغيرة.' } },
      { tr: { t: 'Detayları ekle', d: 'Son adımda yüz, yapraklar, doku gibi detayları daha ince uçla işle. Yavaş ve hafif.' },
        en: { t: 'Add detail', d: 'Finally, add face, leaves, texture with a finer tip. Slow and light.' },
        ar: { t: 'أضف التفاصيل', d: 'ببطء وبأداة أدق.' } },
      { tr: { t: 'Yüzeyi yumuşat', d: 'Nemli parmağınla ya da ıslak zımpara süngeriyle yüzeydeki izleri hafifçe yumuşat. Toz oluşursa nemli bez kullan.' },
        en: { t: 'Smooth the surface', d: 'Gently smooth marks with a damp finger or wet sanding sponge. If dust forms, use a damp cloth.' },
        ar: { t: 'نعّم السطح', d: 'إصبع مبلل.' } },
      { tr: { t: 'Jeolojik etiket', d: 'Eserin yanına etiket yaz: "Lületaşı nerede bulunur? Neden bu kadar yumuşak? Çevredeki iklim ve aşınma nasıl rol oynar?" (COĞ.10.3.2)' },
        en: { t: 'Geological label', d: 'Add a label: "Where is meerschaum found? Why so soft? How do climate and weathering shape it?" (COĞ.10.3.2)' },
        ar: { t: 'بطاقة جيولوجية', d: 'مكان الحجر ودور المناخ.' } },
    ],
  },
  {
    id: 'elmas-kagit-model',
    emoji: '💎',
    tone: '#5dade2',
    title: { tr: 'Brilliant Kesim Kâğıt Modeli', en: 'Brilliant Cut Paper Model', ar: 'نموذج ورقي لقطع البريليانت' },
    subtitle: { tr: 'Pırlanta kesiminin geometrisini kendi elinle inşa et — 8 adım.', en: 'Build the geometry of a diamond cut with your own hands — 8 steps.', ar: 'ابنِ هندسة قطع الماس بيديك.' },
    steps: [
      { tr: { t: 'Kesim anatomisini oku', d: 'Brilliant kesimde üç ana bölge var: TAÇ (üst, 33 fasetli), KUŞAK (orta, ince şerit), PAVYON (alt, 24 fasetli konik). Işık buradan girer, pavyondan yansır, taçtan çıkar.' },
        en: { t: 'Learn the anatomy', d: 'A brilliant cut has three main zones: CROWN (top, 33 facets), GIRDLE (middle, thin band), PAVILION (bottom, 24-facet cone). Light enters, reflects in the pavilion, exits through the crown.' },
        ar: { t: 'تعلّم التشريح', d: 'التاج والحزام والبافيليون.' } },
      { tr: { t: 'Açınımı yazdır', d: 'Öğretmen materyal klasöründen "brilliant açınım şablonu"nu (letter boyutta) yazdır. Kalın karton kâğıda yapıştırılsın.' },
        en: { t: 'Print the template', d: 'From the teacher pack, print the "brilliant unfold template" (letter size). Glue onto cardstock.' },
        ar: { t: 'اطبع القالب', d: 'ألصقه على كرتون.' } },
      { tr: { t: 'Açınımı kes', d: 'Makasla dış kenarları dikkatlice kes. Kat çizgileri kalınlıkta olmalı, tam üstlerinden değil.' },
        en: { t: 'Cut out', d: 'Cut the outer edges carefully with scissors. Fold lines should be just beside, not through the marks.' },
        ar: { t: 'قص الشكل', d: 'بحذر.' } },
      { tr: { t: 'Kat izlerini yap', d: 'Kalın iz atmak için cetvel ve kapalı kalem ucu kullan. Her kat önce dışa, sonra içe bükülerek yumuşatılır.' },
        en: { t: 'Score the folds', d: 'Use a ruler and a closed pen tip to score each fold. Bend each one outward, then inward to soften it.' },
        ar: { t: 'علّم الطيات', d: 'بمسطرة وقلم.' } },
      { tr: { t: 'Pavyonu kapat', d: 'Konik alt kısmı önce birleştir: 24 yüzey bir noktada buluşmalı (kulet). Yapıştırıcıyı içeriden sürmek daha temiz.' },
        en: { t: 'Close the pavilion', d: 'Assemble the cone bottom first: 24 facets meet at a single point (culet). Apply glue from the inside for a clean look.' },
        ar: { t: 'أغلق البافيليون', d: '24 وجهاً تلتقي في نقطة.' } },
      { tr: { t: 'Tacı birleştir', d: 'Üst kısmın 33 fasetini de yapıştır. "Table" adı verilen üst düz alan en genişidir ve yatay durmalı.' },
        en: { t: 'Assemble the crown', d: 'Glue the 33 facets of the upper half. The top flat area called the "table" is widest and must sit horizontal.' },
        ar: { t: 'اجمع التاج', d: 'السطح المسطح أفقياً.' } },
      { tr: { t: 'Işıkla dene', d: 'Bir fener ya da telefon feneri ile modeli aydınlat. Farklı açılardan bak. Işık pavyondan nasıl yansıyor? Tabloya not al.' },
        en: { t: 'Light it up', d: 'Shine a flashlight/phone torch on the model. Look from various angles. How does light reflect in the pavilion? Log in the table.' },
        ar: { t: 'سلط الضوء', d: 'شاهد الانعكاس.' } },
      { tr: { t: '4C kartı doldur', d: 'Modelin: KESİM (cut) kalitesi nasıl? KARAT eşdeğeri? RENK? BERRAKLIK? Sınıfta sun.' },
        en: { t: 'Fill the 4C card', d: 'How is the CUT quality? CARAT equivalent? COLOR? CLARITY? Present to the class.' },
        ar: { t: 'بطاقة 4C', d: 'عرض أمام الفصل.' } },
    ],
  },
  {
    id: 'kristal-yetistirme',
    emoji: '🧂',
    tone: '#8e44ad',
    title: { tr: 'Kristal Yetiştirme Günlüğü', en: 'Crystal Growing Diary', ar: 'دفتر زراعة البلورات' },
    subtitle: { tr: 'Şeker ya da şapla kendi ametistini büyüt — 1 ders + 1 hafta.', en: 'Grow your own amethyst-like crystal with sugar or alum — 1 class + 1 week.', ar: 'ازرع بلورتك — درس واحد وأسبوع مراقبة.' },
    steps: [
      { tr: { t: 'Kristal nedir?', d: 'Kristal, atom/molekülleri düzenli, tekrarlayan bir örüntüde yerleşmiş katıdır. Ametist mor kuvars; onun iç yapısı milyonlarca kez tekrarlanan altıgen bir hücredir.' },
        en: { t: 'What is a crystal?', d: 'A crystal is a solid whose atoms sit in a regular, repeating pattern. Amethyst is purple quartz — its inside is a hexagonal unit repeating millions of times.' },
        ar: { t: 'ما البلورة؟', d: 'نمط ذري منتظم مكرر.' } },
      { tr: { t: 'Malzeme hazırla', d: 'Temiz kavanoz, sıcak su, şeker (ya da şap), ip, tahta çubuk, gözlem defteri. Öğretmen suyu hazırlar — sıcak.' },
        en: { t: 'Prepare materials', d: 'Clean jar, hot water, sugar (or alum), string, wooden stick, observation log. Teacher handles hot water.' },
        ar: { t: 'حضّر الأدوات', d: 'برطمان وخيط وسكر.' } },
      { tr: { t: 'Doymuş çözelti yap', d: 'Sıcak suya kaşık kaşık şeker ekle ve karıştır. Artık eriyemez hale geldiğinde ("doymuş"), durursun.' },
        en: { t: 'Make a saturated solution', d: 'Add sugar to hot water spoonful by spoonful, stirring. When no more dissolves ("saturated"), stop.' },
        ar: { t: 'محلول مشبع', d: 'سكر حتى لا يذوب أكثر.' } },
      { tr: { t: 'Tohum kristal bağla', d: 'İpin ucuna ya bir iri şeker tanesi bağla ya da ipi şeker tozuna batır-çıkar (tohum oluşur). İp, kavanoza daldırılınca dibine değmemeli.' },
        en: { t: 'Seed the string', d: 'Tie a large sugar crystal to the string, or dip the string in sugar powder (a seed forms). When hung in the jar, it must not touch the bottom.' },
        ar: { t: 'بذرة بلورة', d: 'ربّط حبة سكر بالخيط.' } },
      { tr: { t: 'Kavanozu sabit tut', d: 'Kavanoz titremeyen, sıcaklığı düzenli bir yere konur. Pencere önü değil — sıcaklık değişimi kristalleri bozar.' },
        en: { t: 'Keep the jar still', d: 'Place in a stable, room-temperature spot. Not by a window — temperature swings ruin crystals.' },
        ar: { t: 'ثبّت البرطمان', d: 'في درجة حرارة ثابتة.' } },
      { tr: { t: 'Günlük gözlem', d: 'Her gün aynı saatte: kristal büyüklüğünü çiz, fotoğrafla, boyutu milimetreyle ölç. Sayfaya tarih ve saat yaz.' },
        en: { t: 'Daily observation', d: 'Same hour each day: sketch the crystal, photograph it, measure in millimeters. Record date and time.' },
        ar: { t: 'مراقبة يومية', d: 'رسم وقياس.' } },
      { tr: { t: 'Bir hafta sonra ölç', d: 'Yedinci günün sonunda kristali çıkar, kağıt havluyla kurut, son ölçümü yap. Başlangıçtan kaç kat büyüdü?' },
        en: { t: 'After one week, measure', d: 'At day 7 remove the crystal, pat dry, make a final measurement. By how many times did it grow?' },
        ar: { t: 'بعد أسبوع', d: 'قياس نهائي.' } },
      { tr: { t: 'Rapor yaz', d: 'Laboratuvar defteri: "Hipotezim neydi? Gerçekleşti mi? Atomlar suya nasıl dizildi? Doğadaki ametistler de böyle mi oluşur — ama milyonlarca yılda?"' },
        en: { t: 'Write a report', d: 'Lab notebook: "What was my hypothesis? Did it come true? How did the atoms arrange themselves? Is this how amethyst forms in nature — but over millions of years?"' },
        ar: { t: 'اكتب تقريراً', d: 'الفرضية والنتيجة.' } },
    ],
  },
  {
    id: 'uv-floresans',
    emoji: '💡',
    tone: '#7d3c98',
    title: { tr: 'UV Floresans Dedektifi', en: 'UV Fluorescence Detective', ar: 'محقق فلورسنس UV' },
    subtitle: { tr: 'Mor ışık altında hangi taşlar parlıyor? — 7 adım.', en: 'Which stones glow under purple light? — 7 steps.', ar: 'أي الأحجار يتوهج تحت UV؟' },
    steps: [
      { tr: { t: 'UV nedir?', d: 'Mor ışığın ötesinde gözün göremediği bir ışık türü: ultraviyole (UV). Bazı maddeler UV\'yi emip görünür ışık olarak geri yayar — buna "floresans" denir.' },
        en: { t: 'What is UV?', d: 'A light beyond violet that the eye can\'t see: ultraviolet (UV). Some materials absorb UV and re-emit visible light — called "fluorescence".' },
        ar: { t: 'ما هو UV؟', d: 'ضوء فوق البنفسجي لا تراه العين.' } },
      { tr: { t: 'Güvenlik', d: 'UV ışığı asla göze tutulmaz. Elle bile doğrudan tutma. Kısa süreli kullan ve kutunun içine odakla.' },
        en: { t: 'Safety', d: 'Never shine UV into eyes. Don\'t hold it directly in your hand. Keep use brief and focused inside the box.' },
        ar: { t: 'السلامة', d: 'لا تسلطه على العين أبداً.' } },
      { tr: { t: 'Hipotez yaz', d: 'Test edeceğin 5 nesneyi listele (fosforlu kalem, tonik su, diş macunu, taş örneği, kağıt). Her biri için tahmin: parlar mı, parlamaz mı?' },
        en: { t: 'Hypothesize', d: 'List 5 items to test (highlighter, tonic water, toothpaste, stone sample, paper). Predict for each: glow or no glow?' },
        ar: { t: 'تنبؤات', d: 'سجّل تخميناتك.' } },
      { tr: { t: 'Karanlık kutu yap', d: 'Ayakkabı kutusuna bir yandan bakış deliği aç. UV feneri öbür taraftan tut. Oda ışığını kapat.' },
        en: { t: 'Build a dark box', d: 'Cut a viewing hole in a shoebox. UV flashlight from the other side. Room lights off.' },
        ar: { t: 'صندوق مظلم', d: 'علبة أحذية بفتحة نظر.' } },
      { tr: { t: 'Sırayla dene', d: 'Her nesneyi tek tek kutuya koy, UV\'yi aç, parlamayı 1-5 arasında puanla (1: hiç, 5: çok parlak). Sonucu tabloya yaz.' },
        en: { t: 'Test one by one', d: 'Place each item in the box, flick UV on, rate glow 1-5 (1 none, 5 bright). Record in the table.' },
        ar: { t: 'اختبار فردي', d: 'قيّم الوهج 1-5.' } },
      { tr: { t: 'Taşlarla karşılaştır', d: 'Fluorit güçlü mor ışıkta parlar. Elmas mavi parlayabilir. Yakut kırmızı parlar. Senin örneğinde ne oldu?' },
        en: { t: 'Compare with stones', d: 'Fluorite glows strongly under UV. Diamond can glow blue. Ruby glows red. What did yours do?' },
        ar: { t: 'قارن بالأحجار', d: 'فلوريت، ماس، ياقوت.' } },
      { tr: { t: 'Gemologla bağlan', d: 'Bu test gemolog laboratuvarlarında "UV floresans testi" olarak kullanılır. Raporunda tespit ettiğin bulguları listele ve kaynakla bağla.' },
        en: { t: 'Link to the gemologist', d: 'This is called a "UV fluorescence test" in gemological labs. In your report list findings and tie them to source.' },
        ar: { t: 'اربط بالجيمولوجي', d: 'اسم الاختبار الحقيقي.' } },
    ],
  },
  {
    id: 'yogunluk-dedektif',
    emoji: '⚖️',
    tone: '#16a085',
    title: { tr: 'Yoğunlukla Taş Dedektifi', en: 'Density Stone Detective', ar: 'محقق كثافة الأحجار' },
    subtitle: { tr: 'Su yer değiştirmesi ile bilinmeyen taşı bul — 8 adım.', en: 'Find the unknown stone by water displacement — 8 steps.', ar: 'اكتشف الحجر بإزاحة الماء.' },
    steps: [
      { tr: { t: 'Yoğunluk nedir?', d: 'Yoğunluk = kütle ÷ hacim (g/cm³). İki taş aynı boyutta olabilir ama biri diğerinden ağır olabilir — farkı yoğunluk yapar.' },
        en: { t: 'What is density?', d: 'Density = mass ÷ volume (g/cm³). Two stones may be the same size but one heavier — that\'s density.' },
        ar: { t: 'ما الكثافة؟', d: 'الكتلة ÷ الحجم.' } },
      { tr: { t: 'Referans tablosunu hazırla', d: 'Su 1.0, kuvars 2.65, zümrüt 2.72, ametist 2.65, safir 4.0, pırlanta 3.52, altın 19.3 g/cm³. Sınıfta görünür bir yere as.' },
        en: { t: 'Prepare the reference', d: 'Water 1.0, quartz 2.65, emerald 2.72, amethyst 2.65, sapphire 4.0, diamond 3.52, gold 19.3 g/cm³. Post it visibly.' },
        ar: { t: 'جدول مرجعي', d: 'ماء، كوارتز، صفير...' } },
      { tr: { t: 'Malzeme hazırla', d: 'Dijital tartı (0.01 g hassas), plastik mezür (cam değil — düşmeye karşı), su, taş örnekleri, havlu.' },
        en: { t: 'Materials', d: 'Digital scale (0.01 g), plastic graduated cylinder (not glass), water, stone samples, towel.' },
        ar: { t: 'الأدوات', d: 'ميزان ومخبار بلاستيكي.' } },
      { tr: { t: 'Taşı tart', d: 'Tartıyı sıfırla. Taşı koy ve gramajı yaz. Yaklaşık 5-10 gramlık örnekler daha iyi okunur.' },
        en: { t: 'Weigh the stone', d: 'Zero the scale, place the stone, record grams. Samples of 5-10 g read better.' },
        ar: { t: 'زن الحجر', d: 'سجّل الوزن.' } },
      { tr: { t: 'Su seviyesi oku', d: 'Mezüre 30-50 ml su koy. Meniskusun altından bak ve başlangıç hacmini yaz.' },
        en: { t: 'Read water level', d: 'Pour 30-50 ml into the cylinder. Read under the meniscus, record starting volume.' },
        ar: { t: 'مستوى الماء', d: 'تحت الهلال.' } },
      { tr: { t: 'Taşı batır', d: 'Taşı dikkatlice suya bırak (sıçrama olmasın). Su seviyesinin yeni değerini oku. Fark = taşın hacmi.' },
        en: { t: 'Submerge', d: 'Gently drop in the stone (no splash). Read the new level. Difference = stone volume.' },
        ar: { t: 'غمر الحجر', d: 'فرق المستوى = الحجم.' } },
      { tr: { t: 'Yoğunluğu hesapla', d: 'Yoğunluk = gram ÷ cm³. Sonucu referans tablosuyla karşılaştır. Hangi taşa en yakın?' },
        en: { t: 'Calculate density', d: 'Density = grams ÷ cm³. Compare to the reference. Which stone is closest?' },
        ar: { t: 'احسب الكثافة', d: 'قارن بالجدول.' } },
      { tr: { t: 'Tabloyu yorumla', d: 'Sınıfta beş farklı bilinmeyen taş varsa, her grubun ölçümünü tahtaya yaz. Grafik çiz. Hangi testler birbirini destekliyor?' },
        en: { t: 'Interpret the data', d: 'If the class has five unknowns, post every group\'s number on the board. Draw a graph. Which tests reinforce each other?' },
        ar: { t: 'تفسير البيانات', d: 'رسم بياني.' } },
    ],
  },
];

// Faz 6-G: Her atölyeyi enrichment ile birleştir (immutable)
const workshops = BASE_WORKSHOPS.map(enrichWorkshop);

export default function WorkshopHub() {
  const { t, locale } = useLocale();
  const [searchParams] = useSearchParams();
  const initialId =
    searchParams.get('id') &&
    workshops.some((w) => w.id === searchParams.get('id'))
      ? searchParams.get('id')
      : workshops[0].id;
  const [activeId, setActiveId] = useState(initialId);
  const [step, setStep] = useState(0);
  const active = workshops.find((w) => w.id === activeId);

  const selectWorkshop = (id) => {
    setActiveId(id);
    setStep(0);
  };

  // ─── Footnote aggregation (6-G) ───────────────────────────
  const { citeMap, footnoteEntries } = useMemo(() => {
    if (!active) return { citeMap: {}, footnoteEntries: [] };
    const order = [];
    const map = {};

    const addId = (id) => {
      if (!id || map[id]) return;
      if (!getSource(id)) return;
      order.push(id);
      map[id] = order.length;
    };

    if (Array.isArray(active.curatorNote?.cite)) {
      active.curatorNote.cite.forEach(addId);
    }
    if (Array.isArray(active.timeline)) {
      for (const t of active.timeline) {
        if (Array.isArray(t.cite)) t.cite.forEach(addId);
      }
    }
    if (Array.isArray(active.sources)) active.sources.forEach(addId);

    const entries = order.map((id, i) => ({ n: i + 1, source: getSource(id) }));
    return { citeMap: map, footnoteEntries: entries };
  }, [active]);

  const totalSteps = active.steps.length;
  const done = step >= totalSteps - 1;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
        {t('workshop.title')}
      </h1>
      <p className="text-ink/60 mb-8">{t('workshop.subtitle')}</p>

      {/* Workshop picker */}
      <div className="flex flex-wrap gap-2 mb-8">
        {workshops.map((w) => (
          <button
            key={w.id}
            onClick={() => selectWorkshop(w.id)}
            className={cx(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold border transition',
              w.id === activeId
                ? 'text-cream shadow-museum'
                : 'bg-white text-ink/80 border-ink/10 hover:border-ink/30',
            )}
            style={w.id === activeId ? { background: w.tone, borderColor: w.tone } : undefined}
          >
            <span>{w.emoji}</span>
            {pick(w.title, locale)}
          </button>
        ))}
      </div>

      {/* Active workshop card */}
      <div
        className="rounded-[2.5rem] p-6 sm:p-8 border shadow-museum"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${active.tone} 10%, white), white)`,
          borderColor: `color-mix(in srgb, ${active.tone} 25%, transparent)`,
        }}
      >
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
          {pick(active.title, locale)}
        </h2>
        <p className="text-ink/60 mb-3 mt-1">{pick(active.subtitle, locale)}</p>

        {/* Faz 7: yaş, süre, zorluk, MEB kazanım etiketleri */}
        <ContentBadges
          type="workshop"
          id={active.id}
          showCurriculum
          className="mb-5"
        />

        {/* Faz 6-G: Hero — intro + origin + materials + safetyNote */}
        <WorkshopHero
          intro={active.intro}
          origin={active.origin}
          materials={active.materials}
          safetyNote={active.safetyNote}
          tone={active.tone}
          locale={locale}
        />

        {/* Step progress dots */}
        <div className="flex flex-wrap items-center gap-2 mb-6 mt-4 pt-4 border-t border-ink/8">
          {active.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}`}
              className={cx(
                'h-2.5 rounded-full transition-all',
                i === step ? 'w-10' : 'w-2.5',
              )}
              style={{
                background: i <= step ? active.tone : '#1b284520',
              }}
            />
          ))}
        </div>

        {/* Step body (mevcut, dokunulmadı) */}
        <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl ring-8 ring-white/60 shadow-sm mx-auto md:mx-0"
            style={{ background: `color-mix(in srgb, ${active.tone} 20%, white)` }}
          >
            {active.emoji}
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest font-extrabold" style={{ color: active.tone }}>
              {t('workshop.step', { n: step + 1 })} / {totalSteps}
            </span>
            <h3 className="font-display text-2xl font-extrabold text-ink mt-1 mb-2 animate-fadeUp">
              {pick(active.steps[step], locale).t}
            </h3>
            <p className="text-ink/75 leading-relaxed animate-fadeUp">
              {pick(active.steps[step], locale).d}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-3 py-2 rounded-full bg-ink/5 text-ink/70 font-bold hover:bg-ink/10 inline-flex items-center gap-1 disabled:opacity-40"
              >
                <ChevronLeft size={14} /> {t('workshop.prev')}
              </button>
              <button
                onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
                disabled={done}
                className="px-4 py-2 rounded-full text-cream font-extrabold inline-flex items-center gap-1 disabled:opacity-40"
                style={{ background: active.tone }}
              >
                {t('workshop.next')} <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setStep(0)}
                className="ml-auto text-xs font-bold text-ink/50 hover:text-ink inline-flex items-center gap-1"
              >
                <RefreshCw size={12} /> {t('workshop.reset')}
              </button>
            </div>

            {done && (
              <div className="mt-6 rounded-2xl p-4 bg-gold-soft border border-gold/30 animate-popIn flex items-center gap-3">
                <PartyPopper className="text-gold" />
                <div>
                  <div className="font-display font-extrabold text-ink">
                    {t('workshop.complete')}
                  </div>
                  <div className="text-xs text-ink/60">
                    <Trophy size={12} className="inline -mt-0.5 mr-1" />
                    {{
                      tr: 'Başarımlar sekmesinde ilerlemeni görebilirsin.',
                      en: 'Check your progress on the Achievements tab.',
                      ar: 'تابع تقدمك في قسم الإنجازات.',
                    }[locale] || 'Başarımlar sekmesinde ilerlemeni görebilirsin.'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          Faz 6-G alt-paneli
          ═══════════════════════════════════════════════ */}

      {/* CURATOR NOTE */}
      {active?.curatorNote && (
        <CuratorStoryNote
          note={active.curatorNote}
          locale={locale}
          citeMap={citeMap}
        />
      )}

      {/* TIMELINE */}
      {Array.isArray(active?.timeline) && active.timeline.length > 0 && (
        <StoryTimeline
          items={active.timeline}
          locale={locale}
          citeMap={citeMap}
        />
      )}

      {/* VOCABULARY */}
      {Array.isArray(active?.vocabulary) && active.vocabulary.length > 0 && (
        <VocabularyChips
          termIds={active.vocabulary}
          locale={locale}
          title={{
            tr: 'Bu atölyede geçen sözlük',
            en: 'Glossary in this workshop',
            ar: 'قاموس هذه الورشة',
          }}
        />
      )}

      {/* RELATED GRID */}
      {active && (
        <div className="mt-10">
          <RelatedGrid
            exhibitIds={active.relatedExhibits || []}
            storyIds={active.relatedStories || []}
            labIds={active.relatedLabs || []}
            quizCatIds={active.relatedQuizzes || []}
            locale={locale}
          />
        </div>
      )}

      {/* CITATIONS FOOTNOTE */}
      {footnoteEntries.length > 0 && (
        <div className="mt-10">
          <CitationsFootnote entries={footnoteEntries} locale={locale} />
        </div>
      )}
    </div>
  );
}
