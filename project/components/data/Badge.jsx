import React from 'react';

/**
 * Status badge — small soft-tinted label with an optional leading dot.
 * Use the semantic tones (success / alert / warn / neutral / accent).
 */
export function Badge({ children, tone = 'neutral', dot = false, style }) {
  const tones = {
    neutral: { bg: 'var(--c-surface)',       fg: 'var(--c-text-soft)', dot: 'var(--c-text-muted)' },
    accent:  { bg: 'var(--c-accent-soft)',   fg: 'var(--c-accent)',    dot: 'var(--c-accent)' },
    success: { bg: 'var(--c-success-soft)',  fg: 'var(--c-success)',   dot: 'var(--c-success)' },
    alert:   { bg: 'var(--c-alert-soft)',    fg: 'var(--c-alert)',     dot: 'var(--c-alert)' },
    warn:    { bg: 'var(--c-warn-soft)',     fg: 'var(--c-warn)',      dot: 'var(--c-warn)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 11px', borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 12, fontWeight: 600, lineHeight: 1,
      letterSpacing: '0.01em', whiteSpace: 'nowrap',
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot, flexShrink: 0 }}/>}
      {children}
    </span>
  );
}
