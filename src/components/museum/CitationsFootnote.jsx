import { BookOpen, ExternalLink } from 'lucide-react';
import { formatSource } from '../../data/sources.js';

const HEADER = {
  tr: 'Kaynakça',
  en: 'References',
  ar: 'المراجع',
};

const SUB = {
  tr: 'Bu sayfadaki kaynaklı veriler aşağıdaki kayıtlardan doğrulanmıştır.',
  en: 'Cited data on this page is verified from the records below.',
  ar: 'تم التحقق من البيانات الموثقة أعلاه من هذه المصادر.',
};

/**
 * CitationsFootnote — birleştirilmiş kaynakça bölümü.
 *
 * sources param olarak {n, source} şeklinde sıralı bir liste bekler.
 * ExhibitDetail bu listeyi, (a) specs.cite, (b) exhibit.sources ve
 * (c) body metnindeki inline [cite:*] referanslarının birleşiminden üretir.
 *
 * props:
 *   entries:  [{n: 1, source: {id,kind,title,author,year,url,publisher,retrievedAt}}]
 *   locale:   'tr'|'en'|'ar'
 */
export default function CitationsFootnote({ entries, locale }) {
  if (!Array.isArray(entries) || entries.length === 0) return null;

  return (
    <section
      className="rounded-3xl p-5 sm:p-6 mb-6 border relative"
      style={{
        background: 'rgba(255, 251, 240, 0.9)',
        borderColor: 'rgba(17, 24, 39, 0.08)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-9 h-9 rounded-xl bg-ink/90 text-cream flex items-center justify-center shrink-0">
          <BookOpen size={18} />
        </span>
        <div>
          <div className="text-label-plate text-ink/60">
            {HEADER[locale] || HEADER.tr}
          </div>
          <div className="font-display font-extrabold text-ink text-lg leading-tight">
            {entries.length}{' '}
            <span className="text-ink/50 font-normal text-sm">
              {
                { tr: 'kayıt', en: 'entries', ar: 'مرجع' }[locale] ||
                'kayıt'
              }
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-ink/60 mb-3 leading-relaxed">
        {SUB[locale] || SUB.tr}
      </p>

      <ol className="space-y-2 text-sm sm:text-base list-none pl-0">
        {entries.map(({ n, source }) => {
          const formatted = formatSource(source, locale);
          const hasUrl = !!source.url;
          return (
            <li
              key={source.id}
              className="flex gap-3 items-start leading-relaxed"
            >
              <span
                className="shrink-0 font-display font-extrabold text-ink/50 min-w-[1.5rem] tabular-nums"
                aria-hidden
              >
                {n}.
              </span>
              <span className="flex-1 text-ink/80">
                {hasUrl ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink underline decoration-ink/20 underline-offset-4 inline-flex items-start gap-1"
                  >
                    {formatted}
                    <ExternalLink
                      size={12}
                      className="shrink-0 mt-1 opacity-60"
                      aria-hidden
                    />
                  </a>
                ) : (
                  formatted
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
