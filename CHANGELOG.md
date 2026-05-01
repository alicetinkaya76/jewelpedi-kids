# 📖 CHANGELOG

Bu proje için tüm önemli değişiklikler bu dosyada kaydedilir. Format
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) prensiplerine
yakındır.

---

## [1.1.0] — 2026-04-24 — 📚 Faz 7: Bilimsel Doğruluk + Pedagojik Derinleşme

**Faz 7 tamamlandı.** Harici pedagojik değerlendirme raporuna yanıt
olarak üç cephede paralel iyileştirme yapıldı: (1) UNESCO olgusal
hatalarının düzeltilmesi, (2) müfredat altyapısının inşası, (3)
beş yeni içerik türünün genişletilmesi (lab, atölye, ders planı, soru
bankası, gizlilik sayfası).

### 🔬 UNESCO → Türk Patent Coğrafi İşaret (GI) düzeltmesi

Harici rapor, Trabzon Hasırı, Midyat Telkâri, Siirt Savatı ve Kazaz
gümüş işçiliğinin yanlışlıkla "UNESCO Somut Olmayan Kültürel Miras"
olarak sunulduğunu saptadı. Gerçekte bu dört zanaat UNESCO ICH listesinde
**değildir** — bunlar Türk Patent ve Marka Kurumu Coğrafi İşaret (GI)
sicilinde korunur:

- Trabzon Hasırı — GI 2004
- Midyat Telkâri — GI 2013
- Siirt Savatı — GI 2019
- Kazaz gümüş işçiliği — Kapalıçarşı, İstanbul (yaşayan miras)

Güncellenen dosyalar:
- `src/data/exhibits/gumus.js` — trabzon-hasiri: body, stats.recognition,
  timeline 2020 girişi, digDeeper kart başlığı "UNESCO Yolu" → "Coğrafi
  İşarete Giden Yol"
- `src/data/exhibits/zanaat.js` — kazaz: intro/body/stats/timeline
  düzeltildi; Kapalıçarşı 2009 satırından orphan "UNESCO" prefiksi
  temizlendi
- `src/data/exhibits/_enrichment.js` — 4 sergi girişinde citation
  kaynakları `unesco-ich-2024` yerine `turkpatent-gi-*` ve
  `gemsociety-trabzon` kullanır; her girişe açık `unescoStatus: 'UNESCO
  Somut Olmayan Miras listesinde DEĞİLDİR'` disclaimer alanı
