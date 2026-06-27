A pill/chip for filter rows and selectable tags. Outline when idle, filled when `active`.

```jsx
<Pill active onClick={() => setFilter('todos')}>Todos</Pill>
<Pill onClick={() => setFilter('maria')}>Maria</Pill>
```

Pass `color`/`fg` to tint the active state to a profile or status color (e.g. a person's avatar tint).
