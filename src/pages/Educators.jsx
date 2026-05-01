import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Printer,
  ChevronDown,
  ChevronUp,
  Target,
  Wrench,
  ListOrdered,
  Users,
  FileText,
  Sparkles,
  CheckSquare,
  Info,
} from 'lucide-react';
import { lessonPlans as _basePlans } from '../data/lessonPlans.js';
import { enrichLessonPlan } from '../data/_lessonPlanEnrichment.js';
import { getExhibit } from '../data/exhibits/index.js';
import { getSource } from '../data/sources.js';
import { useLocale } from '../context/LocaleContext.jsx';
import { pick, cx } from '../utils/helpers.js';
import { iconFor } from '../utils/iconFor.js';
import { GemIcon } from '../components/icons/gems/index.js';
import { LabelPlate, CitationsFootnote, RelatedGrid } from '../components/museum/index.js';
import SpotLight from '../components/museum/SpotLight.jsx';
import CuratorStoryNote from '../components/common/CuratorStoryNote.jsx';
import { renderInlineCitations } from '../components/common/BodyWithCitations.jsx';

// Faz 6-H: her planı enrichment ile birleştir (immutable)
const lessonPlans = _basePlans.map(enrichLessonPlan);

export default function Educators() {
  const { locale } = useLocale();
  const [printingId, setPrintingId] = useState(null);

  const handlePrint = (planId) => {
    setPrintingId(planId);
    // Give React a moment to apply the data-printing attribute
    setTimeout(() => {
      window.print();
      setPrintingId(null);
    }, 50);
  };

  return (
    <div
      className="mx-auto max-w-5xl px-4 py-8 sm:py-12"
      data-printing-plan={printingId || ''}
    >
      <PrintStyles />
      <SpotLight variant="warm" corner="tr" intensity={0.4} />

      {/* Header — hidden on print */}
      <header className="mb-10 text-center no-print">
        <div className="inline-flex items-center gap-2 mb-3">
          <LabelPlate
            caption={
              { tr: 'Öğretmenler', en: 'Educators', ar: 'للمعلمين' }[locale]
            }
            size="sm"
          />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink leading-tight text-engraved flex items-center justify-center gap-3">
          <GraduationCap className="text-gold" size={48} />
          {{
            tr: 'Sınıfa İniyor',
            en: 'Into the Classroom',
            ar: 'إلى الصف الدراسي',
          }[locale]}
        </h1>
        <p className="mt-3 text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
          {{
            tr: 'Ortaokul ve lise öğretmenleri için hazır ders planları. Deney, etkinlik, tartışma. İndirilebilir çalışma kâğıtları.',
            en: 'Ready-to-use lesson plans for middle and high school teachers. Experiments, activities, discussion. Printable worksheets included.',
            ar: 'خطط دروس جاهزة للمعلمين مع تجارب وأوراق عمل قابلة للطباعة.',
          }[locale]}
        </p>
      </header>

      {/* Lesson plan cards */}
      <div className="space-y-5">
        {lessonPlans.map((plan) => (
          <LessonPlanCard
            key={plan.id}
            plan={plan}
            locale={locale}
            onPrint={() => handlePrint(plan.id)}
          />
        ))}
      </div>

      {/* Footer guidance — hidden on print */}
      <footer className="mt-14 bg-white/70 rounded-2xl p-6 border border-ink/10 no-print">
        <h2 className="font-display text-xl font-extrabold text-ink mb-3 flex items-center gap-2">
          <FileText size={20} className="text-ink/60" />
          {{
            tr: 'Öğretmenlere Not',
            en: 'Note to Educators',
            ar: 'ملاحظة للمعلمين',
          }[locale]}
        </h2>
        <p className="text-sm text-ink/70 leading-relaxed">
          {{
            tr: 'Tüm ders planları açık kaynak (MIT lisansı) altında paylaşılmıştır. Dilediğiniz gibi kullanın, adapte edin, ülkenizin müfredatıyla birleştirin. Sadece JewelPedi Kids\'e atıf vermeniz yeterlidir. Geri bildirim ve iyileştirme önerileri için projenin GitHub\'ına katkı sağlayabilirsiniz.',
            en: 'All lesson plans are shared under open-source MIT license. Use freely, adapt, combine with your country\'s curriculum. Just credit JewelPedi Kids. Feedback and improvements welcome on the project\'s GitHub.',
            ar: 'خطط الدروس مفتوحة المصدر. استخدمها بحرية مع ذكر المصدر JewelPedi Kids.',
          }[locale]}
        </p>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LessonPlanCard
   ══════════════════════════════════════════════════════════ */
function LessonPlanCard({ plan, locale, onPrint }) {
  const [expanded, setExpanded] = useState(false);
  const accent = plan.accent;
  const iconId = plan.icon;

  // ─── Footnote aggregation (6-H) ───────────────────────────
  const { citeMap, footnoteEntries } = useMemo(() => {
    const order = [];
    const map = {};
    const addId = (id) => {
      if (!id || map[id]) return;
      if (!getSource(id)) return;
      order.push(id);
      map[id] = order.length;
    };
    (plan.curatorNote?.cite || []).forEach(addId);
    (plan.sources || []).forEach(addId);
    const entries = order.map((id, i) => ({ n: i + 1, source: getSource(id) }));
    return { citeMap: map, footnoteEntries: entries };
  }, [plan]);

  return (
    <article
      className="lesson-plan rounded-3xl bg-white shadow-museum overflow-hidden border border-ink/8"
      data-plan-id={plan.id}
      style={{ borderLeftWidth: 5, borderLeftColor: accent }}
    >
      {/* Summary header — always visible */}
      <header className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div
          className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ring-4 ring-white/60"
          style={{ background: `color-mix(in srgb, ${accent} 22%, white)` }}
          aria-hidden="true"
        >
          <GemIcon id={iconId} size={56} animate />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest font-extrabold mb-1" style={{ color: accent }}>
            <span className="flex items-center gap-1">
              <GraduationCap size={12} />
              {pick(plan.level, locale)}
            </span>
            <span className="text-ink/20">·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {pick(plan.duration, locale)}
            </span>
            <span className="text-ink/20">·</span>
            <span>{pick(plan.subject, locale)}</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-ink leading-tight">
            {pick(plan.title, locale)}
          </h2>
          <p className="mt-2 text-sm text-ink/70 leading-snug">
            <strong className="text-ink/80">
              {{ tr: 'Amaç: ', en: 'Goal: ', ar: 'الهدف: ' }[locale]}
            </strong>
            {pick(plan.goal, locale)}
          </p>
        </div>

        <div className="flex sm:flex-col gap-2 shrink-0 no-print">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-cream text-xs font-extrabold uppercase tracking-wider hover:bg-ink/85"
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded
              ? { tr: 'Kapat', en: 'Close', ar: 'إغلاق' }[locale]
              : { tr: 'Aç', en: 'Open', ar: 'افتح' }[locale]}
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-ink/15 text-ink text-xs font-extrabold uppercase tracking-wider hover:border-ink/40"
          >
            <Printer size={14} />
            {{ tr: 'Yazdır', en: 'Print', ar: 'طباعة' }[locale]}
          </button>
        </div>
      </header>

      {/* Faz 6-H: intro paragrafı — header ile body arasında köprü */}
      {plan.intro && (
        <div className="px-5 sm:px-8 pb-5">
          <div
            className="rounded-xl p-4 border-l-4 text-sm leading-relaxed text-ink/85"
            style={{
              background: `color-mix(in srgb, ${accent} 5%, white)`,
              borderLeftColor: accent,
            }}
          >
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-extrabold mb-1" style={{ color: accent }}>
              <Info size={11} />
              {{ tr: 'Öğretmene Not', en: 'Teacher\'s Brief', ar: 'ملاحظة للمعلم' }[locale]}
            </div>
            {pick(plan.intro, locale)}
          </div>
        </div>
      )}

      {/* Expandable body */}
      {(expanded || true) && (
        <div className={cx(
          'lesson-body',
          !expanded && 'hidden print:block',
        )}>
          <div className="px-5 sm:px-8 pb-6 space-y-6 border-t border-ink/10 pt-6">
            {/* Faz 6-H: Learning Objectives */}
            {Array.isArray(plan.learningObjectives) && plan.learningObjectives.length > 0 && (
              <Section
                icon={<Target size={18} />}
                accent={accent}
                title={{ tr: 'Öğrenme Kazanımları', en: 'Learning Objectives', ar: 'مخرجات التعلم' }[locale]}
              >
                <ol className="space-y-1.5 text-sm text-ink/80 leading-relaxed list-decimal list-inside marker:font-bold marker:text-ink/50">
                  {plan.learningObjectives.map((obj, i) => (
                    <li key={i}>{pick(obj, locale)}</li>
                  ))}
                </ol>
              </Section>
            )}

            {/* Faz 6-H: Curriculum Links */}
            {Array.isArray(plan.curriculumLinks) && plan.curriculumLinks.length > 0 && (
              <Section
                icon={<BookOpen size={18} />}
                accent={accent}
                title={{ tr: 'Müfredat Bağlantıları', en: 'Curriculum Links', ar: 'روابط المنهج' }[locale]}
              >
                <ul className="space-y-1.5 text-sm text-ink/80 leading-relaxed">
                  {plan.curriculumLinks.map((link, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-ink/30 shrink-0">•</span>
                      <span>{pick(link, locale)}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Materials */}
            <Section
              icon={<Wrench size={18} />}
              accent={accent}
              title={{ tr: 'Malzemeler', en: 'Materials', ar: 'المواد' }[locale]}
            >
              <p className="text-sm text-ink/80 leading-relaxed">
                {pick(plan.materials, locale)}
              </p>
            </Section>

            {/* Steps */}
            <Section
              icon={<ListOrdered size={18} />}
              accent={accent}
              title={{ tr: 'Ders Akışı', en: 'Lesson Flow', ar: 'خطوات الدرس' }[locale]}
            >
              <ol className="space-y-2">
                {plan.steps.map((s, i) => (
                  <li
                    key={i}
                    className="text-sm text-ink/80 leading-relaxed pl-0"
                  >
                    {pick(s, locale)}
                  </li>
                ))}
              </ol>
            </Section>

            {/* Worksheet — printable */}
            <Section
              icon={<FileText size={18} />}
              accent={accent}
              title={
                { tr: 'Çalışma Kâğıdı', en: 'Worksheet', ar: 'ورقة العمل' }[locale]
              }
              isPrintable
            >
              <ol className="space-y-4 list-decimal list-inside marker:text-ink/40">
                {plan.worksheet.map((q, i) => (
                  <li key={i} className="text-sm text-ink/80 leading-relaxed">
                    <span className="font-bold">{pick(q, locale)}</span>
                    <div className="worksheet-answer-lines mt-2" aria-hidden="true">
                      <div className="border-b border-ink/15 h-5" />
                      <div className="border-b border-ink/15 h-5 mt-1" />
                      <div className="border-b border-ink/15 h-5 mt-1 print:mt-1" />
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            {/* Discussion */}
            <Section
              icon={<Users size={18} />}
              accent={accent}
              title={
                { tr: 'Tartışma Soruları', en: 'Discussion', ar: 'أسئلة النقاش' }[locale]
              }
            >
              <ul className="space-y-2">
                {plan.discussion.map((d, i) => (
                  <li
                    key={i}
                    className="text-sm text-ink/80 leading-relaxed flex gap-2"
                  >
                    <span className="text-ink/30">→</span>
                    <span>{pick(d, locale)}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Related exhibits */}
            {plan.relatedExhibits?.length > 0 && (
              <Section
                icon={<BookOpen size={18} />}
                accent={accent}
                title={
                  {
                    tr: 'İlgili Sergiler',
                    en: 'Related Exhibits',
                    ar: 'معارض ذات صلة',
                  }[locale]
                }
              >
                <div className="flex flex-wrap gap-2 no-print">
                  {plan.relatedExhibits
                    .map(getExhibit)
                    .filter(Boolean)
                    .map((e) => {
                      const i = iconFor(e, e.cat);
                      return (
                        <Link
                          key={e.id}
                          to={`/halls/${e.cat}/${e.id}`}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-ink/10 hover:border-ink/30 font-bold text-sm text-ink lift-on-hover"
                        >
                          <GemIcon id={i.id} size={20} />
                          {pick(e.name, locale)}
                        </Link>
                      );
                    })}
                </div>
              </Section>
            )}

            {/* Faz 6-H: Extended RelatedGrid — labs/stories/workshops/quizzes
                Faz 6-Z: Workshop chip'leri RelatedGrid'e taşındı (workshopIds prop) */}
            {(
              (plan.relatedLabs?.length || 0) +
              (plan.relatedStories?.length || 0) +
              (plan.relatedWorkshops?.length || 0) +
              (plan.relatedQuizzes?.length || 0)
            ) > 0 && (
              <Section
                icon={<Sparkles size={18} />}
                accent={accent}
                title={{
                  tr: 'Müzeden İlgili İçerik',
                  en: 'Related Museum Content',
                  ar: 'محتوى متحفي ذو صلة',
                }[locale]}
              >
                <div className="no-print">
                  <RelatedGrid
                    exhibitIds={[]}
                    storyIds={plan.relatedStories || []}
                    labIds={plan.relatedLabs || []}
                    workshopIds={plan.relatedWorkshops || []}
                    quizCatIds={plan.relatedQuizzes || []}
                    locale={locale}
                  />
                </div>
              </Section>
            )}

            {/* Faz 6-H: Assessment Rubric — yazdırılabilir tablo */}
            {Array.isArray(plan.assessmentRubric) && plan.assessmentRubric.length > 0 && (
              <Section
                icon={<CheckSquare size={18} />}
                accent={accent}
                title={{ tr: 'Değerlendirme Matrisi', en: 'Assessment Rubric', ar: 'مصفوفة التقييم' }[locale]}
                isPrintable
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr>
                        <th
                          className="text-left font-extrabold py-2 px-2 border-b-2"
                          style={{ borderBottomColor: accent, color: accent }}
                        >
                          {{ tr: 'Kriter', en: 'Criterion', ar: 'المعيار' }[locale]}
                        </th>
                        {[4, 3, 2, 1].map((s) => (
                          <th
                            key={s}
                            className="font-extrabold py-2 px-2 border-b-2 text-center"
                            style={{ borderBottomColor: accent, color: accent }}
                          >
                            {s}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {plan.assessmentRubric.map((r, ri) => {
                        // levels'ı 4→1 sıraya zorla
                        const levelsByScore = {};
                        for (const l of (r.levels || [])) levelsByScore[l.score] = l;
                        return (
                          <tr key={ri} className="border-b border-ink/8">
                            <td className="py-2 px-2 font-bold text-ink/85 align-top w-40">
                              {pick(r.criterion, locale)}
                            </td>
                            {[4, 3, 2, 1].map((s) => (
                              <td key={s} className="py-2 px-2 text-ink/75 align-top leading-snug">
                                {levelsByScore[s] ? pick(levelsByScore[s].descriptor, locale) : ''}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* Faz 6-H: Curator Note (öğretmene ipucu) */}
            {plan.curatorNote && (
              <CuratorStoryNote
                note={plan.curatorNote}
                locale={locale}
                citeMap={citeMap}
              />
            )}

            {/* Faz 6-H: Kaynaklar */}
            {footnoteEntries.length > 0 && (
              <div className="no-print">
                <CitationsFootnote entries={footnoteEntries} locale={locale} />
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function Section({ icon, accent, title, children, isPrintable = false }) {
  return (
    <section className={cx(isPrintable && 'worksheet-section')}>
      <h3
        className="text-label-plate text-sm mb-3 flex items-center gap-2"
        style={{ color: accent }}
      >
        <span className="shrink-0">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   Print-only CSS — scoped via data-printing-plan attribute
   ══════════════════════════════════════════════════════════ */
function PrintStyles() {
  return (
    <style>{`
      @media print {
        /* Page setup */
        @page {
          size: A4;
          margin: 1.8cm 1.5cm;
        }

        /* Hide everything outside the printable container */
        body * { visibility: hidden; }
        [data-printing-plan] .lesson-plan { visibility: visible; }
        [data-printing-plan] .lesson-plan * { visibility: visible; }

        /* Hide the non-printed plans */
        [data-printing-plan="mohs-scratch-test"] .lesson-plan[data-plan-id="silver-tarnish-chemistry"],
        [data-printing-plan="mohs-scratch-test"] .lesson-plan[data-plan-id="lydia-coinage-history"],
        [data-printing-plan="mohs-scratch-test"] .lesson-plan[data-plan-id="unesco-intangible-heritage"],
        [data-printing-plan="silver-tarnish-chemistry"] .lesson-plan[data-plan-id="mohs-scratch-test"],
        [data-printing-plan="silver-tarnish-chemistry"] .lesson-plan[data-plan-id="lydia-coinage-history"],
        [data-printing-plan="silver-tarnish-chemistry"] .lesson-plan[data-plan-id="unesco-intangible-heritage"],
        [data-printing-plan="lydia-coinage-history"] .lesson-plan[data-plan-id="mohs-scratch-test"],
        [data-printing-plan="lydia-coinage-history"] .lesson-plan[data-plan-id="silver-tarnish-chemistry"],
        [data-printing-plan="lydia-coinage-history"] .lesson-plan[data-plan-id="unesco-intangible-heritage"],
        [data-printing-plan="unesco-intangible-heritage"] .lesson-plan[data-plan-id="mohs-scratch-test"],
        [data-printing-plan="unesco-intangible-heritage"] .lesson-plan[data-plan-id="silver-tarnish-chemistry"],
        [data-printing-plan="unesco-intangible-heritage"] .lesson-plan[data-plan-id="lydia-coinage-history"] {
          display: none !important;
        }

        /* Position the printed plan */
        .lesson-plan {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          box-shadow: none !important;
          border: none !important;
          border-left: 4px solid currentColor !important;
        }

        /* Hide interactive UI */
        .no-print { display: none !important; }

        /* Reset colors for print */
        * {
          color: #000 !important;
          background: transparent !important;
        }

        /* Headings keep weight */
        h1, h2, h3 { font-weight: 800 !important; }

        /* Worksheet: force lines to show */
        .worksheet-answer-lines > div {
          border-bottom: 1px solid #666 !important;
        }

        /* Faz 6-H: Assessment rubric tablosu — yazdırmada net sınırlar */
        .lesson-plan table {
          border-collapse: collapse !important;
          width: 100% !important;
        }
        .lesson-plan table th,
        .lesson-plan table td {
          border: 1px solid #555 !important;
          padding: 4px 6px !important;
          font-size: 10pt !important;
        }
        .lesson-plan table thead th {
          background: #eee !important;
          font-weight: 800 !important;
        }

        /* Keep icon boxes clean */
        .lesson-plan svg { visibility: visible; }

        /* Page break hints */
        .worksheet-section { page-break-inside: avoid; }
        h3 { page-break-after: avoid; }
      }
    `}</style>
  );
}
