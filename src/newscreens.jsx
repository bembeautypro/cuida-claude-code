// Cuida — Novos módulos de saúde
// ConsultasScreen, MedsV2Screen, ExamesScreen, ProntuariosScreen

import React, { useState as useStateNS } from 'react';
import { usePatient } from './lib/PatientContext.jsx';
import { useMedications } from './lib/hooks/useMedications.js';
import { useAppointments } from './lib/hooks/useAppointments.js';
import { useExams } from './lib/hooks/useExams.js';
import { CUIDA_DATA } from './data.jsx';
import { Screen, IconButton, ViewToggle, Button, Avatar, Bar, SoftCard, Dot } from './ui.jsx';
import {
  IconHeart, IconDroplet, IconCalendar, IconShield, IconPill, IconInfo,
  IconArrowL, IconCheck, IconChevR, IconChevD, IconSearch, IconPlus,
  IconClose, IconBell, IconCamera, IconClock,
} from './icons.jsx';

// ════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════
const CONSULTAS = [
  { id: 'c1', esp: 'Cardiologia',           med: 'Dr. Ricardo Andrade',  crm: '12345 · Cardiologista',
    local: 'Clínica Vida Plena', day: 24, month: 'Mai', weekday: 'Sex', time: '10:30', daysAway: 3,
    color: 'rgb(212, 232, 230)', fg: 'rgb(1,55,61)',
    prep: ['Jejum de 12h antes da consulta', 'Levar carteirinha do convênio', 'Chegar 15 min antes', 'Trazer exames recentes'] },
  { id: 'c2', esp: 'Pneumologia',           med: 'Dra. Juliana Martins',  date: '03 de jun. · 14:00', status: 'agendada', color: 'rgb(218, 235, 222)' },
  { id: 'c3', esp: 'Oftalmologia',          med: 'Dr. Paulo Menezes',     date: '10 de jun. · 09:00', status: 'agendada', color: 'rgb(254, 220, 195)' },
  { id: 'c4', esp: 'Otorrinolaringologia',  med: 'Dra. Ana Beatriz Lima', date: '18 de jun. · 11:00', status: 'agendada', color: 'rgb(232, 220, 240)' },
  { id: 'c5', esp: 'Endocrinologia',        med: 'Dr. Carlos Figueiredo', date: '02 de mar. · 10:00', status: 'realizada', color: 'rgb(218, 235, 222)' },
  { id: 'c6', esp: 'Cardiologia',           med: 'Dr. Ricardo Andrade',   date: '15 de jan. · 10:30', status: 'realizada', color: 'rgb(212, 232, 230)' },
];

const MEDS_V2 = [
  { id: 'mv1', name: 'Losartana',    dose: '50mg',  schedule: '1 comprimido · Todos os dias', nextDose: '08:00', countdown: 'em 2h30', taken: true,  color: 'rgb(254, 220, 195)', icon: '💊', streak: 22 },
  { id: 'mv2', name: 'Atenolol',     dose: '25mg',  schedule: '1 comprimido · Todos os dias', nextDose: '13:00', countdown: 'em 6h',   taken: false, color: 'rgb(212, 232, 230)', icon: '🔵', streak: 8  },
  { id: 'mv3', name: 'Sinvastatina', dose: '20mg',  schedule: '1 comprimido · Todos os dias', nextDose: '22:00', countdown: 'em 15h',  taken: false, color: 'rgb(232, 220, 240)', icon: '🟣', streak: 8  },
  { id: 'mv4', name: 'AAS',          dose: '100mg', schedule: '1 comprimido · Todos os dias', nextDose: '07:00', countdown: 'amanhã',  taken: true,  color: 'rgb(252, 224, 213)', icon: '🟠', streak: 8, alert: true },
];

const EXAMES = [
  { id: 'ex1', name: 'Hemograma completo',       person: 'Maria', date: '20 de mai. · 08:00', daysAway: 3, status: 'pendente',   color: 'rgb(212, 232, 230)', prep: 'Jejum de 8h' },
  { id: 'ex2', name: 'Glicemia em jejum',         person: 'Maria', date: '25 de mai. · 07:30', daysAway: 8, status: 'pendente',   color: 'rgb(254, 220, 195)', prep: 'Jejum de 12h' },
  { id: 'ex3', name: 'Colesterol total e frações',person: 'Maria', date: 'Realizado em 10 de abr.', status: 'laudo',     color: 'rgb(218, 235, 222)' },
  { id: 'ex4', name: 'TSH',                       person: 'Maria', date: 'Realizado em 02 de abr.', status: 'aguardando', color: 'rgb(252, 224, 213)' },
  { id: 'ex5', name: 'Vitamina D',                person: 'Maria', date: 'Realizado em 15 de mar.', status: 'laudo',     color: 'rgb(232, 220, 240)' },
];

