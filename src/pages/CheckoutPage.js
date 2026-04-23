import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { items, total, saveOrder, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shipping = items.length > 0 ? 4.99 : 0;
  const grandTotal = total + shipping;

  const [delivery, setDelivery] = useState({ firstName: '', lastName: '', email: user?.email || '', phone: '', address: '', city: '', state: '', country: '', zip: '' });
  const [payment, setPayment] = useState({ method: 'card', cardName: '', cardNumber: '', expiry: '', cvv: '' });

  if (!user) { navigate('/auth', { state: { from: '/checkout' } }); return null; }
  if (items.length === 0) { navigate('/store'); return null; }

  function field(label, key, type = 'text', placeholder = '') {
    const val = step === 0 ? delivery[key] : payment[key];
    const setter = step === 0
      ? v => setDelivery(d => ({ ...d, [key]: v }))
      : v => setPayment(p => ({ ...p, [key]: v }));
    return (
      <div className="form-field" key={key}>
        <label className="field-label">{label}</label>
        <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={placeholder}
          className="afia-input-plain" style={{ fontSize: 15 }} />
      </div>
    );
  }

  async function handlePlaceOrder() {
    setLoading(true); setError('');
    try {
      const orderData = {
        userId: user.id,
        userName: user.name,
        userEmail: delivery.email,
        items: items.map(i => ({ id: i.id, name: i.name, size: i.size, quantity: i.quantity, price: i.price })),
        delivery,
        subtotal: total,
        shipping,
        total: grandTotal,
        paymentMethod: payment.method,
      };
      const { id: orderId } = await saveOrder(orderData);
      clearCart();
      navigate(`/order-confirmation?orderId=${orderId}&total=${grandTotal.toFixed(2)}`);
    } catch (e) {
      setError('Something went wrong placing your order. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="page-wrapper">
      <section style={{ padding: '48px 20px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 14 }}>
          Secure Checkout
        </p>
        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 8 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i <= step ? 'linear-gradient(135deg,#C9A558,#E8CB82)' : 'rgba(201,165,88,0.1)',
                  color: i <= step ? '#1C0E04' : '#7C5F48',
                  fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700,
                }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: '0.12em', color: i <= step ? '#C9A558' : '#7C5F48', textTransform: 'uppercase' }}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 60, height: 1, background: i < step ? '#C9A558' : 'rgba(201,165,88,0.2)', alignSelf: 'center', margin: '0 4px', marginBottom: 20 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'start' }}>

          {/* Left — Form */}
          <div className="afia-card" style={{ padding: '28px 24px' }}>
            {step === 0 && (
              <>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#EDD9BC', marginBottom: 24 }}>Shipping Details</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {field('First Name', 'firstName')}
                  {field('Last Name', 'lastName')}
                </div>
                {field('Email Address', 'email', 'email')}
                {field('Phone', 'phone', 'tel')}
                {field('Street Address', 'address')}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {field('City', 'city')}
                  {field('State / Region', 'state')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {field('Country', 'country')}
                  {field('ZIP / Postal Code', 'zip')}
                </div>
                <button className="btn-gold" style={{ marginTop: 8, fontFamily: "'Montserrat', sans-serif", fontSize: 13 }}
                  onClick={() => {
                    if (!delivery.firstName || !delivery.address || !delivery.city || !delivery.country) {
                      setError('Please fill in all required fields.'); return;
                    }
                    setError(''); setStep(1);
                  }}>
                  Continue to Payment
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#EDD9BC', marginBottom: 24 }}>Payment</h2>
                {/* Method selector */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  {['card', 'paypal'].map(m => (
                    <button key={m} onClick={() => setPayment(p => ({ ...p, method: m }))} style={{
                      flex: 1, padding: '10px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s',
                      background: payment.method === m ? 'rgba(201,165,88,0.15)' : 'transparent',
                      color: payment.method === m ? '#C9A558' : '#7C5F48',
                      border: payment.method === m ? '1px solid #C9A558' : '1px solid rgba(201,165,88,0.2)',
                      fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                      {m === 'card' ? '💳 Card' : '🅿 PayPal'}
                    </button>
                  ))}
                </div>
                {payment.method === 'card' && (
                  <>
                    {field('Name on Card', 'cardName')}
                    {field('Card Number', 'cardNumber', 'text', '•••• •••• •••• ••••')}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {field('Expiry (MM/YY)', 'expiry', 'text', 'MM/YY')}
                      {field('CVV', 'cvv', 'text', '•••')}
                    </div>
                  </>
                )}
                {payment.method === 'paypal' && (
                  <p style={{ color: '#BA9D7C', fontSize: 15, fontStyle: 'italic', margin: '16px 0 24px', lineHeight: 1.8 }}>
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                )}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-ghost" style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: 12 }} onClick={() => { setError(''); setStep(0); }}>
                    Back
                  </button>
                  <button className="btn-gold" style={{ flex: 2, fontFamily: "'Montserrat', sans-serif", fontSize: 13 }}
                    onClick={() => { setError(''); setStep(2); }}>
                    Review Order
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#EDD9BC', marginBottom: 24 }}>Review & Confirm</h2>
                {/* Delivery summary */}
                <div style={{ marginBottom: 20, padding: '16px', background: 'rgba(201,165,88,0.04)', borderRadius: 8, border: '1px solid rgba(201,165,88,0.15)' }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 8 }}>Shipping to</p>
                  <p style={{ color: '#EDD9BC', fontSize: 15 }}>{delivery.firstName} {delivery.lastName}</p>
                  <p style={{ color: '#BA9D7C', fontSize: 14 }}>{delivery.address}, {delivery.city}, {delivery.country} {delivery.zip}</p>
                  <p style={{ color: '#BA9D7C', fontSize: 14 }}>{delivery.email}</p>
                </div>
                {/* Payment summary */}
                <div style={{ marginBottom: 24, padding: '16px', background: 'rgba(201,165,88,0.04)', borderRadius: 8, border: '1px solid rgba(201,165,88,0.15)' }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 8 }}>Payment</p>
                  <p style={{ color: '#BA9D7C', fontSize: 14 }}>{payment.method === 'card' ? `Card ending •••• ${payment.cardNumber.slice(-4) || '••••'}` : 'PayPal'}</p>
                </div>
                {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-ghost" style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: 12 }} onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button className="btn-gold" style={{ flex: 2, fontFamily: "'Montserrat', sans-serif", fontSize: 13 }}
                    onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing Order…' : 'Place Order'}
                  </button>
                </div>
              </>
            )}

            {error && step < 2 && <div className="error-msg" style={{ marginTop: 14 }}>{error}</div>}
          </div>

          {/* Right — Order Summary */}
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.18em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 16 }}>
              Your Order
            </h2>
            <div className="afia-card" style={{ padding: '20px' }}>
              {items.map(item => (
                <div key={item.cartItemId} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: '#EDD9BC', marginBottom: 2 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: '#7C5F48' }}>Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: '#C9A558' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(201,165,88,0.15)', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                <span style={{ color: '#BA9D7C' }}>Subtotal</span>
                <span style={{ color: '#EDD9BC' }}>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 12 }}>
                <span style={{ color: '#BA9D7C' }}>Shipping</span>
                <span style={{ color: '#EDD9BC' }}>${shipping.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.1em', color: '#BA9D7C', textTransform: 'uppercase' }}>Total</span>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: '#C9A558' }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            {/* Trust badges */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['🔒 Secure SSL checkout', '📦 Gift-ready packaging', '↩️ Easy returns policy'].map(t => (
                <p key={t} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: '#7C5F48' }}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
