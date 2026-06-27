// Cuida — Onboarding flow (7 steps)

const D3 = window.CUIDA_DATA;

// ── 1. Welcome ──
function OnboardingWelcome({ next }) {
  return (
    <window.Screen hasTabBar={false}>
      <div style={{
        padding: '20px 28px 24px',
        display: 'flex', flexDirection: 'column', height: '100%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{
            background: 'transparent', border: 'none',
            color: 'var(--c-text-soft)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
          }}>Entrar →</button>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <window.BrandMark size={56} style={{ color: 'var(--c-accent)' }}/>
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            Organize a saúde<br/>de quem você cuida.
          </div>
          <div style={{ fontSize: 16, color: 'var(--c-text-soft)', lineHeight: 1.45, maxWidth: 320 }}>
            Remédios, estoque, alergias e plano em um só lugar — pra você e pra família toda.
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <window.Button variant="primary" size="lg" full onClick={next}>Começar</window.Button>
          <window.Button variant="ghost" size="lg" full>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 18, height: 18, background: '#fff', borderRadius: 4, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, color: '#4285F4', boxShadow: '0 0 0 1px var(--c-line)' }}>G</span>
              Continuar com Google
            </span>
          </window.Button>
        </div>

        <div style={{ marginTop: 18, fontSize: 11, color: 'var(--c-text-muted)', textAlign: 'center', lineHeight: 1.45 }}>
          Ao continuar, você concorda com os Termos e a Política de Privacidade.
        </div>
      </div>
    </window.Screen>
  );
}

// ── 2. Quem você cuida ──
function OnboardingWho({ next }) {
  const [pick, setPick] = React.useState(null);
  const options = [
    { id: 'mae',   label: 'Mãe / Pai',     emoji: '👵' },
    { id: 'conj',  label: 'Cônjuge',       emoji: '💞' },
    { id: 'filho', label: 'Filho(a)',      emoji: '🧒' },
    { id: 'eu',    label: 'Minha saúde',   emoji: '🙋' },
    { id: 'outro', label: 'Outra pessoa',  emoji: '➕' },
  ];
  return (
    <window.Screen hasTabBar={false}>
      <OnboardingNav step={2} total={7}/>
      <div style={{ padding: '0 24px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 6 }}>Etapa 2 de 7</div>
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Quem você quer organizar primeiro?</div>
        <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8 }}>Você pode adicionar mais pessoas depois.</div>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map(o => {
            const active = pick === o.id;
            return (
              <button key={o.id} onClick={() => setPick(o.id)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 16, borderRadius: 16,
                background: active ? 'var(--c-accent-soft)' : 'var(--c-card)',
                border: '1.5px solid ' + (active ? 'var(--c-accent)' : 'var(--c-line)'),
                cursor: 'pointer', fontFamily: 'inherit',
                width: '100%', textAlign: 'left',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'var(--c-surface)',
                  display: 'grid', placeItems: 'center', fontSize: 20,
                }}>{o.emoji}</div>
                <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--c-text)' }}>{o.label}</div>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: '2px solid ' + (active ? 'var(--c-accent)' : 'var(--c-line-strong)'),
                  background: active ? 'var(--c-accent)' : 'transparent',
                  display: 'grid', placeItems: 'center', color: 'var(--c-accent-fg)',
                }}>{active && <window.IconCheck size={14} stroke={2.5}/>}</div>
              </button>
            );
          })}
        </div>
      </div>

      <OnboardingFooter onNext={next} disabled={!pick}/>
    </window.Screen>
  );
}

// ── 3. Dados básicos ──
function OnboardingProfile({ next }) {
  return (
    <window.Screen hasTabBar={false}>
      <OnboardingNav step={3} total={7}/>
      <div style={{ padding: '0 24px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 6 }}>Etapa 3 de 7</div>
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Conta pra gente sobre ela.</div>

        <div style={{ display: 'grid', placeItems: 'center', margin: '28px 0 24px' }}>
          <button style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'var(--c-surface)', border: '2px dashed var(--c-line-strong)',
            display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--c-text-soft)',
            position: 'relative',
          }}>
            <window.IconCamera size={28}/>
            <div style={{
              position: 'absolute', bottom: -4, right: -4,
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
              display: 'grid', placeItems: 'center',
              boxShadow: '0 0 0 4px var(--c-bg)',
            }}>
              <window.IconPlus size={18}/>
            </div>
          </button>
          <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 10 }}>Toque pra adicionar foto</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="Nome" value="Maria"/>
          <Field label="Data de nascimento" value="14 / 05 / 1953" detail="72 anos"/>
          <Field label="Tipo sanguíneo" value="A+"/>
          <Field label="Alergias" value="Penicilina · Frutos do mar" multi/>
          <Field label="Convênio (opcional)" placeholder="Ex: Bradesco Saúde"/>
        </div>
      </div>
      <OnboardingFooter onNext={next}/>
    </window.Screen>
  );
}

