import { Clock } from 'lucide-react';
import { pick } from '../../utils/helpers.js';
import { renderInlineCitations } from './BodyWithCitations.jsx';

/*
 * StoryTimeline — Faz 6-C
 *
 * Hikâyenin anlatımındaki kritik tarihleri yatay bir şerit olarak gösterir.
 * ExhibitDetail'daki "ExhibitTimeline" bileşenini Story ölçeğine göre
 * uyarlar — ama burada her item'ın bir `cite` alanı olabilir ve bu
 * citeMap üzerinden numaralandırılır (footnote'lara bağlanır).
 *
 * props:
 *   items:   [{year, event:{tr,en,ar}, cite?:[source-id]}]
 *   locale:  'tr'|'en'|'ar'
 *   citeMap: {sourceId: number}  — parent'tan gelir; her cite ID'si
 *            bu haritadan numarayı alır. Eksikse o cite sessizce düşer.
 */
export default function StoryTimeline({ items = [], locale = 'tr', citeMap = {} }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-cream"
          style={{ background: 'var(--hall-accent)' }}
          aria-hidden
        >
          <Clock size={16} />
        </span>
        <h2 className="font-display text-lg sm:text-xl font-extrabold text-ink">
          {{
            tr: 'Tarih Şeridi',
            en: 'Timeline',
            ar: 'الخط الزمني',
          }[locale] || 'Timeline'}
        </h2>
      </div>

      <div className="relative">
        <div
          className="absolute top-9 left-0 right-0 h-0.5 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, transparent, color-mix(in srgb, var(--hall-accent) 40%, transparent), transparent)',
          }}
          aria-hidden="true"
        />
        <ol className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 snap-x">
          {items.map((entry, i) => {
            // cite ID'lerini citeMap'ten numaralara çevir
            const citeNums = (entry.cite || [])
              .map((id) => citeMap[id])
              .filter((n) => typeof n === 'number');
            const citeStr = citeNums.length > 0 ? ` [${citeNums.join(',')}]` : '';
            const eventText = pick(entry.event, locale) + citeStr;

            return (
              <li key={i} className="shrink-0 w-60 snap-start relative">
                <div className="flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full ring-4 ring-cream relative z-10"
                    style={{ background: 'var(--hall-accent)', marginTop: '1.75rem' }}
                    aria-hidden
                  />
                  <div
                    className="mt-3 font-display text-stat-number text-xl"
                    style={{ color: 'var(--hall-accent)' }}
                  >
                    {formatYear(entry.year, locale)}
                  </div>
                  <div className="text-sm text-ink/80 text-center leading-snug mt-2">
                    {renderInlineCitations(eventText)}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/**
 * Yılı insana-okunur format'a çevir.
 * Negatif (M.Ö./BCE) destekler. Çok büyük negatifler (milyar yıl) için
 * "3 milyar yıl önce" biçimine düşer.
 */
function formatYear(y, locale) {
  if (y === null || y === undefined) return '';
  const str = String(y);

  // Çok büyük negatif = derin zaman (milyarlar, milyonlar)
  if (str.startsWith('-')) {
    const n = parseInt(str.slice(1), 10);
    if (Number.isFinite(n)) {
      if (n >= 1_000_000_000) {
        const billions = n / 1_000_000_000;
        const b = Number.isInteger(billions) ? String(billions) : billions.toFixed(1);
        return {
          tr: `~${b} milyar yıl`,
          en: `~${b} Gyr ago`,
          ar: `~${b} مليار سنة`,
        }[locale] || `~${b} Gyr ago`;
      }
      if (n >= 1_000_000) {
        const m = Math.round(n / 1_000_000);
        return {
          tr: `~${m} milyon yıl`,
          en: `~${m} Myr ago`,
          ar: `~${m} مليون سنة`,
        }[locale] || `~${m} Myr ago`;
      }
      if (n >= 10_000) {
        return {
          tr: `~${n.toLocaleString('tr-TR')} yıl önce`,
          en: `~${n.toLocaleString('en-US')} yr ago`,
          ar: `~${n} سنة`,
        }[locale] || `~${n} yr ago`;
      }
    }
    const prefix = { tr: 'M.Ö.', en: 'BCE', ar: 'ق.م' }[locale] || 'BCE';
    return `${n} ${prefix}`;
  }

  return str;
}
