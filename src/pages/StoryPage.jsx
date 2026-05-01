import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { ChevronLeft, BookOpen, Clock, MapPin } from 'lucide-react';
import { getStory, stories } from '../data/stories.js';
import { useLocale } from '../context/LocaleContext.jsx';
import { useSound } from '../audio/SoundContext.jsx';
import { pick, cx } from '../utils/helpers.js';
import { GemIcon } from '../components/icons/gems/index.js';
import {
  LabelPlate,
  WaxSeal,
  CitationsFootnote,
  RelatedGrid,
} from '../components/museum/index.js';
import BodyWithCitations from '../components/common/BodyWithCitations.jsx';
import StoryTimeline from '../components/common/StoryTimeline.jsx';
import CuratorStoryNote from '../components/common/CuratorStoryNote.jsx';
import VocabularyChips from '../components/common/VocabularyChips.jsx';
import { getSource } from '../data/sources.js';
import { getGeoPoint } from '../data/geoPoints.js';

/* ──────────────────────────────────────────────────────────────
   StoryPage — Faz 2-C (base) + Faz 6-C (enrichment UI)

   Yeni bölümler (yalnızca ilgili veri varsa render edilir):
     - LocationStrip (hero altı, hikâyenin geoPoints'leri)
     - CuratorStoryNote (takeaway sonrası, opsiyonel inline cite)
     - StoryTimeline (tarihsel omurga, opsiyonel inline cite)
     - VocabularyChips (glossary deep-link chip'leri)
     - RelatedGrid (exhibits + labs + quizzes + other stories)
     - CitationsFootnote (sayfa dibi kaynakça)

   Sahne body'leri dokunulmadı (Karar 1 — küratör yorumu).
   ────────────────────────────────────────────────────────────── */

