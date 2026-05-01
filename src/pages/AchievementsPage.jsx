import { useMemo } from 'react';
import { Star, Trophy } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { badges, computeUnlockedBadges } from '../data/achievements.js';
import { halls } from '../data/halls.js';
import { exhibitsByHall, totalExhibitCount } from '../data/exhibits/index.js';
import { categories } from '../data/quizzes.js';
import { pick } from '../utils/helpers.js';
import Badge from '../components/common/Badge.jsx';
import ProgressBar from '../components/common/ProgressBar.jsx';

export default function AchievementsPage() {
  const { t, locale } = useLocale();
  const progress = useProgress();
  const { visitedExhibits, visitedHalls, quizStars, totalStars, labsCompleted } = progress;

  const hallExhibitIds = useMemo(() => {
    const map = {};
    for (const [k, arr] of Object.entries(exhibitsByHall)) {
      map[k] = arr.map((e) => e.id);
    }
    return map;
  }, []);

  const unlocked = useMemo(
    () => computeUnlockedBadges(progress, { hallExhibitIds }),
    [progress, hallExhibitIds],
  );
  const unlockedIds = new Set(unlocked.map((b) => b.id));
  const exhibitPct = visitedExhibits.size / totalExhibitCount();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
        {t('achievements.title')}
      </h1>

      {/* Stats row */}
      <section className="mt-6 grid sm:grid-cols-3 gap-4 mb-10">
        <Stat
          tone="#d4a017"
          icon={<Trophy size={20} />}
          value={`${unlocked.length}/${badges.length}`}
          label={t('achievements.badges')}
        />
        <Stat
          tone="#8e44ad"
          icon={<Star size={20} fill="currentColor" />}
          value={totalStars}
          label={t('achievements.stars')}
        />
        <Stat
          tone="#27ae60"
          icon={<span className="text-lg">🏛️</span>}
          value={`${visitedHalls.size}/${halls.length}`}
          label={t('achievements.visitedHalls')}
        />
      </section>

      {/* Overall progress */}
      <section className="mb-10">
        <ProgressBar
          value={exhibitPct}
          label={t('achievements.progress', { p: Math.round(exhibitPct * 100) })}
        />
        <div className="text-xs font-bold text-ink/50 mt-2">
          {visitedExhibits.size} / {totalExhibitCount()} {t('hall.stands')}
          {labsCompleted.size > 0 && ` · ${labsCompleted.size} ${{
            tr: 'deney tamamlandı',
            en: 'labs complete',
            ar: 'تجارب مكتملة',
          }[locale] || 'deney tamamlandı'}`}
        </div>
      </section>

      {/* Badges */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-extrabold text-ink mb-4">
          {t('achievements.badges')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((b) => (
            <Badge key={b.id} badge={b} unlocked={unlockedIds.has(b.id)} />
          ))}
        </div>
      </section>

      {/* Per-hall progress */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-extrabold text-ink mb-4">
          {t('nav.halls')}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {halls.map((h) => {
            const ids = hallExhibitIds[h.id] || [];
            const done = ids.filter((id) => visitedExhibits.has(id)).length;
            const pctVal = ids.length === 0 ? 0 : done / ids.length;
            return (
              <div
                key={h.id}
                className="rounded-2xl bg-white border border-ink/5 shadow-sm p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `color-mix(in srgb, ${h.accent} 20%, white)` }}
                  >
                    {h.emoji}
                  </span>
                  <h3 className="font-display font-extrabold text-ink flex-1">
                    {pick(h.name, locale)}
                  </h3>
                  <span className="text-xs font-bold text-ink/50">
                    {done}/{ids.length}
                  </span>
                </div>
                <ProgressBar value={pctVal} tone="ink" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Quiz stars per category */}
      <section>
        <h2 className="font-display text-2xl font-extrabold text-ink mb-4">
          {t('achievements.stars')}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((c) => {
            const stars = quizStars[c.id] || 0;
            return (
              <div
                key={c.id}
                className="rounded-2xl p-4 bg-white border border-ink/5 shadow-sm flex items-center gap-3"
              >
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1">
                  <div className="font-display font-extrabold text-ink text-sm">
                    {pick(c, locale)}
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5" aria-label={`${stars}/5`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i <= stars ? 'text-gold' : 'text-ink/15'}
                        fill={i <= stars ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ tone, icon, value, label }) {
  return (
    <div className="rounded-3xl p-5 bg-white border border-ink/5 shadow-museum flex items-center gap-4">
      <span
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
        style={{ background: tone }}
      >
        {icon}
      </span>
      <div>
        <div className="font-display text-2xl font-extrabold text-ink leading-none">
          {value}
        </div>
        <div className="text-xs font-bold text-ink/50 mt-1">{label}</div>
      </div>
    </div>
  );
}
