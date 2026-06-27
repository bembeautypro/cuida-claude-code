import * as React from 'react';

/**
 * Elevated white content surface with soft shadow and hairline border — the
 * default grouping container in the app.
 *
 * @startingPoint section="Surfaces" subtitle="Elevated + soft tinted cards" viewport="520x220"
 */
export interface CardProps {
  children?: React.ReactNode;
  /** Inner padding in px. Default 18. */
  padding?: number;
  /** Corner radius in px. Default 22 (var --r-card). */
  radius?: number;
  /** Surface color. Default var(--c-card). */
  background?: string;
  /** Toggle the soft drop shadow. Default true. */
  shadow?: boolean;
  /** When set, the card becomes a button (cursor + handler). */
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
