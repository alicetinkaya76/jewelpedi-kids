import { Target, Package, ListOrdered, ShieldAlert } from 'lucide-react';
import { pick } from '../../utils/helpers.js';
import { renderInlineCitations } from '../common/BodyWithCitations.jsx';

/**
 * LabHero — Faz 6-E
 *
 * Aktif deneyin ÜSTÜNDE render edilen müze vitrini başlığı.
 * Dört bölüm (her biri opsiyonel — veri yoksa gizlenir):
 *   - title + goal (her zaman var sayılır)
 *   - materials grid (2-5 öğe)
 *   - procedure numaralı liste (3-4 adım)
 *   - safetyNote ("bu simülasyon, gerçek deney değil" tipinde uyarı)
 *
 * Deneyin kendi interaktif bileşeni (KaratCalculator vb.) bu bölümün
 * ALTINDA render edilir; LabHero o bileşene hiç dokunmaz.
 *
 * Inline cite'ları renderInlineCitations ile [1] süperscript yapar.
 *
 * props:
 *   title:      { tr, en, ar }
 *   goal:       { tr, en, ar }
 *   materials?: [{emoji, name:{tr,en,ar}, note?:{tr,en,ar}}]
 *   procedure?: [{step:{tr,en,ar}, cite?:[source-id]}]  (cite → citeMap)
 *   safetyNote? { tr, en, ar }
 *   locale:     'tr' | 'en' | 'ar'
 *   citeMap:    { source-id: number }
 */
export default function LabHero({
  title,
  goal,
  materials,
  procedure,
  safetyNote,
  locale = 'tr',
  citeMap = {},
}) {
  return (
    <section className="mb-6">
      {/* Title + goal */}
      {title && (
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink leading-tight mb-2">
          {pick(title, locale)}
        </h2>
      )}
      {goal && (
        <p className="text-ink/75 leading-relaxed text-base sm:text-lg mb-5">
          {pick(goal, locale)}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Materials */}
        {Array.isArray(materials) && materials.length > 0 && (
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: 'color-mix(in srgb, var(--hall-accent) 6%, white)',
              borderColor: 'color-mix(in srgb, var(--hall-accent) 25%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-cream"
                style={{ background: 'var(--hall-accent)' }}
                aria-hidden
              >
                <Package size={14} />
              </span>
              <h3 className="text-label-plate" style={{ color: 'var(--hall-accent)' }}>
                {{ tr: 'Gereksinimler', en: 'Materials', ar: 'الأدوات' }[locale] || 'Materials'}
              </h3>
            </div>
            <ul className="space-y-1.5 text-sm">
              {materials.map((m, i) => (
                <li key={i} className="flex items-start gap-2 leading-snug">
                  <span className="shrink-0" aria-hidden>{m.emoji || '•'}</span>
                  <span className="text-ink/85">
                    <strong className="font-bold">{pick(m.name, locale)}</strong>
                    {m.note && (
                      <span className="text-ink/60"> — {pick(m.note, locale)}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Procedure */}
        {Array.isArray(procedure) && procedure.length > 0 && (
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: 'color-mix(in srgb, var(--hall-accent) 6%, white)',
              borderColor: 'color-mix(in srgb, var(--hall-accent) 25%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-cream"
                style={{ background: 'var(--hall-accent)' }}
                aria-hidden
              >
                <ListOrdered size={14} />
              </span>
              <h3 className="text-label-plate" style={{ color: 'var(--hall-accent)' }}>
                {{ tr: 'Prosedür', en: 'Procedure', ar: 'الخطوات' }[locale] || 'Procedure'}
              </h3>
            </div>
            <ol className="space-y-2 text-sm">
              {procedure.map((p, i) => {
                const citeNums = (p.cite || [])
                  .map((id) => citeMap[id])
                  .filter((n) => typeof n === 'number');
                const citeStr = citeNums.length ? ` [${citeNums.join(',')}]` : '';
                const stepText = pick(p.step, locale) + citeStr;
                return (
                  <li key={i} className="flex items-start gap-2 leading-snug">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full bg-ink/80 text-cream
                                 flex items-center justify-center text-[10px] font-bold mt-0.5"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="text-ink/85">
                      {renderInlineCitations(stepText)}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>

      {/* Goal at the very top already; safety note at the bottom if present */}
      {safetyNote && (
        <aside
          className="mt-4 rounded-xl p-3 flex items-start gap-2 border text-sm"
          style={{
            background: 'rgba(231, 126, 34, 0.06)',
            borderColor: 'rgba(231, 126, 34, 0.25)',
          }}
        >
          <ShieldAlert
            size={16}
            className="shrink-0 mt-0.5"
            style={{ color: '#b9660e' }}
            aria-hidden
          />
          <div>
            <div
              className="text-label-plate mb-0.5"
              style={{ color: '#b9660e' }}
            >
              {{ tr: 'Not', en: 'Note', ar: 'ملاحظة' }[locale] || 'Note'}
            </div>
            <p className="text-ink/85 leading-relaxed">
              {pick(safetyNote, locale)}
            </p>
          </div>
        </aside>
      )}
    </section>
  );
}
