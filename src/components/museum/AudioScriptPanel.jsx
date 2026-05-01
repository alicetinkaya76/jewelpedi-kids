import { useState } from 'react';
import { Headphones, ChevronDown } from 'lucide-react';
import { pick } from '../../utils/helpers.js';

const HEADER = {
  tr: 'Küratör Anlatımı',
  en: 'Curator Narration',
  ar: 'سرد أمين المعرض',
};

const TEASE = {
  tr: 'Bu serginin 60-90 saniyelik küratör anlatımı. Henüz sesli değil — okumak için aç.',
  en: 'A 60-90 second curator narration for this exhibit. Audio coming soon — tap to read.',
  ar: 'سرد من أمين المعرض لمدة دقيقة. اضغط للقراءة.',
};

const READ_LABEL = {
  tr: { open: 'Okumak için aç', close: 'Kapat' },
  en: { open: 'Tap to read', close: 'Close' },
  ar: { open: 'اضغط للقراءة', close: 'إغلاق' },
};

/**
 * AudioScriptPanel — küratör narration metnini kompakt, spoiler-style kart olarak
 * gösterir. Faz 7'de TTS bağlanıncaya kadar sadece okunabilir metin.
 *
 * script: { tr, en, ar } — bir dilde olmayabilir; o zaman pick() fallback eder.
 */
export default function AudioScriptPanel({ script, locale }) {
  const [open, setOpen] = useState(false);
  if (!script) return null;

  const text = pick(script, locale);
  if (!text) return null;

  // Kelime sayısına göre yaklaşık okuma süresi (dakika değil, saniye)
  // ~180 wpm → her kelime ~0.33 sn. Küratör tempolu okur → 160 wpm.
  const wordCount = text.trim().split(/\s+/).length;
  const seconds = Math.round((wordCount / 160) * 60);

  const toggle = () => setOpen((o) => !o);

  return (
    <section
      className="rounded-3xl p-5 sm:p-6 mb-6 border overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.03))',
        borderColor: 'rgba(99, 102, 241, 0.18)',
      }}
    >
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center gap-3 text-left"
        aria-expanded={open}
      >
        <span
          className="w-10 h-10 rounded-xl bg-indigo-600 text-cream flex items-center justify-center shrink-0"
          style={{ background: 'rgb(99, 102, 241)' }}
        >
          <Headphones size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <div
            className="text-label-plate"
            style={{ color: 'rgb(99, 102, 241)' }}
          >
            {HEADER[locale] || HEADER.tr}
          </div>
          <div className="font-display font-extrabold text-ink text-base sm:text-lg leading-tight">
            {open
              ? READ_LABEL[locale]?.close || READ_LABEL.tr.close
              : READ_LABEL[locale]?.open || READ_LABEL.tr.open}
            <span className="ml-2 text-xs text-ink/50 font-normal">
              (~{seconds}s)
            </span>
          </div>
        </div>
        <ChevronDown
          size={22}
          className={`shrink-0 transition-transform text-ink/60 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="mt-4 pt-4 border-t border-ink/10 animate-fadeUp">
          <p className="text-[11px] text-ink/50 italic mb-2">
            {TEASE[locale] || TEASE.tr}
          </p>
          <p className="text-ink/85 leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {text}
          </p>
        </div>
      )}
    </section>
  );
}
