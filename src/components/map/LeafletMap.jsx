import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { KIND_COLORS } from '../../utils/geoKinds.js';

/**
 * LeafletMap — Faz 6-D
 *
 * Vanilla Leaflet + React lifecycle sarmalayıcı. Tile layer YOKTUR.
 * Harita zemini bir GeoJSON ülke sınırları layer'ıdır (Natural Earth
 * 110m, public domain). Üzerine marker'lar custom HTML divIcon ile
 * eklenir. Böylece:
 *   - Tile server ToS kaygısı yok
 *   - PWA tam offline (GeoJSON precache'te)
 *   - Müze estetiği tam kontrolde
 *
 * Koordinat sistemi: EPSG:3857 (Web Mercator) — Leaflet default.
 *
 * Props:
 *   initialView   {center: [lat, lng], zoom: number}
 *   minZoom       default 2
 *   maxZoom       default 7
 *   maxBounds     [[-85, -180], [85, 180]]  — panning sınırı
 *   countriesUrl  default '/geo/countries-110m.geojson'
 *   turkeyUrl     default '/geo/turkey-50m.geojson'  (opsiyonel, lazy)
 *   points        [{id, lat, lng, kind, ...}]  — marker listesi
 *   activeId      aktif marker ID'si (popup açık olan)
 *   onPointSelect (point) => void  — marker tıklandığında
 *   renderIcon    (point) => HTMLString  — marker HTML ikonu üretici
 *   renderPopup   (point, locale) => HTMLString  — popup içeriği
 *   locale        'tr' | 'en' | 'ar'
 *
 * Ref API (useImperativeHandle):
 *   focusPoint(id, zoomLevel=5)  — belirli bir noktaya zoom + popup aç
 *   resetView()                  — initialView'a dön
 *
 * Not: Default Leaflet marker ikonları CSS'te shadow ve image kullanıyor;
 * biz divIcon ile HTML render ediyoruz, bu yüzden marker-shadow.png vb.
 * asset'lere ihtiyaç yok.
 */

const DEFAULT_INITIAL_VIEW = { center: [30, 25], zoom: 2 };

