# 🗺️ PLAN — JewelPedi Kids Gelişim Yol Haritası

Bu dosya, scaffold'dan **gerçek bilim merkezi** eşiğine kadar çıkmak için
hazırlanmış çok oturumlu bir yol haritasıdır. Her faz bir Claude oturumuna
denk gelir. Oturum başında `PROMPT.md`'yi yapıştır, kaçıncı fazda olduğumuzu
söyle, Claude oradan devam etsin.

---

## 🎯 Hedef (The Bar)

Bir çocuk `kids.jewelpedi.com`'a girdiğinde:
- **Gözü büyüsün.** İlk 3 saniyede "vay be" dediği bir ana ekran.
- **Bir saat çıkamasın.** İçerik + interaktif araçlar o kadar sarsın ki kesilmek istemesin.
- **Ebeveyn de çekilsin.** Omuz üstünden bakan yetişkin "aa bunu ben de bilmiyordum" desin.
- **Öğretmen bookmark yapsın.** Derste kullanılacak kadar ciddi, çocuğu küçümsemeyen içerik.
- **Sektör paylaşsın.** Kuyumcu/gemolog arkadaşına "bunu bir dakika aç" desin.

Bu eşik **yüzeysel anlamda sofistike** olmak değil — **gerçekten derin, gerçekten iyi
tasarlanmış, gerçekten sıkı yazılmış** olmak demek. "Güzel arayüzlü özet sayfa"
yerine "canlı, nefes alan bir bilim merkezi".

---

## 📊 Mevcut Durum — Faz 0 (TAMAM)

Bir scaffold var:
- Vite + React 18 + Tailwind + react-router-dom kurulu, build başarılı.
- 3 dilli i18n altyapısı (TR/EN/AR, RTL destekli).
- 7 sergi salonu + 25 sergi standı (yüzeysel içerik, her biri tek paragraf).
- 6 lab deneyi (çoğu basit slider + çıktı — sofistike değil).
- 24 quiz sorusu, 35 sözlük terimi, 8 rozet.
- Dünya/Türkiye haritası (çok basit SVG siluet).
- In-memory progress context, MIT lisanslı.

**Ne yoktu:** Ayırt edici görsel kimlik, gerçek müze atmosferi, derin içerik,
sofistike interaktifler, ses, 3D, karakter/anlatı, "koleksiyon" hissi, dark
gallery mode, erişilebilirlik geçişi, PWA.

---

## 🎨 Faz 1 — Görsel Kimlik Devrimi

**Oturum süresi:** 1 tam oturum.
**Hedef:** "Tipik Tailwind uygulaması" → "hatırlanan müze estetiği"ne geçiş.

### Çıktılar

1. **Custom SVG gem illustration kütüphanesi** — her taş, her metal için
   kod ile çizilmiş özel ikon (emoji DEĞİL): diamond, ruby, sapphire,
   emerald, turquoise, gold bar, silver coin, platinum nugget... her biri
   scalable, animatable, dark/light mode duyarlı.
   - `src/components/icons/gems/` altına 20+ bileşen.
2. **Display case (sergi vitrini) bileşeni** — her exhibit kartı gerçek
   müze vitrini gibi: cam yansıması, spot ışığı, alt etiket plakası,
   müze numarası. `src/components/museum/DisplayCase.jsx`.
3. **Label plate bileşeni** — sergi etiketleri için retro museum label
   tipografisi (sığ gölgeli, ince border, "EXHIBIT Nº 042" gibi
   numaralama). `src/components/museum/LabelPlate.jsx`.
4. **Wax seal & curator stamp** — küratör notu üstünde animasyonlu
   kırmızı mühür; özel bir niteliği vurgulamak için damga etiketi.
5. **Hero revamp** — Lobby'nin hero'su atmosfer kazanır: parallax gem
   stack, particle shimmer, ambient light, welcome animation staggered
   reveal. Placeholder SVG stack ATILIR, yerine kod-çizim 3 taş + cam
   vitrin gelir.
6. **Dark Gallery Mode** — toggle ile dark tema. Gerçek müze gibi:
   koyu zemin, seçili objelere spot light.  CSS variable swap ile.
7. **Typography treatments** — display fontu için hero/numara stiller,
   "engraved" metinler (text-shadow ile kabartma efekti), karat/ayar
   gibi teknik sayıları için ayrı muamele.
