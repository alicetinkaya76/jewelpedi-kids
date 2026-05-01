import { useReducer, useMemo, useRef, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useSound } from '../audio/SoundContext.jsx';
import ScoreBoard from '../components/game/ScoreBoard.jsx';
import { GemIcon } from '../components/icons/gems/index.js';
import { pick, cx } from '../utils/helpers.js';
import { METALS, STONES, CUTS, SETTINGS, CARATS, calcPrice, evaluate } from '../utils/pricing.js';
import { pickRandomCustomers } from '../data/customers.js';
import { Check, AlertCircle, ChevronRight, Star } from 'lucide-react';

/**
 * JewelerShop — design-a-ring simulation with customer feedback.
 *
 * Turns per difficulty:
 *   Çırak → 1 customer, simple brief (budget only)
 *   Kalfa → 1 customer, full brief (budget + style + allergy)
 *   Usta  → 5 customers (shift), time pressure 60s each
 *
 * State machine (useReducer):
 *   briefing   — customer speaks, "Başla" button
 *   designing  — 4 pickers + live price panel + "Sun" button
 *   feedback   — evaluation shown, "Sıradaki / Bitir" button
 *
 * When customer N is settled, the shift sum adds to running score.
 * Full 5/5 perfect shift on Usta → 'master-jeweler' badge.
 */

const initial = (difficulty) => ({
  phase: 'briefing',
  difficulty,
  queue: [],             // customers for this shift
  curIdx: 0,
  design: {
    metalId: '18k',
    stoneId: 'diamond',
    cutId: 'brilliant',
    settingId: 'solitaire',
    carats: 0.5,
  },
  feedback: null,        // result of last evaluate()
  totalStars: 0,
  perShift: [],          // [{ stars, total }]
  customersTotal: 0,
});

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return {
        ...initial(action.difficulty),
        queue: action.queue,
        customersTotal: action.queue.length,
      };
    case 'SET_FIELD':
      return { ...state, design: { ...state.design, [action.field]: action.value } };
    case 'START':
      return { ...state, phase: 'designing' };
    case 'SUBMIT':
      return { ...state, phase: 'feedback', feedback: action.feedback };
    case 'NEXT': {
      const prev = [...state.perShift, { stars: state.feedback.total, idx: state.curIdx }];
      const next = state.curIdx + 1;
      return {
        ...state,
        curIdx: next,
        phase: 'briefing',
        totalStars: state.totalStars + state.feedback.total,
        perShift: prev,
        feedback: null,
        // Reset design for next customer (keeps their previous choice fatigue
        // from leaking across; a real clerk would start fresh)
        design: initial(state.difficulty).design,
      };
    }
    default: return state;
  }
}

function buildQueue(difficulty) {
  if (difficulty === 'usta') return pickRandomCustomers(5);
  return pickRandomCustomers(1);
}

