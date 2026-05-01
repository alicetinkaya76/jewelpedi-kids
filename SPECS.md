# 📐 SPECS — Tasarım, İçerik ve İnteraktif Araç Şartnameleri

Bu dosya, `PLAN.md`'deki fazlarda yapılacak işlerin **kalite eşiğini**
ve **teknik detaylarını** tanımlar. Her faz bu spec'e bakarak çalışır.

---

## BÖLÜM A — TASARIM SİSTEMİ

### A.1 Felsefe

**"Museum meets hands-on science center"** — elle tutulabilir, oynanabilir,
atmosferik. Generic Tailwind boardroom estetiği değil; gerçek bir müze
vitrini hissi.

İki farklı mod bir arada yaşar:
- **Cream Gallery** (default) — sıcak, aydınlık, davetkâr. Çocuklar için.
- **Dark Gallery** — koyu, spot ışıklı, her sergiye özel lighting. Gençler
  ve yetişkinler için daha drama.

Kullanıcı Settings'ten geçer.

### A.2 Renk Tokenları (Genişletilmiş)

Mevcut `tailwind.config.js`'deki tokenlar korunur, üzerine eklenir:

```js
// Core (mevcut)
ink:      '#1b2845'   // JewelPedi navy
cream:    '#fff8ec'   // sayfa zemin
parchment:'#fdf3dd'   // kart zemin
// Hall accents — değişmez
gold:     { DEFAULT: '#d4a017', soft: '#fdebd0' }
silver:   { DEFAULT: '#7f8c8d', soft: '#eaecee' }
diamond:  { DEFAULT: '#5dade2', soft: '#d6eaf8' }
gem:      { DEFAULT: '#27ae60', soft: '#d5f5e3' }
platinum: { DEFAULT: '#aab7b8', soft: '#f2f4f4' }
jewel:    { DEFAULT: '#8e44ad', soft: '#e8daef' }
craft:    { DEFAULT: '#e67e22', soft: '#fef5e7' }

// Dark Gallery ekleri (Faz 1)
dark: {
  bg:       '#0b0f1a',   // çok koyu mavi-siyah, dramatic
  surface:  '#141b2d',   // kart/vitrin zemin
  edge:     '#2a3451',   // sınır çizgileri
  text:     '#e8ecf5',   // ana metin
  mute:     '#8893b3',   // ikincil metin
}

// Atmospheric efektler için ek
warm-glow: 'radial-gradient(ellipse, #f7c94840 0%, transparent 60%)'
cool-spot: 'radial-gradient(ellipse, #5dade260 0%, transparent 60%)'
```

### A.3 Tipografi Sistemi

**Font aileleri (mevcut):**
- `font-display`: Baloo 2 (başlıklar, sayılar, vurgular)
- `font-body`: Nunito (gövde metni, paragraflar)

**Yeni tipografi muameleleri (Faz 1):**

- `.text-engraved` — koyu arka planda altın metin, hafif iç gölge
  ("engraved" kabartma) efekti. Hero başlıklarında kullan.
- `.text-label-plate` — retro museum etiketi. All caps, letter-spacing
  0.2em, küçük font. "EXHIBIT Nº 042" gibi.
- `.text-stat-number` — büyük sayılar için. Display font, 4xl-6xl,
  font-extrabold, tabular-nums.
- `.text-curator` — küratör notu. Italic, serif feel (Nunito italic),
  soft ink color.

### A.4 Museum Component Kütüphanesi (Faz 1 hedefi)

Aşağıdakiler `src/components/museum/` altında:

#### A.4.1 `<DisplayCase>`
Bir sergi vitrini. Her exhibit kartının yeni sarmalı.

**Görsel özellikler:**
- Üst: küçük "plaka" (exhibit numarası)
- Orta: içerik alanı, hafif top shadow ile "içi görünüyor" illüzyonu
- Alt: `<LabelPlate>` (başlık + bir cümle özet)
- Hover: spot ışığı üstten iner, content 2px kalkar
- Dark mode: koyu cam, spot ışığı daha belirgin

**Props:**
```jsx
<DisplayCase
  number={42}
  emphasis="gold"    // hall id → tema rengi
  spotlight          // hover'da spot effect
  interactive        // cursor pointer + keyboard focus ring
>
  <GemIcon id="emerald" size={64} />
</DisplayCase>
```

