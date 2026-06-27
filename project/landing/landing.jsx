// Cuida landing — main composition

const { useState: useStateLP, useEffect: useEffectLP, useRef: useRefLP } = React;

// ════════════════════════════════════════════════════════════
// PHONE FRAME + PREVIEWS
// ════════════════════════════════════════════════════════════
function PhoneFrame({ scale = 1, children, dark, style }) {
  return (
    <div style={{
      transform: `scale(${scale})`,
      transformOrigin: 'top center',
      width: 402 * scale,
      height: 874 * scale,
      ...style,
    }}>
      <window.IOSDevice width={402} height={874} dark={dark}>
        {children}
      </window.IOSDevice>
    </div>
  );
}

// 6 screen previews — shown in Demo section
function HomeV3Preview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      <window.HomeV3Screen go={() => {}}/>
    </div>
  );
}

function ConsultasPreview() {
  const S = window.ConsultasScreen || window.HomeScreen;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      <S go={() => {}}/>
    </div>
  );
}

function MedDetailPreview() {
  const S = window.MedDetailScreen || window.HomeScreen;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      <S go={() => {}}/>
    </div>
  );
}

function ExamesPreview() {
  const S = window.ExamesFullScreen || window.StockScreen;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      <S go={() => {}}/>
    </div>
  );
}

function ProntuariosPreview() {
  const S = window.ProntuariosScreen || window.FamilyScreen;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      <S go={() => {}}/>
    </div>
  );
}

function HistoricoPreview() {
  const S = window.HistoricoMedicoScreen || window.FeedScreen;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      <S go={() => {}}/>
    </div>
  );
}

// Legacy — still used in hero peek
function SOSPreview() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--c-bg)' }}>
      <window.EmergencyScreen go={() => {}} initialView="lockscreen"/>
      <window.TabBar active="emerg" onChange={() => {}}/>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════════════════════
