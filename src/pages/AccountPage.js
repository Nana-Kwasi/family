import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PwField({ id, label, value, onChange }) {
  return (
    <div className="form-field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={onChange}
        className="afia-input-plain"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Verdana, sans-serif',
          letterSpacing: '0.18em',
          color: '#EDD9BC',
        }}
        placeholder="••••••••"
        required
      />
    </div>
  );
}

export default function AccountPage() {
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ current: '', newPw: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/auth');
    return null;
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setError(''); setSuccess('');
    if (form.newPw.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (form.newPw !== form.confirm) { setError('New passwords do not match.'); return; }
    setLoading(true);
    const result = await changePassword(form.current, form.newPw);
    setLoading(false);
    if (result.success) {
      setSuccess('Password updated successfully!');
      setForm({ current: '', newPw: '', confirm: '' });
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: '80px 20px 80px', maxWidth: 540, margin: '0 auto' }}>

        {/* Profile card */}
        <div className="afia-card" style={{ marginBottom: 28, textAlign: 'center', padding: '36px 28px' }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: 'rgba(201,165,88,0.12)',
            border: '1px solid rgba(201,165,88,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9A558" strokeWidth="1.4">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
              <path d="M4 21.6c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
            </svg>
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 4 }}>
            {user.name}
          </div>
          <div style={{ color: '#7C5F48', fontSize: 14, marginBottom: 4 }}>{user.email}</div>
          {user.isAdmin && (
            <span className="status-badge status-delivered" style={{ marginTop: 8, display: 'inline-block' }}>Admin</span>
          )}
        </div>

        {/* Change Password */}
        <div className="afia-card">
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: '#C9A558', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
            Change Password
          </h2>

          <form onSubmit={handleChangePassword}>
            <PwField id="current-pw" label="Current Password"
              value={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} />
            <PwField id="new-pw" label="New Password"
              value={form.newPw} onChange={e => setForm(f => ({ ...f, newPw: e.target.value }))} />
            <PwField id="confirm-pw" label="Confirm New Password"
              value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />

            {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}
            {success && <div className="success-msg" style={{ marginBottom: 16 }}>{success}</div>}

            <button type="submit" className="btn-gold" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Sign out */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button className="btn-ghost" style={{ width: 'auto', padding: '10px 32px' }}
            onClick={async () => { await logout(); navigate('/'); }}>
            Sign Out
          </button>
        </div>

      </section>
    </div>
  );
}
