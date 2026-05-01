import { useState, useMemo } from 'react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { Check, X, Lightbulb, RefreshCw } from 'lucide-react';
import { cx } from '../../utils/helpers.js';

const puzzles = [
  {
    id: 'ruby',
    answer: 'yakut',
    emoji: '❤️',
    name: { tr: 'Yakut', en: 'Ruby', ar: 'ياقوت' },
    clues: {
      tr: ['Renk: canlı kırmızı', 'Mohs sertliği 9', 'En iyisi Myanmar\'dan çıkar'],
      en: ['Color: vivid red', 'Mohs hardness 9', 'Finest ones come from Myanmar'],
      ar: ['اللون: أحمر زاهي', 'صلابة موس 9', 'أجودها من ميانمار'],
    },
    options: ['zümrüt', 'yakut', 'safir', 'turkuvaz'],
  },
  {
    id: 'emerald',
    answer: 'zümrüt',
    emoji: '💚',
    name: { tr: 'Zümrüt', en: 'Emerald', ar: 'زمرد' },
    clues: {
      tr: ['Renk: yeşil', 'İçinde "jardin" denilen doğal çatlaklar var', 'Kolombiya\'dan gelenler en değerlisi'],
      en: ['Color: green', 'Has natural cracks called "jardin"', 'Colombian stones are most prized'],
      ar: ['اللون: أخضر', 'يحتوي شقوقاً تسمى "جاردان"', 'أفضلها كولومبية'],
    },
    options: ['yakut', 'safir', 'zümrüt', 'peridot'],
  },
  {
    id: 'sapphire',
    answer: 'safir',
    emoji: '💙',
    name: { tr: 'Safir', en: 'Sapphire', ar: 'صفير' },
    clues: {
      tr: ['Klasik rengi mavi ama her renkte olabilir', 'Yakutla aynı mineralden (korund)', 'Keşmir en ünlü kaynağı'],
      en: ['Classic color is blue but can be any color', 'Same mineral as ruby (corundum)', 'Kashmir is the most famous source'],
      ar: ['أزرق كلاسيكياً لكنه يأتي بكل الألوان', 'من نفس معدن الياقوت', 'كشمير أشهر مصدر'],
    },
    options: ['safir', 'ametist', 'yakut', 'turkuvaz'],
  },
  {
    id: 'turquoise',
    answer: 'turkuvaz',
    emoji: '🟦',
    name: { tr: 'Turkuvaz', en: 'Turquoise', ar: 'فيروز' },
    clues: {
      tr: ['Adı "Türk taşı" demek', 'İran\'ın Nişabur bölgesinden ünlü', 'Mohs sertliği 5-6 (yumuşak)'],
      en: ['Name means "Turkish stone"', 'Famous from Nishapur, Iran', 'Mohs 5-6 (soft)'],
      ar: ['اسمه يعني "حجر تركي"', 'شهير من نيسابور', 'صلابة 5-6'],
    },
    options: ['zümrüt', 'akuamarin', 'turkuvaz', 'lapis'],
  },
  {
    id: 'diamond',
    answer: 'pırlanta',
    emoji: '💎',
    name: { tr: 'Pırlanta', en: 'Diamond', ar: 'ماس' },
    clues: {
      tr: ['Mohs sertliği 10 (en sert doğal madde)', 'Saf karbondan oluşur', '150 km derinlikte oluşur'],
      en: ['Mohs hardness 10 (hardest natural)', 'Pure carbon', 'Forms 150 km deep'],
      ar: ['صلابة 10', 'كربون نقي', 'يتكون على عمق 150 كم'],
    },
    options: ['pırlanta', 'zümrüt', 'topaz', 'kuvars'],
  },
];

