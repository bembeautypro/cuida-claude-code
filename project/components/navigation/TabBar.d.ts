import * as React from 'react';

/**
 * Fixed bottom tab bar — the main app shell navigation. Frosted translucent
 * background, five tabs, accent-tinted active state. Place it as a direct child
 * of the phone frame (it positions absolute to the bottom).
 *
 * @startingPoint section="Navigation" subtitle="Frosted bottom tab bar, 5 tabs" viewport="402x110"
 */
export interface TabBarProps {
  /** Active tab id. */
  active: 'home' | 'meds' | 'stock' | 'emerg' | 'fam';
  /** Called with the tapped tab id. */
  onChange?: (id: string) => void;
}
