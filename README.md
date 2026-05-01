# 💎 JewelPedi Kids

**Online Mücevher Bilim Merkezi** — çocuklar için sanal, açık kaynaklı bir
müze. Altın, gümüş, pırlanta, renkli taşlar, platin, takı ve Türk
kuyumculuk zanaatını **44 sergi**, **5 hikâye**, **70+ tarihi olay**, **7
interaktif laboratuvar deneyi**, **4 atölye**, **4 ders planı**, **49 quiz
sorusu** ve **62 terimli sözlük** üzerinden keşfeden açık kaynak eğitim
platformu.

> [kids.jewelpedi.com](https://kids.jewelpedi.com) için tasarlandı.
> **7–14 yaş** aralığı hedefli. Türkçe / İngilizce / Arapça (RTL) tam dil
> desteği.

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![React 18](https://img.shields.io/badge/React-18.3-blue.svg)
![Vite 5](https://img.shields.io/badge/Vite-5-purple.svg)
![PWA](https://img.shields.io/badge/PWA-ready-f7c948.svg)

---

## 🏛️ Ne içeriyor?

**Sergi Salonları (7)** — Altın · Gümüş · Pırlanta · Renkli Taşlar · Platin
· Takı · Türk Zanaatı. 44 derinlemesine sergi her biri intro + body +
science box (mineraller için) + timeline + dig-deeper bölümleri ile.

**Hikâyeler (5 × 5 sahne)** — Kleopatra'nın Zümrüdü · Pırlantanın 3
Milyar Yılı · Altın Külçesinin Yolculuğu · Trabzon Hasırı'nın UNESCO Yolu
· Mardinli Telkâri Ustası Ayşe Hanım. Her biri ~900-1000 kelime çocuk
dostu trilingual anlatı.

**Zaman Çizgisi (70+ olay)** — -4000 BCE Varna altın takılarından 2024'e
kadar 6000 yıllık tarih. Yatay kaydırılabilir, 6 kategori renk-kodlu
(madencilik, metalurji, gemoloji, zanaat, kültür, keşif).

**İnteraktif Laboratuvar (7 deney)**
- **Pırlanta Kesim Simülatörü** — Table/Crown/Pavilion/Depth slider'ları,
  gerçek TIR ray tracing, Tolkowsky ideal snap, 0-100 brilliance skoru.
- **Mohs Çizim Laboratuvarı** — 17 malzemeli palette, animasyonlu çizik
  render, 10 seviyeli merdiven + rozet.
- **Lidya Sikke Darphanesi** — 4 aşamalı flow: külçeler → pota → mühür
  → sikke + tarihsel hüküm.
- Ayar Hesaplayıcı · Gümüş Oksitlenme · Metal Ergime Sıcaklıkları ·
  Taş Tanıma Oyunu.

**Atölyeler (4)** — Trabzon Hasırı (8 adım) · Telkâri (6 adım) ·
Savat/Niello (7 adım) · Mine/Cloisonné (6 adım). Her biri adım-adım
interaktif ilerleme.

**Öğretmenler için (4 ders planı)** — Mohs Çizim Testi · Gümüş
Kimyası · Lidya ve Paranın İcadı · UNESCO Somut Olmayan Miras. Hepsi
yazdırılabilir çalışma kâğıdıyla (print CSS).

**Quiz Merkezi (49 soru)** — 7 kategori + karışık, 3 zorluk seviyesi
(Çırak / Kalfa / Usta).

**Oyun Merkezi (5 oyun) — Faz 5** — Müze konularını oyunlaştıran
replayable içerik:
- **Taş Eşleştirme** — Match-3 arcade, 8×8 grid, combo zincirleri,
  her patlamada Mohs sertliği mikro-etiketi.
- **Mohs Merdiveni** — 5-şeritli endless climber. Talk'tan Elmas'a
  tırman; sadece senden sert mineralleri yut.
- **Zaman Sıralaması** — 5 turluk kronoloji bulmacası, 80+ tarihî
  olaydan random sample, hız bonusu.
- **Kuyumcu Atölyesi** — Simulation: müşteri brief'ine göre metal/
  taş/kesim/setting seç, bütçe tut; canlı fiyat motoru gerçek
  ayar-gram hesaplarıyla.
- **Dünya Turu** — Harita tıklatmalı coğrafya quiz'i; Haversine
  mesafe ile puan (500km/1000km/2000km eşikleri).

Her oyun 3 zorluk seviyesi, rozet desteği, kişisel en iyi skor
takibi ve "ilgili sergiye göz at" cross-link'i içerir.

**Sözlük (62 terim)** — Alaşımdan ultramarine'e, kimberlitten padparadscha
safirine, tüm temel ve teknik terimler TR/EN/AR.

**Dünya Haritası** — Önemli madenler ve zanaat merkezleri harita
üzerinde.

---

## 🚀 Hızlı başlangıç

**Önkoşullar:** Node.js 18 veya üstü, npm.

```bash
# Depoyu klonla
git clone https://github.com/jewelpedi/jewelpedi-kids.git
cd jewelpedi-kids

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
# → http://localhost:5173

# Üretim derlemesi
npm run build

# Üretim önizleme
npm run preview

# Lint
npm run lint
```

---

## 🏗️ Mimari

```
src/
├── App.jsx                    # Router + ErrorBoundary + lazy loading
├── main.jsx                   # React root + providers
│
├── context/                   # LocaleContext, ThemeContext, ProgressContext
├── audio/                     # Web Audio sound synthesis
│
├── pages/                     # 15 ana sayfa (Lobby eager, diğerleri lazy)
│   ├── Lobby.jsx
│   ├── HallsIndex.jsx / HallPage.jsx / ExhibitDetail.jsx
│   ├── StoriesIndex.jsx / StoryPage.jsx
│   ├── Timeline.jsx / Educators.jsx
│   ├── LabPage.jsx / QuizHub.jsx / WorkshopHub.jsx
│   └── WorldMapPage.jsx / GlossaryPage.jsx / AchievementsPage.jsx
│
├── components/
│   ├── common/                # ErrorBoundary, LoadingFallback, toggles
│   ├── layout/                # Header, Footer, Layout
│   ├── museum/                # DisplayCase, LabelPlate, WaxSeal, SpotLight
│   ├── icons/gems/            # 22 custom SVG gem icons
│   └── lab/                   # 7 interactive experiment components
│
├── data/                      # Content layer — all trilingual
│   ├── exhibits/              # 44 exhibits across 7 halls
│   ├── stories.js             # 5 × 5-scene narratives
│   ├── timelineEvents.js      # 70+ historical events
│   ├── lessonPlans.js         # 4 lesson plans with worksheets
│   ├── quizzes.js / glossary.js / halls.js / worldMap.js
│
├── i18n/                      # tr.js, en.js, ar.js
└── utils/                     # helpers, iconFor mapping
```

**Key design principles:**
- **No localStorage** (per spec) — all state in memory via `useReducer`
- **Trilingual-first** — every user-facing string lives in `{ tr, en, ar }`
  objects, never hard-coded
- **Museum aesthetic** — dark ink #1b2845 + cream #fff8ec + gold #f7c948
  with custom display-case shadows & wax-seal stamps
- **Single-file components** — no CSS modules; Tailwind utility classes
  everywhere

---

## 📦 Build architecture (Faz 4)

- **Code splitting** — every page is a separate chunk via `React.lazy`.
  Initial JS payload ~200 KB (vs ~1 MB pre-split).
- **Vendor splits** — `react` / `icons` / main app are separate chunks
  for better long-term caching.
- **PWA** — service worker via `vite-plugin-pwa`, works offline after
  first visit, installable on mobile home screens.
- **SEO** — Schema.org EducationalOrganization, OG + Twitter cards,
  hreflang TR/EN/AR alternates, sitemap.xml + robots.txt.

---

## 🤝 Katkıda bulunma

Lütfen [**CONTRIBUTING.md**](./CONTRIBUTING.md)'yi okuyun. Özetle:

1. **Fork** et, kendi branch'ını aç (`git checkout -b my-new-exhibit`)
2. **İçerik ekle** — yeni sergi / hikâye / ders planı / çeviri
3. **Test et** — `npm run build` temiz geçmeli, `npm run lint` yeni
   hata üretmemeli
4. **PR aç** — PR template doldurulacak

Özellikle aradığımız katkılar:
- 🌍 **Çeviri** — Arapça metinlerin doğruluk gözden geçirmesi (şu an
  özet biçiminde; tam trilingual parite hedefimiz)
- 🖋️ **Yeni içerik** — Tanzanit, morganit, cufflink gibi henüz
  eksik sergiler (44 → 70 hedefi)
- 🧪 **Yeni laboratuvar deneyleri** — mineralogy, kristal yapı
  görselleştirme, vb.
- ♿ **Erişilebilirlik** — Lighthouse a11y skorunu iyileştirme
- 📸 **Fotoğraf** — gerçek usta atölyesi fotoğrafları (CC lisanslı)

**Sorular:** [Issues](https://github.com/jewelpedi/jewelpedi-kids/issues)
sekmesinde veya `#jewelpedi` Discord kanalında.

---

## 📁 Proje dokümanları

- [**PLAN.md**](./PLAN.md) — 5 fazlı yol haritası, sprint bazında
- [**SPECS.md**](./SPECS.md) — design system, içerik şablonları,
  bileşen şartnameleri
- [**PROMPT.md**](./PROMPT.md) — yeni geliştirme oturumuna yapıştırılacak
  master prompt (Claude ajan çalışması için)
- [**CHANGELOG.md**](./CHANGELOG.md) — tüm sürüm geçmişi
  (Faz 0 → Faz 4)
- [**CONTRIBUTING.md**](./CONTRIBUTING.md) — katkı rehberi,
  "yeni sergi ekleme" tutorial'ı

---

## 🎓 Okullar ve eğitmenler için

JewelPedi Kids, ilkokul ve ortaokul sınıflarında doğrudan kullanılabilecek
şekilde tasarlandı. `/educators` rotasında 4 tam ders planı (Mohs,
gümüş kimyası, Lidya tarihi, UNESCO) ve yazdırılabilir çalışma
kâğıtları bulunur. Tüm içerik MIT lisansı altında — sınıfta özgürce
kullanın, atıf verin yeter.

---

## 📜 Lisans

MIT © JewelPedi contributors

İçerik (metinler, görseller, veri) ayrıca **Creative Commons BY-SA 4.0**
ile paylaşılmaktadır — eğitim alanında serbestçe çoğaltılabilir.

---

## 🙏 Teşekkürler

- [Lucide](https://lucide.dev/) — ikon seti
- [React](https://react.dev) + [Vite](https://vitejs.dev) + [Tailwind](https://tailwindcss.com)
- Trabzon Hasırı, Siirt Savatı, Mardin Telkârisi ustaları — sanatlarını
  dünyayla paylaştıkları için
- Anadolu'nun mücevher ve kuyumculuk geleneğini koruyan tüm
  kurumlar ve yayıncılar

---

> _"Bir taşın hikâyesi sadece kimyasından değil, kimlerin ellerinden
> geçtiğinden de gelir."_ — Story 1, Kleopatra'nın Zümrüdü
