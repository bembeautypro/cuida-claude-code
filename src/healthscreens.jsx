// Cuida — Health detail screens
// MedDetailScreen, ConsultaDetailScreen, ResumoSaudeScreen,
// HistoricoMedicoScreen, ExamesFullScreen, HomeV3Screen

import React, { useState as useSH, useEffect as useEH } from 'react';
import { useAuth } from './lib/AuthContext.jsx';
import { usePatient } from './lib/PatientContext.jsx';
import { useTodayDoses } from './lib/hooks/useMedications.js';
import { useAppointments } from './lib/hooks/useAppointments.js';
import { CUIDA_DATA } from './data.jsx';
import { CONSULTAS } from './newscreens.jsx';
import { AnimatedMedRow, AllDoneCelebration } from './micro.jsx';
import { ProfilePicker } from './screens.jsx';
import { Screen, IconButton, ViewToggle, Button, Avatar, Bar, SoftCard, Card, Dot } from './ui.jsx';
import {
  IconArrowL, IconMoreV, IconClock, IconCamera, IconPlus, IconCheck,
  IconCalendar, IconInfo, IconShare, IconAlert, IconShield, IconPhone,
  IconChevR, IconBell, IconHeart, IconSearch,
} from './icons.jsx';

// ────────────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────────────
const MED_ORIENTACOES = {
  m1: ['Tomar com bastante água', 'Não interromper sem orientação médica', 'Evitar bebida alcoólica', 'Monitorar pressão arterial semanalmente'],
  m2: ['Tomar após o café da manhã', 'Mastigar antes de engolir', 'Armazenar em local fresco e seco'],
  m3: ['Evitar exposição solar prolongada', 'Tomar preferencialmente à noite', 'Verificar colesterol a cada 6 meses'],
  m4: ['Tomar após refeição para evitar ardor estomacal', 'Não usar se houver alergia a AAS'],
};

const HISTORICO_MEDICO = [
  { year: 2024, events: [
    { id: 'h1', type: 'diagnostico', title: 'Hipertensão arterial', detail: 'Dr. Ricardo Andrade · Cardiologia', date: 'Mar 2024', color: 'rgb(252, 224, 213)', fg: 'var(--c-alert)' },
    { id: 'h2', type: 'exame',       title: 'Ecocardiograma', detail: 'Resultado: normal, função preservada', date: 'Abr 2024', color: 'rgb(212, 232, 230)', fg: 'var(--c-accent)' },
  ]},
  { year: 2022, events: [
    { id: 'h3', type: 'cirurgia',    title: 'Colecistectomia laparoscópica', detail: 'Hospital São Luiz · Dra. Paula Figueiredo', date: 'Jun 2022', color: 'rgb(232, 220, 240)', fg: 'rgb(82,36,88)' },
  ]},
  { year: 2019, events: [
    { id: 'h4', type: 'diagnostico', title: 'Diabetes tipo 2', detail: 'Dr. Carlos Figueiredo · Endocrinologia', date: 'Set 2019', color: 'rgb(254, 220, 195)', fg: 'rgb(122,60,38)' },
    { id: 'h5', type: 'internacao',  title: 'Internação 4 dias — pneumonia', detail: 'Hospital São Camilo · recuperação completa', date: 'Nov 2019', color: 'rgb(218, 235, 222)', fg: 'var(--c-success)' },
  ]},
  { year: 2015, events: [
    { id: 'h6', type: 'tratamento',  title: 'Fisioterapia — coluna lombar', detail: '12 sessões · alta sem dores residuais', date: 'Mar 2015', color: 'rgb(230, 230, 218)', fg: 'rgb(60,60,40)' },
  ]},
];

const EXAMES_FULL = [
  // Atrasados
  { id: 'ea1', name: 'Eletrocardiograma',     person: 'Maria', dueDate: '05 de mai. · 09:00', daysLate: 10, status: 'atrasado',  color: 'rgb(252, 224, 213)' },
  // Pendentes
  { id: 'ep1', name: 'Hemograma completo',    person: 'Maria', dueDate: '20 de mai. · 08:00', daysAway: 3,  status: 'pendente',  color: 'rgb(212, 232, 230)', prep: 'Jejum 8h' },
  { id: 'ep2', name: 'Glicemia em jejum',     person: 'Maria', dueDate: '25 de mai. · 07:30', daysAway: 8,  status: 'pendente',  color: 'rgb(254, 220, 195)', prep: 'Jejum 12h' },
  // Realizados
  { id: 'er1', name: 'Colesterol total',      person: 'Maria', date: '10 de abr.', status: 'laudo',     color: 'rgb(218, 235, 222)', result: 'LDL 98 · HDL 54 · TG 130' },
  { id: 'er2', name: 'TSH',                   person: 'Maria', date: '02 de abr.', status: 'aguardando', color: 'rgb(254, 220, 195)' },
  { id: 'er3', name: 'Vitamina D',            person: 'Maria', date: '15 de mar.', status: 'laudo',     color: 'rgb(232, 220, 240)', result: '28 ng/mL · Normal' },
  { id: 'er4', name: 'HbA1c',                 person: 'Maria', date: '15 de mar.', status: 'laudo',     color: 'rgb(212, 232, 230)', result: '6.4% · Bom controle' },
];

// ────────────────────────────────────────────────────────────
// TYPE BADGE
// ────────────────────────────────────────────────────────────
const HIST_LABELS = { diagnostico:'Diagnóstico', cirurgia:'Cirurgia', internacao:'Internação', exame:'Exame', tratamento:'Tratamento' };