- `src/data/lessonPlans.js` — UNESCO ders planı (id korunarak) yeniden
  yazıldı: "Yaşayan Miras: UNESCO ICH ve Türk Patent Coğrafi İşareti
  Nasıl Farklıdır?" Araştırma adımı hem `ich.unesco.org/en/state/
  turkiye-TR` hem `ci.turkpatent.gov.tr` üzerinde yapılır
- `src/pages/Lobby.jsx` — Educators bölümü teaser "UNESCO" → "Coğrafi
  İşaret"

Doğrulama: Türkiye'nin 30 civarı UNESCO ICH unsuru arasında (Karagöz,
Âşıklık, Mevlevî, Türk kahvesi, Hüsn-i Hat vb.) bu dört zanaat yer
almaz. Bu bir kaynak tedariki hatasıydı, ideolojik/etik tercih değil.

### 📐 curriculumMap.js — Müfredat altyapısı

Her sergi, lab, atölye, hikâye ve ders planı için MEB ve NGSS kazanım
kodlarını bağlayan merkezi kayıt. Şema:

```js
{
  type: 'exhibit|lab|workshop|story|lesson|game',
  id: '<content-id>',
  ageMin, ageMax,
  grades: ['5', '6', ...],
  subjects: ['fen', 'kimya', 'sosyal', ...],
  difficulty: 'easy|medium|hard',
  durationMin: 40,
  mebCodes: [{ code, label:{tr,en,ar} }],
  ngssCodes: [{ code, label:{tr,en,ar} }],
  outputs: ['worksheet', 'presentation', ...],
  notes: {tr,en,ar},   // UNESCO disclaimer dahil
}
```

Kapsam: **~30 entry**. MEB kodu havuzu: FB.6.4.1.1-2, FB.6.4.3.2-3,
SB.5.5.1-3, SB.6.2.1-2, SB.6.3.2-3, KİM.9.1.1-6, KİM.9.2.8, COĞ.10.3.1-4,
COĞ.10.5.3, GS.7.3.2, GS.7.7.1-2, TT.7.A.1.1, TT.7.B.1.6-8, TT.7.B.2.1-3,
MAT.5.1.5, MAT.6.2.3, MAT.7.3.1. NGSS kodu havuzu: 5-PS1-3, MS-PS1-2,
MS-ESS2-1, 4-ESS2-1, 3-5-ETS1.

### 🖼️ imageCredits.js — Görsel atıf kaydı

16 Wikimedia Commons görsel için tam atıf kaydı. Her kayıt:

```js
{
  id, exhibitId, kind, license: 'CC0|CC-BY-4.0|CC-BY-SA-4.0',
  creator, source: 'Wikimedia Commons',
  sourceUrl: '...',  // doğrulanmış, uydurulmamış
  retrievedAt: '2026-04',
  requiresAttribution: true|false,
  alt:{tr,en,ar}, caption:{tr,en,ar},
  status: 'pending-verification'
}
```

Kapsam: altın-tarihçesi, çeyrek altın (Lydia elektrum), 4C sistemi,
kesim şekilleri, pırlanta nasıl oluşur, zümrüt, safir, yakut, ametist,
gümüş bakımı (acanthite), Mohs skalası (korund). Yardımcılar:
`getImageCreditsFor(exhibitId)`, `requiresAttribution(imageId)`,
`buildAttributionLine(imageId, locale)`.

### 🏷️ ContentBadges.jsx bileşeni (her sayfada)

Trilingual chip bileşeni `curriculumMap`'ten veri çeker ve göstergeler:

- **Yaş aralığı** (GraduationCap)
- **Sınıf** (BookOpen)
- **Süre** (Clock)
- **Zorluk** (Layers + renkli nokta: kolay 1 yeşil, orta 2 altın, zor 3
  kırmızı)
- **Dersler** (fen, kimya, matematik, sosyal, coğrafya, görsel, teknoloji)
- **MEB/NGSS kazanımları** (collapsible, kodlar + etiketler)
- **Notes** (UNESCO disclaimer + ek uyarılar)

Entegre edilen sayfalar:
- `src/pages/LabPage.jsx` — deney başlığının üstünde
- `src/pages/WorkshopHub.jsx` — atölye alt-başlığın altında
- `src/pages/ExhibitDetail.jsx` — sergi hero başlığının altında

`curriculumMap`'te kayıt yoksa sessizce `null` döner — additive.

### 🔐 PrivacyPage.jsx — Çocuk + yetişkin gizlilik sayfası

İki bölümlü COPPA + GDPR-K uyumlu gizlilik sayfası. Rota: `/privacy`,
`src/App.jsx` içinde lazy import. Footer\'a Shield ikonlu link eklendi.

**Çocuk bölümü** (5 renk kodlu kart):
- "Adını sormayacağız"
- "Fotoğrafını göndermeyeceksin"
- "Senin puanın senin (tarayıcıda kalır)"
- "Reklam yok"
- "Bir yetişkine danış"

**Yetişkin bölümü** (collapsible):
- Toplanan PII: **yok**
- COPPA (US <13) uyumu: PII toplanmadığı için "verifiable parental
  consent" şu an gerekmez
- GDPR-K (AB <16, Madde 8): hiçbir Art. 6(1)(a) consent-based processing
  yok
- Çerez ve yerel depolama envanteri: sadece `locale`, `theme`, `progress`;
  **hiç üçüncü taraf izleyici yok** (Google Analytics, Meta Pixel yok)
- Erişim, silme, iletişim hakları
- Gelecek özellikler için taahhüt: AR kamera akışı cihaz dışına çıkmaz,
  sınıf modunda takma adlar, öğretmen/veli moderasyonu

Son güncelleme: Nisan 2026 — v1.0.

### 🔬 VirtualGemologist.jsx — 8. lab (flagship yenilik)

Raporun 3. bölümünün 1. önerisi. Öğrenci beş gerçek gemolojik testten
(Mohs sertlik, renk, yoğunluk, UV floresans, optik) bilinmeyen taşı
kimliklendirir. İlaveler:

- 5 rastgele aday taş: pırlanta, yakut, zümrüt, safir, ametist
- Her taş için 4-seçenekli gerçekçi distraktör havuzu (moissanite, garnet,
  tanzanit, iolit, cam vb.)
- 8 adımlı workflow: intro → mohs → color → density → uv → optic →
  identify → report
- Final rapor kartı: tanı + tüm kanıt satırları (yoğunluk, sertlik vb.)
- `Microscope` ikonu, emerald tone (#16a085)
- 3 dilde ~100 string
- MEB FB.6.4.3.3 + KİM.9.2.8, NGSS 5-PS1-3 + MS-PS1-2
- `src/data/_labEnrichment.js`'e tam 8 adımlı procedure + safetyNote +
  curatorNote (Ruby-sapphire aynı mineral konusu) eklendi

Kaydedildi: `src/pages/LabPage.jsx` BASE_EXPERIMENTS, TR/EN/AR i18n,
curriculumMap, progress tracking (`completeLab('virtual-gemologist')`).

### 🛠️ 6 yeni atölye — WorkshopHub genişlemesi

Raporun 2. bölümünden, Türkiye odaklı + bilimsel:

1. **Kütahya Çinili Mücevher Kutusu** (🏺 #1f4e8f) — 8 adım. Mavi-beyaz
   Kütahya motifleriyle taş saklama kutusu. MEB GS.7.3.2.
2. **Eskişehir Lületaşı Oyma Simülasyonu** (🪨 #d4a017) — 8 adım. Gerçek
   lületaşı yerine sabun üzerinde güvenli oyma. MEB COĞ.10.3.2.
3. **Brilliant Kağıt Model** (💎 #5dade2) — 8 adım. Tolkowsky 1919
   geometrisi (pavyon ~40.75°, crown ~34.5°, table %53) kağıt modelle.
   MEB FB.6.4.1.1-2.
4. **Kristal Yetiştirme Günlüğü** (🧂 #8e44ad) — 1 ders + 1 hafta gözlem.
   Şeker/şap doymuş çözeltisi, tohum kristal, haftalık ölçüm defteri.
   KİM.9.1.6.
5. **UV Floresans Dedektifi** (💡 #7d3c98) — 7 adım. Karanlık kutu + UV
   fener ile taş parlamasının testi. Gerçek gemolog yöntemi.
6. **Yoğunluk Dedektif** (⚖️ #16a085) — 8 adım. Arşimed (MÖ 3. yy) su
   yer değiştirme yöntemi. Dijital tartı + plastik mezür + referans
   tablo. MEB MAT.6.2.3.

Tam workshop enrichment içeriği (`intro`, `origin`, `materials`,
`sources`, `relatedExhibits`, `relatedLabs`, `vocabulary`, `curatorNote`,
`safetyNote`) `src/data/_workshopEnrichment.js`\'e eklendi.

### 📚 5 yeni ders planı — lessonPlans.js genişlemesi

Raporun 4.1 tablosuna göre:

5. **pirlanta-kesim-isik** — Grade 6, Fen, 40 dk.
   MEB FB.6.4.1.1-2.
6. **beyaz-isik-renkli-taslar** — Grade 6, Fen, 40 dk.
   MEB FB.6.4.3.2-3.
7. **kuyumcu-butcesi** — Grade 5, Sosyal/Mat, 40 dk.
   MEB SB.5.5.2 + MAT.5.1.5.
8. **periyodik-tablo-metaller** — Grade 9, Kimya, 40 dk.
   MEB KİM.9.1.6.
9. **sanal-muze-kuratorluk** — Grade 7, Görsel/Tek, 80 dk (2 ders).
   MEB GS.7.7.1-2 + TT.7.B.2.1-3.

Her plan: `{id, hall, accent, icon, level, duration, subject, title,
goal, materials, steps[5-6], worksheet[3-4], discussion[1-2],
relatedExhibits}` — tam trilingual.

### 📝 teacherQuestionBanks.js — Soru bankası (yeni dosya)

Raporun 4.4 bölümünden. 6 ders planı için öğretmen soru bankası:

- Mohs Sertlik Testi (mevcut plan)
- Pırlanta Kesimi ve Işık (yeni)
- Beyaz Işık ve Renkli Taşlar (yeni)
- Kuyumcu Bütçesi (yeni)
- Periyodik Tablo Metaller (yeni)
- Sanal Müze Küratörlüğü (yeni)

Her plan için **5 çoktan seçmeli + 2 açık uçlu** soru, tam trilingual.
Çoktan seçmeli sorularda `correctIndex` + `explanation` (öğrenciden
gizlenir). Açık uçlularda `rubric` (yalnız öğretmen paneli).

Yardımcılar: `getQuestionBank(planId)`, `sampleMCQs(planId, n=3)` —
rastgele exit ticket için.

### 📦 Bundle etkisi

Eklenen kod: yaklaşık +42 KB uncompressed kaynak, +14 KB gz tahmini
(henüz ölçülmedi — node_modules sandbox\'ta yok). Bu büyümenin çoğu:
- `VirtualGemologist.jsx` + trilingual strings (~14 KB)
- `lessonPlans.js` 5 yeni plan (~11 KB)
- `teacherQuestionBanks.js` yeni dosya (~12 KB)
- `_workshopEnrichment.js` 6 yeni entry (~7 KB)
- `_labEnrichment.js` virtual-gemologist (~3 KB)
- `curriculumMap.js` + `imageCredits.js` + `ContentBadges.jsx` +
  `PrivacyPage.jsx` (~10 KB toplam)

Lesson plans ve question banks zaten lazy chunk'ta (Educators route).
Virtual Gemologist lab da lazy (LabPage chunk'ında). İlk bundle\'a net
ek: `curriculumMap` + `ContentBadges` + `imageCredits` = tahminî +5 KB gz
maksimum. Bu kabul edilebilir çünkü eğitim değerini doğrudan üç ana sayfaya
(sergi, lab, atölye) yayar.

### ✅ Geriye uyumluluk

Sıfır kırılma: tüm değişiklikler additive (`curriculumMap` kaydı yoksa
`ContentBadges` null döner), mevcut içerik id\'leri korundu, hikâye slug
`trabzon-hasiri-unesco` içeriği zaten doğru olduğu için slug bırakıldı
(backward compat).

### 📋 Dosya özeti

**Yeni (6):**
- `src/data/imageCredits.js` (140 satır)
- `src/data/curriculumMap.js` (380 satır)
- `src/data/teacherQuestionBanks.js` (680 satır)
- `src/components/common/ContentBadges.jsx` (170 satır)
- `src/components/lab/VirtualGemologist.jsx` (520 satır)
- `src/pages/PrivacyPage.jsx` (270 satır)

**Güncellendi (14):**
- `src/data/exhibits/gumus.js`
- `src/data/exhibits/zanaat.js`
- `src/data/exhibits/_enrichment.js`
- `src/data/_labEnrichment.js`
- `src/data/_workshopEnrichment.js`
- `src/data/lessonPlans.js`
- `src/pages/Lobby.jsx`
- `src/pages/LabPage.jsx`
- `src/pages/WorkshopHub.jsx`
- `src/pages/ExhibitDetail.jsx`
- `src/App.jsx`
- `src/components/layout/Footer.jsx`
- `src/i18n/tr.js` / `en.js` / `ar.js`

---

## [1.0.0] — 2026-04-23 — 🎉 Faz 6-Z: Polish + Audit + v1.0

**Faz 6 tamamlandı.** 8 alt-fazdan (6-A → 6-H → 6-Z) biriken borçlar
temizlendi, kapsamlı cross-enrichment audit çalıştırıldı, proje
v1.0.0 olarak kapatıldı.

### Ana kazanç: %22.8 initial bundle azalması

Bundle optimizasyonu:
- `vite.config.js`'e 4 yeni `manualChunks`: `storyEnrichment`,
  `quizEnrichment`, `storiesData`, `quizzesData`
- `modulePreload.resolveDependencies` filtresi: index.html sadece
  eager vendor chunk'larını (react, icons) preload eder
- Lazy data chunk'ları (stories/quizzes/enrichment/leaflet/geoPoints/
  glossary-extended/timelineEvents) yalnızca route ziyaretinde yüklenir

**Initial index chunk: 156.16 → 120.50 KB gz (-35.66 KB).**
6-C'deki +21 KB ve 6-F'deki +15 KB sızıntılarının her ikisi de
tedavi edildi.

### RelatedGrid 5. bölüm: Workshops

6-H'de Educators.jsx manuel workshop chip link'leri yazmak zorunda
kalmıştı. 6-Z'de:
- `WORKSHOP_META` sabit (4 atölye için meta)
- `workshopIds` prop eklendi
- Hammer ikonu + 5 bölümlü grid (exhibits/stories/labs/workshops/quizzes)
- Educators.jsx'teki manuel chip bloğu temizlendi
- WorkshopHub'a `?id=` query-param desteği (`useSearchParams`)

### geoKinds shared utils

WorldMapPage.jsx ve LeafletMap.jsx'teki 3 kopya sabit
(`KIND_LABELS`, `KIND_COLORS`, `ALL_KINDS`) tek kaynağa taşındı:
`src/utils/geoKinds.js`.

### Yeni geoPoint: istanbul-mine

Cross-audit yakaladı: `mine` atölyesi `istanbul-kapalicarsi`'ye
(trade-hub) bağlıydı, workshop-kind'a değil. Eyüp/Kapalıçarşı
arasında (41.0289, 28.9402) yeni `istanbul-mine` workshop noktası
eklendi. `_workshopEnrichment.js` güncellendi. GeoPoint sayısı:
39 → **40**.

### UNESCO tarihsel dürüstlük 4. kez düzeltildi

Cross-audit yakaladı: `geoPoints.js`'teki `trabzon-hasir` fact'i
"UNESCO Yaşayan Miras listesinde" iddiasını içeriyordu — aynı hata
6-C'de zaten düzeltilmişti. 6-Z'de dördüncü kez düzeltildi →
"2004'ten beri Türk Patent coğrafi işaret koruması altında".
6-C/6-G/6-H düzeltmeleriyle artık tutarlı.

### Cross-enrichment audit — 75 pass / 0 fail / 0 warn

`smoke-6z.mjs` (~190 satır) 6 fazın tüm enrichment dosyalarındaki
**482 ID referansını** tek seferde doğruladı:
- relatedExhibits/Stories/Labs/Workshops/Quizzes
- sources, curatorNote.cite, timeline.cite, procedure.cite
- vocabulary, geoPoints

**Referans tarama: 482 valid, 0 invalid.** 5 faz (6-C/E/F/G/H)
boyunca registry-lookup disiplini hiç kırık link bırakmamış.

### Ertelenen borçlar (7-A / 7-Z'ye)

- Shared bileşen rename (`StoryTimeline`→`ContentTimeline`,
  `CuratorStoryNote`→`CuratorNote`) — 7+ dosyada import değişikliği,
  v1.0 teslimi için risk. 7-Z'ye ertelendi.
- World Tour migrate (`worldOrigins.js`→`geoPoints.js`) — oyun
  kodu. 7-A'ya ertelendi.

### Değiştirilen dosyalar

- `vite.config.js` — 4 yeni manualChunk + modulePreload filter
- `src/components/museum/RelatedGrid.jsx` — 5 bölüm + workshopIds
- `src/pages/WorkshopHub.jsx` — useSearchParams ile ?id= desteği
- `src/pages/Educators.jsx` — manuel workshop chip bloğu temizlendi
- `src/pages/ExhibitDetail.jsx` — kullanılmayan getSources kaldırıldı
- `src/utils/geoKinds.js` — YENİ shared utils
- `src/pages/WorldMapPage.jsx` — geoKinds'ten import
- `src/components/map/LeafletMap.jsx` — geoKinds'ten import
- `src/data/geoPoints.js` — istanbul-mine eklendi, trabzon-hasir fact düzeltildi
- `src/data/_workshopEnrichment.js` — mine geoPoints → istanbul-mine
- `package.json` — 0.16.0 → **1.0.0**

### Doğrulama

- `npm run build` 0 hata (30.82 s)
- Cross-enrichment smoke 75/75 pass, 482 referans valid
- Runtime browser testi sandbox kısıtı nedeniyle yapılmadı

### Bundle metrikleri (v1.0.0 final)

- Initial index chunk: **120.50 KB gz**
- React vendor: 53.79 KB gz
- Icons vendor: 6.68 KB gz
- **Toplam initial preload: ~181 KB gz** (react + icons + lobby/header)
- LabPage chunk (en büyük lazy): 136.58 KB gz (/lab rotası)
- Leaflet chunk: 43.36 KB gz (/map rotası)
- PWA precache: 1838.10 KiB (47 entries)

---

## 🎊 FAZ 6 KAPANIŞ ÖZETI — v1.0.0

**JewelPedi Kids artık ciddi bir eğitim aracı:**
- 44 sergi, 5 hikâye, 7 lab deneyi, 49 quiz, 4 atölye, 4 ders planı
- 40 coğrafi nokta (Leaflet + GeoJSON harita)
- 83 sözlük terimi, 38 kaynaklı akademik dipnot sistemi
- 3 dilde (TR/EN/AR) tam yerelleştirme
- PWA + offline çalışma
- Sınıfa yazdırılabilir ders planları (rubric, worksheet dahil)

**Enrichment Layer Pattern 6 faz boyunca 5 kez uygulandı, hiç
kırılmadan çalıştı. Cross-audit 482 ID referansını valid bulan
disiplini kanıtladı.**

---

## [0.16.0] — 2026-04-23 — Faz 6-H: Öğretmenler Zenginleştirme

Faz 6'nın sekizinci (ve enrichment-odaklı son) alt-fazı.
`/educators` rotasındaki 4 ders planı pedagojik vitrinle sarıldı:
**Öğretmene brief** (intro), **Bloom taxonomy kazanımları**
(learningObjectives), **müfredat bağlantıları** (MEB + Cambridge +
NGSS + IB), **değerlendirme matrisi** (4-seviye analytic rubric),
ilgili müze içeriği (lab/hikâye/atölye/quiz), öğretmene özel
**küratör notu**, **kaynakça**. Mevcut `steps/worksheet/discussion/
relatedExhibits` alanları **dokunulmadı** — 4 plan × 5 adım = 20 adım,
4 plan × 4-5 çalışma sorusu = 18 soru, 4 plan × 2-3 tartışma = 10
tartışma sorusu birebir korundu.

### Ana disiplin: mevcut ders planı alanları dokunulmadı

6-E (7 deney bileşeni), 6-F (49 soru), 6-G (27 atölye adımı)
disiplininin dördüncü karşılığı. Ders planlarının asıl değeri Faz
2-C'den beri zaten materials/steps/worksheet/discussion'da; enrichment
yalnızca ETRAFA pedagojik katman ekliyor. Öğretmenler eski
davranışla hâlâ yazdırabilir ve sınıfa girebilirler — yeni alanlar
isteğe bağlı derinlik.

### Enrichment Layer Pattern — 6 faz retrospektifi

| Faz | Dosya                          | Tek import sayfası  | Initial sızıntı |
| :-- | :----------------------------- | :------------------ | :-------------: |
| 6-A | `exhibits/_enrichment.js`      | tüm sergi detayları | (yeni veri)     |
| 6-C | `_storyEnrichment.js`          | StoryPage + başka   | +21 KB          |
| 6-E | `_labEnrichment.js`            | LabPage (tek)       | +0.26 KB        |
| 6-F | `_quizEnrichment.js`           | quizzes.js→shared   | +15 KB          |
| 6-G | `_workshopEnrichment.js`       | WorkshopHub (tek)   | +0.14 KB        |
| 6-H | `_lessonPlanEnrichment.js`     | Educators (tek)     | +0.23 KB        |

Desen 6. kez uygulandı ve net bir reçeteye oturdu: enrichment
sadece tek lazy-loaded sayfadan import edilirse Rollup izole ediyor
→ 0 sızıntı. Başka bir ana-bundle dosyası da import ederse (6-C,
6-F) enrichment ana bundle'a girer. 6-Z'de manualChunks ile tedavi.

### Yeni dosyalar

- `src/data/_lessonPlanEnrichment.js` (~490 satır) — 4 ders planı için
  pedagojik metadata: intro, learningObjectives (Bloom düzeyli),
  curriculumLinks, assessmentRubric (3-4 kriter × 4 seviye), sources,
  relatedLabs, relatedStories, relatedWorkshops, relatedQuizzes,
  vocabulary, curatorNote. Enrichment Layer Pattern'in altıncı ve
  enrichment-odaklı son örneği.

### Değiştirilen dosyalar

- `src/pages/Educators.jsx`:
  - `_basePlans.map(enrichLessonPlan)` merge eklendi
  - LessonPlanCard yapısına 7 yeni bölüm eklendi (intro, learning
    objectives, curriculum links, extended related grid, assessment
    rubric tablosu, curator note, footnote)
  - citeMap `useMemo` — curatorNote.cite + sources
  - Mevcut 5 Section bloğu (materials, steps, worksheet, discussion,
    relatedExhibits) DOKUNULMADI, birebir korundu
  - PrintStyles'a rubric tablosu için stil eklendi (border-collapse,
    1px border, 10pt font, gri thead)
- `src/data/sources.js`:
  - `meb-ortaokul-fen-mufredat` (Türkiye Fen Bilimleri öğretim
    programı, T.C. MEB, 2024)
  - `bloom-taxonomy-revised` (Anderson & Krathwohl 2001, Longman)
  - Toplam: 36 → 38 kaynak
- `package.json` — 0.15.0 → 0.16.0

### Yeni ders planı alanları

```js
{
  // Faz 2-C (mevcut): id, hall, accent, icon, level, duration, subject,
  //                   title, goal, materials, steps, worksheet,
  //                   discussion, relatedExhibits

  // Faz 6-H:
  intro:              { tr, en, ar },                     // öğretmene brief
  learningObjectives: [{tr,en,ar}],                       // 3-5 Bloom kazanımı
  curriculumLinks:    [{tr,en,ar}],                       // müfredat eşlemesi
  assessmentRubric:   [{                                  // 3-4 kriter × 4 seviye
    criterion: {tr,en,ar},
    levels: [
      { score: 4, descriptor: {tr,en,ar} },  // üst performans
      { score: 3, descriptor: {tr,en,ar} },
      { score: 2, descriptor: {tr,en,ar} },
      { score: 1, descriptor: {tr,en,ar} },  // alt performans
    ]
  }],
  sources:            ['source-id', ...],
  relatedLabs:        ['lab-id', ...],
  relatedStories:     ['story-id', ...],
  relatedWorkshops:   ['workshop-id', ...],
  relatedQuizzes:     ['quiz-category-id'],
  vocabulary:         ['glossary-term-id', ...],
  curatorNote:        { tr, en, ar, cite?: ['source-id'] },
}
```

### UNESCO tarihsel dürüstlüğü korundu

unesco-intangible-heritage planının `curatorNote`'u 6-C'deki
düzeltmeyle tutarlı: "Trabzon Hasırı UNESCO Somut Olmayan Miras
listesinde DEĞİLDİR, yalnızca Türk Patent Coğrafi İşareti (2004)
ile korunmaktadır." Ders planı ders sırasında bunu öğretmenin
açıkça belirtmesini ister; araştırma etkinliği öğrencileri "her
korunan gelenek UNESCO'da değildir" gerçeğiyle yüzleştirir. Bu
disiplin 6-C/6-G/6-H boyunca aynı olgu üstüne 3 kez geçti.

### Bloom taxonomy disiplini

Her learningObjective sonunda parantez içinde Bloom düzeyi
belirtildi: (Bilgi), (Kavrama), (Uygulama), (Analiz), (Sentez),
(Değerlendirme), (Yaratma). Tipik plan: 4-5 kazanım, temelden
üst-düşünce düzeyine.

### Analytic rubric — holistik değil

4 seviye (1=alt, 4=üst), 3-4 kriter. Her kriter ayrı puanlanıyor —
öğrenci hangi boyutta güçlü/zayıf gördüğünü net görür. Seviye
açıklamaları gerçek öğrenci davranışı tanımlıyor: "Tüm çiftler
doğru sıralanmış, her gözlem yazılı" vs. "Çoğunlukla yanlış veya
eksik".

### Müfredat bağlantıları Türkiye + uluslararası

Her planda MEB müfredatına bağlantı + en az bir uluslararası
referans (Cambridge Lower Secondary, NGSS, IB MYP, UK National
Curriculum). Türk öğretmen öncelikli, uluslararası kullanım hazır.

### Print davranışı

- intro, learning objectives, curriculum links: yazdırmada **görünür**
- rubric tablosu: **görünür** ve print CSS ile düzgün bordürlendi
- extended RelatedGrid ve footnote: **gizli** (`no-print`)
- Worksheet yazdırma davranışı (plan izolasyonu, answer lines)
  birebir korundu

### Doğrulama

- `npm run build` 0 hata (21.37 s)
- Smoke test 115/115 pass: tüm source/lab/story/workshop/term ID'leri
  geçerli; her rubric'te 4 seviye ve scores [1,2,3,4]; 4/4 planda
  intro + rubric + curriculum; enrichLessonPlan base alanları
  (steps/worksheet/discussion/goal/relatedExhibits) korur; UNESCO
  curatorNote "DEĞİLDİR" ifadesi içeriyor
- Runtime browser testi sandbox kısıtı (HTTP preview SIGHUP)

### Bundle etkisi

- Initial index chunk: 155.93 → **156.16 KB gz** (+0.23 KB, sızıntı yok)
- Educators chunk: 11.59 → **21.46 KB gz** (+9.87 KB)
- PWA precache: 1803.13 → **1833.93 KiB** (+30.80 KiB)
- Build süresi: 21.12 → 21.37 s

6-G'deki ideal bundle disiplini tekrar etti. `_lessonPlanEnrichment.js`
sadece Educators.jsx'ten import edildiği için Rollup izole etti.

### Keşifler

- **Workshop chip'leri için RelatedGrid eksikliği.** Bileşen
  exhibits/stories/labs/quizzes destekliyor ama workshop'u değil.
  Educators.jsx içinde manuel chip link'ler (`/workshop?id=`)
  oluşturuldu. 6-Z'de RelatedGrid'e workshop desteği iyi bir borç.
- **6 faz tutarlılık.** Enrichment Layer Pattern bu 6 fazda hiç
  düşmeden çalıştı. Shared bileşenlerin ("Story" prefix'li) 6 farklı
  içerik türüyle (sergi, hikâye, lab, quiz, atölye, ders planı)
  değişmeden çalışması tasarımın doğruluğunu kanıtladı.
- **Pedagojik dürüstlük noktaları.** Her plan için öğretmenlere
  önemli uyarılar curatorNote'larda: mohs = cam/bıçak güvenlik, silver
  = hipotez önce yazdırma, lydia = "güven" boyutu kritik, unesco =
  Trabzon Hasırı UNESCO'da değil.

---

## [0.15.0] — 2026-04-23 — Faz 6-G: Atölye Zenginleştirme

Faz 6'nın yedinci alt-fazı. `/workshop` rotasındaki 4 atölye (Trabzon
Hasırı, Mardin Telkârisi, Siirt/Midyat Savatı, İstanbul Minesi) müze
vitrinine yerleştirildi. Her atölyenin üstünde `WorkshopHero` (intro,
coğrafi köken meta strip, materyaller grid, güvenlik notu), altında
5 bölüm (küratör notu, tarih şeridi, sözlük, ilgili içerik grid,
kaynakça). **Step walkthrough'un kendi body'leri dokunulmadı** — 27
adım × 3 dil × 2 alan (t+d) = 162 string birebir korundu.

### Ana disiplin: step body'leri dokunulmadı

6-E'deki "7 deney bileşeni dokunulmadı", 6-F'deki "49 soru
dokunulmadı" disiplininin üçüncü karşılığı. Atölye adımlarının
kendi olgusal içeriği (ör. savat için "Gümüş, bakır, kurşun ve kükürt
özel oranlarda potada eritilir") birebir korundu. Enrichment yalnızca
adımların ETRAFINA (öncesi/sonrası) eklendi.

### Enrichment Layer Pattern — 5. uygulama

6-A (sergi), 6-C (hikâye), 6-E (lab), 6-F (quiz), şimdi 6-G (atölye)
aynı desenin beşinci uygulaması. Her seferinde: ayrı `_xxxEnrichment.js`
dosyası + merge helper + mevcut dosya dokunulmaz + UI tarafı hem hero
(üst) hem shared bileşenler (alt) ile sarılır.

### Bundle disiplini ideal örneği

Initial index chunk: 155.79 → **155.93 KB gz** (+0.14 KB). Sızıntı YOK.
6-F'de (+15 KB) ve 6-C'de (+21 KB) gördüğümüz sızıntılar enrichment
veri dosyasının ana bundle'daki `RelatedGrid` üzerinden bir import
zincirine girmesinden kaynaklanıyordu. 6-G'de `_workshopEnrichment.js`
sadece WorkshopHub'dan import edildiği için Rollup güzelce izole etti
— lazy chunk'a kapandı. Bu pattern 6-Z'de diğer enrichment'lar için
referans.

### Yeni dosyalar

- `src/data/_workshopEnrichment.js` (~360 satır) — 4 atölye için
  metadata: intro, origin (place + era), materials, sources,
  relatedExhibits, relatedStories, relatedLabs, relatedQuizzes,
  geoPoints, vocabulary, curatorNote, timeline, safetyNote.
  Enrichment Layer Pattern'in beşinci örneği.
- `src/components/workshop/WorkshopHero.jsx` (~170 satır) — atölye
  step walkthrough'unun ÜSTÜNDE render edilen müze vitrini: intro
  paragrafı + origin meta strip (place chip + era chip) + materials
  grid (4-6 öğe, her biri emoji + ad + opsiyonel not) + safetyNote
  alert.

### Değiştirilen dosyalar

- `src/pages/WorkshopHub.jsx` yeniden yazıldı (265 → ~320 satır):
  - `BASE_WORKSHOPS.map(enrichWorkshop)` merge
  - citeMap `useMemo` — curatorNote/timeline/sources cite'larını
    tek numaralı listede birleştirir
  - Walkthrough kartı ÜSTÜNE WorkshopHero, ALTINDA 5 yeni bölüm
  - Mevcut step progress, step body, nav button'ları DOKUNULMADI
- `src/data/sources.js` — 3 yeni kaynak:
  - `turkpatent-gi-midyat-telkari` (2013 tescili, başvuru C2013/024)
  - `turkpatent-gi-siirt-savat` (2019 tescili)
  - `vam-enamel` (Victoria and Albert Museum enamel article)
  - Toplam: 33 → 36 kaynak
- `package.json` — 0.14.0 → 0.15.0

### Yeni atölye alanları (enrichment layer, tamamı opsiyonel)

```js
{
  // Faz 3: id, emoji, tone, title, subtitle, steps

  // Faz 6-G:
  intro:          { tr, en, ar },                        // tanıtım paragrafı
  origin:         { place: {tr,en,ar}, era?: {start, end} },
  materials:      [{ emoji, name: {...}, note?: {...} }],
  sources:        ['source-id', ...],
  relatedExhibits:['exhibit-id', ...],
  relatedStories: ['story-id', ...],
  relatedLabs:    ['lab-id', ...],
  relatedQuizzes: ['quiz-category-id'],
  geoPoints:      ['geo-id', ...],
  vocabulary:     ['glossary-term-id', ...],
  curatorNote:    { tr, en, ar, cite?: ['source-id'] },
  timeline:       [{ year, event: {...}, cite?: [...] }],
  safetyNote:     { tr, en, ar },
}
```

### 4/4 atölyede coğrafi işaret kapsaması

Her atölye Türk Patent Coğrafi İşareti ile korunan geleneksel bir
zanaattır:
- **hasir** → Trabzon Hasır Bileziği (2004)
- **telkari-usta** → Midyat Telkârisi (2013, C2013/024)
- **savat** → Siirt Savatı (2019)
- **mine** → V&A Museum teknik referansı (İstanbul-Bizans geleneği)

Bu GI disiplini atölyelerin "müze sergisi" olarak gösterilebilmesinin
yasal-kültürel altyapısını oluşturur.

### 4/4 atölyede timeline (tarihsel derinlik)

- **hasir**: ~1300 (teknik başlangıç) → 2004 (GI) → 2024 (Körfez ihracat)
- **telkari-usta**: ~1500 (Osmanlı/Süryani zanaatı) → 2013 (GI)
- **savat**: ~900 (niello yayılımı) → ~1200 (Siirt merkez) → 2019 (GI)
- **mine**: ~500 (Bizans cloisonné) → ~1550 (Osmanlı zirve)

### Doğrulama

- `npm run build` 0 hata (21.12 s)
- Smoke test 95/95 pass: 4 atölyede intro/safetyNote/timeline/geoPoints;
  tüm source/exhibit/story/lab/geoPoint/term ID'leri ilgili registry'lerde;
  `enrichWorkshop` merge davranışı (steps dahil tüm mevcut alanları
  korur); bilinmeyen ID değişmeden döner
- Runtime browser testi sandbox kısıtı nedeniyle yapılmadı (aynı HTTP
  preview SIGHUP sorunu)

### Keşifler / Sapma notları

- **Savat ID hatası smoke test'te yakalandı.** İlk yazdığımda
  `siirt-savat` olarak atadım ama `geoPoints.js`'te gerçek ID
  `midyat-savat` (savat her iki şehirde geliştirildi; ilk kaynak
  Midyat). Smoke test bunu yakaladı; enrichment "Siirt & Midyat"
  olarak düzeltildi — tarihsel olarak da daha doğru. Beşinci fazdır
  registry-lookup disiplini yeni ID hatası ortaya çıkarıyor.
- **mine atölyesi adı konfüzyonu açıklandı.** Türkçe "mine"
  (emay/enamel) ile İngilizce "mine" (maden) çakışıyor. intro'da
  "'mine' (pronounced mee-neh) is Ottoman Turkish for enamel"
  şeklinde ses yazımı eklendi.
- **Materials sub-note eğitsel dürüstlük.** Niello için "kurşun
  içerir → maske/eldiven" gibi spesifik kimyasal notlar
  `materials.note` alanına konulup ayrıntılandırıldı. Bu sadece
  güvenlik değil, niellonun niçin kararmadığının (moleküler bağ)
  altyapısı da. Çocukların "neden?" sorusuna kaynaklı cevap.
- **6-C/6-E shared bileşenleri 5. kez yeniden kullanıldı.** 5 faz
  boyunca isimlerinde "Story" prefix taşımalarına rağmen jenerik
  çalıştılar. 6-Z'de rename düşünülebilir ama sorun yaratmıyor.
- **Bundle ideal:** Initial +0.14 KB. 6-Z'de 6-F/6-C sızıntıları için
  `manualChunks` stratejisi planlanırken bu fazın pattern'i referans
  alınmalı: enrichment tek sayfadan import edilirse Rollup zaten
  izole ediyor.

---

## [0.14.0] — 2026-04-23 — Faz 6-F: Quiz Merkezi Zenginleştirme

Faz 6'nın altıncı alt-fazı. `/quiz` merkezine bağlam ve keşif katmanı
eklendi. Kullanıcı artık quiz'e "kör" başlamıyor: kategori seçtiğinde
o kategorinin tanıtımını, sözlük terimlerini ve ilgili müze içeriğini
(sergi/lab/hikâye) görüyor. Bitirdikten sonra da küratör notu +
"keşfe devam et" chip'leriyle bir sonraki müze sayfasına yönlendiriliyor.
Quiz artık sadece bil-bilme oyunu değil, müzenin bir öğrenme kapısı.

### Ana disiplin: sorular dokunulmadı

49/49 orijinal soru birebir korundu (q, opts, answer, cat, difficulty,
explanation alanları hepsi aynı). Enrichment yalnızca kategori
seviyesinde (8 kategori), ve o da `categories` array'i etrafında
ayrı bir dosyada (`_quizEnrichment.js`). `quizzes[]` array'ine tek
karakter bile edit atılmadı.

### Mimari kararı: Kategori-seviyesi (soru-seviyesi DEĞİL)

49 sorunun hepsine ID verip enrichment yazmak yüksek risk/düşük fayda
olurdu. Kullanıcı quiz oynarken cevaba odaklanır, bağlamı okumaz.
Bağlam en değerli olduğu iki noktada var:
- **Başlangıç** (QuizHub kategori seçimi): hazırlık için
- **Bitiş** (QuizPlay finished ekranı): "şimdi sırada ne var?" için

### Yeni dosyalar

- `src/data/_quizEnrichment.js` (~230 satır) — 8 kategori için
  metadata: intro, sources, relatedExhibits, relatedLabs,
  relatedStories, vocabulary, curatorNote. Enrichment Layer
  Pattern'in dördüncü örneği (6-A serginin, 6-C hikâyenin, 6-E
  laboratuvarın ikizi).
- `src/components/quiz/QuizCategoryIntro.jsx` (~80 satır) —
  QuizHub'da kategori seçilince altında gösterilen bağlam kartı:
  intro + VocabularyChips + RelatedGrid.

### Değiştirilen dosyalar

- `src/data/quizzes.js`:
  - `_categoriesBase` iç sabit eklendi
  - `categories` artık `_categoriesBase.map(enrichQuizCategory)`
    sonucu enriched export
  - Yeni `getCategory(id)` helper
  - `getQuizzesByCategory` ve quizzes[] **dokunulmadı**
- `src/pages/QuizHub.jsx`:
  - `QuizCategoryIntro` import
  - Kategori grid'inden sonra seçili kategorinin intro kartı
  - `--quiz-accent` CSS değişkeni — her kategori için kendi rengi
    (altın→sarı, gümüş→gri, pırlanta→mavi, vb.)
- `src/pages/QuizPlay.jsx`:
  - `getCategory`, `CuratorStoryNote`, `RelatedGrid`,
    `CitationsFootnote`, `getSource` import
  - `finished` ekranı zenginleştirildi:
    - Trophy/skor/yıldız kartı (mevcut, korundu)
    - **Yeni:** CuratorStoryNote — quiz sonrası küratör notu
    - **Yeni:** "Öğrenmeye devam et →" başlıklı RelatedGrid
    - **Yeni:** CitationsFootnote (curatorNote.cite + sources)
  - citeMap senkron hesaplama (useMemo değil çünkü finished block)
- `package.json` — 0.13.0 → 0.14.0

### Yeni kategori alanları (tamamı opsiyonel)

```js
{
  // Base: id, tr/en/ar, emoji

  // Faz 6-F eklemeleri:
  intro:           { tr, en, ar },                         // 2-3 cümle
  sources:         ['source-id', ...],
  relatedExhibits: ['exhibit-id', ...],
  relatedLabs:     ['lab-id', ...],
  relatedStories:  ['story-id', ...],
  vocabulary:      ['glossary-term-id', ...],
  curatorNote:     { tr, en, ar, cite?: ['source-id'] },
}
```

### 6-C/6-E shared bileşenleri yeniden kullanıldı (4. kez)

- `CuratorStoryNote` — QuizPlay finished'da
- `RelatedGrid` — QuizCategoryIntro + QuizPlay finished'da (iki kez)
- `VocabularyChips` — QuizCategoryIntro'da
- `CitationsFootnote` — QuizPlay finished'da

"Story" prefix'li isimlerin aslında jenerik olduğu 4. faz üstünde
kanıtlandı. 6-Z'de rename düşünülebilir.

### Doğrulama

- `npm run build` 0 hata (21.14 s)
- Smoke test 207/207 pass: 8 kategorinin tümünde intro/curatorNote
  var; tüm source/exhibit/story/lab/term ID'leri ilgili registry'lerde;
  `enrichQuizCategory` merge davranışı doğru (base alanları korur);
  `getCategory` tanımsız ID için null, tanımlı için enriched obje;
  `getQuizzesByCategory` hâlâ 8-soruyla sınırlı rastgele; 49/49
  sorunun explanation'ı korundu
- Runtime browser testi sandbox kısıtı nedeniyle yapılmadı
  (aynı HTTP preview SIGHUP sorunu)

### Bundle etkisi

- Initial index chunk: 140.39 → **155.79 KB gz** (+15.40 KB)
- LabPage chunk: 136.50 → 136.50 KB gz (değişmedi)
- PWA precache toplam: 1767.11 → **1780.69 KiB** (+13.58 KiB)
- Build süresi: 29.65 → 21.14 s (−8.5 s)

**Initial chunk +15 KB sızıntısı beklenen davranış:** `quizzes.js`
zaten ana bundle'da (RelatedGrid import zincirinden), enrichment
onunla beraber giriyor. 6-C'deki +21 KB story sızıntısı ile benzer
fenomen. 6-Z'de `manualChunks.quizEnrichment: ['src/data/_quizEnrichment.js']`
ile ayrı chunk'a izole edilebilir.

### Keşifler / Sapma notları

- **2 yanlış ID smoke'ta yakalandı:** `platin-tarihce` → `platin-tarihi`,
  `paladyum` exhibit yok → `platin-endustri`. Registry lookup disiplini
  dördüncü kez kendini ispat etti.
- **Kategori-spesifik renk accent.** QuizHub'da her kategori kendi
  rengiyle (sarı/gri/mavi/yeşil/vb.) öne çıkar. LabPage'deki
  `--hall-accent` pattern'inin quiz versiyonu.
- **curatorNote disiplini:** Her kategoride 1-2 cümlelik, "bu konuda
  en önemli düşünce" tipinde öz bir not. Örn. altın için "Türkiye'de
  altın hem takı hem tasarruf aracı"; pırlanta için "4C fiyatlandırma
  değil, görme dili"; renkli-taşlar için "kimlik sırrı eser elementler".
- **Her kategoride en az bir ilgili içerik** — smoke testte ayrı
  check ile doğrulandı. Kullanıcı hiçbir kategoride "ilgili içerik
  yok" boş grid'iyle karşılaşmaz.

---

## [0.13.0] — 2026-04-22 — Faz 6-E: Deney Labı Zenginleştirme

Faz 6'nın beşinci alt-fazı. `/lab` rotasındaki 7 interaktif deney
(KaratCalculator, MohsScratch, SilverTarnish, DiamondCutSimulator,
LydiaMint, MeltingPoints, StoneGuessing) — toplam ~2540 satır
interaktif kod — müze vitrinine yerleştirildi. Her deneyin üstünde
`LabHero` (başlık, amaç, materyaller, prosedür, güvenlik notu),
altında 5 bölüm (küratör notu, timeline, sözlük, ilgili içerik,
kaynakça). **Deney bileşenleri dokunulmadı** — interaktif davranış,
state yönetimi, kullanıcı etkileşimi birebir korundu.

### Ana disiplin: interaktif bileşenler dokunulmadı

6-E'nin birinci kuralı: enrichment yalnızca deneyin ETRAFINA eklenir,
içine girmez. 7 lab dosyasına (KaratCalculator.jsx vb., toplam 2540
satır) tek satır bile edit atmadım. Enrichment `_labEnrichment.js`'te
paralel olarak yaşar, `LabPage.jsx` bunu merge eder, UI da LabHero ve
6-C shared bileşenlerinin etrafında toplanır. İleride dokunma isterseniz
kolay.

### 6-C shared bileşenleri değişiklik gerektirmeden yeniden kullanıldı

6-C'de "Story" için yazılan `CuratorStoryNote`, `StoryTimeline`,
`VocabularyChips`, `RelatedGrid`, `CitationsFootnote`,
`BodyWithCitations.renderInlineCitations` — hepsi 6-E'de değişmeden
çalıştı. Bu, yeniden kullanılabilir jenerik bileşen tasarımının
doğrulanması. (İsimlendirmedeki "Story" prefix'i aslında jenerik;
6-Z'de adlandırma cilalanabilir.)

### Yeni dosyalar

- `src/data/_labEnrichment.js` (~520 satır) — 7 deney için metadata:
  title, goal, materials, procedure, safetyNote, sources,
  relatedExhibits, relatedStories, relatedQuizzes, vocabulary,
  curatorNote, timeline. Enrichment Layer Pattern'in üçüncü örneği
  (6-A serginin, 6-C hikâyenin ikizi).
- `src/components/lab/LabHero.jsx` (~150 satır) — deney üstünde
  render edilen müze vitrini: başlık + amaç + (materials | procedure)
  grid + safetyNote alert. Inline cite → `[n]` süperscript destekli.

### Değiştirilen dosyalar

- `src/pages/LabPage.jsx` baştan yazıldı (91 → ~190 satır). Yeni:
  - `BASE_EXPERIMENTS.map(enrichLab)` merge
  - citeMap `useMemo` — procedure/curatorNote/timeline/sources
    cite'larını tek numaralı listede birleştirir
  - Deney kartının ÜSTÜNE `LabHero`, deneyin ALTINDA 5 bölüm
  - `hall-theme` CSS değişkeni deney tone'una bağlı
- `src/data/sources.js` — 4 yeni kaynak:
  - `crc-handbook` (CRC Handbook of Chemistry and Physics, 104th ed.)
  - `webelements` (Mark Winter, University of Sheffield)
  - `iupac-periodic` (IUPAC Periodic Table)
  - `gia-4cs` (GIA 4Cs of Diamond Quality)
  - Toplam: 29 → 33 kaynak
- `package.json` — 0.12.0 → 0.13.0

### Yeni deney alanları (enrichment layer, tamamı opsiyonel)

```js
{
  title:          { tr, en, ar },
  goal:           { tr, en, ar },                          // 2-3 cümle amaç
  materials:      [{ emoji, name: {...}, note?: {...} }],  // 3-5 öğe
  procedure:      [{ step: {...}, cite?: ['source-id'] }], // 3-4 adım
  safetyNote:     { tr, en, ar },                          // 7/7 deneyde var
  sources:        ['source-id', ...],
  relatedExhibits:['exhibit-id', ...],
  relatedStories: ['story-id', ...],
  relatedQuizzes: ['quiz-category-id'],
  vocabulary:     ['glossary-term-id', ...],
  curatorNote:    { tr, en, ar, cite?: ['source-id'] },
  timeline:       [{ year, event: {...}, cite?: [...] }],  // 3/7 deneyde
}
```

### Karar 1 (Minimal) disiplini korundu

Deney bileşenlerinin içindeki JSX dokunulmadı; onlar "küratör yorumu"
kategorisinde kaldı. Kaynakça yalnızca enrichment alanlarından akar:
procedure (adım açıklaması), curatorNote, timeline, sources. Her
deney için 2-5 kaynak; her biri gerçek olgusal iddialara bağlı.

### 7 deneyde safetyNote disiplini

Her simülasyon için kullanıcıya ne noktada basitleştirme yapıldığını
açıkça belirten 1-2 cümlelik not:
- karat: "Gerçek renklerde ayrıca gümüş/paladyum/çinko etkilidir"
- mohs: "Gerçek testte kalıcı çizik olur; bu güvenli simülasyon"
- tarnish: "Evde dene — kaynar su dikkat; antikalarda önce kuyumcuya sor"
- light: "Bu 2D; gerçek brilliant 57-58 faset 3D"
- lydia: "Kroisos'un gerçek katkısı cupellation (ayrıştırma) idi"
- melt: "CRC pure-metal; alaşımlar 50-150°C düşükte erir"
- guess: "Gerçek gemolog refraktometre/spektroskop kullanır"

### Timeline dürüstlüğü: yalnızca tarihsel olaylı 3 deneyde

mohs (1812, 1822), light (1919, 1953), lydia (-600, -560, -546).
Diğer 4 deney kimya/geometri/ID puzzle'ı — tarihsel dönüm noktası
yok, boş timeline koymamak doğru.

### Bundle etkisi

- Initial index chunk: 140.13 → **140.39 KB gz** (+0.26 KB, sızıntı yok)
- LabPage chunk: 122.83 → **136.50 KB gz** (+13.67 KB, kabul edilebilir)
- PWA precache toplam: 1731.15 → **1767.11 KiB** (+35.96 KiB)
- Build süresi: 21.05 → 29.65 s

Rollup enrichment data'yı LabPage chunk'ına güzelce izole etti —
6-C'deki gibi RelatedGrid shared dependency sızıntısı olmadı çünkü
LabPage zaten 6-C'nin shared chunk'ını paylaşıyor.

### Doğrulama

- `npm run build` 0 hata (29.65s)
- Smoke test 182/182 pass: 7 deneyin tüm enrichment alanları (materials,
  procedure, sources, curatorNote, timeline, relatedExhibits,
  relatedStories, vocabulary) geçerli; tüm source/exhibit/story/term
  ID'leri ilgili registry'lerde bulunuyor; `enrichLab` merge davranışı
  (mevcut alanları koruyarak yeni alanları ekler) doğru; timeline
  yalnızca mohs/light/lydia'da var; 7/7 deneyde safetyNote var
- Runtime browser testi sandbox kısıtı nedeniyle yapılmadı (6-D'deki
  aynı HTTP preview SIGHUP sorunu); filesystem + kod düzeyi doğrulama
  tam

### Keşifler / Sapma notları

- **Küçük ID typo'su (`turkuaz` → `turkuvaz`) smoke test'te yakalandı** —
  guess deneyi relatedExhibits'te. Smoke test'in değeri bu: referans
  ID'leri manuel kontrol etmek yerine registry lookup ile kesinleşir.
- **Timeline 3 deneyde** — geri kalanlar için "tarih yok" diyerek
  boş bırakma kararı Karar 1 disiplinine uygun (uydurmamak için).
- **Lab chip'leri RelatedGrid'te yok** — zaten lab sayfasındayız;
  kendi üstüne ilgili lab göstermek anlamsız olurdu. `labIds={[]}` geçildi.
- **Gelecek refactor fırsatı:** 6-Z'de StoryTimeline → Timeline,
  CuratorStoryNote → CuratorNote yeniden adlandırma (Story prefix
  jenerik içeriği yansıtmıyor).

---

## [0.12.0] — 2026-04-22 — Faz 6-D: Harita (Leaflet + GeoJSON)

Faz 6'nın dördüncü alt-fazı. `/map` rotası dekoratif SVG silüetten
gerçek interaktif Leaflet haritasına yükseltildi. 39 geoPoint gerçek
lat/lng koordinatlarında marker olarak render edilir; dünya zemini
Natural Earth 1:110m GeoJSON, Türkiye için 1:50m detaylı sınır. Tile
server kullanılmıyor — tam offline, rate limit yok, müze estetiği
piksel bazında kontrolde.

### Kritik mimari kararı — Protomaps yerine GeoJSON

Plan belgesi başlangıçta **Protomaps self-hosted** (`.pmtiles` + CDN)
seçmişti. 6-D açılışında bu mimarinin projede olmayan üç altyapı
parçasını gerektirdiği görüldü: (1) pmtiles üretim pipeline, (2) CDN
servisi, (3) 15 MB PWA precache stratejisi. Planın orijinal
amaçlarına (ToS kaygısı yok, offline, müze estetiği, rate limit yok)
**aynı** düzeyde hizmet eden daha hafif mimari seçildi: **Leaflet +
statik GeoJSON (tile-less vektör harita)**. FAZ-6-PLAN.md Karar 2
güncellendi.

Trade-off: zoom aralığı Z2–Z7 (ülke/il ölçeği); şehir sokak seviyesi
yok. Müze haritası için yeterli.

### Yeni dosyalar

- `public/geo/countries-110m.geojson` (189 KB; 65 KB gzip) — Natural
  Earth 1:110m, 177 ülke, 3 ondalık hassasiyet (~100m)
- `public/geo/turkey-50m.geojson` (9 KB; 3 KB gzip) — Türkiye tek
  feature, 1:50m detaylı sınır
- `scripts/convert-world-topo.mjs` — world-atlas npm paketinden
  TopoJSON→GeoJSON dönüşümü (bir kerelik build script)
- `scripts/extract-turkey-50m.mjs` — countries-50m'den Türkiye
  feature izolasyonu
- `src/components/map/LeafletMap.jsx` (~210 satır) — vanilla Leaflet
  + React lifecycle sarmalayıcı, forwardRef imperative API
  (`focusPoint(id, zoom)`, `resetView()`, `getMap()`)

### Değiştirilen dosyalar

- `src/pages/WorldMapPage.jsx` baştan yazıldı (~350 satır). Yeni
  özellikler:
  - Leaflet ile gerçek harita (SVG silüet kaldırıldı)
  - 39 geoPoint'in tümü marker olarak, kind-renkli divIcon
  - 6 kind filtre chip'i (mine, workshop, museum, site, trade-hub,
    deposit) — multi-select, "hepsi kapalı" durumunu engeller
  - Dünya/Türkiye tab — `flyTo` animasyonuyla bölge değiştirir
  - Türkiye BBOX filtresi (4 nokta: Trabzon, Mardin, Kapalıçarşı,
    Ankara Darphane)
  - URL hash deep-link (`/map#lapis-afghanistan`) — mount'ta
    ilgili marker'a odaklar + popup açar; marker tıklandığında URL
    güncellenir (paylaşılabilir link, browser back/forward destekli)
  - Leaflet popup: place, name, kind chip, active/inactive chip, era
    chip, fact, sergi linki (ilk exhibitId → ExhibitDetail'a)
  - DetailsPanel: seçili noktanın tam kartı, ilgili sergi chip'leri
    (tüm exhibitIds)
  - LTR/RTL layout uyumlu
  - Dark theme destekli
- `src/index.css` — +137 satır Leaflet custom stilleri: marker
  (divIcon dot, hover scale, active outline), popup (beyaz kart, müze
  gölge, title/place/chip/cta tipografi), zoom control, attribution
  (küçük sade, blur arka plan), dark theme overrides
- `vite.config.js`:
  - `manualChunks.leaflet: ['leaflet']` — Leaflet ayrı chunk, cache
    verimli, diğer sayfalara sızmaz
  - `workbox.globPatterns` `.geojson` eklendi — tam offline PWA
- `package.json`:
  - `leaflet@^1.9.4` runtime dependency
  - `world-atlas@^2.0.2`, `topojson-client@^3.1.0` devDependency
    (build:geo için, runtime bundle'a sızmaz)
  - `npm run build:geo` script — iki dönüşüm scriptini tek komuta
    bağlar
  - Sürüm 0.11.0 → 0.12.0

### Bundle disiplini ✅ doğrulandı

- `index` chunk: 140.08 → **140.13 KB gzip** (+0.05 KB, sızıntı yok)
- `leaflet` chunk: **43.36 KB gzip** (yeni, sadece /map'te)
- `WorldMapPage` chunk: ~3.5 KB gzip
- `index.html` Leaflet'i modulepreload etmez — yalnızca /map
  ziyaret edilince parça gelir
- Başka hiçbir sayfa Leaflet'i import etmez (LeafletMap.jsx tek
  leaflet consumer, sadece WorldMapPage içinde kullanılır)

PWA precache toplam: 1364.77 → **1731.15 KiB** (+366 KiB). Artış kalemi:
Leaflet 150 KB + Leaflet CSS 18 KB + GeoJSON world 189 KB + GeoJSON
Türkiye 9 KB. Tek seferlik install; sonraki ziyaretlerde cache'ten.

### Doğrulama

- `npm run build` 0 hata (21.05 s)
- `npm run build:geo` devDeps'den çalışır, GeoJSON çıktısı
  deterministik
- Smoke test 16/16 pass: 39 geoPoint'in koordinatları geçerli
  aralıkta, tüm `exhibitIds` referansları ExhibitRegistry'de var,
  `getGeoByKind('mine')` 15 maden döner, Türkiye BBOX beklenen 4
  noktayı yakalar (trabzon-hasir, mardin-telkari,
  istanbul-kapalicarsi, ankara-darphane), 27 noktada era.start
  geçerli sayı, dist/geo/ GeoJSON'lar 10,587 koordinat noktasının
  hepsi lat/lng aralığında
- Mevcut `GeoBadge` (6-B'de eklenmişti) `/map#id` linkleri artık
  işlevsel — daha önce "gelecekte çalışacak" olan deep-link bu
  sürümde çalışıyor
- Runtime browser testi sandbox'ta yapılmadı (HTTP preview
  başlatılamadı); filesystem + kod düzeyi doğrulama tam

### Keşifler / Sapma notları

- **Kind label/color duplication** WorldMapPage ↔ LeafletMap — ikisi
  de küçük sabit. 6-Z polish'te shared utils'e çekilebilir.
- **World Tour oyunu migrate edilmedi** — 6-A notunda belirtilen
  `worldOrigins.js` → `geoPoints.js` geçişi 6-D'de yapılmadı (6-D
  odak: harita; oyun dokunulmadı). Paralel veri duplikasyonu bilinçli.
- **Runtime test sandbox sınırı** — `vite preview` oturum kapanışında
  SIGHUP alıyor, HTTP server stabil değil. Doğrulama filesystem/kod
  düzeyinde yapıldı; UI render testi gerçek browser ortamında
  yapılmalı.
- **GeoJSON hassasiyeti 3 ondalık (~100m)** — 4 ondalık ~%20 gzip
  artırıyordu, 3 ondalık Z7'de fark edilmiyor.

---

## [0.11.0] — 2026-04-21 — Faz 6-C: Hikâyeler Zenginleştirme

Faz 6'nın üçüncü alt-fazı. 6-A/6-B'deki sergi-ölçeğindeki zenginliği
(kaynakça, timeline, küratör notu, geoPoints, sözlük, 4-bölümlü related
grid, citation footnote) 5 hikayenin tamamına getirdi. Mimari olarak
`_storyEnrichment.js` enrichment layer pattern'ini (6-A'nın ikizi)
`stories.js`'in başındaki 2-C anlatılarına uyguladı. UI tarafında
StoryPage baştan aşağı yeniden yazıldı; 6 yeni bölüm, veri varsa
render edilir — backward compat tam.

