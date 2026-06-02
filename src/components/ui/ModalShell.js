import React, { useEffect, useRef } from 'react';

/**
 * ModalShell
 * Base modal container used by every modal in the app.
 *
 * Handles:  backdrop click-to-close · ESC key · body scroll lock ·
 *           ARIA (role=dialog, aria-modal) · focus management on open
 *
 * Props:
 *   open        boolean          — controls render/visibility
 *   onClose     () => void       — called on backdrop click or ESC
 *   maxWidth    number           — max-width of the inner panel (default 1000)
 *   label       string           — aria-label for screen readers
 *   children    ReactNode        — panel content
 */
export default function ModalShell({
  open,
  onClose,
  maxWidth = 1000,
  label,
  children,
}) {
  const panelRef = useRef(null);

  // ESC key to close
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev || ''; };
  }, [open]);

  // Move focus into panel when it opens
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const first = panelRef.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{
          background: '#0d0a02',
          width: '100%',
          maxWidth,
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
