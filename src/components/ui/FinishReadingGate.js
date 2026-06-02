import React, { useState } from 'react';

/**
 * FinishReadingGate
 * Hides children behind a "Finished Reading" button.
 * Prevents feedback forms from appearing before content is read.
 *
 * Props:
 *   children     ReactNode   — content to reveal (feedback form, related products, etc.)
 *   buttonLabel  string      — CTA text (default: "Finished Reading →")
 */
export default function FinishReadingGate({
  children,
  buttonLabel = 'Finished Reading →',
}) {
  const [done, setDone] = useState(false);

  if (!done) {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid rgba(201,165,88,0.1)',
        }}
      >
        <button
          type="button"
          className="btn-gold"
          style={{ padding: '12px 32px', fontSize: 13 }}
          onClick={() => setDone(true)}
        >
          {buttonLabel}
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
