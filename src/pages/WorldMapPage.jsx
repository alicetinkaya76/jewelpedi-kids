import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Compass, Globe2, Filter } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.jsx';
import { geoPoints, getGeoPoint } from '../data/geoPoints.js';
import { getExhibit } from '../data/exhibits/index.js';
import { pick, cx } from '../utils/helpers.js';
import { KIND_LABELS, KIND_COLORS, ALL_KINDS } from '../utils/geoKinds.js';
import LeafletMap from '../components/map/LeafletMap.jsx';

/* ──────────────────────────────────────────────────────────────
   WorldMapPage — Faz 6-D (Leaflet + statik GeoJSON)

   Stratejik not:
   Plan belgesi "Protomaps self-hosted" öneriyordu ama o mimari
   `.pmtiles` üretim pipeline'ı, CDN servisi ve 8-15 MB PWA precache
   stratejisi gerektiriyor — bu projede mevcut değil. Aynı amaçlara
   (ToS kaygısı yok, offline, müze estetiği) daha basit yoldan
   ulaşan Leaflet + Natural Earth 110m GeoJSON + Türkiye 50m GeoJSON
   stratejisi seçildi. Trade-off: zoom seviyesi Z2-Z7 (ülke sınırı /
   Türkiye ili ölçeği); şehir sokak seviyesi yok — müze için yeterli.

   Üç alt kip:
   - 'world' (default): 39 geoPoint'in tümü, dünya zoom
   - 'turkey': Türkiye'ye zoom + sadece Türkiye içi noktalar
   - Kind filtresi: mine/workshop/museum/site/trade-hub/deposit

   Faz 6-Z: KIND_LABELS/COLORS/ALL_KINDS artık shared utils
   (src/utils/geoKinds.js) — LeafletMap ile ortak.
   ────────────────────────────────────────────────────────────── */

const TURKEY_BBOX = [
  [35.8, 25.6], // SW
  [42.2, 45.0], // NE
];

const VIEW_WORLD = { center: [30, 25], zoom: 2 };
const VIEW_TURKEY = { center: [39.0, 35.5], zoom: 5 };

