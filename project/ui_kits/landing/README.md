# Cuida — UI Kit · Landing page

Landing page de **lista de espera** (pré-lançamento) do Cuida. Bilíngue (PT/EN, toggle no nav). Reaproveita os componentes e telas do app para os mockups de telefone no hero e na seção de demonstração.

## Seções
1. **Nav** — logo + links + toggle de idioma + CTA
2. **Hero** — headline, formulário de waitlist, contador animado, dois iPhones (HomeV3 + Consultas)
3. **Demo** — grade 2×3 de telas reais (Rotina, Consultas, Remédios, Exames, Prontuários, Histórico)
4. **Como funciona** — 3 passos com artes ilustrativas
5. **Para quem é** — 3 personas em cards tintos
6. **Funcionalidades** — grade 3×2
7. **SOS** — seção escura (accent) com mockup de lock screen pulsante
8. **FAQ** — accordion
9. **CTA final** — formulário de waitlist em destaque
10. **Footer** — marca, colunas, social, CNPJ

## Como funciona
Carrega os scripts do app (`cuida/`) para renderizar os mockups, depois `landing/i18n.jsx` (strings PT/EN) e `landing/landing.jsx` (composição). Estilo em `landing/landing.css`, que estende `cuida/tokens.css`.
