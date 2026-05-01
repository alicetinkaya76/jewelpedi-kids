import { Clock, GraduationCap, Layers, BookOpen, Tag } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { pick, cx } from '../../utils/helpers.js';
import {
  getCurriculumEntry,
  getCurriculumEntriesById,
} from '../../data/curriculumMap.js';

/*
 * ContentBadges — Faz 7
 *
 * Yaş / süre / zorluk / ders / MEB-NGSS kazanım etiketlerini göstermek
 * için yeniden kullanılabilir bileşen. Her sergi, lab, atölye ve ders
 * planı kartına eklenebilir. Veriyi `curriculumMap.js`'den otomatik
 * çeker — manuel prop geçmek gerekmez.
 *
 * Kullanım:
 *   <ContentBadges type="exhibit" id="4c-sistemi" />
 *   <ContentBadges type="lab" id="mohs" compact />
 *   <ContentBadges type="workshop" id="hasir" showCurriculum />
 *
 * Eğer curriculumMap'te kayıt yoksa sessizce null döner — backward compat.
 */

const DIFFICULTY_LABELS = {
  easy:   { tr: 'Kolay',    en: 'Easy',    ar: 'سهل',   dots: 1, color: '#27ae60' },
  medium: { tr: 'Orta',     en: 'Medium',  ar: 'متوسط', dots: 2, color: '#d4a017' },
  hard:   { tr: 'Zor',      en: 'Hard',    ar: 'صعب',   dots: 3, color: '#c0392b' },
};

const SUBJECT_LABELS = {
  fen:         { tr: 'Fen',              en: 'Science',       ar: 'علوم' },
  kimya:       { tr: 'Kimya',            en: 'Chemistry',     ar: 'كيمياء' },
  matematik:   { tr: 'Matematik',        en: 'Math',          ar: 'رياضيات' },
  sosyal:      { tr: 'Sosyal',           en: 'Social Studies', ar: 'اجتماعيات' },
  coğrafya:    { tr: 'Coğrafya',         en: 'Geography',     ar: 'جغرافيا' },
  gorsel:      { tr: 'Görsel Sanatlar',  en: 'Visual Arts',   ar: 'فنون' },
  teknoloji:   { tr: 'Teknoloji Tasarım', en: 'Tech & Design', ar: 'التصميم' },
  türkçe:      { tr: 'Türkçe',           en: 'Turkish',       ar: 'لغة تركية' },
};

function ageText(entry, locale) {
  const { ageMin, ageMax } = entry;
  if (ageMin == null && ageMax == null) return null;
  if (ageMin != null && ageMax != null && ageMin !== ageMax) {
    return { tr: `${ageMin}–${ageMax} yaş`, en: `${ageMin}–${ageMax} yrs`, ar: `${ageMin}–${ageMax} سنة` }[locale];
  }
  const v = ageMin ?? ageMax;
  return { tr: `${v} yaş`, en: `age ${v}`, ar: `${v} سنة` }[locale];
}

function durationText(entry, locale) {
  const d = entry.durationMin;
  if (!d) return null;
  return { tr: `${d} dk`, en: `${d} min`, ar: `${d} د` }[locale];
}

/* ═════════════════════ Small chip ═════════════════════ */
function Chip({ icon: Icon, children, color, title }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                 text-[11px] font-bold bg-white/90 border border-ink/10
                 text-ink/80 whitespace-nowrap"
      style={color ? { borderColor: `${color}55`, color } : undefined}
      title={title}
    >
      {Icon && <Icon size={11} aria-hidden />}
      {children}
    </span>
  );
}

/* ═════════════════════ Main component ═════════════════════ */
export default function ContentBadges({
  type,
  id,
  compact = false,
  showCurriculum = false,
  className = '',
}) {
  const { locale } = useLocale();
  const entry = type ? getCurriculumEntry(type, id) : getCurriculumEntriesById(id)[0];
  if (!entry) return null;

  const age = ageText(entry, locale);
  const dur = durationText(entry, locale);
  const diff = DIFFICULTY_LABELS[entry.difficulty];
  const diffLabel = diff ? pick(diff, locale) : null;
  const grades = entry.grades?.length
    ? { tr: `${entry.grades.join('/')}.  sınıf`, en: `Grade ${entry.grades.join('/')}`, ar: `الصف ${entry.grades.join('/')}` }[locale]
    : null;
  const subjects = entry.subjects
    ?.map((s) => (SUBJECT_LABELS[s] ? pick(SUBJECT_LABELS[s], locale) : null))
    .filter(Boolean) ?? [];

  return (
    <div
      className={cx(
        'flex flex-wrap items-center gap-1.5',
        compact ? 'text-[10px]' : 'text-[11px]',
        className,
      )}
      aria-label={{ tr: 'İçerik etiketleri', en: 'Content badges', ar: 'شارات المحتوى' }[locale]}
    >
      {age && (
        <Chip icon={GraduationCap} title={{ tr: 'Yaş aralığı', en: 'Age range', ar: 'العمر' }[locale]}>
          {age}
        </Chip>
      )}
      {grades && !compact && (
        <Chip icon={BookOpen} title={{ tr: 'Sınıf', en: 'Grade', ar: 'الصف' }[locale]}>
          {grades}
        </Chip>
      )}
      {dur && (
        <Chip icon={Clock} title={{ tr: 'Süre', en: 'Duration', ar: 'المدة' }[locale]}>
          {dur}
        </Chip>
      )}
      {diffLabel && (
        <Chip icon={Layers} color={diff.color} title={{ tr: 'Zorluk', en: 'Difficulty', ar: 'الصعوبة' }[locale]}>
          <span className="flex items-center gap-0.5">
            <span>{diffLabel}</span>
            <span className="flex" aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full ml-0.5"
                  style={{
                    background: i < diff.dots ? diff.color : '#0001',
                  }}
                />
              ))}
            </span>
          </span>
        </Chip>
      )}
      {!compact && subjects.slice(0, 2).map((s) => (
        <Chip key={s} icon={Tag}>{s}</Chip>
      ))}

      {showCurriculum && entry.mebCodes?.length > 0 && (
        <details className="basis-full mt-2 text-ink/70">
          <summary
            className="cursor-pointer text-[11px] font-bold uppercase tracking-wider text-ink/60 select-none"
          >
            {{
              tr: `Müfredat kazanımları (${entry.mebCodes.length})`,
              en: `Curriculum outcomes (${entry.mebCodes.length})`,
              ar: `أهداف المنهج (${entry.mebCodes.length})`,
            }[locale]}
          </summary>
          <ul className="mt-2 space-y-1.5 text-[11px] leading-snug">
            {entry.mebCodes.map((m) => (
              <li key={m.code} className="flex gap-2">
                <code className="shrink-0 font-mono bg-ink/5 px-1.5 py-0.5 rounded text-[10px] text-ink/70">
                  {m.code}
                </code>
                <span className="text-ink/80">{pick(m.label, locale)}</span>
              </li>
            ))}
            {entry.ngssCodes?.map((n) => (
              <li key={n.code} className="flex gap-2">
                <code className="shrink-0 font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[10px]">
                  {n.code}
                </code>
                <span className="text-ink/80">{pick(n.label, locale)}</span>
              </li>
            ))}
          </ul>
          {entry.notes && (
            <p className="mt-2 text-[11px] text-ink/60 italic leading-relaxed">
              {pick(entry.notes, locale)}
            </p>
          )}
        </details>
      )}
    </div>
  );
}
