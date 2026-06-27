import * as React from 'react';

/** Flat tinted surface (linho), no shadow or border — quiet secondary grouping. */
export interface SoftCardProps {
  children?: React.ReactNode;
  padding?: number;
  radius?: number;
  /** Tint. Default var(--c-surface). */
  background?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
