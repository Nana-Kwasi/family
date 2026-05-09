import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminUsersPage() {
  const { user, getAllUsers } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) return;
    getAllUsers().then(data => { setUsers(data); setLoading(false); });
  }, [user, getAllUsers]);

  if (!user?.isAdmin) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f87171', marginBottom: 20 }}>Access denied. Admin only.</p>
          <button className="btn-ghost" style={{ width: 'auto' }} onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: '80px 20px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 4 }}>Users</h1>
              <p style={{ color: '#7C5F48', fontStyle: 'italic' }}>{users.length} registered users</p>
            </div>
            <button className="btn-ghost" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => navigate('/admin/stories')}>
              ← Stories
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#7C5F48', fontStyle: 'italic' }}>Loading users...</div>
          ) : (
            <div className="afia-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => {
                      const date = u.createdAt?.toDate?.() || (u.createdAt ? new Date(u.createdAt) : null);
                      return (
                        <tr key={u.id}>
                          <td style={{ color: '#EDD9BC', fontWeight: 500 }}>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <span className={`status-badge ${u.isAdmin ? 'status-delivered' : 'status-pending'}`}>
                              {u.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td style={{ fontSize: 12 }}>
                            {date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
