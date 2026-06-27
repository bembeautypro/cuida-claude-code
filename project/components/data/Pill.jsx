import React from 'react';

/**
 * Pill / chip — used as filter chips and selectable tags. When `active`, it fills
 * with `color` (default ink). Pass onClick to make it interactive.
 */
export function Pill({ children, active, onClick, color, fg, style }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 14px', borderRadius: 999,
      fontSize: 13, fontWeight: 500, lineHeight: 1,
      cursor: onClick ? 'pointer' : 'default',
      border: '1px solid ' + (active ? 'transparent' : 'var(--c-line)'),
      background: active ? (color || 'var(--c-text)') : 'transparent',
      color: active ? (fg || '#fff') : 'var(--c-text)',
      fontFamily: 'inherit',
      ...style,
    }}>{children}</button>
  );
}
