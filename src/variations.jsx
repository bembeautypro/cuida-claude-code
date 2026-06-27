// Cuida — Home & Emergency layout variations
import React from 'react';
import { CUIDA_DATA as D2 } from './data.jsx';
import { Screen, SoftCard, Avatar, IconButton, Dot } from './ui.jsx';
import { ProfilePicker, FakeQR } from './screens.jsx';
import {
  BrandMark,
  IconBell, IconAlert, IconCalendar, IconPill, IconShield,
  IconShare, IconLink, IconPhone,
} from './icons.jsx';

// ════════════════════════════════════════════════════════════
// HOME — V2: TIMELINE (curva do dia)
// ════════════════════════════════════════════════════════════
function HomeTimelineScreen({ go }) {
  const p = D2.PROFILES[0]; // Maria
  const meds = D2.MEDS_MARIA;
  return (
    <Screen>
      <div style={{ padding: '4px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="cu-eyebrow" style={{ marginBottom: 4 }}>Quinta · 14 Mai</div>
          <div className="cu-h2">Boa tarde, Carla.</div>
        </div>
        <IconButton variant="soft"><IconBell size={20}/></IconButton>
      </div>

      <ProfilePicker profiles={D2.PROFILES} activeId={'maria'} onChange={() => {}}/>

      {/* Timeline card */}
      <div style={{ padding: '4px 20px 0' }}>
        <SoftCard background="var(--c-surface)" padding={0} radius={24}
          style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: '18px 20px 6px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-soft)' }}>Maria · hoje</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>2 de 4 doses confirmadas</div>
            <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2 }}>Próxima às 13:00 · em 26 min</div>
          </div>

          <svg width="100%" height="160" viewBox="0 0 320 160" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M 0 120 C 80 30, 240 30, 320 120" stroke="var(--c-accent)" strokeWidth="2.5" fill="none" strokeDasharray="2 6" strokeLinecap="round"/>
            <line x1="0" y1="120" x2="320" y2="120" stroke="var(--c-line-strong)" strokeWidth="1"/>
            <circle cx="40" cy="92" r="14" fill="var(--c-warn-soft)" stroke="var(--c-warn)" strokeWidth="1.5"/>
            <text x="40" y="96" textAnchor="middle" fontSize="14">☀️</text>
            <circle cx="160" cy="48" r="16" fill="var(--c-accent-soft)" stroke="var(--c-accent)" strokeWidth="2"/>
            <text x="160" y="53" textAnchor="middle" fontSize="14">🌤</text>
            <circle cx="280" cy="92" r="14" fill="var(--c-surface)" stroke="var(--c-text-muted)" strokeWidth="1.5" strokeDasharray="2 2"/>
            <text x="280" y="96" textAnchor="middle" fontSize="14">🌙</text>
          </svg>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            padding: '0 18px 18px', gap: 8,
          }}>
            <TimelineDose label="07:00" name="Losartana + AAS" done/>
            <TimelineDose label="13:00" name="Atenolol" next/>
            <TimelineDose label="22:00" name="Sinvastatina"/>
          </div>
        </SoftCard>
      </div>

      {/* Alerts row */}
      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MiniAlertCard
          color="var(--c-alert-soft)"
          fg="var(--c-alert)"
          icon={<IconAlert size={18}/>}
          label="Estoque baixo"
          value="AAS · 4 dias"
        />
        <MiniAlertCard
          color="var(--c-accent-soft)"
          fg="var(--c-accent)"
          icon={<IconCalendar size={18}/>}
          label="Consulta"
          value="Dr. Mendes · Seg"
        />
      </div>

      {/* Other profiles peek */}
      <div style={{ padding: '20px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 8px' }}>Outros perfis</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {D2.PROFILES.slice(1).map(p2 => (
            <div key={p2.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 12,
              borderRadius: 14, background: 'var(--c-card)', border: '1px solid var(--c-line)',
            }}>
              <Avatar name={p2.name} color={p2.color} fg={p2.fg} size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p2.name}</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>{p2.medsTaken === p2.medsToday ? 'Tudo em dia ✓' : `${p2.medsTaken}/${p2.medsToday} doses`}</div>
              </div>
              <Dot color={p2.medsAlert > 0 ? 'var(--c-alert)' : 'var(--c-success)'} size={8}/>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function TimelineDose({ label, name, done, next }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '8px 6px',
      borderRadius: 12,
      background: done ? 'var(--c-success-soft)' : next ? 'var(--c-accent)' : 'transparent',
      color: done ? 'var(--c-success)' : next ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
      border: next || done ? 'none' : '1px solid var(--c-line)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, opacity: .75 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{name}</div>
    </div>
  );
}

