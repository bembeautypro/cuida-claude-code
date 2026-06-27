import * as React from 'react';

/**
 * Soft-tinted status badge with an optional leading dot. One badge per semantic
 * tone — pairs each accent with its matching `-soft` background token.
 *
 * @startingPoint section="Data" subtitle="Status badges, 5 semantic tones" viewport="460x90"
 */
export interface BadgeProps {
  children?: React.ReactNode;
  /** Semantic tone. Default 'neutral'. */
  tone?: 'neutral' | 'accent' | 'success' | 'alert' | 'warn';
  /** Show a leading status dot. */
  dot?: boolean;
  style?: React.CSSProperties;
}
