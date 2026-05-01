import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, HelpCircle, Gem, Hammer } from 'lucide-react';
import { pick } from '../../utils/helpers.js';
import { iconFor } from '../../utils/iconFor.js';
import { GemIcon } from '../icons/gems/index.js';
import { getStory } from '../../data/stories.js';
import { getExhibit } from '../../data/exhibits/index.js';
import { categories as quizCategories } from '../../data/quizzes.js';

/* ──────────────────────────────────────────────────────────────
   Lab meta — LabPage'deki listenin küçük kopyası.
   Yalnızca RelatedGrid'te chip göstermek için isim/emoji lazım.
   Lab listesi değişirse burayı da güncelle.
   ────────────────────────────────────────────────────────────── */
const LAB_META = {
  karat:   { tr: 'Ayar Hesaplayıcı',      en: 'Karat Calculator',    ar: 'حاسبة العيار',         emoji: '🧮' },
  mohs:    { tr: 'Mohs Çizim Testi',      en: 'Mohs Scratch Test',   ar: 'اختبار خدش موس',       emoji: '🪨' },
  tarnish: { tr: 'Gümüş Oksitlenme',      en: 'Silver Tarnish',      ar: 'تأكسد الفضة',          emoji: '💧' },
  light:   { tr: 'Pırlanta Kesim',        en: 'Diamond Cut',         ar: 'قطع الماس',             emoji: '💎' },
  lydia:   { tr: 'Lidya Darphanesi',      en: 'Lydia Mint',          ar: 'سك اللوديون',           emoji: '🪙' },
  melt:    { tr: 'Erime Noktaları',       en: 'Melting Points',      ar: 'نقاط الانصهار',         emoji: '🔥' },
  guess:   { tr: 'Taş Tanıma',            en: 'Stone Guess',         ar: 'تخمين الحجر',           emoji: '🔍' },
};

/* ──────────────────────────────────────────────────────────────
   Workshop meta — WorkshopHub'daki 4 atölyenin küçük kopyası.
   Faz 6-Z'de eklendi (6-H'de manuel chip yazılmak zorundaydı).
   Atölye listesi değişirse burayı da güncelle.
   ────────────────────────────────────────────────────────────── */
const WORKSHOP_META = {
  hasir:          { tr: 'Trabzon Hasırı',    en: 'Trabzon Hasır',      ar: 'حصير طرابزون',     emoji: '🧶' },
  'telkari-usta': { tr: 'Telkâri Ustası',    en: 'Filigree Master',    ar: 'أستاذ التلكاري',   emoji: '🕸️' },
  savat:          { tr: 'Siirt Savatı',      en: 'Siirt Niello',       ar: 'سواد سيرت',         emoji: '🖤' },
  mine:           { tr: 'İstanbul Minesi',   en: 'Istanbul Enamel',    ar: 'مينا إسطنبول',      emoji: '🎨' },
};

const SECTION_HEADERS = {
  exhibits:  { tr: 'İlgili Sergiler',   en: 'Related Exhibits',    ar: 'معارض ذات صلة' },
  stories:   { tr: 'İlgili Hikâyeler',  en: 'Related Stories',     ar: 'قصص ذات صلة' },
  labs:      { tr: 'İlgili Deneyler',   en: 'Related Experiments', ar: 'تجارب ذات صلة' },
  workshops: { tr: 'İlgili Atölyeler',  en: 'Related Workshops',   ar: 'ورش ذات صلة' },
  quizzes:   { tr: 'İlgili Quizler',    en: 'Related Quizzes',     ar: 'اختبارات ذات صلة' },
};

/**
 * RelatedGrid — sergi sayfasının dibinde 5 bölümlü "daha fazla keşfet" grid'i.
 *
 * props:
 *   exhibitIds:   string[]   (related exhibits)
 *   storyIds:     string[]
 *   labIds:       string[]
 *   workshopIds:  string[]   (Faz 6-Z: eklendi)
 *   quizCatIds:   string[]
 *   locale:       'tr'|'en'|'ar'
 *
 * Her bölüm boşsa render edilmez. Hepsi boşsa section tamamen gizlenir.
 */
