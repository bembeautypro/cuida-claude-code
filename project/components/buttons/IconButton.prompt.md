Round, icon-only button — for back arrows, add (+), more (⋯), share and other compact header/toolbar actions.

```jsx
<IconButton variant="plain" onClick={back}><IconArrowL size={20}/></IconButton>
<IconButton variant="accent" size={42}><IconPlus size={20}/></IconButton>
```

- `soft` is the default; `accent` for the primary add action; `plain` for back/dismiss.
- Hit target should stay ≥ 44px on touch surfaces — bump `size` for mobile.
