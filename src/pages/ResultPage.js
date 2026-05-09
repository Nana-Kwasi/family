import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import dayBorns from '../data/akanDayBorns.json';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { generateCertificateDataUrl, CERT_VARIANTS } from '../utils/certificateCanvas';

const CERT_STYLE_SAMPLES = [
  { variant: CERT_VARIANTS.NAMING_ADINKRA, src: '/images/cer-sample-2.png', title: 'Naming · Adinkra', subtitle: 'Parchment & lineage detail' },
  { variant: CERT_VARIANTS.NAMING_KENTE, src: '/images/cert-sample-3.png', title: 'Naming · Kente', subtitle: 'Bold kente frame' },
];

function getDay(dateStr) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const d = new Date(dateStr + 'T12:00:00');
  return days[d.getDay()];
}

const GoldDivider = () => (
  <div className="gold-divider">
    <span className="gold-divider-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
        <path d="M4 21.6c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
      </svg>
    </span>
  </div>
);


function certificateFilename(name) {
  const base = String(name || 'certificate')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80) || 'certificate';
  return `${base}-akan-heritage.png`;
}

function isIOSLike() {
  return /iPad|iPhone|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

async function triggerCertificateDownload(name, dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) return;

  const filename = certificateFilename(name);
  let blob;
  try {
    blob = await fetch(dataUrl).then((r) => r.blob());
  } catch {
    return;
  }
  if (!blob || blob.size < 100) return;

  const objectUrl = URL.createObjectURL(blob);

  if (isIOSLike() && typeof navigator.share === 'function' && typeof navigator.canShare === 'function') {
    try {
      const file = new File([blob], filename, { type: blob.type || 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Your Akan heritage certificate',
        });
        URL.revokeObjectURL(objectUrl);
        return;
      }
    } catch {
      // Share failed or dismissed — fall through to anchor download
    }
  }

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.rel = 'noopener';
  link.style.position = 'fixed';
  link.style.left = '-9999px';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 120000);
}

function getShareUrl() {
  const current = window.location.href;
  const configured = process.env.REACT_APP_PUBLIC_SITE_URL || '';
  const isLocal = /localhost|127\.0\.0\.1/.test(window.location.host);
  return {
    url: isLocal && configured ? configured : current,
    isLocalWithoutPublic: isLocal && !configured,
  };
}

