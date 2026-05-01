import { Component } from 'react';

/**
 * ErrorBoundary — catches runtime errors in any child tree and
 * shows a friendly recovery UI instead of a blank screen.
 *
 * Deliberately implemented as a class component (React 18 still
 * requires class-based error boundaries for componentDidCatch).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console in dev; production hosts can wire this to Sentry
    // or similar via window.onerror elsewhere.
    // eslint-disable-next-line no-console
    console.error('[JewelPedi] Render error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-museum border border-ink/10 p-6 sm:p-8 text-center">
          <div className="text-5xl mb-3" aria-hidden="true">💎</div>
          <h1 className="font-display text-2xl font-extrabold text-ink mb-2">
            Bir vitrin kırıldı
          </h1>
          <p className="text-sm text-ink/70 mb-1">
            A display case broke · وقع عطل في العرض
          </p>
          <p className="text-sm text-ink/60 leading-relaxed mb-5">
            Beklenmeyen bir hata oluştu. Sayfayı yeniden yüklemeyi deneyebilirsin.<br />
            <span className="text-ink/40">Unexpected error. Try reloading the page.</span>
          </p>

          {this.state.error?.message && (
            <details className="mb-5 text-left bg-slate-50 rounded-lg p-3 text-xs text-ink/60">
              <summary className="cursor-pointer font-bold text-ink/70">
                Teknik detay / Technical detail
              </summary>
              <pre className="mt-2 overflow-auto whitespace-pre-wrap break-all">
                {String(this.state.error.message)}
              </pre>
            </details>
          )}

          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-full bg-white border-2 border-ink/15 text-ink text-xs font-extrabold uppercase tracking-wider hover:border-ink/40"
            >
              Yeniden dene
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-full bg-ink text-cream text-xs font-extrabold uppercase tracking-wider hover:bg-ink/85"
            >
              Sayfayı yenile
            </button>
          </div>
        </div>
      </div>
    );
  }
}
