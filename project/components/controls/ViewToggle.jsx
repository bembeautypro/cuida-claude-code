import React from 'react';

/**
 * Segmented control — a small inline toggle between 2–4 views. The active
 * segment fills with the accent color. Options: [{ value, label, icon? }].
 */
export function ViewToggle({ value, onChange, options, style }) {
  return (
    <div style={{
      display: 'inline-flex', padding: 3,
      background: 'var(--c-surface)', borderRadius: 999,
      ...style,
    }}>
      {options.map(o => {
        const active = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 999,
            fontSize: 12, fontWeight: 600, lineHeight: 1,
            background: active ? 'var(--c-accent)' : 'transparent',
            color: active ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all .15s ease',
          }}>
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