const PRONTUARIO_SECTIONS = [
  { id: 'ps1', title: 'Resumo de saúde',  sub: 'Condições, alergias, medicamentos e informações principais', bg: 'rgb(212, 232, 230)', fg: 'rgb(1,55,61)',     count: 1,    complete: true  },
  { id: 'ps2', title: 'Histórico médico', sub: 'Doenças, cirurgias, internações e tratamentos',              bg: 'rgb(232, 220, 240)', fg: 'rgb(82,36,88)',    count: 3,    complete: true  },
  { id: 'ps3', title: 'Medicamentos',     sub: 'Lista de medicamentos em uso e orientações',                 bg: 'rgb(254, 220, 195)', fg: 'rgb(122,60,38)',   count: 4,    complete: true  },
  { id: 'ps4', title: 'Exames',           sub: 'Resultados e histórico de exames realizados',                bg: 'rgb(252, 224, 213)', fg: 'var(--c-alert)',   count: 3,    complete: true  },
  { id: 'ps5', title: 'Consultas',        sub: 'Histórico de consultas e acompanhamento',                    bg: 'rgb(218, 235, 222)', fg: 'rgb(35,100,68)',   count: 4,    complete: true  },
  { id: 'ps6', title: 'Vacinas',          sub: 'Carteira de vacinação e doses aplicadas',                    bg: 'rgb(230, 230, 218)', fg: 'rgb(60,60,40)',    count: null, complete: false },
];

// ════════════════════════════════════════════════════════════
// SHARED: especialidade icon
// ════════════════════════════════════════════════════════════
const ESP_ICONS = {
  'Cardiologia':          <IconHeart size={20}/>,
  'Pneumologia':          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v10M5 7c-2 2-2 5 0 7 2 3 5 3 7 0 2 3 5 3 7 0 2-2 2-5 0-7"/></svg>,
  'Oftalmologia':         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>,
  'Otorrinolaringologia': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3a4 4 0 0 1 8 0c0 3-2 5-2 8v2a2 2 0 0 1-4 0v-1c0-3-2-4-2-9z"/></svg>,
  'Endocrinologia':       <IconDroplet size={20}/>,
  default:               <IconCalendar size={20}/>,
};

function EspIcon({ esp, color, fg, size = 42 }) {
  const icon = ESP_ICONS[esp] || ESP_ICONS.default;
  return (
    <div style={{
      width: size, height: size, borderRadius: 14,
      background: color, color: fg, flexShrink: 0,
      display: 'grid', placeItems: 'center',
    }}>{icon}</div>
  );
}

// Prontuário section icon
function ProntuarioIcon({ section }) {
  const icons = {
    'Resumo de saúde':  <IconShield size={18}/>,
    'Histórico médico': <IconHeart size={18}/>,
    'Medicamentos':     <IconPill size={18}/>,
    'Exames':           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
    'Consultas':        <IconCalendar size={18}/>,
    'Vacinas':          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4-9.4 9.4-4-4L18 2zM5 17l-3 3M10 3 7 6M21 14l-3 3"/></svg>,
  };
  return (
    <div style={{
      width: 46, height: 46, borderRadius: 14,
      background: section.bg, color: section.fg,
      display: 'grid', placeItems: 'center', flexShrink: 0,
    }}>{icons[section.title] || <IconInfo size={18}/>}</div>
  );
}

// ════════════════════════════════════════════════════════════
// CONSULTAS SCREEN
// ════════════════════════════════════════════════════════════
const APPT_PALETTE = [
  { color: 'rgb(212,232,230)', fg: 'rgb(1,55,61)' },
  { color: 'rgb(218,235,222)', fg: 'rgb(27,77,44)' },
  { color: 'rgb(254,220,195)', fg: 'rgb(122,60,38)' },
  { color: 'rgb(232,220,240)', fg: 'rgb(82,36,88)' },
  { color: 'rgb(207,222,240)', fg: 'rgb(28,51,92)' },
];

