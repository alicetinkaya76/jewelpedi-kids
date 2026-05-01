import { useState, useEffect } from 'react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { CheckCircle2 } from 'lucide-react';

// 24 ayar altının ağırlıkça tipik alaşım rengi ipuçları
const colorAt = (karat) => {
  // Interpolate between a copper-tinged low karat and pure yellow gold at 24
  const t = Math.max(0, Math.min(1, (karat - 8) / (24 - 8)));
  // Lerp in HSL-ish space between #d3806e (reddish alloy) and #f7c948 (24k yellow)
  const lerp = (a, b) => Math.round(a + (b - a) * t);
  const r = lerp(211, 247);
  const g = lerp(128, 201);
  const b = lerp(110, 72);
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Ayar Hesaplayıcı
 * Kullanıcı 8–24 arasında ayar seçer; saf altın %'si, alaşım miktarı ve renk
 * tonu gerçek zamanlı gösterilir.
 */
export default function KaratCalculator() {
  const { t, locale } = useLocale();
  const { completeLab, labsCompleted } = useProgress();
  const [karat, setKarat] = useState(22);
  const [grams, setGrams] = useState(10);

  const purity = karat / 24;
  const pureGold = (grams * purity).toFixed(2);
  const alloy = (grams * (1 - purity)).toFixed(2);

  useEffect(() => {
    if (!labsCompleted.has('karat')) {
      // Deneyi kullanmak = tamamlamak say
      completeLab('karat');
    }
  }, [completeLab, labsCompleted]);

  const labels = {
    tr: { karat: 'Ayar', grams: 'Toplam ağırlık (gram)', purity: 'Saf altın oranı', pure: 'Saf altın', mix: 'Alaşım (bakır/gümüş/çinko)', preview: 'Renk önizleme' },
    en: { karat: 'Karat', grams: 'Total weight (g)', purity: 'Purity', pure: 'Pure gold', mix: 'Alloy (copper/silver/zinc)', preview: 'Color preview' },
    ar: { karat: 'العيار', grams: 'الوزن الإجمالي', purity: 'النقاء', pure: 'ذهب خالص', mix: 'سبيكة', preview: 'معاينة اللون' },
  };
  const L = labels[locale] || labels.tr;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-5">
        <div>
          <label className="flex items-center justify-between text-sm font-bold text-ink/70 mb-2">
            <span>{L.karat}</span>
            <span className="text-2xl font-display text-ink">{karat}K</span>
          </label>
          <input
            type="range"
            min={8}
            max={24}
            step={1}
            value={karat}
            onChange={(e) => setKarat(Number(e.target.value))}
            className="w-full accent-gold"
          />
          <div className="flex justify-between text-[10px] text-ink/40 font-bold mt-1">
            <span>8</span><span>14</span><span>18</span><span>22</span><span>24</span>
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-bold text-ink/70 mb-2">
            <span>{L.grams}</span>
            <span className="font-display text-ink">{grams} g</span>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>
      </div>

      {/* Output */}
      <div className="rounded-3xl p-5 bg-gold-soft border border-gold/30">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-widest font-extrabold text-gold">
            {L.preview}
          </span>
          <CheckCircle2 size={16} className="text-gem" aria-label="Aktif" />
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-20 h-20 rounded-full shadow-museum ring-4 ring-white/70 animate-popIn"
            style={{
              background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${colorAt(karat)} 70%, white), ${colorAt(karat)} 70%)`,
            }}
            aria-hidden
          />
          <div>
            <div className="text-3xl font-display font-extrabold text-ink leading-none">
              {Math.round(purity * 100)}%
            </div>
            <div className="text-xs font-bold text-ink/60 mt-1">{L.purity}</div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/70 p-3">
            <dt className="text-xs font-bold text-ink/50">{L.pure}</dt>
            <dd className="font-display text-lg text-ink font-extrabold">{pureGold} g</dd>
          </div>
          <div className="rounded-xl bg-white/70 p-3">
            <dt className="text-xs font-bold text-ink/50">{L.mix}</dt>
            <dd className="font-display text-lg text-ink font-extrabold">{alloy} g</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
