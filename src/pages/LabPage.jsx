import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FlaskConical,
  Calculator,
  Diamond,
  Droplet,
  Flame,
  Search,
  Coins,
  Microscope,
} from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import KaratCalculator from '../components/lab/KaratCalculator.jsx';
import MohsScratch from '../components/lab/MohsScratch.jsx';
import SilverTarnish from '../components/lab/SilverTarnish.jsx';
import DiamondCutSimulator from '../components/lab/DiamondCutSimulator.jsx';
import MeltingPoints from '../components/lab/MeltingPoints.jsx';
import StoneGuessing from '../components/lab/StoneGuessing.jsx';
import LydiaMint from '../components/lab/LydiaMint.jsx';
import VirtualGemologist from '../components/lab/VirtualGemologist.jsx';
import LabHero from '../components/lab/LabHero.jsx';
import { CitationsFootnote, RelatedGrid } from '../components/museum/index.js';
import CuratorStoryNote from '../components/common/CuratorStoryNote.jsx';
import StoryTimeline from '../components/common/StoryTimeline.jsx';
import VocabularyChips from '../components/common/VocabularyChips.jsx';
import ContentBadges from '../components/common/ContentBadges.jsx';
import { enrichLab } from '../data/_labEnrichment.js';
import { getSource } from '../data/sources.js';
import { cx } from '../utils/helpers.js';

/* ──────────────────────────────────────────────────────────────
   LabPage — Faz 3 (base) + Faz 6-E (enrichment UI)

   Her deneyin etrafına "müze duvarı" içerik katmanı:
     - LabHero (başlık/amaç/materyaller/prosedür/not)        ÜSTTE
     - deney bileşeni (KaratCalculator vb.)                   ORTADA (dokunulmadı)
     - CuratorStoryNote → Timeline → Vocabulary → RelatedGrid ALTTA
     - CitationsFootnote                                      EN ALTTA

   Her bölüm ilgili veri yoksa render edilmez — backward compat tam.
   ────────────────────────────────────────────────────────────── */

const BASE_EXPERIMENTS = [
  { id: 'karat',   Icon: Calculator,    Cmp: KaratCalculator,       tone: '#d4a017' },
  { id: 'mohs',    Icon: FlaskConical,  Cmp: MohsScratch,           tone: '#27ae60' },
  { id: 'tarnish', Icon: Droplet,       Cmp: SilverTarnish,         tone: '#7f8c8d' },
  { id: 'light',   Icon: Diamond,       Cmp: DiamondCutSimulator,   tone: '#5dade2' },
  { id: 'lydia',   Icon: Coins,         Cmp: LydiaMint,             tone: '#d4a017' },
  { id: 'melt',    Icon: Flame,         Cmp: MeltingPoints,         tone: '#e67e22' },
  { id: 'guess',   Icon: Search,        Cmp: StoneGuessing,         tone: '#8e44ad' },
  { id: 'virtual-gemologist', Icon: Microscope, Cmp: VirtualGemologist, tone: '#16a085' },
];

// Faz 6-E: her deneyi enrichment ile birleştir (immutable)
const EXPERIMENTS = BASE_EXPERIMENTS.map(enrichLab);

