// Cuida — Main app composition
// Mounts: brand exploration · paletas · interactive prototype · variações · onboarding · estados

const { useState: useStateApp, useEffect: useEffectApp } = React;

// ════════════════════════════════════════════════════════════
// PALETTE WRAPPER — applies data-palette to a subtree
// ════════════════════════════════════════════════════════════
function PaletteWrap({ palette, children, style }) {
  return (
    <div data-palette={palette} style={{ width: '100%', height: '100%', ...style }}>
      {children}
    </div>
  );
}

// Wraps an iOS device so it scales to artboard
function IPhone({ children, dark, scale }) {
  // Standard iPhone 16 = 402x874. We'll fit within artboard.
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid', placeItems: 'center',
      background: 'transparent',
      padding: 0,
    }}>
      <div style={{ transform: scale ? `scale(${scale})` : 'none', transformOrigin: 'top center' }}>
        <window.IOSDevice width={402} height={874} dark={dark}>
          {children}
        </window.IOSDevice>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN INTERACTIVE PROTOTYPE — single iOS frame with router
// ════════════════════════════════════════════════════════════
function InteractivePrototype() {
  const [screen, setScreen] = useStateApp('home');
  const [prevScreen, setPrevScreen] = useStateApp('home');
  const [animKey, setAnimKey] = useStateApp(0);
  const tab = ['home','meds','stock','emerg','fam'].includes(screen) ? screen : 'home';

  // Tab-level screens (no slide animation — just switch)
  const TAB_SCREENS = new Set(['home','meds','stock','emerg','fam']);

  // History stack for back detection
  const historyRef = React.useRef(['home']);

  function navigate(next) {
    const hist = historyRef.current;
    // If going back (next is behind in history) pop; otherwise push
    const backIdx = hist.lastIndexOf(next);
    if (backIdx >= 0 && backIdx < hist.length - 1) {
      historyRef.current = hist.slice(0, backIdx + 1);
    } else {
      historyRef.current = [...hist, next];
    }
    setPrevScreen(screen);
    setAnimKey(k => k + 1);
    setScreen(next);
  }

  const screenMap = {
    home:             <window.HomeV3Screen go={navigate}/>,
    meds:             <window.MedsV2Screen go={navigate}/>,
    'meds-v2':        <window.MedsV2Screen go={navigate}/>,
    'med-detail':     <window.MedDetailScreen go={navigate}/>,
    stock:            <window.StockScreen go={navigate}/>,
    emerg:            <window.EmergencyScreen go={navigate}/>,
    fam:              <window.FamilyScreen go={navigate}/>,
    feed:             <window.FeedScreen go={navigate}/>,
    settings:         <window.SettingsScreen go={navigate}/>,
    'add-med':        <window.AddMedModalScreen go={navigate}/>,
    consultas:        <window.ConsultasScreen go={navigate}/>,
    'consulta-detail':<window.ConsultaDetailScreen go={navigate}/>,
    exames:           <window.ExamesScreen go={navigate}/>,
    'exames-full':    <window.ExamesFullScreen go={navigate}/>,
    prontuarios:      <window.ProntuariosScreen go={navigate}/>,
    'resumo-saude':   <window.ResumoSaudeScreen go={navigate}/>,
    historico:        <window.HistoricoMedicoScreen go={navigate}/>,
    vacinas:          <window.VacinasScreen go={navigate}/>,
    login:            <window.LoginScreen go={navigate}/>,
    'edit-profile':   <window.EditProfileScreen go={navigate}/>,
    'add-consulta':   <window.AgendarConsultaScreen go={navigate}/>,
    'add-exame':      <window.AddExameScreen go={navigate}/>,
    notificacoes:     <window.NotificacoesScreen go={navigate}/>,
    plano:            <window.PlanoScreen go={navigate}/>,
    indicar:          <window.IndicarScreen go={navigate}/>,
    signup:           <window.SignupScreen go={navigate}/>,
    'recuperar-senha':<window.RecuperarSenhaScreen go={navigate}/>,
    receitas:           <window.ReceitasScreen go={navigate}/>,
    'receita-confirm':  <window.ReceitaConfirmScreen go={navigate}/>,
    'laudo-ocr':        <window.LaudoOCRScreen go={navigate}/>,
    'consultas-cal':    <window.ConsultasCalendarioScreen go={navigate}/>,
    acompanhante:       <window.AcompanhanteScreen go={navigate}/>,
    mensagens:          <window.MensagensScreen go={navigate}/>,
  };

  // Determine animation direction
  const hist = historyRef.current;
  const isBack = hist.length >= 2 && hist[hist.length - 2] === prevScreen;
  const isTabSwitch = TAB_SCREENS.has(screen) && TAB_SCREENS.has(prevScreen);
  const animClass = isTabSwitch ? '' : isBack ? 'cu-screen-back' : 'cu-screen-enter';

  return (
    <window.IOSDevice width={402} height={874}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)', overflow: 'hidden' }}>
        <div
          key={animKey}
          className={animClass}
          style={{ position: 'absolute', inset: 0 }}
        >
          {screenMap[screen] || screenMap.home}
        </div>
        {screen !== 'add-med' && <window.TabBar active={tab} onChange={navigate}/>}
      </div>
    </window.IOSDevice>
  );
}