#### A.4.2 `<LabelPlate>`
Retro metal etiket. Sergi başlığı + kısa açıklama.

**Görsel:**
- Metal dokulu background (CSS gradient + subtle noise)
- 2 satır metin: üst (büyük, display font, hall rengi), alt (küçük, gri)
- Çerçeve: 1px inset shadow + 1px light top

#### A.4.3 `<WaxSeal>`
Küratör notunun üstüne veya özel vurgulara kırmızı mum mührü.

**Görsel:**
- Gerçek wax seal görüntüsü (CSS ile veya SVG). Çepersel doku.
- İçine harf yazılabilir (örn. "C" — curator, "M" — master).
- Hover'da hafif bobblehead animasyonu.

#### A.4.4 `<SpotLight>`
Dark mode'da exhibit'in üstüne "spot ışığı" yansıtan atmosferik efekt.

**Teknik:**
- `radial-gradient` + `mix-blend-mode: soft-light` veya `screen`.
- Animasyon: çok yavaş ve minimal flicker (candle-like).

#### A.4.5 `<GemIcon>`
Her taş/metal için custom SVG ikon wrapper'ı.

**Kullanım:**
```jsx
<GemIcon id="diamond" size={64} animate cut="brilliant" />
<GemIcon id="gold-bar" size={48} />
<GemIcon id="pearl" size={32} shimmer />
```

Destek listesi (Faz 1 içinde):
- Gems: diamond, ruby, sapphire, emerald, turquoise, amethyst, opal,
  aquamarine, topaz, pearl, peridot, garnet
- Metals: gold-bar, gold-coin, silver-coin, platinum-nugget
- Craft marks: filigree-wire, niello-pattern, hasir-weave

Her ikon:
- Pure SVG (React component olarak)
- `currentColor` destekli (tema uyumu)
- 24x24 viewBox, scalable
- Optional `animate` prop → shimmer/rotate/glimmer

### A.5 Motion Language

**Prensipler:**
- "Fiziksel" hissettir. Bir nesne kaldırıyormuşsun gibi.
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — spring hissi (mevcut).
- `cubic-bezier(0.16, 1, 0.3, 1)` — smooth decelerate.
- Ses-video sync'i gibi düşün: motion + ses birlikte, senkronize.

**Standart animasyonlar:**
- `animate-fadeUp` (mevcut) — 8px aşağıdan yukarı, 500ms.
- `animate-popIn` (mevcut) — scale 0.8 → 1.05 → 1, 500ms.
- Yeni: `animate-revealGem` — scale + rotate + glow, 800ms.
- Yeni: `animate-curtainUp` — hero için curtain reveal efekti.

**Tetikleyiciler:**
- İlk mount: staggered fadeUp (50ms delay per item).
- Interaction: hover → spring up, click → bounce press, release → settle.
- Scroll: IntersectionObserver ile viewport girince reveal.

**Reduced motion:** tüm bunlar otomatik kapanır (mevcut `prefers-reduced-motion`
medya sorgusu var; yeni animasyonlar da onun içinde kalsın).

### A.6 Spacing ve Layout Sistemi

**Container:**
- Max genişlik: 7xl (1280px). Lobby/Exhibit için 5xl (1024px).
- Yatay padding: px-4 mobile, px-6 sm, px-8 lg.

**Kart içi spacing:**
- Başlık altında: mb-3 (küçük) veya mb-5 (büyük).
- İçerik bloklar arası: gap-6.
- Sergi detay sayfasında section'lar arası: my-8.

**Grid:**
- Exhibits grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4.
- Hall cards: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3.

### A.7 Ses (Faz 1 scaffold, Faz 4 implementation)

**`<SoundProvider>` + `useSound()` hook:**

```jsx
const { play, muted, toggleMute } = useSound();
play('chime');        // küçük tıklama/başarı sesi
play('open-case');    // display case açıldığında
play('page-turn');    // sayfa geçişinde
```

**Default:** muted. Kullanıcı header'daki ikon ile açar.

**Teknik:** Web Audio API, inline base64 veya küçük `.mp3`'ler. Ses dosyaları
`public/sounds/` altında.

---

## BÖLÜM B — İÇERİK STANDARTLARI

### B.1 Ses ve Ton

- **Basit ama saygılı.** Çocuk duyunca anlasın, yetişkin okuyunca da
  küçümsendiğini hissetmesin.