function LandingNav({ t, lang, setLang }) {
  return (
    <header className="lp-nav">
      <div className="lp-container lp-nav__inner">
        <a href="#top" className="lp-logo">
          <window.BrandMark size={26} style={{ color: 'var(--c-accent)' }}/>
          <span>cuida</span>
        </a>

        <nav className="lp-nav__links">
          <a href="#how">{t.nav.how}</a>
          <a href="#who">{t.nav.who}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>

        <div className="lp-nav__right">
          <LangToggle lang={lang} setLang={setLang}/>
          <a href="#waitlist" className="lp-btn lp-btn--primary lp-btn--sm">{t.nav.cta}</a>
        </div>
      </div>
    </header>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="lp-lang">
      {['pt', 'en'].map(code => (
        <button key={code} onClick={() => setLang(code)}
          className={'lp-lang__btn' + (lang === code ? ' is-active' : '')}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════
function Hero({ t }) {
  return (
    <section className="lp-hero" id="top">
      <div className="lp-container lp-hero__inner">
        <div className="lp-hero__copy">
          <div className="lp-eyebrow">{t.hero.eyebrow}</div>
          <h1 className="lp-display">
            {t.hero.title_1}<br/>
            {t.hero.title_2}<br/>
            <span className="lp-display__em">{t.hero.title_3}</span>
          </h1>
          <p className="lp-lead">{t.hero.sub}</p>

          <div className="lp-hero__form-wrap" id="hero-form">
            <WaitlistForm t={t} variant="hero"/>
          </div>

          <WaitlistCounter t={t}/>
        </div>

        <div className="lp-hero__visual">
          <div className="lp-hero__phone-stage">
            {/* background blobs */}
            <div className="lp-blob lp-blob--cream"/>
            <div className="lp-blob lp-blob--sage"/>

            {/* main phone — HomeV3 */}
            <div className="lp-hero__phone lp-hero__phone--main">
              <PhoneFrame scale={0.78}>
                <HomeV3Preview/>
              </PhoneFrame>
            </div>

            {/* floating card peeking right — Consultas */}
            <div className="lp-hero__phone lp-hero__phone--peek">
              <PhoneFrame scale={0.55}>
                <ConsultasPreview/>
              </PhoneFrame>
            </div>

            <div className="lp-hero__caption">{t.hero.hero_caption}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Counter that animates up on mount
function WaitlistCounter({ t }) {
  const [n, setN] = useStateLP(1180);
  useEffectLP(() => {
    const target = 1247;
    let v = 1180;
    const id = setInterval(() => {
      v += 1;
      setN(v);
      if (v >= target) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="lp-counter">
      <div className="lp-counter__dots">
        {[0,1,2,3,4].map(i => <span key={i} style={{ '--i': i }}/>)}
      </div>
      <span className="cu-num">
        <strong>{t.hero.counter_prefix}{n.toLocaleString('pt-BR')}</strong> {t.hero.counter_suffix}
      </span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// FORM (waitlist)
// ════════════════════════════════════════════════════════════
function WaitlistForm({ t, variant = 'hero' }) {
  const [name, setName] = useStateLP('');
  const [email, setEmail] = useStateLP('');
  const [who, setWho] = useStateLP('');
  const [submitted, setSubmitted] = useStateLP(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={'lp-form lp-form--success lp-form--' + variant}>
        <div className="lp-form__success-icon">
          <window.IconCheck size={28} stroke={2.5}/>
        </div>
        <div className="lp-form__success-title">{t.form.success_title}</div>
        <div className="lp-form__success-sub">{t.form.success_sub}</div>
        <div className="lp-form__share">
          <span>{t.form.success_share}</span>
          <div className="lp-form__share-row">
            <a className="lp-btn lp-btn--soft lp-btn--sm" href="#">
              <window.IconWhatsApp size={16}/> WhatsApp
            </a>
            <a className="lp-btn lp-btn--soft lp-btn--sm" href="#">
              <window.IconLink size={16}/> {variant === 'hero' ? 'Copiar link' : 'Copy link'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={'lp-form lp-form--' + variant} onSubmit={onSubmit}>
      <div className="lp-form__row">
        <input
          className="lp-input"
          placeholder={t.form.placeholder_name}
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="lp-input"
          type="email"
          placeholder={t.form.placeholder_email}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="lp-form__who">
        <span className="lp-form__who-label">{t.form.who_label}</span>
        <div className="lp-form__who-opts">
          {t.form.who_opts.map(opt => (
            <button type="button" key={opt}
              onClick={() => setWho(opt)}
              className={'lp-chip' + (who === opt ? ' is-active' : '')}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="lp-btn lp-btn--primary lp-btn--full">
        {t.form.submit} <window.IconArrowR size={16}/>
      </button>
      <div className="lp-form__privacy">
        <window.IconLock size={12}/> {t.form.privacy}
      </div>
    </form>
  );
}

// ════════════════════════════════════════════════════════════
// DEMO — 6 screens in 2×3 grid
// ════════════════════════════════════════════════════════════
const DEMO_SCREENS_COMPONENTS = [
  HomeV3Preview, ConsultasPreview, MedDetailPreview,
  ExamesPreview, ProntuariosPreview, HistoricoPreview,
];

const DEMO_TAGS_PT = [
  'Rotina diária', 'Consultas', 'Remédios',
  'Exames', 'Prontuários', 'Histórico',
];

const DEMO_TAGS_EN = [
  'Daily routine', 'Appointments', 'Medications',
  'Lab results', 'Records', 'History',
];

const TAG_COLORS = [
  'var(--c-accent-soft)', 'rgb(218,235,222)', 'rgb(254,220,195)',
  'rgb(252,224,213)', 'rgb(232,220,240)', 'rgb(200,230,240)',
];

function DemoSection({ t, lang }) {
  const tags = lang === 'en' ? DEMO_TAGS_EN : DEMO_TAGS_PT;
  return (
    <section className="lp-section lp-section--cream" id="product">
      <div className="lp-container">
        <SectionHead eyebrow={t.demo.eyebrow} title={t.demo.title} sub={t.demo.sub}/>

        {/* Row label: Rotina */}
        <div className="lp-demo-group-label">
          <span style={{ background: 'var(--c-accent)', color: 'var(--c-accent-fg)' }}>
            {lang === 'en' ? 'Daily care' : 'Cuidado diário'}
          </span>
        </div>
        <div className="lp-demo-grid lp-demo-grid--3">
          {[0,1,2].map(i => (
            <DemoCard
              key={i}
              tag={tags[i]}
              tagColor={TAG_COLORS[i]}
              caption={t.demo.captions[i]}
              Screen={DEMO_SCREENS_COMPONENTS[i]}
            />
          ))}
        </div>

        {/* Row label: Saúde completa */}
        <div className="lp-demo-group-label" style={{ marginTop: 48 }}>
          <span style={{ background: 'var(--c-success)', color: '#fff' }}>
            {lang === 'en' ? 'Complete health record' : 'Registro de saúde completo'}
          </span>
        </div>
        <div className="lp-demo-grid lp-demo-grid--3">
          {[3,4,5].map(i => (
            <DemoCard
              key={i}
              tag={tags[i]}
              tagColor={TAG_COLORS[i]}
              caption={t.demo.captions[i]}
              Screen={DEMO_SCREENS_COMPONENTS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoCard({ tag, tagColor, caption, Screen }) {
  return (
    <div className="lp-demo-card">
      <div className="lp-demo-tag" style={{ background: tagColor }}>{tag}</div>
      <div className="lp-demo-phone">
        <PhoneFrame scale={0.465}>
          <Screen/>
        </PhoneFrame>
      </div>
      <div className="lp-demo-caption">
        <h3>{caption.h}</h3>
        <p>{caption.p}</p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// HOW IT WORKS — 3 steps
// ════════════════════════════════════════════════════════════
function HowSection({ t }) {
  return (
    <section className="lp-section" id="how">
      <div className="lp-container">
        <SectionHead eyebrow={t.how.eyebrow} title={t.how.title}/>

        <div className="lp-steps">
          {t.how.steps.map((s, i) => (
            <div className="lp-step" key={i}>
              <div className="lp-step__num">{s.n}</div>
              <div className="lp-step__body">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
              <div className="lp-step__art">
                <StepArt index={i}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepArt({ index }) {
  // Each step gets a small visual hint instead of a full screenshot
  if (index === 0) {
    return (
      <div className="lp-step__art-card">
        <div className="lp-art-row" style={{ background: 'rgb(254, 220, 195)' }}>
          <div className="lp-art-avatar">M</div>
          <div className="lp-art-meta">
            <div className="lp-art-name">Maria</div>
            <div className="lp-art-sub">Mãe · 72 anos</div>
          </div>
        </div>
        <div className="lp-art-row" style={{ background: 'rgb(212, 232, 230)' }}>
          <div className="lp-art-avatar" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-fg)' }}>J</div>
          <div className="lp-art-meta">
            <div className="lp-art-name">João</div>
            <div className="lp-art-sub">Pai · 75 anos</div>
          </div>
        </div>
        <div className="lp-art-row lp-art-row--ghost">
          <div className="lp-art-avatar lp-art-avatar--ghost">+</div>
          <div className="lp-art-meta">
            <div className="lp-art-name" style={{ color: 'var(--c-text-muted)' }}>Adicionar</div>
          </div>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="lp-step__art-card lp-step__art-camera">
        <div className="lp-art-camera-box">
          <div className="lp-art-corner lp-art-corner--tl"/>
          <div className="lp-art-corner lp-art-corner--tr"/>
          <div className="lp-art-corner lp-art-corner--bl"/>
          <div className="lp-art-corner lp-art-corner--br"/>
          <div className="lp-art-pkg">
            <div className="lp-art-pkg-name">LOSARTANA</div>
            <div className="lp-art-pkg-sub">50mg · 30 cps</div>
          </div>
        </div>
        <div className="lp-art-found">
          <window.IconCheck size={14}/> Losartana 50mg reconhecido
        </div>
      </div>
    );
  }
  return (
    <div className="lp-step__art-card">
      <div className="lp-art-invite">
        <window.IconWhatsApp size={20} style={{ color: 'var(--c-accent)' }}/>
        <div>
          <div className="lp-art-name">Convidar pelo WhatsApp</div>
          <div className="lp-art-sub">cuida.app/c/maria-7a92</div>
        </div>
      </div>
      <div className="lp-art-avatars">
        <div className="lp-art-avatar" style={{ background: 'rgb(212, 232, 230)' }}>R</div>
        <div className="lp-art-avatar" style={{ background: 'rgb(254, 220, 195)' }}>P</div>
        <div className="lp-art-avatar" style={{ background: 'rgb(218, 235, 222)' }}>S</div>
        <div className="lp-art-avatar lp-art-avatar--ghost">+</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PERSONAS — Para quem é
// ════════════════════════════════════════════════════════════
function WhoSection({ t }) {
  const palettes = [
    { bg: 'rgb(254, 220, 195)', fg: 'rgb(122, 60, 38)' },
    { bg: 'rgb(212, 232, 230)', fg: 'rgb(1, 55, 61)' },
    { bg: 'rgb(218, 235, 222)', fg: 'rgb(35, 100, 68)' },
  ];
  return (
    <section className="lp-section lp-section--tight" id="who">
      <div className="lp-container">
        <SectionHead eyebrow={t.who.eyebrow} title={t.who.title}/>

        <div className="lp-personas">
          {t.who.cards.map((c, i) => (
            <div className="lp-persona" key={i} style={{ background: palettes[i].bg, color: palettes[i].fg }}>
              <div className="lp-persona__tag">{c.tag}</div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// FEATURES grid
// ════════════════════════════════════════════════════════════
function FeaturesSection({ t }) {
  const icons = [
    <window.IconClock size={24}/>,
    <window.IconBox size={24}/>,
    <window.IconShield size={24}/>,
    <window.IconUsers size={24}/>,
    <window.IconChat size={24}/>,
    <window.IconLock size={24}/>,
  ];
  return (
    <section className="lp-section">
      <div className="lp-container">
        <SectionHead eyebrow={t.features.eyebrow} title={t.features.title}/>

        <div className="lp-features">
          {t.features.items.map((it, i) => (
            <div className="lp-feature" key={i}>
              <div className="lp-feature__icon">{icons[i]}</div>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// SOS DARK SECTION — Momento que importa
// ════════════════════════════════════════════════════════════
function SosSection({ t }) {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-sos">
          <div className="lp-sos__copy">
            <div className="lp-eyebrow lp-eyebrow--on-dark">{t.sos.eyebrow}</div>
            <h2 className="lp-h2 lp-h2--on-dark">{t.sos.title.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</h2>
            <p className="lp-sos__p">{t.sos.p}</p>
            <ul className="lp-sos__bullets">
              {t.sos.bullets.map(b => (
                <li key={b}>
                  <span className="lp-sos__check"><window.IconCheck size={14} stroke={2.5}/></span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="lp-btn lp-btn--soft lp-sos__cta">
              {t.sos.cta} <window.IconArrowR size={16}/>
            </a>
          </div>
          <div className="lp-sos__visual">
            <div className="lp-sos__phone lp-sos__phone--pulse">
              <PhoneFrame scale={0.6} dark>
                <SOSPreview/>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// FAQ
// ════════════════════════════════════════════════════════════
function FaqSection({ t }) {
  const [open, setOpen] = useStateLP(0);
  return (
    <section className="lp-section" id="faq">
      <div className="lp-container lp-container--narrow">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title}/>
        <div className="lp-faq">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={'lp-faq__item' + (isOpen ? ' is-open' : '')}>
                <button className="lp-faq__q" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{it.q}</span>
                  <span className="lp-faq__icon">
                    <window.IconPlus size={20}/>
                  </span>
                </button>
                <div className="lp-faq__a">
                  <div>{it.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// FINAL CTA + WAITLIST
// ════════════════════════════════════════════════════════════
function FinalCta({ t }) {
  return (
    <section className="lp-final" id="waitlist">
      <div className="lp-container lp-container--narrow">
        <div className="lp-final__card">
          <window.BrandMark size={48} style={{ color: 'var(--c-accent)' }}/>
          <div className="lp-eyebrow" style={{ marginTop: 18 }}>{t.final.eyebrow}</div>
          <h2 className="lp-h1" style={{ textAlign: 'center', marginTop: 10, textWrap: 'balance' }}>
            {t.final.title.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
          </h2>
          <p className="lp-lead" style={{ textAlign: 'center', maxWidth: 540, margin: '10px auto 0' }}>
            {t.final.sub}
          </p>

          <div style={{ marginTop: 32, width: '100%', maxWidth: 480 }}>
            <WaitlistForm t={t} variant="final"/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════
function Footer({ t }) {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer__top">
          <div className="lp-footer__brand">
            <a href="#top" className="lp-logo">
              <window.BrandMark size={28} style={{ color: 'var(--c-accent)' }}/>
              <span>cuida</span>
            </a>
            <p className="lp-footer__tagline">{t.footer.tagline}</p>
            <div className="lp-footer__social">
              <a href="#" aria-label="Instagram" className="lp-footer__icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="lp-footer__icon-btn">
                <window.IconWhatsApp size={18}/>
              </a>
              <a href="mailto:ola@cuida.app" aria-label="E-mail" className="lp-footer__icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 7l9 7 9-7"/></svg>
              </a>
            </div>
          </div>

          <div className="lp-footer__cols">
            <div className="lp-footer__col">
              <h4>{t.nav.product}</h4>
              <ul>{t.footer.links.product.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div className="lp-footer__col">
              <h4>{t.lang === 'en' ? 'Company' : 'Empresa'}</h4>
              <ul>{t.footer.links.company.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div className="lp-footer__col">
              <h4>{t.lang === 'en' ? 'Legal' : 'Legal'}</h4>
              <ul>{t.footer.links.legal.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          </div>
        </div>

        <div className="lp-footer__bottom">
          <span>{t.footer.cnpj}</span>
          <span>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════════════════════
// SECTION HEAD helper
// ════════════════════════════════════════════════════════════
function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="lp-section-head">
      {eyebrow && <div className="lp-eyebrow">{eyebrow}</div>}
      <h2 className="lp-h1" style={{ textWrap: 'balance' }}>
        {title.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
      </h2>
      {sub && <p className="lp-lead">{sub}</p>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════════
function LandingRoot() {
  const [lang, setLang] = useStateLP('pt');
  const t = { ...window.CUIDA_I18N[lang], lang };

  // Force palette to acolhimento on mount
  useEffectLP(() => {
    document.documentElement.setAttribute('data-palette', 'acolhimento');
  }, []);

  return (
    <React.Fragment>
      <LandingNav t={t} lang={lang} setLang={setLang}/>
      <main>
        <Hero t={t}/>
        <DemoSection t={t} lang={lang}/>
        <HowSection t={t}/>
        <WhoSection t={t}/>
        <FeaturesSection t={t}/>
        <SosSection t={t}/>
        <FaqSection t={t}/>
        <FinalCta t={t}/>
      </main>
      <Footer t={t}/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LandingRoot/>);
