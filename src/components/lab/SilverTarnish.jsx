import { useState, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

/**
 * Gümüş oksitlenme deneyi — 5 adımlı görsel anlatım.
 */
const steps = [
  {
    color: '#f4f4f5',
    ring: '#e4e4e7',
    tr: { t: 'Temiz Gümüş', d: 'Yeni bir gümüş takı pırıl pırıldır. Atomları düzenli bir kafes gibi dizilmiştir.' },
    en: { t: 'Clean Silver', d: 'A new silver piece shines brightly, its atoms arranged like a neat lattice.' },
    ar: { t: 'فضة نظيفة', d: 'قطعة فضية جديدة تلمع بقوة.' },
  },
  {
    color: '#fef3c7',
    ring: '#fde68a',
    tr: { t: 'Havayla Temas (1-7 gün)', d: 'Havadaki kükürt gazları gümüşle tepkimeye girmeye başlar. Yüzey hafif sararır.' },
    en: { t: 'Exposure (1-7 days)', d: 'Sulfur in the air starts reacting with silver. The surface turns slightly yellow.' },
    ar: { t: 'التعرض (1-7 أيام)', d: 'يبدأ الكبريت بالتفاعل مع الفضة.' },
  },
  {
    color: '#d97706',
    ring: '#b45309',
    tr: { t: 'Kararma Başlar (hafta sonrası)', d: 'Reaksiyon: 2Ag + H₂S → Ag₂S + H₂. Kahverengi tabaka oluşuyor.' },
    en: { t: 'Tarnish Begins (after a week)', d: 'Reaction: 2Ag + H₂S → Ag₂S + H₂. A brown layer forms.' },
    ar: { t: 'بداية التأكسد', d: 'تتكون طبقة بنية على السطح.' },
  },
  {
    color: '#3f3f46',
    ring: '#18181b',
    tr: { t: 'Tamamen Kararmış', d: 'Yüzey siyaha döner — ama bu sadece çok ince bir gümüş sülfür katmanıdır. İçerideki gümüş hâlâ sağlam.' },
    en: { t: 'Fully Tarnished', d: 'The surface turns black — but only a thin silver sulfide layer. The silver beneath is intact.' },
    ar: { t: 'تأكسد كامل', d: 'يصبح السطح أسود، لكن الفضة بالداخل سليمة.' },
  },
  {
    color: '#f8fafc',
    ring: '#cbd5e1',
    tr: { t: 'Temizleme!', d: 'Alüminyum folyoya sar, kaynar tuzlu suya koy. Kimyasal tepkime kükürdü alüminyuma aktarır ve gümüş yeniden parlar ✨' },
    en: { t: 'Cleaning!', d: 'Wrap in aluminum foil, dip in hot salt water. A redox reaction transfers sulfur to the aluminum — silver shines again ✨' },
    ar: { t: 'التنظيف!', d: 'باستخدام ورق الألمنيوم والماء المالح الساخن، تعود الفضة لتلمع.' },
  },
];

export default function SilverTarnish() {
  const { locale } = useLocale();
  const { completeLab } = useProgress();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === steps.length - 1) completeLab('tarnish');
  }, [step, completeLab]);

  const current = steps[step];
  const text = current[locale] || current.tr;
  const stepLabel = { tr: 'Adım', en: 'Step', ar: 'الخطوة' }[locale] || 'Adım';

  return (
    <div>
      {/* Step indicator dots */}
      <div className="flex items-center gap-2 mb-5" role="tablist">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            role="tab"
            aria-selected={i === step}
            className={`h-2.5 rounded-full transition-all ${
              i === step ? 'w-10 bg-ink' : 'w-2.5 bg-ink/20 hover:bg-ink/40'
            }`}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
        {/* Visual */}
        <div
          className="w-44 h-44 rounded-full mx-auto transition-all duration-700 ease-out shadow-stand"
          style={{
            background: `radial-gradient(circle at 32% 30%, color-mix(in srgb, ${current.color} 60%, white), ${current.color} 75%)`,
            boxShadow: `0 0 0 10px ${current.ring}22, 0 16px 40px -12px ${current.ring}80`,
          }}
          aria-hidden
        />

        {/* Text */}
        <div>
          <span className="text-[11px] uppercase tracking-widest font-extrabold text-ink/50">
            {stepLabel} {step + 1} / {steps.length}
          </span>
          <h3 className="font-display text-2xl font-extrabold text-ink mt-1 mb-2 animate-fadeUp">
            {text.t}
          </h3>
          <p className="text-ink/70 leading-relaxed animate-fadeUp">{text.d}</p>

          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-3 py-2 rounded-full bg-ink/5 font-bold text-ink/70 hover:bg-ink/10
                         disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="px-4 py-2 rounded-full bg-ink text-cream font-bold hover:bg-ink/90
                         disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setStep(0)}
              className="ml-auto text-xs font-bold text-ink/50 hover:text-ink inline-flex items-center gap-1"
            >
              <RefreshCw size={12} />
              {{ tr: 'Baştan', en: 'Restart', ar: 'إعادة' }[locale] || 'Baştan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
