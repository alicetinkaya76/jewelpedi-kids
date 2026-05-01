import { useLocale } from '../context/LocaleContext.jsx';
import { Link } from 'react-router-dom';
import { Hammer, ChevronLeft } from 'lucide-react';

/**
 * ComingSoonStub — placeholder used by games that are scheduled for Faz 5-B.
 * Rendered inside GameShell's "playing" phase, so it takes the same
 * { difficulty, onFinish } props any real game would. Calling onFinish with
 * score: 0 lets a curious user test the round-trip back to the hub.
 */
export default function ComingSoonStub({ onFinish, accent = '#1b2845' }) {
  const { locale } = useLocale();

  const L = {
    tr: {
      title: 'Bu oyun Faz 5-B\'de geliyor',
      body: 'Altyapı, tasarım ve 2 oyun hazır. Geri kalan 3 oyun (Mohs Merdiveni, Kuyumcu Atölyesi ve Dünya Turu) bir sonraki geliştirme aşamasında eklenecek.',
      back: 'Oyun Merkezine dön',
      finish: 'Test bitişi',
    },
    en: {
      title: 'This game is coming in Phase 5-B',
      body: 'Infrastructure, design and 2 games are ready. The remaining 3 games (Mohs Climb, Jeweler\'s Shop, World Tour) will be added in the next development phase.',
      back: 'Back to Games',
      finish: 'Test finish',
    },
    ar: {
      title: 'هذه اللعبة قادمة في المرحلة 5-ب',
      body: 'البنية التحتية والتصميم ولعبتان جاهزة. الألعاب الثلاث الباقية ستضاف لاحقاً.',
      back: 'العودة للألعاب',
      finish: 'اختبار الإنهاء',
    },
  }[locale] || {};

  return (
    <div className="rounded-3xl bg-white/95 border border-ink/10 shadow-museum p-8 text-center space-y-5">
      <div
        className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-white"
        style={{ background: accent }}
        aria-hidden="true"
      >
        <Hammer size={28} />
      </div>
      <h2 className="font-display text-2xl font-extrabold text-ink">{L.title}</h2>
      <p className="text-ink/70 leading-relaxed max-w-md mx-auto">{L.body}</p>
      <div className="flex flex-wrap gap-3 items-center justify-center pt-2">
        <Link
          to="/games"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-ink text-cream font-extrabold"
        >
          <ChevronLeft size={14} /> {L.back}
        </Link>
        <button
          type="button"
          onClick={() =>
            onFinish?.({
              score: 0,
              won: false,
              summary: { tr: 'Bu oyun henüz hazır değil.', en: 'This game is not ready yet.', ar: 'غير جاهزة بعد.' },
            })
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-white border border-ink/10 font-bold text-ink/70"
        >
          {L.finish}
        </button>
      </div>
    </div>
  );
}
