import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { pick } from '../../utils/helpers.js';
import { glossary as baseGlossary } from '../../data/glossary.js';
import { glossaryExtended } from '../../data/glossary-extended.js';

/*
 * VocabularyChips — Faz 6-C
 *
 * Hikâye / sergi sayfalarında "bu içerikte geçen sözlük terimleri"
 * chip listesi. Her chip `/glossary?q=<term>` linkine gider ve orada
 * search input'u önceden doldurulmuş olur (GlossaryPage Faz 6-C'de
 * query-param okumayı öğrenecek).
 *
 * props:
 *   termIds: string[]            — glossary ID listesi
 *   locale:  'tr' | 'en' | 'ar'
 *   title?:  { tr, en, ar }      — bölüm başlığı (default: "Sözlük")
 */

const ALL_TERMS = [...baseGlossary, ...glossaryExtended];
const termMap = Object.fromEntries(ALL_TERMS.map((t) => [t.id, t]));

const DEFAULT_TITLE = {
  tr: 'Bu hikâyede geçen sözlük',
  en: 'Glossary in this story',
  ar: 'قاموس هذه القصة',
};

export default function VocabularyChips({ termIds = [], locale = 'tr', title }) {
  const terms = termIds.map((id) => termMap[id]).filter(Boolean);
  if (terms.length === 0) return null;
  const heading = title || DEFAULT_TITLE;

  return (
    <section className="mt-10">
      <h2 className="font-display text-lg sm:text-xl font-extrabold text-ink mb-3 flex items-center gap-2">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-cream"
          style={{ background: 'var(--hall-accent)' }}
          aria-hidden
        >
          <BookOpen size={16} />
        </span>
        {heading[locale] || heading.tr}
      </h2>
      <div className="flex flex-wrap gap-2">
        {terms.map((t) => {
          const termStr = pick(t.term, locale);
          return (
            <Link
              key={t.id}
              to={`/glossary?q=${encodeURIComponent(termStr)}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-white border border-ink/10 hover:border-ink/30
                         font-bold text-sm text-ink lift-on-hover transition"
            >
              <span className="text-ink/40 text-xs">§</span>
              {termStr}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
