// Cuida — Funcionalidades avançadas
// ConsultasCalendarioScreen · AcompanhanteScreen · MensagensScreen

import React, { useState as useFeat, useRef as useRefFeat } from 'react';
import { Screen, Button, IconButton, Avatar } from './ui.jsx';
import { IconArrowL, IconPlus, IconChevR, IconWhatsApp, IconShare, IconCamera, IconMoreV, IconUsers, IconArrowR } from './icons.jsx';

// ── Dados calendário (Jun 2026) ──
const CAL_EVENTS = {
  3:  [{ id:'ce1', esp:'Pneumologia',          med:'Dra. Juliana Martins',  time:'14:00', color:'rgb(218,235,222)', resp:'Carla' }],
  10: [{ id:'ce2', esp:'Oftalmologia',          med:'Dr. Paulo Menezes',     time:'09:00', color:'rgb(212,232,230)', resp:'Rafael' }],
  18: [{ id:'ce3', esp:'Otorrinolaringologia',  med:'Dra. Ana Beatriz Lima', time:'11:00', color:'rgb(232,220,240)', resp:'Sofia' }],
  26: [{ id:'ce4', esp:'Cardiologia',           med:'Dr. Ricardo Andrade',   time:'10:30', color:'rgb(252,224,213)', resp:'Carla' }],
  28: [{ id:'ce5', esp:'Endocrinologia',        med:'Dr. Carlos Figueiredo', time:'09:00', color:'rgb(254,220,195)', resp:null }],
};

const FAMILY_MEMBERS = [
  { id:'carla', name:'Carla',   role:'Filha · cuidadora principal', color:'rgb(218,235,222)', status:'aceito' },
  { id:'rafael',name:'Rafael',  role:'Filho',                        color:'rgb(212,232,230)', status:'pendente' },
  { id:'sofia', name:'Sofia',   role:'Filha',                        color:'rgb(232,220,240)', status:'pendente' },
  { id:'pedro', name:'Pedro',   role:'Filho · mora em SP',           color:'rgb(254,220,195)', status:null },
];

const MESSAGES_DATA = [
  { id:'m1', from:'Rafael',  text:'Consegui acompanhar o papai na fisio hoje. Ele foi bem!', time:'09:12', mine:false },
  { id:'m2', from:'Carla',   text:'Ótimo! E o exame de amanhã, alguém pode levar?', time:'09:18', mine:true },
  { id:'m3', from:'Sofia',   text:'Eu posso. Confirmo aqui depois da reunião.', time:'09:35', mine:false },
  { id:'m4', from:'Rafael',  text:'Atenção: AAS está acabando, precisa comprar essa semana.', time:'10:02', mine:false },
  { id:'m5', from:'Carla',   text:'Já vi o alerta no app, vou comprar hoje à tarde. 👍', time:'10:15', mine:true },
  { id:'m6', from:'Sofia',   text:'Confirmado — levo o papai amanhã às 07:45.', time:'11:30', mine:false },
];

