import React from 'react';

/**
 * Thin progress bar — used for medication stock levels. Turns alert-red when low.
 */
export function Bar({ value = 0, max = 100, color = 'var(--c-accent)', height = 6, bg = 'var(--c-line)' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ height, background: bg, borderRadius: 999, overflow: 'hidden', width: '100%' }}>
      <div style={{ height: '100%', width: pct + '%', background: color, borderRadius: 999, transition: 'width .3s ease' }}/>
    </div>
  );
}
