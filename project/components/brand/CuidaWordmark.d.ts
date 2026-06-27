import * as React from 'react';

/**
 * The Cuida brand lockup: symbol + lowercase "cuida" wordmark in Plus Jakarta Sans.
 * Always lowercase. The heart variant (ECG line inside a heart) is the primary mark.
 *
 * @startingPoint section="Brand" subtitle="Logo lockup, 3 symbol variants" viewport="360x120"
 */
export interface CuidaWordmarkProps {
  /** Wordmark font-size in px; the symbol scales with it. Default 22. */
  size?: number;
  /** CSS color applied to both symbol and text. Default 'currentColor'. */
  color?: string;
  /** Symbol style. Default 'heart'. */
  variant?: 'heart' | 'abraco' | 'hand';
}