function mapAppointment(a, i) {
  const dt = new Date(a.scheduled_at);
  const pal = APPT_PALETTE[i % APPT_PALETTE.length];
  const daysAway = Math.ceil((dt - new Date()) / 86400000);
  return {
    id: a.id,
    esp: a.specialty ?? 'Consulta',
    med: a.doctor_name ?? '—',
    crm: a.location ?? '',
    local: a.address ?? a.location ?? '',
    day: dt.getDate(),
    month: dt.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    weekday: dt.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
    time: dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    daysAway,
    date: dt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) + ' · ' + dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    scheduled_at: a.scheduled_at,
    status: a.status === 'done' || a.status === 'completed' ? 'realizada' : a.status === 'cancelled' ? 'cancelada' : 'agendada',
    prep: a.prep_notes ? [a.prep_notes] : [],
    color: pal.color,
    fg: pal.fg,
  };
}

function ConsultasScreen({ go }) {
  const { currentPatientId } = usePatient();
  const { appointments: rawAppts, loading: apptsLoading } = useAppointments(currentPatientId);
  const [tab, setTab] = useStateNS('proximas');
  const [prepOpen, setPrepOpen] = useStateNS(false);
  const [prepChecked, setPrepChecked] = useStateNS({});

  const usingMock = rawAppts.length === 0 && !currentPatientId;
  const consultas = usingMock
    ? CONSULTAS
    : rawAppts.map(mapAppointment).sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));

  const upcoming = consultas.filter(c => c.status === 'agendada');
  const next = upcoming[0] ?? consultas[0];
  const others = (tab === 'proximas' ? consultas.filter(c => c.status === 'agendada').slice(1)
    : tab === 'passadas' ? consultas.filter(c => c.status === 'realizada')
    : consultas.filter(c => c.status === 'cancelada'));

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('home')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36} onClick={() => go && go('consultas-cal')}><IconCalendar size={18}/></IconButton>
      </div>

      <div style={{ padding: '6px 20px 16px' }}>
        <div className="cu-h1" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Consultas</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Acompanhe suas consultas agendadas e concluídas.</div>
      </div>

      {/* Tab filter */}
      <div style={{ padding: '0 20px 18px' }}>
        <ViewToggle value={tab} onChange={setTab} options={[
          { value: 'proximas',  label: 'Próximas' },
          { value: 'passadas',  label: 'Passadas' },
          { value: 'canceladas',label: 'Canceladas' },
        ]} style={{ width: '100%', justifyContent: 'stretch' }}/>
      </div>

      {/* Hero — próxima consulta */}
      {tab === 'proximas' && (
        <div style={{ padding: '0 20px' }}>
          <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Próxima consulta</div>
          <div style={{
            background: 'var(--c-card)', borderRadius: 20, padding: 18,
            border: '1px solid var(--c-line)', boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              {/* Date block */}
              <div style={{
                background: next.color, borderRadius: 14, padding: '12px 14px',
                textAlign: 'center', flexShrink: 0, minWidth: 72,
              }}>
                <IconCalendar size={18} style={{ color: next.fg, margin: '0 auto 4px' }}/>
                <div style={{ fontSize: 30, fontWeight: 700, color: next.fg, lineHeight: 1, letterSpacing: '-0.02em' }}>{next.day}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: next.fg, marginTop: 2 }}>{next.month}</div>
                <div style={{ fontSize: 10, color: next.fg, opacity: .65, marginTop: 3 }}>{next.weekday} · {next.time}</div>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 999,
                    background: 'var(--c-success-soft)', color: 'var(--c-success)',
                  }}>em {next.daysAway} dias</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{next.esp}</div>
                <div style={{ fontSize: 13, color: 'var(--c-text-soft)', marginTop: 3 }}>{next.med}</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 1 }}>{next.crm}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 12, color: 'var(--c-text-soft)' }}>
                  <IconSearch size={12}/> {next.local}
                </div>
              </div>
              <IconChevR size={18} style={{ color: 'var(--c-text-muted)', flexShrink: 0, marginTop: 4 }}/>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Button variant="outline" size="sm" style={{ flex: 1 }} onClick={() => go && go('consulta-detail')}>Detalhes</Button>
              <Button variant="primary" size="sm" style={{ flex: 1.4 }}
                onClick={() => setPrepOpen(p => !p)}>
                {prepOpen ? 'Fechar prep.' : 'Ver preparação ✓'}
              </Button>
            </div>

            {/* Prep checklist — expandable */}
            {prepOpen && (
              <div style={{
                marginTop: 14, paddingTop: 14,
                borderTop: '1px solid var(--c-line)',
              }}>
                <div className="cu-eyebrow" style={{ marginBottom: 10 }}>Checklist de preparação</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {next.prep.map((item, i) => {
                    const checked = prepChecked[i];
                    return (
                      <button key={i} onClick={() => setPrepChecked(p => ({ ...p, [i]: !p[i] }))} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: checked ? 'var(--c-success-soft)' : 'var(--c-surface)',
                        borderRadius: 12, padding: '10px 12px', border: 'none',
                        cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
                        transition: 'background .2s ease',
                      }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                          border: '2px solid ' + (checked ? 'var(--c-success)' : 'var(--c-line-strong)'),
                          background: checked ? 'var(--c-success)' : 'transparent',
                          display: 'grid', placeItems: 'center', color: '#fff',
                          transition: 'all .2s ease',
                        }}>
                          {checked && <IconCheck size={12} stroke={2.5}/>}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: checked ? 'var(--c-success)' : 'var(--c-text)', textDecoration: checked ? 'line-through' : 'none' }}>{item}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 8, textAlign: 'center' }}>
                  {Object.values(prepChecked).filter(Boolean).length}/{next.prep.length} itens preparados
                </div>
              </div>
            )}
          </div>

          {/* Other appointments */}
          {others.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Outras consultas</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {others.map(c => (
                  <div key={c.id} onClick={() => go && go('consulta-detail')} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: 14, borderRadius: 16, cursor: 'pointer',
                    background: 'var(--c-card)', border: '1px solid var(--c-line)',
                  }}>
                    <EspIcon esp={c.esp} color={c.color || 'var(--c-surface)'} fg="var(--c-accent)" size={42}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{c.esp}</div>
                      <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2 }}>{c.med}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3, fontSize: 11, color: 'var(--c-text-muted)' }}>
                        <IconCalendar size={11}/> {c.date}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999,
                      background: c.status === 'realizada' ? 'var(--c-success-soft)' : 'var(--c-accent-soft)',
                      color: c.status === 'realizada' ? 'var(--c-success)' : 'var(--c-accent)',
                      letterSpacing: '.04em', textTransform: 'uppercase',
                    }}>{c.status === 'realizada' ? 'Realizada' : 'Agendada'}</span>
                    <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Passadas / empty for canceladas */}
      {tab !== 'proximas' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {others.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--c-text-muted)', fontSize: 14 }}>
                Nenhuma consulta {tab === 'passadas' ? 'passada' : 'cancelada'}.
              </div>
            ) : others.map(c => (
              <div key={c.id} onClick={() => go && go('consulta-detail')} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 14, borderRadius: 16, cursor: 'pointer',
                background: 'var(--c-card)', border: '1px solid var(--c-line)',
              }}>
                <EspIcon esp={c.esp} color={c.color || 'var(--c-surface)'} fg="var(--c-accent)" size={42}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{c.esp}</div>
                  <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>{c.med} · {c.date}</div>
                </div>
                <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div style={{ padding: '20px 20px 0' }}>
        <Button variant="outline" full size="md" icon={<IconCalendar size={18}/>} onClick={() => go && go('add-consulta')}>
          Agendar nova consulta
        </Button>
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// MEDICAMENTOS V2 SCREEN
// ════════════════════════════════════════════════════════════
const MEDS_PALETTE = [
  'rgb(254,220,195)', 'rgb(212,232,230)', 'rgb(218,235,222)', 'rgb(232,220,240)', 'rgb(207,222,240)',
];

