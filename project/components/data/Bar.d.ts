import * as React from 'react';

/** Thin rounded progress bar — medication stock, completion, etc. */
export interface BarProps {
  value?: number;
  /** Default 100. */
  max?: number;
  /** Fill color. Use var(--c-alert) for low/critical. Default var(--c-accent). */
  color?: string;
  /** Track height in px. Default 6. */
  height?: number;
  /** Track color. Default var(--c-line). */
  bg?: string;
}
