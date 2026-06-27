// Cuida — Telas de conta & assinatura
// PlanoScreen · IndicarScreen · SignupScreen · RecuperarSenhaScreen

const { useState: useSA } = React;

// ════════════════════════════════════════════════════════════
// 1. GERENCIAR PLANO — assinatura família
// ════════════════════════════════════════════════════════════
function PlanoScreen({ go }) {
  const [cycle, setCycle] = useSA('anual');
  const PLANS = {
    mensal: { price: 'R$ 19,90', per: '/mês', save: null },
    anual:  { price: 'R$ 14,90', per: '/mês', save: 'Economize 25%' },
  };
  const plan = PLANS[cycle];

  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <window.IconButton variant="plain" onClick={() => go && go('settings')}><window.IconArrowL size={20}/></window.IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Plano família</div>
        <div style={{ width: 36 }}/>
      </div>

      {/* Current plan hero */}
      <div style={{ padding: '10px 20px 0' }}>
        <window.SoftCard background="var(--c-accent)" padding={20} radius={22}
          style={{ color: 'var(--c-accent-fg)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }}/>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', opacity: .6 }}>Plano atual</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>Família</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 999, background: 'var(--c-success)', color: '#fff', letterSpacing: '.05em', textTransform: 'uppercase' }}>Ativo</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, position: 'relative' }}>
            {[['Perfis', '3 / 5'], ['Renova em', '12 dias'], ['Desde', 'jan 2025']].map(([l, v]) => (
              <div key={l} style={{ flex: 1, background: 'rgba(255,255,255,.1)', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: 9, opacity: .65, marginTop: 2, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </window.SoftCard>
      </div>

      {/* Billing cycle toggle */}
      <div style={{ padding: '18px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Ciclo de cobrança</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[['anual', 'Anual'], ['mensal', 'Mensal']].map(([v, l]) => {
            const on = cycle === v;
            return (
              <button key={v} onClick={() => setCycle(v)} style={{
                flex: 1, padding: '14px 16px', borderRadius: 16, textAlign: 'left',
                background: on ? 'var(--c-accent-soft)' : 'var(--c-card)',
                border: '1.5px solid ' + (on ? 'var(--c-accent)' : 'var(--c-line)'),
                cursor: 'pointer', fontFamily: 'inherit', position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{l}</span>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '2px solid ' + (on ? 'var(--c-accent)' : 'var(--c-line-strong)'),
                    background: on ? 'var(--c-accent)' : 'transparent',
                    display: 'grid', placeItems: 'center',
                  }}>{on && <window.IconCheck size={11} stroke={3} style={{ color: 'var(--c-accent-fg)' }}/>}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8, letterSpacing: '-0.01em' }}>{PLANS[v].price}</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>{PLANS[v].per}</div>
                {PLANS[v].save && <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-success)', marginTop: 4 }}>{PLANS[v].save}</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div style={{ padding: '20px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Incluído no plano</div>
        <div style={{ background: 'var(--c-card)', borderRadius: 18, border: '1px solid var(--c-line)', overflow: 'hidden' }}>
          {[
            ['Até 5 perfis de familiares', true],
            ['Lembretes ilimitados por WhatsApp', true],
            ['Cartão de emergência compartilhável', true],
            ['Histórico médico completo', true],
            ['Convidar cuidadores sem custo', true],
          ].map(([t, ok], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 4 ? '1px solid var(--c-line)' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--c-success-soft)', color: 'var(--c-success)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <window.IconCheck size={14} stroke={2.5}/>
              </div>
              <span style={{ fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div style={{ padding: '20px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Forma de pagamento</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: 16,
          borderRadius: 16, background: 'var(--c-card)', border: '1px solid var(--c-line)',
        }}>
          <div style={{ width: 44, height: 30, borderRadius: 6, background: 'var(--c-text)', color: 'var(--c-accent-fg)', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, letterSpacing: '.04em' }}>VISA</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>•••• 4218</div>
            <div style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>Expira 09/27</div>
          </div>
          <window.IconChevR size={16} style={{ color: 'var(--c-text-muted)' }}/>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '22px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <window.Button variant="primary" full size="lg">Salvar alterações</window.Button>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--c-alert)', fontSize: 14, fontWeight: 500, padding: '4px 0', fontFamily: 'inherit' }}>
          Cancelar assinatura
        </button>
      </div>
    </window.Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 2. INDIQUE CUIDA — referral
// ════════════════════════════════════════════════════════════
function IndicarScreen({ go }) {
  const [copied, setCopied] = useSA(false);
  const code = 'CARLA1M';
  const invited = 2, target = 3;

  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <window.IconButton variant="plain" onClick={() => go && go('settings')}><window.IconArrowL size={20}/></window.IconButton>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Indique cuida</div>
        <div style={{ width: 36 }}/>
      </div>

      {/* Hero */}
      <div style={{ padding: '14px 20px 0', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: 'var(--c-accent-soft)', color: 'var(--c-accent)', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
          <window.IconHeart size={34}/>
        </div>
        <div className="cu-h1" style={{ fontSize: 26, letterSpacing: '-0.02em' }}>Ganhe 1 mês grátis</div>
        <div className="cu-body cu-muted" style={{ marginTop: 6, lineHeight: 1.5, maxWidth: 280, margin: '6px auto 0' }}>
          A cada amigo que assinar o cuida pelo seu convite, você ganha um mês — e ele também.
        </div>
      </div>

      {/* Code card */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{
          background: 'var(--c-card)', borderRadius: 18, border: '1.5px dashed var(--c-line-strong)',
          padding: 18, display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)' }}>Seu código</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '.08em', color: 'var(--c-accent)', marginTop: 4, fontFamily: 'ui-monospace, Menlo, monospace' }}>{code}</div>
          </div>
          <window.Button variant={copied ? 'success' : 'soft'} size="sm"
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }}>
            {copied ? '✓ Copiado' : 'Copiar'}
          </window.Button>
        </div>
      </div>

      {/* Share buttons */}
      <div style={{ padding: '12px 20px 0', display: 'flex', gap: 10 }}>
        <window.Button variant="primary" full icon={<window.IconWhatsApp size={18}/>}>WhatsApp</window.Button>
        <window.Button variant="outline" full icon={<window.IconShare size={18}/>}>Compartilhar</window.Button>
      </div>

      {/* Progress */}
      <div style={{ padding: '24px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Seu progresso</div>
        <div style={{ background: 'var(--c-surface)', borderRadius: 18, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{invited} de {target} amigos</span>
            <span style={{ fontSize: 12, color: 'var(--c-success)', fontWeight: 600 }}>{invited} {invited === 1 ? 'mês' : 'meses'} ganho{invited === 1 ? '' : 's'}</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[...Array(target)].map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 8, borderRadius: 999,
                background: i < invited ? 'var(--c-success)' : 'var(--c-line)',
              }}/>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--c-text-soft)', marginTop: 10 }}>Falta 1 amigo para o próximo mês grátis.</div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '20px 20px 0' }}>
        <div className="cu-eyebrow" style={{ padding: '0 4px 10px' }}>Como funciona</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Envie seu código', 'Compartilhe pelo WhatsApp ou link.'],
            ['Seu amigo assina', 'Ele ganha 1 mês grátis ao usar seu código.'],
            ['Vocês dois ganham', 'Você recebe 1 mês a cada assinatura confirmada.'],
          ].map(([t, d], i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: 14, borderRadius: 14, background: 'var(--c-card)', border: '1px solid var(--c-line)' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--c-accent)', color: 'var(--c-accent-fg)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 12, color: 'var(--c-text-soft)', marginTop: 2, lineHeight: 1.4 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </window.Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 3. CRIAR CONTA — signup
// ════════════════════════════════════════════════════════════
function SignupScreen({ go }) {
  const [loading, setLoading] = useSA(false);
  const [agree, setAgree] = useSA(true);

  function handleSignup() {
    setLoading(true);
    setTimeout(() => { setLoading(false); go && go('home'); }, 1200);
  }

  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '20px 28px 24px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
        <window.IconButton variant="plain" size={36} onClick={() => go && go('login')}>
          <window.IconArrowL size={20}/>
        </window.IconButton>

        <div style={{ marginTop: 28 }}>
          <window.BrandMark size={30} style={{ color: 'var(--c-accent)' }}/>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 16, lineHeight: 1.1 }}>
            Crie sua conta.
          </div>
          <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8 }}>
            Comece a cuidar de quem você ama em minutos.
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            ['Nome completo', 'Carla Almeida', false],
            ['E-mail', 'carla@email.com', false],
            ['Senha', '••••••••', true],
          ].map(([label, val, masked], i) => (
            <div key={i} style={{
              background: 'var(--c-card)', borderRadius: 16, padding: '14px 18px',
              border: '1px solid ' + (i === 0 ? 'var(--c-accent)' : 'var(--c-line)'),
              boxShadow: i === 0 ? '0 0 0 3px rgba(1,55,61,.07)' : 'none',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? 'var(--c-accent)' : 'var(--c-text-soft)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: masked ? '.14em' : '0', color: masked ? 'var(--c-text-muted)' : 'var(--c-text)' }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Terms */}
        <button onClick={() => setAgree(a => !a)} style={{
          display: 'flex', alignItems: 'center', gap: 10, marginTop: 16,
          background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', padding: 0,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
            border: '2px solid ' + (agree ? 'var(--c-accent)' : 'var(--c-line-strong)'),
            background: agree ? 'var(--c-accent)' : 'transparent',
            display: 'grid', placeItems: 'center',
          }}>{agree && <window.IconCheck size={13} stroke={2.5} style={{ color: 'var(--c-accent-fg)' }}/>}</div>
          <span style={{ fontSize: 12, color: 'var(--c-text-soft)', lineHeight: 1.4 }}>
            Concordo com os <span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>Termos</span> e a <span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>Política de privacidade</span>.
          </span>
        </button>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <window.Button variant="primary" size="lg" full onClick={handleSignup} style={{ opacity: (loading || !agree) ? .6 : 1 }}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </window.Button>
          <window.Button variant="ghost" size="lg" full>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 18, height: 18, background: '#fff', borderRadius: 4, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, color: '#4285F4', boxShadow: '0 0 0 1px var(--c-line)' }}>G</span>
              Continuar com Google
            </span>
          </window.Button>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color: 'var(--c-text-muted)', textAlign: 'center', paddingBottom: 8 }}>
          Já tem conta? <span onClick={() => go && go('login')} style={{ color: 'var(--c-accent)', fontWeight: 600, cursor: 'pointer' }}>Entrar</span>
        </div>
      </div>
    </window.Screen>
  );
}

// ════════════════════════════════════════════════════════════
// 4. RECUPERAR SENHA
// ════════════════════════════════════════════════════════════
function RecuperarSenhaScreen({ go }) {
  const [sent, setSent] = useSA(false);

  return (
    <window.Screen hasTabBar={false}>
      <div style={{ padding: '20px 28px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <window.IconButton variant="plain" size={36} onClick={() => go && go('login')}>
          <window.IconArrowL size={20}/>
        </window.IconButton>

        {!sent ? (
          <>
            <div style={{ marginTop: 36 }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: 'var(--c-accent-soft)', color: 'var(--c-accent)', display: 'grid', placeItems: 'center', marginBottom: 18 }}>
                <window.IconLock size={26}/>
              </div>
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Esqueceu a senha?
              </div>
              <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8, lineHeight: 1.5 }}>
                Sem problema. Informe seu e-mail e enviaremos um link para você criar uma nova senha.
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{
                background: 'var(--c-card)', borderRadius: 16, padding: '14px 18px',
                border: '1.5px solid var(--c-accent)', boxShadow: '0 0 0 3px rgba(1,55,61,.07)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-accent)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>E-mail</div>
                <div style={{ fontSize: 16, fontWeight: 500 }}>carla@email.com</div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 24 }}>
              <window.Button variant="primary" size="lg" full onClick={() => setSent(true)}>
                Enviar link de recuperação
              </window.Button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: 76, height: 76, borderRadius: 22, background: 'var(--c-success-soft)', color: 'var(--c-success)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
              <window.IconCheck size={38} stroke={2.5}/>
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>E-mail enviado!</div>
            <div style={{ fontSize: 14, color: 'var(--c-text-soft)', marginTop: 8, lineHeight: 1.5, maxWidth: 280, margin: '8px auto 0' }}>
              Enviamos um link para <strong style={{ color: 'var(--c-text)' }}>carla@email.com</strong>. Verifique sua caixa de entrada.
            </div>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <window.Button variant="primary" size="lg" full onClick={() => go && go('login')}>
                Voltar para o login
              </window.Button>
              <window.Button variant="ghost" size="md" full onClick={() => setSent(false)}>
                Reenviar e-mail
              </window.Button>
            </div>
          </div>
        )}
      </div>
    </window.Screen>
  );
}

Object.assign(window, {
  PlanoScreen, IndicarScreen, SignupScreen, RecuperarSenhaScreen,
});