export default function RelatedGrid({
  exhibitIds = [],
  storyIds = [],
  labIds = [],
  workshopIds = [],
  quizCatIds = [],
  locale = 'tr',
}) {
  const exhibits = exhibitIds.map(getExhibit).filter(Boolean);
  const stories = storyIds.map(getStory).filter(Boolean);
  const labs = labIds
    .map((id) => (LAB_META[id] ? { id, ...LAB_META[id] } : null))
    .filter(Boolean);
  const workshops = workshopIds
    .map((id) => (WORKSHOP_META[id] ? { id, ...WORKSHOP_META[id] } : null))
    .filter(Boolean);
  const quizzes = quizCatIds
    .map((id) => quizCategories.find((c) => c.id === id))
    .filter(Boolean);

  const total =
    exhibits.length + stories.length + labs.length + workshops.length + quizzes.length;
  if (total === 0) return null;

  return (
    <section className="mt-2 mb-4 space-y-6">
      {exhibits.length > 0 && (
        <RelatedBlock
          title={pickLocale(SECTION_HEADERS.exhibits, locale)}
          icon={<Gem size={16} />}
        >
          <div className="flex flex-wrap gap-2">
            {exhibits.map((r) => {
              const ri = iconFor(r, r.cat);
              return (
                <Link
                  key={r.id}
                  to={`/halls/${r.cat}/${r.id}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full
                             bg-white border border-ink/10 hover:border-ink/30
                             font-bold text-sm text-ink lift-on-hover transition"
                >
                  <GemIcon id={ri.id} size={20} />
                  {pick(r.name, locale)}
                </Link>
              );
            })}
          </div>
        </RelatedBlock>
      )}

      {stories.length > 0 && (
        <RelatedBlock
          title={pickLocale(SECTION_HEADERS.stories, locale)}
          icon={<BookOpen size={16} />}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {stories.map((s) => (
              <Link
                key={s.id}
                to={`/stories/${s.id}`}
                className="rounded-2xl p-4 bg-white border border-ink/10 hover:border-ink/30
                           lift-on-hover transition flex items-start gap-3"
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ background: `color-mix(in srgb, ${s.accent || 'var(--hall-accent)'} 18%, white)` }}
                  aria-hidden
                >
                  {s.icon ? <GemIcon id={s.icon} size={26} /> : '📖'}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-label-plate mb-0.5"
                    style={{ color: s.accent || 'var(--hall-accent)' }}
                  >
                    {s.readMinutes
                      ? {
                          tr: `${s.readMinutes} dk okuma`,
                          en: `${s.readMinutes} min read`,
                          ar: `${s.readMinutes} دقيقة`,
                        }[locale]
                      : (
                          { tr: 'Hikâye', en: 'Story', ar: 'قصة' }[locale]
                        )}
                  </div>
                  <div className="font-display font-extrabold text-ink text-sm leading-tight">
                    {pick(s.title, locale)}
                  </div>
                  {s.subtitle && (
                    <div className="text-xs text-ink/60 mt-1 line-clamp-2">
                      {pick(s.subtitle, locale)}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </RelatedBlock>
      )}

      {labs.length > 0 && (
        <RelatedBlock
          title={pickLocale(SECTION_HEADERS.labs, locale)}
          icon={<FlaskConical size={16} />}
        >
          <div className="flex flex-wrap gap-2">
            {labs.map((lab) => (
              <Link
                key={lab.id}
                to={`/lab?id=${lab.id}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full
                           bg-white border border-ink/10 hover:border-ink/30
                           font-bold text-sm text-ink lift-on-hover transition"
              >
                <span aria-hidden>{lab.emoji}</span>
                {lab[locale] || lab.tr}
              </Link>
            ))}
          </div>
        </RelatedBlock>
      )}

      {workshops.length > 0 && (
        <RelatedBlock
          title={pickLocale(SECTION_HEADERS.workshops, locale)}
          icon={<Hammer size={16} />}
        >
          <div className="flex flex-wrap gap-2">
            {workshops.map((w) => (
              <Link
                key={w.id}
                to={`/workshop?id=${w.id}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full
                           bg-white border border-ink/10 hover:border-ink/30
                           font-bold text-sm text-ink lift-on-hover transition"
              >
                <span aria-hidden>{w.emoji}</span>
                {w[locale] || w.tr}
              </Link>
            ))}
          </div>
        </RelatedBlock>
      )}

      {quizzes.length > 0 && (
        <RelatedBlock
          title={pickLocale(SECTION_HEADERS.quizzes, locale)}
          icon={<HelpCircle size={16} />}
        >
          <div className="flex flex-wrap gap-2">
            {quizzes.map((q) => (
              <Link
                key={q.id}
                to={`/quiz?cat=${q.id}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full
                           bg-white border border-ink/10 hover:border-ink/30
                           font-bold text-sm text-ink lift-on-hover transition"
              >
                <span aria-hidden>{q.emoji}</span>
                {q[locale] || q.tr}
              </Link>
            ))}
          </div>
        </RelatedBlock>
      )}
    </section>
  );
}

function RelatedBlock({ title, icon, children }) {
  return (
    <div>
      <h2 className="font-display text-lg sm:text-xl font-extrabold text-ink mb-3 flex items-center gap-2">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-cream"
          style={{ background: 'var(--hall-accent)' }}
          aria-hidden
        >
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function pickLocale(obj, locale) {
  return obj?.[locale] || obj?.tr || '';
}