// ════════════════════════════════════════════════════════════
// 1. CONSULTAS — CALENDÁRIO
// ════════════════════════════════════════════════════════════
function ConsultasCalendarioScreen({ go }) {
  const today = 26;
  const [selectedDay, setSelectedDay] = useFeat(today);
  const [showRespModal, setShowRespModal] = useFeat(null);
  const [respAssigned, setRespAssigned] = useFeat({});

  const dayOfWeekLabels = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  // June 2026 starts on Monday (index 0)
  const daysInMonth = 30;
  const startOffset = 0;

  const selectedEvents = CAL_EVENTS[selectedDay] || [];

  function assignResp(day, name) {
    setRespAssigned(prev => ({ ...prev, [day]: name }));
    setShowRespModal(null);
  }

  return (
    <Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('consultas')}><IconArrowL size={20}/></IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Calendário</div>
        <IconButton variant="soft" size={36} onClick={() => go && go('add-consulta')}><IconPlus size={18}/></IconButton>
      </div>

      {/* Month header */}
      <div style={{ padding: '10px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>Junho 2026</div>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: 'var(--c-accent-soft)', color: 'var(--c-accent)', letterSpacing: '.04em', textTransform: 'uppercase' }}>
          {Object.keys(CAL_EVENTS).length} consultas
        </span>
      </div>

      {/* Day-of-week labels */}
      <div style={{ padding: '14px 20px 4px', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 0 }}>
        {dayOfWeekLabels.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--c-text-muted)', letterSpacing: '.04em', paddingBottom: 6 }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px 0' }}>
        {[...Array(startOffset)].map((_, i) => <div key={`e${i}`}/>)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = day === today;
          const isSelected = day === selectedDay;
          const events = CAL_EVENTS[day] || [];
          return (
            <button key={day} onClick={() => setSelectedDay(day)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '6px 2px', background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', position: 'relative',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', display: 'grid', placeItems: 'center',
                background: isSelected ? 'var(--c-accent)' : isToday ? 'var(--c-accent-soft)' : 'transparent',
                color: isSelected ? 'var(--c-accent-fg)' : isToday ? 'var(--c-accent)' : 'var(--c-text)',
                fontSize: 14, fontWeight: isSelected || isToday ? 700 : 400,
                transition: 'background .15s',
              }}>{day}</div>
              {/* Event dots */}
              <div style={{ display: 'flex', gap: 3, height: 6, alignItems: 'center' }}>
                {events.slice(0,3).map(ev => (
                  <div key={ev.id} style={{ width: 5, height: 5, borderRadius: '50%', background: isSelected ? 'var(--c-accent-fg)' : 'var(--c-accent)', opacity: isSelected ? .7 : 1 }}/>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day events */}
      <div style={{ padding: '18px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 12px' }}>
          {selectedEvents.length === 0
            ? `${selectedDay} de jun. — sem consultas`
            : `${selectedDay} de jun. — ${selectedEvents.length} consulta${selectedEvents.length > 1 ? 's' : ''}`
          }
        </div>

        {selectedEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '28px 20px', color: 'var(--c-text-muted)', fontSize: 13 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📅</div>
            Nenhuma consulta neste dia.
            <div style={{ marginTop: 16 }}>
              <Button variant="outline" size="sm" onClick={() => go && go('add-consulta')} icon={<IconPlus size={14}/>}>
                Agendar consulta
              </Button>
            </div>
          </div>
        ) : selectedEvents.map(ev => {
          const resp = respAssigned[selectedDay] || ev.resp;
          return (
            <div key={ev.id} style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 12, border: '1px solid var(--c-line)', background: 'var(--c-card)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: ev.color, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{ev.esp}</div>
                  <div style={{ fontSize: 12, opacity: .75, marginTop: 2 }}>{ev.med}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{ev.time}</div>
                  <div style={{ fontSize: 10, opacity: .65 }}>{selectedDay} de jun.</div>
                </div>
              </div>
              <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {resp ? (
                    <>
                      <Avatar name={resp} color={ev.color} fg="var(--c-text)" size={28}/>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-success)' }}>Resp: {resp}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 12, color: 'var(--c-alert)', fontWeight: 600 }}>⚠ Sem responsável</span>
                  )}
                </div>
                <button onClick={() => setShowRespModal(selectedDay)} style={{
                  background: 'var(--c-surface)', border: '1px solid var(--c-line)',
                  padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', color: 'var(--c-text)',
                }}>
                  {resp ? 'Trocar' : 'Indicar'} responsável
                </button>
              </div>
              <div style={{ padding: '0 18px 14px', display: 'flex', gap: 8 }}>
                <Button variant="outline" size="sm" style={{ flex: 1 }} onClick={() => go && go('consulta-detail')}>Detalhes</Button>
                <Button variant="soft" size="sm" style={{ flex: 1 }} onClick={() => go && go('acompanhante')}>Acompanhante</Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Responsável modal */}
      {showRespModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(4px)' }} onClick={() => setShowRespModal(null)}/>
          <div style={{ position: 'relative', background: 'var(--c-bg)', borderRadius: '24px 24px 0 0', padding: '20px 20px 36px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--c-line-strong)', margin: '0 auto 16px' }}/>
            <div className="cu-eyebrow" style={{ padding: '0 4px 14px' }}>Quem acompanha esta consulta?</div>
            {FAMILY_MEMBERS.map(f => (
              <button key={f.id} onClick={() => assignResp(showRespModal, f.name)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '12px 4px',
                background: 'transparent', border: 'none', borderBottom: '1px solid var(--c-line)',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Avatar name={f.name} color={f.color} fg="var(--c-text)" size={40}/>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>{f.role}</div>
                </div>
                <IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
              </button>
            ))}
          </div>
        </div>
      )}
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 2. ACOMPANHANTE FAMILIAR
// ════════════════════════════════════════════════════════════
function AcompanhanteScreen({ go }) {
  const [members, setMembers] = useFeat(FAMILY_MEMBERS.map(m => ({ ...m })));
  const [sent, setSent] = useFeat(false);

  function toggle(id) {
    setMembers(prev => prev.map(m => {
      if (m.id !== id) return m;
      const next = { aceito:'recusado', recusado:null, pendente:'aceito', null:'pendente' }[m.status];
      return { ...m, status: next };
    }));
  }

  function sendInvites() {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  }

  const statusLabel = { aceito:'✓ Confirmado', pendente:'Aguardando', recusado:'Recusou', null:'Convidar' };
  const statusColor = { aceito:'var(--c-success)', pendente:'var(--c-warn)', recusado:'var(--c-alert)', null:'var(--c-text-soft)' };
  const statusBg    = { aceito:'var(--c-success-soft)', pendente:'var(--c-warn-soft)', recusado:'var(--c-alert-soft)', null:'var(--c-surface)' };

  return (
    <Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton variant="plain" onClick={() => go && go('consultas-cal')}><IconArrowL size={20}/></IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Acompanhante</div>
        <div style={{ width: 36 }}/>
      </div>

      {/* Exam/consulta card */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ background: 'rgb(212,232,230)', borderRadius: 20, padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgb(1,55,61)', opacity: .65, marginBottom: 6 }}>Exame marcado</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Hemograma completo</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
            {[['Data','20 de jun.'],['Horário','08:00'],['Preparo','Jejum 8h']].map(([l,v]) => (
              <div key={l}>
                <div style={{ fontSize: 9, fontWeight: 700, opacity: .55, textTransform: 'uppercase', letterSpacing: '.05em' }}>{l}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Request info */}
      <div style={{ padding: '18px 20px 0' }}>
        <div className="cu-h3" style={{ marginBottom: 4 }}>Solicitar acompanhante</div>
        <div style={{ fontSize: 13, color: 'var(--c-text-soft)', marginBottom: 16, lineHeight: 1.5 }}>
          Selecione quem pode acompanhar. Eles receberão um convite pelo WhatsApp com todos os detalhes e poderão aceitar ou recusar.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {members.map(f => (
            <div key={f.id} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 18,
              background: 'var(--c-card)', border: '1px solid var(--c-line)',
            }}>
              <Avatar name={f.name} color={f.color} fg="var(--c-text)" size={44}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 1 }}>{f.role}</div>
              </div>
              <button onClick={() => toggle(f.id)} style={{
                padding: '7px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                background: statusBg[f.status], color: statusColor[f.status],
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                letterSpacing: '.02em', whiteSpace: 'nowrap',
              }}>{statusLabel[f.status]}</button>
            </div>
          ))}
        </div>

        {/* Accept/decline simulation */}
        {members.some(m => m.status === 'pendente') && (
          <div style={{ marginTop: 14, padding: 14, borderRadius: 16, background: 'var(--c-surface)', border: '1px solid var(--c-line)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Simular resposta de Rafael:</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="success" size="sm" style={{ flex: 1 }} onClick={() => setMembers(prev => prev.map(m => m.id === 'rafael' ? { ...m, status: 'aceito' } : m))}>
                ✓ Aceitar
              </Button>
              <Button variant="danger" size="sm" style={{ flex: 1 }} onClick={() => setMembers(prev => prev.map(m => m.id === 'rafael' ? { ...m, status: 'recusado' } : m))}>
                Recusar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button variant="primary" full size="lg" icon={<IconWhatsApp size={18}/>} onClick={sendInvites}>
          {sent ? '✓ Convites enviados!' : 'Enviar convites pelo WhatsApp'}
        </Button>
        <Button variant="outline" full size="md" icon={<IconShare size={16}/>}>
          Copiar link de confirmação
        </Button>
      </div>
    </Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 3. MENSAGENS INTERNAS
// ════════════════════════════════════════════════════════════
function MensagensScreen({ go }) {
  const [msgs, setMsgs] = useFeat(MESSAGES_DATA);
  const [input, setInput] = useFeat('');
  const bottomRef = useRefFeat(null);

  function send() {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { id: `m${Date.now()}`, from: 'Carla', text: input.trim(), time: 'agora', mine: true }]);
    setInput('');
  }

  const AVATARS = { Rafael: 'rgb(212,232,230)', Sofia: 'rgb(232,220,240)', Carla: 'rgb(218,235,222)' };

  return (
    <Screen hasTabBar={false}>
      {/* Header */}
      <div style={{ padding: '4px 20px 10px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--c-line)' }}>
        <IconButton variant="plain" onClick={() => go && go('fam')}><IconArrowL size={20}/></IconButton>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--c-accent)', color: 'var(--c-accent-fg)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <IconUsers size={20}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Família Almeida</div>
          <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>Sobre Maria · 4 membros</div>
        </div>
        <IconButton variant="soft" size={36}><IconMoreV size={18}/></IconButton>
      </div>

      {/* Messages */}
      <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', maxHeight: 'calc(100% - 180px)' }}>
        {/* Date divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }}/>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-text-muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Hoje</span>
          <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }}/>
        </div>

        {msgs.map((msg, i) => {
          const prevFrom = i > 0 ? msgs[i-1].from : null;
          const showAvatar = !msg.mine && msg.from !== prevFrom;
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: msg.mine ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
              {/* Avatar placeholder for non-mine */}
              {!msg.mine && (
                <div style={{ width: 28, flexShrink: 0, marginBottom: 2 }}>
                  {showAvatar && <Avatar name={msg.from} color={AVATARS[msg.from] || 'var(--c-surface)'} fg="var(--c-text)" size={28}/>}
                </div>
              )}
              <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', gap: 3, alignItems: msg.mine ? 'flex-end' : 'flex-start' }}>
                {showAvatar && !msg.mine && <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-soft)', paddingLeft: 4 }}>{msg.from}</span>}
                <div style={{
                  padding: '10px 14px', borderRadius: msg.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.mine ? 'var(--c-accent)' : 'var(--c-card)',
                  color: msg.mine ? 'var(--c-accent-fg)' : 'var(--c-text)',
                  fontSize: 14, lineHeight: 1.45,
                  border: msg.mine ? 'none' : '1px solid var(--c-line)',
                  boxShadow: 'var(--shadow-sm)',
                }}>{msg.text}</div>
                <span style={{ fontSize: 10, color: 'var(--c-text-muted)', paddingLeft: 4, paddingRight: 4 }}>{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}/>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '10px 16px 6px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['Alguém pode levar ao exame?','Comprar AAS urgente','Tudo bem com ele hoje?'].map(s => (
          <button key={s} onClick={() => setInput(s)} style={{
            padding: '6px 12px', borderRadius: 999, flexShrink: 0,
            background: 'var(--c-surface)', border: '1px solid var(--c-line)',
            fontSize: 12, color: 'var(--c-text-soft)', cursor: 'pointer', fontFamily: 'inherit',
          }}>{s}</button>
        ))}
      </div>

      {/* Input bar */}
      <div style={{ padding: '6px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid var(--c-line)', background: 'var(--c-bg)' }}>
        <IconButton variant="soft" size={36}><IconCamera size={18}/></IconButton>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Mensagem…"
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 999,
            border: '1.5px solid var(--c-line)', background: 'var(--c-card)',
            fontFamily: 'var(--font)', fontSize: 14, color: 'var(--c-text)',
            outline: 'none',
          }}
        />
        <button onClick={send} style={{
          width: 38, height: 38, borderRadius: '50%',
          background: input.trim() ? 'var(--c-accent)' : 'var(--c-line)',
          border: 'none', cursor: input.trim() ? 'pointer' : 'default',
          display: 'grid', placeItems: 'center', color: '#fff', flexShrink: 0,
          transition: 'background .15s',
        }}>
          <IconArrowR size={18}/>
        </button>
      </div>
    </Screen>
  );
}

export { ConsultasCalendarioScreen, AcompanhanteScreen, MensagensScreen, CAL_EVENTS, FAMILY_MEMBERS };
