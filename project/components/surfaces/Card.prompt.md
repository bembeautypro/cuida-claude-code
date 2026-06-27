The default content surface — a white card with the brand's soft shadow and hairline border. Group related content inside it.

```jsx
<Card>
  <h3 className="cu-h3">Próximo remédio</h3>
  <p className="cu-muted">Losartana 50mg · 18:00</p>
</Card>
```

- Corner radius defaults to 22px (`--r-card`) — the brand's signature soft rounding.
- For a flat tinted panel with no shadow/border, use `SoftCard` instead.
- Pass `onClick` to turn the whole card into a tappable row.
