import { Link } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext.jsx';
import { Github, Heart, Shield, BookOpen } from 'lucide-react';

// Cross-link to main encyclopedia. Dev: silveratlas runs on port 3000.
// Prod: served from same domain root (silveratlas.com/).
const MAIN_SITE_URL = import.meta.env.DEV
  ? 'http://localhost:3000/silveratlas/'
  : '../';


export default function Footer() {
  const { t, locale } = useLocale();
  const privacyLabel = { tr: 'Gizlilik', en: 'Privacy', ar: 'الخصوصية' }[locale];
  const mainSiteLabel = {
    tr: 'Ana Ansiklopedi',
    en: 'Main Encyclopedia',
    ar: 'الموسوعة الرئيسية',
  }[locale];

  return (
    <footer className="mt-16 border-t border-ink/5 bg-gradient-to-b from-transparent to-parchment/40">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="flex items-center gap-2 text-ink/70">
          <Heart size={14} className="text-gold" />
          <span>{t('footer.built')}</span>
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a
            href={MAIN_SITE_URL}
            className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ink font-semibold"
          >
            <BookOpen size={16} />
            {mainSiteLabel}
          </a>
          <span className="text-ink/40">·</span>
          <Link
            to="/privacy"
            className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ink font-semibold"
          >
            <Shield size={16} />
            {privacyLabel}
          </Link>
          <span className="text-ink/40">·</span>
          <a
            href="https://github.com/jewelpedi/jewelpedi-kids"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ink font-semibold"
          >
            <Github size={16} />
            {t('footer.source')}
          </a>
          <span className="text-ink/40">·</span>
          <span className="text-ink/50 font-semibold">{t('footer.license')}</span>
        </div>
      </div>
    </footer>
  );
}