- **Spesifik.** "Çok eski" yerine "5000 yıl önce". "Çok ağır" yerine
  "21.4 g/cm³". "Güzel renkli" yerine "krom atomlarının verdiği yeşil".
- **Meraklı.** Her paragraf bir sorunun cevabı gibi okunsun. Öğretmek için
  değil, merak uyandırmak için yazıyoruz.
- **Kültürel olarak kök salmış.** Türkçe versiyon Türk zanaatına hak verir,
  İngilizce uluslararası hitap eder, Arapça Ortadoğu'nun yerel gerçeklerini
  hesaba katar (örn. Arap düğünlerinde altın rolü).

### B.2 Exhibit Yapısı (Faz 2 Genişlemesi)

Mevcut (sığ):
```js
{ id, name, intro, body, funFact, stats, related }
```

Yeni (derin):
```js
{
  id, cat, emoji, accent,
  name: { tr, en, ar },
  intro: { tr, en, ar },        // 1-2 cümle
  body: { tr, en, ar },         // 3-5 cümle, ana paragraf
  funFact: { tr, en, ar },      // şaşırtıcı gerçek
  stats: {},                    // anahtar-değer
  related: [],                  // cross-link id'ler

  // YENİ
  gallery: [                    // illüstrasyon referansları
    { type: 'svg', component: 'EmeraldCrystal', caption: {...} },
    { type: 'photo', src: '/photos/...', caption: {...} },  // telif temiz
  ],
  timeline: [                   // opsiyonel mini-timeline
    { year: '-4000', event: {...} },
    { year: '600', event: {...} },
  ],
  digDeeper: [                  // expandable alt başlıklar
    {
      id: 'chemistry',
      title: { tr: 'Kimya', en: 'Chemistry', ar: '...' },
      body: { tr, en, ar }       // 2-3 paragraf derin içerik
    },
    {
      id: 'history',
      title: { tr: 'Tarih', en: 'History', ar: '...' },
      body: {...}
    },
    // vb.
  ],
  scienceBox: {                 // opsiyonel kimya/fizik kutusu
    formula: 'Al₂O₃',
    crystalSystem: 'Trigonal',
    refractiveIndex: '1.762-1.770',
    cleavage: 'None',
    notes: { tr, en, ar }
  },
  storyThread: 'kleopatra-zumrut'  // varsa hangi anlatıya bağlı
}
```

### B.3 Story Thread Yapısı

Her anlatı 5-8 "sahne" (sayfa). Her sahne:

```js
{
  id: 'kleopatra-scene-3',
  title: { tr, en, ar },
  prose: { tr, en, ar },       // 200-400 kelime anlatı
  illustration: 'SVGComponent',
  takeaway: { tr, en, ar },    // "Bu sahnede öğrendiğin"
  linkedExhibits: [ids],       // "bu sahnede geçen" sergi linkleri
}
```

Anlatılar kurgusal bir çerçeve kullanır ama temel olgular doğrudur.
Örnek: Kleopatra gerçekten zümrüt madenlerine sahipti, ama bu hikâyedeki
Mısırlı mücevher ustası kurgusaldır.

### B.4 Yaş Kalibrasyonu

- 7-9 yaş: basit cümleler, görsel ağırlıklı, fun fact'ler ön planda.
- 10-12 yaş: body paragraflar, kimya bağlantıları, tarihsel bağlam.
- 13+ yaş: digDeeper içeriği, scienceBox detayları, nüanslı tartışma
  (örn. etik madencilik).

UI her üçüne de hitap etsin: yüzeyde 7-9, orta katmanda 10-12, derinde 13+.

### B.5 Çoklu Dil Kalitesi

- **TR:** Ana dil, en özenli. Terimler standart Türkçe kuyumculuk
  dili ile. Yabancı kelime kullanım: zorunluysa italik (ör. "jardin").
- **EN:** İngilizce orijinal ya da iyi çeviri. Türkçe-İngilizce idiom
  aktarımı dikkatli.
- **AR:** Modern Standard Arabic. Kısaltılmış bile olsa doğru. RTL
  uyumluluğu (CSS zaten halleder ama metin yönü kontrol).

### B.6 Görsel Referanslar

