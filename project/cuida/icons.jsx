// Cuida — Lucide-style line icons
// All 24x24 viewBox, 1.6 stroke, currentColor

const Icon = ({ children, size = 22, stroke = 1.6, style }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'inline-block', flexShrink: 0, ...style }}
  >
    {children}
  </svg>
);

// Brand mark — coração com vida dentro (heart)
const BrandMark = ({ size = 28, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'inline-block', flexShrink: 0, ...style }}>
    <path d="M16 27S5 20.5 5 12.5C5 8.4 8.4 5 12.5 5c1.6 0 3 .6 3.5 1.5C16.5 5.6 17.9 5 19.5 5 23.6 5 27 8.4 27 12.5 27 20.5 16 27 16 27z" fill="currentColor"/>
    <path d="M11 14h3l1.5-2.5 2 5L19 14h2" stroke="var(--c-bg)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Brand mark — abraço (two embracing circles)
const MarkAbraco = ({ size = 28, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'inline-block', ...style }}>
    <circle cx="11" cy="16" r="9" fill="currentColor" opacity="0.85"/>
    <circle cx="21" cy="16" r="9" fill="currentColor" opacity="0.55"/>
  </svg>
);

const IconHome     = (p) => <Icon {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></Icon>;
const IconPill     = (p) => <Icon {...p}><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M9.5 8.5l5 8.5" transform="rotate(-30 12 12)"/></Icon>;
const IconBox      = (p) => <Icon {...p}><path d="M3 8l9-4 9 4-9 4-9-4z"/><path d="M3 8v8l9 4 9-4V8"/><path d="M12 12v8"/></Icon>;
const IconShield   = (p) => <Icon {...p}><path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"/></Icon>;
const IconUsers    = (p) => <Icon {...p}><circle cx="9" cy="9" r="3.5"/><circle cx="17" cy="10" r="2.5"/><path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5"/><path d="M15 19c.4-2 2-3.5 4-3.5s3 .8 3 2"/></Icon>;
const IconChat     = (p) => <Icon {...p}><path d="M21 11.5a8.5 8.5 0 1 1-3.6-6.9"/><path d="M21 5v4h-4"/><path d="M3 21l3.2-3.2"/></Icon>;
const IconGear     = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></Icon>;
const IconBell     = (p) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></Icon>;
const IconPlus     = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconCheck    = (p) => <Icon {...p}><path d="M5 12l5 5L20 7"/></Icon>;
const IconClose    = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>;
const IconChevR    = (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>;
const IconChevL    = (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>;
const IconChevD    = (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>;
const IconClock    = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconCamera   = (p) => <Icon {...p}><path d="M3 9a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/></Icon>;
const IconQr       = (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 17v4M17 17h4M14 21h3"/></Icon>;
const IconShare    = (p) => <Icon {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.3 11l7.4-4M8.3 13l7.4 4"/></Icon>;
const IconWhatsApp = (p) => <Icon {...p}><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 9.5c.3 2 2.2 4 4.5 4.5 1 0 1.5-.5 2-1l-.5-1.5-2-.5c-.5.5-.5.5-1.5 0s-1.5-1.5-2-2.5L10 8z"/></Icon>;
const IconHeart    = (p) => <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></Icon>;
const IconCalendar = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Icon>;
const IconUser     = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></Icon>;
const IconArrowR   = (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>;
const IconArrowL   = (p) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></Icon>;
const IconSearch   = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></Icon>;
const IconMoreH    = (p) => <Icon {...p}><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></Icon>;
const IconMoreV    = (p) => <Icon {...p}><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></Icon>;
const IconLink     = (p) => <Icon {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></Icon>;
const IconPrint    = (p) => <Icon {...p}><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="9" rx="2"/><rect x="6" y="15" width="12" height="6"/></Icon>;
const IconAlert    = (p) => <Icon {...p}><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/></Icon>;
const IconInfo     = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></Icon>;
const IconMoon     = (p) => <Icon {...p}><path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/></Icon>;
const IconSun      = (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></Icon>;
const IconLeaf     = (p) => <Icon {...p}><path d="M5 19c2-9 8-14 16-14 0 8-5 14-14 14-1 0-2 0-2-1z"/><path d="M5 19l9-9"/></Icon>;
const IconLock     = (p) => <Icon {...p}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></Icon>;
const IconDroplet  = (p) => <Icon {...p}><path d="M12 3s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12z"/></Icon>;
const IconPhone    = (p) => <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></Icon>;

Object.assign(window, {
  Icon, MarkAbraco, BrandMark,
  IconHome, IconPill, IconBox, IconShield, IconUsers, IconChat, IconGear,
  IconBell, IconPlus, IconCheck, IconClose, IconChevR, IconChevL, IconChevD,
  IconClock, IconCamera, IconQr, IconShare, IconWhatsApp, IconHeart,
  IconCalendar, IconUser, IconArrowR, IconArrowL, IconSearch, IconMoreH, IconMoreV,
  IconLink, IconPrint, IconAlert, IconInfo, IconMoon, IconSun, IconLeaf, IconLock,
  IconDroplet, IconPhone,
});
