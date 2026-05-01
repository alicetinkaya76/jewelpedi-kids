import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { Flame } from 'lucide-react';

const metals = [
  { key: 'tin',      temp:  232, name: { tr: 'Kalay',   en: 'Tin',      ar: 'قصدير' }, color: '#bdc3c7' },
  { key: 'lead',     temp:  327, name: { tr: 'Kurşun',  en: 'Lead',     ar: 'رصاص'  }, color: '#7f8c8d' },
  { key: 'zinc',     temp:  420, name: { tr: 'Çinko',   en: 'Zinc',     ar: 'زنك'   }, color: '#95a5a6' },
  { key: 'silver',   temp:  962, name: { tr: 'Gümüş',   en: 'Silver',   ar: 'فضة'   }, color: '#cbd5e1' },
  { key: 'gold',     temp: 1064, name: { tr: 'Altın',   en: 'Gold',     ar: 'ذهب'   }, color: '#f7c948' },
  { key: 'copper',   temp: 1085, name: { tr: 'Bakır',   en: 'Copper',   ar: 'نحاس'  }, color: '#e67e22' },
  { key: 'iron',     temp: 1538, name: { tr: 'Demir',   en: 'Iron',     ar: 'حديد'  }, color: '#7b8a8b' },
  { key: 'platinum', temp: 1768, name: { tr: 'Platin',  en: 'Platinum', ar: 'بلاتين' }, color: '#aab7b8' },
];

export default function MeltingPoints() {
  const { locale } = useLocale();
  const { completeLab } = useProgress();
  const [heat, setHeat] = useState(0);

  useEffect(() => {
    if (heat >= 1500) completeLab('melt');
  }, [heat, completeLab]);

  const data = metals.map((m) => ({
    name: (m.name[locale] || m.name.tr),
    temp: m.temp,
    color: m.color,
    melted: heat >= m.temp,
  }));

  const meltedCount = data.filter((d) => d.melted).length;

  const L = {
    tr: { heat: 'Sıcaklık', melted: 'eridi', none: 'Henüz hiçbiri erimedi', title: 'Hangisi kaçta erir?' },
    en: { heat: 'Temperature', melted: 'melted', none: 'None melted yet', title: 'Which melts when?' },
    ar: { heat: 'الحرارة', melted: 'مذاب', none: 'لم يذب شيء بعد', title: 'أيها ينصهر متى؟' },
  }[locale] || { heat: 'Sıcaklık', melted: 'eridi', none: 'Henüz hiçbiri erimedi', title: 'Hangisi kaçta erir?' };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display font-extrabold text-ink">{L.title}</h3>
        <span className="text-xs font-bold text-ink/60">
          {meltedCount > 0 ? `${meltedCount}/${data.length} ${L.melted}` : L.none}
        </span>
      </div>

      <div className="h-64 rounded-2xl bg-white/70 p-2 mb-4">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
            <XAxis dataKey="name" tick={{ fill: '#1b2845', fontSize: 11, fontWeight: 700 }} interval={0} />
            <YAxis tick={{ fill: '#1b2845aa', fontSize: 10 }} unit="°C" />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #1b284520', fontSize: 12 }}
              formatter={(v) => [`${v}°C`, L.heat]}
            />
            <ReferenceLine
              y={heat}
              stroke="#e74c3c"
              strokeWidth={2}
              strokeDasharray="4 4"
              label={{ value: `🔥 ${heat}°C`, position: 'right', fill: '#e74c3c', fontSize: 11, fontWeight: 700 }}
            />
            <Bar dataKey="temp" radius={[8, 8, 0, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.melted ? d.color : `${d.color}80`} stroke={d.melted ? '#1b2845' : 'transparent'} strokeWidth={d.melted ? 2 : 0} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <label className="flex items-center gap-3 font-bold text-sm text-ink/70">
        <Flame className="text-red-500" size={18} />
        <span>{L.heat}</span>
        <input
          type="range"
          min={0}
          max={2000}
          step={20}
          value={heat}
          onChange={(e) => setHeat(Number(e.target.value))}
          className="flex-1 accent-red-500"
        />
        <span className="font-display text-lg text-ink w-20 text-right">{heat}°C</span>
      </label>
    </div>
  );
}