- **Fotoğraf:** Sadece telif sorunsuz kaynaklar — Wikimedia Commons
  (Creative Commons), Unsplash (CC0), Museum açık koleksiyonları
  (Met, Rijksmuseum, V&A). Her fotoğraf kaynak ve lisans ile işaretli.
- **Öncelik:** Custom SVG çizimler. "Zümrüt kristali" bir SVG component
  olarak çizilir, fotoğraf kullanılmaz.

### B.7 Gerçekçilik Kontrol Listesi

Her sergi/quiz/sözlük maddesi için:
- [ ] Bahsedilen yıllar tarihsel olarak doğru mu?
- [ ] Sertlik/yoğunluk/erime gibi rakamlar doğru mu?
- [ ] Kimyasal formül doğru mu?
- [ ] Kültürel referans doğru mu (örn. "Çeyrek altının gramı 1.75")?
- [ ] Coğrafi referans doğru mu (örn. "Mardin'de telkâri")?

---

## BÖLÜM C — İNTERAKTİF ARAÇ SPEC'LERİ (Faz 3)

### Prensipler

- **Her araç bir konsepti öğretir.** Pasif slider değil.
- **Matematiksel/fiziksel olarak doğru.** Yaklaşık değil — hesapla.
- **Hatırlanabilir.** Kullanıcı bir hafta sonra bile ne yaptığını
  hatırlayabilsin.
- **10 dakika +.** Bir kere başladığında tutmalı.

### C.1 🔮 3D Gem Viewer (Three.js)

**Dosya:** `src/components/lab/ThreeDGemViewer.jsx`
**Deps:** `three` (≥0.160), `@react-three/fiber`, `@react-three/drei`.
**Dosya boyutu:** ≤ 300 KB gzipped (lazy loaded).

**Kullanıcı akışı:**
1. Sol panelden taş seç (brilliant diamond, princess diamond, emerald cut
   emerald, oval sapphire, cabochon turquoise, etc.).
2. Mouse/touch ile döndür. Pinch zoom.
3. Alt kontroller:
   - Işık kaynağı yön slider'ı (iki eksen)
   - Işık rengi (beyaz, sarı, mavi — bazı taşlarda renk değişim göstergesi)
   - Wireframe / solid toggle
   - Facet highlight toggle (her yüzey farklı renk)
4. Sağ panelde o an seçili taşın özellikleri canlı güncellenir:
   kırılma indisi (refractive index), dispersion, gösterilen yüzey sayısı.

**Teknik notlar:**
- Taş meshleri: `BufferGeometry` ile kod-üretim, dosya yükleme yok.
- `ShaderMaterial` ile basit iç-yansıma şaderi.
- Mobilde performans: devicePixelRatio cap, 30fps yeterli.

### C.2 ⚛️ Crystal Lattice Explorer (Three.js)

**Dosya:** `src/components/lab/CrystalLattice.jsx`

**3 kristal yapısı:**
1. **Cubic (Elmas)** — her karbon atomu 4 diğer atomla tetrahedral bağ.
2. **Trigonal (Korund — Yakut/Safir)** — Al + O atomları.
3. **Hexagonal (Beril — Zümrüt)** — Be + Al + Si + O atomları.

**Kullanıcı akışı:**
- Atomları ve bağları döndür.
- Bir atom üstüne gel → tooltip ile element adı, iyonik yük.
- "Büyüt" butonu → yapı genişler, daha fazla birim hücre görünür.
- Yapı seçimi ile birlikte sertlik değeri açıklanır: "Kafes atomları
  böyle yoğun bağlandığı için 9 Mohs sertliğinde."

### C.3 💍 Ring Designer (Three.js)

**Dosya:** `src/components/lab/RingDesigner.jsx`

**UI:**
- Sol: seçim panelleri (metal, taş, kesim, boyut, setting).
- Orta: 3D render (döndürülür).
- Sağ: özellikler + tahmini fiyat (statik tabloyla hesaplanır).

**Fiyat hesabı (statik, Faz 3):**
```
metal gramı × metal gramı ₺ fiyatı + taş büyüklüğüne göre taş bazlı ₺
```
Fiyatlar `src/data/priceTable.js` içinde statik. Gerçek API sonraki
fazda.

**Kayıt:** Kullanıcı "tasarımımı kaydet" der, localStorage YOK çünkü
spec bu, ama session'da sergilemek için state'te tutulur. Screenshot
paylaşım.

