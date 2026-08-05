import React, { useEffect, useState } from 'react';
import { fetchPolicy, fetchSignupPolicies } from '../utils/policyApi';

// Consent on the sign-up form. The list comes from the backend rather than being written into
// this file, so a policy the team publishes later appears here without a code change — and one
// they unpublish stops being asked for.
//
// Each policy is readable in place. Asking someone to agree to something they would have to
// leave the form to read is how nobody reads anything.

const GOLD_DEEP = '#8B6914';
const INK = '#2A1A0C';

export default function PolicyConsent({ accepted, onChange }) {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchSignupPolicies()
      .then((list) => { if (!cancelled) setPolicies(list); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const toggle = (kind) =>
    onChange(accepted.includes(kind) ? accepted.filter((k) => k !== kind) : [...accepted, kind]);

  // Nothing published means nothing to agree to — the form should not grow an empty box.
  if (loading || policies.length === 0) return null;

  return (
    <div style={{ margin: '4px 0 20px' }}>
      {policies.map((policy) => (
        <label
          key={policy.kind}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10,
            cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", fontSize: 13.5,
            color: '#4C3925', lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            checked={accepted.includes(policy.kind)}
            onChange={() => toggle(policy.kind)}
            style={{ marginTop: 2, width: 16, height: 16, accentColor: GOLD_DEEP, cursor: 'pointer', flexShrink: 0 }}
          />
          <span>
            I agree to the{' '}
            <button
              type="button"
              onClick={(e) => {
                // Stops the label's click from also toggling the box.
                e.preventDefault();
                e.stopPropagation();
                setReading(policy);
              }}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                color: GOLD_DEEP, fontFamily: 'inherit', fontSize: 'inherit',
                textDecoration: 'underline', fontWeight: 600,
              }}
            >
              {policy.title}
            </button>
            {policy.summary ? ` — ${policy.summary}` : ''}
          </span>
        </label>
      ))}

      {reading && <PolicyReader policy={reading} onClose={() => setReading(null)} />}
    </div>
  );
}

/** Reads the full text without leaving the form. */
function PolicyReader({ policy, onClose }) {
  const [full, setFull] = useState(policy);
  const [error, setError] = useState('');

  useEffect(() => {
    // The signup list carries the body already, but re-fetch so a policy the team edited
    // moments ago is the one being agreed to.
    let cancelled = false;
    fetchPolicy(policy.kind)
      .then((p) => { if (!cancelled) setFull(p); })
      .catch(() => { if (!cancelled) setError('Could not load the latest version. Showing the copy we have.'); });
    return () => { cancelled = true; };
  }, [policy.kind]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={full.title}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2200, display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: 20,
        background: 'rgba(20,12,6,0.62)', backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 640, maxHeight: '80vh', display: 'flex', flexDirection: 'column',
          background: '#FFFDF9', borderRadius: 16, border: '1px solid rgba(201,165,88,0.4)',
          boxShadow: '0 30px 80px rgba(20,12,6,0.4)', overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(201,165,88,0.25)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: INK, margin: 0 }}>
            {full.title}
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11.5, color: '#9A8B7A', margin: '6px 0 0' }}>
            Version {full.version}
            {full.publishedAt ? ` · updated ${new Date(full.publishedAt).toLocaleDateString()}` : ''}
          </p>
        </div>

        <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
          {error && (
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12.5, color: '#A33', marginTop: 0 }}>
              {error}
            </p>
          )}
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 16.5, lineHeight: 1.7,
            color: '#4C3925', whiteSpace: 'pre-wrap', margin: 0,
          }}>
            {full.body}
          </p>
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(201,165,88,0.25)', textAlign: 'right' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-gold"
            style={{ width: 'auto', padding: '10px 26px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