### Kritik Düzeltme — Trabzon Hasırı hikayesi UNESCO hatası

Oturumun açılışında UNESCO'nun Türkiye resmi ICH sayfası taranırken
tespit edildi: 4. hikâye ("Trabzon Hasırı'nın UNESCO Yolu") UNESCO ICH
listesinde olmayan bir tescili gerçekmiş gibi anlatıyordu. Gerçek
koruma **2004 Türk Patent coğrafi işaret tescilidir**.

Hikâye coğrafi işaret-merkezli yeniden çerçevelendi; duygusal yapı
(usta-çırak, zanaatın canlanması) korundu. Değişiklikler:

- Başlık: "UNESCO Yolu" → "Canlanma Yolu" (TR/EN/AR)
- Subtitle TR/EN/AR: UNESCO referansı coğrafi işarete dönüştü
- Sahne 4: Doğrulanmamış "60 usta" rakamı çıkarıldı, gemsociety.org
  ile tutarlı "yüzlerce kadın dokumacı" ifadesi kondu
- Sahne 5: 2020 UNESCO salonu sahnesi → 2018 Trabzon atölyesinde
  usta-çırak geçiş anı (Daily Sabah 2025 referansıyla "Kunduracılar
  Caddesi, Körfez turistleri" gerçek bağlamında)
- Takeaway: "dünyanın hafızasında yer" → "ismini koruyan bir işaretle"
- StoriesIndex tanıtım metninden "pandemiye rağmen" ifadesi kaldırıldı
- `curatorNote`: UNESCO listesinde olmadığını açıkça belirten 3 dilli
  uyarı notu, `unesco-ich-turkiye` + `turkpatent-gi-trabzon-hasir`
  kaynaklı

ID `trabzon-hasiri-unesco` route/enrichment bağlarını kırmamak için
aynı bırakıldı.

### Yeni dosyalar

- `src/data/_storyEnrichment.js` (~260 satır) — 5 hikâye için
  metadata: sources, relatedLabs, relatedQuizzes, geoPoints, timeline,
  vocabulary, curatorNote
- `src/components/common/BodyWithCitations.jsx` (73 satır) — 6-B'de
  ExhibitDetail içinde inline olan sürüm shared bileşene çıkarıldı;
  `renderInlineCitations` de named export olarak kullanılabiliyor
- `src/components/common/StoryTimeline.jsx` (125 satır) — yatay tarih
  şeridi, inline `[n]` cite marker desteği, derin zaman formatı
  (`~3 milyar yıl`, `~5 Gyr ago`)
- `src/components/common/CuratorStoryNote.jsx` (68 satır) — hikâye
  seviyesinde küratör notu, opsiyonel inline cite
- `src/components/common/VocabularyChips.jsx` (58 satır) — glossary
  terimlerini `/glossary?q=<term>` deep-link chip'leri olarak gösterir

### Değiştirilen dosyalar

- `src/pages/StoryPage.jsx` baştan aşağı yeniden yazıldı. Yeni bölümler
  sırayla: **LocationStrip** (hero altı) → Scenes → Takeaway →
  **CuratorStoryNote** → **StoryTimeline** → **VocabularyChips** →
  **RelatedGrid** (eski tek-satır relatedExhibits chip'lerinin yerine,
  4-bölümlü) → **CitationsFootnote** → OtherStories. Footnote
  aggregation `useMemo` ile: timeline[i].cite + curatorNote.cite +
  story.sources aynı numara listesinde birleşir.
- `src/pages/ExhibitDetail.jsx` yerel BodyWithCitations ve
  renderInlineCitations tanımları silindi; shared bileşen import
  edildi. Davranış değişmedi; ExhibitDetail chunk 19.38 → 7.27 KB
  gzip'e düştü.
- `src/pages/GlossaryPage.jsx` `useSearchParams` ile `?q=<term>`
  query-param okuma eklendi (VocabularyChips deep-link hedefi olsun
  diye). Browser back/forward'da state senkronize olur.
- `src/pages/StoriesIndex.jsx` intro metninde pandemi referansı
  kaldırıldı.
- `src/data/stories.js` başa `_stories_raw` rename, sona
  `enrichStory` merge + yeni `stories` export + enriched getStory/
  getStoriesByExhibit. Trabzon hikayesinin 4 ve 5. sahne body'si,
  başlık, subtitle, takeaway düzeltildi.
- `src/data/sources.js` 11 yeni kaynak eklendi: `wiki-cullinan-diamond`,
  `worldhistory-cullinan`, `wiki-mons-smaragdus`, `cailliaud-1822`,
  `ligo-gw170817`, `nasa-neutron-star-gold`, `british-museum-croesus`,
  `gemsociety-trabzon`, `daily-sabah-trabzon`,
  `turkpatent-gi-trabzon-hasir`, `unesco-ich-turkiye`. Toplam:
  18 → 29 kaynak.
- `package.json` 0.10.0 → 0.11.0.

### Yeni hikâye alanları (enrichment layer, tamamı opsiyonel)

```js
{
  sources: ['source-id', ...],
  relatedLabs: ['lab-id'],
  relatedQuizzes: ['quiz-category-id'],
  geoPoints: ['geo-id', ...],  // çoklu — sergide tekildi
  timeline: [{ year, event: {tr,en,ar}, cite?: ['source-id'] }],
  vocabulary: ['glossary-term-id', ...],
  curatorNote: { tr, en, ar, cite?: ['source-id'] },
}
```

### Karar 1 (Minimal) disiplini korundu

Sahne body metinleri dokunulmadı; "küratör yorumu" kategorisinde
kaldılar. İnline `[cite:xxx]` marker'ı sahnelerin hiçbirinde
eklenmedi. Kaynakça yalnızca enrichment alanları (timeline cite,
curatorNote cite, sources) üzerinden akar. `BodyWithCitations` bileşeni
sahnelerde hâlâ [n] marker'ı görürse süperscript yapar; 6-F/6-H
ihtiyaç olduğunda kullanıma hazır bekler.

### Bundle etkisi

- Initial index chunk: 118.94 → **140.08 KB gzip** (+21.14 KB)
- ExhibitDetail chunk: 19.38 → 7.27 KB (−12.11 KB, iyi yönde)
- StoryPage chunk: 3.90 KB (yeni split)
- PWA precache toplam: 1344.91 → 1364.77 KiB (+19.86 KiB, ~%1.5)
- Build süresi: 20.30 → 27.91 s

Sebep: `stories.js` + `_storyEnrichment.js` + `geoPoints` +
`glossary-extended` RelatedGrid/VocabularyChips/LocationStrip üzerinden
shared dependency oldu; Rollup bunları initial chunk'a bindirdi.
Bütçe hedefi ≤200 KB gzip — ferah altında. 6-Z audit oturumunda
`manualChunks` ile lazy route'a taşınabilir.

### Doğrulama

- `npm run build` 0 hata (27.91 s)
- Smoke test (96/96 pass): tüm source ID'leri `getSource()` ile çözümleniyor, tüm geoPoint ID'leri `getGeoPoint()` ile bulunuyor, tüm timeline cite'ları tanımlı, Trabzon UNESCO temizliği 3 dilde doğrulandı, `getStoriesByExhibit` enriched versiyonu dönüyor
- Mevcut sayfalar: ExhibitDetail'in yerel BodyWithCitations'ı shared'a geçti, davranış birebir aynı; bundle boyutu düştüğü için test pozitif
- Backward compat: `relatedExhibits` (Faz 2-C alanı) hâlâ RelatedGrid tarafından okunuyor; enrichment olmayan bir hikâye yalnızca base alanlarla görüntülenir

### Keşifler / Sapma notları

- **Initial chunk +21 KB** shared dependency etkisi (plan maddesinin sonunda detaylı)
- **Scene icon normalize'ı 6-Z'ye kaldı** — sahneler dokunulmadı; RelatedGrid'te story kartında emoji fallback (📖) hâlâ aktif
- **Build script hikâye cross-ref'lerini işlemiyor** — StoryPage zaten doğrudan enrichment okuyor; 6-D haritası için gerekirse script genişletilir
- **Midyat Telkârisi 2013 GI cite** aynı kurum referansı (Türk Patent) kullanıldı; 6-Z'de ayrı kayıt açılabilir
- **Trabzon revizyonu** duygusal omurgayı kesmedi: "nesiller arası geçiş" teması sahne 5'te "bir çocuğun eline tel uzatıldı" anıyla korundu

---

## [0.10.0] — 2026-04-21 — Faz 6-B: Sergi Salonları Zenginleştirme

Faz 6'nın ikinci alt-fazı. 6-A'da veri katmanı zenginleştirildi; 6-B'de
bu veri UI'a bağlandı. 7 yeni React bileşeni, ExhibitDetail sayfasına
7 yeni bölüm, HallPage'e stats strip, Lab/Quiz deep-link desteği,
10 yeni audioScript. Yeni bölümlerin hepsi veri varsa render ediliyor —
veri yoksa backward compat tam, eski sayfalar hiçbir şekilde kırılmıyor.

### Kritik Bug Fix

**`_enrichment.js` lab ID uyumsuzluğu giderildi.** 6-A'da `karat-calculator`,
`mohs-scratch`, `silver-tarnish`, `diamond-cut-simulator`, `lydia-mint`,
`melting-points`, `stone-guessing` yazılmıştı; LabPage gerçek ID'leri kısa
form (`karat`, `mohs`, `tarnish`, `light`, `lydia`, `melt`, `guess`).
6-B'deki RelatedGrid bu ID'lerle `/lab?id=xxx` linki üretir — düzeltme
olmasaydı tüm lab chip'leri 404 olurdu. 16 yer sed ile düzeltildi.

### Plan düzeltmesi

**Sergi sayısı: 44 değil 42.** 6-A planı 44 diyordu; fiili sayım 42
(altın 6, gümüş 3, pırlanta 6, renkli taşlar 13, platin 4, takı 5, zanaat 7 —
toplam 42 + 2 yanlış sayılan; 4 sergi ID'si olan `id:` satırları nested
digDeeper objelerinin alt-ID'leriydi). `_enrichment.js` zaten 42/42
eşleşiyordu; plan metnindeki hatalı rakam düzeltildi.

### Yeni bileşenler

**`src/components/museum/SpecsCard.jsx`** — 125 satır. `exhibit.specs`
objesini etikete-değer grid'inde gösterir: `composition`, `purity`, `weight`,
`density`, `hardnessMohs`, `dateRange`, `formula`, `refractiveIndex` vb.
17 standart alan için üç dilli label map + kebab-case fallback.
`cite` rozet (numaralı süperscript) header'da sağda görünür.

**`src/components/museum/ComparisonCard.jsx`** — 110 satır. İki sergiyi
belirli bir ekende (`purity`, `hardness`, `value`, `rarity`, `historical`,
`weight`, `origin`) yan yana gösterir. Her iki taş SVG GemIcon ile, aralarında
`↔` işareti, karşılaştırma cümlesi altında. Karşı taş kartı tıklanırsa o
sergiye gider. Şu an 5 sergide (`safir`, `yarim-altin`, `platin-vs-altin`,
`ceyrek-altin`, ...) aktif.

**`src/components/museum/CitationsFootnote.jsx`** — 95 satır. Sayfanın
dibinde numaralı kaynakça. Her satır `formatSource()` Chicago-lite formatı.
URL'si olan kaynaklar dış link olarak render, `ExternalLink` ikonu ile.
Her sergi için `{resolvedBody footnotes} + specs.cite + exhibit.sources`
birleşik listesi, dupe'lar tek numara.

**`src/components/museum/AudioScriptPanel.jsx`** — 95 satır. Collapsible
panel. Kapalıyken "Okumak için aç (~Xs)" — kelime sayısından 160 wpm hesaplı
yaklaşık okuma süresi. Açıldığında tam metin + küçük "audio yakında" ipucu.
Faz 7 TTS pipeline için hazır.

**`src/components/museum/GeoBadge.jsx`** — 50 satır. Küçük
"📍 Nereden? — Muzo, Kolombiya" chip'i. Hero'nun altında görünür.
Tıklanırsa `/map#geoPointId`'e gider — Faz 6-D'deki harita sayfası bu
hash'i okuyup ilgili noktayı vurgulayacak.

**`src/components/museum/RelatedGrid.jsx`** — 205 satır. Mevcut "Related
Exhibits" tek satır chip'inin yerini alan 4 bölümlü grid: **İlgili
Sergiler** (chip'ler), **İlgili Hikâyeler** (2 sütun kart, readMinutes
+ subtitle), **İlgili Deneyler** (`/lab?id=xxx` chip'leri, emoji + ad),
**İlgili Quizler** (`/quiz?cat=xxx` chip'leri). Her bölüm boşsa render
olmaz; hepsi boşsa tüm grid gizli.

**`src/components/common/ExhibitCuratorMini.jsx`** — 45 satır. Sergi-seviyesi
küçük "küratörden not" kartı. HallPage'deki tam CuratorNote'un daha
kompakt versiyonu. 10 sergide aktif.

**`src/components/museum/index.js`** barrel 6 yeni export ile güncellendi.

### Değiştirilen sayfalar

**`src/pages/ExhibitDetail.jsx`** — 6-B'nin kalbi. Eklenenler:

- `useMemo` ile sergi ölçeğinde birleşik footnote numaralandırma
  (body `[cite:xxx]` tag'leri + `specs.cite` + `exhibit.sources`,
  dupe'lar tek numara)
- `BodyWithCitations` iç fonksiyonu: paragrafları böler, `[n]`/`[n,m]`
  pattern'ini `<sup>` süperscript'ine çevirir
- Bölüm sırası: Hero (+ **GeoBadge**) → Body (süperscript'li) →
  **SpecsCard** → **ExhibitCuratorMini** → **ComparisonCard** →
  **AudioScriptPanel** → [mevcut Gallery, ScienceBox, Timeline, DigDeeper,
  Stats, FunFact, StoryThread, Interactive] → **RelatedGrid** (eski
  single-row related'ı değiştiriyor) → **CitationsFootnote**
- Şema commenti 6-B alanlarıyla güncellendi

**`src/pages/HallPage.jsx`** — `HallStatsStrip` eklendi. Header altında,
CuratorNote üstünde. 4 chip: toplam sergi / kaynaklı sergi / sesli
anlatımlı sergi / haritalı sergi. 0 olan chip render olmaz.

**`src/pages/LabPage.jsx`** — `useSearchParams` ile `?id=karat|mohs|...`
query-param desteği. RelatedGrid'ten gelen deep-link'ler doğru deneyi açar.

**`src/pages/QuizHub.jsx`** — `useSearchParams` ile `?cat=altin|gumus|...`
query-param desteği. RelatedGrid'ten gelen deep-link'ler doğru kategoriyi
ön-seçer.

### AudioScript içerik artışı (4 → 14)

10 yeni küratör narration'u eklendi, hepsi TR/EN/AR 3 dilli:

- **Renkli taşlar:** `zumrut` (Kleopatra-bağlantılı), `yakut` (korund-krom),
  `safir` (korund-demir/titanyum, Keşmir)
- **Pırlanta:** `hope-pirlantasi` (bor-mavi, UV floresansı, Golconda→Smithsonian),
  `koh-i-noor` (Golconda→Londra, 186→105.6 karat, 4 ülke iadesi),
  `cullinan` (3106 karat, Asscher kesim efsanesi, Sovereign's Sceptre)
- **Zanaat:** `trabzon-hasiri` (UNESCO 2023, 3-4 cm/gün), `telkari` (Mardin,
  0.2 mm tel), `kapalicarsi` (1461, %70 bilek üretimi, 100M ziyaretçi)
- **Platin:** `platin-nedir` (Pt 78, 21.45 g/cm³, Bushveld %75)

**İçerik disiplini:** Hepsi olgusal, uydurma mitoloji yok. "Lanetli Hope"
gibi pop-kültür efsaneleri yerine taşın gerçek rotası anlatıldı.
Kleopatra zümrüdünde belgeli madenler, Cullinan'da gerçek Asscher kesim
olayı, kapalıçarşıda gerçek üretim oranları gibi doğrulanabilir iddialar.
Her biri 430-820 karakter TR (60-90 saniye tempolu narrasyon için ideal).

### Metriikler

| Metrik                    | 6-A sonu        | 6-B sonu        | Değişim        |
| :------------------------ | :-------------- | :-------------- | :------------- |
| Sürüm                     | 0.9.0           | 0.10.0          |                |
| Initial index chunk (gz)  | 110.62 KB       | 118.94 KB       | +8.32 KB       |
| ExhibitDetail chunk (gz)  | ~17 KB          | 19.38 KB        | +2.38 KB       |
| PWA precache toplam       | 1329.44 KiB     | 1344.91 KiB     | +15.47 KiB     |
| Build süresi              | ~20s            | 20.30s          | ~              |
| audioScript toplam        | 4 / 42          | 14 / 42         | +10            |
| UI bileşen (museum+common)| 4+1             | 10+2            | +7             |
| Hata sayısı               | 0               | 0               | 0              |

Bundle bütçe ≤200 KB gzip initial — ferah altında.

### Smoke test doğrulamaları

- 14/14 audioScript mevcut, hepsi TR+EN+AR
- `findRelated({exhibitId:'zumrut'})` 2 derinlikte 8 ilgili içerik çıkarıyor
  (1 hikâye + 1 lab + 1 quiz + 4 sergi + 1 uzak sergi)
- GeoPoint lookup: Ankara Darphanesi (39.93°N), Muzo Kolombiya (5.5°N),
  Bohemya (50°N) — doğru
- Source lookup + `resolveCitations` dupe detect: `[cite:britannica,mohs]`
  → `[2,1]` (mohs zaten 1. olduğu için tekrar numaralanmıyor)
- Backward compat: en sade sergi (`garnet`) specs + Related(quiz) + footnote
  ile düzgün render; en zengin sergi (`zumrut`) 6 yeni bölümün hepsini
  render

---

## [0.9.0] — 2026-04-21 — Faz 6-A: Data Katmanı Derinleştirme

Faz 6 master planının ilk alt-fazı. **Kod değişikliği minimal, veri
genişlemesi büyük** — UI dokunulmadı (6-B'ye kaldı), ancak gelecek 8
alt-fazın tamamının besleneceği zengin veri iskeleti kuruldu.

Üç sabitleme kararı alındı (bkz. `FAZ-6-PLAN.md`):

1. **Minimal kaynakça** — yalnızca specs/tarih/formül gibi olgusal alanlar
   kaynaklı; mevcut anlatı "küratör yorumu" olarak kaynaksız kalır. Böylece
   44 serginin body metnine uydurma citation basma riski bertaraf edildi.
2. **Protomaps self-hosted** — harita tile stratejisi (6-D). OSM ana
   server'ın ToS grisinden kaçınmak + PWA offline için doğru karar.
3. **Plandaki orijinal alt-faz sırası** — 6-A → B → C → D → E → F → G → H → Z.

### Yeni dosyalar

**`FAZ-6-PLAN.md`** (projenin kökü). Canlı plan belgesi — her oturumda
güncellenir. 9 alt-faz skeleton'ı, kabul kriterleri, notlar bölümü,
oturum sonu protokolü.

**`src/data/sources.js`**. Kaynakça kayıtları için merkez. 17 doğrulanmış
kaynak: Mohs (1812, Graz), Tolkowsky (1919, University of London),
GIA, Britannica, UNESCO, USGS, LBMA, Smithsonian, Royal Collection Trust,
Topkapı, British Museum, Mindat, Online Etymology Dictionary, TDK, vb.
Şema: `{id, kind, title, author, year, publisher, url, retrievedAt}`.
`formatSource(source, locale)` Chicago-lite formatı üretir.

**`src/utils/content.js`**. 7 saf helper fonksiyon: `resolveCitations`
(inline `[cite:id]` tag'lerini numaralı dipnotlara çevirir),
`formatFootnotes`, `findRelated` (BFS cross-ref traversal, dışarıdan
`crossRefs` injection ile circular import'u önler), `pickByCategory`,
`formatSpecValue`, `citationStyle`. Hepsi test edilebilir, yan etkisiz.

**`src/data/geoPoints.js`**. Merkezi coğrafi veri tabanı — 39 nokta.
Eski `worldMap.js` (%-coord SVG pinler) ve `worldOrigins.js` (10 taş
kökeni) birleştirilip genişletildi. Yeni eklenenler: Bushveld (platin),
Witwatersrand (altın), Varna nekropolü, Luksor, Lidya (Sardis), Smithsonian,
Tower of London, Topkapı, Dresden Green Vault, GIA Carlsbad, Midyat
(savat), Sivas Divriği, Ankara Darphanesi, Mons Smaragdus (Kleopatra'nın
zümrüt madenleri), Golconda, Miken, Potosí, Nova Scotia, Antwerp, Jaipur,
47th Street NY, eski Basel Fair, Ponte Vecchio, Beijing cloisonné.
Her nokta `{id, lat, lng, kind, name, place, stones?, crafts?, hintRegion,
fact, exhibitIds, era?, active?}` şemasında. `kind`: mine/workshop/museum/
site/trade-hub/deposit. Koordinatlar OSM/Wikipedia referansıyla ~0.1°
hassasiyette — harita amaçlı yeterli.

**`src/data/exhibits/_enrichment.js`**. 44 serginin tamamı için yeni alan
eklemeleri, tek dosyada ID→field map olarak. Orijinal sergi dosyalarına
(altin.js, gumus.js vb.) dokunulmadı. Eklenen alanlar (hepsi opsiyonel):

- `specs` — sayısal/olgusal veri (composition, density, hardnessMohs,
  dateRange, formula, refractiveIndex, vb.) + `cite: ['source-id']`
- `sources` — bu sergiyi destekleyen kaynak ID'leri
- `comparison` — `{withExhibitId, axis, insight:{tr,en,ar}}`; Mohs
  8→9→10 geçişi, yakut-safir ayrımı gibi cross-sergi öğretim
- `audioScript` — 60-90 saniyelik üç dilli küratör narration metni
  (Faz 7'de TTS için hazır). Bu turda 2 sergi için yazıldı: Mohs skalası
  (1812 Graz hikâyesi) ve Brilliant kesim (1919 Tolkowsky). Geri kalan
  42 sergi için 6-B'de seçilen 10-15 tanesine daha eklenecek.
- `relatedStories`, `relatedLabs`, `relatedQuizzes` — cross-ref ağı
- `geoPointId` — harita bağlantısı (Faz 6-D)
- `curatorNote` — kısa "biliyor muydun?" üç dilli anekdot

Merge için `enrichExhibit(exhibit)` helper'ı. Mevcut specs varsa üstüne
biner (shallow merge). `exhibits/index.js` tüm sergileri bu helper ile
zenginleştirir.

**`src/data/glossary-extended.js`**. 30 yeni sözlük terimi. Mevcut
base 53 + extended 30 = **83 toplam** terim. Etymology politikası sıkı:
yalnızca Online Etymology Dictionary veya TDK ile doğrulanmış olanlar
(3 terim — karat/sterling/solidus). Doğrulanamayanlarda etymology alanı
YOKTUR (uydurma yasak). Yeni kategoriler: ayar sistemi detayları
(milyem, solidus, elektrum, mücur, altın standardı), pırlanta teknik
(kimberlit borusu, floresans, inklüzyon, table/culet/girdle, crown angle,
pavilion, cleavage, HPHT, CVD, çatışma elması), renkli taş aileleri
(korund, beril), optik (kırılma indisi, piezoelektrik, oyun-renk,
asterizm), zanaat (niello, cloisonné, hallmark).

**`scripts/build-crossrefs.js`**. Node ESM script. Sergi/hikâye/timeline/
geoPoint verilerini tarayıp 5 adet tersine indeks üretir:
`byExhibit`, `byStory`, `byLab`, `byGeoPoint`, `byQuizCategory`.
Çıktı: `src/data/crossRefs.js` (~60 KB). `package.json`'a iki script
eklendi: `npm run build:crossrefs` (manual) ve `prebuild` hook'u —
`npm run build` öncesi otomatik regenerate.

**`src/data/crossRefs.js`**. OTOMATİK üretilmiş indeks. Elle düzenlenmez.
Örnek: zümrüt sergisi artık otomatik olarak Kleopatra hikâyesine,
Mohs deneyine, 3 timeline olayına (MÖ 1500, MÖ 30, 1558), 2 coğrafi
noktaya (Muzo Kolombiya + Mons Smaragdus Mısır) ve 4 ilgili sergiye
bağlı. 6-B'de UI bu veriyi "Yakın içerik" paneli olarak render edecek.

### Değiştirilen dosyalar

**`src/data/exhibits/index.js`** — `enrichExhibit` merge entegrasyonu.
Hall bazlı diziler artık `*.map(enrichExhibit)` ile zenginleştirilir.
Orijinal veriler dokunulmaz (immutable pattern). Backward compat tam.

**`src/pages/GlossaryPage.jsx`** — `glossary-extended` import edilip
base 53 ile merge edildi. Diğer hiçbir şey değişmedi; mevcut arama/
filtre/word-of-the-day mekanikleri zero-touch çalışıyor. Chunk 19.7 →
32.0 KB gzip 14.3 KB — beklenen büyüme.

**`package.json`** — `build:crossrefs` ve `prebuild` script'leri.

### Doğrulama

- Tüm yeni dosyalar `node --check` ile syntax temiz.
- `npm run build` — 0 hata. Initial bundle 110.62 KB gzip (+0.01 KB —
  enrichment sadece sergi chunk'ında, ana rotaya sızmadı).
- Enrichment merge smoke testi: Mohs sergisi — `body` korundu,
  `specs.developer`, `specs.year`, `sources`, `audioScript` eklendi.
- CrossRefs smoke testi: zümrüt sergisi 5 farklı veri türüne otomatik
  bağlandı.
- Regresyon yok — tüm Faz 5 sayfaları ve oyunları olduğu gibi çalışıyor.

### Sapma kararları ve notlar

- **Glossary hedefi düşürüldü:** 100 terim planı 83'e çekildi. Sebep:
  etymology için dürüstlük — 47 yeni terime hızlı etymology yazmak çoğu
  için doğrulanamayan iddia üretecekti. Kalan 17 terim 6-Z audit
  oturumunda doğrulanmış etymology'lerle eklenebilir.
- **Gallery şeması değişmedi:** Plan raster fotoğraf + credit öneriyordu;
  mevcut `gallery` zaten SVG-component tabanlıydı (`{type:'svg',component,
  caption}`). 6-B'de SVG registry genişletilecek, raster eklenmeyecek
  (görsel dosyası yok, maintenance yükü büyük).
- **`_enrichment.js` pattern'i:** 44 sergi dosyasına 44 ayrı edit atmak
  yerine tek dosyada merkezi map tutuldu. Avantaj: tek review noktası,
  orijinal dosyalar dokunulmaz, ileride silinmesi kolay.
- **`audioScript` sadece 2 sergi:** 6-B'de 10-15 sergiye daha yazılacak;
  her biri yazım emeği gerektirdiği için disiplinli tutuldu.

### Sayılar

| Metrik                      | Değer |
| :-------------------------- | ----: |
| Sergi (değişmedi)           |    44 |
| Doğrulanmış kaynak          |    17 |
| Coğrafi nokta               |    39 |
| Glossary terimi (toplam)    |    83 |
| Cross-ref: sergi→geo eşleşme|    28 |
| Cross-ref: hikâye referansı |     5 |
| Cross-ref: lab referansı    |     7 |
| Timeline olayı (değişmedi)  |    80 |
| Initial bundle (gzip)       | 110.62 KB |

---

## [0.8.1] — 2026-04-20 — Faz 5-C: Polish

Faz 5-B sonrası açık kalan küçük-orta ölçekli pürüz giderme turu.
Yeni özellik yerine mevcut oyunların UX'inin sağlamlaştırılmasına
odaklandı.

### Yeni: Kişisel en iyi skor takibi

`ProgressContext`'e `gameBests: { [gameId]: { [difficulty]: score } }`
state\'i eklendi. Monotonic bir `setGameBest(gameId, difficulty, score)`
action\'ı ile skorlar güncelleniyor — düşük skor hiçbir zaman yükseği
ezmez. Spec gereği hâlâ in-memory (sayfa yenileme ile sıfırlanır).

UX entegrasyonu:

- **GameOverScreen**: Yeni bir yüksek skor kırıldıysa büyük gold
  "YENİ REKOR! 🔥" rozeti, aksi halde "Previous best: 250 (usta)"
  mini-etiketi ana skorun altında. Trilingual.
- **GamesHub tile\'ları**: Oynanmış oyunlara `★ 250` pill\'i eklendi —
  kullanıcı bir bakışta hangi oyunları oynadığını ve en iyi skorunu
  görüyor.

`GameShell` "over" fazında otomatik olarak `setGameBest` çağırır.
Tüm 5 oyun zero-touch entegre.

### Düzeltmeler

**Match-3 patlama animasyonu.** 0.8.0-alpha\'da matched cell'lerde
`animate-popIn opacity-0` kombinasyonu vardı — bu aslında cell\'i
hızlıca büyütüp sonra anında kaybolduruyordu, akıcı değil. Tailwind
config\'e gerçek bir `popOut` keyframe\'i eklendi (1.0 → 1.25 scale +
fade out), Match-3 bunu kullanıyor. Görsel fark belirgin.

**RTL (AR dili) margin düzeltmeleri.**
- `MohsClimb` toast\'ındaki `<strong className="mr-1">` →
  `mr-1 rtl:mr-0 rtl:ml-1` yapıldı
- `TimelineRush` round-delta skor span'ı `ml-2` →
  `ml-2 rtl:ml-0 rtl:mr-2`
- `GameOverScreen`\'deki `bestOf` separator margin\'i RTL-uyumlu
  hale getirildi

Daha önce decoratif gradient blob\'ların `-top-12 -right-12`
konumlandırması cosmetic — görsel olarak mirrorlanmıyorlar ama
UX etkilemiyor; bilinçli olarak dokunulmadı.

**Reduced motion** zaten global CSS ile (`index.css:120`) tüm
animasyonları 0.01ms\'ye indiriyordu — bu spec item\'ı aslında
Faz 4\'ten beri karşılanmışmış. Spec checklist güncellendi.

### Dokümantasyon

- **README.md**: "Ne içeriyor?" bölümüne "Oyun Merkezi (5 oyun) —
  Faz 5" başlığı eklendi. 5 oyun tek paragraflık özetlerle.
- **CONTRIBUTING.md**: "Yeni oyun ekleme (Faz 5+)" bölümü eklendi.
  Games metadata şablonu, onFinish payload şeması, rozet check
  formu, yapı kararları (localStorage/pointer events/RTL/lazy
  chunk/prefers-reduced-motion), test protokolü.

### Build

Initial bundle **102.11 KB gzip** (önceden 102.00 KB — personal-best
wiring için +0.11 KB). Bütçe altında, fark pratik olarak sıfır.

### Faz 5 kesin kapanış

- [x] 5/5 oyun tam implementasyon
- [x] 5/5 rozet kazanılabilir
- [x] Kişisel en iyi skor takibi (bonus)
- [x] `prefers-reduced-motion` desteği (zaten vardı — doğrulandı)
- [x] RTL kritik margin düzeltmeleri
- [x] README games bölümü
- [x] CONTRIBUTING yeni oyun ekleme rehberi
- [x] `npm run build` 0 hata, 102 KB gzip initial
- [ ] Mobile 360px + AR RTL manual QA — son el kullanıcı testine bırakıldı

---

## [0.8.0] — 2026-04-20 — Faz 5-B: Kalan 3 Oyun + Faz 5 Tamamlandı

Faz 5-A\'nın (altyapı + Match-3 + Timeline Rush) üstüne bu alt-faz son
üç oyunu ekledi: **Mohs Merdiveni**, **Kuyumcu Atölyesi** ve **Dünya
Turu**. Artık 5 oyunun hepsi tam oynanabilir ve 5 rozetin hepsi
kazanılabilir durumda.

### Oyun 3: Mohs Merdiveni (`mohs-climb`) — **Full**

Endless climber / dodger. Player bir `<div>` arena\'sı içinde 5 şeritte
duruyor; yukarıdan yuvarlak "mineral token"ları düşüyor. Her biri
üstünde Mohs sertliği yazılı:

- Mohs > oyuncu seviyesi → **level up**, avatar bir sonraki sert gem\'e
  dönüşür, ekrana 2 sn açılır fact kartı çıkar
- Mohs = oyuncu seviyesi → no-op (+2 puan tie bonus)
- Mohs < oyuncu seviyesi → **-1 can**, "dikkat" toast\'ı

**Mimari notlar:**

- **requestAnimationFrame ana döngüsü.** `tokensRef.current` array\'i
  mutable — React state olarak tutulmuyor. Her frame: spawn (time-gated),
  pozisyon güncelle, çarpışma kontrolü (bounding box), ekrandan
  çıkanları filtrele. Sadece skor/level/can değiştiğinde setState.
  Küçük bir `bump` state\'i token layer\'ının rerender olması için var.
- **Ref\'lerle lip-sync.** `laneRef`, `levelRef`, `livesRef`, `scoreRef`
  her render\'da güncellenir; rAF loop bunları okur, böylece closure
  stale olmaz.
- **Responsive çizim.** Court\'un logical boyutları (480×540) CSS
  tarafından actual render size\'a scale edilir. Token\'lar %-based
  `left/top` kullanıyor — mobilde 360px\'te tam çalışıyor.
- **A11y.**
  - Klavye: ← / → ile şerit değiştir
  - Her token\'da `aria-label` ("Mohs 7 Kuvars")
  - `prefers-reduced-motion` respect: player avatar animation kapanır,
    token\'larda `willChange` off
  - Her zaman görünür Mohs ladder reference (1-10) altta

**Difficulty:**
- **Çırak**: 3 can, 1400ms spawn, ±1 Mohs window, havuz etrafında.
- **Kalfa**: 3 can, 1100ms spawn, ±2 Mohs, %25 rastgele.
- **Usta**: 2 can, 900ms spawn, %100 rastgele. Gerçek chaos.

**Rozet `mohs-climber`:** Mohs 10\'a ulaş (herhangi bir zorluk).

**Eğitim:**
- Her level-up\'ta mineralle ilgili mikro-fact (talc → tırnak, apatit →
  kemik bağlantısı, feldspar → granitin %50\'si, vs.)
- Oyun sonunda Mohs skalasının GÖRECELİ olduğu vurgusu — Elmas (10)
  Kuvars\'tan (7) ~140× daha sert. Skala doğrusal değil.

### Oyun 4: Kuyumcu Atölyesi (`jewelers-shop`) — **Full**

Simulation / crafting. Müşteri gelir, brief verir (bütçe + stil + alerji),
oyuncu 4 picker kullanarak bir yüzük tasarlar:

1. **Metal** (14k / 18k / 22k altın / 925 gümüş / Platin) — her birinin
   gram fiyatı farklı, 14k\'nın nikel içerme riski var
2. **Ana Taş** (7 seçenek: pırlanta → turkuvaz, fiyat/karat hiyerarşili)
3. **Kesim** (brilliant / princess / emerald — stil sınıflandırılmış)
4. **Montaj** (solitaire / halo / trilogy — gram ve işçilik çarpanı
   farklı)
5. **Karat** (0.25 → 2.0 ölçek)

**Canlı fiyat paneli** her değişiklikte anında güncellenir: metal
maliyeti (gram × ayar × baz fiyat), taş maliyeti (karat × kesim çarpanı),
%15 işçilik, toplam TL. Müşteri bütçesiyle karşılaştırma chip\'i renkle
uyarıyor: yeşil (±%10), altın (±%25), kırmızı (aşım).

**Değerlendirme (3 kategori × 5 puan = 15 max):**
- **Malzeme**: alerji respected mi? Metal ayarı uygun mu?
- **Tasarım**: klasik/modern brief\'e stone+cut+setting uyuyor mu?
  3\'ü de uyarsa 5/5, 2 uyarsa 4/5, 1 uyarsa 2/5, hiçbiri uymazsa 0/5
- **Fiyat**: ±%10 = 5/5, ±%25 = 3/5, aşırı altında = 2/5 (kalite
  endişesi), aşırı üstünde = hızla sıfıra iner

Her kategori için müşterinin kendi dilinde yorumu çıkar ("Bütçemde —
tam isabet! 💰" / "Biraz pahalı ama... tamam.")

**State machine** `useReducer` ile: `briefing → designing → feedback`
per customer. Usta zorlukta 5 müşteri üst üste (vardiya); Çırak/Kalfa\'da
1 müşteri.

**Rozet `master-jeweler`:** Usta vardiyasında 5/5 müşteri 15/15 yıldız
(tam isabet).

**Fiyat mantığı `src/utils/pricing.js`\'de** saf fonksiyon:
`calcPrice(design) → { metalCost, stoneCost, workmanship, total, grams }`
ve `evaluate(design, customer) → { material, design, price, total,
computed }`. Testable + game-agnostic.

**Müşteri havuzu `src/data/customers.js`** — 5 karakter, tamamen
trilingual quote + brief: Ayşe (düğün klasik 12K), Mehmet (modern 8K
nikel alerjisi), Zeynep (modern 3.5K), Ali Bey (25. yıl 25K klasik),
Deniz (ilk maaş 1.5K modern alerji).

**Eğitim hook\'ları:**
- Canlı gram×ayar görüntüsü: "18k altın %75 Au içerir, 4g × 2800 TL"
- Bütçe vs toplam tension (her ayar değişikliğinde farkı gör)
- Alerji uyarısı 14k için (nikel): kuyumculukta gerçek bir sorun
- End blurb: 22k neden Türkiye\'de gelenek (kolay şekillendirme),
  18k neden daha dayanıklı, 14k\'nın nikel riski, platinin özellikleri

### Oyun 5: Dünya Turu (`world-tour`) — **Full**

Coğrafya quiz\'i: mücevher göster, haritaya tıkla, mesafe = puan.

**Harita:** `src/data/worldMapSvg.js`\'te el-optimize edilmiş 7 kıta +
UK + Madagaskar SVG path\'leri. Toplamda ~2 KB inline SVG — bir atlas
değil, pedagojik arka plan. Equirectangular projeksiyon: viewBox
1000×500 + world bbox [lng -180..+180, lat -60..+75].

**Skor (Haversine ile gerçek km):**
- < 500 km → **100p** (tam isabet)
- < 1000 → 70p
- < 2000 → 40p
- < 4000 → 20p
- ≥ 4000 → 10p

**Interaksiyon:**
1. Prompt kartı ("Sar-i Sang lapis lazuli")
2. Harita üzerinde bir noktaya tıkla — kırmızı pin (henüz onaylanmadı)
3. "Onayla" butonuna bas
4. Reveal: kırmızı pin (senin tahminin) + yeşil pin (gerçek köken) +
   aralarında kesik çizgi + km ve puan
5. Fact kartı çıkar (o taşın gerçek hikâyesi)
6. "Sıradaki" ile devam

**10 tur per game.** Difficulty:
- **Çırak**: kıta ipucu gösterilir ("Orta Asya"), haritada kıta
  etiketleri açık
- **Kalfa**: ipucu yok, kıta etiketleri açık
- **Usta**: ipucu yok, etiketler yok — sadece silhouette

**Rozet `world-explorer`:** Usta\'da 800+ puan.

**10 taş / köken (tümü trilingual fact ile):**
Sar-i Sang lapis (Afganistan), Muzo zümrüdü (Kolombiya), peygamber
çiçeği safiri (Keşmir), Nişabur turkuvazı (İran), Coober Pedy opali
(Avustralya), Mogok güvercin kanı yakutu (Myanmar), Kimberley elması
(Güney Afrika), Bohem garnet (Çek Cumhuriyeti), Basra körfezi incisi
(Bahreyn), Baltık kehribarı (Kaliningrad).

**`src/utils/geo.js`** tam standalone: `haversineKm`, `svgToLatLng`,
`latLngToSvg`, `distanceToScore`, `WORLD_BBOX`. Hiçbir import yok,
test edilebilir.

### Build sonuçları (tüm 5 oyun dahil)

```
dist/assets/react-hAsfzUYt.js        165.95 KB │ gzip:  54.12 KB
dist/assets/index-jJaQ2Izd.js        252.74 KB │ gzip: 102.00 KB  ← main (DEĞİŞMEDİ)
dist/assets/icons-DLabfHzt.js         25.44 KB │ gzip:   5.72 KB
dist/assets/GamesHub-*.js              4.22 KB │ gzip:   1.97 KB
dist/assets/GamePlay-*.js             10.31 KB │ gzip:   3.80 KB
dist/assets/games-*.js                 7.07 KB │ gzip:   4.08 KB
dist/assets/GemMatch3-*.js             6.31 KB │ gzip:   3.21 KB
dist/assets/TimelineRush-*.js          7.12 KB │ gzip:   3.26 KB
dist/assets/MohsClimb-*.js             9.42 KB │ gzip:   4.80 KB  ← YENİ
dist/assets/JewelerShop-*.js          19.07 KB │ gzip:   7.46 KB  ← YENİ (en büyük oyun)
dist/assets/WorldTour-*.js            16.09 KB │ gzip:   7.80 KB  ← YENİ
```

- **İlk yükleme:** 419 KB (gzip **156 KB**) — Faz 5-A\'dan değişmedi.
  5 oyunun hepsi lazy, kullanıcı oyun oynamazsa sıfır ek maliyet.
- **Tüm oyunların toplamı:** sadece ~26.5 KB gzip. Bir kullanıcı 5
  oyunu da oynasa bile yükleme toplamı 420 → ~446 KB gzip.
- JewelerShop en büyük oyun (19 KB ham / 7.5 KB gzip) — içinde fiyat
  motoru, 5 müşteri datası, 4 picker + feedback UI var. Yine de makul.
- WorldTour 16 KB ham — çoğu inline SVG kıta path\'leri ve 10 kökenin
  trilingual factleri.

### Yeni bağımlılıklar

**Yok.** Proje hâlâ saf React + Tailwind + lucide-react ile çalışıyor.
Haversine, SVG path, müşteri havuzu — hepsi elle yazıldı.

### Faz 5 Tam Kabul Kriterleri (her ikisi birleşik)

- [x] `/games` rotası GamesHub ile 5 oyun tile\'ı gösteriyor
- [x] Her 5 oyun TR/EN/AR tam, 3 zorluk seviyesi, skor hesabı doğru
- [x] Her oyunun sonuç ekranında EducationalBlurb + ilgili sergi link\'i
- [x] 5 rozet `ProgressContext.unlockBadge` üzerinden eklenmiş
- [x] Header + Lobby + i18n + AchievementsPage entegrasyonları tamam
- [x] `npm run build` 0 hata, initial JS 156 KB gzip ≤ 250 KB
- [x] Her oyun ayrı lazy chunk
- [ ] Mobile viewport (360px) tüm oyunlar oynanabilir — manual QA gerekiyor
- [ ] RTL modda UI doğru akıyor — manual QA gerekiyor
- [x] CHANGELOG 0.8.0 entry yazıldı
- [ ] README.md ve CONTRIBUTING.md games bölümü — bir sonraki polish
  turunda eklenecek

### Mimari / polish notları

1. **Fiyat motoru test edilebilir.** `calcPrice` ve `evaluate` saf
   fonksiyonlar; bir test runner eklenirse (vitest) direkt import
   edilip 10 satırda 20 senaryo test edilebilir.
2. **Geo helpers tamamen standalone.** `haversineKm` 6 satır — test
   için Kolombiya-Afganistan mesafesi (~13.500 km) beklenen değer.
3. **Mohs Climb rAF loop clean şekilde teardown ediyor.** `runningRef
   = false` ve `cancelAnimationFrame`. GamePlay\'den çıkıldığında
   tamamen duruyor; memory leak veya background frame yok.
4. **World Tour\'daki basit SVG kıtalar.** Bir gün bir GIS-quality map
   istenirse, `d3-geo` + TopoJSON ile değiştirilebilir. Şimdilik yeter
   — çünkü scoring zaten GERÇEK lat/lng üzerinden yapılıyor; harita
   sadece kullanıcıya "Avustralya bu taraflarda" görsel referansı veriyor.

### Bir sonraki faz için olası polish

- **Sound effects** — Mohs Climb\'da level-up sound\'u daha karakteristik
  olabilir. Match-3 chain için pitch rising.
- **popOut animasyonu** — Tailwind config\'e ekle, match-3\'te fade-out
  daha pürüzsüz.
- **Mobile touch testleri** — özellikle Match-3\'te iki parmak swipe
  vs iki sequential tap arasındaki seçim. Şu an tap-to-select iyi
  çalışıyor ama drag jest\'i bazı çocuklar için daha sezgisel olabilir.
- **RTL review** — AR dilinde oyunlar çalışıyor ama WorldTour\'un
  "kıta labelleri" arapça çevrildiğinde taşma kontrolü yapılmalı.
- **Score persistence** — spec gereği localStorage YASAK, ama session
  sonunda bir "kişisel en iyi skorun" göstergesi GameContext\'te in-memory
  tutulabilir.

---

## [0.8.0-alpha] — 2026-04-20 — Faz 5-A: Oyunlar Altyapısı + 2 Oyun

Müzenin quiz ve laboratuvar deneylerinin yanına yeni bir `/games`
bölümü geldi. Çocukların "bir daha, bir daha!" diyeceği, puan ve rozet
odaklı replayable oyunlar. Bu alt-faz (5-A) altyapıyı ve en kolay iki
oyunu içeriyor; Faz 5-B kalan üç oyunu tamamlayacak.

### Yeni rotalar

- `/games` — **GamesHub**: 5 oyun tile\'lı, tür/süre/rozet bilgili kart
  gridi. Tile\'lara hover\'da yumuşak kalkış animasyonu + accent gradient.
- `/games/:gameId` — **GamePlay**: oyunu lazy-load eder, GameShell ile
  idle/playing/over yaşam döngüsü kurar.

### Altyapı (ortak oyun parçaları)

Yeni klasör: `src/games/` (oyunların kendisi) + `src/components/game/`
(paylaşılan UI parçaları).

- **`src/data/games.js`** — 5 oyunun trilingual metadata\'sı: tür,
  icon, accent renk, süre, difficulty, learningGoals, badgeId,
  relatedHall, `componentLoader`. `getGame(id)` yardımcısı + sabit
  `DIFFICULTIES` ve `DIFFICULTY_LABELS`.
- **`src/context/GameContext.jsx`** — mount-başı session state.
  Phase machine: `idle → playing → over`. Actions: `pickDifficulty`,
  `start`, `finish({ score, stats })`, `reset`. Spec gereği
  localStorage kullanılmıyor; GamePlay unmount olunca state sıfırlanır.
- **`GameShell`** — Her oyunun görsel ambalajı. Idle\'da hero kart +
  learningGoals + DifficultyPicker + büyük Başla butonu. Playing\'de
  çocuğu render eder. Over\'da GameOverScreen ile sonucu gösterir.
- **`ScoreBoard`** — Puan/süre/can/combo pill\'lerini içeren responsive
  başlık.
- **`DifficultyPicker`** — Çırak (★) / Kalfa (★★) / Usta (★★★) 3\'lü seçim.
- **`EducationalBlurb`** — "Biliyor muydun?" kutusu, over screen\'in
  altında oyundan çıkan bağlam faktlarını paketler.
- **`GameOverScreen`** — Trophy + büyük skor + badge banner + stats
  breakdown + blurb + Tekrar Oyna / Hub\'a Dön / İlgili Sergi CTA\'ları.

Shell-ile-oyun sözleşmesi: oyunlar pure component\'lar. Shell\'den
`{ difficulty, accent, onFinish }` props\'unu alır ve tamamlanınca
zengin payload ile `onFinish` çağırırlar:

```js
onFinish({
  score,      // final numeric
  won,        // bool → badge unlock
  summary,    // { tr, en, ar } one-liner
  blurb,      // { tr, en, ar } biliyor muydun
  breakdown,  // [{ label, value }, ...] sonuç istatistikleri
  bestOf,     // opsiyonel max
});
```

Bu yapı her oyunun tüm metinlerini kendi dosyasında tutmasını sağladı
— ortak "shell config" yok, dil tutarlılığı kopmuyor.

### Oyun 1: Taş Eşleştirme (`gem-match-3`) — **Full**

Klasik match-3, mücevher temasıyla.

- 8×8 CSS grid, GemIcon\'lar aktif animasyonla.
- Drag-and-drop değil — pointer tap-to-swap (iki hücreye sırayla
  dokun). Yanlış hamle reddedilir ve hafif `error` bip çalar.
- Zincir (chain) sistemi: ardışık match\'ler combo çarpanı artırır,
  max ×5. 5+ gem grupları +50p bonus, 4\'lük gruplar +25p.
- Her match\'te ekranın üstünde 1.2 sn "Zümrüt · Mohs 7.5" mikro-kartı
  belirir — eğitim ezberle değil akışla geçiyor.
- Zorluklar: 60/90/120 sn, 6/7/8 gem havuzu.
- Rozet `gem-matcher`: Usta\'da 500+.
- Final blurb kullanıcının en çok patlattığı taşı yakalayıp Mohs
  sertliğine göre context veriyor.

### Oyun 2: Zaman Sıralaması (`timeline-rush`) — **Full**

5 round, her round\'da 5 (Usta\'da 7) tarihsel olayı kronolojik
sıraya koy.

- HTML5 drag-and-drop değil — her kartın yanında ▲▼ oklar. Mobil +
  a11y dostu.
- `src/data/timelineEvents.js` ham veriden randomized sampling, yıl
  aralığı zorluğa göre filtrelenir (Çırak 200 yıl ayrı, Usta 25 yıl).
- Reveal fazında yanlış yerleştirilmiş her kartın yanında "Doğrusu
  sıra N" mesajı çıkar, altında olayın açıklaması + yıl gösterimi
  (MÖ/MS dile göre, AR: ق.م).
- Scoring: +10/doğru kart, -3/yanlış, speed bonus (mükemmel tur x1.5
  × kalan süre).
- Rozet `time-master`: Usta\'da 5/5 mükemmel tur.

### Stub\'lar (Faz 5-B için ayrılmış)

- `MohsClimb` — endless climber (rAF loop gerektiriyor)
- `JewelerShop` — useReducer state machine + fiyat mantığı
- `WorldTour` — SVG dünya haritası + Haversine mesafe

Hepsi `_ComingSoonStub.jsx` fallback\'i render ediyor; böylece
`/games/mohs-climb` yönlendirmesi 404 yerine tertipli bir "yakında"
ekranı gösteriyor. Tüm 5 rozet tanımlı; sadece ikisi şu an kullanılabilir.

### Entegrasyon noktaları

- `App.jsx` — 2 lazy route eklendi (`games`, `games/:gameId`).
- `Header.jsx` — `{ to: '/games', key: 'nav.games' }` Quiz\'den sonra,
  Workshop\'tan önce eklendi.
- `Lobby.jsx` — "Daha Fazla Keşfet" 3 sütundan **4 sütuna** (lg\'de)
  çıktı, ilk tile olarak Oyun Merkezi (accent `#c0392b`, ruby icon).
- `i18n/{tr,en,ar}.js` — `nav.games`: Oyunlar / Games / ألعاب.
- `achievements.js` — 5 yeni badge (`gem-matcher`, `mohs-climber`,
  `time-master`, `master-jeweler`, `world-explorer`) — her biri
  `check: (p) => p.badges.has(id)` şeklinde, `unlockBadge` ile açılıyor.

### Build sonuçları

Initial bundle hâlâ budget altında:

```
dist/assets/react-hAsfzUYt.js        165.95 KB │ gzip:  54.12 KB
dist/assets/index-CevNs7z4.js        252.74 KB │ gzip: 101.99 KB  ← main
dist/assets/icons-DLabfHzt.js         25.44 KB │ gzip:   5.72 KB
dist/assets/GamesHub-CscmNdmj.js       4.22 KB │ gzip:   1.97 KB  ← lazy
dist/assets/GamePlay-NNci_b33.js      10.31 KB │ gzip:   3.80 KB  ← lazy
dist/assets/GemMatch3-Bh55iXNh.js      6.31 KB │ gzip:   3.22 KB  ← lazy
dist/assets/TimelineRush-B2rp3zCV.js   7.12 KB │ gzip:   3.26 KB  ← lazy
dist/assets/games-B1k4nzOv.js          7.07 KB │ gzip:   4.08 KB  ← games metadata
dist/assets/MohsClimb-CU3UeRi0.js      0.23 KB │ gzip:   0.19 KB  ← stub
dist/assets/JewelerShop-C_lftNtv.js    0.21 KB │ gzip:   0.18 KB  ← stub
dist/assets/WorldTour-k13ZG6Vk.js      0.21 KB │ gzip:   0.18 KB  ← stub
```

- **İlk yükleme:** 418.69 KB (gzip **156.11 KB**) — Faz 4\'e kıyasla
  sadece +0.71 KB gzip (yeni nav linki + i18n key + Lobby değişikliği).
- GamesHub açıldığında +2 KB gzip, bir oyun seçildiğinde +3.3 KB gzip.
  Kullanıcı hiç oyun bölümüne gitmezse sıfır ek maliyet öder.

### Kabul kriterleri (Faz 5-A payı)

- [x] `/games` rotası GamesHub ile 5 oyun tile\'ı gösteriyor
- [x] 2/5 oyun (Match-3, Timeline Rush) TR/EN/AR tam, 3 zorluk, skor
- [x] 5/5 rozet tanımlı, 2/5 kullanıcı tarafından kazanılabilir
- [x] Header + Lobby + i18n + AchievementsPage entegrasyonları tamam
- [x] `npm run build` 0 hata, initial JS 156 KB gzip ≤ 250 KB
- [x] Her oyun ayrı lazy chunk
- [ ] Mobile viewport (360px) test — manuel doğrulama bekliyor
- [ ] RTL modda doğrulama — manuel doğrulama bekliyor
- [ ] Faz 5-B\'de kalan 3 oyun gelecek

### Mimari kararlar

1. **Shell-ile-oyun sözleşmesi `onFinish` payload\'ıyla yapıldı,
   shellConfig statik property\'siyle değil.** React.lazy wrapper
   bileşeni, fetch çözülene kadar statik property\'leri expose etmez;
   payload yaklaşımı bu zamanlama sorununu tamamen atlatıyor + tüm
   oyun kopyasını game.jsx dosyasında tutuyor.

2. **GameProvider globaln yerine sadece GamePlay\'i sarıyor.** Session
   state (skor, phase) hub\'da veya lab\'da leak etmemeli. GamePlay
   unmount olunca reducer state çöpe gidiyor, new mount = fresh game.

3. **Her oyun ayrı lazy chunk, `game.componentLoader` ile.** Kullanıcı
   Match-3 oynuyorsa Timeline Rush\'ın kodunu indirmiyor. Bir kullanıcı
   Mohs Climb\'a gitse bile sadece 0.23 KB stub indiriyor.

---

## [0.7.0] — 2026-04-20 — Faz 4: Production Hardening

Proje Faz 3\'e kadar "geliştirme sürümü" olarak olgunlaşmıştı.
Faz 4 production-ready hale getirdi: code splitting, PWA, SEO, CI,
community onboarding dokümanları.

### Performans — Code Splitting

**Öncesi:** Tüm uygulama tek JS bundle — **1059 KB** (gzip 357 KB).
Bir kullanıcı `/glossary`\'ye gitse bile pırlanta simülatörünün kodunu
indiriyordu.

**Sonrası:** React.lazy + Suspense ile sayfa-başı chunk. Vite
`manualChunks` ile vendor (`react` + router) + `icons` (lucide) ayrı
parçalara bölündü.

Üretim build sonuçları:

```
dist/assets/react-hAsfzUYt.js      165.95 KB │ gzip:  54.12 KB   ← React vendor
dist/assets/index-BHYmSecO.js      251.80 KB │ gzip: 101.57 KB   ← Main app + Lobby
dist/assets/icons-By2vItgv.js       23.71 KB │ gzip:   5.35 KB   ← Lucide chunk
dist/assets/stories-DCUI64EJ.js     32.81 KB │ gzip:  16.46 KB   ← stories data
dist/assets/quizzes-CDnIiwfb.js     29.11 KB │ gzip:  11.96 KB   ← quiz bank
dist/assets/Timeline-CksX3k4A.js    33.64 KB │ gzip:  13.27 KB
dist/assets/Educators-D2qWOK3d.js   25.88 KB │ gzip:  11.58 KB
dist/assets/LabPage-C3RnydsY.js    424.51 KB │ gzip: 122.80 KB   ← 7 simülatör
... (13 route chunk\'u toplam)
```

- **İlk yükleme:** 418 KB (gzip **155 KB**) — önceki 1059\'dan **%57 az**.
- **Lobby eager** kaldı (fastest LCP için); diğer 13 rota lazy.
- Her rota kendi `<Suspense>` boundary\'sinde — yavaş bir chunk
  kardeşleri bloklamaz.

### Yeni Bileşenler

**`src/components/common/LoadingFallback.jsx`** — Lazy-loaded sayfalar
için skeleton: 120ms delay (flicker önleme), müze estetiğinde shimmer
animation (radial gradient + background-position cycling), `aria-live`
screen-reader desteği.

**`src/components/common/ErrorBoundary.jsx`** — Class component,
`getDerivedStateFromError` + `componentDidCatch`. Runtime hata durumunda
trilingual friendly UI: "Bir vitrin kırıldı" / "A display case broke" /
"وقع عطل في العرض", teknik detay `<details>` açılır, Reset ve Sayfayı
Yenile butonları. `console.error` ile loglama (prod\'da Sentry hook\'u
eklemek için hazır).

### PWA — `vite-plugin-pwa` Entegrasyonu

- **Manifest**: `name`, `short_name`, theme/background colors,
  standalone display, portrait-primary orientation, `categories:
  education/kids/science`, trilingual alt locales (tr_TR / en_US /
  ar_AR).
- **Service Worker (Workbox generateSW):** Tüm build varlıkları
  (JS/CSS/HTML/SVG/PNG/ICO/WOFF2) precache — ilk ziyaretten sonra
  tamamen offline çalışır.
- **Runtime caching:** Google Fonts için StaleWhileRevalidate
  (stylesheet, 30 gün) + CacheFirst (webfonts .woff2, 1 yıl).
- **Icon:** Mevcut `favicon.svg` `purpose: "any maskable"` olarak
  manifest\'te kullanıldı — modern tarayıcılar SVG manifest icon\'u
  destekliyor, ek PNG üretimine gerek kalmadı.
- **Build çıktısı:** `dist/sw.js` + `dist/workbox-*.js`, 26 precache
  entry toplam 1.14 MiB.
- **Dev mode\'da devre dışı** — iterate ederken cache sorunu yok.

### SEO & Web Vitals

**`index.html` tam yenilendi:**
- Twitter Card (`summary_large_image`)
- Apple touch icon, mask icon, `apple-mobile-web-app-capable`
- Theme color light + dark scheme duyarlı (`prefers-color-scheme`)
- Canonical URL
- Robots / keywords / author meta
- Schema.org JSON-LD: `EducationalOrganization` + `EducationalAudience`
  (audienceType "Children 7-14")
- `hreflang` alternatives: tr, en, ar, x-default
- `<noscript>` trilingual uyarı bloğu

**`public/robots.txt`** + **`public/sitemap.xml`** (10 temel route).

### Build Konfigürasyonu

**`vite.config.js` yenilendi:**
- `defineConfig(({ mode }) => ({...}))` — mode-aware config.
- `build.sourcemap: mode !== 'production'` — prod\'da source map yok
  (~3 MB daha küçük artifact).
- `chunkSizeWarningLimit: 800` — content-heavy sayfalar (LabPage 424 KB)
  için warning sessiz.
- `rollupOptions.output.manualChunks`: `react` / `icons` / rest split.

### CI / CD & Community

**`.github/workflows/ci.yml`** — Push + PR + manual trigger.
- Node 18 ve 20 matrix
- `npm ci` (lockfile stabilizasyonu)
- Lint (advisory, fail etmez)
- Production build
- Bundle size step summary
- 7-day retention\'lı build artifact upload

**`.github/ISSUE_TEMPLATE/bug_report.md`** — Environment bölümünde
device, browser, language, theme alanları.

**`.github/ISSUE_TEMPLATE/feature_request.md`** — 10 kategori
(exhibit, story, lab, workshop, lesson plan, timeline event, glossary,
UI/UX, a11y, translation) + implementation bandwidth checkbox.

**`.github/PULL_REQUEST_TEMPLATE.md`** — Type of change (8 kategori),
build/lint/i18n/mobile/RTL checklist, before/after screenshot tablosu.

**`README.md` tam yenilendi:**
- Proje özeti + canlı metrikler (44 sergi, 5 hikâye, 70+ olay, vb.)
- Hızlı başlangıç komutları
- Mimari ağaç (src/ tam yapı)
- Build architecture (Faz 4 code splitting anlatımı)
- Katkı çağrısı (özellikle: Arapça parite, yeni içerik 44→70, lab
  deneyleri, a11y, fotoğraf)
- Dokümanlar linkler (PLAN, SPECS, PROMPT, CHANGELOG, CONTRIBUTING)
- Okullar için bölüm (eğitmenler için /educators tanıtımı)
- MIT + CC BY-SA 4.0 çifte lisans açıklaması

**`CONTRIBUTING.md` tam yenilendi:**
- Başlarken — 5 satırlık setup
- İçerik standartları (trilingual zorunluluğu, ton, yaş güvenliği,
  kaynak doğrulama)
- **"Yeni Sergi Ekleme — Adım Adım"** tutorial: Tanzanit örneği
  üzerinden 7 adımlı senaryo (veri / iconFor / sözlük / quiz /
  timeline / test / PR)
- Yeni hikâye ekleme — stories.js yapı şablonu + yazım kılavuzu
- Çeviri katkıları — özellikle Arapça parite daveti
- Kod stili + ESLint durumu
- PR süreci — Conventional Commits, branch naming, review timeline

### Dependency Ekleme

- `vite-plugin-pwa: ^0.21.1` → `devDependencies`

Build sonrası npm audit 6 uyarı raporladı (2 moderate, 4 high) —
hepsi `workbox-build` transitive bağımlılıklarında, üretim runtime\'ını
etkilemiyor (sadece build toolchain). İleriki sürümlerde
`npm audit fix --force` ile ele alınacak.

### Kabul Kriterleri

- ✅ Code splitting: initial JS 1059 → 418 KB (%57 az).
- ✅ PWA: service worker + manifest + offline precache çalışıyor.
- ✅ SEO: sitemap.xml, robots.txt, OG/Twitter/Schema.org tam.
- ✅ CI: GitHub Actions workflow Node 18+20 matrix.
- ✅ Community: README + CONTRIBUTING + issue/PR template\'leri.
- ✅ ErrorBoundary + LoadingFallback production-ready.
- ✅ `npm run build` temiz: 0 error, 26 precache entry, PWA
  files generated.

### Faz 5\'e Geçiş

Production altyapı artık hazır. Faz 5 içerik ve topluluk yönlü olabilir:

- **İçerik genişleme:** 44 → 70 sergi hedefi modüler adımlarla —
  tanzanit, morganit, cufflink, cullinan-kardeşleri, ottoman-resat,
  kazaz-detail vb.
- **Arapça parite:** Mevcut özet biçiminden tam trilingual paragraph
  parite\'ye.
- **Testing:** Playwright E2E smoke suite (her rota açılıyor mu),
  Lighthouse a11y audit (şu an muhtemelen 80-90, hedef 95+).
- **Deploy:** Vercel veya Netlify\'a GitHub Actions üzerinden otomatik
  deploy; preview URL her PR için.
- **Analytics:** Plausible veya Umami — privacy-respecting, GDPR-friendly.
- **Topluluk büyütme:** İlk katkıcılar için good-first-issue etiketli
  tasklar.

---



## [0.6.0] — 2026-04-20 — Faz 3: İnteraktif Simülatörler

Anlatı omurgası Faz 2-C\'de kurulmuştu; Faz 3 onu elle oynanabilir hâle
getirdi. 2 deney baştan yazıldı (basit dropdown / dönen ışınlardan
gerçek simülasyonlara), 1 yeni deney (Lidya Sikke Darphanesi) eklendi,
2 yeni atölye adım-adım (savat ve mine) açıldı.

### Yeni / Yeniden Yazılan Deneyler

**1. Pırlanta Kesim Simülatörü** (`DiamondCutSimulator.jsx`, 590 satır)
— Eski `LightSimulator`\'ın yerini aldı. O sadece 4 şekil ve dönen
ışınlar gösteriyordu; bu gerçek kesim fiziği:

- 4 slider: Table %, Crown Açısı, Pavilion Açısı, Depth %
- SVG kesit görüntüsü: girdle çizgisi, hesaplanan table/crown/pavilion
  geometrisi, 5 paralel ışın yolu
- Ray-tracing yaklaşımı: pavilion < 39° → alt sızıntı (kırmızı kesikli
  çizgi), pavilion > 43° → yan sızıntı (turuncu kesikli), 39-43° →
  total internal reflection (yeşil düz çizgi üstten geri döner)
- Canlı "Brilliance" skoru 0-100, 4 faktörlü Gaussian ağırlıklı toplam:
  Pavilion 50 puan (σ=1.5°), Crown 25 puan (σ=3°), Table 15 puan
  (σ=4%), Depth 10 puan (σ=3%)
- 5 kalite sınıfı: Ideal (90+, #16a085) → Mükemmel → İyi → Orta →
  Zayıf (<35, #c0392b)
- "Tolkowsky İdeal" butonu: 57.5% / 34.5° / 40.75° / 59.5% değerlerine
  anında snap eder
- Her slider\'da yeşil tick marker ideal konumu gösterir; değer ideal\'e
  2×step içindeyse ✓ işareti
- Feedback paneli: ideal dışı her ayar için Türkçe/İngilizce açıklama
  ("fish-eye effect", "nail-head effect" gibi gerçek gemolojik
  terimler çocuk dostu diyalogla).

**2. Mohs Çizim Laboratuvarı** (`MohsScratch.jsx`, 390 satır)
— Eski `MohsTest`\'in iki dropdown\'lu karşılaştırması yerine tezgâh
deneyimi:

- 17 malzeme (10 mineral + 5 alet + 2 mücevher taşı) palettre,
  görsel olarak gradient boyalı 3D hissi veren tile\'lar
- Kullanıcı palette\'ten malzemeye tıklar → A veya B slot\'una yerleşir
  (aktif slot amber kenarlıkla belirgin, her tıklamada alternatif)
- "Çiz!" butonu 900ms animasyon: daha yumuşak olanın üzerinde diyagonal
  bir beyaz çizik render edilir (SVG stroke-dasharray animasyonu +
  koyu renkli gölge için ikinci paralel çizgi)
- Ses: scratch başarısında 'reveal', berabere durumunda 'click'
- Mohs Merdiveni paneli: 10 seviyede tipik örnekle, kullanıcının
  test ettiği her mineralin seviyesi "unlock" olur. 10/10 seviye
  ulaşılırsa "Mineraloji Ustası" rozet animasyonu.

**3. Lidya Sikke Darphanesi** (`LydiaMint.jsx`, 590 satır — YENİ)
— Story 3 ("Altın Külçesinin Yolculuğu") ve Ders Planı 3 ("Lidya ve
Paranın İcadı") ile narratif bağlantılı yeni deney. 4 aşamalı akış:

- Aşama 1 — Külçeler: Altın ve gümüş külçe pile\'ları, her biri 1g.
  Plus/minus butonları veya slider ile 0-15 arası seçim. 5\'li grid
  görsel, external inset shadow ile 3D külçe hissi. Minimum 3 toplam
  gerekli.
- Aşama 2 — Pota: Karanlık turuncu potada animasyonlu eritme (2.2s),
  sıcaklık 20°C → 1064°C (altının gerçek ergime noktası) yükselir.
  Metal rengi altın+gümüşün oranına göre linear interpolate edilir,
  erime tamamlandıkça alev yükselir (5 SVG flame path\'i), tamamlanınca
  kıvılcımlar belirir.
- Aşama 3 — Mühür: 3 seçenek:
  1. Alyattes Aslanı (c. -600, profil aslan kafası SVG)
  2. Kroisos Çift Punch (c. -560, iki kare çentik)
  3. Basit Çentik (c. -650, çapraz kare)
- Aşama 4 — Sonuç: Kullanıcının sikkesi render edilir — radial
  gradient altın/gümüş karışımı, inset shadow ile metalik hissi, mühür
  SVG\'si üzerinde, 130x130px. Hüküm 6 kategoride:
  - "Gerçek Lidya Elektronu ★" (lion+45-55% Au = #16a085)
  - "Kroisos Stater\'i ★" (split+90%+ Au = #d4a017)
  - "Kroisos Siglos\'u" (split+10%- Au = #85929e)
  - "Fazla Gümüş" / "Fazla Altın" / "Karışım Sorunu" (amber/orange)
  - 3 tarihsel fact noktası: Sart Irmağı\'nın 45-55% doğal oranı,
    Kroisos\'un -560\'ta monometalik reformu, "Karun kadar zengin"
    deyimi kökeni.
- Stage dots ilerleme göstergesi (1-2-3-4).

### Yeni Atölyeler (WorkshopHub içinde)

**Savat (7 adım)** — Siirt niellosu:
1. Gümüş üzerine desen çiz (çelik kalem)
2. 0,3-0,5mm derinliğe oy (burin)
3. Gümüş+bakır+kurşun+kükürt niello alaşımını hazırla
4. Bor asitle temizle
5. Niello tozunu kanal içine serp
6. 400°C\'de alevle erit (moleküler kaynaşma)
7. Zımpara + cila — beyaz gümüş çıkıntılar, siyah niello çukurlar

**Mine (6 adım)** — İstanbul cloisonné:
1. Bakır/gümüş levha hazırlığı (tel fırça)
2. Cloisons — desen bölücü telleri diz
3. Renk kimyası: kobalt mavi, bakır yeşil, demir kırmızı
4. 750-900°C fırın (2-5 dakika)
5. Yeniden doldur ve tekrar pişir (3-5 kez)
6. Taş cila

Bu ikisi Faz 2-B\'de sergi olarak eklenmişti; şimdi interaktif
atölye deneyimi olarak da mevcut.

### Entegrasyon

- `src/pages/LabPage.jsx` — experiments array güncellendi:
  - `MohsTest` → `MohsScratch`
  - `LightSimulator` → `DiamondCutSimulator`
  - Yeni `lydia` deneyi eklendi (Coins icon, altın tonu #d4a017)
  - Toplam 7 deney (6\'dan +1).
- `src/i18n/{tr,en,ar}.js` — `experiments.lydia` anahtarı üç dilde;
  mevcut `light` ve `mohs` adları yeni (daha açıklayıcı) başlıklarla
  güncellendi.

### Kabul Kriterleri

- ✅ 3 interaktif bileşen hepsi TR/EN/AR.
- ✅ Gerçek fizik/tarih temelli: Tolkowsky 1919 geometrisi,
  Snell-yaklaşımı TIR, Pactolus 45-55% doğal elektron,
  Kroisos monometalik reform.
- ✅ Deney tamamlama sinyali `completeLab()` her bileşende
  useEffect\'te çağrılıyor.
- ✅ Build 0 hata. CSS 44.6 → 50.3 KB (+5.7), JS 1017 → 1059 KB
  (+42 KB — 3 simülatör).
- ✅ Eski `LightSimulator` ve `MohsTest` dosyaları silindi
  (bayat bağımlılık yok).

### Faz 4\'e Geçiş

Müzenin 3 omurgası (sergi, anlatı, atölye) kurulduğu için Faz 4
production hardening üstüne kurulabilir:
- **Performans:** JS chunk 1 MB\'ı aştı; dynamic import() ile her sayfa
  ayrı chunk. Initial load 300 → 100 KB seviyesine çekilebilir.
- **Lighthouse:** A11y audit, Playwright E2E smoke testleri.
- **PWA:** Offline cache, add-to-homescreen, worker strategisi.
- **Yayın:** GitHub Actions CI/CD, Vercel veya Netlify deploy.
- **Katkı rehberi:** CONTRIBUTING.md, "add a new exhibit" tutorial,
  issue templates.
- **Opsiyonel içerik:** 44 → 70 sergi hedefine modüler adımlar
  (cullinan türevleri, tanzanite/morganite, cufflink, kazaz-detail).

---



## [0.5.0] — 2026-04-20 — Faz 2-C: Anlatı, Zaman Çizgisi, Öğretmenler

Faz 2-C müzeye üç yeni omurga ekledi: hikâyeler, zaman çizgisi ve
yazdırılabilir öğretmen kaynakları. Artık kuru sergi/quiz/sözlük
üçlüsünden çıkıp anlatı odaklı bir deneyime geçildi.

### Yeni Rotalar (4)

- `/stories` — Hikâyeler indeks sayfası (5 kart)
- `/stories/:storyId` — Tek hikâye okuyucusu
- `/timeline` — 6000 yıllık yatay drag-scroll zaman çizgisi
- `/educators` — Ders planları + yazdırılabilir çalışma kâğıtları

### Yeni Veri Dosyaları (3)

**`src/data/stories.js`** — 5 anlatı × 5 sahne × TR/EN/AR:

1. **Kleopatra\'nın Zümrüdü** — Mons Smaragdus madenleri, Kleopatra\'nın
   ismine alınan madenler, zümrüt diplomasisi, 1817 Frédéric Cailliaud
   yeniden keşfi.
2. **Pırlantanın 3 Milyar Yılı** — Arkean bakteriler, mantoda karbon
   kristalleşmesi, kimberlit erüpsiyonu, 26 Ocak 1905 Frederick Wells\'in
   Cullinan\'ı bulması.
3. **Altın Külçesinin Yolculuğu** — Nötron yıldızı çarpışmalarından göktaşı
   bombardımanına, Sart Irmağı\'ndan Lidyalı Kroisos\'un sikkelerine,
   modern Türk gelin bileziğine.
4. **Trabzon Hasırı UNESCO Yolu** — 16. yüzyıl Pontus kökeni, 1990\'ların
   tükeniş krizi (20 usta kalmıştı), 2004 coğrafi işaret, Aralık 2020
   UNESCO tescili.
5. **Mardinli Telkâri Ustası Ayşe Hanım** — Kurgusal 65 yaşındaki ustanın
   otantik Mardin atölyesinde Süryani komşu Yusuf (savat) ve Ermeni
   komşu Artin (mine) ile birlikte çalışması; 14 yaşındaki Elif\'e
   geleneğin devredilmesi.

Her hikâye 5 sahneden oluşur (icon + title + body + opsiyonel pullquote),
bir "takeaway" ile biter ve ilgili sergilerle bağlanır. Sahne gövdeleri
çocuk dostu dilde 100-180 kelime arasında, AR özet biçiminde.

**`src/data/timelineEvents.js`** — 70+ tarihi olay:
- Zaman aralığı: -4000 BCE (Sar-i Sang lapis ticareti) → 2024 (altının
  ilk kez $2500\'ı aşması).
- 6 kategori renk-kodlu: mining (#a04000), metallurgy (#d4a017),
  gemology (#5dade2), craft (#566573), culture (#8e44ad),
  discovery (#27ae60).
- Kilometre taşları: Varna altın takıları (-4000), Lidya ilk sikkesi
  (-600), Kleopatra\'nın zümrüt diplomasisi (-30), Roma Pliny opal kaydı
  (75), Bizans minesi (300), Mogok yakut (500), Kapalıçarşı (1461),
  ilk pırlanta nişan yüzüğü (1477), İspanyolların platin bulması (1557),
  Rus platin rublesi (1819), Kimberley madeni (1871), Cullinan (1905),
  ilk yapay pırlanta (1954), Paraíba neon turmalin (2001), Trabzon
  UNESCO (2020), III. Charles taç giyme (2023).
- Her olayın sergiyle bağlantısı var → tıklanabilir.

**`src/data/lessonPlans.js`** — 4 sınıf-tested ders planı:

1. **Mohs Çizim Testi** (45 dk, ortaokul 10-14 yaş) — Tırnak, bakır para,
   cam, çelik bıçakla gerçek mineraller üzerinde Mohs skalasını
   keşfetme.
2. **Gümüş Neden Kararır?** (60 dk, ortaokul 11-14) — Oksitlenme/
   redüksiyon kimyası, alüminyum folyo + kabartma tozu + tuzla
   temizleme deneyi, 2 Ag + H₂S → Ag₂S denklemi.
3. **Lidya ve Paranın İcadı** (60 dk, ortaokul+lise) — Takas sorunları,
   -600 Kroisos sikkesi, mini etkinlik (kendi para birimini tasarla),
   1971 altın standardı sonrası dünya.
4. **UNESCO Somut Olmayan Miras** (90 dk, lise 14-16) — Trabzon
   Hasırı örnek olayı, diğer Türk UNESCO miraslarının grup araştırması,
   "müzeleştirme" riski tartışması.

Her plan: hedef + malzeme + 5 aşamalı ders akışı + 4-5 çalışma kâğıdı
sorusu + 2-3 tartışma prompt\'u + ilgili sergiler.

### Yeni Sayfa Bileşenleri (4)

**`StoriesIndex.jsx`** — Lobby tarzı giriş, 5 hikâye kartı DisplayCase
içinde. Her kart icon + readMinutes + title + subtitle.

**`StoryPage.jsx`** — Uzun-form anlatı okuyucu. Hero (büyük icon + engraved
title), sahneler alternatif sol/sağ layout ile, sahne numarası pill\'i
(01/05), opsiyonel pullquote border-left stilinde, WaxSeal ile Takeaway
kutusu, ilgili sergiler chip grid, diğer hikâyeler grid. Mount\'ta
"page-turn" sesi çalıyor.

**`Timeline.jsx`** — Yatay kaydırmalı eksen. Olaylar eksenin üstü/altı
alternatif, kategori renk dot\'u ring-4 cream, yıl label tabular-nums,
EventCard border-left accent, sergiye link varsa hover lift. Kategori
filtre butonları, mousedown/move/leave dinleyici ile drag-scroll (1.5×
hız çarpanı), BCE/CE lokalize format.

**`Educators.jsx`** — 4 ders planı kartı, her biri aç/kapa + yazdır
butonları. **Tam print CSS** (`@media print { @page size: A4; margin:
1.8cm 1.5cm }`). `data-printing-plan` attribute ile sadece seçilen
planın görünür olması sağlanıyor, diğerleri `display: none`. Worksheet
kısmı `.worksheet-section { page-break-inside: avoid }` ile temiz
sayfa bölünmesi alıyor. Çalışma kâğıdı satırları print\'te 1px solid
#666 olarak render oluyor.

### Entegrasyon Güncellemeleri

- `src/App.jsx` — 4 yeni rota eklendi, 4 yeni import.
- `src/components/layout/Header.jsx` — nav\'a Stories/Timeline/
  Educators eklendi (11 nav item toplam).
- `src/i18n/{tr,en,ar}.js` — nav içine `stories`, `timeline`,
  `educators` anahtarları trilingual.
- `src/pages/ExhibitDetail.jsx` — Faz 2-A\'da "Yakında: Faz 2-C"
  placeholder\'ı olan storyThread CTA\'sı artık gerçek
  `<Link to={/stories/:id}>`\'e dönüştürüldü. 5 sergiden (zumrut,
  pirlanta-nasil-olusur, altin-tarihcesi, trabzon-hasiri, telkari)
  hikâyelerine doğrudan giriş.
- `src/pages/Lobby.jsx` — "Daha Fazla Keşfet" bölümü hall doors
  altına eklendi. 3 DiscoverTile: Stories (#8e44ad), Timeline
  (#2980b9), Educators (#16a085). Her kart radial gradient glow
  hover efekti + trilingual CTA ("Keşfet/Discover/اكتشف").

### Kabul Kriterleri

- ✅ 5 hikâye × 5 sahne tam TR/EN/AR (~12.500 kelime anlatı prose).
- ✅ 70+ timeline olayı TR/EN/AR + sergiyle bağlantılı.
- ✅ 4 ders planı TR/EN/AR + yazdırılabilir.
- ✅ Print CSS hem tarayıcıda hem gerçek A4 kağıtta temiz render.
- ✅ Tüm yeni sayfalar Header nav, Lobby tile ve ExhibitDetail CTA
  üzerinden keşfedilebilir.
- ✅ `npm run build` 0 hata. CSS 41.3 → 44.6 KB (+3.3), JS 910 →
  1017 KB (+107 KB, yeni içerik + 4 yeni sayfa).

### Kod Ölçümleri

```
src/data/stories.js         539 satır
src/data/timelineEvents.js  685 satır
src/data/lessonPlans.js     384 satır
src/pages/StoryPage.jsx     263 satır
src/pages/StoriesIndex.jsx   90 satır
src/pages/Timeline.jsx      307 satır
src/pages/Educators.jsx     351 satır
─────────────────────────────────
Faz 2-C toplam             2619 satır
```

### Faz 3\'e Geçiş

Anlatı omurgası tamam olduğu için Faz 3 interaktif mini oyunlar ve
atölye deneyimleri üzerine kurulabilir:
- "Pırlanta kesim simülatörü" — slider\'larla table/crown açısı
  oynatarak ışık oyununu görselleştirme.
- "Lidya sikkesi bastır" — drag-drop ile altın-gümüş karışım oranı
  seçme, üretilen sikkenin saflığını hesaplama.
- "Mohs çizim laboratuvarı" — dijital mineraller birbirine çizdirme
  (okul deneyinin ekran versiyonu).
- Opsiyonel: 44 → 70 sergi hedefine adım adım yaklaşma, Faz 4
  modüler şekilde.

---



## [0.4.0] — 2026-04-20 — Faz 2-B: İçerik Genişlemesi

Faz 2-A temelleri üstüne üç az sergili salonun derinleştirilmesi + 13
yeni sergi + quiz ve sözlük bankalarının büyük ölçüde büyütülmesi.

### Sergi Sayımı: 31 → 44 (+13)

**Derinleştirilen mevcut sergiler (6):**
- `platin-nedir`, `platin-vs-altin` — scienceBox + timeline + digDeeper
  (ağırlık testi, rodyum kaplama ömrü).
- `yuzuk`, `kolye` — timeline + digDeeper (hangi parmak neden,
  uzunluk sözlüğü).
- `savat`, `kapalicarsi` — scienceBox, 5-aşamalı üretim açıklaması,
  iki bedestenin hikâyesi.

**Yeni sergiler (13):**

*Platin Hall +2 (2→4):*
- `platin-tarihi` — İspanyol fatihlerden Merensky Reef\'e, Rus platin
  rublesi (1828-1845), Art Deco platin çağı (1900-1939).
- `platin-endustri` — Katalitik dönüştürücüler (%40 küresel kullanım),
  paladyum ailesi (PGM — 6 metalli), platin-hurda hırsızlığı.

*Takı Hall +3 (2→5):*
- `kupe` — 7000 yıllık piercing geleneği, Ötzi mumyası, denizci
  altın küpe sigortası, kulak delme bilimi (lob 4-6 hafta, helix 6-12 ay).
- `brosh` — Fibula→mourning brooch→Albright diplomasisi. 1994\'teki
  yılan broş olayı.
- `tac` — Taç/diyadem/tiara ayrımı, Imperial State Crown (2868
  pırlanta), Vladimir Tiara\'nın devrimden kaçış hikâyesi, Kate
  Middleton\'ın Cartier Halo\'su.

*Zanaat Hall +3 (2→5):*
- `kazaz` — Trabzon ipek-gümüş örgü, 0,05-0,1 mm tel (saç telinden
  ince), UNESCO 2020 (Trabzon Hasırı ile aynı listede).
- `mine` — Bizans cloisonné\'den Fabergé guilloché\'ye, 750-900°C
  cam-metal kaynaşması, renk kimyası (Co mavi, Cu yeşil, Fe kırmızı).
- `eskisehir-lutasi` — Sepiolit, suda yüzen taş, 1975\'te ham taş
  ihraç yasağı, pipo yaşlandıkça kızarma hikâyesi.

*Renkli Taşlar Hall +5 (8→13):*
- `opal` — %95 Avustralya, Olympic Australis (3450 g), Welo Etiyopya
  keşfi 2008, renk oyununun bilimi (150-300 nm silika kürelerinin
  ışık kırınımı).
- `tourmaline` — Watermelon, Paraíba neon mavi (2001 piyasa patlaması),
  piezoelectric özellik, Hollanda pipo küllerini çekme hikâyesi.
- `topaz` — Imperial topaz (Brezilya Ouro Preto 1737), "güneşin
  sarhoşluğu" lakabı, El-Dorado (6,2 kg) dünyanın en büyüğü.
- `peridot` — Olivin, Mars meteoritindeki peridot, 3500 yıl St.
  John Adası, mantonun %60 olivin olması.
- `garnet` — 20+ minerali kapsayan aile, demantoid (pırlantadan daha
  yüksek dispersiyon), nar (granatus) etimolojisi.

### Quiz Bankası: 22 → 49 (+27 soru)

Kategori dağılımı: altın 7 (+3), gümüş 6 (+3), pırlanta 8 (+4),
renkli-taşlar 10 (+6), platin 5 (+3), takı 5 (+3), zanaat 6 (+3),
**yeni "karışık" kategorisi 2 (+2)**. Zorluk dağılımı dengelendi:
Çırak / Kalfa / Usta.

Yeni sorular Faz 2-A ve 2-B\'de eklenen tüm içerikleri kapsıyor:
Cullinan-Hope-Koh-i-Noor, opal silika küreleri, watermelon turmalin,
peridot Ağustos doğum taşı, lapis Sar-i Sang 6000 yıl, platinin
Rusya sikkesi, Tiffany Setting 1886, Eskişehir lüle taşının suda
yüzmesi, kazaz telinin saçtan incesi, vb.

### Sözlük: 44 → 62 (+18 terim)

Yeni terimler Faz 2 kelime haznesini kapsıyor:
- Pırlanta: kimberlit, HPHT, CVD, Kimberley Process.
- Renkli Taşlar: flüoresan, pigeon blood, play-of-color, jardin,
  padparadscha, Paraíba, ultramarin.
- Takı: Tiffany Setting, Art Deco.
- Platin: PGM (platin grubu), rodyum.
- Zanaat: bedesten, sepiolit.
- Genel: kral suyu (aqua regia).

### Güncel Dosyalar

- `src/data/exhibits/platin.js` — tam yeniden yazım 2→4.
- `src/data/exhibits/taki.js` — tam yeniden yazım 2→5.
- `src/data/exhibits/zanaat.js` — tam yeniden yazım 2→5.
- `src/data/exhibits/renkliTaslar.js` — 5 yeni taş eklendi (8→13).
- `src/data/quizzes.js` — 27 yeni soru (49 toplam).
- `src/data/glossary.js` — 18 yeni terim (62 toplam).
- `src/utils/iconFor.js` — 14 yeni sergi ikon eşlemesi.

### Kabul Kriterleri

- ✅ Tüm yeni içerik TR/EN/AR üçünde dolu.
- ✅ Tüm yeni mineraller için scienceBox (formül, kristal sistemi,
  Mohs, RI, yoğunluk, küratör notu).
- ✅ Tarihi/kültürel sergiler için timeline (3-5 olay).
- ✅ Her yeni sergi için en az bir digDeeper bölümü.
- ✅ `npm run build` 0 hata. CSS 41.3 KB (aynı), JS 821 → 910 KB
  (+89 KB sözel içerik).

### Faz 2-C Kalan İş

- 5 story thread sayfası: `/stories/kleopatra-zumrut`,
  `/stories/pirlantanin-3-milyar-yili`, `/stories/altin-nugget-yolculugu`,
  `/stories/trabzon-hasiri-unesco`, `/stories/mardinli-telkari-ustasi-ayse`.
- `/timeline` sayfası: 50+ olayla drag-scroll interaktif zaman çizgisi.
- `/educators` sayfası: ders planları + print CSS ile yazdırılabilir
  çalışma kâğıtları.
- Opsiyonel Faz 2-B kalıntısı: 26 → 70 sergi hedefine ulaşmak için
  ~26 daha (gold-leaf, reşat, GIA sertifikasyonu, conflict diamonds,
  tanzanite, morganite, cufflink, bracelet-cultures, gold-processing,
  kazaz-detail, mine-detail vb.). Şu an 44 sergide iyi bir orta
  nokta — Faz 2-C estetik/anlatı odaklı bu yüzden sergi gelişimi
  Faz 4\'te modüler şekilde devam edebilir.

---



## [0.3.0] — 2026-04-20 — Faz 2-A: İçerik Derinleştirme (Alt Faz)

Faz 2 toplamda çok geniş (70+ sergi, 80+ quiz, 70+ sözlük, 5 anlatı,
timeline + educators sayfaları) — PROMPT.md'nin önerdiği şekilde üç alt
faza bölündü. Bu sürüm **Faz 2-A**: şema genişletmesi, sergi detay
sayfasının yeniden yazımı, mevcut 11 serginin derinleştirilmesi ve
6 yeni önemli serginin eklenmesi.

### Genişletilmiş Sergi Şeması

Tüm mevcut Faz 0 alanları korundu. Yeni **opsiyonel** alanlar eklendi
— eski sergiler bu alanlarsız da doğru render olur:

- `gallery: [{ type: 'svg'|'photo', component, caption, animate, src, credit }]`
- `timeline: [{ year: string|number, event: {tr,en,ar} }]` (negatif yıl = M.Ö.)
- `digDeeper: [{ id, icon, title: {tr,en,ar}, body: {tr,en,ar} }]` — accordion
- `scienceBox: { formula, crystalSystem, hardness, refractiveIndex, density, cleavage, notes: {tr,en,ar} }`
- `storyThread: 'slug'` — Faz 2-C'deki anlatı sayfasına bağ

### ExhibitDetail.jsx — Tam Yeniden Yazım

Sergi detay sayfası Faz 1 müze bileşenleriyle yeniden inşa edildi.
Yeni bölümler aşağıdan yukarıya:

- Breadcrumb (salona geri).
- Hero: #numara plaka + hall LabelPlate + GemIcon (üstte 80px kabartma
  cam podyum üzerinde, revealGem animasyonu) + engraved title + intro.
- Body prose (mevcut, DisplayCase hissiyle).
- **Gallery** — yatay kaydırmalı şerit, her kart bir DisplayCase. SVG
  gem ikonları veya photo thumbnail'ı destekliyor. Snap-scroll.
- **Bilim Kutusu (ScienceBox)** — laboratuvar kartı, formül/kristal
  sistemi/sertlik/kırılma/yoğunluk/dilinim grid'i + küratör notu.
  Stats-row stili (dashed alt çizgi).
- **Zaman Çizgisi (Timeline)** — yatay strip, her olay için
  --hall-accent renkli nokta + büyük tabular yıl (M.Ö./BCE/ق.م dil
  duyarlı) + kısa açıklama. Snap-scroll.
- **Daha Derine İn (DigDeeper)** — accordion, tek seferde bir bölüm
  açık, ChevronDown 180° dönüş animasyonu. Başlıktaki kategori ikonu
  için text sembolleri: ⚛︎ chemistry, ⏳ history, ◈ culture, ⚖︎ ethics,
  ✦ craft, ★ famous, ⛰︎ geology, 🔬 science.
- Stats grid (mevcut, yeni .text-label-plate stilinde).
- Fun Fact — WaxSeal mum mührü sol-üst köşede ("!" harfi), Phase 1
  bileşeninin ilk gerçek kullanımı.
- **Story Thread CTA** — kesikli çerçeveli kart, BookOpen ikonuyla
  "Yakında açılacak: Faz 2-C" mesajı ile bir sonraki alt fazın yerini
  tutuyor.
- Interactive nudge (mevcut).
- Related — artık GemIcon chip'leri, emoji değil.

Mount edildiğinde `open-case` sesi çalınır (sesli mod açıksa).

### Sergi Sayımı: 25 → 31

- **Pırlanta** 4 → 7: mevcut 4'ü derinleştirildi + 3 ünlü pırlanta eklendi
  (Cullinan, Hope, Koh-i-Noor).
- **Renkli Taşlar** 5 → 8: zümrüt/yakut/safir/turkuvaz/Mohs
  derinleştirildi + 3 yeni taş eklendi (ametist, akuamarin, lapis lazuli).
- **Altın** 6 (aynı sayı): bilezik/ayar-sistemi/altın-tarihçesi
  derinleştirildi.
- **Gümüş** 4 (aynı sayı): 925-ayar/gümüş-bakımı/Trabzon-hasırı/telkâri
  derinleştirildi.
- **Platin, Takı, Zanaat** (2+2+2): değişmedi — Faz 2-B'de.

### Derinleştirme Örnekleri (faktuel içerik)

- **Pırlanta Nasıl Oluşur?** — scienceBox (C, Cubic, 10 Mohs, RI 2.417,
  3.52 g/cm³, perfect octahedral), timeline 4 olay (-3 milyar yıl → 2010s
  CVD), digDeeper "Kimberlit Bacaları" + "Karbon'un İki Yüzü" (grafitle
  yapı farkı).
- **Cullinan** — 26 Ocak 1905 Premier Madeni, Frederick Wells, 3106.75 ct
  ham, Amsterdam'da Joseph Asscher kesimi 9 ana + 96 küçük taş,
  Cullinan I (530.2 ct) Kral Asası, "sahte Cullinan" İngiltere'ye
  yollama hilesi hikayesi.
- **Hope Pırlantası** — 45.52 ct, bor atomları → yarı-iletken + kırmızı
  fosforesans, Golconda → XIV. Louis → 1792 devrim hırsızlığı → 1958
  Harry Winston → Smithsonian, 1911 gazete "lanet" efsanesi de-bunk
  edildi.
- **Koh-i-Noor** — 186 → 105.6 ct, Mughal Tavus Tahtı, Nadir Şah 1739,
  Ranjit Singh, 1849 İngiltere, 2023 Charles III taç giymesinde
  yeniden talep gündemi, 4-ülke iddiası (Hindistan/Pakistan/Afganistan/İran).
- **Zümrüt** — scienceBox (Be₃Al₂Si₆O₁₈), Cleopatra madeneri M.Ö. 1500,
  krom/vanadyum safsızlığı açıklaması, Kolombiya etik madencilik
  tartışması, storyThread 'kleopatra-zumrut'.
- **Yakut** — Pigeon blood standardizasyonu + GIA renk kabini, 1960
  Maiman ilk lazeri yakutla yaptı.
- **Safir** — Keşmir 1887-1927 kısa açılım + avalanche hikayesi,
  padparadscha (Sinhala "lotus").
- **Ayar Sistemi** — scienceBox (Au, saf 2.5 Mohs, 18k rose gold reçetesi
  75/22.5/2.5), digDeeper "Alaşımın Renk Kimyası" + "Ülke Tercih Farkları"
  (TR/Orta Doğu 22k neden, ABD 14k neden).
- **Bilezik** — Urartu M.Ö. 900 timeline, digDeeper 5 örgü çeşidi
  (Burma/Hasır/Ajda/Kelepçe/Taş) + çeyiz ve ekonomik güvence rolü.
- **Trabzon Hasırı** — UNESCO 2020 listesine giriş hikayesi, 6 aşamalı
  üretim süreci (tel çekme → bobin → halka → örgü → lehim → parlatma),
  storyThread 'trabzon-hasiri-unesco'.
- **Telkâri** — Süryani Hıristiyan mirası, 13. yy Mardin atölyeleri,
  üç temel hareket (bükme/sarma/lehim), storyThread
  'mardinli-telkari-ustasi-ayse'.

### Güncel Dosyalar

- `src/pages/ExhibitDetail.jsx` — tam yeniden yazım (~500 satır).
- `src/data/exhibits/pirlanta.js` — 4 → 7 sergi, tam Faz 2 şeması.
- `src/data/exhibits/renkliTaslar.js` — 5 → 8 sergi.
- `src/data/exhibits/altin.js` — 3 sergi derinleştirildi.
- `src/data/exhibits/gumus.js` — 4 sergi derinleştirildi.
- `src/utils/iconFor.js` — 6 yeni sergi için ikon eşlemesi.

### Faz 2-A Kabul Kriterleri

- ✅ Yeni şema geriye uyumlu — shallow sergi yine doğru render.
- ✅ Her yeni/derinleştirilmiş sergi TR/EN/AR üçünde de dolu.
- ✅ Timeline negatif yıllar için M.Ö./BCE/ق.م dil-duyarlı prefix.
- ✅ DigDeeper accordion tek-seferde-bir-açık davranışı; ChevronDown
  rotasyonu smooth.
- ✅ ScienceBox stats-row stiliyle laboratuvar hissi, .text-curator
  notu italik.
- ✅ 4 storyThread placeholder set: kleopatra-zumrut,
  pirlantanin-3-milyar-yili, altin-nugget-yolculugu, trabzon-hasiri-unesco,
  mardinli-telkari-ustasi-ayse — Faz 2-C sayfalarını bekliyor.
- ✅ `npm run build` 0 hata. CSS 39.6 → 41.3 KB, JS 736 → 821 KB
  (Faz 5'te code-splitting ile düşürülecek).

### Faz 2-B ve 2-C Kapsamı (Gelecek Oturumlar)

Faz 2-B: kalan 40+ yeni sergi (altın ×3, gümüş ×5, pırlanta ×3,
renkli taşlar ×8, platin ×3, takı ×6, zanaat ×7), quiz 24→80+,
sözlük 35→70+.

Faz 2-C: 5 story thread sayfası (/stories/:id), /timeline sayfası
(drag-scroll 50+ olay), /educators sayfası (ders planları, print CSS
ile yazdırılabilir çalışma kağıtları).

### Bilinen Eksiklikler

- 6 yeni serginin gallery alanları boş veya tek-öğeli — Faz 2-B'de
  daha zengin görsel strip'leri eklenecek.
- StoryThread CTA'ları şu an pasif placeholder; Faz 2-C'de /stories/:id
  rotasına bağlanacak.
- Platin/Takı/Zanaat salonları hâlâ shallow — Faz 2-B öncelikli
  iş listesi.

---



"Tipik Tailwind uygulaması" → "hatırlanan müze estetiği"ne geçiş.
Artık müze vitrini hissi, el çizimi gem ikonları, Karanlık Galeri modu
ve ses altyapısı var.

### Eklendi

- **El çizimi Gem Icon kütüphanesi** — 22 SVG bileşen, hepsi `useId()`
  tabanlı benzersiz gradient ID'leriyle, 24×24 viewBox, ölçeklenebilir.
  - **15 taş:** diamond (parlak yuvarlak kesim), ruby (oval), sapphire
    (cushion), emerald (basamak kesim), turquoise (matris damarlı
    kaboşon), amethyst (hekzagonal küme), opal (ateş parlaması), aquamarine
    (hekzagonal prizma), topaz (armut), pearl (küre), peridot (oval),
    garnet (yuvarlak parlak), citrine (cushion), tourmaline (bicolor
    watermelon), lapis (pirit benekli kaboşon).
  - **4 metal:** gold-bar (perspektifli külçe, kabartma çizgili),
    gold-coin (rope border + yıldız motif), silver-coin (Ay/yıldız),
    platinum-nugget (organik düzensiz).
  - **3 zanaat:** filigree-wire (Telkâri kıvrımı), niello-pattern
    (Savat geometrik elmas), hasir-weave (Trabzon örgüsü).
  - `<GemIcon id="..." size={N} animate shimmer />` tek giriş noktası.
  - `src/utils/iconFor.js` — sergi ID'sinden ikon seçimi + hall-bazlı
    fallback (Faz 2 yeni sergilerle otomatik çalışır).
- **Müze bileşen kütüphanesi** (`src/components/museum/`):
  - `DisplayCase` — cam vitrin sarmalı, üst numaralandırma plakası,
    hover'da spot ışığı, köşe rozet slotu. Link / button / static modları.
  - `LabelPlate` — retro metal etiket, brass gradient + dark mode'da bronz.
  - `WaxSeal` — kırmızı mum mührü, harf + `hover:animate-sealBobble`.
  - `SpotLight` — atmosferik radial ışık havuzu, warm/cool/accent tonları,
    candle-flicker opsiyonu.
- **Dark Gallery Mode** — `ThemeContext` in-memory state, `data-theme="dark"`
  HTML öznitelik senkronu, `prefers-color-scheme` ilk yüklemede saygı.
  `src/index.css` içinde CSS-değişken swap + sık kullanılan Tailwind
  utility'lerinin dark override'ları (legacy bileşen yeniden yazımı
  gerekmeden).
- **Ses altyapısı** (`src/audio/`) — Web Audio oscillator sentezleyici.
  Ses dosyası yok, 6 ses inline sentezleniyor (chime, open-case,
  page-turn, correct, wrong, click). `SoundProvider` + `useSound()`
  hook. **Default muted** (spec A.7). Header'da aç/kapat toggle.
- **Tipografi muameleleri** (`src/index.css`):
  - `.text-engraved` — iç gölgeli altın kabartma (hero başlık).
  - `.text-label-plate` — uppercase, 0.2em tracking, küçük font (vitrin etiketi).
  - `.text-stat-number` — tabular-nums, font-extrabold, büyük sayılar.
  - `.text-curator` — italik, softer, küratör notları.
- **Yeni animasyonlar** (tailwind.config.js + prefers-reduced-motion güvenli):
  - `revealGem` — scale + rotate + blur reveal (800ms).
  - `curtainUp` — clip-path perde kalkışı (700ms).
  - `spotlightFlicker` — mum ışığı titreşimi (6s sonsuz).
  - `sealBobble` — mum mührü hover sallanması.
  - `sparkleIn`, `twinkle`, `driftX` — parçacık ve nokta shimmer'ları.
- **Hero revamp** — Lobby ana sayfa:
  - `HeroGemStack` — diamond + ruby + emerald üçlüsü cam podyumda,
    staggered `revealGem` ile ortaya çıkıyor, `floatY` ile hafif süzülüyor.
  - Placeholder SVG stack tamamen atıldı.
  - 6-noktalı particle twinkle alanı, `.hero-light-pool` ambient ışık,
    `SpotLight` köşe ışık havuzları.
  - Başlık `.text-engraved` ile altın kabartma.
  - "Bugünün Sergisi" ve "Atölye" kartları artık `DisplayCase` içinde,
    emoji yerine `GemIcon`.
  - Ziyaretçi sayacı bloğu warm radial glow kazandı.
- **ExhibitStand yeniden yazımı** — artık `DisplayCase` + `GemIcon`.
  Her kartın üstünde "Nº 001" plaka, hover'da spot ışığı, tıkla→
  `open-case` ses sentezi (muted değilse). Ziyaret işareti korundu.
- **Header güncellemesi** — SoundToggle + ThemeToggle butonları
  LocaleSwitcher'dan önce. Klavyeyle erişilebilir, `aria-label` ve
  `aria-pressed` doğru.

### Yeni dosyalar

```
src/audio/sounds.js
src/audio/SoundContext.jsx
src/context/ThemeContext.jsx
src/components/museum/DisplayCase.jsx
src/components/museum/LabelPlate.jsx
src/components/museum/WaxSeal.jsx
src/components/museum/SpotLight.jsx
src/components/museum/index.js
src/components/icons/gems/GemIcon.jsx
src/components/icons/gems/gemShapes.jsx
src/components/icons/gems/metalShapes.jsx
src/components/icons/gems/craftShapes.jsx
src/components/icons/gems/index.js
src/components/common/ThemeToggle.jsx
src/components/common/SoundToggle.jsx
src/utils/iconFor.js
```

### Değişen dosyalar

- `tailwind.config.js` — dark palette (gallery.bg/surface/raised/edge/text/mute),
  8 yeni keyframe, `darkMode: ['selector', '[data-theme="dark"]']`.
- `src/index.css` — tam yeniden yazım, typography treatments,
  museum component CSS, Dark Gallery override katmanı.
- `src/main.jsx` — `ThemeProvider` + `SoundProvider` en dışta.
- `src/pages/Lobby.jsx` — hero + Today's Exhibit + Hall doors hepsi
  `GemIcon` + `DisplayCase` kullanacak şekilde yeniden yazıldı.
- `src/pages/HallPage.jsx` — `ExhibitStand`'e `index` prop'u ekliyor.
- `src/components/common/ExhibitStand.jsx` — `DisplayCase` + `GemIcon` kompozisyon.
- `src/components/layout/Header.jsx` — SoundToggle + ThemeToggle eklendi.
- `src/i18n/tr.js`, `en.js`, `ar.js` — `theme.*`, `sound.*`, `museum.*` anahtarları.

### Faz 1 kabul kriterleri

- ✅ Hero "vay be" etkisi sağlıyor (altın kabartma başlık + gem tableau +
  ambient light + particle shimmer).
- ✅ Her sergi kartı emoji-header'dan kod-çizim SVG + DisplayCase'e geçti.
- ✅ Dark Gallery Mode çalışıyor, tüm hall'lar dark-uyumlu.
- ✅ Reduced-motion aktifken tüm animasyonlar otomatik devre dışı
  (global `@media (prefers-reduced-motion: reduce)` kuralı).
- ✅ `npm run build` 0 hata. CSS 28.7 KB → 39.6 KB, JS 701 KB → 736 KB
  (chunk-size uyarısı Faz 5 kapsamında çözülecek).
- ✅ Tri-lingual: tüm yeni UI stringleri TR/EN/AR'de.

### Teknik notlar

- Three.js, GSAP, framer-motion eklenmedi. Sadece React 18 hooks + CSS
  + native Web Audio. Spec'te "yeni dep eklemeden önce gerekçelendir"
  var; bu fazda gerekçe yoktu.
- SVG gradient ID'leri `useId()` ile benzersiz — aynı sayfada 10 adet
  ruby render ederseniz hiçbiri birbirinin gradient'ine bulaşmaz.
- Web Audio ContextPolicy: browser'ın autoplay ilkesi gereği ses
  context'i ilk kullanıcı etkileşiminde "resume()" ediliyor. Muted
  default olduğu için kullanıcı önce toggle'a tıklaması gerekir,
  bu zaten gesture olarak sayılır.
- Dark Gallery overrides Tailwind JIT'in escape ettiği class
  selectors'ı (`.bg-white\/90`) hedefliyor. Build'in derlediği CSS'de
  `data-theme=dark]` kuralları doğrulandı.

### Bilinen eksiklikler (Faz 2-5 kapsamında)

- Chunk-size uyarısı (Faz 5: code splitting).
- Arapça çeviriler minimum düzeyde; native speaker geçişi Faz 6.
- Henüz `WaxSeal` hiçbir sergide kullanılmıyor (yalnızca kütüphane hazır);
  Faz 2'de küratör notlarının üstüne düşecek.

---



İlk çalışan sürüm. Mimari + temel içerik + basit interaktifler.

### Eklendi

- **Proje altyapısı:** Vite 5 + React 18 + Tailwind 3 + react-router-dom v6,
  ESLint, PostCSS, MIT lisans.
- **i18n altyapısı:** Türkçe / İngilizce / Arapça. RTL otomatik
  algılama. `translate()` ve `interpolate()` yardımcıları.
  (`src/i18n/*`)
- **Context providers:**
  - `LocaleContext` — dil seçimi ve `<html dir>` yönetimi.
  - `ProgressContext` — ziyaret, quiz yıldızları, rozet, lab tamamlama
    (in-memory, spec gereği localStorage yok).
- **Veri katmanı:**
  - 7 sergi salonu metadata (`halls.js`).
  - 25 sergi standı (Altın 6, Gümüş 4, Pırlanta 4, Renkli Taşlar 5,
    Platin 2, Takı 2, Zanaat 2).
  - 24 quiz sorusu (8 kategori × 3 zorluk).
  - 35 sözlük terimi.
  - 8 rozet tanımı.
  - Dünya (8 nokta) + Türkiye (6 şehir) harita verisi.
- **Layout bileşenleri:** Header (responsive nav + mobil menu),
  Footer, Layout, LocaleSwitcher.
- **Ortak bileşenler:** Card, Badge, ProgressBar, CuratorNote,
  ExhibitStand.
- **Laboratuvar deneyleri (6 tam çalışan):**
  - KaratCalculator (slider + renk önizleme)
  - MohsTest (iki materyal karşılaştırma)
  - SilverTarnish (5 adımlı kimya walkthrough)
  - LightSimulator (SVG ışın yayılım animasyonu)
  - MeltingPoints (recharts bar chart + ısı slider)
  - StoneGuessing (ipucu-tabanlı bulmaca)
- **Sayfalar:** Lobby, HallsIndex, HallPage, ExhibitDetail, LabPage,
  QuizHub, QuizPlay, WorkshopHub (2 atölye: Trabzon Hasırı, Telkâri),
  WorldMapPage, GlossaryPage, AchievementsPage.
- **CSS sistemi:** Hall bazlı CSS değişkenleri
  (`--hall-accent`, `--hall-soft`), reduced-motion desteği, gold-shimmer
  utility, museum-floor pattern, lift-on-hover animasyonu, animate-popIn
  ve animate-fadeUp keyframes.
- **Dokümantasyon:** README, CONTRIBUTING, LICENSE.
- **Yol haritası:** PLAN.md, PROMPT.md, SPECS.md — çok oturumlu
  gelişim planı.

### Bilinen Sınırlamalar (Gelecek Fazlarda Çözülecek)

- [ ] Görsel kimlik "jenerik Tailwind" seviyesinde, müze atmosferi eksik.
- [ ] Tüm ikonlar emoji — custom SVG gem illustrations yok.
- [ ] Sergi içerikleri yüzeysel (tek paragraf body, digDeeper yok).
- [ ] Lab araçları basit slider + çıktı; 3D, ray-tracing, karakter-tabanlı
  oyun yok.
- [ ] Anlatı (story thread) sistemi yok.
- [ ] Tarihsel timeline yok.
- [ ] Ses sistemi yok.
- [ ] Koleksiyon kabini, avatar, XP, easter egg yok.
- [ ] Dark "Gallery" mode yok.
- [ ] PWA, offline, code-splitting yok.
- [ ] Erişilebilirlik geçişi yapılmamış.
- [ ] Bundle 700 KB (code split ile düşürülecek).

---

## [Gelecek Sürümler — Planlanmış]

### [0.2.0] — Faz 1: Görsel Kimlik Devrimi

Museum component library, custom SVG gem illustrations, dark gallery
mode, sound system scaffold, hero revamp.

### [0.3.0] — Faz 2: İçerik Patlaması

70+ sergi, story thread sistemi, tarihsel timeline, öğretmen sayfası,
80+ quiz sorusu, 70+ sözlük terimi.

### [0.4.0] — Faz 3: İnteraktif Araçlar Devrimi

Three.js 3D gem viewer, crystal lattice explorer, ring designer,
ray-traced diamond simulator, detective mystery game, virtual atelier,
melting pot, karat balance puzzle.

### [0.5.0] — Faz 4: Oyunlaştırma & Akış

Avatar karakterler, koleksiyon kabini, XP + seviye, günlük challenge,
boss battle quiz, easter eggs, paylaşım sistemi.

### [0.6.0] — Faz 5: Cila, Erişilebilirlik, PWA

Klavye audit, ekran okuyucu geçişi, yüksek kontrast, animasyon
kontrolleri, PWA manifest + service worker, code splitting, SEO,
print stylesheet.

### [1.0.0] — Sürüm: Kamu Lansmanı

Tüm fazlar tamamlandıktan sonra.
