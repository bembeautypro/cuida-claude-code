// Cuida — Telas adicionais
// VacinasScreen · LoginScreen · EditProfileScreen
// AgendarConsultaScreen · AddExameScreen · NotificacoesScreen
import React, { useState as useSM } from 'react';
import { CUIDA_DATA } from './data.jsx';
import { Screen, Button, IconButton, Avatar, ViewToggle } from './ui.jsx';
import {
  BrandMark,
  IconArrowL, IconPlus, IconAlert, IconChevR, IconBell, IconCalendar,
  IconWhatsApp, IconCamera, IconShare, IconSearch, IconCheck,
  IconHeart, IconDroplet, IconShield, IconInfo,
} from './icons.jsx';

// ── Dados de vacinas ──
const VACINAS_DATA = [
  { id:'v1', name:'Influenza',     dose:'Dose anual',       last:'18 abr. 2025', proxima:'Abr 2026',  status:'emdia',    color:'rgb(218,235,222)', fg:'var(--c-success)' },
  { id:'v2', name:'COVID-19',      dose:'Bivalente',        last:'10 jan. 2025', proxima:'Jan 2026',  status:'emdia',    color:'rgb(212,232,230)', fg:'var(--c-accent)' },
  { id:'v3', name:'Pneumococo',    dose:'23-valente',       last:'05 jun. 2023', proxima:'Jun 2028',  status:'emdia',    color:'rgb(254,220,195)', fg:'rgb(122,60,38)' },
  { id:'v4', name:'Hepatite B',    dose:'3ª dose pendente', last:'—',            proxima:'Pendente',  status:'atrasada', color:'rgb(252,224,213)', fg:'var(--c-alert)' },
  { id:'v5', name:'Tétano (dT)',   dose:'Adulto',           last:'14 mar. 2020', proxima:'Mar 2030',  status:'emdia',    color:'rgb(232,220,240)', fg:'rgb(82,36,88)' },
  { id:'v6', name:'Febre amarela', dose:'Dose única',       last:'22 out. 2019', proxima:'Vitalícia', status:'emdia',    color:'rgb(253,233,200)', fg:'var(--c-warn)' },
];

