// cuida/micro.jsx — Enhanced animated versions of TabBar, MedRow, ViewToggle, etc.
import React, { useState as useMicro, useEffect as useEffectMicro, useRef as useRefMicro, useCallback as useCB } from 'react';
import { IconHome, IconPill, IconBox, IconShield, IconUsers, IconCheck } from './icons.jsx';

// ════════════════════════════════════════════════════════════
// ANIMATED TAB BAR
// ════════════════════════════════════════════════════════════
function AnimatedTabBar({ active, onChange }) {
  const tabs = [
    { id: 'home',  label: 'Início',    Icon: IconHome },
    { id: 'meds',  label: 'Remédios',  Icon: IconPill },
    { id: 'stock', label: 'Estoque',   Icon: IconBox },
    { id: 'emerg', label: 'SOS',       Icon: IconShield },
    { id: 'fam',   label: 'Família',   Icon: IconUsers },
  ];

  const prevActive = useRefMicro(active);
  const [indicatorStyle, setIndicatorStyle] = useMicro({ left: 0, width: 0 });
  const containerRef = useRefMicro(null);
  const buttonRefs = useRefMicro({});

  useEffectMicro(() => {
    const btnEl = buttonRefs.current[active];
    if (!btnEl || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = btnEl.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - containerRect.left + btnRect.width / 2 - 18,
      width: 36,
    });
    prevActive.current = active;
  }, [active]);

  return (
    <div ref={containerRef} style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      padding: '8px 14px 28px',
      background: 'rgba(255,250,242,0.88)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      borderTop: '1px solid var(--c-line)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
    }}>
      <div style={{
        position: 'absolute',
        top: 8,
        left: indicatorStyle.left,
        width: indicatorStyle.width,
        height: 3,
        borderRadius: 999,
        background: 'var(--c-accent)',
        transition: 'left .25s cubic-bezier(.2,.7,.3,1), width .25s cubic-bezier(.2,.7,.3,1)',
        pointerEvents: 'none',
      }}/>

      {tabs.map(t => {
        const isActive = active === t.id;
        const I = t.Icon;
        return (
          <button
            key={t.id}
            ref={el => buttonRefs.current[t.id] = el}
            onClick={() => onChange && onChange(t.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'transparent', border: 'none', padding: '6px 4px',
              color: isActive ? 'var(--c-accent)' : 'var(--c-text-muted)',
              cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.01em',
              minWidth: 52,
              transition: 'color .2s ease',
            }}
          >
            <div style={{
              transform: isActive ? 'scale(1.12)' : 'scale(1)',
              transition: 'transform .22s cubic-bezier(.34,1.56,.64,1)',
            }}>
              <I size={22} stroke={isActive ? 2 : 1.6}/>
            </div>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ANIMATED MED ROW
// ════════════════════════════════════════════════════════════
function AnimatedMedRow({ med, taken, onToggle, onAllDone }) {
  const [justChecked, setJustChecked] = useMicro(false);
  const [bounceKey, setBounceKey] = useMicro(0);

  function handleTap() {
    if (!taken) {
      setJustChecked(true);
      setBounceKey(k => k + 1);
      setTimeout(() => setJustChecked(false), 700);
    }
    onToggle();
  }

  return (
    <div
      onClick={handleTap}
      className={justChecked ? 'cu-row-confirmed' : ''}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: 14, borderRadius: 16,
        background: 'var(--c-card)', border: '1px solid var(--c-line)',
        cursor: 'pointer',
        opacity: taken ? .55 : 1,
        transition: 'opacity .2s ease',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: med.color, display: 'grid', placeItems: 'center', fontSize: 22,
        flexShrink: 0,
      }}>{med.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 600,
          textDecoration: taken ? 'line-through' : 'none',
          color: 'var(--c-text)',
        }}>
          {med.name} <span style={{ fontWeight: 400, color: 'var(--c-text-soft)' }}>· {med.dose}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2 }}>
          {med.schedule}
          {med.alert && <span style={{ color: 'var(--c-alert)', marginLeft: 6 }}>· estoque baixo</span>}
        </div>
      </div>
      <div
        key={bounceKey}
        className={justChecked ? 'cu-check-bounce' : ''}
        style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          border: '2px solid ' + (taken ? 'var(--c-success)' : 'var(--c-line-strong)'),
          background: taken ? 'var(--c-success)' : 'transparent',
          display: 'grid', placeItems: 'center', color: '#fff',
          transition: 'background .2s ease, border-color .2s ease',
        }}
      >
        {taken && (
          <div className="cu-check-enter">
            <IconCheck size={16} stroke={2.5}/>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ALL-DONE CELEBRATION
// ════════════════════════════════════════════════════════════
function AllDoneCelebration({ show, name }) {
  const [visible, setVisible] = useMicro(false);
  const colors = ['#01373D','rgb(254,220,195)','rgb(212,232,230)','rgb(218,235,222)','rgb(232,220,240)'];

  useEffectMicro(() => {
    if (show) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2600);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(255,250,242,.92)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      pointerEvents: 'none',
    }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="cu-confetti" style={{
          width: 8 + (i % 3) * 4,
          height: 8 + (i % 2) * 3,
          background: colors[i % colors.length],
          top: `${10 + (i % 5) * 8}%`,
          left: `${5 + i * 5.2}%`,
          animation: `cu-confetti-fall ${.6 + (i % 4) * .25}s ${(i % 6) * .1}s ease-out both`,
          borderRadius: i % 2 === 0 ? '50%' : '3px',
          opacity: .85,
        }}/>
      ))}

      <div className="cu-burst" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        background: 'var(--c-success)', borderRadius: 28,
        padding: '28px 36px',
        boxShadow: '0 20px 60px rgba(35,100,68,.25)',
        position: 'relative',
      }}>
        <div className="cu-pulse-ring" style={{
          position: 'absolute', inset: -12, borderRadius: 38,
          border: '3px solid rgba(35,100,68,.35)',
        }}/>
        <div style={{ fontSize: 48 }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', textAlign: 'center' }}>
          Todas as doses!
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', textAlign: 'center' }}>
          {name} não perdeu nenhuma hoje.
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ANIMATED SCREEN ROUTER
// ════════════════════════════════════════════════════════════
const SCREEN_HISTORY = ['home'];

function AnimatedScreenRouter({ screen, children }) {
  const [current, setCurrent] = useMicro(screen);
  const [animClass, setAnimClass] = useMicro('');
  const prevScreenRef = useRefMicro(screen);

  useEffectMicro(() => {
    if (screen === prevScreenRef.current) return;

    const prev = prevScreenRef.current;
    const next = screen;

    const histIdx = SCREEN_HISTORY.indexOf(next);
    const prevIdx = SCREEN_HISTORY.indexOf(prev);
    const goingBack = histIdx !== -1 && histIdx < prevIdx;

    if (!SCREEN_HISTORY.includes(next)) SCREEN_HISTORY.push(next);

    setAnimClass(goingBack ? 'cu-screen-back' : 'cu-screen-enter');
    setCurrent(next);
    prevScreenRef.current = next;

    const t = setTimeout(() => setAnimClass(''), 280);
    return () => clearTimeout(t);
  }, [screen]);

  return (
    <div key={current} className={animClass} style={{ position: 'absolute', inset: 0 }}>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ANIMATED VIEW TOGGLE
// ════════════════════════════════════════════════════════════
function AnimatedViewToggle({ value, onChange, options, style }) {
  const [animValue, setAnimValue] = useMicro(value);
  const refs = useRefMicro({});
  const trackRef = useRefMicro(null);
  const [pillStyle, setPillStyle] = useMicro({ left: 2, width: 80 });

  useEffectMicro(() => {
    const el = refs.current[value];
    const track = trackRef.current;
    if (!el || !track) return;
    const trackRect = track.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - trackRect.left,
      width: elRect.width,
    });
    setAnimValue(value);
  }, [value]);

  return (
    <div ref={trackRef} style={{
      display: 'inline-flex', padding: 3,
      background: 'var(--c-surface)', borderRadius: 999,
      position: 'relative', ...style,
    }}>
      <div style={{
        position: 'absolute',
        top: 3, height: 'calc(100% - 6px)',
        left: pillStyle.left,
        width: pillStyle.width,
        background: 'var(--c-accent)',
        borderRadius: 999,
        transition: 'left .22s cubic-bezier(.2,.7,.3,1), width .22s cubic-bezier(.2,.7,.3,1)',
        zIndex: 0,
      }}/>
      {options.map(o => {
        const active = o.value === value;
        return (
          <button key={o.value}
            ref={el => refs.current[o.value] = el}
            onClick={() => onChange(o.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 999,
              fontSize: 12, fontWeight: 600, lineHeight: 1,
              background: 'transparent',
              color: active ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              position: 'relative', zIndex: 1,
              transition: 'color .2s ease',
            }}
          >
            {o.icon}{o.label}
          </button>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SKELETON
// ════════════════════════════════════════════════════════════
function Skeleton({ width = '100%', height = 18, radius = 8, style }) {
  return <div className="cu-skeleton" style={{ width, height, borderRadius: radius, ...style }}/>;
}

function SkeletonCard({ lines = 3 }) {
  return (
    <div style={{ background: 'var(--c-card)', borderRadius: 18, padding: 16, border: '1px solid var(--c-line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton width={44} height={44} radius={12}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton width="65%" height={14}/>
          <Skeleton width="40%" height={11}/>
        </div>
      </div>
      {lines > 2 && <Skeleton width="100%" height={6} radius={999}/>}
    </div>
  );
}

// TabBar and ViewToggle export as animated versions (override base ui.jsx versions)
export {
  AnimatedTabBar as TabBar,
  AnimatedMedRow,
  AllDoneCelebration,
  AnimatedScreenRouter,
  AnimatedViewToggle as ViewToggle,
  Skeleton,
  SkeletonCard,
};