function MedsV2Screen({ go }) {
  const { currentPatientId } = usePatient();
  const { medications: rawMeds, loading: medsLoading } = useMedications(currentPatientId);
  const [tab, setTab] = useStateNS('emuso');
  const [banner, setBanner] = useStateNS(true);
  const [lembretes, setLembretes] = useStateNS(false);

  const usingMock = rawMeds.length === 0 && !currentPatientId;
  const allMeds = usingMock
    ? MEDS_V2
    : rawMeds.map((m, i) => ({
        id: m.id,
        name: m.name,
        dose: `${m.dose ?? ''}${m.unit ?? ''}`,
        schedule: m.instructions ?? (m.medication_schedules?.length > 0
          ? m.medication_schedules.map(s => s.time?.slice(0, 5)).join(', ')
          : 'Sem horário definido'),
        nextDose: m.medication_schedules?.[0]?.time?.slice(0, 5) ?? '—',
        countdown: '',
        taken: false,
        color: MEDS_PALETTE[i % MEDS_PALETTE.length],
        icon: '💊',
        alert: m.stock_qty !== null && m.stock_qty <= 5,
        active: m.active !== false,
      }));

  const meds = tab === 'emuso'
    ? allMeds.filter(m => m.active !== false)
    : tab === 'encerrados'
      ? allMeds.filter(m => m.active === false)
      : allMeds;
  const streak = 0;

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('home')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36} onClick={() => go && go('add-med')}><IconPlus size={18}/></IconButton>
      </div>

      <div style={{ padding: '6px 20px 4px' }}>
        <div className="cu-h1" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Medicamentos</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Gerencie os medicamentos em uso e receba lembretes.</div>
      </div>

      {/* Streak */}
      <div style={{ padding: '10px 20px 14px' }}>
        <SoftCard background="var(--c-accent)" padding="12px 16px" radius={16}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28 }}>🔥</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-accent-fg)' }}>{streak} dias de adesão perfeita</div>
            <div style={{ fontSize: 11, color: 'rgba(254,243,225,.7)', marginTop: 2 }}>Maria está indo muito bem. Não quebre a sequência!</div>
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{
                width: 6, height: i < 6 ? 18 : 12, borderRadius: 3,
                background: i < 6 ? 'var(--c-accent-fg)' : 'rgba(254,243,225,.3)',
              }}/>
            ))}
          </div>
        </SoftCard>
      </div>

      {/* Tab filter */}
      <div style={{ padding: '0 20px 14px' }}>
        <ViewToggle value={tab} onChange={setTab} options={[
          { value: 'emuso',     label: 'Em uso' },
          { value: 'encerrados',label: 'Encerrados' },
          { value: 'todos',     label: 'Todos' },
        ]} style={{ width: '100%' }}/>
      </div>

      {/* Reminder banner */}
      {banner && tab === 'emuso' && (
        <div style={{ padding: '0 20px 12px' }}>
          <div style={{
            background: 'var(--c-surface)', borderRadius: 16, padding: '12px 14px',
            display: 'flex', alignItems: 'flex-start', gap: 12,
            border: '1px solid var(--c-line)',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'var(--c-accent-soft)', display: 'grid', placeItems: 'center',
              color: 'var(--c-accent)', flexShrink: 0,
            }}><IconBell size={18}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Lembre-se de tomar seus medicamentos</div>
              <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginBottom: 8, lineHeight: 1.4 }}>Ative os lembretes para não esquecer nenhuma dose.</div>
              <Button variant="primary" size="sm" onClick={() => setLembretes(true)}>
                {lembretes ? '✓ Lembretes ativos' : 'Ativar lembretes'}
              </Button>
            </div>
            <button onClick={() => setBanner(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--c-text-muted)', padding: 2 }}>
              <IconClose size={16}/>
            </button>
          </div>
        </div>
      )}

      {/* Med list */}
      <div style={{ padding: '0 20px' }}>
        {tab === 'encerrados' ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--c-text-muted)', fontSize: 14 }}>
            Nenhum medicamento encerrado.
          </div>
        ) : (
          <>
            <div className="cu-eyebrow" style={{ padding: '4px 4px 10px' }}>Em uso</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {meds.map((m, i) => (
                <div key={m.id} onClick={() => go && go('med-detail')} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 4px',
                  borderBottom: i < meds.length - 1 ? '1px solid var(--c-line)' : 'none',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: m.color, display: 'grid', placeItems: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>{m.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name} <span style={{ fontWeight: 400, color: 'var(--c-text-soft)' }}>{m.dose}</span></div>
                    <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2 }}>{m.schedule}</div>
                    {m.alert && <div style={{ fontSize: 11, color: 'var(--c-alert)', marginTop: 2 }}>Estoque baixo · 4 dias</div>}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--c-text-muted)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 2 }}>Próxima dose</div>
                    <div style={{
                      fontSize: 20, fontWeight: 700,
                      color: m.taken ? 'var(--c-text-muted)' : 'var(--c-accent)',
                      textDecoration: m.taken ? 'line-through' : 'none',
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '-0.01em',
                    }}>{m.nextDose}</div>
                    <div style={{ fontSize: 10, color: 'var(--c-text-muted)', marginTop: 1 }}>{m.countdown}</div>
                  </div>
                  <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
                </div>
              ))}
            </div>

            {/* Lembretes row */}
            <div style={{
              marginTop: 12, padding: '12px 14px', borderRadius: 14,
              background: lembretes ? 'var(--c-success-soft)' : 'var(--c-surface)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: lembretes ? 'var(--c-success)' : 'var(--c-accent-soft)',
                color: lembretes ? '#fff' : 'var(--c-accent)',
                display: 'grid', placeItems: 'center',
              }}>
                <IconBell size={18}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: lembretes ? 'var(--c-success)' : 'var(--c-text)' }}>
                  {lembretes ? 'Lembretes ativos' : 'Lembretes desativados'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 1 }}>Para hoje: 08:00, 13:00, 22:00</div>
              </div>
              <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '0 20px' }}>
        <button onClick={() => go && go('receitas')} style={{
          width: '100%', padding: '12px 16px', borderRadius: 16, marginBottom: 12,
          background: 'var(--c-surface)', border: '1px dashed var(--c-line-strong)',
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit',
          color: 'var(--c-accent)',
        }}>
          <IconCamera size={18}/>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Adicionar por foto de receita</div>
            <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 1 }}>IA interpreta e lança automaticamente</div>
          </div>
          <IconChevR size={16} style={{ marginLeft: 'auto', color: 'var(--c-text-muted)' }}/>
        </button>
      </div>

      <div style={{ padding: '0 20px' }}>
        <Button variant="outline" full icon={<IconPlus size={18}/>} onClick={() => go && go('add-med')}>
          Adicionar medicamento
        </Button>
      </div>
    </Screen>
  );
}

