import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import styles from './CardGrid.module.css';

// Ribbon framings for the art band, cycled by card position so neighbors differ. Each is a chia.net
// line drawing used as a mask over the hologram sweep: width as a share of the band, offset, and turn.
const ART = [
  { ribbon: 'gentle-twist', width: 200, x: -45, y: 4, rotate: -12 },
  { ribbon: 'markets', width: 230, x: -62, y: 0, rotate: -22 },
  { ribbon: 'dramatic-start', width: 170, x: -30, y: -6, rotate: 10 },
  { ribbon: 'gentle-twist', width: 210, x: -70, y: 6, rotate: 18 },
  { ribbon: 'markets', width: 200, x: -18, y: 14, rotate: -8 },
  { ribbon: 'dramatic-start', width: 220, x: -95, y: 22, rotate: -26 },
];

const pad = (n) => String(n).padStart(2, '0');

/**
 * A grid of linked cards for the section home pages. `label` is the small caption on every card;
 * with `numbered`, each card's caption ends in its position (Lesson 01, Lesson 02, ...). `cta` is the
 * link line at the foot of each card. `tone` picks the art band: `navy` or `light`.
 */
export function CardGrid({ children, label, cta, numbered = false, tone = 'navy' }) {
  let index = 0;
  return (
    <div className={clsx(styles.grid, styles[tone])}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        index += 1;
        return React.cloneElement(child, {
          index,
          label: child.props.label ?? (label && (numbered ? `${label} ${pad(index)}` : label)),
          cta: child.props.cta ?? cta,
        });
      })}
    </div>
  );
}

/** One card with a single destination: the whole card is the link. */
export function Card({ href, title, label, cta, index = 1 }) {
  const art = ART[(index - 1) % ART.length];
  return (
    <Link to={href} className={styles.card}>
      <span
        className={styles.art}
        aria-hidden="true"
        style={{
          '--art-ribbon': `url('/img/ribbons/${art.ribbon}.svg')`,
          '--art-width': `${art.width}%`,
          '--art-x': `${art.x}%`,
          '--art-y': `${art.y}%`,
          '--art-rotate': `${art.rotate}deg`,
        }}
      >
        <span className={styles.ribbon} />
      </span>
      <span className={styles.body}>
        {label && <span className={styles.label}>{label}</span>}
        <span className={styles.title}>{title}</span>
        {cta && (
          <span className={styles.cta}>
            {cta}
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path
                d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </span>
    </Link>
  );
}
