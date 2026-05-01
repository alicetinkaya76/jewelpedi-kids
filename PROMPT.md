# 📋 PROMPT — Yeni Oturuma Yapıştır

Bu dosya yeni bir Claude oturumuna başlarken yapıştırılacak **master
prompt**'tur. Zip dosyasını yükle, aşağıdaki metnin tamamını kopyala,
yapıştır, en alta **bu oturumun fazı**nı yaz, gönder.

---

## 🎯 KULLANIM

1. `jewelpedi-kids.zip` dosyasını oturumun başında yükle.
2. Aşağıdaki "**========= PROMPT BAŞLIYOR =========**" ile
   "**========= PROMPT BİTİYOR =========**" arasındaki her şeyi kopyala.
3. Sohbete yapıştır.
4. En alta şunu ekle: **"Bu oturumda Faz N üstünde çalışalım."**
   (N yerine 1-5 arası, `PLAN.md`'ye göre.)
5. Gönder. Claude zip'i açar, yol haritasını okur, kodlamaya başlar.

---

## ========= PROMPT BAŞLIYOR =========

Merhaba Claude. Sen şu anda `JewelPedi Kids` adlı açık kaynak bir projeye
katkıda bulunuyorsun. Bu proje çocuklar (7-14 yaş), gençler ve yetişkinler
için online bir **mücevher bilim merkezi**. Hedef: sanal bir müze içinde
altın, gümüş, pırlanta, renkli taşlar, platin, takı türleri ve Türk
kuyumculuk zanaatını gerçekten derin, interaktif, atmosferik bir şekilde
sunmak. Üç dilli: Türkçe, İngilizce, Arapça.

### Yaptığın ilk iş

Yüklenmiş olan `jewelpedi-kids.zip` dosyasını aç ve içindekileri **sırasıyla
oku**:

1. `PLAN.md` — çok oturumlu yol haritası. 5 fazdan oluşuyor, kullanıcı bu
   oturumda hangi fazda olduğumuzu söyleyecek. O fazın detaylı spec'ini bul.
2. `SPECS.md` — design system + içerik standartları + yeni interaktif araçların
   teknik şartnameleri. Kod yazmadan önce buna bak.
3. `README.md` — mevcut projenin mimarisi, dizin yapısı, build süreci.
4. `src/` — mevcut kod. Önce mimariyi anla, sonra üstüne çık. **Mevcut
   çalışan kodu kırma.**

### Senden beklenen

Bu scaffold'ı "iyi bir React uygulaması" seviyesinden "gerçek bir bilim
merkezi" seviyesine çıkarıyoruz. Hedef şu:

> Bir çocuk siteye girer, gözü büyür. Bir saat çıkamaz. Ebeveyn omuz
> üstünden bakar, o da dalar. Öğretmen bookmark yapar. Bir kuyumcu
> arkadaşına "şuna bak" der. Hacker News yorumcusu "eskiden böyle web
> vardı" diye post atar.

Bu eşik **yüzeysel sofistike görünüm** değil — **gerçekten derin içerik +
gerçekten iyi tasarım + gerçekten sıkı yazılmış interaktifler**.

### Kod yazma disiplini

- **Mevcut mimariyi koru.** Zip'teki i18n, context, data layer, routing
  düzeni iyi tasarlanmış. Yeni özellikler aynı disiplinle ekle:
  - Kullanıcıya görünen her metin `t('key')` üzerinden çevrilebilir olmalı.
  - Yeni içerik `src/data/` altındaki JS dosyalarına gider, kod içine
    gömülmez.
  - State `useReducer` + Context API, localStorage **yok**.
- **Tri-lingual her yeni metin.** Yeni bir string yazıyorsan
  TR + EN + AR üçü de olacak. AR minimum düzeyde olsa bile eksik bırakma.
- **Mobile-first.** 380px → 1440px arası her genişlikte test etmişçesine
  tasarla.
- **Reduced-motion ve keyboard.** Her yeni animasyon `prefers-reduced-motion`
  saygılı, her yeni etkileşim klavyeyle erişilebilir olsun.
- **Dosya boyutu disiplini.** Bir bileşen 400 satırı geçtiğinde parçala.
- **Build temiz kalsın.** Her oturumun sonunda `npm run build` sıfır hatayla
  geçsin. Chunk size uyarısı kabul (onu Faz 5'te çözeriz).

### Kalite eşiği — "AI slop" ASLA

- **Generic Tailwind görünümü üretme.** Sığ kartlar, purple gradient'ler,
  Arial/Inter font dayatmaları — asla. Baloo 2 + Nunito kullanıyoruz.
  Her sergi salonunun kendi renk sistemi var (`PLAN.md` + mevcut
  `tailwind.config.js`'e bak).
- **Emoji yerine SVG.** Faz 1'den itibaren emoji ikonlar kod-çizim SVG
  bileşenlerle değiştiriliyor. Yeni özellik eklerken emoji'ye geri dönme.
- **Slider + output = interaktif DEĞİLDİR.** Gerçekten düşünülmüş,
  matematiksel veya anlatısal iç dinamiği olan bir şey yapmıyorsak,
  "interaktif" ismini taşımasın.
- **Basmakalıp metin yazma.** "Altın çok değerlidir, insanlar onu sever"
  gibi gevşek cümleler yok. Spesifik ol: rakam, tarih, şehir, isim, süreç.
- **Çocuğu küçümseyen dil yok.** Çocuklar saygıyla ciddi alınmayı sever.
  Basit ol, sığ olma.

### Telif ve özgünlük

- Hiçbir kaynaktan (GIA, Tiffany, De Beers, AGS, vb.) metin/görsel/marka
  kopya yok. Tüm içerik özgün yazılmış.
- Gemolojik olgular (Mohs sertliği, kimyasal formüller, tarihler, ağırlıklar)
  telif dışıdır ve serbestçe kullanılabilir. Ama doğruluğunu kontrol et.
- MIT lisansı altındayız. Kullandığın 3rd party kütüphaneler uyumlu
  olmalı. (Mevcut stack hepsi uyumlu: React, Vite, Tailwind, lucide-react,
  recharts. Three.js ekleyeceksek MIT, uyumlu.)

### Hassas konular

- Kan pırlantaları (blood diamonds): çocuk dostu, kısa, "Kimberly
  sürecinden sonra durum iyileşti, etik sorumluluk hâlâ önemli" tonu.
  Korkutucu görsel yok.
- "Değerli vs ucuz" tartışmasını yargılayıcı yapma: her zanaat, her
  malzeme saygın.
- Dini veya etnik hassasiyete temas eden konularda (ör. Osmanlı,
  sınır bölgeleri) nötr, bilgi-odaklı tavır.

### Teknoloji konusunda sınırlar

- **React 18, Vite 5, Tailwind 3.** Major sürüm değişmez.
- **Yeni dep eklemeden önce gerekçelendir.** Örneğin Faz 3'te Three.js
  ekliyoruz çünkü 3D gem viewer için matematik dışı bir seçenek yok.
  Ama "biraz daha hoş animasyon" için framer-motion eklemeyin — CSS
  + React hooks yeterli.
- **Node 18+ varsayıyoruz.**

### Oturum çıktısı

Oturumun sonunda **güncellenmiş `jewelpedi-kids.zip`** üretilecek. Bu zip:
- `node_modules/` ve `dist/` içermeyecek.
- `PLAN.md`, `SPECS.md`, `PROMPT.md` dosyaları hâlâ kökte.
- `npm install && npm run build` sıfır hata ile geçiyor.
- `CHANGELOG.md` dosyası güncellenmiş: "Faz N tamamlandı, şunlar eklendi..."
  (dosya yoksa oluştur.)

### Zamanlama

Bir oturumda bir faz bitecek. Eğer bir faz çok büyükse (özellikle Faz 2
ve Faz 3), kullanıcı "A alt fazı yapalım" diyebilir. Spec'te belirtilen
alt bölümleri ayrı ayrı yap.

### "Daha fazla detay?" tuzağına düşme

Kullanıcı bir şey eklemeni istediğinde, önce onu mümkün olan en yüksek
kalitede yap, sonra "B de ekleyeyim mi?" diye sor. Yarım ısırılmış 5 özellik
yerine, tam bitirilmiş 2 özellik her zaman tercih.

### Son hatırlatma

Bu proje **açık kaynak bir eğitim hediyesi**. Ticari değil, vitrin değil,
gerçek bir öğretme aracı. Her karar bu hedefe hizmet etsin.

Şimdi zip'i aç, `PLAN.md`'yi oku, hangi fazda olduğumuzu gör, kollarını
sıva ve gerçekten iyi bir iş çıkart.

## ========= PROMPT BİTİYOR =========

---

## 📝 Oturum İçi Faydalı Komut Snippet'leri

Aşağıdaki cümleleri oturum içinde ihtiyacına göre kullanabilirsin:

### Faz başlatmak için

- "Bu oturumda **Faz 1**'in tamamını yapalım."
- "Bu oturumda **Faz 2**'nin **A alt fazını** (mevcut sergilerin
  derinleşmesi) yapalım."
- "Bu oturumda **Faz 3**'ün **Oturum A**'sını (Three.js araçları) yapalım."

### İçerik yönlendirmesi için

- "Faz 2'de renkli taşlardan özellikle **ametist, opal ve akuamarin**'e
  en çok yer ayır."
- "Story thread'lerden **Kleopatra'nın Zümrüdü** hikâyesini öncelikli
  yap, diğerleri sonra."

### Tasarım yönlendirmesi için

- "Dark gallery mode default olsun, kullanıcı light'a geçebilsin."
- "Hero'da particle efekti abartısız olsun — kar tanesi yağışı gibi
  değil, 3-4 tane ışık parıltısı."

### Hata durumunda

- "Build hata veriyor, önce onu düzelt, sonra devam et."
- "X özelliği iyi olmuş ama Y'yi tekrar düşün, çok cluttered olmuş."

### Oturum bitirmede

- "Yeterli — şimdi CHANGELOG güncelle ve zip'i hazırla."
- "Burada duralım, bir sonraki oturumda devam ederiz."
