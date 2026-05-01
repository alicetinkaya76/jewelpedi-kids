import { Link } from 'react-router-dom';
import { BookOpen, Clock } from 'lucide-react';
import { stories } from '../data/stories.js';
import { useLocale } from '../context/LocaleContext.jsx';
import { pick } from '../utils/helpers.js';
import { GemIcon } from '../components/icons/gems/index.js';
import { DisplayCase, LabelPlate } from '../components/museum/index.js';
import SpotLight from '../components/museum/SpotLight.jsx';

export default function StoriesIndex() {
  const { t, locale } = useLocale();

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <SpotLight variant="warm" corner="tl" intensity={0.5} />

      <header className="mb-10 text-center relative">
        <div className="inline-flex items-center gap-2 mb-3">
          <LabelPlate
            caption={{ tr: 'Anlatılar', en: 'Stories', ar: 'قصص' }[locale]}
            size="sm"
          />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink leading-tight text-engraved">
          {{
            tr: 'Hikâyelerin Müzesi',
            en: 'Museum of Stories',
            ar: 'متحف القصص',
          }[locale]}
        </h1>
        <p className="mt-3 text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
          {{
            tr: 'Her taşın bir hikâyesi var. Burada beş tanesini dinleyebilirsin — kraliçelerin, ustaların, nötron yıldızlarının ve nesilden nesle geçen bir sanatın hikâyesi.',
            en: 'Every stone has a story. Here you\'ll find five — of queens, of masters, of neutron stars, and of an art passed from one generation to the next.',
            ar: 'لكل حجر قصة. هنا خمس منها — عن ملكات، صناع، نجوم نيوترونية، وفن يُورَث من جيل إلى جيل.',
          }[locale]}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {stories.map((s, i) => (
          <StoryCard key={s.id} story={s} index={i} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function StoryCard({ story, index, locale }) {
  const title = pick(story.title, locale);
  const subtitle = pick(story.subtitle, locale);
  return (
    <DisplayCase
      to={`/stories/${story.id}`}
      accent={story.accent}
      number={String(index + 1).padStart(2, '0')}
      variant="tall"
      className="group"
    >
      <div className="flex items-start gap-4 p-5">
        <span
          className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ring-4 ring-white/60"
          style={{
            background: `color-mix(in srgb, ${story.accent} 22%, white)`,
          }}
          aria-hidden="true"
        >
          <GemIcon id={story.icon} size={56} animate shimmer />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-extrabold mb-1"
               style={{ color: story.accent }}>
            <BookOpen size={12} />
            <span>{{ tr: 'Anlatı', en: 'Story', ar: 'قصة' }[locale]}</span>
            <span className="text-ink/30">·</span>
            <Clock size={12} />
            <span>
              {story.readMinutes}{' '}
              {{ tr: 'dk', en: 'min', ar: 'د' }[locale]}
            </span>
          </div>
          <h2 className="font-display text-xl font-extrabold text-ink leading-tight">
            {title}
          </h2>
          <p className="mt-2 text-sm text-ink/70 leading-snug">{subtitle}</p>
        </div>
      </div>
    </DisplayCase>
  );
}
