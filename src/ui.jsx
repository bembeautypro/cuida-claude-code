// Cuida — UI primitives + Logo
// Reusable components used across screens
import React, { useState } from 'react';
import {
  IconHome, IconPill, IconBox, IconShield, IconUsers,
} from './icons.jsx';

// ─────────────────────────────────────────────────────────────
// Logo / Wordmark
// ─────────────────────────────────────────────────────────────
function CuidaWordmark({ size = 22, color = 'currentColor', variant = 'heart' }) {
  const sym = {
    abraco: (
      <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="16" r="9" fill={color} opacity="0.85"/>
        <circle cx="21" cy="16" r="9" fill={color} opacity="0.55"/>
      </svg>
    ),
    heart: (
      <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        <path d="M16 27S5 20.5 5 12.5C5 8.4 8.4 5 12.5 5c1.6 0 3 .6 3.5 1.5C16.5 5.6 17.9 5 19.5 5 23.6 5 27 8.4 27 12.5 27 20.5 16 27 16 27z" fill={color}/>
        <path d="M11 14h3l1.5-2.5 2 5L19 14h2" stroke="var(--c-bg)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    hand: (
      <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        <circle cx="16" cy="16" r="13" fill={color} opacity=".18"/>
        <path d="M11 17v-5a1.5 1.5 0 1 1 3 0v3M14 13v-3a1.5 1.5 0 1 1 3 0v3M17 12v-1.5a1.5 1.5 0 1 1 3 0V14M11 14c-1.6.4-2 1.6-2 3l1 5c.5 2 2 3.5 4 3.5h2.5c2.5 0 4.5-2 4.5-4.5V14a1.5 1.5 0 1 0-3 0"
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }[variant];

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {sym}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size,
        letterSpacing: '-0.02em',
        color,
        lineHeight: 1,
      }}>cuida</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Button
// ─────────────────────────────────────────────────────────────
function Button({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, style, full, ...rest }) {
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

// Icon-only round button
function IconButton({ children, onClick, size = 36, variant = 'soft', style, ...rest }) {
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

// ─────────────────────────────────────────────────────────────
// Avatar
// ─────────────────────────────────────────────────────────────
function Avatar({ name = '', color = 'var(--c-surface)', size = 44, fg = 'var(--c-text)', emoji, style }) {
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

// ─────────────────────────────────────────────────────────────
// Card / surfaces
// ─────────────────────────────────────────────────────────────
function Card({ children, padding = 18, radius = 22, background = 'var(--c-card)', shadow = true, style, onClick }) {
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

// Soft tinted card (no shadow, no border)
function SoftCard({ children, padding = 18, radius = 22, background = 'var(--c-surface)', style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background, borderRadius: radius, padding,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// Pill / chip
function Pill({ children, active, onClick, color, fg, style }) {
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

// ─────────────────────────────────────────────────────────────
// Progress bar (used for medication stock)
// ─────────────────────────────────────────────────────────────
function Bar({ value = 0, max = 100, color = 'var(--c-accent)', height = 6, bg = 'var(--c-line)' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ height, background: bg, borderRadius: 999, overflow: 'hidden', width: '100%' }}>
      <div style={{ height: '100%', width: pct + '%', background: color, borderRadius: 999, transition: 'width .3s ease' }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Status dot
// ─────────────────────────────────────────────────────────────
function Dot({ color = 'var(--c-success)', size = 8 }) {
  return <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: color, flexShrink: 0,
  }}/>;
}

// ─────────────────────────────────────────────────────────────
// View Toggle — segmented control
// ─────────────────────────────────────────────────────────────
function ViewToggle({ value, onChange, options, style }) {
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

// ─────────────────────────────────────────────────────────────
// Bottom Tab Bar (used in main app screens)
// ─────────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home',  label: 'Início',   Icon: IconHome },
    { id: 'meds',  label: 'Remédios', Icon: IconPill },
    { id: 'stock', label: 'Estoque',  Icon: IconBox },
    { id: 'emerg', label: 'SOS',      Icon: IconShield },
    { id: 'fam',   label: 'Família',  Icon: IconUsers },
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
        const I = t.Icon;
        return (
          <button key={t.id} onClick={() => onChange && onChange(t.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'transparent', border: 'none', padding: '6px 4px',
            color: isActive ? 'var(--c-accent)' : 'var(--c-text-muted)',
            cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.01em',
            minWidth: 52,
          }}>
            <I size={22} stroke={isActive ? 2 : 1.6}/>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile screen scroll wrapper — leaves room for status bar + tab bar
// ─────────────────────────────────────────────────────────────
function Screen({ children, hasTabBar = true, background = 'var(--c-bg)', style }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background, overflow: 'auto',
      paddingTop: 56,
      paddingBottom: hasTabBar ? 90 : 34,
      fontFamily: 'var(--font-body)',
      color: 'var(--c-text)',
      ...style,
    }}>{children}</div>
  );
}

// In-screen header (large title style)
function ScreenHeader({ title, eyebrow, action, padding = '16px 20px 12px', style }) {
  return (
    <div style={{ padding, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, ...style }}>
      <div>
        {eyebrow && <div className="cu-eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <div className="cu-h1">{title}</div>
      </div>
      {action}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Striped placeholder
// ─────────────────────────────────────────────────────────────
function Stripes({ label, ratio = '1 / 1', dark, style }) {
  return (
    <div style={{
      width: '100%', aspectRatio: ratio,
      backgroundImage: dark
        ? 'repeating-linear-gradient(135deg, rgba(254,243,225,.10) 0 1px, transparent 1px 10px)'
        : 'repeating-linear-gradient(135deg, rgba(38,37,37,.06) 0 1px, transparent 1px 10px)',
      background: dark ? 'rgba(254,243,225,.04)' : 'rgba(38,37,37,.03)',
      display: 'grid', placeItems: 'center',
      color: dark ? 'rgba(254,243,225,.55)' : 'rgba(38,37,37,.45)',
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 10, letterSpacing: '.04em',
      borderRadius: 12,
      ...style,
    }}>{label}</div>
  );
}

export {
  CuidaWordmark, Button, IconButton, Avatar, Card, SoftCard, Pill, Bar, Dot, ViewToggle,
  TabBar, Screen, ScreenHeader, Stripes,
};
