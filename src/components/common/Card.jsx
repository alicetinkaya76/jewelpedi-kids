import { cx } from '../../utils/helpers.js';

/**
 * Birden çok yerde kullanılan temel kart.
 */
export default function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={cx(
        'rounded-3xl bg-white/90 backdrop-blur border border-ink/5 shadow-museum p-6',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