export default function ResultPage() {
  const [shareNotice, setShareNotice] = useState('');
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [certPreviewOpen, setCertPreviewOpen] = useState(false);
  const [certLoading, setCertLoading] = useState(false);
  const [certDataUrl, setCertDataUrl] = useState('');
  const [certError, setCertError] = useState('');
  const [certStepIndex, setCertStepIndex] = useState(-1);
  const [certVariant, setCertVariant] = useState(CERT_VARIANTS.NAMING_ADINKRA);
  const [showCertOptions, setShowCertOptions] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const shareMenuRef = useRef(null);
  const dob = params.get('dob');
  const gender = params.get('gender') || 'female';
  const day = dob ? getDay(dob) : null;
  const data = day && dayBorns[day] ? dayBorns[day] : null;

  const dayBornMatchCount = useMemo(() => {
    if (!day) return 0;
    return products.filter((p) => p.bornDay === day).length;
  }, [day]);

  const dayBornPrimary = useMemo(() => {
    if (!day) return [];
    const match = products.filter((p) => p.bornDay === day);
    if (match.length > 0) return match;
    return products.filter((p) => p.bornDay === null);
  }, [day]);

  const otherProducts = useMemo(() => {
    if (!day) return [];
    return products.filter((p) => !dayBornPrimary.some((x) => x.id === p.id));
  }, [day, dayBornPrimary]);

  useEffect(() => {
    if (!shareMenuOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!shareMenuRef.current?.contains(event.target)) setShareMenuOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [shareMenuOpen]);

  useEffect(() => {
    if (!dob) return;
    confetti({ particleCount: 120, spread: 80, colors: ['#C9A558', '#E8CB82', '#f5d966', '#ffffff'] });
  }, [dob]);

  useEffect(() => {
    setCertDataUrl('');
    setCertError('');
  }, [dob, gender, certVariant]);

  if (!dob) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#BA9D7C', marginBottom: 24 }}>No birthday provided.</p>
          <button className="btn-gold" style={{ width: 'auto', padding: '12px 32px' }} onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const name = data[gender] || data.female;
  const dateDisplay = new Date(dob + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const birthDate = new Date(dob + 'T12:00:00');
  const today = new Date();
  const todayNorm = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const yearDiff = today.getFullYear() - birthDate.getFullYear();
  const age = birthdayThisYear <= todayNorm ? yearDiff : yearDiff - 1;

  let birthdayStatus;
  if (birthdayThisYear.getTime() === todayNorm.getTime()) birthdayStatus = 'today';
  else if (birthdayThisYear < todayNorm) birthdayStatus = 'passed';
  else birthdayStatus = 'upcoming';

  const birthdayWish = {
    today: { emoji: '🎂', title: 'Happy Birthday!', message: `Mama Africa wishes you, ${name}, a truly blessed and joyful birthday. May this day be filled with love, laughter, and all the gifts your spirit deserves.` },
    passed: { emoji: '🎉', title: 'Belated Happy Birthday!', message: `Mama Africa sends warm belated birthday blessings to you, ${name}. Though the day has passed, the celebration of your life never ends.` },
    upcoming: { emoji: '🌟', title: 'Happy Birthday in Advance!', message: `Mama Africa celebrates you, ${name}, and looks forward to your special day. May the coming birthday bring you immense joy and renewed purpose.` },
  }[birthdayStatus];
  const shareMeta = getShareUrl();
  const certSteps = [
    'Validating date of birth',
    'Mapping your Akan lineage',
    'Applying heritage signature',
    'Rendering certificate artwork',
    'Finalizing secure download',
  ];

  async function ensureCertificateData() {
    if (certDataUrl) return certDataUrl;
    setCertLoading(true);
    setCertError('');
    try {
      const dataUrl = await generateCertificateDataUrl(name, day, dateDisplay, gender, data, certVariant);
      if (!dataUrl || dataUrl.length < 10000) {
        throw new Error('Generated certificate payload is too small');
      }
      setCertDataUrl(dataUrl);
      return dataUrl;
    } catch (error) {
      setCertError('Certificate generation failed on this device. Please try again.');
      return '';
    } finally {
      setCertLoading(false);
    }
  }

  async function runCertificatePipeline() {
    if (certLoading || certStepIndex !== -1) return;
    if (certDataUrl) return;
    try {
      for (let i = 0; i < certSteps.length - 1; i += 1) {
        setCertStepIndex(i);
        // 5 stages x 2 seconds ~= 10 seconds
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setCertStepIndex(certSteps.length - 1);
      await ensureCertificateData();
    } finally {
      setCertStepIndex(-1);
    }
  }

  async function handleCertificateAction() {
    if (!showCertOptions) {
      setShowCertOptions(true);
      return;
    }
    await runCertificatePipeline();
  }

  async function handlePreviewCertificate() {
    const dataUrl = await ensureCertificateData();
    if (dataUrl) setCertPreviewOpen(true);
  }

  async function handleShareChannel(channel) {
    const text = `My Akan day name is ${name} — I was born on a ${day}. ${data.planet}. Discover yours with Mama Africa Official!`;
    const { url, isLocalWithoutPublic } = getShareUrl();
    if (isLocalWithoutPublic) {
      setShareNotice('This link is local-only. Set REACT_APP_PUBLIC_SITE_URL to share a phone-accessible link.');
    } else {
      setShareNotice('');
    }

    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    const encodedSubject = encodeURIComponent(`My Akan Name is ${name}!`);
    const links = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedSubject}&body=${encodedText}%0A%0A${encodedUrl}`,
    };

    setShareMenuOpen(false);

    if (channel === 'instagram' || channel === 'tiktok') {
      const fullMessage = `${text}\n${url}`;
      if (navigator.share) {
        navigator.share({ title: `My Akan Name is ${name}!`, text, url }).catch(() => {});
        return;
      }
      await navigator.clipboard.writeText(fullMessage);
      window.open(channel === 'instagram' ? 'https://www.instagram.com/' : 'https://www.tiktok.com/', '_blank', 'noopener,noreferrer');
      setShareNotice(`Copied your share text. Paste it in ${channel === 'instagram' ? 'Instagram' : 'TikTok'} to post.`);
      return;
    }

    const target = links[channel];
    if (target) window.open(target, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="page-wrapper">
      {/* Name reveal hero */}
      <section style={{
        padding: '80px 20px 48px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(201,165,88,0.08) 0%, transparent 60%), var(--bg-main)',
      }}>
        <div className="result-day-badge">{day}-born · {dateDisplay}</div>
        <div className="result-name-display">{name}</div>
        <p className="result-day-sub">
          {gender === 'female' ? '♀ Female' : '♂ Male'} · Born on {day} · {data.planet}
        </p>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(13px, 2vw, 16px)', color: '#C9A558', letterSpacing: '0.12em', marginBottom: 24 }}>
          Age {age}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <span className="tag-pill">{data.color}</span>
          <span className="tag-pill">{data.symbol} {data.planet}</span>
        </div>

        {/* Birthday wish card */}
        <div style={{
          maxWidth: 560, margin: '0 auto',
          background: 'rgba(201,165,88,0.07)',
          border: '1px solid rgba(201,165,88,0.3)',
          borderRadius: 12, padding: '24px 28px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{birthdayWish.emoji}</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#C9A558', letterSpacing: '0.1em', marginBottom: 10 }}>
            {birthdayWish.title}
          </div>
          <p style={{ color: '#EDD9BC', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.8, margin: 0 }}>
            {birthdayWish.message}
          </p>
        </div>

        <div style={{ marginTop: 28, maxWidth: 980, marginLeft: 'auto', marginRight: 'auto', border: '1px solid rgba(201,165,88,0.2)', borderRadius: 12, padding: '16px 14px', background: 'rgba(201,165,88,0.03)' }}>
          {showCertOptions && (
            <>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: '0.14em',
                color: '#C9A558',
                textTransform: 'uppercase',
                marginBottom: 12,
                textAlign: 'center',
              }}
              >
                Choose certificate artwork
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                gap: 12,
                marginBottom: 18,
              }}
              >
                {CERT_STYLE_SAMPLES.map((s) => (
                  <button
                    key={s.variant}
                    type="button"
                    onClick={() => setCertVariant(s.variant)}
                    style={{
                      border: certVariant === s.variant ? '2px solid #C9A558' : '1px solid rgba(201,165,88,0.28)',
                      borderRadius: 10,
                      padding: 8,
                      background: certVariant === s.variant ? 'rgba(201,165,88,0.14)' : 'rgba(201,165,88,0.04)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: 'inherit',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <img
                      src={s.src}
                      alt=""
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 6,
                        display: 'block',
                        aspectRatio: '16 / 10',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: '#C9A558', marginTop: 8, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.3 }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#BA9D7C', marginTop: 4, lineHeight: 1.35 }}>
                      {s.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {certDataUrl && certStepIndex === -1 && !certLoading && (
              <button
                onClick={handlePreviewCertificate}
                style={{ background: 'linear-gradient(135deg,#C9A558,#E8CB82)', color: '#1C0E04', border: 'none', borderRadius: 8, padding: '12px 20px', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, minWidth: 220, justifyContent: 'center' }}
              >
                Preview Certificate
              </button>
            )}
            <button
              onClick={handleCertificateAction}
              disabled={certLoading || certStepIndex !== -1}
              style={{ background: 'rgba(201,165,88,0.12)', color: '#C9A558', border: '1px solid rgba(201,165,88,0.45)', borderRadius: 8, padding: '12px 20px', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.1em', cursor: certLoading || certStepIndex !== -1 ? 'not-allowed' : 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, minWidth: 280, justifyContent: 'center', opacity: certLoading || certStepIndex !== -1 ? 0.7 : 1 }}
            >
              {certStepIndex !== -1
                ? certSteps[certStepIndex]
                : certDataUrl
                  ? 'Certificate Ready'
                  : showCertOptions
                    ? 'Generate Certificate'
                  : 'Get Ghanaian Name Certificate'}
            </button>
          </div>
          {certStepIndex !== -1 && (
            <p style={{ marginTop: 10, textAlign: 'center', color: '#BA9D7C', fontSize: 13 }}>
              Step {certStepIndex + 1} of {certSteps.length}: {certSteps[certStepIndex]}
            </p>
          )}
          {certError && (
            <p style={{ marginTop: 10, textAlign: 'center', color: '#fca5a5', fontSize: 13 }}>
              {certError}
            </p>
          )}
        </div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
          <div ref={shareMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShareMenuOpen((open) => !open)}
              style={{
                background: 'rgba(201,165,88,0.08)',
                color: '#E8CB82',
                border: '1px solid rgba(201,165,88,0.35)',
                borderRadius: 999,
                padding: '9px 16px',
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                minWidth: 140,
              }}
            >
              Share
            </button>
            {shareMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 230,
                  background: '#120b06',
                  border: '1px solid rgba(201,165,88,0.35)',
                  borderRadius: 12,
                  padding: 8,
                  zIndex: 40,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
                }}
              >
                {[
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'x', label: 'X' },
                  { id: 'tiktok', label: 'TikTok' },
                  { id: 'instagram', label: 'Instagram' },
                  { id: 'pinterest', label: 'Pinterest' },
                  { id: 'telegram', label: 'Telegram' },
                  { id: 'facebook', label: 'Facebook' },
                  { id: 'email', label: 'Email' },
                  { id: 'linkedin', label: 'LinkedIn' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleShareChannel(s.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'transparent',
                      color: '#E8CB82',
                      border: '1px solid rgba(201,165,88,0.2)',
                      borderRadius: 8,
                      padding: '8px 10px',
                      fontFamily: "'Cinzel', serif",
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      marginBottom: 6,
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {shareMeta.isLocalWithoutPublic && (
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 12px',
                borderRadius: 999,
                border: '1px solid rgba(239,68,68,0.35)',
                background: 'rgba(239,68,68,0.1)',
                color: '#fca5a5',
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Share Link: Local-Only
            </span>
          </div>
        )}
        {shareNotice && (
          <p style={{ marginTop: 12, color: '#BA9D7C', fontSize: 13, lineHeight: 1.6 }}>
            {shareNotice}
          </p>
        )}
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
          <div style={{ border: '1px solid rgba(201,165,88,0.22)', borderRadius: 999, padding: '7px 12px', background: 'rgba(201,165,88,0.04)', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ color: '#9E7D42', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Cinzel', serif" }}>Legal & Trust</span>
            <Link to="/shipping-returns" style={{ color: '#C9A558', fontSize: 11, textDecoration: 'underline' }}>Shipping</Link>
            <Link to="/privacy-policy" style={{ color: '#C9A558', fontSize: 11, textDecoration: 'underline' }}>Privacy</Link>
            <Link to="/terms" style={{ color: '#C9A558', fontSize: 11, textDecoration: 'underline' }}>Terms</Link>
            <Link to="/cookie-policy" style={{ color: '#C9A558', fontSize: 11, textDecoration: 'underline' }}>Cookies</Link>
          </div>
        </div>
      </section>

      {/* Rich info */}
      <section className="afia-section" style={{ maxWidth: 780 }}>
        <GoldDivider />

        <div className="info-block">
          <div className="info-block-label">Origin & Heritage</div>
          <p className="info-block-text">{data.origin}</p>
        </div>

        <div className="info-block">
          <div className="info-block-label">The Meaning of {name}</div>
          <p className="info-block-text">{data.meaning}</p>
        </div>

        <div className="info-block">
          <div className="info-block-label">Historical Legacy</div>
          <p className="info-block-text">{data.history}</p>
        </div>

        <div className="info-block">
          <div className="info-block-label">Traits & Attributes</div>
          <ul className="attributes-list">
            {data.attributes.map((attr, i) => (
              <li key={i} className="tag-pill" style={{ margin: 0 }}>{attr}</li>
            ))}
          </ul>
        </div>

        <div className="info-block">
          <div className="info-block-label">Appellations — Soul Names</div>
          <ul className="appellations-list">
            {data.appellations.map((app, i) => (
              <li key={i}>{app}</li>
            ))}
          </ul>
        </div>

        <div className="info-block">
          <div className="info-block-label">Divine Energy</div>
          <p className="info-block-text">{data.divineEnergy}</p>
        </div>

        <div className="info-block" style={{ background: 'rgba(201,165,88,0.04)', borderRadius: 10, padding: '24px', border: '1px solid rgba(201,165,88,0.2)', borderBottom: '1px solid rgba(201,165,88,0.2)' }}>
          <div className="info-block-label">Your Soul Path</div>
          <p className="info-block-text" style={{ fontStyle: 'italic', fontSize: 18, lineHeight: 2 }}>
            "{data.soulPath}"
          </p>
        </div>
      </section>

      {/* Merchandise section */}
      <section style={{ padding: '48px 0 80px', borderTop: '1px solid rgba(201,165,88,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 20px' }}>
          <h2 className="section-title">Wear Your Heritage</h2>
          <p className="section-subtitle">Carry the spirit of {name} with you</p>
        </div>
        <div style={{ maxWidth: 1120, margin: '0 auto 24px', padding: '0 20px' }}>
          <div style={{ border: '1px solid rgba(201,165,88,0.22)', borderRadius: 12, background: 'rgba(201,165,88,0.04)', padding: '14px 16px' }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 8 }}>
              Gifts for your day-born name
            </div>
            <p style={{ margin: 0, color: '#BA9D7C', fontSize: 14, lineHeight: 1.7 }}>
              Pieces that match <strong style={{ color: '#E8CB82' }}>{day}</strong> names like <strong style={{ color: '#E8CB82' }}>{name}</strong>, then more from the collection.
            </p>
          </div>
        </div>
        <GoldDivider />
        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 13,
          letterSpacing: '0.16em',
          color: '#C9A558',
          textTransform: 'uppercase',
          textAlign: 'center',
          margin: '28px 0 16px',
          padding: '0 20px',
        }}
        >
          {dayBornMatchCount > 0 ? `${day}-born · ${name}` : `Heritage gifts · ${name}`}
        </h3>
        <div className="product-grid" style={{ paddingTop: 0 }}>
          {dayBornPrimary.map((p, idx) => (
            <ProductCard key={p.id} product={p} animationIndex={idx} />
          ))}
        </div>
        {otherProducts.length > 0 && (
          <>
            <h3 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 13,
              letterSpacing: '0.16em',
              color: '#C9A558',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: '40px 0 16px',
              padding: '0 20px',
            }}
            >
              Other products
            </h3>
            <div className="product-grid" style={{ paddingTop: 0 }}>
              {otherProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} animationIndex={idx} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Back button */}
      <div style={{ textAlign: 'center', padding: '0 20px 64px' }}>
        <button className="btn-ghost" style={{ width: 'auto', padding: '12px 36px' }} onClick={() => navigate('/')}>
          ← Discover Another Name
        </button>
      </div>

      {certPreviewOpen && (
        <div
          onClick={() => setCertPreviewOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(1100px, 96vw)',
              maxHeight: '92vh',
              overflow: 'auto',
              background: '#0f0b05',
              border: '1px solid rgba(201,165,88,0.35)',
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ color: '#C9A558', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                Certificate Preview
              </p>
              <button
                onClick={() => setCertPreviewOpen(false)}
                style={{ background: 'transparent', border: '1px solid rgba(201,165,88,0.35)', color: '#C9A558', borderRadius: 6, padding: '6px 10px', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
            {certLoading ? (
              <p style={{ color: '#BA9D7C' }}>Generating certificate...</p>
            ) : (
              <img src={certDataUrl} alt="Akan heritage certificate preview" style={{ width: '100%', height: 'auto', borderRadius: 8, border: '1px solid rgba(201,165,88,0.2)' }} />
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button
                onClick={() => triggerCertificateDownload(name, certDataUrl)}
                style={{ background: 'linear-gradient(135deg,#C9A558,#E8CB82)', color: '#1C0E04', border: 'none', borderRadius: 8, padding: '10px 16px', fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
