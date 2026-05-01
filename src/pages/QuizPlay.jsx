import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ChevronRight, RotateCw, Star, Trophy, ChevronLeft } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { getQuizzesByCategory, categories, getCategory } from '../data/quizzes.js';
import { pick, cx } from '../utils/helpers.js';
import CuratorStoryNote from '../components/common/CuratorStoryNote.jsx';
import { CitationsFootnote, RelatedGrid } from '../components/museum/index.js';
import { getSource } from '../data/sources.js';

export default function QuizPlay({ category = 'karisik', difficulty = null, onExit }) {
  const { t, locale } = useLocale();
  const { setQuizStars } = useProgress();
  const questions = useMemo(() => getQuizzesByCategory(category, difficulty), [category, difficulty]);
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const q = questions[idx];

  // Record stars when finished
  useEffect(() => {
    if (finished && total > 0) {
      const stars = Math.round((score / total) * 5);
      setQuizStars(category, stars);
    }
  }, [finished, total, score, category, setQuizStars]);

  if (total === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-ink/60 mb-4">
          {{
            tr: 'Bu kategori için henüz soru yok.',
            en: 'No questions for this category yet.',
            ar: 'لا توجد أسئلة بعد.',
          }[locale] || 'Bu kategori için henüz soru yok.'}
        </p>
        <button
          onClick={onExit}
          className="px-4 py-2 rounded-full bg-ink text-cream font-bold"
        >
          {t('common.back')}
        </button>
      </div>
    );
  }

  const catMeta = categories.find((c) => c.id === category);
  const correct = choice !== null && choice === q.answer;

  const next = () => {
    if (idx + 1 >= total) {
      setFinished(true);
    } else {
      setIdx(idx + 1);
      setChoice(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setChoice(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pctScore = Math.round((score / total) * 100);
    const stars = Math.round((score / total) * 5);
    const enrichedCat = getCategory(category);

    // Citations footnote için citeMap (curatorNote.cite ve sources birleşir)
    const citeOrder = [];
    const citeMap = {};
    const addCite = (id) => {
      if (!id || citeMap[id] || !getSource(id)) return;
      citeOrder.push(id);
      citeMap[id] = citeOrder.length;
    };
    (enrichedCat?.curatorNote?.cite || []).forEach(addCite);
    (enrichedCat?.sources || []).forEach(addCite);
    const footnoteEntries = citeOrder.map((id, i) => ({ n: i + 1, source: getSource(id) }));

    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Başarı kartı (mevcut) */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-gold-soft to-white border border-gold/30 p-8 text-center shadow-museum animate-popIn">
          <Trophy size={56} className="mx-auto text-gold mb-3" />
          <h2 className="font-display text-3xl font-extrabold text-ink mb-2">
            {t('quiz.score')}: {score} / {total}
          </h2>
          <p className="text-ink/60 mb-4">{pctScore}%</p>
          <div className="flex items-center justify-center gap-1 mb-6" aria-label={`${stars} stars`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={32}
                className={i <= stars ? 'text-gold' : 'text-ink/15'}
                fill={i <= stars ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream font-extrabold"
            >
              <RotateCw size={14} /> {t('quiz.restart')}
            </button>
            <button
              onClick={onExit}
              className="px-5 py-2.5 rounded-full bg-white border border-ink/10 font-bold text-ink"
            >
              {t('common.back')}
            </button>
          </div>
        </div>

        {/* Faz 6-F: Bitiş ekranı zenginleştirme */}
        {/* Curator notu — "quiz bittikten sonra bilmen gereken şey" */}
        {enrichedCat?.curatorNote && (
          <CuratorStoryNote
            note={enrichedCat.curatorNote}
            locale={locale}
            citeMap={citeMap}
          />
        )}

        {/* "Keşfe devam et" — ilgili müze içerikleri */}
        {enrichedCat && (
          (enrichedCat.relatedExhibits?.length ||
           enrichedCat.relatedLabs?.length ||
           enrichedCat.relatedStories?.length) > 0
        ) && (
          <div className="mt-8">
            <h3 className="font-display text-xl font-extrabold text-ink mb-3">
              {{
                tr: 'Öğrenmeye devam et →',
                en: 'Keep learning →',
                ar: 'واصل التعلم ←',
              }[locale]}
            </h3>
            <RelatedGrid
              exhibitIds={enrichedCat.relatedExhibits || []}
              storyIds={enrichedCat.relatedStories || []}
              labIds={enrichedCat.relatedLabs || []}
              quizCatIds={[]}
              locale={locale}
            />
          </div>
        )}

        {/* Dipnot kaynakları */}
        {footnoteEntries.length > 0 && (
          <div className="mt-8">
            <CitationsFootnote entries={footnoteEntries} locale={locale} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <button
        onClick={onExit}
        className="inline-flex items-center gap-1 text-sm font-bold text-ink/60 hover:text-ink mb-4"
      >
        <ChevronLeft size={16} /> {t('common.back')}
      </button>

      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-xs font-bold text-ink/60">
        <span>
          <span className="text-lg mr-1">{catMeta?.emoji}</span>
          {pick(catMeta, locale)}
        </span>
        <span>{t('quiz.questionOf', { n: idx + 1, total })}</span>
      </div>
      <div className="h-2 rounded-full bg-ink/10 mb-6 overflow-hidden">
        <div
          className="h-full progress-gold transition-all duration-500"
          style={{ width: `${((idx + (choice !== null ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-3xl bg-white/90 border border-ink/5 shadow-museum p-6 sm:p-8 mb-4">
        <h2 className="font-display text-2xl font-extrabold text-ink mb-5 leading-tight">
          {pick(q.q, locale)}
        </h2>

        <div className="grid gap-2">
          {q.opts.map((opt, i) => {
            const isChosen = choice === i;
            const showCorrect = choice !== null && i === q.answer;
            const showWrong = choice !== null && isChosen && i !== q.answer;
            return (
              <button
                key={i}
                disabled={choice !== null}
                onClick={() => {
                  setChoice(i);
                  if (i === q.answer) setScore((s) => s + 1);
                }}
                className={cx(
                  'group text-left px-4 py-3 rounded-2xl border-2 font-bold transition',
                  'disabled:cursor-not-allowed',
                  !choice && 'bg-white border-ink/10 hover:border-ink text-ink',
                  showCorrect && 'bg-gem/10 border-gem text-gem',
                  showWrong && 'bg-red-50 border-red-300 text-red-700',
                  choice !== null && !showCorrect && !showWrong && 'opacity-50',
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cx(
                      'w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-extrabold',
                      showCorrect ? 'bg-gem text-white' :
                      showWrong ? 'bg-red-400 text-white' : 'bg-ink/5 text-ink/60',
                    )}
                  >
                    {showCorrect ? <Check size={14} /> : showWrong ? <X size={14} /> : String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{pick(opt, locale)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation after answer */}
      {choice !== null && (
        <div
          className={cx(
            'rounded-2xl p-5 mb-4 animate-fadeUp border',
            correct ? 'bg-gem/10 border-gem/40' : 'bg-red-50 border-red-200',
          )}
        >
          <div className={cx('font-display font-extrabold mb-1', correct ? 'text-gem' : 'text-red-700')}>
            {correct ? t('quiz.correct') : t('quiz.wrong')}
          </div>
          <p className="text-ink/80 text-sm leading-relaxed">
            <span className="font-extrabold text-ink/60">{t('quiz.explanation')}: </span>
            {pick(q.explanation, locale)}
          </p>
        </div>
      )}

      {choice !== null && (
        <button
          onClick={next}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream font-extrabold shadow-museum"
        >
          {idx + 1 >= total ? t('quiz.finish') : t('quiz.next')}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
