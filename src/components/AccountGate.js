import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// The site stays open to browse. An account is asked for at the moment someone actually does
// something — generates a certificate, buys, or contributes — rather than at the front door,
// which would turn every first visit into a form.

const GOLD = '#C9A558';
const GateContext = createContext(null);

export function AccountGateProvider({ children }) {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Runs `action` when signed in; otherwise explains why an account is needed and offers to
   * sign in, returning here afterwards.
   *
   * @param {string} reason what the visitor was trying to do, e.g. "save your certificate"
   */
  const requireAccount = useCallback((reason, action) => {
    if (user) {
      action();
      return true;
    }
    setPrompt({ reason, action });
    return false;
  }, [user]);

  const value = useMemo(() => ({ requireAccount, signedIn: Boolean(user) }), [requireAccount, user]);

  return (
    <GateContext.Provider value={value}>
      {children}
      {prompt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="An account is needed"
          style={{
            position: 'fixed', inset: 0, zIndex: 2000, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: 20,
            background: 'rgba(12,7,4,0.72)', backdropFilter: 'blur(4px)',
          }}
          onClick={() => setPrompt(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 420, borderRadius: 14, padding: '28px 26px',
              background: 'linear-gradient(180deg,#2A1710,#1C0E04)',
              border: '1px solid rgba(201,165,88,0.4)', textAlign: 'center',
            }}
          >
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em',
              color: GOLD, textTransform: 'uppercase', marginBottom: 10,
            }}>
              One moment
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 23, color: '#EDD9BC', marginBottom: 12 }}>
              Create an account to continue
            </h2>
            <p style={{ color: '#BA9D7C', fontSize: 14.5, lineHeight: 1.65, marginBottom: 24 }}>
              You need an account to {prompt.reason}. It takes a moment, and it keeps your Akan
              name and certificates together.
            </p>
            <button
              type="button"
              className="btn-gold"
              style={{ width: '100%', marginBottom: 10 }}
              onClick={() => {
                // Come back to where they were, so the interrupted action is one tap away.
                navigate('/auth', { state: { from: location.pathname + location.search } });
                setPrompt(null);
              }}
            >
              Sign in or create an account
            </button>
            <button
              type="button"
              onClick={() => setPrompt(null)}
              style={{
                background: 'none', border: 'none', color: '#BA9D7C',
                fontSize: 13.5, cursor: 'pointer', textDecoration: 'underline',
              }}
            >
              Keep browsing
            </button>
          </div>
        </div>
      )}
    </GateContext.Provider>
  );
}

export function useAccountGate() {
  const context = useContext(GateContext);
  if (!context) {
    throw new Error('useAccountGate must be used inside an AccountGateProvider');
  }
  return context;
}
