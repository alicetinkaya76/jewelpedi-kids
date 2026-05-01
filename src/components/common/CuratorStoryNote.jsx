import { Info } from 'lucide-react';
import { pick } from '../../utils/helpers.js';
import { renderInlineCitations } from './BodyWithCitations.jsx';

/*
 * CuratorStoryNote — Faz 6-C
 *
 * Hikâye seviyesinde (sergi değil) kısa bir küratör yorum bloğu.
 * Opsiyonel `cite` alanı varsa cite ID'leri numara listesine çevrilir
 * ve footnote'lara bağlanır.
 *
 * Sergi-seviyesi ExhibitCuratorMini'den farkı: burası takeaway'le
 * ilgili değildir; olgusal bir bağlam notu için kullanılır ("bu hikâye
 * şunu da hatırlatır: ...").
 *
 * props:
 *   note:     { tr, en, ar, cite?: [source-id] }
 *   locale:   'tr' | 'en' | 'ar'
 *   citeMap:  { sourceId: number }
 */
export default function CuratorStoryNote({ note, locale = 'tr', citeMap = {} }) {
  if (!note) return null;
  const text = pick(note, locale);
  if (!text) return null;

  const citeNums = (note.cite || [])
    .map((id) => citeMap[id])
    .filter((n) => typeof n === 'number');
  const citeStr = citeNums.length > 0 ? ` [${citeNums.join(',')}]` : '';

  return (
    <aside
      className="mt-10 rounded-2xl p-4 sm:p-5 border relative"
      style={{
        background: 'color-mix(in srgb, var(--hall-accent) 5%, white)',
        borderColor: 'color-mix(in srgb, var(--hall-accent) 25%, transparent)',
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-cream mt-0.5"
          style={{ background: 'var(--hall-accent)' }}
          aria-hidden
        >
          <Info size={15} />
        </span>
        <div className="flex-1 min-w-0">
          <div
            className="text-label-plate mb-1"
            style={{ color: 'var(--hall-accent)' }}
          >
            {{
              tr: 'Küratör Notu',
              en: 'Curator\'s Note',
              ar: 'ملاحظة أمين المتحف',
            }[locale] || 'Curator\'s Note'}
          </div>
          <p className="text-ink/85 leading-relaxed text-[15px] sm:text-base">
            {renderInlineCitations(text + citeStr)}
          </p>
        </div>
      </div>
    </aside>
  );
}