export default function JewelerShop({ difficulty, accent, onFinish }) {
  const { locale } = useLocale();
  const { play } = useSound();
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const [state, dispatch] = useReducer(reducer, initial(difficulty));

  /* Initialize queue once on mount. */
  useEffect(() => {
    dispatch({ type: 'INIT', difficulty, queue: buildQueue(difficulty) });
  }, [difficulty]);

  const customer = state.queue[state.curIdx];
  const isLastCustomer = state.curIdx + 1 >= state.customersTotal;

  /* Derived price — recomputed on design change. */
  const price = useMemo(() => calcPrice(state.design), [state.design]);

  /* On completion — push final payload to shell. */
  const finalize = (lastFeedback) => {
    const totalStars = state.totalStars + (lastFeedback?.total || 0);
    const maxStars = state.customersTotal * 15;
    const perfectCount = [...state.perShift, { stars: lastFeedback?.total || 0 }]
      .filter((p) => p.stars >= 15).length;

    const finalScore = totalStars * 5;  // scale stars to a score-ish number
    const won = difficulty === 'usta' &&
                perfectCount === state.customersTotal &&
                state.customersTotal >= 5;

    onFinishRef.current({
      score: finalScore,
      won,
      bestOf: maxStars * 5,
      summary: {
        tr: `${totalStars}/${maxStars} yıldız kazandın (${perfectCount}/${state.customersTotal} mükemmel müşteri).`,
        en: `Earned ${totalStars}/${maxStars} stars (${perfectCount}/${state.customersTotal} perfect customers).`,
        ar: `${totalStars}/${maxStars} نجوم (${perfectCount}/${state.customersTotal} زبون مثالي).`,
      },
      blurb: {
        tr: 'Türkiye\'de düğün yüzüklerinde geleneksel olarak 22 ayar altın tercih edilir (kolay şekillendirilir, sarı tonu kuvvetli). Ama 18 ayar daha dayanıklıdır: her gün giyilen yüzükler için ideal. 14 ayar en ucuzdur ama nikel içerebilir — alerji bildiren müşterilere dikkat! Platin en dayanıklı ama en pahalı; nikel içermez.',
        en: 'In Turkey, wedding rings are traditionally 22k gold (easily shaped, rich yellow). But 18k is more durable — ideal for everyday wear. 14k is cheapest but may contain nickel — beware allergy reports! Platinum is toughest and hypoallergenic but most expensive.',
        ar: 'الذهب 22 قيراطاً تقليدي في تركيا، لكن 18 قيراطاً أصلب للاستعمال اليومي. 14 قيراطاً قد يحتوي نيكل. البلاتين الأصلب والأغلى، وهو آمن للحساسية.',
      },
      breakdown: [
        { label: { tr: 'Yıldız', en: 'Stars', ar: 'نجوم' },           value: `${totalStars}/${maxStars}` },
        { label: { tr: 'Mükemmel', en: 'Perfect', ar: 'مثالي' },       value: `${perfectCount}/${state.customersTotal}` },
        { label: { tr: 'Zorluk', en: 'Difficulty', ar: 'الصعوبة' },    value: { cirak: 'Çırak', kalfa: 'Kalfa', usta: 'Usta' }[difficulty] },
      ],
    });
  };

  /* "Sun" action handler. */
  const submit = () => {
    const feedback = evaluate(state.design, customer);
    if (feedback.total >= 12) play?.('success');
    else if (feedback.total <= 5) play?.('error');
    else play?.('reveal');
    dispatch({ type: 'SUBMIT', feedback });
  };

  const advance = () => {
    if (isLastCustomer) {
      finalize(state.feedback);
      return;
    }
    dispatch({ type: 'NEXT' });
    play?.('page-turn');
  };

  if (!customer) {
    return <div className="text-center py-20 text-ink/60">Yükleniyor...</div>;
  }

  const showAllergy = difficulty !== 'cirak' && customer.allergy;
  const showStyle = difficulty !== 'cirak';

  return (
    <div className="space-y-4">
      <ScoreBoard
        score={state.totalStars * 5}
        accent={accent}
        extra={
          <span>
            {{ tr: 'Müşteri', en: 'Customer', ar: 'زبون' }[locale]} {state.curIdx + 1}/{state.customersTotal}
            {' · '}
            <Star size={11} className="inline -mt-0.5 text-gold" fill="currentColor" /> {state.totalStars}
          </span>
        }
      />

      {/* Customer brief bubble */}
      <div
        className="rounded-3xl border shadow-museum p-5 bg-white"
        style={{ borderLeftWidth: 6, borderLeftColor: accent }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0"
            style={{ background: `color-mix(in srgb, ${accent} 15%, white)` }}
            aria-hidden="true"
          >
            {customer.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display font-extrabold text-ink text-lg">
              {pick(customer.name, locale)}
            </div>
            <p className="text-ink/80 text-sm leading-relaxed mt-1">
              "{pick(customer.quote, locale)}"
            </p>

            {/* Brief summary chips */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-2.5 py-1 rounded-full bg-gold-soft text-ink">
                💰 ₺{customer.budget.toLocaleString()}
              </span>
              {showStyle && (
                <span className="px-2.5 py-1 rounded-full bg-jewel/10 text-jewel">
                  {customer.style === 'classical'
                    ? { tr: '✨ Klasik', en: '✨ Classical', ar: '✨ كلاسيكي' }[locale]
                    : { tr: '🎨 Modern', en: '🎨 Modern', ar: '🎨 عصري' }[locale]}
                </span>
              )}
              {showAllergy && (
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                  {{ tr: '⚠️ Nikel alerjisi', en: '⚠️ Nickel allergy', ar: '⚠️ حساسية نيكل' }[locale]}
                </span>
              )}
            </div>
          </div>
        </div>

        {state.phase === 'briefing' && (
          <button
            type="button"
            onClick={() => { dispatch({ type: 'START' }); play?.('reveal'); }}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
                       text-cream font-extrabold font-display shadow-museum"
            style={{ background: accent }}
          >
            {{ tr: 'Tasarıma başla', en: 'Start designing', ar: 'ابدأ التصميم' }[locale]}
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Designing phase */}
      {state.phase === 'designing' && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left column: pickers */}
            <div className="space-y-3">
              <Picker
                label={{ tr: 'Metal', en: 'Metal', ar: 'المعدن' }}
                options={METALS}
                value={state.design.metalId}
                onChange={(v) => { dispatch({ type: 'SET_FIELD', field: 'metalId', value: v }); play?.('click'); }}
                renderOpt={(m) => (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ background: m.tone }} aria-hidden="true" />
                    <span>{pick(m.name, locale)}</span>
                    {m.allergenic && (
                      <span
                        className="text-[9px] font-bold text-red-600"
                        title="May contain nickel"
                        aria-label="May contain nickel"
                      >
                        Ni
                      </span>
                    )}
                  </span>
                )}
              />
              <Picker
                label={{ tr: 'Ana Taş', en: 'Main Stone', ar: 'الحجر الرئيسي' }}
                options={STONES}
                value={state.design.stoneId}
                onChange={(v) => { dispatch({ type: 'SET_FIELD', field: 'stoneId', value: v }); play?.('click'); }}
                renderOpt={(s) => (
                  <span className="flex items-center gap-2">
                    <GemIcon id={s.icon} size={16} />
                    <span>{pick(s.name, locale)}</span>
                  </span>
                )}
              />
              <Picker
                label={{ tr: 'Kesim', en: 'Cut', ar: 'القطع' }}
                options={CUTS}
                value={state.design.cutId}
                onChange={(v) => { dispatch({ type: 'SET_FIELD', field: 'cutId', value: v }); play?.('click'); }}
                renderOpt={(c) => <span>{pick(c.name, locale)}</span>}
              />
              <Picker
                label={{ tr: 'Montaj', en: 'Setting', ar: 'التثبيت' }}
                options={SETTINGS}
                value={state.design.settingId}
                onChange={(v) => { dispatch({ type: 'SET_FIELD', field: 'settingId', value: v }); play?.('click'); }}
                renderOpt={(s) => <span>{pick(s.name, locale)}</span>}
              />
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/60 mb-2">
                  {{ tr: 'Karat', en: 'Carat', ar: 'قيراط' }[locale]}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {CARATS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => { dispatch({ type: 'SET_FIELD', field: 'carats', value: c }); play?.('click'); }}
                      className={cx(
                        'px-3 py-1.5 rounded-full text-sm font-extrabold border transition',
                        state.design.carats === c
                          ? 'text-cream border-transparent'
                          : 'bg-white text-ink/70 border-ink/10 hover:border-ink/30',
                      )}
                      style={state.design.carats === c ? { background: accent } : undefined}
                    >
                      {c}ct
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: live preview + price */}
            <div className="rounded-3xl bg-ink/5 p-5 flex flex-col gap-4">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/60">
                {{ tr: 'Canlı Önizleme', en: 'Live Preview', ar: 'معاينة مباشرة' }[locale]}
              </div>
              <div className="flex items-center justify-center py-4">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center ring-4 ring-white shadow-museum"
                  style={{
                    background: METALS.find((m) => m.id === state.design.metalId)?.tone,
                  }}
                >
                  <GemIcon id={STONES.find((s) => s.id === state.design.stoneId)?.icon || 'diamond'} size={56} animate />
                </div>
              </div>
              <div className="bg-white/80 rounded-2xl p-3 text-sm space-y-1">
                <Row
                  label={{ tr: 'Metal', en: 'Metal', ar: 'المعدن' }}
                  value={`${price.grams}g · ₺${price.metalCost.toLocaleString()}`}
                />
                <Row
                  label={{ tr: 'Taş', en: 'Stone', ar: 'الحجر' }}
                  value={`${state.design.carats}ct · ₺${price.stoneCost.toLocaleString()}`}
                />
                <Row
                  label={{ tr: 'İşçilik', en: 'Workmanship', ar: 'صناعة' }}
                  value={`₺${price.workmanship.toLocaleString()}`}
                />
                <hr className="border-ink/10 my-1" />
                <div className="flex items-center justify-between font-display font-extrabold">
                  <span>{{ tr: 'Toplam', en: 'Total', ar: 'المجموع' }[locale]}</span>
                  <span style={{ color: accent }}>₺{price.total.toLocaleString()}</span>
                </div>
                <div className={cx(
                  'text-[11px] font-bold',
                  price.total <= customer.budget * 1.1 && price.total >= customer.budget * 0.9
                    ? 'text-gem' :
                  price.total > customer.budget * 1.25 ? 'text-red-600' : 'text-ink/50',
                )}>
                  {{ tr: 'Müşteri bütçesi', en: 'Customer budget', ar: 'ميزانية الزبون' }[locale]}:
                  {' '}₺{customer.budget.toLocaleString()}
                  {price.total > customer.budget * 1.1 && (
                    <> ({{ tr: 'aşıldı', en: 'over', ar: 'تجاوز' }[locale]} ₺{(price.total - customer.budget).toLocaleString()})</>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={submit}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
                       text-cream font-extrabold font-display shadow-museum"
            style={{ background: accent }}
          >
            {{ tr: 'Müşteriye sun', en: 'Present to customer', ar: 'قدّم للزبون' }[locale]}
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Feedback phase */}
      {state.phase === 'feedback' && state.feedback && (
        <div className="rounded-3xl bg-white border border-ink/10 p-5 space-y-4 animate-popIn">
          <div className="text-center">
            <div className="font-display text-4xl font-extrabold" style={{ color: accent }}>
              {state.feedback.total}/15
            </div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < state.feedback.total ? 'text-gold' : 'text-ink/15'}
                  fill={i < state.feedback.total ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <Criterion
              icon="💎"
              title={{ tr: 'Malzeme', en: 'Material', ar: 'المادة' }}
              score={state.feedback.material.score}
              notes={state.feedback.material.notes}
              locale={locale}
            />
            <Criterion
              icon="🎨"
              title={{ tr: 'Tasarım', en: 'Design', ar: 'التصميم' }}
              score={state.feedback.design.score}
              notes={state.feedback.design.notes}
              locale={locale}
            />
            <Criterion
              icon="💰"
              title={{ tr: 'Fiyat', en: 'Price', ar: 'السعر' }}
              score={state.feedback.price.score}
              notes={state.feedback.price.notes}
              locale={locale}
            />
          </div>

          <button
            type="button"
            onClick={advance}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
                       bg-ink text-cream font-extrabold shadow-museum"
          >
            {isLastCustomer
              ? { tr: 'Vardiyayı bitir', en: 'Finish shift', ar: 'أنهِ الوردية' }[locale]
              : { tr: 'Sıradaki müşteri', en: 'Next customer', ar: 'الزبون التالي' }[locale]}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── helpers ─────────────────────────────────────────────── */

function Picker({ label, options, value, onChange, renderOpt }) {
  const { locale } = useLocale();
  return (
    <div>
      <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/60 mb-2">
        {pick(label, locale)}
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {options.map((opt) => {
          const selected = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cx(
                'px-3 py-1.5 rounded-full text-xs font-bold border transition',
                selected
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-white text-ink/70 border-ink/10 hover:border-ink/30',
              )}
            >
              {renderOpt(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  const { locale } = useLocale();
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink/60">{pick(label, locale)}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}

function Criterion({ icon, title, score, notes, locale }) {
  const good = score >= 4;
  return (
    <div
      className={cx(
        'rounded-2xl p-3 border',
        good ? 'bg-gem/5 border-gem/30' : score >= 2 ? 'bg-gold-soft border-gold/30' : 'bg-red-50 border-red-200',
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <strong className="text-ink font-display">{pick(title, locale)}</strong>
        <span className="ml-auto font-extrabold">
          {good ? <Check size={14} className="text-gem inline" /> : <AlertCircle size={14} className="text-amber-700 inline" />}
          {' '}{score}/5
        </span>
      </div>
      {notes.map((n, i) => (
        <p key={i} className="text-xs text-ink/75 mt-1.5 leading-relaxed">
          {pick(n, locale)}
        </p>
      ))}
    </div>
  );
}
