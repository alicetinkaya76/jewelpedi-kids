import { Link } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext.jsx';
import { Github, Heart, Shield } from 'lucide-react';

export default function Footer() {
  const { t, locale } = useLocale();
  const privacyLabel = { tr: 'Gizlilik', en: 'Privacy', ar: 'الخصوصية' }[locale];

  return (
    <footer className="mt-16 border-t border-ink/5 bg-gradient-to-b from-transparent to-parchment/40">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="flex items-center gap-2 text-ink/70">
          <Heart size={14} className="text-gold" />
          <span>{t('footer.built')}</span>
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
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
