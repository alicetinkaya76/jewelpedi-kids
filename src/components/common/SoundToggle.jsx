import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../../audio/SoundContext.jsx';
import { useLocale } from '../../context/LocaleContext.jsx';
import { cx } from '../../utils/helpers.js';
import { playSound } from '../../audio/sounds.js';

/**
 * Audio on/off toggle. Plays a soft confirmation chime the moment the
 * user turns audio ON so they get immediate feedback that it works
 * (default state is muted per spec A.7).
 */
export default function SoundToggle({ className = '' }) {
  const { muted, toggleMute } = useSound();
  const { t } = useLocale();
  const label = muted ? t('sound.unmute') : t('sound.mute');

  const handleClick = () => {
    const wasMuted = muted;
    toggleMute();
    // If the user just unmuted, confirm with a short chime. We call
    // playSound directly (not via context's play) because the context's
    // play() reads the old `muted` value from this render cycle.
    if (wasMuted) {
      try { playSound('chime', { volume: 0.5 }); } catch { /* noop */ }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        'relative p-2 rounded-lg hover:bg-ink/5 transition',
        'focus-visible:outline-none',
        className,
      )}
      aria-label={label}
      aria-pressed={!muted}
      title={label}
    >
      {muted ? (
        <VolumeX size={20} className="text-ink/60" />
      ) : (
        <Volume2 size={20} className="text-gold" />
      )}
    </button>
  );
}
