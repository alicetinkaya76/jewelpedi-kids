import { useState } from 'react';
import { Shield, Lock, User, Eye, Heart, Smile, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { pick, cx } from '../utils/helpers.js';
import SpotLight from '../components/museum/SpotLight.jsx';

/*
 * PrivacyPage — Faz 7
 *
 * Çocuk güvenliği ve veri gizliliği açıklama sayfası. İki bölüm:
 *   (1) Çocuk diliyle: "Buraya oynamaya geldiğinde neler oluyor?"
 *   (2) Yetişkin diliyle: COPPA (13 yaş altı) ve GDPR-K (16 yaş altı)
 *       uyumlu veri işleme politikası.
 *
 * Bu sayfa "genel" politikadır: raporun 7.4 bölümüne göre uygulama şu
 * anda kalıcı kişisel veri toplamadan ilerliyor. Rozet, liderlik tablosu,
 * kullanıcı yüklemesi, AR kamera veya öğretmen sınıf modu gelirse bu
 * metin genişletilmelidir.
 */

export default function PrivacyPage() {
  const { locale } = useLocale();
  const [showAdult, setShowAdult] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <SpotLight variant="warm" corner="tr" intensity={0.3} />

      {/* Başlık */}
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full
                        bg-gold/10 ring-4 ring-gold/25 mb-4">
          <Shield className="text-gold" size={36} />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink">
          {{ tr: 'Gizlilik ve Güvenlik',
             en: 'Privacy & Safety',
             ar: 'الخصوصية والسلامة' }[locale]}
        </h1>
        <p className="mt-3 text-ink/70 leading-relaxed max-w-xl mx-auto">
          {{
            tr: 'Burada güvende ol. Hiçbir kişisel bilgi istemiyoruz, hiçbir reklam göstermiyoruz — sen öğrenmeye odaklan, biz de seni rahatsız etmemeye.',
            en: 'You are safe here. We don\'t ask for personal info, we don\'t show ads — you focus on learning, we focus on not getting in your way.',
            ar: 'أنت آمن هنا. لا نطلب معلومات شخصية ولا نعرض إعلانات — ركّز على التعلم.',
          }[locale]}
        </p>
      </header>

      {/* ═══════════════════ Çocuk bölümü ═══════════════════ */}
      <section className="rounded-3xl bg-white shadow-museum p-6 sm:p-8 border border-ink/5 mb-6">
        <h2 className="font-display text-2xl font-extrabold text-ink mb-5 flex items-center gap-2">
          <Smile className="text-gold" size={26} />
          {{ tr: 'Sen 13 yaşından küçüksen',
             en: 'If you\'re under 13',
             ar: 'إذا كان عمرك أقل من 13' }[locale]}
        </h2>

        <div className="space-y-5 text-ink/80 leading-relaxed">
          <KidPoint
            icon={User}
            color="#27ae60"
            title={{ tr: 'Adını sormayacağız', en: 'We won\'t ask your name', ar: 'لن نسأل اسمك' }[locale]}
            body={{
              tr: 'Burada hesap açmana gerek yok. Gerçek adın, okulun, yaşın — hiçbirini yazman gerekmiyor.',
              en: 'You don\'t need to create an account. You don\'t have to type your real name, your school, your age — none of that.',
              ar: 'لا تحتاج حساباً. لست مضطراً لكتابة اسمك الحقيقي أو مدرستك أو عمرك.',
            }[locale]}
          />
          <KidPoint
            icon={Eye}
            color="#5dade2"
            title={{ tr: 'Fotoğrafını göndermeyeceksin', en: 'You won\'t send photos', ar: 'لن ترسل صوراً' }[locale]}
            body={{
              tr: 'Bu sitede "fotoğraf yükle" diye bir düğme yok. Eğer ileride bir kamera özelliği eklersek (örneğin sanal prova), görüntün telefondan hiç çıkmaz — bize gelmez.',
              en: 'There\'s no "upload a photo" button here. If we ever add a camera feature (like virtual try-on), the image never leaves your phone — it doesn\'t come to us.',
              ar: 'لا يوجد زر لرفع الصور هنا. إذا أضفنا ميزة كاميرا، ستبقى الصورة في هاتفك.',
            }[locale]}
          />
          <KidPoint
            icon={Heart}
            color="#c0392b"
            title={{ tr: 'Senin puanın senin', en: 'Your scores are yours', ar: 'درجاتك ملكك' }[locale]}
            body={{
              tr: 'Quiz puanların, rozetlerin, ilerlemen — hepsi sadece senin tarayıcında. Biz onları uzak bir sunucuda saklamıyoruz. Tarayıcının temizlersen sıfırlanır.',
              en: 'Your quiz scores, badges, and progress all live in your browser only. We don\'t save them on a faraway server. If you clear your browser, they reset.',
              ar: 'درجاتك وشاراتك محفوظة في متصفحك فقط، ليس على أي خادم بعيد.',
            }[locale]}
          />
          <KidPoint
            icon={Lock}
            color="#8e44ad"
            title={{ tr: 'Reklam yok', en: 'No ads', ar: 'لا إعلانات' }[locale]}
            body={{
              tr: 'Burada hiç reklam göstermiyoruz. Kimse sana bir şey satmaya çalışmıyor. Sadece öğrenmeye geldin.',
              en: 'There are no ads on this site. Nobody is trying to sell you anything. You\'re just here to learn.',
              ar: 'لا إعلانات هنا. لا أحد يحاول بيعك شيئاً.',
            }[locale]}
          />
          <KidPoint
            icon={BookOpen}
            color="#e67e22"
            title={{ tr: 'Bir yetişkine danış', en: 'Ask a grown-up', ar: 'اسأل شخصاً كبيراً' }[locale]}
            body={{
              tr: 'Bir şey seni rahatsız ederse, kafa karıştırırsa, ya da yanlış bir şey gördüğünü düşünüyorsan, öğretmenine ya da güvendiğin bir yetişkine söyle. O sana nasıl yardım edeceğini bilir.',
              en: 'If something bothers you, confuses you, or seems wrong, tell your teacher or a grown-up you trust. They\'ll know how to help.',
              ar: 'إذا أزعجك شيء، أخبر معلمك أو شخصاً تثق به.',
            }[locale]}
          />
        </div>
      </section>

      {/* ═══════════════════ Yetişkin bölümü ═══════════════════ */}
      <section className="rounded-3xl bg-ink/5 border border-ink/10 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAdult((v) => !v)}
          aria-expanded={showAdult}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left
                     hover:bg-ink/8 transition"
        >
          <span className="flex items-center gap-3">
            <Lock className="text-ink/70" size={22} />
            <span className="font-display text-lg sm:text-xl font-extrabold text-ink">
              {{
                tr: 'Veliler ve Öğretmenler İçin',
                en: 'For Parents and Teachers',
                ar: 'للآباء والمعلمين',
              }[locale]}
            </span>
          </span>
          {showAdult ? <ChevronUp className="text-ink/60" /> : <ChevronDown className="text-ink/60" />}
        </button>

        {showAdult && (
          <div className="p-5 sm:p-7 bg-white border-t border-ink/10 space-y-6 leading-relaxed text-[15px] text-ink/80">
            <AdultSection
              title={{
                tr: 'Toplanan kişisel veri: yok',
                en: 'Personal data collected: none',
                ar: 'البيانات الشخصية المُجمّعة: لا شيء',
              }[locale]}
              body={{
                tr: 'JewelPedi Kids şu anda kayıtlı kullanıcı hesabı gerektirmez. Uygulama; ad, e-posta, doğum tarihi, okul adı, konum ve fotoğraf gibi kişisel olarak tanımlanabilir bilgi (PII) toplamaz. Quiz puanları, rozetler ve okunan sergiler gibi ilerleme verileri yalnızca tarayıcının localStorage alanında tutulur; sunucularımıza gönderilmez. Tarayıcı verisi kullanıcı kontrolündedir — site verisini temizlemek ilerlemeyi sıfırlar.',
                en: 'JewelPedi Kids currently requires no registered user account. The app collects no personally identifiable information (PII) — no name, email, birthdate, school name, location or photograph. Progress signals such as quiz scores, badges and viewed exhibits live only in the browser\'s localStorage and are never transmitted to our servers. Browser data stays under user control — clearing site data resets progress.',
                ar: 'لا تطلب JewelPedi Kids حسابات مسجلة ولا تجمع أي بيانات شخصية. درجات الاختبارات وشارات الإنجاز محفوظة في متصفح المستخدم فقط، ولا تُرسل إلى خوادمنا.',
              }[locale]}
            />

            <AdultSection
              title={{
                tr: 'COPPA uyumu (ABD, 13 yaş altı)',
                en: 'COPPA compliance (US, under 13)',
                ar: 'الامتثال لـCOPPA (الولايات المتحدة، دون 13)',
              }[locale]}
              body={{
                tr: '13 yaşından küçük çocuklara yönelik çevrimiçi hizmetler, ABD Çocukların Çevrimiçi Gizlilik Koruma Yasası (COPPA) kapsamında özel yükümlülüklere tabidir. JewelPedi Kids, tasarım gereği bu yaş grubundan kişisel veri talep etmez; oyunlar, quizler ve atölye içerikleri doğrulanabilir veli rızası (verifiable parental consent) gerektirmez çünkü hiçbir PII toplanmaz. Kullanıcı yüklemesi, liderlik tablosu veya hesap tabanlı bir özellik eklenmeden önce COPPA yükümlülükleri (veli bildirimi, rıza, erişim/silme hakkı) yeniden değerlendirilir.',
                en: 'Online services directed at children under 13 are subject to special obligations under the U.S. Children\'s Online Privacy Protection Act (COPPA). JewelPedi Kids is designed not to solicit personal information from this age group; games, quizzes and workshops do not require verifiable parental consent because no PII is collected. Before any user-upload, leaderboard or account-based feature is introduced, COPPA obligations (parental notice, consent, access/deletion rights) will be re-evaluated.',
                ar: 'الخدمات الموجهة للأطفال دون 13 في الولايات المتحدة تخضع لقانون COPPA. لا نجمع أي معلومات شخصية من هذه الفئة العمرية، لذا لا نحتاج موافقة ولي أمر.',
              }[locale]}
            />

            <AdultSection
              title={{
                tr: 'GDPR-K uyumu (AB, 16 yaş altı)',
                en: 'GDPR-K compliance (EU, under 16)',
                ar: 'الامتثال لـGDPR-K (الاتحاد الأوروبي، دون 16)',
              }[locale]}
              body={{
                tr: 'AB Genel Veri Koruma Tüzüğü\'nün 8. maddesi, bilgi toplumu hizmetlerinin çocuklara doğrudan sunulması durumunda 16 yaş altı çocuklar için veli rızası arar (üye devletler bu sınırı 13\'e kadar indirebilir). JewelPedi Kids kişisel veri işlemediği için GDPR 6(1)(a) anlamında rıza temeline dayanan bir işleme yapmaz. AB\'den erişen ziyaretçilerin çerez/localStorage yerleşimi teknik olarak "kesinlikle gerekli" (temanı hatırlamak, ilerlemeni saklamak) kapsamında kalır; izleme, reklam veya analitik profil çıkarma çerezi kullanılmaz.',
                en: 'Article 8 of the EU General Data Protection Regulation requires parental consent for children under 16 when information-society services are offered directly to them (member states may lower this to 13). Because JewelPedi Kids processes no personal data, no GDPR Art. 6(1)(a) consent-based processing takes place. For EU visitors, cookies/localStorage fall within "strictly necessary" scope (remembering your theme, storing your progress); no tracking, advertising or analytical profiling cookies are used.',
                ar: 'نظراً لأننا لا نعالج بيانات شخصية، فإن اللائحة GDPR-K لا تتطلب موافقة أولياء الأمور. لا نستخدم ملفات تعريف ارتباط للتتبع أو الإعلان.',
              }[locale]}
            />

            <AdultSection
              title={{
                tr: 'Çerezler ve yerel depolama',
                en: 'Cookies and local storage',
                ar: 'ملفات تعريف الارتباط والتخزين المحلي',
              }[locale]}
              body={{
                tr: 'Aşağıdaki tarayıcı depolama öğeleri yalnızca kullanıcı deneyimini sürdürmek için yerleşir: (1) `locale` — seçilen dil (TR/EN/AR); (2) `theme` — cream/dark tema tercihi; (3) `progress` — quiz puanları, rozetler ve görülen sergilerin listesi. Üçüncü taraf çerezleri yoktur; Google Analytics, Meta Pixel vb. izleyici yoktur. Kullanıcı, tarayıcı ayarları üzerinden bu verileri dilediği zaman silebilir.',
                en: 'The following browser-storage items are placed solely to preserve the user experience: (1) `locale` — chosen language (TR/EN/AR); (2) `theme` — cream/dark theme preference; (3) `progress` — quiz scores, badges and viewed-exhibits list. No third-party cookies; no Google Analytics, Meta Pixel or similar trackers. Users can erase this data at any time via browser settings.',
                ar: 'نستخدم تخزين المتصفح لحفظ اللغة والسمة والتقدم فقط. لا تتبع من طرف ثالث.',
              }[locale]}
            />

            <AdultSection
              title={{
                tr: 'Erişim, silme ve iletişim',
                en: 'Access, deletion and contact',
                ar: 'الوصول والحذف والتواصل',
              }[locale]}
              body={{
                tr: 'Tüm ilerleme verisi tarayıcı localStorage\'ında saklandığı için kullanıcı bu veriye doğrudan erişebilir ve site verisini temizleyerek silebilir. Herhangi bir sunucu veritabanı tutmadığımız için sunucu tarafında silinecek bir veri bulunmamaktadır. Gizlilik hakkında sorularınız için GitHub deposunda issue açabilir ya da proje bakımcılarına ulaşabilirsiniz: github.com/jewelpedi/jewelpedi-kids.',
                en: 'Because all progress lives in browser localStorage, users can directly inspect and erase it by clearing site data. Since we maintain no server-side database of user data, there is no server record to delete. For privacy questions, open a GitHub issue or contact the maintainers: github.com/jewelpedi/jewelpedi-kids.',
                ar: 'يمكن للمستخدمين حذف بياناتهم عبر إعدادات المتصفح. للأسئلة: github.com/jewelpedi/jewelpedi-kids.',
              }[locale]}
            />

            <AdultSection
              title={{
                tr: 'Gelecek özellikler için taahhüt',
                en: 'Commitment for future features',
                ar: 'التزام بالميزات المستقبلية',
              }[locale]}
              body={{
                tr: 'Rozet senkronizasyonu, sınıf modu, AR kamera, 3D tasarım paylaşımı gibi özellikler eklenmesi durumunda şu ilkeler korunacaktır: (a) gerçek isim ve okul adı varsayılan olarak istenmez; (b) kamera akışı cihaz dışına gönderilmez; (c) liderlik tabloları sınıf içi ve takma adla sınırlanır; (d) öğrenci üretimi içerikler yayımlanmadan önce öğretmen/veli moderasyonuna tabi tutulur; (e) çocuk odaklı bir gizlilik sayfası ayrıca yazılır ve veli bildirimi sağlanır. Bu politika değişikliğe uğradığında sürüm notu ve tarih CHANGELOG.md\'de yayımlanır.',
                en: 'If features such as cross-device badge sync, classroom mode, AR camera or 3D design sharing are added, these principles will be kept: (a) real names and school names are not collected by default; (b) camera streams never leave the device; (c) leaderboards are scoped to a classroom and use aliases; (d) student-generated content is moderated by teacher/parent before publication; (e) a child-facing privacy page is maintained and parental notice is provided. Policy changes will be documented in CHANGELOG.md with a version note and date.',
                ar: 'عند إضافة ميزات جديدة، نلتزم بعدم جمع الأسماء الحقيقية، وعدم إرسال الكاميرا خارج الجهاز، ولوحات المتصدرين محدودة بالفصل، ومحتوى الطلاب يخضع لإشراف المعلم.',
              }[locale]}
            />

            <p className="text-[12px] text-ink/55 italic pt-3 border-t border-ink/10">
              {{
                tr: 'Son güncelleme: Nisan 2026 — v1.0.',
                en: 'Last updated: April 2026 — v1.0.',
                ar: 'آخر تحديث: أبريل 2026 — الإصدار 1.0.',
              }[locale]}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ═════════════════════ Sub-components ═════════════════════ */
function KidPoint({ icon: Icon, color, title, body }) {
  return (
    <div className="flex gap-4">
      <div
        className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: `${color}18`, color }}
        aria-hidden
      >
        <Icon size={22} />
      </div>
      <div>
        <h3 className="font-bold text-ink text-[17px] mb-1">{title}</h3>
        <p className="text-ink/75 leading-relaxed text-[15px]">{body}</p>
      </div>
    </div>
  );
}

function AdultSection({ title, body }) {
  return (
    <div>
      <h3 className="font-display font-extrabold text-ink text-[17px] mb-1.5">{title}</h3>
      <p className="text-ink/75 leading-relaxed">{body}</p>
    </div>
  );
}
