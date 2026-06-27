import React from 'react';

/**
 * Cuida wordmark — the brand lockup (symbol + "cuida" text).
 * Symbol variants: heart (ECG inside a heart), abraco (two embracing circles), hand.
 */
export function CuidaWordmark({ size = 22, color = 'currentColor', variant = 'heart' }) {
  const sym = {
    abraco: (
      <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="16" r="9" fill={color} opacity="0.85"/>
        <circle cx="21" cy="16" r="9" fill={color} opacity="0.55"/>
      </svg>
    ),
    heart: (
      <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        <path d="M16 27S5 20.5 5 12.5C5 8.4 8.4 5 12.5 5c1.6 0 3 .6 3.5 1.5C16.5 5.6 17.9 5 19.5 5 23.6 5 27 8.4 27 12.5 27 20.5 16 27 16 27z" fill={color}/>
        <path d="M11 14h3l1.5-2.5 2 5L19 14h2" stroke="var(--c-bg)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    hand: (
      <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        <circle cx="16" cy="16" r="13" fill={color} opacity=".18"/>
        <path d="M11 17v-5a1.5 1.5 0 1 1 3 0v3M14 13v-3a1.5 1.5 0 1 1 3 0v3M17 12v-1.5a1.5 1.5 0 1 1 3 0V14M11 14c-1.6.4-2 1.6-2 3l1 5c.5 2 2 3.5 4 3.5h2.5c2.5 0 4.5-2 4.5-4.5V14a1.5 1.5 0 1 0-3 0"
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }[variant];

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {sym}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size,
        letterSpacing: '-0.02em',
        color,
        lineHeight: 1,
      }}>cuida</span>
    </span>
  );
}
