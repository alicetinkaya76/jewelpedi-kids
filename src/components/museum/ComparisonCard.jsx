import { Link } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import { pick } from '../../utils/helpers.js';
import { iconFor } from '../../utils/iconFor.js';
import { GemIcon } from '../icons/gems/index.js';

const AXIS_LABEL = {
  purity: { tr: 'Saflık', en: 'Purity', ar: 'النقاء' },
  hardness: { tr: 'Sertlik', en: 'Hardness', ar: 'الصلادة' },
  value: { tr: 'Değer', en: 'Value', ar: 'القيمة' },
  rarity: { tr: 'Nadirlik', en: 'Rarity', ar: 'الندرة' },
  historical: { tr: 'Tarihsel', en: 'Historical', ar: 'تاريخي' },
  weight: { tr: 'Ağırlık', en: 'Weight', ar: 'الوزن' },
  origin: { tr: 'Köken', en: 'Origin', ar: 'المنشأ' },
};

const HEADER = {
  tr: 'Karşılaştır',
  en: 'Compare',
  ar: 'قارن',
};

/**
 * ComparisonCard — mevcut sergiyi bir başka sergiyle belirli bir eksende
 * (purity, hardness, weight, rarity, historical, ...) karşılaştırır.
 *
 * props:
 *   current:     mevcut exhibit objesi (name, cat)
 *   other:       karşılaştırılacak exhibit objesi (getExhibit ile bulunmuş)
 *   axis:        'purity'|'hardness'|'value'|'rarity'|'historical'|'weight'|'origin'
 *   insight:     {tr, en, ar} — kısa bir cümle
 *   locale:      'tr'|'en'|'ar'
 */
export default function ComparisonCard({ current, other, axis, insight, locale }) {
  if (!other || !insight) return null;

  const axisLabel =
    AXIS_LABEL[axis]?.[locale] || AXIS_LABEL[axis]?.tr || axis || '';

  const leftIcon = iconFor(current, current.cat);
  const rightIcon = iconFor(other, other.cat);

  return (
    <section
      className="rounded-3xl p-5 sm:p-6 mb-6 border"
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--hall-accent) 6%, white), white)',
        borderColor:
          'color-mix(in srgb, var(--hall-accent) 22%, transparent)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-cream"
          style={{ background: 'var(--hall-accent)' }}
        >
          <ArrowLeftRight size={18} />
        </span>
        <div>
          <div
            className="text-label-plate"
            style={{ color: 'var(--hall-accent)' }}
          >
            {HEADER[locale] || HEADER.tr}
          </div>
          <div className="font-display font-extrabold text-ink text-lg leading-tight">
            {axisLabel}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-center mb-4">
        {/* Current */}
        <div className="rounded-2xl bg-white/80 border border-ink/5 p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <GemIcon id={leftIcon.id} size={44} />
          </div>
          <div className="text-label-plate text-ink/50 mb-1">
            {{ tr: 'Şu an', en: 'This', ar: 'هذا' }[locale]}
          </div>
          <div className="font-display font-extrabold text-ink text-sm leading-tight">
            {pick(current.name, locale)}
          </div>
        </div>

        {/* Arrow */}
        <div
          className="hidden sm:flex items-center justify-center font-display font-extrabold text-2xl"
          style={{ color: 'var(--hall-accent)' }}
          aria-hidden
        >
          ↔
        </div>

        {/* Other — linked */}
        <Link
          to={`/halls/${other.cat}/${other.id}`}
          className="rounded-2xl bg-white border border-ink/10 hover:border-ink/30 p-4 text-center lift-on-hover transition"
        >
          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <GemIcon id={rightIcon.id} size={44} />
          </div>
          <div className="text-label-plate text-ink/50 mb-1">
            {{ tr: 'Karşı taraf →', en: 'Counterpart →', ar: 'المقابل ←' }[locale]}
          </div>
          <div className="font-display font-extrabold text-ink text-sm leading-tight">
            {pick(other.name, locale)}
          </div>
        </Link>
      </div>

      <p className="text-ink/80 leading-relaxed text-base sm:text-lg">
        {pick(insight, locale)}
      </p>
    </section>
  );
}
