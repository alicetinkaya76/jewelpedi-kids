import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuizPlay from './QuizPlay.jsx';
import { useLocale } from '../context/LocaleContext.jsx';
import { categories, getCategory } from '../data/quizzes.js';
import { pick, cx } from '../utils/helpers.js';
import { Play, Star } from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import QuizCategoryIntro from '../components/quiz/QuizCategoryIntro.jsx';

export default function QuizHub() {
  const { t, locale } = useLocale();
  const { quizStars } = useProgress();
  const [searchParams] = useSearchParams();
  const initialCat =
    searchParams.get('cat') &&
    categories.some((c) => c.id === searchParams.get('cat'))
      ? searchParams.get('cat')
      : 'karisik';
  const [cat, setCat] = useState(initialCat);
  const [level, setLevel] = useState(null); // null = all
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <QuizPlay
        category={cat}
        difficulty={level}
        onExit={() => setPlaying(false)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
        {t('quiz.title')}
      </h1>
      <p className="text-ink/60 mb-8">{t('quiz.pickCategory')}</p>

      {/* Category grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {categories.map((c) => {
          const stars = quizStars[c.id] || 0;
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cx(
                'rounded-2xl p-4 border font-bold text-left lift-on-hover',
                active
                  ? 'bg-ink text-cream border-ink shadow-museum'
                  : 'bg-white border-ink/10 text-ink hover:border-ink/30',
              )}
            >
              <div className="text-2xl mb-1" aria-hidden>{c.emoji}</div>
              <div className="font-display font-extrabold text-base">
                {pick(c, locale)}
              </div>
              {stars > 0 && (
                <div
                  className={cx(
                    'mt-2 inline-flex items-center gap-1 text-xs',
                    active ? 'text-gold' : 'text-gold',
                  )}
                >
                  <Star size={12} fill="currentColor" /> {stars}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Faz 6-F: seçili kategori için bağlam kartı */}
      <div
        style={{
          '--quiz-accent':
            cat === 'altin' ? '#d4a017' :
            cat === 'gumus' ? '#b0b7bf' :
            cat === 'pirlanta' ? '#5dade2' :
            cat === 'renkli-taslar' ? '#27ae60' :
            cat === 'platin' ? '#7f8c8d' :
            cat === 'taki' ? '#c0392b' :
            cat === 'zanaat' ? '#8e44ad' :
            '#1b2845',
        }}
      >
        <QuizCategoryIntro category={getCategory(cat)} locale={locale} />
      </div>

      {/* Difficulty */}
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink/50 mb-2">
          {t('quiz.difficulty')}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={level === null} onClick={() => setLevel(null)}>
            {{ tr: 'Tümü', en: 'All', ar: 'الكل' }[locale] || 'Tümü'}
          </Chip>
          {[1, 2, 3].map((lvl) => (
            <Chip
              key={lvl}
              active={level === lvl}
              onClick={() => setLevel(lvl)}
            >
              {t(`quiz.levels.${lvl}`)}
            </Chip>
          ))}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={() => setPlaying(true)}
        className="gold-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full font-extrabold shadow-museum"
      >
        <Play size={16} /> {t('quiz.start')}
      </button>
    </div>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'px-3.5 py-1.5 rounded-full text-sm font-bold border transition',
        active
          ? 'bg-ink text-cream border-ink'
          : 'bg-white border-ink/10 text-ink/70 hover:border-ink/30',
      )}
    >
      {children}
    </button>
  );
}