// ════════════════════════════════════════════════════════════
// BRAND — wordmark options
// ════════════════════════════════════════════════════════════
function BrandOption({ variant, label, theme = 'acolhimento' }) {
  return (
    <PaletteWrap palette={theme}>
      <div style={{
        width: '100%', height: '100%',
        background: 'var(--c-bg)', color: 'var(--c-text)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 32, borderRadius: 24,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-soft)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ display: 'grid', placeItems: 'center', flex: 1 }}>
          <window.CuidaWordmark size={42} variant={variant} color="var(--c-accent)"/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <window.MarkAbraco size={20} style={{ color: 'var(--c-accent)' }}/>
          <span style={{ fontSize: 11, color: 'var(--c-text-muted)' }}>símbolo isolado</span>
        </div>
      </div>
    </PaletteWrap>
  );
}

// ════════════════════════════════════════════════════════════
// PALETTE TILE — shows tokens for a palette
// ════════════════════════════════════════════════════════════
function PaletteTile({ palette, name, subtitle }) {
  return (
    <PaletteWrap palette={palette}>
      <div style={{
        width: '100%', height: '100%',
        background: 'var(--c-bg)', color: 'var(--c-text)',
        display: 'flex', flexDirection: 'column', padding: 24, borderRadius: 24, gap: 18,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-soft)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Paleta · {palette}</div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>{name}</div>
          <div style={{ fontSize: 13, color: 'var(--c-text-soft)', marginTop: 4, lineHeight: 1.4 }}>{subtitle}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Chip color="var(--c-accent)" label="Accent" sub="--c-accent" fg="var(--c-accent-fg)"/>
          <Chip color="var(--c-accent-soft)" label="Accent soft" sub="--c-accent-soft" fg="var(--c-text)"/>
          <Chip color="var(--c-surface)" label="Surface" sub="--c-surface" fg="var(--c-text)"/>
          <Chip color="var(--c-bg)" label="Background" sub="--c-bg" fg="var(--c-text)" border/>
        </div>

        {/* Mini button + card preview */}
        <div style={{
          background: 'var(--c-card)', borderRadius: 16, padding: 14,
          border: '1px solid var(--c-line)',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ fontSize: 11, color: 'var(--c-text-soft)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Prévia</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Cuidando bem hoje.</div>
          <div style={{ fontSize: 13, color: 'var(--c-text-soft)' }}>2 de 4 doses confirmadas</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <window.Button variant="primary" size="sm">Continuar</window.Button>
            <window.Button variant="soft" size="sm">Depois</window.Button>
          </div>
        </div>
      </div>
    </PaletteWrap>
  );
}

function Chip({ color, label, sub, fg, border }) {
  return (
    <div style={{
      background: color, color: fg, padding: '12px 14px', borderRadius: 12, minHeight: 64,
      border: border ? '1px solid var(--c-line)' : 'none',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 9, opacity: .7, fontFamily: 'ui-monospace, Menlo, monospace', letterSpacing: '.02em' }}>{sub}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════
function CuidaApp() {
  return (
    <window.DesignCanvas>
      {/* ── Brand ── */}
      <window.DCSection id="brand" title="Cuida — marca" subtitle="Wordmark + símbolo. Opção B (coração) escolhida — usada em todo o app.">
        <window.DCArtboard id="logo-heart" label="B · Coração · escolhida ✓" width={300} height={300}>
          <BrandOption variant="heart" label="Opção B · escolhida"/>
        </window.DCArtboard>
        <window.DCArtboard id="logo-abraco" label="A · Abraço" width={300} height={300}>
          <BrandOption variant="abraco" label="Opção A"/>
        </window.DCArtboard>
        <window.DCArtboard id="logo-hand" label="C · Mão cuidando" width={300} height={300}>
          <BrandOption variant="hand" label="Opção C"/>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Paletas ── */}
      <window.DCSection id="paletas" title="Paletas — direção escolhida" subtitle="Acolhimento (warm/cream/teal) confirmada como padrão. As outras seguem disponíveis no painel Tweaks.">
        <window.DCArtboard id="pal-warm" label="Acolhimento · escolhida ✓" width={340} height={520}>
          <PaletteTile palette="acolhimento" name="Acolhimento" subtitle="Direção escolhida. Quente, próximo, vibe brasileira."/>
        </window.DCArtboard>
        <window.DCArtboard id="pal-cool" label="Calma · disponível em Tweaks" width={340} height={520}>
          <PaletteTile palette="calma" name="Calma" subtitle="Healthtech sóbrio — disponível pra teste no painel."/>
        </window.DCArtboard>
        <window.DCArtboard id="pal-vida" label="Vida · disponível em Tweaks" width={340} height={520}>
          <PaletteTile palette="vida" name="Vida" subtitle="Botânico, terroso — disponível pra teste no painel."/>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Interactive prototype ── */}
      <window.DCSection id="app" title="App · interativo" subtitle="Toque na tab bar pra navegar. Home traz toggle Timeline/Lista; SOS traz toggle Tela de bloqueio/Carteirinha.">
        <window.DCArtboard id="app-main" label="Cuida · navegação completa" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <InteractivePrototype/>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Home variations (reference) ── */}
      <window.DCSection id="home-vars" title="Home — explorações" subtitle="V2 (Timeline) escolhida como padrão; V1 (Lista) disponível via toggle no app. V3 (Stack) descartada por agora.">
        <window.DCArtboard id="home-v2" label="V2 · Timeline · escolhida ✓" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.HomeTimelineScreen/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="home-v1" label="V1 · Lista · alternativa" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.HomeScreen go={() => {}} initialView="list"/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="home-v3" label="V3 · Stack · descartada" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.HomeStackScreen/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Emergency variations ── */}
      <window.DCSection id="sos-vars" title="Cartão de emergência — explorações" subtitle="V2 (Lock screen) escolhida como padrão; V1 (Carteirinha) disponível via toggle. V3 (QR maximalista) descartada.">
        <window.DCArtboard id="sos-v2" label="V2 · Lock screen · escolhida ✓" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874} dark>
              <div style={{ position: 'absolute', inset: 0 }}>
                <window.EmergencyLockscreenScreen/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="sos-v1" label="V1 · Carteirinha · alternativa" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.EmergencyScreen go={() => {}} initialView="carteirinha"/>
                <window.TabBar active="emerg" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="sos-v3" label="V3 · QR · descartada" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <window.EmergencyQRScreen/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Onboarding flow ── */}
      <window.DCSection id="onb" title="Onboarding · fluxo de 7 etapas" subtitle="Termina com o card de emergência — momento wow.">
        <window.DCArtboard id="onb-1" label="01 · Boas-vindas" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingWelcome next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="onb-2" label="02 · Quem cuidar" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingWho next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="onb-3" label="03 · Dados básicos" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingProfile next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="onb-4" label="04 · Remédios" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingMeds next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="onb-5" label="05 · Estoque" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingStock next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="onb-6" label="06 · Convidar" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingInvite next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="onb-7" label="07 · WOW · Cartão SOS" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingWow next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Estados ── */}
      <window.DCSection id="estados" title="Estados — empty · alerta · sucesso" subtitle="O mesmo app em momentos diferentes da vida do usuário.">
        <window.DCArtboard id="empty-home" label="Empty · Home" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.EmptyHomeScreen/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="empty-meds" label="Empty · Remédios" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.EmptyMedsScreen/>
                <window.TabBar active="meds" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="alert" label="Alerta · 2 itens críticos" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.AlertScreen/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="success" label="Sucesso · streak 8 dias" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.SuccessScreen/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="add-med-modal" label="Modal · adicionar por foto" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.AddMedModalScreen/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Home nova ── */}
      <window.DCSection id="home-v3" title="Home v3 — dashboard de saúde" subtitle="Resumo do dia (remédios, consulta, exames, estoque) + atalhos rápidos + timeline/lista de meds.">
        <window.DCArtboard id="home-v3-main" label="Home v3 · dashboard completo" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.HomeV3Screen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Novos módulos de saúde ── */}
      <window.DCSection id="saude" title="Registros de saúde" subtitle="Consultas · Medicamentos v2 · Exames · Prontuários. Todas no design system Cuida.">
        <window.DCArtboard id="consultas" label="Consultas · prep checklist" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ConsultasScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="meds-v2" label="Medicamentos v2 · streak + dose" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.MedsV2Screen go={() => {}}/>
                <window.TabBar active="meds" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="exames" label="Exames · laudo + prep" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ExamesScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="prontuarios" label="Prontuários · health passport" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ProntuariosScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Telas de detalhe ── */}
      <window.DCSection id="detalhes" title="Telas de detalhe" subtitle="Medicamento com caixa + receita + horários · Detalhe de consulta + anotações · Resumo de saúde · Histórico médico · Exames completos">
        <window.DCArtboard id="med-detail" label="Detalhe do remédio" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.MedDetailScreen go={() => {}}/>
                <window.TabBar active="meds" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="consulta-detail" label="Detalhe da consulta" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ConsultaDetailScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="resumo-saude" label="Resumo de saúde" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ResumoSaudeScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="historico" label="Histórico médico" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.HistoricoMedicoScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="exames-full" label="Exames · atrasado/pendente/realizado" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ExamesFullScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Onboarding atualizado ── */}
      <window.DCSection id="onb-meds-v2" title="Onboarding · card 4 atualizado" subtitle="Múltiplos horários por remédio, foto da caixa e receita — tudo inline, expansível por card.">
        <window.DCArtboard id="onb-meds-new" label="Card 4 · múltiplos horários" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <window.IOSDevice width={402} height={874}>
                <window.OnboardingMeds next={() => {}}/>
              </window.IOSDevice>
            </div>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Other screens ── */}
      <window.DCSection id="outros" title="Outras telas" subtitle="Feed (V2) e Configurações.">
        <window.DCArtboard id="feed" label="Feed da família" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.FeedScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="settings" label="Configurações" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.SettingsScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Novas telas ── */}
      <window.DCSection id="novas" title="Novas telas" subtitle="Vacinas · Login · Editar perfil · Agendar consulta · Adicionar exame · Notificações">
        <window.DCArtboard id="vacinas-screen" label="Vacinas · carteira" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.VacinasScreen go={() => {}}/>
                <window.TabBar active="home" onChange={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="login-screen" label="Login · retorno" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.LoginScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="edit-profile-screen" label="Editar perfil" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.EditProfileScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="agendar-consulta" label="Agendar consulta · 3 passos" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.AgendarConsultaScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="add-exame-screen" label="Adicionar exame" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.AddExameScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="notificacoes-screen" label="Notificações · preferências" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.NotificacoesScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Conta & assinatura ── */}
      <window.DCSection id="conta" title="Conta & assinatura" subtitle="Gerenciar plano família · Indique e ganhe · Criar conta · Recuperar senha. Telas novas que completam os fluxos de conta.">
        <window.DCArtboard id="plano-screen" label="Gerenciar plano · família" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.PlanoScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="indicar-screen" label="Indique cuida · referral" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.IndicarScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="signup-screen" label="Criar conta · signup" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.SignupScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="recuperar-screen" label="Recuperar senha" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.RecuperarSenhaScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Receitas + Laudos OCR ── */}
      <window.DCSection id="ocr" title="Receitas & Laudos — OCR com IA" subtitle="Fotografe a receita e a IA interpreta medicamentos, doses e horários para confirmação. Mesmo fluxo para laudos.">
        <window.DCArtboard id="receitas-idle" label="Receitas · tela inicial" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ReceitasScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="receita-confirm" label="Revisar receita · confirmar" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ReceitaConfirmScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="laudo-ocr" label="Laudo OCR · valores reconhecidos" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.LaudoOCRScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

      {/* ── Consultas Calendário + Acompanhante + Mensagens ── */}
      <window.DCSection id="social" title="Calendário · Acompanhante · Mensagens" subtitle="Visão mensal de consultas com responsável por evento · Delegação de acompanhante com aceite/recusa · Chat interno da família.">
        <window.DCArtboard id="consultas-cal" label="Calendário de consultas" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.ConsultasCalendarioScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="acompanhante" label="Acompanhante · convite familiar" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.AcompanhanteScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
        <window.DCArtboard id="mensagens" label="Mensagens · família" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <window.IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <window.MensagensScreen go={() => {}}/>
              </div>
            </window.IOSDevice>
          </div>
        </window.DCArtboard>
      </window.DCSection>

    </window.DesignCanvas>
  );
}

