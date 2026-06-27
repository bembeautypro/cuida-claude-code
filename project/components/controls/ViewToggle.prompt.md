A pill segmented control for switching between a small set of in-page views (list / timeline / cards).

```jsx
<ViewToggle value={view} onChange={setView}
  options={[{ value: 'list', label: 'Lista' }, { value: 'timeline', label: 'Linha do tempo' }]} />
```

Keep it to 2–4 short options. For more or longer options, use a different pattern (chips or a select).