// ════════════════════════════════════════════════════════════
// 1. VACINAS
// ════════════════════════════════════════════════════════════
function VacinasScreen({ go }) {
  const [tab, setTab] = useSM('todas');
  const atrasadas = VACINAS_DATA.filter(v => v.status === 'atrasada');
  const shown = tab === 'atrasadas' ? atrasadas : tab === 'emdia' ? VACINAS_DATA.filter(v => v.status === 'emdia') : VACINAS_DATA;

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('prontuarios')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36}><IconPlus size={18}/></IconButton>
      </div>

      <div style={{ padding: '6px 20px 4px' }}>
        <div className="cu-h1" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Vacinas</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Carteira de vacinação de Maria.</div>
      </div>

      {atrasadas.length > 0 && (
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{
            background: 'var(--c-alert-soft)', borderRadius: 14, padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid rgba(170,60,38,.15)',
          }}>
            <IconAlert size={18} style={{ color: 'var(--c-alert)', flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-alert)' }}>{atrasadas.length} vacina pendente</div>
              <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 1 }}>Agende com seu médico o quanto antes</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '12px 20px 16px' }}>
        <ViewToggle value={tab} onChange={setTab} options={[
          { value: 'todas',    label: 'Todas' },
          { value: 'atrasadas',label: 'Pendentes' },
          { value: 'emdia',   label: 'Em dia' },
        ]} style={{ width: '100%' }}/>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {shown.map(v => (
          <div key={v.id} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 18,
            cursor: 'pointer',
            background: v.status === 'atrasada' ? 'var(--c-alert-soft)' : 'var(--c-card)',
            border: v.status === 'atrasada' ? '1px solid rgba(170,60,38,.2)' : '1px solid var(--c-line)',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: v.color, color: v.fg,
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 2 4 4-9.4 9.4-4-4L18 2zM5 17l-3 3M10 3 7 6M21 14l-3 3"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{v.name}</div>
              <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2 }}>{v.dose}</div>
              <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 2 }}>
                {v.last !== '—' ? `Aplicada em ${v.last}` : 'Não aplicada ainda'}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999,
                textTransform: 'uppercase', letterSpacing: '.05em',
                background: v.status === 'atrasada' ? 'var(--c-alert)' : 'var(--c-success-soft)',
                color: v.status === 'atrasada' ? '#fff' : 'var(--c-success)',
              }}>{v.status === 'atrasada' ? 'Pendente' : 'Em dia'}</span>
              <span style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>Próx. {v.proxima}</span>
            </div>
            <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <Button variant="outline" full size="md" icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 2 4 4-9.4 9.4-4-4L18 2zM5 17l-3 3M10 3 7 6M21 14l-3 3"/>
          </svg>
        }>Registrar vacina aplicada</Button>
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 2. LOGIN
// ════════════════════════════════════════════════════════════
function LoginScreen({ go }) {
  const [loading, setLoading] = useSM(false);

  function handleLogin() {
    setLoading(true);
    setTimeout(() => { setLoading(false); go && go('home'); }, 1200);
  }

  return (
    <Screen hasTabBar={false}>
      <div style={{ padding: '20px 28px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <IconButton variant="plain" size={36} onClick={() => go && go('home')}>
          <IconArrowL size={20}/>
        </IconButton>

        <div style={{ marginTop: 36 }}>
          <BrandMark size={30} style={{ color: 'var(--c-accent)' }}/>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 16, lineHeight: 1.1 }}>
            Bem-vinda<br/>de volta.
          </div>
          <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8 }}>
            Entre na sua conta para continuar cuidando.
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: 'var(--c-card)', borderRadius: 16, padding: '14px 18px',
            border: '1.5px solid var(--c-accent)',
            boxShadow: '0 0 0 3px rgba(1,55,61,.07)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-accent)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>E-mail</div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>carla@email.com</div>
          </div>
          <div style={{ background: 'var(--c-card)', borderRadius: 16, padding: '14px 18px', border: '1px solid var(--c-line)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-soft)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>Senha</div>
            <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: '.14em', color: 'var(--c-text-muted)' }}>••••••••</div>
          </div>
          <button style={{
            background: 'transparent', border: 'none',
            color: 'var(--c-accent)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', textAlign: 'right', padding: '2px 0', fontFamily: 'inherit',
          }} onClick={() => go && go('recuperar-senha')}>Esqueceu a senha?</button>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button variant="primary" size="lg" full onClick={handleLogin} style={{ opacity: loading ? .7 : 1 }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <Button variant="ghost" size="lg" full>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 18, height: 18, background: '#fff', borderRadius: 4, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, color: '#4285F4', boxShadow: '0 0 0 1px var(--c-line)' }}>G</span>
              Continuar com Google
            </span>
          </Button>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color: 'var(--c-text-muted)', textAlign: 'center' }}>
          Não tem conta? <span onClick={() => go && go('signup')} style={{ color: 'var(--c-accent)', fontWeight: 600, cursor: 'pointer' }}>Criar conta</span>
        </div>
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 3. EDITAR PERFIL
// ════════════════════════════════════════════════════════════
function EditProfileScreen({ go }) {
  const p = CUIDA_DATA.PROFILES[0];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const [bloodType, setBloodType] = useSM(p.bloodType);
  const [allergies, setAllergies] = useSM([...p.allergies]);
  const [saved, setSaved] = useSM(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => { go && go('settings'); }, 1000);
  }

  return (
    <Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('settings')}><IconArrowL size={20}/></IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Editar perfil</div>
        <button onClick={handleSave} style={{ background: 'transparent', border: 'none', color: 'var(--c-accent)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Salvar</button>
      </div>

      <div style={{ display: 'grid', placeItems: 'center', padding: '20px 0 16px' }}>
        <div style={{ position: 'relative' }}>
          <Avatar name={p.name} color={p.color} fg={p.fg} size={80}/>
          <button style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
            border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center',
            boxShadow: '0 0 0 3px var(--c-bg)',
          }}><IconCamera size={14}/></button>
        </div>
        <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 8 }}>Toque para trocar foto</div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Dados básicos</div>
          <div style={{ background: 'var(--c-card)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            <EPRow label="Nome" value={p.name}/>
            <EPRow label="Nascimento" value="14/05/1953" detail="72 anos"/>
            <EPRow label="Relação" value={p.relation}/>
          </div>
        </div>

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Saúde</div>
          <div style={{ background: 'var(--c-card)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--c-line)' }}>
              <div style={{ fontSize: 11, color: 'var(--c-text-muted)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 8 }}>Tipo sanguíneo</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {bloodTypes.map(bt => (
                  <button key={bt} onClick={() => setBloodType(bt)} style={{
                    padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                    background: bloodType === bt ? 'var(--c-accent)' : 'var(--c-surface)',
                    color: bloodType === bt ? 'var(--c-accent-fg)' : 'var(--c-text)',
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}>{bt}</button>
                ))}
              </div>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--c-line)' }}>
              <div style={{ fontSize: 11, color: 'var(--c-text-muted)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 8 }}>Alergias</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {allergies.map((a, i) => (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: 'var(--c-alert)', color: '#fff',
                  }}>
                    {a}
                    <button onClick={() => setAllergies(prev => prev.filter((_, j) => j !== i))} style={{
                      background: 'rgba(255,255,255,.25)', border: 'none', borderRadius: '50%',
                      width: 16, height: 16, cursor: 'pointer', color: '#fff',
                      display: 'grid', placeItems: 'center', padding: 0, fontSize: 10,
                    }}>×</button>
                  </span>
                ))}
                <button onClick={() => setAllergies(prev => [...prev, 'Nova alergia'])} style={{
                  padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                  background: 'var(--c-surface)', border: '1px dashed var(--c-line-strong)',
                  color: 'var(--c-text-soft)', cursor: 'pointer', fontFamily: 'inherit',
                }}>+ Adicionar</button>
              </div>
            </div>
            <EPRow label="Convênio" value={p.plano}/>
          </div>
        </div>

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Contato de emergência</div>
          <div style={{ background: 'var(--c-card)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            <EPRow label="Nome" value="Carla Almeida"/>
            <EPRow label="Telefone" value="+55 11 98123-4567"/>
          </div>
        </div>

        <Button variant="primary" full size="lg" onClick={handleSave}
          style={{ background: saved ? 'var(--c-success)' : undefined }}>
          {saved ? '✓ Salvo com sucesso!' : 'Salvar alterações'}
        </Button>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--c-alert)', fontSize: 14, fontWeight: 500, padding: '4px 0', fontFamily: 'inherit' }}>
          Excluir perfil
        </button>
      </div>
    </Screen>
  );
}