function TypeBadge({ type }) {
  const colors = { diagnostico: ['var(--c-alert-soft)', 'var(--c-alert)'], cirurgia: ['rgb(232,220,240)', 'rgb(82,36,88)'], internacao: ['var(--c-warn-soft)', 'var(--c-warn)'], exame: ['var(--c-accent-soft)', 'var(--c-accent)'], tratamento: ['var(--c-success-soft)', 'var(--c-success)'] };
  const [bg, fg] = colors[type] || ['var(--c-surface)', 'var(--c-text)'];
  return <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: bg, color: fg, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{HIST_LABELS[type] || type}</span>;
}

// ────────────────────────────────────────────────────────────
// 1. MED DETAIL SCREEN
// ────────────────────────────────────────────────────────────
function MedDetailScreen({ go, medId = 'm1' }) {
  const meds = CUIDA_DATA.MEDS_MARIA;
  const med = meds.find(m => m.id === medId) || meds[0];
  const [times, setTimes] = useSH(['07:00', '13:00']);
  const [receita, setReceita] = useSH(true);
  const [showReceita, setShowReceita] = useSH(false);
  const orientacoes = MED_ORIENTACOES[med.id] || MED_ORIENTACOES.m1;
  const PRESETS = ['07:00', '09:00', '12:00', '13:00', '18:00', '20:00', '22:00'];

  return (
    <Screen>
      {/* Header */}
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('meds-v2')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36}><IconMoreV size={18}/></IconButton>
      </div>

      {/* Box image — large placeholder */}
      <div style={{ padding: '10px 20px 0' }}>
        <div style={{
          borderRadius: 22, overflow: 'hidden', height: 180,
          background: med.color, position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {/* Subtle stripe texture */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 14px)' }}/>
          <div style={{ fontSize: 44, position: 'relative' }}>{med.icon}</div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(38,37,37,.55)', position: 'relative' }}>Imagem da caixa</div>
          {/* Camera button */}
          <button style={{
            position: 'absolute', bottom: 12, right: 12,
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,.85)', border: 'none', cursor: 'pointer',
            display: 'grid', placeItems: 'center', color: 'var(--c-accent)',
          }}><IconCamera size={18}/></button>
        </div>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        {/* Name + dose */}
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>{med.name}</div>
        <div style={{ fontSize: 15, color: 'var(--c-text-soft)', marginTop: 3 }}>{med.dose} · {med.schedule} · Maria</div>

        {/* Multiple time slots */}
        <div style={{ marginTop: 20 }}>
          <div className="cu-eyebrow" style={{ marginBottom: 10 }}>Horários</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {times.map(t => (
              <div key={t} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 999,
                background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
                fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
              }}>
                <IconClock size={14}/>
                {t}
                <button onClick={() => setTimes(p => p.filter(x => x !== t))} style={{
                  background: 'rgba(254,243,225,.2)', border: 'none', borderRadius: '50%',
                  width: 18, height: 18, cursor: 'pointer', color: 'var(--c-accent-fg)',
                  display: 'grid', placeItems: 'center', padding: 0,
                }}>×</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PRESETS.filter(t => !times.includes(t)).map(t => (
              <button key={t} onClick={() => setTimes(p => [...p, t].sort())} style={{
                padding: '6px 12px', borderRadius: 999,
                background: 'transparent', border: '1px solid var(--c-line)',
                fontSize: 12, fontWeight: 600, color: 'var(--c-text-soft)', cursor: 'pointer', fontFamily: 'inherit',
              }}>+ {t}</button>
            ))}
          </div>
        </div>

        {/* Receita */}
        <div style={{ marginTop: 20 }}>
          <div className="cu-eyebrow" style={{ marginBottom: 10 }}>Receita médica</div>
          {receita ? (
            <div style={{
              background: 'var(--c-success-soft)', borderRadius: 16, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'var(--c-success)', color: '#fff', display: 'grid', placeItems: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-success)' }}>Receita em anexo</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 2 }}>Dr. Ricardo Andrade · válida até dez/2025</div>
              </div>
              <button onClick={() => setShowReceita(p => !p)} style={{
                background: 'var(--c-success)', color: '#fff', border: 'none',
                padding: '7px 12px', borderRadius: 10, fontSize: 11, fontWeight: 600, cursor: 'pointer',
              }}>Ver</button>
            </div>
          ) : (
            <button onClick={() => setReceita(true)} style={{
              width: '100%', padding: 14, borderRadius: 16,
              background: 'transparent', border: '1.5px dashed var(--c-line-strong)',
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <IconCamera size={20} style={{ color: 'var(--c-accent)' }}/>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Anexar receita</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 1 }}>Foto ou PDF da receita médica</div>
              </div>
            </button>
          )}

          {/* Receita preview */}
          {showReceita && (
            <div style={{
              marginTop: 10, borderRadius: 14, overflow: 'hidden',
              background: '#fffdf8', border: '1px solid var(--c-line)',
              padding: 16,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)', marginBottom: 10 }}>Receita médica</div>
              <div style={{ fontSize: 11, lineHeight: 1.6, color: 'var(--c-text-soft)', fontFamily: 'ui-monospace, Menlo, monospace' }}>
                Paciente: Maria Almeida<br/>
                Medicamento: {med.name} {med.dose}<br/>
                Posologia: {times.join(' · ')} — {med.schedule}<br/>
                Médico: Dr. Ricardo Andrade<br/>
                CRM: 12345<br/>
                Data: 10/01/2025
              </div>
            </div>
          )}
        </div>

        {/* Orientações */}
        <div style={{ marginTop: 20 }}>
          <div className="cu-eyebrow" style={{ marginBottom: 10 }}>Orientações do médico</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {orientacoes.map((o, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: 12, borderRadius: 12, background: 'var(--c-surface)',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                  background: 'var(--c-accent-soft)', color: 'var(--c-accent)',
                  display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700,
                }}>{i + 1}</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, flex: 1 }}>{o}</div>
              </div>
            ))}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
              background: 'transparent', border: '1px dashed var(--c-line-strong)',
              borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--c-text-soft)',
              fontSize: 12, fontWeight: 600,
            }}>
              <IconPlus size={16}/> Adicionar orientação
            </button>
          </div>
        </div>

        {/* Stock */}
        <div style={{ marginTop: 20, padding: 16, borderRadius: 16, background: 'var(--c-card)', border: '1px solid var(--c-line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Estoque</span>
            <span style={{ fontSize: 13, color: med.alert ? 'var(--c-alert)' : 'var(--c-text-soft)', fontWeight: 600 }}>{med.stock} cps · {med.stock} dias</span>
          </div>
          <Bar value={med.stock} max={med.stockMax} color={med.alert ? 'var(--c-alert)' : 'var(--c-accent)'}/>
          {med.alert && <div style={{ fontSize: 11, color: 'var(--c-alert)', marginTop: 6, fontWeight: 600 }}>⚠ Estoque baixo — comprar em breve</div>}
        </div>

        {/* Mini adherence */}
        <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 14, background: 'var(--c-surface)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Adesão — últimos 7 dias</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['S','T','Q','Q','S','S','D'].map((d, i) => {
              const ok = i < 6;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: ok ? 'var(--c-success)' : 'var(--c-line)', display: 'grid', placeItems: 'center' }}>
                    {ok && <IconCheck size={14} stroke={2.5} style={{ color: '#fff' }}/>}
                  </div>
                  <span style={{ fontSize: 9, color: 'var(--c-text-muted)', fontWeight: 600 }}>{d}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────────
