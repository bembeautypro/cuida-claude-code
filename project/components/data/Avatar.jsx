import React from 'react';

/**
 * Circular avatar. Shows up to two initials (from `name`) or an `emoji`.
 * Each family member has a fixed warm tint — pass color + fg from their profile.
 */
export function Avatar({ name = '', color = 'var(--c-surface)', size = 44, fg = 'var(--c-text)', emoji, style }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: fg,
      display: 'grid', placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: emoji ? size * 0.5 : size * 0.38, fontWeight: 600,
      letterSpacing: '-0.01em', flexShrink: 0,
      overflow: 'hidden', position: 'relative',
      ...style,
    }}>
      {emoji || initials || '?'}
    </div>
  );
}
