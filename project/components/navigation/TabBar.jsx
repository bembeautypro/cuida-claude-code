import React from 'react';

// Inline nav icons so the TabBar is self-contained (24×24, 1.6 stroke).
const Ico = ({ d, size = 22, stroke = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const NAV = {
  home:  <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/>,
  meds:  <g><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M9.5 8.5l5 8.5" transform="rotate(-30 12 12)"/></g>,
  stock: <g><path d="M3 8l9-4 9 4-9 4-9-4z"/><path d="M3 8v8l9 4 9-4V8"/><path d="M12 12v8"/></g>,
  emerg: <path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"/>,
  fam:   <g><circle cx="9" cy="9" r="3.5"/><circle cx="17" cy="10" r="2.5"/><path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5"/><path d="M15 19c.4-2 2-3.5 4-3.5s3 .8 3 2"/></g>,
};

/**
 * Fixed bottom tab bar for the main app shell. Frosted translucent background,
 * 5 tabs (Início · Remédios · Estoque · SOS · Família). Positioned absolute to
 * the phone frame; the active tab is tinted with the accent color.
 */
export function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home',  label: 'Início' },
    { id: 'meds',  label: 'Remédios' },
    { id: 'stock', label: 'Estoque' },
    { id: 'emerg', label: 'SOS' },
    { id: 'fam',   label: 'Família' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      padding: '8px 14px 28px',
      background: 'rgba(255,250,242,0.85)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      borderTop: '1px solid var(--c-line)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange && onChange(t.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'transparent', border: 'none', padding: '6px 4px',
            color: isActive ? 'var(--c-accent)' : 'var(--c-text-muted)',
            cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.01em',
            minWidth: 52,
          }}>
            <Ico d={NAV[t.id]} stroke={isActive ? 2 : 1.6}/>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