export default function StoryPage() {
  const { storyId } = useParams();
  const { locale } = useLocale();
  const { play } = useSound();
  const story = getStory(storyId);

  useEffect(() => {
    if (story) play('page-turn');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story]);

  // Footnote aggregation: timeline[i].cite + curatorNote.cite + story.sources
  const { citeMap, footnoteEntries } = useMemo(() => {
    if (!story) return { citeMap: {}, footnoteEntries: [] };
    const order = [];
    const map = {};

    const addId = (id) => {
      if (!id || map[id]) return;
      if (!getSource(id)) return;
      order.push(id);
      map[id] = order.length;
    };

    if (Array.isArray(story.timeline)) {
      for (const t of story.timeline) {
        if (Array.isArray(t.cite)) t.cite.forEach(addId);
      }
    }
    if (Array.isArray(story.curatorNote?.cite)) {
      story.curatorNote.cite.forEach(addId);
    }
    if (Array.isArray(story.sources)) story.sources.forEach(addId);

    const entries = order.map((id, i) => ({ n: i + 1, source: getSource(id) }));
    return { citeMap: map, footnoteEntries: entries };
  }, [story]);

  if (!story) return <Navigate to="/stories" replace />;

  const geoPointList = (story.geoPoints || [])
    .map(getGeoPoint)
    .filter(Boolean);

  return (
    <div
      className="mx-auto max-w-4xl px-4 py-8 sm:py-12 hall-theme"
      style={{ '--hall-accent': story.accent }}
    >
      <Link
        to="/stories"
        className="inline-flex items-center gap-1 text-sm font-bold text-ink/60 hover:text-ink mb-6"
      >
        <ChevronLeft size={16} /> {{ tr: 'Anlatılar', en: 'Stories', ar: 'القصص' }[locale]}
      </Link>

      {/* HERO */}
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <LabelPlate
            caption={{ tr: 'Anlatı', en: 'Story', ar: 'قصة' }[locale]}
            accent={story.accent}
            size="sm"
          />
          <span className="text-[11px] uppercase tracking-widest font-bold text-ink/50 inline-flex items-center gap-1">
            <Clock size={12} />
            {story.readMinutes} {{ tr: 'dk', en: 'min', ar: 'دقيقة' }[locale]}
          </span>
        </div>

        <div className="flex justify-center mb-5">
          <span
            className="w-28 h-28 rounded-3xl flex items-center justify-center ring-8 ring-white/60 shadow-museum animate-revealGem"
            style={{
              background: `color-mix(in srgb, ${story.accent} 22%, white)`,
            }}
            aria-hidden="true"
          >
            <GemIcon id={story.icon} size={96} animate shimmer />
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.1] tracking-tight text-engraved">
          {pick(story.title, locale)}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-ink/70 leading-relaxed max-w-2xl mx-auto italic">
          {pick(story.subtitle, locale)}
        </p>

        {geoPointList.length > 0 && (
          <LocationStrip points={geoPointList} locale={locale} />
        )}
      </header>

      {/* SCENES */}
      <div className="space-y-12">
        {story.scenes.map((scene, i) => (
          <Scene
            key={scene.id}
            scene={scene}
            index={i}
            total={story.scenes.length}
            locale={locale}
            storyAccent={story.accent}
          />
        ))}
      </div>

      {/* TAKEAWAY */}
      <section
        className="mt-14 rounded-3xl p-6 sm:p-8 border-2 relative"
        style={{
          background: 'color-mix(in srgb, var(--hall-accent) 7%, white)',
          borderColor: 'color-mix(in srgb, var(--hall-accent) 35%, transparent)',
        }}
      >
        <WaxSeal
          letter="★"
          title={{ tr: 'Çıkarım', en: 'Takeaway', ar: 'خلاصة' }[locale]}
          size="md"
          color="#c0392b"
          className="absolute -top-5 -left-5"
        />
        <div className="text-label-plate mb-2 ml-12" style={{ color: 'var(--hall-accent)' }}>
          {{ tr: 'Çıkarım', en: 'Takeaway', ar: 'خلاصة' }[locale]}
        </div>
        <p className="ml-12 text-lg sm:text-xl text-ink font-display font-bold leading-snug">
          {pick(story.takeaway, locale)}
        </p>
      </section>

      {/* CURATOR NOTE */}
      {story.curatorNote && (
        <CuratorStoryNote
          note={story.curatorNote}
          locale={locale}
          citeMap={citeMap}
        />
      )}

      {/* TIMELINE */}
      {Array.isArray(story.timeline) && story.timeline.length > 0 && (
        <StoryTimeline
          items={story.timeline}
          locale={locale}
          citeMap={citeMap}
        />
      )}

      {/* VOCABULARY */}
      {Array.isArray(story.vocabulary) && story.vocabulary.length > 0 && (
        <VocabularyChips termIds={story.vocabulary} locale={locale} />
      )}

      {/* RELATED GRID (4-bölümlü; eski tek-satır relatedExhibits'in yerine) */}
      <div className="mt-10">
        <RelatedGrid
          exhibitIds={story.relatedExhibits || []}
          storyIds={stories
            .filter((s) => s.id !== story.id)
            .slice(0, 2)
            .map((s) => s.id)}
          labIds={story.relatedLabs || []}
          quizCatIds={story.relatedQuizzes || []}
          locale={locale}
        />
      </div>

      {/* CITATIONS FOOTNOTE */}
      {footnoteEntries.length > 0 && (
        <div className="mt-10">
          <CitationsFootnote entries={footnoteEntries} locale={locale} />
        </div>
      )}

      {/* OTHER STORIES */}
      <OtherStories currentId={story.id} locale={locale} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LocationStrip — hikâyenin geçtiği yerleri chip satırı
   ───────────────────────────────────────────────────────────── */
function LocationStrip({ points, locale }) {
  const LABEL = {
    tr: 'Geçtiği yerler',
    en: 'Places visited',
    ar: 'أماكن القصة',
  };
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      <span className="text-label-plate text-ink/50 inline-flex items-center gap-1 mr-1">
        <MapPin size={12} aria-hidden />
        {LABEL[locale] || LABEL.tr}:
      </span>
      {points.map((g) => {
        const place = pick(g.place || g.name, locale);
        return (
          <Link
            key={g.id}
            to={`/map#${encodeURIComponent(g.id)}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                       bg-white/80 border border-ink/10 hover:border-ink/30
                       text-xs font-bold text-ink/80 hover:text-ink lift-on-hover transition"
          >
            {place}
          </Link>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scene — tek bir sahne
   ───────────────────────────────────────────────────────────── */
function Scene({ scene, index, total, locale, storyAccent }) {
  const body = pick(scene.body, locale);
  const title = pick(scene.title, locale);
  const quote = scene.pullquote ? pick(scene.pullquote, locale) : null;
  const isEven = index % 2 === 0;

  return (
    <article className="relative">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-stat-number text-2xl opacity-50"
          style={{ color: storyAccent }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(to right, color-mix(in srgb, var(--hall-accent) 30%, transparent), transparent)',
          }}
          aria-hidden="true"
        />
        <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">
          {{ tr: 'Sahne', en: 'Scene', ar: 'مشهد' }[locale]} {index + 1}/{total}
        </span>
      </div>

      <div className={cx('flex flex-col gap-6', isEven ? 'sm:flex-row' : 'sm:flex-row-reverse')}>
        {scene.icon && (
          <aside className="shrink-0 self-start">
            <span
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center ring-4 ring-white/60 shadow-sm display-case"
              style={{
                background: `color-mix(in srgb, ${storyAccent} 16%, white)`,
              }}
              aria-hidden="true"
            >
              <GemIcon id={scene.icon} size={72} animate />
            </span>
          </aside>
        )}

        <div className="flex-1 min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink mb-3 leading-tight">
            {title}
          </h2>
          {/* Karar 1: sahne body'leri "küratör yorumu" — inline cite yok.
              BodyWithCitations paragraph'a ayırır; [n] marker görürse
              <sup> yapar (ileride gerekirse çalışır halde bekler). */}
          <BodyWithCitations text={body} />

          {quote && (
            <blockquote
              className="mt-5 pl-5 border-l-4 italic text-xl font-display font-bold text-ink/90 leading-snug"
              style={{ borderColor: storyAccent }}
            >
              {quote}
            </blockquote>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   OtherStories — sayfa dibinde diğer hikâye kartları
   ───────────────────────────────────────────────────────────── */
function OtherStories({ currentId, locale }) {
  const others = stories.filter((s) => s.id !== currentId).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section className="mt-14 pt-8 border-t border-ink/10">
      <h2 className="font-display text-xl font-extrabold text-ink mb-4 flex items-center gap-2">
        <BookOpen size={18} className="text-ink/60" />
        {{
          tr: 'Diğer Hikâyeler',
          en: 'Other Stories',
          ar: 'قصص أخرى',
        }[locale]}
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {others.map((s) => (
          <Link
            key={s.id}
            to={`/stories/${s.id}`}
            className="block rounded-2xl p-4 bg-white/85 border border-ink/8 hover:border-ink/20 lift-on-hover"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `color-mix(in srgb, ${s.accent} 18%, white)` }}
              >
                <GemIcon id={s.icon} size={32} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold text-ink text-sm leading-tight">
                  {pick(s.title, locale)}
                </div>
                <div className="text-xs text-ink/50 mt-0.5">
                  {s.readMinutes} {{ tr: 'dk', en: 'min', ar: 'دقيقة' }[locale]}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
