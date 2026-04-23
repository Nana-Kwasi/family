import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import dayBorns from '../data/akanDayBorns.json';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

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

async function downloadCertificate(name, day, dateDisplay, gender, data) {
  await document.fonts.ready;

  const W = 1600, H = 960;
  const SCALE = 4; // 4x = ultra-sharp on any screen or printer
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  // ── Background ──────────────────────────────────────────────
  const bg = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H / 2, W * 0.8);
  bg.addColorStop(0, '#161008');
  bg.addColorStop(0.6, '#0e0b05');
  bg.addColorStop(1, '#18100A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // ── Diamond helper ────────────────────────────────────────────
  const diamond = (x, y, size) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size); ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size); ctx.lineTo(x - size, y);
    ctx.closePath(); ctx.fill();
  };

  // ── Rule with center diamond ──────────────────────────────────
  const rule = (y, inset = 200) => {
    ctx.strokeStyle = 'rgba(201,165,88,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(inset, y); ctx.lineTo(W - inset, y); ctx.stroke();
    ctx.fillStyle = '#C9A558';
    diamond(W / 2, y, 6);
  };

  // ── Borders ──────────────────────────────────────────────────
  ctx.strokeStyle = '#C9A558'; ctx.lineWidth = 4;
  ctx.strokeRect(26, 26, W - 52, H - 52);
  ctx.strokeStyle = 'rgba(201,165,88,0.5)'; ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.strokeStyle = 'rgba(201,165,88,0.2)'; ctx.lineWidth = 1;
  ctx.strokeRect(54, 54, W - 108, H - 108);

  // ── Corner ornaments ─────────────────────────────────────────
  const corner = (cx, cy, sx, sy) => {
    const L = 64;
    ctx.strokeStyle = '#C9A558'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx + sx * L, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy + sy * L);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(201,165,88,0.35)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + sx * L * 0.5, cy + sy * 14);
    ctx.lineTo(cx + sx * 14, cy + sy * 14);
    ctx.lineTo(cx + sx * 14, cy + sy * L * 0.5);
    ctx.stroke();
    ctx.fillStyle = '#C9A558';
    diamond(cx, cy, 5);
  };
  corner(64, 64, 1, 1); corner(W - 64, 64, -1, 1);
  corner(64, H - 64, 1, -1); corner(W - 64, H - 64, -1, -1);

  // ── HEADER ───────────────────────────────────────────────────
  ctx.fillStyle = '#C9A558';
  ctx.font = '600 15px Cinzel, serif';
  ctx.fillText('AFIA  ·  MAMA AFRICA', W / 2, 94);

  rule(112, 230);

  ctx.fillStyle = '#E8CB82';
  ctx.font = '700 26px Cinzel, serif';
  ctx.fillText('CERTIFICATE OF AKAN HERITAGE', W / 2, 152);

  rule(170, 300);

  // ── Certifying line ───────────────────────────────────────────
  ctx.fillStyle = '#c8b08a';
  ctx.font = 'italic 21px "Times New Roman", Times, serif';
  ctx.fillText('This certifies that the bearer, known as', W / 2, 218);

  // ── Name ──────────────────────────────────────────────────────
  ctx.save();
  ctx.shadowColor = 'rgba(201,165,88,0.5)';
  ctx.shadowBlur = 30;
  ctx.fillStyle = '#C9A558';
  ctx.font = '700 96px Cinzel, serif';
  ctx.fillText(name, W / 2, 345);
  ctx.restore();

  // Underline with gem
  ctx.font = '700 96px Cinzel, serif';
  const nw = ctx.measureText(name).width * 0.65;
  ctx.strokeStyle = 'rgba(201,165,88,0.6)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W/2 - nw/2, 360); ctx.lineTo(W/2 + nw/2, 360); ctx.stroke();
  ctx.fillStyle = '#C9A558'; diamond(W / 2, 360, 5);

  // ── Lineage ───────────────────────────────────────────────────
  ctx.fillStyle = '#EDD9BC';
  ctx.font = '24px "Times New Roman", Times, serif';
  ctx.fillText(`is of the ${day}-Born lineage of the Akan people of Ghana`, W / 2, 406);

  // ── Metadata ──────────────────────────────────────────────────
  ctx.fillStyle = '#b89a6a';
  ctx.font = 'italic 19px "Times New Roman", Times, serif';
  ctx.fillText(
    `${gender === 'female' ? '♀ Female' : '♂ Male'}  ·  Born on ${day}  ·  ${data.planet}  ·  Sacred Colour: ${data.color}`,
    W / 2, 442
  );

  // ── Divider ───────────────────────────────────────────────────
  rule(468, 200);

  // ── Soul Path ─────────────────────────────────────────────────
  ctx.fillStyle = '#d4ae52';
  ctx.font = 'italic 21px "Times New Roman", Times, serif';
  const soul = `\u201C${data.soulPath}\u201D`;
  const maxLineW = 1100;
  const words = soul.split(' ');
  let line = ''; let sy = 514;
  for (const w of words) {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > maxLineW && line) {
      ctx.fillText(line.trim(), W / 2, sy);
      line = w + ' '; sy += 36;
    } else { line = test; }
  }
  if (line.trim()) ctx.fillText(line.trim(), W / 2, sy);
  sy += 36;

  // ── Divider after quote ───────────────────────────────────────
  rule(sy + 16, 240);

  // ── Attributes + Birth Date block ────────────────────────────
  const blockY = sy + 56;

  if (data.attributes && data.attributes.length) {
    ctx.fillStyle = '#C9A558';
    ctx.font = '14px Cinzel, serif';
    ctx.fillText(data.attributes.slice(0, 5).join('   ·   '), W / 2, blockY);
  }

  ctx.fillStyle = '#9a8060';
  ctx.font = '16px "Times New Roman", Times, serif';
  ctx.fillText(`Date of Birth: ${dateDisplay}`, W / 2, blockY + 36);

  // ── Bottom rule ───────────────────────────────────────────────
  rule(H - 122, 300);

  // ── Footer ────────────────────────────────────────────────────
  ctx.fillStyle = '#BA9D7C';
  ctx.font = '15px Cinzel, serif';
  ctx.fillText(
    `Issued by AFIA  ·  Mama Africa  ·  ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    W / 2, H - 84
  );
  ctx.fillStyle = 'rgba(201,165,88,0.55)';
  ctx.font = '13px Cinzel, serif';
  ctx.fillText('Celebrating Akan Heritage & the African Diaspora', W / 2, H - 60);

  // Bottom ornament dots
  ctx.fillStyle = 'rgba(201,165,88,0.5)';
  [-20, 0, 20].forEach((off, i) => {
    const r = i === 1 ? 4 : 2.5;
    ctx.beginPath(); ctx.arc(W / 2 + off, H - 36, r, 0, Math.PI * 2); ctx.fill();
  });

  // ── Download ──────────────────────────────────────────────────
  const link = document.createElement('a');
  link.download = `${name}-akan-heritage-certificate.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}

