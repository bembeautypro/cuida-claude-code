// Cuida — Main app composition
import React, { useState as useStateApp, useEffect as useEffectApp } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext.jsx';
import { PatientProvider } from './lib/PatientContext.jsx';

// UI + design system
import { IOSDevice } from './ios-frame.jsx';
import { DesignCanvas, DCSection, DCArtboard } from './design-canvas.jsx';
import { TabBar } from './micro.jsx';
import { CuidaWordmark, Button } from './ui.jsx';
import { BrandMark, MarkAbraco } from './icons.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect } from './tweaks-panel.jsx';

// Screens
import { HomeScreen, StockScreen, EmergencyScreen, FamilyScreen, FeedScreen, SettingsScreen } from './screens.jsx';
import { ConsultasScreen, MedsV2Screen, ExamesScreen, ProntuariosScreen } from './newscreens.jsx';
import { MedDetailScreen, ConsultaDetailScreen, ResumoSaudeScreen, HistoricoMedicoScreen, ExamesFullScreen, HomeV3Screen } from './healthscreens.jsx';
import { HomeTimelineScreen, HomeStackScreen, EmergencyLockscreenScreen, EmergencyQRScreen } from './variations.jsx';
import { EmptyHomeScreen, EmptyMedsScreen, AlertScreen, SuccessScreen, AddMedModalScreen } from './states.jsx';
import { OnboardingWelcome, OnboardingWho, OnboardingProfile, OnboardingMeds, OnboardingStock, OnboardingInvite, OnboardingWow } from './onboarding.jsx';
import { VacinasScreen, LoginScreen, EditProfileScreen, AgendarConsultaScreen, AddExameScreen, NotificacoesScreen } from './morescreens.jsx';
import { PlanoScreen, IndicarScreen, SignupScreen, RecuperarSenhaScreen } from './accountscreens.jsx';
import { ReceitasScreen, ReceitaConfirmScreen, LaudoOCRScreen } from './receitasscreens.jsx';
import { ConsultasCalendarioScreen, AcompanhanteScreen, MensagensScreen } from './featurescreens.jsx';

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
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid', placeItems: 'center',
      background: 'transparent',
      padding: 0,
    }}>
      <div style={{ transform: scale ? `scale(${scale})` : 'none', transformOrigin: 'top center' }}>
        <IOSDevice width={402} height={874} dark={dark}>
          {children}
        </IOSDevice>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN INTERACTIVE PROTOTYPE — single iOS frame with router
