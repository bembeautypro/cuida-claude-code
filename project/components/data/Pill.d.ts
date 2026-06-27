import * as React from 'react';

/** Filter chip / selectable tag. Fills with `color` when active. */
export interface PillProps {
  children?: React.ReactNode;
  /** Selected state — fills the pill. */
  active?: boolean;
  /** Fill color when active. Default var(--c-text). */
  color?: string;
  /** Text color when active. Default #fff. */
  fg?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
