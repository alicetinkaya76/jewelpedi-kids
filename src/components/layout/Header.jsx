import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import LocaleSwitcher from './LocaleSwitcher.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import SoundToggle from '../common/SoundToggle.jsx';
import { cx } from '../../utils/helpers.js';

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label="JewelPedi Kids">
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center bg-ink text-cream
                   shadow-museum group-hover:rotate-[-6deg] transition-transform"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
          <polygon points="12,3 20,9 12,22 4,9" fill="#f7c948" stroke="#fff8ec" strokeWidth="1.2" strokeLinejoin="round" />
          <polyline points="4,9 20,9" stroke="#fff8ec" strokeWidth="1.2" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display font-extrabold text-ink text-lg tracking-tight">
          JewelPedi <span className="text-gold">Kids</span>
        </span>
        <span className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 font-bold">
          Bilim Merkezi
        </span>
      </span>
    </Link>
  );
}

const navItems = [
  { to: '/', key: 'nav.lobby' },
  { to: '/halls', key: 'nav.halls' },
  { to: '/stories', key: 'nav.stories' },
  { to: '/timeline', key: 'nav.timeline' },
  { to: '/lab', key: 'nav.lab' },
  { to: '/quiz', key: 'nav.quiz' },
  { to: '/games', key: 'nav.games' },
  { to: '/workshop', key: 'nav.workshop' },
  { to: '/map', key: 'nav.map' },
  { to: '/glossary', key: 'nav.glossary' },
  { to: '/educators', key: 'nav.educators' },
  { to: '/achievements', key: 'nav.achievements' },
];

export default function Header() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-ink/5">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Brand />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cx(
                  'px-3 py-1.5 rounded-full text-sm font-bold transition',
                  isActive
                    ? 'bg-ink text-cream shadow-sm'
                    : 'text-ink/70 hover:text-ink hover:bg-ink/5',
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <SoundToggle />
          <ThemeToggle />
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-ink/5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-ink/5 bg-cream/95 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cx(
                    'px-3 py-2 rounded-lg text-sm font-bold',
                    isActive ? 'bg-ink text-cream' : 'text-ink/80 hover:bg-ink/5',
                  )
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
            <LocaleSwitcher className="col-span-2 justify-self-start mt-2" />
          </nav>
        </div>
      )}
    </header>
  );
}
