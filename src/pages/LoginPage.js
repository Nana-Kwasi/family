import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function InputField({ id, label, type, placeholder, value, onChange }) {
  return (
    <div className="form-field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="afia-input-plain"
        style={type === 'password' ? {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Verdana, sans-serif',
          letterSpacing: '0.18em',
          color: '#EDD9BC',
        } : {}}
        required
      />
    </div>
  );
}

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  if (user) { navigate(from, { replace: true }); return null; }

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    const result = await login(loginForm.email, loginForm.password);
    setLoading(false);
    if (result.success) navigate(from, { replace: true });
    else setError(result.error);
  }

  async function handleForgot(e) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    const result = await resetPassword(forgotEmail);
    setLoading(false);
    if (result.success) {
      setSuccess('Password reset email sent! Check your inbox.');
    } else {
      setError(result.error);
    }
  }

  if (showForgot) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 26, color: '#C9A558', letterSpacing: '0.12em', marginBottom: 8 }}>Reset Password</h1>
            <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 15 }}>We'll send a reset link to your email</p>
          </div>
          <div className="afia-card">
            <form onSubmit={handleForgot}>
              <div className="form-field">
                <label className="field-label" htmlFor="forgot-email">Email Address</label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="your@email.com"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="afia-input-plain"
                  required
                />
              </div>
              {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}
              {success && <div className="success-msg" style={{ marginBottom: 16 }}>{success}</div>}
              <button type="submit" className="btn-gold" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </form>
            <button
              onClick={() => { setShowForgot(false); setError(''); setSuccess(''); }}
              style={{ background: 'none', border: 'none', color: '#BA9D7C', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.1em', marginTop: 16, width: '100%', textAlign: 'center', textTransform: 'uppercase' }}
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 12 }}>
            Admin Access
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: '#C9A558', letterSpacing: '0.15em', marginBottom: 10 }}>
            Welcome, Mama Africa
          </h1>
          <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 15, lineHeight: 1.7 }}>
            This portal is exclusively for Mama Africa.<br />
            Not for public access.
          </p>
        </div>

        <div className="afia-card">
          <form onSubmit={handleLogin}>
            <InputField id="login-email" label="Email Address" type="email" placeholder="your@email.com"
              value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} />
            <InputField id="login-password" label="Password" type="password" placeholder="••••••••"
              value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} />

            <div style={{ textAlign: 'right', marginTop: -12, marginBottom: 20 }}>
              <button type="button" onClick={() => { setShowForgot(true); setError(''); }}
                style={{ background: 'none', border: 'none', color: '#9E7D42', cursor: 'pointer', fontSize: 13, fontFamily: "'EB Garamond', serif", fontStyle: 'italic', textDecoration: 'underline' }}>
                Forgot password?
              </button>
            </div>

            {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#7C5F48', fontSize: 14, fontStyle: 'italic' }}>
          Gye Nyame — Except God, I fear none
        </p>
      </div>
    </div>
  );
}
