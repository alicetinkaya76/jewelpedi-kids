import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  Sparkles,
  Info,
  FlaskConical,
  ChevronDown,
  Atom,
  Clock,
  BookOpen,
} from 'lucide-react';
import { getExhibit } from '../data/exhibits/index.js';
import { getHall } from '../data/halls.js';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { useSound } from '../audio/SoundContext.jsx';
import { pick, hallTheme, cx } from '../utils/helpers.js';
import { iconFor } from '../utils/iconFor.js';
import { GemIcon, GEM_REGISTRY } from '../components/icons/gems/index.js';
import {
  DisplayCase,
  LabelPlate,
  WaxSeal,
  SpecsCard,
  ComparisonCard,
  CitationsFootnote,
  AudioScriptPanel,
  GeoBadge,
  RelatedGrid,
} from '../components/museum/index.js';
import ExhibitCuratorMini from '../components/common/ExhibitCuratorMini.jsx';
import BodyWithCitations from '../components/common/BodyWithCitations.jsx';
import ContentBadges from '../components/common/ContentBadges.jsx';
import { getSource } from '../data/sources.js';
import { resolveCitations } from '../utils/content.js';
import { getGeoPoint } from '../data/geoPoints.js';

/* ──────────────────────────────────────────────────────────────
   Exhibit schema (Phase 2 extension + Phase 6-B enrichment)

   Base (Phase 0, unchanged):
     id, cat, accent, name, intro, body, funFact, stats, related,
     interactive, emoji

   Phase 2 additions — all OPTIONAL:
     gallery:   [{ type: 'svg', component: 'diamond', caption: {tr,en,ar} }]
     timeline:  [{ year: '-4000', event: {tr,en,ar} }]
     digDeeper: [{ id, icon: 'chemistry', title: {tr,en,ar}, body: {tr,en,ar} }]
     scienceBox: {
       formula, crystalSystem, hardness, refractiveIndex, density,
       cleavage, notes: {tr,en,ar}
     }
     storyThread: 'kleopatra-zumrut'

   Phase 6-A additions — merged via _enrichment.js, all OPTIONAL:
     specs:          { composition?, purity?, hardnessMohs?, ..., cite: [source-id] }
     sources:        ['source-id']
     comparison:     { withExhibitId, axis, insight: {tr,en,ar} }
     audioScript:    { tr, en, ar }  — 60-90sn curator narration
     relatedStories: ['story-id']
     relatedLabs:    ['lab-id']
     relatedQuizzes: ['quiz-category-id']
     geoPointId:     'geo-id'
     curatorNote:    { tr, en, ar }

   Body inline citation: "…sayılır [cite:mohs-1812]. Sonraki yüzyıllarda [cite:britannica-mohs]…"
   resolveCitations() bunları [1], [2] süperscript'lerine çevirir; tüm numaralar
   sergi ölçeğinde tutarlıdır (specs.cite, exhibit.sources, body'den toplanır).
   ────────────────────────────────────────────────────────────── */