const EXAM_PALETTE = [
  'rgb(212, 232, 230)',
  'rgb(254, 220, 195)',
  'rgb(218, 235, 222)',
  'rgb(252, 224, 213)',
  'rgb(232, 220, 240)',
];

// ════════════════════════════════════════════════════════════
// EXAMES SCREEN
// ════════════════════════════════════════════════════════════
function ExamesScreen({ go }) {
  const { currentPatientId, currentPatient } = usePatient();
  const { exams: rawExams } = useExams(currentPatientId);
  const [tab, setTab] = useStateNS('todos');

  const usingMock = rawExams.length === 0 && !currentPatientId;

  function mapExam(e, i) {
    const isPending = e.status === 'pending' || e.status === 'pendente';
    const isDone = e.status === 'done' || e.status === 'completed' || e.status === 'realizado';
    const hasResults = e.exam_results?.length > 0;
    const dt = e.scheduled_at ? new Date(e.scheduled_at) : null;
    const daysAway = dt ? Math.ceil((dt - new Date()) / 86400000) : null;
    let status, date;
    if (isDone && hasResults) {
      status = 'laudo';
      date = 'Realizado em ' + (e.performed_at ? new Date(e.performed_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) : '—');
    } else if (isDone) {
      status = 'aguardando';
      date = 'Realizado em ' + (e.performed_at ? new Date(e.performed_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) : '—');
    } else {
      status = 'pendente';
      date = dt ? dt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) + ' · ' + dt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '—';
    }
    return {
      id: e.id,
      name: e.name,
      person: currentPatient?.name ?? '',
      date,
      daysAway: status === 'pendente' && daysAway > 0 ? daysAway : null,
      status,
      color: EXAM_PALETTE[i % EXAM_PALETTE.length],
      prep: e.prep_notes ?? null,
    };
  }

  const exames = usingMock ? EXAMES : rawExams.map(mapExam);
  const pendentes = exames.filter(e => e.status === 'pendente');
  const realizados = exames.filter(e => e.status !== 'pendente');
  const shown = tab === 'pendentes' ? pendentes : tab === 'realizados' ? realizados : null;

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('home')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36} onClick={() => go && go('add-exame')}><IconPlus size={18}/></IconButton>
      </div>

      <div style={{ padding: '6px 20px 4px' }}>
        <div className="cu-h1" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Exames</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Acompanhe e organize os exames de quem você cuida.</div>
      </div>

      <div style={{ padding: '10px 20px 18px' }}>
        <ViewToggle value={tab} onChange={setTab} options={[
          { value: 'todos',     label: 'Todos' },
          { value: 'pendentes', label: 'Pendentes' },
          { value: 'realizados',label: 'Realizados' },
        ]} style={{ width: '100%' }}/>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Filtered view */}
        {shown && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shown.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--c-text-muted)', fontSize: 14 }}>
                Nenhum exame {tab === 'pendentes' ? 'pendente' : 'realizado'}.
              </div>
            ) : shown.map(e => <ExameRow key={e.id} exam={e}/>)}
          </div>
        )}

        {/* Todos — grouped */}
        {tab === 'todos' && (
          <>
            {pendentes.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div className="cu-eyebrow" style={{ padding: '0 4px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>Próximos exames</span>
                  <Dot color="var(--c-warn)" size={7}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {pendentes.map(e => <ExameRow key={e.id} exam={e}/>)}
                </div>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 10px' }}>
                <div className="cu-eyebrow">Exames recentes</div>
                <button onClick={() => go && go('exames-full')} style={{ background: 'transparent', border: 'none', fontSize: 12, color: 'var(--c-accent)', fontWeight: 600, cursor: 'pointer' }}>Ver todos →</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {realizados.map((e, i) => (
                  <div key={e.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 4px',
                    borderBottom: i < realizados.length - 1 ? '1px solid var(--c-line)' : 'none',
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: e.color, display: 'grid', placeItems: 'center',
                      flexShrink: 0,
                    }}>
                      {e.status === 'laudo' ? (
                        <IconCheck size={18} style={{ color: 'var(--c-success)' }}/>
                      ) : (
                        <IconClock size={18} style={{ color: 'var(--c-warn)' }}/>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 2 }}>
                        {e.person} · {e.date}
                      </div>
                    </div>
                    {e.status === 'laudo' ? (
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                        background: 'var(--c-success-soft)', color: 'var(--c-success)',
                        letterSpacing: '.04em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>Laudo pronto</span>
                    ) : (
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                        background: 'var(--c-warn-soft)', color: 'var(--c-warn)',
                        letterSpacing: '.04em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>Aguardando</span>
                    )}
                    <IconChevR size={16} style={{ color: 'var(--c-text-muted)', marginLeft: 4 }}/>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <Button variant="outline" full onClick={() => go && go('exames-full')} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}>
          Ver histórico completo
        </Button>
      </div>
    </Screen>
  );
}

function ExameRow({ exam: e }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 14, borderRadius: 16,
      background: 'var(--c-card)', border: '1px solid var(--c-line)',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: e.color, flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 1,
      }}>
        <IconClock size={18} style={{ color: 'var(--c-warn)' }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
        <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 2 }}>{e.person}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3, fontSize: 11, color: 'var(--c-text-muted)' }}>
          <IconCalendar size={11}/> {e.date}
          {e.prep && <span style={{ color: 'var(--c-warn)', fontWeight: 600 }}>· {e.prep}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999,
          background: 'var(--c-warn-soft)', color: 'var(--c-warn)',
          letterSpacing: '.05em', textTransform: 'uppercase',
        }}>Pendente</span>
        {e.daysAway && (
          <span style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>em {e.daysAway} dias</span>
        )}
      </div>
      <IconChevR size={16} style={{ color: 'var(--c-text-muted)', marginLeft: 2 }}/>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PRONTUÁRIOS SCREEN
