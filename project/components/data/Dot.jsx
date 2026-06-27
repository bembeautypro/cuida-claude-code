import React from 'react';

/** Small status dot. Default success-green. */
export function Dot({ color = 'var(--c-success)', size = 8 }) {
  return <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: color, flexShrink: 0,
  }}/>;
}
