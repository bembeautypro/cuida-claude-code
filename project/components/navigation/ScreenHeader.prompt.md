The large in-screen page header — big title (`cu-h1`), optional uppercase eyebrow, optional trailing action.

```jsx
<ScreenHeader eyebrow="Hoje" title="Remédios"
  action={<IconButton variant="accent" size={42}><IconPlus size={20}/></IconButton>} />
```

Use it at the top of full screens. For drill-down/detail views, pair a `plain` back IconButton on the left in your own row instead.
