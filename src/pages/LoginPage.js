import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useSEO from '../hooks/useSEO';
import AuthCarousel from '../components/AuthCarousel';
import PolicyConsent from '../components/PolicyConsent';

// Customer sign-in. The admin one-time-password flow that used to live here is gone — the
// website no longer has an admin area at all.
//
// Light by design: the rest of the site is dark and heritage-toned, so a white page here reads
// as a clean, deliberate moment rather than another dim panel. Gold carries the identity.

const GOLD = '#C9A558';
const GOLD_DEEP = '#8B6914';
const INK = '#1C1410';

const inputBase = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 15px',
  borderRadius: 10,
  border: '1px solid rgba(201,165,88,0.45)',
  background: '#FFFDF9',
  color: GOLD_DEEP,
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const labelStyle = {
  display: 'block',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: GOLD_DEEP,
  marginBottom: 7,
};

export default function LoginPage() {
  const { user, login, signup, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState('signin'); // signin | signup | forgot
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptedPolicies, setAcceptedPolicies] = useState([]);

  useSEO({
    title: 'Sign In — Mama Africa Official',
    description: 'Sign in or create your Mama Africa account.',
  });

  const destination = location.state?.from || '/account';

  useEffect(() => {
    if (user) navigate(destination, { replace: true });
  }, [user, destination, navigate]);

  function switchMode(next) {
    setMode(next);
    setError('');
    setSuccess('');
    // Sign-up is taller than sign-in. Without this the page keeps the old scroll offset and
    // the new heading ends up behind the fixed navbar.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form.email.trim(), form.password);
    setLoading(false);
    if (!result.success) setError(result.error);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    const result = await signup(form.name.trim(), form.email.trim(), form.password, {
      acceptedPolicies,
    });
    setLoading(false);
    if (!result.success) setError(result.error);
  }

  async function handleForgot(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const result = await resetPassword(forgotEmail.trim());
    setLoading(false);
    if (result.success) setSuccess(result.message || 'Check your inbox for a reset link.');
    else setError(result.error);
  }

  const heading = mode === 'signup' ? 'Create your account'
    : mode === 'forgot' ? 'Reset your password'
      : 'Welcome back';

  const blurb = mode === 'signup'
    ? 'Keep your Akan name and your certificates together, and pick up where you left off.'
    : mode === 'forgot'
      ? 'Enter your email and we will send you a link to set a new password.'
      : 'Sign in to reach your certificates and continue where you left off.';

  return (
    // page-wrapper carries the 108px offset that clears the fixed strip and navbar. Dropping
    // it is what tucked the card under the header.
    <div
      className="page-wrapper ma-auth-page"
      style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}
    >
      <style>{`
        /* Width lives in a class, not an inline style: global-spread-layout force-stretches
           any direct child of .page-wrapper carrying an inline max-width, which flattened
           this card across the whole viewport. */
        /* Full-bleed: the carousel and the form own the screen, and the only thing below
           them is a thin footer strip. 108px is the fixed strip + navbar above. */
        .ma-auth-page { padding-bottom: 0 !important; }
        .ma-auth-card {
          flex: 1;
          width: 100%;
          display: grid;
          /* The carousel takes the larger share — it is what gives the page its warmth —
             while the form keeps a comfortable reading width rather than stretching. */
          grid-template-columns: minmax(0, 1.5fr) minmax(400px, 0.8fr);
          background: #fff;
          min-height: calc(100vh - 108px - 84px);
        }
        .ma-auth-carousel {
          position: relative;
          overflow: hidden;
          background: #1C1410;
        }
        .ma-auth-form {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .ma-auth-input:focus {
          border-color: ${GOLD} !important;
          box-shadow: 0 0 0 3px rgba(201,165,88,0.18);
        }
        .ma-auth-input::placeholder { color: rgba(139,105,20,0.4); }
        .ma-auth-footer {
          width: 100%;
          padding: 18px 24px;
          border-top: 1px solid rgba(201,165,88,0.28);
          background: #FFFDF9;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          justify-content: center;
        }
        .ma-auth-footer a:hover { color: ${GOLD} !important; }
        @media (max-width: 1000px) {
          .ma-auth-card { grid-template-columns: 1fr; min-height: 0; }
          /* Kept on narrow screens, just shorter — losing it entirely strips the page of
             everything that made it feel like Mama Africa. */
          .ma-auth-carousel { min-height: 260px; }
          .ma-auth-form { padding: 40px 26px !important; }
        }
        @media (max-width: 520px) {
          .ma-auth-carousel { min-height: 190px; }
        }
      `}</style>

      <div className="ma-auth-card">
        <AuthCarousel />

        {/* Form */}
        <div className="ma-auth-form" style={{ padding: '48px 44px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: INK, margin: '0 0 8px' }}>
            {heading}
          </h1>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16.5, lineHeight: 1.6, color: '#6B5B4A', margin: '0 0 28px' }}>
            {blurb}
          </p>

          {error && (
            <div style={{ background: '#FDECEA', border: '1px solid #F2C4BE', color: '#A33', borderRadius: 10, padding: '11px 14px', fontSize: 14, fontFamily: "'Montserrat', sans-serif", marginBottom: 18 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#EFF7EE', border: '1px solid #C6E2C2', color: '#3B6B36', borderRadius: 10, padding: '11px 14px', fontSize: 14, fontFamily: "'Montserrat', sans-serif", marginBottom: 18 }}>
              {success}
            </div>
          )}

          {mode === 'forgot' ? (
            <form onSubmit={handleForgot}>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="forgot-email">Email</label>
                <input
                  id="forgot-email" type="email" className="ma-auth-input" style={inputBase}
                  value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="you@example.com" autoComplete="email" required
                />
              </div>
              <PrimaryButton loading={loading}>Send reset link</PrimaryButton>
              <TextLink onClick={() => switchMode('signin')} centered>Back to sign in</TextLink>
            </form>
          ) : (
            <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn}>
              {mode === 'signup' && (
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle} htmlFor="name">Your name</label>
                  <input
                    id="name" type="text" className="ma-auth-input" style={inputBase}
                    value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Adwoa Boateng" autoComplete="name" required
                  />
                </div>
              )}

              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle} htmlFor="email">Email</label>
                <input
                  id="email" type="email" className="ma-auth-input" style={inputBase}
                  value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com" autoComplete="email" required
                />
              </div>

              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle} htmlFor="password">Password</label>
                <input
                  id="password" type="password" className="ma-auth-input" style={inputBase}
                  value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required
                />
              </div>

              {mode === 'signup' && (
                <PolicyConsent accepted={acceptedPolicies} onChange={setAcceptedPolicies} />
              )}

              {mode === 'signin' && (
                <div style={{ textAlign: 'right', marginBottom: 18 }}>
                  <TextLink onClick={() => switchMode('forgot')}>Forgot your password?</TextLink>
                </div>
              )}


              <PrimaryButton loading={loading}>
                {mode === 'signup' ? 'Create account' : 'Sign in'}
              </PrimaryButton>

              <p style={{ textAlign: 'center', marginTop: 20, fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: '#6B5B4A' }}>
                {mode === 'signup' ? 'Already have an account?' : 'New to Mama Africa?'}{' '}
                <TextLink onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')} strong>
                  {mode === 'signup' ? 'Sign in' : 'Create one'}
                </TextLink>
              </p>
            </form>
          )}
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}

