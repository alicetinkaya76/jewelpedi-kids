import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Trophy, Gamepad2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { games } from '../data/games.js';
import { GemIcon } from '../components/icons/gems/index.js';
import { pick, cx } from '../utils/helpers.js';

/**
 * GamesHub — /games route. A tile grid showcasing all 5 games.
 *
 * Visual language shares the "Display case" aesthetic of the rest of the
 * museum (ring-white accents, hall accent strips, Baloo display font). Each
 * tile links to /games/:id where GamePlay renders the actual experience.
 *
 * Unlike QuizHub (which launches inline), games are proper routed pages so
 * the URL captures which game you're playing — better for sharing + back
 * button UX.
 */
export default function GamesHub() {
  const { t, locale } = useLocale();
  const { badges, gameBests } = useProgress();

  const earnedCount = games.filter((g) => badges.has(g.badgeId)).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* Hero */}
      <section className="mb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink text-cream
                     text-[11px] uppercase tracking-widest font-extrabold mb-4"
        >
          <Gamepad2 size={12} /> {t('nav.games')}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2 leading-tight">
          {{
            tr: 'Oyun Merkezi',
            en: 'Games Arcade',
            ar: 'مركز الألعاب',
          }[locale]}
        </h1>
        <p className="text-ink/70 max-w-2xl leading-relaxed">
          {{
            tr: 'Müze konularını oyunlaştırdık. Her oyun seni gerçek bir sergi, deney veya hikâyeye bağlar. Rozet kazan, skorunu ilerlet, arkadaşlarınla yarış!',
            en: 'Museum topics, gamified. Every game ties back to a real exhibit, experiment or story. Earn badges, beat your score, race your friends.',
            ar: 'ألعاب مستوحاة من المتحف. كل لعبة ترتبط بمعرض أو تجربة. اكسب شارات وتحدَّ أصدقاءك.',
          }[locale]}
        </p>

        {/* Stats strip */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       bg-gold-soft text-ink text-sm font-extrabold border border-gold/30"
          >
            <Trophy size={14} className="text-gold" />
            {earnedCount}/{games.length} {{
              tr: 'rozet',
              en: 'badges',
              ar: 'شارات',
            }[locale]}
          </span>
          <span className="text-xs font-bold text-ink/60">
            {games.length} {{
              tr: 'oyun · 3 zorluk seviyesi',
              en: 'games · 3 difficulty levels',
              ar: 'ألعاب · 3 مستويات',
            }[locale]}
          </span>
        </div>
      </section>

      {/* Game grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {games.map((g, idx) => {
          const perDiff = gameBests?.[g.id];
          const bestScore = perDiff
            ? Math.max(...Object.values(perDiff))
            : 0;
          return (
            <GameTile
              key={g.id}
              game={g}
              locale={locale}
              delay={idx * 80}
              earned={badges.has(g.badgeId)}
              bestScore={bestScore}
            />
          );
        })}
      </div>
    </div>
  );
}

function GameTile({ game, locale, delay, earned, bestScore = 0 }) {
  const { accent } = game;
  return (
    <Link
      to={`/games/${game.id}`}
      className={cx(
        'group relative rounded-3xl p-5 bg-white/95 border border-ink/8 shadow-museum',
        'flex flex-col gap-3 transition animate-fadeUp',
        'hover:-translate-y-1 hover:shadow-stand',
      )}
      style={{
        borderLeftWidth: 5,
        borderLeftColor: accent,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Decorative gradient blob */}
      <span
        aria-hidden="true"
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-25 pointer-events-none
                   group-hover:opacity-45 transition"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
        }}
      />

      <div className="flex items-start gap-3 relative">
        <span
          className="w-14 h-14 rounded-2xl flex items-center justify-center ring-4 ring-white/70 shrink-0"
          style={{ background: `color-mix(in srgb, ${accent} 20%, white)` }}
          aria-hidden="true"
        >
          <GemIcon id={game.icon} size={44} animate />
        </span>
        <div className="flex-1 min-w-0">
          <div
            className="text-[10px] uppercase tracking-widest font-extrabold flex items-center gap-2"
            style={{ color: accent }}
          >
            <span>
              {{
                arcade: { tr: 'Arcade', en: 'Arcade', ar: 'آركيد' },
                puzzle: { tr: 'Bulmaca', en: 'Puzzle', ar: 'ألغاز' },
                strategy: { tr: 'Strateji', en: 'Strategy', ar: 'استراتيجية' },
                quiz: { tr: 'Bilgi', en: 'Quiz', ar: 'معرفة' },
              }[game.genre]?.[locale] || game.genre}
            </span>
            <span className="text-ink/30">•</span>
            <span className="inline-flex items-center gap-1 text-ink/50">
              <Clock size={10} />~{game.durationMin} dk
            </span>
            {earned && (
              <span className="ml-auto text-gold" title="Badge earned">🏆</span>
            )}
          </div>
          <h3 className="font-display text-xl font-extrabold text-ink mt-0.5 leading-tight">
            {pick(game.title, locale)}
          </h3>
        </div>
      </div>

      <p className="text-sm text-ink/70 leading-relaxed relative">
        {pick(game.tagline, locale)}
      </p>

      <div className="flex items-center gap-1 mt-auto pt-1 relative">
        <span
          className="text-sm font-extrabold transition group-hover:gap-2"
          style={{ color: accent }}
        >
          {{ tr: 'Oyna', en: 'Play', ar: 'العب' }[locale]}
        </span>
        <ArrowRight
          size={16}
          style={{ color: accent }}
          className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
        />
        {bestScore > 0 && (
          <span
            className="ml-auto rtl:ml-0 rtl:mr-auto inline-flex items-center gap-1
                       px-2 py-0.5 rounded-full bg-ink/5 text-ink/70
                       text-[10px] font-extrabold uppercase tracking-widest"
            title={
              {
                tr: 'En iyi skorun',
                en: 'Your best score',
                ar: 'أفضل نتيجتك',
              }[locale]
            }
          >
            ★ {bestScore.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
