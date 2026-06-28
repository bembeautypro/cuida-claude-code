// Cuida — Main screens
import React, { useState as useStateScreens } from 'react';
import { usePatient } from './lib/PatientContext.jsx';
import { useFamily } from './lib/hooks/useFamily.js';
import { useMedications } from './lib/hooks/useMedications.js';
import { CUIDA_DATA as D } from './data.jsx';
import {
  Avatar, Button, IconButton, Card, SoftCard, Pill, Bar, Dot, Screen, ScreenHeader, ViewToggle,
} from './ui.jsx';
import { BrandMark } from './icons.jsx';
import {
  IconBell, IconShield, IconAlert, IconBox, IconWhatsApp, IconShare, IconInfo, IconPhone,
  IconPrint, IconLink, IconCheck, IconChevR, IconMoreV, IconChat, IconPlus,
  IconCalendar, IconLock, IconHeart, IconUsers,
} from './icons.jsx';

// ════════════════════════════════════════════════════════════
// PROFILE PICKER
// ════════════════════════════════════════════════════════════
function ProfilePicker({ profiles, activeId, onChange, dense, onAdd }) {
  return (
    <div style={{
      display: 'flex', gap: 12, padding: dense ? '4px 20px' : '8px 20px 14px',
      overflowX: 'auto',
    }}>
      {profiles.map(p => {
        const active = p.id === activeId;
        return (
          <button key={p.id} onClick={() => onChange(p.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: 0, flexShrink: 0,
          }}>
            <div style={{
              position: 'relative', borderRadius: '50%',
              padding: 2,
              background: active ? 'var(--c-accent)' : 'transparent',
            }}>
              <Avatar name={p.name} color={p.color} fg={p.fg} size={54}/>
              {p.medsAlert > 0 && (
                <span style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--c-alert)', border: '2px solid var(--c-bg)',
                }}/>
              )}
            </div>
            <span style={{
              fontSize: 12, fontWeight: active ? 600 : 500,
              color: active ? 'var(--c-text)' : 'var(--c-text-soft)',
            }}>{p.name}</span>
          </button>
        );
      })}
      {onAdd && (
        <button onClick={onAdd} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
        }}>
          <div style={{
            width: 54, height: 54, borderRadius: '50%',
            border: '1.5px dashed var(--c-line-strong)',
            display: 'grid', placeItems: 'center',
            color: 'var(--c-text-muted)',
          }}>
            <IconPlus size={22}/>
          </div>
          <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>Novo</span>
        </button>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 1. HOME
