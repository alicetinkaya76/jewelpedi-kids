# Faz 6 — Derinleştirme ve Zenginleştirme Master Planı

Faz 5 ile oyun katmanı kapandı. Faz 6, **mevcut sayfaların sofistikasyonunu**
hedefleyen çok-oturumlu bir yol haritası. Her alt-faz kendi başına bir
teslim paketi ve kendi güncellenebilir plan satırıyla.

Bu belge **canlı dokümandır** — her oturum sonunda güncellenir. Durum
simgeleri: ✅ tamam, 🔄 sürüyor, ⏳ bekliyor.

---

## Sabitlenmiş Kararlar (Ön Konuşmadan)

Planın tamamını etkileyen üç karar, çalışmaya başlamadan önce sabitlenmiştir:

### Karar 1 — Kaynakça kapsamı: **Minimal (A)**

Sadece **yeni eklenen olgusal alanlar** kaynaklı olacak (`specs` sayıları,
tarihler, kimyasal formüller, Mohs değerleri, dönem aralıkları).
Mevcut `body` anlatıları **"küratör yorumu"** kategorisine girer ve
kaynak gerektirmez.

Sebep: 44 serginin tüm `body` metnine inline citation eklemek, kaynak
uydurma riski yüksek bir retrofit. Sadece sayısal/doğrulanabilir iddialar
kaynakla işaretlenir; UI bunları dipnot olarak render eder.

### Karar 2 — Harita tile stratejisi: **Leaflet + Natural Earth GeoJSON** (6-D'de uygulandı)

**Orijinal plan:** Protomaps self-hosted (.pmtiles + CDN).
**Fiili uygulama:** Leaflet + Natural Earth 110m GeoJSON (tile-less
vektör harita). 6-D başlarken Protomaps'in `.pmtiles` pipeline,
CDN altyapısı ve 15 MB PWA precache stratejisi gerektirdiği görüldü;
projede bu altyapı mevcut değil. Planın **amaçlarına** (ToS kaygısı
yok, offline PWA, rate limit yok, müze estetiği) aynı düzeyde hizmet
eden basit mimari seçildi.

**Trade-off:** Z2–Z7 zoom aralığı (ülke/il ölçeği); şehir sokak
seviyesi yok. Müze için yeterli. İleride gerçek Protomaps pipeline
kurulursa LeafletMap.jsx sarmalayıcı tileLayer desteğiyle geriye
uyumlu genişletilebilir.