function Field({ label, value, placeholder, detail, multi }) {
  return (
    <div style={{
      background: 'var(--c-card)', borderRadius: 14,
      padding: '12px 16px', border: '1px solid var(--c-line)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--c-text-soft)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>{label}</div>
        {detail && <div style={{ fontSize: 11, color: 'var(--c-text-muted)' }}>{detail}</div>}
      </div>
      <div style={{
        fontSize: 16, fontWeight: 500, marginTop: 4,
        color: value ? 'var(--c-text)' : 'var(--c-text-muted)',
      }}>{value || placeholder || '—'}</div>
    </div>
  );
}

// ── 4. Adicionar remédios — multi-horário + caixa + receita ──
function OnboardingMeds({ next }) {
  const [addedMeds, setAddedMeds] = React.useState([
    { id: 1, name: 'Losartana', dose: '50mg', emoji: '💊', color: 'rgb(254, 220, 195)', times: ['07:00'], hasBox: true, hasReceita: false },
    { id: 2, name: 'Atenolol',  dose: '25mg', emoji: '🔵', color: 'rgb(212, 232, 230)', times: ['13:00'], hasBox: false, hasReceita: true },
  ]);
  const [expandedId, setExpandedId] = React.useState(null);

  const PRESETS = ['07:00', '08:00', '12:00', '13:00', '18:00', '20:00', '22:00'];

  function toggleTime(medId, t) {
    setAddedMeds(meds => meds.map(m => {
      if (m.id !== medId) return m;
      const already = m.times.includes(t);
      return { ...m, times: already ? m.times.filter(x => x !== t) : [...m.times, t].sort() };
    }));
  }

  return (
    <window.Screen hasTabBar={false}>
      <OnboardingNav step={4} total={7}/>
      <div style={{ padding: '0 24px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 6 }}>Etapa 4 de 7</div>
        <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Quais remédios Maria toma?</div>
        <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8 }}>Aponte a câmera pra caixa — vamos preencher nome, dose e horários.</div>

        {/* Camera CTA */}
        <button style={{
          marginTop: 18, padding: 18, borderRadius: 20,
          background: 'var(--c-accent)', color: 'var(--c-accent-fg)', border: 'none',
          display: 'flex', alignItems: 'center', gap: 14, width: '100%', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left',
        }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(254,243,225,.14)', display: 'grid', placeItems: 'center' }}>
            <window.IconCamera size={26}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Foto da caixa do remédio</div>
            <div style={{ fontSize: 12, opacity: .65, marginTop: 2 }}>Reconhece nome, dose e validade</div>
          </div>
          <window.IconArrowR size={18}/>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }}/>
          <div style={{ fontSize: 11, color: 'var(--c-text-muted)', letterSpacing: '.1em' }}>OU</div>
          <div style={{ flex: 1, height: 1, background: 'var(--c-line)' }}/>
        </div>
        <window.Button variant="outline" full icon={<window.IconPlus size={16}/>} size="sm">Adicionar manualmente</window.Button>

        {/* Added meds */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '20px 4px 10px' }}>
          <div className="cu-eyebrow">Adicionados ({addedMeds.length})</div>
          <div style={{ fontSize: 11, color: 'var(--c-text-muted)' }}>Toque pra editar horários</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {addedMeds.map(med => (
            <div key={med.id} style={{
              borderRadius: 18, background: 'var(--c-card)', border: '1px solid var(--c-line)', overflow: 'hidden',
            }}>
              {/* Med header row */}
              <button onClick={() => setExpandedId(expandedId === med.id ? null : med.id)} style={{
                width: '100%', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                {/* Box preview */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: med.color, flexShrink: 0,
                  display: 'grid', placeItems: 'center', fontSize: 22, position: 'relative',
                }}>
                  {med.emoji}
                  {med.hasBox && <div style={{
                    position: 'absolute', bottom: 2, right: 2, width: 14, height: 14,
                    borderRadius: '50%', background: 'var(--c-success)', border: '2px solid var(--c-card)',
                    display: 'grid', placeItems: 'center',
                  }}>
                    <window.IconCheck size={8} stroke={3} style={{ color: '#fff' }}/>
                  </div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{med.name} <span style={{ fontWeight: 400, color: 'var(--c-text-soft)' }}>· {med.dose}</span></div>
                  {/* Time chips */}
                  <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
                    {med.times.map(t => (
                      <span key={t} style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                        background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
                      }}>{t}</span>
                    ))}
                    {/* Receita badge */}
                    {med.hasReceita && (
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: 'var(--c-success-soft)', color: 'var(--c-success)' }}>📄 receita</span>
                    )}
                  </div>
                </div>
                <window.IconChevD size={16} style={{
                  color: 'var(--c-text-muted)',
                  transform: expandedId === med.id ? 'rotate(180deg)' : 'none',
                  transition: 'transform .2s',
                }}/>
              </button>

              {/* Expanded: time picker + box + receita */}
              {expandedId === med.id && (
                <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--c-line)' }}>
                  {/* Horários */}
                  <div style={{ paddingTop: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-soft)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>Horários</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {PRESETS.map(t => {
                        const active = med.times.includes(t);
                        return (
                          <button key={t} onClick={() => toggleTime(med.id, t)} style={{
                            padding: '6px 12px', borderRadius: 999, fontFamily: 'inherit',
                            fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
                            background: active ? 'var(--c-accent)' : 'var(--c-surface)',
                            color: active ? 'var(--c-accent-fg)' : 'var(--c-text-soft)',
                            transition: 'all .15s ease',
                          }}>{active ? '✓ ' : ''}{t}</button>
                        );
                      })}
                    </div>
                    {med.times.length === 0 && <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 6 }}>Selecione pelo menos um horário</div>}
                  </div>

                  {/* Box image */}
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <button onClick={() => setAddedMeds(meds => meds.map(m => m.id === med.id ? { ...m, hasBox: true } : m))} style={{
                      flex: 1, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
                      background: med.hasBox ? 'var(--c-success-soft)' : 'var(--c-surface)',
                      border: '1px solid ' + (med.hasBox ? 'var(--c-success)' : 'var(--c-line)'),
                      color: med.hasBox ? 'var(--c-success)' : 'var(--c-text-soft)',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <window.IconCamera size={16}/>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{med.hasBox ? 'Caixa anexada ✓' : 'Foto da caixa'}</span>
                    </button>
                    <button onClick={() => setAddedMeds(meds => meds.map(m => m.id === med.id ? { ...m, hasReceita: true } : m))} style={{
                      flex: 1, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
                      background: med.hasReceita ? 'var(--c-success-soft)' : 'var(--c-surface)',
                      border: '1px solid ' + (med.hasReceita ? 'var(--c-success)' : 'var(--c-line)'),
                      color: med.hasReceita ? 'var(--c-success)' : 'var(--c-text-soft)',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{med.hasReceita ? 'Receita anexada ✓' : 'Receita médica'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <OnboardingFooter onNext={next} nextLabel="Continuar" disabled={addedMeds.some(m => m.times.length === 0)}/>
    </window.Screen>
  );
}

function MiniMed({ name, dose, time, emoji, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 12, borderRadius: 14, background: 'var(--c-card)', border: '1px solid var(--c-line)',
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: 'grid', placeItems: 'center', fontSize: 20 }}>{emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{name} <span style={{ fontWeight: 400, color: 'var(--c-text-soft)' }}>· {dose}</span></div>
        <div style={{ fontSize: 11, color: 'var(--c-text-muted)' }}>{time}</div>
      </div>
      <window.IconCheck size={18} style={{ color: 'var(--c-success)' }}/>
    </div>
  );
}

// ── 5. Estoque ──
function OnboardingStock({ next }) {
  return (
    <window.Screen hasTabBar={false}>
      <OnboardingNav step={5} total={7}/>
      <div style={{ padding: '0 24px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 6 }}>Etapa 5 de 7</div>
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Quanto tem em casa?</div>
        <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8 }}>Vamos te avisar antes do remédio acabar.</div>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <StockField name="Losartana 50mg" emoji="💊" color="rgb(254, 220, 195)" value={18}/>
          <StockField name="Atenolol 25mg" emoji="🔵" color="rgb(212, 232, 230)" value={22}/>
        </div>

        <div style={{
          marginTop: 18, padding: 14, borderRadius: 14,
          background: 'var(--c-success-soft)', color: 'var(--c-success)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <window.IconCheck size={18}/>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Vamos avisar 5 dias antes de acabar.</div>
        </div>
      </div>
      <OnboardingFooter onNext={next}/>
    </window.Screen>
  );
}

function StockField({ name, emoji, color, value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 14, borderRadius: 16,
      background: 'var(--c-card)', border: '1px solid var(--c-line)',
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: 'grid', placeItems: 'center', fontSize: 20 }}>{emoji}</div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{name}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--c-surface)', border: 'none', color: 'var(--c-text)', fontSize: 18, cursor: 'pointer' }}>−</button>
        <div style={{ minWidth: 32, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>{value}</div>
        <button style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--c-accent)', color: 'var(--c-accent-fg)', border: 'none', fontSize: 18, cursor: 'pointer' }}>+</button>
      </div>
    </div>
  );
}

// ── 6. Convidar família ──
function OnboardingInvite({ next }) {
  return (
    <window.Screen hasTabBar={false}>
      <OnboardingNav step={6} total={7}/>
      <div style={{ padding: '0 24px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 6 }}>Etapa 6 de 7</div>
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Quer trazer alguém da família?</div>
        <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8 }}>Cuidado fica mais leve quando dividido.</div>

        <div style={{
          marginTop: 24, padding: 18, borderRadius: 20,
          background: 'var(--c-surface)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ display: 'flex' }}>
            <window.Avatar name="A B" color="rgb(212, 232, 230)" size={40} style={{ marginRight: -10, border: '2px solid var(--c-surface)' }}/>
            <window.Avatar name="C D" color="rgb(254, 220, 195)" size={40} style={{ marginRight: -10, border: '2px solid var(--c-surface)' }}/>
            <window.Avatar name="E F" color="rgb(218, 235, 222)" size={40} style={{ border: '2px solid var(--c-surface)' }}/>
          </div>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--c-text)' }}>
            Mais de 60% dos cuidadores dividem com pelo menos 1 familiar
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <InviteRow icon={<window.IconWhatsApp size={20}/>} label="Convidar pelo WhatsApp" detail="Link gerado automaticamente"/>
          <InviteRow icon={<window.IconLink size={20}/>} label="Copiar link de convite"/>
          <InviteRow icon={<window.IconChat size={20}/>} label="Outro app"/>
        </div>

        <button style={{
          marginTop: 20, padding: 14, background: 'transparent', border: 'none',
          color: 'var(--c-text-soft)', fontSize: 14, cursor: 'pointer', width: '100%',
          fontFamily: 'inherit',
        }}>Pular por agora</button>
      </div>
      <OnboardingFooter onNext={next} nextLabel="Continuar"/>
    </window.Screen>
  );
}

function InviteRow({ icon, label, detail }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: 14, borderRadius: 14, background: 'var(--c-card)',
      border: '1px solid var(--c-line)', cursor: 'pointer', fontFamily: 'inherit',
      width: '100%', textAlign: 'left',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: 'var(--c-surface)', color: 'var(--c-accent)',
        display: 'grid', placeItems: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        {detail && <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>{detail}</div>}
      </div>
      <window.IconChevR size={18} style={{ color: 'var(--c-text-muted)' }}/>
    </button>
  );
}

// ── 7. WOW — Card de emergência ──
function OnboardingWow({ next }) {
  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ textAlign: 'center', padding: '12px 0 24px' }}>
          <div style={{
            display: 'inline-grid', placeItems: 'center',
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--c-success-soft)', color: 'var(--c-success)',
            marginBottom: 16,
          }}>
            <window.IconCheck size={32} stroke={2.5}/>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>Pronto.</div>
          <div style={{ fontSize: 15, color: 'var(--c-text-soft)', marginTop: 6, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
            Em uma emergência, este cartão pode salvar a Maria.
          </div>
        </div>

        <window.EmergencyCardCarteirinha profile={D3.PROFILES[0]}/>

        <div style={{ marginTop: 18, fontSize: 12, color: 'var(--c-text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
          Já está disponível na sua aba SOS. Você pode imprimir,<br/>compartilhar ou guardar na carteira do iPhone.
        </div>
      </div>

      <OnboardingFooter onNext={next} nextLabel="Ir pra Cuida →"/>
    </window.Screen>
  );
}

// ── Shared chrome ──
function OnboardingNav({ step, total }) {
  return (
    <div style={{
      padding: '0 24px 18px',
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <window.IconButton variant="plain" size={36}>
        <window.IconArrowL size={20}/>
      </window.IconButton>
      <div style={{ flex: 1, height: 4, background: 'var(--c-line)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(step/total)*100}%`, background: 'var(--c-accent)', borderRadius: 999, transition: 'width .3s ease' }}/>
      </div>
      <div style={{ fontSize: 12, color: 'var(--c-text-soft)', fontWeight: 600, minWidth: 36, textAlign: 'right' }}>{step}/{total}</div>
    </div>
  );
}

function OnboardingFooter({ onNext, nextLabel = 'Continuar', disabled }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '14px 24px 36px',
      background: 'linear-gradient(180deg, transparent, var(--c-bg) 30%)',
    }}>
      <window.Button variant="primary" size="lg" full onClick={onNext} style={{ opacity: disabled ? .5 : 1 }}>
        {nextLabel}
      </window.Button>
    </div>
  );
}

Object.assign(window, {
  OnboardingWelcome, OnboardingWho, OnboardingProfile, OnboardingMeds,
  OnboardingStock, OnboardingInvite, OnboardingWow,
});
