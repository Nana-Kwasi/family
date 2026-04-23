import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const STATUS_STYLES = {
  pending:   { label: 'Pending',   cls: 'status-pending' },
  shipped:   { label: 'Shipped',   cls: 'status-shipped' },
  delivered: { label: 'Delivered', cls: 'status-delivered' },
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart, subscribeToMyOrders } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (!user) { setMyOrders([]); return; }
    const unsub = subscribeToMyOrders(user.id, setMyOrders);
    return () => unsub();
  }, [user, subscribeToMyOrders]);

  const shipping = items.length > 0 ? 4.99 : 0;
  const grandTotal = total + shipping;

  return (
    <div className="page-wrapper">
      <section style={{ padding: '56px 20px 32px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 10 }}>
          Your Cart
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 40px)', color: '#EDD9BC', marginBottom: 0 }}>
          {items.length === 0 ? 'Your cart is empty' : `${items.length} item${items.length > 1 ? 's' : ''} in your cart`}
        </h1>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: items.length > 0 ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr', gap: 32, alignItems: 'start' }}>

          {/* Left — Cart Items */}
          <div>
            {items.length === 0 ? (
              <div className="afia-card" style={{ textAlign: 'center', padding: '56px 32px' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🛍️</div>
                <p style={{ color: '#BA9D7C', marginBottom: 8, fontFamily: "'Playfair Display', serif", fontSize: 20 }}>Nothing here yet.</p>
                <p style={{ color: '#7C5F48', fontStyle: 'italic', fontSize: 15, marginBottom: 28 }}>Discover meaningful gifts for the mothers who give everything.</p>
                <button className="btn-gold" style={{ width: 'auto', padding: '12px 36px' }} onClick={() => navigate('/store')}>
                  Shop Mother's Day
                </button>
              </div>
            ) : (
              <div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 20 }}>
                  Items
                </h2>
                {items.map(item => (
                  <div key={item.cartItemId} style={{ display: 'flex', gap: 16, padding: '20px', background: 'var(--bg-card)', border: '1px solid rgba(201,165,88,0.15)', borderRadius: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                    </Link>
                    <div style={{ flex: 1 }}>
                      <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#EDD9BC', marginBottom: 4 }}>{item.name}</p>
                      </Link>
                      <p style={{ fontSize: 13, color: '#7C5F48', marginBottom: 10 }}>Size: {item.size}</p>
                      {/* Quantity controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,165,88,0.25)', borderRadius: 6, overflow: 'hidden' }}>
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={{ background: 'transparent', border: 'none', color: '#C9A558', width: 32, height: 32, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: '#EDD9BC', padding: '0 12px', minWidth: 32, textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={{ background: 'transparent', border: 'none', color: '#C9A558', width: 32, height: 32, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                        </div>
                        <button className="cart-remove" onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: '#C9A558', flexShrink: 0 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                <button onClick={clearCart} style={{ background: 'transparent', border: 'none', color: '#7C5F48', fontSize: 13, cursor: 'pointer', fontStyle: 'italic', marginTop: 4 }}>
                  Clear cart
                </button>
              </div>
            )}
          </div>

          {/* Right — Order Summary */}
          {items.length > 0 && (
            <div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 20 }}>
                Order Summary
              </h2>
              <div className="afia-card" style={{ padding: '24px' }}>
                {/* Line items */}
                {items.map(item => (
                  <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
                    <span style={{ color: '#BA9D7C' }}>{item.name} × {item.quantity}</span>
                    <span style={{ color: '#EDD9BC' }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: 'rgba(201,165,88,0.15)', margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                  <span style={{ color: '#BA9D7C' }}>Subtotal</span>
                  <span style={{ color: '#EDD9BC' }}>${total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
                  <span style={{ color: '#BA9D7C' }}>Shipping</span>
                  <span style={{ color: '#EDD9BC' }}>${shipping.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.1em', color: '#BA9D7C', textTransform: 'uppercase' }}>Total</span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: '#C9A558' }}>${grandTotal.toFixed(2)}</span>
                </div>

                {!user ? (
                  <>
                    <p style={{ color: '#BA9D7C', fontSize: 13, marginBottom: 14, fontStyle: 'italic', textAlign: 'center' }}>Sign in to complete your purchase.</p>
                    <button className="btn-gold" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13 }} onClick={() => navigate('/auth', { state: { from: '/checkout' } })}>
                      Sign In to Checkout
                    </button>
                  </>
                ) : (
                  <button className="btn-gold" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, letterSpacing: '0.1em' }} onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                  </button>
                )}

                <button className="btn-ghost" style={{ width: '100%', marginTop: 10, fontFamily: "'Montserrat', sans-serif", fontSize: 12 }} onClick={() => navigate('/store')}>
                  Continue Shopping
                </button>

                {/* Trust signals */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(201,165,88,0.1)' }}>
                  {['Gift-ready packaging', 'Secure checkout', 'Easy returns'].map(t => (
                    <p key={t} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: '#7C5F48', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#C9A558' }}>✦</span> {t}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order History */}
        {user && myOrders.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,165,88,0.25), transparent)', marginBottom: 32 }} />
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 20 }}>
              Your Orders
            </h2>
            {myOrders.map(order => {
              const s = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
              const date = order.createdAt?.toDate?.() || (order.createdAt ? new Date(order.createdAt) : null);
              return (
                <div key={order.id} className="afia-card" style={{ marginBottom: 14, padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.12em', color: '#C9A558', marginBottom: 4 }}>{order.id}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#EDD9BC' }}>{order.product?.name}</div>
                    </div>
                    <span className={`status-badge ${s.cls}`}>{s.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: '#7C5F48' }}>
                    <span>Size: <span style={{ color: '#BA9D7C' }}>{order.size}</span></span>
                    <span>Total: <span style={{ color: '#C9A558', fontFamily: "'Cinzel', serif" }}>${order.total}</span></span>
                    {date && <span>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                  </div>
                  {order.delivery && (
                    <p style={{ marginTop: 8, fontSize: 13, color: '#7C5F48', fontStyle: 'italic' }}>
                      Delivering to: {order.delivery.address}, {order.delivery.city}, {order.delivery.country}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