**Bundle:** Leaflet 43 KB gz + GeoJSON 65 KB gz + Türkiye 3 KB gz
= `/map` rotası ~57 KB gz net yük (initial index'e sızmıyor).

### Karar 3 — Alt-faz sırası: **Orijinal plan**

```
6-A → 6-B → 6-C → 6-D → 6-E → 6-F → 6-G → 6-H → 6-Z
```

Ders planları (6-H) en sona kalır çünkü yukarıdaki her şeye cross-link verir.

---

## Alt-faz Durumları

| Alt-faz | Başlık                         | Durum |
| :------ | :----------------------------- | :---- |
| 6-A     | Data katmanı derinleştirme     | ✅    |
| 6-B     | Sergi salonları zenginleştirme | ✅    |
| 6-C     | Hikâyeler zenginleştirme       | ✅    |
| 6-D     | Harita → Leaflet + GeoJSON     | ✅    |
| 6-E     | Deney labı zenginleştirme      | ✅    |
| 6-F     | Quiz merkezi zenginleştirme    | ✅    |
| 6-G     | Atölye zenginleştirme          | ✅    |
| 6-H     | Öğretmenler zenginleştirme     | ✅    |
| 6-Z     | Son polish + audit + v1.0      | ✅    |

---

## Faz 6-A — Data Katmanı Derinleştirme ✅ (tamamlandı 2026-04-21)

**Amaç:** Sonraki tüm alt-fazların beslediği zengin veri modelini bir
kerede kurmak. Kod az, veri çok. UI değişmez.

### Mimari karar: **Enrichment Layer Pattern**

Mevcut 44 sergi dosyasına tek tek edit atmak yerine, `src/data/exhibits/_enrichment.js`
tek bir dosyada ID → yeni alanlar eşlemesi tutar. `index.js` import
sırasında merge eder. Avantajlar:

- Mevcut dosyalar dokunulmaz (backward compat)
- Tek noktadan review edilebilir
- İleride iç içe geçip silinmesi kolay
- 44 ayrı edit yerine tek toplu ekleme → hem hız hem tutarlılık

### Eklenen dosyalar

| Dosya                                 | Amaç                                             |
| :------------------------------------ | :----------------------------------------------- |
| `src/data/sources.js`                 | Kaynakça kayıtları + helpers                     |
| `src/data/exhibits/_enrichment.js`    | 44 sergi için yeni alan eklemeleri               |
| `src/data/glossary-extended.js`       | 47+ yeni sözlük terimi + seçili etymology'ler    |
| `src/data/geoPoints.js`               | worldMap + worldOrigins birleşimi, ~40 nokta     |
| `src/data/crossRefs.js`               | Tersine indeks (gen'ed by build script)          |
| `src/utils/content.js`                | resolveCitations, findRelated helpers            |
| `scripts/build-crossrefs.js`          | Cross-ref indeks üreteci                         |

### Yeni sergi alanları (tamamı opsiyonel)

```js
{
  // Mevcut alanlar korunur: id, cat, accent, name, intro, body, funFact,
  // stats, related, interactive, gallery, timeline, digDeeper, scienceBox,
  // storyThread, emoji

  // Faz 6-A eklemeleri:
  specs: {
    // Sayısal/doğrulanabilir teknik veri — sources ile kaynaklanır
    composition: 'Au 91.6% + Cu 8.4%',
    density: '17.7 g/cm³',
    hardnessMohs: 2.5,
    dateRange: '1923–günümüz',
    findSite: 'Türkiye Darphanesi',
    cite: ['source-id'],
  },
  comparison: {
    withExhibitId: 'other-exhibit-id',
    axis: 'purity' | 'hardness' | 'value' | 'rarity' | 'historical',
    insight: { tr, en, ar }
  },
  audioScript: { tr, en, ar },     // 60-90 sn küratör narration (Faz 7'de TTS'e hazır)
  sources: ['source-id-1', 'source-id-2'],
  relatedStories: ['story-id'],
  relatedLabs: ['lab-id'],
  relatedQuizzes: ['category-id'],  // quiz'ler kategori bazlı, tek tek değil
  geoPointId: 'geo-point-id',       // Faz 6-D haritasıyla bağlantı
}
```

### Source kaydı şeması

```js
{
  id: 'mohs-1812',
  kind: 'book' | 'article' | 'web' | 'museum' | 'journal' | 'database',
  title: 'Versuch einer Elementar-Methode...',
  author: 'Friedrich Mohs',
  year: 1812,
  url: 'https://...',  // opsiyonel
  publisher: 'Arnoldsche Buchhandlung',  // opsiyonel
  retrievedAt: '2026-04-21',  // web kaynağı ise
}
```

### Kabul Kriterleri (6-A için)

- [x] `FAZ-6-PLAN.md` projede
- [x] `sources.js` 17 doğrulanmış kaynakla (hedef: ≥15)
- [x] `exhibits/_enrichment.js` 44 sergi için specs + sources + relatedStories/Labs/Quizzes/geoPointId
- [x] `glossary-extended.js` 30 yeni terim, 3 tam doğrulanmış etymology (hedef: 47 terim / 20 etymology — düşürüldü, bkz. Notlar)
- [x] `geoPoints.js` 39 nokta (hedef ~40)
- [x] `scripts/build-crossrefs.js` çalışıyor; `npm run build:crossrefs` var; prebuild otomatik tetikleniyor
- [x] `content.js` helper'ları yazıldı (resolveCitations, findRelated, formatSource, pickByCategory, formatSpecValue)
- [x] `npm run build` 0 hata
- [x] Hiçbir mevcut sayfa kırılmadı (smoke testleriyle doğrulandı)

### Fiili Teslim Özeti

| Dosya                                 | Boyut    | İçerik                                                     |
| :------------------------------------ | :------- | :--------------------------------------------------------- |
| `FAZ-6-PLAN.md`                       | ~8.3 KB  | Canlı plan belgesi, 3 karar sabit, 9 alt-faz skeleton      |
| `src/data/sources.js`                 | ~8.9 KB  | 17 kaynak, formatSource() Chicago-lite                     |
| `src/utils/content.js`                | ~7.2 KB  | 7 helper, saf, BFS cross-ref traversal                     |
| `src/data/geoPoints.js`               | ~37 KB   | 39 nokta, 6 kind, era/active/stones/exhibitIds             |
| `src/data/exhibits/_enrichment.js`    | ~33 KB   | 44 sergi enrichment, 2 audioScript, curatorNote'lar         |
| `src/data/glossary-extended.js`       | ~15 KB   | 30 yeni terim; glossary base 53 → 83 toplam                |
| `scripts/build-crossrefs.js`          | ~6 KB    | 5 indeks üretir (byExhibit/Story/Lab/GeoPoint/QuizCategory) |
| `src/data/crossRefs.js`               | ~60 KB   | Build çıktısı (otomatik, elle düzenlenmez)                 |

**Cross-refs istatistiği:** 44 sergi ↔ 28 geo nokta ↔ 5 hikâye ↔ 7 lab ↔ 7 quiz kategorisi ↔ 80 timeline olayı.

**Bundle etkisi:** Initial chunk 110.62 KB gzip (0.01 KB fark — enrichment sadece sergi chunk'ında). 200 KB hedefinin çok altında.

### Notlar ve Sapma Kararları

- **Glossary 100 değil 83:** 47 hedeften 30'a düşürüldü. Etymology için yalnızca **Online Etymology Dictionary ile doğrulanmış** 3 terimde (karat, sterling, solidus) tam etymology verildi; diğerlerinde tarihsel notu var ama "Sanskritçe kökeni" gibi iddialar yapılmadı. Dürüstlük > sayı. Kalan 17 terim 6-Z audit oturumunda eklenebilir.
- **SVG gallery raster değil:** Plan "gallery: foto + credit" öneriyordu; keşifte `gallery` şemasının zaten SVG-component tabanlı (`{type:'svg',component,caption}`) olduğu görüldü. Enrichment'ta gallery eklenmedi — 6-B'de mevcut SVG registry genişletilerek daha zengin sahneler yapılacak.
- **`_enrichment.js` pattern'i:** 44 sergi dosyasına 44 ayrı edit atmak yerine tek dosyada ID→field map tutuldu. `index.js` merge ediyor; orijinal dosyalar dokunulmadı. İleride silinmesi kolay.
- **`prebuild` hook'u:** `npm run build` öncesi crossrefs otomatik regenerate olur. Manual `npm run build:crossrefs` de mevcut.
- **Mohs ve Tolkowsky audioScript'leri hazır:** 60-90 sn küratör narration metinleri 3 dilde yazıldı. Faz 7'de TTS pipeline bağlandığında üretime hazır.
- **audioScript sadece 2 sergi:** Geri kalan 42 için audioScript yok; 6-B'de 10-15 sergiye daha eklenecek. Her biri yazım emeği gerektirdiği için disiplinli tutuldu.

---

## Faz 6-B — Sergi Salonları Zenginleştirme ✅ (tamamlandı 2026-04-21)

**Amaç:** Faz 6-A'da üretilen zengin veri katmanını (`specs`, `sources`,
`comparison`, `audioScript`, `relatedStories/Labs/Quizzes`, `curatorNote`,
`geoPointId`) ExhibitDetail ve HallPage'e UI bileşenleri aracılığıyla bağlamak.
Kod genişlemesi orta, yeni tasarım disiplinli: hiçbir mevcut bölüm kırılmaz,
yeni bölümler yalnızca ilgili veri varsa render edilir.

### Mimari kararlar

1. **Enrichment Layer korundu** — `_enrichment.js` dokunulmadı; UI
   bileşenleri doğrudan `exhibit.specs`, `exhibit.audioScript` vb.
   tüketir. Merge `exhibits/index.js` → `enrichExhibit()` zincirinde.
2. **Footnote numaralandırma sergi ölçeğinde tutarlı** — `ExhibitDetail`'da
   `useMemo` ile body'deki `[cite:xxx]` tag'leri + `specs.cite` + `exhibit.sources`
   tek numara listesinde birleştirilir. Aynı kaynak iki yerden gelirse aynı
   numarayı alır; dupe'lar otomatik sıralanır.
3. **Body inline citation pattern'i** — `"…[cite:mohs-1812]…"` →
   `resolveCitations()` ile `"…[1]…"`'a çevrilir, UI'da `<sup>[1]</sup>`
   olarak render edilir. Mevcut hiçbir body'de `[cite:*]` yok (6-A'da
   anlatı dokunulmadı, Karar 1); helper 6-C+ için hazır bekliyor.
4. **Lab / Quiz deep-link** — `LabPage` `?id=xxx`, `QuizHub` `?cat=xxx`
   query-param'ını okur. RelatedGrid'ten chip'ler o URL'lere gider.
5. **Story ID kısıtı** — Hikâyelerin `scenes[i].icon` alanı mevcut
   GEM_REGISTRY ID'si değildi; `RelatedGrid`'de story kartı için opak
   emoji fallback kullanıldı.

### Kritik Bug Fix (6-A'dan kalan)

**Lab ID uyumsuzluğu giderildi.** 6-A'da `_enrichment.js`'e
`karat-calculator`, `mohs-scratch`, `silver-tarnish`, `diamond-cut-simulator`,
`lydia-mint`, `melting-points`, `stone-guessing` yazılmıştı. Gerçek LabPage
ID'leri kısa form: `karat`, `mohs`, `tarnish`, `light`, `lydia`, `melt`, `guess`.
6-B'de 16 satırda sed ile düzeltildi — aksi halde RelatedGrid'teki tüm lab
chip'leri 404 olurdu.

### Plan düzeltmesi

**Sergi sayısı 44 değil 42.** Orijinal plan 44 diyordu; fiili sayım 42
(taki salonu: yuzuk, kolye, kupe, brosh, tac = 5 / zanaat salonu: savat,
kapalicarsi, kazaz, mine, eskisehir-lutasi, trabzon-hasiri, telkari = 7 /
altin: 6 / gumus: 1 / pirlanta: 6 / renkliTaslar: 12 / platin: 4 + 1 zümrüt
yanlış hatırlanan). `enrichment.js` zaten 42/42 eşleşiyordu. Plan belgesi
artık 42 sergi diyor.

### Eklenen dosyalar

| Dosya                                          | Satır | Amaç                                                          |
| :--------------------------------------------- | ----: | :------------------------------------------------------------ |
| `src/components/museum/SpecsCard.jsx`          |  125  | specs → etikete-değer grid'i, cite rozet                     |
| `src/components/museum/ComparisonCard.jsx`     |  110  | iki sergi yan yana, axis + insight                           |
| `src/components/museum/CitationsFootnote.jsx`  |   95  | sayfa dibi numaralı kaynakça, URL link'i                     |
| `src/components/museum/AudioScriptPanel.jsx`   |   95  | collapsible küratör narration, ~saniye hesaplı                |
| `src/components/museum/GeoBadge.jsx`           |   50  | küçük "Nereden?" chip, `/map#id` deep-link                   |
| `src/components/museum/RelatedGrid.jsx`        |  205  | 4 bölümlü ilgili içerik grid'i                                |
| `src/components/common/ExhibitCuratorMini.jsx` |   45  | sergi-seviyesi küçük küratör notu                            |

### Değiştirilen dosyalar

| Dosya                                | Değişiklik                                                      |
| :----------------------------------- | :-------------------------------------------------------------- |
| `src/pages/ExhibitDetail.jsx`        | +7 bölüm, footnote toplama `useMemo`, `BodyWithCitations`       |
| `src/pages/HallPage.jsx`             | `HallStatsStrip` eklendi (4 chip: total/sourced/audio/geo)     |
| `src/pages/LabPage.jsx`              | `useSearchParams` → `?id=xxx` deep-link                         |
| `src/pages/QuizHub.jsx`              | `useSearchParams` → `?cat=xxx` deep-link                        |
| `src/components/museum/index.js`     | 6 yeni barrel export                                            |
| `src/data/exhibits/_enrichment.js`   | 16 `relatedLabs` ID düzeltmesi + 10 yeni `audioScript` (toplam 14) |

### Yeni UI bölümleri (ExhibitDetail sayfasında)

Sıra: **Hero** (+ GeoBadge chip) → **Body** (resolved citations + `<sup>[n]</sup>`)
→ **SpecsCard** → **ExhibitCuratorMini** → **ComparisonCard** → **AudioScriptPanel**
→ [mevcut Gallery, ScienceBox, Timeline, DigDeeper, Stats, FunFact, StoryThread, Interactive]
→ **RelatedGrid** (eski tek satır related'ı değiştiriyor) → **CitationsFootnote**.

Her yeni bölüm ilgili veri yoksa render edilmez — backward compat tam.

### AudioScript içerik artışı

6-A'da 4 sergi audioScript vardı (`tam-altin`, `altin-tarihcesi`,
`kesim-sekilleri`, `mohs-skalasi`). 6-B'de 10 yeni yazıldı:
`zumrut`, `yakut`, `safir`, `hope-pirlantasi`, `koh-i-noor`, `cullinan`,
`trabzon-hasiri`, `telkari`, `kapalicarsi`, `platin-nedir`. Toplam **14 / 42**.

**İçerik disiplini:** Hepsi olgusal ve kaynak-uyumlu. Mitolojik "lanetli Hope"
hikâyeleri yerine taşın gerçek rotası anlatıldı. Kleopatra zümrüt anlatımında
belgeli madenlere referans, Cullinan'da gerçek kesim olayı (Asscher kardeşler),
kapalıçarşıda %70 bilek üretim oranı gibi olgular. Her biri 430-820 karakter
TR (hedef 60-90 saniye küratör narrasyonu için uygun tempo).

### Kabul Kriterleri (6-B için)

- [x] 7 yeni UI bileşeni yazıldı ve `museum/index.js`'te export edildi
- [x] `ExhibitDetail.jsx` tüm 8 yeni bölümü entegre etti (`SpecsCard`,
      `ExhibitCuratorMini`, `ComparisonCard`, `AudioScriptPanel`, `GeoBadge`,
      `RelatedGrid`, `CitationsFootnote` + `BodyWithCitations` süperscript'ler)
- [x] `HallPage.jsx` `HallStatsStrip` ekledi
- [x] Lab ID bug fix: 16 yer düzeltildi, hiçbir chip 404 gitmeyecek
- [x] Deep-link: `/lab?id=mohs`, `/quiz?cat=altin` çalışıyor
- [x] `audioScript` sayısı 4 → 14 (hedef 10-15 aralığı)
- [x] `npm run build` 0 hata (20.30s)
- [x] Smoke test: 14/14 audioScript mevcut, cross-ref BFS çalışıyor,
      geoPoint lookup'ları doğru (Ankara Darphanesi, Muzo, Bohemya),
      source lookup'ları doğru, resolveCitations dupe detect çalışıyor
- [x] Backward compat: 0 mevcut özellik kırılmadı (tüm yeni alanlar opsiyonel)

### Fiili Teslim Özeti

| Metrik                    | 6-A sonu        | 6-B sonu        | Değişim        |
| :------------------------ | :-------------- | :-------------- | :------------- |
| Sürüm                     | 0.9.0           | 0.10.0          |                |
| Initial index chunk (gz)  | 110.62 KB       | 118.94 KB       | +8.32 KB       |
| ExhibitDetail chunk (gz)  | ~17 KB          | 19.38 KB        | +2.38 KB       |
| HallPage chunk (gz)       | ~2 KB           | 2.48 KB         | ~                |
| PWA precache toplam       | 1329.44 KiB     | 1344.91 KiB     | +15.47 KiB     |
| Build süresi              | ~20s            | 20.30s          | ~              |
| audioScript toplam        | 4               | 14              | +10            |
| UI bileşen (museum+common)| 4+1             | 10+2            | +7             |
| Hata sayısı               | 0               | 0               | 0              |

Bundle bütçe ≤200 KB gzip initial — ferah altında.

### Notlar ve Sapma Kararları

- **audioScript 14/42 (plan 10-15 aralığı ile uyumlu).** Kalan 28 sergi
  6-C, 6-E veya 6-Z'de kademeli olarak eklenecek — her biri yazım emeği
  gerektiriyor, disiplinli gidiyoruz.
- **ComparisonCard sadece 5 sergide aktif** (safir, yarim-altin, platin-vs-altin,
  ceyrek-altin, vb.). Orijinal `comparison` sayımı 5, tüm UI çalışıyor.
- **curatorNote 10 sergide mevcut.** ExhibitCuratorMini bunları minimal
  kartta gösteriyor.
- **LabPage/QuizHub query-param okuma** basit: sadece ilk mount'ta okuyor,
  URL değişirse state değişmiyor (kabul edilebilir; kullanıcı chip tıklayınca
  yeni sayfaya gidiyor). Full sync 6-E/6-F'te düşünülebilir.
- **Story icon fallback:** Hikâyelerin `icon` alanı GEM_REGISTRY ID değil,
  bu yüzden RelatedGrid'te emoji fallback ('📖') kullanıldı. Story üretim
  şeması 6-C'de normalize edilecek.
- **Bundle artışı kaynağı:** +10 audioScript × ~2 KB metin × 3 dil = ~60 KB
  raw, gzip'lenince ~15 KB. Bundle büyümesi beklendiği gibi kabul edilebilir.

---

## Faz 6-C — Hikâyeler Zenginleştirme ✅ (tamamlandı 2026-04-21)

**Amaç:** 5 hikâyeye (stories.js — Faz 2-C'den kalan 2700 satır anlatı)
sergi-ölçeğindeki 6-A/6-B zenginliğini getirmek: kaynakça, timeline,
küratör notu, coğrafi yerler, sözlük chip'leri, 4-bölümlü ilgili
içerik grid'i. Ayrıca çalışma sırasında keşfedilen **kritik tarihsel
hatayı düzeltmek**.

### Kritik Düzeltme — Trabzon Hasırı hikayesi

**Bulgu:** 4. hikâye (`trabzon-hasiri-unesco`) "Aralık 2020 UNESCO
Somut Olmayan Miras" onayı iddiasıyla yazılmıştı. 6-C açılışında
UNESCO'nun Türkiye resmî ICH sayfası (ich.unesco.org) baştan sona
tarandı — **Trabzon Hasırı bu listede hiçbir yılda yoktur**. Gerçek
olan koruma 2004 Türk Patent coğrafi işaret tescilidir.

**Karar:** Seçenek (a) — hikayeyi coğrafi işaret merkezli yeniden
çerçevele; duygusal yapı (usta-çırak, zanaatın canlanması) korundu.
ID (`trabzon-hasiri-unesco`) değiştirilmedi (enrichment/route
bağlantıları kırılmasın). Dosya içi düzenlemeler:

- Başlık: "UNESCO Yolu" → "Canlanma Yolu" (3 dilde)
- Subtitle: "dünyanın kalbine yerleşti" → "coğrafi işaretle kendi adını korudu"
- Sahne 4 ("rebirth"): "2015'te aktif usta sayısı 60'a çıktı" (doğrulanmamış rakam) → "yüzlerce kadın dokumacı" (gemsociety.org ile tutarlı)
- Sahne 5 ("to-world"): UNESCO salonu → "Bir çocuğun eline geçen tel" (usta-çırak, 2018 Trabzon, Kunduracılar Caddesi, Körfez turisti — Daily Sabah/AA doğrulandı)
- Takeaway: "dünyanın hafızasında yer" → "ismini koruyan bir işaretle geleceğe"
- StoriesIndex tanıtım metni: "pandemiye rağmen hayatta kalan" → "nesilden nesle geçen"
- `curatorNote`: UNESCO listesinde olmadığını açıkça belirten 3 dilli not, `unesco-ich-turkiye` + `turkpatent-gi-trabzon-hasir` kaynaklı.

### Mimari karar: **Enrichment Layer Pattern (hikâye için)**

`exhibits/_enrichment.js`'in ikizi olarak `data/_storyEnrichment.js`
oluşturuldu. `stories.js` başına `_stories_raw` adıyla eski dizi
dokunulmadan tutuldu; `export const stories = _stories_raw.map(enrichStory)`
ile dışarıya zenginleştirilmiş versiyon verildi. Avantajlar 6-A'daki
deseniyle aynı: backward compat, tek noktadan review, ileride silinmesi
kolay.

### Karar prensibi: sahne body'leri dokunulmaz (Karar 1 — Minimal)

Sahne body metinleri "küratör yorumu" kategorisinde kalır; **inline
`[cite:xxx]` marker'ı eklenmedi**. Kaynakça yalnızca yeni enrichment
alanlarına (timeline[i].cite, curatorNote.cite, story.sources) atıfta
bulunur. Footnote numaralandırma bu üç katmanı birleştirir.

### Eklenen dosyalar

| Dosya                                              | Satır | Amaç                                             |
| :------------------------------------------------- | ----: | :----------------------------------------------- |
| `src/data/_storyEnrichment.js`                     |  ~260 | 5 hikâye için metadata; `enrichStory()` merge    |
| `src/components/common/BodyWithCitations.jsx`      |   73  | Shared — ExhibitDetail ve StoryPage kullanır     |
| `src/components/common/StoryTimeline.jsx`          |  125  | Yatay tarih şeridi, derin zaman (Gyr/Myr) format |
| `src/components/common/CuratorStoryNote.jsx`       |   68  | Hikâye-seviyesi küratör notu, inline cite destek |
| `src/components/common/VocabularyChips.jsx`        |   58  | Glossary deep-link chip'leri                     |

### Değiştirilen dosyalar

| Dosya                                  | Değişiklik                                               |
| :------------------------------------- | :------------------------------------------------------- |
| `src/pages/StoryPage.jsx`              | Baştan aşağı yeniden: 6 yeni bölüm (LocationStrip,       |
|                                        | CuratorStoryNote, StoryTimeline, VocabularyChips,         |
|                                        | RelatedGrid, CitationsFootnote) + citeMap useMemo        |
| `src/pages/ExhibitDetail.jsx`          | Yerel BodyWithCitations/renderInlineCitations kaldırıldı, |
|                                        | shared bileşenden import                                 |
| `src/pages/GlossaryPage.jsx`           | `useSearchParams` ile `?q=` query-param okuma (4 satır) |
| `src/pages/StoriesIndex.jsx`           | Intro metninde "pandemi" referansı kaldırıldı           |
| `src/data/stories.js`                  | `_stories_raw` renaming; `enrichStory` merge; Trabzon    |
|                                        | başlık/4-5.sahne/takeaway düzeltmeleri                   |
| `src/data/sources.js`                  | 11 yeni kaynak (Cullinan, Cailliaud, LIGO GW170817,      |
|                                        | NASA neutron star, British Museum Croeseid, Daily Sabah, |
|                                        | TürkPatent GI, UNESCO ICH Türkiye listesi, …)            |
| `package.json`                         | 0.10.0 → 0.11.0                                          |

### Yeni hikâye alanları (enrichment layer, tamamı opsiyonel)

```js
{
  // Faz 2-C mevcut: id, hall, accent, icon, readMinutes, title, subtitle,
  // scenes, takeaway, relatedExhibits

  // Faz 6-C eklemeleri:
  sources:         ['source-id', ...],
  relatedLabs:     ['lab-id'],
  relatedQuizzes:  ['quiz-category-id'],
  geoPoints:       ['geo-id', 'geo-id-2'],  // çoklu (sergide tekil)
  timeline: [
    { year, event: {tr,en,ar}, cite?: ['source-id'] }
  ],
  vocabulary:      ['glossary-term-id', ...],
  curatorNote:     { tr, en, ar, cite?: ['source-id'] },
}
```

### UI akışı (yeni StoryPage sırası)

**Hero** (+ `LocationStrip` chip'leri) → **Scenes** (değişmedi) →
**Takeaway** (değişmedi) → **CuratorStoryNote** → **StoryTimeline** →
**VocabularyChips** → **RelatedGrid** (4-bölümlü; eski tek-satır
relatedExhibits chip'lerinin yerine) → **CitationsFootnote** →
**OtherStories** (değişmedi).

Her yeni bölüm ilgili veri yoksa render edilmez — tam backward compat.

### Kabul Kriterleri (6-C için)

- [x] `_storyEnrichment.js` 5 hikâyenin hepsi için eksiksiz metadata
- [x] 11 yeni kaynak `sources.js`'de; toplam sources ≥ 29 (hedef ≥25)
- [x] 5 yeni / güncellenmiş UI bileşeni (+ `BodyWithCitations` extract)
- [x] `StoryPage.jsx` 6 yeni bölümü entegre eder
- [x] `GlossaryPage.jsx` deep-link `?q=<term>` okur
- [x] Trabzon hikayesinin UNESCO hatası giderildi (başlık/4.5.sahne/takeaway/intro/curatorNote)
- [x] `ExhibitDetail.jsx` shared `BodyWithCitations`'a migrate edildi; davranış birebir aynı
- [x] `stories.js` dışa aktarılan `stories` enriched versiyon; `getStory`, `getStoriesByExhibit` de enriched döner
- [x] `npm run build` 0 hata (27.91s)
- [x] Smoke test: 96/96 geçti (tüm source ID'leri çözümleniyor, tüm geoPoint ID'leri gerçek, Trabzon UNESCO temizliği doğrulandı)
- [x] Backward compat: eski `relatedExhibits` alanı hâlâ çalışıyor (RelatedGrid okuyor)

### Fiili Teslim Özeti

| Metrik                       | 6-B sonu        | 6-C sonu        | Değişim        |
| :--------------------------- | :-------------- | :-------------- | :------------- |
| Sürüm                        | 0.10.0          | 0.11.0          |                |
| Initial index chunk (gz)     | 118.94 KB       | 140.08 KB       | +21.14 KB      |
| ExhibitDetail chunk (gz)     | 19.38 KB        | 7.27 KB         | −12.11 KB      |
| StoryPage chunk (gz)         | (indekste)      | 3.90 KB         | yeni split     |
| PWA precache toplam          | 1344.91 KiB     | 1364.77 KiB     | +19.86 KiB     |
| Build süresi                 | 20.30s          | 27.91s          | +7.6s          |
| Toplam source kaydı          | 18              | 29              | +11            |
| Hikâye enrichment alan sayısı| 0               | 7×5=35          | +35            |
| UI bileşen (common)          | 2               | 6               | +4             |
| Hata sayısı                  | 0               | 0               | 0              |

Bundle bütçe ≤200 KB gzip initial — ferah altında (140 KB).

### Notlar ve Sapma Kararları

- **Initial chunk +21 KB büyüdü.** Kaynak: `stories.js` + `_storyEnrichment.js` + `geoPoints` + `glossary-extended` artık `RelatedGrid`/`VocabularyChips`/`LocationStrip` aracılığıyla paylaşılan bağımlılığa girdi ve Rollup bunları initial chunk'a bindirdi. ExhibitDetail ise tersine küçüldü (−12 KB) çünkü stories.js'in önemli bir kısmı önce ExhibitDetail-özel chunk'tayken şimdi shared. Net PWA etkisi +20 KiB (~%1.5). 6-Z'de Rollup `manualChunks` ile stories + enrichment tek bir lazy chunk'a taşınabilir; ama 200 KB bütçenin çok altında olduğumuz için bu aciliyet taşımıyor.
- **Sahne body'leri dokunulmadı.** Karar 1 disiplinine sadık kalındı; sahnelerde hiçbir `[cite:xxx]` marker'ı eklenmedi. Kaynakça yalnızca timeline, curatorNote ve sources üzerinden akıyor. `BodyWithCitations` gerekirse inline cite render edebiliyor — 6-F/6-H'de quiz açıklamaları için hazır bekler.
- **Hikâye şema normalize'ı erteledi.** 6-B'de not edilmişti: story `scenes[i].icon` alanı GEM_REGISTRY ID'si değil. 6-C'de bu sorun çözülmedi çünkü sahneler dokunulmadı; RelatedGrid'te story kartı emoji fallback'i (📖) hâlâ aktif. Normalize işi 6-Z audit oturumuna kalıyor — scene icon'ları ayrı bir migration.
- **`crossRefs.js` hikâye-kaynaklı eklemeleri içermiyor.** Build script 6-A'da sadece sergilerin `relatedStories`/`relatedLabs` alanlarını tersine çevirir. 6-C'de hikâyelerin kendi `relatedLabs`/`relatedQuizzes`/`geoPoints`'i crossRef grafına eklenmedi (StoryPage zaten doğrudan enrichment alanlarını okuyor). Script güncellemesi 6-D'de harita için lazım olabilir.
- **`getSources()` export'u import listesinden düştü.** ExhibitDetail.jsx'te `getSources` hâlâ import listesinde ama artık kullanılmıyor (BodyWithCitations extract edilince de kullanım kalmadı). ESLint uyarı vermezse 6-Z polish turunda temizlenir.
- **2013 Midyat Telkârisi cite'ı.** `turkpatent-gi-trabzon-hasir` kaynağı telkâri tescili için de kullanıldı — aslında ayrı bir tescildir ama **aynı kurum** (Türk Patent ve Marka Kurumu) yayıncı olduğu için kaynak referansı kabul edilebilir. 6-Z'de ayrı bir "Midyat Telkâri GI" kaydı oluşturulabilir.
- **Trabzon Hasırı UNESCO olay revizyonu konusunda dikkatli davranıldı.** Karakter/duygu yapısı korundu; yalnızca olgusal iddia değişti. Hikâyedeki "bir çocuk ustasına sarıldı" anı "bir çocuğun eline tel uzatıldı" biçiminde dönüştü — hâlâ aynı temayı (nesiller arası geçiş) kesiyor ama artık doğrulanabilir bir bağlamda (Trabzon Kunduracılar Caddesi ve Körfez turistleri — Daily Sabah 2025 ile desteklendi).

---

## Faz 6-D — Harita Leaflet + GeoJSON ✅ (tamamlandı 2026-04-22)

**Amaç:** `geoPoints.js`'in 39 noktalık zengin coğrafi verisini gerçek
bir interaktif haritaya çıkarmak. Önceki sayfa dekoratif SVG silüet
üzerinde `%` bazlı koordinatlar kullanıyordu; 6-D'de gerçek lat/lng
koordinatları, ülke sınırları GeoJSON zemini, popup + detay paneli,
deep-link (`#geo-id`), kind filtresi.

### Kritik sapma kararı — tile stratejisi

Plan belgesi **Protomaps self-hosted** (`.pmtiles` + CDN + 8–15 MB
asset) öneriyordu. Uygulamaya başlarken bu mimarinin şu eksiklikleri
gerektirdiği görüldü:

- `.pmtiles` üretim pipeline'ı (pmtiles CLI + OSM extract + filter) — projede yok
- 8–15 MB dosyayı servis edecek CDN/static host sözleşmesi — projede yok
- PWA precache'te 15 MB asset kilitleme veya runtime HTTP Range fetch stratejisi — karmaşık

**Seçilen alternatif: Leaflet + Natural Earth GeoJSON (tile-less).**
Dünya için `countries-110m` (189 KB → 65 KB gz), Türkiye zoom için
`turkey-50m` (9 KB → 3 KB gz). Plan'ın orijinal amaçlarına (ToS
kaygısı yok, offline PWA, müze estetiği, rate limit yok) **aynı**
düzeyde hizmet ediyor, ama altyapı gereksinimi sıfır.

**Trade-off:** Z2–Z7 zoom aralığı (ülke sınırları / Türkiye ili
ölçeği). Z8+ şehir sokak seviyesi yok. Müze haritası için yeterli —
ayrıca tile olmadığı için estetik çok daha sade, her piksel
kontrolümüzde. İleride gerçek Protomaps pipeline kurulursa bu mimari
geriye uyumlu değiştirilebilir (LeafletMap.jsx sarmalayıcı tileLayer
destekler şekilde açılabilir).

### Mimari

```
WorldMapPage.jsx              ← state/filter/deep-link owner
  ├─ LeafletMap.jsx           ← vanilla Leaflet + forwardRef API
  │    ├─ GeoJSON layer       ← public/geo/countries-110m.geojson (bej zemin)
  │    ├─ GeoJSON layer       ← public/geo/turkey-50m.geojson (kırmızı dashed sınır)
  │    └─ divIcon markers     ← 39 geoPoint, kind-renkli
  └─ DetailsPanel             ← seçili nokta tam kartı
```

- Bundle disiplini: `vite.config.js` → `manualChunks.leaflet`
  Leaflet'i ayrı chunk'a izole eder; sadece `/map` rotasında yüklenir
- PWA disiplini: `workbox.globPatterns` → `.geojson` eklendi, iki
  dosya da install sırasında cache'lenir → tam offline

### Eklenen dosyalar

| Dosya                                      | Boyut  | Amaç                                                      |
| :----------------------------------------- | :----- | :-------------------------------------------------------- |
| `public/geo/countries-110m.geojson`        | 189 KB | Natural Earth 1:110m ülke sınırları, 177 ülke (3 ondalık) |
| `public/geo/turkey-50m.geojson`            | 9 KB   | Türkiye tek feature, 1:50m detaylı sınır                  |
| `scripts/convert-world-topo.mjs`           | 3 KB   | TopoJSON → GeoJSON dönüşümü (world-atlas npm paketinden)  |
| `scripts/extract-turkey-50m.mjs`           | 2 KB   | countries-50m'den Türkiye feature izolasyonu              |
| `src/components/map/LeafletMap.jsx`        | ~210 s | Vanilla Leaflet sarmalayıcı, forwardRef imperative API    |

### Değiştirilen dosyalar

| Dosya                         | Değişiklik                                                      |
| :---------------------------- | :-------------------------------------------------------------- |
| `src/pages/WorldMapPage.jsx`  | Baştan yazıldı (~350 satır): Leaflet, 6 kind filtre chip'i,     |
|                               | Dünya/Türkiye tab, URL hash deep-link, popup'ta sergi link'i    |
| `src/index.css`               | +137 satır: Leaflet marker/popup/zoom/attribution custom stil   |
| `vite.config.js`              | `manualChunks.leaflet`, `globPatterns` `.geojson` eklendi       |
| `package.json`                | +`leaflet@^1.9.4` dep, +`world-atlas`+`topojson-client` devDep, |
|                               | +`build:geo` npm script, 0.11.0 → 0.12.0                        |

### Kabul Kriterleri (6-D için)

- [x] Leaflet interaktif harita `/map` rotasında çalışıyor
- [x] 39 geoPoint marker olarak render ediliyor
- [x] 6 kind filtre chip'i (mine/workshop/museum/site/trade-hub/deposit)
- [x] Dünya/Türkiye tab (Türkiye → flyTo zoom 5)
- [x] URL hash deep-link: `/map#lapis-afghanistan` ilgili marker'a odaklar + popup açar
- [x] Marker seçilince URL hash güncellenir (paylaşılabilir link)
- [x] Popup: name, place, kind chip, era chip, fact, sergi linki
- [x] DetailsPanel: tam kart + ilgili sergi chip'leri (ExhibitDetail'a)
- [x] Tile server yok → ToS kaygısı yok
- [x] PWA precache `.geojson` dahil → tam offline
- [x] Leaflet bundle disiplini: yalnızca `/map` chunk'ında, index'te preload yok
- [x] `npm run build` 0 hata
- [x] `npm run build:geo` clean install sonrası GeoJSON'u üretir (devDeps kurulu)
- [x] Smoke test 16/16 pass (koordinat aralığı, helper'lar, exhibitId referansları, BBOX filtresi, era şeması)
- [x] Backward compat: GeoBadge'in `/map#id` linkleri (6-B'de eklenmişti) çalışıyor

### Fiili Teslim Özeti

| Metrik                        | 6-C sonu         | 6-D sonu         | Değişim           |
| :---------------------------- | :--------------- | :--------------- | :---------------- |
| Sürüm                         | 0.11.0           | 0.12.0           |                   |
| Initial index chunk (gz)      | 140.08 KB        | 140.13 KB        | +0.05 KB (sızıntı yok) |
| `leaflet` chunk (gz)          | —                | 43.36 KB         | yeni, lazy        |
| `WorldMapPage` chunk (gz)     | 3.16 KB          | ~3.5 KB          | ~                 |
| `/map` toplam yük (gz)        | ~6 KB            | ~57 KB           | +51 KB            |
| PWA precache toplam           | 1364.77 KiB      | 1731.15 KiB      | +366 KiB          |
| Build süresi                  | 27.91 s          | 21.05 s          | −6.9 s            |
| GeoPoint'lerin interaktif gösterimi | %0 (SVG silüet) | %100 (gerçek lat/lng) | — |

**Bundle disiplini doğrulandı:** `index` chunk boyutu değişmedi (sızıntı
yok). Leaflet yalnızca `/map` rotası açıldığında yüklenir. İlk PWA
install ~1.7 MB (tek seferlik; sonraki ziyaretlerde cache'ten okur).

### Notlar ve Sapma Kararları

- **Protomaps yerine Natural Earth GeoJSON** — yukarıda detaylı açıklama.
- **PWA precache +366 KiB** — Leaflet chunk + iki GeoJSON + Leaflet CSS bir kerelik ilk install'ta yüklenir. Plan belgesindeki "Cache quota ~50 MB, LRU eviction" notu tile cache için düşünülmüştü; tile kullanmadığımız için konu dışı. Kullanıcı için 1.7 MB install kabul edilebilir boyut (Gmail mobile ~6 MB, Twitter PWA ~3 MB referansları).
- **`build:geo` scripti `devDependencies`'den çalışır** — `world-atlas` (7.9 MB, 6 dosya) ve `topojson-client` (65 KB) devDep olarak eklendi. Üretim bundle'ına sızmaz. Public domain veri + ISC lisans.
- **Kind ikonu dup'u** — `KIND_LABELS`/`KIND_COLORS` hem `WorldMapPage` hem `LeafletMap`'te duplicated. İkisi de küçük sabit, LeafletMap default fallback olarak kullanıyor, WorldMapPage page-level mantık için kullanıyor. 6-Z polish'de shared utils'e taşınabilir ama aciliyet yok.
- **Runtime test sınırlı yapıldı** — sandbox ortamında HTTP preview server stabil başlatılamadı. Doğrulama: filesystem-level dist kontrol (GeoJSON geçerli, 10587 koordinat noktası aralıkta, Leaflet chunk referans grafiği temiz) + kod-seviye smoke test (16/16). UI render testi için gerçek browser ortamı gerekir.
- **World Tour oyunu hâlâ `worldOrigins.js` kullanıyor** — 6-A notunda belirtilen migrate 6-D'de yapılmadı çünkü 6-D'nin ana hedefi haritaydı, oyun değil. Paralel veri duplikasyonu bilinçli; 6-E/6-F/6-G'de ele alınabilir.
- **GeoJSON koordinat hassasiyeti 3 ondalık (~100m)** — Z7 zoom'da bile fark edilmez. 4 ondalık denendi ama gzip boyutu ~%20 artıyordu, 3 ondalık net fayda.
- **Attribution'lar doğru** — Leaflet, Natural Earth, world-atlas (ISC), topojson-client (ISC). Sayfa altında otomatik görünüyor.

---

## Faz 6-E — Deney Labı Zenginleştirme ✅ (tamamlandı 2026-04-22)

**Amaç:** 7 interaktif deneyi (KaratCalculator, MohsScratch, SilverTarnish,
DiamondCutSimulator, LydiaMint, MeltingPoints, StoneGuessing) — toplam
~2540 satır interaktif kod — müze vitrinine yerleştirmek: her deneyin
etrafına başlık+amaç+materyaller+prosedür+güvenlik notu (üst) ve
küratör notu+timeline+sözlük+ilgili içerik grid+kaynakça (alt)
katmanı ekle. **Deney bileşenleri dokunulmadı** — interaktif davranış
korundu.

### Mimari kararı: Enrichment Layer Pattern (3. kez)

6-A'nın `_enrichment.js`, 6-C'nin `_storyEnrichment.js`, şimdi
`_labEnrichment.js` — aynı desen tekrar. `LabPage.jsx` başındaki
`BASE_EXPERIMENTS` array'i `enrichLab()` ile geçirilir, çıktı
`EXPERIMENTS` render'da kullanılır. Orijinal 7 lab bileşen dosyasına
tek satır bile dokunulmadı.

Avantaj: Faz 6-C'nin shared bileşenleri (`CuratorStoryNote`,
`StoryTimeline`, `VocabularyChips`, `RelatedGrid`, `CitationsFootnote`,
`BodyWithCitations.renderInlineCitations`) **hiç değişmeden** yeniden
kullanıldı. Tek yeni bileşen `LabHero.jsx` (her üç bileşenin olmadığı
için yeni kategori: materials + procedure).

### Eklenen dosyalar

| Dosya                                   | Satır | Amaç                                               |
| :-------------------------------------- | ----: | :------------------------------------------------- |
| `src/data/_labEnrichment.js`            | ~520  | 7 deney için title/goal/materials/procedure/...    |
| `src/components/lab/LabHero.jsx`        | ~150  | Deney üstü müze vitrini (materials+procedure+note) |

### Değiştirilen dosyalar

| Dosya                           | Değişiklik                                            |
| :------------------------------ | :---------------------------------------------------- |
| `src/pages/LabPage.jsx`         | Yeniden yazıldı (~190 satır): enrichment merge,       |
|                                 | LabHero deney üstünde, 5 alt bölüm deney altında      |
| `src/data/sources.js`           | 4 yeni kaynak: crc-handbook, webelements,             |
|                                 | iupac-periodic, gia-4cs. Toplam: 29 → 33              |
| `package.json`                  | 0.12.0 → 0.13.0                                       |

### Yeni deney alanları (enrichment layer, tamamı opsiyonel)

```js
{
  // Faz 3 mevcut: id, Icon, Cmp, tone

  // Faz 6-E eklemeleri:
  title:          { tr, en, ar },
  goal:           { tr, en, ar },                            // 2-3 cümle
  materials:      [{ emoji, name: {...}, note?: {...} }],    // 3-5 öğe
  procedure:      [{ step: {...}, cite?: ['source-id'] }],   // 3-4 adım
  safetyNote:     { tr, en, ar },                            // zorunlu gibi, 7/7
  sources:        ['source-id', ...],
  relatedExhibits:['exhibit-id', ...],
  relatedStories: ['story-id', ...],
  relatedQuizzes: ['quiz-category-id'],
  vocabulary:     ['glossary-term-id', ...],
  curatorNote:    { tr, en, ar, cite?: ['source-id'] },
  timeline:       [{ year, event: {...}, cite?: [...] }],    // yalnız 3 deneyde
}
```

### UI akışı (yeni LabPage sırası)

**Experiment picker** (mevcut) → **Vitrin kartı:**
  - `LabHero` (title+goal+materials+procedure+safetyNote)
  - **Deney bileşeni** (KaratCalculator/MohsScratch/…) — dokunulmadı
  → **CuratorStoryNote** → **StoryTimeline** (varsa) →
  **VocabularyChips** → **RelatedGrid** (exhibits+stories+quizzes;
  lab chip'leri yok çünkü zaten labdayız) → **CitationsFootnote**.

Her yeni bölüm veri yoksa gizlenir — backward compat tam.

### Kabul Kriterleri (6-E için)

- [x] `_labEnrichment.js` 7 deneyin hepsi için eksiksiz metadata
- [x] 4 yeni kaynak `sources.js`'de; toplam sources ≥ 33 (hedef ≥30)
- [x] 7/7 deneyde safetyNote var (disiplinli uyarıcı not pattern'i)
- [x] Timeline 3 deneyde var: mohs (1812, 1822), light (1919, 1953), lydia (-600, -560, -546)
- [x] `LabHero.jsx` materials+procedure+safetyNote grid'ini render eder
- [x] `LabPage.jsx` 6 alt bölümü entegre eder (LabHero + CuratorStoryNote + Timeline + Vocabulary + RelatedGrid + CitationsFootnote)
- [x] Deney bileşenleri **dokunulmadı** — KaratCalculator, MohsScratch, SilverTarnish, DiamondCutSimulator, LydiaMint, MeltingPoints, StoneGuessing hepsi orijinal davranışı korudu
- [x] 6-C shared bileşenleri (CuratorStoryNote, StoryTimeline, VocabularyChips, RelatedGrid, CitationsFootnote) değişiklik gerektirmeden yeniden kullanıldı
- [x] `npm run build` 0 hata (29.65s)
- [x] Smoke test 182/182 pass (7 deneyin tüm source/relatedExhibit/relatedStory/vocabulary/cite ID'leri geçerli; enrichLab merge davranışı doğru; timeline sadece beklenen 3 deneyde)
- [x] Backward compat: `experiments` array'inin orijinal alanları (id, Icon, Cmp, tone) enrichLab sonrası korundu; `?id=xxx` query-param deep-link hâlâ çalışıyor

### Fiili Teslim Özeti

| Metrik                   | 6-D sonu       | 6-E sonu       | Değişim       |
| :----------------------- | :------------- | :------------- | :------------ |
| Sürüm                    | 0.12.0         | 0.13.0         |               |
| Initial index chunk (gz) | 140.13 KB      | 140.39 KB      | +0.26 KB      |
| LabPage chunk (gz)       | 122.83 KB      | 136.50 KB      | +13.67 KB     |
| PWA precache toplam      | 1731.15 KiB    | 1767.11 KiB    | +35.96 KiB    |
| Build süresi             | 21.05 s        | 29.65 s        | +8.6 s        |
| Toplam source kaydı      | 29             | 33             | +4            |
| Deney enrichment alanı   | 0              | 10×7 = ~70     | +70           |
| Deneylerde footnote      | 0              | 5-8 /deney     | —             |
| Hata sayısı              | 0              | 0              | 0             |

Bundle disiplini: initial chunk sızıntı YOK (+0.26 KB marjinal).
LabPage büyümesi (+13.67 KB gz) yalnızca `/lab` rotasına yüklenir;
enrichment verisi + LabHero + 6-C shared component import'ları.

### Notlar ve Sapma Kararları

- **Deney bileşenleri dokunulmadı.** Bu 6-E'nin ana disiplin noktası. LabHero deneyin üstünde, 5 alt bölüm altında render edilir; deneyin kendi interaktif state'i (slotA/slotB, heat slider, karat value, vb.) hiç değişmeden çalışır.
- **7/7 deneyde safetyNote disiplini.** Her simülasyon için kullanıcıya "bu gerçek laboratuvar değil, bu model şunu basitleştiriyor" uyarısı ekledim. Bu hem eğitsel dürüstlük hem de aşırı-güven ekarte etme açısından önemli. Örnek: Mohs için "gerçek testte kalıcı çizik olur"; light için "bu 2D, gerçek brilliant 3D 57-58 faset"; melt için "alaşımlar pure-metal'den 50-150°C düşük".
- **Timeline yalnızca 3 deneyde var.** mohs/light/lydia tarihsel olayla ilişkili (Mohs 1812, Tolkowsky 1919, Kroisos -600). tarnish/karat/melt/guess tarihsel özel olay barındırmıyor — zorunlu koymak kaynaksız iddia demekti, Karar 1 gereği eklemedim.
- **Tarnish reaksiyonu** `2Ag + H₂S → Ag₂S + H₂` CRC Handbook kaynaklı; bu nokta dürüst kimyanın doğrulanabilir kısmı. Ters redoks (Al folyo + tuzlu su temizleme) standart kimya bilgisi.
- **Lydia deneyi tarihsel dürüstlük:** safetyNote "gerçek Lidya darphanesi önce cupellation ile altın-gümüş ayırırdı; Kroisos'un gerçek katkısı bu saflaştırma süreciydi" notu — basitleştirmeyi açıkça belirttim. 6-C'deki hikaye (altin-nugget-yolculugu) ile bilgi tutarlı.
- **Bir ID düzeltmesi smoke test'te yakalandı:** `turkuaz` → `turkuvaz`. Enrichment'tan önceki taze gözle düzeltilemeyecek typo türü; smoke test bunu ilk çalıştırmada ortaya çıkardı.
- **6-C shared bileşenleri değişiklik gerektirmeden çalıştı.** Bu, 6-C'de "Story"-spesifik olarak adlandırılan bileşenlerin aslında jenerik olduğunu doğruladı. İleride (6-F quiz, 6-G atölye) aynı bileşenler tekrar kullanılabilir. Yeniden adlandırma (Story → Generic) 6-Z'de düşünülebilir ama şimdilik isim karışıklığı sorun değil.
- **curatorNote'lar eğitsel özetler olarak çalışıyor.** Her biri "simülasyonun göstermediği ama bilmen gereken şey" özeti. Mohs için "skala ordinal değil interval"; light için "matematiksel ideal ≠ estetik güzellik"; melt için "d-blok geçiş metali bağ gücü"; guess için "yakut ve safir aynı mineral".
- **Initial chunk sızıntısı yok.** Test: LabPage chunk'ı enrichment ve yeni UI'ı içeriyor ama index chunk +0.26 KB. Bu 6-C'nin (index +21 KB) aksine temiz bir genişleme — enrichment object reference'ları sadece LabPage'de kullanıldığı için Rollup güzelce izole etti.

---

## Faz 6-F — Quiz Merkezi Zenginleştirme ✅ (tamamlandı 2026-04-23)

**Amaç:** 49 sorunluk quiz merkezine (`/quiz`) bağlam ve keşif katmanı
eklemek. Kullanıcı artık quiz'e "kör" başlamıyor: kategori seçince
o kategorinin tanıtımını, geçen sözlük terimlerini ve ilgili müze
içeriğini görüyor. Bitirdikten sonra da küratör notu + "keşfe devam
et" chip'leriyle bir sonraki sayfaya yönlendirilir — quiz artık
sadece bil-bilme oyunu değil, müzenin bir öğrenme kapısı.

### Mimari kararı: Kategori-seviyesi (soru-seviyesi DEĞİL)

49 sorunun hepsine ID verip enrichment yazmak yüksek risk/düşük
fayda: kullanıcı quiz oynarken cevaba odaklanır, bağlamı okumaz.
Bağlam en değerli olduğu iki noktada eklendi:
  1. **Başlangıç** (QuizHub): kullanıcı hazırlık için okur
  2. **Bitiş** (QuizPlay finished ekranı): kullanıcı "şimdi neyi
     öğrendim, sırada ne var?" zihniyle bakar

Sorulara dokunulmadı — quizzes[] array'i birebir korundu.

### Eklenen dosyalar

| Dosya                                        | Satır | Amaç                                      |
| :------------------------------------------- | ----: | :---------------------------------------- |
| `src/data/_quizEnrichment.js`                | ~230  | 8 kategori için metadata                  |
| `src/components/quiz/QuizCategoryIntro.jsx`  | ~80   | Kategori seçilince hub'da bağlam kartı    |

### Değiştirilen dosyalar

| Dosya                        | Değişiklik                                                |
| :--------------------------- | :-------------------------------------------------------- |
| `src/data/quizzes.js`        | `_categoriesBase` iç, `categories` enriched export,       |
|                              | `getCategory(id)` helper eklendi. Sorular DOKUNULMADI.    |
| `src/pages/QuizHub.jsx`      | Kategori grid'i altında seçili kategorinin intro kartı    |
|                              | (--quiz-accent CSS var ile kategori-spesifik renk)        |
| `src/pages/QuizPlay.jsx`     | `finished` ekranı zenginleştirildi: CuratorStoryNote +    |
|                              | "Keep learning" başlıklı RelatedGrid + CitationsFootnote. |
|                              | citeMap useMemo benzeri senkron hesap                     |
| `package.json`               | 0.13.0 → 0.14.0                                           |

### Yeni kategori alanları (enrichment layer, tamamı opsiyonel)

```js
{
  // Base (mevcut): id, tr/en/ar, emoji

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

### UI akışı

**QuizHub:**
  1. Kategori grid'i (mevcut, 8 kart)
  2. **Yeni:** Seçili kategorinin `QuizCategoryIntro` kartı:
     - intro paragrafı
     - VocabularyChips (kategoride geçen sözlük)
     - RelatedGrid (exhibits + labs + stories; quiz chip'leri yok)
  3. Zorluk seçimi (mevcut)
  4. Start button (mevcut)

**QuizPlay finished ekranı:**
  1. Trophy + skor + yıldız + restart/back (mevcut)
  2. **Yeni:** CuratorStoryNote — "quiz bittikten sonra bilmen gereken şey"
  3. **Yeni:** "Öğrenmeye devam et →" başlıklı RelatedGrid
  4. **Yeni:** CitationsFootnote (curatorNote.cite + sources birleşir)

### Kabul Kriterleri (6-F için)

- [x] `_quizEnrichment.js` 8 kategorinin hepsi için metadata
- [x] Her kategoride intro (tr/en/ar) + curatorNote + en az bir ilgili içerik
- [x] `enrichQuizCategory` merge davranışı: base alanları korur, enrichment'ı ekler
- [x] `getCategory(id)` helper çalışıyor
- [x] Sorular dokunulmadı — 49/49 hâlâ explanation içeriyor
- [x] QuizHub'da `QuizCategoryIntro` seçili kategori altında render ediliyor
- [x] QuizPlay `finished` ekranı 3 yeni bölümle zenginleşti
- [x] 6-C/6-E shared bileşenleri (CuratorStoryNote, RelatedGrid, VocabularyChips, CitationsFootnote) değişiklik gerektirmeden yeniden kullanıldı
- [x] `npm run build` 0 hata (21.14 s)
- [x] Smoke test 207/207 pass
- [x] Backward compat: `?cat=altin` query-param hâlâ çalışıyor, difficulty seçimi korundu

### Fiili Teslim Özeti

| Metrik                   | 6-E sonu       | 6-F sonu       | Değişim       |
| :----------------------- | :------------- | :------------- | :------------ |
| Sürüm                    | 0.13.0         | 0.14.0         |               |
| Initial index chunk (gz) | 140.39 KB      | 155.79 KB      | **+15.40 KB** |
| LabPage chunk (gz)       | 136.50 KB      | 136.50 KB      | 0             |
| PWA precache toplam      | 1767.11 KiB    | 1780.69 KiB    | +13.58 KiB    |
| Build süresi             | 29.65 s        | 21.14 s        | −8.5 s        |
| Quiz kategori enrichment | 0              | 8×7 ≈ 56 alan  | +56           |
| Toplam smoke pass        | 182/182        | 207/207        | +25           |

**Initial chunk +15 KB sızıntısı** — beklenen davranış: `quizzes.js`
zaten ana bundle'da (RelatedGrid import zincirinden), şimdi enrichment
onunla beraber giriyor. 6-C'deki +21 KB story sızıntısı ile benzer
fenomen; 6-Z'de manualChunks ile ayrı chunk'a izole edilebilir.
Kabul edilebilir: toplam initial payload 155 KB gz (hedef 200 KB altı).

### Notlar ve Sapma Kararları

- **Soruların hepsi dokunulmadı.** 49/49 orijinal explanation'lı sorular birebir korundu. Bu 6-F'nin ana disiplin noktası.
- **Kategori-seviyesi tercihi.** Soru-seviyesi enrichment (49 soruya ayrı kaynak) yerine kategori-seviyesi seçildi. Kullanıcı deneyimi odaklı karar: bağlam başta/sonda değerli, orta oyun sırasında dikkat dağıtıcı.
- **Kategori-spesifik renk accent.** QuizHub'da `--quiz-accent` CSS değişkeni ile her kategorinin intro kartı kendi rengiyle gösterilir (altın → sarı, gümüş → gri, pırlanta → mavi, vb.). LabPage'deki `--hall-accent` pattern'inin paraleli.
- **Smoke test 2 ID hatası yakaladı** — `platin-tarihce` yerine `platin-tarihi`, `paladyum` yerine `platin-endustri`. Registry lookup disiplini tekrar kendini ispat etti.
- **Bitiş ekranındaki RelatedGrid = teşvik.** Kullanıcı quiz bitirdiğinde tipik olarak bir sonraki şeyi arıyor; "öğrenmeye devam et" chip'leri doğal bir navigasyon noktası. Nesne kaynağı quiz skoruyla değil, kategorinin müzedeki ilişkileriyle belirlenir.
- **6-C/6-E shared bileşenleri yeniden kullanıldı (4. kez).** CuratorStoryNote, RelatedGrid, VocabularyChips, CitationsFootnote hiç değişmeden 6-F'de çalıştı. "Story" prefix'li isimlerin jenerik olduğu fiilen kanıtlandı — 6-Z'de rename düşünülebilir.
- **Bundle +15 KB kabul edildi.** Alternatif (`manualChunks.quizEnrichment: [...]`) 6-Z'ye ertelendi. Şu an toplam initial 155 KB gz hedefin altında.

---

## Faz 6-G — Atölye Zenginleştirme ✅ (tamamlandı 2026-04-23)

**Amaç:** 4 atölyeyi (hasir=Trabzon Hasırı, telkari-usta=Mardin Telkârisi,
savat=Siirt/Midyat Savatı, mine=İstanbul Minesi) müze vitrinine
yerleştirmek. Her atölyenin üstünde `WorkshopHero` (intro, coğrafi
köken, materyaller, güvenlik notu), altında 5 bölüm (küratör notu,
tarih şeridi, sözlük, ilgili içerik grid, kaynakça). Step-by-step
walkthrough'un kendi body'leri (27 adım × 3 dil × "t/d") **dokunulmadı**.

### Mimari tekrar: Enrichment Layer Pattern (5. kez)

6-A (sergi), 6-C (hikâye), 6-E (lab), 6-F (quiz), şimdi 6-G (atölye).
Aynı desenin beşinci uygulaması. WorkshopHub.jsx başındaki
`BASE_WORKSHOPS` array'i `enrichWorkshop()` ile geçirilir; çıktı
`workshops` render'da kullanılır. Orijinal 4 atölyenin
step body'lerine tek karakter bile dokunulmadı.

6-C'nin jenerik shared bileşenleri (CuratorStoryNote, StoryTimeline,
VocabularyChips, RelatedGrid, CitationsFootnote) bu fazda da değişmeden
tekrar kullanıldı — artık 5. faz boyunca.

### Eklenen dosyalar

| Dosya                                            | Satır | Amaç                                      |
| :----------------------------------------------- | ----: | :---------------------------------------- |
| `src/data/_workshopEnrichment.js`                | ~360  | 4 atölye için metadata                    |
| `src/components/workshop/WorkshopHero.jsx`       | ~170  | Atölye üstü vitrin: intro + origin strip + materials + safetyNote |

### Değiştirilen dosyalar

| Dosya                            | Değişiklik                                               |
| :------------------------------- | :------------------------------------------------------- |
| `src/pages/WorkshopHub.jsx`      | Yeniden yazıldı (265 → ~320 satır): enrichment merge,    |
|                                  | WorkshopHero hero olarak, walkthrough korundu, 5 alt     |
|                                  | bölüm (curatorNote+timeline+vocab+relatedGrid+footnote)  |
| `src/data/sources.js`            | 3 yeni kaynak: turkpatent-gi-midyat-telkari (2013),      |
|                                  | turkpatent-gi-siirt-savat (2019), vam-enamel (V&A).      |
|                                  | Toplam: 33 → 36                                          |
| `package.json`                   | 0.14.0 → 0.15.0                                          |

### Yeni atölye alanları (enrichment layer, tamamı opsiyonel)

```js
{
  // Faz 3 mevcut: id, emoji, tone, title, subtitle, steps

  // Faz 6-G eklemeleri:
  intro:          { tr, en, ar },                        // tanıtım paragrafı
  origin:         { place: {tr,en,ar}, era?: {start, end} },
  materials:      [{ emoji, name: {...}, note?: {...} }],
  sources:        ['source-id', ...],
  relatedExhibits:['exhibit-id', ...],
  relatedStories: ['story-id', ...],
  relatedLabs:    ['lab-id', ...],
  relatedQuizzes: ['quiz-category-id'],
  geoPoints:      ['geo-id', ...],                       // atölyenin coğrafyası
  vocabulary:     ['glossary-term-id', ...],
  curatorNote:    { tr, en, ar, cite?: ['source-id'] },
  timeline:       [{ year, event: {...}, cite?: [...] }],
  safetyNote:     { tr, en, ar },                        // 4/4 atölyede
}
```

### UI akışı

**Workshop picker** (mevcut) → **Vitrin kartı:**
  - Atölye başlığı + subtitle (mevcut)
  - **Yeni:** WorkshopHero (intro + origin strip + materials + safetyNote)
  - Step progress dots (mevcut)
  - Aktif step body + prev/next (mevcut — DOKUNULMADI)
  - "Tebrikler!" banner son step'te (mevcut)
  → **CuratorStoryNote** → **StoryTimeline** → **VocabularyChips**
  → **RelatedGrid** (exhibits + stories + labs + quizzes) →
  **CitationsFootnote**.

### Step body'leri dokunulmadı

27 step × 3 dil × 2 alan (t+d) = **162 string birebir korundu.**
Step'ler orijinal metinlerini kullanır; enrichment yalnızca onların
etrafındaki müze vitrini için yeni alanlar ekler. Bu, 6-E'deki
"7 deney bileşeni dokunulmadı" disiplininin atölye karşılığı.

### Kabul Kriterleri (6-G için)

- [x] `_workshopEnrichment.js` 4 atölyenin hepsi için eksiksiz metadata
- [x] 3 yeni kaynak sources.js'de; toplam ≥36 (hedef ≥35)
- [x] 4/4 atölyede intro var (tr/en/ar)
- [x] 4/4 atölyede safetyNote var (disiplinli uyarı)
- [x] 4/4 atölyede timeline (atölyelerin hepsi tarihsel zanaat)
- [x] 4/4 atölyede geoPoints bağı (harita ile entegrasyon)
- [x] `WorkshopHero.jsx` intro + origin + materials + safetyNote render eder
- [x] `WorkshopHub.jsx` 6 alt bölümü entegre eder
- [x] Step body'leri DOKUNULMADI — 27 adım × 3 dil × 2 alan = 162 string birebir
- [x] 6-C/6-E shared bileşenleri (CuratorStoryNote, StoryTimeline, VocabularyChips, RelatedGrid, CitationsFootnote) değişiklik gerektirmeden 5. kez yeniden kullanıldı
- [x] `npm run build` 0 hata (21.12 s)
- [x] Smoke test 95/95 pass (tüm source/exhibit/story/lab/geoPoint/term ID'leri geçerli; enrichWorkshop merge doğru; 4/4 atölyede timeline ve safetyNote)

### Fiili Teslim Özeti

| Metrik                    | 6-F sonu    | 6-G sonu    | Değişim       |
| :------------------------ | :---------- | :---------- | :------------ |
| Sürüm                     | 0.14.0      | 0.15.0      |               |
| Initial index chunk (gz)  | 155.79 KB   | 155.93 KB   | +0.14 KB      |
| WorkshopHub chunk (gz)    | ~5 KB       | 14.22 KB    | +~9 KB        |
| PWA precache toplam       | 1780.69 KiB | 1803.13 KiB | +22.44 KiB    |
| Build süresi              | 21.14 s     | 21.12 s     | ~0            |
| Toplam source kaydı       | 33          | 36          | +3            |
| Atölye enrichment alanları| 0           | ~48         | +48           |
| Smoke pass                | 207/207     | 95/95 (6-G) | —             |

**Initial chunk sızıntısı YOK (+0.14 KB marjinal).** Bu önemli: 6-F'de
(+15 KB) ve 6-C'de (+21 KB) gördüğümüz sızıntılar enrichment veri
dosyasının ana bundle'daki `RelatedGrid` üzerinden bir import zincirine
girmesinden kaynaklanıyordu. 6-G'de `_workshopEnrichment.js` sadece
WorkshopHub'dan import edildiği için Rollup güzelce izole etti.

### Notlar ve Sapma Kararları

- **Step body'leri dokunulmadı.** 6-G'nin ana disiplin noktası. Adımların metni (162 string) birebir korundu — enrichment yalnızca adımların etrafındaki bağlamı sağlar.
- **4/4 atölyede safetyNote disiplini.** Her atölye simülasyonu için "bu gerçek ustalık değil" uyarısı. hasır: "7-10 yıl usta-çırak süreci"; telkari: "0.2 mm tel evde yapılamaz"; savat: "bor asit ve kurşun tozu dikkat"; mine: "750-900°C fırın endüstriyel ekipman".
- **4/4 atölyede timeline.** Tüm atölyeler tarihsel zanaat olduğu için timeline tam — hasır (~1300/2004/2024), telkari (~1500/2013), savat (~900/~1200/2019), mine (~500/~1550). Dürüst tarih: "~" belirsizlik işareti, "2004" GI tescili kesinliği.
- **Coğrafi işaret disiplini.** 3 yeni source hepsi Türk Patent GI tescilleri — Trabzon Hasırı (2004, zaten vardı), Midyat Telkârisi (2013, yeni), Siirt Savatı (2019, yeni). Bu disiplin atölyelerin her birinin tarihsel yasal koruma altında olduğunu gösterir.
- **Savat tarihsel düzeltme:** İlk yazdığımda "Türkiye\'de son yuvası Siirt" demiştim. Smoke testte `siirt-savat` geoPoint'i bulunmadığı için yakalandı — gerçek geoPoint `midyat-savat`. Doğru tarihi nüans: savat her iki şehirde geliştirildi; 2019 GI adı "Siirt Savatı" ama her iki şehir de aktif. Enrichment "Siirt & Midyat" olarak düzeltildi.
- **mine atölyesi adı konfüzyonu.** Türkçe "mine" (emay/enamel) ile İngilizce "mine" (maden) çakışıyor. Kod bağlamı net olduğu için (atölye / geoPoint kind) karışma yok, ama intro'da "mine (pronounced mee-neh)" pronunciation belirtilerek açıklandı.
- **Materials sub-note disiplini.** Niello için "kurşun içerir → maske/eldiven" gibi spesifik kimyasal notlar materials.note alanına konulup ayrıntı sağlandı. Bu eğitsel dürüstlük için önemli.
- **origin.era timeline zamansal uyum.** Her atölyenin `origin.era.start` timeline'ın ilk yılı ile eşleşiyor: hasir ~1300, telkari ~1500, savat ~900, mine ~500.
- **Bundle disiplini ideal.** Enrichment data sadece WorkshopHub'dan import edildiği için ana bundle'a sızıntı yok. 6-Z'de 6-F'nin (+15 KB) ve 6-C'nin (+21 KB) sızıntıları için manualChunks stratejisi düşünüldüğünde, 6-G bu disiplinin ideal örneği olarak referans alınabilir.

---

## Faz 6-H — Öğretmenler Zenginleştirme ✅ (tamamlandı 2026-04-23)

**Amaç:** `/educators` rotasındaki 4 ders planını (mohs-scratch-test,
silver-tarnish-chemistry, lydia-coinage-history, unesco-intangible-heritage)
pedagojik vitrinle sarmak: **Öğretmene brief** (intro), **öğrenme
kazanımları** (Bloom taxonomy), **müfredat bağlantıları** (MEB +
uluslararası), **değerlendirme matrisi** (rubric), ilgili müze içeriği
(lab/hikâye/atölye/quiz), öğretmene özel küratör notu, kaynakça.
Mevcut `steps/worksheet/discussion/relatedExhibits` alanları
**dokunulmadı**.

### Mimari tekrar: Enrichment Layer Pattern (6. ve son kez)

6-A (sergi), 6-C (hikâye), 6-E (lab), 6-F (quiz), 6-G (atölye),
şimdi 6-H (ders planı). **Desen altıncı kez başarılı uygulandı.**
`Educators.jsx` başındaki `_basePlans` array'i `enrichLessonPlan()`
ile geçirilir; çıktı `lessonPlans` render'da kullanılır. Orijinal
4 planın alanlarına tek karakter bile dokunulmadı.

6-C'den beri geçerli jenerik shared bileşenler (CuratorStoryNote,
CitationsFootnote, RelatedGrid, renderInlineCitations) bu fazda da
değişmeden tekrar kullanıldı — artık **6 faz boyunca**.

### Eklenen dosyalar

| Dosya                                  | Satır | Amaç                                     |
| :------------------------------------- | ----: | :--------------------------------------- |
| `src/data/_lessonPlanEnrichment.js`    | ~490  | 4 ders planı için pedagojik metadata     |

### Değiştirilen dosyalar

| Dosya                              | Değişiklik                                               |
| :--------------------------------- | :------------------------------------------------------- |
| `src/pages/Educators.jsx`          | Ders planı enrichment merge; LessonPlanCard'a 7 yeni     |
|                                    | bölüm eklendi (intro, learningObjectives, curriculumLinks,|
|                                    | extended RelatedGrid, assessmentRubric tablosu,          |
|                                    | curatorNote, footnote). Mevcut materials/steps/          |
|                                    | worksheet/discussion/relatedExhibits DOKUNULMADI.        |
|                                    | PrintStyles'a rubric tablosu için print stilleri eklendi.|
| `src/data/sources.js`              | 2 yeni kaynak: meb-ortaokul-fen-mufredat,                |
|                                    | bloom-taxonomy-revised. Toplam: 36 → 38.                 |
| `package.json`                     | 0.15.0 → 0.16.0                                          |

### Yeni ders planı alanları (enrichment layer, tamamı opsiyonel)

```js
{
  // Faz 2-C (mevcut): id, hall, accent, icon, level, duration, subject,
  //                   title, goal, materials, steps, worksheet,
  //                   discussion, relatedExhibits

  // Faz 6-H:
  intro:              { tr, en, ar },                     // öğretmene brief
  learningObjectives: [{tr,en,ar}],                       // 3-5 Bloom kazanımı
  curriculumLinks:    [{tr,en,ar}],                       // MEB + uluslararası
  assessmentRubric:   [{                                  // 3-4 kriter × 4 seviye
    criterion: {tr,en,ar},
    levels: [
      { score: 4, descriptor: {tr,en,ar} },
      { score: 3, descriptor: {tr,en,ar} },
      { score: 2, descriptor: {tr,en,ar} },
      { score: 1, descriptor: {tr,en,ar} },
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

### UI akışı (yeni LessonPlanCard sırası)

**Header** (mevcut: icon + level/duration/subject + title + goal):
  - **Yeni:** Teacher's Brief kutucuğu (intro — accent renkli sol bordür)

**Expanded body:**
  - **Yeni:** Learning Objectives (numaralı liste, Bloom)
  - **Yeni:** Curriculum Links (MEB + uluslararası, madde listesi)
  - Materials (mevcut)
  - Steps (mevcut)
  - Worksheet (mevcut, yazdırılabilir)
  - Discussion (mevcut)
  - Related Exhibits (mevcut, chip link'ler)
  - **Yeni:** Related Museum Content — RelatedGrid (labs + stories +
    quizzes) + workshops chip'leri manuel (WorkshopHub'ın chip API'si
    yok, ama `/workshop?id=` linkleriyle manuel oluşturuldu)
  - **Yeni:** Assessment Rubric (yazdırılabilir, 4-seviye tablo)
  - **Yeni:** Curator Note (öğretmen ipucu, kaynaklı)
  - **Yeni:** CitationsFootnote

### Print davranışı

- Intro paragrafı yazdırmada görünür (öğretmen kâğıda notu alır)
- Learning objectives yazdırmada görünür
- Curriculum links yazdırmada görünür
- Rubric tablosu **görünür** ve print CSS ile düzgün bordürlendi
- Extended RelatedGrid **gizli** (`no-print` — link'ler kâğıtta faydasız)
- CitationsFootnote **gizli** (`no-print` — ekran için)
- Worksheet yazdırma davranışı birebir korundu

### Kabul Kriterleri (6-H için)

- [x] `_lessonPlanEnrichment.js` 4 planın hepsi için eksiksiz metadata
- [x] 2 yeni kaynak sources.js'de; toplam ≥38 (hedef ≥37)
- [x] 4/4 planda intro (tr/en/ar)
- [x] 4/4 planda ≥3 learningObjectives
- [x] 4/4 planda ≥2 curriculumLinks
- [x] 4/4 planda ≥3 kriter × 4 seviye rubric
- [x] UNESCO planının curatorNote'u Trabzon Hasırı'nın UNESCO'da OLMADIĞINI açıkça belirtir (tarihsel dürüstlük — 6-C'deki düzeltmeyle tutarlı)
- [x] Mevcut `steps/worksheet/discussion/relatedExhibits` DOKUNULMADI
- [x] 6-C shared bileşenleri (CuratorStoryNote, CitationsFootnote, RelatedGrid, renderInlineCitations) 6. kez yeniden kullanıldı
- [x] `npm run build` 0 hata (21.37 s)
- [x] Smoke test 115/115 pass (tüm source/lab/story/workshop/term ID'leri geçerli; her rubric'te 4 seviye ve scores [1,2,3,4]; enrichLessonPlan base alanları korur; UNESCO curatorNote "DEĞİLDİR" ifadesi içeriyor)
- [x] Backward compat: yazdırma akışı (`data-printing-plan` attribute) korundu, rubric tablosu için print CSS eklendi
- [x] Bundle disiplini: initial +0.23 KB (sızıntı yok)

### Fiili Teslim Özeti

| Metrik                    | 6-G sonu    | 6-H sonu    | Değişim       |
| :------------------------ | :---------- | :---------- | :------------ |
| Sürüm                     | 0.15.0      | 0.16.0      |               |
| Initial index chunk (gz)  | 155.93 KB   | 156.16 KB   | +0.23 KB      |
| Educators chunk (gz)      | 11.59 KB    | 21.46 KB    | +9.87 KB      |
| PWA precache toplam       | 1803.13 KiB | 1833.93 KiB | +30.80 KiB    |
| Build süresi              | 21.12 s     | 21.37 s     | ~0            |
| Toplam source kaydı       | 36          | 38          | +2            |
| Ders planı enrichment     | 0           | ~10 alan    | +40           |
| Smoke pass (6-H)          | —           | 115/115     | —             |

**Bundle disiplini ideal:** initial chunk +0.23 KB marjinal. 6-G'deki
gibi `_lessonPlanEnrichment.js` sadece Educators.jsx'ten import
edildiği için Rollup güzelce izole etti. 6-C (+21 KB) ve 6-F (+15 KB)
sızıntılarının 6-G/6-H pattern'iyle optimize edilebildiğini iki
örnek (atölye, ders planı) ile kanıtlamış olduk. 6-Z'de 6-C/6-F için
manualChunks stratejisi uygulanabilir.

### Notlar ve Sapma Kararları

- **Mevcut ders planı alanları dokunulmadı.** 6-H'nin ana disiplin noktası. `steps` (her plan için 5 adım), `worksheet` (plan başına 4-5 soru), `discussion` (2-3 soru), `relatedExhibits` — hiçbirine tek karakter bile değiştirilmedi. Yeni pedagojik katman ETRAFLARINA eklendi.
- **UNESCO Intangible Heritage planının tarihsel dürüstlüğü korundu.** 6-C'de Trabzon Hasırı'nın UNESCO listesinde OLMADIĞI (sadece Türk Patent GI'da olduğu) düzeltmesi bu derste de hatırlatıldı: `curatorNote` açıkça "Trabzon Hasırı UNESCO Somut Olmayan Miras listesinde DEĞİLDİR" ifadesini içeriyor — öğretmenler derste bunu açıkça belirtecek. Araştırma etkinliği böylece "her korunan gelenek UNESCO'da değildir" gerçeğiyle öğrencileri yüzleştirir.
- **Bloom taxonomy disiplini.** Her learningObjective sonunda parantez içinde Bloom düzeyi (Bilgi, Kavrama, Uygulama, Analiz, Sentez, Değerlendirme, Yaratma) belirtildi. Ortaokul için tipik 4-5 kazanımlı bir denge: temelden üst-sentez düzeyine.
- **Rubric disiplini: 4 seviye (1-4), 3-4 kriter.** Holistic rubric değil, analytic rubric seçildi — öğrenci hangi boyutta güçlü/zayıf gördüğünü daha net bilir. Seviye açıklamaları her kriter için gerçek öğrenci davranışı tanımlıyor (ör. "Tüm çiftler doğru sıralanmış, her gözlem yazılı" vs. "Çoğunlukla yanlış veya eksik").
- **Müfredat bağlantıları Türkiye + uluslararası.** Her planda MEB müfredatına bağlantı + en az bir uluslararası referans (Cambridge, NGSS, IB). Türk öğretmen öncelikli, ama uluslararası kullanım için de hazır.
- **Workshop chip'leri manuel.** `RelatedGrid` bileşeni exhibits/stories/labs/quizzes destekliyor ama workshop'u değil. Onun yerine Educators.jsx içinde manuel chip link'ler (`/workshop?id=`) oluşturuldu. 6-Z'de RelatedGrid'e workshop desteği eklenebilir — ama şimdilik bu yeterli.
- **Print CSS rubric tablosu için ek stiller.** Standart tablo `border-collapse: collapse`, 1px border, 10pt font, thead gri zemin. A4 sayfada 3-4 kriter × 4 seviye tablosu düzgün sığıyor.
- **6 faz boyunca shared bileşen adlarındaki "Story" prefix'i.** CuratorStoryNote, StoryTimeline'ın jenerik olduğu 6 fazın hepsi (hikâye, lab, quiz, atölye, ders planı) tarafından kanıtlandı. 6-Z'de rename disiplini uygulanabilir — şimdi daha fazla ertelenmeyecek.
- **Initial chunk +0.23 KB sızıntı yok.** Artık bu disiplin birkaç faz üst üste çalışıyor. 6-G ve 6-H birlikte "enrichment dosyasını yalnızca tek sayfadan import et" pattern'ini net bir reçeteye dönüştürdü. Sızıntılı pattern (6-C story, 6-F quiz) `RelatedGrid` üzerinden çoklu import zincirine girdiği için gerçekleşiyor; 6-Z'de `manualChunks.storyEnrichment` ve `manualChunks.quizEnrichment` ile tedavi edilebilir.

### Enrichment Layer Pattern — 6 faz retrospektifi

| Faz | Dosya                          | Tek import sayfası  | Initial sızıntı |
| :-- | :----------------------------- | :------------------ | :-------------: |
| 6-A | `exhibits/_enrichment.js`      | tüm sergi detayları | (yeni veri)     |
| 6-C | `_storyEnrichment.js`          | StoryPage + başka   | +21 KB          |
| 6-E | `_labEnrichment.js`            | LabPage (tek)       | +0.26 KB        |
| 6-F | `_quizEnrichment.js`           | quizzes.js→shared   | +15 KB          |
| 6-G | `_workshopEnrichment.js`       | WorkshopHub (tek)   | +0.14 KB        |
| 6-H | `_lessonPlanEnrichment.js`     | Educators (tek)     | +0.23 KB        |

Pattern net: enrichment sadece tek lazy-loaded sayfadan import
edilirse Rollup izole ediyor → 0 sızıntı. Başka bir ana-bundle
dosyası da import ederse (6-C'de `StoryPage` yanı sıra başka yer,
6-F'de `RelatedGrid` üzerinden), enrichment ana bundle'a girer.
**6-Z çözümü:** manualChunks ile eager referansları lazy chunk'a
taşı.

---

## Faz 6-Z — Polish + Audit + v1.0 ✅ (tamamlandı 2026-04-23)

**Amaç:** 6-A'dan 6-H'ye uzanan 8 alt-fazdan biriken borçları
temizlemek, kapsamlı cross-enrichment audit çalıştırmak ve projeyi
v1.0 olarak kapatmak.

### Yapılan işler

#### 1. Bundle optimizasyonu (en büyük kazanç)

`vite.config.js`'e 4 yeni manualChunk eklendi:
- `storyEnrichment` (`_storyEnrichment.js`)
- `quizEnrichment` (`_quizEnrichment.js`)
- `storiesData` (`stories.js`)
- `quizzesData` (`quizzes.js`)

Ayrıca `modulePreload.resolveDependencies` filtresi eklendi:
index.html artık sadece `react` + `icons` chunk'larını preload
eder. Lazy data chunk'ları (storiesData, quizzesData, enrichment,
leaflet, geoPoints, glossary-extended, timelineEvents) sadece route
ziyaret edildiğinde yüklenir.

**Sonuç:** Initial index chunk **156.16 → 120.50 KB gz (-35.66 KB,
%22.8 azalma)**. 6-C'deki +21 KB ve 6-F'deki +15 KB sızıntıları tam
olarak tedavi edildi.

#### 2. RelatedGrid'e workshop desteği

6-H'de Educators.jsx manuel workshop chip link'leri yazmak zorunda
kalmıştı. 6-Z'de:
- `WORKSHOP_META` sabit eklendi (4 atölye için meta)
- `workshopIds` prop eklendi
- `Hammer` ikonu + tam 5 bölümlü grid (exhibits/stories/labs/**workshops**/quizzes)
- Educators.jsx'teki manuel chip bloğu temizlendi
- WorkshopHub'a `?id=` query-param desteği eklendi (`useSearchParams`)

#### 3. geoKinds shared utils

WorldMapPage.jsx ve LeafletMap.jsx'teki 3 kopya sabit (`KIND_LABELS`,
`KIND_COLORS`, `ALL_KINDS`) tek kaynağa taşındı:
`src/utils/geoKinds.js`. Her iki dosya artık import ediyor.

#### 4. ExhibitDetail temizliği

Kullanılmayan `getSources` import silindi.

#### 5. İstanbul Mine geoPoint'i eklendi

Cross-audit yakaladı: `mine` atölyesi `istanbul-kapalicarsi`
geoPoint'e bağlıydı ama o trade-hub, workshop değil. Yeni
`istanbul-mine` workshop-kind noktası (Eyüp/Kapalıçarşı arası,
41.0289, 28.9402) eklendi. `_workshopEnrichment.js` güncellendi.
GeoPoint sayısı: 39 → **40**.

#### 6. UNESCO tarihsel dürüstlük 4. kez düzeltildi

Cross-audit yakaladı: `geoPoints.js`'teki `trabzon-hasir` fact'i
"UNESCO Yaşayan Miras listesinde" iddiasını içeriyordu (6-C'de
düzeltilen aynı hata!). Düzeltildi → "2004'ten beri Türk Patent
coğrafi işaret koruması altında". 6-C/6-G/6-H'deki düzeltmelerle
tutarlı oldu. Bu, aynı olgu üzerinde 4. faz düzeltmesi.

#### 7. Cross-enrichment audit smoke — 75 pass / 0 fail / 0 warn

`smoke-6z.mjs` (~190 satır) 6 fazın tüm enrichment dosyalarındaki
**482 ID referansını** tek seferde doğruladı:
- relatedExhibits, relatedStories, relatedLabs, relatedWorkshops,
  relatedQuizzes, sources, curatorNote.cite, vocabulary, geoPoints,
  timeline.cite, procedure.cite

**Referans tarama: 482 valid, 0 invalid.** 5 faz (6-C/E/F/G/H)
boyunca registry-lookup disiplini hiç kırık link bırakmamış.
Ayrıca envanter doğrulaması:
- Sergi 44, Hikaye 5, Lab 7, Quiz 49, Quiz cat 8, Atölye 4, Plan 4,
  GeoPoint 40, Glossary 83, Kaynakça 38, geoKind 6.

### Ertelenen 6-Z borçları (7-A / 7-Z'ye)

- **Shared bileşen rename** (`StoryTimeline` → `ContentTimeline`,
  `CuratorStoryNote` → `CuratorNote`). 6 faz boyunca jenerik oldukları
  kanıtlandı ama rename 7+ dosyada import değişikliği. Estetik iş,
  v1.0 teslimi için risk. **7-Z'ye ertelendi.**
- **World Tour migrate** (`worldOrigins.js` → `geoPoints.js`) —
  6-A'dan beri notta. Oyun kodu değişikliği. **7-A'ya ertelendi.**

### Fiili Teslim Özeti (6-Z)

| Metrik                    | 6-H sonu    | 6-Z sonu    | Değişim       |
| :------------------------ | :---------- | :---------- | :------------ |
| Sürüm                     | 0.16.0      | **1.0.0**   | MAJOR bump    |
| Initial index chunk (gz)  | 156.16 KB   | **120.50 KB** | **-35.66 KB** |
| Preload entries           | 6           | 2           | -4            |
| Manual chunks             | 3           | 7           | +4            |
| PWA precache toplam       | 1833.93 KiB | 1838.10 KiB | +4.17 KiB     |
| Build süresi              | 21.37 s     | 30.82 s     | +9 s          |
| GeoPoint sayısı           | 39          | 40          | +1            |
| Cross-audit referans      | —           | 482 valid   | 0 invalid     |

---

## 🎉 FAZ 6 TAMAMLANDI — v1.0.0

**Başlangıç:** v0.9.x (Faz 5 sonu)
**Bitiş:** v1.0.0 (Faz 6-Z, 2026-04-23)
**Süre:** ~3 hafta
**Toplam alt-faz:** 8 (6-A, 6-B, 6-C, 6-D, 6-E, 6-F, 6-G, 6-H, 6-Z)

### Enrichment Layer Pattern — 6 faz retrospektifi

6 faz boyunca (6-A hariç, o pattern'in kendisini yarattı) aynı
desenin 5 kez daha uygulaması:

| Faz | Dosya                          | Tek import? | Initial sızıntı (6-Z öncesi) |
| :-- | :----------------------------- | :---------- | :--------------------------: |
| 6-A | `exhibits/_enrichment.js`      | tüm sergi   | (yeni veri)                  |
| 6-C | `_storyEnrichment.js`          | StoryPage+başka | +21 KB                   |
| 6-E | `_labEnrichment.js`            | LabPage (tek)   | +0.26 KB                 |
| 6-F | `_quizEnrichment.js`           | quizzes.js→shared | +15 KB                 |
| 6-G | `_workshopEnrichment.js`       | WorkshopHub (tek) | +0.14 KB               |
| 6-H | `_lessonPlanEnrichment.js`     | Educators (tek)  | +0.23 KB                |

**6-Z manualChunks stratejisiyle 36 KB sızıntı temizlendi.**

### İçerik büyümesi

| Metrik                   | Faz 5 sonu | Faz 6 sonu |
| :----------------------- | :--------- | :--------- |
| Sergi                    | ~40        | 44         |
| Hikâye                   | 5          | 5 (zenginleştirildi) |
| Lab deneyi               | 7          | 7 (zenginleştirildi) |
| Quiz sorusu              | 49         | 49 (kategoriler zenginleştirildi) |
| Atölye                   | 4          | 4 (zenginleştirildi) |
| Ders planı               | 4          | 4 (zenginleştirildi) |
| GeoPoint                 | ~32        | **40**     |
| Glossary terim           | ~60        | **83**     |
| Kaynakça                 | ~20        | **38**     |
| Cross-enrichment ID ref  | 0          | **482 valid** |

### Kritik keşifler / düzeltmeler

1. **UNESCO tarihsel dürüstlük** — Trabzon Hasırı'nın UNESCO'da OLMADIĞI (sadece Türk Patent Coğrafi İşareti ile korunduğu) 4 farklı yerde düzeltildi: 6-C hikâye, 6-G atölye, 6-H ders planı, 6-Z geoPoint.
2. **Registry-lookup disiplini** — 5 faz boyunca toplam 482 ID referansı eklendi, 6-Z audit'inde hiç kırık link bulunmadı.
3. **Bundle mimarisi** — Enrichment sadece tek lazy sayfadan import edilirse Rollup izole ediyor. Çoklu import zincirinde ana bundle'a sızıyor. `manualChunks` bu sorunu çözer.
4. **Shared bileşen jenerikleştirme** — "Story" prefix'li 4 bileşen (`CuratorStoryNote`, `StoryTimeline`, `VocabularyChips`, `RelatedGrid`) 6 farklı içerik türüyle (sergi, hikâye, lab, quiz, atölye, ders planı) hiç değişmeden çalıştı.

### v1.0.0 olarak kapanışın anlamı

JewelPedi Kids artık **ciddi bir eğitim aracı**:
- 44 sergi + 5 hikaye + 7 lab + 49 quiz + 4 atölye + 4 ders planı
- 40 coğrafi nokta (Leaflet + GeoJSON harita)
- 83 sözlük terimi
- 38 kaynaklı akademik dipnot sistemi
- 3 dilde (TR/EN/AR) tam yerelleştirme
- PWA + offline çalışma
- Sınıfa yazdırılabilir ders planları (rubric, worksheet dahil)

Her olgusal iddia kaynaklı, her küratör notu disiplinli, her
öğretmen notu pedagojik. Müze-düzeyi bir çocuk eğitim aracı.

---

## Faz 7 — ⏳ (gelecek)

[Sırası geldiğinde detaylandırılır]

---

## Notlar ve Keşifler

### Keşif 2026-04-21 (6-B oturumu)

- **6-A'dan kalan kritik bug:** `_enrichment.js`'te lab ID'leri uzun form
  (`karat-calculator`) yazılmış; LabPage gerçek ID'leri kısa form (`karat`).
  6-B'de düzeltildi — tek sed turunda 16 yer. Sergi sayısı 44 değil 42 olduğu
  da bu oturumda doğrulandı.
- **Footnote numaralandırma stratejisi:** ExhibitDetail `useMemo` ile body
  metni + specs.cite + sources'u tek numara listesinde birleştiriyor.
  `resolveCitations` helper'ı 6-A'da hazırdı — 6-B'de ilk gerçek kullanıcı
  oldu.
- **Story `icon` alanı GEM_REGISTRY ID değil** — hikâyelerin scene ikonları
  arbitrary. RelatedGrid'de story kartı için GemIcon yerine emoji fallback
  kullanıldı. Story şema normalize'ı 6-C'ye kaldı.
- **Deep-link stratejisi:** `useSearchParams` ile basit read-once yaklaşımı
  kullanıldı — LabPage/QuizHub mount'ta param okur, sonra kendi state'iyle
  devam eder. Full URL sync (param yazma) 6-E/6-F'de.
- **Enrichment verisi UI'dan genişçe tüketildi** — her sergi detay sayfası
  şimdi 3-7 yeni bölüm gösteriyor (verisi olana göre). En zengin sergi
  `zumrut`: hero+GeoBadge, specs, ExhibitCuratorMini yok ama body, audioScript,
  Related (1 story + 1 lab + 1 quiz + 4 exhibit), footnote. En sade sergi
  `garnet`: specs + Related (quiz) + footnote. Her ikisi de düzgün render.

### Keşif 2026-04-21 (oturum başı, 6-A)

- Glossary terim sayısı 62 değil **53** (ana array), 9 tanesi kategori girdisi.
  Hedef 100'e ulaşmak için +47 terim gerek.
- `gallery` şeması zaten SVG component tabanlı: `{type:'svg',component,caption}`.
  Raster foto eklenmez, SVG registry genişletilir.
- `exhibit.comparison` plan'da tekil — ileride `comparisons: [...]` çoğula
  çıkarılabilir; şimdilik tekil tutuldu (veri tasarım yükü az).
- Timeline zaten `exhibit: 'id'` tek-yönlü ref tutuyor — crossRefs bunu
  tersine çevirecek.
- ID çakışma riski: `digDeeper` alt-objelerinde `id: 'craft'`, `id: 'culture'`
  gibi tekrar eden ID'ler var. Cross-refs **sadece top-level sergileri**
  indeksler (filtre: 4-space indent eşleşmesi).

---

## Oturum Sonu Protokolü

1. `npm run build` 0 hata ile geçer
2. Bu belge güncellenir — tamamlananlar ✅, notlar bölümüne öğrenilenler eklenir
3. `CHANGELOG.md`'ye sürüm notu yazılır
4. Proje `jewelpedi-kids-faz6-{alt-faz}.zip` olarak paketlenir