function MiniAlertCard({ color, fg, icon, label, value }) {
  return (
    <div style={{
      background: color, color: fg, padding: 14, borderRadius: 16,
      display: 'flex', flexDirection: 'column', gap: 6, minHeight: 80,
    }}>
      {icon}
      <div style={{ fontSize: 10, fontWeight: 600, opacity: .65, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 'auto' }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// HOME — V3: STACK DE CARDS (perfis empilhados)
// ════════════════════════════════════════════════════════════
function HomeStackScreen({ go }) {
  const [active, setActive] = React.useState(0);
  const profiles = D2.PROFILES;
  return (
    <Screen background="var(--c-bg)">
      <div style={{ padding: '4px 20px 6px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 4 }}>Você está cuidando de</div>
        <div className="cu-h2">3 pessoas hoje.</div>
      </div>

      {/* Stack of cards */}
      <div style={{ padding: '12px 20px 0', position: 'relative', height: 360 }}>
        {profiles.map((p, i) => {
          const offset = (i - active);
          const z = profiles.length - Math.abs(offset);
          const isActive = i === active;
          const scale = isActive ? 1 : .92 - Math.abs(offset) * .03;
          const ty = offset === 0 ? 0 : offset > 0 ? offset * 16 + 40 : offset * 8;
          const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * .15;
          return (
            <div key={p.id} onClick={() => setActive(i)} style={{
              position: 'absolute', inset: 0, padding: '0 6px',
              transform: `translateY(${ty}px) scale(${scale})`,
              transformOrigin: 'top center',
              zIndex: z, opacity,
              transition: 'all .35s cubic-bezier(.2,.7,.3,1)',
              cursor: 'pointer',
            }}>
              <ProfileBigCard profile={p} active={isActive}/>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '2px 20px 14px' }}>
        {profiles.map((p, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: i === active ? 22 : 6, height: 6, borderRadius: 999,
            background: i === active ? 'var(--c-accent)' : 'var(--c-line-strong)',
            border: 'none', cursor: 'pointer', transition: 'all .2s ease',
          }}/>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ padding: '6px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <QuickAction icon={<IconPill size={20}/>} label="Remédios"/>
        <QuickAction icon={<IconShield size={20}/>} label="SOS"/>
        <QuickAction icon={<IconCalendar size={20}/>} label="Agenda"/>
      </div>
    </Screen>
  );
}

function ProfileBigCard({ profile: p, active }) {
  return (
    <div style={{
      background: p.color, borderRadius: 24, padding: 22,
      height: '100%',
      display: 'flex', flexDirection: 'column', gap: 16,
      color: p.fg,
      boxShadow: active ? '0 20px 50px rgba(38,37,37,.10)' : '0 4px 14px rgba(38,37,37,.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, opacity: .55, letterSpacing: '.06em', textTransform: 'uppercase' }}>{p.relation}</div>
          <div style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>{p.name}</div>
          <div style={{ fontSize: 12, opacity: .65, marginTop: 2 }}>{p.age} anos · Tipo {p.bloodType}</div>
        </div>
        <Avatar name={p.name} color="rgba(255,255,255,.45)" fg={p.fg} size={56}/>
      </div>

      <div style={{
        background: 'rgba(255,255,255,.55)', borderRadius: 16,
        padding: 16, marginTop: 'auto',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, opacity: .55, letterSpacing: '.06em', textTransform: 'uppercase' }}>Próximo</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{p.nextMed.name}</div>
        <div style={{ fontSize: 12, opacity: .7, marginTop: 2 }}>{p.nextMed.time} · {p.nextMed.in}</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Stat value={`${p.medsTaken}/${p.medsToday}`} label="hoje" fg={p.fg}/>
        <Stat value={p.medsAlert > 0 ? p.medsAlert : '✓'} label={p.medsAlert > 0 ? 'em alerta' : 'estoque'} fg={p.fg} alert={p.medsAlert > 0}/>
        <Stat value={p.allergies.length} label="alergias" fg={p.fg}/>
      </div>
    </div>
  );
}

function Stat({ value, label, fg, alert }) {
  return (
    <div style={{
      flex: 1, background: 'rgba(255,255,255,.35)', padding: '10px 12px', borderRadius: 12,
    }}>
      <div style={{ fontSize: 18, fontWeight: 600, color: alert ? 'var(--c-alert)' : fg, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, opacity: .65, marginTop: 3, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function QuickAction({ icon, label }) {
  return (
    <div style={{
      background: 'var(--c-card)', borderRadius: 16, padding: '14px 12px',
      border: '1px solid var(--c-line)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      color: 'var(--c-accent)', cursor: 'pointer',
    }}>
      {icon}
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text)' }}>{label}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// EMERGENCY — V2: LOCK SCREEN STYLE
// ════════════════════════════════════════════════════════════
function EmergencyLockscreenScreen() {
  const p = D2.PROFILES[0];
  return (
    <Screen hasTabBar={false} background="#0a0d0e"
      style={{ paddingTop: 56, paddingBottom: 34 }}>
      {/* time/date */}
      <div style={{ padding: '20px 24px 0', color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 500, opacity: .55, letterSpacing: '.04em' }}>quinta-feira, 14 de maio</div>
        <div style={{ fontSize: 76, fontWeight: 300, marginTop: 2, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>14:32</div>
      </div>

      {/* SOS banner */}
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{
          background: 'rgba(170,60,38,.18)', border: '1px solid rgba(170,60,38,.4)',
          borderRadius: 16, padding: '12px 16px',
          color: '#ffcfbe', fontSize: 13, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <IconAlert size={18}/> SOS · MEDICAL INFO
        </div>
      </div>

      <div style={{ padding: '14px 24px 0' }}>
        <div style={{
          background: 'rgba(255,255,255,.06)',
          borderRadius: 22,
          padding: 22,
          color: '#fff',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,.08)',
        }}>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.name}</div>
          <div style={{ fontSize: 13, opacity: .55, marginTop: 4 }}>{p.relation} · {p.age} anos</div>

          <div style={{
            margin: '16px 0',
            padding: '12px 14px',
            background: 'rgba(255,80,60,.18)',
            borderRadius: 12,
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#ff8c75', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{p.bloodType}</div>
            <div>
              <div style={{ fontSize: 11, opacity: .6, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Tipo sanguíneo</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Sangue A+ universal · Rh+</div>
            </div>
          </div>

          <BigInfo label="Alergias" value={p.allergies.join(' · ')} highlight/>
          <BigInfo label="Em uso" value="Losartana · AAS · Atenolol · Sinvastatina"/>
          <BigInfo label="Plano" value={p.plano}/>
        </div>
      </div>

      {/* Emergency button big */}
      <div style={{ padding: '18px 24px 0' }}>
        <button style={{
          width: '100%', padding: '18px 24px', borderRadius: 18,
          background: '#d83a26', color: '#fff', border: 'none',
          fontSize: 16, fontWeight: 700, letterSpacing: '.02em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <IconPhone size={20}/> Ligar para 192 · SAMU
        </button>
        <button style={{
          width: '100%', marginTop: 10, padding: '14px 24px', borderRadius: 18,
          background: 'rgba(255,255,255,.08)', color: '#fff',
          border: '1px solid rgba(255,255,255,.12)',
          fontSize: 14, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <IconPhone size={16}/> Carla (filha) · +55 11 98123-4567
        </button>
      </div>
    </Screen>
  );
}

function BigInfo({ label, value, highlight }) {
  return (
    <div style={{ padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ fontSize: 10, fontWeight: 600, opacity: .55, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: highlight ? 600 : 500, color: highlight ? '#ffc4b3' : '#fff', marginTop: 4, lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// EMERGENCY — V3: QR MAXIMALISTA
// ════════════════════════════════════════════════════════════
function EmergencyQRScreen() {
  const p = D2.PROFILES[0];
  return (
    <Screen background="var(--c-accent)" style={{ color: 'var(--c-accent-fg)' }}>
      <div style={{ padding: '20px 24px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', opacity: .55 }}>Aponte a câmera</div>
        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>Saúde de {p.name}</div>
      </div>

      <div style={{ padding: '14px 24px 0', display: 'grid', placeItems: 'center' }}>
        <FakeQR size={220} bg="var(--c-accent-fg)" fg="var(--c-accent)" radius={20}/>
        <div style={{
          marginTop: -34, marginBottom: 0, position: 'relative', zIndex: 2,
          width: 60, height: 60, borderRadius: 18,
          background: 'var(--c-accent)', display: 'grid', placeItems: 'center',
          boxShadow: '0 0 0 6px var(--c-accent-fg)',
        }}>
          <BrandMark size={28} style={{ color: 'var(--c-accent-fg)' }}/>
        </div>
      </div>

      {/* Essentials */}
      <div style={{ padding: '20px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <EssentialCard label="Tipo" value={p.bloodType} big/>
        <EssentialCard label="Idade" value={`${p.age}`}/>
        <EssentialCard label="Alergias" value={`${p.allergies.length}`}/>
      </div>

      <div style={{ padding: '14px 24px 0' }}>
        <div style={{
          background: 'rgba(254,243,225,.08)', borderRadius: 16, padding: 16,
          color: 'var(--c-accent-fg)', border: '1px solid rgba(254,243,225,.12)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, opacity: .55, letterSpacing: '.08em', textTransform: 'uppercase' }}>Alergias graves</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>{p.allergies.join(' · ')}</div>
        </div>
      </div>

      <div style={{ padding: '12px 24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button style={{
          background: 'var(--c-accent-fg)', color: 'var(--c-accent)',
          padding: '14px', borderRadius: 14, border: 'none',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}><IconShare size={16}/> Compartilhar</button>
        <button style={{
          background: 'rgba(254,243,225,.12)', color: 'var(--c-accent-fg)',
          padding: '14px', borderRadius: 14, border: '1px solid rgba(254,243,225,.15)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}><IconLink size={16}/> Copiar link</button>
      </div>

      <div style={{ padding: '18px 24px 0', textAlign: 'center', fontSize: 11, opacity: .55 }}>
        cuida.app/c/maria-7a92
      </div>
    </Screen>
  );
}

function EssentialCard({ label, value, big }) {
  return (
    <div style={{
      background: 'rgba(254,243,225,.08)', borderRadius: 14, padding: 12,
      textAlign: 'center', border: '1px solid rgba(254,243,225,.10)',
    }}>
      <div style={{ fontSize: big ? 28 : 22, fontWeight: 600, color: 'var(--c-accent-fg)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, opacity: .55, marginTop: 4, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

export {
  HomeTimelineScreen, HomeStackScreen,
  EmergencyLockscreenScreen, EmergencyQRScreen,
};
