import { useState, useEffect, useMemo } from 'react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import {
  Search, Check, RotateCcw, Scale, Droplet, Lightbulb,
  Palette, Sparkles, FileText, ChevronRight,
} from 'lucide-react';
import { cx } from '../../utils/helpers.js';

/*
 * VirtualGemologist — Faz 7 (Raporun 3. bölümünün 1. önerisi)
 *
 * Öğrenci bilinmeyen bir taşı 5 farklı testle kimliklendirir:
 *   1. Mohs sertlik testi         (çizik deneyleri)
 *   2. Renk gözlemi               (görsel sınıflandırma)
 *   3. Yoğunluk hesabı            (kütle ÷ hacim)
 *   4. UV floresans               (mor ışık altında parıltı)
 *   5. Optik özellik              (çift kırılma / pleokroizm)
 *
 * Her test öğrenciye VERİ verir; son adımda öğrenci kanıtları birleştirip
 * bir tanı yapar. Doğruysa "Gemolog Raporu" üretilir. Yanlışsa hangi testin
 * yanlış yorumlandığını gösteren bir geri bildirim çıkar.
 *
 * Kazanım: Kanıta dayalı sınıflandırma, gözlem–hipotez–sonuç döngüsü,
 * mineral özelliklerinin bağımsız ama ilişkili ölçütler olduğunu anlama.
 *
 * MEB: FB.6.4.3.3 (renk/ışık), KİM.9.2.8 (katıların özellikleri)
 * NGSS: 5-PS1-3 (malzeme özellikleriyle tanıma)
 */

// ═══════════════════ Taş veritabanı ═══════════════════
const STONES = [
  {
    id: 'diamond',
    name: { tr: 'Pırlanta (Elmas)', en: 'Diamond', ar: 'ماس' },
    mohs: 10,
    colorFamily: 'colorless',
    color: '#eaf4ff',
    density: 3.52,
    uv: 'blue',
    optic: 'isotropic',
    clue: {
      tr: 'Sen bir kuyumcuya gittin. Bir taş getirdin. "Bu pırlanta mı, yoksa bir sahte mi?" diyor müşteri.',
      en: 'You\'re at a jeweler\'s. A client brings a stone: "Is this a real diamond or an imitation?"',
      ar: 'أحضر زبون حجراً: "هل هذا ماس حقيقي؟"',
    },
  },
  {
    id: 'ruby',
    name: { tr: 'Yakut', en: 'Ruby', ar: 'ياقوت' },
    mohs: 9,
    colorFamily: 'red',
    color: '#c0392b',
    density: 4.0,
    uv: 'red',
    optic: 'birefringent',
    clue: {
      tr: 'Bir kızıl taş. Garnet olabilir mi, yakut mu? İkisi de kırmızı görünüyor.',
      en: 'A red stone. Garnet? Ruby? Both look red.',
      ar: 'حجر أحمر. عقيق أم ياقوت؟',
    },
  },
  {
    id: 'emerald',
    name: { tr: 'Zümrüt', en: 'Emerald', ar: 'زمرد' },
    mohs: 7.5,
    colorFamily: 'green',
    color: '#27ae60',
    density: 2.72,
    uv: 'inert',
    optic: 'birefringent',
    clue: {
      tr: 'Yeşil bir taş. Ustaya geldi. Peridot mu yoksa zümrüt mü? Rengi neredeyse aynı.',
      en: 'A green stone on the bench. Peridot or emerald? Colors look alike.',
      ar: 'حجر أخضر. زبرجد أم زمرد؟',
    },
  },
  {
    id: 'sapphire',
    name: { tr: 'Safir', en: 'Sapphire', ar: 'صفير' },
    mohs: 9,
    colorFamily: 'blue',
    color: '#1f4e8f',
    density: 4.0,
    uv: 'inert',
    optic: 'birefringent',
    clue: {
      tr: 'Koyu mavi bir taş. Tanzanit mi? Safir mi? Sertlik ve yoğunluk farkı belirleyici olabilir.',
      en: 'A deep blue stone. Tanzanite or sapphire? Hardness and density will decide.',
      ar: 'حجر أزرق داكن. تنزانيت أم صفير؟',
    },
  },
  {
    id: 'amethyst',
    name: { tr: 'Ametist', en: 'Amethyst', ar: 'أميثيست' },
    mohs: 7,
    colorFamily: 'purple',
    color: '#7d3c98',
    density: 2.65,
    uv: 'inert',
    optic: 'birefringent',
    clue: {
      tr: 'Mor bir taş. İolit mi, ametist mi? Ametist daha yumuşak ve spesifik bir yoğunluğa sahip.',
      en: 'A purple stone. Iolite or amethyst? Amethyst is softer and has a specific density.',
      ar: 'حجر بنفسجي. أيوليت أم أميثيست؟',
    },
  },
];