### C.4 ✨ Ray-Traced Pırlanta Simülatörü (Canvas 2D)

**Dosya:** `src/components/lab/RayTracer.jsx`

**Nasıl çalışır:**
- 2D cross-section bir pırlanta kesiti çizilir.
- Üstten gelen ışın, kesim açısına göre içeri girer, yüzey'lerde
  matematiksel olarak yansır/kırılır (Snell's law).
- Kullanıcı pavilyon açısını (pavilion angle) ve taç açısını (crown angle)
  derece olarak değiştirebilir.
- Sonuç: kaç ışın üstten çıkar (parlaklık), kaçı alttan kaçar (ışık kaybı).

**Matematik:**
- Snell yasası: n₁sinθ₁ = n₂sinθ₂ (pırlanta n = 2.42).
- Total internal reflection kritik açı ≈ 24.4°.
- Kullanıcı açıyı 40° altına düşürdüğünde ışığın kaçtığını görmeli.

**"Ideal cut" preset:** Tolkowsky değerleri (pavilion 40.75°, crown 34.5°)
— maximum brilliance referansı.

### C.5 🔍 Gem Detective Mystery (Tam anlatılı mini RPG)

**Dosya:** `src/pages/DetectiveGame.jsx`, `src/data/mysteries.js`

**Hikâye:**
"Kapalıçarşı'daki ünlü kuyumcu Akay Usta, atölyesinde değerli bir
zümrüt kaybolduğunu söylüyor. Bir haftalık bir soruşturma seni çarşının
dört bir yanına götürecek..."

**5 bölüm, her bölümde:**
- Yeni bir sahne/mekan (SVG illüstrasyon).
- 2-3 şüpheli / obje ile etkileşim.
- En az 1 gerçek/sahte taş ayırt etme (Mohs, renk, büyüteç altında
  inklüzyonlar, vb.).
- İlerlemek için doğru ipucunu bulmak şart.

**Sonuç:** Hikâyenin tüm bölümleri tamamlandığında özel rozet
("Gemolog Detektifi") ve paylaşılabilir final sahne.

### C.6 ⏳ Historical Time Machine (Canvas + Scroll)

**Dosya:** `src/pages/Timeline.jsx`

**Görsel:**
- Dikey veya yatay bir "şerit". Üzerinde 50+ nokta.
- Kullanıcı scroll/drag ettikçe, o dönemin mücevheri büyür ve detayları
  açılır (Sumerian, Egyptian, Minoan, Byzantine, Ottoman, Modern).
- Her dönem kart: tipik taş, tipik teknik, kısa anekdot, ilgili sergi
  linki.

**Tech:** GSAP yerine native Intersection Observer + requestAnimationFrame.
Libraryless.

### C.7 🌍 Trade Routes Animated Map (SVG + SMIL)

**Dosya:** `src/pages/TradeRoutes.jsx`

- Dünya haritası (mevcut worldMap.js'den zenginleştirilir).
- 5 rota: İpek Yolu (Çin → Roma), Hint Okyanusu Baharat, Atlantik,
  Saharan Altın, Kehribar Rotası.
- Rota seçilince küçük bir "caravan" ikonu animasyonla rotada ilerler.
- Rota kartında: ne taşınıyordu, kaçıncı yüzyılda, hangi şehirler.

### C.8 🔥 Melting Pot Simulator

**Dosya:** `src/components/lab/MeltingPot.jsx`

**UI:**
- Sol: metal stoğu (altın, gümüş, bakır, çinko, paladyum, platin, kurşun).
- Orta: bir pota animasyonu.
- Sağ: slider (sıcaklık) + drop zone (pota).

**Kullanıcı akışı:**
- Metal parçalarını pota'ya sürükle.
- Sıcaklığı yükselt.
- Her metal kendi erime noktasında erir (grafiksel: animasyonlu damla).
- Karıştır. Sonuç: "14 ayar sarı altın alaşımı: %58.3 altın, %29 gümüş,
  %12.7 bakır. Renk: sarı. Sertlik: 3.5 Mohs. Erime: 880°C."

### C.9 🛠️ Virtual Atelier — Telkâri Yüzük

**Dosya:** `src/components/lab/VirtualAtelier.jsx`

**10 adım, her adımda kullanıcı bir şey yapıyor:**
1. Doğru aleti seç (cımbız, pense, lehimci...).
2. Gümüş çubuğu doğru kalınlığa çek (slider).
3. Teli kes, halkalar oluştur (tıklama ritmi).
4. Halkaları sıralı yerleştir (drag/drop).
5. Desen oluştur (telkâri çiçeği).
6. Lehim noktalarını belirle (tıklama).
7. Doğru sıcaklıkta ısıt (sıcaklık dozaj oyunu).
8. Asit banyosu.
9. Cilalama.
10. Son sergileme.

Her adımda doğru/yanlış geri bildirim. Yanlış yaparsan tekrar edebilirsin.
Tamamlayınca rozet.

### C.10 ⚖️ Karat Balance Puzzle

**Dosya:** `src/components/lab/KaratBalance.jsx`

**UI:** Fiziksel terazi görseli. Sol kefe: hedef ayar gösterimi.
Sağ kefe: boş. Kullanıcı saf altın ve alaşım parçalarını sağa bırakır.

**Hedef:** "18 ayar 10 gram yap"
**Çözüm:** 7.5g saf altın + 2.5g alaşım.

**Matematik:** Terazi denge olduğunda doğru.
**Zorluk seviyeleri:** 14K, 18K, 22K, özel ayarlar.

---

## BÖLÜM D — ERİŞİLEBİLİRLİK (Faz 5)

### D.1 Klavye Navigasyonu

- Tab sırası: header → main → footer.
- Her interaktif: focus ring (mevcut `*:focus-visible`).
- Modallarda focus trap.
- Keyboard shortcuts: `?` → shortcuts menu, `g h` → halls, `g l` → lab.

### D.2 Ekran Okuyucu

- `<main>`, `<nav>`, `<aside>`, `<article>`, `<section>` doğru kullanım.
- Her interaktif için `aria-label` veya `<label>`.
- Canvas/3D sahneler için `role="img" aria-label="..."` veya metin açıklaması.
- Live region: quiz cevap sonuçları, lab değişiklikleri.

### D.3 Animasyon Kontrolleri

Settings panel'den:
- Reduced motion (mevcut CSS ile birlikte)
- Ses kapat
- Yüksek kontrast modu
- Font büyüt (+1 sm tek adım)

### D.4 Renk Kontrastı

- Ana metin: ≥ 7:1 (WCAG AAA).
- İkincil metin: ≥ 4.5:1.
- İnteraktif öğeler: ≥ 4.5:1.

### D.5 Canvas / 3D Alternatifler

Her canvas/3D aracın yanında "Metin ile açıkla" butonu — o anki state'i
düz metin olarak listeler. Ekran okuyucu kullananlar için.

---

## BÖLÜM E — PERFORMANS (Faz 5)

### E.1 Code Splitting

Mevcut warning'i çözer. `React.lazy()` ile:
- Three.js kullanan araçlar tek bir chunk.
- Detective game tek chunk.
- Timeline tek chunk.
- Ana sayfa (lobby) her zaman loaded.

### E.2 Image Optimization

- SVG'leri SVGO ile optimize.
- Fotoğraf varsa WebP + avif fallback.
- `loading="lazy"` default.

### E.3 PWA

- `vite-plugin-pwa` eklemeyi değerlendir, veya manuel service worker.
- Manifest: ikon seti, theme color, display standalone.
- Offline: static content her zaman erişilebilir.

### E.4 Lighthouse Hedefi

- Performance: ≥ 90
- Accessibility: 100
- Best Practices: 100
- SEO: ≥ 95
- PWA: green

---

## BÖLÜM F — TEST ETME (Her Faz)

Her oturumun sonunda:

1. `npm install` temiz.
2. `npm run build` sıfır hata.
3. `npm run preview` ile manuel smoke test:
   - Ana sayfa yükleniyor.
   - 3 salon, 3 sergi ziyaret.
   - 1 lab aracı çalıştır.
   - 1 quiz oyna.
   - Dil değiştir, RTL doğru çalışıyor.
   - Mobile viewport (375px) sorun yok.
4. `CHANGELOG.md` güncelle.

---

## BÖLÜM G — SÜRDÜRÜLEBİLİRLİK

- Kod yorumları Türkçe veya İngilizce, tutarlı.
- Yeni bileşen jsdoc ile `@param` tipleri (şimdilik TypeScript yok).
- Data dosyalarında yorum ile kaynak not düşüldü: örn.
  `// Kaynak: USGS 2023 rapor`.
- Görsel asset eklendiğinde `public/credits.txt` güncellenir.

---

## ÖRNEK: "BEFORE vs AFTER" İÇERİK KARŞILAŞTIRMASI

### ❌ Before (mevcut, yüzeysel)

```js
{
  id: 'zumrut',
  intro: { tr: 'Yeşilin kraliçesi — Kleopatra\'nın favori taşı.' },
  body: { tr: 'Zümrüt, "beril" adı verilen mineral ailesinden gelir...' },
  funFact: { tr: 'Hemen hemen her zümrütün içinde çatlaklar vardır...' },
}
```

### ✅ After (Faz 2 sonrası, derin)

```js
{
  id: 'zumrut',
  intro: {...},
  body: {...},  // genişler, 3-5 cümle
  funFact: {...},
  gallery: [
    { type: 'svg', component: 'EmeraldCrystalRaw', caption: {...} },
    { type: 'svg', component: 'EmeraldHexagonalStructure', caption: {...} },
    { type: 'photo', src: '/photos/muzo-mine.jpg',
      credit: 'Wikimedia, CC BY-SA', caption: {...} },
  ],
  timeline: [
    { year: '-1500', event: {tr: 'Mısır madenlerinde zümrüt çıkarılıyor'} },
    { year: '-30', event: {tr: 'Kleopatra\'nın özel madenleri'} },
    { year: '1558', event: {tr: 'İspanyol fatihleri Muzo\'yu keşfeder'} },
    { year: '1910', event: {tr: 'Kolombiya dünya üretiminin %50\'si'} },
  ],
  digDeeper: [
    {
      id: 'chemistry',
      title: { tr: 'Kimyanın İçine' },
      body: { tr: 'Beril ailesi Be₃Al₂Si₆O₁₈ formülüne sahip. Zümrütün
        yeşilini veren şey ise içine "safsızlık" olarak giren krom (Cr³⁺)
        ve vanadyum (V³⁺) iyonlarıdır. Saf beril renksizdir (goshenite);
        krom eklenince zümrüt, demir eklenince akuamarin, manganez
        eklenince morganit oluşur. Aynı mineral ailesi, farklı
        safsızlıklar, farklı renkler...' }
    },
    {
      id: 'kesim',
      title: { tr: 'Neden "Zümrüt Kesimi"?' },
      body: { tr: 'Zümrüt kesimi (emerald cut) o kadar zümrüt ile
        özdeşleşmiş ki ismi ondan gelir. Dikdörtgen basamaklı kesim,
        zümrütün kırılgan yapısından doğdu: köşelerde gerilimi azaltır,
        içindeki jardinleri belirgin kılmadan sergiler. Modern kesim
        19. yüzyılda standartlaştı...' }
    },
    {
      id: 'etik',
      title: { tr: 'Zümrüt ve Etik' },
      body: { tr: 'Kolombiya\'da zümrüt madenciliği tarih boyunca
        tartışmalıdır: küçük ölçekli madenciler (guaqueros) ve büyük
        şirketler arasında gerilim, çevresel etki, çalışma koşulları...
        Bugün "Muzo Responsibly Sourced" gibi sertifikasyon programları
        durumu iyileştirmeye çalışıyor.' }
    },
  ],
  scienceBox: {
    formula: 'Be₃Al₂Si₆O₁₈',
    crystalSystem: 'Hexagonal',
    hardness: '7.5-8',
    refractiveIndex: '1.576-1.582',
    density: '2.76 g/cm³',
    cleavage: 'İndistinct',
    notes: { tr: 'Çoğu zümrüt ısıl işlemle veya yağ dolgusu ile
      muamele görür. Bu işlemler standarttır ve değerini çok düşürmez.' }
  },
  storyThread: 'kleopatra-zumrut',
  related: ['yakut', 'safir', 'mohs-skalasi', 'kolombiya'],
}
```

Ayrıca UI tarafında:
- `<DisplayCase>` içinde custom `<EmeraldIcon>` animasyonlu.
- Dark mode'da spot ışığı ile atmosferik.
- Expandable "Daha fazla öğren" panelleri.
- Alt panelde "Bu serginin yer aldığı hikâye: Kleopatra'nın Zümrüdü →"
  button'u.
- Sağ sidebar'da mini timeline görseli.
