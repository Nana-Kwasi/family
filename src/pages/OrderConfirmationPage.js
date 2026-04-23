import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get('orderId') || '—';
  const total = params.get('total') || '0.00';

  return (
    <div className="page-wrapper" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>

        {/* Success icon */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(201,165,88,0.12)', border: '1px solid rgba(201,165,88,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>
          🎁
        </div>

        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.22em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 14 }}>
          Order Confirmed
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 38px)', color: '#EDD9BC', fontWeight: 700, lineHeight: 1.25, marginBottom: 16 }}>
          Thank You — Your Gift Is On Its Way
        </h1>
        <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 18, color: '#BA9D7C', fontStyle: 'italic', lineHeight: 1.85, marginBottom: 28 }}>
          Your order has been received and is being prepared with care. Mama Africa thanks you for choosing a meaningful gift.
        </p>

        {/* Order details card */}
        <div className="afia-card" style={{ padding: '24px 28px', marginBottom: 28, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase' }}>Order ID</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#C9A558' }}>{orderId.slice(0, 12)}…</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase' }}>Total Paid</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: '#C9A558' }}>${total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase' }}>Status</span>
            <span className="status-badge status-pending">Pending</span>
          </div>
        </div>

        {/* What happens next */}
        <div style={{ background: 'rgba(201,165,88,0.04)', border: '1px solid rgba(201,165,88,0.15)', borderRadius: 10, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#9E7D42', textTransform: 'uppercase', marginBottom: 12 }}>What Happens Next</p>
          {[
            'You will receive an email confirmation shortly',
            'Your gift will be prepared and packed with care',
            'Tracking details will be sent when your order ships',
            'Expected delivery: 5–10 business days',
          ].map((t, i) => (
            <p key={i} style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 15, color: '#BA9D7C', marginBottom: 8, display: 'flex', gap: 10 }}>
              <span style={{ color: '#C9A558', flexShrink: 0 }}>{i + 1}.</span> {t}
            </p>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-gold" style={{ width: 'auto', padding: '12px 28px', fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}
            onClick={() => navigate('/cart')}>
            View My Orders
          </button>
          <button className="btn-ghost" style={{ width: 'auto', padding: '12px 28px', fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}
            onClick={() => navigate('/store')}>
            Continue Shopping
          </button>
        </div>

        <p style={{ marginTop: 24, fontFamily: "'Times New Roman', Times, serif", fontSize: 14, color: '#7C5F48', fontStyle: 'italic' }}>
          Respect · Heritage · Love · Legacy
        </p>
      </div>
    </div>
  );
}