/**
 * Footer for the sign-in page only. The site's main footer is dark and heavy; on a white page
 * it would fight the card, so this is a lighter version carrying the same essentials.
 */
function AuthFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="ma-auth-footer">
      {/* Deliberately two lines: the screen belongs to the carousel and the form, and a tall
          footer would take space from both for information nobody came here to read. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', alignItems: 'baseline', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.18em', color: GOLD_DEEP }}>
          MAMA AFRICA OFFICIAL
        </span>
        <span style={{ color: 'rgba(139,105,20,0.35)' }}>&middot;</span>
        <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 14.5, fontStyle: 'italic', color: '#6B5B4A' }}>
          Heritage names, culture &amp; keepsakes for every generation
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', justifyContent: 'center', alignItems: 'baseline' }}>
        <a href="mailto:Mamaafricaafia@gmail.com" style={footerLink}>Mamaafricaafia@gmail.com</a>
        <a href="/privacy-policy" style={footerLink}>Privacy</a>
        <a href="/terms" style={footerLink}>Terms</a>
        <a href="/shipping-returns" style={footerLink}>Shipping &amp; Returns</a>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11.5, color: '#9A8B7A' }}>
          &copy; {year} Ghana
        </span>
      </div>
    </footer>
  );
}

const footerLink = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 13,
  color: GOLD_DEEP,
  textDecoration: 'none',
  borderBottom: '1px solid rgba(201,165,88,0.45)',
  paddingBottom: 2,
};

function PrimaryButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: '100%', padding: '14px', borderRadius: 999, border: 'none',
        background: `linear-gradient(135deg, ${GOLD} 0%, #B98F3E 55%, ${GOLD_DEEP} 100%)`,
        color: '#fff', fontFamily: "'Montserrat', sans-serif", fontSize: 13,
        fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
        cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1,
        boxShadow: '0 8px 20px rgba(201,165,88,0.32)',
      }}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}

function TextLink({ onClick, children, centered, strong }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        color: GOLD_DEEP, fontFamily: "'Montserrat', sans-serif",
        fontSize: 13.5, fontWeight: strong ? 700 : 500, textDecoration: 'underline',
        display: centered ? 'block' : 'inline', margin: centered ? '16px auto 0' : 0,
      }}
    >
      {children}
    </button>
  );
}
