/**
 * BodyWithCitations — Faz 6-C
 *
 * Paragraflı bir metni render eder; metindeki "[1]" ve "[1,2]" gibi
 * numaralı referans etiketlerini süperscript'e çevirir.
 *
 * Bu bileşen **çözülmüş** (resolved) metin alır — yani resolveCitations()
 * zaten [cite:source-id] formatını [1] formatına dönüştürmüş olmalıdır.
 *
 * 6-B'de ExhibitDetail.jsx içinde inline fonksiyondu; 6-C'de StoryPage de
 * kullanacağı için shared bileşene çıkarıldı. ExhibitDetail içindeki
 * yerel sürüm buraya delegete eder.
 *
 * props:
 *   text:       string  — paragraflar \n\n ile ayrılmış
 *   paragraphClassName?: string — paragraf span stili (varsayılan: sergi tonu)
 */

const INLINE_CITE_PATTERN = /\[(\d+(?:,\d+)*)\]/g;

export default function BodyWithCitations({
  text,
  paragraphClassName = 'text-ink/85 leading-relaxed text-lg',
}) {
  if (!text) return null;
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim());
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className={paragraphClassName}>
          {renderInlineCitations(para)}
        </p>
      ))}
    </div>
  );
}

/**
 * Metindeki [1], [1,2] gibi numaralı referansları <sup> elemanına çevirir.
 * Exportedir; başka bileşenler (örn. Story pullquote) doğrudan kullanabilir.
 */
export function renderInlineCitations(text) {
  if (typeof text !== 'string' || !text) return text;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  // Regex stateful — her çağrıda sıfırla
  INLINE_CITE_PATTERN.lastIndex = 0;
  while ((match = INLINE_CITE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const nums = match[1];
    parts.push(
      <sup
        key={`c${key++}`}
        className="font-display font-extrabold tabular-nums text-[0.65em] text-ink/60 ml-0.5"
      >
        [{nums}]
      </sup>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}
