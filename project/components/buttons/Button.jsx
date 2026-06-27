import React from 'react';

/**
 * Primary text button. Pill-shaped, Plus Jakarta Sans medium.
 * Seven variants cover every action weight; three sizes.
 */
export function Button({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, style, full, ...rest }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    fontWeight: 500, lineHeight: 1, borderRadius: 999,
    transition: 'transform .12s ease, background .15s ease, color .15s ease',
    textDecoration: 'none', whiteSpace: 'nowrap',
    width: full ? '100%' : 'auto',
  };
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 18px', fontSize: 15 },
    lg: { padding: '16px 22px', fontSize: 16 },
  };
  const variants = {
    primary: { background: 'var(--c-accent)', color: 'var(--c-accent-fg)' },
    dark:    { background: 'var(--c-text)',   color: '#fff' },
    soft:    { background: 'var(--c-surface)', color: 'var(--c-text)' },
    ghost:   { background: 'transparent', color: 'var(--c-text)' },
    outline: { background: 'transparent', color: 'var(--c-text)', boxShadow: 'inset 0 0 0 1px var(--c-line-strong)' },
    danger:  { background: 'var(--c-alert)', color: '#fff' },
    success: { background: 'var(--c-success)', color: '#fff' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...style }} {...rest}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