// ═══════════════════ Test komşuları (seçenek havuzu) ═══════════════════
const OPTIONS_FOR = {
  diamond:  ['diamond', 'quartz', 'moissanite', 'zircon'],
  ruby:     ['ruby', 'garnet', 'spinel', 'red-glass'],
  emerald:  ['emerald', 'peridot', 'green-tourmaline', 'green-glass'],
  sapphire: ['sapphire', 'tanzanite', 'blue-topaz', 'blue-glass'],
  amethyst: ['amethyst', 'iolite', 'purple-fluorite', 'glass'],
};

const OPTION_LABELS = {
  diamond:           { tr: 'Pırlanta',       en: 'Diamond',          ar: 'ماس' },
  quartz:            { tr: 'Kuvars',         en: 'Quartz',           ar: 'كوارتز' },
  moissanite:        { tr: 'Moissanite',     en: 'Moissanite',       ar: 'موسانيت' },
  zircon:            { tr: 'Zirkon',         en: 'Zircon',           ar: 'زركون' },
  ruby:              { tr: 'Yakut',          en: 'Ruby',             ar: 'ياقوت' },
  garnet:            { tr: 'Garnet',         en: 'Garnet',           ar: 'عقيق' },
  spinel:            { tr: 'Spinel',         en: 'Spinel',           ar: 'سبينل' },
  'red-glass':       { tr: 'Kırmızı Cam',    en: 'Red Glass',        ar: 'زجاج أحمر' },
  emerald:           { tr: 'Zümrüt',         en: 'Emerald',          ar: 'زمرد' },
  peridot:           { tr: 'Peridot',        en: 'Peridot',          ar: 'بريدوت' },
  'green-tourmaline':{ tr: 'Yeşil Turmalin', en: 'Green Tourmaline', ar: 'تورمالين أخضر' },
  'green-glass':     { tr: 'Yeşil Cam',      en: 'Green Glass',      ar: 'زجاج أخضر' },
  sapphire:          { tr: 'Safir',          en: 'Sapphire',         ar: 'صفير' },
  tanzanite:         { tr: 'Tanzanit',       en: 'Tanzanite',        ar: 'تنزانيت' },
  'blue-topaz':      { tr: 'Mavi Topaz',     en: 'Blue Topaz',       ar: 'توباز أزرق' },
  'blue-glass':      { tr: 'Mavi Cam',       en: 'Blue Glass',       ar: 'زجاج أزرق' },
  amethyst:          { tr: 'Ametist',        en: 'Amethyst',         ar: 'أميثيست' },
  iolite:            { tr: 'İolit',          en: 'Iolite',           ar: 'أيوليت' },
  'purple-fluorite': { tr: 'Mor Florit',     en: 'Purple Fluorite',  ar: 'فلوريت بنفسجي' },
  glass:             { tr: 'Cam',            en: 'Glass',            ar: 'زجاج' },
};

const STEPS = ['intro', 'mohs', 'color', 'density', 'uv', 'optic', 'identify', 'report'];

