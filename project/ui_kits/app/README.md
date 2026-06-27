# Cuida — UI Kit · App mobile

Recriação navegável do app **Cuida** (cuidado familiar de saúde) num iPhone. Carrega as telas reais do protótipo a partir de `cuida/` e monta um roteador próprio.

## Telas (33 rotas)
- **Tab bar:** Início (`home`) · Remédios (`meds`) · Estoque (`stock`) · SOS (`emerg`) · Família (`fam`)
- **Detalhe:** `med-detail`, `consulta-detail`, `exames-full`, `resumo-saude`, `historico`, `vacinas`
- **Módulos de saúde:** `consultas`, `exames`, `prontuarios`
- **Fluxos:** `login`, `edit-profile`, `add-consulta`, `add-exame`, `add-med` (modal), `notificacoes`
- **Social:** `feed`, `settings`

## Como funciona
`index.html` carrega, em ordem: `ios-frame.jsx` → `icons.jsx` → `ui.jsx` → `data.jsx` → `screens.jsx` → `newscreens.jsx` → `healthscreens.jsx` → `morescreens.jsx` → `states.jsx`, e monta `<AppKit/>` — um roteador que troca de tela via `go(rota)`. As cinco rotas da tab bar também atualizam o estado da aba ativa.

Todas as telas recebem a prop `go` e navegam chamando `go('rota')`.
