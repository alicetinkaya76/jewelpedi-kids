import { BadgeCheck } from 'lucide-react';
import { formatSpecValue } from '../../utils/content.js';

/**
 * SpecsCard — sergi specs'ini (composition, density, purity, hardnessMohs, ...)
 * etikete-değer şeklinde küçük bir "teknik veri" kartında gösterir.
 *
 * Her spec satırının sonunda (eğer specs.cite varsa) süperscript atıf numarası
 * eklenir. Numaralar, ExhibitDetail'in genel footnote numaralandırmasıyla
 * uyumlu olmaktan ziyade "bu veri kaynaklı" işareti gibi kullanılır — hover ile
 * kaynak kısa formatta görünür (title attr).
 *
 * specs: { composition?, purity?, weight?, density?, hardnessMohs?, dateRange?,
 *          mintedAt?, findSite?, formula?, refractiveIndex?, crystalSystem?,
 *          cleavage?, cite? }
 */
const LABEL_KEYS = {
  composition: { tr: 'Bileşim', en: 'Composition', ar: 'التركيب' },
  purity: { tr: 'Saflık', en: 'Purity', ar: 'النقاء' },
  weight: { tr: 'Ağırlık', en: 'Weight', ar: 'الوزن' },
  diameter: { tr: 'Çap', en: 'Diameter', ar: 'القطر' },
  density: { tr: 'Yoğunluk', en: 'Density', ar: 'الكثافة' },
  hardnessMohs: { tr: 'Sertlik (Mohs)', en: 'Hardness (Mohs)', ar: 'الصلادة (موس)' },
  dateRange: { tr: 'Dönem', en: 'Era', ar: 'الفترة' },
  mintedAt: { tr: 'Basıldığı yer', en: 'Minted at', ar: 'مكان السك' },
  findSite: { tr: 'Bulunduğu yer', en: 'Find site', ar: 'موقع الاكتشاف' },
  formula: { tr: 'Formül', en: 'Formula', ar: 'الصيغة' },
  refractiveIndex: { tr: 'Kırılma İndisi', en: 'Refractive Index', ar: 'معامل الانكسار' },
  crystalSystem: { tr: 'Kristal Sistemi', en: 'Crystal System', ar: 'النظام البلوري' },
  cleavage: { tr: 'Dilinim', en: 'Cleavage', ar: 'الانفصام' },
  carats: { tr: 'Karat', en: 'Carats', ar: 'قراط' },
  meltingPoint: { tr: 'Erime Noktası', en: 'Melting Point', ar: 'درجة الانصهار' },
  boilingPoint: { tr: 'Kaynama Noktası', en: 'Boiling Point', ar: 'درجة الغليان' },
  yearDiscovered: { tr: 'Keşif Yılı', en: 'Year Discovered', ar: 'سنة الاكتشاف' },
  producer: { tr: 'Üretici', en: 'Producer', ar: 'المنتج' },
  technique: { tr: 'Teknik', en: 'Technique', ar: 'التقنية' },
  origin: { tr: 'Köken', en: 'Origin', ar: 'المنشأ' },
  symbol: { tr: 'Sembol', en: 'Symbol', ar: 'الرمز' },
};

const HEADER_LABEL = {
  tr: 'Teknik Veriler',
  en: 'Technical Data',
  ar: 'البيانات التقنية',
};

/**
 * specs:       enrichment.specs objesi
 * locale:      'tr'|'en'|'ar'
 * citeMap:     {sourceId: footnoteNumber} — dışarıdan verilir, yoksa spec.cite yine
 *              küçük "kaynaklı" rozeti gösterir ama numara basmaz.
 */
export default function SpecsCard({ specs, locale, citeMap }) {
  if (!specs || typeof specs !== 'object') return null;

  const rows = Object.entries(specs)
    .filter(([k, v]) => k !== 'cite' && v !== null && v !== undefined && v !== '')
    .map(([k, v]) => {
      const labels = LABEL_KEYS[k];
      const label =
        labels?.[locale] ||
        labels?.tr ||
        // fallback: kebab-case'den insanca okunur başlık
        k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
      return { key: k, label, value: formatSpecValue(v, locale) };
    });

  if (rows.length === 0) return null;

  const citeIds = Array.isArray(specs.cite) ? specs.cite : [];
  const citeNums = citeIds
    .map((id) => citeMap?.[id])
    .filter((n) => typeof n === 'number');

  return (
    <section
      className="rounded-3xl p-5 sm:p-6 mb-6 border"
      style={{
        background:
          'linear-gradient(135deg, rgba(17, 24, 39, 0.03), rgba(17, 24, 39, 0.01))',
        borderColor: 'rgba(17, 24, 39, 0.1)',
      }}
    >
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-ink text-cream flex items-center justify-center shrink-0">
            <BadgeCheck size={18} />
          </span>
          <div>
            <div className="text-label-plate text-ink/60">
              {HEADER_LABEL[locale] || HEADER_LABEL.tr}
            </div>
            <div className="font-display font-extrabold text-ink text-lg leading-tight">
              {rows.length}{' '}
              <span className="text-ink/50 font-normal text-sm">
                {
                  { tr: 'değer', en: 'values', ar: 'قيم' }[locale] ||
                  'değer'
                }
              </span>
            </div>
          </div>
        </div>
        {citeNums.length > 0 && (
          <span
            className="text-[11px] uppercase tracking-widest font-extrabold text-ink/50"
            title={
              { tr: 'Kaynaklı veri', en: 'Cited data', ar: 'بيانات موثقة' }[
                locale
              ]
            }
          >
            [{citeNums.sort((a, b) => a - b).join(',')}]
          </span>
        )}
      </div>
      <dl className="grid sm:grid-cols-2 gap-x-5 gap-y-3">
        {rows.map(({ key, label, value }) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-2 border-b border-ink/5 last:border-b-0"
          >
            <dt className="text-sm text-ink/60 font-bold">{label}</dt>
            <dd className="font-display text-ink font-extrabold text-base">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
