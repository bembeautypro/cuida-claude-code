import React from 'react';

/**
 * Large in-screen header (page title). Optional eyebrow above and an action
 * node (usually an IconButton) on the trailing side.
 */
export function ScreenHeader({ title, eyebrow, action, padding = '16px 20px 12px', style }) {
  return (
    <div style={{ padding, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, ...style }}>
      <div>
        {eyebrow && <div className="cu-eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <div className="cu-h1">{title}</div>
      </div>
      {action}
    </div>
  );
}