export default function StoneGuessing() {
  const { locale } = useLocale();
  const { completeLab } = useProgress();
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * puzzles.length));
  const [revealed, setRevealed] = useState(0); // number of clues shown
  const [choice, setChoice] = useState(null);

  const puzzle = puzzles[idx];
  const clues = puzzle.clues[locale] || puzzle.clues.tr;

  const L = useMemo(() => ({
    tr: { title: 'Hangi taş?', showClue: 'Yeni ipucu', correct: 'Doğru! 🎉', wrong: 'Yanlış — tekrar dene', answer: 'Cevap', newRound: 'Yeni soru', cluesShown: 'gösterilen ipucu' },
    en: { title: 'Which stone?', showClue: 'New clue', correct: 'Correct! 🎉', wrong: 'Wrong — try again', answer: 'Answer', newRound: 'New puzzle', cluesShown: 'clues shown' },
    ar: { title: 'أي حجر؟', showClue: 'دليل جديد', correct: 'صحيح!', wrong: 'خطأ — حاول مجدداً', answer: 'الجواب', newRound: 'سؤال جديد', cluesShown: 'أدلة' },
  }[locale] || {
    title: 'Hangi taş?', showClue: 'Yeni ipucu', correct: 'Doğru! 🎉', wrong: 'Yanlış — tekrar dene', answer: 'Cevap', newRound: 'Yeni soru', cluesShown: 'gösterilen ipucu',
  }), [locale]);

  const correct = choice === puzzle.answer;

  const newRound = () => {
    let next;
    do { next = Math.floor(Math.random() * puzzles.length); } while (next === idx);
    setIdx(next);
    setChoice(null);
    setRevealed(0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-extrabold text-ink">{L.title}</h3>
        <span className="text-xs font-bold text-ink/60">
          {revealed}/{clues.length} {L.cluesShown}
        </span>
      </div>

      {/* Clue stack */}
      <div className="rounded-2xl bg-gem-soft border border-gem/30 p-4 mb-4 min-h-[120px]">
        {revealed === 0 && (
          <p className="text-sm text-ink/60">
            <Lightbulb size={14} className="inline -mt-0.5 mr-1" />
            {{ tr: 'İpucu almak için butona tıkla.', en: 'Click the button to reveal clues.', ar: 'انقر للحصول على الدليل.' }[locale] || 'İpucu almak için butona tıkla.'}
          </p>
        )}
        <ul className="space-y-2">
          {clues.slice(0, revealed).map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink animate-fadeUp">
              <span className="w-5 h-5 shrink-0 rounded-full bg-gem text-white flex items-center justify-center text-[10px] font-bold mt-0.5">
                {i + 1}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setRevealed((r) => Math.min(clues.length, r + 1))}
          disabled={revealed === clues.length}
          className="px-4 py-2 rounded-full bg-ink/5 hover:bg-ink/10 font-bold text-sm text-ink inline-flex items-center gap-1 disabled:opacity-40"
        >
          <Lightbulb size={14} />
          {L.showClue}
        </button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {puzzle.options.map((opt) => {
          const isChosen = choice === opt;
          const state = choice ? (opt === puzzle.answer ? 'correct' : isChosen ? 'wrong' : 'idle') : 'idle';
          return (
            <button
              key={opt}
              disabled={!!choice}
              onClick={() => {
                setChoice(opt);
                if (opt === puzzle.answer) completeLab('guess');
              }}
              className={cx(
                'px-3 py-2 rounded-2xl border font-bold capitalize text-sm transition',
                state === 'correct' && 'bg-gem/15 border-gem text-gem',
                state === 'wrong'   && 'bg-red-100 border-red-300 text-red-700',
                state === 'idle'    && 'bg-white border-ink/10 hover:border-ink/30 text-ink',
              )}
            >
              {state === 'correct' && <Check size={14} className="inline mr-1 -mt-0.5" />}
              {state === 'wrong' && <X size={14} className="inline mr-1 -mt-0.5" />}
              {opt}
            </button>
          );
        })}
      </div>

      {choice && (
        <div
          className={cx(
            'rounded-xl p-3 text-sm font-bold',
            correct ? 'bg-gem/10 text-gem' : 'bg-red-50 text-red-700',
          )}
        >
          {correct ? L.correct : `${L.wrong} — ${L.answer}: ${puzzle.name[locale] || puzzle.name.tr} ${puzzle.emoji}`}
          <button
            onClick={newRound}
            className="ml-3 text-ink/60 hover:text-ink inline-flex items-center gap-1 underline font-bold"
          >
            <RefreshCw size={12} /> {L.newRound}
          </button>
        </div>
      )}
    </div>
  );
}
