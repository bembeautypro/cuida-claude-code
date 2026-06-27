import * as React from 'react';

/**
 * Circular initials/emoji avatar. Each person uses a fixed warm tint pair
 * (color + fg) drawn from their profile — never random colors.
 *
 * @startingPoint section="Data" subtitle="Initials avatars, warm tints" viewport="420x110"
 */
export interface AvatarProps {
  /** Full name — first two initials are derived from it. */
  name?: string;
  /** Background tint (the person's profile color). Default var(--c-surface). */
  color?: string;
  /** Foreground/initials color. Default var(--c-text). */
  fg?: string;
  /** Diameter in px. Default 44. */
  size?: number;
  /** Render an emoji instead of initials. */
  emoji?: string;
  style?: React.CSSProperties;
}
