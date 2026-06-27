import * as React from 'react';

/** Large page title header with optional eyebrow and a trailing action node. */
export interface ScreenHeaderProps {
  title: React.ReactNode;
  /** Small uppercase label above the title. */
  eyebrow?: React.ReactNode;
  /** Trailing action, usually an <IconButton>. */
  action?: React.ReactNode;
  /** CSS padding shorthand. Default '16px 20px 12px'. */
  padding?: string;
  style?: React.CSSProperties;
}
