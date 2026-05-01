/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'], // Dark Gallery — triggered from ThemeContext
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand
        ink: '#1b2845',
        cream: '#fff8ec',
        parchment: '#fdf3dd',
        // Hall accents
        gold: { DEFAULT: '#d4a017', soft: '#fdebd0' },
        silver: { DEFAULT: '#7f8c8d', soft: '#eaecee' },
        diamond: { DEFAULT: '#5dade2', soft: '#d6eaf8' },
        gem: { DEFAULT: '#27ae60', soft: '#d5f5e3' },
        platinum: { DEFAULT: '#aab7b8', soft: '#f2f4f4' },
        jewel: { DEFAULT: '#8e44ad', soft: '#e8daef' },
        craft: { DEFAULT: '#e67e22', soft: '#fef5e7' },
        // Dark Gallery palette (Phase 1)
        gallery: {
          bg: '#0b0f1a',
          surface: '#141b2d',
          raised: '#1c2540',
          edge: '#2a3451',
          text: '#e8ecf5',
          mute: '#8893b3',
          warm: '#3b2a1a',
        },
      },
      boxShadow: {
        museum:
          '0 6px 24px -8px rgba(27, 40, 69, 0.18), 0 2px 6px -2px rgba(27, 40, 69, 0.08)',
        'museum-dark':
          '0 10px 40px -10px rgba(0, 0, 0, 0.75), 0 2px 8px -2px rgba(0, 0, 0, 0.45)',
        stand: '0 10px 30px -12px rgba(27, 40, 69, 0.25)',
        case:
          'inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(27, 40, 69, 0.08), 0 8px 24px -12px rgba(27, 40, 69, 0.22)',
        'case-dark':
          'inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.6), 0 12px 36px -14px rgba(0, 0, 0, 0.8)',
        plate:
          'inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)',
        seal:
          '0 2px 4px rgba(0, 0, 0, 0.35), inset 0 -2px 3px rgba(0, 0, 0, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.25)',
        inner: 'inset 0 1px 3px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'museum-grain':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.2 0 0 0 0.04 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")",
        'metal-plate':
          'linear-gradient(180deg, #f6ecd2 0%, #e9d8a4 45%, #d8c07a 55%, #f1e3b6 100%)',
        'metal-plate-dark':
          'linear-gradient(180deg, #3a3528 0%, #2a2418 45%, #1c1812 55%, #3d3624 100%)',
        'warm-spot':
          'radial-gradient(ellipse at center, rgba(247, 201, 72, 0.25) 0%, transparent 60%)',
        'cool-spot':
          'radial-gradient(ellipse at center, rgba(93, 173, 226, 0.28) 0%, transparent 60%)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        revealGem: {
          '0%': { transform: 'scale(0.3) rotate(-18deg)', opacity: '0', filter: 'blur(3px)' },
          '60%': { transform: 'scale(1.08) rotate(3deg)', opacity: '1', filter: 'blur(0)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1', filter: 'blur(0)' },
        },
        curtainUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0', clipPath: 'inset(100% 0 0 0)' },
          '100%': { transform: 'translateY(0)', opacity: '1', clipPath: 'inset(0 0 0 0)' },
        },
        spotlightFlicker: {
          '0%, 100%': { opacity: '0.88' },
          '18%': { opacity: '0.94' },
          '32%': { opacity: '0.86' },
          '54%': { opacity: '0.92' },
          '71%': { opacity: '0.85' },
          '88%': { opacity: '0.91' },
        },
        sealBobble: {
          '0%, 100%': { transform: 'rotate(-4deg) scale(1)' },
          '50%': { transform: 'rotate(-2deg) scale(1.04)' },
        },
        sparkleIn: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '60%': { transform: 'scale(1.2) rotate(120deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(180deg)', opacity: '0.9' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        driftX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        popOut: {
          '0%':   { transform: 'scale(1)',    opacity: '1' },
          '60%':  { transform: 'scale(1.25)', opacity: '0.9' },
          '100%': { transform: 'scale(0.2)',  opacity: '0' },
        },
      },
      animation: {
        floatY: 'floatY 4s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        popIn: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        fadeUp: 'fadeUp 0.5s ease-out both',
        revealGem: 'revealGem 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        curtainUp: 'curtainUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        spotlightFlicker: 'spotlightFlicker 6s ease-in-out infinite',
        sealBobble: 'sealBobble 2.4s ease-in-out infinite',
        sparkleIn: 'sparkleIn 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        twinkle: 'twinkle 2.6s ease-in-out infinite',
        driftX: 'driftX 5s ease-in-out infinite',
        popOut: 'popOut 280ms cubic-bezier(0.45, 0, 0.55, 1) both',
      },
    },
  },
  plugins: [],
};
