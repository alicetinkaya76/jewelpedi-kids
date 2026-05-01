import { Quote } from 'lucide-react';
import { pick } from '../../utils/helpers.js';

const HEADER = {
  tr: 'Küratörden Not',
  en: 'Curator Note',
  ar: 'ملاحظة الأمين',
};

/**
 * ExhibitCuratorMini — funFact'ın kardeşi ama daha kısa ve tonu farklı.
 * Hikaye/anekdot değil, küçük bir "biliyor muydun" yan bilgi kartı.
 * HallPage'deki CuratorNote'un sergi-seviyesi versiyonu.
 *
 * note: {tr, en, ar}
 */
export default function ExhibitCuratorMini({ note, locale }) {
  if (!note) return null;
  const text = pick(note, locale);
  if (!text) return null;

  return (
    <aside
      className="rounded-2xl p-4 sm:p-5 mb-6 border flex items-start gap-3"
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--hall-accent) 5%, white), white)',
        borderColor:
          'color-mix(in srgb, var(--hall-accent) 18%, transparent)',
      }}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-cream"
        style={{ background: 'var(--hall-accent)' }}
        aria-hidden
      >
        <Quote size={14} />
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-[11px] uppercase tracking-[0.18em] font-extrabold mb-1"
          style={{ color: 'var(--hall-accent)' }}
        >
          {HEADER[locale] || HEADER.tr}
        </div>
        <p className="text-ink/80 leading-relaxed text-sm sm:text-base">
          {text}
        </p>
      </div>
    </aside>
  );
}
