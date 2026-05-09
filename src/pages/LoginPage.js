import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { sendAdminOtpEmail } from '../utils/emailjs';
import { db } from '../firebase';
import { ADMIN_OTP_GATE_KEY, ADMIN_AFTER_LOGIN_KEY } from '../constants/adminSession';
import { verifyAdminSecurityAnswers, ADMIN_SECURITY_QUESTIONS } from '../utils/adminSecurityChallenges';

const ADMIN_EMAIL = (process.env.REACT_APP_ADMIN_EMAIL || 'Mamaafricaafia@gmail.com').toLowerCase();
const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;
const OTP_LOCK_MS = 5 * 60 * 1000;
const OTP_DOC_ID = 'primary';
const SECURITY_MAX_ATTEMPTS = 5;

function friendlyOtpSendError(err) {
  const status = Number(err?.status);
  if ([502, 503, 504].includes(status)) {
    return 'Email service is temporarily unavailable. Please try again in a few moments.';
  }
  if (status === 429) {
    return 'Too many email requests right now. Please wait a minute and try again.';
  }
  if (status === 403) {
    return 'Email service rejected this request. Check EmailJS template and account limits.';
  }
  return 'Could not send OTP email. Please verify EmailJS settings and try again.';
}

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
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpExpiresAt, setOtpExpiresAt] = useState(0);
  const [otpLockUntil, setOtpLockUntil] = useState(0);
  const [otpStatus, setOtpStatus] = useState('');
  const [showOtpSentBanner, setShowOtpSentBanner] = useState(false);
  const [nowTs, setNowTs] = useState(Date.now());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailFailRecovery, setShowEmailFailRecovery] = useState(false);
  const [showSecurityFlow, setShowSecurityFlow] = useState(false);
  const [securityAnswers, setSecurityAnswers] = useState(['', '', '']);
  const [securityAttempts, setSecurityAttempts] = useState(0);
  const [securityError, setSecurityError] = useState('');
  const [otpVerifying, setOtpVerifying] = useState(false);

  const { user, login, resetPassword, logout, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const otpDocRef = doc(db, 'adminOtpSessions', OTP_DOC_ID);

  function generateOtpCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  function triggerOtpSentBanner() {
    setShowOtpSentBanner(true);
    window.setTimeout(() => setShowOtpSentBanner(false), 3200);
  }

  async function getOtpSessionFromDb() {
    const snap = await getDoc(otpDocRef);
    return snap.exists() ? snap.data() : null;
  }

  function openExistingOtpSession(expiresAt, lockUntil = 0) {
    setOtpLockUntil(lockUntil || 0);
    setOtpStatus('Using your existing active OTP. Check your email and enter the code.');
    setOtpInput('');
    setOtpExpiresAt(expiresAt || 0);
    setShowOtpCard(true);
    sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
  }

  async function issueOtp() {
    const otpCode = generateOtpCode();
    const expiresAt = Date.now() + OTP_TTL_MS;
    setOtpLockUntil(0);
    await sendAdminOtpEmail({ otp_code: otpCode, expires_minutes: 5 });
    await setDoc(otpDocRef, {
      email: ADMIN_EMAIL,
      otpCode,
      expiresAt,
      used: false,
      attempts: 0,
      maxAttempts: OTP_MAX_ATTEMPTS,
      lockUntil: 0,
      issuedAt: Date.now(),
      consumedAt: null,
    });
    setOtpExpiresAt(expiresAt);
    setOtpStatus('');
    setOtpInput('');
    setShowOtpCard(true);
    sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
    return { otpCode, expiresAt };
  }

  useEffect(() => {
    if (!showOtpCard) return undefined;
    const timer = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [showOtpCard]);

  useEffect(() => {
    if (!user || showOtpCard || showEmailFailRecovery || showSecurityFlow) return;
    if (sessionStorage.getItem(ADMIN_OTP_GATE_KEY)) return;
    navigate(from, { replace: true });
  }, [user, showOtpCard, showEmailFailRecovery, showSecurityFlow, navigate, from]);

  useEffect(() => {
    if (!user || authLoading) return;
    if (!sessionStorage.getItem(ADMIN_OTP_GATE_KEY)) return;
    if (sessionStorage.getItem(ADMIN_AFTER_LOGIN_KEY)) return;
    if (showOtpCard || showEmailFailRecovery || showSecurityFlow) return;

    let cancelled = false;
    (async () => {
      const snap = await getDoc(otpDocRef);
      const session = snap.exists() ? snap.data() : null;
      if (cancelled) return;
      if (session?.lockUntil && session.lockUntil > Date.now()) {
        sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
        sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
        await logout();
        setError(`Too many invalid OTP attempts. Try again in ${Math.ceil((session.lockUntil - Date.now()) / 60000)} minute(s).`);
        return;
      }
      if (
        session &&
        session.email === ADMIN_EMAIL &&
        !session.used &&
        session.expiresAt > Date.now()
      ) {
        openExistingOtpSession(session.expiresAt, session.lockUntil || 0);
        return;
      }
      setShowEmailFailRecovery(true);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- gate restore: uid + UI flags only (logout/otpDocRef stable)
  }, [user?.uid, authLoading, showOtpCard, showEmailFailRecovery, showSecurityFlow]);

  useEffect(() => {
    if (!showOtpCard) return;
    if (otpLockUntil > 0 && nowTs >= otpLockUntil) {
      setOtpLockUntil(0);
      setError('');
      setOtpStatus('Lock expired. You can verify or resend OTP now.');
    }
  }, [showOtpCard, otpLockUntil, nowTs]);

  const showAdminVerifyShell = Boolean(
    user &&
    sessionStorage.getItem(ADMIN_OTP_GATE_KEY) &&
    !showOtpCard &&
    !showEmailFailRecovery &&
    !showSecurityFlow,
  );

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowEmailFailRecovery(false);
    setShowSecurityFlow(false);
    setSecurityAnswers(['', '', '']);
    setSecurityAttempts(0);
    setSecurityError('');
    setLoading(true);
    const email = loginForm.email.trim().toLowerCase();
    if (email !== ADMIN_EMAIL) {
      setLoading(false);
      setError('Only the authorized admin email can sign in.');
      return;
    }
    const result = await login(loginForm.email, loginForm.password);
    if (!result.success) {
      setLoading(false);
      setError(result.error);
      return;
    }
    try {
      const currentSession = await getOtpSessionFromDb();
      if (currentSession?.lockUntil && currentSession.lockUntil > Date.now()) {
        const minsLeft = Math.ceil((currentSession.lockUntil - Date.now()) / 60000);
        sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
        sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
        await logout();
        setLoading(false);
        setError(`Too many invalid OTP attempts. Try again in ${minsLeft} minute(s).`);
        return;
      }
      if (
        currentSession &&
        currentSession.email === ADMIN_EMAIL &&
        !currentSession.used &&
        currentSession.expiresAt > Date.now()
      ) {
        openExistingOtpSession(currentSession.expiresAt, currentSession.lockUntil || 0);
        setLoading(false);
        return;
      }
      await issueOtp();
      triggerOtpSentBanner();
      setLoading(false);
      setSuccess('OTP sent to admin email. Enter it below.');
    } catch (err) {
      console.error('OTP send error:', err);
      sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
      setLoading(false);
      setShowOtpCard(false);
      setError(friendlyOtpSendError(err));
      setShowEmailFailRecovery(true);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError('');
    setOtpStatus('');
    setOtpVerifying(true);
    try {
      const session = await getOtpSessionFromDb();
      if (!session) {
        setError('OTP session missing. Please sign in again.');
        sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
        sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
        await logout();
        setShowOtpCard(false);
        return;
      }

      if (session.lockUntil && session.lockUntil > Date.now()) {
        const minsLeft = Math.ceil((session.lockUntil - Date.now()) / 60000);
        setOtpLockUntil(session.lockUntil);
        setError(`Too many invalid attempts. Locked for ${minsLeft} minute(s).`);
        return;
      }

      if (session.used) {
        setError('This OTP has already been used. Please request a new OTP.');
        sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
        sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
        await logout();
        setShowOtpCard(false);
        return;
      }
      if (Date.now() > session.expiresAt) {
        await updateDoc(otpDocRef, { used: true, consumedAt: Date.now() });
        setError('OTP expired. Please sign in again.');
        sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
        sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
        await logout();
        setShowOtpCard(false);
        return;
      }
      if (otpInput.trim() !== session.otpCode) {
        const nextAttempts = (session.attempts || 0) + 1;
        if (nextAttempts >= OTP_MAX_ATTEMPTS) {
          const lockUntil = Date.now() + OTP_LOCK_MS;
          await updateDoc(otpDocRef, {
            attempts: nextAttempts,
            lockUntil,
            used: true,
            consumedAt: Date.now(),
          });
          setOtpLockUntil(lockUntil);
          setError('Too many invalid OTP attempts. Locked for 5 minutes.');
        } else {
          await updateDoc(otpDocRef, { attempts: nextAttempts });
          setError(`Invalid OTP code. ${OTP_MAX_ATTEMPTS - nextAttempts} attempt(s) left.`);
        }
        return;
      }

      await updateDoc(otpDocRef, {
        used: true,
        consumedAt: Date.now(),
        attempts: (session.attempts || 0) + 1,
      });
      sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
      sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
      setOtpStatus('OTP verified. Redirecting...');
      setShowOtpCard(false);
      navigate(from, { replace: true });
    } finally {
      setOtpVerifying(false);
    }
  }

  async function resendOtp() {
    setError('');
    setOtpStatus('');
    setLoading(true);
    try {
      const session = await getOtpSessionFromDb();
      if (session?.lockUntil && session.lockUntil > Date.now()) {
        const minsLeft = Math.ceil((session.lockUntil - Date.now()) / 60000);
        setError(`OTP resend blocked. Try again in ${minsLeft} minute(s).`);
        return;
      }
      await issueOtp();
      triggerOtpSentBanner();
      setOtpStatus('A fresh OTP has been sent.');
    } catch (err) {
      console.error('OTP resend error:', err);
      setError(friendlyOtpSendError(err));
    } finally {
      setLoading(false);
    }
  }

  async function cancelOtpFlow() {
    await updateDoc(otpDocRef, { used: true, consumedAt: Date.now() }).catch(() => {});
    sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
    sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
    setShowOtpCard(false);
    setOtpInput('');
    setOtpStatus('');
    await logout();
  }

  async function exitRecoveryLogout() {
    sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
    sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
    setShowEmailFailRecovery(false);
    setShowSecurityFlow(false);
    setSecurityAnswers(['', '', '']);
    setSecurityError('');
    setError('');
    await logout();
  }

  async function handleSecurityVerify(e) {
    e.preventDefault();
    setSecurityError('');
    setLoading(true);
    try {
      const ok = await verifyAdminSecurityAnswers(
        securityAnswers[0],
        securityAnswers[1],
        securityAnswers[2],
      );
      if (!ok) {
        const next = securityAttempts + 1;
        setSecurityAttempts(next);
        if (next >= SECURITY_MAX_ATTEMPTS) {
          sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
          sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
          setShowEmailFailRecovery(false);
          setShowSecurityFlow(false);
          await logout();
          setError('Too many failed attempts. Please sign in again.');
          return;
        }
        setSecurityError(`Answers do not match. ${SECURITY_MAX_ATTEMPTS - next} attempt(s) left.`);
        return;
      }
      await updateDoc(otpDocRef, { used: true, consumedAt: Date.now() }).catch(() => {});
      sessionStorage.removeItem(ADMIN_OTP_GATE_KEY);
      sessionStorage.removeItem(ADMIN_AFTER_LOGIN_KEY);
      setShowEmailFailRecovery(false);
      setShowSecurityFlow(false);
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
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

  if (showAdminVerifyShell) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <p style={{ color: '#BA9D7C', fontFamily: "'Cinzel', serif", letterSpacing: '0.14em', fontSize: 14, textAlign: 'center' }}>
          {loading || sessionStorage.getItem(ADMIN_AFTER_LOGIN_KEY)
            ? 'Securing your session…'
            : 'Restoring verification…'}
        </p>
      </div>
    );
  }

  if (user && showEmailFailRecovery) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>
          <div className="afia-card" style={{ border: '1px solid rgba(201,165,88,0.45)' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#C9A558', textTransform: 'uppercase' }}>
                Alternate verification
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#EDD9BC', marginTop: 8 }}>
                {showSecurityFlow ? 'Security questions' : 'Email could not be sent'}
              </h2>
            </div>
            {!showSecurityFlow ? (
              <>
                <p style={{ color: '#BA9D7C', fontSize: 15, lineHeight: 1.65, marginBottom: 20, textAlign: 'center' }}>
                  {error || 'We could not reach your inbox with a one-time code. You can answer private verification questions instead, or sign out and try again later.'}
                </p>
                <button type="button" className="btn-gold" style={{ width: '100%', marginBottom: 12 }} onClick={() => { setShowSecurityFlow(true); setSecurityError(''); }}>
                  Try another way to verify
                </button>
                <button type="button" className="btn-ghost" style={{ width: '100%' }} onClick={exitRecoveryLogout}>
                  Sign out
                </button>
              </>
            ) : (
              <form onSubmit={handleSecurityVerify}>
                {[0, 1, 2].map((i) => (
                  <div className="form-field" key={i}>
                    <label className="field-label" htmlFor={`sec-q-${i}`}>{ADMIN_SECURITY_QUESTIONS[i]}</label>
                    <input
                      id={`sec-q-${i}`}
                      className="afia-input-plain"
                      value={securityAnswers[i]}
                      onChange={(e) => {
                        const next = [...securityAnswers];
                        next[i] = e.target.value;
                        setSecurityAnswers(next);
                      }}
                      autoComplete="off"
                      required
                    />
                  </div>
                ))}
                {securityError && <div className="error-msg" style={{ marginBottom: 14 }}>{securityError}</div>}
                <button type="submit" className="btn-gold" style={{ width: '100%', marginBottom: 10 }} disabled={loading}>
                  {loading ? 'Checking…' : 'Verify answers'}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  style={{ width: '100%' }}
                  disabled={loading}
                  onClick={() => { setShowSecurityFlow(false); setSecurityError(''); }}
                >
                  Back
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
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

  if (showOtpCard) {
    const secondsLeft = Math.max(0, Math.ceil((otpExpiresAt - nowTs) / 1000));
    const lockSecondsLeft = Math.max(0, Math.ceil((otpLockUntil - nowTs) / 1000));
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');
    const lockMm = String(Math.floor(lockSecondsLeft / 60)).padStart(2, '0');
    const lockSs = String(lockSecondsLeft % 60).padStart(2, '0');
    const isLocked = lockSecondsLeft > 0;
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <style>{'@keyframes loginOtpVerifySpin{to{transform:rotate(360deg)}}'}</style>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div className="afia-card" style={{ border: '1px solid rgba(201,165,88,0.5)', boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '0.18em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 8 }}>
                Two-Factor Verification
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: '#EDD9BC', marginBottom: 8 }}>
                Enter One-Time Password
              </h2>
              <p style={{ color: '#BA9D7C', fontSize: 16, fontStyle: 'italic' }}>
                Enter the 6-digit OTP sent to your email.
              </p>
            </div>

            {showOtpSentBanner && (
              <div style={{
                marginBottom: 16,
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid rgba(34,197,94,0.45)',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.12))',
                color: '#86efac',
                textAlign: 'center',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 13,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                OTP code has been sent to your email.
              </div>
            )}

            <form onSubmit={handleVerifyOtp}>
              <div className="form-field">
                <label className="field-label" htmlFor="otp-code">OTP Code</label>
                <input
                  id="otp-code"
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="afia-input-plain"
                  placeholder="000000"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  disabled={otpVerifying || isLocked}
                  style={{
                    textAlign: 'center',
                    letterSpacing: '0.5em',
                    fontSize: 24,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  }}
                />
              </div>

              <p style={{ textAlign: 'center', color: '#C9A558', fontSize: 14, marginBottom: 16 }}>
                Expires in: <strong>{mm}:{ss}</strong>
              </p>
              {isLocked && (
                <p style={{ textAlign: 'center', color: '#f87171', fontSize: 14, marginBottom: 16 }}>
                  Locked: <strong>{lockMm}:{lockSs}</strong> remaining
                </p>
              )}

              {error && <div className="error-msg" style={{ marginBottom: 14 }}>{error}</div>}
              {otpStatus && <div className="success-msg" style={{ marginBottom: 14 }}>{otpStatus}</div>}

              <button type="submit" className="btn-gold" disabled={loading || otpVerifying || otpInput.length !== 6 || isLocked}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  {otpVerifying ? (
                    <span
                      aria-hidden
                      style={{
                        width: 18,
                        height: 18,
                        border: '2px solid rgba(28,14,4,0.2)',
                        borderTopColor: '#1C0E04',
                        borderRadius: '50%',
                        animation: 'loginOtpVerifySpin 0.65s linear infinite',
                        flexShrink: 0,
                      }}
                    />
                  ) : null}
                  {otpVerifying ? 'Verifying…' : 'Verify OTP'}
                </span>
              </button>
            </form>

            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={resendOtp} disabled={loading || otpVerifying || isLocked}>
                Resend OTP
              </button>
              <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={cancelOtpFlow} disabled={loading || otpVerifying}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '56px 16px 72px' }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.22em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 12 }}>
            Admin Access
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(26px, 3vw, 34px)', color: '#C9A558', letterSpacing: '0.1em', marginBottom: 10 }}>
            Welcome, Mama Africa
          </h1>
          <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 15, lineHeight: 1.7 }}>
            This portal is exclusively for Mama Africa.<br />
            Not for public access.
          </p>
        </div>

        <div className="afia-card" style={{ maxWidth: 560, margin: '0 auto', padding: '22px 18px' }}>
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
            <button type="submit" className="btn-gold" disabled={loading} style={{ padding: '11px 14px', fontSize: 13, letterSpacing: '0.14em' }}>
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
