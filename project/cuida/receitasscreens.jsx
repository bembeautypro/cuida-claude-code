// Cuida — Receitas OCR + Laudos OCR
// ReceitasScreen · ReceitaConfirmScreen · LaudoOCRScreen

const { useState: useRC, useEffect: useEffRC } = React;

const OCR_MEDS = [
  { id:'r1', name:'Atenolol',    dose:'50mg',  schedule:'08:00', freq:'1x ao dia · todos os dias', notes:'Tomar após café da manhã' },
  { id:'r2', name:'Losartana',   dose:'50mg',  schedule:'08:00', freq:'1x ao dia · todos os dias', notes:'Monitorar pressão semanalmente' },
  { id:'r3', name:'Sinvastatina',dose:'20mg',  schedule:'22:00', freq:'1x ao dia · todos os dias', notes:'Preferencialmente à noite' },
];

const OCR_LAUDO = [
  { exam:'Hemoglobina',    value:'13.8 g/dL', ref:'12.0–16.0', status:'normal' },
  { exam:'Glicemia',       value:'108 mg/dL', ref:'70–99',     status:'alto' },
  { exam:'Colesterol LDL', value:'98 mg/dL',  ref:'<100',      status:'normal' },
  { exam:'TSH',            value:'2.1 mUI/L', ref:'0.4–4.0',   status:'normal' },
  { exam:'Vitamina D',     value:'28 ng/mL',  ref:'30–100',    status:'baixo' },
];