// ════════════════════════════════════════════════════════════
function HomeScreen({ go, initialView = 'timeline' }) {
  const [activeId, setActiveId] = useStateScreens('maria');
  const [view, setView] = useStateScreens(initialView);
  const profile = D.PROFILES.find(p => p.id === activeId);
  const meds = activeId === 'joao' ? D.MEDS_JOAO : D.MEDS_MARIA;
  const [taken, setTaken] = useStateScreens({});
  const isTaken = (m) => (taken[m.id] !== undefined ? taken[m.id] : m.taken);
  const toggle = (m) => setTaken(prev => ({ ...prev, [m.id]: !isTaken(m) }));

  const totalTaken = meds.filter(isTaken).length;
  const morning = meds.filter(m => m.time.startsWith('Manhã'));
  const afternoon = meds.filter(m => m.time.startsWith('Tarde'));
  const night = meds.filter(m => m.time.startsWith('Noite'));

  const nextDose = meds.find(m => !isTaken(m));

  return (
    <Screen>
      <div style={{ padding: '4px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="cu-eyebrow" style={{ marginBottom: 4 }}>Boa tarde, Carla</div>
          <div className="cu-h2">Cuidando bem hoje.</div>
        </div>
        <IconButton variant="soft" onClick={() => go && go('settings')}>
          <IconBell size={20}/>
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, borderRadius: '50%', background: 'var(--c-alert)',
          }}/>
        </IconButton>
      </div>

      <ProfilePicker
        profiles={D.PROFILES}
        activeId={activeId}
        onChange={setActiveId}
        onAdd={() => go && go('fam')}
      />

      <div style={{ padding: '6px 20px 0' }}>
        <SoftCard background={profile.color} padding={18} radius={22}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: profile.fg, opacity: .65, letterSpacing: '.04em', textTransform: 'uppercase' }}>{profile.relation} · {profile.age} anos</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: profile.fg, marginTop: 2 }}>{profile.name}</div>
            </div>
            <button onClick={() => go && go('emerg')} style={{
              background: 'rgba(255,255,255,0.55)', border: 'none',
              padding: '8px 12px', borderRadius: 999,
              fontSize: 12, fontWeight: 600, color: profile.fg,
              display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
            }}>
              <IconShield size={14}/> SOS
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <SummaryStat label="Hoje" value={`${totalTaken}/${meds.length}`} fg={profile.fg}/>
            <SummaryStat label="Próximo" value={nextDose ? nextDose.time.split('· ')[1] : '—'} fg={profile.fg}/>
            <SummaryStat label="Estoque" value={profile.medsAlert > 0 ? `${profile.medsAlert} alerta` : 'Em dia'} fg={profile.fg} alert={profile.medsAlert > 0}/>
          </div>
        </SoftCard>
      </div>

      {profile.medsAlert > 0 && (
        <button onClick={() => go && go('stock')} style={{
          margin: '12px 20px 0', padding: '12px 14px',
          background: 'var(--c-alert-soft)', borderRadius: 14, border: 'none',
          display: 'flex', alignItems: 'center', gap: 10, width: 'calc(100% - 40px)',
          textAlign: 'left', cursor: 'pointer', color: 'var(--c-alert)',
        }}>
          <IconAlert size={18}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>AAS acaba em 4 dias</div>
            <div style={{ fontSize: 11, opacity: .8, marginTop: 1 }}>Ver lista de compras →</div>
          </div>
        </button>
      )}

      <div style={{ padding: '18px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="cu-h3">Remédios de hoje</div>
        <ViewToggle
          value={view}
          onChange={setView}
          options={[
            { value: 'timeline', label: 'Timeline' },
            { value: 'list',     label: 'Lista' },
          ]}
        />
      </div>

      {view === 'timeline' ? (
        <HomeTimelineBody meds={meds} morning={morning} afternoon={afternoon} night={night} isTaken={isTaken} totalTaken={totalTaken} nextDose={nextDose}/>
      ) : (
        <HomeListBody morning={morning} afternoon={afternoon} night={night} isTaken={isTaken} toggle={toggle}/>
      )}
    </Screen>
  );
}

