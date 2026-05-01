import { useEffect, useState } from 'react';

/**
 * LoadingFallback — shown briefly while a lazy-loaded page fetches.
 * Skeleton matches the museum aesthetic (cream background, shimmer,
 * subtle gold accent). Only visible for > 120ms to avoid flicker on
 * fast connections.
 */
export default function LoadingFallback() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="mx-auto max-w-4xl px-4 py-12 animate-fadeUp"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Yükleniyor / Loading / جار التحميل</span>

      {/* Title skeleton */}
      <div className="h-10 w-2/3 rounded-lg bg-ink/8 skeleton-shimmer mb-3" />
      <div className="h-5 w-1/2 rounded bg-ink/6 skeleton-shimmer mb-8" />

      {/* Content skeletons */}
      <div className="space-y-4">
        <div className="h-24 rounded-2xl bg-ink/6 skeleton-shimmer" />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-32 rounded-2xl bg-ink/6 skeleton-shimmer" />
          <div className="h-32 rounded-2xl bg-ink/6 skeleton-shimmer" />
        </div>
        <div className="h-40 rounded-2xl bg-ink/6 skeleton-shimmer" />
      </div>

      <style>{`
        @keyframes shimmerMove {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton-shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(0,0,0,0.04) 0%,
            rgba(247,201,72,0.12) 50%,
            rgba(0,0,0,0.04) 100%
          );
          background-size: 800px 100%;
          animation: shimmerMove 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