export default function ExhibitDetail() {
  const { hallId, exhibitId } = useParams();
  const { t, locale } = useLocale();
  const { visitExhibit } = useProgress();
  const { play } = useSound();
  const exhibit = getExhibit(exhibitId);
  const hall = getHall(hallId);

  useEffect(() => {
    if (exhibit && hall) {
      visitExhibit(exhibit.id, hall.id);
      play('open-case');
    }
    // play is intentionally omitted from deps — we only want the chime once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exhibit, hall, visitExhibit]);

  // ────────────────────────────────────────────────────
  // Faz 6-B: body citations + footnote aggregation
  // ────────────────────────────────────────────────────
  //
  // 1. Body metninde [cite:xxx] tag'leri varsa numaralandırılır.
  // 2. specs.cite ve exhibit.sources'taki ID'ler aynı numara listesine
  //    eklenir; zaten body'de geçenler tekrarlanmaz.
  // 3. Sonuçta {resolvedBody, citeMap, footnoteEntries} üretilir:
  //      - resolvedBody: "…sayılır [1]. …" (UI'da süperscript yapılır)
  //      - citeMap: {sourceId: number} — SpecsCard vs. için
  //      - footnoteEntries: [{n, source}] — CitationsFootnote için
  const citationData = useMemo(() => {
    if (!exhibit) {
      return { resolvedBody: '', citeMap: {}, footnoteEntries: [] };
    }
    const bodyText = pick(exhibit.body, locale) || '';
    const { body: resolvedBody, footnotes } = resolveCitations(bodyText);

    // Başlangıç numaralandırma: body'den gelen sırada
    const order = footnotes.map((f) => f.source.id);
    const citeMap = Object.fromEntries(
      footnotes.map((f) => [f.source.id, f.n]),
    );

    // specs.cite ve exhibit.sources'tan ek ID'ler
    const extraIds = [
      ...(Array.isArray(exhibit.specs?.cite) ? exhibit.specs.cite : []),
      ...(Array.isArray(exhibit.sources) ? exhibit.sources : []),
    ];
    for (const id of extraIds) {
      if (!citeMap[id] && getSource(id)) {
        const n = order.length + 1;
        order.push(id);
        citeMap[id] = n;
      }
    }

    const footnoteEntries = order
      .map((id, i) => ({ n: i + 1, source: getSource(id) }))
      .filter((e) => e.source);

    return { resolvedBody, citeMap, footnoteEntries };
  }, [exhibit, locale]);

  if (!exhibit || !hall) return <Navigate to="/halls" replace />;
  const related = (exhibit.related || []).map(getExhibit).filter(Boolean);
  const icon = iconFor(exhibit, hall.id);

  // Faz 6-B extras:
  const geoPoint = exhibit.geoPointId ? getGeoPoint(exhibit.geoPointId) : null;
  const comparisonOther = exhibit.comparison?.withExhibitId
    ? getExhibit(exhibit.comparison.withExhibitId)
    : null;

  return (
    <div
      className="mx-auto max-w-5xl px-4 py-8 sm:py-12 hall-theme"
      style={{ ...hallTheme(hall), '--hall-accent': exhibit.accent || hall.accent }}
    >
      <Link
        to={`/halls/${hall.id}`}
        className="inline-flex items-center gap-1 text-sm font-bold text-ink/60 hover:text-ink mb-4"
      >
        <ChevronLeft size={16} /> {pick(hall.name, locale)}
      </Link>

      {/* ═══════════════════════════════════════════════
           HERO — gem icon + engraved title + intro
           ═══════════════════════════════════════════════ */}
      <header className="mb-8 relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="exhibit-number">#{exhibit.id}</span>
          <LabelPlate
            caption={pick(hall.name, locale)}
            size="sm"
            accent={exhibit.accent || hall.accent}
          />
        </div>

        <div className="flex items-start gap-5">
          <span
            className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl
                       flex items-center justify-center
                       ring-8 ring-white/60 shadow-museum animate-revealGem"
            style={{
              background: `color-mix(in srgb, var(--hall-accent) 20%, white)`,
            }}
            aria-hidden="true"
          >
            <GemIcon
              id={icon.id}
              size={80}
              animate={icon.animate}
              shimmer={icon.shimmer}
            />
          </span>
          <div className="flex-1 min-w-0">
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold
                         text-ink leading-[1.05] tracking-tight"
            >
              {pick(exhibit.name, locale)}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-ink/75 leading-relaxed">
              {pick(exhibit.intro, locale)}
            </p>
            {geoPoint && (
              <div className="mt-3">
                <GeoBadge geoPoint={geoPoint} locale={locale} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Faz 7: yaş, süre, zorluk, MEB kazanım etiketleri (curriculumMap'te kayıt varsa) */}
      <ContentBadges type="exhibit" id={exhibit.id} showCurriculum className="mb-5" />

      {/* ═══════════════════════════════════════════════
           MAIN BODY  (with resolved inline citations)
           ═══════════════════════════════════════════════ */}
      <section className="rounded-3xl bg-white/90 border border-ink/5 shadow-museum p-6 sm:p-8 mb-6">
        <BodyWithCitations text={citationData.resolvedBody} />
      </section>

      {/* ═══════════════════════════════════════════════
           Faz 6-B: SPECS CARD
           ═══════════════════════════════════════════════ */}
      {exhibit.specs && (
        <SpecsCard
          specs={exhibit.specs}
          locale={locale}
          citeMap={citationData.citeMap}
        />
      )}

      {/* ═══════════════════════════════════════════════
           Faz 6-B: CURATOR MINI NOTE
           ═══════════════════════════════════════════════ */}
      {exhibit.curatorNote && (
        <ExhibitCuratorMini note={exhibit.curatorNote} locale={locale} />
      )}

      {/* ═══════════════════════════════════════════════
           Faz 6-B: COMPARISON CARD
           ═══════════════════════════════════════════════ */}
      {comparisonOther && exhibit.comparison?.insight && (
        <ComparisonCard
          current={exhibit}
          other={comparisonOther}
          axis={exhibit.comparison.axis}
          insight={exhibit.comparison.insight}
          locale={locale}
        />
      )}

      {/* ═══════════════════════════════════════════════
           Faz 6-B: AUDIO SCRIPT PANEL (collapsible)
           ═══════════════════════════════════════════════ */}
      {exhibit.audioScript && (
        <AudioScriptPanel script={exhibit.audioScript} locale={locale} />
      )}

      {/* ═══════════════════════════════════════════════
           GALLERY (optional) — strip of SVG / photo tiles
           ═══════════════════════════════════════════════ */}
      {Array.isArray(exhibit.gallery) && exhibit.gallery.length > 0 && (
        <Gallery items={exhibit.gallery} locale={locale} />
      )}

      {/* ═══════════════════════════════════════════════
           SCIENCE BOX (optional) — lab-style data card
           ═══════════════════════════════════════════════ */}
      {exhibit.scienceBox && (
        <ScienceBox data={exhibit.scienceBox} locale={locale} t={t} />
      )}

      {/* ═══════════════════════════════════════════════
           TIMELINE (optional) — horizontal scroll strip
           ═══════════════════════════════════════════════ */}
      {Array.isArray(exhibit.timeline) && exhibit.timeline.length > 0 && (
        <ExhibitTimeline items={exhibit.timeline} locale={locale} t={t} />
      )}

      {/* ═══════════════════════════════════════════════
           DIG DEEPER (optional) — expandable sections
           ═══════════════════════════════════════════════ */}
      {Array.isArray(exhibit.digDeeper) && exhibit.digDeeper.length > 0 && (
        <DigDeeper sections={exhibit.digDeeper} locale={locale} t={t} />
      )}

      {/* ═══════════════════════════════════════════════
           STATS (existing)
           ═══════════════════════════════════════════════ */}
      {exhibit.stats && (
        <section className="mb-6">
          <h2 className="font-display text-xl font-extrabold text-ink mb-3 flex items-center gap-2">
            <Info size={18} style={{ color: 'var(--hall-accent)' }} />
            {{
              tr: 'Teknik Bilgiler',
              en: 'Technical Specs',
              ar: 'البيانات التقنية',
            }[locale] || 'Teknik Bilgiler'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(exhibit.stats).map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl p-4 bg-white/90 border border-ink/5 shadow-sm"
              >
                <div className="text-label-plate opacity-80">{k}</div>
                <div className="mt-1 font-display text-lg font-extrabold text-ink">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
           FUN FACT (existing, upgraded with WaxSeal)
           ═══════════════════════════════════════════════ */}
      {exhibit.funFact && (
        <section
          className="rounded-3xl p-5 sm:p-7 mb-6 border relative"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--hall-accent) 10%, white), white)',
            borderColor:
              'color-mix(in srgb, var(--hall-accent) 30%, transparent)',
          }}
        >
          <WaxSeal
            letter="!"
            title={t('hall.funFact')}
            size="sm"
            className="absolute -top-3 -left-3"
          />
          <div
            className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest mb-2 ml-9"
            style={{ color: 'var(--hall-accent)' }}
          >
            <Sparkles size={14} /> {t('hall.funFact')}
          </div>
          <p className="text-ink/85 leading-relaxed text-lg ml-9">
            {pick(exhibit.funFact, locale)}
          </p>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
           STORY THREAD (optional) — link to the narrative
           ═══════════════════════════════════════════════ */}
      {exhibit.storyThread && (
        <Link
          to={`/stories/${exhibit.storyThread}`}
          className="rounded-3xl p-5 mb-6 border-2 flex items-center gap-4 bg-white hover:shadow-museum transition group"
          style={{
            borderColor:
              'color-mix(in srgb, var(--hall-accent) 40%, transparent)',
            background: 'color-mix(in srgb, var(--hall-accent) 5%, white)',
          }}
        >
          <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition"
                style={{ background: 'color-mix(in srgb, var(--hall-accent) 20%, white)' }}>
            <BookOpen size={22} style={{ color: 'var(--hall-accent)' }} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-label-plate" style={{ color: 'var(--hall-accent)' }}>
              {{ tr: 'Hikâye İpliği', en: 'Story Thread', ar: 'خيط القصة' }[locale]}
            </div>
            <div className="font-display font-extrabold text-ink mt-0.5">
              {{
                tr: 'Bu serginin bir hikâyesi var →',
                en: 'This exhibit has a story →',
                ar: 'هذا المعرض له قصة ←',
              }[locale]}
            </div>
            <div className="text-sm text-ink/60 mt-0.5">
              {{
                tr: 'Tıklayarak anlatıyı oku',
                en: 'Click to read the narrative',
                ar: 'اضغط لقراءة القصة',
              }[locale]}
            </div>
          </div>
        </Link>
      )}

      {/* Interactive nudge (existing) */}
      {exhibit.interactive && (
        <Link
          to="/lab"
          className="block mb-8 rounded-3xl p-5 bg-ink text-cream shadow-museum
                     hover:bg-ink/90 transition group"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center">
              <FlaskConical size={20} className="text-gold" />
            </span>
            <div>
              <div className="text-[11px] uppercase tracking-widest font-extrabold text-gold">
                {t('hall.interactive')}
              </div>
              <div className="font-display text-lg font-extrabold group-hover:translate-x-0.5 transition">
                {{
                  tr: 'Deney labında denemeyi dene →',
                  en: 'Try it in the lab →',
                  ar: 'جرّبها في المختبر ←',
                }[locale] || 'Deney labında denemeyi dene →'}
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* ═══════════════════════════════════════════════
           Faz 6-B: RELATED GRID (exhibits + stories + labs + quizzes)
           Replaces the old single-row "Related" chips with a 4-block grid.
           ═══════════════════════════════════════════════ */}
      <RelatedGrid
        exhibitIds={exhibit.related || []}
        storyIds={exhibit.relatedStories || []}
        labIds={exhibit.relatedLabs || []}
        quizCatIds={exhibit.relatedQuizzes || []}
        locale={locale}
      />

      {/* ═══════════════════════════════════════════════
           Faz 6-B: CITATIONS FOOTNOTE (bottom of page)
           ═══════════════════════════════════════════════ */}
      {citationData.footnoteEntries.length > 0 && (
        <CitationsFootnote
          entries={citationData.footnoteEntries}
          locale={locale}
        />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   BodyWithCitations: shared bileşen, ../components/common/BodyWithCitations.jsx
   (Faz 6-C: Story'nin de kullanması için dışarı çıkarıldı)
   ────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────
   Gallery — horizontal scrollable strip of SVG gem tiles
   ────────────────────────────────────────────────────────────── */
function Gallery({ items, locale }) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <LabelPlate
          caption={{ tr: 'Galeri', en: 'Gallery', ar: 'المعرض' }[locale]}
          size="sm"
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
        {items.map((item, i) => (
          <GalleryTile key={i} item={item} locale={locale} />
        ))}
      </div>
    </section>
  );
}

function GalleryTile({ item, locale }) {
  const caption = pick(item.caption, locale);
  if (item.type === 'svg' && GEM_REGISTRY[item.component]) {
    return (
      <figure
        className="shrink-0 w-48 rounded-2xl bg-white/90 border border-ink/5
                   shadow-sm p-4 snap-start display-case"
      >
        <div className="w-full h-32 flex items-center justify-center">
          <GemIcon id={item.component} size={96} animate={item.animate} />
        </div>
        {caption && (
          <figcaption className="text-xs text-ink/60 leading-tight mt-2 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }
  if (item.type === 'photo' && item.src) {
    return (
      <figure className="shrink-0 w-48 rounded-2xl overflow-hidden border border-ink/5 shadow-sm snap-start">
        <img
          src={item.src}
          alt={caption || ''}
          loading="lazy"
          className="w-full h-32 object-cover"
        />
        {caption && (
          <figcaption className="p-2 text-xs text-ink/60 leading-tight text-center">
            {caption}
            {item.credit && (
              <span className="block text-[10px] text-ink/40 mt-0.5">
                {item.credit}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    );
  }
  return null;
}

/* ──────────────────────────────────────────────────────────────
   ScienceBox — lab-style data card
   ────────────────────────────────────────────────────────────── */
function ScienceBox({ data, locale, t }) {
  const rows = [
    ['formula', { tr: 'Formül', en: 'Formula', ar: 'الصيغة' }, data.formula],
    ['crystalSystem',
      { tr: 'Kristal Sistemi', en: 'Crystal System', ar: 'النظام البلوري' },
      data.crystalSystem],
    ['hardness',
      { tr: 'Sertlik (Mohs)', en: 'Hardness (Mohs)', ar: 'الصلادة' },
      data.hardness],
    ['refractiveIndex',
      { tr: 'Kırılma İndisi', en: 'Refractive Index', ar: 'معامل الانكسار' },
      data.refractiveIndex],
    ['density',
      { tr: 'Yoğunluk', en: 'Density', ar: 'الكثافة' },
      data.density],
    ['cleavage',
      { tr: 'Dilinim', en: 'Cleavage', ar: 'الانفصام' },
      data.cleavage],
  ].filter(([, , v]) => v);

  return (
    <section
      className="rounded-3xl p-5 sm:p-6 mb-6 border relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(93, 173, 226, 0.08), rgba(39, 174, 96, 0.05))',
        borderColor: 'rgba(39, 174, 96, 0.25)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-9 h-9 rounded-xl bg-gem text-white flex items-center justify-center shrink-0">
          <Atom size={18} />
        </span>
        <div>
          <div className="text-label-plate text-gem">
            {{
              tr: 'Bilim Kutusu',
              en: 'Science Box',
              ar: 'صندوق العلوم',
            }[locale]}
          </div>
          <div className="font-display font-extrabold text-ink text-lg leading-tight">
            {{
              tr: 'Gemolojik veriler',
              en: 'Gemological data',
              ar: 'البيانات الجيمولوجية',
            }[locale]}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8">
        {rows.map(([key, label, value]) => (
          <div key={key} className="stats-row">
            <span className="text-sm text-ink/60 font-bold">
              {pick(label, locale)}
            </span>
            <span className="font-display font-extrabold text-ink text-sm">
              {value}
            </span>
          </div>
        ))}
      </div>

      {data.notes && (
        <p className="text-sm text-curator mt-4 pl-3 border-l-2 border-gem/40">
          {pick(data.notes, locale)}
        </p>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   ExhibitTimeline — horizontal year strip
   ────────────────────────────────────────────────────────────── */
function ExhibitTimeline({ items, locale }) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} style={{ color: 'var(--hall-accent)' }} />
        <h2 className="font-display text-xl font-extrabold text-ink">
          {{ tr: 'Zaman Çizgisi', en: 'Timeline', ar: 'الخط الزمني' }[locale]}
        </h2>
      </div>

      <div className="relative">
        {/* horizontal line */}
        <div
          className="absolute top-8 left-0 right-0 h-0.5 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, transparent, color-mix(in srgb, var(--hall-accent) 40%, transparent), transparent)',
          }}
          aria-hidden="true"
        />
        <ol className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 snap-x">
          {items.map((entry, i) => (
            <li
              key={i}
              className="shrink-0 w-56 snap-start relative"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full ring-4 ring-cream relative z-10"
                  style={{
                    background: 'var(--hall-accent)',
                    marginTop: '1.5rem',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="mt-3 font-display text-stat-number text-2xl"
                  style={{ color: 'var(--hall-accent)' }}
                >
                  {formatYear(entry.year, locale)}
                </div>
                <div className="text-sm text-ink/75 text-center leading-snug mt-2">
                  {pick(entry.event, locale)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Display year — handles negative (BCE) prefix. */
function formatYear(y, locale) {
  if (typeof y !== 'string' && typeof y !== 'number') return String(y);
  const str = String(y);
  if (str.startsWith('-')) {
    const n = str.slice(1);
    const prefix = {
      tr: 'M.Ö.',
      en: 'BCE',
      ar: 'ق.م',
    }[locale] || 'BCE';
    return `${n} ${prefix}`;
  }
  return str;
}

/* ──────────────────────────────────────────────────────────────
   DigDeeper — accordion of expandable deep sections
   ────────────────────────────────────────────────────────────── */
function DigDeeper({ sections, locale }) {
  const [openId, setOpenId] = useState(sections[0]?.id);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {{
            tr: 'Daha Derine İn',
            en: 'Dig Deeper',
            ar: 'انغمس أعمق',
          }[locale]}
        </h2>
      </div>

      <div className="space-y-2">
        {sections.map((s) => {
          const isOpen = openId === s.id;
          return (
            <div
              key={s.id}
              className={cx(
                'rounded-2xl border transition-all duration-300',
                isOpen ? 'border-ink/15 shadow-museum bg-white/95' : 'border-ink/8 bg-white/70',
              )}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className="w-full px-4 sm:px-5 py-3 flex items-center gap-3 text-left"
                aria-expanded={isOpen}
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `color-mix(in srgb, var(--hall-accent) 18%, white)`,
                    color: 'var(--hall-accent)',
                  }}
                  aria-hidden="true"
                >
                  {iconForDigDeeper(s.icon)}
                </span>
                <span className="flex-1 font-display font-extrabold text-ink">
                  {pick(s.title, locale)}
                </span>
                <ChevronDown
                  size={18}
                  className={cx(
                    'text-ink/40 transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 pt-0 animate-fadeUp">
                  <div className="pl-12 text-ink/80 leading-relaxed space-y-3">
                    {splitParagraphs(pick(s.body, locale)).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function splitParagraphs(text) {
  if (!text) return [];
  return String(text)
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function iconForDigDeeper(kind) {
  // Lucide icons are fine here — these are small category markers, not gems.
  // We use text symbols to stay dependency-light.
  const map = {
    chemistry: '⚛︎',
    history: '⏳',
    culture: '◈',
    ethics: '⚖︎',
    craft: '✦',
    famous: '★',
    geology: '⛰︎',
    science: '🔬',
  };
  return (
    <span className="text-base font-extrabold" aria-hidden="true">
      {map[kind] || '◆'}
    </span>
  );
}
