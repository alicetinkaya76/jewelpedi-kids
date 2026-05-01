import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { glossary as baseGlossary, glossaryCategories } from '../data/glossary.js';
import { glossaryExtended } from '../data/glossary-extended.js';
import { pick, cx } from '../utils/helpers.js';

// Faz 6-A: base 53 + extended 30 = 83 terim
const glossary = [...baseGlossary, ...glossaryExtended];

// Word of the day — stable per day
function wordOfTheDay() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const day = Math.floor((d - start) / 86400000);
  return glossary[day % glossary.length];
}

export default function GlossaryPage() {
  const { t, locale } = useLocale();
  const [searchParams] = useSearchParams();
  // Faz 6-C: VocabularyChips'ten gelen ?q=<term> ile gelinirse input önceden dolar.
  const initialQ = searchParams.get('q') || '';
  const [q, setQ] = useState(initialQ);
  const [filter, setFilter] = useState('all');
  const wotd = useMemo(() => wordOfTheDay(), []);

  // URL'den yeni bir ?q= gelirse (browser back/forward) state'i güncelle
  useEffect(() => {
    const paramQ = searchParams.get('q');
    if (paramQ !== null && paramQ !== q) {
      setQ(paramQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = glossary;
    if (filter !== 'all') list = list.filter((g) => g.cat === filter);
    const needle = q.trim().toLowerCase();
    if (needle) {
      list = list.filter((g) => {
        const term = pick(g.term, locale).toLowerCase();
        const def = pick(g.def, locale).toLowerCase();
        return term.includes(needle) || def.includes(needle);
      });
    }
    // sort by term alphabetically
    return list.sort((a, b) =>
      pick(a.term, locale).localeCompare(pick(b.term, locale), locale),
    );
  }, [q, filter, locale]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
        {t('glossary.title')}
      </h1>

      {/* Word of the day */}
      <div className="mt-4 mb-8 rounded-3xl p-5 bg-gradient-to-br from-craft/10 to-white border border-craft/30 shadow-museum">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-extrabold text-craft mb-2">
          <BookOpen size={12} /> {t('glossary.wordOfDay')}
        </div>
        <h2 className="font-display text-2xl font-extrabold text-ink">
          {pick(wotd.term, locale)}
        </h2>
        <p className="text-ink/70 mt-1 leading-relaxed">{pick(wotd.def, locale)}</p>
      </div>

      {/* Search + filter */}
      <div className="sticky top-16 z-10 bg-cream/90 backdrop-blur py-3 -mx-4 px-4 border-b border-ink/5 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('glossary.search')}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-ink/10 shadow-sm font-bold text-ink focus:outline-none focus:border-ink/30"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {glossaryCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={cx(
                'px-3 py-1 rounded-full text-xs font-extrabold border transition',
                filter === c.id
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-white text-ink/70 border-ink/10 hover:border-ink/30',
              )}
            >
              {pick(c, locale)}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-ink/50 font-bold">{t('glossary.noResults')}</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((g) => (
            <article
              key={g.id}
              className="rounded-2xl p-4 bg-white border border-ink/5 shadow-sm hover:shadow-museum transition"
            >
              <h3 className="font-display text-lg font-extrabold text-ink">{pick(g.term, locale)}</h3>
              <p className="text-sm text-ink/70 mt-1 leading-relaxed">{pick(g.def, locale)}</p>
              <span className="inline-block mt-2 text-[10px] uppercase tracking-widest font-extrabold text-ink/40">
                #{g.cat}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
