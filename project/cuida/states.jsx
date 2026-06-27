// Cuida — States (empty, alert, success) + add-med modal

// ── EMPTY: primeiro acesso, sem perfil/sem remédios ──
function EmptyHomeScreen() {
  return (
    <window.Screen>
      <div style={{ padding: '4px 20px 14px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 4 }}>Boa tarde, Carla</div>
        <div className="cu-h2">Vamos começar.</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Empty state hero */}
        <div style={{
          background: 'var(--c-surface)', borderRadius: 24, padding: 24,
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'var(--c-card)', display: 'grid', placeItems: 'center',
            margin: '8px auto 18px', boxShadow: '0 4px 16px rgba(38,37,37,.06)',
          }}>
            <window.BrandMark size={44} style={{ color: 'var(--c-accent)' }}/>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>Ainda não tem perfis</div>
          <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 6, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.45 }}>
            Crie o primeiro perfil pra começar a cuidar — pode ser seu pai, sua mãe ou você mesmo.
          </div>
          <div style={{ marginTop: 20 }}>
            <window.Button variant="primary" size="md" icon={<window.IconPlus size={18}/>}>Criar primeiro perfil</window.Button>
          </div>
        </div>

        {/* "Como funciona" steps */}
        <div className="cu-eyebrow" style={{ padding: '24px 4px 12px' }}>Como funciona</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <HowStep n={1} title="Crie o perfil" sub="Nome, idade, alergias e plano"/>
          <HowStep n={2} title="Cadastre remédios" sub="Foto da caixa ou manual"/>
          <HowStep n={3} title="Convide a família" sub="Para dividir o cuidado"/>
        </div>
      </div>
    </window.Screen>
  );
}

function HowStep({ n, title, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: 14,
      borderRadius: 14, background: 'var(--c-card)', border: '1px solid var(--c-line)',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
        display: 'grid', placeItems: 'center',
        fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-display)',
      }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--c-text-soft)' }}>{sub}</div>
      </div>
    </div>
  );
}

// ── EMPTY: sem remédios ──
function EmptyMedsScreen() {
  return (
    <window.Screen>
      <window.ScreenHeader title="Remédios"/>
      <div style={{ padding: '0 20px' }}>
        <div style={{
          padding: 32, borderRadius: 22,
          background: 'var(--c-surface)', textAlign: 'center', marginTop: 24,
        }}>
          <div style={{ fontSize: 48 }}>💊</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Sem remédios ainda</div>
          <div style={{ fontSize: 13, color: 'var(--c-text-soft)', marginTop: 6, maxWidth: 240, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.4 }}>
            Adicione o primeiro tirando uma foto da caixa.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 22 }}>
            <window.Button variant="primary" size="md" icon={<window.IconCamera size={18}/>}>Por foto</window.Button>
            <window.Button variant="soft" size="md" icon={<window.IconPlus size={18}/>}>Manual</window.Button>
          </div>
        </div>
      </div>
    </window.Screen>
  );
}