function HomeTimelineBody({ meds, morning, afternoon, night, isTaken, totalTaken, nextDose }) {
  return (
    <div style={{ padding: '10px 20px 0' }}>
      <div style={{
        background: 'var(--c-card)', borderRadius: 22, overflow: 'hidden',
        border: '1px solid var(--c-line)',
      }}>
        <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-soft)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Hoje · 14h32</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>{totalTaken} de {meds.length} doses confirmadas</div>
            {nextDose && (
              <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2 }}>
                Próxima · {nextDose.name} às {nextDose.time.split('· ')[1]}
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'relative', height: 130, padding: '14px 0 0' }}>
          <svg width="100%" height="100%" viewBox="0 0 320 120" preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
            <path d="M 30 95 C 100 25, 220 25, 290 95" stroke="var(--c-line-strong)" strokeWidth="1.5" fill="none" strokeDasharray="3 6" strokeLinecap="round"/>
            <line x1="0" y1="95" x2="320" y2="95" stroke="var(--c-line)" strokeWidth="1"/>
            <line x1="200" y1="0" x2="200" y2="95" stroke="var(--c-accent)" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.4"/>
            <circle cx="200" cy="45" r="4" fill="var(--c-accent)"/>
            <text x="200" y="20" textAnchor="middle" fontSize="9" fill="var(--c-accent)" fontWeight="700" letterSpacing=".05em">14:32</text>
            <DoseMarker x={50} y={80} time="07h" done={morning.every(isTaken)} count={morning.length}/>
            <DoseMarker x={155} y={55} time="13h" done={afternoon.every(isTaken)} count={afternoon.length} next={afternoon.some(m => !isTaken(m))}/>
            <DoseMarker x={265} y={80} time="22h" done={night.every(isTaken)} count={night.length}/>
          </svg>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          padding: '4px 14px 14px', gap: 8,
        }}>
          <TimelineDose label="Manhã · 07h" meds={morning} isTaken={isTaken}/>
          <TimelineDose label="Tarde · 13h" meds={afternoon} isTaken={isTaken}/>
          <TimelineDose label="Noite · 22h" meds={night} isTaken={isTaken}/>
        </div>
      </div>

      {nextDose && (
        <div style={{
          marginTop: 12, padding: 16, borderRadius: 18,
          background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: nextDose.color,
            display: 'grid', placeItems: 'center', fontSize: 22,
          }}>{nextDose.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 600, opacity: .65, letterSpacing: '.08em', textTransform: 'uppercase' }}>Próxima dose</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{nextDose.name} · {nextDose.dose}</div>
            <div style={{ fontSize: 11, opacity: .65 }}>{nextDose.time}</div>
          </div>
          <button style={{
            background: 'var(--c-accent-fg)', color: 'var(--c-accent)',
            border: 'none', padding: '10px 16px', borderRadius: 999,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>Confirmar</button>
        </div>
      )}

      <div className="cu-eyebrow" style={{ padding: '20px 4px 10px' }}>Outros perfis</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {D.PROFILES.slice(1).map(p2 => (
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
  );
}

function DoseMarker({ x, y, time, done, count, next }) {
  const fill = done ? 'var(--c-success)' : next ? 'var(--c-accent)' : 'var(--c-surface)';
  const stroke = done ? 'var(--c-success)' : next ? 'var(--c-accent)' : 'var(--c-line-strong)';
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill="var(--c-bg)" stroke={stroke} strokeWidth="2"/>
      <circle cx={x} cy={y} r="11" fill={fill}/>
      <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={done || next ? 'var(--c-accent-fg)' : 'var(--c-text-soft)'}>{count}</text>
      <text x={x} y={y + 30} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--c-text-soft)" letterSpacing=".05em">{time.toUpperCase()}</text>
    </g>
  );
}

function TimelineDose({ label, meds, isTaken }) {
  const allDone = meds.length > 0 && meds.every(isTaken);
  return (
    <div style={{
      padding: '10px 10px', borderRadius: 12,
      background: allDone ? 'var(--c-success-soft)' : 'var(--c-surface)',
      color: allDone ? 'var(--c-success)' : 'var(--c-text)',
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, opacity: .7, letterSpacing: '.05em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>
        {meds.length === 0 ? '—' : meds.map(m => m.name.split(' ')[0]).join(' · ')}
      </div>
      <div style={{ fontSize: 10, marginTop: 4, opacity: .65 }}>
        {meds.filter(isTaken).length}/{meds.length} {allDone ? '✓' : ''}
      </div>
    </div>
  );
}

function HomeListBody({ morning, afternoon, night, isTaken, toggle }) {
  return (
    <div>
      {morning.length > 0 && <TimeGroup label="Manhã" emoji="☀️" meds={morning} isTaken={isTaken} toggle={toggle}/>}
      {afternoon.length > 0 && <TimeGroup label="Tarde" emoji="🌤" meds={afternoon} isTaken={isTaken} toggle={toggle}/>}
      {night.length > 0 && <TimeGroup label="Noite" emoji="🌙" meds={night} isTaken={isTaken} toggle={toggle}/>}
    </div>
  );
}

function SummaryStat({ label, value, fg, alert }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: fg, opacity: .55, letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: alert ? 'var(--c-alert)' : fg, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function TimeGroup({ label, emoji, meds, isTaken, toggle }) {
  return (
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 8px' }}>
        <span style={{ fontSize: 16 }}>{emoji}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-soft)' }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>· {meds[0].time.split('· ')[1]}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {meds.map(m => (
          <MedRow key={m.id} med={m} taken={isTaken(m)} onToggle={() => toggle(m)}/>
        ))}
      </div>
    </div>
  );
}