// ════════════════════════════════════════════════════════════
// RECEITAS OCR
// ════════════════════════════════════════════════════════════
function ReceitasScreen({ go }) {
  const [phase, setPhase] = useRC('idle'); // idle | scanning | done

  useEffRC(() => {
    if (phase === 'scanning') {
      const t = setTimeout(() => setPhase('done'), 2200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <window.IconButton variant="plain" onClick={() => go && go('meds-v2')}><window.IconArrowL size={20}/></window.IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Receitas</div>
        <div style={{ width: 36 }}/>
      </div>

      {phase === 'idle' && (
        <div style={{ padding: '20px 20px 0' }}>
          <div className="cu-h1" style={{ fontSize: 26, letterSpacing: '-0.02em' }}>Adicionar receita</div>
          <div className="cu-body cu-muted" style={{ marginTop: 6, lineHeight: 1.5 }}>
            Fotografe ou faça upload da receita. A IA interpreta automaticamente os medicamentos, doses e horários.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            <button onClick={() => setPhase('scanning')} style={{
              padding: 20, borderRadius: 20,
              background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <window.IconCamera size={26}/>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Fotografar receita</div>
                <div style={{ fontSize: 12, opacity: .7, marginTop: 3, lineHeight: 1.4 }}>Aponte a câmera para o papel da receita</div>
              </div>
            </button>

            <button onClick={() => setPhase('scanning')} style={{
              padding: 20, borderRadius: 20,
              background: 'var(--c-card)', color: 'var(--c-text)',
              border: '1px solid var(--c-line)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--c-accent-soft)', color: 'var(--c-accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <window.IconShare size={24}/>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Upload de imagem ou PDF</div>
                <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 3, lineHeight: 1.4 }}>Foto salva, PDF ou imagem da galeria</div>
              </div>
            </button>
          </div>

          <div style={{ marginTop: 24, padding: 16, borderRadius: 16, background: 'var(--c-surface)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <window.IconInfo size={18} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: 1 }}/>
            <div style={{ fontSize: 12, color: 'var(--c-text-soft)', lineHeight: 1.5 }}>
              Os dados são interpretados por IA e precisam de confirmação antes de serem salvos. Nenhuma informação é compartilhada com terceiros.
            </div>
          </div>
        </div>
      )}

      {phase === 'scanning' && (
        <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', height: 'calc(100% - 60px)' }}>
          {/* Camera viewfinder */}
          <div style={{ flex: 1, borderRadius: 22, background: '#0a0d0e', position: 'relative', overflow: 'hidden', minHeight: 340 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, rgba(212,232,230,.1), transparent 70%)' }}/>
            {/* Scan frame */}
            <div style={{
              position: 'absolute', top: '18%', left: '10%', right: '10%', bottom: '22%',
              border: '2px solid rgba(255,255,255,.5)', borderRadius: 14,
              boxShadow: '0 0 0 9999px rgba(0,0,0,.4)',
            }}>
              {/* Scanning line animation */}
              <div style={{
                position: 'absolute', left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, var(--c-accent-fg), transparent)',
                top: '40%', animation: 'scanLine 1.4s ease-in-out infinite',
              }}/>
            </div>
            <div style={{
              position: 'absolute', top: 16, left: 16, right: 16,
              padding: '8px 14px', borderRadius: 999,
              background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(10px)',
              color: '#fff', fontSize: 12, fontWeight: 500, textAlign: 'center',
            }}>Interpretando receita com IA…</div>
            {/* Recognized text lines (simulated) */}
            <div style={{ position: 'absolute', bottom: 80, left: '12%', right: '12%', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Atenolol 50mg', 'Losartana 50mg', 'Sinvastatina 20mg'].map((t, i) => (
                <div key={i} style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: 'rgba(212,232,230,.18)', border: '1px solid rgba(212,232,230,.3)',
                  color: '#d4e8e6', fontSize: 11, fontWeight: 600,
                  animation: `fadeIn .3s ease ${i * .4}s both`,
                }}>{t}</div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes scanLine { 0%,100%{top:10%} 50%{top:85%} }
            @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
          `}</style>
          <div style={{ padding: '16px 0 8px', textAlign: 'center', fontSize: 13, color: 'var(--c-text-soft)' }}>Reconhecendo medicamentos…</div>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--c-success-soft)', color: 'var(--c-success)', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
              <window.IconCheck size={32} stroke={2.5}/>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Receita reconhecida!</div>
            <div style={{ fontSize: 13, color: 'var(--c-text-soft)', marginTop: 4 }}>Dr. Ricardo Andrade · 12 de jun. 2026</div>
          </div>

          <div style={{ background: 'var(--c-card)', borderRadius: 16, border: '1px solid var(--c-line)', overflow: 'hidden', marginBottom: 16 }}>
            {OCR_MEDS.map((m, i) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < OCR_MEDS.length - 1 ? '1px solid var(--c-line)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--c-accent-soft)', color: 'var(--c-accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <window.IconPill size={18}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name} <span style={{ fontWeight: 400, color: 'var(--c-text-soft)' }}>{m.dose}</span></div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 1 }}>{m.freq} · {m.schedule}</div>
                </div>
                <window.IconCheck size={16} style={{ color: 'var(--c-success)' }}/>
              </div>
            ))}
          </div>

          <window.Button variant="primary" full size="lg" onClick={() => go && go('receita-confirm')}>
            Revisar e confirmar
          </window.Button>
          <window.Button variant="ghost" full size="md" style={{ marginTop: 10 }} onClick={() => setPhase('idle')}>
            Fotografar de novo
          </window.Button>
        </div>
      )}
    </window.Screen>
  );
}

// ════════════════════════════════════════════════════════════
// RECEITA CONFIRM
// ════════════════════════════════════════════════════════════
function ReceitaConfirmScreen({ go }) {
  const [meds, setMeds] = useRC(OCR_MEDS.map(m => ({ ...m })));
  const [editId, setEditId] = useRC(null);
  const [saved, setSaved] = useRC(false);

  function update(id, field, val) {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));
  }

  function handleConfirm() {
    setSaved(true);
    setTimeout(() => go && go('meds-v2'), 1200);
  }

  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <window.IconButton variant="plain" onClick={() => go && go('receitas')}><window.IconArrowL size={20}/></window.IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Revisar receita</div>
        <div style={{ width: 36 }}/>
      </div>

      {/* Doctor info */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{ padding: 14, borderRadius: 16, background: 'var(--c-accent-soft)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <window.Avatar name="Dr. Ricardo Andrade" color="var(--c-accent)" fg="var(--c-accent-fg)" size={40}/>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Dr. Ricardo Andrade</div>
            <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>CRM 12345 · SP · 12 de jun. 2026</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 12px' }}>Medicamentos reconhecidos — toque para editar</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {meds.map((m) => {
            const editing = editId === m.id;
            return (
              <div key={m.id} style={{
                borderRadius: 18, overflow: 'hidden',
                border: '1.5px solid ' + (editing ? 'var(--c-accent)' : 'var(--c-line)'),
                background: 'var(--c-card)',
              }}>
                <button onClick={() => setEditId(editing ? null : m.id)} style={{
                  width: '100%', padding: '14px 16px', background: 'transparent', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--c-accent-soft)', color: 'var(--c-accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <window.IconPill size={18}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name} <span style={{ fontWeight: 400, color: 'var(--c-text-soft)' }}>{m.dose}</span></div>
                    <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 2 }}>{m.freq} · {m.schedule}</div>
                  </div>
                  <window.IconChevD size={16} style={{ color: 'var(--c-text-muted)', transform: editing ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}/>
                </button>

                {editing && (
                  <div style={{ padding: '0 16px 14px', borderTop: '1px solid var(--c-line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      ['Nome', 'name', m.name],
                      ['Dose', 'dose', m.dose],
                      ['Horário', 'schedule', m.schedule],
                      ['Frequência', 'freq', m.freq],
                      ['Observação', 'notes', m.notes],
                    ].map(([label, field, val]) => (
                      <div key={field} style={{ paddingTop: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-text-muted)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                        <input
                          value={val}
                          onChange={e => update(m.id, field, e.target.value)}
                          style={{
                            width: '100%', padding: '10px 12px', borderRadius: 10,
                            border: '1.5px solid var(--c-line)', background: 'var(--c-surface)',
                            fontFamily: 'var(--font)', fontSize: 14, color: 'var(--c-text)',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: 'var(--c-surface)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <window.IconInfo size={16} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: 2 }}/>
          <div style={{ fontSize: 12, color: 'var(--c-text-soft)', lineHeight: 1.5 }}>
            Ao confirmar, os remédios serão lançados na lista de medicamentos com os horários definidos acima.
          </div>
        </div>

        <window.Button variant="primary" full size="lg" style={{ marginTop: 18, background: saved ? 'var(--c-success)' : undefined }} onClick={handleConfirm}>
          {saved ? '✓ Lançado com sucesso!' : 'Confirmar e lançar no sistema'}
        </window.Button>
        <window.Button variant="ghost" full size="md" style={{ marginTop: 10 }} onClick={() => go && go('receitas')}>
          Cancelar
        </window.Button>
      </div>
    </window.Screen>
  );
}

// ════════════════════════════════════════════════════════════
// LAUDO OCR
// ════════════════════════════════════════════════════════════
function LaudoOCRScreen({ go }) {
  const [phase, setPhase] = useRC('idle');
  const [confirmed, setConfirmed] = useRC({});

  useEffRC(() => {
    if (phase === 'processing') {
      const t = setTimeout(() => setPhase('results'), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  function handleConfirm() {
    setPhase('saved');
    setTimeout(() => go && go('exames-full'), 1200);
  }

  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <window.IconButton variant="plain" onClick={() => go && go('exames-full')}><window.IconArrowL size={20}/></window.IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Anexar laudo</div>
        <div style={{ width: 36 }}/>
      </div>

      {phase === 'idle' && (
        <div style={{ padding: '20px 20px 0' }}>
          <div className="cu-h1" style={{ fontSize: 26, letterSpacing: '-0.02em' }}>Laudo ou resultado</div>
          <div className="cu-body cu-muted" style={{ marginTop: 6, lineHeight: 1.5 }}>
            A IA lê o laudo e extrai automaticamente os valores para o histórico.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22 }}>
            {[
              [<window.IconCamera size={26}/>, 'Fotografar laudo', 'Aponte para o papel ou tela do resultado', 'var(--c-accent)', 'var(--c-accent-fg)'],
              [<window.IconShare size={24}/>, 'Upload PDF ou imagem', 'Arquivo salvo no celular ou nuvem', 'var(--c-surface)', 'var(--c-text)'],
            ].map(([icon, title, sub, bg, color], i) => (
              <button key={i} onClick={() => setPhase('processing')} style={{
                padding: 18, borderRadius: 18, background: bg, color,
                border: i === 1 ? '1px solid var(--c-line)' : 'none',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: i === 0 ? 'rgba(255,255,255,.12)' : 'var(--c-accent-soft)', color: i === 0 ? 'inherit' : 'var(--c-accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 12, opacity: .65, marginTop: 2 }}>{sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'processing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'var(--c-accent-soft)', color: 'var(--c-accent)', display: 'grid', placeItems: 'center' }}>
            <window.IconSearch size={34}/>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Interpretando laudo…</div>
            <div style={{ fontSize: 13, color: 'var(--c-text-soft)', marginTop: 6 }}>Identificando exames e valores de referência</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-accent)', opacity: .3, animation: `pulse .9s ease ${i * .3}s infinite` }}/>
            ))}
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
        </div>
      )}

      {(phase === 'results' || phase === 'saved') && (
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Valores reconhecidos</div>
            <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 3 }}>Hemograma + Bioquímica · Laboratório São Lucas · 10 jun. 2026</div>
          </div>

          <div style={{ background: 'var(--c-card)', borderRadius: 18, border: '1px solid var(--c-line)', overflow: 'hidden' }}>
            {OCR_LAUDO.map((r, i) => {
              const colors = { normal: ['var(--c-success-soft)', 'var(--c-success)'], alto: ['var(--c-alert-soft)', 'var(--c-alert)'], baixo: ['var(--c-warn-soft)', 'var(--c-warn)'] };
              const [bg, fg] = colors[r.status] || colors.normal;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < OCR_LAUDO.length - 1 ? '1px solid var(--c-line)' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.exam}</div>
                    <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 1 }}>Ref: {r.ref}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{r.value}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: bg, color: fg, letterSpacing: '.05em', textTransform: 'uppercase', flexShrink: 0 }}>{r.status}</span>
                </div>
              );
            })}
          </div>

          <window.Button variant="primary" full size="lg" style={{ marginTop: 18, background: phase === 'saved' ? 'var(--c-success)' : undefined }} onClick={handleConfirm}>
            {phase === 'saved' ? '✓ Salvo no histórico!' : 'Confirmar e anexar ao exame'}
          </window.Button>
          <window.Button variant="ghost" full size="md" style={{ marginTop: 10 }} onClick={() => setPhase('idle')}>
            Descartar e refazer
          </window.Button>
        </div>
      )}
    </window.Screen>
  );
}

Object.assign(window, { ReceitasScreen, ReceitaConfirmScreen, LaudoOCRScreen });