// ═══════════════════ Ana bileşen ═══════════════════
export default function VirtualGemologist() {
  const { locale } = useLocale();
  const { completeLab, labsCompleted } = useProgress();

  const [stoneId, setStoneId] = useState(() => {
    // rastgele taş seç
    return STONES[Math.floor(Math.random() * STONES.length)].id;
  });
  const [stepIdx, setStepIdx] = useState(0);
  const [evidence, setEvidence] = useState({});
  const [guess, setGuess] = useState(null);

  const stone = useMemo(() => STONES.find((s) => s.id === stoneId), [stoneId]);
  const stepName = STEPS[stepIdx];

  useEffect(() => {
    if (!labsCompleted.has('virtual-gemologist')) {
      completeLab('virtual-gemologist');
    }
  }, [completeLab, labsCompleted]);

  const L = STRINGS[locale] || STRINGS.tr;

  const recordEvidence = (key, value) => {
    setEvidence((e) => ({ ...e, [key]: value }));
  };

  const next = () => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));

  const reset = () => {
    const newStone = STONES[Math.floor(Math.random() * STONES.length)];
    setStoneId(newStone.id);
    setStepIdx(0);
    setEvidence({});
    setGuess(null);
  };

  const submitGuess = (id) => {
    setGuess(id);
    setStepIdx(STEPS.indexOf('report'));
  };

  const correct = guess === stone.id;

  return (
    <div className="space-y-6">
      {/* Step progress */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5 shrink-0">
            <span
              className={cx(
                'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold',
                i < stepIdx
                  ? 'bg-emerald-500 text-white'
                  : i === stepIdx
                  ? 'bg-ink text-cream ring-4 ring-ink/15'
                  : 'bg-ink/10 text-ink/50',
              )}
            >
              {i < stepIdx ? <Check size={12} /> : i + 1}
            </span>
            {i < STEPS.length - 1 && (
              <span className={cx('w-4 h-[2px]', i < stepIdx ? 'bg-emerald-500' : 'bg-ink/10')} />
            )}
          </div>
        ))}
      </div>

      {/* Step card */}
      {stepName === 'intro' && (
        <StepCard title={L.intro.title} icon={Search}>
          <p className="mb-4">{stone.clue[locale]}</p>
          <div
            className="mx-auto mb-4 w-24 h-24 rounded-full shadow-museum ring-4 ring-white"
            style={{ background: stone.color, filter: 'brightness(1.1)' }}
            aria-label={L.intro.stoneAlt}
          />
          <p className="text-ink/70 text-sm mb-5">{L.intro.body}</p>
          <button onClick={next} className={BTN_PRIMARY}>
            {L.intro.start} <ChevronRight size={14} />
          </button>
        </StepCard>
      )}

      {stepName === 'mohs' && (
        <StepCard title={L.mohs.title} icon={Sparkles}>
          <p className="text-ink/70 mb-4">{L.mohs.prompt}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { tool: 'fingernail', mohs: 2.5, label: L.mohs.tools.fingernail },
              { tool: 'copper',     mohs: 3,   label: L.mohs.tools.copper },
              { tool: 'glass',      mohs: 5.5, label: L.mohs.tools.glass },
              { tool: 'steel',      mohs: 6.5, label: L.mohs.tools.steel },
              { tool: 'sandpaper',  mohs: 7,   label: L.mohs.tools.sandpaper },
            ].map((t) => {
              const result = stone.mohs > t.mohs
                ? L.mohs.scratches
                : stone.mohs < t.mohs
                ? L.mohs.isScratched
                : L.mohs.tied;
              return (
                <div
                  key={t.tool}
                  className="flex items-center justify-between gap-2 p-2.5
                             rounded-xl bg-ink/3 border border-ink/8 text-sm"
                >
                  <span className="font-bold text-ink/80">{t.label}</span>
                  <span className="text-ink/60">{result}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm font-bold text-ink">
            {L.mohs.conclusion.replace('{v}', stone.mohs)}
          </p>
          <button
            onClick={() => { recordEvidence('mohs', stone.mohs); next(); }}
            className={BTN_PRIMARY + ' mt-4'}
          >
            {L.common.next} <ChevronRight size={14} />
          </button>
        </StepCard>
      )}

      {stepName === 'color' && (
        <StepCard title={L.color.title} icon={Palette}>
          <p className="text-ink/70 mb-4">{L.color.prompt}</p>
          <div
            className="mx-auto w-32 h-32 rounded-full shadow-museum ring-4 ring-white mb-4"
            style={{ background: stone.color }}
          />
          <p className="text-center font-bold text-lg mb-2">
            {L.color.families[stone.colorFamily]}
          </p>
          <p className="text-sm text-ink/70">{L.color.note}</p>
          <button
            onClick={() => { recordEvidence('color', stone.colorFamily); next(); }}
            className={BTN_PRIMARY + ' mt-4'}
          >
            {L.common.next} <ChevronRight size={14} />
          </button>
        </StepCard>
      )}

      {stepName === 'density' && (
        <StepCard title={L.density.title} icon={Scale}>
          <p className="text-ink/70 mb-4">{L.density.prompt}</p>
          <div className="grid sm:grid-cols-3 gap-3 text-center">
            <Stat label={L.density.mass} value={(stone.density * 2).toFixed(1) + ' g'} />
            <Stat label={L.density.volume} value={'2.0 cm³'} />
            <Stat label={L.density.density} value={stone.density.toFixed(2) + ' g/cm³'} emphasis />
          </div>
          <p className="mt-4 text-sm text-ink/70">{L.density.scaleNote}</p>
          <button
            onClick={() => { recordEvidence('density', stone.density); next(); }}
            className={BTN_PRIMARY + ' mt-4'}
          >
            {L.common.next} <ChevronRight size={14} />
          </button>
        </StepCard>
      )}

      {stepName === 'uv' && (
        <StepCard title={L.uv.title} icon={Lightbulb}>
          <p className="text-ink/70 mb-4">{L.uv.prompt}</p>
          <div
            className="mx-auto w-40 h-40 rounded-2xl shadow-museum relative overflow-hidden"
            style={{ background: '#0a0a14' }}
          >
            <div
              className="absolute inset-0 m-auto w-24 h-24 rounded-full"
              style={{
                background: stone.uv === 'blue'
                  ? 'radial-gradient(#8ec5ff, #1f3f8f 70%)'
                  : stone.uv === 'red'
                  ? 'radial-gradient(#ffb3ba, #c0392b 70%)'
                  : stone.color,
                filter: stone.uv === 'inert' ? 'brightness(0.4)' : 'brightness(1.3)',
                top: 0, left: 0, right: 0, bottom: 0,
              }}
            />
          </div>
          <p className="text-center mt-3 font-bold text-ink">
            {L.uv.results[stone.uv]}
          </p>
          <button
            onClick={() => { recordEvidence('uv', stone.uv); next(); }}
            className={BTN_PRIMARY + ' mt-4'}
          >
            {L.common.next} <ChevronRight size={14} />
          </button>
        </StepCard>
      )}

      {stepName === 'optic' && (
        <StepCard title={L.optic.title} icon={Droplet}>
          <p className="text-ink/70 mb-4">{L.optic.prompt}</p>
          <p className="text-center font-bold text-lg mb-3 text-ink">
            {L.optic.results[stone.optic]}
          </p>
          <p className="text-sm text-ink/70">{L.optic.note}</p>
          <button
            onClick={() => { recordEvidence('optic', stone.optic); next(); }}
            className={BTN_PRIMARY + ' mt-4'}
          >
            {L.common.next} <ChevronRight size={14} />
          </button>
        </StepCard>
      )}

      {stepName === 'identify' && (
        <StepCard title={L.identify.title} icon={Search}>
          <p className="text-ink/70 mb-4">{L.identify.prompt}</p>
          <EvidenceRecap evidence={evidence} stone={stone} L={L} />
          <div className="mt-5 space-y-2">
            {OPTIONS_FOR[stone.id].map((optId) => (
              <button
                key={optId}
                onClick={() => submitGuess(optId)}
                className="w-full text-left px-4 py-3 rounded-xl bg-white
                           border-2 border-ink/10 hover:border-gold hover:bg-gold/5
                           font-bold text-ink transition flex items-center justify-between"
              >
                <span>{OPTION_LABELS[optId]?.[locale] || optId}</span>
                <ChevronRight size={16} className="text-ink/40" />
              </button>
            ))}
          </div>
        </StepCard>
      )}

      {stepName === 'report' && (
        <StepCard
          title={correct ? L.report.success : L.report.failure}
          icon={FileText}
          tone={correct ? 'emerald' : 'amber'}
        >
          <p className="text-ink/80 mb-4">
            {correct ? L.report.successBody : L.report.failureBody}
          </p>
          <div className="rounded-2xl bg-parchment/60 p-4 border border-ink/10 space-y-2 text-sm">
            <ReportLine label={L.report.actualIdentity} value={stone.name[locale]} />
            <ReportLine label={L.report.yourGuess} value={OPTION_LABELS[guess]?.[locale] || guess} />
            <ReportLine label={L.mohs.title} value={stone.mohs} />
            <ReportLine label={L.density.density} value={stone.density + ' g/cm³'} />
            <ReportLine label={L.uv.title} value={L.uv.results[stone.uv]} />
            <ReportLine label={L.optic.title} value={L.optic.results[stone.optic]} />
          </div>
          <button onClick={reset} className={BTN_PRIMARY + ' mt-5'}>
            <RotateCcw size={14} /> {L.report.tryAnother}
          </button>
        </StepCard>
      )}
    </div>
  );
}

