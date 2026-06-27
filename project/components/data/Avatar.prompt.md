Circular avatar showing a person's initials (or an emoji). Used everywhere people appear — profile pickers, family lists, comments.

```jsx
<Avatar name="Maria Almeida" color="rgb(254,220,195)" fg="rgb(122,60,38)" size={48} />
```

- Each family member has a **fixed** warm tint pair (`color` + `fg`) stored on their profile — pull from there, don't randomize.
- Keep it perfectly circular; size 44 is the default touch-friendly size.