// ════════════════════════════════════════════════════════════
// ROOT + GLOBAL TWEAKS
// ════════════════════════════════════════════════════════════
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "acolhimento",
  "density": "cozy",
  "accent": "default",
  "logo": "abraco"
}/*EDITMODE-END*/;

function Root() {
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectApp(() => {
    document.documentElement.setAttribute('data-palette', t.palette);
    document.documentElement.setAttribute('data-density', t.density);
    // accent override
    if (t.accent && t.accent !== 'default') {
      const accents = {
        teal:    { a: 'rgb(1, 55, 61)',  s: 'rgb(212, 232, 230)', fg: 'rgb(254, 243, 225)' },
        navy:    { a: 'rgb(28, 51, 92)', s: 'rgb(207, 222, 240)', fg: '#f5f8fd' },
        olive:   { a: 'rgb(56, 72, 42)', s: 'rgb(216, 226, 195)', fg: '#f8f6ef' },
        rust:    { a: 'rgb(122, 38, 36)', s: 'rgb(248, 213, 190)', fg: '#fffaf5' },
        plum:    { a: 'rgb(82, 36, 88)', s: 'rgb(228, 209, 232)', fg: '#fdf6fb' },
      };
      const c = accents[t.accent];
      if (c) {
        document.documentElement.style.setProperty('--c-accent', c.a);
        document.documentElement.style.setProperty('--c-accent-soft', c.s);
        document.documentElement.style.setProperty('--c-accent-fg', c.fg);
      }
    } else {
      document.documentElement.style.removeProperty('--c-accent');
      document.documentElement.style.removeProperty('--c-accent-soft');
      document.documentElement.style.removeProperty('--c-accent-fg');
    }
  }, [t]);

  return (
    <React.Fragment>
      <CuidaApp/>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Paleta global">
          <TweakRadio
            label="Direção"
            value={t.palette}
            onChange={(v) => setTweak('palette', v)}
            options={[
              { value: 'acolhimento', label: 'Acolh.' },
              { value: 'calma',       label: 'Calma' },
              { value: 'vida',        label: 'Vida' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Accent override">
          <TweakSelect
            label="Cor"
            value={t.accent}
            onChange={(v) => setTweak('accent', v)}
            options={[
              { value: 'default', label: 'Padrão da paleta' },
              { value: 'teal',    label: 'Teal escuro' },
              { value: 'navy',    label: 'Azul-marinho' },
              { value: 'olive',   label: 'Verde-musgo' },
              { value: 'rust',    label: 'Telha' },
              { value: 'plum',    label: 'Ameixa' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Densidade">
          <TweakRadio
            label="Espaço"
            value={t.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'cozy',    label: 'Arejado' },
              { value: 'compact', label: 'Compacto' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root/>);
