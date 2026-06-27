The main app's bottom navigation — a frosted, translucent tab bar with five destinations: Início, Remédios, Estoque, SOS, Família.

```jsx
<TabBar active="home" onChange={go} />
```

- Positions `absolute` to the bottom of the phone frame; render it as a sibling of the scrolling `Screen`.
- The active tab is tinted with `--c-accent` and its icon stroke thickens — don't add a pill/background highlight.
- Exactly five tabs; this is a fixed information architecture.
