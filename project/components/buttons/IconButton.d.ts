import * as React from 'react';

/**
 * Round icon-only button for headers and toolbars (back, add, more, share).
 * Pass a single line icon (~18–22px) as the child.
 */
export interface IconButtonProps {
  children?: React.ReactNode;
  /** Diameter in px. Default 36. */
  size?: number;
  /** Default 'soft'. */
  variant?: 'soft' | 'plain' | 'outline' | 'accent';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