function EPRow({ label, value, detail }) {
  return (
    <div style={{
      padding: '12px 16px', borderBottom: '1px solid var(--c-line)',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ fontSize: 11, color: 'var(--c-text-muted)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', width: 88, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
      {detail && <div style={{ fontSize: 11, color: 'var(--c-text-muted)', flexShrink: 0 }}>{detail}</div>}
      <IconChevR size={14} style={{ color: 'var(--c-text-muted)', flexShrink: 0 }}/>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 4. AGENDAR CONSULTA — 3 passos
// ════════════════════════════════════════════════════════════
function AgendarConsultaScreen({ go }) {
  const [step, setStep] = useSM(1);
  const [esp, setEsp] = useSM('');
  const [day, setDay] = useSM(null);
  const [time, setTime] = useSM(null);
  const [confirming, setConfirming] = useSM(false);

  const ESPS = [
    { id:'cardio', label:'Cardiologia',    icon: <IconHeart size={18}/>,    color:'rgb(252,224,213)' },
    { id:'endo',   label:'Endocrinologia', icon: <IconDroplet size={18}/>,  color:'rgb(254,220,195)' },
    { id:'oftal',  label:'Oftalmologia',   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>, color:'rgb(212,232,230)' },
    { id:'ortho',  label:'Ortopedia',      icon: <IconShield size={18}/>,   color:'rgb(218,235,222)' },
    { id:'neuro',  label:'Neurologia',     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>, color:'rgb(232,220,240)' },
    { id:'geral',  label:'Clínico geral',  icon: <IconInfo size={18}/>,     color:'rgb(230,230,218)' },
  ];
  const DAYS  = ['Seg 19', 'Ter 20', 'Qua 21', 'Sex 23', 'Seg 26'];
  const TIMES = ['08:00', '09:00', '10:00', '10:30', '14:00', '15:30'];

  const espLabel = ESPS.find(e => e.id === esp)?.label || 'Especialidade';

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => { go && go('consultas'); }, 1400);
  }

  return (
    <Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <IconButton variant="plain" onClick={() => step > 1 ? setStep(s => s - 1) : go && go('consultas')}>
          <IconArrowL size={20}/>
        </IconButton>
        <div style={{ flex: 1, height: 4, background: 'var(--c-line)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(step/3)*100}%`, background: 'var(--c-accent)', borderRadius: 999, transition: 'width .3s ease' }}/>
        </div>
        <div style={{ fontSize: 12, color: 'var(--c-text-soft)', fontWeight: 600 }}>{step}/3</div>
      </div>

      {step === 1 && (
        <div style={{ padding: '16px 20px 0' }}>
          <div className="cu-h1" style={{ fontSize: 28, marginBottom: 4 }}>Qual especialidade?</div>
          <div className="cu-body cu-muted" style={{ marginBottom: 18 }}>Selecione para ver médicos disponíveis.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {ESPS.map(e => (
              <button key={e.id} onClick={() => { setEsp(e.id); setStep(2); }} style={{
                padding: '16px 14px', borderRadius: 18, textAlign: 'left',
                background: esp === e.id ? 'var(--c-accent-soft)' : 'var(--c-card)',
                border: '1.5px solid ' + (esp === e.id ? 'var(--c-accent)' : 'var(--c-line)'),
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all .15s ease',
              }}>
                <div style={{ color: 'var(--c-accent)', marginBottom: 10 }}>{e.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{e.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: '16px 20px 0' }}>
          <div className="cu-h1" style={{ fontSize: 28, marginBottom: 4 }}>Data e horário</div>
          <div className="cu-body cu-muted" style={{ marginBottom: 18 }}>Dr. Ricardo Andrade · {espLabel}</div>

          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Data</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20 }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setDay(d)} style={{
                padding: '12px 16px', borderRadius: 14, flexShrink: 0,
                background: day === d ? 'var(--c-accent)' : 'var(--c-card)',
                color: day === d ? 'var(--c-accent-fg)' : 'var(--c-text)',
                border: '1px solid ' + (day === d ? 'transparent' : 'var(--c-line)'),
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              }}>{d}</button>
            ))}
          </div>

          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Horário</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {TIMES.map(t => (
              <button key={t} onClick={() => setTime(t)} style={{
                padding: '10px 16px', borderRadius: 12,
                background: time === t ? 'var(--c-accent)' : 'var(--c-surface)',
                color: time === t ? 'var(--c-accent-fg)' : 'var(--c-text)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              }}>{t}</button>
            ))}
          </div>

          <Button variant="primary" full size="lg"
            onClick={() => { if (day && time) setStep(3); }}
            style={{ opacity: (!day || !time) ? .5 : 1 }}>
            Continuar
          </Button>
        </div>
      )}

      {step === 3 && (
        <div style={{ padding: '16px 20px 0' }}>
          <div className="cu-h1" style={{ fontSize: 28, marginBottom: 4 }}>Confirmar</div>
          <div className="cu-body cu-muted" style={{ marginBottom: 18 }}>Revise os detalhes antes de confirmar.</div>

          <div style={{
            background: 'var(--c-accent-soft)', borderRadius: 20, padding: 20,
            border: '1px solid rgba(1,55,61,.12)', marginBottom: 20,
          }}>
            {[
              ['Especialidade', espLabel],
              ['Médico', 'Dr. Ricardo Andrade'],
              ['Data', day || '—'],
              ['Horário', time || '—'],
              ['Local', 'Clínica Vida Plena'],
              ['Paciente', 'Maria'],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(1,55,61,.08)' }}>
                <span style={{ fontSize: 12, color: 'var(--c-text-soft)', fontWeight: 600 }}>{l}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <Button variant="primary" full size="lg" onClick={handleConfirm}
            style={{ background: confirming ? 'var(--c-success)' : undefined }}>
            {confirming ? '✓ Consulta agendada!' : 'Confirmar agendamento'}
          </Button>
          <Button variant="ghost" full size="md" style={{ marginTop: 10 }} onClick={() => go && go('consultas')}>
            Cancelar
          </Button>
        </div>
      )}
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 5. ADICIONAR EXAME
// ════════════════════════════════════════════════════════════
function AddExameScreen({ go }) {
  const [selectedExame, setSelectedExame] = useSM('Hemograma completo');
  const [customExame, setCustomExame] = useSM('');
  const [preparo, setPreparo] = useSM('Jejum 8h');
  const [hasDoc, setHasDoc] = useSM(false);
  const [saved, setSaved] = useSM(false);

  const EXAMES_LISTA = ['Hemograma completo', 'Glicemia em jejum', 'Colesterol total', 'TSH', 'Vitamina D', 'HbA1c', 'Ureia e creatinina', 'Outro...'];
  const PREPAROS = ['Sem preparo', 'Jejum 8h', 'Jejum 12h', 'Outro'];

  function handleSave() {
    setSaved(true);
    setTimeout(() => { go && go('exames-full'); }, 1200);
  }

  return (
    <Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('exames-full')}><IconArrowL size={20}/></IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Adicionar exame</div>
        <div style={{ width: 36 }}/>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Tipo de exame</div>
          <div style={{ background: 'var(--c-card)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            {EXAMES_LISTA.map(e => (
              <button key={e} onClick={() => setSelectedExame(e)} style={{
                padding: '12px 16px', textAlign: 'left', width: '100%',
                background: selectedExame === e ? 'var(--c-accent-soft)' : 'transparent',
                border: 'none', borderBottom: '1px solid var(--c-line)',
                color: 'var(--c-text)', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 14, fontWeight: selectedExame === e ? 600 : 400,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                {e === 'Outro...' ? 'Outro (digitar)' : e}
                {selectedExame === e && <IconCheck size={16} style={{ color: 'var(--c-accent)' }}/>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Data marcada</div>
          <div style={{
            padding: '14px 16px', borderRadius: 16,
            background: 'var(--c-card)', border: '1px solid var(--c-line)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <IconCalendar size={18} style={{ color: 'var(--c-accent)' }}/>
            <span style={{ fontSize: 15, fontWeight: 500 }}>22 de junho · 08:00</span>
            <IconChevR size={16} style={{ color: 'var(--c-text-muted)', marginLeft: 'auto' }}/>
          </div>
        </div>

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Preparo necessário</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PREPAROS.map(p => (
              <button key={p} onClick={() => setPreparo(p)} style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                background: preparo === p ? 'var(--c-accent)' : 'var(--c-surface)',
                color: preparo === p ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>{p}</button>
            ))}
          </div>
        </div>

        {selectedExame === 'Outro...' && (
          <div>
            <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Nome do exame</div>
            <input
              value={customExame}
              onChange={e => setCustomExame(e.target.value)}
              placeholder="Ex: Eletrocardiograma, Densitometria…"
              style={{
                width: '100%', padding: '14px 16px', borderRadius: 16,
                border: '1.5px solid var(--c-accent)', background: 'var(--c-card)',
                fontFamily: 'var(--font)', fontSize: 14, color: 'var(--c-text)',
                outline: 'none', boxSizing: 'border-box',
                boxShadow: '0 0 0 3px rgba(1,55,61,.07)',
              }}
            />
          </div>
        )}

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Resultado (opcional)</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button onClick={() => go && go('laudo-ocr')} style={{
              flex: 1, padding: '11px 14px', borderRadius: 14,
              background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700,
            }}>
              <IconCamera size={16}/> Foto com IA
            </button>
            <button onClick={() => setHasDoc(d => !d)} style={{
              flex: 1, padding: '11px 14px', borderRadius: 14,
              background: 'var(--c-surface)', color: 'var(--c-text)',
              border: '1px solid var(--c-line)', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600,
            }}>
              <IconShare size={16}/> Upload
            </button>
          </div>
          <button onClick={() => setHasDoc(d => !d)} style={{
            width: '100%', padding: '14px 16px', borderRadius: 16,
            background: hasDoc ? 'var(--c-success-soft)' : 'transparent',
            border: '1.5px dashed ' + (hasDoc ? 'var(--c-success)' : 'var(--c-line-strong)'),
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={hasDoc ? 'var(--c-success)' : 'var(--c-accent)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: hasDoc ? 'var(--c-success)' : 'var(--c-text)' }}>
              {hasDoc ? 'Laudo anexado ✓' : 'Anexar laudo ou resultado'}
            </span>
          </button>
        </div>

        <Button variant="primary" full size="lg" onClick={handleSave}
          style={{ background: saved ? 'var(--c-success)' : undefined }}>
          {saved ? '✓ Exame salvo!' : 'Salvar exame'}
        </Button>
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 6. NOTIFICAÇÕES
// ════════════════════════════════════════════════════════════
function NotificacoesScreen({ go }) {
  const [push, setPush] = useSM(true);
  const [whatsapp, setWhatsapp] = useSM(true);
  const [antecedencia, setAntecedencia] = useSM('15min');
  const [estoque, setEstoque] = useSM('5dias');
  const [consultaAlert, setConsultaAlert] = useSM(true);
  const [saved, setSaved] = useSM(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => { setSaved(false); go && go('settings'); }, 1200);
  }

  return (
    <Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('settings')}><IconArrowL size={20}/></IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Notificações</div>
        <div style={{ width: 36 }}/>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Canais</div>
          <div style={{ background: 'var(--c-card)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            <NToggleRow icon={<IconBell size={18}/>} label="Notificações push" sub="Alertas direto no celular" value={push} onChange={setPush}/>
            <NToggleRow icon={<IconWhatsApp size={18}/>} label="WhatsApp" sub="Mensagens para lembrar doses" value={whatsapp} onChange={setWhatsapp}/>
          </div>
        </div>

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Lembrar antes da dose</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[['Na hora','agora'],['5 min','5min'],['15 min','15min'],['30 min','30min'],['1 hora','1h']].map(([l, v]) => (
              <button key={v} onClick={() => setAntecedencia(v)} style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                background: antecedencia === v ? 'var(--c-accent)' : 'var(--c-surface)',
                color: antecedencia === v ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Avisar estoque baixo com</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[['3 dias','3d'],['5 dias','5dias'],['7 dias','7d'],['10 dias','10d']].map(([l, v]) => (
              <button key={v} onClick={() => setEstoque(v)} style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                background: estoque === v ? 'var(--c-accent)' : 'var(--c-surface)',
                color: estoque === v ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Outros lembretes</div>
          <div style={{ background: 'var(--c-card)', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            <NToggleRow icon={<IconCalendar size={18}/>} label="Lembretes de consulta" sub="1 dia e 1 hora antes" value={consultaAlert} onChange={setConsultaAlert}/>
          </div>
        </div>

        <Button variant="primary" full size="lg" onClick={handleSave}
          style={{ background: saved ? 'var(--c-success)' : undefined }}>
          {saved ? '✓ Preferências salvas!' : 'Salvar preferências'}
        </Button>
      </div>
    </Screen>
  );
}

function NToggleRow({ icon, label, sub, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--c-surface)', color: 'var(--c-accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 1 }}>{sub}</div>
      </div>
      <button onClick={() => onChange(!value)} style={{
        width: 44, height: 26, borderRadius: 999, position: 'relative',
        background: value ? 'var(--c-accent)' : 'var(--c-line-strong)',
        border: 'none', cursor: 'pointer', flexShrink: 0,
        transition: 'background .2s ease',
      }}>
        <div style={{
          position: 'absolute', top: 3, left: value ? 21 : 3,
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          transition: 'left .2s ease',
          boxShadow: '0 1px 4px rgba(38,37,37,.2)',
        }}/>
      </button>
    </div>
  );
}

export {
  VacinasScreen, LoginScreen, EditProfileScreen,
  AgendarConsultaScreen, AddExameScreen, NotificacoesScreen,
  VACINAS_DATA,
};
