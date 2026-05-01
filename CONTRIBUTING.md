# Katkı Rehberi / Contributing Guide

Teşekkürler! JewelPedi Kids açık kaynak bir eğitim projesidir ve her
tür katkı memnuniyetle karşılanır.

**İçerik / Contents:**
- [Başlarken](#başlarken)
- [İçerik standartları](#i̇çerik-standartları)
- [Yeni sergi ekleme — adım adım](#yeni-sergi-ekleme)
- [Yeni hikâye ekleme](#yeni-hikâye-ekleme)
- [Çeviri katkıları](#çeviri-katkıları)
- [Kod stili](#kod-stili)
- [PR süreci](#pr-süreci)

---

## Başlarken

```bash
git clone https://github.com/jewelpedi/jewelpedi-kids.git
cd jewelpedi-kids
npm install
npm run dev   # http://localhost:5173
```

**Önkoşullar:** Node.js 18+. npm 9+.

İlk kez katkı veriyorsanız, kolay bir "good first issue" etiketi ile
başlayabilirsiniz. `src/data/glossary.js`'e yeni bir terim eklemek genelde
en hızlı ilk katkıdır.

---

## İçerik standartları

### Trilingual zorunluluğu

**Tüm kullanıcıya görünen metin** `{ tr, en, ar }` objesi olarak
yazılmalıdır — asla hard-coded string değil.

```js
// ✅ Doğru
name: { tr: 'Zümrüt', en: 'Emerald', ar: 'زمرد' }

// ❌ Yanlış
name: 'Zümrüt'
```

Üç dilde de içerik yazabiliyorsanız harika. Yalnız birini
yapabiliyorsanız da PR açın — başka katkıcılar diğerlerini tamamlar.
Sadece bunu PR açıklamasında belirtin.

### Ton ve dil seviyesi

- **Hedef kitle:** 7-14 yaş çocuk + ebeveyn/öğretmen eşliği
- **Türkçe:** Sade, doğal, biraz hikâyemsi. "-eceğiz, -acağız" gibi
  yapılardan kaçın; "yapacağız" yerine "yaparız" tercih et. Ölçü ve
  rakamları vurgu için kullan ("3 milyar yıl").
- **İngilizce:** American simple English; children's museum tone.
  Avoid jargon unless followed by plain-language definition.
- **Arapça:** Modern Standard Arabic, kısa cümleler. Detay fazlaysa
  özet alternatifi kabul — iki paragraflık TR/EN yerine kısa 1-2
  cümlelik AR makuldür.

### Yaş güvenliği

- ❌ Şiddet (savaş, ölüm detayı), sigara/alkol övgüsü, cinsel içerik
- ❌ Politik tartışmalar, dini ayrımcılık
- ❌ Fiyat reklamı ya da marka yönlendirme
- ✅ Sanat, bilim, tarih, kültürel çeşitlilik, ustalık
- ✅ "Bilinmeyen" (tarihte tartışmalı) konularda nötr ton: "Bazı
  kaynaklara göre..." gibi

### Kaynak ve gerçeklik

Bilim, tarih ve sayıları **gerçek kaynaklardan** alın. Tahmini
yazmak zorundaysanız "yaklaşık" veya "~" işaretleri ile belirtin.
Wikipedia, GIA raporları, UNESCO dosyaları, resmi müze siteleri
güvenilir başlangıç noktalarıdır.

---

## Yeni sergi ekleme

Örnek: Renkli Taşlar salonuna **"Tanzanit"** eklemek isteyelim.

### 1. Verileri ekle

`src/data/exhibits/renkliTaslar.js` dosyasını aç. Array'in sonuna
yeni bir obje ekle:

```js
{
  id: 'tanzanit',
  cat: 'renkli-taslar',
  emoji: '🔷',
  accent: '#4a5ba8',
  name: { tr: 'Tanzanit', en: 'Tanzanite', ar: 'التنزانيت' },

  intro: {
    tr: 'Dünyada sadece tek bir yerde bulunan mavi-mor taş.',
    en: 'A blue-violet stone found in only one place on Earth.',
    ar: 'حجر أزرق-بنفسجي يوجد في مكان واحد فقط.',
  },

  body: {
    tr: 'Tanzanit 1967\'de Tanzanya\'da Maasai çobanları tarafından...',
    en: 'Tanzanite was discovered by Maasai herdsmen in 1967...',
    ar: 'اكتُشف التنزانيت عام 1967 في تنزانيا.',
  },

  funFact: {
    tr: 'Tiffany & Co. bu taşa ismini verdi — bulunduğu ülkeden.',
    en: 'Tiffany & Co. named this stone — after the country where it was found.',
    ar: 'شركة تيفاني سمّت الحجر باسم تنزانيا.',
  },

  stats: {
    hardness: '6.5–7 Mohs',
    formula: 'Ca₂Al₃(SiO₄)₃(OH)',
    origin: 'Sadece Tanzanya Merelani',
    discovered: '1967',
  },

  scienceBox: {
    formula: 'Ca₂Al₃(SiO₄)₃(OH) (zoisit)',
    crystalSystem: 'Orthorhombic',
    hardness: '6.5–7 (Mohs)',
    refractiveIndex: '1.691–1.700',
    density: '3.35 g/cm³',
    notes: {
      tr: 'Tanzanit aslında mavi zoisitin ticari adıdır...',
      en: 'Tanzanite is actually the trade name for blue zoisite...',
      ar: 'التنزانيت هو الاسم التجاري للزويسيت.',
    },
  },

  timeline: [
    { year: 1967,
      event: {
        tr: 'Manuel Saul adlı Maasai çobanı fosil taşları bulur.',
        en: 'Maasai herdsman Manuel Saul finds the crystals.',
        ar: 'راعٍ من الماساي يكتشف البلورات.',
      }},
    { year: 1968,
      event: {
        tr: 'Tiffany & Co. taşa "tanzanit" adını verir.',
        en: 'Tiffany & Co. names the stone "tanzanite".',
        ar: 'تيفاني تسميه تنزانيت.',
      }},
  ],

  related: ['zumrut', 'safir', 'ametist'],
},
```

### 2. İkon eşlemesi

`src/utils/iconFor.js` dosyasını aç. Yeni sergi ID'sini uygun SVG
ikonla eşleştir:

```js
'tanzanit':  { id: 'sapphire', animate: true },
```

Eğer bu sergi için yeni, özel bir SVG ikon da ekliyorsan:
`src/components/icons/gems/` klasöründe yeni dosya oluştur, ardından
`index.js`'e kaydet, ve `iconFor.js`'de `id: 'tanzanite'` gibi yeni
ismi kullan.

### 3. İlgili sözlük terimleri

`src/data/glossary.js` dosyasına (opsiyonel) yeni terim:

```js
{ id: 'pleochroism',
  term: { tr: 'Pleokroizm', en: 'Pleochroism', ar: 'تعدد اللون' },
  cat: 'renkli-taslar',
  def: {
    tr: 'Taşın farklı açılardan bakıldığında farklı renklerde görünmesi. Tanzanit bunun en belirgin örneğidir — mavi, mor ve Bordeaux tonları arasında değişir.',
    en: 'A stone appearing different colors from different viewing angles. Tanzanite shows this most dramatically.',
    ar: 'ظهور الحجر بألوان مختلفة.',
  },
},
```

### 4. Quiz sorusu (opsiyonel)

`src/data/quizzes.js` dosyasına yeni soru ekle. Kategori: `renkli-taslar`.

### 5. Timeline olayı (opsiyonel)

`src/data/timelineEvents.js`:

```js
{ year: 1967, category: 'discovery',
  title: { tr: 'Tanzanit keşfedilir', en: 'Tanzanite discovered', ar: 'اكتشاف التنزانيت' },
  description: {
    tr: 'Tanzanya\'nın Merelani bölgesinde Maasai çobanı ilk kristali bulur.',
    en: 'Maasai herdsman finds first crystals at Merelani, Tanzania.',
    ar: 'راعٍ ماساي يجد أول بلورات.',
  },
  exhibit: 'tanzanit' },
```

### 6. Test et

```bash
npm run dev
# Browser'da Renkli Taşlar salonuna git, Tanzanit kartını tıkla.
# Body, scienceBox, timeline bölümleri görünmeli.
# Dil değiştir — EN ve AR'da da çalışmalı.

npm run build
# 0 hata vermeli.
```

### 7. PR aç

- [ ] Tüm içerik TR/EN/AR dolu (veya PR açıklamasında "AR'yi başka
      katkıcı tamamlasın" belirtilmiş)
- [ ] `npm run build` temiz
- [ ] iconFor eşlemesi eklendi
- [ ] Görsel sanity check mobile (360px) ve RTL (AR) modda yapıldı

---

## Yeni hikâye ekleme

Hikâyeler `src/data/stories.js`'de. Yapı:

```js
{
  id: 'some-story',
  hall: 'renkli-taslar',          // hangi salon teması
  accent: '#27ae60',               // tema rengi
  icon: 'emerald',                 // GemIcon id
  readMinutes: 5,                  // tahmini okuma süresi

  title:     { tr, en, ar },
  subtitle:  { tr, en, ar },       // 1 satır kanca

  scenes: [
    {
      id: 'opening',
      icon: 'emerald',             // opsiyonel — sahne illüstrasyonu
      title: { tr, en, ar },
      body:  { tr, en, ar },       // 100-180 kelime TR, paralel EN, özet AR
      pullquote: { tr, en, ar },   // opsiyonel — öne çıkan alıntı
    },
    // 4 sahne daha...
  ],

  takeaway: { tr, en, ar },        // 1-2 cümle moral
  relatedExhibits: ['zumrut', ...], // bağlantılı sergi ID'leri
}
```

**Hikâye yazım kılavuzu:**
- 4-6 sahne ideal (3 çok kısa, 8+ çok uzun)
- Her sahne bir "dramatik an" etrafında kurulmalı — tarih kronolojisi
  değil, içinde duygu olan mikro-sahne
- Sahneler birbirini tekrarlamasın — ilerleme olmalı
- Takeaway didaktik değil düşündürücü olsun ("XYZ iyidir" değil,
  "Peki ya sen ne yapardın?" gibi)

---

## Yeni oyun ekleme (Faz 5+)

`/games` bölümü 5 oyunla geldi; yenisini eklemek için izlenecek yol:

### 1. Games metadata'sına kaydet

`src/data/games.js`'e yeni girdi:

```js
{
  id: 'your-game',            // URL slug, kebab-case
  genre: 'puzzle',            // arcade | puzzle | strategy | quiz
  icon: 'emerald',            // GemIcon id'lerinden biri
  accent: '#27ae60',          // hall/tema rengi
  durationMin: 2,             // ortalama oyun süresi
  difficulty: ['cirak', 'kalfa', 'usta'],
  badgeId: 'your-game-badge',
  relatedHall: '/halls/renkli-taslar',  // sonuç ekranı link'i
  componentLoader: () => import('../games/YourGame.jsx'),
  title:    { tr, en, ar },
  tagline:  { tr, en, ar },   // 1 satır kanca
  description: { tr, en, ar },
  learningGoals: { tr: [...], en: [...], ar: [...] },
}
```

### 2. Oyun bileşenini yaz

`src/games/YourGame.jsx` — component imzası:

```jsx
export default function YourGame({ difficulty, accent, game, onFinish }) {
  // ... gameplay mantığın
  // Oyun bittiğinde:
  onFinish({
    score: 450,
    won: true,                // true = rozet açılır
    summary: { tr: '...', en: '...', ar: '...' },
    blurb:   { tr: '...', en: '...', ar: '...' },  // "Biliyor muydun?"
    breakdown: [
      { label: { tr, en, ar }, value: '8/10' },
    ],
    bestOf: 600,              // opsiyonel: max skor
  });
}
```

GameShell idle/playing/over fazlarını otomatik halleder; sen sadece
gameplay loop'unu ve onFinish payload'ını sağlarsın.

### 3. Rozeti ekle

`src/data/achievements.js`'e:

```js
{
  id: 'your-game-badge',
  emoji: '🎯',
  name: { tr: '...', en: '...', ar: '...' },
  desc: { tr: '...', en: '...', ar: '...' },
  check: (p) => p.badges.has('your-game-badge'),
}
```

Direkt `check: badges.has(id)` formu, `onFinish({ won: true })` ile
zaten açılan rozeti okur. Başka bir logic gerekmez.

### 4. Yapı kararları

- **localStorage yasak** — state `useState`/`useReducer` ile. Kişisel
  en iyi skor `ProgressContext.gameBests` tarafından in-memory tutulur.
- **Pointer events** — `onPointerDown`/`onClick` kullan. HTML5 drag
  yasak (mobil-uyumsuz).
- **Trilingual zorunlu** — her user-facing string `{tr, en, ar}`.
- **Ses opsiyonel** — `const { play } = useSound(); play?.('reveal');`
  Default mute, kullanıcı açmışsa çalar.
- **`prefers-reduced-motion`** — global CSS ile zaten kısıtlı, ama
  `requestAnimationFrame` tabanlı oyunlarda (Mohs Climb gibi) spawn
  hızını yavaşlatmayı düşün.
- **RTL** — direction-sensitive margin/padding'ler için `rtl:`
  varyantını ekle (`ml-2 rtl:ml-0 rtl:mr-2`). Ok ikonları için
  `rtl:rotate-180` pattern'i kullanılıyor.
- **Lazy chunk** — her oyun `componentLoader`'ıyla ayrı bundle olur.
  Hub/idle ekranına oyun kodu sızmaz.

### 5. Test et

```bash
npm run dev
# → /games/your-game
```

Her 3 zorluğu oyna. Rozet açılışını kontrol et (`/achievements`'e git).
Sonuç ekranında blurb, breakdown ve "ilgili sergiye göz at" link'i
çalıştığını doğrula.

Mobile: Chrome DevTools → 360px viewport. RTL: header'dan AR'a geç,
sağdan-sola akış düzgün mü bak.

### 6. CHANGELOG

`CHANGELOG.md`'ye yeni oyun başlığı altında full tasarım notunu ekle:
mekanik, zorluk paramı, puanlama formülü, rozet koşulu, reuse ettiğin
varlıklar, mimari tradeoff'lar.

---

## Çeviri katkıları

**Özellikle aradığımız:** Arapça içerik parite. Faz 0-3 boyunca Arapça
çoğunlukla özet biçiminde yazıldı; tam paragraf çevirileri memnuniyetle
kabul edilir.

**Süreç:**
1. Hangi dosyayı çevirdiğinizi belirtin (ör. `src/data/stories.js` →
   `kleopatra-zumrut` sahneleri)
2. Bir dosya için tek PR açın
3. PR başlığı: `[i18n/ar] Expand translations in stories.js`

**Arapça için özel notlar:**
- Fasih Modern Standart Arapça tercih — diyalektik değil
- Teknik terimler: Kurmanca/Farsça ödünç yerine gerçek Arapça
  karşılıklar ("zümrüt" → "زمرد" zaten Arapça, değişmez; "pırlanta"
  → "الماس" kullan)
- RTL yönü CSS'de zaten ayarlı; metni yazarken endişelenmeyin

**İngilizce için:** American English tercih edilir (color, not colour).

---

## Kod stili

- **Bileşenler** PascalCase (`ExhibitDetail.jsx`)
- **Yardımcılar** camelCase (`iconFor.js`)
- **Sabitler** UPPER_SNAKE (`IDEAL`, `STAMPS`)
- **Dosya uzantısı** `.jsx` (React bileşenleri) veya `.js` (data, utils)
- **Tailwind** utility classes; custom CSS sadece zorunluysa
- **2 boşluk indent**, tek tırnak, sondaki virgül
- **No console.log** production kodunda (dev'de OK)

**ESLint** kuralları yumuşak tutulmuştur — PR'ınızda yeni warning
oluşmaması yeterli.

---

## PR süreci

1. **Issue aç** (büyük değişiklikler için) — önce konuşalım
2. **Fork + branch** — `feature/add-tanzanite` gibi açıklayıcı isim
3. **Commit mesajları** — [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add tanzanite exhibit to colored stones`
   - `fix: mohs ladder missing unlock for diamond tier`
   - `docs: clarify translation policy in CONTRIBUTING`
4. **PR template'i** doldur
5. Maintainer inceler. Genelde 48-72 saat içinde yanıt.
6. Onaylanırsa merge edilir, bir sonraki deploy'da canlı olur.

**Küçük yazım/çeviri düzeltmeleri** tek commit'lik PR olarak direkt
gönderilebilir — önce issue açmanıza gerek yok.

---

## Sorular

- **Genel:** [GitHub Discussions](https://github.com/jewelpedi/jewelpedi-kids/discussions)
- **Bug:** Issues → Bug report template
- **Özellik:** Issues → Feature request template

---

Hoş geldin, iyi katkılar! 💎