const LeafletMap = forwardRef(function LeafletMap(
  {
    initialView = DEFAULT_INITIAL_VIEW,
    minZoom = 2,
    maxZoom = 7,
    maxBounds = [[-85, -180], [85, 180]],
    countriesUrl = '/geo/countries-110m.geojson',
    turkeyUrl = '/geo/turkey-50m.geojson',
    points = [],
    activeId = null,
    onPointSelect,
    renderIcon,
    renderPopup,
    locale = 'tr',
    className = '',
  },
  ref,
) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map()); // id → Leaflet marker
  const countriesLayerRef = useRef(null);
  const turkeyLayerRef = useRef(null);

  // Imperative API
  useImperativeHandle(
    ref,
    () => ({
      focusPoint: (id, zoomLevel = 5) => {
        const marker = markersRef.current.get(id);
        if (!marker || !mapRef.current) return;
        const latlng = marker.getLatLng();
        mapRef.current.flyTo(latlng, zoomLevel, { duration: 0.8 });
        // Popup'ı açma işi parent'ın onPointSelect ile sorumlu olmalı,
        // ama burada da aç — deep-link senaryosunda faydalı:
        setTimeout(() => marker.openPopup(), 850);
      },
      resetView: () => {
        if (!mapRef.current) return;
        mapRef.current.flyTo(initialView.center, initialView.zoom, { duration: 0.6 });
      },
      getMap: () => mapRef.current,
    }),
    [initialView],
  );

  // ─── Map lifecycle ─────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: initialView.center,
      zoom: initialView.zoom,
      minZoom,
      maxZoom,
      maxBounds,
      maxBoundsViscosity: 0.8,
      worldCopyJump: false,
      zoomControl: true,
      attributionControl: true,
      preferCanvas: false,
    });

    // Attribution — Natural Earth + world-atlas + Leaflet
    map.attributionControl
      .setPrefix('')
      .addAttribution(
        '<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> · ' +
          '<a href="https://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>',
      );

    mapRef.current = map;

    // GeoJSON layer'ları yükle
    loadGeoJSON(countriesUrl)
      .then((data) => {
        if (!mapRef.current) return;
        const layer = L.geoJSON(data, {
          style: {
            fillColor: '#f4e9d0', // soluk bej (cream'e yakın)
            fillOpacity: 0.85,
            color: '#1b2845', // koyu kıyı
            weight: 0.5,
            opacity: 0.5,
          },
        });
        layer.addTo(mapRef.current);
        countriesLayerRef.current = layer;
      })
      .catch((err) => {
        console.error('Countries GeoJSON load failed:', err);
      });

    // Türkiye detaylı sınır — opsiyonel, lazy
    if (turkeyUrl) {
      loadGeoJSON(turkeyUrl)
        .then((data) => {
          if (!mapRef.current) return;
          const layer = L.geoJSON(data, {
            style: {
              fillColor: '#f4e9d0',
              fillOpacity: 0, // dünya layer'ının üstüne bindirme yok
              color: '#c0392b', // vurgulu kırmızı
              weight: 1.2,
              opacity: 0.7,
              dashArray: '3,3',
            },
          });
          layer.addTo(mapRef.current);
          turkeyLayerRef.current = layer;
        })
        .catch(() => {
          // Sessiz düş — Türkiye layer opsiyonel
        });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
        countriesLayerRef.current = null;
        turkeyLayerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // map lifecycle bir kez; view değişirse imperative API

  // ─── Markers sync ──────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const existingIds = new Set(markersRef.current.keys());
    const nextIds = new Set(points.map((p) => p.id));

    // Kaldırılanlar
    for (const id of existingIds) {
      if (!nextIds.has(id)) {
        const m = markersRef.current.get(id);
        if (m) map.removeLayer(m);
        markersRef.current.delete(id);
      }
    }

    // Eklenenler / güncellenenler
    for (const pt of points) {
      let marker = markersRef.current.get(pt.id);
      const iconHtml = renderIcon ? renderIcon(pt) : defaultIcon(pt);
      const iconSize = 32;

      if (!marker) {
        const icon = L.divIcon({
          className: 'jp-marker',
          html: iconHtml,
          iconSize: [iconSize, iconSize],
          iconAnchor: [iconSize / 2, iconSize / 2],
        });

        marker = L.marker([pt.lat, pt.lng], { icon, keyboard: true, riseOnHover: true });

        if (renderPopup) {
          marker.bindPopup(() => renderPopup(pt, locale), {
            maxWidth: 320,
            minWidth: 240,
            className: 'jp-popup',
            closeButton: true,
          });
        }

        marker.on('click', () => {
          if (onPointSelect) onPointSelect(pt);
        });

        marker.addTo(map);
        markersRef.current.set(pt.id, marker);
      } else {
        // Konum/ikon değişmişse güncelle (normalde değişmez ama defensively)
        marker.setLatLng([pt.lat, pt.lng]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, locale]);

  // ─── Active marker popup sync ──────────────────────────────
  useEffect(() => {
    if (!activeId) return;
    const marker = markersRef.current.get(activeId);
    if (marker && !marker.isPopupOpen()) {
      marker.openPopup();
    }
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      className={className}
      // Leaflet viewport'u doldurur; height parent'tan gelir
      style={{ width: '100%', height: '100%' }}
      aria-label="Interactive world map"
      role="application"
    />
  );
});

export default LeafletMap;

/**
 * Varsayılan marker ikonu — renderIcon prop verilmezse kullanılır.
 */
function defaultIcon(pt) {
  const bg = KIND_COLORS[pt.kind] || '#1b2845';
  return (
    '<span class="jp-marker-dot" style="background:' +
    bg +
    '">' +
    (pt.emoji || '•') +
    '</span>'
  );
}

async function loadGeoJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GeoJSON fetch failed: ${url} (${res.status})`);
  return res.json();
}