export default function WorldMapPage() {
  const { t, locale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  // UI state
  const [region, setRegion] = useState('world'); // 'world' | 'turkey'
  const [activeKinds, setActiveKinds] = useState(() => new Set(ALL_KINDS));
  const [active, setActive] = useState(null); // seçili geoPoint

  // Deep link: URL hash'ten geo ID oku, mount'ta odakla
  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    const target = getGeoPoint(decodeURIComponent(hash));
    if (!target) return;
    // İçinde bulunduğu bölgeyi seç
    if (isInTurkey(target)) {
      setRegion('turkey');
    }
    setActive(target);
    // Harita mount olduğunda odakla
    setTimeout(() => {
      mapRef.current?.focusPoint(target.id, isInTurkey(target) ? 6 : 5);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // sadece ilk mount

  // Filtered points
  const visiblePoints = useMemo(() => {
    let pts = geoPoints;
    if (region === 'turkey') pts = pts.filter(isInTurkey);
    if (activeKinds.size < ALL_KINDS.length) {
      pts = pts.filter((p) => activeKinds.has(p.kind));
    }
    return pts;
  }, [region, activeKinds]);

  // Kind filtre toggle
  const toggleKind = (k) => {
    setActiveKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      // Eğer tümü kapatılırsa, hepsini tekrar aç (UX: boş harita istemiyoruz)
      if (next.size === 0) return new Set(ALL_KINDS);
      return next;
    });
  };

  // Region değişince view'ı değiştir
  useEffect(() => {
    const map = mapRef.current?.getMap?.();
    if (!map) return;
    const target = region === 'turkey' ? VIEW_TURKEY : VIEW_WORLD;
    map.flyTo(target.center, target.zoom, { duration: 0.7 });
  }, [region]);

  // Marker seçildiğinde URL hash'i güncelle (shareable)
  const onPointSelect = (pt) => {
    setActive(pt);
    navigate(`#${encodeURIComponent(pt.id)}`, { replace: true });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
        {t('map.title')}
      </h1>
      <p className="text-ink/60 mb-6">{t('map.subtitle')}</p>

      {/* Region switcher */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="inline-flex rounded-full bg-white border border-ink/10 p-1 shadow-sm">
          <TabBtn active={region === 'world'} onClick={() => { setRegion('world'); setActive(null); }}>
            <Globe2 size={14} className="inline-block mr-1" />
            {{ tr: 'Dünya', en: 'World', ar: 'العالم' }[locale]}
          </TabBtn>
          <TabBtn active={region === 'turkey'} onClick={() => { setRegion('turkey'); setActive(null); }}>
            🇹🇷 {{ tr: 'Türkiye', en: 'Türkiye', ar: 'تركيا' }[locale]}
          </TabBtn>
        </div>
        <div className="text-xs text-ink/50 font-bold">
          {{ tr: `${visiblePoints.length} nokta`, en: `${visiblePoints.length} points`, ar: `${visiblePoints.length} نقطة` }[locale]}
        </div>
      </div>

      {/* Kind filter chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest font-extrabold text-ink/50 mr-1">
          <Filter size={11} />
          {{ tr: 'Tür', en: 'Kind', ar: 'النوع' }[locale]}:
        </span>
        {ALL_KINDS.map((k) => {
          const active = activeKinds.has(k);
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggleKind(k)}
              aria-pressed={active}
              className={cx(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold transition',
                active
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-white text-ink/60 border-ink/10 hover:border-ink/30',
              )}
            >
              <span aria-hidden>{KIND_LABELS[k].emoji}</span>
              {KIND_LABELS[k][locale] || KIND_LABELS[k].tr}
            </button>
          );
        })}
      </div>

      {/* Map surface */}
      <div
        className="relative rounded-[2rem] overflow-hidden shadow-museum border border-ink/10 bg-gradient-to-br from-[#d6eaf8] to-[#e8f8f5]"
        style={{ aspectRatio: '16 / 9', minHeight: 320 }}
      >
        <LeafletMap
          ref={mapRef}
          initialView={VIEW_WORLD}
          points={visiblePoints}
          activeId={active?.id || null}
          onPointSelect={onPointSelect}
          renderIcon={renderMarkerIcon}
          renderPopup={(pt, loc) => renderPopupHtml(pt, loc)}
          locale={locale}
          className="absolute inset-0"
        />
      </div>

      {/* Details panel — seçili noktanın tam kartı */}
      {active && (
        <DetailsPanel
          point={active}
          locale={locale}
          onClose={() => {
            setActive(null);
            navigate(location.pathname, { replace: true });
          }}
        />
      )}

      {!active && (
        <p className="mt-5 text-center text-sm font-bold text-ink/50 flex items-center justify-center gap-2">
          <Compass size={14} />
          {{
            tr: 'Bir noktaya tıkla, hikâyesini oku.',
            en: 'Tap a marker to read its story.',
            ar: 'انقر على نقطة لقراءة قصتها.',
          }[locale]}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── helpers ───────────────────────── */

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'px-3 py-1.5 rounded-full text-sm font-bold transition',
        active ? 'bg-ink text-cream shadow-sm' : 'text-ink/70 hover:bg-ink/5',
      )}
    >
      {children}
    </button>
  );
}

function isInTurkey(pt) {
  const [sw, ne] = TURKEY_BBOX;
  return pt.lat >= sw[0] && pt.lat <= ne[0] && pt.lng >= sw[1] && pt.lng <= ne[1];
}

/**
 * Marker HTML — leaflet divIcon için.
 * Inaktif madenler/atölyeler için opacity düşük.
 */
function renderMarkerIcon(pt) {
  const bg = KIND_COLORS[pt.kind] || '#1b2845';
  const isInactive = pt.active === false;
  const opacity = isInactive ? 0.6 : 1;
  const emoji = KIND_LABELS[pt.kind]?.emoji || '•';
  return (
    `<span class="jp-marker-dot" style="background:${bg};opacity:${opacity}">${emoji}</span>`
  );
}

/**
 * Popup içeriği — leaflet bindPopup için.
 * HTML string döner (Leaflet bunu direkt DOM'a koyar).
 * Dikkat: XSS riski yok çünkü içerik bizim kontrol ettiğimiz data'dan.
 */
function renderPopupHtml(pt, locale) {
  const name = pickStr(pt.name, locale);
  const place = pickStr(pt.place, locale);
  const fact = pickStr(pt.fact, locale);

  // Kind chip
  const kindLabel = KIND_LABELS[pt.kind]?.[locale] || KIND_LABELS[pt.kind]?.tr || pt.kind;
  const kindEmoji = KIND_LABELS[pt.kind]?.emoji || '';
  const activeChip = pt.active === false
    ? `<span class="jp-popup-chip" style="background:rgba(192,57,43,0.08);color:#a93226">${
        { tr: 'pasif', en: 'inactive', ar: 'غير نشط' }[locale] || 'inactive'
      }</span>`
    : '';

  // Era formatı: {start:-4000,end:null} → "M.Ö. 4000 — günümüz"
  let eraStr = '';
  if (pt.era) {
    const s = pt.era.start;
    const e = pt.era.end;
    const sStr = s < 0 ? `${-s} ${eraPrefix(locale)}` : `${s}`;
    const eStr = e === null || e === undefined
      ? ({ tr: 'günümüz', en: 'present', ar: 'اليوم' }[locale] || 'present')
      : (e < 0 ? `${-e} ${eraPrefix(locale)}` : `${e}`);
    eraStr = `<span class="jp-popup-chip">⏳ ${sStr} — ${eStr}</span>`;
  }

  // Sergi linki (ilki)
  let ctaHtml = '';
  if (Array.isArray(pt.exhibitIds) && pt.exhibitIds.length > 0) {
    const first = pt.exhibitIds[0];
    const ex = getExhibit(first);
    if (ex) {
      const exName = pickStr(ex.name, locale);
      const href = `/halls/${ex.cat}/${ex.id}`;
      const label = { tr: 'Sergiyi aç', en: 'Open exhibit', ar: 'افتح المعرض' }[locale] || 'Open';
      ctaHtml = `<a class="jp-popup-cta" href="${href}">→ ${escapeHtml(label)}: ${escapeHtml(exName)}</a>`;
    }
  }

  return `
    <div class="jp-popup-root">
      <div class="jp-popup-place">${escapeHtml(place || '')}</div>
      <div class="jp-popup-title">${escapeHtml(name)}</div>
      <div class="jp-popup-chips">
        <span class="jp-popup-chip">${kindEmoji} ${escapeHtml(kindLabel)}</span>
        ${activeChip}
        ${eraStr}
      </div>
      ${fact ? `<p class="jp-popup-fact">${escapeHtml(fact)}</p>` : ''}
      ${ctaHtml}
    </div>
  `;
}

function pickStr(obj, locale) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj.tr || obj.en || '';
}

function eraPrefix(locale) {
  return { tr: 'M.Ö.', en: 'BCE', ar: 'ق.م' }[locale] || 'BCE';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ───────────────────────── DetailsPanel ───────────────────────── */

function DetailsPanel({ point, locale, onClose }) {
  const name = pick(point.name, locale);
  const place = pick(point.place, locale);
  const fact = pick(point.fact, locale);
  const exhibits = (point.exhibitIds || []).map(getExhibit).filter(Boolean);

  return (
    <div className="mt-5 rounded-3xl bg-white border border-ink/10 shadow-museum p-5 animate-fadeUp">
      <div className="flex items-start gap-4">
        <span
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ring-4 ring-white/60 shrink-0"
          style={{ background: `color-mix(in srgb, ${KIND_COLORS[point.kind] || '#1b2845'} 20%, white)` }}
        >
          {KIND_LABELS[point.kind]?.emoji || '📍'}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink/50 mb-0.5">
            {place}
          </div>
          <h3 className="font-display text-2xl font-extrabold text-ink leading-tight">
            {name}
          </h3>
          {fact && (
            <p className="text-ink/75 mt-2 leading-relaxed">{fact}</p>
          )}

          {/* Metadata chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <Chip>
              {KIND_LABELS[point.kind]?.emoji}{' '}
              {KIND_LABELS[point.kind]?.[locale] || KIND_LABELS[point.kind]?.tr}
            </Chip>
            {point.active === false && (
              <Chip color="danger">
                {{ tr: 'Pasif', en: 'Inactive', ar: 'غير نشط' }[locale]}
              </Chip>
            )}
            {point.era && (
              <Chip>
                ⏳ {formatEra(point.era, locale)}
              </Chip>
            )}
          </div>

          {/* Related exhibits */}
          {exhibits.length > 0 && (
            <div className="mt-4 pt-3 border-t border-ink/8">
              <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink/50 mb-2">
                {{ tr: 'İlgili Sergiler', en: 'Related Exhibits', ar: 'معارض ذات صلة' }[locale]}
              </div>
              <div className="flex flex-wrap gap-2">
                {exhibits.map((ex) => (
                  <a
                    key={ex.id}
                    href={`/halls/${ex.cat}/${ex.id}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               bg-white border border-ink/10 hover:border-ink/30
                               font-bold text-sm text-ink lift-on-hover transition"
                  >
                    {pick(ex.name, locale)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center shrink-0"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

function Chip({ children, color }) {
  const bg =
    color === 'danger'
      ? 'rgba(192,57,43,0.1)'
      : 'rgba(27,40,69,0.06)';
  const fg = color === 'danger' ? '#a93226' : 'rgba(27,40,69,0.8)';
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

function formatEra(era, locale) {
  const s = era.start;
  const e = era.end;
  const pref = { tr: 'M.Ö.', en: 'BCE', ar: 'ق.م' }[locale] || 'BCE';
  const present = { tr: 'günümüz', en: 'present', ar: 'اليوم' }[locale];
  const sStr = s < 0 ? `${-s} ${pref}` : `${s}`;
  const eStr = e === null || e === undefined ? present : (e < 0 ? `${-e} ${pref}` : `${e}`);
  return `${sStr} — ${eStr}`;
}