function MedRow({ med, taken, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 14, borderRadius: 16,
      background: 'var(--c-card)', border: '1px solid var(--c-line)',
      cursor: 'pointer',
      opacity: taken ? .55 : 1,
      transition: 'opacity .2s ease',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: med.color, display: 'grid', placeItems: 'center', fontSize: 22,
      }}>{med.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 600, color: 'var(--c-text)',
          textDecoration: taken ? 'line-through' : 'none',
        }}>{med.name} <span style={{ fontWeight: 400, color: 'var(--c-text-soft)' }}>· {med.dose}</span></div>
        <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2 }}>{med.schedule}{med.alert && <span style={{ color: 'var(--c-alert)', marginLeft: 6 }}>· estoque baixo</span>}</div>
      </div>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        border: '2px solid ' + (taken ? 'var(--c-success)' : 'var(--c-line-strong)'),
        background: taken ? 'var(--c-success)' : 'transparent',
        display: 'grid', placeItems: 'center', color: '#fff',
        transition: 'all .2s ease',
      }}>
        {taken && <IconCheck size={16} stroke={2.5}/>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 3. ESTOQUE
// ════════════════════════════════════════════════════════════
function StockScreen({ go }) {
  const { currentPatientId } = usePatient();
  const { medications: rawMeds, loading: medsLoading } = useMedications(currentPatientId);
  const [filter, setFilter] = useStateScreens('all');

  // Map DB medications to stock format; fall back to mock if no real data
  const usingMock = rawMeds.length === 0 && !currentPatientId;
  const stockItems = usingMock
    ? D.STOCK_ALL
    : rawMeds.filter(m => m.active).map((m, i) => {
        const days = m.stock_qty > 0 ? m.stock_qty : 0;
        const critical = days <= 5;
        return {
          id: m.id,
          name: m.name,
          owner: m.dose ? `${m.dose}${m.unit ?? ''}` : '—',
          stock: m.stock_qty ?? 0,
          max: m.stock_max ?? 30,
          days,
          critical,
        };
      });

  const items = filter === 'critical' ? stockItems.filter(s => s.critical) : stockItems;
  const critical = stockItems.filter(s => s.critical);
  return (
    <Screen>
      <ScreenHeader title="Estoque"/>

      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
        <Pill active={filter === 'all'} onClick={() => setFilter('all')} color="var(--c-accent)" fg="var(--c-accent-fg)">Tudo · {D.STOCK_ALL.length}</Pill>
        <Pill active={filter === 'critical'} onClick={() => setFilter('critical')} color="var(--c-alert)" fg="#fff">Crítico · {critical.length}</Pill>
      </div>

      {critical.length > 0 && (
        <div style={{ padding: '0 20px 14px' }}>
          <SoftCard background="var(--c-accent)" padding={18} radius={20}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--c-accent-fg)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', opacity: .65 }}>Lista de compras</div>
                <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>{critical.length} itens</div>
                <div style={{ fontSize: 13, opacity: .75, marginTop: 2 }}>Estimativa: comprar até quinta</div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,.1)', display: 'grid', placeItems: 'center' }}>
                <IconBox size={24}/>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="soft" size="sm" icon={<IconWhatsApp size={16}/>} style={{ background: 'var(--c-accent-fg)', color: 'var(--c-accent)', flex: 1 }}>WhatsApp</Button>
              <Button variant="ghost" size="sm" icon={<IconShare size={16}/>} style={{ color: 'var(--c-accent-fg)', background: 'rgba(255,255,255,.1)', flex: 1 }}>Compartilhar</Button>
            </div>
          </SoftCard>
        </div>
      )}

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(s => {
          return (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: 14,
              borderRadius: 14,
              background: s.critical ? 'var(--c-alert-soft)' : 'var(--c-card)',
              border: s.critical ? 'none' : '1px solid var(--c-line)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-muted)' }}>{s.owner}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Bar value={s.stock} max={s.max} color={s.critical ? 'var(--c-alert)' : 'var(--c-accent)'} bg="rgba(38,37,37,.06)"/>
                  <div style={{ fontSize: 12, fontWeight: 600, color: s.critical ? 'var(--c-alert)' : 'var(--c-text-soft)', whiteSpace: 'nowrap' }}>
                    {s.days}d
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 4. EMERGÊNCIA
// ════════════════════════════════════════════════════════════
function EmergencyScreen({ go, initialView = 'lockscreen' }) {
  const [activeId, setActiveId] = useStateScreens('maria');
  const [view, setView] = useStateScreens(initialView);
  const p = D.PROFILES.find(pr => pr.id === activeId);
  return (
    <Screen background="var(--c-bg)">
      <ScreenHeader title="Emergência" eyebrow="Card de SOS"/>
      <ProfilePicker profiles={D.PROFILES} activeId={activeId} onChange={setActiveId} dense/>

      <div style={{ padding: '8px 20px 0', display: 'flex', justifyContent: 'center' }}>
        <ViewToggle
          value={view}
          onChange={setView}
          options={[
            { value: 'lockscreen',  label: 'Tela de bloqueio' },
            { value: 'carteirinha', label: 'Carteirinha' },
          ]}
        />
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        {view === 'lockscreen'
          ? <EmergencyLockPreview profile={p}/>
          : <EmergencyCardCarteirinha profile={p}/>
        }
      </div>

      <div style={{ padding: '18px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Button variant="primary" icon={<IconShare size={18}/>}>Compartilhar</Button>
        <Button variant="soft" icon={<IconPrint size={18}/>}>Imprimir</Button>
        <Button variant="outline" icon={<IconLink size={18}/>} style={{ gridColumn: '1 / -1' }}>Copiar link público</Button>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <SoftCard background="var(--c-surface)" padding={16} radius={16}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <IconInfo size={20} style={{ color: 'var(--c-accent)', marginTop: 2, flexShrink: 0 }}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                {view === 'lockscreen' ? 'Em uma emergência' : 'Onde guardar este cartão'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--c-text-soft)', lineHeight: 1.5 }}>
                {view === 'lockscreen'
                  ? 'Acione "Apresentar tela cheia" e entregue o celular ao socorrista. As informações ficam visíveis sem desbloquear.'
                  : 'Adicione à carteira do iPhone, imprima e cole na geladeira, ou envie pra um familiar pelo WhatsApp.'
                }
              </div>
            </div>
          </div>
        </SoftCard>
      </div>
    </Screen>
  );
}

function EmergencyLockPreview({ profile: p }) {
  return (
    <div>
      <div style={{
        background: '#0a0d0e', color: '#fff',
        borderRadius: 28, padding: 22,
        boxShadow: '0 30px 60px rgba(10,13,14,.28), 0 8px 24px rgba(10,13,14,.18)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 500, opacity: .55, letterSpacing: '.04em' }}>quinta-feira, 14 de maio</div>
          <div style={{ fontSize: 52, fontWeight: 300, marginTop: 2, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>14:32</div>
        </div>

        <div style={{
          background: 'rgba(170,60,38,.22)', border: '1px solid rgba(170,60,38,.4)',
          borderRadius: 12, padding: '8px 12px',
          color: '#ffcfbe', fontSize: 11, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8,
          letterSpacing: '.04em', textTransform: 'uppercase',
        }}>
          <IconAlert size={14}/> SOS · Medical info
        </div>

        <div style={{
          marginTop: 12, padding: 14, borderRadius: 18,
          background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)',
        }}>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.name}</div>
          <div style={{ fontSize: 11, opacity: .55, marginTop: 2 }}>{p.relation} · {p.age} anos</div>

          <div style={{
            marginTop: 10, padding: '10px 12px',
            background: 'rgba(255,80,60,.18)', borderRadius: 10,
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#ff8c75', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{p.bloodType}</div>
            <div style={{ fontSize: 10, fontWeight: 600, opacity: .65, letterSpacing: '.08em', textTransform: 'uppercase' }}>Tipo sanguíneo</div>
          </div>

          <LockInfoLine label="Alergias" value={p.allergies.join(' · ')} highlight/>
          <LockInfoLine label="Em uso" value="Losartana · AAS · Atenolol · Sinvastatina"/>
          <LockInfoLine label="Plano" value={p.plano}/>
        </div>

        <div style={{
          marginTop: 12, padding: '12px 14px', borderRadius: 14,
          background: 'rgba(216, 60, 38, .92)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 12, fontWeight: 600,
        }}>
          <IconPhone size={16}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, opacity: .8, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Em caso de emergência</div>
            <div>192 SAMU · Carla (filha)</div>
          </div>
        </div>
      </div>

      <Button variant="dark" full size="lg" style={{ marginTop: 12 }} icon={<IconShield size={18}/>}>
        Apresentar em tela cheia
      </Button>
    </div>
  );
}

function LockInfoLine({ label, value, highlight }) {
  return (
    <div style={{ padding: '8px 0', borderTop: '1px solid rgba(255,255,255,.06)', marginTop: 8 }}>
      <div style={{ fontSize: 9, fontWeight: 600, opacity: .55, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: highlight ? 600 : 500, color: highlight ? '#ffc4b3' : '#fff', marginTop: 3, lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

function EmergencyCardCarteirinha({ profile: p }) {
  return (
    <div style={{
      background: 'var(--c-accent)',
      color: 'var(--c-accent-fg)',
      borderRadius: 24,
      padding: 22,
      boxShadow: '0 30px 60px rgba(1,55,61,.25), 0 8px 24px rgba(1,55,61,.18)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 180, height: 180,
        borderRadius: '50%', background: 'rgba(255,255,255,.05)',
      }}/>
      <div style={{
        position: 'absolute', top: 40, right: 40, width: 120, height: 120,
        borderRadius: '50%', background: 'rgba(255,255,255,.04)',
      }}/>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, position: 'relative' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', opacity: .55 }}>Cartão de emergência</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>{p.name}</div>
          <div style={{ fontSize: 12, opacity: .65 }}>{p.relation} · {p.age} anos · Tipo {p.bloodType}</div>
        </div>
        <BrandMark size={28} style={{ color: 'var(--c-accent-fg)' }}/>
      </div>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative' }}>
        <FakeQR size={92} bg="var(--c-accent-fg)" fg="var(--c-accent)"/>
        <div style={{ flex: 1, fontSize: 11.5, lineHeight: 1.5 }}>
          <InfoLine label="Alergias" value={p.allergies.join(' · ')}/>
          <InfoLine label="Plano" value={p.plano}/>
          <InfoLine label="Em caso de" value={p.emergencia}/>
        </div>
      </div>

      <div style={{
        marginTop: 18, paddingTop: 14,
        borderTop: '1px dashed rgba(255,255,255,.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 10, opacity: .55, position: 'relative',
      }}>
        <span>cuida.app/c/maria-7a92</span>
        <span>Atualizado há 2 dias</span>
      </div>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <span style={{ opacity: .55, fontWeight: 500 }}>{label} · </span>
      <span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function FakeQR({ size = 80, bg = '#fff', fg = '#000', radius = 10 }) {
  const dots = [];
  const N = 11;
  const fill = (x, y) => dots.push({ x, y });
  const finder = (cx, cy) => {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      if (Math.abs(dx) === 2 || Math.abs(dy) === 2 || (Math.abs(dx) <= 0 && Math.abs(dy) <= 0)) fill(cx + dx, cy + dy);
    }
  };
  finder(2, 2); finder(N - 3, 2); finder(2, N - 3);
  const data = "10110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100";
  let k = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const inFinder = (x < 5 && y < 5) || (x > N - 6 && y < 5) || (x < 5 && y > N - 6);
      if (!inFinder && data[k++ % data.length] === '1') fill(x, y);
    }
  }
  return (
    <div style={{ width: size, height: size, background: bg, borderRadius: radius, padding: 6, flexShrink: 0 }}>
      <svg width={size - 12} height={size - 12} viewBox={`0 0 ${N} ${N}`}>
        {dots.map((d, i) => <rect key={i} x={d.x} y={d.y} width="1" height="1" fill={fg} rx="0.15"/>)}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 5. FAMILIA
// ════════════════════════════════════════════════════════════
function FamilyScreen({ go }) {
  const { patients: rawPatients, currentPatientId, setCurrentPatientId } = usePatient();
  const { members, loading: membersLoading } = useFamily(currentPatientId);

  const usingMock = rawPatients.length === 0;
  const profiles = usingMock
    ? D.PROFILES
    : rawPatients.map(p => ({ id: p.id, name: p.name, color: p.avatar_color ?? 'rgb(212,232,230)', fg: p.avatar_fg ?? 'rgb(1,55,61)', relation: 'Familiar', medsToday: 0, medsAlert: 0 }));
  const family = usingMock
    ? D.FAMILY
    : members.map(m => ({
        id: m.id,
        name: m.profiles?.full_name ?? m.invite_email ?? '—',
        color: 'rgb(218,235,222)',
        role: m.role ?? 'Familiar',
        perms: m.permissions?.admin ? 'Admin' : m.permissions?.edit ? 'Pode editar' : 'Visualizar',
        status: m.invite_status,
      }));

  return (
    <Screen>
      <ScreenHeader title="Família" action={
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton variant="soft" size={42} onClick={() => go && go('mensagens')}>
            <IconChat size={20}/>
          </IconButton>
          <IconButton variant="soft" size={42} onClick={() => go && go('feed')}>
            <IconBell size={20}/>
          </IconButton>
          <IconButton variant="accent" size={42}>
            <IconPlus size={20}/>
          </IconButton>
        </div>
      }/>

      <div style={{ padding: '0 20px 6px' }}>
        <div className="cu-eyebrow" style={{ padding: '8px 4px' }}>Pessoas que você cuida</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {profiles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 16px', color: 'var(--c-text-muted)', fontSize: 14 }}>
              Nenhum paciente ainda. Adicione o primeiro!
            </div>
          ) : profiles.map(p => (
            <Card key={p.id} padding={16} radius={18} shadow={false}
              style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
              onClick={() => setCurrentPatientId(p.id)}>
              <Avatar name={p.name} color={p.color} fg={p.fg} size={48}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>{p.relation}{p.medsToday > 0 ? ` · ${p.medsToday} remédios/dia` : ''}</div>
              </div>
              {p.medsAlert > 0 && <Dot color="var(--c-alert)" size={10}/>}
              {currentPatientId === p.id && <Dot color="var(--c-success)" size={10}/>}
              <IconChevR size={18} style={{ color: 'var(--c-text-muted)' }}/>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '8px 4px' }}>Familiares com acesso</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {family.length === 0 && !membersLoading ? (
            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--c-text-muted)', fontSize: 13 }}>Nenhum familiar adicionado.</div>
          ) : family.map((f, i) => (
            <div key={f.id ?? i} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: 14,
              borderRadius: 18, background: 'var(--c-card)', border: '1px solid var(--c-line)',
            }}>
              <Avatar name={f.name} color={f.color} size={42}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>
                  {f.role} · {f.perms}
                  {f.status === 'pending' && <span style={{ color: 'var(--c-warn)', marginLeft: 6 }}>· Convite pendente</span>}
                </div>
              </div>
              <IconMoreV size={18} style={{ color: 'var(--c-text-muted)' }}/>
            </div>
          ))}
        </div>

        <button style={{
          marginTop: 12, padding: '14px 16px', borderRadius: 16,
          background: 'var(--c-surface)', border: 'none',
          display: 'flex', alignItems: 'center', gap: 12, width: '100%',
          cursor: 'pointer', fontFamily: 'inherit', color: 'var(--c-text)',
        }}>
          <IconShare size={22} style={{ color: 'var(--c-accent)' }}/>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Convidar por WhatsApp</div>
            <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>Link gerado automaticamente</div>
          </div>
          <IconChevR size={18} style={{ color: 'var(--c-text-muted)' }}/>
        </button>
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 6. FEED
// ════════════════════════════════════════════════════════════
function FeedScreen({ go }) {
  const events = [
    { who: 'Carla', target: 'Maria', action: 'confirmou', detail: 'Losartana 50mg', time: 'agora', icon: '💊' },
    { who: 'Rafael', target: 'João', action: 'adicionou', detail: 'consulta com Dr. Mendes', time: '2h', icon: '📅' },
    { who: 'Sistema', target: 'Maria', action: 'avisou', detail: 'AAS acaba em 4 dias', time: '4h', icon: '⚠️', alert: true },
    { who: 'Pedro', target: 'João', action: 'comentou', detail: '"Levei pra fisio hoje, foi tudo bem"', time: 'ontem', icon: '💬' },
    { who: 'Carla', target: 'Você', action: 'confirmou', detail: 'Vitamina D 2000UI', time: 'ontem', icon: '💊' },
    { who: 'Sofia', target: 'Maria', action: 'visualizou', detail: 'cartão de emergência', time: '2 dias', icon: '🛡' },
  ];
  return (
    <Screen>
      <ScreenHeader title="Feed" eyebrow="Atividade da família"/>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {events.map((e, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '14px 4px',
            borderBottom: i < events.length - 1 ? '1px solid var(--c-line)' : 'none',
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: e.alert ? 'var(--c-alert-soft)' : 'var(--c-surface)',
              display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0,
            }}>{e.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, lineHeight: 1.4 }}>
                <span style={{ fontWeight: 600 }}>{e.who}</span>
                <span style={{ color: 'var(--c-text-soft)' }}> {e.action} </span>
                <span style={{ fontWeight: 500 }}>{e.detail}</span>
                <span style={{ color: 'var(--c-text-soft)' }}> em <span style={{ fontWeight: 500 }}>{e.target}</span></span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 4 }}>{e.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 7. CONFIGURAÇÕES
// ════════════════════════════════════════════════════════════
function SettingsScreen({ go }) {
  return (
    <Screen>
      <ScreenHeader title="Configurações"/>

      <div style={{ padding: '0 20px 14px' }}>
        <Card padding={18} radius={20} shadow={false} onClick={() => go && go('edit-profile')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name="Carla Almeida" color="rgb(218, 235, 222)" size={54}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Carla Almeida</div>
              <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>carla@email.com</div>
            </div>
            <IconChevR size={18} style={{ color: 'var(--c-text-muted)' }}/>
          </div>

          <div style={{
            marginTop: 14, padding: 14, borderRadius: 14,
            background: 'var(--c-surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-accent)', letterSpacing: '.04em', textTransform: 'uppercase' }}>Plano família</div>
              <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 2 }}>Até 5 perfis · renova em 12 dias</div>
            </div>
            <Button variant="primary" size="sm" onClick={() => go && go('plano')}>Gerenciar</Button>
          </div>
        </Card>
      </div>

      <SettingsGroup title="Cuidado">
        <SettingsRow icon={<IconBell size={20}/>} label="Notificações" detail="Push + WhatsApp" onClick={() => go && go('notificacoes')}/>
        <SettingsRow icon={<IconUsers size={20}/>} label="Família" detail="3 pessoas"/>
        <SettingsRow icon={<IconCalendar size={20}/>} label="Lembretes" detail="Padrão por horário"/>
      </SettingsGroup>

      <SettingsGroup title="Privacidade">
        <SettingsRow icon={<IconLock size={20}/>} label="Privacidade e segurança"/>
        <SettingsRow icon={<IconShield size={20}/>} label="Card de emergência público" detail="Ativo"/>
        <SettingsRow icon={<IconShare size={20}/>} label="Compartilhamentos" detail="2 ativos"/>
      </SettingsGroup>

      <SettingsGroup title="Sobre">
        <SettingsRow icon={<IconInfo size={20}/>} label="Ajuda e suporte"/>
        <SettingsRow icon={<IconHeart size={20}/>} label="Indique cuida" detail="Ganhe 1 mês" onClick={() => go && go('indicar')}/>
      </SettingsGroup>

      <div style={{ padding: '24px 20px 8px', textAlign: 'center', fontSize: 11, color: 'var(--c-text-muted)' }}>
        cuida · v1.0.0
      </div>
      <div style={{ padding: '0 20px 24px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => go && go('login')} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--c-alert)', fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
        }}>Sair da conta</button>
      </div>
    </Screen>
  );
}

function SettingsGroup({ title, children }) {
  return (
    <div style={{ padding: '0 20px 14px' }}>
      <div className="cu-eyebrow" style={{ padding: '8px 4px 6px' }}>{title}</div>
      <div style={{
        background: 'var(--c-card)', borderRadius: 18, overflow: 'hidden',
        border: '1px solid var(--c-line)',
      }}>{children}</div>
    </div>
  );
}

function SettingsRow({ icon, label, detail, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      borderBottom: '1px solid var(--c-line)',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: 'var(--c-surface)', color: 'var(--c-accent)',
        display: 'grid', placeItems: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14 }}>{label}</div>
      </div>
      {detail && <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>{detail}</span>}
      <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
    </div>
  );
}

export {
  HomeScreen, StockScreen, EmergencyScreen, FamilyScreen, FeedScreen, SettingsScreen,
  EmergencyCardCarteirinha, FakeQR, ProfilePicker,
};
