import React from 'react';

/**
 * Flat tinted surface — no shadow, no border. Uses var(--c-surface) (warm linho)
 * by default. For quiet, grouped, secondary content.
 */
export function SoftCard({ children, padding = 18, radius = 22, background = 'var(--c-surface)', style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background, borderRadius: radius, padding,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}
