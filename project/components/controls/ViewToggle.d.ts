import * as React from 'react';

interface ViewToggleOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Pill segmented control for switching between 2–4 in-page views (e.g. list vs
 * timeline). Active segment fills with the accent color.
 *
 * @startingPoint section="Controls" subtitle="Segmented view toggle" viewport="360x80"
 */
export interface ViewToggleProps {
  value: string;
  onChange: (value: string) => void;
  options: ViewToggleOption[];
  style?: React.CSSProperties;
}
