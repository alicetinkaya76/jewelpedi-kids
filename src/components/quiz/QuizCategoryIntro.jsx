import { Info } from 'lucide-react';
import { pick } from '../../utils/helpers.js';
import VocabularyChips from '../common/VocabularyChips.jsx';
import { RelatedGrid } from '../museum/index.js';

/**
 * QuizCategoryIntro — Faz 6-F
 *
 * QuizHub'da kullanıcı bir kategori seçtiğinde quiz'i başlatmadan ÖNCE
 * gösterilen bağlam kartı. 3 bölüm (hepsi opsiyonel):
 *   1) intro paragrafı
 *   2) VocabularyChips — kategoride geçen sözlük terimleri
 *   3) RelatedGrid — ilgili sergi/lab/hikâye chip'leri
 *
 * curatorNote burada gösterilmez — o bitiş ekranına ayrılmıştır
 * (quiz bittikten sonra "şimdi bilmen gereken şey" olarak daha etkili).
 *
 * props:
 *   category — enriched category object (categories[] elemanı)
 *   locale   — 'tr' | 'en' | 'ar'
 */
export default function QuizCategoryIntro({ category, locale = 'tr' }) {
  if (!category) return null;
  const intro = category.intro;

  const hasExhibits = (category.relatedExhibits || []).length > 0;
  const hasLabs = (category.relatedLabs || []).length > 0;
  const hasStories = (category.relatedStories || []).length > 0;
  const hasRelated = hasExhibits || hasLabs || hasStories;
  const hasVocab = (category.vocabulary || []).length > 0;

  // Hiç enrichment yoksa bileşeni gizle (backward compat)
  if (!intro && !hasRelated && !hasVocab) return null;

  return (
    <section className="mb-8 animate-fadeUp">
      {/* Intro kartı */}
      {intro && (
        <div className="rounded-2xl bg-white border border-ink/10 p-5 shadow-sm mb-4">
          <div className="flex items-start gap-3">
            <span
              className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-xl ring-2 ring-white"
              style={{ background: 'color-mix(in srgb, var(--quiz-accent, #d4a017) 18%, white)' }}
              aria-hidden
            >
              {category.emoji}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-extrabold text-ink/50 mb-1">
                <Info size={11} />
                {{ tr: 'Bu kategori hakkında', en: 'About this category', ar: 'حول هذه الفئة' }[locale] || 'About'}
              </div>
              <p className="text-ink/80 leading-relaxed text-[15px]">
                {pick(intro, locale)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sözlük chip'leri */}
      {hasVocab && (
        <VocabularyChips
          termIds={category.vocabulary}
          locale={locale}
          title={{
            tr: 'Bu kategoride geçen terimler',
            en: 'Terms in this category',
            ar: 'مصطلحات في هذه الفئة',
          }}
        />
      )}

      {/* İlgili içerik grid'i */}
      {hasRelated && (
        <div className="mt-2">
          <RelatedGrid
            exhibitIds={category.relatedExhibits || []}
            storyIds={category.relatedStories || []}
            labIds={category.relatedLabs || []}
            quizCatIds={[]}
            locale={locale}
          />
        </div>
      )}
    </section>
  );
}
