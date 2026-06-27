Pill-shaped text button — the standard action control. `primary` is the deep-esmeralda CTA; reach for `soft` for secondary actions, `danger`/`success` for status actions.

```jsx
<Button variant="primary" size="lg" iconRight={<IconArrowR size={16}/>}>Entrar na lista</Button>
<Button variant="soft">Cancelar</Button>
```

- Always pill (`border-radius: 999px`); never square off the corners.
- `full` stretches it to the container width — used for form submits and mobile CTAs.
- Pass icons as nodes via `icon` / `iconRight`, sized 16–20px.