// ════════════════════════════════════════════════════════════
function InteractivePrototype() {
  const { user } = useAuth();
  const [screen, setScreen] = useStateApp(() => user ? 'home' : 'login');
  const [prevScreen, setPrevScreen] = useStateApp(() => user ? 'home' : 'login');
  const [animKey, setAnimKey] = useStateApp(0);
  const tab = ['home','meds','stock','emerg','fam'].includes(screen) ? screen : 'home';

  // Tab-level screens (no slide animation — just switch)
  const TAB_SCREENS = new Set(['home','meds','stock','emerg','fam']);

  // History stack for back detection
  const historyRef = React.useRef([user ? 'home' : 'login']);

  // Redirect to login on signout
  useEffectApp(() => {
    if (user === null) {
      historyRef.current = ['login'];
      setPrevScreen('login');
      setScreen('login');
    }
  }, [user]);

  function navigate(next) {
    const hist = historyRef.current;
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
    home:             <HomeV3Screen go={navigate}/>,
    meds:             <MedsV2Screen go={navigate}/>,
    'meds-v2':        <MedsV2Screen go={navigate}/>,
    'med-detail':     <MedDetailScreen go={navigate}/>,
    stock:            <StockScreen go={navigate}/>,
    emerg:            <EmergencyScreen go={navigate}/>,
    fam:              <FamilyScreen go={navigate}/>,
    feed:             <FeedScreen go={navigate}/>,
    settings:         <SettingsScreen go={navigate}/>,
    'add-med':        <AddMedModalScreen go={navigate}/>,
    consultas:        <ConsultasScreen go={navigate}/>,
    'consulta-detail':<ConsultaDetailScreen go={navigate}/>,
    exames:           <ExamesScreen go={navigate}/>,
    'exames-full':    <ExamesFullScreen go={navigate}/>,
    prontuarios:      <ProntuariosScreen go={navigate}/>,
    'resumo-saude':   <ResumoSaudeScreen go={navigate}/>,
    historico:        <HistoricoMedicoScreen go={navigate}/>,
    vacinas:          <VacinasScreen go={navigate}/>,
    login:            <LoginScreen go={navigate}/>,
    'edit-profile':   <EditProfileScreen go={navigate}/>,
    'add-consulta':   <AgendarConsultaScreen go={navigate}/>,
    'add-exame':      <AddExameScreen go={navigate}/>,
    notificacoes:     <NotificacoesScreen go={navigate}/>,
    plano:            <PlanoScreen go={navigate}/>,
    indicar:          <IndicarScreen go={navigate}/>,
    signup:           <SignupScreen go={navigate}/>,
    'recuperar-senha':<RecuperarSenhaScreen go={navigate}/>,
    receitas:           <ReceitasScreen go={navigate}/>,
    'receita-confirm':  <ReceitaConfirmScreen go={navigate}/>,
    'laudo-ocr':        <LaudoOCRScreen go={navigate}/>,
    'consultas-cal':    <ConsultasCalendarioScreen go={navigate}/>,
    acompanhante:       <AcompanhanteScreen go={navigate}/>,
    mensagens:          <MensagensScreen go={navigate}/>,
  };

  // Determine animation direction
  const hist = historyRef.current;
  const isBack = hist.length >= 2 && hist[hist.length - 2] === prevScreen;
  const isTabSwitch = TAB_SCREENS.has(screen) && TAB_SCREENS.has(prevScreen);
  const animClass = isTabSwitch ? '' : isBack ? 'cu-screen-back' : 'cu-screen-enter';

  return (
    <IOSDevice width={402} height={874}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)', overflow: 'hidden' }}>
        <div
          key={animKey}
          className={animClass}
          style={{ position: 'absolute', inset: 0 }}
        >
          {screenMap[screen] || screenMap.home}
        </div>
        {screen !== 'add-med' && <TabBar active={tab} onChange={navigate}/>}
      </div>
    </IOSDevice>
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
          <CuidaWordmark size={42} variant={variant} color="var(--c-accent)"/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <MarkAbraco size={20} style={{ color: 'var(--c-accent)' }}/>
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
            <Button variant="primary" size="sm">Continuar</Button>
            <Button variant="soft" size="sm">Depois</Button>
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
    <DesignCanvas>
      {/* ── Brand ── */}
      <DCSection id="brand" title="Cuida — marca" subtitle="Wordmark + símbolo. Opção B (coração) escolhida — usada em todo o app.">
        <DCArtboard id="logo-heart" label="B · Coração · escolhida ✓" width={300} height={300}>
          <BrandOption variant="heart" label="Opção B · escolhida"/>
        </DCArtboard>
        <DCArtboard id="logo-abraco" label="A · Abraço" width={300} height={300}>
          <BrandOption variant="abraco" label="Opção A"/>
        </DCArtboard>
        <DCArtboard id="logo-hand" label="C · Mão cuidando" width={300} height={300}>
          <BrandOption variant="hand" label="Opção C"/>
        </DCArtboard>
      </DCSection>

      {/* ── Paletas ── */}
      <DCSection id="paletas" title="Paletas — direção escolhida" subtitle="Acolhimento (warm/cream/teal) confirmada como padrão. As outras seguem disponíveis no painel Tweaks.">
        <DCArtboard id="pal-warm" label="Acolhimento · escolhida ✓" width={340} height={520}>
          <PaletteTile palette="acolhimento" name="Acolhimento" subtitle="Direção escolhida. Quente, próximo, vibe brasileira."/>
        </DCArtboard>
        <DCArtboard id="pal-cool" label="Calma · disponível em Tweaks" width={340} height={520}>
          <PaletteTile palette="calma" name="Calma" subtitle="Healthtech sóbrio — disponível pra teste no painel."/>
        </DCArtboard>
        <DCArtboard id="pal-vida" label="Vida · disponível em Tweaks" width={340} height={520}>
          <PaletteTile palette="vida" name="Vida" subtitle="Botânico, terroso — disponível pra teste no painel."/>
        </DCArtboard>
      </DCSection>

      {/* ── Interactive prototype ── */}
      <DCSection id="app" title="App · interativo" subtitle="Toque na tab bar pra navegar. Home traz toggle Timeline/Lista; SOS traz toggle Tela de bloqueio/Carteirinha.">
        <DCArtboard id="app-main" label="Cuida · navegação completa" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <InteractivePrototype/>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Home variations (reference) ── */}
      <DCSection id="home-vars" title="Home — explorações" subtitle="V2 (Timeline) escolhida como padrão; V1 (Lista) disponível via toggle no app. V3 (Stack) descartada por agora.">
        <DCArtboard id="home-v2" label="V2 · Timeline · escolhida ✓" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <HomeTimelineScreen/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="home-v1" label="V1 · Lista · alternativa" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <HomeScreen go={() => {}} initialView="list"/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="home-v3" label="V3 · Stack · descartada" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <HomeStackScreen/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Emergency variations ── */}
      <DCSection id="sos-vars" title="Cartão de emergência — explorações" subtitle="V2 (Lock screen) escolhida como padrão; V1 (Carteirinha) disponível via toggle. V3 (QR maximalista) descartada.">
        <DCArtboard id="sos-v2" label="V2 · Lock screen · escolhida ✓" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874} dark>
              <div style={{ position: 'absolute', inset: 0 }}>
                <EmergencyLockscreenScreen/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="sos-v1" label="V1 · Carteirinha · alternativa" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <EmergencyScreen go={() => {}} initialView="carteirinha"/>
                <TabBar active="emerg" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="sos-v3" label="V3 · QR · descartada" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <EmergencyQRScreen/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Onboarding flow ── */}
      <DCSection id="onb" title="Onboarding · fluxo de 7 etapas" subtitle="Termina com o card de emergência — momento wow.">
        <DCArtboard id="onb-1" label="01 · Boas-vindas" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingWelcome next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="onb-2" label="02 · Quem cuidar" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingWho next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="onb-3" label="03 · Dados básicos" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingProfile next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="onb-4" label="04 · Remédios" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingMeds next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="onb-5" label="05 · Estoque" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingStock next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="onb-6" label="06 · Convidar" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingInvite next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="onb-7" label="07 · WOW · Cartão SOS" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingWow next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Estados ── */}
      <DCSection id="estados" title="Estados — empty · alerta · sucesso" subtitle="O mesmo app em momentos diferentes da vida do usuário.">
        <DCArtboard id="empty-home" label="Empty · Home" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <EmptyHomeScreen/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="empty-meds" label="Empty · Remédios" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <EmptyMedsScreen/>
                <TabBar active="meds" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="alert" label="Alerta · 2 itens críticos" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <AlertScreen/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="success" label="Sucesso · streak 8 dias" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <SuccessScreen/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="add-med-modal" label="Modal · adicionar por foto" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <AddMedModalScreen/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Home nova ── */}
      <DCSection id="home-v3" title="Home v3 — dashboard de saúde" subtitle="Resumo do dia (remédios, consulta, exames, estoque) + atalhos rápidos + timeline/lista de meds.">
        <DCArtboard id="home-v3-main" label="Home v3 · dashboard completo" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <HomeV3Screen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Novos módulos de saúde ── */}
      <DCSection id="saude" title="Registros de saúde" subtitle="Consultas · Medicamentos v2 · Exames · Prontuários. Todas no design system Cuida.">
        <DCArtboard id="consultas" label="Consultas · prep checklist" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ConsultasScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="meds-v2" label="Medicamentos v2 · streak + dose" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <MedsV2Screen go={() => {}}/>
                <TabBar active="meds" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="exames" label="Exames · laudo + prep" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ExamesScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="prontuarios" label="Prontuários · health passport" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ProntuariosScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Telas de detalhe ── */}
      <DCSection id="detalhes" title="Telas de detalhe" subtitle="Medicamento com caixa + receita + horários · Detalhe de consulta + anotações · Resumo de saúde · Histórico médico · Exames completos">
        <DCArtboard id="med-detail" label="Detalhe do remédio" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <MedDetailScreen go={() => {}}/>
                <TabBar active="meds" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="consulta-detail" label="Detalhe da consulta" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ConsultaDetailScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="resumo-saude" label="Resumo de saúde" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ResumoSaudeScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="historico" label="Histórico médico" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <HistoricoMedicoScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="exames-full" label="Exames · atrasado/pendente/realizado" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ExamesFullScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Onboarding atualizado ── */}
      <DCSection id="onb-meds-v2" title="Onboarding · card 4 atualizado" subtitle="Múltiplos horários por remédio, foto da caixa e receita — tudo inline, expansível por card.">
        <DCArtboard id="onb-meds-new" label="Card 4 · múltiplos horários" width={360} height={780}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <IOSDevice width={402} height={874}>
                <OnboardingMeds next={() => {}}/>
              </IOSDevice>
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Other screens ── */}
      <DCSection id="outros" title="Outras telas" subtitle="Feed (V2) e Configurações.">
        <DCArtboard id="feed" label="Feed da família" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <FeedScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="settings" label="Configurações" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <SettingsScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Novas telas ── */}
      <DCSection id="novas" title="Novas telas" subtitle="Vacinas · Login · Editar perfil · Agendar consulta · Adicionar exame · Notificações">
        <DCArtboard id="vacinas-screen" label="Vacinas · carteira" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <VacinasScreen go={() => {}}/>
                <TabBar active="home" onChange={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="login-screen" label="Login · retorno" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <LoginScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="edit-profile-screen" label="Editar perfil" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <EditProfileScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="agendar-consulta" label="Agendar consulta · 3 passos" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <AgendarConsultaScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="add-exame-screen" label="Adicionar exame" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <AddExameScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="notificacoes-screen" label="Notificações · preferências" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <NotificacoesScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Conta & assinatura ── */}
      <DCSection id="conta" title="Conta & assinatura" subtitle="Gerenciar plano família · Indique e ganhe · Criar conta · Recuperar senha. Telas novas que completam os fluxos de conta.">
        <DCArtboard id="plano-screen" label="Gerenciar plano · família" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <PlanoScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="indicar-screen" label="Indique cuida · referral" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <IndicarScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="signup-screen" label="Criar conta · signup" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <SignupScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="recuperar-screen" label="Recuperar senha" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <RecuperarSenhaScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Receitas + Laudos OCR ── */}
      <DCSection id="ocr" title="Receitas & Laudos — OCR com IA" subtitle="Fotografe a receita e a IA interpreta medicamentos, doses e horários para confirmação. Mesmo fluxo para laudos.">
        <DCArtboard id="receitas-idle" label="Receitas · tela inicial" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ReceitasScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="receita-confirm" label="Revisar receita · confirmar" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ReceitaConfirmScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="laudo-ocr" label="Laudo OCR · valores reconhecidos" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <LaudoOCRScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      {/* ── Consultas Calendário + Acompanhante + Mensagens ── */}
      <DCSection id="social" title="Calendário · Acompanhante · Mensagens" subtitle="Visão mensal de consultas com responsável por evento · Delegação de acompanhante com aceite/recusa · Chat interno da família.">
        <DCArtboard id="consultas-cal" label="Calendário de consultas" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <ConsultasCalendarioScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="acompanhante" label="Acompanhante · convite familiar" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <AcompanhanteScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="mensagens" label="Mensagens · família" width={460} height={920}>
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <IOSDevice width={402} height={874}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
                <MensagensScreen go={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

// ════════════════════════════════════════════════════════════
// ROOT + GLOBAL TWEAKS
// ════════════════════════════════════════════════════════════
const TWEAK_DEFAULTS = {
  "palette": "acolhimento",
  "density": "cozy",
  "accent": "default",
  "logo": "abraco"
};

function AppShell() {
  const { user, signOut } = useAuth();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectApp(() => {
    document.documentElement.setAttribute('data-palette', t.palette);
    document.documentElement.setAttribute('data-density', t.density);
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

  // Loading
  if (user === undefined) {
    return (
      <div style={{ height: '100dvh', display: 'grid', placeItems: 'center', background: 'var(--c-bg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <BrandMark size={40} style={{ color: 'var(--c-accent)' }}/>
          <div style={{ fontSize: 13, color: 'var(--c-text-soft)' }}>Carregando…</div>
        </div>
      </div>
    );
  }

  // Not logged in — show interactive prototype in "demo" mode
  // (In production, swap CuidaApp for a proper auth gate screen)
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
        {user && (
          <TweakSection label={`Conta · ${user.email?.split('@')[0]}`}>
            <button
              onClick={() => signOut()}
              style={{ fontSize: 12, color: 'var(--c-alert)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'inherit' }}
            >
              Sair
            </button>
          </TweakSection>
        )}
      </TweaksPanel>
    </React.Fragment>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <AppShell/>
      </PatientProvider>
    </AuthProvider>
  );
}