// ════════════════════════════════════════════════════════════
function ProntuariosScreen({ go }) {
  const { patients, currentPatientId, setCurrentPatientId } = usePatient();
  const [personOpen, setPersonOpen] = useStateNS(false);
  const usingMock = patients.length === 0 && !currentPatientId;
  const profiles = usingMock
    ? CUIDA_DATA.PROFILES
    : patients.map((p, i) => ({
        id: p.id,
        name: p.name,
        relation: '',
        age: p.birth_date ? Math.floor((Date.now() - new Date(p.birth_date)) / 31557600000) : null,
        color: EXAM_PALETTE[i % EXAM_PALETTE.length],
        fg: 'rgb(1, 55, 61)',
      }));
  const activePerson = currentPatientId ?? profiles[0]?.id;
  const person = profiles.find(p => p.id === activePerson) ?? profiles[0];

  function selectPerson(id) {
    if (!usingMock && setCurrentPatientId) setCurrentPatientId(id);
    setPersonOpen(false);
  }

  const completeness = Math.round((PRONTUARIO_SECTIONS.filter(s => s.complete).length / PRONTUARIO_SECTIONS.length) * 100);

  return (
    <Screen>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('home')}><IconArrowL size={20}/></IconButton>
        <IconButton variant="soft" size={36}><IconSearch size={18}/></IconButton>
      </div>

      <div style={{ padding: '6px 20px 4px' }}>
        <div className="cu-h1" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Prontuários</div>
        <div className="cu-body cu-muted" style={{ marginTop: 4 }}>Acesse informações e documentos importantes de saúde.</div>
      </div>

      {/* Person dropdown */}
      <div style={{ padding: '14px 20px 0' }}>
        <button onClick={() => setPersonOpen(p => !p)} style={{
          width: '100%', padding: '14px 16px',
          background: 'var(--c-card)', borderRadius: 18,
          border: '1.5px solid ' + (personOpen ? 'var(--c-accent)' : 'var(--c-line)'),
          display: 'flex', alignItems: 'center', gap: 14,
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'border-color .15s ease',
          boxShadow: personOpen ? '0 0 0 3px rgba(1,55,61,.08)' : 'none',
        }}>
          <Avatar name={person.name} color={person.color} fg={person.fg} size={40}/>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{person.name}</div>
            <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>{person.relation} · {person.age} anos</div>
          </div>
          <IconChevD size={18} style={{
            color: 'var(--c-text-muted)',
            transform: personOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform .2s ease',
          }}/>
        </button>

        {/* Dropdown */}
        {personOpen && (
          <div style={{
            background: 'var(--c-card)', borderRadius: 16, marginTop: 6,
            border: '1px solid var(--c-line)', overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}>
            {profiles.map(p => (
              <button key={p.id} onClick={() => selectPerson(p.id)} style={{
                width: '100%', padding: '12px 16px',
                background: p.id === activePerson ? 'var(--c-surface)' : 'transparent',
                border: 'none', display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', fontFamily: 'inherit',
                borderBottom: '1px solid var(--c-line)',
              }}>
                <Avatar name={p.name} color={p.color} fg={p.fg} size={34}/>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>{p.relation} · {p.age} anos</div>
                </div>
                {p.id === activePerson && <IconCheck size={16} style={{ color: 'var(--c-success)' }}/>}
              </button>
            ))}
          </div>
        )}

        {/* Completeness */}
        {!personOpen && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--c-surface)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-soft)' }}>Prontuário completo</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: completeness === 100 ? 'var(--c-success)' : 'var(--c-warn)' }}>{completeness}%</span>
              </div>
              <Bar value={completeness} max={100} color={completeness === 100 ? 'var(--c-success)' : 'var(--c-accent)'} height={5}/>
            </div>
            {completeness < 100 && (
              <span style={{ fontSize: 10, color: 'var(--c-warn)', fontWeight: 600, whiteSpace: 'nowrap' }}>1 item faltando</span>
            )}
          </div>
        )}
      </div>

      {/* Sections */}
      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PRONTUARIO_SECTIONS.map((s, i) => (
          <div key={s.id} onClick={() => { const r = {'Resumo de saúde':'resumo-saude','Histórico médico':'historico','Medicamentos':'meds-v2','Exames':'exames-full','Consultas':'consultas','Vacinas':'vacinas'}; go && go(r[s.title] || 'prontuarios'); }} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: 14,
            borderRadius: 18, background: 'var(--c-card)',
            border: '1px solid ' + (s.complete ? 'var(--c-line)' : 'rgba(180,110,30,.2)'),
            cursor: 'pointer',
          }}>
            <ProntuarioIcon section={s}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</span>
                {!s.complete && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999,
                    background: 'var(--c-warn-soft)', color: 'var(--c-warn)',
                    letterSpacing: '.06em', textTransform: 'uppercase',
                  }}>Incompleto</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 3, lineHeight: 1.4 }}>{s.sub}</div>
            </div>
            {s.count && (
              <span style={{
                fontSize: 12, fontWeight: 700, color: 'var(--c-text-soft)',
                background: 'var(--c-surface)', borderRadius: 999,
                padding: '3px 9px', flexShrink: 0,
              }}>{s.count}</span>
            )}
            <IconChevR size={16} style={{ color: 'var(--c-text-muted)', flexShrink: 0 }}/>
          </div>
        ))}
      </div>
    </Screen>
  );
}

export {
  ConsultasScreen, MedsV2Screen, ExamesScreen, ProntuariosScreen,
  CONSULTAS, MEDS_V2, EXAMES, PRONTUARIO_SECTIONS,
};
