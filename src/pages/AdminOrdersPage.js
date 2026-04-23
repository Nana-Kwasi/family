import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const { subscribeToAllOrders, updateOrderStatus } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) return;
    const unsub = subscribeToAllOrders(data => {
      setOrders(data);
      setLoading(false);
    });
    return () => unsub();
  }, [user, subscribeToAllOrders]);

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

  async function handleStatusChange(orderId, status) {
    await updateOrderStatus(orderId, status);
  }

  const counts = {
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="page-wrapper">
      <section style={{ padding: '80px 20px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 4 }}>Orders</h1>
              <p style={{ color: '#7C5F48', fontStyle: 'italic' }}>{orders.length} total · live updates</p>
            </div>
            <button className="btn-ghost" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => navigate('/admin/users')}>
              Users →
            </button>
          </div>

          {/* Summary badges */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
            {[['pending','Pending','status-pending'],['shipped','Shipped','status-shipped'],['delivered','Delivered','status-delivered']].map(([key, label, cls]) => (
              <div key={key} className="afia-card" style={{ padding: '14px 24px', flex: '1 1 120px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: '#C9A558' }}>{counts[key]}</div>
                <span className={`status-badge ${cls}`} style={{ marginTop: 6, display: 'inline-block' }}>{label}</span>
              </div>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#7C5F48', fontStyle: 'italic' }}>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="afia-card" style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: '#BA9D7C' }}>No orders yet.</p>
            </div>
          ) : (
            <div className="afia-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Total</th>
                      <th>Delivery</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => {
                      const date = order.createdAt?.toDate?.() || (order.createdAt ? new Date(order.createdAt) : null);
                      return (
                        <tr key={order.id}>
                          <td style={{ color: '#C9A558', fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.08em' }}>{order.id}</td>
                          <td>
                            <div style={{ color: '#EDD9BC', fontSize: 14 }}>{order.userName}</div>
                            <div style={{ color: '#7C5F48', fontSize: 12 }}>{order.userEmail}</div>
                          </td>
                          <td style={{ maxWidth: 160, fontSize: 13 }}>{order.product?.name}</td>
                          <td>{order.size}</td>
                          <td style={{ color: '#C9A558', fontFamily: "'Cinzel', serif" }}>${order.total}</td>
                          <td style={{ fontSize: 12 }}>
                            <div>{order.delivery?.city}, {order.delivery?.country}</div>
                            <div style={{ color: '#7C5F48' }}>{order.delivery?.phone}</div>
                          </td>
                          <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                            {date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value)}
                              style={{
                                background: '#231510', border: '1px solid rgba(201,165,88,0.3)',
                                color: '#C9A558', borderRadius: 4, padding: '4px 8px',
                                fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.08em',
                                cursor: 'pointer', outline: 'none',
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
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