// ── ALERT: estoque crítico + remédio esquecido ──
function AlertScreen() {
  return (
    <window.Screen>
      <div style={{ padding: '4px 20px 14px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 4, color: 'var(--c-alert)' }}>2 alertas pra Maria</div>
        <div className="cu-h2">Precisa de atenção.</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Big urgent banner */}
        <div style={{
          background: 'var(--c-alert)', color: '#fff', borderRadius: 22,
          padding: 22, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(255,255,255,.18)', display: 'grid', placeItems: 'center',
            }}>
              <window.IconAlert size={26}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', opacity: .8 }}>Dose esquecida</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>Atenolol das 13:00</div>
              <div style={{ fontSize: 12, opacity: .8, marginTop: 2 }}>Atrasada há 1h42</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button style={{
              flex: 1, padding: '12px 16px', borderRadius: 12,
              background: '#fff', color: 'var(--c-alert)', border: 'none',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <window.IconCheck size={16}/> Confirmar agora
            </button>
            <button style={{
              flex: 1, padding: '12px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,.15)', color: '#fff', border: 'none',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>Pular hoje</button>
          </div>
        </div>

        {/* Stock alert */}
        <div style={{
          marginTop: 12, padding: 18, borderRadius: 18,
          background: 'var(--c-alert-soft)', color: 'var(--c-alert)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(170,60,38,.18)', display: 'grid', placeItems: 'center',
          }}>
            <window.IconBox size={22}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>AAS 100mg acaba em 4 dias</div>
            <div style={{ fontSize: 12, opacity: .8, marginTop: 2 }}>4 comprimidos de 30 · Maria</div>
          </div>
          <window.IconChevR size={18}/>
        </div>

        {/* Suggestions */}
        <div className="cu-eyebrow" style={{ padding: '24px 4px 10px' }}>Outros perfis</div>
        <div style={{
          padding: 14, borderRadius: 14, background: 'var(--c-success-soft)',
          color: 'var(--c-success)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <window.IconCheck size={18}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>João e Eu estão em dia</div>
            <div style={{ fontSize: 11, opacity: .8, marginTop: 2 }}>Tudo confirmado hoje</div>
          </div>
        </div>
      </div>
    </window.Screen>
  );
}

// ── SUCCESS: tudo confirmado / perfil criado ──
function SuccessScreen() {
  return (
    <window.Screen>
      <div style={{ padding: '4px 20px 14px' }}>
        <div className="cu-eyebrow" style={{ marginBottom: 4 }}>Boa noite, Carla</div>
        <div className="cu-h2">Dia completo. ✓</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Success celebration */}
        <div style={{
          background: 'var(--c-accent)', color: 'var(--c-accent-fg)',
          borderRadius: 24, padding: 24, textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 200, height: 200,
            borderRadius: '50%', background: 'rgba(254,243,225,.06)',
          }}/>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--c-success)', display: 'grid', placeItems: 'center',
            margin: '8px auto 18px', position: 'relative',
            boxShadow: '0 0 0 8px rgba(35,100,68,.18)',
          }}>
            <window.IconCheck size={42} stroke={2.5} style={{ color: '#fff' }}/>
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' }}>Todas as doses<br/>confirmadas</div>
          <div style={{ fontSize: 14, opacity: .65, marginTop: 8 }}>4 de 4 · Maria · 8 dias em sequência</div>

          <div style={{
            marginTop: 22, padding: '12px 16px',
            background: 'rgba(254,243,225,.08)', borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
            fontSize: 12, fontWeight: 500, color: 'rgba(254,243,225,.85)',
          }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            Você não esquece de uma dose há 8 dias
          </div>
        </div>

        {/* Streak per profile */}
        <div className="cu-eyebrow" style={{ padding: '20px 4px 10px' }}>Sequência por perfil</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {window.CUIDA_DATA.PROFILES.map((p, i) => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 12,
              borderRadius: 14, background: 'var(--c-card)', border: '1px solid var(--c-line)',
            }}>
              <window.Avatar name={p.name} color={p.color} fg={p.fg} size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>{[8, 23, 12][i]} dias em sequência</div>
              </div>
              <div style={{
                padding: '4px 10px', borderRadius: 999,
                background: 'var(--c-success-soft)', color: 'var(--c-success)',
                fontSize: 11, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}><window.IconCheck size={12} stroke={2.5}/> em dia</div>
            </div>
          ))}
        </div>
      </div>
    </window.Screen>
  );
}

// ── ADD MED MODAL (camera flow) ──
function AddMedModalScreen({ go }) {
  return (
    <window.Screen hasTabBar={false}>
      <div style={{
        padding: '0 20px',
        height: '100%', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 4px 14px',
        }}>
          <window.IconButton variant="soft" size={36} onClick={() => go && go('meds-v2')}><window.IconClose size={18}/></window.IconButton>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Adicionar remédio</div>
          <div style={{ width: 36 }}/>
        </div>

        {/* Camera viewfinder */}
        <div style={{
          flex: 1, borderRadius: 22, overflow: 'hidden',
          background: '#0a0d0e', position: 'relative', minHeight: 280,
          marginBottom: 14,
        }}>
          {/* fake camera "view" */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(254,243,225,.12), transparent 60%)',
          }}/>
          {/* recognition box around target */}
          <div style={{
            position: 'absolute',
            top: '32%', left: '15%', right: '15%', bottom: '32%',
            border: '2.5px solid #fff', borderRadius: 18,
            boxShadow: '0 0 0 9999px rgba(0,0,0,.35)',
          }}>
            <Corner pos="tl"/><Corner pos="tr"/><Corner pos="bl"/><Corner pos="br"/>
          </div>
          {/* hint */}
          <div style={{
            position: 'absolute', top: 18, left: 18, right: 18,
            padding: '8px 14px', borderRadius: 999,
            background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(10px)',
            color: '#fff', fontSize: 12, fontWeight: 500,
            textAlign: 'center',
          }}>Aponte pra caixa do remédio</div>
          {/* found chip */}
          <div style={{
            position: 'absolute', bottom: 18, left: 18, right: 18,
            padding: '10px 14px', borderRadius: 14,
            background: 'rgba(35,100,68,.92)', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 10,
            backdropFilter: 'blur(10px)',
          }}>
            <window.IconCheck size={18}/>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Reconhecido</div>
              <div style={{ fontSize: 11, opacity: .85 }}>Atenolol 25mg · Genérico</div>
            </div>
          </div>
        </div>

        {/* big shutter */}
        <div style={{ padding: '6px 0 22px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36 }}>
          <window.IconButton variant="soft" size={50}><window.IconCamera size={22}/></window.IconButton>
          <button onClick={() => go && go('med-detail')} style={{
            width: 76, height: 76, borderRadius: '50%',
            background: 'var(--c-accent-fg)', border: '4px solid var(--c-accent)',
            cursor: 'pointer',
          }}/>
          <window.IconButton variant="soft" size={50}><window.IconPlus size={22}/></window.IconButton>
        </div>
      </div>
    </window.Screen>
  );
}

function Corner({ pos }) {
  const p = { tl: { top: -2, left: -2, borderTop: '4px solid #fff', borderLeft: '4px solid #fff', borderTopLeftRadius: 18 },
              tr: { top: -2, right: -2, borderTop: '4px solid #fff', borderRight: '4px solid #fff', borderTopRightRadius: 18 },
              bl: { bottom: -2, left: -2, borderBottom: '4px solid #fff', borderLeft: '4px solid #fff', borderBottomLeftRadius: 18 },
              br: { bottom: -2, right: -2, borderBottom: '4px solid #fff', borderRight: '4px solid #fff', borderBottomRightRadius: 18 } }[pos];
  return <div style={{ position: 'absolute', width: 22, height: 22, ...p }}/>;
}

Object.assign(window, {
  EmptyHomeScreen, EmptyMedsScreen, AlertScreen, SuccessScreen, AddMedModalScreen,
});