export default function LabPage() {
  const { t, locale } = useLocale();
  const { labsCompleted } = useProgress();
  const [searchParams] = useSearchParams();

  const initialId =
    searchParams.get('id') &&
    EXPERIMENTS.some((e) => e.id === searchParams.get('id'))
      ? searchParams.get('id')
      : 'karat';
  const [activeId, setActiveId] = useState(initialId);
  const active = EXPERIMENTS.find((e) => e.id === activeId);
  const ActiveCmp = active?.Cmp;

  // ─── Footnote aggregation (6-E) ───────────────────────────
  // procedure[i].cite + curatorNote.cite + timeline[i].cite + sources
  // aynı numara listesinde birleşir. Her ID bir numara alır;
  // tekrarlar aynı numarayı paylaşır.
  const { citeMap, footnoteEntries } = useMemo(() => {
    if (!active) return { citeMap: {}, footnoteEntries: [] };
    const order = [];
    const map = {};

    const addId = (id) => {
      if (!id || map[id]) return;
      if (!getSource(id)) return;
      order.push(id);
      map[id] = order.length;
    };

    if (Array.isArray(active.procedure)) {
      for (const p of active.procedure) {
        if (Array.isArray(p.cite)) p.cite.forEach(addId);
      }
    }
    if (Array.isArray(active.curatorNote?.cite)) {
      active.curatorNote.cite.forEach(addId);
    }
    if (Array.isArray(active.timeline)) {
      for (const t of active.timeline) {
        if (Array.isArray(t.cite)) t.cite.forEach(addId);
      }
    }
    if (Array.isArray(active.sources)) active.sources.forEach(addId);

    const entries = order.map((id, i) => ({ n: i + 1, source: getSource(id) }));
    return { citeMap: map, footnoteEntries: entries };
  }, [active]);

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-8 sm:py-12 hall-theme"
      style={{ '--hall-accent': active?.tone }}
    >
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
        {t('lab.title')}
      </h1>
      <p className="text-ink/60 mb-6">{t('lab.subtitle')}</p>

      {/* Experiment picker */}
      <div className="flex flex-wrap gap-2 mb-8">
        {EXPERIMENTS.map((exp) => {
          const { Icon } = exp;
          const done = labsCompleted.has(exp.id);
          const isActive = exp.id === activeId;
          return (
            <button
              key={exp.id}
              onClick={() => setActiveId(exp.id)}
              className={cx(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition relative',
                isActive
                  ? 'text-cream shadow-museum'
                  : 'bg-white text-ink/80 border-ink/10 hover:border-ink/30',
              )}
              style={
                isActive
                  ? { background: exp.tone, borderColor: exp.tone }
                  : undefined
              }
            >
              <Icon size={14} />
              {t(`lab.experiments.${exp.id}`)}
              {done && (
                <span
                  className="w-2 h-2 rounded-full bg-gem"
                  aria-label="Tamamlandı"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active experiment — müze vitrin ortası */}
      <section
        className="rounded-3xl bg-white/85 border border-ink/5 shadow-museum p-6 sm:p-8 animate-fadeUp mb-6"
      >
        {/* Faz 7: yaş, süre, zorluk, MEB kazanım etiketleri */}
        {active && (
          <ContentBadges
            type="lab"
            id={active.id}
            showCurriculum
            className="mb-4"
          />
        )}

        {/* Faz 6-E: LabHero başlık + amaç + materyaller + prosedür + not */}
        {active && (
          <LabHero
            title={active.title}
            goal={active.goal}
            materials={active.materials}
            procedure={active.procedure}
            safetyNote={active.safetyNote}
            locale={locale}
            citeMap={citeMap}
          />
        )}

        {/* Deneyin kendi interaktif bileşeni — dokunulmadı */}
        {ActiveCmp ? (
          <div className="pt-4 border-t border-ink/8">
            <ActiveCmp />
          </div>
        ) : (
          <div className="text-ink/60">{t('lab.comingSoon')}</div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          Faz 6-E alt-paneli
          ═══════════════════════════════════════════════ */}

      {/* CURATOR NOTE */}
      {active?.curatorNote && (
        <CuratorStoryNote
          note={active.curatorNote}
          locale={locale}
          citeMap={citeMap}
        />
      )}

      {/* TIMELINE — sadece mohs, light, lydia'da var */}
      {Array.isArray(active?.timeline) && active.timeline.length > 0 && (
        <StoryTimeline
          items={active.timeline}
          locale={locale}
          citeMap={citeMap}
        />
      )}

      {/* VOCABULARY */}
      {Array.isArray(active?.vocabulary) && active.vocabulary.length > 0 && (
        <VocabularyChips
          termIds={active.vocabulary}
          locale={locale}
          title={{
            tr: 'Bu deneyde geçen sözlük',
            en: 'Glossary in this experiment',
            ar: 'قاموس هذه التجربة',
          }}
        />
      )}

      {/* RELATED GRID (4-bölümlü; exhibits + stories + quizzes;
          lab chip'leri yok çünkü zaten lab içindeyiz) */}
      {active && (
        <div className="mt-10">
          <RelatedGrid
            exhibitIds={active.relatedExhibits || []}
            storyIds={active.relatedStories || []}
            labIds={[]}
            quizCatIds={active.relatedQuizzes || []}
            locale={locale}
          />
        </div>
      )}

      {/* CITATIONS FOOTNOTE */}
      {footnoteEntries.length > 0 && (
        <div className="mt-10">
          <CitationsFootnote entries={footnoteEntries} locale={locale} />
        </div>
      )}
    </div>
  );
}
