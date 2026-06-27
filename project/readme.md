# Cuida — Design System

**Cuida** é um app de **cuidado familiar de saúde** (português do Brasil). Ajuda uma pessoa a organizar remédios, estoque, consultas, exames, alergias e um cartão de emergência — para si e para os familiares que cuida (pais idosos, cônjuge, filhos). A marca é calorosa, calma e confiável: cuidar sem ansiedade.

> Tagline: **"Cuida de quem cuida."**

Este projeto é, ao mesmo tempo, o **produto** (app + landing) e o **design system** que o descreve. O compilador indexa os tokens (via `styles.css`), os componentes (`components/**`) e os cards (`@dsCard`), e expõe os Starting Points marcados.

## Fontes
- App mobile: `Cuida.html` (protótipo navegável) → `cuida/*.jsx`
- Landing page: `Landing.html` → `landing/*.jsx`
- Referência visual documentada: `Cuida DS.html`
- Tokens: `cuida/tokens.css` (importado por `styles.css`)
- ⚠️ `Design System.html` está **deprecado** (banner no topo) — usa fonte/tokens antigos; ignore.

---

## Content fundamentals (como a copy é escrita)
- **Idioma:** português do Brasil, natural e coloquial — sem jargão clínico.
- **Pessoa:** fala com "você"; trata a família por nome (Maria, João, Carla).
- **Tom:** acolhedor e tranquilizador, nunca alarmista. "Tudo em dia", "Em falta", "Vence em 4 dias". Frases curtas e diretas.
- **Caixa:** a marca **cuida** é sempre minúscula no lockup. Títulos em sentence case ("Próxima consulta", não "Próxima Consulta").
- **Números:** sempre concretos e úteis ("18 comprimidos restantes", "em 2h", "streak de 8 dias") — nunca dados decorativos.
- **Emoji:** usado com parcimônia como ícone de remédio (💊🟠🔵) nos avatares de medicação; evite em copy de UI.
- **Bilíngue:** a landing tem PT/EN (strings em `landing/i18n.jsx`).

Exemplos de copy: *"Cuida de quem cuida."* · *"Aponte a câmera pra caixa do remédio."* · *"Convidar pelo WhatsApp."*

---

## Visual foundations
- **Cor:** base quente cor de linho (`--c-bg #FFFAF2`, `--c-surface` linho) com tinta esmeralda profunda (`--c-accent #01373D`). Três paletas alternam o tema via `data-palette`: **acolhimento** (padrão, quente), **calma** (azul) e **vida** (verde-oliva). Cada familiar tem um tint fixo de avatar (peach, sage, mint, coral, lilac).
- **Semânticas:** sucesso (verde), alerta (terracota), atenção (âmbar) — cada uma com par `-soft` para fundos tintos.
- **Tipografia:** **Plus Jakarta Sans** para tudo (display + corpo). Pesos 300–700; itálico para ênfase de marca. Escala mobile-tuned: display 40 / h1 32 / h2 24 / h3 20 / body 15 / sm 13 / xs 11. Tracking negativo nos títulos (-0.02em).
- **Espaço:** base 8pt (`--s-1`..`--s-9`, 4→56px). Densidade ajustável (`cozy`/`compact`).
- **Raios:** rounding suave é assinatura — cards em 22px (`--r-card`), botões e chips totalmente pílula (999px).
- **Sombras:** difusas e de baixíssimo contraste (`--shadow-sm/md/lg`), nunca duras.
- **Superfícies:** cards brancos com sombra suave + borda hairline; `SoftCard` tinto e plano para conteúdo secundário.
- **Fundos:** sólidos quentes; blobs desfocados (blur 60px) decorativos no hero da landing; seção SOS escura usa o accent cheio.
- **Movimento:** transições curtas (.12–.3s ease) em transform/cor; pulso suave no mockup SOS. Sem bounces; respeite estados de hover (translateY -1/-2px) e press discretos.
- **Mobile:** shell de iPhone (402×874) com tab bar inferior translúcida (frosted, blur 20px). Hit targets ≥ 44px.

---

## Iconography
- **Ícones de linha** estilo Lucide, viewBox 24×24, stroke 1.6, `currentColor`, cantos arredondados. Definidos em `cuida/icons.jsx` (~40 ícones: home, pill, box, shield, users, bell, camera, qr, whatsapp, etc.).
- **Marca:** coração com linha de ECG dentro (`BrandMark` / wordmark variante `heart`) é o símbolo primário; alternativas `abraco` (dois círculos abraçados) e `hand`.
- **Emoji** aparece só como pictograma de medicação (💊🟠🔵🟣) nos avatares de remédio.
- Para reutilizar os ícones num consumo novo, copie `cuida/icons.jsx`.

---

## Componentes (`components/`)
| Grupo | Componentes |
|---|---|
| `brand/` | `CuidaWordmark` |
| `buttons/` | `Button` · `IconButton` |
| `surfaces/` | `Card` · `SoftCard` |
| `data/` | `Avatar` · `Badge` · `Pill` · `Bar` · `Dot` |
| `navigation/` | `TabBar` · `ScreenHeader` |
| `controls/` | `ViewToggle` |

Cada componente: `<Name>.jsx` (export nomeado) + `<Name>.d.ts` (contrato de props) + `<Name>.prompt.md` (uso). Um `*.card.html` por pasta alimenta a aba Design System.

## UI kits (`ui_kits/`)
- `app/` — protótipo navegável do app mobile (33 rotas) num iPhone.
- `landing/` — landing page de waitlist (PT/EN).

## Foundations (`guidelines/`)
Cards de especimen: cores (acolhimento, calma, vida, semânticas, tons de pessoa), tipografia (escala, pesos), espaço (8pt, raios, sombras).

## Manifesto da raiz
- `styles.css` — entry point global (importa `tokens/fonts.css` + `cuida/tokens.css`)
- `tokens/fonts.css` — webfont Plus Jakarta Sans (Google Fonts)
- `components/` · `ui_kits/` · `guidelines/` — ver acima
- `cuida/` — código-fonte do app · `landing/` — código-fonte da landing
- `SKILL.md` — skill cross-compatível (Claude Code)