// 2. CONSULTA DETAIL SCREEN
// ────────────────────────────────────────────────────────────
function ConsultaDetailScreen({ go }) {
  const consult = CONSULTAS[0];
  const [notes, setNotes] = useSH('');
  const [prepChecked, setPrepChecked] = useSH({});
  const [tab, setTab] = useSH('detalhe');

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('consultas')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36}><IconShare size={18}/></IconButton>
      </div>

      {/* Hero */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ background: consult.color, borderRadius: 22, padding: 22 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center', minWidth: 60 }}>
              <IconCalendar size={20} style={{ color: consult.fg, margin: '0 auto 4px' }}/>
              <div style={{ fontSize: 36, fontWeight: 700, color: consult.fg, lineHeight: 1, letterSpacing: '-0.02em' }}>{consult.day}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: consult.fg }}>{consult.month}</div>
              <div style={{ fontSize: 10, color: consult.fg, opacity: .65 }}>{consult.weekday} {consult.time}</div>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, background: 'var(--c-success-soft)', color: 'var(--c-success)' }}>em {consult.daysAway} dias</span>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8, letterSpacing: '-0.01em', color: consult.fg }}>{consult.esp}</div>
              <div style={{ fontSize: 13, color: consult.fg, opacity: .75, marginTop: 2 }}>{consult.med}</div>
              <div style={{ fontSize: 11, color: consult.fg, opacity: .55, marginTop: 1 }}>{consult.crm}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: consult.fg, opacity: .7 }}>
                <IconSearch size={12}/> {consult.local}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab toggle */}
      <div style={{ padding: '14px 20px 14px' }}>
        <ViewToggle value={tab} onChange={setTab} options={[
          { value: 'detalhe',  label: 'Preparação' },
          { value: 'anotacoes',label: 'Anotações' },
          { value: 'historico',label: 'Histórico' },
        ]} style={{ width: '100%' }}/>
      </div>

      {/* Preparação */}
      {tab === 'detalhe' && (
        <div style={{ padding: '0 20px' }}>

          {/* Responsável */}
          <div style={{ marginBottom: 16, padding: 14, borderRadius: 16, background: 'var(--c-card)', border: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name="Carla Almeida" color="rgb(218,235,222)" fg="var(--c-text)" size={36}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-text-muted)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 2 }}>Responsável</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Carla Almeida</div>
            </div>
            <button onClick={() => go && go('acompanhante')} style={{ background: 'var(--c-surface)', border: '1px solid var(--c-line)', padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Trocar</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {consult.prep.map((item, i) => {
              const checked = prepChecked[i];
              return (
                <button key={i} onClick={() => setPrepChecked(p => ({ ...p, [i]: !p[i] }))} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  borderRadius: 14, background: checked ? 'var(--c-success-soft)' : 'var(--c-card)',
                  border: '1px solid ' + (checked ? 'var(--c-success)' : 'var(--c-line)'),
                  cursor: 'pointer', fontFamily: 'inherit', width: '100%', textAlign: 'left',
                  transition: 'all .2s ease',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    border: '2px solid ' + (checked ? 'var(--c-success)' : 'var(--c-line-strong)'),
                    background: checked ? 'var(--c-success)' : 'transparent',
                    display: 'grid', placeItems: 'center', color: '#fff', transition: 'all .2s',
                  }}>{checked && <IconCheck size={13} stroke={2.5}/>}</div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: checked ? 'var(--c-success)' : 'var(--c-text)', textDecoration: checked ? 'line-through' : 'none' }}>{item}</span>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Button variant="outline" full icon={<IconCalendar size={16}/>}>Adicionar ao calendário</Button>
          </div>
          <div style={{ marginTop: 10, padding: 14, borderRadius: 14, background: 'var(--c-surface)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <IconInfo size={18} style={{ color: 'var(--c-accent)', marginTop: 1, flexShrink: 0 }}/>
            <div style={{ fontSize: 12, color: 'var(--c-text-soft)', lineHeight: 1.5 }}>Chegar 15 minutos antes. Trazer carteirinha, RG e exames recentes.</div>
          </div>
        </div>
      )}

      {/* Anotações */}
      {tab === 'anotacoes' && (
        <div style={{ padding: '0 20px' }}>
          <div className="cu-eyebrow" style={{ marginBottom: 10 }}>Observações desta consulta</div>
          <textarea
            placeholder="Anote sintomas, perguntas pra fazer ao médico, orientações recebidas..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            style={{
              width: '100%', minHeight: 160, padding: '14px 16px',
              borderRadius: 14, border: '1.5px solid var(--c-line)',
              background: 'var(--c-card)', fontFamily: 'var(--font-body)',
              fontSize: 14, lineHeight: 1.55, color: 'var(--c-text)',
              resize: 'vertical', outline: 'none', boxSizing: 'border-box',
            }}
          />
          <Button variant="primary" full size="md" style={{ marginTop: 10 }}
            icon={<IconCheck size={16}/>}>Salvar anotação</Button>
        </div>
      )}

      {/* Histórico */}
      {tab === 'historico' && (
        <div style={{ padding: '0 20px' }}>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Consultas anteriores — {CONSULTAS[0].esp}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { date: '15 de jan. 2025', detail: 'Pressão controlada. Manteve Losartana 50mg.', dr: 'Dr. Ricardo Andrade' },
              { date: '20 de jul. 2024', detail: 'Ajuste de dosagem. Adicionou AAS 100mg.', dr: 'Dr. Ricardo Andrade' },
              { date: '10 de mar. 2024', detail: 'Diagnóstico de hipertensão grau 1. Iniciou tratamento.', dr: 'Dr. Ricardo Andrade' },
            ].map((c, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 16, background: 'var(--c-card)', border: '1px solid var(--c-line)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.date}</div>
                  <div style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>{c.dr}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--c-text-soft)', lineHeight: 1.45 }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Screen>
  );
}

// ────────────────────────────────────────────────────────────
// 3. RESUMO DE SAÚDE
// ────────────────────────────────────────────────────────────
function ResumoSaudeScreen({ go }) {
  const p = CUIDA_DATA.PROFILES[0];
  const [editing, setEditing] = useSH(false);
  const [conditions, setConditions] = useSH(['Hipertensão arterial grau 1', 'Diabetes tipo 2']);
  const [allergies, setAllergies] = useSH([...p.allergies]);
  const [vitals, setVitals] = useSH({ weight: '68 kg', height: '1,62', plano: p.plano, emergencia: p.emergencia });

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('prontuarios')}><IconArrowL size={20}/></IconButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setEditing(e => !e)} style={{ border: 'none', cursor: 'pointer', color: 'var(--c-accent)', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', padding: '6px 12px', borderRadius: 999, background: editing ? 'var(--c-success)' : 'var(--c-accent-soft)' }}>
            <span style={{ color: editing ? '#fff' : 'var(--c-accent)' }}>{editing ? 'Salvar' : 'Editar'}</span>
          </button>
          <IconButton variant="soft" size={36}><IconShare size={18}/></IconButton>
        </div>
      </div>
      <div style={{ padding: '6px 20px 16px' }}>
        <div className="cu-h1" style={{ fontSize: 28 }}>Resumo de saúde</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Condições, alergias, medicamentos e informações principais</div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Identity */}
        <SoftCard background={p.color} padding={18} radius={20}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar name={p.name} color="rgba(255,255,255,.5)" fg={p.fg} size={52}/>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: p.fg }}>{p.name}</div>
              <div style={{ fontSize: 13, color: p.fg, opacity: .7, marginTop: 2 }}>{p.age} anos · Sangue {p.bloodType} · {p.relation}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {[['Sangue', p.bloodType], ['Idade', p.age + 'a'], ['Peso', '68 kg'], ['Altura', '1,62']].map(([l, v]) => (
              <div key={l} style={{ flex: 1, background: 'rgba(255,255,255,.35)', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: p.fg }}>{v}</div>
                <div style={{ fontSize: 9, opacity: .6, marginTop: 2, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </SoftCard>

        {/* Condições */}
        <Card padding={16} radius={18} shadow={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Condições crônicas</div>
            {editing && <IconButton variant="plain" size={28} onClick={() => setConditions(c => [...c, 'Nova condição'])}><IconPlus size={16}/></IconButton>}
          </div>
          {conditions.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid var(--c-line)' : 'none' }}>
              <Dot color="var(--c-alert)" size={8}/>
              {editing ? (
                <input value={c} onChange={e => setConditions(prev => prev.map((x,j) => j===i ? e.target.value : x))}
                  style={{ flex: 1, fontSize: 13, border: 'none', borderBottom: '1px solid var(--c-line)', background: 'transparent', fontFamily: 'var(--font)', outline: 'none', padding: '2px 0' }}/>
              ) : <span style={{ fontSize: 13 }}>{c}</span>}
              {editing && <button onClick={() => setConditions(prev => prev.filter((_,j) => j!==i))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--c-alert)', fontSize: 14, padding: 0 }}>×</button>}
            </div>
          ))}
        </Card>

        {/* Alergias */}
        <Card padding={16} radius={18} shadow={false} style={{ border: '1px solid rgba(170,60,38,.2)', background: 'var(--c-alert-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <IconAlert size={18} style={{ color: 'var(--c-alert)' }}/>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-alert)' }}>Alergias</div>
            </div>
            {editing && <IconButton variant="plain" size={24} onClick={() => setAllergies(a => [...a, 'Nova alergia'])}><IconPlus size={14}/></IconButton>}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {allergies.map((a, i) => (
              editing ? (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, padding: '5px 10px', borderRadius: 999, background: 'var(--c-alert)', color: '#fff' }}>
                  <input value={a} onChange={e => setAllergies(prev => prev.map((x,j) => j===i ? e.target.value : x))}
                    style={{ background: 'transparent', border: 'none', color: '#fff', fontFamily: 'var(--font)', fontSize: 13, fontWeight: 600, width: Math.max(60, a.length * 8), outline: 'none' }}/>
                  <button onClick={() => setAllergies(prev => prev.filter((_,j)=>j!==i))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, fontSize: 14, lineHeight: 1 }}>×</button>
                </span>
              ) : (
                <span key={a} style={{ fontSize: 13, fontWeight: 600, padding: '5px 12px', borderRadius: 999, background: 'var(--c-alert)', color: '#fff' }}>{a}</span>
              )
            ))}
          </div>
        </Card>

        {/* Medicamentos */}
        <Card padding={16} radius={18} shadow={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Medicamentos em uso</div>
            <span style={{ fontSize: 11, color: 'var(--c-accent)', fontWeight: 600 }}>4 ativos</span>
          </div>
          {CUIDA_DATA.MEDS_MARIA.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: '1px solid var(--c-line)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: m.color, display: 'grid', placeItems: 'center', fontSize: 14 }}>{m.icon}</div>
              <span style={{ fontSize: 13 }}>{m.name} {m.dose}</span>
              <span style={{ fontSize: 11, color: 'var(--c-text-muted)', marginLeft: 'auto' }}>{m.time.split('· ')[1]}</span>
            </div>
          ))}
        </Card>

        {/* Plano + contato */}
        <Card padding={16} radius={18} shadow={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Plano de saúde', p.plano, <IconShield size={16}/>],
              ['Contato de emergência', p.emergencia, <IconPhone size={16}/>],
            ].map(([label, val, icon]) => (
              <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--c-accent)', marginTop: 1 }}>{icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--c-text-muted)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontSize: 13, marginTop: 2 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────────
// 4. HISTÓRICO MÉDICO
// ────────────────────────────────────────────────────────────
function HistoricoMedicoScreen({ go }) {
  const [showAdd, setShowAdd] = useSH(false);
  const [newEntry, setNewEntry] = useSH({ type: 'diagnostico', title: '', detail: '', date: '' });
  const [extraEvents, setExtraEvents] = useSH([]);

  function saveEntry() {
    if (!newEntry.title.trim()) return;
    setExtraEvents(prev => [{ id: `ne${Date.now()}`, ...newEntry, color: 'rgb(212,232,230)', fg: 'var(--c-accent)' }, ...prev]);
    setNewEntry({ type: 'diagnostico', title: '', detail: '', date: '' });
    setShowAdd(false);
  }

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('prontuarios')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36} onClick={() => setShowAdd(true)}><IconPlus size={18}/></IconButton>
      </div>
      <div style={{ padding: '6px 20px 16px' }}>
        <div className="cu-h1" style={{ fontSize: 28 }}>Histórico médico</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Doenças, cirurgias, internações e tratamentos</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {extraEvents.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-accent)', padding: '4px 12px', borderRadius: 999, background: 'var(--c-accent-soft)' }}>2026</div>
              <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {extraEvents.map(e => (
                <div key={e.id} style={{ display: 'flex', gap: 14, padding: 16, borderRadius: 18, background: 'var(--c-card)', border: '1px solid var(--c-line)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: e.color, border: '2px solid ' + e.fg, flexShrink: 0 }}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <TypeBadge type={e.type}/>
                      <span style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>{e.date}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{e.title}</div>
                    {e.detail && <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 3, lineHeight: 1.4 }}>{e.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {HISTORICO_MEDICO.map((group, gi) => (
          <div key={group.year} style={{ marginBottom: 24 }}>
            {/* Year marker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: 'var(--c-accent)',
                padding: '4px 12px', borderRadius: 999,
                background: 'var(--c-accent-soft)',
              }}>{group.year}</div>
              <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }}/>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.events.map((e, ei) => (
                <div key={e.id} style={{
                  display: 'flex', gap: 14, padding: 16, borderRadius: 18,
                  background: 'var(--c-card)', border: '1px solid var(--c-line)',
                  position: 'relative',
                }}>
                  {/* Timeline dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%', background: e.color, flexShrink: 0,
                      border: '2px solid ' + e.fg,
                    }}/>
                    {ei < group.events.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--c-line)', marginTop: 6 }}/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <TypeBadge type={e.type}/>
                      <span style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>{e.date}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{e.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 3, lineHeight: 1.4 }}>{e.detail}</div>
                  </div>
                  <IconChevR size={16} style={{ color: 'var(--c-text-muted)', alignSelf: 'center' }}/>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button variant="outline" full icon={<IconPlus size={16}/>} style={{ marginTop: 4 }} onClick={() => setShowAdd(true)}>
          Adicionar registro
        </Button>
      </div>

      {/* Add entry modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(4px)' }} onClick={() => setShowAdd(false)}/>
          <div style={{ position: 'relative', background: 'var(--c-bg)', borderRadius: '24px 24px 0 0', padding: '20px 20px 40px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--c-line-strong)', margin: '0 auto 18px' }}/>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>Novo registro</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div className="cu-eyebrow" style={{ padding: '0 4px 8px' }}>Tipo</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['diagnostico','cirurgia','internacao','exame','tratamento'].map(t => (
                    <button key={t} onClick={() => setNewEntry(p => ({ ...p, type: t }))} style={{
                      padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                      background: newEntry.type === t ? 'var(--c-accent)' : 'var(--c-surface)',
                      color: newEntry.type === t ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              {[['Título', 'title', 'Ex: Diagnóstico de hipertensão'], ['Detalhe', 'detail', 'Médico, local, resultado…'], ['Data', 'date', 'Ex: Jun 2026']].map(([l, f, ph]) => (
                <div key={f}>
                  <div className="cu-eyebrow" style={{ padding: '0 4px 6px' }}>{l}</div>
                  <input value={newEntry[f]} onChange={e => setNewEntry(p => ({ ...p, [f]: e.target.value }))}
                    placeholder={ph} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--c-line)', background: 'var(--c-card)', fontFamily: 'var(--font)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}/>
                </div>
              ))}
              <Button variant="primary" full size="lg" onClick={saveEntry}
                style={{ opacity: newEntry.title.trim() ? 1 : .5, marginTop: 4 }}>
                Salvar registro
              </Button>
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
}

// ────────────────────────────────────────────────────────────
// 5. EXAMES FULL (atrasado / pendente / realizado)
// ────────────────────────────────────────────────────────────
function ExamesFullScreen({ go }) {
  const [tab, setTab] = useSH('todos');
  const atrasados = EXAMES_FULL.filter(e => e.status === 'atrasado');
  const pendentes = EXAMES_FULL.filter(e => e.status === 'pendente');
  const realizados = EXAMES_FULL.filter(e => e.status !== 'pendente' && e.status !== 'atrasado');

  const shown = tab === 'pendentes' ? [...atrasados, ...pendentes] :
                tab === 'realizados' ? realizados : null;

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('exames')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36} onClick={() => go && go('add-exame')}><IconPlus size={18}/></IconButton>
      </div>
      <div style={{ padding: '6px 20px 4px' }}>
        <div className="cu-h1" style={{ fontSize: 28 }}>Exames</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Resultados e histórico completo.</div>
      </div>

      <div style={{ padding: '10px 20px 14px' }}>
        <ViewToggle value={tab} onChange={setTab} options={[
          { value: 'todos',     label: 'Todos' },
          { value: 'pendentes', label: 'Pendentes' },
          { value: 'realizados',label: 'Realizados' },
        ]} style={{ width: '100%' }}/>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Atrasados — always visible in todos and pendentes */}
        {(tab === 'todos' || tab === 'pendentes') && atrasados.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="cu-eyebrow" style={{ padding: '0 4px 10px', color: 'var(--c-alert)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Dot color="var(--c-alert)" size={7}/> Atrasados
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {atrasados.map(e => (
                <div key={e.id} style={{
                  padding: 14, borderRadius: 16,
                  background: 'var(--c-alert-soft)', border: '1px solid rgba(170,60,38,.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: e.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <IconAlert size={18} style={{ color: 'var(--c-alert)' }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--c-alert)', marginTop: 2, fontWeight: 600 }}>Atrasado {e.daysLate} dias · era {e.dueDate}</div>
                    </div>
                    <Button variant="danger" size="sm">Remarcar</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pendentes */}
        {(tab === 'todos' || tab === 'pendentes') && pendentes.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="cu-eyebrow" style={{ padding: '0 4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Dot color="var(--c-warn)" size={7}/> Próximos exames
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pendentes.map(e => (
                <div key={e.id} style={{ display: 'flex', gap: 12, padding: 14, borderRadius: 16, background: 'var(--c-card)', border: '1px solid var(--c-line)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: e.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <IconClock size={18} style={{ color: 'var(--c-warn)' }}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3, fontSize: 11, color: 'var(--c-text-soft)' }}>
                      <IconCalendar size={11}/> {e.dueDate}
                    </div>
                    {e.prep && <div style={{ fontSize: 11, color: 'var(--c-warn)', fontWeight: 600, marginTop: 2 }}>⚠ {e.prep}</div>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'var(--c-warn-soft)', color: 'var(--c-warn)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Pendente</span>
                    <span style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>em {e.daysAway} dias</span>
                  </div>
                  <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Realizados */}
        {(tab === 'todos' || tab === 'realizados') && (
          <div>
            <div className="cu-eyebrow" style={{ padding: '0 4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Dot color="var(--c-success)" size={7}/> Realizados
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {realizados.map((e, i) => (
                <div key={e.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px',
                  borderBottom: i < realizados.length - 1 ? '1px solid var(--c-line)' : 'none',
                }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: e.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    {e.status === 'laudo' ? <IconCheck size={18} style={{ color: 'var(--c-success)' }}/> : <IconClock size={18} style={{ color: 'var(--c-warn)' }}/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 1 }}>{e.date}</div>
                    {e.result && <div style={{ fontSize: 11, color: 'var(--c-success)', fontWeight: 600, marginTop: 2 }}>{e.result}</div>}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: e.status === 'laudo' ? 'var(--c-success-soft)' : 'var(--c-warn-soft)', color: e.status === 'laudo' ? 'var(--c-success)' : 'var(--c-warn)', textTransform: 'uppercase', letterSpacing: '.04em', flexShrink: 0 }}>
                    {e.status === 'laudo' ? 'Laudo pronto' : 'Aguardando'}
                  </span>
                  <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}

// ────────────────────────────────────────────────────────────
// 6. HOME V3 — Dashboard de saúde completo
// ────────────────────────────────────────────────────────────
// Color palette for medication cards (deterministic by index)
const MED_PALETTE = [
  { bg: 'rgb(254,220,195)', fg: 'rgb(122,60,38)' },
  { bg: 'rgb(212,232,230)', fg: 'rgb(1,55,61)' },
  { bg: 'rgb(218,235,222)', fg: 'rgb(27,77,44)' },
  { bg: 'rgb(232,220,240)', fg: 'rgb(82,36,88)' },
  { bg: 'rgb(207,222,240)', fg: 'rgb(28,51,92)' },
];

function mapDoseToMed(dose, idx) {
  const c = MED_PALETTE[idx % MED_PALETTE.length];
  const dt = new Date(dose.scheduled_at);
  const h = dt.getHours();
  const period = h < 12 ? 'Manhã' : h < 18 ? 'Tarde' : 'Noite';
  const timeStr = dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return {
    id: dose.id,
    name: dose.medications?.name ?? '—',
    dose: `${dose.medications?.dose ?? ''}${dose.medications?.unit ?? ''}`,
    time: `${period} · ${timeStr}`,
    taken: dose.status === 'taken',
    color: c.bg,
    icon: '💊',
  };
}

function HomeV3Screen({ go }) {
  const { user } = useAuth();
  const { patients: rawPatients, currentPatientId, setCurrentPatientId } = usePatient();
  const { doses: rawDoses, confirm: confirmDoseHook, loading: dosesLoading } = useTodayDoses(currentPatientId);
  const { upcoming } = useAppointments(currentPatientId);

  const [view, setView] = useSH('timeline');
  const [allDoneShown, setAllDoneShown] = useSH(false);
  const [localTaken, setLocalTaken] = useSH({});

  // If no real patients yet, fall back to mock for design-canvas artboards
  const usingMock = rawPatients.length === 0;
  const profiles = usingMock
    ? CUIDA_DATA.PROFILES
    : rawPatients.map(p => ({ id: p.id, name: p.name, color: p.avatar_color ?? 'rgb(212,232,230)', fg: p.avatar_fg ?? 'rgb(1,55,61)' }));

  const activeId = currentPatientId ?? profiles[0]?.id;
  const setActiveId = (id) => setCurrentPatientId(id);

  const meds = usingMock
    ? (activeId === 'joao' ? CUIDA_DATA.MEDS_JOAO : CUIDA_DATA.MEDS_MARIA)
    : rawDoses.map(mapDoseToMed);

  const isTaken = (m) => localTaken[m.id] !== undefined ? localTaken[m.id] : m.taken;

  const toggle = async (m) => {
    const next = !isTaken(m);
    setLocalTaken(prev => ({ ...prev, [m.id]: next }));
    if (!usingMock) {
      if (next) await confirmDoseHook(m.id);
    }
    if (next) {
      const allDone = meds.every(x => x.id === m.id ? true : isTaken(x));
      if (allDone && !allDoneShown) { setAllDoneShown(true); setTimeout(() => setAllDoneShown(false), 3000); }
    }
  };

  const totalTaken = meds.filter(isTaken).length;
  const nextMed = meds.find(m => !isTaken(m));
  const morning = meds.filter(m => m.time.startsWith('Manhã'));
  const afternoon = meds.filter(m => m.time.startsWith('Tarde'));
  const night = meds.filter(m => m.time.startsWith('Noite'));

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'você';
  const todayStr = new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long' });

  // Next appointment
  const nextAppt = upcoming?.[0];
  const apptDate = nextAppt ? new Date(nextAppt.scheduled_at) : null;
  const apptDaysAway = apptDate ? Math.ceil((apptDate - new Date()) / 86400000) : null;

  const QuickBtn = ({ icon, label, screen, alert }) => (
    <button onClick={() => go && go(screen)} style={{
      flex: 1, padding: '14px 8px', borderRadius: 18,
      background: 'var(--c-card)', border: '1px solid var(--c-line)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      cursor: 'pointer', fontFamily: 'inherit', position: 'relative',
    }}>
      <div style={{ color: 'var(--c-accent)', position: 'relative' }}>
        {icon}
        {alert && <span style={{ position: 'absolute', top: -3, right: -3, width: 10, height: 10, borderRadius: '50%', background: 'var(--c-alert)', border: '2px solid var(--c-card)' }}/>}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text)' }}>{label}</div>
    </button>
  );

  return (
    <Screen>
      {/* All-done celebration */}
      <AllDoneCelebration show={allDoneShown} name={profiles.find(p => p.id === activeId)?.name ?? ''}/>

      {/* Greeting */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="cu-eyebrow" style={{ marginBottom: 3 }}>{todayStr}</div>
          <div className="cu-h2">{greeting}, {firstName}.</div>
        </div>
        <div style={{ position: 'relative' }}>
          <IconButton variant="soft" onClick={() => go && go('settings')}><IconBell size={20}/></IconButton>
          <span style={{ position: 'absolute', top: 5, right: 5, width: 9, height: 9, borderRadius: '50%', background: 'var(--c-alert)', border: '2px solid var(--c-bg)' }}/>
        </div>
      </div>

      {/* Profile picker */}
      <ProfilePicker profiles={profiles} activeId={activeId} onChange={setActiveId} onAdd={() => go && go('fam')}/>

      {/* Resumo do dia — 2×2 grid */}
      <div style={{ padding: '6px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Remédios */}
          <button onClick={() => go && go('meds-v2')} style={{
            padding: 16, borderRadius: 18, background: totalTaken === meds.length ? 'var(--c-success-soft)' : 'var(--c-surface)',
            border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: totalTaken === meds.length ? 'var(--c-success)' : 'var(--c-text-soft)', marginBottom: 6 }}>Remédios</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: totalTaken === meds.length ? 'var(--c-success)' : 'var(--c-text)', letterSpacing: '-0.01em' }}>{totalTaken}/{meds.length}</div>
            <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 2 }}>{totalTaken === meds.length ? 'Tudo em dia ✓' : `próximo ${nextMed?.time.split('· ')[1] || '—'}`}</div>
          </button>

          {/* Próxima consulta */}
          <button onClick={() => go && go('consultas')} style={{
            padding: 16, borderRadius: 18, background: 'var(--c-accent)',
            border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(254,243,225,.65)', marginBottom: 6 }}>Consulta</div>
            {nextAppt ? (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-accent-fg)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{nextAppt.specialty}</div>
                <div style={{ fontSize: 11, color: 'rgba(254,243,225,.75)', marginTop: 3 }}>
                  {apptDate?.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })} · {apptDate?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  {apptDaysAway !== null && apptDaysAway <= 7 && <span> · em {apptDaysAway}d</span>}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-accent-fg)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Nenhuma</div>
                <div style={{ fontSize: 11, color: 'rgba(254,243,225,.75)', marginTop: 3 }}>Agendar →</div>
              </>
            )}
          </button>

          {/* Exames */}
          <button onClick={() => go && go('exames-full')} style={{
            padding: 16, borderRadius: 18, background: 'var(--c-warn-soft)',
            border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-warn)', marginBottom: 6 }}>Exames</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-warn)', letterSpacing: '-0.01em' }}>Ver</div>
            <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 2 }}>Ver detalhes →</div>
          </button>

          {/* Estoque */}
          <button onClick={() => go && go('stock')} style={{
            padding: 16, borderRadius: 18, background: 'var(--c-surface)',
            border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-text-soft)', marginBottom: 6 }}>Estoque</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.01em' }}>{meds.length > 0 ? `${meds.length} med.` : 'Em dia'}</div>
            <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 2 }}>Ver estoque →</div>
          </button>
        </div>
      </div>

      {/* Atalhos rápidos */}
      <div style={{ padding: '16px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Atalhos</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <QuickBtn icon={<IconCalendar size={22}/>} label="Consultas" screen="consultas"/>
          <QuickBtn icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} label="Exames" screen="exames-full" alert/>
          <QuickBtn icon={<IconShield size={22}/>} label="Prontuário" screen="prontuarios"/>
          <QuickBtn icon={<IconHeart size={22}/>} label="Histórico" screen="historico"/>
        </div>
      </div>

      {/* Meds — view toggle */}
      <div style={{ padding: '18px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="cu-h3">Remédios de hoje</div>
        <ViewToggle value={view} onChange={setView} options={[{ value: 'timeline', label: 'Timeline' }, { value: 'list', label: 'Lista' }]}/>
      </div>

      {view === 'list' ? (
        <div>
          {morning.length > 0 && <TimeGroupHS label="Manhã" emoji="☀️" meds={morning} isTaken={isTaken} toggle={toggle}/>}
          {afternoon.length > 0 && <TimeGroupHS label="Tarde" emoji="🌤" meds={afternoon} isTaken={isTaken} toggle={toggle}/>}
          {night.length > 0 && <TimeGroupHS label="Noite" emoji="🌙" meds={night} isTaken={isTaken} toggle={toggle}/>}
        </div>
      ) : (
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{ background: 'var(--c-card)', borderRadius: 22, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            <div style={{ padding: '14px 18px 6px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-soft)' }}>Hoje · 14h32</div>
                <div style={{ fontSize: 17, fontWeight: 600, marginTop: 3 }}>{totalTaken} de {meds.length} confirmados</div>
              </div>
              {nextMed && <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--c-text-muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Próxima</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-accent)' }}>{nextMed.time.split('· ')[1]}</div>
              </div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '8px 14px 14px' }}>
              {[{l:'Manhã·07h', meds: morning}, {l:'Tarde·13h', meds: afternoon}, {l:'Noite·22h', meds: night}].map(({l, meds: group}) => {
                const done = group.length > 0 && group.every(isTaken);
                return (
                  <div key={l} style={{
                    padding: '10px', borderRadius: 12, textAlign: 'center',
                    background: done ? 'var(--c-success-soft)' : 'var(--c-surface)',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: done ? 'var(--c-success)' : 'var(--c-text-soft)', marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: done ? 'var(--c-success)' : 'var(--c-text)' }}>
                      {group.map(m => m.name.split(' ')[0]).join('·') || '—'}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--c-text-muted)', marginTop: 2 }}>{group.filter(isTaken).length}/{group.length}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {nextMed && (
            <div style={{ marginTop: 10, padding: 14, borderRadius: 16, background: 'var(--c-accent)', color: 'var(--c-accent-fg)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: nextMed.color, display: 'grid', placeItems: 'center', fontSize: 20, flexShrink: 0 }}>{nextMed.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, opacity: .65, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600 }}>Próxima dose</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{nextMed.name} · {nextMed.dose}</div>
              </div>
              <button onClick={() => toggle(nextMed)} style={{
                background: 'var(--c-accent-fg)', color: 'var(--c-accent)', border: 'none',
                padding: '9px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>Confirmar</button>
            </div>
          )}
        </div>
      )}
    </Screen>
  );
}

function TimeGroupHS({ label, emoji, meds, isTaken, toggle }) {
  return (
    <div style={{ padding: '12px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 8px' }}>
        <span style={{ fontSize: 16 }}>{emoji}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text-soft)' }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>· {meds[0].time.split('· ')[1]}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {meds.map(m => (
          <AnimatedMedRow
            key={m.id}
            med={m}
            taken={isTaken(m)}
            onToggle={() => toggle(m)}
          />
        ))}
      </div>
    </div>
  );
}

export {
  MedDetailScreen, ConsultaDetailScreen, ResumoSaudeScreen,
  HistoricoMedicoScreen, ExamesFullScreen, HomeV3Screen,
  EXAMES_FULL, HISTORICO_MEDICO,
};