8. **Motion language** — FLIP-like page transitions, stagger reveals,
   `prefers-reduced-motion` tam saygılı, hover efektleri "nesne
   kaldırıyorum" hissi (hafif döndürme + gölge uzaması).
9. **Sound system scaffold** — `src/audio/` altında Web Audio API
   tabanlı küçük ses kütüphanesi (henüz çalmıyor, `<SoundProvider>`
   ve `useSound()` hook'u). Ziller, tıklama, sayfa geçişi için
   opsiyonel. Kullanıcı ayar ile kapatabilir.

### Dokunulacak dosyalar

- **Yeni:** `src/components/icons/gems/*`, `src/components/museum/*`,
  `src/audio/*`, `src/context/ThemeContext.jsx`, `src/styles/museum.css`.
- **Değişecek:** `src/index.css`, `src/App.jsx` (Theme + Sound provider),
  `src/components/layout/Header.jsx` (tema toggle), `src/pages/Lobby.jsx`
  (hero revamp), `src/components/common/ExhibitStand.jsx` (DisplayCase'e
  dönüşür).

### Kabul kriterleri

- [ ] Hero ilk yüklendiğinde "vay be" etkisi var — sığ genel arayüz
  DEĞİL ayırt edici.
- [ ] Her sergi kartı emoji-header'dan çıkıp custom SVG ikon + display
  case görünümüne geçmiş.
- [ ] Dark gallery mode çalışıyor, tüm halls'da doğru renklerle.
- [ ] Reduced-motion aktifken animasyonlar kapanıyor.
- [ ] Build hâlâ başarılı (`npm run build` temiz).

---

## 📚 Faz 2 — İçerik Patlaması

**Oturum süresi:** 1-2 oturum (içerik yoğunluğu çok).
**Hedef:** 25 sergi → 70+ sergi, her biri çok daha derin.

### Çıktılar

1. **Mevcut 25 serginin derinleşmesi.** Her exhibit şu yapıya genişler:
   ```
   hero / intro / body / funFact / stats (mevcut)
   + gallery     — çizim/SVG görseller dizisi
   + timeline    — tarihsel noktalar (varsa)
   + digDeeper   — "Daha fazla öğren" expandable sections (2-4 alt başlık)
   + scienceBox  — kimya/fizik detayı (yaşa göre opsiyonel)
   + storyThread — varsa, bağlı olduğu anlatı ipliği
   ```
2. **45+ yeni sergi standı.**
   - Altın Salonu: +6 (Altın İşleme Süreci, Kuyumcu Aletleri, Osmanlı
     Mücevheri, Altın Yaprak Sanatı, Reşat Altını, Ata Lira vb.)
   - Gümüş Salonu: +5 (Kazaz, Mine/Emaye, Repoussé, Gümüş Ayarları
     dünya çapında, İstanbul Kapalıçarşı Gümüş Sokakları).
   - Pırlanta: +6 (Ünlü Pırlantalar — Cullinan, Hope, Koh-i-Noor,
     Taylor-Burton; Sertifikasyon kuruluşları; Fluoresans; Kan
     Pırlantaları meselesi yaşa uygun ele alınarak).
   - Renkli Taşlar: +12 (Ametist, Opal, Akuamarin, Topaz, Peridot,
     Garnet, Tanzanit, Morganit, Tourmaline, Citrine, Lapis Lazuli,
     Tanzanite — her biri tam detay).
   - Platin: +3 (Platin tarihçesi, Paladyum ailesi, Otomotiv & takı
     kullanımı).
   - Takı: +6 (Küpe tarihçesi, Bilezik kültürleri, Diadem/Taç, Broş,
     Halhal, Kol Düğmesi).
   - Zanaat: +7 (Kazaz detay, Mine detay, Repoussé, Kuyumculuk aletleri
     tek tek, Kapalıçarşı sanal tur, Eskişehir Lületaşı, Mardin detay).
3. **5 Story Thread** — karakter-odaklı anlatılar:
   - "Bir Altın Nugget'ın Yolculuğu" (nehir → rafineri → kuyumcu → yüzük)
   - "Bir Pırlantanın 3 Milyar Yılı" (mantodan parmağa)
   - "Mardin'li Telkâri Ustası Ayşe Hanım" (sanat + yaşam)
   - "Kleopatra'nın Zümrüdü" (tarihsel roman)
   - "Trabzon Hasırının Kurtuluşu" (UNESCO hikâyesi)
   Her biri 5-8 sayfalık anlatı + görsel (yine SVG illüstrasyon).
4. **Historical Timeline** — M.Ö. 4000'den bugüne mücevher tarihi. 50+
   olay. Ayrı bir sayfa: `/timeline`. Drag/scroll interaktif.
5. **80+ quiz sorusu** (mevcut 24 → 80+). Her kategori dengeli dağılmış.
   Zorluk seviyeleri gerçek bir öğrenme eğrisi oluşturuyor.
6. **70+ sözlük terimi** (mevcut 35 → 70+).
7. **Teachers & Parents sayfası** (`/educators`). Ders planları, basılabilir
   çalışma kağıtları (PDF olarak), tartışma soruları, atölye rehberleri.

### Dokunulacak dosyalar

- **Değişecek:** `src/data/exhibits/*.js` (hepsi genişler), `src/data/quizzes.js`,
  `src/data/glossary.js`.
- **Yeni:** `src/data/stories/*.js`, `src/data/timeline.js`,
  `src/pages/StoryPage.jsx`, `src/pages/Timeline.jsx`, `src/pages/Educators.jsx`.

### Kabul kriterleri

- [ ] Toplam sergi sayısı ≥ 70.
- [ ] Her sergi ortalama 400+ kelime (TR), aynısı EN ve AR'de.
- [ ] Story thread'ler gerçekten okunur — basmakalıp değil.
- [ ] Timeline scroll/drag ile akıcı.
- [ ] Öğretmen sayfası gerçek PDF çıktısı verebiliyor (print CSS ile).

---

## 🧪 Faz 3 — İnteraktif Araçlar Devrimi

**Oturum süresi:** 2 oturum (3D + canvas çok iş).
**Hedef:** Basit slider'lardan, insanın "bu web mi?" dediği seviyeye.

### Çıktılar

#### Oturum A — Three.js tabanlı 3D araçlar

1. **3D Gem Viewer** — Three.js ile. Kullanıcı taşı döndürür, yakınlaştırır,
   farklı kesim şekillerini karşılaştırır. Wireframe modu, "facets" vurgusu,
   ışık kaynağı yönü değiştirilebilir.
2. **Crystal Lattice Explorer** — elmas (cubic), korund (trigonal), beril
   (hexagonal) için atomik kafes yapıları 3D. Atomları etiketli. Sertlik ile
   kafes yapısı arasındaki bağlantıyı gösteren açıklama.
3. **Ring Designer** — 3D drag/drop yüzük tasarımcısı. Metal (altın/gümüş/
   platin/beyaz altın), taş (10+ seçenek), kesim şekli, boyut. Gerçek
   zamanlı 3D render + tahmini fiyat (malzeme × güncel fiyat; fiyat API'si
   dışarıdan — şimdilik statik tablo).

#### Oturum B — Canvas + React tabanlı araçlar

4. **Ray-Traced Pırlanta Simülatörü** — Canvas 2D ile gerçek ışın yolu
   hesaplaması. Kullanıcı kesim açısını mm cinsinden değiştirebiliyor,
   ışınlar matematiksel olarak hesaplanıp çizilir. "Ideal cut" preset'i ile
   karşılaştırma.
5. **Gem Detective Mystery** — tam anlatılı detektif oyunu. 5 bölüm, her
   bölümde sahte/gerçek taş ayırt etme, şüpheliler, ipucu toplama. Yaş
   aralığı: 9-13.
6. **Historical Time Machine** — kaydırılabilir scroll-based timeline.
   Her yıl için dönemin mücevheri çizim ile görünür. Canvas + Intersection
   Observer.
7. **Trade Routes Animated Map** — SVG + anime edilen rotalar. İpek yolu,
   Akdeniz, Atlantik rotaları. Taş/metal adı tıklanınca rotası canlanır.
8. **Melting Pot Simulator** — metalleri sürükle bırak, alaşım oluştur.
   Sonuç: bileşim, renk, sertlik, ayar, kullanım alanları.
9. **Virtual Atelier** — "Bir telkâri yüzük yap" interaktif. 10 adım,
   her adım kullanıcı etkileşimi gerektiriyor (doğru alet seç, doğru
   parçayı yerleştir, doğru sıcaklıkta kaynat, vb.). Gerçek bir atölye
   simülasyonu.
10. **Karat Balance Puzzle** — fiziksel terazi metaforu. Bir hedef ayar
    veriliyor (örn. 18K 10g), kullanıcı saf altın + alaşım ekleyerek
    terazi dengelenir. Matematik + hands-on.

### Teknoloji

- Three.js — sadece gerektiği yerde (3 araç), lazy loaded.
- Canvas 2D — ray tracing, timeline, detective.
- Her araç ayrı chunk olarak import edilir (code splitting).

### Kabul kriterleri

- [ ] Three.js araçları 60fps akıyor, mobilde donmuyor.
- [ ] Ray-tracing matematiksel olarak doğru (öğrenci kendisi hesaplasa
  aynı sonucu alır).
- [ ] Detective hikâyesi gerçekten tutar — demo değil.
- [ ] Her araç `LabPage`'de listeleniyor, ancak araç başına ayrı URL'i de
  var (`/lab/ring-designer`).
- [ ] Lazy loading ile ana bundle büyümüyor.

---

## 🎮 Faz 4 — Oyunlaştırma & Akış

**Oturum süresi:** 1 oturum.
**Hedef:** Bir kereliğe gelip çıkan site → geri dönülen site.

### Çıktılar

1. **Karakter/Avatar seçimi** — kullanıcı bir "müze rehberi" seçer
   (arkeolog, gemolog, kuyumcu ustası, koleksiyoner, bilim insanı).
   Her rehber küçük kişilik ayrıntıları ekler (küratör notlarında
   tonu değiştirir, farklı tavsiyeler verir).
2. **Koleksiyon Kabini** — virtual gem cabinet. Ziyaret edilen her
   taş/metal/zanaat kart olarak kabine eklenir. 3D/SVG minyatür
   görsellerle. Tıklanınca detayı açılır. Paylaşılabilir (screenshot/link).
3. **XP + Seviye Sistemi** — rozetlerin üstüne: 1-10 seviye. Her ziyaret,
   her quiz doğrusu, her deney tamamlaması XP verir. Seviye atladıkça
   yeni özellik (örn. lv5 → özel tema seçenekleri).
4. **Günlük Challenge** — her gün değişen bir görev. "Bugün: 3 yeni
   sergi ziyaret et" veya "Bugün: Renkli Taşlar quizinde 5 yıldız al".
5. **Boss Battle Quiz Mode** — 10 soru, 2 can, süreli, ödüllü. Quiz'in
   yeni bir modu.
6. **Easter Eggs** — 5 gizli mini oyun/gerçek. "Kapalıçarşı" exhibitinde
   gizli bir kapı, belirli bir tıklama sekansı açıyor. Kullanıcı bulursa
   özel rozet. Ayrıca konsola güzel bir ASCII mesaj.
7. **Paylaşım sistemi** — başarı sonrası "Twitter/X'te paylaş" veya
   görsel indir (Canvas ile üretilen özel paylaşım kartı).

### Kabul kriterleri

- [ ] Koleksiyon kabini en az 50 öğe destekliyor.
- [ ] XP / seviye progress bar her sayfada görünür (header veya
  footer'da, zorla olmadan).
- [ ] Boss battle mode gerçekten gergin (timer + can düşme sesi +
  doğru görsel geribildirim).
- [ ] En az 5 easter egg var, bir hint sistemi (ipucu isteyen için)
  bile mevcut.

---

## ♿ Faz 5 — Cila, Erişilebilirlik, PWA

**Oturum süresi:** 1 oturum.
**Hedef:** Demo kalitesinden production kalitesine.

### Çıktılar

1. **Tam klavye navigasyonu audit'i.** Her interaktif klavyeyle
   kullanılabiliyor. Tab sırası mantıklı.
2. **Ekran okuyucu geçişi.** Her görsel `alt`/`aria-label`, her
   interaktif açıklama ile anlaşılır. Canvas/3D araçlar için metin
   alternatifi.
3. **Yüksek kontrast modu.** CSS var değişikliği ile. WCAG AAA uyum.
4. **Animasyon kontrolleri.** Settings panel: animasyon / ses / yüksek
   kontrast / dil / tema. Bir yerden hepsi yönetilir.
5. **PWA manifest + service worker.** Offline çalışır. Ana sayfada
   "Install" butonu. İkon, splash screen, theme color tam.
6. **Performance pass.** Code splitting (mevcut warning'i giderir),
   image optimization (dev için — yok, ama SVG optimize), critical CSS
   inline.
7. **SEO + meta.** Her sayfa için doğru meta tag, Open Graph kartları,
   Twitter card, JSON-LD structured data (EducationalOrganization).
8. **Print stylesheet.** Exhibit ve atölye sayfaları çıktı alındığında
   düzgün.
9. **Analytics-free, privacy-first.** Telemetri YOK.

### Kabul kriterleri

- [ ] Lighthouse: Accessibility 100, Performance ≥90, SEO ≥95, PWA yeşil.
- [ ] Axe DevTools: 0 error.
- [ ] Safari, Firefox, Chrome, Edge son sürümlerde test.
- [ ] iOS Safari + Android Chrome mobil test.
- [ ] Offline mode: tüm statik içerik erişilebilir.

---

## 🌍 Faz 6 — İsteğe Bağlı: İçerik Pass 2

Eğer zaman ve enerji kalırsa.

- Arapça çevirilerin kalite geçişi (native speaker review önerisi).
- 4. dil ekleme (Farsça veya Fransızca, gemoloji tarihi açısından iyi).
- Podcast-style audio narration (yetişkin ses sanatçısı veya TTS)
  her sergi için.
- Video embed'ler (YouTube) — gerçek atölye kayıtları, sanat üretimi.
- Gerçek zamanlı altın/gümüş fiyat entegrasyonu (ana site API'sinden).

---

## 🔄 Çalışma Yöntemi (Sessions Arası)

### Oturum akışı

1. Kullanıcı yeni oturum açar.
2. `jewelpedi-kids.zip`'i yükler (bu context pack de içinde).
3. `PROMPT.md` içeriğini kopyalayıp yapıştırır.
4. Prompt'un sonuna "**Bu oturumda Faz X**" yazar.
5. Claude `PLAN.md`'yi okur, o fazın spec'ini bulur, `SPECS.md`
   ile birleştirir, kodlamaya başlar.
6. Oturum sonunda Claude güncellenmiş zip verir.
7. Kullanıcı bir sonraki oturumda o zip'i yükler. Döngü devam eder.

### Her oturumun açılışında Claude ne yapmalı?

1. Zip'i aç (veya dosyalar zaten mevcutsa), ağacı görüntüle.
2. `PLAN.md` + `SPECS.md` + `README.md` oku.
3. "Şu anda fazın ne kadarı bitmiş, neler eksik?" kendi kendine sor.
4. Kullanıcının söylediği fazın scope'una uy; bir fazı parçalı yapmayı öner.
5. O fazın kabul kriterlerini tek tek hedefle.

### Kapsam dışı

- **localStorage yok** (spec gereği). Progress in-memory kalır. (İlerde
  opt-in "save" özelliği bir sonraki major sürümde düşünülebilir.)
- **Backend yok.** Tüm veri client-side, veri dosyalarında.
- **Üçüncü taraf tracker yok.** Privacy-first.

---

## ✅ Genel Kalite Eşiği (Her Fazda Geçerli)

1. **Build temiz.** `npm run build` 0 error, 0 warning (bundle size hariç,
   onu da Faz 5'te çözüyoruz).
2. **Tri-lingual.** Her yeni kullanıcıya görünen metin TR/EN/AR'de var.
3. **Reduced-motion ve keyboard.** Her yeni etkileşim bunları geçer.
4. **Mobile-first.** 380px genişlikten 1440px'e kadar kusursuz.
5. **Özgün içerik.** Hiçbir kaynaktan (GIA, Tiffany, vb.) metin/görsel kopya
   yok. Gemolojik olgular doğru ve kaynak verilerle tutarlı.
6. **Dosya boyutu disiplini.** Bir component 400 satırı geçmesin;
   geçerse parçala.
7. **i18n disiplini.** Bileşen içine Türkçe string gömme. `t('key')`
   kullan.
