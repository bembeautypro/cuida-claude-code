import React from 'react';

/**
 * Round icon-only button. Four variants, free pixel size.
 * Use for headers, toolbars, and compact actions (back, add, more).
 */
export function IconButton({ children, onClick, size = 36, variant = 'soft', style, ...rest }) {
  const variants = {
    soft:    { background: 'var(--c-surface)', color: 'var(--c-text)' },
    plain:   { background: 'transparent', color: 'var(--c-text)' },
    outline: { background: 'transparent', color: 'var(--c-text)', boxShadow: 'inset 0 0 0 1px var(--c-line)' },
    accent:  { background: 'var(--c-accent)', color: 'var(--c-accent-fg)' },
  };
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 999, border: 'none',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
      ...variants[variant], ...style,
    }} {...rest}>{children}</button>
  );
}
