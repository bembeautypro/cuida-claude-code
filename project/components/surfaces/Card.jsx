import React from 'react';

/**
 * Elevated content surface — white card with soft shadow and hairline border.
 * The default container for grouped content. Pass onClick to make it tappable.
 */
export function Card({ children, padding = 18, radius = 22, background = 'var(--c-card)', shadow = true, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background, borderRadius: radius, padding,
      boxShadow: shadow ? 'var(--shadow-md)' : 'none',
      border: '1px solid var(--c-line)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}
