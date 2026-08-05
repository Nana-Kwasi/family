import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import dayBorns from '../data/akanDayBorns.json';
import { useCatalog } from '../contexts/CatalogContext';
import { useAccountGate } from '../components/AccountGate';
import WhiteProductSection from '../components/ui/WhiteProductSection';
import EmailCapture from '../components/ui/EmailCapture';
import { generateCertificateDataUrl, CERT_VARIANTS } from '../utils/certificateCanvas';
import useSEO from '../hooks/useSEO';

const CERT_STYLE_SAMPLES = [
  { variant: CERT_VARIANTS.NAMING_ADINKRA, src: '/images/cer-sample-2.png', title: 'Naming · Adinkra', subtitle: 'Parchment & lineage detail · Premium', premium: true },
  { variant: CERT_VARIANTS.NAMING_KENTE, src: '/images/cert-sample-3.png', title: 'Naming · Kente', subtitle: 'Bold kente frame · Premium', premium: true },
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
  const [certPreviewOpen, setCertPreviewOpen] = useState(false);
  const [certLoading, setCertLoading] = useState(false);
  const [certDataUrl, setCertDataUrl] = useState('');
  const [certError, setCertError] = useState('');
  const [certStepIndex, setCertStepIndex] = useState(-1);
  const [certVariant, setCertVariant] = useState(CERT_VARIANTS.NAMING_ADINKRA);
  const [showCertOptions, setShowCertOptions] = useState(false);
  const [samplePreviews, setSamplePreviews] = useState({});
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { products } = useCatalog();
  const { requireAccount } = useAccountGate();
  const dob = params.get('dob');
  const gender = params.get('gender') || 'female';
  const day = dob ? getDay(dob) : null;
  const data = day && dayBorns[day] ? dayBorns[day] : null;

  const dayBornMatchCount = useMemo(() => {
    if (!day) return 0;
    return products.filter((p) => p.bornDay === day).length;
  }, [day, products]);

  const dayBornPrimary = useMemo(() => {
    if (!day) return [];
    const match = products.filter((p) => p.bornDay === day);
    if (match.length > 0) return match;
    return products.filter((p) => p.bornDay === null);
  }, [day, products]);

  const otherProducts = useMemo(() => {
    if (!day) return [];
    return products.filter((p) => !dayBornPrimary.some((x) => x.id === p.id));
  }, [day, products, dayBornPrimary]);

  useEffect(() => {
    if (!dob) return;
    confetti({ particleCount: 120, spread: 80, colors: ['#C9A558', '#E8CB82', '#f5d966', '#ffffff'] });
  }, [dob]);

  useEffect(() => {
    setCertDataUrl('');
    setCertError('');
  }, [dob, gender, certVariant]);

  // Clear generated style previews whenever the underlying identity changes.
  useEffect(() => {
    setSamplePreviews({});
  }, [dob, gender]);

  const name = dob && data ? (data[gender] || data.female) : null;

  // Build the selectable style samples as live certificates of THIS user's day born.
  useEffect(() => {
    if (!showCertOptions || !name || !data || !dob) return undefined;
    let cancelled = false;
    const dateDisplayLocal = new Date(dob + 'T12:00:00')
      .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    (async () => {
      for (let i = 0; i < CERT_STYLE_SAMPLES.length; i += 1) {
        const sample = CERT_STYLE_SAMPLES[i];
        try {
          // eslint-disable-next-line no-await-in-loop
          const url = await generateCertificateDataUrl(name, day, dateDisplayLocal, gender, data, sample.variant);
          if (cancelled) return;
          if (url) setSamplePreviews((prev) => ({ ...prev, [sample.variant]: url }));
        } catch {
          /* preview generation failed — placeholder stays */
        }
      }
    })();
    return () => { cancelled = true; };
  }, [showCertOptions, name, day, gender, data, dob]);

  useSEO({
    title: name ? `Your Akan Name is ${name} — ${day} Born` : 'Discover Your Akan Day Name',
    description: name
      ? `You were born on ${day}, making your Akan name ${name}. Discover your cultural heritage, soul path, and heritage gifts from Mama Africa Official Ghana.`
      : 'Enter your birthday to discover your Ghanaian Akan day name and cultural identity.',
    image: '/images/afia-hero.jpg',
  });

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
    passed: { emoji: '🎉', title: 'Belated Happy Birthday!', message: `Mama Africa sends warm belated birthday blessings to you, ${name}. Though the day has passed, the celebration of your birth never ends.` },
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
    if (certVariant === CERT_VARIANTS.NAMING_KENTE && !premiumUnlocked) {
      setShowPremiumGate(true);
      return;
    }
    setShowPremiumGate(false);
    requireAccount('save your certificate', () => { runCertificatePipeline(); });
  }

  async function handlePreviewCertificate() {
    const dataUrl = await ensureCertificateData();
    if (dataUrl) setCertPreviewOpen(true);
  }

  async function handleWhatsAppShare() {
    const text = `My Akan day name is ${name} — I was born on a ${day}. ${data.planet}. Discover yours with Mama Africa Official!`;
    const { url } = getShareUrl();

    // If cert is ready, try native share with the image file (opens OS share sheet → user picks WhatsApp)
    if (certDataUrl) {
      try {
        const blob = await fetch(certDataUrl).then((r) => r.blob());
        const file = new File([blob], `${name}-cultural-identity-certificate.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `My Akan Name is ${name}!`,
            text: `${text}\n${url}`,
          });
          return;
        }
      } catch {
        // native share failed or dismissed — fall through
      }
    }

    // No cert ready or native share unsupported — open WhatsApp text share
    const encodedText = encodeURIComponent(`${text} ${url}`);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank', 'noopener,noreferrer');

    if (!certDataUrl) {
      setShareNotice('Tip: generate your certificate first, then share it with the image attached.');
    }
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
          {gender === 'female' ? '♀ Female' : '♂ Male'} · Born on {day}
        </p>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(13px, 2vw, 16px)', color: '#C9A558', letterSpacing: '0.12em', marginBottom: 24 }}>
          Age {age}
        </p>
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
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.18em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 14, textAlign: 'center' }}>
            Cultural Identity Certificate
          </p>
          {showCertOptions && (
            <>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: '0.14em',
                color: '#9E7D42',
                textTransform: 'uppercase',
                marginBottom: 12,
                textAlign: 'center',
              }}
              >
                Choose certificate style
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
                    onClick={() => { setCertVariant(s.variant); setShowPremiumGate(false); }}
                    style={{
                      border: certVariant === s.variant ? '2px solid #C9A558' : '1px solid rgba(201,165,88,0.28)',
                      borderRadius: 10,
                      padding: 8,
                      background: certVariant === s.variant ? 'rgba(201,165,88,0.14)' : 'rgba(201,165,88,0.04)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: 'inherit',
                      WebkitTapHighlightColor: 'transparent',
                      position: 'relative',
                    }}
                  >
                    {s.premium && !premiumUnlocked && (
                      <span style={{
                        position: 'absolute', top: 6, right: 6,
                        background: 'linear-gradient(135deg,#C9A558,#E8CB82)',
                        color: '#1C0E04', fontSize: 9, fontFamily: "'Cinzel', serif",
                        letterSpacing: '0.06em', padding: '2px 6px', borderRadius: 4,
                        textTransform: 'uppercase', fontWeight: 700,
                      }}>
                        Premium
                      </span>
                    )}
                    {s.premium && premiumUnlocked && (
                      <span style={{
                        position: 'absolute', top: 6, right: 6,
                        background: 'rgba(34,197,94,0.2)', color: '#4ade80',
                        fontSize: 9, fontFamily: "'Cinzel', serif",
                        letterSpacing: '0.06em', padding: '2px 6px', borderRadius: 4,
                        textTransform: 'uppercase',
                      }}>
                        Unlocked
                      </span>
                    )}
                    {samplePreviews[s.variant] ? (
                      <img
                        src={samplePreviews[s.variant]}
                        alt={`${name} — ${s.title} certificate preview`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 6,
                          display: 'block',
                          aspectRatio: '16 / 10',
                          objectFit: 'contain',
                          background: '#F8F3E8',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          aspectRatio: '16 / 10',
                          borderRadius: 6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          padding: 8,
                          background: 'rgba(201,165,88,0.06)',
                          border: '1px dashed rgba(201,165,88,0.25)',
                          color: '#9E7D42',
                          fontFamily: "'Cinzel', serif",
                          fontSize: 10,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          lineHeight: 1.5,
                        }}
                      >
                        Preparing {name}&rsquo;s<br />{s.title} certificate…
                      </div>
                    )}
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
          {showPremiumGate && (
            <div style={{
              marginBottom: 16,
              padding: '16px 18px',
              background: 'rgba(201,165,88,0.06)',
              border: '1px solid rgba(201,165,88,0.3)',
              borderRadius: 10,
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.14em', color: '#C9A558', textTransform: 'uppercase', marginBottom: 6 }}>
                Unlock Premium · Kente Style
              </p>
              <p style={{ color: '#BA9D7C', fontSize: 13, marginBottom: 14 }}>
                Enter your email to unlock the premium Kente certificate — free, no payment needed.
              </p>
              <EmailCapture
                akanName={name}
                day={day}
                dob={dob}
                source="premium_cert_unlock"
                compact
                onSuccess={() => { setPremiumUnlocked(true); setShowPremiumGate(false); }}
              />
            </div>
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
                  : 'Get Cultural Identity Certificate'}
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
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={handleWhatsAppShare}
            style={{
              background: '#25D366',
              color: '#ffffff',
              border: 'none',
              borderRadius: 999,
              padding: '9px 18px',
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 600,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {certDataUrl ? 'Share Certificate on WhatsApp' : 'Share on WhatsApp'}
          </button>
          </div>
          {!certDataUrl && (
            <p style={{ color: '#5C4433', fontSize: 12, marginTop: 2, fontStyle: 'italic' }}>
              Generate your certificate above to share it with the image attached
            </p>
          )}
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

      {/* Email capture — heritage updates */}
      <section style={{
        borderTop: '1px solid rgba(201,165,88,0.12)',
        borderBottom: '1px solid rgba(201,165,88,0.12)',
        padding: '48px 20px',
        background: 'rgba(201,165,88,0.03)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <EmailCapture
            akanName={name}
            day={day}
            dob={dob}
            source="result_page_banner"
          />
        </div>
      </section>

      <WhiteProductSection
        heading="Wear Your Heritage"
        subtitle={`Carry the spirit of ${name} with you`}
        categories={[
          {
            label: dayBornMatchCount > 0 ? `${day}-born · ${name}` : `Heritage gifts · ${name}`,
            products: dayBornPrimary,
            limit: dayBornPrimary.length,
          },
          ...(otherProducts.length > 0 ? [{
            label: 'More from the collection',
            products: otherProducts,
            limit: otherProducts.length,
          }] : []),
        ]}
        viewAllHref="/store"
        viewAllLabel="Explore Full Shop"
      />

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