export default function ResultPage() {
  const [copied, setCopied] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dob = params.get('dob');
  const gender = params.get('gender') || 'female';

  useEffect(() => {
    if (!dob) return;
    confetti({ particleCount: 120, spread: 80, colors: ['#C9A558', '#E8CB82', '#f5d966', '#ffffff'] });
  }, [dob]);

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

  const day = getDay(dob);
  const data = dayBorns[day];
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

        {/* Certificate + Share */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
          <button
            onClick={() => downloadCertificate(name, day, dateDisplay, gender, data)}
            style={{ background: 'linear-gradient(135deg,#C9A558,#E8CB82)', color: '#1C0E04', border: 'none', borderRadius: 8, padding: '12px 24px', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.12em', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            📜 Download Certificate
          </button>
          <button
            onClick={async () => {
              const text = `My Akan day name is ${name} — I was born on a ${day}. ${data.planet}. Discover yours at AFIA!`;
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({ title: `My Akan Name is ${name}!`, text, url }).catch(() => {});
              } else {
                await navigator.clipboard.writeText(`${text}\n${url}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
              }
            }}
            style={{ background: 'transparent', color: '#C9A558', border: '1px solid rgba(201,165,88,0.4)', borderRadius: 8, padding: '12px 24px', fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.12em', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {copied ? '✓ Copied!' : '🔗 Share My Name'}
          </button>
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
        <GoldDivider />
        <div className="product-grid" style={{ paddingTop: 24 }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Back button */}
      <div style={{ textAlign: 'center', padding: '0 20px 64px' }}>
        <button className="btn-ghost" style={{ width: 'auto', padding: '12px 36px' }} onClick={() => navigate('/')}>
          ← Discover Another Name
        </button>
      </div>
    </div>
  );
}
