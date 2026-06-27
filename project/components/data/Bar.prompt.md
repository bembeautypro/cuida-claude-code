A thin rounded progress bar. Primary use is medication stock level — switch the fill to `var(--c-alert)` when stock is low.

```jsx
<Bar value={4} max={30} color="var(--c-alert)" />
<Bar value={18} max={30} />
```
