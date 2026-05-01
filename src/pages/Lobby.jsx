import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import {
  BookOpenText,
  FlaskConical,
  Brain,
  Map as MapIcon,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { halls } from '../data/halls.js';
import { allExhibits, totalExhibitCount } from '../data/exhibits/index.js';
import { pick, hallTheme, cx } from '../utils/helpers.js';
import { iconFor } from '../utils/iconFor.js';
import ProgressBar from '../components/common/ProgressBar.jsx';
import { DisplayCase, LabelPlate, SpotLight } from '../components/museum/index.js';
import { GemIcon } from '../components/icons/gems/index.js';

/* Deterministic "today's exhibit" from the day-of-year so it stays stable for a day */
function exhibitOfTheDay() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const day = Math.floor((d - start) / 86400000);
  return allExhibits[day % allExhibits.length];
}

function useVisitorCount() {
  // Decorative — not a real counter
  return useMemo(() => 2400 + Math.floor(Math.random() * 500), []);
}

export default function Lobby() {
  const { t, locale } = useLocale();
  const { visitedExhibits, visitedHalls } = useProgress();
  const visitors = useVisitorCount();
  const today = exhibitOfTheDay();
  const todayHall = halls.find((h) => h.id === today.cat);
  const todayIcon = iconFor(today, today.cat);

  const progress = visitedExhibits.size / totalExhibitCount();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* ═══════════════════════════════════════════════
           HERO — museum portico
           ═══════════════════════════════════════════════ */}
      <section
        className="relative rounded-[2.5rem] overflow-hidden
                   bg-gradient-to-br from-parchment via-cream to-gold-soft/50
                   border border-gold/20 shadow-museum"
      >
        <div className="absolute inset-0 museum-floor opacity-60" aria-hidden="true" />
        <div className="hero-light-pool" aria-hidden="true" />

        {/* Ambient corner spotlights (dark gallery drama) */}
        <SpotLight tone="warm" size="lg" flicker className="top-[-60%] left-[-10%]" />
        <SpotLight tone="cool" size="md" className="bottom-[-40%] right-[-10%]" />

        <div className="relative px-6 sm:px-10 py-10 sm:py-14 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                         bg-ink text-cream text-[11px] uppercase tracking-widest font-extrabold
                         animate-fadeUp"
              style={{ animationDelay: '0ms' }}
            >
              <Sparkles size={12} /> JewelPedi Kids
            </span>

            <h1
              className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl
                         font-extrabold leading-[1.05] tracking-tight
                         animate-curtainUp"
              style={{ animationDelay: '120ms' }}
            >
              <span className="text-engraved">{t('lobby.welcome')}</span>
            </h1>

            <p
              className="mt-4 text-lg text-ink/75 max-w-xl leading-relaxed animate-fadeUp"
              style={{ animationDelay: '240ms' }}
            >
              {t('lobby.subtitle')}
            </p>

            {visitedExhibits.size > 0 && (
              <div className="mt-6 max-w-sm animate-fadeUp" style={{ animationDelay: '360ms' }}>
                <ProgressBar
                  value={progress}
                  label={`${visitedExhibits.size}/${totalExhibitCount()} · ${t(
                    'achievements.progress',
                    { p: Math.round(progress * 100) },
                  )}`}
                />
              </div>
            )}
          </div>

          {/* Hand-drawn gem tableau */}
          <div className="relative hidden md:block self-stretch" aria-hidden="true">
            <HeroGemStack />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           TODAY / VISITORS ROW
           ═══════════════════════════════════════════════ */}
      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-3">
        {/* Today's exhibit — now a proper DisplayCase */}
        <DisplayCase
          to={`/halls/${today.cat}/${today.id}`}
          emphasis={today.accent}
          interactive
          className="h-full"
          style={hallTheme(todayHall)}
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest
                          font-extrabold text-gold mb-3">
            <Sparkles size={12} /> {t('lobby.todayExhibit')}
          </div>
          <div className="flex items-center gap-3">
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center
                         ring-4 ring-white/70 shadow-sm animate-revealGem"
              style={{ background: `color-mix(in srgb, ${today.accent} 18%, white)` }}
            >
              <GemIcon
                id={todayIcon.id}
                size={44}
                animate={todayIcon.animate}
                shimmer={todayIcon.shimmer}
              />
            </span>
            <div>
              <div className="text-xs font-bold text-ink/50">
                {pick(todayHall?.name, locale)}
              </div>
              <h3 className="font-display font-extrabold text-ink text-lg">
                {pick(today.name, locale)}
              </h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-ink/70 line-clamp-2">
            {pick(today.intro, locale)}
          </p>
        </DisplayCase>

        {/* Today workshop */}
        <DisplayCase to="/workshop" emphasis="#e67e22" interactive className="h-full">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest
                          font-extrabold text-craft mb-3">
            <GemIcon id="hasir-weave" size={14} /> {t('lobby.todayWorkshop')}
          </div>
          <h3 className="font-display font-extrabold text-ink text-lg">
            Trabzon Hasırı
          </h3>
          <p className="mt-1 text-sm text-ink/70">
            {{
              tr: '8 adımda gümüş tellerin nasıl örüldüğünü keşfet.',
              en: 'Discover how silver wires are woven — in 8 steps.',
              ar: 'اكتشف كيفية نسج خيوط الفضة في 8 خطوات.',
            }[locale] || '8 adımda gümüş tellerin nasıl örüldüğünü keşfet.'}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-craft">
            {t('common.open')} <ArrowRight size={14} />
          </span>
        </DisplayCase>

        {/* Visitors — dramatic dark counter block */}
        <div className="rounded-3xl bg-ink text-cream p-5 flex flex-col justify-between
                        shadow-museum relative overflow-hidden">
          {/* Subtle warm glow behind the number */}
          <span
            className="absolute -inset-4 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at 50% 40%, rgba(247, 201, 72, 0.35), transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div className="relative text-[11px] uppercase tracking-widest font-extrabold text-gold mb-3">
            {t('lobby.visitors')}
          </div>
          <div className="relative text-stat-number text-5xl sm:text-6xl text-cream animate-popIn">
            {visitors.toLocaleString(locale)}
          </div>
          <div className="relative mt-2 text-xs text-cream/60 font-bold">
            {{
              tr: 'Bu sadece dekoratif — gerçek sayaç değil.',
              en: 'Decorative — not a real counter.',
              ar: 'رقم زخرفي فقط، ليس عدّاداً حقيقياً.',
            }[locale] || 'Bu sadece dekoratif — gerçek sayaç değil.'}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           HALL DOORS
           ═══════════════════════════════════════════════ */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            {t('nav.halls')}
          </h2>
          <span className="text-xs font-bold text-ink/50">
            {visitedHalls.size}/{halls.length} {t('achievements.visitedHalls')}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {halls.map((hall, i) => {
            const hallIcon = iconFor({ id: 'hall-default', cat: hall.id }, hall.id);
            return (
              <Link
                key={hall.id}
                to={`/halls/${hall.id}`}
                className={cx(
                  'lift-on-hover relative block rounded-3xl p-5 border shadow-museum animate-fadeUp',
                  visitedHalls.has(hall.id) ? 'ring-2 ring-gem/40' : '',
                )}
                style={{
                  background: `linear-gradient(140deg, ${hall.soft}, white 70%)`,
                  borderColor: `color-mix(in srgb, ${hall.accent} 25%, transparent)`,
                  animationDelay: `${i * 40}ms`,
                  '--hall-accent': hall.accent,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center
                             ring-4 ring-white/70 mb-3"
                  style={{ background: `color-mix(in srgb, ${hall.accent} 18%, white)` }}
                  aria-hidden="true"
                >
                  <GemIcon
                    id={hallIcon.id}
                    size={36}
                    animate={hallIcon.animate}
                    shimmer={hallIcon.shimmer}
                  />
                </div>
                <h3
                  className="font-display text-xl font-extrabold mb-1"
                  style={{ color: hall.ink }}
                >
                  {pick(hall.name, locale)}
                </h3>
                <p className="text-sm text-ink/70 leading-snug">
                  {pick(hall.tagline, locale)}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold"
                  style={{ color: hall.accent }}
                >
                  {t('lobby.enterHall')} <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           DISCOVER MORE — Stories / Timeline / Educators
           ═══════════════════════════════════════════════ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink mb-1">
          {{
            tr: 'Daha Fazla Keşfet',
            en: 'Discover More',
            ar: 'اكتشف المزيد',
          }[locale]}
        </h2>
        <p className="text-sm text-ink/60 mb-5">
          {{
            tr: 'Anlatılar, zaman çizgisi ve öğretmen kaynakları.',
            en: 'Stories, timeline and teacher resources.',
            ar: 'قصص وخط زمني وموارد للمعلمين.',
          }[locale]}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DiscoverTile
            to="/games"
            accent="#c0392b"
            iconId="ruby"
            eyebrow={{ tr: 'Oyunlar', en: 'Games', ar: 'ألعاب' }[locale]}
            title={{
              tr: 'Oyun Merkezi',
              en: 'Games Arcade',
              ar: 'مركز الألعاب',
            }[locale]}
            body={{
              tr: '5 farklı oyun: eşleştirme, sıralama, kuyumcu simülasyonu. Rozet kazan!',
              en: '5 games: match-3, sorting, jeweler sim. Earn badges!',
              ar: '5 ألعاب: مطابقة وترتيب ومحاكاة صياغة. شارات بانتظارك!',
            }[locale]}
          />
          <DiscoverTile
            to="/stories"
            accent="#8e44ad"
            iconId="emerald"
            eyebrow={{ tr: 'Anlatılar', en: 'Stories', ar: 'قصص' }[locale]}
            title={{
              tr: 'Hikâyelerin Müzesi',
              en: 'Museum of Stories',
              ar: 'متحف القصص',
            }[locale]}
            body={{
              tr: 'Kleopatra\'nın zümrüdünden Mardin telkârisine — 5 gerçek hikâye.',
              en: 'From Cleopatra\'s emerald to Mardin filigree — 5 true stories.',
              ar: 'من زمرد كليوباترا إلى تلكاري ماردين — 5 قصص حقيقية.',
            }[locale]}
          />
          <DiscoverTile
            to="/timeline"
            accent="#2980b9"
            iconId="diamond"
            eyebrow={{ tr: 'Zaman Çizgisi', en: 'Timeline', ar: 'الخط الزمني' }[locale]}
            title={{
              tr: '6000 Yıllık Yolculuk',
              en: '6,000 Years of Journey',
              ar: 'رحلة 6000 عام',
            }[locale]}
            body={{
              tr: 'Varna\'dan 2024\'e, 70 tarihi olay. Yatay kaydırarak zamanda ilerle.',
              en: 'From Varna to 2024, 70 historical events. Scroll horizontally.',
              ar: 'من فارنا إلى 2024، 70 حدثاً. اسحب أفقياً.',
            }[locale]}
          />
          <DiscoverTile
            to="/educators"
            accent="#16a085"
            iconId="hasir-weave"
            eyebrow={{ tr: 'Öğretmenler', en: 'Educators', ar: 'للمعلمين' }[locale]}
            title={{
              tr: 'Sınıfa İniyor',
              en: 'Into the Classroom',
              ar: 'إلى الصف الدراسي',
            }[locale]}
            body={{
              tr: '4 ders planı. Mohs deneyi, gümüş kimyası, Lidya tarihi, Coğrafi İşaret. Yazdırılabilir.',
              en: '4 lesson plans. Mohs experiment, silver chemistry, Lydian history, Geographical Indication. Printable.',
              ar: '4 خطط دروس قابلة للطباعة.',
            }[locale]}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           QUICK ACCESS
           ═══════════════════════════════════════════════ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-extrabold text-ink mb-4">
          {t('lobby.quickAccess')}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickCard to="/quiz"     icon={<Brain size={20} />}         label={t('nav.quiz')}     tone="#8e44ad" />
          <QuickCard to="/lab"      icon={<FlaskConical size={20} />}  label={t('nav.lab')}      tone="#27ae60" />
          <QuickCard to="/map"      icon={<MapIcon size={20} />}       label={t('nav.map')}      tone="#5dade2" />
          <QuickCard to="/glossary" icon={<BookOpenText size={20} />}  label={t('nav.glossary')} tone="#e67e22" />
        </div>
      </section>
    </div>
  );
}

function QuickCard({ to, icon, label, tone }) {
  return (
    <Link
      to={to}
      className="rounded-2xl p-4 bg-white/90 border border-ink/5 shadow-museum
                 flex items-center gap-3 lift-on-hover"
    >
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
        style={{ background: tone }}
      >
        {icon}
      </span>
      <span className="font-display font-extrabold text-ink">{label}</span>
      <ArrowRight size={14} className="ml-auto text-ink/40" />
    </Link>
  );
}

function DiscoverTile({ to, accent, iconId, eyebrow, title, body }) {
  const { locale } = useLocale();
  const cta = { tr: 'Keşfet', en: 'Discover', ar: 'اكتشف' }[locale] || 'Discover';
  return (
    <Link
      to={to}
      className="group rounded-3xl p-5 bg-white/95 border border-ink/8 shadow-museum
                 flex flex-col gap-3 lift-on-hover relative overflow-hidden"
      style={{ borderLeftWidth: 4, borderLeftColor: accent }}
    >
      {/* Soft gradient glow */}
      <span
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30 pointer-events-none group-hover:opacity-50 transition"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="flex items-center gap-3 relative">
        <span
          className="w-14 h-14 rounded-2xl flex items-center justify-center ring-4 ring-white/70 shrink-0"
          style={{ background: `color-mix(in srgb, ${accent} 22%, white)` }}
          aria-hidden="true"
        >
          <GemIcon id={iconId} size={48} animate />
        </span>
        <div
          className="text-[11px] uppercase tracking-widest font-extrabold"
          style={{ color: accent }}
        >
          {eyebrow}
        </div>
      </div>
      <h3 className="font-display text-lg font-extrabold text-ink leading-tight relative">
        {title}
      </h3>
      <p className="text-sm text-ink/70 leading-snug relative flex-1">{body}</p>
      <span
        className="inline-flex items-center gap-1 text-sm font-bold relative"
        style={{ color: accent }}
      >
        {cta}
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   HeroGemStack — three gems arranged on a glass pedestal
   with particle sparkles and a slow vertical float.
   ───────────────────────────────────────────────────────────── */
function HeroGemStack() {
  return (
    <div className="relative w-[240px] h-[260px]">
      {/* Back spotlight halo */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(247, 201, 72, 0.35) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Particle field — 6 staggered twinkles */}
      <span className="particle animate-twinkle" style={{ top: '12%', left: '18%', animationDelay: '0ms' }} />
      <span className="particle animate-twinkle" style={{ top: '22%', right: '10%', animationDelay: '400ms' }} />
      <span className="particle animate-twinkle" style={{ top: '55%', left: '5%', animationDelay: '800ms' }} />
      <span className="particle animate-twinkle" style={{ bottom: '10%', right: '22%', animationDelay: '1200ms' }} />
      <span className="particle animate-twinkle" style={{ top: '40%', right: '35%', animationDelay: '1600ms' }} />
      <span className="particle animate-twinkle" style={{ bottom: '30%', left: '30%', animationDelay: '2000ms' }} />

      {/* Gem arrangement — floating triangle */}
      <div className="absolute inset-0 flex items-center justify-center animate-floatY">
        {/* Top diamond */}
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 animate-revealGem"
          style={{ animationDelay: '300ms' }}
        >
          <GemIcon id="diamond" size={96} animate />
        </div>

        {/* Bottom-left ruby */}
        <div
          className="absolute bottom-[18%] left-[8%] animate-revealGem"
          style={{ animationDelay: '500ms' }}
        >
          <GemIcon id="ruby" size={72} animate />
        </div>

        {/* Bottom-right emerald */}
        <div
          className="absolute bottom-[14%] right-[6%] animate-revealGem"
          style={{ animationDelay: '700ms' }}
        >
          <GemIcon id="emerald" size={80} animate />
        </div>
      </div>

      {/* Glass pedestal — elliptical platform shadow */}
      <span
        className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-40 h-6 rounded-[50%]
                   pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(27, 40, 69, 0.28) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
