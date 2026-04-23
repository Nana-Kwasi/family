import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const BagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

export default function PurchaseModal({ product, onClose }) {
  const { user } = useAuth();
  const { saveOrder } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState('details'); // details | form | success
  const [selectedSize, setSelectedSize] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: '', phone: '', address: '', city: '', country: '', zip: '' });
  const [errors, setErrors] = useState({});
  const [orderNum, setOrderNum] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: '#C9A558', letterSpacing: '0.1em' }}>Sign In Required</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <p style={{ color: '#BA9D7C', marginBottom: 24, lineHeight: 1.8 }}>
            You need to be signed in to make a purchase. Create an account or sign in to continue.
          </p>
          <button className="btn-gold" onClick={() => { onClose(); navigate('/auth'); }}>
            Sign In / Create Account
          </button>
        </div>
      </div>
    );
  }

  function validate() {
    const e = {};
    if (!selectedSize) e.size = 'Please select a size.';
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.address.trim()) e.address = 'Street address is required.';
    if (!form.city.trim()) e.city = 'City is required.';
    if (!form.country.trim()) e.country = 'Country is required.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const order = await saveOrder({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        product: { id: product.id, name: product.name, price: product.price, type: product.type },
        size: selectedSize,
        quantity: 1,
        total: product.price,
        delivery: { ...form },
      });
      setOrderNum(order.id);
      setStep('success');
    } catch {
      setErrors({ submit: 'Failed to place order. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  function Field({ id, label, type = 'text', placeholder, half }) {
    return (
      <div className="form-field" style={half ? { display: 'inline-block', width: 'calc(50% - 6px)' } : {}}>
        <label className="field-label" htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); setErrors(err => ({ ...err, [id]: '' })); }}
          className="afia-input-plain"
          style={errors[id] ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
        />
        {errors[id] && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors[id]}</div>}
      </div>
    );
  }

  return (
    <div className="overlay" onClick={step !== 'success' ? onClose : undefined}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: step === 'success' ? 420 : 520 }}>
        {step === 'success' ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✨</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: '#C9A558', fontSize: 22, letterSpacing: '0.1em', marginBottom: 12 }}>Order Placed!</h2>
            <p style={{ color: '#BA9D7C', lineHeight: 1.8, marginBottom: 8 }}>Your order <strong style={{ color: '#C9A558' }}>{orderNum}</strong> has been received.</p>
            <p style={{ color: '#7C5F48', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>We'll ship your {product.name} (Size {selectedSize}) to {form.city}, {form.country}. Confirmation sent to {form.email}.</p>
            <button className="btn-gold" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: '#C9A558', letterSpacing: '0.1em', marginBottom: 2 }}>{product.name}</h2>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: '#C9A558' }}>${product.price}</div>
              </div>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>

            {step === 'details' && (
              <>
                <div className="form-field">
                  <label className="field-label">Select Size</label>
                  <div className="size-selector">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                        onClick={() => { setSelectedSize(s); setErrors(e => ({ ...e, size: '' })); }}
                      >{s}</button>
                    ))}
                  </div>
                  {errors.size && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.size}</div>}
                </div>

                <button
                  style={{ background: 'none', border: 'none', color: '#BA9D7C', fontSize: 13, cursor: 'pointer', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em', marginBottom: 16, textDecoration: 'underline', padding: 0 }}
                  onClick={() => setShowChart(!showChart)}
                >
                  {showChart ? 'Hide' : 'View'} Size Chart
                </button>

                {showChart && (
                  <table className="size-table" style={{ marginBottom: 20 }}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>US Chest</th>
                        <th>EU Chest</th>
                        <th>US Length</th>
                        <th>EU Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizeChart.map(row => (
                        <tr key={row.size} style={selectedSize === row.size ? { background: 'rgba(201,165,88,0.08)' } : {}}>
                          <td style={{ color: '#C9A558', fontFamily: "'Cinzel', serif" }}>{row.size}</td>
                          <td>{row.usChest}</td>
                          <td>{row.euChest}</td>
                          <td>{row.usLength}</td>
                          <td>{row.euLength}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <button
                  className="btn-gold"
                  onClick={() => {
                    if (!selectedSize) { setErrors({ size: 'Please select a size.' }); return; }
                    setStep('form');
                  }}
                >
                  <BagIcon /> &nbsp; Continue to Delivery
                </button>
              </>
            )}

            {step === 'form' && (
              <form onSubmit={handleSubmit}>
                <p style={{ color: '#BA9D7C', fontSize: 14, marginBottom: 20, fontStyle: 'italic' }}>
                  Delivering size <strong style={{ color: '#C9A558' }}>{selectedSize}</strong> · ${product.price}
                </p>

                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <Field id="name" label="Full Name" placeholder="Your full name" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Field id="phone" label="Phone" placeholder="+1 555 000 0000" />
                  </div>
                </div>

                <Field id="email" label="Email Address" type="email" placeholder="your@email.com" />
                <Field id="address" label="Street Address" placeholder="123 Main St, Apt 4B" />

                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <Field id="city" label="City" placeholder="City" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Field id="zip" label="Zip / Postal Code" placeholder="Zip" />
                  </div>
                </div>

                <Field id="country" label="Country" placeholder="Country" />

                {Object.keys(errors).length > 0 && !errors.size && (
                  <div className="error-msg" style={{ marginBottom: 16 }}>Please fill in all required fields.</div>
                )}

                {errors.submit && <div className="error-msg" style={{ marginBottom: 12 }}>{errors.submit}</div>}
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button type="button" className="btn-ghost" style={{ width: 'auto', flex: 1 }} onClick={() => setStep('details')}>← Back</button>
                  <button type="submit" className="btn-gold" style={{ flex: 2 }} disabled={submitting}>
                    {submitting ? 'Placing Order...' : <><BagIcon /> &nbsp; Place Order — ${product.price}</>}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