// ═══════════════════ Yardımcı bileşenler ═══════════════════
const BTN_PRIMARY =
  'inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-cream ' +
  'text-sm font-extrabold uppercase tracking-wider hover:bg-ink/85 transition';

function StepCard({ title, icon: Icon, tone = 'default', children }) {
  const toneStyles = {
    default: 'bg-white border-ink/10',
    emerald: 'bg-emerald-50 border-emerald-200',
    amber:   'bg-amber-50 border-amber-200',
  };
  return (
    <div className={cx('rounded-3xl border p-5 sm:p-7 shadow-museum', toneStyles[tone])}>
      <h3 className="flex items-center gap-2 font-display text-xl font-extrabold text-ink mb-4">
        <Icon size={20} className="text-gold" />
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Stat({ label, value, emphasis }) {
  return (
    <div className={cx(
      'rounded-xl p-3 border',
      emphasis ? 'bg-gold/10 border-gold/40' : 'bg-ink/3 border-ink/10',
    )}>
      <div className="text-[11px] uppercase tracking-wider text-ink/60 font-bold">{label}</div>
      <div className={cx('font-display font-extrabold text-lg mt-1', emphasis ? 'text-gold' : 'text-ink')}>
        {value}
      </div>
    </div>
  );
}

function EvidenceRecap({ evidence, stone, L }) {
  const items = [
    { label: L.mohs.title,       value: evidence.mohs + ' / 10' },
    { label: L.color.title,      value: L.color.families[evidence.color] || '—' },
    { label: L.density.density,  value: evidence.density + ' g/cm³' },
    { label: L.uv.title,         value: L.uv.results[evidence.uv] || '—' },
    { label: L.optic.title,      value: L.optic.results[evidence.optic] || '—' },
  ];
  return (
    <div className="rounded-2xl bg-ink/3 p-4 border border-ink/10 space-y-1.5 text-sm">
      <div className="font-bold text-ink/80 mb-1.5">{L.identify.evidenceTitle}</div>
      {items.map((it) => (
        <div key={it.label} className="flex justify-between">
          <span className="text-ink/60">{it.label}</span>
          <span className="font-bold text-ink">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

function ReportLine({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-ink/60">{label}</span>
      <span className="font-bold text-ink text-right">{value}</span>
    </div>
  );
}

// ═══════════════════ Trilingual strings ═══════════════════
const STRINGS = {
  tr: {
    intro: {
      title: 'Sanal Gemolog Atölyesi',
      body: 'Elinde bilinmeyen bir taş var. 5 testle kimliğini bulacaksın: sertlik, renk, yoğunluk, UV, optik. Hazır mısın?',
      start: 'Başla',
      stoneAlt: 'Bilinmeyen bir taş',
    },
    mohs: {
      title: '1. Sertlik (Mohs)',
      prompt: 'Farklı aletlerle taşı deneyelim. Hangisi hangisini çizebiliyor?',
      scratches: '→ Taş aleti çizdi',
      isScratched: '→ Alet taşı çizdi',
      tied: '→ İkisi birbirini çizer',
      conclusion: 'Sonuç: Taşın sertliği yaklaşık {v}/10.',
      tools: {
        fingernail: 'Tırnak (2.5)',
        copper: 'Bakır para (3)',
        glass: 'Cam (5.5)',
        steel: 'Çelik bıçak (6.5)',
        sandpaper: 'Zımpara (7)',
      },
    },
    color: {
      title: '2. Renk',
      prompt: 'Taşı beyaz bir ışık altında gözlemle. Hangi renk ailesinde?',
      note: 'Not: Renk tek başına tanı için yeterli değil; birçok farklı taş benzer renkte olabilir.',
      families: {
        colorless: 'Renksiz / beyaz',
        red: 'Kırmızı',
        green: 'Yeşil',
        blue: 'Mavi',
        purple: 'Mor',
      },
    },
    density: {
      title: '3. Yoğunluk',
      prompt: 'Taşı hassas terazide tart, sonra mezürde suya daldır. Yoğunluk = kütle ÷ hacim.',
      mass: 'Kütle',
      volume: 'Hacim',
      density: 'Yoğunluk',
      scaleNote: 'Karşılaştır: su 1.0, kuvars 2.65, safir 4.0, pırlanta 3.52 g/cm³.',
    },
    uv: {
      title: '4. UV Floresans',
      prompt: 'Taşı karanlık bir kutuda UV (mor) ışık altına tut. Parlıyor mu?',
      results: {
        blue: 'Mavi parıltı',
        red: 'Kırmızı parıltı',
        inert: 'Parlamıyor (inert)',
      },
    },
    optic: {
      title: '5. Optik Özellik',
      prompt: 'Taşı polariskopla döndürerek ışığın nasıl davrandığını gözlemle.',
      note: 'Tek kırılımlı (izotropik) taşlar: elmas, garnet, spinel. Çift kırılımlılar: kuvars, safir, yakut.',
      results: {
        isotropic: 'Tek kırılımlı (izotropik)',
        birefringent: 'Çift kırılımlı',
      },
    },
    identify: {
      title: 'Kimlik Tanısı',
      prompt: 'Topladığın kanıtlara bak. Hangisi uyuyor?',
      evidenceTitle: 'Laboratuvar defteri:',
    },
    report: {
      success: '✓ Doğru tanı! Gemolog raporu hazır.',
      failure: '✗ Hata. Kanıtları yeniden incele.',
      successBody: 'Mükemmel gözlem. Testler birbirini destekledi ve doğru sonucu verdi.',
      failureBody: 'Tanın testlerin verdiği kanıtla uyuşmuyor. Yoğunluk ve sertlik en güvenilir iki testtir.',
      actualIdentity: 'Taşın kimliği',
      yourGuess: 'Senin tanın',
      tryAnother: 'Başka bir taş dene',
    },
    common: { next: 'Sonraki test' },
  },
  en: {
    intro: {
      title: 'Virtual Gemologist',
      body: 'You have an unknown stone. Run five tests — hardness, color, density, UV, optics — and identify it. Ready?',
      start: 'Start',
      stoneAlt: 'An unknown stone',
    },
    mohs: {
      title: '1. Hardness (Mohs)',
      prompt: 'Try different tools on the stone. Which scratches which?',
      scratches: '→ Stone scratched the tool',
      isScratched: '→ Tool scratched the stone',
      tied: '→ They scratch each other',
      conclusion: 'Result: the stone\'s hardness is about {v}/10.',
      tools: {
        fingernail: 'Fingernail (2.5)',
        copper: 'Copper coin (3)',
        glass: 'Glass (5.5)',
        steel: 'Steel knife (6.5)',
        sandpaper: 'Sandpaper (7)',
      },
    },
    color: {
      title: '2. Color',
      prompt: 'Observe the stone under white light. What color family?',
      note: 'Note: color alone is not enough — many different stones share a color.',
      families: {
        colorless: 'Colorless / white',
        red: 'Red',
        green: 'Green',
        blue: 'Blue',
        purple: 'Purple',
      },
    },
    density: {
      title: '3. Density',
      prompt: 'Weigh the stone, then displace water to find volume. Density = mass ÷ volume.',
      mass: 'Mass',
      volume: 'Volume',
      density: 'Density',
      scaleNote: 'Reference: water 1.0, quartz 2.65, sapphire 4.0, diamond 3.52 g/cm³.',
    },
    uv: {
      title: '4. UV Fluorescence',
      prompt: 'Place the stone in a dark box under UV (purple) light. Does it glow?',
      results: {
        blue: 'Blue glow',
        red: 'Red glow',
        inert: 'No glow (inert)',
      },
    },
    optic: {
      title: '5. Optical Property',
      prompt: 'Rotate the stone under a polariscope and observe how light behaves.',
      note: 'Single refraction (isotropic): diamond, garnet, spinel. Double refraction (birefringent): quartz, sapphire, ruby.',
      results: {
        isotropic: 'Single refraction (isotropic)',
        birefringent: 'Double refraction',
      },
    },
    identify: {
      title: 'Identify',
      prompt: 'Review the evidence. Which candidate fits best?',
      evidenceTitle: 'Lab notebook:',
    },
    report: {
      success: '✓ Correct identification! Gemologist report is ready.',
      failure: '✗ Not quite. Re-examine the evidence.',
      successBody: 'Excellent observation. The tests reinforced each other and led to the correct result.',
      failureBody: 'Your guess doesn\'t match the evidence. Density and hardness are the two most reliable tests.',
      actualIdentity: 'Stone identity',
      yourGuess: 'Your guess',
      tryAnother: 'Try another stone',
    },
    common: { next: 'Next test' },
  },
  ar: {
    intro: {
      title: 'ورشة الجيمولوجي الافتراضية',
      body: 'لديك حجر مجهول. أجرِ 5 اختبارات — صلابة، لون، كثافة، أشعة فوق بنفسجية، بصريات — لتعرفه. جاهز؟',
      start: 'ابدأ',
      stoneAlt: 'حجر مجهول',
    },
    mohs: {
      title: '1. الصلابة (موس)',
      prompt: 'جرّب أدوات مختلفة على الحجر. أيها يخدش الآخر؟',
      scratches: '→ الحجر خدش الأداة',
      isScratched: '→ الأداة خدشت الحجر',
      tied: '→ كلاهما متساويان',
      conclusion: 'النتيجة: صلابة الحجر حوالي {v}/10.',
      tools: {
        fingernail: 'ظفر (2.5)',
        copper: 'عملة نحاسية (3)',
        glass: 'زجاج (5.5)',
        steel: 'سكين فولاذي (6.5)',
        sandpaper: 'ورق صنفرة (7)',
      },
    },
    color: {
      title: '2. اللون',
      prompt: 'راقب الحجر تحت ضوء أبيض. إلى أي عائلة لونية ينتمي؟',
      note: 'ملاحظة: اللون وحده غير كافٍ — أحجار كثيرة تتشارك اللون.',
      families: {
        colorless: 'عديم اللون / أبيض',
        red: 'أحمر',
        green: 'أخضر',
        blue: 'أزرق',
        purple: 'بنفسجي',
      },
    },
    density: {
      title: '3. الكثافة',
      prompt: 'زن الحجر، ثم أزح الماء لإيجاد الحجم. الكثافة = الكتلة ÷ الحجم.',
      mass: 'الكتلة',
      volume: 'الحجم',
      density: 'الكثافة',
      scaleNote: 'مرجع: الماء 1.0، الكوارتز 2.65، الصفير 4.0، الماس 3.52 غ/سم³.',
    },
    uv: {
      title: '4. الفلورسنس (UV)',
      prompt: 'ضع الحجر في صندوق مظلم تحت ضوء بنفسجي. هل يتوهج؟',
      results: {
        blue: 'وهج أزرق',
        red: 'وهج أحمر',
        inert: 'لا يتوهج',
      },
    },
    optic: {
      title: '5. الخاصية البصرية',
      prompt: 'دوّر الحجر تحت المستقطب ولاحظ سلوك الضوء.',
      note: 'الانكسار الفردي: الماس، العقيق، السبينل. المزدوج: الكوارتز، الصفير، الياقوت.',
      results: {
        isotropic: 'انكسار فردي',
        birefringent: 'انكسار مزدوج',
      },
    },
    identify: {
      title: 'التعرف',
      prompt: 'راجع الأدلة. أي خيار يطابق؟',
      evidenceTitle: 'دفتر المختبر:',
    },
    report: {
      success: '✓ تحديد صحيح! تقرير الجيمولوجي جاهز.',
      failure: '✗ ليس تماماً. أعد فحص الأدلة.',
      successBody: 'ملاحظة ممتازة. الاختبارات تدعم بعضها وأدت للنتيجة الصحيحة.',
      failureBody: 'تخمينك لا يطابق الأدلة. الكثافة والصلابة أكثر الاختبارات موثوقية.',
      actualIdentity: 'هوية الحجر',
      yourGuess: 'تخمينك',
      tryAnother: 'جرب حجراً آخر',
    },
    common: { next: 'الاختبار التالي' },
  },
};
