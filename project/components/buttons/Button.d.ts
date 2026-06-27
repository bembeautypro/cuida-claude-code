import * as React from 'react';

/**
 * Pill-shaped primary button in Plus Jakarta Sans. The accent (deep esmeralda)
 * primary variant is the default call-to-action across app and landing.
 *
 * @startingPoint section="Buttons" subtitle="7 variants × 3 sizes, pill shape" viewport="520x120"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual weight. Default 'primary'. */
  variant?: 'primary' | 'dark' | 'soft' | 'ghost' | 'outline' | 'danger' | 'success';
  /** Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon node (place a 16–20px icon here). */
  icon?: React.ReactNode;
  /** Trailing icon node. */
  iconRight?: React.ReactNode;
  /** Stretch to 100% width. */
  full?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
