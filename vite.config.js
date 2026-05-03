import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

/**
 * JewelPedi Kids — Vite build config.
 *
 * Faz 4 production hardening:
 *  - manualChunks: vendor / react / icons / recharts split → better caching
 *  - sourcemap only in dev (~3 MB smaller prod artifacts)
 *  - VitePWA: offline-ready, install prompt, Google Fonts cached
 *  - chunkSizeWarningLimit raised since content-heavy pages are expected
 */
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/silveratlas/kids/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      // Progressive Web App manifest
      manifest: {
        name: 'JewelPedi Kids — Mücevher Bilim Merkezi',
        short_name: 'JewelPedi',
        description:
          'Çocuklar için online mücevher bilim merkezi. Altın, gümüş, pırlanta, renkli taşlar ve Türk kuyumculuk zanaatını interaktif sergilerle keşfet.',
        theme_color: '#1b2845',
        background_color: '#fff8ec',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/kids/',
        scope: '/kids/',
        lang: 'tr',
        dir: 'ltr',
        categories: ['education', 'kids', 'science'],
        icons: [
          {
            src: '/kids/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },

      workbox: {
        // Subpath: kids deep links resolve to kids index
        navigateFallback: '/kids/index.html',

        // Pre-cache all built assets + the index html
        // Faz 6-D: .geojson eklendi — harita için offline çalışma
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2,geojson}'],
        // Skip URLs that should always go to the network
        navigateFallbackDenylist: [/^\/api\//],

        // Runtime caching for third-party assets (Google Fonts, etc.)
        runtimeCaching: [
          {
            // Google Fonts stylesheet
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // Google Fonts webfont files (woff2)
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],

        // Don't precache source maps
        globIgnores: ['**/*.map'],
      },

      // Only enable the service worker in prod builds; in dev it's
      // disabled to avoid caching issues while iterating.
      devOptions: {
        enabled: false,
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: 'dist',
    // Source maps only in dev / preview builds (huge in prod)
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 800,
    // Faz 6-Z: modulePreload'u özelleştir — index.html sadece eager
    // vendor chunk'larını (react, icons) önceden yükler. Lazy data
    // chunk'ları (storiesData, quizzesData, enrichment) sadece route
    // ziyaret edildiğinde yüklenir.
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        return deps.filter((d) => {
          // Lazy-loaded data/enrichment chunk'larını önceden yükleme
          return !/\/(storiesData|quizzesData|storyEnrichment|quizEnrichment|leaflet|geoPoints|glossary-extended|timelineEvents)-/.test(d);
        });
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — rarely changes, long-term cacheable
          react: ['react', 'react-dom', 'react-router-dom'],
          // Icon library — large, separate chunk so editing one icon
          // doesn't bust the whole vendor cache
          icons: ['lucide-react'],
          // Faz 6-D: Leaflet — sadece /map rotasında yüklenir, ayrı chunk
          // olması hem cache verimli hem diğer sayfaların bundle'ına sızmaz
          leaflet: ['leaflet'],
          // Faz 6-Z: Story enrichment — 6-C'de RelatedGrid üzerinden ana
          // bundle'a sızıyordu (+21 KB gz). Kendi chunk'ına ayrılırsa
          // yalnız gerçekten ihtiyaç duyan sayfalarla beraber yüklenir.
          storyEnrichment: ['/src/data/_storyEnrichment.js'],
          // Faz 6-Z: Quiz enrichment — aynı problem, 6-F'de +15 KB sızıntı
          quizEnrichment: ['/src/data/_quizEnrichment.js'],
          // Faz 6-Z: stories.js ve quizzes.js'in KENDİLERİ de 6+ lazy
          // sayfada paylaşıldığı için Rollup ana bundle'a koyuyordu.
          // Burada "stories" ve "quizzes" dataCore chunk'ına taşınır.
          // RelatedGrid'i kullanan lazy sayfalar bu chunk'ları yanıyla
          // getirir; Lobby/Header gibi eager sayfalar yüklemez.
          storiesData: ['/src/data/stories.js'],
          quizzesData: ['/src/data/quizzes.js'],
        },
      },
    },
  },
}));
