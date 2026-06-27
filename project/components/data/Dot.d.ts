import * as React from 'react';

/** Small circular status dot (online, taken, due, alert). */
export interface DotProps {
  /** Default var(--c-success). */
  color?: string;
  /** Diameter in px. Default 8. */
  size?: number;
}
